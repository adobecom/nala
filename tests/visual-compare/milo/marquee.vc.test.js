import { expect, test } from '@playwright/test';
import columns from '../../../features/milo/marquee.spec.js';
import parse from '../../../features/parse.js';

// Parse the feature file into something flat that can be tested separately
const { name, features } = parse(columns);

test.describe(`${name}`, () => {
  features.forEach((props) => {
    // Added condition when using feature spec file used in E2E tests
    // in order to choose urls for visual comparison.
    // This condition is not necessary if using separate feature spec files for visual comparisons.
    if (props.tag === '@visual-compare') {
      test(props.title, async ({ page }) => {
        await page.goto(props.url);
        await expect(page).toHaveScreenshot(`marquee_${props.url}.png`, { fullPage: true, timeout: 30000 });
      });
    }
  });
});
