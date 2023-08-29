/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
import { expect } from '@playwright/test';
import { buildTestData } from '../../libs/uar.js';
import QuizOldPage from '../../selectors/uar/quiz.old.page.js';
import Quiz from '../../selectors/uar/quiz.page.js';

const { test } = require('@playwright/test');
const QuizSpec = require('../../features/uar/quiz.dynamic.spec.js');

const { features } = QuizSpec;
const { WebUtil } = require('../../libs/webutil.js');

test.describe('Quiz flow test suite', () => {
  // reset timeout because we use this to run all test data
  test.setTimeout(10 * 60 * 1000);
  for (const feature of features) {
    test(
      `${feature.name}, ${feature.tags}`,
      async ({ page, baseURL }) => {
        const quiz = new Quiz(page);
        const quizOldPage = new QuizOldPage(page);
        const url = `${baseURL}${feature.path}`;
        console.info(url);

        // load test data from static files
        const originalData = await WebUtil.loadTestDataFromAPI(baseURL, feature.data);

        const testdata = buildTestData(originalData, feature.name);

        for (const key of testdata) {
          console.log(key);
          let oldProduct = '';
          let newProduct = '';
          await test.step(`Old: Select each answer on test page according to ${key}`, async () => {
            await quizOldPage.clickEachAnswer('https://www.adobe.com/creativecloud/quiz-recommender.html', key);
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

          expect.soft(newProduct).toContain(oldProduct);
        }
      },
    );
  }
});
