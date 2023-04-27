/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
import { Result } from '../../selectors/cc/result.page.js';

const { test } = require('@playwright/test');
const ResultSpec = require('../../features/cc/result.spec.js');

const { features } = ResultSpec;
const { loadTestData } = require('../../common/data-provider.js');

test.describe('Result flow test suite', () => {
  // test.setTimeout(10 * 60 * 1000);
  for (const feature of features) {
    test(
      `${feature.name}, ${feature.tags}`,
      async ({ page, baseURL }) => {
        const result = new Result(page);
        const url = `${baseURL}${feature.path}`;

        // load test data from static files
        const testdata = await loadTestData(`${feature.data}`);

        for (const key of Object.keys(testdata)) {
          const resultUrl = url + key;
          console.info(resultUrl);
          page.waitForTimeout(5000);
          await result.checkResultPage(resultUrl, testdata[key]);
        }
      },
    );
  }
});
