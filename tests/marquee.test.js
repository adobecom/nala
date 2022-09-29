const { expect, test } = require('@playwright/test');
const parse = require('../features/parse');
const marquee = require('../features/marquee.spec');

// Parse the feature file into something flat that can be tested separately
const parsed = parse(marquee);

test.describe(`${parsed.name}`, () => {
  parsed.features.forEach((props) => {
    const title = `${props.name} ${props.env} ${props.tag} on ${props.url}`;

    if (props.name === '@marquee') {
      test(title, async ({ page }) => {
        await page.goto(props.url);
        const el = page.locator(props.selector).first();
        await expect(el).toBeVisible();
      });
    }

    if (props.name === '@button') {
      test(`${props.name} ${props.env} ${props.tag} on ${props.url}`, async ({ page }) => {
        await page.goto(props.url);
        const cta = page.locator(props.selector).first();
  
        if (props.tag === '@inline-button') {
          await expect(cta).not.toBeVisible();
        } else {
          await expect(cta).toBeVisible();
        }
      });
    }


  });
});
