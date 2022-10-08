import { expect, test } from '@playwright/test';
import columns from '../features/columns.spec';
import parse from '../features/parse';
import selectors from '../selectors/columns.selectors';

// Parse the feature file into something flat that can be tested separately
const parsed = parse(columns);

test.describe('Columns', () => {
  parsed.features.forEach((props) => {
    const title = `${props.name} ${props.env} ${props.tag} on ${props.url}`;

    // Test columns block is visible and .col divs are present
    test(title, async ({ page }) => {
      await page.goto(props.url);
      const columns = page.locator(selectors[props.tag]).first();
      await columns.scrollIntoViewIfNeeded();
      await expect(columns).toBeVisible();
      const count = await columns.locator(selectors['@col']).count();
      expect(count).toBeGreaterThan(0);
    });

    //Test link
    if(props.tag != '@columns-contained-table') {
      test(`${title} Links`, async ({ page }) => {
        await page.goto(props.url);
        await page.locator(`${selectors[props.tag]} >> ${selectors['@link']}`).first().click();
        expect(page.url).not.toEqual(props.url);
      });
    }

    //Test column content whether image or text
    test(`${title} Contents`, async ({ page }) => {
      await page.goto(props.url);
      const row = page.locator(`${selectors[props.tag]} >> ${selectors['@row']}`).first();
      if(props.env != '@blog') {
        expect(row.textContent).toBeTruthy();
      } else {
        const image = page.locator(`${selectors[props.tag]} >> ${selectors['@image']}`).first();
        await image.scrollIntoViewIfNeeded();
        await expect(image).toBeVisible();
      }
    });
  });

  test.afterEach (async ({ page }) => {
    await page.close();
  });
});
