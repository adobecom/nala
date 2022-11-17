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
    test(props.title, async ({ page }) => {
      await page.goto(props.url);
      const locator = page.locator(selectors[props.tag]);
      await expect(locator).toBeVisible();

      // Validate form input formats are checked before submission
      const requiredFields = await page.$$(selectors['@required']);

      await page.getByLabel(selectors['@org-name']).fill('MiloTestOrg'); // Need to add org so that website field shows up
      await page.getByLabel(selectors['@business-email']).fill('milo');
      await page.getByLabel(selectors['@business-phone']).fill('a');
      await page.getByLabel(selectors['@website']).fill('milo');
      await page.getByLabel(selectors['@first-name']).fill('MiloTest'); // Need to add extra input so that auto check happens for website.

      let errorMessages = ((await page.$$(selectors['@errorMessages'])).length - (await page.$$(selectors['@hiddenErrorMessages'])).length);
      expect(errorMessages).toEqual(3);

      const submit = page.locator(selectors['@submit']).first();
      // Fill out form
      await page.getByLabel(selectors['@org-name']).fill('MiloTestOrg');
      await page.getByLabel(selectors['@business-email']).fill('milo@adobetest.com');
      await page.getByLabel(selectors['@first-name']).fill('MiloTest');
      await page.getByLabel(selectors['@last-name']).fill('MiloTest');
      await page.getByLabel(selectors['@business-phone']).fill('777-777-7777');
      await page.getByLabel(selectors['@job-title-role']).selectOption({ label: 'Individual Contributor' });
      await page.getByLabel(selectors['@area-department']).selectOption({ label: 'IT' });
      await page.getByLabel(selectors['@contact-me']).check();

      if (props.url.includes('milo')) {
        await page.getByLabel(selectors['@country']).selectOption({ label: 'United States' });
        await page.getByLabel(selectors['@state-province']).selectOption({ label: 'Utah' });
      }

      if (props.url.includes('faas-rfi')) {
        await page.getByLabel(selectors['@area-interest']).selectOption({ label: 'Website optimization' });
        await page.getByLabel(selectors['@questions']).fill('Hello World?');
      }

      await page.getByLabel(selectors['@zipcode']).fill('77777');
      await page.getByLabel(selectors['@website']).fill('milo.adobe.com');
      await page.getByLabel(selectors['@industry']).selectOption({ label: 'Technology Software & Services' });

      // Submit form
      await page.locator(selectors['@submit']).first().click();
      const formOverlay = page.locator(selectors['@form-overlay']);
      await expect(formOverlay).toBeVisible();

      // Only check thank you page on Milo domain, where BACOM hasn't been fully setup for FaaS
      if (props.url.includes('faas-rfi') || props.url.includes('faas-do')) {
        await page.waitForURL(/.*thank-you/, { timeout: 300000 });
        await expect(page).toHaveURL(/.*thank-you/);
        await expect(page).toHaveTitle(/Thank you\.*.*/);
      }
    });
  });
});
