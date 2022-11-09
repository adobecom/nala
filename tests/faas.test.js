/* eslint-disable no-restricted-syntax */
/* eslint-disable no-await-in-loop */
const { expect, test } = require('@playwright/test');
const faas = require('../features/faas.spec.js');
const parse = require('../features/parse.js');
const selectors = require('../selectors/faas.selectors.js');

// Parse the feature file into something flat that can be tested separately
const { name, features } = parse(faas);

test.describe(`${name}`, () => {
  features.forEach((props) => {
    test(props.title, async ({ page }) => {
      await page.goto(props.url);
      const locator = await page.locator(selectors[props.tag]);
      await expect(locator.isVisible()).toBe(true);

      // Fill out Form
      //

      if (props.url) {
        //
      }

      if (props.url) {
        //
      }

      // Submit form
    });
  });
});
