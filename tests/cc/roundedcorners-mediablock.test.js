import { expect, test } from '@playwright/test';
import { WebUtil } from '../../libs/webutil.js';
import { features } from '../../features/cc/roundedcorners-mediablock.spec.js';
import Mediaroundcorners from '../../selectors/cc/roundedcorners-mediablock.page.js';

let roundcorners;
test.describe('verify media rounder corners features for media block and its images' , () =>  {
test.beforeEach(async ({ page }) => {
roundcorners = new Mediaroundcorners(page);
});
// test 4x corner style for image in media block
 test(`${features[0].name},${features[0].tags}`, async ({ page, baseURL }) => {
 console.info(`[Test Page]: ${baseURL}${features[0].path}`);
 await test.step('media block image with small 4x rounded corners', async () => {
 await page.goto(`${baseURL}${features[0].path}`);
 await page.waitForLoadState('domcontentloaded');
 await expect(page).toHaveURL(`${baseURL}${features[0].path}`);
 });
 await test.step('media block image with small 4x rounded corners style', async () => {
 await page.waitForLoadState();  
 expect (await roundcorners.mediaRoundedCornerImageGroup).toBeTruthy();
 expect (await roundcorners.image_SmallRoundedCorners).toBeTruthy();
 expect (await WebUtil.verifyCSS(roundcorners.image_SmallRoundedCorners, roundcorners.cssProperties['smallRoundedCorners'])).toBeTruthy();
 });
 });
 // test medium 8x styling corner style for image in media block
 test(`${features[1].name},${features[1].tags}`, async ({ page, baseURL }) => {
 console.info(`[Test Page]: ${baseURL}${features[1].path}`);
 await test.step('media block image with medium 8x rounded corners', async () => {
 await page.goto(`${baseURL}${features[1].path}`);
 await page.waitForLoadState('domcontentloaded');
 await expect(page).toHaveURL(`${baseURL}${features[1].path}`);
 });
 await test.step('media block image with Medium 8x rounded corners style', async () => {
 await page.waitForLoadState(); 
 expect (await roundcorners.mediaRoundedCornerImageGroup).toBeTruthy(); 
 expect (await roundcorners.image_MediumRoundedCorners).toBeTruthy();
 expect (await WebUtil.verifyCSS(roundcorners.image_MediumRoundedCorners, roundcorners.cssProperties['mediumRoundedCorners'])).toBeTruthy();
 });
 });
 // test large styling corner style for image in media block
 test(`${features[2].name},${features[2].tags}`, async ({ page, baseURL }) => {
 console.info(`[Test Page]: ${baseURL}${features[2].path}`);
 await test.step('media block image with large 16x rounded corners', async () => {
 await page.goto(`${baseURL}${features[2].path}`);
 await page.waitForLoadState('domcontentloaded');
 await expect(page).toHaveURL(`${baseURL}${features[2].path}`);
 });
 await test.step('media block image with large 16x rounded corners style', async () => {
 await page.waitForLoadState();  
 expect (await roundcorners.mediaRoundedCornerImageGroup).toBeTruthy();
 expect (await roundcorners.image_LargeRoundedCorners).toBeTruthy();
 expect (await WebUtil.verifyCSS(roundcorners.image_LargeRoundedCorners, roundcorners.cssProperties['largeRoundedCorners'])).toBeTruthy();
 });
 });
 // test large styling corner style for media block
 test(`${features[3].name},${features[3].tags}`, async ({ page, baseURL }) => {
 console.info(`[Test Page]: ${baseURL}${features[3].path}`);
 await test.step('media block with large 16x rounded corners', async () => {
 await page.goto(`${baseURL}${features[3].path}`);
 await page.waitForLoadState('domcontentloaded');
 await expect(page).toHaveURL(`${baseURL}${features[3].path}`);
 });
 await test.step('media block with large 16x rounded corners style', async () => {
 await page.waitForLoadState();  
 expect (await roundcorners.mediaRoundedBlockGroup).toBeTruthy();
 expect (await roundcorners.firstMediaBlock).toBeTruthy();
 expect (await WebUtil.verifyCSS(roundcorners.firstMediaBlock, roundcorners.cssProperties['largeRoundedCorners'])).toBeTruthy();
 });
 });
 // test medium corner style for media block and small corner style for image within block
 test(`${features[4].name},${features[4].tags}`, async ({ page, baseURL }) => {
 console.info(`[Test Page]: ${baseURL}${features[4].path}`);
 await test.step('medium corner style for media block and small corner style for image within block', async () => {
 await page.goto(`${baseURL}${features[4].path}`);
 await page.waitForLoadState('domcontentloaded');
 await expect(page).toHaveURL(`${baseURL}${features[4].path}`);
 });
 await test.step('medium corner style for media block & small corner style for image within block', async () => {
 await page.waitForLoadState();  
 expect (await roundcorners.mediaRoundedBlockGroup).toBeTruthy();
 expect (await roundcorners.secondMediaBlock).toBeTruthy();
 expect (await WebUtil.verifyCSS(roundcorners.secondMediaBlock, roundcorners.cssProperties['mediumRoundedCorners'])).toBeTruthy();
 expect (await WebUtil.verifyCSS(roundcorners.imageWithInBlock, roundcorners.cssProperties['smallRoundedCorners'])).toBeTruthy();
 });
 });
 // test full rounded style for block
 test(`${features[5].name},${features[5].tags}`, async ({ page, baseURL }) => {
 console.info(`[Test Page]: ${baseURL}${features[5].path}`);
 await test.step('complete rounded coner style for block', async () => {
 await page.goto(`${baseURL}${features[5].path}`);
 await page.waitForLoadState('domcontentloaded');
 await expect(page).toHaveURL(`${baseURL}${features[5].path}`);
 });
 await test.step('full rounded coner style for block', async () => {
 await page.waitForLoadState();  
 expect (await roundcorners.fullRoundedCornersBlock).toBeTruthy();
 expect (await WebUtil.verifyCSS(roundcorners.fullRoundedcornerimage, roundcorners.cssProperties['fullRoundedCorners'])).toBeTruthy();
 });
 });
});
