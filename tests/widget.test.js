import { expect, test } from '@playwright/test';
import parse from '../features/parse.js';
import widget from '../features/widget.spec.js';
import selectors from '../selectors/widget.selectors.js';

const { name, features } = parse(widget);

test.describe(name, () => {
  features.forEach((props) => {
    test(props.title, async ({ page }) => {
      await page.goto(props.url);
      const el = page.locator(selectors[props.tag]).first();
      await expect(el).toBeVisible();
    });
  });
});
