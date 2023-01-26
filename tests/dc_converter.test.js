/* eslint-disable no-restricted-syntax */
/* eslint-disable no-await-in-loop */
const { expect, test } = require('@playwright/test');
const converter = require('../features/dc_converter.spec.js');
const parse = require('../features/parse.js');
const selectors = require('../selectors/dc_converter.selectors.js');

const testPDF = 'docs/Test.pdf';

const { name, features } = parse(converter);
test.describe(`${name}`, () => {
  features.forEach((props) => {
    test(props.title, async ({ page, browser }) => {
      const converterBlock = page.locator(selectors['@pdf-converter']);
      const fileInput = page.locator(selectors['@file-upload-input']);
      const pdfComplete = page.locator(selectors['@pdf-complete']);
      const filePreview = page.locator(selectors['@file-preview']);
      const downloadButton = page.locator(selectors['@download']);
      const failedBlock = page.locator(selectors['@widget-block-failed']);
      const url = props.title.match(/stage|prod/) ? `${props.url}.html` : props.url;

      await page.goto(url);

      await expect.soft(converterBlock).toBeVisible({ timeout: 10000 });
      if (await failedBlock.isVisible()) {
        console.log(`${browser.browserType().name()}: ${await failedBlock.getAttribute('data-reason')} on ${url}`);
        await expect.soft(failedBlock).not.toBeVisible();
      }

      // Upload a test document
      await expect(fileInput).toBeVisible();
      await fileInput.setInputFiles(testPDF);

      // Wait for conversion to complete
      // DC Web services can sometimes be slow but do not wait for more than 30s
      await expect(pdfComplete).toBeVisible({ timeout: 30000 });

      // Wait for file preview
      await expect(filePreview).toBeVisible();

      // Start waiting for download before clicking. Note no await.
      const downloadPromise = page.waitForEvent('download');
      await (downloadButton).click();
      const download = await downloadPromise;
      const fileName = await download.suggestedFilename();

      // Save downloaded file somewhere
      await download.saveAs(fileName);
      console.log(`${fileName} downloaded`);

      await download.delete();
    });
  });
});
