/* eslint-disable no-await-in-loop */
/* eslint-disable no-loop-func */
/* eslint-disable no-restricted-syntax */
import { test } from '@playwright/test';
import Quiz from '../../selectors/uar/quiz.page.js';

const { features } = require('../../features/uar/quiz.cc.screenshots.spec.js');
const { WebUtil } = require('../../libs/webutil.js');

test.describe('Quiz flow test suite', () => {
  // reset timeout because we use this to run all test data
  test.setTimeout(10 * 60 * 1000);
  for (const feature of features) {
    test(
      `${feature.name}, ${feature.tags}`,
      async ({ page, baseURL }) => {
        const stablePage = new Quiz(page);
        const betaPage = new Quiz(page);
        const stableURL = `${baseURL}${feature.path}`;
        console.info(stableURL);
        const betaURL = `${stableURL}?milolibs=stage`;
        console.info(betaURL);

        // load test data from static files
        const testdata = await WebUtil.loadTestData(`${feature.data}`);

        let keyNumber = 0;

        for (let key of Object.keys(testdata)) {
          console.log(key);
          let stableProduct = '';
          let betaProduct = '';
          let stableProductScreenshots = [];
          let betaProductScreenshots = [];
          keyNumber += 1;
          if (key.includes('PDFs > Edit quickly')) {
            // eslint-disable-next-line no-continue
            continue;
          }

          if (key.includes('PDFs > Take the time to control')) {
            key = key.replace('PDFs > Take the time to control every detail', 'PDFs');
          }

          await test.step(`Old: Select each answer on test page according to ${key}`, async () => {
            await stablePage.clickEachAnswer(stableURL, key, keyNumber, 'stable', true);
          });

          await test.step('Old: Check results on test page', async () => {
            stableProduct = await stablePage.checkResultPage(testdata[key], key, keyNumber, 'stable', true);
          });

          stableProductScreenshots = stablePage.screenshots.slice();
          stablePage.screenshots = [];

          await test.step(`New: Select each answer on test page according to ${key}`, async () => {
            await betaPage.clickEachAnswer(betaURL, key, keyNumber, 'beta', true);
          });

          await test.step('New: Check results on test page', async () => {
            betaProduct = await betaPage.checkResultPage(testdata[key], key, keyNumber, 'beta', true);
          });

          betaProductScreenshots = betaPage.screenshots.slice();
          betaPage.screenshots = [];

          WebUtil.compareScreenshots(stableProductScreenshots, betaProductScreenshots, 'screenshots/uar');

          console.log(`stableProduct: ${stableProduct}`);
          console.log(`betaProduct: ${betaProduct}`);

          // expect.soft(betaProduct.replace(/[[\]]/g, '')).toContain(stableProduct.replace(/[[\]]/g, ''));
        }
      },
    );
  }
});
