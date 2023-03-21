import { expect, test } from '@playwright/test';
import parse from '../../libs/parse.js';
import marquee from '../../features/milo/marquee.spec.js';
import selectors from '../../selectors/milo/marquee.selectors.js';

const { name, features } = parse(marquee);

test.describe(name, () => {
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
