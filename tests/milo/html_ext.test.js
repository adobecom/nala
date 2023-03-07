const { expect, test } = require('@playwright/test');
const htmlExt = require('../../features/html_ext.spec.js');
const parse = require('../../features/parse.js');
const selectors = require('../../selectors/html_ext.selectors.js');

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
    test(props.title, async ({ page, browser }) => {
      await page.goto(props.url);
      if (!props.title.match(/@blog/) && (props.url.match(/customer-success-stories/))) {
        await expect(page).toHaveURL(`${props.url}.html`);

        // Added scrolling for CaaS to load.
        // Without it, test provides false count for validation checking.
        await page.evaluate(scroll, { direction: 'down', speed: 'slow' });
        await page.evaluate(scroll, { direction: 'up', speed: 'fast' });

        // Check CaaS fragments urls are not converted by verifying the cards render and are visible
        // Issue with CaaS cards loading when using WebKit/Chromium browsers
        // outside of internal network. Firefox works though.
        if (browser.browserType() === 'firefox') {
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
            if (linkUrl !== 'https://business.adobe.com/blog') {
              if (linkUrl.charAt(linkUrl.length - 1) === '/') {
                expect(linkUrl).not.toContain('.html');
              } else {
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
