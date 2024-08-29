const { test, expect } = require('@playwright/test');

test('@caas Verify consonant card exists on Adobe Business page', async ({ page }) => {
  // Navigate to the specified URL
  await page.goto('https://main--milo--adobecom.hlx.live/drafts/nala/features/caas/caascollection');

  // Wait for the page to load
  await page.waitForSelector('.consonant-Card', { state: 'visible', timeout: 30000});

  // Check if at least one element with class '.consonant-Card' exists
  const cardElements = await page.locator('.consonant-Card');

  // Verify that at least one card element is present
  const count = await cardElements.count();
  await expect(count).toBeGreaterThan(0);
});
