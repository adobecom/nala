import { expect, test } from '@playwright/test';
import georouting from '../features/georouting.spec.js';
import parse from '../features/parse.js';
import selectors from '../selectors/georouting.selectors.js';

// Parse the feature file into something flat that can be tested separately
const { name, features } = parse(georouting);

test.describe(`${name}`, () => {
  features.forEach((props) => {
    // Test georouting features
    // lang="de-DE" lang="en-US"
    test(props.title, async ({ page, context }) => {
      await page.goto(`${props.url}?akamaiLocale=DE`);
      const geoModal = page.locator(selectors['@dialog-modal']);
      await expect(geoModal).toBeVisible({ timeout: 15000 });

      // Check all messages are there per regions
      const messagesWrapper = page.locator(selectors['@messages']);
      await expect(messagesWrapper).toBeVisible();
      let expectedLang;
      let lang;
      const messages = await page.$$(selectors['@message']);
      expect(messages.length).toEqual(2);

      messages.forEach(async (message) => {
        expectedLang = false;
        lang = await message.getAttribute('lang');
        expect(lang).toBeTruthy();

        if (lang === 'de-DE' || lang === 'en-US') { expectedLang = true; }
        expect(expectedLang).toBeTruthy();
      });

      // Check all links are there for languages
      const linksWrapper = page.locator(selectors['@links']);
      await expect(linksWrapper).toBeVisible();
      const links = await page.$$(selectors['@link']);
      expect(links.length).toEqual(2);
      links.forEach(async (link) => {
        expectedLang = false;
        lang = await link.getAttribute('lang');
        expect(lang).toBeTruthy();

        if (lang === 'de-DE' || lang === 'en-US') { expectedLang = true; }
        expect(expectedLang).toBeTruthy();
      });

      // Then click the new region language link
      links.forEach(async (link) => {
        lang = await link.getAttribute('lang');
        if (lang === 'de-DE') {
          await link.click();
          await expect(page).toHaveURL(/.*de\/test\/features\/blocks\/georouting\?akamaiLocale=DE/);
        }
      });

      // Verify Cookies has been set
      const cookies = context.cookies();
      expect(cookies).toContain('international');
      context.clearCookies();
    });
  });
});
