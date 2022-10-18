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
      const failedBlocks = await page.$$(selectors[props.tag]);
      for await (const failedMessage of failedBlocks.map((failed) => failed.getAttribute('data-reason'))) {
        console.log(`Failed Block Message: "${failedMessage}" : Page URL: ${props.url}`);
      }
      expect(failedBlocks).toHaveLength(0);
    });
  });
});
