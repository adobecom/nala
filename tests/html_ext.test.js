const { expect, test } = require('@playwright/test');
const htmlExt = require('../features/html_ext.spec.js');
const parse = require('../features/parse.js');
const selectors = require('../selectors/html_ext.selectors.js');

// Parse the feature file into something flat that can be tested separately
const { name, features } = parse(htmlExt);
test.describe(`${name}`, () => {
  features.forEach((props) => {
    test(props.title, async ({ page }) => {
      await page.goto(props.url);
      await expect(page).toHaveURL(`${props.url}.html`);

      // Check CaaS fragments urls are not converted by verifying the cards render and are visible
      const recommendedCards = page.locator(selectors['@recommended']);
      await expect(recommendedCards).toBeVisible();
    });
  });
});
