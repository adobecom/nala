import { expect, test } from '@playwright/test';
import { Stats } from '../../selectors/bacom/stats.page.js';

const StatsSpec = require('../../features/bacom/stats.spec.js');

const { features } = StatsSpec;

test.describe('BACOM Stats Block Test Suite', () => {
  test(
    `${features[0].name}, @bacom-live, ${features[0].tags}, https://bacom.adobe.com`,
    async ({ page, baseURL }) => {
      const stats = new Stats(page);
      const testPage = `${baseURL}${features[0].path}`;

      await test.step('Selecting a stats link', async () => {
        await page.goto(testPage);
        await page.waitForLoadState('domcontentloaded');
        await stats.clickStatsLink();
        expect(page.url()).not.toBe(testPage);
      });

      await test.step('Selecting a solutions link', async () => {
        await page.goto(testPage);
        await page.waitForLoadState('domcontentloaded');
        await stats.clickSolutionsLink();
        expect(page.url()).not.toBe(testPage);
      });
    },
  );
});
