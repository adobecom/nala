/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
/* eslint-disable import/extensions */
/* eslint-disable import/named */
import { expect, test } from '@playwright/test';
import { WebUtil } from '../../libs/webutil';
import { HowTo } from '../../selectors/milo/howto.block.page';
import * as HowToSpec from '../../features/milo/howto.block.spec';

const { features } = HowToSpec;
let howTo;
let webUtil;

test.describe('Milo HowTo block test suite', () => {
  test.beforeEach(async ({ page }) => {
    webUtil = new WebUtil(page);
    howTo = new HowTo(page);
  });

  // Test - 1
  test(`${features[0].name},${features[0].tags}`, async ({ page, baseURL }) => {
    console.info(`[MiloInfo] Checking page: ${baseURL}${features[0].path}`);

    // test step-1
    await test.step('Go to HowTo block test page', async () => {
      await page.goto(`${baseURL}${features[0].path}`);
      await page.waitForLoadState('domcontentloaded');
      await expect(page).toHaveURL(`${baseURL}${features[0].path}`);
    });

    // test step-2
    await test.step('Verify HowTo specs', async () => {
      // verify HowTo and its content are visibility
      expect(await howTo.verifyHowTo('how-to', 4)).toBeTruthy();
    });
  });

  // Test - 2
  test(`${features[1].name},${features[1].tags}`, async ({ page, baseURL }) => {
    console.info(`[MiloInfo] Checking page: ${baseURL}${features[1].path}`);

    // test step-1
    await test.step('Go to HowTo large block test page', async () => {
      await page.goto(`${baseURL}${features[1].path}`);
      await page.waitForLoadState('domcontentloaded');
      await expect(page).toHaveURL(`${baseURL}${features[1].path}`);
    });

    // test step-2
    await test.step('Verify HowTo large specs', async () => {
      // verify HowTo large and its content are visibility
      expect(await howTo.verifyHowTo('how-to (large)', 4)).toBeTruthy();
    });
  });

  // Test - 3
  test(`${features[2].name},${features[2].tags}`, async ({ page, baseURL }) => {
    console.info(`[MiloInfo] Checking page: ${baseURL}${features[2].path}`);

    // test step-1
    await test.step('Go to HowTo SEO block test page', async () => {
      await page.goto(`${baseURL}${features[2].path}`);
      await page.waitForLoadState('domcontentloaded');
      await expect(page).toHaveURL(`${baseURL}${features[2].path}`);
    });

    // test step-2
    await test.step('Verify HowTo SEO specs', async () => {
      // verify HowTo SEO and its content are visibility
      expect(await howTo.verifyHowTo('how-to (seo)', 4)).toBeTruthy();
    });
  });
});
