import { expect, test } from '@playwright/test';
import { features } from '../../features/milo/marketo.block.spec.js';
import MarketoBlock from '../../selectors/milo/marketo.block.page.js';

let marketoBlock;
const WAIT_TIME = 10000;

test.describe('Marketo block test suite', () => {
  test.beforeEach(async ({ page }) => {
    marketoBlock = new MarketoBlock(page);
  });

  test(`0: @marketo production form, ${features[0].tags}`, async ({ page, baseURL }) => {
    const testPage = `${baseURL}${features[0].path}`;
    console.info(`[Test Page]: ${testPage}`);

    await test.step('step-1: Go to the Marketo block test page', async () => {
      await page.goto(testPage);
      await page.waitForLoadState('domcontentloaded');
      await expect(page).toHaveURL(testPage);
    });

    await test.step('step-2: Check the form fields display', async () => {
      await marketoBlock.checkFieldsDisplays();
    });

    await test.step('step-3: Fill in and submit the Marketo production form', async () => {
      await page.waitForTimeout(WAIT_TIME);
      await marketoBlock.submitProductionForm();
    });

    await test.step('step-4: Verify the form submission redirect', async () => {
      await expect(page).not.toHaveURL(testPage, { timeout: 15000 });
    });
  });

  test(`1: @marketo rfi template, ${features[1].tags}`, async ({ page, baseURL }) => {
    const testPage = `${baseURL}${features[1].path}`;
    console.info(`[Test Page]: ${testPage}`);

    await test.step('step-1: Go to the Marketo block RFI Template test page', async () => {
      await page.goto(testPage);
      await page.waitForLoadState('domcontentloaded');
      await expect(page).toHaveURL(testPage);
    });

    await test.step('step-2: Submit the form with valid inputs', async () => {
      await page.waitForTimeout(WAIT_TIME);
      await marketoBlock.submitRFITemplateForm();
    });

    await test.step('step-3: Verify the form submission redirect', async () => {
      await expect(page).not.toHaveURL(testPage, { timeout: 15000 });
    });
  });

  test(`2: @marketo discover template, ${features[2].tags}`, async ({ page, baseURL }) => {
    const testPage = `${baseURL}${features[2].path}`;
    console.info(`[Test Page]: ${testPage}`);

    await test.step('step-1: Go to the Marketo block discover template test page', async () => {
      await page.goto(testPage);
      await page.waitForLoadState('domcontentloaded');
      await expect(page).toHaveURL(testPage);
    });

    await test.step('step-2: Submit the form with valid inputs', async () => {
      await page.waitForTimeout(WAIT_TIME);
      await marketoBlock.submitDiscoverTemplateForm();
    });

    await test.step('step-3: Verify the form submission redirect', async () => {
      await expect(page).not.toHaveURL(testPage, { timeout: 15000 });
    });
  });

  test(`3: @marketo explore template, ${features[3].tags}`, async ({ page, baseURL }) => {
    const testPage = `${baseURL}${features[3].path}`;
    console.info(`[Test Page]: ${testPage}`);

    await test.step('step-1: Go to the Marketo block explore template test page', async () => {
      await page.goto(testPage);
      await page.waitForLoadState('domcontentloaded');
      await expect(page).toHaveURL(testPage);
    });

    await test.step('step-2: Submit the form with valid inputs', async () => {
      await page.waitForTimeout(WAIT_TIME);
      await marketoBlock.submitExploreTemplateForm();
    });

    await test.step('step-3: Verify the form submission redirect', async () => {
      await expect(page).not.toHaveURL(testPage, { timeout: 15000 });
    });
  });

  test(`4: @marketo evaluate template, ${features[4].tags}`, async ({ page, baseURL }) => {
    const testPage = `${baseURL}${features[4].path}`;
    console.info(`[Test Page]: ${testPage}`);

    await test.step('step-1: Go to the Marketo block evaluate template test page', async () => {
      await page.goto(testPage);
      await page.waitForLoadState('domcontentloaded');
      await expect(page).toHaveURL(testPage);
    });

    await test.step('step-2: Submit the form with valid inputs', async () => {
      await page.waitForTimeout(WAIT_TIME);
      await marketoBlock.submitEvaluateTemplateForm();
    });

    await test.step('step-3: Verify the form submission redirect', async () => {
      await expect(page).not.toHaveURL(testPage, { timeout: 15000 });
    });
  });

  test(`5: @marketo webinar template, ${features[5].tags}`, async ({ page, baseURL }) => {
    const testPage = `${baseURL}${features[5].path}`;
    console.info(`[Test Page]: ${testPage}`);

    await test.step('step-1: Go to the Marketo block webinar template test page', async () => {
      await page.goto(testPage);
      await page.waitForLoadState('domcontentloaded');
      await expect(page).toHaveURL(testPage);
    });

    await test.step('step-2: Submit the form with valid inputs', async () => {
      await page.waitForTimeout(WAIT_TIME);
      await marketoBlock.submitWebinarTemplateForm();
    });

    await test.step('step-3: Verify the form submission redirect', async () => {
      await expect(page).not.toHaveURL(testPage, { timeout: 15000 });
    });
  });

  test(`6: @marketo trial template, ${features[6].tags}`, async ({ page, baseURL }) => {
    const testPage = `${baseURL}${features[6].path}`;
    console.info(`[Test Page]: ${testPage}`);

    await test.step('step-1: Go to the Marketo block content discover template test page', async () => {
      await page.goto(testPage);
      await page.waitForLoadState('domcontentloaded');
      await expect(page).toHaveURL(testPage);
    });

    await test.step('step-2: Submit the form with valid inputs', async () => {
      await page.waitForTimeout(WAIT_TIME);
      await marketoBlock.submitTrialTemplateForm();
    });

    await test.step('step-3: Verify the form submission redirect', async () => {
      await expect(page).not.toHaveURL(testPage, { timeout: 15000 });
    });
  });

  test(`7: @marketo full template, ${features[7].tags}`, async ({ page, baseURL }) => {
    const testPage = `${baseURL}${features[7].path}`;
    console.info(`[Test Page]: ${testPage}`);

    await test.step('step-1: Go to the Marketo block full template test page', async () => {
      await page.goto(testPage);
      await page.waitForLoadState('domcontentloaded');
      await expect(page).toHaveURL(testPage);
    });

    await test.step('step-2: Submit the form with valid inputs', async () => {
      await page.waitForTimeout(WAIT_TIME);
      await marketoBlock.submitFullTemplateForm();
    });

    await test.step('step-3: Verify the form submission redirect', async () => {
      await expect(page).not.toHaveURL(testPage, { timeout: 15000 });
    });
  });

  test(`8: @marketo expanded template, ${features[8].tags}`, async ({ page, baseURL }) => {
    const testPage = `${baseURL}${features[8].path}`;
    console.info(`[Test Page]: ${testPage}`);

    await test.step('step-1: Go to the Marketo block expanded template test page', async () => {
      await page.goto(testPage);
      await page.waitForLoadState('domcontentloaded');
      await expect(page).toHaveURL(testPage);
    });

    await test.step('step-2: Submit the form with valid inputs', async () => {
      await page.waitForTimeout(WAIT_TIME);
      await marketoBlock.submitExpandedTemplateForm();
    });

    await test.step('step-3: Verify the form submission redirect', async () => {
      await expect(page).not.toHaveURL(testPage, { timeout: 15000 });
    });
  });

  test(`9: @marketo essential template, ${features[9].tags}`, async ({ page, baseURL }) => {
    const testPage = `${baseURL}${features[9].path}`;
    console.info(`[Test Page]: ${testPage}`);

    await test.step('step-1: Go to the Marketo block essential template test page', async () => {
      await page.goto(testPage);
      await page.waitForLoadState('domcontentloaded');
      await expect(page).toHaveURL(testPage);
    });

    await test.step('step-2: Submit the form with valid inputs', async () => {
      await page.waitForTimeout(WAIT_TIME);
      await marketoBlock.submitEssentialTemplateForm();
    });

    await test.step('step-3: Verify the form submission redirect', async () => {
      await expect(page).not.toHaveURL(testPage, { timeout: 15000 });
    });
  });
});
