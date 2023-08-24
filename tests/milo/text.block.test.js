import { expect, test } from '@playwright/test';
import { features } from '../../features/milo/text.block.spec.js';
import TextBlock from '../../selectors/milo/text.block.page.js';

let text;

test.describe('Milo Text Block test suite', () => {
  test.beforeEach(async ({ page }) => {
    text = new TextBlock(page);
  });

  test(`${features[0].name},${features[0].tags}`, async ({ page, baseURL }) => {
    console.info(`[Test Page]: ${baseURL}${features[0].path}`);

    await test.step('step-1: Go to Text block test page', async () => {
      await page.goto(`${baseURL}${features[0].path}`);
      await page.waitForLoadState('domcontentloaded');
      await expect(page).toHaveURL(`${baseURL}${features[0].path}`);
    });

    await test.step('step-2: Verify Text specs', async () => {
      expect(await text.verifyText('text')).toBeTruthy();
    });
  });

  test(`${features[1].name},${features[1].tags}`, async ({ page, baseURL }) => {
    console.info(`[Test Page]: ${baseURL}${features[1].path}`);

    await test.step('step-1: Go to Text (intro) block test page', async () => {
      await page.goto(`${baseURL}${features[1].path}`);
      await page.waitForLoadState('domcontentloaded');
      await expect(page).toHaveURL(`${baseURL}${features[1].path}`);
    });

    await test.step('step-2: Verify Text (intro) specs', async () => {
      expect(await text.verifyText('text (intro)')).toBeTruthy();
    });
  });

  test(`${features[2].name},${features[2].tags}`, async ({ page, baseURL }) => {
    console.info(`[Test Page]: ${baseURL}${features[2].path}`);

    await test.step('step-1: Go to Text (full width) block test page', async () => {
      await page.goto(`${baseURL}${features[2].path}`);
      await page.waitForLoadState('domcontentloaded');
      await expect(page).toHaveURL(`${baseURL}${features[2].path}`);
    });

    await test.step('step-2: Verify Text (full width) specs', async () => {
      expect(await text.verifyText('text (full width)')).toBeTruthy();
    });
  });

  test(`${features[3].name},${features[3].tags}`, async ({ page, baseURL }) => {
    console.info(`[Test Page]: ${baseURL}${features[3].path}`);

    await test.step('step-1: Go to text (full-width, large) block test page', async () => {
      await page.goto(`${baseURL}${features[3].path}`);
      await page.waitForLoadState('domcontentloaded');
      await expect(page).toHaveURL(`${baseURL}${features[3].path}`);
    });

    await test.step('step-2: Verify Text (full-width, large) specs', async () => {
      expect(await text.verifyText('text (full-width, large)')).toBeTruthy();
    });
  });

  test(`${features[4].name},${features[4].tags}`, async ({ page, baseURL }) => {
    console.info(`[Test Page]: ${baseURL}${features[4].path}`);

    await test.step('step-1: Go to Text (long form, large) block test page', async () => {
      await page.goto(`${baseURL}${features[4].path}`);
      await page.waitForLoadState('domcontentloaded');
      await expect(page).toHaveURL(`${baseURL}${features[4].path}`);
    });

    await test.step('step-2: Verify Text (long form, large) specs', async () => {
      expect(await text.verifyText('text (long form, large)')).toBeTruthy();
    });
  });

  test(`${features[5].name},${features[5].tags}`, async ({ page, baseURL }) => {
    console.info(`[Test Page]: ${baseURL}${features[5].path}`);

    await test.step('step-1: Go to Text (long form, large) block test page', async () => {
      await page.goto(`${baseURL}${features[5].path}`);
      await page.waitForLoadState('domcontentloaded');
      await expect(page).toHaveURL(`${baseURL}${features[5].path}`);
    });

    await test.step('step-2: Verify Text (inset, large, m spacing) specs', async () => {
      expect(await text.verifyText('text (inset, large, m spacing)')).toBeTruthy();
    });
  });

  test(`${features[6].name},${features[6].tags}`, async ({ page, baseURL }) => {
    console.info(`[Test Page]: ${baseURL}${features[6].path}`);

    await test.step('step-1: Go to Text (legal) block test page', async () => {
      await page.goto(`${baseURL}${features[6].path}`);
      await page.waitForLoadState('domcontentloaded');
      await expect(page).toHaveURL(`${baseURL}${features[6].path}`);
    });

    await test.step('step-2: Verify Text (legal) specs', async () => {
      expect(await text.verifyText('text (legal)')).toBeTruthy();
    });
  });
  
  test(`${features[7].name},${features[7].tags}`, async ({ page, baseURL }) => {
    console.info(`[Test Page]: ${baseURL}${features[7].path}`);

    await test.step('step-1: Go to Text (link-farm) block test page', async () => {
      await page.goto(`${baseURL}${features[7].path}`);
      await page.waitForLoadState('domcontentloaded');
      await expect(page).toHaveURL(`${baseURL}${features[7].path}`);
    });

    await test.step('step-2: Verify Text (link-farm) specs', async () => {
      expect(await text.verifyText('text (link-farm)')).toBeTruthy();
    });
  });

});
