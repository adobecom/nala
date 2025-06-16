import { test } from '@playwright/test';
import { features } from '../../../features/visual/express/sot.spec.js';
import { takeTwo } from '../../../libs/screenshot/take.js';
import { writeResultsToFile } from '../../../libs/screenshot/utils.js';
import Visual from '../../../selectors/visual/visual.page.js';

const { WebUtil } = require('../../../libs/webutil.js');

const folderPath = 'screenshots/express';
const results = {};
const envs = require('../../../envs/envs.js');

test.describe('Express SOT visual comparison test suite', () => {
  // reset timeout because we use this to run all test data
  test.setTimeout(10 * 60 * 1000);

  for (const feature of features) {
    test(`${feature.name},${feature.tags}`, async ({ page }, testInfo) => {
      const testdata = await WebUtil.loadTestData(`${feature.data}`);

      const visual = new Visual(page);

      for (const key of Object.keys(testdata)) {
        const stableURL = `${envs[feature.stable]}${testdata[key]}`;
        console.info(stableURL);
        const betaURL = `${envs[feature.beta]}${testdata[key]}`;
        console.info(betaURL);

        const name = `${feature.name}-${key}-${testInfo.project.name}`;
        const result = await takeTwo(
          page,
          stableURL,
          async () => {
            await visual.waitForEndOfPage();
          },
          betaURL,
          async () => {
            await visual.waitForEndOfPage();
          },
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
