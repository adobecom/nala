import { expect, test } from '@playwright/test';
import { features } from '../../features/express/important-pages.spec.js';

test.describe('Verify pages are up', () => {
  for (const path of features[0].path) {
    test(`${features[0].name},${path} ${features[0].tags}`, async ({ page, baseURL }) => {
      await test.step('Verify response', async () => {
        const response = await page.goto(`${baseURL}${path}`, { waitUntil: 'domcontentloaded' });
        const statusCode = response.status();
        expect.soft(statusCode).toBe(200);
        console.info(`HTTP Status Code: ${statusCode}`);
      });
    });
  }
});
