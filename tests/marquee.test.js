const { expect, test } = require('@playwright/test');
const parse = require('../features/parse');
const marquee = require('../features/marquee.spec');
const selectors = require('../selectors/marquee.selectors');

// Parse the feature file into something flat that can be tested separately
const parsed = parse(marquee);

test.describe(`${parsed.name}`, () => {
  parsed.features.forEach((props) => {
    const title = `${props.name} ${props.env} ${props.tag} on ${props.url}`;

    test(title, async ({ page }) => {
      await page.goto(props.url);
      const el = page.locator(selectors[props.tag]).first();

      if (props.tag === '@inline-button') {
        await expect(el).not.toBeVisible();
      } else {
        await expect(el).toBeVisible();
      }
    });
  });
});
