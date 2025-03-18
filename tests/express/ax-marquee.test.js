/* eslint-disable no-plusplus */
import { expect, test } from '@playwright/test';
import { features } from '../../features/express/ax-marquee.spec.js';
import AxMarquee from '../../selectors/express/ax-marquee.page.js';

let axMarquee;

test.describe('ax-marquee test suite', () => {
  test.beforeEach(async ({ page }) => {
    axMarquee = new AxMarquee(page);
  });

  features[0].path.forEach((path) => {
    test(`${features[0].name}, path: ${path}, test marquee with button`, async ({ baseURL, page }) => {
      const testPage = `${baseURL}${path}`;
      await axMarquee.gotoURL(testPage);

      await test.step('validate elements in block', async () => {
        await page.waitForLoadState('domcontentloaded');
        await expect(axMarquee.axmarquee).toBeVisible();
        await expect(axMarquee.mainHeading).toBeVisible();
        const heading = await axMarquee.mainHeading.innerText();
        expect(heading.length).toBeTruthy();
        const paragraphCount = axMarquee.text.count();
        for (let i = 0; i < paragraphCount; i++) {
          await expect(axMarquee.text).nth(i).toBeVisible();
          const text = await axMarquee.text.nth(i).innerText();
          expect(text.length).toBeTruthy();
        }
        await expect(axMarquee.expressLogo).toBeVisible();
        await expect(axMarquee.ctaButton).toBeVisible();
      });

      await test.step('test button click', async () => {
        // Nonprofit page button points to external website.
        if (path === '/express/nonprofits') {
          const href = await axMarquee.ctaButton.getAttribute('href');
          if (href) {
            const response = await page.request.get(href);
            expect(response.status()).toEqual(200);
          }
        } else {
          await axMarquee.ctaButton.click();
          expect(page.url).not.toBe(testPage);
        }
      });
    });
  });

  features[1].path.forEach((path) => {
    test(`${features[1].name}, path: ${path}, test marquee with animation`, async ({ baseURL, page, browserName }) => {
      const testPage = `${baseURL}${path}`;
      await axMarquee.gotoURL(testPage);
      await page.waitForSelector('.ax-marquee .marquee-foreground');

      await test.step('validate elements in block ', async () => {
        await page.waitForLoadState('domcontentloaded');
        await expect(axMarquee.axmarquee).toBeVisible();
        await expect(axMarquee.mainHeading).toBeVisible();
        const heading = await axMarquee.mainHeading.innerText();
        expect(heading.length).toBeTruthy();
        const paragraphCount = axMarquee.text.count();
        for (let i = 0; i < paragraphCount; i++) {
          await expect(axMarquee.text).nth(i).toBeVisible();
          const text = await axMarquee.text.nth(i).innerText();
          expect(text.length).toBeTruthy();
        }
        await expect(axMarquee.expressLogo).toBeVisible();
        await expect(axMarquee.video).toBeVisible();
      });

      await test.step('validate elements in block ', async () => {
        // Animation not loading in Chrome for test script.
        if (browserName !== 'chromium') {
          await axMarquee.reduceMotionWrapper.waitFor(3000);
          await expect(axMarquee.reduceMotionPlayVideoBtn).not.toBeVisible();
          await expect(axMarquee.reduceMotionPauseVideoBtn).toBeVisible();
          await axMarquee.reduceMotionPauseVideoBtn.hover();
          await expect(axMarquee.reduceMotionPauseVideoTxt).toBeVisible();
          await axMarquee.reduceMotionPauseVideoBtn.click();
          await page.waitForLoadState();
          await expect(axMarquee.reduceMotionPlayVideoBtn).toBeVisible();
        }
      });
    });
  });
});
