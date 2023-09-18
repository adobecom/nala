/* eslint-disable import/named */
/* eslint-disable no-await-in-loop */
/* eslint-disable import/extensions */
import { expect, test } from '@playwright/test';
import { features } from '../../features/feds/placeholders.spec.js';
import { WebUtil } from '../../libs/webutil.js';

test.describe('Placeholders Test Suite', () => {
  // Milo Placeholders:
  test.describe(`${features[0].name}`, () => {
    (features[0].path).forEach((placeholderUrl, index) => {
      test(`${features[0].name}-${index}, ${features[0].envs}, ${features[0].tags}`, async ({ page, baseURL }) => {
        console.info(`[FEDSInfo] Checking page: ${baseURL}${placeholderUrl}`);

        await test.step('Navigate to targeted placeholders page', async () => {
          await page.goto(`${baseURL}${placeholderUrl}`);
          // Wait for page to load & stabilize:
          await page.waitForLoadState('networkidle');
          // Check the expected URL was loaded:
          await expect(page).toHaveURL(`${baseURL}${placeholderUrl}`);
        });

        await test.step('Analyze retrieved Milo placeholders', async () => {
          const placeholderData = await WebUtil.loadTestDataFromAPI(baseURL, placeholderUrl);
          console.info(`[Placeholders]: ${JSON.stringify(placeholderData)}`);
          // Check placeholders 'data' length:
          if (placeholderData.total === 0) {
            expect(placeholderData.data).toEqual([]);
          } else {
            expect(placeholderData.data.length).toEqual(placeholderData.total);
            // Check placeholders 'data' content:
            placeholderData.data.forEach((entryObj) => {
              expect(entryObj, `[Placeholders] Checking if ${JSON.stringify(entryObj)} entry has 'key' attribute`).toHaveProperty('key');
              expect(entryObj, `[Placeholders] Checking if ${JSON.stringify(entryObj)} entry has 'value' attribute`).toHaveProperty('value');
            });
          }
        });
      });
    });
  });

  // FEDS Placeholders:
  test.describe(`${features[1].name}`, () => {
    (features[1].path).forEach((placeholderUrl, index) => {
      test(`${features[1].name}-${index}, ${features[1].envs}, ${features[1].tags}`, async ({ page, baseURL }) => {
        console.info(`[FEDSInfo] Checking page: ${baseURL}${placeholderUrl}${features[1].browserParams}`);

        await test.step('Navigate to targeted placeholders page', async () => {
          await page.goto(`${baseURL}${placeholderUrl}${features[1].browserParams}`);
          // Wait for page to load & stabilize:
          await page.waitForLoadState('networkidle');
          // Check the expected URL was loaded:
          await expect(page).toHaveURL(`${baseURL}${placeholderUrl}${features[1].browserParams}`);
        });

        await test.step('Analyze retrieved FEDS placeholders', async () => {
          const placeholderData = await WebUtil.loadTestDataFromAPI(baseURL, placeholderUrl);
          console.info(`[Placeholders]: ${JSON.stringify(placeholderData)}`);
          // Check placeholders 'data' length:
          if (placeholderData.total === 0) {
            expect(placeholderData.data).toEqual([]);
          } else {
            expect(placeholderData.data.length).toEqual(placeholderData.total);
            // Check placeholders 'data' content:
            placeholderData.data.forEach((entryObj) => {
              expect(entryObj, `[Placeholders] Checking if ${JSON.stringify(entryObj)} entry has 'key' attribute`).toHaveProperty('key');
              expect(entryObj, `[Placeholders] Checking if ${JSON.stringify(entryObj)} entry has 'value' attribute`).toHaveProperty('value');
            });
          }
        });
      });
    });
  });
});
