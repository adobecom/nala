import { expect, test } from '@playwright/test';
import { features } from '../../features/cc/FFGallery.spec.js';
import FFGallery from '../../selectors/cc/FFGallery.page.js';

let ffgallery;
test.describe('firefly integration', () => {
  test.beforeEach(async ({ page }) => {
    ffgallery = new FFGallery(page);
  });
  test(`${features[0].name},${features[0].tags}`, async ({ page, baseURL }) => {
    console.info(`[Test Page]: ${baseURL}${features[0].path}`);
    await test.step('Firefly gallery block User Interface', async () => {
      await page.goto(`${baseURL}${features[0].path}`);
      await page.waitForLoadState('domcontentloaded');
      await expect(page).toHaveURL(`${baseURL}${features[0].path}`);
    });
    await test.step('Firefly gallery block User Interface checks', async () => {
      expect(await ffgallery.FFGalleryBlock).toBeTruthy();
      expect(await ffgallery.FFGalleryContent).toBeTruthy();
      expect(await ffgallery.gridBlock_design).toBeTruthy();
    });
  });

  test(`${features[1].name},${features[1].tags}`, async ({ page, baseURL }) => {
    console.info(`[Test Page]: ${baseURL}${features[1].path}`);
    await test.step('Check the gallry cards', async () => {
      await page.goto(`${baseURL}${features[1].path}`);
      await page.waitForLoadState('domcontentloaded');
      await expect(page).toHaveURL(`${baseURL}${features[1].path}`);
    });
    await test.step('gallery cards check', async () => {
      expect(await ffgallery.grid_TallCards).toBeTruthy();
      expect(await ffgallery.grid_ShortCards).toBeTruthy();
      expect(await ffgallery.imageAuthorInfoSection).toBeTruthy();
      expect(await ffgallery.imageAuthorName).toBeTruthy();
      expect(await ffgallery.imageDisplayInCard).toBeTruthy();
      expect(await ffgallery.imageHoverText).toBeTruthy();
      expect(await ffgallery.imagePromptText).toBeTruthy();
    });
  });

  test(`${features[2].name},${features[2].tags}`, async ({ page, baseURL }) => {
    console.info(`[Test Page]: ${baseURL}${features[2].path}`);
    await test.step('click view is navigating user to FF product page', async () => {
      await page.goto(`${baseURL}${features[2].path}`);
      await page.waitForLoadState('domcontentloaded');
      await expect(page).toHaveURL(`${baseURL}${features[2].path}`);
    });
    await test.step('user select card and navigated to product', async () => {
      await ffgallery.cardViewCTA.click();
      expect(await ffgallery.cardNavigationToProductPage).toBeTruthy();
    });
  });

  test(`${features[3].name},${features[3].tags}`, async ({ page, baseURL }) => {
    console.info(`[Test Page]: ${baseURL}${features[3].path}`);
    console.info('page tested', page.url());
    await test.step('API call check to get the cards', async () => {
      await ffgallery.verifyGalleryApiCallOnPageLoad(`${baseURL}${features[3].path}`, 10000);
    });
  });
});
