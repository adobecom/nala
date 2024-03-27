import { expect, test } from '@playwright/test';
import { features } from '../../features/bacom/stats.spec.js';
import StatsBlock from '../../selectors/bacom/stats.page.js';

test.describe('BACOM Stats Block Test Suite', () => {
  test(
    `${features[0].name}, ${features[0].tags}`,
    async ({ page, baseURL }) => {
      const stats = new StatsBlock(page);
      const testPage = `${baseURL}${features[0].path}`;
      await page.goto(testPage);
      await page.waitForLoadState('networkidle');

      await test.step('Selecting a stats link', async () => {
        await stats.clickStatsLink();
        await expect(page.url()).not.toBe(testPage);
      });

      await test.step('Go to test page', async () => {
        await page.goto(testPage);
        await page.waitForLoadState('networkidle');
      });

      await test.step('Selecting a solutions link', async () => {
        await stats.clickSolutionsLink();
        await expect(page.url()).not.toBe(testPage);
      });
    },
  );
});
