import { expect, test } from '@playwright/test';
import { features } from '../../features/feds/prodSanity/mobileTesting/mobNewNavIllustrator.spec.js';
import IllustratorPageSanity from '../../selectors/feds/feds.illustratorsanity.page.js';

test.describe('Test Suite for New Nav Illustrator Page on Android & iOS & iPad Devices', () => {
  let illustrate;

  test.beforeEach(async ({ page }) => {
    illustrate = new IllustratorPageSanity(page);
  });

  test.afterEach(async ({ page }) => {
    await page.close();
  });

  features.forEach((props) => {
    test(`${props.name}, ${props.tags}, ${props.country}`, async ({ page, baseURL }) => {
      console.info(`[FEDSInfo] Checking Page: ${baseURL}${props.path}`);

      const pageURL = `${baseURL}${props.path}`;
      await page.goto(pageURL, { waitUntil: 'networkidle' });
      await expect(page).toHaveURL(pageURL);

      // Verifying the visibility of U-NAV Elements
      await illustrate.validatingUnav();
      // Verifying the visibility of L-NAV Elements
      await illustrate.validatingLnavElements();
      // Verifying the Visibility of Hamburger Menu Elements
      await illustrate.validatingHamburgerMenuElements();
      // Verifying the visibility of Footer
      await illustrate.validatingFooter();
    });
  });
});
