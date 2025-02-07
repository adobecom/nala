/* eslint-disable no-restricted-syntax */
/* eslint-disable import/named */
import { test } from '@playwright/test';
import { features } from '../../features/graybox/sot.bacom.404.spec.js';

const fs = require('fs'); // Add this import at the top

const { WebUtil } = require('../../libs/webutil.js');

const results = {};
let consoleErrors = [];
let four0FourErrors = [];

test.describe('Graybox Bacom SOT 404 Check test suite', () => {
  test.setTimeout(20 * 60 * 1000);
  test.beforeEach(async ({ page }) => {
    // Check for 404s
    page.on('response', (response) => {
      if (response.status() === 404) {
        console.log(`Resource not found: ${response.url()}`);
        four0FourErrors.push(`Resource not found: ${response.url()}`);
      }
    });

    // Check for console errors
    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        console.error(`Console error: ${msg.text()}`);
        consoleErrors.push(`Console error: ${msg.text()}`); // Fix to store console errors in the results object
      }
    });
  });

  for (const feature of features) {
    // eslint-disable-next-line no-loop-func
    test(`${feature.name},${feature.tags}`, async ({ page }) => {
      // load test data from static files
      const testdata = await WebUtil.loadTestData(`${feature.data}`);

      for (const key of Object.keys(testdata)) {
        consoleErrors = [];
        four0FourErrors = [];
        const stableURL = testdata[key];
        const betaURL = stableURL.replace('business.stage', 'test.business-graybox');
        console.info('Checking for 404s on:', betaURL);
        // Go to the page you want to check
        await page.goto(betaURL);

        // Wait for some time to ensure all resources are loaded
        await page.waitForLoadState('networkidle'); // Better way to wait for page load
        // {{ edit_1 }}: Log all links on the page
        const links = await page.$$eval('a', (anchors) => anchors
          .map((anchor) => anchor.href)
          .filter((href) => !href.includes('test.business-graybox')));
        console.log('Links on the page:', links);
        results[betaURL] = {
          four0FourErrors,
          consoleErrors,
          links,
        };
      }
    });
  }

  // {{ edit_3 }}: Write results to JSON file after all tests
  test.afterAll(async () => {
    fs.writeFileSync('graybox-bacom-404-results.json', JSON.stringify(results, null, 2));
    console.log('Results saved to graybox-bacom-404-results.json');
  });
});
