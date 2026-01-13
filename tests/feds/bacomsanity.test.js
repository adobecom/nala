import { test, beforeEach, expect } from '@playwright/test';
import { features } from '../../features/feds/business.adobe.spec.js';
import BacomPageSanity from '../../selectors/feds/feds.bacom.page.js';

test.describe('Test Suite for Bacom Page Components', () => {
  let bacom;

  beforeEach(async ({ page }) => {
    bacom = new BacomPageSanity(page);
  });

  async function validateLocaleRedirect(page, baseURL, props) {
    const requestedURL = `${baseURL}${props.path}`;
    console.info(`[FEDSInfo] Navigating to: ${requestedURL}`);

    await page.goto(requestedURL, { waitUntil: 'networkidle' });

    const finalURL = page.url();
    console.info(`[FEDSInfo] Final URL after redirect: ${finalURL}`);

    if (props.redirectTo) {
      await expect(finalURL).toContain(props.redirectTo);
    } else {
      // Remove query params & hash for safe comparison
      const expectedPath = props.path.split('?')[0];
      await expect(finalURL).toContain(expectedPath);
    }
  }

  features.forEach((props) => {
    test(`${props.name}, ${props.tags}, ${props.country}`, async ({ page, baseURL }) => {
      //  Skip locales that redirects to US
      if (props.country !== 'United States' && props.redirectTo === '/') {
        console.info(`[INFO] Skipping ${props.country}, redirects to US`);
        test.skip();
      }

      await validateLocaleRedirect(page, baseURL, props);

      // Verifying the visibility of U-NAV Elements
      await bacom.validatingUnavElements(props.expectedLocale || props.country);
      await bacom.validatingProductsElements(props.expectedLocale || props.country);
      await bacom.validatingAiDropdownElements(props.expectedLocale || props.country);
      await bacom.validatingIndustriesDropdownElements(props.expectedLocale || props.country);
      await bacom.validatingRolesDropdownElements(props.expectedLocale || props.country);
      await bacom.validatingResourcesDropdownElements(props.expectedLocale || props.country);
      await bacom.validatingSupportDropdownElements(props.expectedLocale || props.country);
      await bacom.validatingGetStartedCTAClick(props.expectedLocale, props.country, bacom);
      await bacom.validatingFooterElements(props.expectedLocale || props.country);
      await bacom.validatingChangeRegion(props.expectedLocale || props.country);
      await bacom.validatingCookiePreference(props.expectedLocale || props.country);
    });
  });
});
