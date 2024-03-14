import { expect, test } from '@playwright/test';
import { WebUtil } from '../../libs/webutil.js';
import { features } from '../../features/milo/actionitem.block.spec.js';
import ActionItem from '../../selectors/milo/actionitem.block.page.js';

let actionItem;
let webUtil;

const miloLibs = process.env.MILO_LIBS || '';

test.describe('Milo Action-Item block test suite', () => {
  test.beforeEach(async ({ page }) => {
    actionItem = new ActionItem(page);
    webUtil = new WebUtil(page);
  });

  // Test 0 : Action-Item (Small)
  test(`${features[0].name},${features[0].tags}`, async ({ page, baseURL }) => {
    console.info(`[Test Page]: ${baseURL}${features[0].path}${miloLibs}`);
    const data = features[0].data;

    await test.step('step-1: Go to Action item block test page', async () => {
      await page.goto(`${baseURL}${features[0].path}${miloLibs}`);
      await page.waitForLoadState('domcontentloaded');
      await expect(page).toHaveURL(`${baseURL}${features[0].path}${miloLibs}`);    
    });

    await test.step('step-2: Verify Action item content/specs', async () => {
      await expect(await actionItem.small).toBeVisible();
      await expect(await actionItem.image).toBeVisible();
      await expect(await actionItem.image).toHaveCSS('min-height', data.imgMinHeight);

      await expect(await actionItem.bodyTextLink).toBeVisible();
      await expect(await actionItem.bodyText).toContainText(data.bodyText);
    });
  });

  // Test 1 : Action-Item (Medium)
  test(`${features[1].name},${features[1].tags}`, async ({ page, baseURL }) => {
    console.info(`[Test Page]: ${baseURL}${features[1].path}${miloLibs}`);
    const data = features[1].data;

    await test.step('step-1: Go to Action item block test page', async () => {
      await page.goto(`${baseURL}${features[1].path}${miloLibs}`);
      await page.waitForLoadState('domcontentloaded');
      await expect(page).toHaveURL(`${baseURL}${features[1].path}${miloLibs}`);    
    });

    await test.step('step-2: Verify Action item content/specs', async () => {
      await expect(await actionItem.medium).toBeVisible();
      await expect(await actionItem.image).toBeVisible();
      await expect(await actionItem.image).toHaveCSS('min-height', data.imgMinHeight);

      await expect(await actionItem.bodyTextLink).toBeVisible();
      await expect(await actionItem.bodyText).toContainText(data.bodyText);
    });
  });
  
  // Test 2 : Action-Item (Large)
  test(`${features[2].name},${features[2].tags}`, async ({ page, baseURL }) => {
    console.info(`[Test Page]: ${baseURL}${features[2].path}${miloLibs}`);
    const data = features[2].data;

    await test.step('step-1: Go to Action item block test page', async () => {
      await page.goto(`${baseURL}${features[2].path}${miloLibs}`);
      await page.waitForLoadState('domcontentloaded');
      await expect(page).toHaveURL(`${baseURL}${features[2].path}${miloLibs}`);    
    });

    await test.step('step-2: Verify Action item content/specs', async () => {
      await expect(await actionItem.large).toBeVisible();
      await expect(await actionItem.image).toBeVisible();
      await expect(await actionItem.image).toHaveCSS('min-height', data.imgMinHeight);

      await expect(await actionItem.bodyTextLink).toBeVisible();
      await expect(await actionItem.bodyText).toContainText(data.bodyText);
    });
  });

  // Test 3 : Action-Item (Center)
  test(`${features[3].name},${features[3].tags}`, async ({ page, baseURL }) => {
    console.info(`[Test Page]: ${baseURL}${features[3].path}${miloLibs}`);
    const data = features[3].data;

    await test.step('step-1: Go to Action item block test page', async () => {
      await page.goto(`${baseURL}${features[3].path}${miloLibs}`);
      await page.waitForLoadState('domcontentloaded');
      await expect(page).toHaveURL(`${baseURL}${features[3].path}${miloLibs}`);    
    });

    await test.step('step-2: Verify Action item content/specs', async () => {
      await expect(await actionItem.center).toBeVisible();
      await expect(await actionItem.image).toBeVisible();

      await expect(await actionItem.bodyTextLink).toBeVisible();
      await expect(await actionItem.bodyText).toContainText(data.bodyText);
    });
  });
  
  // Test 4 : Action-Item (Rounded)
  test(`${features[4].name},${features[4].tags}`, async ({ page, baseURL }) => {
    console.info(`[Test Page]: ${baseURL}${features[4].path}${miloLibs}`);
    const data = features[4].data;

    await test.step('step-1: Go to Action item block test page', async () => {
      await page.goto(`${baseURL}${features[4].path}${miloLibs}`);
      await page.waitForLoadState('domcontentloaded');
      await expect(page).toHaveURL(`${baseURL}${features[4].path}${miloLibs}`);    
    });

    await test.step('step-2: Verify Action item content/specs', async () => {
      await expect(await actionItem.rounded).toBeVisible();
      await expect(await actionItem.image).toBeVisible();
      await expect(await actionItem.image).toHaveCSS('border-radius', data.borderRadius);

      await expect(await actionItem.bodyTextLink).toBeVisible();
      await expect(await actionItem.bodyText).toContainText(data.bodyText);
    });
  });
  
  // Test 5 : Action-Item (Float Button)
  test(`${features[5].name},${features[5].tags}`, async ({ page, baseURL }) => {
    console.info(`[Test Page]: ${baseURL}${features[5].path}${miloLibs}`);
    const data = features[5].data;

    await test.step('step-1: Go to Action item block test page', async () => {
      await page.goto(`${baseURL}${features[5].path}${miloLibs}`);
      await page.waitForLoadState('domcontentloaded');
      await expect(page).toHaveURL(`${baseURL}${features[5].path}${miloLibs}`);    
    });

    await test.step('step-2: Verify Action item content/specs', async () => {
      await expect(await actionItem.floatButton).toBeVisible();
      await expect(await actionItem.image).toBeVisible();
      await expect(await actionItem.floatOutlineButton).toBeVisible();
      await expect(await actionItem.floatOutlineButton).toContainText(data.floatButtonText);
    });
  }); 
  
  // Test 6 : Action-Item (scroller)
  test(`${features[6].name},${features[6].tags}`, async ({ page, baseURL }) => {
    console.info(`[Test Page]: ${baseURL}${features[6].path}${miloLibs}`);
    const data = features[6].data;

    await test.step('step-1: Go to Action item block test page', async () => {
      await page.goto(`${baseURL}${features[6].path}${miloLibs}`);
      await page.waitForLoadState('domcontentloaded');
      await expect(page).toHaveURL(`${baseURL}${features[6].path}${miloLibs}`);    
    });

    await test.step('step-2: Verify Action item content/specs', async () => {
      await expect(await actionItem.actionScroller).toBeVisible();
      await expect(await actionItem.scroller).toBeVisible();
      await expect(await actionItem.scrollerActionItems).toHaveCount(data.actionItemsCount);

      await expect(await actionItem.image).toBeVisible();
      await expect(await actionItem.bodyText).toContainText(data.bodyText);
    });
  }); 
  
  // Test 7 : Action-Item (scroller)
  test(`${features[7].name},${features[7].tags}`, async ({ page, baseURL }) => {
    console.info(`[Test Page]: ${baseURL}${features[7].path}${miloLibs}`);
    const data = features[7].data;

    await test.step('step-1: Go to Action item block test page', async () => {
      await page.goto(`${baseURL}${features[7].path}${miloLibs}`);
      await page.waitForLoadState('domcontentloaded');
      await expect(page).toHaveURL(`${baseURL}${features[7].path}${miloLibs}`);    
    });

    await test.step('step-2: Verify Action item content/specs', async () => {
      await expect(await actionItem.actionScroller).toBeVisible();
      await expect(await actionItem.scroller).toBeVisible();
      await expect(await actionItem.scrollerActionItems).toHaveCount(data.actionItemsCount);

      await expect(await actionItem.image).toBeVisible();
      await expect(await actionItem.bodyText).toContainText(data.bodyText);

      await expect(await actionItem.nextButton).toBeVisible({timeout: 1000});
      await actionItem.nextButton.click();
      await expect(await actionItem.previousButton).toBeVisible({timeout: 1000});
      await expect(await actionItem.navigationNext).toHaveAttribute('hide-btn','false');
    });
  });  
});

