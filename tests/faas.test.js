/* eslint-disable no-restricted-syntax */
/* eslint-disable no-await-in-loop */
const { expect, test } = require('@playwright/test');
const faas = require('../features/faas.spec.js');
const parse = require('../features/parse.js');
const selectors = require('../selectors/faas.selectors.js');

// Parse the feature file into something flat that can be tested separately
const { name, features } = parse(faas);

// Test Utils
async function formInject(page, props, injectionInput) {
  // Reset form fields before filling.
  await page.getByLabel(selectors['@org-name']).fill('');

  await page.getByLabel(selectors['@first-name']).fill(injectionInput);
  await page.getByLabel(selectors['@last-name']).fill(injectionInput);
  await page.getByLabel(selectors['@org-name']).fill(injectionInput);

  if (props.url.includes('faas-rfi')) {
    await page.getByLabel(selectors['@questions']).fill(injectionInput);
  }
}

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
      await submit.click();
      let formOverlay = page.locator(selectors['@form-overlay']);
      await expect(formOverlay).not.toBeVisible();
      await expect(page).toHaveURL(props.url);

      // Reset inputs for next test case
      await page.getByLabel(selectors['@website']).fill('');
      await page.getByLabel(selectors['@org-name']).fill('');
      await page.getByLabel(selectors['@business-email']).fill('');
      await page.getByLabel(selectors['@business-phone']).fill('');
      await page.getByLabel(selectors['@first-name']).fill('');
      await page.getByLabel(selectors['@country']).selectOption({ label: 'Select' });

      // Validate form errors show and doesn't submit the form
      await submit.click();
      errorMessages = ((await page.$$(selectors['@errorMessages'])).length - (await page.$$(selectors['@hiddenErrorMessages'])).length);

      expect((requiredFields.length - 2)).toEqual(errorMessages);

      formOverlay = page.locator(selectors['@form-overlay']);
      await expect(formOverlay).not.toBeVisible();
      await expect(page).toHaveURL(props.url);

      // Fill out form
      await page.getByLabel(selectors['@business-email']).fill('milo@adobetest.com');
      await page.getByLabel(selectors['@first-name']).fill('MiloTest');
      await page.getByLabel(selectors['@last-name']).fill('MiloTest');
      await page.getByLabel(selectors['@business-phone']).fill('777-777-7777');
      await page.getByLabel(selectors['@job-title-role']).selectOption({ label: 'Individual Contributor' });
      await page.getByLabel(selectors['@area-department']).selectOption({ label: 'IT' });
      await page.getByLabel(selectors['@org-name']).fill('MiloTestOrg');
      await page.getByLabel(selectors['@country']).selectOption({ label: 'United States' });
      await page.getByLabel(selectors['@state-province']).selectOption({ label: 'Utah' });
      await page.getByLabel(selectors['@zipcode']).fill('77777');
      await page.getByLabel(selectors['@website']).fill('milo.adobe.com');
      await page.getByLabel(selectors['@industry']).selectOption({ label: 'Technology Software & Services' });
      await page.getByLabel(selectors['@contact-me']).check();

      if (props.url.includes('faas-rfi')) {
        await page.getByLabel(selectors['@area-interest']).selectOption({ label: 'Website optimization' });
        await page.getByLabel(selectors['@questions']).fill('Hello World?');
      }

      // Test zip being a required field
      await page.getByLabel(selectors['@zipcode']).fill('');
      await page.getByLabel(selectors['@org-name']).click(); // click out of changed input so it registers
      await submit.click();
      errorMessages = ((await page.$$(selectors['@errorMessages'])).length - (await page.$$(selectors['@hiddenErrorMessages'])).length);
      expect(errorMessages).toEqual(1);

      formOverlay = page.locator(selectors['@form-overlay']);
      await expect(formOverlay).not.toBeVisible();
      await expect(page).toHaveURL(props.url);

      // Test state/province being a required field
      await page.getByLabel(selectors['@zipcode']).fill('77777');
      await page.getByLabel(selectors['@state-province']).selectOption({ label: 'Select' });
      await page.getByLabel(selectors['@org-name']).click(); // click out of changed selector so it registers
      await submit.click();
      errorMessages = ((await page.$$(selectors['@errorMessages'])).length - (await page.$$(selectors['@hiddenErrorMessages'])).length);
      expect(errorMessages).toEqual(1);

      formOverlay = page.locator(selectors['@form-overlay']);
      await expect(formOverlay).not.toBeVisible();
      await expect(page).toHaveURL(props.url);

      // Validate forms submissions and navigate to thank you pages by filling any empty fields
      await page.getByLabel(selectors['@state-province']).selectOption({ label: 'Utah' });
      await page.getByLabel(selectors['@org-name']).click(); // click out of changed selector so it registers

      // Submit form
      await submit.click();
      await page.waitForURL(/.*thankyou/, { timeout: 300000 });
      await expect(page).toHaveURL(/.*thankyou/);
      await expect(page).toHaveTitle(/Thank you\.*.*/);
    });

    test(`${props.title} JS Injection`, async ({ page }) => {
      await page.goto(props.url);
      const locator = page.locator(selectors[props.tag]);
      await expect(locator).toBeVisible();

      // Validate JavaScript Injection
      await page.getByLabel(selectors['@business-email']).fill('milo@adobetest.com');
      await page.getByLabel(selectors['@business-phone']).fill('777-777-7777');
      await page.getByLabel(selectors['@job-title-role']).selectOption({ label: 'Individual Contributor' });
      await page.getByLabel(selectors['@area-department']).selectOption({ label: 'IT' });
      await page.getByLabel(selectors['@org-name']).fill('MiloTestOrg');
      await page.getByLabel(selectors['@country']).selectOption({ label: 'United States' });
      await page.getByLabel(selectors['@state-province']).selectOption({ label: 'Utah' });
      await page.getByLabel(selectors['@zipcode']).fill('77777');
      await page.getByLabel(selectors['@website']).fill('milo.adobe.com');
      await page.getByLabel(selectors['@industry']).selectOption({ label: 'Technology Software & Services' });
      await page.getByLabel(selectors['@contact-me']).check();

      if (props.url.includes('faas-rfi')) {
        await page.getByLabel(selectors['@area-interest']).selectOption({ label: 'Website optimization' });
      }

      formInject(page, props, '<script>alert(“Hello World!“);</script>');

      // Submit form
      await page.locator(selectors['@submit']).first().click();
      await page.waitForURL(/.*thankyou/, { timeout: 300000 });
      await expect(page).toHaveURL(/.*thankyou/);
      await expect(page).toHaveTitle(/Thank you\.*.*/);

      page.on('dialog', async (dialog) => {
        expect(dialog.message()).toBeFalsy();
        await dialog.dismiss();
      });
    });

    test(`${props.title} JS Injection 2`, async ({ page }) => {
      await page.goto(props.url);
      const locator = page.locator(selectors[props.tag]);
      await expect(locator).toBeVisible();

      // Validate JavaScript Injection
      await page.getByLabel(selectors['@business-email']).fill('milo@adobetest.com');
      await page.getByLabel(selectors['@business-phone']).fill('777-777-7777');
      await page.getByLabel(selectors['@job-title-role']).selectOption({ label: 'Individual Contributor' });
      await page.getByLabel(selectors['@area-department']).selectOption({ label: 'IT' });
      await page.getByLabel(selectors['@org-name']).fill('MiloTestOrg');
      await page.getByLabel(selectors['@country']).selectOption({ label: 'United States' });
      await page.getByLabel(selectors['@state-province']).selectOption({ label: 'Utah' });
      await page.getByLabel(selectors['@zipcode']).fill('77777');
      await page.getByLabel(selectors['@website']).fill('milo.adobe.com');
      await page.getByLabel(selectors['@industry']).selectOption({ label: 'Technology Software & Services' });
      await page.getByLabel(selectors['@contact-me']).check();

      if (props.url.includes('faas-rfi')) {
        await page.getByLabel(selectors['@area-interest']).selectOption({ label: 'Website optimization' });
      }

      formInject(page, props, '<img src=x onerror=“alert(18)“>');

      // Submit form
      await page.locator(selectors['@submit']).first().click();
      await page.waitForURL(/.*thankyou/, { timeout: 300000 });
      await expect(page).toHaveURL(/.*thankyou/);
      await expect(page).toHaveTitle(/Thank you\.*.*/);

      page.on('dialog', async (dialog) => {
        expect(dialog.message()).toBeFalsy();
        await dialog.dismiss();
      });
    });
  });
});
