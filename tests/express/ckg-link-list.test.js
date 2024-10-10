import { expect, test } from '@playwright/test';
import { WebUtil } from '../../libs/webutil.js';
import { features } from '../../features/express/ckg-link-list.spec.js';
import CLL from '../../selectors/express/ckg-link-list.page.js';

let webUtil;
let cll;

test.describe('Ckg Link List Block Test Suite', () => {
  // before each test block
  test.beforeEach(async ({ page }) => {
    webUtil = new WebUtil(page);
    cll = new CLL(page);
  });

  // Test - 0
  test(`${features[0].name},${features[0].tags}`, async ({ page, baseURL }) => {
    console.info(`${baseURL}${features[0].path}`);
    // test step-1
    await test.step('Go to CLL block test page', async () => {
      await page.goto(`${baseURL}${features[0].path}`);
      await page.waitForLoadState('domcontentloaded');
      await expect(page).toHaveURL(`${baseURL}${features[0].path}`);
      await page.waitForTimeout(5000);
    });

    // test step-2
    await test.step('Verify block UI ', async () => {
      await page.waitForLoadState();
      await expect(cll.ckgLinkList).toBeVisible();
      const totalCards = await cll.pill.count();
      expect(totalCards).toBeTruthy();
    });
  });
});
