/* eslint-disable no-await-in-loop */
/* eslint-disable no-loop-func */
/* eslint-disable no-restricted-syntax */
import { test } from '@playwright/test';
import Quiz from '../../../selectors/uar/quiz.page.js';

const { features } = require('../../../features/visual/uar-ai/quiz.ai.spec.js');
const { WebUtil } = require('../../../libs/webutil.js');
const { compareScreenshots, writeResultsToFile } = require('../../../libs/screenshot/utils.js');
const envs = require('../../../envs/envs.js');

const folderPath = 'screenshots/uar-ai';

test.describe('Quiz flow test suite', () => {
  // reset timeout because we use this to run all test data
  test.setTimeout(10 * 60 * 1000);
  for (const feature of features) {
    test(
      `${feature.name}, ${feature.tags}`,
      async ({ page }, testInfo) => {
        const stablePage = new Quiz(page);
        const betaPage = new Quiz(page);
        const stableURL = `${envs[feature.stable]}${feature.path}`;
        console.info(stableURL);
        const betaURL = `${envs[feature.beta]}${feature.path}`;
        console.info(betaURL);

        // load test data from static files
        const testdata = await WebUtil.loadTestData(`${feature.data}`);

        let keyNumber = 0;
        const results = {};

        for (const key of Object.keys(testdata)) {
          console.log(key);
          let stableProductScreenshots = [];
          let betaProductScreenshots = [];
          keyNumber += 1;
          const project = testInfo.project.name;

          // await test.step(`Stable: Select each answer on test page according to ${key}`, async () => {
          //   await stablePage.checkBCQuiz(stableURL, key, keyNumber, 'stable', project, folderPath, true);
          // });

          // stableProductScreenshots = stablePage.screenshots.slice();
          // stablePage.screenshots = [];

          await test.step(`Beta: Select each answer on test page according to ${key}`, async () => {
            await betaPage.checkBCQuiz(betaURL, key, keyNumber, 'beta', project, folderPath, true);
          });

          // betaProductScreenshots = betaPage.screenshots.slice();
          // betaPage.screenshots = [];

          // const result = compareScreenshots(stableProductScreenshots, betaProductScreenshots);
          // const name = `${key}-${project}`;
          // results[name] = result;
        }

        writeResultsToFile(folderPath, testInfo, results);
      },
    );
  }
});
