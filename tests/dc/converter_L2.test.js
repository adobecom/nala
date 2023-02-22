/* eslint-disable no-restricted-syntax */
/* eslint-disable no-await-in-loop */
const { expect, test } = require('@playwright/test');
const converter = require('../../features/dc/converter_L2.spec.js');
const parse = require('../../features/parse.js');
const selectors = require('../../selectors/dc_converter.selectors.js');

const fileInputList = [
  {
    file: 'docs/dc/Small_PDF.pdf',
    locator: '@pdf-file-upload-input',
    pages: [
      'pdf-to-ppt',
      'pdf-to-jpg',
      'pdf-to-word',
      'pdf-to-excel',
      'convert-pdf',
      'merge-pdf',
      'password-protect-pdf',
      'compress-pdf',
    ],
  },
  {
    file: 'docs/dc/Small_PPT.pptx',
    locator: '@ppt-file-upload-input',
    pages: [
      'ppt-to-pdf',
      'convert-pdf',
    ],
  },
  {
    file: 'docs/dc/Small_JPG.jpg',
    locator: '@jpg-file-upload-input',
    pages: [
      'jpg-to-pdf',
      'convert-pdf',
    ],
  },
  {
    file: 'docs/dc/Small_Word.docx',
    locator: '@word-file-upload-input',
    pages: [
      'word-to-pdf',
      'convert-pdf',
    ],
  },
  {
    file: 'docs/dc/Small_Excel.xlsx',
    locator: '@excel-file-upload-input',
    pages: [
      'excel-to-pdf',
      'convert-pdf',
    ],
  },
];

const { name, features } = parse(converter);
test.describe(`${name}`, () => {
  features.forEach((props) => {
    test(props.title, async ({ page, browser }) => {
      const { url } = props;
      const pageNameRegex = /(?<=online\/)([^.?]+)/gi;
      const input = fileInputList.filter((x) => x.pages.includes(url.match(pageNameRegex)[0]))[0];
      const converterBlock = page.locator(selectors['@pdf-converter']);
      const fileInput = page.locator(selectors[input.locator]);
      const exportButton = page.locator(selectors['@export-convert-button']);
      const convertButton = page.locator(selectors['@convert-button']);
      const insertButton = page.locator(selectors['@insert-button']);
      const plusButton = page.locator(selectors['@plus-button']);
      const mergeInput = page.locator(selectors['@merge-input']);
      const mergeButton = page.locator(selectors['@merge-button']);
      const inputPassword = page.locator(selectors['@input-password']);
      const confirmPassword = page.locator(selectors['@confirm-password']);
      const setPassword = page.locator(selectors['@set-password']);
      const pdfComplete = page.locator(selectors['@pdf-complete']);
      const filePreview = page.locator(selectors['@file-preview']);
      const protectHeading = page.locator(selectors['@protect-heading']);
      const lowCompress = page.locator(selectors['@low-compress-option']);
      const downloadButton = page.locator(selectors['@download']);
      const failedBlock = page.locator(selectors['@widget-block-failed']);

      await page.goto(props.url);

      await expect(converterBlock).toBeVisible();
      if (await failedBlock.isVisible()) {
        console.log(`${browser.browserType().name()}: ${await failedBlock.getAttribute('data-reason')} on ${props.url}`);
        await expect.soft(failedBlock).not.toBeVisible();
      }

      // Upload a test document
      await expect(fileInput).toBeVisible();
      await fileInput.setInputFiles(input.file);
      if (url.includes('convert-pdf')) {
        await exportButton.click();
      }
      if (url.includes('pdf-to-jpg')) {
        await convertButton.click();
      }
      if (url.includes('merge-pdf')) {
        await insertButton.click();
        await plusButton.click();
        await mergeInput.setInputFiles(input.file);
        await mergeButton.click();
      }
      if (url.includes('password-protect-pdf')) {
        await inputPassword.fill('AdobePassword2023!');
        await confirmPassword.fill('AdobePassword2023!');
        await setPassword.click();
      }
      if (url.includes('compress-pdf')) {
        await lowCompress.click();
        await convertButton.click();
      }

      // Wait for conversion to complete
      // DC Web services can sometimes be slow but do not wait for more than 30s
      await expect(pdfComplete).toBeVisible({ timeout: 30000 });

      // Wait for file preview
      if (url.includes('password-protect-pdf')) {
        await expect(protectHeading).toHaveText('This file can’t be viewed because it’s password protected');
      } else {
        await expect(filePreview).toBeVisible();
      }

      // Start waiting for download before clicking. Note no await.
      const downloadPromise = page.waitForEvent('download');
      await (downloadButton).click();
      const download = await downloadPromise;
      const fileName = await download.suggestedFilename();

      // Save downloaded file somewhere
      await download.saveAs(`test-results/${fileName}`);
      console.log(`${fileName} downloaded`);

      await download.delete();
    });
  });
});
