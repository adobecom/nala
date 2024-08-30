const { test, expect } = require('@playwright/test');

test('Verify consonant card exists on Milo CaaS collection page @caas', async ({ page }) => {
  await page.goto('/drafts/nala/features/caas/caascollection');
  await page.waitForSelector('.consonant-Card', { state: 'visible', timeout: 60000 });
  const cardElements = page.locator('.consonant-Card');
  const count = await cardElements.count();
  console.log(`Number of .consonant-Card elements found: ${count}`);
  expect(count).toBeGreaterThan(0);
});
