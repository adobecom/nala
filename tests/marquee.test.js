const { expect, test } = require('@playwright/test');
const parse = require('../features/parse');
const marquee = require('../features/marquee.spec');
const selectors = require('../selectors/marquee.selectors');

const { name, features } = parse(marquee);

test.describe(`${name}`, () => {
  features.forEach((props) => {
    test(props.title, async ({ page }) => {
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
