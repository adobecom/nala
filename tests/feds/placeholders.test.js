/* eslint-disable import/named */
/* eslint-disable no-await-in-loop */
/* eslint-disable import/extensions */
import { expect, test } from '@playwright/test';
import { features } from '../../features/feds/placeholders.spec.js';

test.describe(`${features[0].name}`, () => {
  (features[0].path).forEach((placeholderUrl, index) => {
    test(`${features[0].name}-${index}, ${features[0].envs}, ${features[0].tags}`, async ({ page, baseURL }) => {
      console.info(`[FEDSInfo] Checking page: ${baseURL}${placeholderUrl}${features[0].browserParams}`);

      await test.step('Navigate to targeted placeholders page', async () => {
        await page.goto(`${baseURL}${placeholderUrl}${features[0].browserParams}`);
        // Wait for page to load & stabilize:
        await page.waitForLoadState('networkidle');
        // Check the expected URL was loaded:
        await expect(page).toHaveURL(`${baseURL}${placeholderUrl}${features[0].browserParams}`);
      });

      await test.step('Analyze placeholders retrieved from page', async () => {

      });
    });
  });
});
