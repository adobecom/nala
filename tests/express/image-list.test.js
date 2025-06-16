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
    const testPage = `${baseURL}${features[0].path}`;
    await page.goto(testPage);
    await expect(imageList.globalFooter).toBeVisible();

    await test.step('Verify block displayed ', async () => {
      await expect(imageList.imageListXSmall).toBeVisible();
    });

    await test.step('Test image click ', async () => {
      await imageList.imageListXSmall.click();
      expect(page.url).not.toBe(testPage);
    });
  });

  test(`${features[1].name},${features[1].tags}`, async ({ page, baseURL }) => {
    console.info(`${baseURL}${features[1].path}`);
    const testPage = `${baseURL}${features[1].path}`;
    await page.goto(testPage);
    await expect(imageList.globalFooter).toBeVisible();

    await test.step('Verify block displayed ', async () => {
      await expect(imageList.imageListSmall).toBeVisible();
    });

    await test.step('Test image click ', async () => {
      await page.waitForLoadState();
      await imageList.imageListSmall.click();
      expect(page.url).not.toBe(testPage);
    });
  });

  test(`${features[2].name},${features[2].tags}`, async ({ page, baseURL }) => {
    console.info(`${baseURL}${features[2].path}`);
    const testPage = `${baseURL}${features[2].path}`;
    await page.goto(testPage);
    await expect(imageList.globalFooter).toBeVisible();

    await test.step('Verify block displayed ', async () => {
      await expect(imageList.imageList).toBeVisible();
    });

    await test.step('Test image click ', async () => {
      await imageList.imageList.click();
      expect(page.url).not.toBe(testPage);
    });
  });

  test(`${features[3].name},${features[3].tags}`, async ({ page, baseURL }) => {
    console.info(`${baseURL}${features[3].path}`);
    const testPage = `${baseURL}${features[3].path}`;
    await page.goto(testPage);
    await expect(imageList.globalFooter).toBeVisible();

    await test.step('Verify block displayed ', async () => {
      await expect(imageList.imageListLarge).toBeVisible();
    });

    await test.step('Test image click ', async () => {
      await imageList.imageListLarge.click();
      expect(page.url).not.toBe(testPage);
    });
  });

  test(`${features[4].name},${features[4].tags}`, async ({ page, baseURL }) => {
    console.info(`${baseURL}${features[4].path}`);
    const testPage = `${baseURL}${features[4].path}`;
    await page.goto(testPage);
    await expect(imageList.globalFooter).toBeVisible();

    await test.step('Verify block displayed ', async () => {
      await expect(imageList.imageListXLarge).toBeVisible();
    });

    await test.step('Test image click ', async () => {
      await imageList.imageListXLarge.click();
      expect(page.url).not.toBe(testPage);
    });
  });
});
