import { expect, test } from '@playwright/test';
import { features } from '../../features/milo/tabs.block.spec.js';
import TabBlock from '../../selectors/milo/tabs.block.page.js';

let tab;

test.describe('Milo Tab block feature test suite', () => {
  test.beforeEach(async ({ page }) => {
    tab = new TabBlock(page);
  });

  // Test 0 : Tabs (xl-spacing)
  test(`${features[0].name},${features[0].tags}`, async ({ page, baseURL }) => {
    console.info(`[Test Page]: ${baseURL}${features[0].path}`);
    const data = features[0].data;

    await test.step('step-1: Go to Tabs block feature test page', async () => {
      await page.goto(`${baseURL}${features[0].path}`);
      await page.waitForLoadState('domcontentloaded');
      await expect(page).toHaveURL(`${baseURL}${features[0].path}`);    
    });

    await test.step('step-2: Verify tabs content/specs', async () => {
      await expect(await tab.xlTab).toBeVisible();
      await expect(await tab.tabsCount).toHaveCount(data.tabsCount);
      //verify default tab contents
      await expect(await tab.tab2).toHaveAttribute('aria-selected', 'true')
      await expect(await tab.tab2Panel).toBeVisible();
      await expect(await tab.tab2Panel).toContainText(data.tab2Text)

      //click tabs and verify contents
      await expect(await tab.tab1).toHaveAttribute('aria-selected', 'false')
      await tab.tab1.click()
      await expect(await tab.tab1Panel).toBeVisible();
      await expect(await tab.tab1Panel).toContainText(data.tab1Text);
      
      await expect(await tab.tab3).toHaveAttribute('aria-selected', 'false')
      await tab.tab3.click()
      await expect(await tab.tab3Panel).toBeVisible();
      await expect(await tab.tab3Panel).toContainText(data.tab3Text);
    });
  });

  // Test 1 : Tabs (Quiet, Dark, Center)
  test(`${features[1].name},${features[1].tags}`, async ({ page, baseURL }) => {
    console.info(`[Test Page]: ${baseURL}${features[1].path}`);
    const data = features[1].data;

    await test.step('step-1: Go to Tabs block feature test page', async () => {
      await page.goto(`${baseURL}${features[1].path}`);
      await page.waitForLoadState('domcontentloaded');
      await expect(page).toHaveURL(`${baseURL}${features[1].path}`);    
    });

    await test.step('step-2: Verify tabs content/specs', async () => {
      await expect(await tab.queitDarkTab).toBeVisible();
      await expect(await tab.tabsCount).toHaveCount(data.tabsCount);
      //verify default tab contents
      await expect(await tab.tab2).toHaveAttribute('aria-selected', 'true')
      await expect(await tab.tab2Panel).toBeVisible();
      await expect(await tab.tab2Panel).toContainText(data.tab2Text)

      //click tabs and verify contents
      await expect(await tab.tab1).toHaveAttribute('aria-selected', 'false')
      await tab.tab1.click()
      await expect(await tab.tab1Panel).toBeVisible();
      await expect(await tab.tab1Panel).toContainText(data.tab1Text);
      
      await expect(await tab.tab3).toHaveAttribute('aria-selected', 'false')
      await tab.tab3.click()
      await expect(await tab.tab3Panel).toBeVisible();
      await expect(await tab.tab3Panel).toContainText(data.tab3Text);
    });
  });

});



