import { expect, test } from '@playwright/test';
import marketo from '../../features/marketo.spec.js';
import selector from '../../selectors/marketo.selectors.js';
import parse from '../../features/parse.js';

const { name, features } = parse(marketo);

test.describe(name, () => {
  features.forEach((props) => {
    test(props.title, async ({ page }) => {
      await page.goto(props.url);
      const marketoForm = await page.locator(selector['@marketo']);
      const firstName = await page.locator(selector['@firstName']);
      const lastName = await page.locator(selector['@lastName']);
      const email = await page.locator(selector['@email']);
      const company = await page.locator(selector['@company']);
      const title = await page.locator(selector['@title']);
      const country = await page.locator(selector['@country']);
      const phone = await page.locator(selector['@phone']);
      const submitButton = await page.locator(selector['@submitButton']);
      let errorAlert = await page.locator(selector['@errorAlert']);

      // Checking the error alert displays on failed form submission
      await page.waitForSelector(selector['@marketo']);
      expect(await marketoForm.isVisible()).toBeTruthy();
      expect(await errorAlert.isVisible()).toBeFalsy();

      await submitButton.click();
      errorAlert = await page.locator(selector['@errorAlert']);
      expect(await errorAlert.isVisible()).toBeTruthy();
      expect(await marketoForm.isVisible()).toBeTruthy();
      expect(await page.url()).toBe(props.url);

      // Checking submitting form redirects to another page
      await firstName.fill('MiloFirstName');
      await lastName.fill('MiloLastName');
      await email.fill('Milo@adobe.com');
      await company.fill('Adobe');
      await title.selectOption({ label: 'Other' });
      await country.selectOption({ label: 'United States' });
      if (await phone.isVisible()) phone.fill('415-123-4567');
      await submitButton.click();
      await expect(page).toHaveURL(/thank-you/);
      await expect(page.url()).not.toBe(props.url);
    });
  });
});
