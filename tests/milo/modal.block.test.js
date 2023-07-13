import { expect, test } from '@playwright/test';
import { features } from '../../features/milo/modal.block.spec.js';
import { Modal } from '../../selectors/milo/modal.block.page.js';

let modal;

test.describe('Milo Modal feature test suite', () => {
  test.beforeEach(async ({ page }) => {
    modal = new Modal(page);
  });

  test(`${features[0].name},${features[0].tags}`, async ({ page, baseURL }) => {
    console.info(`[Test Page]: ${baseURL}${features[0].path}`);

    await test.step('step-1: Go to Modal feature test page', async () => {
      await page.goto(`${baseURL}${features[0].path}`);
      await page.waitForLoadState('domcontentloaded');
      await expect(page).toHaveURL(`${baseURL}${features[0].path}`);
    });

    await test.step('step-2: Verify Modal text fragment content/specs', async () => {
      const modalData = features[0].data;
      expect(await modal.verifyModal(modalData)).toBeTruthy();
    });
  });

  test(`${features[1].name}, ${features[1].tags}`, async ({ page, baseURL }) => {
    console.info(`[Test Page]: ${baseURL}${features[1].path}`);

    await test.step('step-1: Go to Modal feature test page', async () => {
      await page.goto(`${baseURL}${features[1].path}`);
      await page.waitForLoadState('domcontentloaded');
      await expect(page).toHaveURL(`${baseURL}${features[1].path}`);
    });

    await test.step('step-2: Verify Modal media fragement content/specs', async () => {
      const modalData = features[1].data;
      expect(await modal.verifyModal(modalData)).toBeTruthy();
    });
  });
});
