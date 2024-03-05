/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
import Quiz from '../../selectors/uar/quiz.page.js';

const { test, expect } = require('@playwright/test');
const QuizSpec = require('../../features/cc/quiz.analytics.spec.js');

const { features } = QuizSpec;
const { WebUtil } = require('../../libs/webutil.js');

let networkLogs;
let page;
let webUtil;

test.describe('Quiz flow test suite', () => {
  test.skip(({ browserName }) => browserName !== 'firefox', 'firefox only!');

  test.beforeAll(async ({ browser }) => {
    networkLogs = [];
    page = await browser.newPage();
    webUtil = new WebUtil(page);
    console.info('Before all tests: Enable network logging');
    // Enable network logging
    webUtil.enableNetworkLogging(networkLogs);
  });

  for (const feature of features) {
    test(
      `${feature.name}, ${feature.tags}`,
      // eslint-disable-next-line no-loop-func
      async ({ baseURL }) => {
        // reset timeout because we use this to run all test data
        test.setTimeout(3 * 60 * 1000);

        const quiz = new Quiz(page);
        const url = `${baseURL}${feature.path}?milolibs=stage`;
        console.info(url);

        // load test data from static files
        const testdata = await WebUtil.loadTestData(`${feature.data}`);

        for (let key of Object.keys(testdata)) {
          console.info(key);
          const logIndex = networkLogs.length;

          if (key.includes('PDFs > Edit quickly')) {
            // eslint-disable-next-line no-continue
            continue;
          }

          if (key.includes('PDFs > Take the time to control')) {
            key = key.replace('PDFs > Take the time to control every detail', 'PDFs');
          }

          // test step-1
          await test.step(`Select each answer on test page according to ${key}`, async () => {
            await quiz.clickEachAnswer(url, key);
          });

          // test step-2
          await test.step(`Check results on test page according to ${testdata[key]}`, async () => {
            await quiz.checkResultPage(testdata[key]);
          });

          await page.waitForTimeout(2000);

          const difference = networkLogs.slice(logIndex, networkLogs.length);
          console.info(difference);
        }

        // verify network logs
        // console.info(networkLogs);
        let logResult = false;
        let logNumber = 0;
        let logResult2 = false;
        let logNumber2 = 0;
        for (const log of networkLogs) {
          if (log !== undefined && log.includes('"click":"Filters|cc:app-reco')) {
            logResult = true;
            logNumber += 1;
          }

          if (log !== undefined && log.includes('gnav|adobedotcom-cc')) {
            logResult2 = true;
            logNumber2 += 1;
          }
        }

        expect(logResult).toBeTruthy();
        expect(logNumber).toBeGreaterThan(1);
        expect(logResult2).toBeTruthy();
        expect(logNumber2).toBeGreaterThan(1);
      },
    );
  }

  test.afterAll(async () => {
    console.info('After all tests: Disable network logging');
    // Disable network logging
    webUtil.disableNetworkLogging();
  });
});
