import { expect, test } from '@playwright/test';
import georouting from '../../features/milo/georouting.spec.js';
import parse from '../../libs/parse.js';
import selectors from '../../selectors/milo/georouting.selectors.js';

// Parse the feature file into something flat that can be tested separately
const { name, features } = parse(georouting);

test.describe(`${name}`, () => {
  features.forEach((props) => {
    test(props.title, async ({ page, context }) => {
      await page.goto(`${props.url}?akamaiLocale=DE`);
      const geoModal = page.locator(selectors['@dialog-modal']);
      await expect(geoModal).toBeVisible({ timeout: 15000 });

      // Check all messages are there per regions and the text is correct for the region.
      const messagesWrapper = page.locator(selectors['@messages']);
      await expect(messagesWrapper).toBeVisible();
      const messages = await page.$$(selectors['@message']);
      expect(messages.length).toEqual(2);

      const messageDE = page.getByText(selectors['@messageDE'], { exact: true });
      const messageUS = page.getByText(selectors['@messageUS'], { exact: true });

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

      // Click German Link
      await linkDE.click();
      await expect(page).toHaveURL(/.*main--bacom--adobecom.hlx.live\/de\//);

      // Verify international cookie has been set
      let isCookieFound = false;
      const cookies = await context.cookies();
      cookies.forEach((cookie) => {
        if (cookie.name === 'international') { isCookieFound = true; }
      });
      expect(isCookieFound).toBeTruthy();
    });
  });
});
