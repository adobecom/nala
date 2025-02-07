import { expect, test } from '@playwright/test';
import { features } from '../../features/feds/prodSanity/mobileTesting/mobNewNavCCEPage.spec.js';
import CreativeCloudEnterpriseSanity from '../../selectors/feds/feds.ccepagesanity.page.js';

test.describe('Test Suite for New Nav Creative Cloud Business Enterprise Page on Android & iOS & iPad Devices', () => {
  let enterprise;

  test.beforeEach(async ({ page }) => {
    enterprise = new CreativeCloudEnterpriseSanity(page);
  });

  test.afterEach(async ({ page }) => {
    await page.close();
  });

  features.forEach((props) => {
    test(`${props.name}, ${props.tags}, ${props.country}`, async ({ page, baseURL }) => {
      console.info(`[FEDSInfo] Checking Page: ${baseURL}${features[props.tcid].path}`);

      const pageURL = `${baseURL}${features[props.tcid].path}`;
      await page.goto(pageURL, { waitUntil: 'networkidle' });
      await expect(page).toHaveURL(pageURL);

      // Verifying the visibility of U-NAV Elements
      await enterprise.validatingUnav(test);
      // Verifying the visibility of L-Nav Elements
      await enterprise.validatingLnavElements();
      // Verifying the visibility of Hamburger Elements
      await enterprise.validatingHamburgerMenu();
      // Verifying the visibility of Footer Elements
      await enterprise.validatingFooter(test);
    });
  });
});
