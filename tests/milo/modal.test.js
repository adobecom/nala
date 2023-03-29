import { expect, test } from '@playwright/test';
import parse from '../../libs/parse.js';
import modal from '../../features/milo/modal.spec.js';
import modalSelectors from '../../selectors/milo/modal.selectors.js';
import marqueeSelectors from '../../selectors/milo/marquee.selectors.js';

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
    test(`${props.title} Esc key close`, async ({ page, browserName }) => {
      test.skip(browserName === 'webkit', 'Closing of modal is broken for Webkit 16.4 (playwright build v1792)');
      await page.goto(props.url);
      const marqueeBtn = page.locator(marqueeSelectors['@marquee-modal-button']);

      await selectModalBtn(marqueeBtn, page);

      /**
       * Per WCAG and w3 standards, first thing that should be focused on is the first item.
       * The workaround is by tabbing multiple times to get to the close button,
       * then we can close the modal with the esc key.
      */
      await page.waitForSelector(modalSelectors['@dialog']);
      await page.keyboard.press('Escape');
      let count = 0;
      while (page.url().includes('#') && count < 10) {
        // eslint-disable-next-line no-await-in-loop
        await page.keyboard.press('Tab');
        // eslint-disable-next-line no-await-in-loop
        await page.keyboard.press('Escape');
        count += 1;
      }

      await checkModalClosed(page);
    });

    test(`${props.title} button close`, async ({ page }) => {
      await page.goto(props.url);
      const marqueeBtn = page.locator(marqueeSelectors['@marquee-modal-button']);
      const closeBtn = page.locator(modalSelectors['@close-button']);

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
    });
  });
});
