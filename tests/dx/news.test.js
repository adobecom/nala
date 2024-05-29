import { test, expect } from '@playwright/test';

const News = require('../../features/dx/news.spec.js');

const { features } = News;

test.describe('Validate news page for public users', () => {
  // Test - MWPW-137796
  test(`${features[0].name},${features[0].tags}`, async ({ page, baseURL }) => {
    console.info(`${baseURL}${features[0].path}`);

    // test step-1
    await test.step('Go to News page', async () => {
      await page.goto(`${baseURL}${features[0].path}`);
      await expect(page).toHaveURL(`${baseURL}${features[0].path}`);
    });
  });
});
