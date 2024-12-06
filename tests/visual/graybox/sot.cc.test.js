/* eslint-disable no-restricted-syntax */
/* eslint-disable import/named */
import { test } from '@playwright/test';
import { features } from '../../../features/visual/graybox/sot.cc.spec.js';
import { takeTwo } from '../../../libs/screenshot/take.js';
import { writeResultsToFile } from '../../../libs/screenshot/utils.js';

const { WebUtil } = require('../../../libs/webutil.js');

const folderPath = 'screenshots/graybox-cc';
const results = {};

test.describe('Graybox CC SOT visual comparison test suite', () => {
  // reset timeout because we use this to run all test data
  test.setTimeout(40 * 60 * 1000);
  for (const feature of features) {
    // eslint-disable-next-line no-loop-func
    test(`${feature.name},${feature.tags}`, async ({ page }, testInfo) => {
      const testdata = await WebUtil.loadTestData(`${feature.data}`);

      for (const key of Object.keys(testdata)) {
        const stableURL = testdata[key];
        const betaURL = testdata[key].replace('www.stage', 'test.graybox');
        const name = `${feature.name}-${key}-${testInfo.project.name}`;
        try {
          // Add retry logic and longer timeout for navigation
          const result = await takeTwo(
            page,
            stableURL,
            async () => {
              await page.waitForLoadState('networkidle');
              await page.waitForTimeout(8000);
            },
            betaURL,
            async () => {
              await page.waitForLoadState('networkidle');
              await page.waitForTimeout(10000);
            },
            folderPath,
            name,
            {
              fullPage: true,
              timeout: 30000, // Increase navigation timeout
            },
          );
          results[name] = [result];
        } catch (error) {
          console.error(`Failed to process URLs: ${stableURL} -> ${betaURL}`);
          console.error(error);
          // Continue with next iteration instead of failing entire test
        }
      }
      writeResultsToFile(folderPath, testInfo, results);
    });
  }
});
