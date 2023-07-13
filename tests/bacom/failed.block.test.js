/* eslint-disable no-await-in-loop */
import { expect, test } from '@playwright/test';
import { WebUtil } from '../../libs/webutil.js';

const parse = require('../../libs/parse.js');
const failedBlock = require('../../features/bacom/failed.block.spec.js');
const selectors = require('../../selectors/bacom/failed.block.page.js');

// Parse the feature file into something flat that can be tested separately
const { name, features } = parse(failedBlock);

let webUtil;

test.describe(`${name} test suite`, () => {
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
