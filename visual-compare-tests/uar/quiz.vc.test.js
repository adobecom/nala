/* eslint-disable no-await-in-loop */
/* eslint-disable no-loop-func */
/* eslint-disable no-restricted-syntax */
import { expect, test } from '@playwright/test';
import Quiz from '../../selectors/uar/quiz.page.js';

const { features } = require('../../features/visual-compare/uar/quiz.spec.js');
const { WebUtil } = require('../../libs/webutil.js');
const envs = require('../../envs/envs.js');

test.describe('Quiz flow test suite', () => {
  // reset timeout because we use this to run all test data
  test.setTimeout(10 * 60 * 1000);
  for (const feature of features) {
    test(
      `${feature.name}, ${feature.tags}`,
      async ({ page }) => {
        const stablePage = new Quiz(page);
        const betaPage = new Quiz(page);
        const stableURL = `${envs[feature.stable]}${feature.path}`;
        console.info(stableURL);
        const betaURL = `${envs[feature.beta]}${feature.path}`;
        console.info(betaURL);

        // load test data from static files
        const testdata = await WebUtil.loadTestData(`${feature.data}`);

        let keyNumber = 0;

        for (const key of Object.keys(testdata)) {
          console.log(key);
          let stableProduct = '';
          let betaProduct = '';
          let stableProductScreenshots = [];
          let betaProductScreenshots = [];
          keyNumber += 1;
          await test.step(`Stable: Select each answer on test page according to ${key}`, async () => {
            await stablePage.clickEachAnswer(stableURL, key, keyNumber, 'stable', true);
          });

          await test.step('Stable: Check results on test page', async () => {
            stableProduct = await stablePage.checkResultPage(testdata[key], key, keyNumber, 'stable', true);
          });

          stableProductScreenshots = stablePage.screenshots.slice();
          stablePage.screenshots = [];

          await test.step(`Beta: Select each answer on test page according to ${key}`, async () => {
            await betaPage.clickEachAnswer(betaURL, key, keyNumber, 'beta', true);
          });

          await test.step('Beta: Check results on test page', async () => {
            betaProduct = await betaPage.checkResultPage(testdata[key], key, keyNumber, 'beta', true);
          });

          betaProductScreenshots = betaPage.screenshots.slice();
          betaPage.screenshots = [];

          WebUtil.compareScreenshots(stableProductScreenshots, betaProductScreenshots, 'screenshots/uar');

          // expect.soft(betaProduct).toContain(stableProduct);
        }
      },
    );
  }
});
