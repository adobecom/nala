import { test, expect } from '@playwright/test';
import { features } from '../../features/feds/prodSanity/cctpagesanity.spec.js';
import CreativeCloudTeamsSanity from '../../selectors/feds/feds.cctpagesanity.page.js';
import HomePageSanity from '../../selectors/feds/feds.homepagesanity.page.js';

test.describe('Test Suite for Creative Cloud Business Teams Page Components', () => {
  let cct;
  let home;

  test.beforeEach(async ({ page }) => {
    cct = new CreativeCloudTeamsSanity(page);
    home = new HomePageSanity(page);
  });

  test.afterEach(async ({ page }) => {
    await page.close();
  });

  features.forEach((props) => {
    test(`${props.name}, ${props.tags}, ${props.country}`, async ({ page, baseURL }) => {
      console.info(`[FEDSInfo] Checking Page: ${baseURL}${props.path}`);

      const pageURL = `${baseURL}${props.path}`;
      await page.goto(pageURL, { waitUntil: 'domcontentloaded' });
      await expect(page).toHaveURL(pageURL);

      // Verifying the visibility of U-NAV Elements
      await cct.validatingUnavElements(props.country);
      // Verifying the visibility of App Switcher Elements
      await home.validatingAppSwitcherElements(props.country);
      // Verifying the Visibility of Creativity & Design Elements
      await cct.validatingCreativeAndDesignElements(props.country);
      // Verifying the visibility of Products Elements
      await cct.validatingProductElements();
      // Verifying the visibility of Resources Elements
      await cct.validatingResourceElements();
      // Verifying the visibility of Contact Sales
      await cct.validatingContactSales(props.country);
      // Verifying the visibility of Footer Elements
      await cct.validatingFooterElements(props.country);
      // Verifying Cookie Preference
      await home.validatingCookiePreference(props.country);
      // Verifying Change Region
      await cct.validatingChangeRegion(props.country);
    });
  });
});
