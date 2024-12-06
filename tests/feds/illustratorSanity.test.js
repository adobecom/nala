import { expect, test } from '@playwright/test';
import { features } from '../../features/feds/prodSanity/illustratorsanity.spec.js';
import IllustratorPageSanity from '../../selectors/feds/feds.illustratorsanity.page.js';

test.describe('Test Suite for Illustrator Page Components', () => {
  let illustrate;

  test.beforeEach(async ({ page }) => {
    illustrate = new IllustratorPageSanity(page);
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

      // Verifying the visibility of U-NAV Elements
      await illustrate.validatingUnavElements(props.country);
      // Verifying the Visibility of Creativity & Design Elements
      await illustrate.validatingCreativityAndDesignElements(props.country);
      // Verifying the visibility of Footer Elements
      await illustrate.validatingFooterElements();
    });
  });
});
