/* eslint-disable no-plusplus */
import { expect, test } from '@playwright/test';
import { features } from '../../features/express/image-list.spec.js';
import ImageList from '../../selectors/express/image-list.page.js';

let imageList;
const prodHomePage = 'https://www.adobe.com/express/';

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

    await test.step('On click, goes to homepage ', async () => {
      await page.waitForLoadState();
      await imageList.imageListXSmall.click();
      await expect(page).toHaveURL(`${prodHomePage}`);
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

    await test.step('On click, goes to homepage ', async () => {
      await page.waitForLoadState();
      await imageList.imageListSmall.click();
      await expect(page).toHaveURL(`${prodHomePage}`);
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

    await test.step('On click, goes to homepage ', async () => {
      await page.waitForLoadState();
      await imageList.imageList.click();
      await expect(page).toHaveURL(`${prodHomePage}`);
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

    await test.step('On click, goes to homepage ', async () => {
      await page.waitForLoadState();
      await imageList.imageListLarge.click();
      await expect(page).toHaveURL(`${prodHomePage}`);
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

    await test.step('On click, goes to homepage ', async () => {
      await page.waitForLoadState();
      await imageList.imageListXLarge.click();
      await expect(page).toHaveURL(`${prodHomePage}`);
    });
  });
});
