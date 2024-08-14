import { expect, test } from '@playwright/test';
import { features } from '../../features/cc/merchtable.spec.js';
import Merchtable from '../../selectors/cc/merchtable.page.js';

let merchtable;
test.describe('verify merch table colum layout, headings, CSS styles, images rendering, price CTAs' , () =>  {
  test.beforeEach(async ({ page }) => {
  merchtable = new Merchtable(page);
  });
  // Test merch table block to be shown 3 column layout when placed on page
  test(`${features[0].name},${features[0].tags}`, async ({ page, baseURL }) => {
  console.info(`[Test Page]: ${baseURL}${features[0].path}`);
  await test.step('merch table should have 3 column layout when authored', async () => {
  await page.goto(`${baseURL}${features[0].path}`);
  await page.waitForLoadState('domcontentloaded');
  await expect(page).toHaveURL(`${baseURL}${features[0].path}`);
  });
  await test.step('step-2: 3 columns should showup with memonics', async () => {
  await page.waitForLoadState();  
  expect(await merchtable.merchTableSection).toBeTruthy();
  expect(await merchtable.firstColumn).toBeTruthy();
  expect(await merchtable.secondColumn).toBeTruthy();
  expect(await merchtable.thirdColumn).toBeTruthy();
  expect(await merchtable.productMnemonics).toBeTruthy();
  });
  });

  // Test merch table first row in the 3 column has heading
  test(`${features[1].name},${features[1].tags}`, async ({ page, baseURL }) => {
  console.info(`[Test Page]: ${baseURL}${features[1].path}`);
  await test.step('merch table first row in the 3 column has product headings', async () => {
  await page.goto(`${baseURL}${features[1].path}`);
  await page.waitForLoadState('domcontentloaded');
  await expect(page).toHaveURL(`${baseURL}${features[1].path}`);
  });
  await test.step('step-2: 3 columns first row is head column', async () => {
  await page.waitForLoadState();  
  expect(await merchtable.fixedColumnheading).toBeTruthy();
  expect(await merchtable.firstColumnHeading).toBeTruthy();
  expect(await merchtable.secondColumnHeading).toBeTruthy();
  expect(await merchtable.thirdColumnHeading).toBeTruthy();
  });
  });

  // Test merch table column heading showing valid prodcut price with CTAs
  test(`${features[2].name},${features[2].tags}`, async ({ page, baseURL }) => {
  console.info(`[Test Page]: ${baseURL}${features[2].path}`);
  const { data } = features[2];
  await test.step('merch table column heading has valid product prices and CTAs', async () => {
  await page.goto(`${baseURL}${features[2].path}`);
  await page.waitForLoadState('domcontentloaded');
  await expect(page).toHaveURL(`${baseURL}${features[2].path}`);
  });
  await test.step('step-2: product price checks with CTAs', async () => {
  await page.waitForLoadState();  
  await expect(merchtable.freeTrialBtn).toBeVisible();
  await expect(merchtable.buyNowBtn).toBeVisible();
  await expect(merchtable.ccIndividaulProductPrice).toContainText(data.ccIndividualPrice);
  await expect(merchtable.ccStudentProductPrice).toContainText(data.ccStudentPrice);
  await expect(merchtable.ccTeamsProductPrice).toContainText(data.ccTeamsprice);  
  });
  });

  // Test merch table app details rows in each product column 
  test(`${features[3].name},${features[3].tags}`, async ({ page, baseURL }) => {
  console.info(`[Test Page]: ${baseURL}${features[3].path}`);
  await test.step('merch table had product details in each column', async () => {
  await page.goto(`${baseURL}${features[3].path}`);
  await page.waitForLoadState('domcontentloaded');
  await expect(page).toHaveURL(`${baseURL}${features[3].path}`);
  });
  await test.step('step-2: apps display in the colums as list', async () => {
  await page.waitForLoadState();  
  expect(await merchtable.appPhotoshop).toBeTruthy();
  expect(await merchtable.appFresco).toBeTruthy();
  expect(await merchtable.appPhotoshopExpress).toBeTruthy();
  });
  });

  // Test buynow navigates to commerce page 
  test(`${features[4].name},${features[4].tags}`, async ({ page, baseURL }) => {
  console.info(`[Test Page]: ${baseURL}${features[4].path}`);
  const url = features[4].commerceurl;
  await test.step('merch table had product details in each column', async () => {
  await page.goto(`${baseURL}${features[4].path}`);
  await page.waitForLoadState('domcontentloaded');
  await expect(page).toHaveURL(`${baseURL}${features[4].path}`);
  });
  await test.step('step-2: CTA go to commerce page', async () => {
  await page.waitForLoadState();  
  await expect(merchtable.buyNowBtn).toBeVisible();
  await merchtable.buyNowBtn.click();
  await page.waitForTimeout(1000);
  await expect(page).toHaveURL(url);
  });
  });
});
