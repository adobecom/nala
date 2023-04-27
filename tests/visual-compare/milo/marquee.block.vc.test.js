/* eslint-disable import/named */
/* eslint-disable no-await-in-loop */
import { expect, test } from '@playwright/test';
import { WebUtil } from '../../../libs/webutil.js';

const MarqueeSpec = require('../../../features/visual-compare/milo/marquee.block.spec.js');

const { features } = MarqueeSpec;

// Global declarations
let webUtil;

test.describe('Milo Marquee block visual comparison test suite', () => {
  // before each test block
  test.beforeEach(async ({ page }) => {
    webUtil = new WebUtil(page);
  });

  // Test - 1
  test(`${features[0].name},${features[0].tags}`, async ({ page, baseURL }) => {
    console.info(`${baseURL}${features[0].path}`);
    // test step-1
    await test.step('Go to Marquee Variations block test page', async () => {
      await page.goto(`${baseURL}${features[0].path}`);
      await page.waitForLoadState('domcontentloaded');
      await expect(page).toHaveURL(`${baseURL}${features[0].path}`);
    });

    // test step-2
    await test.step('Compare base UI image against current UI screenshot', async () => {
      // Added scrolling for lazy loaded images to initiate their load.
      await webUtil.scrollPage('down', 'slow');
      await webUtil.scrollPage('up', 'fast');
      // Compare the base screenshot against a newly taken screenshot for equality
      // If no base screenshot image is available for comparison create one.
      await expect(page).toHaveScreenshot(`marquee_${baseURL}${features[0].path}.png`, { fullPage: true, timeout: 30000 });
    });
  });
});
