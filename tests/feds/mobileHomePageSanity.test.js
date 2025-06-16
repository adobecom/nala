import { test, expect } from '@playwright/test';
import { features } from '../../features/feds/prodSanity/mobileTesting/mobilehomePageSanity.spec.js';
import HomePageSanity from '../../selectors/feds/feds.homepagesanity.page.js';

test.describe('Test Suite for Home Page on Android & iOS & iPad Devices', () => {
  let home;

  test.beforeEach(async ({ page }) => {
    home = new HomePageSanity(page);
  });

  test.afterEach(async ({ page }) => {
    await page.close();
  });
  features.forEach((props) => {
    test(`${props.name}, ${props.tags}, ${props.country}`, async ({ page, baseURL }) => {
      console.info(`[FEDSInfo] Checking Page: ${props.country} = ${baseURL}${props.path}`);

      const pageURL = `${baseURL}${props.path}`;
      await page.goto(pageURL, { waitUntil: 'networkidle' });
      await expect(page).toHaveURL(pageURL);

      // Verifying the visibility of G-NAV Elements
      await home.validatingUnav(test);
      // Verifying the visibility of Hamburger Menu Elements
      await home.validatingHamburgerMenu();
      // Verifying the visibility of Creative Cloud Elements
      await home.validatingCreativityAndDesign(props.country);
      // Verifying the visibility of PDF & E-Signatures Elements
      await home.validatingPDFAndESignatures(props.country);
      // Verifying the visibility of Experience Cloud Elements
      await home.validatingMarketingAndCommerce(props.country);
      // Verifying the visibility of Learn & Support Elements
      await home.validatingLearnAndSupport(props.country);
      // Verifying the visibility of Footer Elements
      await home.validatingFooter(test, props.country);
    });
  });
});
