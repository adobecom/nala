import { expect, test } from '@playwright/test';
import { features } from '../../features/cc/fragmentreference.spec.js';
import Fragments from '../../selectors/cc/fragmentreference.page.js';

let fragment;
test.describe('verify fragment references are working in CC pages' , () =>  {
test.beforeEach(async ({ page }) => {
fragment = new Fragments(page);
});
// Check fragments are referenced and shows in CC pages
test(`${features[0].name},${features[0].tags}`, async ({ page, baseURL }) => {
console.info(`[Test Page]: ${baseURL}${features[0].path}`);
await test.step('fragment reference display in cc home page', async () => {
await page.goto(`${baseURL}${features[0].path}`);
await page.waitForLoadState('domcontentloaded');
await expect(page).toHaveURL(`${baseURL}${features[0].path}`);
});
await test.step('fragment shows up in page from its reference', async () => {
await page.waitForLoadState();  
expect(await fragment.pageFragment).toBeTruthy();
expect(await fragment.fragmentHeading).toBeTruthy();
expect(await fragment.fragmentSection).toBeTruthy();
expect(await fragment.fragmentProduct1).toBeTruthy();
expect(await fragment.fragmentProduct2).toBeTruthy();
expect(await fragment.fragmentProduct3).toBeTruthy();
});
});
});

