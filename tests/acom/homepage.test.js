import { expect, test } from '@playwright/test';
import { WebUtil } from '../../libs/webutil.js';
import { features } from '../../features/acom/homepage.spec.js';
import FedsHeader from '../../selectors/feds/feds.header.page.js';
import FedsJarvis from '../../selectors/feds/feds.jarvis.page.js';

let pageHeader;
let jarvis;
let webUtil;

test.describe('Acom Home page test suite', () => {
  test.beforeEach(async ({ page }) => {
    pageHeader = new FedsHeader(page);
    jarvis = new FedsJarvis(page);
    webUtil = new WebUtil(page);
  });

  // Verify Jarvis initialization on acom homepage
  test(`${features[0].name},${features[0].tags}`, async ({ page, baseURL }) => {
    console.info(`[Test Page]: ${baseURL}${features[0].path}`);

    await test.step('Go to Acom home page', async () => {
      const requestGnavPromise = page.waitForResponse('https://www.adobe.com/libs/blocks/global-navigation/utilities/keyboard/mainNav.js');
      await page.goto(`${baseURL}`);
      await expect(page).toHaveURL(`${baseURL}`);
      await requestGnavPromise;
    });

    await test.step('Click Help & Support from the main menu', async () => {
      await expect(pageHeader.helpSupportMenu).toBeVisible();  
      await pageHeader.helpSupportMenu.click();
    });

    await test.step('Initialize Jarvis', async () => {
      await expect(jarvis.jarvisHeaderButton).toBeVisible();
      // page does not load jarvis functionality fast enough 
      // resulting in navigating to old helpx page instead of triggering jarvis popup
      await page.waitForTimeout(1000);
      await jarvis.jarvisHeaderButton.click();
      await expect(jarvis.jarvisContainer).toBeVisible({timeout: 2000});
    });

  });
});
