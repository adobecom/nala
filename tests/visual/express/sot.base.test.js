import { test } from '@playwright/test';
import { features } from '../../../features/visual/express/sot.base.spec.js';
import { takeOne } from '../../../libs/screenshot/take.js';
import { writeResultsToFile } from '../../../libs/screenshot/utils.js';

const { WebUtil } = require('../../../libs/webutil.js');

const folderPath = 'screenshots/express';
const results = {};
const MILO_LIBS = '';

test.describe('Express SOT visual comparison test suite', () => {
  // reset timeout because we use this to run all test data
  test.setTimeout(10 * 60 * 1000);

  for (const feature of features) {
    test(`${feature.name},${feature.tags}`, async ({ page }, testInfo) => {
      const testdata = await WebUtil.loadTestData(`${feature.data}`);

      for (const key of Object.keys(testdata)) {
        const betaURL = testdata[key] + MILO_LIBS;
        console.info(betaURL);

        const name = `${feature.name}-${key}-${testInfo.project.name}`;
        const result = await takeOne(
          page,
          betaURL,
          async () => { await page.waitForSelector('.feds-footer-privacyLink'); },
          folderPath,
          name,
          { fullPage: true },
        );
        results[name] = [result];
      }
      writeResultsToFile(folderPath, testInfo, results);
    });
  }
});
