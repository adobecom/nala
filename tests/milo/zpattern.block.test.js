/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
/* eslint-disable import/extensions */
/* eslint-disable import/named */
import { expect, test } from '@playwright/test';
import { ZPattern } from '../../selectors/milo/zpattern.block.page';

const ZPatternSpec = require('../../features/milo/zpattern.block.spec');

const { features } = ZPatternSpec;

let zpattern;

// Z Pattern blocks tests
test.describe('Milo Z Pattern block test suite', () => {
  // before each test block
  test.beforeEach(async ({ page }) => {
    zpattern = new ZPattern(page);
  });

  // Test - 0
  test(`${features[0].name},${features[0].tags}`, async ({ page, baseURL }) => {
    console.info(`${baseURL}${features[0].path}`);
    // test step-1
    await test.step('Go to z pattern block test page', async () => {
      await page.goto(`${baseURL}${features[0].path}`);
      await page.waitForLoadState('domcontentloaded');
      await expect(page).toHaveURL(`${baseURL}${features[0].path}`);
    });

    // test step-2
    await test.step('Verify z pattern block specs ', async () => {
      // verify z pattern and its content
      expect(await zpattern.verifyZPattern('z-pattern')).toBeTruthy();
    });
  });

  // Test - 1
  test(`${features[1].name},${features[1].tags}`, async ({ page, baseURL }) => {
    console.info(`${baseURL}${features[1].path}`);
    // test step-1
    await test.step('Go to z-pattern (small) block test page', async () => {
      await page.goto(`${baseURL}${features[1].path}`);
      await page.waitForLoadState('domcontentloaded');
      await expect(page).toHaveURL(`${baseURL}${features[1].path}`);
    });

    // test step-2
    await test.step('Verify z-pattern (small) block specs ', async () => {
      // verify z-pattern (small) and its contents
      expect(await zpattern.verifyZPattern('z-pattern (small)')).toBeTruthy();
    });
  });

  // Test - 2
  test(`${features[2].name},${features[2].tags}`, async ({ page, baseURL }) => {
    console.info(`${baseURL}${features[2].path}`);
    // test step-1
    await test.step('Go to z-pattern (large) block test page', async () => {
      await page.goto(`${baseURL}${features[2].path}`);
      await page.waitForLoadState('domcontentloaded');
      await expect(page).toHaveURL(`${baseURL}${features[2].path}`);
    });

    // test step-2
    await test.step('Verify z-pattern (large) block specs ', async () => {
      // verify z-pattern (large) and its contents
      expect(await zpattern.verifyZPattern('z-pattern (large)')).toBeTruthy();
    });
  });

  // Test - 3
  test(`${features[3].name},${features[3].tags}`, async ({ page, baseURL }) => {
    console.info(`${baseURL}${features[3].path}`);
    // test step-1
    await test.step('Go to z-pattern (large) block test page', async () => {
      await page.goto(`${baseURL}${features[3].path}`);
      await page.waitForLoadState('domcontentloaded');
      await expect(page).toHaveURL(`${baseURL}${features[3].path}`);
    });

    // test step-2
    await test.step('Verify z-pattern (dark) block specs ', async () => {
      // verify z-pattern (dark) and its contents
      expect(await zpattern.verifyZPattern('z-pattern (dark)')).toBeTruthy();
    });
  });
});
