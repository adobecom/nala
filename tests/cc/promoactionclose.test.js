import { expect, test } from '@playwright/test';
import { features } from '../../features/cc/promocloseaction.spec.js';
import Promocloseaction from '../../selectors/cc/promocloseaction.page.js';

let promoaction;
test.describe('verify promo action bar with CTAs, close, stickiness features in page' , () =>  {
test.beforeEach(async ({ page }) => {
promoaction = new Promocloseaction(page);
});
// Test sticky promo bar shows up in page bottom when page loads
 test(`${features[0].name},${features[0].tags}`, async ({ page, baseURL }) => {
 console.info(`[Test Page]: ${baseURL}${features[0].path}`);
 await test.step('promo bar with close action shows up in page bottom when it loads', async () => {
 await page.goto(`${baseURL}${features[0].path}`);
 await page.waitForLoadState('domcontentloaded');
 await expect(page).toHaveURL(`${baseURL}${features[0].path}`);
 });
 await test.step('promo action with close at page botton with stickiness', async () => {
 await page.waitForLoadState();  
 expect(await promoaction.promoBar).toBeTruthy();
 expect(await promoaction.promoBarMobile).toBeTruthy();
 expect(await promoaction.promoBarTablet).toBeTruthy();
 expect(await promoaction.promoBarDesktop).toBeTruthy();
 expect(await promoaction.PromoText).toBeTruthy();
 expect(await promoaction.promoBackGroundImage).toBeTruthy();
 });
 });
 // Test promo bar closed when hit cross icon on it and promo disappear
 test(`${features[1].name},${features[1].tags}`, async ({ page, baseURL }) => {
 console.info(`[Test Page]: ${baseURL}${features[1].path}`);
 await test.step('Test promo bar closed when hit cross icon on it', async () => {
 await page.goto(`${baseURL}${features[1].path}`);
 await page.waitForLoadState('domcontentloaded');
 await expect(page).toHaveURL(`${baseURL}${features[1].path}`);
 });
 await test.step('Test promo bar closed when hit cross icon on it and disappear in page', async () => {
 await page.waitForLoadState();  
 await promoaction.promoClose.click();
 expect(await promoaction.promoNotSticky).toBeTruthy();
 });
 });
 // Test promo bar CTAs navigates valid urls
 test(`${features[2].name},${features[2].tags}`, async ({ page, baseURL }) => {
 console.info(`[Test Page]: ${baseURL}${features[2].path}`);
 const expectedUrl = features[2].url;
 await test.step('sticky promo bar CTAs are working', async () => {
 await page.goto(`${baseURL}${features[2].path}`);
 await page.waitForLoadState('domcontentloaded');
 await expect(page).toHaveURL(`${baseURL}${features[2].path}`);
 });
 await test.step('promo bar CTAs naviagate to valid destination', async () => {
 await page.waitForLoadState();  
 await promoaction.promoCTA.click();
 await expect(page).toHaveURL(expectedUrl);
 });
 });
});
