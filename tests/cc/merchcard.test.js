import { expect, test } from '@playwright/test';
import { features } from '../../features/cc/merchcard.spec.js';
import Merchcard from '../../selectors/cc/merchcard.page.js';

let merchcard;
test.describe('verify merch card UI and its features' , () =>  {
test.beforeEach(async ({ page }) => {
merchcard = new Merchcard(page);
});
// Test merch card UI
test(`${features[0].name},${features[0].tags}`, async ({ page, baseURL }) => {
console.info(`[Test Page]: ${baseURL}${features[0].path}`);
await test.step('merch card UI elements check', async () => {
await page.goto(`${baseURL}${features[0].path}`);
await page.waitForLoadState('domcontentloaded');
await expect(page).toHaveURL(`${baseURL}${features[0].path}`);
});
await test.step('verify merch card UI and its section elements', async () => {
await page.waitForLoadState();  
expect(await merchcard.merchCard).toBeTruthy();
expect(await merchcard.merchProductTitle).toBeTruthy();
expect(await merchcard.meachBodyAppText).toBeTruthy();
expect(await merchcard.merchActionArea).toBeTruthy();
expect(await merchcard.merchFooterDiscription).toBeTruthy();
expect(await merchcard.merchFooerIcon).toBeTruthy();
expect(await merchcard.BestValueBadge).toBeTruthy();
});
});
// price, CTA buttons and its navigation to correct commerce pages
test(`${features[1].name},${features[1].tags}`, async ({ page, baseURL }) => {
console.info(`[Test Page]: ${baseURL}${features[1].path}`);
await test.step('free, buy CTAs with valid navigation', async () => {
await page.goto(`${baseURL}${features[1].path}`);
await page.waitForLoadState('domcontentloaded');
await expect(page).toHaveURL(`${baseURL}${features[1].path}`);
});
await test.step('free, buynow price cta should work as expected navigation', async () => {
await page.waitForLoadState();  
expect(await merchcard.merchBodyPrice).toBeTruthy();
expect(await merchcard.mercHeadPrice).toBeTruthy();
await merchcard.merchBuyNowCTA.click();
await expect(page).toHaveURL(/.*commerce.adobe.com/);
});
});
// merch card reference from fragment and all product listed prices are shown
test(`${features[2].name},${features[2].tags}`, async ({ page, baseURL }) => {
console.info(`[Test Page]: ${baseURL}${features[2].path}`);
await test.step('merch card should display when refenced from fragment', async () => {
await page.goto(`${baseURL}${features[2].path}`);
await page.waitForLoadState('domcontentloaded');
await expect(page).toHaveURL(`${baseURL}${features[2].path}`);
});
await test.step('all prices are showing in merch cards', async () => {
await page.waitForLoadState();  
expect (await merchcard.fragmentsection).toBeTruthy();
expect (await merchcard.ccAllappsPrice).toBeTruthy();
expect (await merchcard.ccOtherAppsPrice).toBeTruthy();
expect (await merchcard.ccPhotographyPrice).toBeTruthy();
expect (await merchcard.ccSingleApp).toBeTruthy();
expect (await merchcard.ccOfferPrice).toBeTruthy();
expect (await merchcard.ccBusinessSingleApp).toBeTruthy();
expect (await merchcard.ccBusinessAllApps).toBeTruthy();
});
});
});
