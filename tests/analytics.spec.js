const features = require('../features/features');
const { expect, test } = require('@playwright/test');

test.describe('Analytics', () => {
  const featureNames = features['@analytics'];
  featureNames.forEach((props) => {
    test(`Testing ${props.name}`, async ({ page }) => {
      await page.goto(props.url);

      if (props.linkHierarchy) {
        const lh = page.locator(props.linkHierarchy).first();
        await expect(lh).toHaveAttribute('daa-lh', 'gnav|bacom');
        await expect(lh).toHaveAttribute('daa-im', 'true');
      }
    });
  });
});
