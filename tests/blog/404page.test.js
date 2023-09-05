import { expect, test } from '@playwright/test';
import { features } from '../../features/blog/404page.spec.js';
import Fragment from '../../selectors/blog/404.page.js';

let fragment;

test.describe('Blog Home page test suite', () => {
  test.beforeEach(async ({ page }) => {
    fragment = new Fragment(page);
  });

  test(`${features[0].name},${features[0].tags}`, async ({ page, baseURL }) => {
    console.info(`[Test Page]: ${baseURL}${features[0].path}`);

    await test.step('step-1: Go to Blog 404 page', async () => {
      await page.goto(`${baseURL}${features[0].path}`);
      await page.waitForLoadState('domcontentloaded');
      await expect(page).toHaveURL(`${baseURL}${features[0].path}`);
      await expect(page).toHaveTitle('404');
    });

    await test.step('step-2: Verify 404 content', async () => {
      const { data } = features[0];
      await expect(fragment.header1Text).toBeVisible();
      await expect(fragment.header1Text).toContainText(data.h1Text);
    });

  });
});
