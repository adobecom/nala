/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
import { Result } from '../../selectors/uar/result.page.js';

const { test } = require('@playwright/test');
const ResultSpec = require('../../features/uar/result.spec.js');

const { features } = ResultSpec;
const { WebUtil } = require('../../libs/webutil.js');

test.describe('Result flow test suite', () => {
  for (const feature of features) {
    test(
      `${feature.name}, ${feature.tags}`,
      async ({ page, baseURL }) => {
        const result = new Result(page);
        const url = `${baseURL}${feature.path}`;

        // load test data from static files
        const testdata = await WebUtil.loadTestData(`${feature.data}`);

        for (const key of Object.keys(testdata)) {
          const resultUrl = url + key;
          console.info(resultUrl);
          await result.checkResultPage(resultUrl, testdata[key]);
        }
      },
    );
  }
});
