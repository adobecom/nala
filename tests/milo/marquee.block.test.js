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

    await test.step('step-2: Verify marquee(light) specs', async () => {
      const { data } = features[0];
 
      await expect(await marquee.marqueeLight).toBeVisible();

      await expect(await marquee.headingXL1).toContainText(data.h2Text);
      await expect(await marquee.bodyM).toContainText(data.bodyText);
      await expect(await marquee.outlineButton).toContainText(data.outlineButtonText);
      await expect(await marquee.blueButton).toContainText(data.blueButtonText);

      await expect(await marquee.backgroundImage).toBeVisible();    
      expect(await webUtil.verifyAttributes_(marquee.backgroundImage, marquee.attributes['marquee.light']['backgroundImg'])).toBeTruthy();
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

    await test.step('step-2: Verify Marquee (small) specs', async () => {
      const { data } = features[1];

      await expect(await marquee.marqueeSmall).toBeVisible();      

      await expect(await marquee.headingXL).toContainText(data.h2Text);
      await expect(await marquee.bodyM).toContainText(data.bodyText);
      await expect(await marquee.blueButton).toContainText(data.blueButtonText);      

      await expect(await marquee.backgroundImage).toBeVisible();
      expect(await webUtil.verifyAttributes_(marquee.backgroundImage, marquee.attributes['marquee.small']['backgroundImg'])).toBeTruthy();
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

    await test.step('step-2: Verify Marquee (small, light) specs', async () => {
      const { data } = features[2];

      await expect(await marquee.marqueeSmallLight).toBeVisible();

      await expect(await marquee.detailM).toContainText(data.detailText);
      await expect(await marquee.headingXL).toContainText(data.h2Text);
      await expect(await marquee.bodyM).toContainText(data.bodyText);
      await expect(await marquee.outlineButton).toContainText(data.outlineButtonText);        
      await expect(await marquee.blueButton).toContainText(data.blueButtonText);
      
      await expect(await marquee.backgroundImage).toBeVisible();
      expect(await webUtil.verifyAttributes_(marquee.backgroundImage, marquee.attributes['marquee.small.light']['backgroundImg'])).toBeTruthy();
      
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

    await test.step('step-2: Verify Marquee (large) specs', async () => {
      const { data } = features[3];

      await expect(await marquee.marqueeLarge).toBeVisible();

      await expect(await marquee.headingXXL).toContainText(data.h2Text);
      await expect(await marquee.bodyXL).toContainText(data.bodyText);
      await expect(await marquee.outlineButtonXL).toContainText(data.outlineButtonText);      
      await expect(await marquee.blueButtonXL).toContainText(data.blueButtonText);

      await expect(await marquee.backgroundImage).toBeVisible();
      expect(await webUtil.verifyAttributes_(marquee.backgroundImage, marquee.attributes['marquee.large']['backgroundImg'])).toBeTruthy();
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

    await test.step('step-2: Verify Marquee (large, light) specs', async () => {
      const { data } = features[4];

      await expect(await marquee.marqueeLargeLight).toBeVisible();

      await expect(await marquee.headingXXL).toContainText(data.h2Text);
      await expect(await marquee.bodyXL).toContainText(data.bodyText);
      await expect(await marquee.outlineButtonXL).toContainText(data.outlineButtonText);        
      await expect(await marquee.blueButtonXL).toContainText(data.blueButtonText);

      await expect(await marquee.backgroundImage).toBeVisible();
      expect(await webUtil.verifyAttributes_(marquee.backgroundImage, marquee.attributes['marquee.large.light']['backgroundImg'])).toBeTruthy();
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

    await test.step('step-2: Verify Marquee (quiet) specs', async () => {
      const { data } = features[5];

      await expect(await marquee.marqueeQuiet).toBeVisible();

      await expect(await marquee.detailM).toContainText(data.detailText);
      await expect(await marquee.headingXL).toContainText(data.h2Text);
      await expect(await marquee.bodyM).toContainText(data.bodyText);   
      await expect(await marquee.blueButton).toContainText(data.blueButtonText); 
      
      await expect(await marquee.backgroundImage).toBeHidden();      
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

      await expect(await marquee.marqueeInline).toBeVisible();

      await expect(await marquee.detailM).toContainText(data.detailText);
      await expect(await marquee.headingXL).toContainText(data.h2Text);
      await expect(await marquee.bodyM).toContainText(data.bodyText);

      await expect(await marquee.backgroundImage).toBeHidden();
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

    await test.step('step-2: Verify Marquee (split, small) specs', async () => {
      const { data } = features[7];

      await expect(marquee.marqueeSplitSmall).toBeVisible();

      await expect(await marquee.detailM).toContainText(data.detailText);
      await expect(await marquee.headingXL).toContainText(data.h2Text);
      await expect(await marquee.bodyM).toContainText(data.bodyText);
      await expect(await marquee.outlineButton).toContainText(data.outlineButtonText);      
      await expect(await marquee.blueButton).toContainText(data.blueButtonText);

      expect(await webUtil.verifyAttributes_(marquee.marqueeSplitSmall, marquee.attributes['marquee.split.small']['style'])).toBeTruthy();
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

    await test.step('step-2: Verify Marquee (split, large) specs ', async () => {
      const { data } = features[8];

      await expect(await marquee.marqueeSplitLarge).toBeVisible();

      await expect(await marquee.detailL).toContainText(data.detailText);
      await expect(await marquee.headingXXL).toContainText(data.h2Text);
      await expect(await marquee.bodyXL).toContainText(data.bodyText);
      await expect(await marquee.blueButtonXL).toContainText(data.outlineButtonText);      
      await expect(await marquee.actionLink2).toContainText(data.linkText);
      
      await expect(await marquee.iconImage).toBeVisible();
      expect(await webUtil.verifyAttributes_(marquee.iconImage, marquee.attributes['marquee.split.large']['iconImg'])).toBeTruthy();

      await expect(await marquee.mediaImage).toBeVisible();
      expect(await webUtil.verifyAttributes_(marquee.mediaImage, marquee.attributes['marquee.split.large']['mediaImg'])).toBeTruthy();

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

    await test.step('step-2: Verify Marquee (split, one-third, large, light) specs', async () => {
      const { data } = features[9];

      await expect(marquee.marqueeSplitOneThirdLargeLight).toBeVisible();
      
      await expect(await marquee.detailL).toContainText(data.detailText);
      await expect(await marquee.headingXXL).toContainText(data.h2Text);
      await expect(await marquee.bodyXL).toContainText(data.bodyText);
      await expect(await marquee.blueButtonXL).toContainText(data.outlineButtonText);      
      await expect(await marquee.actionLink2).toContainText(data.linkText);

      await expect(await marquee.iconImage).toBeVisible();
      expect(await webUtil.verifyAttributes_(marquee.iconImage, marquee.attributes['marquee.split.one-third-large']['iconImg'])).toBeTruthy();

      await expect(await marquee.mediaImage).toBeVisible();
      expect(await webUtil.verifyAttributes_(marquee.mediaImage, marquee.attributes['marquee.split.one-third-large']['mediaImg'])).toBeTruthy();
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

    await test.step('step-2: Verify Marquee (split, one-third) specs', async () => {
      const { data } = features[10];
            
      await expect(await marquee.marqueeSplitOneThird).toBeVisible();

      await expect(await marquee.detailM).toContainText(data.detailText);
      await expect(await marquee.headingXL).toContainText(data.h2Text);
      await expect(await marquee.bodyM).toContainText(data.bodyText);
      await expect(await marquee.blueButtonL).toContainText(data.outlineButtonText);      
      await expect(await marquee.actionLink2).toContainText(data.linkText); 

      await expect(await marquee.iconImage).toBeVisible();
      expect(await webUtil.verifyAttributes_(marquee.iconImage, marquee.attributes['marquee.split.one-third']['iconImg'])).toBeTruthy();

      await expect(await marquee.mediaImage).toBeVisible();
      expect(await webUtil.verifyAttributes_(marquee.mediaImage, marquee.attributes['marquee.split.one-third']['mediaImg'])).toBeTruthy();
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

      await expect(marquee.marqueeSplitOneThirdSmallLight).toBeVisible();

      await expect(await marquee.detailM).toContainText(data.detailText);
      await expect(await marquee.headingXL).toContainText(data.h2Text);
      await expect(await marquee.bodyM).toContainText(data.bodyText);
      await expect(await marquee.blueButtonL).toContainText(data.outlineButtonText);

      await expect(await marquee.mediaImage).toBeVisible();
      expect(await webUtil.verifyAttributes_(marquee.mediaImage, marquee.attributes['marquee.split.one-third']['mediaImg'])).toBeTruthy();

    });

    await test.step('step-3: Verify and log if any console errors', async () => {
      consoleErrors.length > 0 && console.log('[Console error]:', consoleErrors);      
      expect.soft(consoleErrors.length).toBe(0);      
    });
  });

  test(`${features[12].name},${features[12].tags}`, async ({ page, baseURL }) => {
    console.info(`[Test Page]: ${baseURL}${features[12].path}`);

    await test.step('step-1: Go to Marquee (small) block test page', async () => {
      await page.goto(`${baseURL}${features[12].path}`);
      await page.waitForLoadState('domcontentloaded');
      await expect(page).toHaveURL(`${baseURL}${features[12].path}`);
    });

    await test.step('step-2: Verify Marquee (small) specs', async () => {
      const { data } = features[12];

      await expect(await marquee.marqueeSmall).toBeVisible();      

      await expect(await marquee.headingXL).toContainText(data.h2Text);
      await expect(await marquee.bodyM).toContainText(data.bodyText);
      await expect(await marquee.blueButton).toContainText(data.blueButtonText);      

      await expect(await marquee.backgroundVideo).toBeVisible();
      expect(await webUtil.verifyAttributes_(marquee.backgroundVideo, marquee.attributes['backgroundVideo.inline'])).toBeTruthy();
    });

    await test.step('step-3: Verify and log if any console errors', async () => {
      consoleErrors.length > 0 && console.log('[Console error]:', consoleErrors);      
      expect.soft(consoleErrors.length).toBe(0);      
    });
  });

  test(`${features[13].name},${features[13].tags}`, async ({ page, baseURL }) => {
    console.info(`[Test Page]: ${baseURL}${features[13].path}`);

    await test.step('step-1: Go to Marquee (large, light ) block test page', async () => {
      await page.goto(`${baseURL}${features[13].path}`);
      await page.waitForLoadState('domcontentloaded');
      await expect(page).toHaveURL(`${baseURL}${features[13].path}`);
    });

    await test.step('step-2: Verify Marquee (large, light) desktop background specs', async () => {
      const { data } = features[13];

      await expect(await marquee.marqueeLargeLight).toBeVisible();

      await expect(await marquee.headingXXL).toContainText(data.h2Text);
      await expect(await marquee.bodyXL).toContainText(data.bodyText);       
      await expect(await marquee.blueButtonXL).toContainText(data.blueButtonText);
      await expect(await marquee.actionLink2).toContainText(data.linkText); 

      await expect(await marquee.backgroundVideoDesktop).toBeVisible(); 
      expect(await webUtil.verifyAttributes_(marquee.backgroundVideoDesktop, marquee.attributes['backgroundVideo.inline'])).toBeTruthy();

      const sourceElement = await marquee.backgroundVideoDesktop.locator('source');
      expect(await sourceElement.getAttribute('src')).toContain('.mp4');
    });

    await test.step('step-3: Verify and log if any console errors', async () => {
      consoleErrors.length > 0 && console.log('[Console error]:', consoleErrors);      
      expect.soft(consoleErrors.length).toBe(0);      
    });
  });
});
