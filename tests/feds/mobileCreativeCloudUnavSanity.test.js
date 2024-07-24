import { test, expect } from '@playwright/test';
import { features } from '../../features/feds/prodSanity/mobileTesting/mobileCreativeCloudUnav.spec.js';
import CreativeCloudUnavSanity from '../../selectors/feds/feds.creativeCloudUnavSanity.page.js';

test.describe('Test Suite for Creative Cloud Page Components', () => {
  let creative;

  test.beforeEach(async ({ page }) => {
    creative = new CreativeCloudUnavSanity(page);
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
      await creative.validatingUnav();
      // Validating Hamburger Menu Elements
      await creative.validatingHamburgerMenu(props.country);
      // Validating Creativity & Design Elements
      await creative.validatingCreativityDesign(props.country);
      // Validating Explore Elements
      await creative.validatingExploreSection(props.country);
      // Validating Learn & Support Elements
      await creative.validatingLearnAndSupportSection(props.country);
      // Validating Program Elements
      await creative.validatingProgramSection(props.country);
      // Validating Subject Area Elements
      await creative.validatingSubjectAreaSection(props.country);
      // Validating Training & Support Elements
      await creative.validatingTrainingAndSupportSection(props.country);
      // Closing Hamburger Menu
      await creative.hamburgerMenu.click();
      // Validating Footer Elements
      await creative.validatingFooterSection();
    });
  });
});
