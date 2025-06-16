/* eslint-disable no-plusplus */
import { expect, test } from '@playwright/test';
import { features } from '../../features/express/how-to-steps-carousel.spec.js';
import HowToStepsCarousel from '../../selectors/express/how-to-steps-carousel.page.js';

let howToStepsCarousel;

test.describe('how-to-steps-carousel test suite', () => {
  test.beforeEach(async ({ page }) => {
    howToStepsCarousel = new HowToStepsCarousel(page);
  });

  features[0].path.forEach((path) => {
    test(`${features[0].name}, path: ${path},`, async ({ baseURL, page }) => {
      const testPage = `${baseURL}${path}`;
      await howToStepsCarousel.gotoURL(testPage);
      await howToStepsCarousel.scrollToHowToStepsCarousel();

      await test.step('validate elements in block', async () => {
        await expect(howToStepsCarousel.image).toBeVisible();
        await expect(howToStepsCarousel.heading).toBeVisible();
        const heading = await howToStepsCarousel.heading.innerText();
        expect(heading.length).toBeTruthy();
        await expect(howToStepsCarousel.howToStepsCarousel).toBeVisible();
        await expect(howToStepsCarousel.tipNumbers).toBeVisible();
        const noOfTips = await howToStepsCarousel.tipNumbers.count();
        for (let i = 0; i < noOfTips; i++) {
          await expect(howToStepsCarousel.tipNumber.nth(i)).toBeVisible();
          const text = await howToStepsCarousel.tipNumber.nth(i).innerText();
          expect(text.length).toBeTruthy();

          // Validate tip rotation
          const currentTip = await howToStepsCarousel.tipNumber.nth(i).getAttribute('class');
          if (currentTip.includes('active')) {
            await page.waitForTimeout(6000);
            await expect(howToStepsCarousel.tipNumber.nth(i)).not.toHaveClass(/active/);
          }
        }
      });

      await test.step('test button click', async () => {
        await howToStepsCarousel.clickButton();
        expect(page.url()).not.toBe(testPage);
      });
    });
  });

  features[1].path.forEach((path) => {
    test(`${features[1].name}, path: ${path}`, async ({ baseURL, page }) => {
      const testPage = `${baseURL}${path}`;
      await howToStepsCarousel.gotoURL(testPage);
      await howToStepsCarousel.scrollToHowToStepsCarousel();

      await test.step('validate elements in block ', async () => {
        await expect(howToStepsCarousel.image).toBeVisible();
        await expect(howToStepsCarousel.heading).toBeVisible();
        const heading = await howToStepsCarousel.heading.innerText();
        expect(heading.length).toBeTruthy();
        await expect(howToStepsCarousel.howToStepsCarousel).toBeVisible();
        await expect(howToStepsCarousel.tipNumbers).toBeVisible();
        await expect(howToStepsCarousel.tips).toBeVisible();
        const noOfTips = await howToStepsCarousel.tipNumber.count();

        for (let i = 0; i < noOfTips; i++) {
          await expect(howToStepsCarousel.tipNumber.nth(i)).toBeVisible();
          const text = await howToStepsCarousel.tipNumber.nth(i).innerText();
          expect(text.length).toBeTruthy();

          // Validate tip rotation
          const currentTip = await howToStepsCarousel.tipNumber.nth(i).getAttribute('class');
          if (currentTip.includes('active')) {
            await page.waitForTimeout(6000);
            await expect(howToStepsCarousel.tipNumber.nth(i)).not.toHaveClass(/active/);
          }
        }
      });
    });
  });
});
