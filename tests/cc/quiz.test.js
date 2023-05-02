/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
import { Quiz } from '../../selectors/cc/quiz.page.js';

const { test } = require('@playwright/test');
const QuizSpec = require('../../features/cc/quiz.spec.js');

const { features } = QuizSpec;
const { loadTestData } = require('../../common/data-provider.js');

test.describe('Quiz flow test suite', () => {
  test.setTimeout(3 * 60 * 1000);
  for (const feature of features) {
    test(
      `${feature.name}, ${feature.tags}`,
      async ({ page, baseURL }) => {
        const quiz = new Quiz(page);
        const url = `${baseURL}${feature.path}`;
        console.info(url);

        // load test data from static files
        const testdata = await loadTestData(`${feature.data}`);

        for (const key of Object.keys(testdata)) {
          // test step-1
          await test.step(`Select each answer on test page according to ${key}`, async () => {
            await quiz.clickEachAnswer(url, key);
          });

          // test step-2
          await test.step(`Check results on test page according to ${testdata[key]}`, async () => {
            await quiz.checkResultPage(testdata[key]);
          });
        }
      },
    );
  }
});
