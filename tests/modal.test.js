import { expect, test } from '@playwright/test';
import modal from '../features/modal.spec.js';
import parse from '../features/parse.js';
import modalSelectors from '../selectors/modal.selectors.js';
import marqueeSelectors from '../selectors/marquee.selectors.js';

// Parse the feature file into something flat that can be tested separately
const { name, features } = parse(modal);

async function selectModalBtn(btn, page) {
  await btn.click();
  await page.waitForURL(/#/);
  await expect(page.locator(modalSelectors['@dialog'])).toBeVisible();
}

async function checkModalClosed(page) {
  await expect(page).not.toHaveURL(/#/);
  await expect(page.locator(modalSelectors['@dialog'])).not.toBeVisible();
}

test.describe(`${name}`, () => {
  features.forEach((props) => {
    test(props.title, async ({ page, browser }) => {
      await page.goto(props.url);
      const marqueeBtn = page.locator(
        marqueeSelectors['@marquee-modal-button'],
      );
      const closeBtn = page.locator(modalSelectors['@close-button']);

      // Closing by pressing the Esc key
      await selectModalBtn(marqueeBtn, page);

      /**
       * There's an issue with all the browsers where you can't immediately close the
       * modal with the escape key. The workaround is by tabbing 4 times to
       * get to the close button, then we can close the modal with the esc key.
       * See Jira Ticket: https://jira.corp.adobe.com/browse/MWPW-119063
       * Once ticket is addressed, condition can be removed or changed to only webkit as before.
       */
      // if (browser.browserType().name() === 'webkit') {
      page.waitForSelector(modalSelectors['@dialog']);
      page.keyboard.press('Escape');
      let count = 0;
      while (page.url().includes('#') && count < 10) {
        page.keyboard.press('Tab');
        page.keyboard.press('Escape');
        count += 1;
      }
      // } else {
      //   page.keyboard.press('Escape');
      // }

      await checkModalClosed(page);

      // Closing by selecting the close button
      await selectModalBtn(marqueeBtn, page);
      const inViewport = await page.evaluate(() => {
        const modalDialog = document.querySelector('.dialog-modal');
        const rect = modalDialog.getBoundingClientRect();
        return (
          rect.top >= 0
          && rect.left >= 0
          && rect.bottom
            <= (window.innerHeight || document.documentElement.clientHeight)
          && rect.right
            <= (window.innerWidth || document.documentElement.clientWidth)
        );
      });
      expect(inViewport).toBeTruthy();
      await closeBtn.click();
      await checkModalClosed(page);

      if (browser.browserType().name() !== 'webkit') {
      // Verifying the first focused item is the close button
        await selectModalBtn(marqueeBtn, page);
        await page.keyboard.press('Enter');
        await checkModalClosed(page);
        await selectModalBtn(marqueeBtn, page);
        await page.keyboard.press('Space');
        await checkModalClosed(page);
      }
    });
  });
});
