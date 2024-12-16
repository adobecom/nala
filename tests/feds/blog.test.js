import { expect, test } from '@playwright/test';
import { features } from '../../features/feds/prodSanity/blog.spec.js';
import BlogSanity from '../../selectors/feds/feds.blog.page.js';

test.describe('Test Suite for Blog Page Components', () => {
  let blog;

  test.beforeEach(async ({ page }) => {
    blog = new BlogSanity(page);
  });

  test.afterEach(async ({ page }) => {
    await page.close();
  });

  test(`${features[0].name}, ${features[0].tags}, ${features[0].country}`, async ({ page, baseURL }) => {
    console.info(`[Blog.Adobe.com] Checking Page: United States = ${baseURL}${features[0].path}`);

    const pageURL = `${baseURL}${features[0].path}`;
    await page.goto(pageURL, { waitUntil: 'networkidle' });
    await expect(page).toHaveURL(pageURL);

    await blog.validatingUSPage();
    await page.waitForLoadState('domcontentloaded');
    await expect(page).toHaveURL(`${baseURL}${features[1].path}`);
    console.log('Navigated Page URL:', page.url());
  });

  test(`${features[1].name}, ${features[1].tags}, ${features[1].country}`, async ({ page, baseURL }) => {
    console.info(`[Blog.Adobe.com] Checking Page: United States = ${baseURL}${features[1].path}`);

    const pageURL = `${baseURL}${features[1].path}`;
    await page.goto(pageURL, { waitUntil: 'networkidle' });
    await expect(page).toHaveURL(pageURL);

    await blog.validatingJPPage();
    await page.waitForLoadState('domcontentloaded');
    await expect(page).toHaveURL(`${baseURL}${features[0].path}`);
    console.log('Navigated Page URL:', page.url());
  });
});
