import { expect, test } from '@playwright/test';
import { WebUtil } from '../../libs/webutil.js';

const parse = require('../../libs/parse.js');
const htmlExtn = require('../../features/milo/htmlextn.spec.js');
const selectors = require('../../selectors/milo/htmlextn.feature.page.js');

// Parse the feature file into something flat that can be tested separately
const { name, features } = parse(htmlExtn);

let webUtil;

test.describe(`${name} test suite`, () => {
  test.beforeEach(async ({ page }) => {
    webUtil = new WebUtil(page);
  });

  features.forEach((props) => {
    test(props.title, async ({ page, browserName }) => {
      test.skip();
      await page.goto(props.url);
      await page.waitForLoadState('domcontentloaded');

      if (!props.title.match(/@blog/) && (props.url.match(/customer-success-stories/))) {
        expect(page.url()).toContain('.html');

        /* Added scrolling for CaaS to load.
        * Without it, test provides false count for validation checking.
        * */
        await webUtil.scrollPage('down', 'slow');
        await webUtil.scrollPage('up', 'fast');

        /* Check 
        * CaaS fragments urls are not converted by verifying the cards render and are visible
        * Issue with CaaS cards loading when using WebKit/Chromium browsers
        * outside of internal network. Firefox works though. 
        * */
        if (browserName === 'firefox') {
          const caasCards = page.locator(selectors['@caas_cards']);
          await expect(caasCards).toBeVisible();
        }
      } else {
        await expect(page).toHaveURL(props.url);
      }

      /* Check all links for:
      * They have .html on them within the same domain, subdomain.
      * Domains without a '/', like www.adobe.com shouldn't have .html added.
      * They don't have .html on urls ending in '/'.
      * Links with .html already on them shouldn't have .html added again. 
      * */
      if (!props.title.match(/@blog/)) {
        const hrefs = await page.evaluate(async () => {
          await new Promise(resolve => setTimeout(resolve, 2000));
          return Array.from(document.links).map((item) => item.href);
        });
             
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
