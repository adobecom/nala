import { expect, test } from '@playwright/test';
import { features } from '../../features/milo/marketo.block.spec.js';
import MarketoBlock from '../../selectors/milo/marketo.block.page.js';

let marketoBlock;

test.describe('Marketo block test suite', () => {
  test.beforeEach(async ({ page }) => {
    marketoBlock = new MarketoBlock(page);
  });

  test(`${features[0].name},${features[0].tags}`, async ({ page, baseURL }) => {
    const testPage = `${baseURL}${features[0].path}`;
    console.info(`[Test Page]: ${testPage}`);

    await test.step('step-1: Go to Marketo Block test page', async () => {
      await page.goto(testPage);
      await page.waitForLoadState('domcontentloaded');
      await expect(page).toHaveURL(testPage);
    });

    await test.step('step-2: Check the form fields display', async () => {
      await marketoBlock.checkFieldsDisplays();
    });

    await test.step('step-3: Fill in and submit the Marketo production form', async () => {
      await marketoBlock.submitProductionForm();
    });

    await test.step('step-4: Verify the form submission redirect', async () => {
      await expect(page).not.toHaveURL(testPage, { timeout: 15000 });
    });
  });

  test(`${features[1].name},${features[1].tags}`, async ({ page, baseURL }) => {
    const testPage = `${baseURL}${features[1].path}`;
    console.info(`[Test Page]: ${testPage}`);

    await test.step('step-1: Go to Marketo Block test page', async () => {
      await page.goto(testPage);
      await page.waitForLoadState('domcontentloaded');
      await expect(page).toHaveURL(testPage);
    });

    await test.step('step-2: Check the form fields display', async () => {
      await marketoBlock.checkFieldsDisplays();
    });

    await test.step('step-3: Fill in and submit Marketo short form', async () => {
      await marketoBlock.submitShortForm();
    });

    await test.step('step-4: Verify the form submission redirect', async () => {
      await expect(page).not.toHaveURL(testPage, { timeout: 15000 });
    });
  });
});
