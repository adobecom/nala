import { expect, test } from '@playwright/test';
import { WebUtil } from '../../libs/webutil.js';
import { features } from '../../features/milo/marquee.block.spec.js';
import MarqueeBlock from '../../selectors/milo/marquee.block.page.js';

let webUtil;
let marquee;
let consoleErrors = [];


test.describe('Milo Marquee Block test suite', () => {
  test.beforeEach(async ({ page }) => {
    webUtil = new WebUtil(page);
    marquee = new MarqueeBlock(page);

    page.on('pageerror', (exception) => {
      consoleErrors.push(exception);
    });   
  });

  test(`${features[0].name},${features[0].tags}`, async ({ page, baseURL }) => {
    console.info(`[Test Page]: ${baseURL}${features[0].path}`);

    await test.step('step-1: Go to Marquee (light) block test page', async () => {
      await page.goto(`${baseURL}${features[0].path}`);
      await page.waitForLoadState('domcontentloaded');
      await expect(page).toHaveURL(`${baseURL}${features[0].path}`);
    });

    await test.step('step-2: Verify marquee(light) and its content are visibility', async () => {
      const { data } = features[0];
      expect(await marquee.verifyMarquee('marquee (light)', data)).toBeTruthy();
    });

    await test.step('step-3: Verify and log if any console errors', async () => {
      consoleErrors.length > 0 && console.log('[Console error]:', consoleErrors);      
      expect.soft(consoleErrors.length).toBe(0);      
    });
  });

  test(`${features[1].name},${features[1].tags}`, async ({ page, baseURL }) => {
    console.info(`[Test Page]: ${baseURL}${features[1].path}`);

    await test.step('step-1: Go to Marquee (small) block test page', async () => {
      await page.goto(`${baseURL}${features[1].path}`);
      await page.waitForLoadState('domcontentloaded');
      await expect(page).toHaveURL(`${baseURL}${features[1].path}`);
    });

    await test.step('step-2: Verify Marquee (small) and its content are visibility', async () => {
      const { data } = features[1];
      expect(await marquee.verifyMarquee('marquee (small)', data)).toBeTruthy();
    });

    await test.step('step-3: Verify and log if any console errors', async () => {
      consoleErrors.length > 0 && console.log('[Console error]:', consoleErrors);      
      expect.soft(consoleErrors.length).toBe(0);      
    });

  });

  test(`${features[2].name},${features[2].tags}`, async ({ page, baseURL }) => {
    console.info(`[Test Page]: ${baseURL}${features[2].path}`);

    await test.step('step-1: Go to Marquee (small, light ) block test page', async () => {
      await page.goto(`${baseURL}${features[2].path}`);
      await page.waitForLoadState('domcontentloaded');
      await expect(page).toHaveURL(`${baseURL}${features[2].path}`);
    });

    await test.step('step-2: Verify Marquee (small, light) and its content are visibility', async () => {
      const { data } = features[2];
      expect(await marquee.verifyMarquee('marquee (small, light)', data)).toBeTruthy();
    });

    await test.step('step-3: Verify and log if any console errors', async () => {
      consoleErrors.length > 0 && console.log('[Console error]:', consoleErrors);      
      expect.soft(consoleErrors.length).toBe(0);      
    });

  });

  test(`${features[3].name},${features[3].tags}`, async ({ page, baseURL }) => {
    console.info(`[Test Page]: ${baseURL}${features[3].path}`);

    await test.step('step-1: Go to Marquee (large ) block test page', async () => {
      await page.goto(`${baseURL}${features[3].path}`);
      await page.waitForLoadState('domcontentloaded');
      await expect(page).toHaveURL(`${baseURL}${features[3].path}`);
    });

    await test.step('step-2: Verify Marquee (large) and its content are visibility', async () => {
      const { data } = features[3];
      expect(await marquee.verifyMarquee('marquee (large)', data )).toBeTruthy();
    });

    await test.step('step-3: Verify and log if any console errors', async () => {
      consoleErrors.length > 0 && console.log('[Console error]:', consoleErrors);      
      expect.soft(consoleErrors.length).toBe(0);      
    });

  });

  test(`${features[4].name},${features[4].tags}`, async ({ page, baseURL }) => {
    console.info(`[Test Page]: ${baseURL}${features[4].path}`);

    await test.step('step-1: Go to Marquee (large, light ) block test page', async () => {
      await page.goto(`${baseURL}${features[4].path}`);
      await page.waitForLoadState('domcontentloaded');
      await expect(page).toHaveURL(`${baseURL}${features[4].path}`);
    });

    await test.step('step-2: Verify Marquee (large, light) and its content are visibility', async () => {
      const { data } = features[4];
      expect(await marquee.verifyMarquee('marquee (large, light)', data)).toBeTruthy();
    });

    await test.step('step-3: Verify and log if any console errors', async () => {
      consoleErrors.length > 0 && console.log('[Console error]:', consoleErrors);      
      expect.soft(consoleErrors.length).toBe(0);      
    });

  });

  test(`${features[5].name},${features[5].tags}`, async ({ page, baseURL }) => {
    console.info(`[Test Page]: ${baseURL}${features[5].path}`);

    await test.step('step-1: Go to Marquee (quiet ) block test page', async () => {
      await page.goto(`${baseURL}${features[5].path}`);
      await page.waitForLoadState('domcontentloaded');
      await expect(page).toHaveURL(`${baseURL}${features[5].path}`);
    });

    await test.step('step-2: Verify Marquee (quiet) and its content are visibility', async () => {
      const { data } = features[5];
      expect(await marquee.verifyMarquee('marquee (quiet)', data )).toBeTruthy();
    });

    await test.step('step-3: Verify and log if any console errors', async () => {
      consoleErrors.length > 0 && console.log('[Console error]:', consoleErrors);      
      expect.soft(consoleErrors.length).toBe(0);      
    });

  });

  test(`${features[6].name},${features[6].tags}`, async ({ page, baseURL }) => {
    console.info(`[Test Page]: ${baseURL}${features[6].path}`);

    await test.step('step-1: Go to Marquee (inline ) block test page', async () => {
      await page.goto(`${baseURL}${features[6].path}`);
      await page.waitForLoadState('domcontentloaded');
      await expect(page).toHaveURL(`${baseURL}${features[6].path}`);
    });

    await test.step('step-2: Verify Marquee (inline) specs', async () => {
      const { data } = features[6];
      expect(await marquee.verifyMarquee('marquee (inline)', data )).toBeTruthy();
    });

    await test.step('step-3: Verify and log if any console errors', async () => {
      consoleErrors.length > 0 && console.log('[Console error]:', consoleErrors);      
      expect.soft(consoleErrors.length).toBe(0);      
    });

  });

  test(`${features[7].name},${features[7].tags}`, async ({ page, baseURL }) => {
    console.info(`[Test Page]: ${baseURL}${features[7].path}`);

    await test.step('step-1: Go to Marquee (split, small ) block test page', async () => {
      await page.goto(`${baseURL}${features[7].path}`);
      await page.waitForLoadState('domcontentloaded');
      await expect(page).toHaveURL(`${baseURL}${features[7].path}`);
    });

    await test.step('step-2: Verify Marquee (split, small) and its content are visibility', async () => {
      const { data } = features[7];
      expect(await marquee.verifyMarquee('marquee (split, small)', data )).toBeTruthy();
    });

    await test.step('step-3: Verify and log if any console errors', async () => {
      consoleErrors.length > 0 && console.log('[Console error]:', consoleErrors);      
      expect.soft(consoleErrors.length).toBe(0);      
    });

  });

  test(`${features[8].name},${features[8].tags}`, async ({ page, baseURL }) => {
    console.info(`[Test Page]: ${baseURL}${features[8].path}`);

    await test.step('step-1: Go to Marquee (split, large ) block test page', async () => {
      await page.goto(`${baseURL}${features[8].path}`);
      await page.waitForLoadState('domcontentloaded');
      await expect(page).toHaveURL(`${baseURL}${features[8].path}`);
    });

    await test.step('step-2: Verify Marquee (split, large) and its content are visibility', async () => {
      const { data } = features[8];
      expect(await marquee.verifyMarquee('marquee (split, large)', data )).toBeTruthy();
    });

    await test.step('step-3: Verify and log if any console errors', async () => {
      consoleErrors.length > 0 && console.log('[Console error]:', consoleErrors);      
      expect.soft(consoleErrors.length).toBe(0);      
    });

  });

  test(`${features[9].name},${features[9].tags}`, async ({ page, baseURL }) => {
    console.info(`[Test Page]: ${baseURL}${features[9].path}`);

    await test.step('step-1: Go to Marquee (split, one-third, large, light ) block test page', async () => {
      await page.goto(`${baseURL}${features[9].path}`);
      await page.waitForLoadState('domcontentloaded');
      await expect(page).toHaveURL(`${baseURL}${features[9].path}`);
    });

    await test.step('step-2: Verify Marquee (split, one-third, large, light) and its content are visibility', async () => {
      const { data } = features[9];
      expect(await marquee.verifyMarquee('marquee (split, one-third, large, light)', data )).toBeTruthy();
    });

    await test.step('step-3: Verify and log if any console errors', async () => {
      consoleErrors.length > 0 && console.log('[Console error]:', consoleErrors);      
      expect.soft(consoleErrors.length).toBe(0);      
    });

  });

  test(`${features[10].name},${features[10].tags}`, async ({ page, baseURL }) => {
    console.info(`[Test Page]: ${baseURL}${features[10].path}`);

    await test.step('step-1: Go to Marquee (split, one-third ) block test page', async () => {
      await page.goto(`${baseURL}${features[10].path}`);
      await page.waitForLoadState('domcontentloaded');
      await expect(page).toHaveURL(`${baseURL}${features[10].path}`);
    });

    await test.step('step-2: Verify Marquee (split, one-third) and its content are visibility', async () => {
      const { data } = features[10];
      expect(await marquee.verifyMarquee('marquee (split, one-third)', data )).toBeTruthy();
    });

    await test.step('step-3: Verify and log if any console errors', async () => {
      consoleErrors.length > 0 && console.log('[Console error]:', consoleErrors);      
      expect.soft(consoleErrors.length).toBe(0);   
    });

  });

  test(`${features[11].name},${features[11].tags}`, async ({ page, baseURL }) => {
    console.info(`[Test Page]: ${baseURL}${features[11].path}`);

    await test.step('step-1: Go to Marquee (split,one-third,small,light ) block test page', async () => {
      await page.goto(`${baseURL}${features[11].path}`);
      await page.waitForLoadState('domcontentloaded');
      await expect(page).toHaveURL(`${baseURL}${features[11].path}`);
    });

    await test.step('step-2: Verify Marquee (split,one-third,small,light) specs', async () => {
      const { data } = features[11];
      expect(await marquee.verifyMarquee('marquee (split, one-third, small, light)', data)).toBeTruthy();
    });

    await test.step('step-3: Verify and log if any console errors', async () => {
      consoleErrors.length > 0 && console.log('[Console error]:', consoleErrors);      
      expect.soft(consoleErrors.length).toBe(0);      
    });

  });
});

