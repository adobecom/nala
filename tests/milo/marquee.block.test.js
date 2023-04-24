/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
/* eslint-disable import/extensions */
/* eslint-disable import/named */
import { expect, test } from '@playwright/test';
import { WebUtil } from '../../libs/webutil';
import { Marquee } from '../../selectors/milo/marquee.block.page';

const MarqueeSpec = require('../../features/milo/marquee.block.spec');

const { features } = MarqueeSpec;

let marquee;
let webUtil;

// Marquee blocks tests
test.describe('Milo Marquee block test suite', () => {
  // before each test block
  test.beforeEach(async ({ page }) => {
    webUtil = new WebUtil(page);
    marquee = new Marquee(page);
  });

  // Test - 0
  test(`${features[0].name},${features[0].tags}`, async ({ page, baseURL }) => {
    console.info(`${baseURL}${features[0].path}`);
    // test step-1
    await test.step('Go to Marquee (light) block test page', async () => {
      await page.goto(`${baseURL}${features[0].path}`);
      await page.waitForLoadState('domcontentloaded');
      await expect(page).toHaveURL(`${baseURL}${features[0].path}`);
      return 'gr8';
    });

    // test step-2
    await test.step('Verify Marquee (light) specs ', async () => {
      // verify marquee(light) and its content are visibility
      expect(await marquee.verifyMarquee('marquee (light)')).toBeTruthy();
    });
  });

  // Test - 1
  test(`${features[1].name}, @milo-live, ${features[1].tags}`, async ({ page, baseURL }) => {
    console.info(`${baseURL}${features[1].path}`);

    // test step-1
    await test.step('Go to Marquee (small) block test page', async () => {
      await page.goto(`${baseURL}${features[1].path}`);
      await page.waitForLoadState('domcontentloaded');
      await expect(page).toHaveURL(`${baseURL}${features[1].path}`);
    });

    // test step-2
    await test.step('Verify Marquee (small) specs ', async () => {
      // verify marquee(small) and its content are visibility
      expect(await marquee.verifyMarquee('marquee (small)')).toBeTruthy();
    });
  });

  // Test - 2
  test(`${features[2].name}, @milo-live, ${features[2].tags}`, async ({ page, baseURL }) => {
    console.info(`${baseURL}${features[2].path}`);
    // test step-1
    await test.step('Go to Marquee (small, light ) block test page', async () => {
      await page.goto(`${baseURL}${features[2].path}`);
      await page.waitForLoadState('domcontentloaded');
      await expect(page).toHaveURL(`${baseURL}${features[2].path}`);
    });

    // test step-2
    await test.step('Verify Marquee (small, light) specs ', async () => {
      // verify marquee(small, ligth) and its content are visibility
      expect(await marquee.verifyMarquee('marquee (small, light)')).toBeTruthy();
    });
  });

  // Test - 3
  test(`${features[3].name}, @milo-live, ${features[3].tags}`, async ({ page, baseURL }) => {
    console.info(`${baseURL}${features[3].path}`);
    // test step-1
    await test.step('Go to Marquee (large ) block test page', async () => {
      await page.goto(`${baseURL}${features[3].path}`);
      await page.waitForLoadState('domcontentloaded');
      await expect(page).toHaveURL(`${baseURL}${features[3].path}`);
    });

    // test step-2
    await test.step('Verify Marquee (large) specs ', async () => {
      // verify marquee(small, ligth) and its content are visibility
      expect(await marquee.verifyMarquee('marquee (large)')).toBeTruthy();
    });
  });

  // Test - 4
  test(`${features[4].name}, @milo-live, ${features[4].tags}`, async ({ page, baseURL }) => {
    console.info(`${baseURL}${features[4].path}`);
    // test step-1
    await test.step('Go to Marquee (large, light ) block test page', async () => {
      await page.goto(`${baseURL}${features[4].path}`);
      await page.waitForLoadState('domcontentloaded');
      await expect(page).toHaveURL(`${baseURL}${features[4].path}`);
    });

    // test step-2
    await test.step('Verify Marquee (large, light) specs ', async () => {
      // verify marquee(small, ligth) and its content are visibility
      expect(await marquee.verifyMarquee('marquee (large, light)')).toBeTruthy();
    });
  });

  // Test - 5
  test(`${features[5].name}, @milo-live, ${features[5].tags}`, async ({ page, baseURL }) => {
    console.info(`${baseURL}${features[5].path}`);
    // test step-1
    await test.step('Go to Marquee (quiet ) block test page', async () => {
      await page.goto(`${baseURL}${features[5].path}`);
      await page.waitForLoadState('domcontentloaded');
      await expect(page).toHaveURL(`${baseURL}${features[5].path}`);
    });

    // test step-2
    await test.step('Verify Marquee (quiet) specs ', async () => {
      // verify marquee(quiet) and its content are visibility
      expect(await marquee.verifyMarquee('marquee (quiet)')).toBeTruthy();
    });
  });

  // Test - 6
  test(`${features[6].name}, @milo-live, ${features[6].tags}`, async ({ page, baseURL }) => {
    console.info(`${baseURL}${features[6].path}`);
    // test step-1
    await test.step('Go to Marquee (inline ) block test page', async () => {
      await page.goto(`${baseURL}${features[6].path}`);
      await page.waitForLoadState('domcontentloaded');
      await expect(page).toHaveURL(`${baseURL}${features[6].path}`);
    });

    // test step-2
    await test.step('Verify Marquee (inline) specs ', async () => {
      // verify marquee(inline) and its content are visibility
      expect(await marquee.verifyMarquee('marquee (inline)')).toBeTruthy();
    });
  });

  // Test - 7
  test(`${features[7].name}, @milo-live, ${features[7].tags}`, async ({ page, baseURL }) => {
    console.info(`${baseURL}${features[7].path}`);
    // test step-1
    await test.step('Go to Marquee (split, small ) block test page', async () => {
      await page.goto(`${baseURL}${features[7].path}`);
      await page.waitForLoadState('domcontentloaded');
      await expect(page).toHaveURL(`${baseURL}${features[7].path}`);
    });

    // test step-2
    await test.step('Verify Marquee (split, small) specs ', async () => {
      // verify marquee(split, small) and its content are visibility
      expect(await marquee.verifyMarquee('marquee (split, small)')).toBeTruthy();
    });
  });

  // Test - 8
  test(`${features[8].name}, @milo-live, ${features[8].tags}`, async ({ page, baseURL }) => {
    console.info(`${baseURL}${features[8].path}`);
    // test step-1
    await test.step('Go to Marquee (split, large ) block test page', async () => {
      await page.goto(`${baseURL}${features[8].path}`);
      await page.waitForLoadState('domcontentloaded');
      await expect(page).toHaveURL(`${baseURL}${features[8].path}`);
    });

    // test step-2
    await test.step('Verify Marquee (split, large) specs ', async () => {
      // verify marquee(split, large) and its content are visibility
      expect(await marquee.verifyMarquee('marquee (split, large)')).toBeTruthy();
    });
  });

  // Test - 9
  test(`${features[9].name}, @milo-live, ${features[9].tags}`, async ({ page, baseURL }) => {
    console.info(`${baseURL}${features[9].path}`);
    // test step-1
    await test.step('Go to Marquee (split, one-third, large, light ) block test page', async () => {
      await page.goto(`${baseURL}${features[9].path}`);
      await page.waitForLoadState('domcontentloaded');
      await expect(page).toHaveURL(`${baseURL}${features[9].path}`);
    });

    // test step-2
    await test.step('Verify Marquee (split, one-third, large, light) specs ', async () => {
      // verify marquee(split, large) and its content are visibility
      expect(await marquee.verifyMarquee('marquee (split, one-third, large, light)')).toBeTruthy();
    });
  });

  // Test - 10
  test(`${features[10].name}, @milo-live, ${features[10].tags}`, async ({ page, baseURL }) => {
    console.info(`${baseURL}${features[10].path}`);
    // test step-1
    await test.step('Go to Marquee (split, one-third ) block test page', async () => {
      await page.goto(`${baseURL}${features[10].path}`);
      await page.waitForLoadState('domcontentloaded');
      await expect(page).toHaveURL(`${baseURL}${features[10].path}`);
    });

    // test step-2
    await test.step('Verify Marquee (split, one-third) specs ', async () => {
      // verify marquee(split, one-third) and its content are visibility
      expect(await marquee.verifyMarquee('marquee (split, one-third)')).toBeTruthy();
    });
  });

  // Test - 11
  test(`${features[11].name}, @milo-live, ${features[11].tags}`, async ({ page, baseURL }) => {
    console.info(`${baseURL}${features[11].path}`);
    // test step-1
    await test.step('Go to Marquee (split,one-third,small,light ) block test page', async () => {
      await page.goto(`${baseURL}${features[11].path}`);
      await page.waitForLoadState('domcontentloaded');
      await expect(page).toHaveURL(`${baseURL}${features[11].path}`);
    });

    // test step-2
    await test.step('Verify Marquee (split,one-third,small,light) specs ', async () => {
      // verify marquee(split, split,one-third,small,light) and its content are visibility
      expect(await marquee.verifyMarquee('marquee (split, one-third, small, light)')).toBeTruthy();
    });
  });
});
