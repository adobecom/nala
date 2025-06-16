import { test, expect } from '@playwright/test';
import { features } from '../../features/feds/prodSanity/mobileTesting/mobileCreativeCloudUnav.spec.js';
import CreativeCloudUnavSanity from '../../selectors/feds/feds.creativeCloudUnavSanity.page.js';
import HomePageSanity from '../../selectors/feds/feds.homepagesanity.page.js';

test.describe('Test Suite for Creative Cloud Page Components', () => {
  let creative;
  let home;

  test.beforeEach(async ({ page }) => {
    creative = new CreativeCloudUnavSanity(page);
    home = new HomePageSanity(page);
  });

  test.afterEach(async ({ page }) => {
    await page.close();
  });

  features.forEach((props) => {
    test(`${props.name}, ${props.tags}, ${props.country}`, async ({ page, baseURL }) => {
      console.info(`[Creative Cloud] Checking Page: ${props.country} = ${baseURL}${props.path}`);

      const pageURL = `${baseURL}${props.path}`;
      await page.goto(pageURL, { waitUntil: 'networkidle' });
      await expect(page).toHaveURL(pageURL);

      // Validating Unav Elements
      await home.validatingUnav(test);
      // Validating Lnav Elements
      await creative.validatingLnavElements();
      // Validating Hamburger Menu Elements
      await creative.validatingHamburgerMenuNewNav(props.country);
      // Validating Footer Elements
      await creative.validatingFooterSection(test);
    });
  });
});
