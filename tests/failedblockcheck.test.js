const { expect, test } = require('@playwright/test');
const failedBlock = require('../features/failedblock.spec.js');
const parse = require('../features/parse.js');
const selectors = require('../selectors/failedblock.selectors.js');

// Parse the feature file into something flat that can be tested separately
const { name, features } = parse(failedBlock);

test.describe(`${name}`, () => {
  features.forEach((props) => {
    if (props.env === '@bacom' || props.env === '@stock') {
      test(props.title, async ({ page }) => {
        await page.goto(props.url);
        const failedBlocks = await page.$$(selectors[props.tag]);
        if (failedBlocks !== null) {
          failedBlocks.forEach((failed) => {
            const failedMessage = failed.innerText();
            console.log(`Failed Block Message: ${failedMessage} : on page: ${props.url}`);
          });
        }
        expect(failedBlocks).toBeNull();
      });
    }
  });
});
