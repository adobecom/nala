/* eslint-disable no-restricted-syntax */
/* eslint-disable no-await-in-loop */
const { expect, test } = require('@playwright/test');
const failedBlock = require('../features/failedblock.spec.js');
const parse = require('../features/parse.js');
const selectors = require('../selectors/failedblock.selectors.js');

// Parse the feature file into something flat that can be tested separately
const { name, features } = parse(failedBlock);

test.describe(`${name}`, () => {
  features.forEach((props) => {
    test(props.title, async ({ page }) => {
      await page.goto(props.url);
      await page.locator('footer').hover(); // Added to give time for failed block JS to load. Without it, test becomes flaky.
      const locator = page.locator(selectors[props.tag]);
      const count = await locator.count();
      expect(count).toEqual(0);
      if (count > 0) {
        const handles = await locator.elementHandles();
        for (const handlePromise of handles) {
          const handle = handlePromise;
          const reason = await handle.getAttribute('data-reason');
          console.log(`${reason} on ${props.url}`);
        }
      }
    });
  });
});
