const features = require('../features/features');
const { expect, test } = require('@playwright/test');

test.describe('Marquee', () => {
  const marquees = features['@marquee'];
  marquees.forEach((props) => {
    test(`Testing ${props.name}`, async ({ page }) => {
      await page.goto(props.url);

      if (props.largeMarqueeButton) {
        const cta = page.locator(props.largeMarqueeButton).first();
        await expect(cta).toBeVisible();
      }

      if (props.inlineMarqueeButton) {
        const cta = page.locator(props.inlineMarqueeButton).first();
        await expect(cta).not.toBeVisible();
      }
    });
  });
});
