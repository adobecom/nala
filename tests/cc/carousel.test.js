import { expect, test } from '@playwright/test';
import { features } from '../../features/cc/carousel.spec.js';
import Carousel from '../../selectors/cc/carousel.page.js';

let carousel;
test.describe('verify carousel showing up with authored and navigations are working', () => {
  test.beforeEach(async ({ page }) => {
    carousel = new Carousel(page);
  });

  test(`${features[0].name},${features[0].tags}`, async ({ page, baseURL }) => {
    console.info(`[Test Page]: ${baseURL}${features[0].path}`);
    await test.step('check carousel UI elements page', async () => {
      await page.goto(`${baseURL}${features[0].path}`);
      await page.waitForLoadState('domcontentloaded');
      await expect(page).toHaveURL(`${baseURL}${features[0].path}`);
    });
    await test.step('all carousel UI elements showup', async () => {
      await page.waitForLoadState();
      expect(await carousel.carouselContainer).toBeTruthy();
      expect(await carousel.carouselCenterSlideActive).toBeTruthy();
      expect(await carousel.carouselActiveImage).toBeTruthy();
      expect(await carousel.carouselTileText).toBeTruthy();
      expect(await carousel.carouselButtonContainer).toBeTruthy();
      expect(await carousel.carouselButtonLeft).toBeTruthy();
      expect(await carousel.carouselButtonRight).toBeTruthy();
      expect(await carousel.carouselIndicators).toBeTruthy();
      expect(await carousel.carouselFirstCard_default).toBeTruthy(); 
    });
  });

  // check the carousel left navigation button is clickable and goes to valid card
  test(`${features[1].name},${features[1].tags}`, async ({ page, baseURL }) => {
    console.info(`[Test Page]: ${baseURL}${features[1].path}`);
    await test.step('carousel left navigation button is clickable and goes to destination card', async () => {
      await page.goto(`${baseURL}${features[1].path}`);
      await page.waitForLoadState('domcontentloaded');
      await expect(page).toHaveURL(`${baseURL}${features[1].path}`);
    });
    await test.step('carousel left navigation button is clickable and goes to destination', async () => {
      await page.waitForLoadState();
      expect(await carousel.carouselContainer).toBeTruthy();
      expect(await carousel.carouselButtonLeft).toBeTruthy();
      await carousel.carouselButtonLeft.click();
      await page.waitForTimeout(2000);
      expect(await carousel.carouselCenterSlideActive).toBeTruthy();
      expect(await carousel.carouselCard_load3).toBeTruthy();
    });
  });

  // check the breadcrumb page parent link is clickable and goes to valid page
  test(`${features[2].name},${features[2].tags}`, async ({ page, baseURL }) => {
    console.info(`[Test Page]: ${baseURL}${features[1].path}`);
    await test.step('carousel right navigation button is clickable and goes to destination card', async () => {
      await page.goto(`${baseURL}${features[1].path}`);
      await page.waitForLoadState('domcontentloaded');
      await expect(page).toHaveURL(`${baseURL}${features[1].path}`);
    });
    await test.step('carousel right navigation button is clickable and goes to destination card', async () => {
      await page.waitForLoadState();
      expect(await carousel.carouselContainer).toBeTruthy();
      expect(await carousel.carouselButtonRight).toBeTruthy();
      await carousel.carouselButtonRight.click();
      await page.waitForTimeout(2000);
      expect(await carousel.carouselCard_load2).toBeTruthy();
    });
  });
});
