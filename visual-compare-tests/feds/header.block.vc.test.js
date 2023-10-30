/* eslint-disable import/named */
import { expect, test } from '@playwright/test';
import { features } from '../../features/visual-compare/feds/header.block.spec.js';
import FedsConsent from '../../selectors/feds/feds.consent.page.js';
import FedsHeader from '../../selectors/feds/feds.header.page.js';
import { WebUtil } from '../../libs/webutil.js';

// Globals:
let Header;
let Consent;
let webUtil;

test.describe('FEDS Header Block Visual Comparison Test Suite', () => {
  test.beforeEach(async ({ page }) => {
    webUtil = new WebUtil(page);
    Header = new FedsHeader(page);
    Consent = new FedsConsent(page);
  });

  test(`${features[0].name}, ${features[0].tags}`, async ({ page, baseURL }) => {
    console.info(`[Test Page]: ${baseURL}${features[0].path}`);

    await test.step('Navigate to FEDS HEADER page', async () => {
      await page.goto(`${baseURL}${features[0].path}${features[0].browserParams}`);
      // Wait for page to load & stabilize:
      await page.waitForLoadState('domcontentloaded');
      await expect(page).toHaveURL(`${baseURL}${features[0].path}${features[0].browserParams}`);
    });

    await test.step('Check consent persistence (post-consent)', async () => {
      // Accept the OneTrust consent banner:
      await Consent.acceptOneTrustConsentBar();
      // Check consent persistence:
      await Consent.assertOneTrustAcceptState();
    });

    await test.step('Open HEADER mega-menu prior to VC check', async () => {
      await Header.megaMenuToggle.waitFor({ state: 'visible', timeout: 5000 });
      await Header.megaMenuToggle.click();
      await expect(Header.megaMenuContainer).toBeVisible();
    });

    await test.step('Compare base screenshot against current screenshot', async () => {
      // Scroll to initiate lazy loaded images:
      await webUtil.scrollPage('down', 'slow');
      await webUtil.scrollPage('up', 'fast');
      // Compare the base screenshot against a newly taken screenshot for equality
      // If no base screenshot image is available for comparison create one.
      await expect(page).toHaveScreenshot(`header_${baseURL}${features[0].path}.png`, { fullPage: true, timeout: 30000 });
    });
  });
});
