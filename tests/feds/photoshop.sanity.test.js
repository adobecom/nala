import { expect, test } from '@playwright/test';
import { features } from '../../features/feds/photoshop.spec.js';
import PhotoshopPageSanity from '../../selectors/feds/feds.photoshopsanity.page.js';

test.describe('Test Suite for Photoshop Page Components', () => {
  let photoshop;

  test.beforeEach(async ({ page }) => {
    photoshop = new PhotoshopPageSanity(page);
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
      await photoshop.validatingcloseDialogModel(props.country);

      // Verifying the visibility of U-NAV Elements
      await photoshop.validatingUnavElements(props.country);
      // Verifying the Visibility of Creativity & Design Elements
      await photoshop.validatingCreativityAndDesignElements(props.country);
      // Verifying the visibility of Footer Elements
      await photoshop.validatingFooterElements(props.country);
    });
  });
});
