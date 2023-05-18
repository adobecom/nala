import { expect, test } from '@playwright/test';
import Modal from '../../selectors/milo/modal.block.page.js';

const ModalSpec = require('../../features/milo/modal.block.spec.js');

const { features } = ModalSpec;

let modal;
// Modal feature tests
test.describe('Milo Modal feature test suite', () => {
  // before each test block
  test.beforeEach(async ({ page }) => {
    modal = new Modal(page);
  });

  // Test - 0
  test(`${features[0].name},${features[0].tags}`, async ({ page, baseURL }) => {
    console.info(`${baseURL}${features[0].path}`);
    // test step-1
    await test.step('Go to Modal feature test page', async () => {
      await page.goto(`${baseURL}${features[0].path}`);
      await page.waitForLoadState('domcontentloaded');
      await expect(page).toHaveURL(`${baseURL}${features[0].path}`);
    });

    // test step-2
    await test.step('Verify Modal text fragment content / specs ', async () => {
      // verify modal and its content
      const modalData = features[0].data;
      expect(await modal.verifyModal(modalData)).toBeTruthy();
    });
  });

  // Test - 1
  test(`${features[1].name}, ${features[1].tags}`, async ({ page, baseURL }) => {
    console.info(`${baseURL}${features[1].path}`);
    // test step-1
    await test.step('Go to Modal feature test page', async () => {
      await page.goto(`${baseURL}${features[1].path}`);
      await page.waitForLoadState('domcontentloaded');
      await expect(page).toHaveURL(`${baseURL}${features[1].path}`);
    });

    // test step-2
    await test.step('Verify Modal media fragement content / specs ', async () => {
      // verify modal and its content
      const modalData = features[1].data;
      expect(await modal.verifyModal(modalData)).toBeTruthy();
    });
  });
});
