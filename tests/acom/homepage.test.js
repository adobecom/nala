import { expect, test } from '@playwright/test';
import { features } from '../../features/acom/homepage.spec.js';
import AcomHomePage from '../../selectors/acom/home.page.js';

test.describe('Acom Home page test suite', () => {
  // Verify Jarvis initialization on acom homepage
  test(`${features[0].name},${features[0].tags}`, async ({ page, baseURL }) => {
    const Acom = new AcomHomePage(page);
    console.info(`[Test Page]: ${baseURL}${features[0].path}`);

    await test.step('Go to Acom home page', async () => {
      const requestGnavPromise = page.waitForResponse('https://www.adobe.com/libs/blocks/global-navigation/utilities/keyboard/mainNav.js');
      await page.goto(`${baseURL}`);
      await expect(page).toHaveURL(`${baseURL}`);
      await requestGnavPromise;
    });

    await test.step('Click Help & Support from the main menu', async () => {
      await expect(Acom.helpSupportMenu).toBeVisible();  
      await Acom.helpSupportMenu.click();
    });

    await test.step('Initialize Jarvis', async () => {
      await expect(Acom.contactUsCTA).toBeVisible();
      // page does not load jarvis functionality fast enough 
      // resulting in navigating to old helpx page instead of triggering jarvis popup
      await page.waitForTimeout(1000);
      await Acom.contactUsCTA.click();
      await expect(Acom.jarvisContainer).toBeVisible({timeout: 2000});
    });

  });
});
