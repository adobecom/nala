/* eslint-disable max-len */
/* eslint-disable import/named */
/* eslint-disable no-unused-vars */
/* eslint-disable import/extensions */
import { expect, test } from '@playwright/test';
import { Text } from '../../selectors/milo/text.block.page';
import * as TextSpec from '../../features/milo/text.block.spec';

const { features } = TextSpec;
let text;

test.describe('Milo Text Block test suite', () => {
  test.beforeEach(async ({ page }) => {
    text = new Text(page);
  });

  // Test - 0
  test(`${features[0].name},${features[0].tags}`, async ({ page, baseURL }) => {
    console.info(`[MiloInfo] Checking page: ${baseURL}${features[0].path}`);

    // test step-1
    await test.step('Go to Text block test page', async () => {
      await page.goto(`${baseURL}${features[0].path}`);
      await page.waitForLoadState('domcontentloaded');
      await expect(page).toHaveURL(`${baseURL}${features[0].path}`);
    });

    // test step-2
    await test.step('Verify Text specs', async () => {
      // verify Text and its content visibility
      expect(await text.verifyText('text')).toBeTruthy();
    });
  });

  // Test - 1
  test(`${features[1].name},${features[1].tags}`, async ({ page, baseURL }) => {
    console.info(`[MiloInfo] Checking page: ${baseURL}${features[1].path}`);

    // test step-1
    await test.step('Go to Text (intro) block test page', async () => {
      await page.goto(`${baseURL}${features[1].path}`);
      await page.waitForLoadState('domcontentloaded');
      await expect(page).toHaveURL(`${baseURL}${features[1].path}`);
    });

    // test step-2
    await test.step('Verify Text (intro) specs', async () => {
      // verify text (intro) and its content visibility
      expect(await text.verifyText('text (intro)')).toBeTruthy();
    });
  });

  // Test - 2
  test(`${features[2].name},${features[2].tags}`, async ({ page, baseURL }) => {
    console.info(`[MiloInfo] Checking page: ${baseURL}${features[2].path}`);

    // test step-1
    await test.step('Go to Text (full width) block test page', async () => {
      await page.goto(`${baseURL}${features[2].path}`);
      await page.waitForLoadState('domcontentloaded');
      await expect(page).toHaveURL(`${baseURL}${features[2].path}`);
    });

    // test step-2
    await test.step('Verify Text (full width) specs', async () => {
      // verify Text (full width) and its content visibility
      expect(await text.verifyText('text (full width)')).toBeTruthy();
    });
  });

  // Test - 3
  test(`${features[3].name},${features[3].tags}`, async ({ page, baseURL }) => {
    console.info(`[MiloInfo] Checking page: ${baseURL}${features[3].path}`);

    // test step-1
    await test.step('Go to text (full-width, large) block test page', async () => {
      await page.goto(`${baseURL}${features[3].path}`);
      await page.waitForLoadState('domcontentloaded');
      await expect(page).toHaveURL(`${baseURL}${features[3].path}`);
    });

    // test step-2
    await test.step('Verify Text (full-width, large) specs', async () => {
      // verify Text (full-width, large) and its content visibility
      expect(await text.verifyText('text (full-width, large)')).toBeTruthy();
    });
  });

  // Test - 4
  test(`${features[4].name},${features[4].tags}`, async ({ page, baseURL }) => {
    console.info(`[MiloInfo] Checking page: ${baseURL}${features[4].path}`);

    // test step-1
    await test.step('Go to Text (long form, large) block test page', async () => {
      await page.goto(`${baseURL}${features[4].path}`);
      await page.waitForLoadState('domcontentloaded');
      await expect(page).toHaveURL(`${baseURL}${features[4].path}`);
    });

    // test step-2
    await test.step('Verify Text (long form, large) specs', async () => {
      // verify Text (long form, large) and its content visibility
      expect(await text.verifyText('text (long form, large)')).toBeTruthy();
    });
  });

  // Test - 5
  test(`${features[5].name},${features[5].tags}`, async ({ page, baseURL }) => {
    console.info(`[MiloInfo] Checking page: ${baseURL}${features[5].path}`);

    // test step-1
    await test.step('Go to Text (long form, large) block test page', async () => {
      await page.goto(`${baseURL}${features[5].path}`);
      await page.waitForLoadState('domcontentloaded');
      await expect(page).toHaveURL(`${baseURL}${features[5].path}`);
    });

    // test step-2
    await test.step('Verify Text (inset, large, m spacing) specs', async () => {
      // verify Text (inset, large, m spacing) and its content visibility
      expect(await text.verifyText('text (inset, large, m spacing)')).toBeTruthy();
    });
  });
});
