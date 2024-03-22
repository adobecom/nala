/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
import { expect, test } from '@playwright/test';
import { buildTestData } from '../../data/uar/quiz/uar.js';
import Quiz from '../../selectors/uar/quiz.page.js';

const QuizSpec = require('../../features/uar/quiz.dynamic.spec.js');

const { features } = QuizSpec;
const { WebUtil } = require('../../libs/webutil.js');
const envs = require('../../envs/envs.js');

test.describe('Quiz flow test suite', () => {
  // reset timeout because we use this to run all test data
  test.setTimeout(30 * 60 * 1000);
  for (const feature of features) {
    test(
      `${feature.name}, ${feature.tags}`,
      async ({ page, baseURL }) => {
        const quiz = new Quiz(page);
        const quizOldPage = new Quiz(page);
        const url = `${baseURL}${feature.path}`;
        console.info(url);

        const originalData = await WebUtil.loadTestDataFromAPI(baseURL, feature.data);

        let testdata = buildTestData(originalData, feature.name);

        testdata = testdata.sort(() => 0.5 - Math.random()).slice(0, 20);

        for (const key of testdata) {
          console.log(key);
          let oldProduct = '';
          let newProduct = '';

          await test.step(`Old: Select each answer on test page according to ${key}`, async () => {
            await quizOldPage.clickEachAnswer(`${envs['@milo_stage']}${feature.path}`, key);
          });

          await test.step('Old: Check results on test page', async () => {
            oldProduct = await quizOldPage.checkResultPage(feature.name);
          });

          await test.step(`New: Select each answer on test page according to ${key}`, async () => {
            await quiz.clickEachAnswer(url, key);
          });

          await test.step('New: Check results on test page', async () => {
            newProduct = await quiz.checkResultPage(feature.name);
          });

          expect.soft(oldProduct).toContain(newProduct);
        }
      },
    );
  }
});
