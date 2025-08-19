import { test, expect } from '@playwright/test';
import { features } from '../../features/feds/prodSanity/mobileTesting/mobileCCTpagesanity.spec.js';
import CreativeCloudTeamsSanity from '../../selectors/feds/feds.cctpagesanity.page.js';
import CreativeCloudEnterpriseSanity from '../../selectors/feds/feds.ccepagesanity.page.js';
import HomePageSanity from '../../selectors/feds/feds.homepagesanity.page.js';

test.describe('Test Suite for Creative Cloud Business Enterprise Page Components', () => {
  let enterprise;
  let cct;
  let home;

  test.beforeEach(async ({ page }) => {
    enterprise = new CreativeCloudEnterpriseSanity(page);
    cct = new CreativeCloudTeamsSanity(page);
    home = new HomePageSanity(page);
  });

  test.afterEach(async ({ page }) => {
    await page.close();
  });

  features.forEach((props) => {
    test(`${props.name}, ${props.tags}, ${props.country}`, async ({ page, baseURL }) => {
      console.info(`[FEDSInfo] Checking Page: ${baseURL}${features[props.tcid].path}`);

      const pageURL = `${baseURL}${features[props.tcid].path}`;
      await page.goto(pageURL, { waitUntil: 'domcontentloaded' });
      await expect(page).toHaveURL(pageURL);

      // Verifying the visibility of U-NAV Elements
      await enterprise.validatingUnav(test);
      // Verifying the visibility of L-NAV Elements
      await enterprise.validatingLnavElements();
      // Verifying the visibility of Hamburger Elements
      await cct.validatingHamburgerMenu(props.country);
      // Verifying the visibility of Footer Elements
      await enterprise.validatingFooter(test);
      // Verifying Cookie Preference
      await home.validatingCookiePreference(props.country);
      // Verifying Change Region
      await cct.validatingChangeRegion(props.country);
    });
  });
});
