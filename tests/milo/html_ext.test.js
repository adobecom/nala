const { expect, test } = require('@playwright/test');
const parse = require('../../libs/parse.js');
const htmlExt = require('../../features/milo/html_ext.spec.js');
const selectors = require('../../selectors/milo/html_ext.selectors.js');
const scroll = require('../../libs/helpers.js');

// Parse the feature file into something flat that can be tested separately
const { name, features } = parse(htmlExt);

test.describe(`${name}`, () => {
  features.forEach((props) => {
    test(props.title, async ({ page, browserName }) => {
      await page.goto(props.url);
      if (!props.title.match(/@blog/) && (props.url.match(/customer-success-stories/))) {
        expect(page.url()).toContain('.html');

        // Added scrolling for CaaS to load.
        // Without it, test provides false count for validation checking.
        await page.evaluate(scroll, { direction: 'down', speed: 'slow' });
        await page.evaluate(scroll, { direction: 'up', speed: 'fast' });

        // Check CaaS fragments urls are not converted by verifying the cards render and are visible
        // Issue with CaaS cards loading when using WebKit/Chromium browsers
        // outside of internal network. Firefox works though.
        if (browserName === 'firefox') {
          const caasCards = page.locator(selectors['@caas_cards']);
          await expect(caasCards).toBeVisible();
        }
      } else {
        await expect(page).toHaveURL(props.url);
      }

      // Check all links for:
      // 1. They have .html on them within the same domain, subdomain.
      // 2. Domains without a '/', like www.adobe.com shouldn't have .html added.
      // 3. They don't have .html on urls ending in '/'.
      // 4. Links with .html already on them shouldn't have .html added again.
      if (!props.title.match(/@blog/)) {
        // eslint-disable-next-line max-len
        const hrefs = await page.evaluate(() => Array.from(document.links).map((item) => item.href));
        hrefs.forEach(async (linkUrl) => {
          if (!linkUrl.includes('/fragments/')) {
            if (!linkUrl.match(/business.adobe.com\/blog|business.adobe.com\/.*\/blog/)) {
              if (linkUrl.charAt(linkUrl.length - 1) === '/') {
                expect(linkUrl).not.toContain('.html');
              } else {
                if (linkUrl.includes('business.adobe.com') && !linkUrl.includes('/blog/')) {
                  expect(linkUrl).toContain('.html');
                }
                if (linkUrl.match(/business.adobe.com\/blog\/|business.adobe.com\/.*\/blog\//)) {
                  expect(linkUrl).not.toContain('.html');
                }
                if (linkUrl.includes('.html')) {
                  expect(linkUrl).not.toMatch(/.html.html/);
                }
                if (!linkUrl.includes('/')) {
                  expect(linkUrl).not.toContain('.html');
                }
              }
            }
          }
        });
      }

      if (props.title.match(/@blog/)) {
        const link = page.getByRole('link', { name: selectors['@dif_subdomain_link'] });
        expect(await link.getAttribute('href')).not.toContain('.html');
        await link.click();
        await page.waitForLoadState();
        await expect(page).toHaveURL(/business.adobe.com\/blog/);
        await page.getByRole('heading', { name: selectors['@dif_subdomain_heading'] }).first().waitFor();
      }
    });
  });
});
