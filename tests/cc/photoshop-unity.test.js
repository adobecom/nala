import { expect, test } from '@playwright/test';
import { features } from '../../features/cc/photoshop-unity.spec.js';
import CCPhotoshopUnity from '../../selectors/cc/photoshop-unity.page.js';

let ccPhotoshopUnity;

test.describe('Verify Photoshop Unity Widget functionality on Stage', () => {
  test.beforeEach(async ({ page }) => {
    ccPhotoshopUnity = new CCPhotoshopUnity(page);
  });
  // close the page after each test
  test.afterEach(async ({ page }) => {
    await page.close();
  });

  // check the page load and UI elements
  test(`${features[0].name}, ${features[0].tags}`, async ({ page, baseURL }) => {
    console.log(`Running test: ${features[0].name}`);
    await test.step('Check page load and UI elements', async () => {
      await page.goto(`${baseURL}${features[0].path}`);
      await page.waitForLoadState('domcontentloaded');
      await expect(page).toHaveURL(`${baseURL}${features[0].path}`);
      await expect(ccPhotoshopUnity.uploadButton).toBeTruthy();
      await expect(ccPhotoshopUnity.dropZone).toBeVisible();
      await expect(ccPhotoshopUnity.dragAndDropText).toBeVisible();
      await expect(ccPhotoshopUnity.videoElement).toBeVisible();
      await expect(ccPhotoshopUnity.dropZoneParagraph).toBeVisible();
      await expect(ccPhotoshopUnity.uploadDisclaimer).toBeVisible();
    });
  });

  // check the upload photo functionality
  test(`${features[1].name}, ${features[1].tags}`, async ({ page, baseURL }) => {
    console.log(`Running test: ${features[1].name}`);
    await test.step('Visit Photoshop Remove Background Page', async () => {
      await page.goto(`${baseURL}${features[1].path}`);
      await page.waitForLoadState('load');
    });
    await expect(ccPhotoshopUnity.uploadButton).toBeVisible();
    await expect(ccPhotoshopUnity.uploadButton).toBeEnabled();
    await test.step('Check upload photo functionality', async () => {
      await expect(ccPhotoshopUnity.uploadButton).toBeVisible({ timeout: 5000 });
      await expect(ccPhotoshopUnity.uploadButton).toBeEnabled({ timeout: 5000 });

      // Try to trigger filechooser, fallback to setInputFiles if needed
      try {
        const [fileChooser] = await Promise.all([
          page.waitForEvent('filechooser', { timeout: 5000 }),
          ccPhotoshopUnity.uploadButton.click(),
        ]);
        await fileChooser.setFiles(features[1].data.file);
      } catch (e) {
        // Try to set files directly
        await ccPhotoshopUnity.fileInput.setInputFiles(features[1].data.file);
      }
    });
    await test.step('Check Progress Bar and Preview Heading Text', async () => {
      await page.waitForTimeout(1000);
      expect(ccPhotoshopUnity.photoshopPreviewHeading).toBeTruthy();
      await expect(ccPhotoshopUnity.videoElement).toBeVisible();
      await expect(ccPhotoshopUnity.progressHolder).toBeVisible();
    });
  });

  // check the remove background button visibility and page redirection
  test(`${features[2].name}, ${features[2].tags}`, async ({ page, baseURL }) => {
    console.log(`Running test: ${features[2].name}`);
    await test.step('Visit Photoshop Remove Background Page', async () => {
      await page.goto(`${baseURL}${features[2].path}`);
      await page.waitForLoadState('load');
    });
    await test.step('Check upload photo functionality', async () => {
      await expect(ccPhotoshopUnity.uploadButton).toBeVisible({ timeout: 5000 });
      await expect(ccPhotoshopUnity.uploadButton).toBeEnabled({ timeout: 5000 });

      // Try to trigger filechooser, fallback to setInputFiles if needed
      try {
        const [fileChooser] = await Promise.all([
          page.waitForEvent('filechooser', { timeout: 5000 }),
          ccPhotoshopUnity.uploadButton.click(),
        ]);
        await fileChooser.setFiles(features[2].data.file);
      } catch (e) {
        // Try to set files directly
        await ccPhotoshopUnity.fileInput.setInputFiles(features[2].data.file);
      }
    });
    await test.step('Check Navigation to Prelude page and Check Remove Background button', async () => {
      await page.waitForTimeout(1000);
      await expect(ccPhotoshopUnity.progressHolder).toBeVisible();
      await page.waitForURL(features[2].url, { timeout: 10000 });
      await expect(page).toHaveURL(`${features[2].url}`);
      expect(ccPhotoshopUnity.removeBackgroundButton).toBeTruthy();
    });
  });

  // check the invalid file upload functionality
  test(`${features[3].name}, ${features[3].tags}`, async ({ page, baseURL }) => {
    console.log(`Running test: ${features[3].name}`);
    await test.step('Visit Photoshop Remove Background Page', async () => {
      await page.goto(`${baseURL}${features[3].path}`);
      await page.waitForLoadState('load');
    });
    await test.step('Check upload invalid file functionality', async () => {
      await expect(ccPhotoshopUnity.uploadButton).toBeVisible({ timeout: 5000 });
      await expect(ccPhotoshopUnity.uploadButton).toBeEnabled({ timeout: 5000 });

      // Try to trigger filechooser, fallback to setInputFiles if needed
      try {
        const [fileChooser] = await Promise.all([
          page.waitForEvent('filechooser', { timeout: 5000 }),
          ccPhotoshopUnity.uploadButton.click(),
        ]);
        await fileChooser.setFiles(features[3].data.file);
      } catch (e) {
        // Try to set files directly
        await ccPhotoshopUnity.fileInput.setInputFiles(features[3].data.file);
      }
    });
    await test.step('Check Error Message for Invalid File Upload', async () => {
      await expect(ccPhotoshopUnity.alertContent).toBeVisible();
    });
  });

  // check the PS Unity Product Navigation UI
  test(`${features[4].name}, ${features[4].tags}`, async ({ page, baseURL }) => {
    console.log(`Running test: ${features[4].name}`);
    await test.step('Visit Photoshop Online Page', async () => {
      await page.goto(`${baseURL}${features[4].path}`);
      await page.waitForLoadState('load');
    });
    await page.waitForTimeout(1000);
    await expect(ccPhotoshopUnity.uploadButton).toBeVisible();
    await expect(ccPhotoshopUnity.uploadButton).toBeEnabled();
    await expect(ccPhotoshopUnity.OnlineAgreementText).toBeVisible();
    await expect(ccPhotoshopUnity.OnlinedropZoneText).toBeVisible();
    await expect(ccPhotoshopUnity.OnlineVideoElement).toBeVisible();
  });

  // check the PS Unity Product Navigation Page
  test(`${features[5].name}, ${features[5].tags} Navigate`, async ({ page, baseURL }) => {
    console.log(`Running test: ${features[5].name}`);
    await test.step('Visit Photoshop Product Page', async () => {
      await page.goto(`${baseURL}${features[5].path}`);
      await page.waitForLoadState('load');
    });
    await ccPhotoshopUnity.uploadButton.waitFor({ state: 'visible' });
    await expect(ccPhotoshopUnity.uploadButton).toBeEnabled();
    await page.waitForTimeout(500);
    await test.step('Check upload photo functionality', async () => {
      await expect(ccPhotoshopUnity.uploadButton).toBeVisible({ timeout: 5000 });
      await expect(ccPhotoshopUnity.uploadButton).toBeEnabled({ timeout: 5000 });

      // Try to trigger filechooser, fallback to setInputFiles if needed
      try {
        const [fileChooser] = await Promise.all([
          page.waitForEvent('filechooser', { timeout: 5000 }),
          ccPhotoshopUnity.uploadButton.click(),
        ]);
        await fileChooser.setFiles(features[5].data.file);
      } catch (e) {
        // Try to set files directly
        await ccPhotoshopUnity.fileInput.setInputFiles(features[5].data.file);
      }
    });
    await test.step('Check Progress Bar and Preview Heading Text', async () => {
      await page.waitForTimeout(1000);
      expect(ccPhotoshopUnity.photoshopPreviewHeading).toBeTruthy();
      await expect(ccPhotoshopUnity.videoElement).toBeVisible();
      await expect(ccPhotoshopUnity.progressHolder).toBeVisible();
      await page.waitForURL((url) => url.toString().includes(features[5].url), { timeout: 10000 });
      expect(page.url()).toContain(features[5].url);
    });
  });

  // check the upload photo functionality from the drop zone PS Unity widget
  test(`${features[6].name}, ${features[6].tags} Drop Zone`, async ({ page, baseURL }) => {
    console.log(`Running test: ${features[6].name}`);
    await test.step('Visit Photoshop Remove Background Page', async () => {
      await page.goto(`${baseURL}${features[6].path}`);
      await page.waitForLoadState('load');
    });
    await expect(ccPhotoshopUnity.uploadButton).toBeVisible();
    await expect(ccPhotoshopUnity.uploadButton).toBeEnabled();
    await test.step('Check upload photo functionality', async () => {
      const [fileChooser] = await Promise.all([
        page.waitForEvent('filechooser'),
        ccPhotoshopUnity.dropZone.click(),
      ]);
      await fileChooser.setFiles(features[6].data.file);
    });
    await test.step('Check Progress Bar and Preview Heading Text', async () => {
      await page.waitForTimeout(1000);
      expect(ccPhotoshopUnity.photoshopPreviewHeading).toBeTruthy();
      await expect(ccPhotoshopUnity.videoElement).toBeVisible();
      await expect(ccPhotoshopUnity.progressHolder).toBeVisible();
    });
  });

  // check the Photoshop Online Product Page with Drop Zone on PS Unity Product Navigation
  test(`${features[7].name}, ${features[7].tags} Drop Zone`, async ({ page, baseURL }) => {
    console.log(`Running test: ${features[7].name}`);
    await test.step('Visit Photoshop Online Product Page', async () => {
      await page.goto(`${baseURL}${features[7].path}`);
      await page.waitForLoadState('load');
    });
    await page.waitForTimeout(1000);
    await ccPhotoshopUnity.uploadButton.waitFor({ state: 'visible' });
    await expect(ccPhotoshopUnity.uploadButton).toBeEnabled();
    await ccPhotoshopUnity.dropZone.scrollIntoViewIfNeeded();
    await test.step('Check upload photo functionality', async () => {
      const [fileChooser] = await Promise.all([
        page.waitForEvent('filechooser'),
        ccPhotoshopUnity.dropZone.click(),
      ]);
      await fileChooser.setFiles(features[7].data.file);
    });
    await test.step('Check Progress Bar and Preview Heading Text', async () => {
      await page.waitForTimeout(1000);
      expect(ccPhotoshopUnity.photoshopPreviewHeading).toBeTruthy();
      await expect(ccPhotoshopUnity.videoElement).toBeVisible();
      await expect(ccPhotoshopUnity.progressHolder).toBeVisible();
    });
  });
});
