/* eslint-disable no-await-in-loop */
/* eslint-disable no-loop-func */
/* eslint-disable no-restricted-syntax */
import { expect, test } from '@playwright/test';

const QuizSpec = require('../../features/uar/quiz.ai.spec.js');

const { features } = QuizSpec;
const { WebUtil } = require('../../libs/webutil.js');

const ENDPOINT = 'acom-prd-recom-v3';
const API_KEY = 'CCHomeMLRepo1';

const validFiCodes = ['acrobat_dc_pro',
      'aftereffects_cc',
      'audition_cc',
      'characteranimator_cc',
      'illustrator_cc',
      'indesign_cc',
      'lightroom_cc',
      'photoshop_cc',
      'premierepro_cc',
      'sbst_stager',
      'sbst_painter',
      'sbst_alchemist',
      'sbst_shaper',
      'sbst_designer'];

// Define the function to be executed within the browser context
const fetchFiCodes = async ([input, numberOfItems, endPoint, fiCodes, apiKey]) => {
  const getConfig = () => ({ env: 'dev' });

  const { env } = getConfig();
  const subdomain = env === 'prod' ? 'cchome-dev' : 'cchome-dev';
  const apiUrl = `https://${subdomain}.adobe.io/int/v1/models`;

  const params = {
    endpoint: endPoint,
    contentType: 'application/json',
    payload: {
      data: {
        input,
        num_items: numberOfItems || 10,
        given_prod_list: fiCodes,
      },
    },
  };

  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
      },
      body: JSON.stringify(params),
    });
    return await response.json();
  } catch (error) {
    console.error(`ERROR: Fetching fi codes ${error}`);
    return null;
  }
};

test.describe('Quiz ML API test suite', () => {
  for (const feature of features) {
    test(
      `${feature.name}, ${feature.tags}`,
      async ({ page }) => {
        // load test data from static files
        const testdata = await WebUtil.loadTestData(`${feature.data}`);

        for (const key of Object.keys(testdata)) {
          console.log(`input: ${key}: ${testdata[key]}`);
          const result = await page.evaluate(fetchFiCodes, [key, 10, ENDPOINT, validFiCodes, API_KEY]);
          console.log(result);
          console.log('===================');
          // expect.soft(result).toContain(testdata[key]);
        }
      },
    );
  }
});
