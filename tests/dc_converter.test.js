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
    test(props.title, async ({ page }) => {
      await page.goto(props.url);

      const fileInput = page.locator(selectors['@file-upload-input']);
      const pdfComplete = page.locator(selectors['@pdf-complete']);

      await expect(fileInput).toBeVisible();

      // Upload a test document
      await fileInput.setInputFiles(testPDF);

      // Wait for conversion to complete
      await expect(pdfComplete).toBeVisible({ timeout: 20000 });
    });
  });
});
