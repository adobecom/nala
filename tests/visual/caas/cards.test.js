/* eslint-disable import/named */
import { test } from '@playwright/test';
import { features } from '../../../features/visual/caas/cards.spec.js';
import { takeTwoAndCompare } from '../../../libs/visualutil.js';

const folderPath = 'screenshots/caas';

test.describe('Milo Caas block visual comparison test suite', () => {
  // eslint-disable-next-line no-restricted-syntax
  for (const feature of features) {
    // eslint-disable-next-line no-loop-func
    test(`${feature.name},${feature.tags}`, async ({ page, baseURL }, testInfo) => {
      const result = await takeTwoAndCompare(
        page,
        baseURL + feature.stable,
        async () => { await page.waitForTimeout(3000); },
        baseURL + feature.beta,
        async () => { await page.waitForTimeout(3000); },
        folderPath,
        `${feature.name}-${testInfo.project.name}`,
      );
      console.log(result);
    });
  }
});
