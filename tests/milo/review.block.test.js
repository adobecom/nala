/* eslint-disable max-len */
/* eslint-disable import/named */
/* eslint-disable no-unused-vars */
/* eslint-disable import/extensions */
import { expect, test } from '@playwright/test';
import Review from '../../selectors/milo/review.block.page.js';
import * as ReviewSpec from '../../features/milo/review.block.spec.js';

const { features } = ReviewSpec;
let review;

test.describe('Milo Review Block test suite', () => {
  test.beforeEach(async ({ page, browser }) => {
    // review block requires clearing cookies
    const context = await browser.newContext();
    await context.clearCookies();
    review = new Review(page);
  });

  // Test - 0
  test(`${features[0].name},${features[0].tags}`, async ({ page, baseURL }) => {
    console.info(`[MiloInfo] Checking page: ${baseURL}${features[0].path}`);

    // test step-1
    await test.step('Go to review feature test page', async () => {
      await page.goto(`${baseURL}${features[0].path}`);
      await page.waitForLoadState('domcontentloaded');
      await expect(page).toHaveURL(`${baseURL}${features[0].path}`);
    });

    // test step-2
    await test.step('Verify review block and submit the review < 3', async () => {
      const { data } = features[0];
      expect(await review.verifyReview(data)).toBeTruthy();
      expect(await review.submitReview(data)).toBeTruthy();
    });
  });

  // Test - 1
  test(`${features[1].name},${features[1].tags}`, async ({ page, baseURL }) => {
    console.info(`[MiloInfo] Checking page: ${baseURL}${features[1].path}`);

    // test step-1
    await test.step('Go to review block test page', async () => {
      await page.goto(`${baseURL}${features[1].path}`);
      await page.waitForLoadState('domcontentloaded');
      await expect(page).toHaveURL(`${baseURL}${features[1].path}`);
    });

    // test step-2
    await test.step('Verify review block and submit the review > 3', async () => {
      const { data } = features[1];
      expect(await review.verifyReview(data)).toBeTruthy();
      expect(await review.submitReview(data)).toBeTruthy();
    });
  });
});
