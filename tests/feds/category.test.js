import { expect, test } from '@playwright/test';
import { features } from '../../features/feds/prodSanity/category.spec.js';
import CategoryPageSanity from '../../selectors/feds/feds.category.page.js';

test.describe('Test Suite for Mobile, iPad, and Tablet Illustrator Page Components', () => {
  let category;

  test.beforeEach(async ({ page }) => {
    category = new CategoryPageSanity(page);
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

      // Closing Locale Model pop-up
      await category.closingLocaleModel();
      // Verifying the visibility of U-NAV Elements
      await category.validatingGnav();
      // Verifiying the visibility of Individual Elements
      await category.individualsElements();
      // Verifying the visibility of Business Elements
      await category.businessElements();
      // Verifying the visibility of Students and Teachers Elements
      await category.studentsAndTeachersElements();
      // Verifying the visibility of Schools and Universities Elements
      await category.schoolsAndUniversitiesElements();
      // Verifying the visibility of Footer
      await category.validatingFooter();
    });
  });
});
