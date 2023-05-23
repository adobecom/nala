/* eslint-disable no-restricted-syntax */
import { Quiz } from '../../selectors/uar/quiz.page.js';

const { test } = require('@playwright/test');
const QuizSpec = require('../../features/uar/quiz.analytics.spec.js');

const { features } = QuizSpec;
const { WebUtil } = require('../../libs/webutil.js');

let networklogs;
let page;
let webUtil;

test.describe('Quiz flow test suite', () => {
  test.skip(({ browserName }) => browserName !== 'firefox', 'firefox only!');

  test.beforeAll(async ({ browser }) => {
    networklogs = [];
    page = await browser.newPage();
    webUtil = new WebUtil(page);
    console.log('Before all tests: Enable network logging');
    // Enable network logging
    webUtil.enableNetworkLogging(networklogs);
  });

  for (const feature of features) {
    test(
      `${feature.name}, ${feature.tags}`,
      // eslint-disable-next-line no-loop-func
      async ({ baseURL }) => {
        // reset timeout because we use this to run all test data
        test.setTimeout(3 * 60 * 1000);

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

        console.log(networklogs);
      },
    );
  }

  test.afterAll(async () => {
    console.log('After all tests: Disable network logging');
    // Disable network logging
    webUtil.disableNetworkLogging();
  });
});
