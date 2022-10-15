import { expect, test } from '@playwright/test';
import columns from '../features/columns.spec.js';
import parse from '../features/parse.js';
import selectors from '../selectors/columns.selectors.js';

// Parse the feature file into something flat that can be tested separately
const parsed = parse(columns);

test.describe('Columns', () => {
  parsed.features.forEach((props) => {
    // Test columns block is visible and .col divs are present
    test(props.title, async ({ page }) => {
      await page.goto(props.url);
      const cols = page.locator(selectors[props.tag]).first();
      await cols.scrollIntoViewIfNeeded();
      await expect(cols).toBeVisible();
      const count = await cols.locator(selectors['@col']).count();
      expect(count).toBeGreaterThan(0);
    });

    // Test link
    if (props.tag !== '@columns-contained-table') {
      test(`${props.title} Links`, async ({ page }) => {
        await page.goto(props.url);
        await page.locator(`${selectors[props.tag]} >> ${selectors['@link']}`).first().click();
        expect(page.url).not.toEqual(props.url);
      });
    }

    // Test column content whether image or text
    test(`${props.title} Contents`, async ({ page }) => {
      await page.goto(props.url);
      const row = page.locator(`${selectors[props.tag]} >> ${selectors['@row']}`).first();
      if (props.env !== '@blog') {
        expect(row.textContent).toBeTruthy();
      } else {
        const image = page.locator(`${selectors[props.tag]} >> ${selectors['@image']}`).first();
        await image.scrollIntoViewIfNeeded();
        await expect(image).toBeVisible();
      }
    });
  });
});
