/* eslint-disable no-await-in-loop */
/* eslint-disable no-loop-func */
/* eslint-disable no-restricted-syntax */
import { test } from '@playwright/test';
import Quiz from '../../selectors/uar/quiz.page.js';

const QuizSpec = require('../../features/uar/quiz.ai.ui.spec.js');

const { features } = QuizSpec;
const { WebUtil } = require('../../libs/webutil.js');

test.describe('Quiz flow test suite', () => {
  // reset timeout because we use this to run all test data
  test.setTimeout(10 * 60 * 1000);
  for (const feature of features) {
    test(
      `${feature.name}, ${feature.tags}`,
      async ({ page }) => {
        const quiz = new Quiz(page);
        const url = `https://bc-uar--milo--adobecom.hlx.page${feature.path}`;
        console.info(url);

        // load test data from static files
        const testdata = await WebUtil.loadTestData(`${feature.data}`);

        for (const key of Object.keys(testdata)) {
          console.log(key);

          await quiz.checkBCQuiz(url, key, testdata[key]);
        }
      },
    );
  }
});
