import { expect, test } from '@playwright/test';
import { WebUtil } from '../../libs/webutil.js';
import { features } from '../../features/milo/video.block.spec.js';
import VideoBlock from '../../selectors/milo/video.block.page.js';

let webUtil;
let video;
let consoleErrors = [];
const miloLibs = process.env.MILO_LIBS || '';
const knownConsoleErrors = [
  'Access-Control-Allow-Origin',
  'Failed to load resource: net::ERR_FAILED',
  'Invalid request',
  'Access to XMLHttpRequest',
];

test.describe('Milo Video Block test suite', () => {
  test.beforeEach(async ({ page }) => {
    webUtil = new WebUtil(page);
    video = new VideoBlock(page);

    page.on('console', (exception) => {
      if (exception.type() === 'error') {
        consoleErrors.push(exception.text());
      }
    });
  });

  test.afterEach(async () => {
    consoleErrors = [];
  });

  // Test 0 : Video default
  test(`${features[0].name},${features[0].tags}`, async ({ page, baseURL }) => {
    console.info(`[Test Page]: ${baseURL}${features[0].path}${miloLibs}`);
    const { data } = features[0];

    await test.step('step-1: Go to video block test page', async () => {
      await page.goto(`${baseURL}${features[0].path}${miloLibs}`);
      await page.waitForLoadState('domcontentloaded');
      await expect(page).toHaveURL(`${baseURL}${features[0].path}${miloLibs}`);
    });

    await test.step('step-2: Verify video block content/specs', async () => {
      await expect(await video.video).toBeVisible();
      await expect(await video.content).toContainText(data.h2Text);

      await expect(await webUtil.verifyAttributes_(video.video, video.attributes['video.default'])).toBeTruthy();
      await expect(await webUtil.verifyAttributes_(video.videoSource, video.attributes['video.source'])).toBeTruthy();
    });

    await test.step('step-3: Verify browser console errors', async () => {
      if (consoleErrors.length > knownConsoleErrors.length) {
        console.log('[Console error]:', consoleErrors);
      }
      expect.soft(consoleErrors.length).toBeLessThanOrEqual(knownConsoleErrors.length);
    });
  });

  // Test 1 : Video autoplay loop
  test(`${features[1].name},${features[1].tags}`, async ({ page, baseURL }) => {
    console.info(`[Test Page]: ${baseURL}${features[1].path}${miloLibs}`);
    const { data } = features[1];

    await test.step('step-1: Go to video block test page', async () => {
      await page.goto(`${baseURL}${features[1].path}${miloLibs}`);
      await page.waitForLoadState('domcontentloaded');
      await expect(page).toHaveURL(`${baseURL}${features[1].path}${miloLibs}`);
    });

    await test.step('step-2: Verify video block content/specs', async () => {
      await expect(await video.video).toBeVisible();
      await expect(await video.content).toContainText(data.h2Text);

      expect(await webUtil.verifyAttributes_(video.video, video.attributes['video.autoplay'])).toBeTruthy();
      expect(await webUtil.verifyAttributes_(video.videoSource, video.attributes['video.source'])).toBeTruthy();
    });

    await test.step('step-3: Verify browser console errors', async () => {
      if (consoleErrors.length > knownConsoleErrors.length) {
        console.log('[Console error]:', consoleErrors);
      }
      expect.soft(consoleErrors.length).toBeLessThanOrEqual(knownConsoleErrors.length);
    });
  });

  // Test 2 : Video autoplay loop once
  test(`${features[2].name},${features[2].tags}`, async ({ page, baseURL }) => {
    console.info(`[Test Page]: ${baseURL}${features[2].path}${miloLibs}`);
    const { data } = features[2];

    await test.step('step-1: Go to video block test page', async () => {
      await page.goto(`${baseURL}${features[2].path}${miloLibs}`);
      await page.waitForLoadState('domcontentloaded');
      await expect(page).toHaveURL(`${baseURL}${features[2].path}${miloLibs}`);
    });

    await test.step('step-2: Verify video block content/specs', async () => {
      await expect(await video.video).toBeVisible();
      await expect(await video.content).toContainText(data.h2Text);

      expect(await webUtil.verifyAttributes_(video.video, video.attributes['video.autoplay.once'])).toBeTruthy();
      expect(await webUtil.verifyAttributes_(video.videoSource, video.attributes['video.source'])).toBeTruthy();
    });

    await test.step('step-3: Verify browser console errors', async () => {
      if (consoleErrors.length > knownConsoleErrors.length) {
        console.log('[Console error]:', consoleErrors);
      }
      expect.soft(consoleErrors.length).toBeLessThanOrEqual(knownConsoleErrors.length);
    });
  });

  // Test 3 : Video hover play
  test(`${features[3].name},${features[3].tags}`, async ({ page, baseURL }) => {
    console.info(`[Test Page]: ${baseURL}${features[3].path}${miloLibs}`);
    const { data } = features[3];

    await test.step('step-1: Go to video block test page', async () => {
      await page.goto(`${baseURL}${features[3].path}${miloLibs}`);
      await page.waitForLoadState('domcontentloaded');
      await expect(page).toHaveURL(`${baseURL}${features[3].path}${miloLibs}`);
    });

    await test.step('step-2: Verify video block content/specs', async () => {
      await expect(await video.video).toBeVisible();
      await expect(await video.content).toContainText(data.h2Text);
      await new Promise((resolve) => { setTimeout(resolve, 2000); });
      await video.video.hover();

      expect(await webUtil.verifyAttributes_(video.video, video.attributes['video.autoplay.once'])).toBeTruthy();
      expect(await webUtil.verifyAttributes_(video.videoSource, video.attributes['video.source'])).toBeTruthy();
    });

    await test.step('step-3: Verify browser console errors', async () => {
      if (consoleErrors.length > knownConsoleErrors.length) {
        console.log('[Console error]:', consoleErrors);
      }
      expect.soft(consoleErrors.length).toBeLessThanOrEqual(knownConsoleErrors.length);
    });
  });

  // Test 4 : MPC Video
  test(`${features[4].name},${features[4].tags}`, async ({ page, baseURL }) => {
    test.slow();
    console.info(`[Test Page]: ${baseURL}${features[4].path}${miloLibs}`);
    const { data } = features[4];

    await test.step('step-1: Go to video block test page', async () => {
      await page.goto(`${baseURL}${features[4].path}${miloLibs}`);
      await page.waitForLoadState('domcontentloaded');
      await expect(page).toHaveURL(`${baseURL}${features[4].path}${miloLibs}`);
    });

    await test.step('step-2: Verify video block content/specs', async () => {
      await expect(await video.miloVideo).toBeVisible();
      await expect(await video.iframe).toBeVisible();
      await expect(await video.mpcPlayButton).toBeVisible();
      await expect(await video.mpcPlayerTitle).toContainText(data.h1Title);

      await expect(await video.iframe).toHaveAttribute('title', data.iframeTitle);
      await expect(await video.iframe).toHaveAttribute('src', data.source);
      expect(await webUtil.verifyAttributes_(video.iframe, video.attributes['iframe-mpc'])).toBeTruthy();
    });

    await test.step('step-3: Verify browser console errors', async () => {
      if (consoleErrors.length > knownConsoleErrors.length) {
        console.log('[Console error]:', consoleErrors);
      }
      expect.soft(consoleErrors.length).toBeLessThanOrEqual(knownConsoleErrors.length);
    });
  });

  // Test 5 : MPC Video Autoplay Looping
  test(`${features[5].name},${features[5].tags}`, async ({ page, baseURL }) => {
    test.slow();
    console.info(`[Test Page]: ${baseURL}${features[5].path}${miloLibs}`);
    const { data } = features[5];

    await test.step('step-1: Go to video block test page', async () => {
      await page.goto(`${baseURL}${features[5].path}${miloLibs}`);
      await page.waitForLoadState('domcontentloaded');
      await expect(page).toHaveURL(`${baseURL}${features[5].path}${miloLibs}`);
    });

    await test.step('step-2: Verify video block content/specs', async () => {
      await expect(await video.miloVideo).toBeVisible();
      await expect(await video.iframe).toBeVisible();
      await expect(await video.mpcMutedButton).toBeVisible({ timeout: 3000 });

      await expect(await video.iframe).toHaveAttribute('title', data.iframeTitle);
      await expect(await video.iframe).toHaveAttribute('src', data.source);
      expect(await webUtil.verifyAttributes_(video.iframe, video.attributes['iframe-mpc'])).toBeTruthy();
    });

    await test.step('step-3: Verify browser console errors', async () => {
      if (consoleErrors.length > knownConsoleErrors.length) {
        console.log('[Console error]:', consoleErrors);
      }
      expect.soft(consoleErrors.length).toBeLessThanOrEqual(knownConsoleErrors.length);
    });
  });

  // Test 6 : Youtube Video
  test(`${features[6].name},${features[6].tags}`, async ({ page, baseURL }) => {
    test.slow();
    console.info(`[Test Page]: ${baseURL}${features[6].path}${miloLibs}`);
    const { data } = features[6];

    await test.step('step-1: Go to video block test page', async () => {
      await page.goto(`${baseURL}${features[6].path}${miloLibs}`);
      await page.waitForLoadState('domcontentloaded');
      await expect(page).toHaveURL(`${baseURL}${features[6].path}${miloLibs}`);
    });

    await test.step('step-2: Verify video block content/specs', async () => {
      await expect(await video.miloVideo).toBeVisible();
      await expect(await video.iframe).toBeVisible();
      await expect(await video.youtubePlayButton).toBeVisible();
      await expect(await video.youtubePlayButton).toHaveAttribute('title', 'Play');

      await expect(await video.iframe).toHaveAttribute('title', data.iframeTitle);
      await expect(await video.iframe).toHaveAttribute('src', data.source);
      expect(await webUtil.verifyAttributes_(video.iframe, video.attributes['iframe-youtube'])).toBeTruthy();
    });

    await test.step('step-3: Verify browser console errors', async () => {
      if (consoleErrors.length > knownConsoleErrors.length) {
        console.log('[Console error]:', consoleErrors);
      }
      expect.soft(consoleErrors.length).toBeLessThanOrEqual(knownConsoleErrors.length);
    });
  });

  // Test 7 : Modal Video default
  test(`${features[7].name},${features[7].tags}`, async ({ page, baseURL }) => {
    test.slow();
    console.info(`[Test Page]: ${baseURL}${features[7].path}${miloLibs}`);
    // const { data } = features[7];

    await test.step('step-1: Go to video block test page', async () => {
      await page.goto(`${baseURL}${features[7].path}${miloLibs}`);
      await page.waitForLoadState('domcontentloaded');
      await expect(page).toHaveURL(`${baseURL}${features[7].path}${miloLibs}`);
    });

    await test.step('step-2: Verify video block content/specs', async () => {
      await expect(await video.modalVideo).toBeVisible();

      expect(await webUtil.verifyAttributes_(video.modalVideo, video.attributes['video.autoplay'])).toBeTruthy();
      expect(await webUtil.verifyAttributes_(video.modalVideoSource, video.attributes['video.source'])).toBeTruthy();

      const srcAttributeValue = await video.modalVideoSource.getAttribute('src');
      console.log('[video source]:', srcAttributeValue);
      expect(srcAttributeValue).not.toBe('');
    });

    await test.step('step-3: Verify browser console errors', async () => {
      if (consoleErrors.length > knownConsoleErrors.length) {
        console.log('[Console error]:', consoleErrors);
      }
      expect.soft(consoleErrors.length).toBeLessThanOrEqual(knownConsoleErrors.length);
    });
  });

  // Test 8 : Modal video with cards
  test(`${features[8].name},${features[8].tags}`, async ({ page, baseURL }) => {
    test.slow();
    console.info(`[Test Page]: ${baseURL}${features[8].path}${miloLibs}`);
    const { data } = features[8];

    await test.step('step-1: Go to video block test page', async () => {
      await page.goto(`${baseURL}${features[8].path}${miloLibs}`);
      await page.waitForLoadState('domcontentloaded');
      await expect(page).toHaveURL(`${baseURL}${features[8].path}${miloLibs}`);
    });

    await test.step('step-2: Verify consonant cards with modal video block content/specs', async () => {
      await expect(await video.consonantCardsGrid).toBeVisible();
      await expect(await video.consonantCards.nth(0)).toBeVisible();
      await expect(await video.consonantCards).toHaveCount(data.cardsCount);

      await expect(await video.modalVideo).toBeVisible();
      expect(await webUtil.verifyAttributes_(video.modalVideo, video.attributes['video.autoplay'])).toBeTruthy();
      expect(await webUtil.verifyAttributes_(video.modalVideoSource, video.attributes['video.source'])).toBeTruthy();

      const srcAttributeValue = await video.modalVideoSource.getAttribute('src');
      console.log('[video source]:', srcAttributeValue);
      expect(srcAttributeValue).not.toBe('');
    });

    await test.step('step-3: Verify browser console errors', async () => {
      if (consoleErrors.length > knownConsoleErrors.length) {
        console.log('[Console error]:', consoleErrors);
      }
      expect.soft(consoleErrors.length).toBeLessThanOrEqual(knownConsoleErrors.length);
    });
  });
});
