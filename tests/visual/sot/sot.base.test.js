/* eslint-disable no-restricted-syntax */
/* eslint-disable import/named */
import { test } from '@playwright/test';
import { features } from '../../../features/visual/sot/sot.base.spec.js';
import { takeOne } from '../../../libs/screenshot/take.js';
import { writeResultsToFile } from '../../../libs/screenshot/utils.js';
import Visual from '../../../selectors/visual/visual.page.js';

const { WebUtil } = require('../../../libs/webutil.js');

const folderPath = 'screenshots/sot';
const results = {};

test.describe('SOT visual comparison test suite', () => {
  // reset timeout because we use this to run all test data
  test.setTimeout(10 * 60 * 1000);
  for (const feature of features) {
    // eslint-disable-next-line no-loop-func
    test(`${feature.name},${feature.tags}`, async ({ page }, testInfo) => {
      // load test data from static files
      const testdata = await WebUtil.loadTestData(`${feature.data}`);

      const visual = new Visual(page);

      for (const key of Object.keys(testdata)) {
        const betaURL = testdata[key];
        console.info(betaURL);

        const name = `${feature.name}-${key}-${testInfo.project.name}`;
        // eslint-disable-next-line no-await-in-loop
        const result = await takeOne(
          page,
          betaURL,
          async () => { await visual.waitForEndOfPage(); },
          folderPath,
          name,
        );
        results[name] = [result];
      }
      writeResultsToFile(folderPath, testInfo, results);
    });
  }
});
