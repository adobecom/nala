/* eslint-disable no-plusplus */
import { expect, test } from '@playwright/test';
import { features } from '../../features/express/image-list.spec.js';
import ImageList from '../../selectors/express/image-list.page.js';

let imageList;

test.describe('Image List Block Test Suite', () => {
  // before each test block
  test.beforeEach(async ({ page }) => {
    imageList = new ImageList(page);
  });

  test(`${features[0].name},${features[0].tags}`, async ({ page, baseURL }) => {
    console.info(`${baseURL}${features[0].path}`);

    await test.step('Go to Image List block test page', async () => {
      await page.goto(`${baseURL}${features[0].path}`);
      await page.waitForLoadState('domcontentloaded');
      await expect(page).toHaveURL(`${baseURL}${features[0].path}`);
      await page.waitForTimeout(3000);
    });

    await test.step('Verify block displayed ', async () => {
      await page.waitForLoadState();
      await expect(imageList.imageListXSmall).toBeVisible();
    });
  });

  test(`${features[1].name},${features[1].tags}`, async ({ page, baseURL }) => {
    console.info(`${baseURL}${features[1].path}`);

    await test.step('Go to Image List block test page', async () => {
      await page.goto(`${baseURL}${features[1].path}`);
      await page.waitForLoadState('domcontentloaded');
      await expect(page).toHaveURL(`${baseURL}${features[1].path}`);
      await page.waitForTimeout(3000);
    });

    await test.step('Verify block displayed ', async () => {
      await page.waitForLoadState();
      await expect(imageList.imageListSmall).toBeVisible();
    });
  });

  test(`${features[2].name},${features[2].tags}`, async ({ page, baseURL }) => {
    console.info(`${baseURL}${features[2].path}`);

    await test.step('Go to Image List block test page', async () => {
      await page.goto(`${baseURL}${features[2].path}`);
      await page.waitForLoadState('domcontentloaded');
      await expect(page).toHaveURL(`${baseURL}${features[2].path}`);
      await page.waitForTimeout(3000);
    });

    await test.step('Verify block displayed ', async () => {
      await page.waitForLoadState();
      await expect(imageList.imageList).toBeVisible();
    });
  });

  test(`${features[3].name},${features[3].tags}`, async ({ page, baseURL }) => {
    console.info(`${baseURL}${features[3].path}`);

    await test.step('Go to Image List block test page', async () => {
      await page.goto(`${baseURL}${features[3].path}`);
      await page.waitForLoadState('domcontentloaded');
      await expect(page).toHaveURL(`${baseURL}${features[3].path}`);
      await page.waitForTimeout(3000);
    });

    await test.step('Verify block displayed ', async () => {
      await page.waitForLoadState();
      await expect(imageList.imageListLarge).toBeVisible();
    });
  });

  test(`${features[4].name},${features[4].tags}`, async ({ page, baseURL }) => {
    console.info(`${baseURL}${features[4].path}`);

    await test.step('Go to Image List block test page', async () => {
      await page.goto(`${baseURL}${features[4].path}`);
      await page.waitForLoadState('domcontentloaded');
      await expect(page).toHaveURL(`${baseURL}${features[4].path}`);
      await page.waitForTimeout(3000);
    });

    await test.step('Verify block displayed ', async () => {
      await page.waitForLoadState();
      await expect(imageList.imageListXLarge).toBeVisible();
    });
  });
});
