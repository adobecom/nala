/* eslint-disable no-restricted-syntax */
import { Quiz } from '../../selectors/uar/quiz.page.js';

const { test } = require('@playwright/test');
const QuizSpec = require('../../features/uar/quiz.spec.js');

const { features } = QuizSpec;
const { WebUtil } = require('../../libs/webutil.js');

test.describe('Quiz flow test suite', () => {
  // reset timeout because we use this to run all test data
  test.setTimeout(3 * 60 * 1000);
  for (const feature of features) {
    test(
      `${feature.name}, ${feature.tags}`,
      async ({ page, baseURL }) => {
        const quiz = new Quiz(page);
        const url = `${baseURL}${feature.path}`;
        console.info(url);

        // load test data from static files
        const testdata = await WebUtil.loadTestData(`${feature.data}`);

        for (const key of Object.keys(testdata)) {
          // test step-1
          // eslint-disable-next-line no-await-in-loop
          await test.step(`Select each answer on test page according to ${key}`, async () => {
            await quiz.clickEachAnswer(url, key);
          });

          // test step-2
          // eslint-disable-next-line no-await-in-loop
          await test.step(`Check results on test page according to ${testdata[key]}`, async () => {
            await quiz.checkResultPage(testdata[key]);
          });
        }
      },
    );
  }
});
