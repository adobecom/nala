import { expect, test } from '@playwright/test';
import { features } from '../../features/milo/media.block.spec.js';
import MediaBlock from '../../selectors/milo/media.block.page.js';

let media;

test.describe('Milo Media Block test suite', () => {
  test.beforeEach(async ({ page }) => {
    media = new MediaBlock(page);
  });

  test(`${features[0].name},${features[0].tags}`, async ({ page, baseURL }) => {
    console.info(`[Test Page]: ${baseURL}${features[0].path}`);

    await test.step('step-1: Go to Media (small) block test page', async () => {
      await page.goto(`${baseURL}${features[0].path}`);
      await page.waitForLoadState('domcontentloaded');
      await expect(page).toHaveURL(`${baseURL}${features[0].path}`);
    });

    await test.step('step-2: Verify media (small) block specs', async () => {
      const { data } = features[0];
      expect(await media.verifyMedia('media (small)', data)).toBeTruthy();
    });
  });

  test(`${features[1].name},${features[1].tags}`, async ({ page, baseURL }) => {
    console.info(`[Test Page]: ${baseURL}${features[1].path}`);

    await test.step('step-1: Go to media block test page', async () => {
      await page.goto(`${baseURL}${features[1].path}`);
      await page.waitForLoadState('domcontentloaded');
      await expect(page).toHaveURL(`${baseURL}${features[1].path}`);
    });

    await test.step('step-2: Verify media block specs', async () => {
      const { data } = features[1];
      expect(await media.verifyMedia('media', data)).toBeTruthy();
    });
  });

  test(`${features[2].name},${features[2].tags}`, async ({ page, baseURL }) => {
    console.info(`[Test Page]: ${baseURL}${features[2].path}`);

    await test.step('step-1: Go to media block test page', async () => {
      await page.goto(`${baseURL}${features[2].path}`);
      await page.waitForLoadState('domcontentloaded');
      await expect(page).toHaveURL(`${baseURL}${features[2].path}`);
    });

    await test.step('step-2: Verify media block specs', async () => {
      const { data } = features[2];
      expect(await media.verifyMedia('media (large, dark)', data)).toBeTruthy();
    });
  });
});
