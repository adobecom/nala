import { expect, test } from '@playwright/test';
import parse from '../../libs/parse.js';
import columns from '../../features/milo/columns.spec.js';
import selectors from '../../selectors/milo/columns.selectors.js';

// Parse the feature file into something flat that can be tested separately
const { name, features } = parse(columns);

test.describe(`${name}`, () => {
  features.forEach((props) => {
    // Test columns block is visible and .col divs are present
    test(props.title, async ({ page }) => {
      await page.goto(props.url);
      const cols = page.locator(selectors[props.tag]).first();
      await cols.scrollIntoViewIfNeeded();
      await expect(cols).toBeVisible();
      const count = await cols.locator(selectors['@col']).count();
      expect(count).toBeGreaterThan(0);
    });
  });
});
