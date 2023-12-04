/* eslint-disable import/named */
import { features } from '../../features/visual-compare/caas/cards.block.spec.js';
import { WebUtil } from '../../libs/webutil.js';

const { test } = require('@playwright/test');

// Global declarations
let webUtil;

test.describe('Milo Caas block visual comparison test suite', () => {
  // before each test block
  test.beforeEach(async ({ page }) => {
    webUtil = new WebUtil(page);
  });

  // eslint-disable-next-line no-restricted-syntax
  for (const feature of features) {
    // eslint-disable-next-line no-loop-func
    test(`${feature.name},${feature.tags}`, async ({ page, baseURL }) => {
      const folderPath = 'screenshots/caas';
      // eslint-disable-next-line max-len
      await webUtil.takeScreenshotAndCompare(baseURL + feature.stable, async () => { await page.waitForTimeout(3000); }, baseURL + feature.beta, async () => { await page.waitForTimeout(3000); }, folderPath, feature.name);
    });
  }
});
