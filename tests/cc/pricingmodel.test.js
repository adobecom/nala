import { expect, test } from '@playwright/test';
import { features } from '../../features/cc/pricingmodel.spec.js';
import Pricemodel from '../../selectors/cc/pricingmodel.page.js';

let pricemodel;
test.describe('verify merch card UI and its features', () => {
  test.beforeEach(async ({ page }) => {
    pricemodel = new Pricemodel(page);
  });
  // Test pricing Model
  test(`${features[0].name},${features[0].tags}`, async ({ page, baseURL }) => {
    console.info(`[Test Page]: ${baseURL}${features[0].path}`);
    await test.step('merch card UI elements check', async () => {
      await page.goto(`${baseURL}${features[0].path}`);
      await page.waitForLoadState('domcontentloaded');
      await expect(page).toHaveURL(`${baseURL}${features[0].path}`);
    });
    await test.step('Verify pricing model loads , UI tabs and close funtionw works', async () => {
      await page.waitForLoadState();
      expect(await pricemodel.startFreeTrialCTA).toBeTruthy();
      await pricemodel.startFreeTrialCTA.click();
      await page.waitForTimeout(4000);
      expect(await pricemodel.ModelWindow).toBeTruthy();
      expect(await pricemodel.ModelWindow.isVisible()).toBeTruthy();
      expect(await pricemodel.modelHeading).toBeTruthy();
      expect(await pricemodel.tablist).toBeTruthy();
      expect(await pricemodel.individualTab).toBeTruthy();
      expect(await pricemodel.businessTab).toBeTruthy();
      expect(await pricemodel.educationTab).toBeTruthy();
      expect(await pricemodel.sslTransactionIndicator).toBeTruthy();
      expect(await pricemodel.modelClose).toBeTruthy();
      await pricemodel.modelClose.click();
      await page.waitForTimeout(2000);
      expect(await pricemodel.ModelWindow.isVisible()).toBeFalsy();
    });
  });

  test(`${features[1].name},${features[1].tags}`, async ({ page, baseURL }) => {
    console.info(`[Test Page]: ${baseURL}${features[1].path}`);
    await test.step('merch card UI elements check', async () => {
      await page.goto(`${baseURL}${features[1].path}`);
      await page.waitForLoadState('domcontentloaded');
      await expect(page).toHaveURL(`${baseURL}${features[1].path}`);
    });
    await test.step('Verify pricing model loads in CTA click', async () => {
      await page.waitForLoadState();
      expect(await pricemodel.startFreeTrialCTA).toBeTruthy();
      await pricemodel.startFreeTrialCTA.click();
      await page.waitForTimeout(5000);
      expect(await pricemodel.ModelWindow).toBeTruthy();
      expect(await pricemodel.ModelWindow.isVisible()).toBeTruthy();
      expect(await pricemodel.modelHeading).toBeTruthy();
      expect(await pricemodel.tablist).toBeTruthy();
      expect(await pricemodel.individualTab).toBeTruthy();
      expect(await pricemodel.businessTab).toBeTruthy();
      expect(await pricemodel.educationTab).toBeTruthy();
    });
  });
});
