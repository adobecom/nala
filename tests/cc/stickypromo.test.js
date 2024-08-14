import { expect, test } from '@playwright/test';
import { features } from '../../features/cc/stickypromo.spec.js';
import Stickypromo from '../../selectors/cc/stickypromo.page.js';

let stickypromo;
test.describe('verify sticky promo feature woring, scroll feature, CTAs working features' , () =>  {
test.beforeEach(async ({ page }) => {
stickypromo = new Stickypromo(page);
});
// Test sticky promo bar shows up in page bottom when it loads
 test(`${features[0].name},${features[0].tags}`, async ({ page, baseURL }) => {
 console.info(`[Test Page]: ${baseURL}${features[0].path}`);
 await test.step('sticky promo bar shows up in page bottom when it loads', async () => {
 await page.goto(`${baseURL}${features[0].path}`);
 await page.waitForLoadState('domcontentloaded');
 await expect(page).toHaveURL(`${baseURL}${features[0].path}`);
 });
 await test.step('sticky promo displayed in page bottom', async () => {
 await page.waitForLoadState();  
 expect(await stickypromo.stickyPromoSection).toBeTruthy();
 expect(await stickypromo.asideBlockStickiness).toBeTruthy();
 expect(await stickypromo.bodyActionArea).toBeTruthy();
 expect(await stickypromo.freeTrialButton).toBeTruthy();
 expect(await stickypromo.buyNowButton).toBeTruthy();
 });
 });
 // Test sticky promo bar shows up when page is scroll down 
 test(`${features[1].name},${features[1].tags}`, async ({ page, baseURL }) => {
 console.info(`[Test Page]: ${baseURL}${features[1].path}`);
 await test.step('sticky promo bar shows and sustain in page when scroll down and up', async () => {
 await page.goto(`${baseURL}${features[1].path}`);
 await page.waitForLoadState('domcontentloaded');
 await expect(page).toHaveURL(`${baseURL}${features[1].path}`);
 });
 await test.step('sticky promo displayed in page bottom always even page scroll down', async () => {
 await page.waitForLoadState();  
 await stickypromo.jumpLink.click();
 expect(await stickypromo.stickyPromoSection).toBeTruthy();
 expect(await stickypromo.asideBlockStickiness).toBeTruthy();
 expect(await stickypromo.bodyActionArea).toBeTruthy();
 });
 });
 // Test sticky promo bar CTAs navigates to commerce pages
 test(`${features[2].name},${features[2].tags}`, async ({ page, baseURL }) => {
 console.info(`[Test Page]: ${baseURL}${features[2].path}`);
 const { data } = features[2];
 await test.step('sticky promo bar CTAs are working', async () => {
 await page.goto(`${baseURL}${features[2].path}`);
 await page.waitForLoadState('domcontentloaded');
 await expect(page).toHaveURL(`${baseURL}${features[2].path}`);
 });
 await test.step('sticky promo bar CTAs naviagate to valid destination', async () => {
 await page.waitForLoadState();  
 await stickypromo.buyNowButton.click();
 await expect(page).toHaveURL(data.buynowurl);
 });
 });
});
