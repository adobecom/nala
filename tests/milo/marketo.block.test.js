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

  test(`${features[2].name},${features[2].tags}`, async ({ page, baseURL, browserName }) => {
    test.skip(
      browserName === 'firefox',
      "There's an issue with company being cleared on firefox after selecting a country.",
    );
    const testPage = `${baseURL}${features[2].path}`;
    console.info(`[Test Page]: ${testPage}`);

    await test.step('step-1: Go to Marketo Block RFI Template test page', async () => {
      await page.goto(testPage);
      await page.waitForLoadState('domcontentloaded');
      await expect(page).toHaveURL(testPage);
    });

    await test.step('step-2: Verify that the expected fields display', async () => {
      await marketoBlock.submitRFITemplateForm();
    });

    await test.step('step-3: Verify the form submission redirect', async () => {
      await expect(page).not.toHaveURL(testPage, { timeout: 15000 });
    });
  });

  test(`${features[3].name},${features[3].tags}`, async ({ page, baseURL }) => {
    const testPage = `${baseURL}${features[3].path}`;
    console.info(`[Test Page]: ${testPage}`);

    await test.step('step-1: Go to Marketo Block discover template test page', async () => {
      await page.goto(testPage);
      await page.waitForLoadState('domcontentloaded');
      await expect(page).toHaveURL(testPage);
    });

    await test.step('step-2: Verify that the expected fields display', async () => {
      await marketoBlock.submitDiscoverTemplateForm();
    });

    await test.step('step-3: Verify the form submission redirect', async () => {
      await expect(page).not.toHaveURL(testPage, { timeout: 15000 });
    });
  });

  test(`${features[4].name},${features[4].tags}`, async ({ page, baseURL }) => {
    const testPage = `${baseURL}${features[4].path}`;
    console.info(`[Test Page]: ${testPage}`);

    await test.step('step-1: Go to Marketo Block explore template test page', async () => {
      await page.goto(testPage);
      await page.waitForLoadState('domcontentloaded');
      await expect(page).toHaveURL(testPage);
    });

    await test.step('step-2: Verify that the expected fields display', async () => {
      await marketoBlock.submitExploreTemplateForm();
    });

    await test.step('step-3: Verify the form submission redirect', async () => {
      await expect(page).not.toHaveURL(testPage, { timeout: 15000 });
    });
  });

  test(`${features[5].name},${features[5].tags}`, async ({ page, baseURL, browserName }) => {
    test.skip(
      browserName === 'firefox',
      "There's an issue with company being cleared on firefox after selecting a country.",
    );
    const testPage = `${baseURL}${features[5].path}`;
    console.info(`[Test Page]: ${testPage}`);

    await test.step('step-1: Go to Marketo Block evaluate template test page', async () => {
      await page.goto(testPage);
      await page.waitForLoadState('domcontentloaded');
      await expect(page).toHaveURL(testPage);
    });

    await test.step('step-2: Verify that the expected fields display', async () => {
      await marketoBlock.submitEvaluateTemplateForm();
    });

    await test.step('step-3: Verify the form submission redirect', async () => {
      await expect(page).not.toHaveURL(testPage, { timeout: 15000 });
    });
  });

  test(`${features[6].name},${features[6].tags}`, async ({ page, baseURL, browserName }) => {
    test.skip(
      browserName === 'firefox',
      "There's an issue with company being cleared on firefox after selecting a country.",
    );
    const testPage = `${baseURL}${features[6].path}`;
    console.info(`[Test Page]: ${testPage}`);

    await test.step('step-1: Go to Marketo Block webinar template test page', async () => {
      await page.goto(testPage);
      await page.waitForLoadState('domcontentloaded');
      await expect(page).toHaveURL(testPage);
    });

    await test.step('step-2: Verify that the expected fields display', async () => {
      await marketoBlock.submitWebinarTemplateForm();
    });

    await test.step('step-3: Verify the form submission redirect', async () => {
      await expect(page).not.toHaveURL(testPage, { timeout: 15000 });
    });
  });

  test(`${features[7].name},${features[7].tags}`, async ({ page, baseURL, browserName }) => {
    test.skip(
      browserName === 'firefox',
      "There's an issue with company being cleared on firefox after selecting a country.",
    );
    const testPage = `${baseURL}${features[7].path}`;
    console.info(`[Test Page]: ${testPage}`);

    await test.step('step-1: Go to Marketo Block content discover template test page', async () => {
      await page.goto(testPage);
      await page.waitForLoadState('domcontentloaded');
      await expect(page).toHaveURL(testPage);
    });

    await test.step('step-2: Verify that the expected fields display', async () => {
      await marketoBlock.submitTrialTemplateForm();
    });

    await test.step('step-3: Verify the form submission redirect', async () => {
      await expect(page).not.toHaveURL(testPage, { timeout: 15000 });
    });
  });
});
