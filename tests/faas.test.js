/* eslint-disable no-restricted-syntax */
/* eslint-disable no-await-in-loop */
const { expect, test } = require('@playwright/test');
const faas = require('../features/faas.spec.js');
const parse = require('../features/parse.js');
const selectors = require('../selectors/faas.selectors.js');

// Parse the feature file into something flat that can be tested separately
const { name, features } = parse(faas);
test.describe(`${name}`, () => {
  features.forEach((props) => {
    test(props.title, async ({ page, browser }) => {
      await page.goto(props.url);

      // Open up form modal
      if (props.url.includes('omnichannel-orchestration-with-adobe')) {
        await page.locator(selectors['@register-link']).click();
        await expect(page.locator(selectors['@faas-form'])).toBeVisible();
      }

      // Fill out form
      await page.getByLabel(selectors['@org-name']).fill('MiloTestOrg');
      await page.getByLabel(selectors['@country']).selectOption({ label: 'United States' });
      await page.getByLabel(selectors['@business-email']).fill('milo@adobetest.com');
      await page.getByLabel(selectors['@first-name']).fill('MiloTest');
      await page.getByLabel(selectors['@last-name']).fill('MiloTest');
      await page.getByLabel(selectors['@business-phone']).fill('777-777-7777');
      await page.getByLabel(selectors['@job-title-role']).selectOption({ label: 'Individual Contributor' });
      await page.getByLabel(selectors['@area-department']).selectOption({ label: 'IT' });
      await page.getByLabel(selectors['@contact-me']).check();

      if (props.url.includes('faas-rfi')) {
        await page.getByLabel(selectors['@area-interest']).selectOption({ label: 'Website optimization' });
        await page.getByLabel(selectors['@questions']).fill('Hello World?');
      }

      // Generally waitForTimeout should only be used for debugging,
      // but for this test country/state is populated when run outside of GitHub Actions.
      // The test needs a small sleep to slow down the state field since it swaps field values
      // according to the country field.
      await page.waitForTimeout(1000);
      await page.getByLabel(selectors['@state-province']).selectOption({ label: 'Utah' });
      await page.getByLabel(selectors['@zipcode']).fill('77777');
      await page.getByLabel(selectors['@website']).fill('milo.adobe.com');
      await page.getByLabel(selectors['@industry']).selectOption({ label: 'Technology Software & Services' });
      if (props.tag === '@html') {
        await page.getByLabel(selectors['@company-type']).selectOption({ label: 'Technology or Solution Provider' });
      }

      // Submit form
      await page.locator(selectors['@submit']).first().click();
      const formOverlay = page.locator(selectors['@form-overlay']);
      await expect(formOverlay).toBeVisible();

      // Only check thank you page on Milo domain, where BACOM staging hasn't been fully setup
      if (props.url.includes('faas-rfi') || props.url.includes('faas-do')) {
        await page.waitForURL(/.*thank-you/);
        await expect(page).toHaveURL(/.*thank-you/);
        await expect(page).toHaveTitle(/Thank you\.*.*/);
      } else if (props.tag === '@html') {
        await page.waitForURL(/.*sdk\/holiday-shopping-report/);
        await expect(page).toHaveURL(/.*sdk\/holiday-shopping-report/);
        if (browser.browserType().name() === 'firefox') {
          await expect(page).toHaveTitle(/Holiday Shopping Report\.*.*/);
        }
      }
    });
  });
});
