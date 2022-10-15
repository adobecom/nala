import { expect, test } from '@playwright/test';
import columns from '../features/columns.spec';
import parse from '../features/parse';
import selectors from '../selectors/columns.selectors';

// Parse the feature file into something flat that can be tested separately
const { name, features } = parse(columns);

test.describe(`${name}`, () => {
  features.forEach((props) => {
    // Test columns block is visible and .col divs are present
    test(props.title, async ({ page }) => {
      await page.goto(props.url);
      const columns = page.locator(selectors[props.tag]).first();
      await columns.scrollIntoViewIfNeeded();
      await expect(columns).toBeVisible();
      const count = await columns.locator(selectors['@col']).count();
      expect(count).toBeGreaterThan(0);
    });
  });
});
