import { expect, test } from '@playwright/test';
import { features } from '../../features/milo/htmlextn.spec.js';

const envList = require('../../envs/envs.js');

test.describe('Milo Html Extension feature test suite', () => {
  // Test 0 : Html Extension validation for bacom
  test(`${features[0].name},${features[0].tags}`, async ({ page, browserName }) => {
    const paths = features[0].path;
    const env = features[0].envs;

    if (browserName === 'chromium') {
      test.skip('Skipping test for Chrome browser : net::ERR_HTTP2_PROTOCOL_ERROR.');
    }

    await test.step('step-1: Go to test page urls and verify .html', async () => {
      for (const path of paths) {
        console.info('[Test Page]\n:', `${envList[env]}${path}`);

        const url = envList[env] + path;
        await page.goto(url);
        await page.waitForLoadState('networkidle');

        if (!page.url().match(/@blog/) && (page.url().match(/customer-success-stories/))) {
          expect(page.url()).toContain('.html');
        } else {
          await expect(page).toHaveURL(url);
        }
      }
    });
  });

  // Test 1 : Html Extension validation for blog
  test(`${features[1].name},${features[1].tags}`, async ({ page }) => {
    const paths = features[1].path;
    const env = features[1].envs;

    await test.step('step-1: Go to test page urls and verify .html', async () => {
      for (const path of paths) {
        console.info('[Test Page]\n:', `${envList[env]}${path}`);

        const url = envList[env] + path;
        await page.goto(url);
        await page.waitForLoadState('networkidle');
        
        if (!page.url().match(/@blog/) && (page.url().match(/customer-success-stories/))) {
          expect(page.url()).toContain('.html');
        } else {
          await expect(page).toHaveURL(url);
        }
      }
    });
  });
});
