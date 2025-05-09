import { expect, test } from '@playwright/test';
import { features } from '../../features/cc/inlinevideo.spec.js';
import Inlinevideo from '../../selectors/cc/inlinevideo.page.js';

let inlinevideo;
test.describe('product pages have inline videos', () => {
  test.beforeEach(async ({ page }) => {
    inlinevideo = new Inlinevideo(page);
  });
  test(`${features[0].name},${features[0].tags}`, async ({ page, baseURL }) => {
    console.info(`[Test Page]: ${baseURL}${features[0].path}`);
    await test.step('Jarvis logo shows in page', async () => {
      await page.goto(`${baseURL}${features[0].path}`);
      await page.waitForLoadState('domcontentloaded');
      await expect(page).toHaveURL(`${baseURL}${features[0].path}`);
    });
    await test.step('inline video present in product page and playing by default page loads', async () => {
      await page.waitForLoadState();
      expect(await inlinevideo.inlineVideoFeature).toBeTruthy();
      expect(await inlinevideo.inlineVideo_Default_Play).toBeTruthy();
    });
  });
  test(`${features[1].name},${features[1].tags}`, async ({ page, baseURL }) => {
    console.info(`[Test Page]: ${baseURL}${features[1].path}`);
    await test.step('check video pause feature working', async () => {
      await page.goto(`${baseURL}${features[1].path}`);
      await page.waitForLoadState('domcontentloaded');
      await expect(page).toHaveURL(`${baseURL}${features[1].path}`);
    });
    await test.step('Jarvis logo shows in page', async () => {
      await page.waitForLoadState();
      expect(await inlinevideo.inlineVideoFeature).toBeTruthy();
      await inlinevideo.inlineButtonCTA.click();
      expect(await inlinevideo.inlineVideo_Pause).toBeTruthy();
    });
  });
});
