/* eslint-disable import/named */
import { test } from '@playwright/test';
import { features } from '../../../features/visual/milo/milo.spec.js';
import { takeOne } from '../../../libs/visualutil.js';

const folderPath = 'screenshots/milo';

test.describe('Milo blocks visual comparison test suite', () => {
  // eslint-disable-next-line no-restricted-syntax
  for (const feature of features) {
    // eslint-disable-next-line no-loop-func
    test(`${feature.name},${feature.tags}`, async ({ page, baseURL }, testInfo) => {
      const result = await takeOne(
        page,
        baseURL + feature.path,
        async () => { await page.waitForSelector('.feds-footer-privacyLink'); },
        folderPath,
        `${feature.name}-${testInfo.project.name}`,
      );
      console.log(result);
    });
  }
});
