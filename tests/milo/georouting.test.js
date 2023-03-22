/* eslint-disable max-len */
import { expect, test } from '@playwright/test';
import georouting from '../../features/milo/georouting.spec.js';
import parse from '../../libs/parse.js';
import selectors from '../../selectors/milo/georouting.selectors.js';

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
        if (props.title.includes('@bacom_live')) {
          const geoModal = page.locator(selectors['@dialog-modal']);
          await expect(geoModal).toBeVisible({ timeout: 15000 });

          // Check all messages are there per regions and the text is correct for the region.
          const messagesWrapper = page.locator(selectors['@messages']);
          await expect(messagesWrapper).toBeVisible();
          const messages = await page.$$(selectors['@message']);
          expect(messages.length).toEqual(2);

          const messageDE = page.getByText(selectors['@messageDE'], { exact: true });
          const messageUS = page.getByText(selectors['@messageEnglish'], { exact: true });

          await expect(messageDE).toBeVisible();
          await expect(messageUS).toBeVisible();
          expect(await messageDE.getAttribute('lang')).toEqual('de-DE');
          expect(await messageUS.getAttribute('lang')).toEqual('en-US');

          // Check all links are there for languages and the link text is correct for the locale.
          const linksWrapper = page.locator(selectors['@links']);
          await expect(linksWrapper).toBeVisible();
          const links = await page.$$(selectors['@link']);
          expect(links.length).toEqual(2);

          const linkDE = page.getByRole('link', { name: selectors['@linkDE'], exact: true });
          const linkUS = page.getByRole('link', { name: selectors['@linkUS'], exact: true });

          await expect(linkDE).toBeVisible();
          await expect(linkUS).toBeVisible();
          expect(await linkDE.getAttribute('lang')).toEqual('de-DE');
          expect(await linkUS.getAttribute('lang')).toEqual('en-US');
        } else {
          let geoModal = page.locator(selectors['@dialog-modalV2']);
          await expect(geoModal).toBeVisible({ timeout: 15000 });

          // Check all messages and links are there per regions and the text is correct for the region.
          const modalWrapper = page.locator(selectors['@modal-content']);
          await expect(modalWrapper).toBeVisible();
          const messages = await page.$$(selectors['@message']);
          expect(messages.length).toEqual(1);

          const linksWrapper = page.locator(selectors['@links']);
          await expect(linksWrapper).toBeVisible();
          const links = await linksWrapper.$$('a');
          expect(links.length).toEqual(2);

          // Validate Georouting V2 Modal heading, text, links, and lang attributes are exactly correct.
          let linkDE;
          let linkUS;
          if (page.url().includes('?akamaiLocale=DE')) {
            const messageHeaderDE = page.getByRole('heading', { name: selectors['@modal-headerDE'], exact: true });
            await expect(messageHeaderDE).toBeVisible();
            const messageDE = page.getByText(selectors['@messageDE_V2'], { exact: true });
            await expect(messageDE).toBeVisible();
            expect(await messageDE.getAttribute('lang')).toEqual('de-DE');

            linkDE = page.getByRole('button', { name: selectors['@linkDE_V2'], exact: true });
            linkUS = page.getByRole('link', { name: selectors['@linkUS_V2'], exact: true });
          } else {
            const messageHeaderUS = page.getByRole('heading', { name: selectors['@modal-headerUS'], exact: true });
            await expect(messageHeaderUS).toBeVisible();
            const messageUS = page.getByText(selectors['@messageUS_V2'], { exact: true });
            await expect(messageUS).toBeVisible();
            expect(await messageUS.getAttribute('lang')).toEqual('en-US');

            linkDE = page.getByRole('link', { name: selectors['@linkDE_V2'], exact: true });
            linkUS = page.getByRole('button', { name: selectors['@linkUS_V2'], exact: true });
          }

          await expect(linkDE).toBeVisible();
          await expect(linkUS).toBeVisible();
          expect(await linkDE.getAttribute('lang')).toEqual('de-DE');
          expect(await linkUS.getAttribute('lang')).toEqual('en-US');

          // Click German Link
          await linkDE.click();
          await expect(page).toHaveURL(/.*de\/test\/features\/blocks\/georouting\.*/);

          // Verify international cookie has been set
          let isCookieFound = false;
          const cookies = await context.cookies();
          cookies.forEach((cookie) => {
            if (cookie.name === 'international') { isCookieFound = true; }
          });
          expect(isCookieFound).toBeTruthy();

          // Verify going to another page in same locale the modal doesn't show up since region picked
          if (page.url().includes('?akamaiLocale=DE')) {
            await page.goto('https://main--milo--adobecom.hlx.live/de/test/features/blocks/georouting2?akamaiLocale=DE');
          } else {
            await page.goto('https://main--milo--adobecom.hlx.live/de/test/features/blocks/georouting2?akamaiLocale=US');
          }

          await expect(page.locator(selectors['@dialog-modal'])).not.toBeVisible({ timeout: 15000 });

          // Verify going to another page in a different locale, modal shows up where region different
          if (page.url().includes('?akamaiLocale=DE')) {
            await page.goto('https://main--milo--adobecom.hlx.live/ch_fr/test/features/blocks/georouting?akamaiLocale=DE');
          } else {
            await page.goto('https://main--milo--adobecom.hlx.live/ch_fr/test/features/blocks/georouting?akamaiLocale=US');
          }

          geoModal = page.locator(selectors['@dialog-modal']);
          await expect(geoModal).toBeVisible({ timeout: 15000 });
        }
      });
    }

    if (props.tag === '@georouting-multi') {
      test(props.title, async ({ page }) => {
        // Test multiple messages and links for a region mena_en that has multiple language codes
        await page.goto(`${props.url}?akamaiLocale=QA`);

        const geoModal = page.locator(selectors['@dialog-modalV2']);
        await expect(geoModal).toBeVisible({ timeout: 15000 });

        // Check all messages are there per regions
        const modalWrapper = page.locator(selectors['@modal-content']);
        await expect(modalWrapper).toBeVisible();
        const messages = await page.$$(selectors['@message']);
        expect(messages.length).toEqual(1);

        const messageHeaderMena = page.getByRole('heading', { name: selectors['@modal-headerQA'], exact: true });
        await expect(messageHeaderMena).toBeVisible();

        const messageMena = page.getByText(selectors['@messageMena'], { exact: true });
        await expect(messageMena).toBeVisible();
        expect(await messageMena.getAttribute('lang')).toEqual('en-US');

        // Check all links are there for languages and the link text is correct for the locale.
        const linksWrapper = page.locator(selectors['@links']);
        await expect(linksWrapper).toBeVisible();
        const links = await linksWrapper.$$('a');
        expect(links.length).toEqual(2);

        const linkMena = page.getByRole('button', { name: selectors['@linkMena'], exact: true });
        const linkUS = page.getByRole('link', { name: selectors['@linkUS'], exact: true });

        await expect(linkMena).toBeVisible();
        await expect(linkUS).toBeVisible();
        expect(await linkMena.getAttribute('lang')).toEqual('en-US');
        expect(await linkUS.getAttribute('lang')).toEqual('en-US');
      });
    }

    if (props.tag === '@fallback-on') {
      test(props.title, async ({ page }) => {
        // Test region codes that don't have sibling, have a fallback to home page.
        await page.goto(`${props.url}?akamaiLocale=DE`);
        const geoModal = page.locator(selectors['@dialog-modalV2']);
        await expect(geoModal).toBeVisible({ timeout: 15000 });

        // Check fallback link navigates to locale homepage since sibling page isn't available.
        const linksWrapper = page.locator(selectors['@links']);
        await expect(linksWrapper).toBeVisible();
        const links = await linksWrapper.$$('a');
        expect(links.length).toEqual(2);

        const linkDE = page.getByRole('button', { name: selectors['@linkDE_V2'], exact: true });
        await linkDE.click();
        expect(page, 'ERROR: Fallback link did not go to locale homepage.').toHaveURL(/.*main--milo--adobecom.hlx.live\/de/);
      });
    }

    if (props.tag === '@georouting-close') {
      test(props.title, async ({ page, context }) => {
        await page.goto(`${props.url}?akamaiLocale=DE`);
        let geoModal = page.locator(selectors['@dialog-modalV2']);
        await expect(geoModal).toBeVisible({ timeout: 15000 });

        await page.locator(selectors['@dialog-close']).click();
        await expect(geoModal).not.toBeVisible({ timeout: 15000 });

        // Verify Cookies have not been set
        let isCookieFound = false;
        let cookies = await context.cookies();
        cookies.forEach((cookie) => {
          if (cookie.name === 'international') { isCookieFound = true; }
        });
        expect(isCookieFound).toBeFalsy();

        await page.reload();

        geoModal = page.locator(selectors['@dialog-modalV2']);
        await expect(geoModal).toBeVisible({ timeout: 15000 });

        await page.locator(selectors['@modal-curtain']).click();
        await expect(geoModal).not.toBeVisible({ timeout: 15000 });

        // Verify Cookies have not been set
        isCookieFound = false;
        cookies = await context.cookies();
        cookies.forEach((cookie) => {
          if (cookie.name === 'international') { isCookieFound = true; }
        });
        expect(isCookieFound).toBeFalsy();

        // Verify going to another page in same locale the modal shows up since region not picked
        await page.goto('https://main--milo--adobecom.hlx.live/test/features/blocks/georouting2?akamaiLocale=DE');

        geoModal = page.locator(selectors['@dialog-modalV2']);
        await expect(geoModal).toBeVisible({ timeout: 15000 });
      });
    }

    if (props.tag === '@georouting-off') {
      test(props.title, async ({ page }) => {
        await page.goto(`${props.url}?akamaiLocale=DE`);
        await expect(page.locator(selectors['@dialog-modalV2'])).not.toBeVisible({ timeout: 15000 });
      });
    }

    if (props.tag === '@fallback-off') {
      test(props.title, async ({ page }) => {
        await page.goto(`${props.url}?akamaiLocale=DE`);
        await expect(page.locator(selectors['@dialog-modalV2'])).not.toBeVisible({ timeout: 15000 });
        // const geoModal = page.locator(selectors['@dialog-modalV2']);
        // await expect(geoModal).toBeVisible({ timeout: 15000 });

        // // Check all messages are there per regions
        // const modalWrapper = page.locator(selectors['@modal-content']);
        // await expect(modalWrapper).toBeVisible();
        // const messages = await page.$$(selectors['@message']);
        // expect(messages.length).toEqual(1);

        // const messageUS = page.getByText(selectors['@messageEnglish'], { exact: true });
        // await expect(messageUS).toBeVisible();
        // expect(await messageUS.getAttribute('lang')).toEqual('en-US');

        // // Check all links are there for languages
        // const linksWrapper = page.locator(selectors['@links']);
        // await expect(linksWrapper).toBeVisible();
        // const links = await page.$$(selectors['@link']);
        // expect(links.length).toEqual(1);

        // const linkUS = page.getByRole('button', { name: selectors['@linkUS_V2'], exact: true });
        // await expect(linkUS).toBeVisible();
        // expect(await linkUS.getAttribute('lang')).toEqual('en-US');
      });
    }
  });
});
