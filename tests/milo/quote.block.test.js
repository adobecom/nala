import { expect, test } from '@playwright/test';
import { features } from '../../features/milo/quote.block.spec.js';
import QuoteBlock from '../../selectors/milo/quote.block.page.js';

let quote;

test.describe('Milo Quote Block test suite', () => {
  test.beforeEach(async ({ page }) => {
    quote = new QuoteBlock(page);
  });

  test(`${features[0].name},${features[0].tags}`, async ({ page, baseURL }) => {
    console.info(`[Test Page]: ${baseURL}${features[0].path}`);

    await test.step('step-1: Go to Quote block test page', async () => {
      await page.goto(`${baseURL}${features[0].path}`);
      await page.waitForLoadState('domcontentloaded');
      await expect(page).toHaveURL(`${baseURL}${features[0].path}`);
    });

    await test.step('step-2: Verify Quote block content/specs', async () => {
      const { data } = features[0];
      expect(await quote.verifyQuote('quote', data)).toBeTruthy();
    });
  });

  test(`${features[1].name},${features[1].tags}`, async ({ page, baseURL }) => {
    console.info(`[Test Page]: ${baseURL}${features[1].path}`);

    await test.step('step-1: Go to Quote block test page', async () => {
      await page.goto(`${baseURL}${features[1].path}`);
      await page.waitForLoadState('domcontentloaded');
      await expect(page).toHaveURL(`${baseURL}${features[1].path}`);
    });

    await test.step('step-2: Verify Quote (contained) block content/specs', async () => {
      const { data } = features[1];
      expect(await quote.verifyQuote('quote (contained)', data)).toBeTruthy();
    });
  });

  test(`${features[2].name},${features[2].tags}`, async ({ page, baseURL }) => {
    console.info(`[Test Page]: ${baseURL}${features[2].path}`);

    await test.step('step-1: Go to Quote (inline) block test page', async () => {
      await page.goto(`${baseURL}${features[2].path}`);
      await page.waitForLoadState('domcontentloaded');
      await expect(page).toHaveURL(`${baseURL}${features[2].path}`);
    });

    await test.step('step-2: Verify Quote (inline) block content/specs', async () => {
      const { data } = features[2];
      expect(await quote.verifyQuote('quote (inline)', data)).toBeTruthy();
    });
  });

  test(`${features[3].name},${features[3].tags}`, async ({ page, baseURL }) => {
    console.info(`[MiloInfo] Checking page: ${baseURL}${features[3].path}`);

    await test.step('step-1: Go to Quote (borders) block test page', async () => {
      await page.goto(`${baseURL}${features[3].path}`);
      await page.waitForLoadState('domcontentloaded');
      await expect(page).toHaveURL(`${baseURL}${features[3].path}`);
    });

    await test.step('step-2: Verify Quote (borders) block content/specs', async () => {
      const { data } = features[3];
      expect(await quote.verifyQuote('quote (borders)', data)).toBeTruthy();
    });
  });

  test(`${features[4].name},${features[4].tags}`, async ({ page, baseURL }) => {
    console.info(`[Test Page]: ${baseURL}${features[4].path}`);

    await test.step('step-1: Go to Quote (align-right) block test page', async () => {
      await page.goto(`${baseURL}${features[4].path}`);
      await page.waitForLoadState('domcontentloaded');
      await expect(page).toHaveURL(`${baseURL}${features[4].path}`);
    });

    await test.step('step-2: Verify Quote (align-right) block content/specs', async () => {
      const { data } = features[4];
      expect(await quote.verifyQuote('quote (align-right)', data)).toBeTruthy();
    });
  });

  test(`${features[5].name},${features[5].tags}`, async ({ page, baseURL }) => {
    console.info(`[Test Page]: ${baseURL}${features[5].path}`);

    await test.step('step-1: Go to Quote (xl-spaced) block test page', async () => {
      await page.goto(`${baseURL}${features[5].path}`);
      await page.waitForLoadState('domcontentloaded');
      await expect(page).toHaveURL(`${baseURL}${features[5].path}`);
    });

    await test.step('step-2: Verify Quote (xl-spaced) block content/specs', async () => {
      const { data } = features[5];
      expect(await quote.verifyQuote('quote (xl-spaced)', data)).toBeTruthy();
    });
  });
});
