/* eslint-disable import/named */
/* eslint-disable import/extensions */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-await-in-loop */
import { WebUtil } from '../../libs/webutil';

const { expect, test } = require('@playwright/test');
const parse = require('../../libs/parse.js');
const failedBlock = require('../../features/milo/failedblock.spec.js');
const selectors = require('../../selectors/milo/failedblock.selectors.js');

// Parse the feature file into something flat that can be tested separately
const { name, features } = parse(failedBlock);

// Create test global page/util variables
let webUtil;

test.describe(`${name}`, () => {
  // before each test block
  test.beforeEach(async ({ page }) => {
    webUtil = new WebUtil(page);
  });
  features.forEach((props) => {
    test(props.title, async ({ page, browser }) => {
      await page.goto(props.url);
      const res = await page.goto(props.url);
      expect(res.status()).toBe(200);

      // Added scrolling for failed block JS to load.
      // Without it, test provides false count for validation checking.
      await webUtil.scrollPage('down', 'slow');
      await webUtil.scrollPage('up', 'fast');

      const locator = page.locator(selectors[props.tag]);
      const count = await locator.count();
      expect.soft(count).toEqual(0);
      if (count > 0) {
        const handles = await locator.elementHandles();
        for (const handlePromise of handles) {
          const handle = handlePromise;
          const reason = await handle.getAttribute('data-reason');
          console.log(`${browser.browserType().name()}: ${reason} on ${props.url}`);
        }
      }
    });
  });
});
