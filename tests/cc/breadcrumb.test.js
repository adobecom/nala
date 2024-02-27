import { expect, test } from '@playwright/test';
import { features } from '../../features/cc/breadcrumb.spec.js';
import Breadcrumb from '../../selectors/cc/breadcrumb.page.js';

let breadcrumb;
test.describe('verify breadcrumb showing up with authored levels and each link navigates to respective page' , () =>  {
test.beforeEach(async ({ page }) => {
breadcrumb = new Breadcrumb(page);
});
// check the breadcrumb showup in page with all levels of links
test(`${features[0].name},${features[0].tags}`, async ({ page, baseURL }) => {
console.info(`[Test Page]: ${baseURL}${features[0].path}`);
await test.step('breadcrumb display with all levels in page', async () => {
await page.goto(`${baseURL}${features[0].path}`);
await page.waitForLoadState('domcontentloaded');
await expect(page).toHaveURL(`${baseURL}${features[0].path}`);
});
await test.step('breadcrumb showup in page with links', async () => {
await page.waitForLoadState();  
expect(await breadcrumb.breadCrumbSection).toBeTruthy();
expect(await breadcrumb.breadCrumbFirstLevel).toBeTruthy();
expect(await breadcrumb.breadCrumbSecondLevel).toBeTruthy();
expect(await breadcrumb.breadCrumbThirdLevel).toBeTruthy();
expect(await breadcrumb.currentPageIndicator).toBeTruthy();
});
});
// check the breadcrumb first level link is clickable and goes to valid page
test(`${features[1].name},${features[1].tags}`, async ({ page, baseURL }) => {
console.info(`[Test Page]: ${baseURL}${features[1].path}`);
const url = features[1].url;
await test.step('breadcrumb first level link clickable and goes to destination page', async () => {
await page.goto(`${baseURL}${features[1].path}`);
await page.waitForLoadState('domcontentloaded');
await expect(page).toHaveURL(`${baseURL}${features[1].path}`);
});
await test.step('breadcrumb first level link clickable and goes to destination', async () => {
await page.waitForLoadState();  
expect(await breadcrumb.breadCrumbSection).toBeTruthy();
await breadcrumb.firstLevelLink.click();
await expect(page).toHaveURL(url);
});
});
// check the breadcrumb page parent link is clickable and goes to valid page
test(`${features[2].name},${features[2].tags}`, async ({ page, baseURL }) => {
console.info(`[Test Page]: ${baseURL}${features[1].path}`);
const url = features[2].url;
await test.step('breadcrumb page parent clickable and goes to correct destination page', async () => {
await page.goto(`${baseURL}${features[1].path}`);
await page.waitForLoadState('domcontentloaded');
await expect(page).toHaveURL(`${baseURL}${features[1].path}`);
});
await test.step('breadcrumb patent link clickable and goes correct destination', async () => {
await page.waitForLoadState();  
expect(await breadcrumb.breadCrumbSection).toBeTruthy();
await breadcrumb.pageParentLink.click();
await expect(page).toHaveURL(url);
});
});
});
