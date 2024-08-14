import { expect, test } from '@playwright/test';
import { features } from '../../features/feds/prodSanity/ccepagesanity.spec.js';
import CreativeCloudEnterpriseSanity from '../../selectors/feds/feds.ccepagesanity.page.js';

test.describe('Test Suite for Creative Cloud Business Enterprise Page Components', () => {
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
      await enterprise.validatingUnavElements(props.country);
      // Verifying the visibility of Creativity & Design Elements
      await enterprise.validatingCreativityAndDesignElements(props.country);
      // Verifying the visibility of Product Elements
      await enterprise.validatingProductElements();
      // Verifying the visibility of Resource Elements
      await enterprise.validatingResourceElements();
      // Verifying the visibility of Footer Elements
      await enterprise.validatingFooterElements();
    });
  });
});
