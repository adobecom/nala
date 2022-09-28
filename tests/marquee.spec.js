const pages = require('../pages/pages');
const { expect, test } = require('@playwright/test');

test.describe('Marquee', () => {
  for (const testPage of pages) {
    test(`Testing marquee on ${testPage.url}`, async ({ page }) => {
      await page.goto(testPage.url);

      const cta = page.locator('.marquee .con-button >> nth=0');

      await expect(cta).toBeVisible();
    });
  }
});
