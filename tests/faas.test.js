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

      // Test negative test to ensure error messages are showing up
      await page.locator(selectors['@submit']).first().click();
      const errorMessages = await page.$$(selectors['@errorMessage']);
      expect(errorMessages).toBeTruthy();
      expect(errorMessages.length()).toBeGreaterThanOrEqual(11);

      // Fill out Form
      await page.getByLabel(selectors['@business-email']).fill('milo@adobetest.com');
      await page.getByLabel(selectors['@first-name']).fill('MiloTest');
      await page.getByLabel(selectors['@last-name']).fill('MiloTest');
      await page.getByLabel(selectors['@business-phone']).fill('777-777-7777');
      await page.getByLabel(selectors['@job-title-role']).selectOption({ label: 'Individual Contributor' });
      await page.getByLabel(selectors['@area-department']).selectOption({ label: 'IT' });
      await page.getByLabel(selectors['@org-name']).fill('MiloTestOrg');
      await page.getByLabel(selectors['@country']).selectOption({ label: 'United States' });
      await page.getByLabel(selectors['@state-province']).selectOption({ label: 'Utah' });
      await page.getByLabel(selectors['@contact-me']).check();

      await page.getByLabel(selectors['@zipcode']).fill('77777');
      await page.getByLabel(selectors['@website']).fill('milo.adobe.com');
      await page.getByLabel(selectors['@industry']).selectOption({ label: 'Technology Software & Services' });

      if (props.url.includes('faas-rfi')) {
        await page.getByLabel(selectors['@area-interest']).selectOption({ label: 'Website optimization' });
        await page.getByLabel(selectors['@questions']).fill('Hello World?');
      }

      // Submit form
      await page.locator(selectors['@submit']).first().click();
      await page.waitForURL(/.*thankyou/, { timeout: 300000 });
      await expect(page).toHaveURL(/.*thankyou/);
      await expect(page).toHaveTitle(/Thank you\.*.*/);
    });
  });
});
