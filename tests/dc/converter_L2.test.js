/* eslint-disable no-restricted-syntax */
/* eslint-disable no-await-in-loop */
import { randomPassword } from '../../utils/random.js';
import ims from '../../utils/imslogin.js';

const { expect, test } = require('@playwright/test');
const converter = require('../../features/dc/converter_L2.spec.js');
const parse = require('../../features/parse.js');
const selectors = require('../../selectors/dc_converter.selectors.js');
const { extractTags } = require('../../utils/extract-test-title.js');

const TEST_PW = randomPassword();
const verbToRedirectLink = {
  'pdf-to-ppt': 'pdf-to-ppt',
  'pdf-to-jpg': 'pdf-to-image',
  'pdf-to-word': 'pdf-to-word',
  'pdf-to-excel': 'pdf-to-excel',
  'convert-pdf': 'createpdf',
  'ppt-to-pdf': 'ppt-to-pdf',
  'jpg-to-pdf': 'jpg-to-pdf',
  'word-to-pdf': 'word-to-pdf',
  'excel-to-pdf': 'excel-to-pdf',
  'merge-pdf': 'combine-pdf',
  'password-protect-pdf': 'protect-pdf',
  'compress-pdf': 'compress-pdf',
};
const dcwebBaseUrl = {
  dc_preview: 'dc.dev.dexilab.acrobat.com',
  dc_live: 'stage.acrobat.adobe.com',
  adobe_stage: 'stage.acrobat.adobe.com',
  adobe_prod: 'acrobat.adobe.com',
};
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
    test(`Upload ${props.title}`, async ({ page, browser }) => {
      const { url } = props;
      const pageNameRegex = /(?<=online\/)([^.?]+)/gi;
      const input = fileInputList.filter((x) => x.pages.includes(url.match(pageNameRegex)[0]))[0];
      const converterBlock = page.locator(selectors['@pdf-converter']);
      const fileInput = page.locator(selectors[input.locator]);
      const exportButton = page.locator(selectors['@export-convert-button']);
      const exportProgress = page.locator(selectors['@export-progress-bar']);
      const convertButton = page.locator(selectors['@convert-button']);
      const insertButton = page.locator(selectors['@insert-button']);
      const plusButton = page.locator(selectors['@plus-button']);
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
        console.log(`${browser.browserType().name()}: ${await failedBlock.getAttribute('data-reason')} on ${url}`);
        await expect.soft(failedBlock).not.toBeVisible();
      }

      // Upload a test document
      await expect(fileInput).toBeVisible();
      await fileInput.setInputFiles(input.file);
      if (url.includes('convert-pdf')) {
        await expect(async () => {
          await expect(exportButton).toBeVisible();
          await exportButton.click({ force: true });
          await expect(exportProgress).toBeVisible();
        }).toPass({
          intervals: [1_000],
          timeout: 10_000,
        });
      }
      if (url.includes('pdf-to-jpg')) {
        await convertButton.click();
      }
      if (url.includes('merge-pdf')) {
        await insertButton.click();

        const [fileChooser] = await Promise.all([
          // Wait for the 'filechooser' event before clicking the button
          page.waitForEvent('filechooser'),
          // Open the file chooser
          await plusButton.click(),
        ]);
        await fileChooser.setFiles(input.file);
        await mergeButton.click();
      }
      if (url.includes('password-protect-pdf')) {
        await inputPassword.fill(TEST_PW);
        await confirmPassword.fill(TEST_PW);
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

    test(`Sign-in ${props.title}`, async ({ page }) => {
      const { env, url } = extractTags(props.title);
      const pageNameRegex = /(?<=online\/)([^.?]+)/gi;
      const redirectLink = verbToRedirectLink[url.match(pageNameRegex)[0]];
      const imsBaseUrl = env === 'adobe_prod' ? 'auth.services.adobe.com' : 'auth-stg1.services.adobe.com';

      await page.goto(props.url);

      const navigationPromise = page.waitForURL(new RegExp(imsBaseUrl));
      await ims.clickSignin(page);
      await navigationPromise;
      await ims.fillOutSignInForm(props, page);

      await page.waitForURL(new RegExp(dcwebBaseUrl[env]));
      await expect(page).toHaveURL(new RegExp(`/link/acrobat/${redirectLink}`, 'g'));
    });
  });
});
