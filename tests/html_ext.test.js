const { expect, test } = require('@playwright/test');
const htmlExt = require('../features/html_ext.spec.js');
const parse = require('../features/parse.js');
const selectors = require('../selectors/html_ext.selectors.js');

// Parse the feature file into something flat that can be tested separately
const { name, features } = parse(htmlExt);
test.describe(`${name}`, () => {
  features.forEach((props) => {
    test(props.title, async ({ page, context }) => {
      await page.goto(props.url);
      await expect(page).toHaveURL(`${props.url}.html`);

      // Check CaaS fragments urls are not converted by verifying the cards render and are visible
      const caasCards = page.locator(selectors['@caas_cards']);
      await expect(caasCards).toBeVisible();

      // Check all links for:
      // 1. They have .html on them within the same domain, subdomain.
      // 2. Domains without a '/', like www.adobe.com shouldn't have .html added.
      // 3. They don't have .html on urls ending in '/'.
      // 4. Links with .html already on them shouldn't have .html added again.
      if (!props.title.match(/@blog/)) {
        const links = await page.$$(selectors['@link']);
        const linkFailures = 0;
        links.forEach((link) => {
          const linkUrl = link.getAttribute('href');

          if (linkUrl.charAt(linkUrl.length) === '/') {
            expect(linkUrl).not.toContain('.html');
          }
          if (linkUrl.contains('bacom')) {
            expect(linkUrl).toContain('.html');
          }
          if (linkUrl.contains('business-website')) {
            expect(linkUrl).not.toContain('.html');
          }
          if (linkUrl.contains('.html')) {
            expect(linkUrl).not.toMatch(/.html.html/);
          }
          if (!linkUrl.contains('/')) {
            expect(linkUrl).not.toContain('.html');
          }
        });
        expect(linkFailures).toEqual(0);
      }

      if (props.title.match(/@blog/)) {
        const link = page.getByRole('a', { name: selectors['@dif_subdomain_link'] });
        expect(link.getAttribute('href')).not.toContain('.html');
        const [newPage] = await Promise.all([
          context.waitForEvent('page'),
          await link.click(), // Opens a new tab
        ]);
        await newPage.waitForLoadState();
        await newPage.getByRole('heading', { name: selectors['@dif_subdomain_heading'] }).waitFor();
        expect(newPage).toHaveURL(/.*business.adobe.com/);
      }
    });
  });
});
