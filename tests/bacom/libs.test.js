import { expect, test } from '@playwright/test';
import fs from 'fs';
import { features } from '../../features/bacom/libs.spec.js';

const authFile = './tests/bacom/.auth/user.json';
let context;
let page;

test.describe('Libs test suite', () => {
  test.beforeAll(async ({ browser, browserName, headless }) => {
    test.skip(browserName !== 'chromium', "Don't need to run on multiple browsers.");

    const options = fs.existsSync(authFile) ? { storageState: authFile } : {};
    context = await browser.newContext(options);
    page = await context.newPage();
    await page.goto('https://main--bacom--adobecom.hlx.page/');

    if (Object.keys(options).length === 0 && !headless) {
      console.log('authFile is empty. Update the authFile by logging into Okta manually and waiting 2 mins.');
      test.setTimeout(1000 * 60 * 3);
      await page.waitForTimeout(1000 * 60 * 2);
    }

    await page.waitForLoadState('networkidle');
    await context.storageState({ path: authFile });
  });

  features[0].mapping.forEach((mapping) => {
    const url = mapping[0];
    const expectedLibs = mapping[1];

    test(`Checking libs on ${url}`, { tag: '@libs' }, async () => {
      let libs;

      await page.route('**/libs/**', (route) => {
        if (route.request().url().includes('/libs/utils/utils.js')) {
          [libs] = route.request().url().split('/utils/');
          route.abort();
        } else {
          route.continue();
        }
      });

      await page.goto(url);
      await page.waitForLoadState('networkidle');

      await expect(libs).toBe(expectedLibs);
    });
  });
});
