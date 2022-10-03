const { expect, test } = require('@playwright/test');
const parse = require('../features/parse');
const columns = require('../features/columns.spec');

// Parse the feature file into something flat that can be tested separately
const parsed = parse(columns);

test.describe(`${parsed.name} Variation Tests`, () => {
  parsed.features.forEach((props) => {
    const title = `${props.name} ${props.env} ${props.tag} on ${props.url}`;

    test.beforeEach(async ({ page }) => {
      await page.goto(props.url);
    });

    // Test columns block is visible and expected amount of columns
    test(title, async ({ page }) => {
      const columns = page.locator(props.selector);
      await expect(columns).toBeVisible();
      const col = columns.locator(".col");
      const count = await col.count();
      expect(count).toEqual(props.columnCount);
    });

    //Test link
    if(props.tag != '@columns-contained-table') {
      test(title, async ({ page }) => {
        const el = page.locator(props.selector);
        await el.locator('a').first().click();
        expect(page.url).not.toEqual(props.url);
      });
    }

    //Test column content whether image or text
    test(title, async ({ page }) => {
      const el = page.locator(props.selector);
      const row = el.locator('.row').first();
      if(props.tag != '@columns-image') {
        await expect(row).not.toBeEmpty();
      } else {
        const image = row.locator('img');
        await expect(image).toBeVisible();
      }
    });
  });
});
