import { expect, test } from '@playwright/test';
import { WebUtil } from '../../libs/webutil.js';
import { features } from '../../features/milo/personalization.spec.js';
import MarqueeBlock from '../../selectors/milo/marquee.block.page.js';
import TextBlock from '../../selectors/milo/text.block.page.js';

let webUtil;
let marquee;
let text;
let pznUrl;

test.describe('Milo Personalization feature test suite', () => {
  test.beforeEach(async ({ page }) => {
    webUtil = new WebUtil(page);
  });

  // Test 0 : Personalization (Replace content)
  test(`${features[0].name},${features[0].tags}`, async ({ page, baseURL }) => {
    console.info(`[Test Page]: ${baseURL}${features[0].path}`);
    const data = features[0].data;
    text = new TextBlock(page);
    marquee = new MarqueeBlock(page);
    pznUrl = `${baseURL}${features[0].path}${'?target='}${data.target}`

    await test.step('step-1: Go to default test page', async () => {
      await page.goto(`${baseURL}${features[0].path}`);
      await page.waitForLoadState('domcontentloaded');
      await expect(page).toHaveURL(`${baseURL}${features[0].path}`);    
    });

    await test.step('step-2: Verify default test page content/specs', async () => {
      await expect(await marquee.marquee).toBeVisible();
    });

    await test.step('step-3: Navigate to personlized page and verify content/specs', async () => {      
      await page.goto(pznUrl);
      await page.waitForLoadState('domcontentloaded');
      await expect(page).toHaveURL(pznUrl);

      await expect(await text.text).toBeVisible();
      await expect(await text.headline).toContainText(data.h3Text);

      const blockDll = await webUtil.getPznBlockDaalh('text', 1,data.pznExpName, data.pznFileName)
      await expect(await text.text).toHaveAttribute('daa-lh', blockDll);
    });

  });

  // Test 0 : Personalization (Insert Content Before)
  test(`${features[1].name},${features[1].tags}`, async ({ page, baseURL }) => {
    console.info(`[Test Page]: ${baseURL}${features[1].path}`);
    const data = features[1].data;
    text = new TextBlock(page);
    marquee = new MarqueeBlock(page);
    pznUrl = `${baseURL}${features[1].path}${'?target='}${data.target}`

    await test.step('step-1: Go to default test page', async () => {
      await page.goto(`${baseURL}${features[1].path}`);
      await page.waitForLoadState('domcontentloaded');
      await expect(page).toHaveURL(`${baseURL}${features[1].path}`);    
    });

    await test.step('step-2: Verify default test page content/specs', async () => {
      await expect(await marquee.marquee).toBeVisible();
    });

    await test.step('step-3: Navigate to personlized page and verify content/specs', async () => {      
      await page.goto(pznUrl);
      await page.waitForLoadState('domcontentloaded');
      await expect(page).toHaveURL(pznUrl);
      console.info(`[Pzn Page]: ${pznUrl}`);

      await expect(await text.text).toBeVisible();
      await expect(await text.headline).toContainText(data.h3Text);

      // text block Dll analytics
      const textBlockDll = await webUtil.getPznBlockDaalh('text', 1,data.pznExpName, data.pznFileName)
      await expect(await text.text).toHaveAttribute('daa-lh', textBlockDll);

      // Marquee block Dll analytics
      await expect(await marquee.marquee).toBeVisible();
      const marqueeBlockDll = await webUtil.getPznBlockDaalh('marquee', 2,data.pznExpName, data.pznFileName)
      await expect(await marquee.marquee).toHaveAttribute('daa-lh', marqueeBlockDll);
    });

  });  
});
