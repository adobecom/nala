import { expect, test } from '@playwright/test';
import { WebUtil } from '../../libs/webutil.js';
import { features } from '../../features/milo/video.block.spec.js';
import VideoBlock from '../../selectors/milo/video.block.page.js';

let webUtil;
let video;
let consoleErrors = [];
const knownConsoleErrors = ['Access-Control-Allow-Origin','Failed to load resource: net::ERR_FAILED'];

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

  test.afterEach(async () =>{
    consoleErrors = [];
  });  

  // Test 0 : Video default
  test(`${features[0].name},${features[0].tags}`, async ({ page, baseURL }) => {
    console.info(`[Test Page]: ${baseURL}${features[0].path}`);
    const { data } = features[0];

    await test.step('step-1: Go to video block test page', async () => {
      await page.goto(`${baseURL}${features[0].path}`);
      await page.waitForLoadState('domcontentloaded');
      await expect(page).toHaveURL(`${baseURL}${features[0].path}`);
    });

    await test.step('step-2: Verify video block content/specs', async () => {
      await expect(await video.video).toBeVisible();
      await expect(await video.content).toContainText(data.h2Text);

      expect(await webUtil.verifyAttributes_(video.video, video.attributes['video.default'])).toBeTruthy();
      expect(await webUtil.verifyAttributes_(video.videoSource, video.attributes['video.source'])).toBeTruthy();
    });

    await test.step('step-3: Verify analytics attributes', async () => {
      expect(await webUtil.verifyAttributes_(video.content, video.attributes['analytics']['content.daa-lh'])).toBeTruthy();        
    });

    await test.step('step-4: Verify browser console errors', async () => {
      consoleErrors.length > knownConsoleErrors.length && console.log('[Console error]:', consoleErrors);      
      expect.soft(consoleErrors.length).toBeLessThanOrEqual(knownConsoleErrors.length);      
    });    
  });

  // Test 1 : Video autoplay loop
  test(`${features[1].name},${features[1].tags}`, async ({ page, baseURL }) => {
    console.info(`[Test Page]: ${baseURL}${features[1].path}`);
    const { data } = features[1];

    await test.step('step-1: Go to video block test page', async () => {
      await page.goto(`${baseURL}${features[1].path}`);
      await page.waitForLoadState('domcontentloaded');
      await expect(page).toHaveURL(`${baseURL}${features[1].path}`);
    });

    await test.step('step-2: Verify video block content/specs', async () => {
      await expect(await video.video).toBeVisible();
      await expect(await video.content).toContainText(data.h2Text);

      expect(await webUtil.verifyAttributes_(video.video, video.attributes['video.autoplay'])).toBeTruthy();
      expect(await webUtil.verifyAttributes_(video.videoSource, video.attributes['video.source'])).toBeTruthy();
    });

    await test.step('step-3: Verify analytics attributes', async () => {
      expect(await webUtil.verifyAttributes_(video.content, video.attributes['analytics']['content.daa-lh'])).toBeTruthy();        
    });

    await test.step('step-4: Verify browser console errors', async () => {
      consoleErrors.length > knownConsoleErrors.length && console.log('[Console error]:', consoleErrors);      
      expect.soft(consoleErrors.length).toBeLessThanOrEqual(knownConsoleErrors.length);      
    });    
  });

  // Test 2 : Video autoplay loop once
  test(`${features[2].name},${features[2].tags}`, async ({ page, baseURL }) => {
    console.info(`[Test Page]: ${baseURL}${features[2].path}`);
    const { data } = features[2];

    await test.step('step-1: Go to video block test page', async () => {
      await page.goto(`${baseURL}${features[2].path}`);
      await page.waitForLoadState('domcontentloaded');
      await expect(page).toHaveURL(`${baseURL}${features[2].path}`);
    });

    await test.step('step-2: Verify video block content/specs', async () => {
      await expect(await video.video).toBeVisible();
      await expect(await video.content).toContainText(data.h2Text);

      expect(await webUtil.verifyAttributes_(video.video, video.attributes['video.autoplay.once'])).toBeTruthy();
      expect(await webUtil.verifyAttributes_(video.videoSource, video.attributes['video.source'])).toBeTruthy();
    });

    await test.step('step-3: Verify analytics attributes', async () => {
      expect(await webUtil.verifyAttributes_(video.content, video.attributes['analytics']['content.daa-lh'])).toBeTruthy();        
    });

    await test.step('step-4: Verify browser console errors', async () => {
      consoleErrors.length > knownConsoleErrors.length && console.log('[Console error]:', consoleErrors);      
      expect.soft(consoleErrors.length).toBeLessThanOrEqual(knownConsoleErrors.length);      
    });    
  }); 
  
  // Test 3 : Video hover play
  test(`${features[3].name},${features[3].tags}`, async ({ page, baseURL }) => {
    console.info(`[Test Page]: ${baseURL}${features[3].path}`);
    const { data } = features[3];

    await test.step('step-1: Go to video block test page', async () => {
      await page.goto(`${baseURL}${features[3].path}`);
      await page.waitForLoadState('domcontentloaded');
      await expect(page).toHaveURL(`${baseURL}${features[3].path}`);
    });

    await test.step('step-2: Verify video block content/specs', async () => {
      await expect(await video.video).toBeVisible();
      await expect(await video.content).toContainText(data.h2Text);
      await new Promise(resolve => setTimeout(resolve, 2000));
      await video.video.hover();

      expect(await webUtil.verifyAttributes_(video.video, video.attributes['video.autoplay.once'])).toBeTruthy();
      expect(await webUtil.verifyAttributes_(video.videoSource, video.attributes['video.source'])).toBeTruthy();
    });

    await test.step('step-3: Verify analytics attributes', async () => {
      expect(await webUtil.verifyAttributes_(video.content, video.attributes['analytics']['content.daa-lh'])).toBeTruthy();        
    });

    await test.step('step-4: Verify browser console errors', async () => {
      consoleErrors.length > knownConsoleErrors.length && console.log('[Console error]:', consoleErrors);      
      expect.soft(consoleErrors.length).toBeLessThanOrEqual(knownConsoleErrors.length);      
    });    
  }); 
});
