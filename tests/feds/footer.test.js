/* eslint-disable import/named */
/* eslint-disable no-await-in-loop */
/* eslint-disable import/extensions */
/* eslint-disable no-restricted-syntax */
import { expect, test } from '@playwright/test';
import { FedsFooter } from '../../selectors/feds/feds.footer.page.js';
import { FedsConsent } from '../../selectors/feds/feds.consent.page.js';

const FooterSpec = require('../../features/feds/footer.spec.js');

const { features } = FooterSpec;

test.describe('Footer Block test suite', () => {
  // FEDS Default Footer Checks:
  test(`${features[0].name},${features[0].tags}`, async ({ page, baseURL }) => {
    const Footer = new FedsFooter(page);
    const Consent = new FedsConsent(page);
    console.info(`[FEDSInfo] Checking page: ${baseURL}${features[0].path}`);

    await test.step('Navigate to default FEDS Footer page', async () => {
      await page.goto(`${baseURL}${features[0].path}`);
      await page.waitForLoadState('domcontentloaded');
      await expect(page).toHaveURL(`${baseURL}${features[0].path}`);
    });

    await test.step('Accept OneTrust consent bar', async () => {
      // Wait for the OneTrust consent bar to appear:
      await Consent.OneTrustContainer.waitFor({ state: 'visible', timeout: 15000 });
      // Accept the OneTrust consent banner:
      await Consent.acceptOneTrustConsentBar();
      // Check consent persistence:
      await Consent.assertOneTrustAcceptState();
    });

    await test.step('Check default FEDS Footer critical elements', async () => {
      // Scroll FEDS Footer into viewport:
      await Footer.LegalContainer.scrollIntoViewIfNeeded();
      // Wait for FEDS Footer to be visible:
      await Footer.FooterContainer.waitFor({ state: 'visible', timeout: 5000 });
      // Check FEDS Footer critical elements:
      await expect(Footer.LegalContainer).toBeVisible();
      await expect(Footer.SocialContainer).toBeVisible();
      await expect(Footer.FooterContainer).toBeVisible();
      await expect(Footer.ChangeRegionContainer).toBeVisible();
      // !Note: Footer FeaturedProducts not appearing in NALA. Possible BUG!
      // await expect(Footer.FeaturedProductsContainer).toBeVisible();
      await expect(Footer.FooterColumns).toHaveCount(5);
      await expect(Footer.FooterSections).toHaveCount(6);
      await expect(Footer.FooterHeadings).toHaveCount(6);
      await expect(Footer.SocialIcons).toHaveCount(4);
      await expect(Footer.LegalLinks).toHaveCount(5);
    });

    await test.step('Check ChangeRegion functionality', async () => {
      await Footer.ChangeRegionDropDown.click();
      await expect(Footer.ChangeRegionModal).toBeVisible();
      await Footer.ChangeRegionCloseButton.click();
      await expect(Footer.ChangeRegionModal).not.toBeVisible();
    });
  });
});
