import { expect, test } from '@playwright/test';
import { features } from '../../features/cc/jarvis.spec.js';
import Jarvis from '../../selectors/cc/jarvis.page.js';

let jarvis;
test.describe('verify Jarvis presence CC pages', () => {
  test.beforeEach(async ({ page }) => {
    jarvis = new Jarvis(page);
  });
  test(`${features[0].name},${features[0].tags}`, async ({ page, baseURL }) => {
    console.info(`[Test Page]: ${baseURL}${features[0].path}`);
    await test.step('Jarvis logo shows in page', async () => {
      await page.goto(`${baseURL}${features[0].path}`);
      await page.waitForLoadState('domcontentloaded');
      await expect(page).toHaveURL(`${baseURL}${features[0].path}`);
    });
    await test.step('Jarvis logo shows in page', async () => {
      await page.waitForLoadState();
      // Javis has delay from its libraty, so wait is required here
      await page.waitForTimeout(6000);
      expect(await jarvis.jarvisFeature).toBeTruthy();
    });
  });
  test(`${features[1].name},${features[1].tags}`, async ({ page, baseURL }) => {
    console.info(`[Test Page]: ${baseURL}${features[1].path}`);
    await test.step('Jarvis logo shows in page', async () => {
      await page.goto(`${baseURL}${features[1].path}`);
      await page.waitForLoadState('domcontentloaded');
      await expect(page).toHaveURL(`${baseURL}${features[1].path}`);
    });
    await test.step('Jarvis logo shows in page', async () => {
      await page.waitForLoadState();
      // Javis has delay from its libraty, so wait is required here
      await page.waitForTimeout(6000);
      await jarvis.jarvisFeature.click();
      expect(await jarvis.enableExpandChat).toBeTruthy();
    });
  });
});
