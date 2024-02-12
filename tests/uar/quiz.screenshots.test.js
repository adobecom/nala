/* eslint-disable no-await-in-loop */
/* eslint-disable no-loop-func */
/* eslint-disable no-restricted-syntax */
import { expect, test } from '@playwright/test';
import Quiz from '../../selectors/uar/quiz.page.js';
import QuizOldPage from '../../selectors/uar/quiz.old.page.js';

const QuizSpec = require('../../features/uar/quiz.screenshots.spec.js');

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

        for (let key of Object.keys(testdata)) {
          console.log(key);
          let oldProduct = '';
          let newProduct = '';
          keyNumber += 1;

          if (key.includes('PDFs > Edit quickly')) {
            // eslint-disable-next-line no-continue
            continue;
          }

          if (key.includes('PDFs > Take the time to control')) {
            key = key.replace('PDFs > Take the time to control every detail', 'PDFs');
          }

          await test.step(`Prod: Select each answer on test page according to ${key}`, async () => {
            await quizOldPage.clickEachAnswer('https://www.adobe.com/creativecloud/plan-recommender/quiz.html', key, keyNumber, 'prod', true);
          });

          await test.step('Prod: Check results on test page', async () => {
            oldProduct = await quizOldPage.checkResultPage(testdata[key], key, keyNumber, true);
          });

          await test.step(`Stage: Select each answer on test page according to ${key}`, async () => {
            await quiz.clickEachAnswer('https://www.stage.adobe.com/creativecloud/plan-recommender/quiz.html', key, keyNumber, 'stage', true);
          });

          await test.step('Stage: Check results on test page', async () => {
            newProduct = await quiz.checkResultPage(testdata[key], key, keyNumber, 'new', true);
          });

          // expect.soft(oldProduct).toContain(newProduct);
        }
      },
    );
  }
});
