/* eslint-disable import/named */
import { expect, test } from '@playwright/test';
import { features } from '../../features/visual-compare/milo/columns.block.spec.js';
import { WebUtil } from '../../libs/webutil.js';

// Global declarations
let webUtil;

test.describe('Milo Column block visual comparison test suite', () => {
  // before each test block
  test.beforeEach(async ({ page }) => {
    webUtil = new WebUtil(page);
  });

  test(`${features[0].name},${features[0].tags}`, async ({ page, baseURL }) => {
    console.info(`[Test Page]: ${baseURL}${features[0].path}`);

    await test.step('step-1: Go to Column Variation block test page', async () => {
      await page.goto(`${baseURL}${features[0].path}`);
      await page.waitForLoadState('domcontentloaded');
      await expect(page).toHaveURL(`${baseURL}${features[0].path}`);
    });

    await test.step('step-2: Compare base UI image against current UI screenshot', async () => {
      // Added scrolling for lazy loaded images to initiate their load.
      await webUtil.scrollPage('down', 'slow');
      await webUtil.scrollPage('up', 'fast');
      // Compare the base screenshot against a newly taken screenshot for equality
      // If no base screenshot image is available for comparison create one.
      await expect(page).toHaveScreenshot(`columns_${baseURL}${features[0].path}.png`, { fullPage: true, timeout: 30000 });
    });
  });
});
