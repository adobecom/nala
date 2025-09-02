import { test, beforeEach, afterEach, expect } from '@playwright/test';
import { features } from '../../features/feds/homePageSanity.spec.js';
import HomePageSanity from '../../selectors/feds/feds.homepagesanity.page.js';

test.describe('Test Suite for Home Page Components', () => {
  let home;

  beforeEach(async ({ page }) => {
    home = new HomePageSanity(page);
  });

  afterEach(async ({ page }) => {
    await page.close();
  });

  const excludedCountries = ['CIS English', 'CIS Russian', 'China'];
  const excludeAppSwitcherCountries = ['China'];

  features.forEach((props) => {
    test(`${props.name}, ${props.tags}, ${props.country}`, async ({ page, baseURL }) => {
      console.info(`[FEDSInfo] Checking Page: ${baseURL}${features[props.tcid].path}`);

      const pageURL = `${baseURL}${features[props.tcid].path}`;
      await page.goto(pageURL, { waitUntil: 'domcontentloaded' });
      await expect(page).toHaveURL(pageURL);

      // Verifying the visibility of U-NAV Elements
      await home.validatingUnavElements(props.country);

      // Verifying the visibility of App Switcher Elements
      if (!excludeAppSwitcherCountries.includes(props.country)) {
        await home.validatingAppSwitcherElements(props.country);
        await home.appSwitcher.click();
      } else {
        console.info(`[FEDSInfo] Skipping App Switcher validation for ${props.country}`);
      }

      if (!excludedCountries.includes(props.country)) {
        // Verifying the visibility of Creativity & Design Elements
        await home.validatingCCElements(props.country);
        // Verifiying the visibility of Document Cloud Elements
        await home.validatingDCElements(props.country);
        // Verifying the visibility of Experience Cloud Elements
        await home.validatingECElements(props.country);
        // Verifying the visibility of HelpX Elements
        await home.validatingHelpXElements(props.country);
      }

      // Verifying the visibility of Footer Elements
      await home.validatingFooterElements(props.country);
      // Verifying Cookie Preference
      await home.validatingCookiePreference(props.country);
      // Verifying Change Region
      await home.validatingChangeRegion(props.country);
    });
  });
});
