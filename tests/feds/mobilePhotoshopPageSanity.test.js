import { test, expect } from '@playwright/test';
import { features } from '../../features/feds/prodSanity/mobileTesting/mobilePhotoshopSanity.spec.js';
import PhotoshopPageSanity from '../../selectors/feds/feds.photoshopsanity.page.js';
import CreativeCloudEnterpriseSanity from '../../selectors/feds/feds.ccepagesanity.page.js';
import HomePageSanity from '../../selectors/feds/feds.homepagesanity.page.js';

test.describe('Test Suite for mobile Photoshop Page Components', () => {
  let photoshop;
  let home;
  let enterprise;

  test.beforeEach(async ({ page }) => {
    photoshop = new PhotoshopPageSanity(page);
    home = new HomePageSanity(page);
    enterprise = new CreativeCloudEnterpriseSanity(page);
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
      await photoshop.validatingUnavMobile(test);
      // Verifying the visibility of L-NAV Elements
      await photoshop.validatingLnavElements();
      // Verifying the visibility of Hamburger Elements
      await photoshop.validatingHamburgerMenu(props.country);
      // Verifying the visibility of Footer Elements
      await enterprise.validatingFooterMob(test, props.country);
      // Verifying Cookie Preference
      await home.validatingCookiePreference(props.country);
      // Verifying Change Region
      await photoshop.validatingChangeRegion(props.country);
    });
  });
});
