/* eslint-disable no-plusplus */
import { expect, test } from '@playwright/test';
import { features } from '../../features/express/grid-marquee.spec.js';
import GridMarquee from '../../selectors/express/grid-marquee.page.js';

let gridMarquee;

test.describe('grid-marquee test suite', () => {
  test.beforeEach(async ({ page }) => {
    gridMarquee = new GridMarquee(page);
  });

  features[0].path.forEach((path) => {
    test(`${features[0].name}, path: ${path}, test logo and headline`, async ({ baseURL, page }) => {
      const testPage = `${baseURL}${path}`;
      console.log(testPage);
      await gridMarquee.gotoURL(testPage);

      await test.step('validate elements in block', async () => {
        await expect(gridMarquee.expressLogo).toBeVisible();
        await expect(gridMarquee.heading).toBeVisible();
        const heading = await gridMarquee.heading.innerText();
        expect(heading.length).toBeTruthy();
        const paragraphCount = gridMarquee.headlineText.count();
        for (let i = 0; i < paragraphCount; i++) {
          await expect(gridMarquee.headlineText).nth(i).toBeVisible();
          const text = await gridMarquee.headlineText.nth(i).innerText();
          expect(text.length).toBeTruthy();
        }
        await expect(gridMarquee.ctas).toBeVisible();
        await expect(gridMarquee.ctaButton.nth(0)).toBeVisible();
        await expect(gridMarquee.ctaButton.nth(1)).toBeVisible();
      });

      await test.step('test cta button clicks', async () => {
        await gridMarquee.ctaButton.nth(0).click();
        expect(page.url).not.toBe(testPage);
        await gridMarquee.gotoURL(testPage);
        await gridMarquee.ctaButton.nth(1).click();
        expect(page.url).not.toBe(testPage);
      });
    });
  });

  features[1].path.forEach((path) => {
    test(`${features[1].name}, path: ${path}, test cards`, async ({ baseURL, page }) => {
      const testPage = `${baseURL}${path}`;
      await gridMarquee.gotoURL(testPage);

      let cardCount;
      await test.step('validate elements in block ', async () => {
        await expect(gridMarquee.cardsContainer).toBeVisible();
        cardCount = await gridMarquee.card.count();
        expect(cardCount).not.toEqual(0);
      });

      await test.step('validate image click ', async () => {
        await gridMarquee.cardImage.nth(0).hover();
        await gridMarquee.cardImage.nth(0).click();
        expect(page.url).not.toBe(testPage);
        await gridMarquee.gotoURL(testPage);
      });

      await test.step('validate drawer operations ', async () => {
        if (cardCount) {
          await expect(gridMarquee.cardImage.nth(0)).toBeVisible();
          await gridMarquee.cardImage.nth(0).hover();
          await expect(gridMarquee.cardDrawer.nth(0)).toBeVisible();
        }

        await gridMarquee.cardImage.nth(0).hover();
        await gridMarquee.cardDrawerLink.nth(0).click();
        expect(page.url).not.toBe(testPage);
        await gridMarquee.gotoURL(testPage);
      });
    });
  });

  features[2].path.forEach((path) => {
    test(`${features[2].name}, path: ${path}, test ratings block`, async ({ baseURL, page }) => {
      const testPage = `${baseURL}${path}`;
      await gridMarquee.gotoURL(testPage);
      await page.waitForSelector('.global-footer');
      await test.step('validate elements in block ', async () => {
        expect(await gridMarquee.ratings).toBeVisible();
        expect(await gridMarquee.ratingsContainer.nth(0)).toBeVisible();
        expect(await gridMarquee.ratingsContainer.nth(1)).toBeVisible();
        const appStoreRating = await gridMarquee.ratingsContainer.nth(0).innerText();
        const googlePlayRating = await gridMarquee.ratingsContainer.nth(1).innerText();
        expect(appStoreRating).toBeTruthy();
        expect(googlePlayRating).toBeTruthy();
      });

      await test.step('validate button click ', async () => {
        await gridMarquee.ratingsContainer.nth(0).click();
        expect(page.url).not.toBe(testPage);
        await gridMarquee.gotoURL(testPage);
        await gridMarquee.ratingsContainer.nth(1).click();
        expect(page.url).not.toBe(testPage);
      });
    });
  });
});
