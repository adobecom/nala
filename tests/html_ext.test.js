const { expect, test } = require('@playwright/test');
const htmlExt = require('../features/html_ext.spec.js');
const parse = require('../features/parse.js');
const selectors = require('../selectors/html_ext.selectors.js');

// Parse the feature file into something flat that can be tested separately
const { name, features } = parse(htmlExt);

/**
 * Slow/fast scroll JS evaluation method.
 * To be used in page.evaluate, i.e. page.evaluate(scroll, { direction: 'value', speed: 'value' });
 * @param direction string direction you want to scroll
 * @param speed string speed you would like to scroll. Options: slow, fast
*/
const scroll = async (args) => {
  const { direction, speed } = args;
  // eslint-disable-next-line no-promise-executor-return
  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  const scrollHeight = () => document.body.scrollHeight;
  const start = direction === 'down' ? 0 : scrollHeight();
  const shouldStop = (position) => (direction === 'down' ? position > scrollHeight() : position < 0);
  const increment = direction === 'down' ? 100 : -100;
  const delayTime = speed === 'slow' ? 30 : 5;
  console.error(start, shouldStop(start), increment);
  for (let i = start; !shouldStop(i); i += increment) {
    window.scrollTo(0, i);
    // eslint-disable-next-line no-await-in-loop
    await delay(delayTime);
  }
};

test.describe(`${name}`, () => {
  features.forEach((props) => {
    test(props.title, async ({ page, context }) => {
      await page.goto(props.url);
      if (!props.title.match(/@blog/) && (props.url.match(/customer-success-stories/))) {
        await expect(page).toHaveURL(`${props.url}.html`);

        // Added scrolling for CaaS to load.
        // Without it, test provides false count for validation checking.
        await page.evaluate(scroll, { direction: 'down', speed: 'slow' });
        await page.evaluate(scroll, { direction: 'up', speed: 'fast' });

        // Check CaaS fragments urls are not converted by verifying the cards render and are visible
        const caasCards = page.locator(selectors['@caas_cards']);
        await expect(caasCards).toBeVisible();
      } else {
        await expect(page).toHaveURL(props.url);
      }

      // Check all links for:
      // 1. They have .html on them within the same domain, subdomain.
      // 2. Domains without a '/', like www.adobe.com shouldn't have .html added.
      // 3. They don't have .html on urls ending in '/'.
      // 4. Links with .html already on them shouldn't have .html added again.
      if (!props.title.match(/@blog/)) {
        const links = await page.$$(selectors['@link']);
        links.forEach(async (link) => {
          const linkUrl = await link.getAttribute('href');

          if (linkUrl.charAt(linkUrl.length - 1) === '/') {
            expect(linkUrl).not.toContain('.html');
          }
          if (linkUrl.includes('business.adobe.com') && !linkUrl.includes('/blog/')) {
            expect(linkUrl).toContain('.html');
          }
          if (linkUrl.includes('business.adobe.com/blog/')) {
            expect(linkUrl).not.toContain('.html');
          }
          if (linkUrl.includes('.html')) {
            expect(linkUrl).not.toMatch(/.html.html/);
          }
          if (!linkUrl.includes('/')) {
            expect(linkUrl).not.toContain('.html');
          }

          await expect.poll(async () => {
            const response = await page.request.get(linkUrl);
            return response.status();
          }, {
            message: `Failed to navigate to ${linkUrl}`,
            timeout: 10000,
          }).toBe(200);
        });
      }

      if (props.title.match(/@blog/)) {
        const link = page.getByRole('a', { name: selectors['@dif_subdomain_link'] });
        expect(await link.getAttribute('href')).not.toContain('.html');
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
