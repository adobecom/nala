/* eslint-disable import/named */
/* eslint-disable no-await-in-loop */
import { expect, test } from '@playwright/test';
import columns from '../../../features/milo/columns.spec.js';
import parse from '../../../libs/parse.js';
import { WebUtil } from '../../../libs/webutil.js';

// Parse the feature file into something flat that can be tested separately
const { name, features } = parse(columns);

// Global declarations
let webUtil;

test.describe(`${name}`, () => {
  // before each test block
  test.beforeEach(async ({ page }) => {
    webUtil = new WebUtil(page);
  });

  features.forEach((props) => {
    // Added condition when using feature spec file used in E2E tests
    // in order to choose urls for visual comparison.
    // This condition is not necessary if using separate feature spec files for visual comparisons.
    if (props.tag === '@visual') {
      test(props.title, async ({ page }) => {
        await page.goto(props.url);
        await page.waitForLoadState('domcontentloaded');

        // Added scrolling for lazy loaded images to initiate their load.
        await webUtil.scrollPage('down', 'slow');
        await webUtil.scrollPage('up', 'fast');
        // Compare the base screenshot against a newly taken screenshot for equality
        // If no base screenshot image is available for comparison create one.
        await expect(page).toHaveScreenshot(`columns_${props.url}.png`, { fullPage: true, timeout: 30000 });
      });
    }
  });
});
