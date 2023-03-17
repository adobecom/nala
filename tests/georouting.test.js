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

    if (props.tag === '@georouting') {
      test(props.title, async ({ page, context }) => {
        if (props.url.includes('/de/')) {
          await page.goto(`${props.url}?akamaiLocale=US`);
        } else {
          await page.goto(`${props.url}?akamaiLocale=DE`);
        }
        let geoModal = page.locator(selectors['@dialog-modal']);
        await expect(geoModal).toBeVisible({ timeout: 15000 });

        // Check all messages are there per regions and the text is correct for the region.
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

          if (lang === 'de-DE') {
            expect(message.textContent()).toEqual('Sie befinden sich außerhalb der USA? Auf der Adobe-Website für Ihre Region finden Sie Informationen zu den für Sie relevanten Preisen, Angeboten und Veranstaltungen.');
          } else {
            expect(message.textContent()).toEqual('Are you visiting Adobe.com from outside the US? Visit your regional site for more relevant pricing, promotions and events.');
          }
        });

        // Check all links are there for languages and the link text is correct for the locale.
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

          if (lang === 'de-DE') {
            expect(link.textContent()).toEqual('Zur Website für Deutschland');
          } else {
            expect(link.textContent()).toEqual('Continue to United States');
          }
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

        // Verify going to another page in same locale the modal doesn't show up since region picked
        await page.goto('https://main--milo--adobecom.hlx.live/de/test/features/blocks/georouting2?akamaiLocale=DE');

        geoModal = page.locator(selectors['@dialog-modal']);
        await expect(geoModal).not.toBeVisible({ timeout: 15000 });

        // Verify going to another page in a different locale, modal shows up where region different
        await page.goto('https://main--milo--adobecom.hlx.live/ch_fr/test/features/blocks/georouting?akamaiLocale=DE');

        geoModal = page.locator(selectors['@dialog-modal']);
        await expect(geoModal).toBeVisible({ timeout: 15000 });
      });
    }

    if (props.tag === '@georouting-multi') {
      test(props.title, async ({ page }) => {
        // Test multiple messages and links for a region mena_en that has multiple language codes
        await page.goto(`${props.url}?akamaiLocale=QA`);

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

          if (lang === 'ar-QA' || lang === 'en-QA') { expectedLang = true; }
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

          if (lang === 'ar-QA' || lang === 'en-QA') { expectedLang = true; }
          expect(expectedLang).toBeTruthy();
        });
      });
    }

    if (props.tag === '@fallback-on') {
      test(props.title, async ({ page }) => {
        // Test region codes that don't have sibling, have a fallback to home page.
        await page.goto(`${props.url}?akamaiLocale=DE`);
        const geoModal = page.locator(selectors['@dialog-modal']);
        await expect(geoModal).toBeVisible({ timeout: 15000 });

        // Check fallback link navigates to locale homepage since sibling page isn't available.
        let lang;
        const linksWrapper = page.locator(selectors['@links']);
        await expect(linksWrapper).toBeVisible();
        const links = await page.$$(selectors['@link']);
        expect(links.length).toEqual(1);
        links.forEach(async (link) => {
          lang = await link.getAttribute('lang');
          if (lang === 'de-DE') {
            await link.click();
          }
          expect(page, 'ERROR: Fallback link did not go to locale homepage.').toHaveURL(/.*business.adobe.com\/de/);
        });
      });
    }

    if (props.tag === '@georouting-close') {
      test(props.title, async ({ page, context }) => {
        await page.goto(`${props.url}?akamaiLocale=DE`);
        let geoModal = page.locator(selectors['@dialog-modal']);
        await expect(geoModal).toBeVisible({ timeout: 15000 });

        await page.locator(selectors['@dialog-close']).click();
        await expect(geoModal).not.toBeVisible({ timeout: 15000 });

        // Verify Cookies have not been set
        let cookies = context.cookies();
        expect(cookies).not.toContain('international');

        await page.reload();

        geoModal = page.locator(selectors['@dialog-modal']);
        await expect(geoModal).toBeVisible({ timeout: 15000 });

        await page.locator(selectors['@page-header']).click();
        await expect(geoModal).not.toBeVisible({ timeout: 15000 });

        // Verify Cookies have not been set
        cookies = context.cookies();
        expect(cookies).not.toContain('international');

        // Verify going to another page in same locale the modal shows up since region not picked
        await page.goto('https://main--milo--adobecom.hlx.live/test/features/blocks/georouting2?akamaiLocale=DE');

        geoModal = page.locator(selectors['@dialog-modal']);
        await expect(geoModal).toBeVisible({ timeout: 15000 });
      });
    }

    if (props.tag === '@georouting-off') {
      test(props.title, async ({ page }) => {
        await page.goto(`${props.url}?akamaiLocale=DE`);
        const geoModal = page.locator(selectors['@dialog-modal']);
        await expect(geoModal).not.toBeVisible({ timeout: 15000 });
      });
    }

    if (props.tag === '@fallback-off') {
      test(props.title, async ({ page }) => {
        await page.goto(`${props.url}?akamaiLocale=ES`);
        const geoModal = page.locator(selectors['@dialog-modal']);
        await expect(geoModal).toBeVisible({ timeout: 15000 });

        // Check all messages are there per regions
        const messagesWrapper = page.locator(selectors['@messages']);
        await expect(messagesWrapper).toBeVisible();
        let expectedLang;
        let lang;
        const messages = await page.$$(selectors['@message']);
        expect(messages.length).toEqual(1);

        messages.forEach(async (message) => {
          expectedLang = false;
          lang = await message.getAttribute('lang');
          expect(lang).toBeTruthy();

          if (lang === 'en-US') { expectedLang = true; }
          expect(expectedLang, 'ERROR: Found more languages than expected when Fallback is off').toBeTruthy();
        });

        // Check all links are there for languages
        const linksWrapper = page.locator(selectors['@links']);
        await expect(linksWrapper).toBeVisible();
        const links = await page.$$(selectors['@link']);
        expect(links.length).toEqual(1);
        links.forEach(async (link) => {
          expectedLang = false;
          lang = await link.getAttribute('lang');
          expect(lang).toBeTruthy();

          if (lang === 'en-US') { expectedLang = true; }
          expect(expectedLang, 'ERROR: Found more links than expected when Fallback is off').toBeTruthy();
        });
      });
    }
  });
});
