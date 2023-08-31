import { expect, test } from '@playwright/test';
import { features } from '../../features/milo/iframe.block.spec.js';
import IframeBlock from '../../selectors/milo/iframe.block.page.js';

test.describe('Iframe Block test suite', () => {
  // Aside Small Checks:
  test(`${features[0].name}, ${features[0].tags}`, async ({ page, baseURL }) => {
    const Iframe = new IframeBlock(page);
    console.info(`[Test Page]: ${baseURL}${features[0].path}`);

    await test.step('Navigate to page with Iframe block', async () => {
      await page.goto(`${baseURL}${features[0].path}${features[0].browserParams}`);
      await page.waitForLoadState('domcontentloaded');
      await expect(page).toHaveURL(`${baseURL}${features[0].path}${features[0].browserParams}`);
    });

    await test.step('Validate Iframe block content', async () => {
      await expect(Iframe.miloIframeContainer).toBeVisible();
      await expect(Iframe.iframeContainer).toBeVisible();
    });
  });
});
