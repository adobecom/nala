import { expect, test } from '@playwright/test';
import { features } from '../../features/milo/jarvis.spec.js';
import Jarvis from '../../selectors/milo/jarvis.feature.page.js';

let jarvischat;

test.describe('jarvis features test suite', () => {
 test.beforeEach(async ({ page }) => {
    jarvischat = new Jarvis(page);
  });

     test(`${features[0].name}, ${features[0].tags}`, async ({ page, baseURL }) => {
     console.info(`[Test Page]: ${baseURL}${features[0].path}`);
      await test.step('Navigate to page ', async () => {
      await page.goto(`${baseURL}${features[0].path}`);
      await page.waitForLoadState('domcontentloaded');
      await expect(page).toHaveURL(`${baseURL}${features[0].path}`);
    });
  
      await test.step('Validate jarvis icon present in page', async () => {
      // added explicit wait since jarvis take around ~5 seconds to load 
      await page.waitForTimeout(6000);
      await expect(jarvischat.jarvischaticon).toBeVisible();
      expect(jarvischat.jarvistooltip).toBeTruthy();
    });

  });

test(`${features[1].name},${features[1].tags}`, async ({ page, baseURL }) => {
    console.info(`[Test Page]: ${baseURL}${features[1].path}`);
    await test.step('Validate the jarvis button launch the chat window', async () => {
    await page.goto(`${baseURL}${features[1].path}`);
    await page.waitForLoadState('domcontentloaded');
    await expect(page).toHaveURL(`${baseURL}${features[1].path}`);
    });

    await test.step('Validate the jarvis button launch the chat window', async () => {
      // added explicit wait since jarvis take around ~5 seconds to load 
      await page.waitForTimeout(6000);       
      expect(jarvischat.jarvisiframewindow).toBeTruthy();
      await page.locator('//button[@id="adbmsgCta"]').click();
      expect(jarvischat.jarvishelptext).toBeTruthy();
    });
  });
 
});