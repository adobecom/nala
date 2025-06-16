import { expect, test } from '@playwright/test';
import { features } from '../../features/cc/seocanonical.spec.js';
import Seo from '../../selectors/cc/seocanonical.page.js';

test.describe('canonical link presence in CC pages', () => {
  test(`${features[0].name}, ${features[0].tags}`, async ({ page, baseURL }) => {
    console.info(`[Test Page]: ${baseURL}${features[0].path}`);
    const seo = new Seo(page);

    await test.step('step-1: Navigate to CC page', async () => {
      await page.goto(`${baseURL}${features[0].path}`);
      await page.waitForLoadState('networkidle');
      await expect(page).toHaveURL(`${baseURL}${features[0].path}`);
    });

    await test.step('step-2: Check canonocal link presence in page DOM', async () => {
      seo.checkPage();
    });
  });
});

test.describe('canonical link presence in PS pages', () => {
  test(`${features[1].name}, ${features[1].tags}`, async ({ page, baseURL }) => {
    console.info(`[Test Page]: ${baseURL}${features[1].path}`);
    const seo = new Seo(page);
    await test.step('step-1: Navigate to PS page', async () => {
      await page.goto(`${baseURL}${features[1].path}`);
      await page.waitForLoadState('networkidle');
      await expect(page).toHaveURL(`${baseURL}${features[1].path}`);
    });

    await test.step('step-2: Check canonocal link presence in page DOM', async () => {
      seo.checkPage();
    });
  });
});
