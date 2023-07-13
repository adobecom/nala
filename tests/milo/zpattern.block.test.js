import { expect, test } from '@playwright/test';
import { features } from '../../features/milo/zpattern.block.spec.js';
import { ZPattern } from '../../selectors/milo/zpattern.block.page.js';

let zpattern;

test.describe('Milo Z Pattern Block test suite', () => {
  test.beforeEach(async ({ page }) => {
    zpattern = new ZPattern(page);
  });

  test(`${features[0].name},${features[0].tags}`, async ({ page, baseURL }) => {
    console.info(`[Test Page]: ${baseURL}${features[0].path}`);

    await test.step('step-1: Go to Z Pattern block test page', async () => {
      await page.goto(`${baseURL}${features[0].path}`);
      await page.waitForLoadState('domcontentloaded');
      await expect(page).toHaveURL(`${baseURL}${features[0].path}`);
    });

    await test.step('step-2: Verify Z Pattern block specs', async () => {
      expect(await zpattern.verifyZPattern('z-pattern')).toBeTruthy();
    });
  });

  test(`${features[1].name},${features[1].tags}`, async ({ page, baseURL }) => {
    console.info(`[Test Page]: ${baseURL}${features[1].path}`);

    await test.step('step-1: Go to z-pattern (small) block test page', async () => {
      await page.goto(`${baseURL}${features[1].path}`);
      await page.waitForLoadState('domcontentloaded');
      await expect(page).toHaveURL(`${baseURL}${features[1].path}`);
    });

    await test.step('step-2: Verify z-pattern (small) block specs', async () => {
      expect(await zpattern.verifyZPattern('z-pattern (small)')).toBeTruthy();
    });
  });

  test(`${features[2].name},${features[2].tags}`, async ({ page, baseURL }) => {
    console.info(`[Test Page]: ${baseURL}${features[2].path}`);

    await test.step('step-1: Go to z-pattern (large) block test page', async () => {
      await page.goto(`${baseURL}${features[2].path}`);
      await page.waitForLoadState('domcontentloaded');
      await expect(page).toHaveURL(`${baseURL}${features[2].path}`);
    });

    await test.step('step-2: Verify z-pattern (large) block specs', async () => {
      expect(await zpattern.verifyZPattern('z-pattern (large)')).toBeTruthy();
    });
  });

  test(`${features[3].name},${features[3].tags}`, async ({ page, baseURL }) => {
    console.info(`[Test Page]: ${baseURL}${features[3].path}`);

    await test.step('step-1: Go to z-pattern (large) block test page', async () => {
      await page.goto(`${baseURL}${features[3].path}`);
      await page.waitForLoadState('domcontentloaded');
      await expect(page).toHaveURL(`${baseURL}${features[3].path}`);
    });

    await test.step('step-2: Verify z-pattern (dark) block specs', async () => {
      expect(await zpattern.verifyZPattern('z-pattern (dark)')).toBeTruthy();
    });
  });
});
