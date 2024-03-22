import { expect, test } from '@playwright/test';
import { features } from '../../features/cc/cchometabs.spec.js';
import Tabsfeature from '../../selectors/cc/cchometabs.page.js';

let tabs;
test.describe('verify the tabs UI and funcationality in CC home page' , () =>  {
test.beforeEach(async ({ page }) => {
tabs = new Tabsfeature(page);
});
// check the tabs shows up with authored tab names in its container
test(`${features[0].name},${features[0].tags}`, async ({ page, baseURL }) => {
console.info(`[Test Page]: ${baseURL}${features[0].path}`);
await test.step('tabs display in cc home page', async () => {
await page.goto(`${baseURL}${features[0].path}`);
await page.waitForLoadState('domcontentloaded');
await expect(page).toHaveURL(`${baseURL}${features[0].path}`);
});
await test.step('tabs shows up with authored tabs in cc home page', async () => {
await page.waitForLoadState();  
expect(await tabs.tabsBlock).toBeTruthy();
expect(await tabs.tabsList).toBeTruthy();
expect(await tabs.firstTab).toBeTruthy();
expect(await tabs.secondTab).toBeTruthy();
expect(await tabs.thirdTab).toBeTruthy();
expect(await tabs.fourthTab).toBeTruthy();
});
});
// check tabs showup with default first tab enabled
test(`${features[1].name},${features[1].tags}`, async ({ page, baseURL }) => {
console.info(`[Test Page]: ${baseURL}${features[1].path}`);
await test.step('tabs container defalut select first tab', async () => {
await page.goto(`${baseURL}${features[1].path}`);
await page.waitForLoadState('domcontentloaded');
await expect(page).toHaveURL(`${baseURL}${features[1].path}`);
});
await test.step('under tabs container defalut select first tab', async () => {
await page.waitForLoadState();  
expect(await tabs.tabsBlock).toBeTruthy();
expect(await tabs.tabsList).toBeTruthy();
expect(await tabs.defaultSelectedTab).toBeTruthy();
});
});
// switching feature between tabs working
test(`${features[2].name},${features[2].tags}`, async ({ page, baseURL }) => {
console.info(`[Test Page]: ${baseURL}${features[1].path}`);
await test.step('switching feature between tabs working', async () => {
await page.goto(`${baseURL}${features[1].path}`);
await page.waitForLoadState('domcontentloaded');
await expect(page).toHaveURL(`${baseURL}${features[1].path}`);
});
await test.step('switching feature between tabs working as expected', async () => {
await page.waitForLoadState();  
expect(await tabs.tabsBlock).toBeTruthy();
expect(await tabs.tabsList).toBeTruthy();
expect(await tabs.firstBodyHeading).toBeTruthy();
await tabs.secondTab.click();
expect(await tabs.secondBodyHeading).toBeTruthy();
await tabs.thirdTab.click();
expect(await tabs.thirdBodyHeading).toBeTruthy();
await tabs.fourthTab.click();
expect(await tabs.firstBodyHeading).toBeTruthy();
});
});
// switching feature between tabs working
test(`${features[3].name},${features[3].tags}`, async ({ page, baseURL }) => {
console.info(`[Test Page]: ${baseURL}${features[3].path}`);
await test.step('switching feature between tabs working', async () => {
await page.goto(`${baseURL}${features[3].path}`);
await page.waitForLoadState('domcontentloaded');
await expect(page).toHaveURL(`${baseURL}${features[3].path}`);
});
await test.step('switching feature between tabs working as expected', async () => {
await page.waitForLoadState();  
expect(await tabs.tabsList).toBeTruthy();
await tabs.thirdTab.click();
expect(await tabs.thirdTabContent).toBeTruthy();
await tabs.firstTab.click();
expect(await tabs.firstTabContent).toBeTruthy();
});
});
});
