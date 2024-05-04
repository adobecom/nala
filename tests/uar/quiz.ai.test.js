/* eslint-disable no-await-in-loop */
/* eslint-disable no-loop-func */
/* eslint-disable no-restricted-syntax */
import { expect, test } from '@playwright/test';

const QuizSpec = require('../../features/uar/quiz.ai.spec.js');

const { features } = QuizSpec;
const { WebUtil } = require('../../libs/webutil.js');

const ENDPOINT = 'acom-prd-recom-v01';
const CLIENT_ID = 'CCHomeMLRepo1';
const threshold = 0.7;

const validFiCodes = ['premierepro_cc',
  'aftereffects_cc',
  'flash_professional_cc',
  'audition_cc',
  'indesign_cc',
  'illustrator_cc',
  'photoshop_cc',
  'acrobat_dc_pro',
  'sbst_stager',
  'sbst_painter',
  'sbst_alchemist',
  'sbst_shaper',
  'sbst_designer',
  'lightroom_cc',
  'free_spark'];

// Define the function to be executed within the browser context
const fetchFiCodes = async ([input, numberOfItems, endPoint, fiCodes, clientId]) => {
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
        num_items: numberOfItems || 5,
        given_prod_list: fiCodes,
      },
    },
  };

  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': clientId,
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
          console.log('----------');
          const result = await page.evaluate(fetchFiCodes, [key, 3, ENDPOINT, validFiCodes, CLIENT_ID]);

          console.log(`original: ${JSON.stringify(result.data)}`);
          console.log('----------');

          let highestProb = null;

          if (result) {
            result.filtered = result?.data?.filter((item) => {
              let isValid = false;
              if (!highestProb) {
                highestProb = item.prob;
                isValid = true;
              } else if (item.prob / highestProb > threshold) {
                isValid = true;
              }
              return isValid;
            });
          }

          console.log(`filtered: ${JSON.stringify(result.filtered)}`);

          console.log('===================');
          expect.soft(JSON.stringify(result.filtered)).toContain(testdata[key]);
        }
      },
    );
  }
});
