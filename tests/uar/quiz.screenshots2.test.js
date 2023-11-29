/* eslint-disable no-await-in-loop */
/* eslint-disable no-loop-func */
/* eslint-disable no-restricted-syntax */
import { expect, test } from '@playwright/test';
import Quiz from '../../selectors/uar/quiz.page.js';

const QuizSpec = require('../../features/uar/quiz.screenshots2.spec.js');

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
        const quizOldPage = new Quiz(page);
        const url = `${baseURL}${feature.path}`;
        console.info(url);

        // load test data from static files
        const testdata = await WebUtil.loadTestData(`${feature.data}`);

        let keyNumber = 0;

        for (const key of Object.keys(testdata)) {
          console.log(key);
          let oldProduct = '';
          let newProduct = '';
          keyNumber += 1;
          await test.step(`Old: Select each answer on test page according to ${key}`, async () => {
            await quizOldPage.clickEachAnswer('https://main--milo--adobecom.hlx.live/drafts/quiz/quiz-2/', key, keyNumber, 'stable', true);
          });

          await test.step('Old: Check results on test page', async () => {
            oldProduct = await quizOldPage.checkResultPage(testdata[key], key, keyNumber, 'stable', true);
          });

          await test.step(`New: Select each answer on test page according to ${key}`, async () => {
            await quiz.clickEachAnswer(url, key, keyNumber, 'beta', true);
          });

          await test.step('New: Check results on test page', async () => {
            newProduct = await quiz.checkResultPage(testdata[key], key, keyNumber, 'beta', true);
          });

          expect.soft(newProduct).toContain(oldProduct);
        }
      },
    );
  }
});
