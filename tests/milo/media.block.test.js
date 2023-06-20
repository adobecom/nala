/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
/* eslint-disable import/extensions */
/* eslint-disable import/named */
import { expect, test } from '@playwright/test';
import { Media } from '../../selectors/milo/media.block.page';
import * as MediaSpec from '../../features/milo/media.block.spec';

const { features } = MediaSpec;
let media;

test.describe('Milo Media Block test suite', () => {
  test.beforeEach(async ({ page }) => {
    media = new Media(page);
  });

  // Test - 1
  test(`${features[0].name},${features[0].tags}`, async ({ page, baseURL }) => {
    console.info(`[MiloInfo] Checking page: ${baseURL}${features[0].path}`);

    // test step-1
    await test.step('Go to Media (small) block test page', async () => {
      await page.goto(`${baseURL}${features[0].path}`);
      await page.waitForLoadState('domcontentloaded');
      await expect(page).toHaveURL(`${baseURL}${features[0].path}`);
    });

    // test step-2
    await test.step('Verify media (small) block specs', async () => {
      // verify Media and its content are visibility
      expect(await media.verifyMedia('media (small)')).toBeTruthy();
    });
  });

  // Test - 2
  test(`${features[1].name},${features[1].tags}`, async ({ page, baseURL }) => {
    console.info(`[MiloInfo] Checking page: ${baseURL}${features[1].path}`);

    // test step-1
    await test.step('Go to media block test page', async () => {
      await page.goto(`${baseURL}${features[1].path}`);
      await page.waitForLoadState('domcontentloaded');
      await expect(page).toHaveURL(`${baseURL}${features[1].path}`);
    });

    // test step-2
    await test.step('Verify media block specs', async () => {
      // verify Media and its content are visibility
      expect(await media.verifyMedia('media')).toBeTruthy();
    });
  });

  // Test - 3
  test(`${features[2].name},${features[2].tags}`, async ({ page, baseURL }) => {
    console.info(`[MiloInfo] Checking page: ${baseURL}${features[2].path}`);

    // test step-1
    await test.step('Go to media block test page', async () => {
      await page.goto(`${baseURL}${features[2].path}`);
      await page.waitForLoadState('domcontentloaded');
      await expect(page).toHaveURL(`${baseURL}${features[2].path}`);
    });

    // test step-2
    await test.step('Verify media block specs', async () => {
      // verify Media (large, dark) and its content are visibility
      expect(await media.verifyMedia('media (large, dark)')).toBeTruthy();
    });
  });
});
