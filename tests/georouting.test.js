import { expect, test } from '@playwright/test';
import georouting from '../features/georouting.spec.js';
import parse from '../features/parse.js';
import selectors from '../selectors/georouting.selectors.js';
// import regions from '../envs/regions.js';

// Parse the feature file into something flat that can be tested separately
const { name, features } = parse(georouting);

test.describe(`${name}`, () => {
  features.forEach((props) => {
    // Test georouting features
    // lang="de-DE" lang="en-US"
    test(props.title, async ({ page, context }) => {
      await page.goto(`${props.url}?akamaiLocale=DE`);
      const geoModal = page.locator(selectors['@dialog-modal']);
      await expect(geoModal).toBeVisible();

      // Check all messages are there per regions
      const messages = page.locator(selectors['@messages']);
      await expect(messages).toBeVisible();
      messages.forEach(async (message) => {
        const lang = message.getAttribute('lang');
        await expect(message);
      });

      // Check all links are there for languages
      const links = page.locator(selectors['@links']);
      await expect(links).toBeVisible();
      links.forEach(async (link) => {
        const lang = link.getAttribute('lang');
        if (lang === 'de-DE') {
          await link.click();
          await expect(page).toHaveURL(/.*de\/test\/features\/blocks\/georouting\?akamaiLocale=DE/);
        }
      });

      // Then click the new region language link
      links.forEach(async (link) => {
        const lang = link.getAttribute('lang');
        if (lang === 'de-DE') {
          await link.click();
          await expect(page).toHaveURL(/.*de\/test\/features\/blocks\/georouting\?akamaiLocale=DE/);
        }
      });

      // Verify Cookies has been set
      const cookies = context.cookies();
      await expect(cookies).toContain('international');
      context.clearCookies();
    });
  });
});
