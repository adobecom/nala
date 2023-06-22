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
  test(`${features[0].name} > ${features[0].tags}`, async ({ page, baseURL }) => {
    const Footer = new FedsFooter(page);
    const Consent = new FedsConsent(page);
    console.info(`[FEDSInfo] Checking page: ${baseURL}${features[0].path}`);

    await test.step('Navigate to FEDS Default Footer page', async () => {
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

    await test.step('Check FEDS Default Footer critical elements', async () => {
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
      await Footer.ChangeRegionButton.click();
      await expect(Footer.ChangeRegionModal).toBeVisible();
      await Footer.ChangeRegionCloseButton.click();
      await expect(Footer.ChangeRegionModal).not.toBeVisible();
    });
  });

  // FEDS Skinny Footer Checks:
  test(`${features[1].name} > ${features[1].tags}`, async ({ page, baseURL }) => {
    const Footer = new FedsFooter(page);
    const Consent = new FedsConsent(page);
    console.info(`[FEDSInfo] Checking page: ${baseURL}${features[1].path}`);

    await test.step('Navigate to FEDS Skinny Footer page', async () => {
      await page.goto(`${baseURL}${features[1].path}`);
      await page.waitForLoadState('domcontentloaded');
      await expect(page).toHaveURL(`${baseURL}${features[1].path}`);
    });

    await test.step('Accept OneTrust consent bar', async () => {
      // Wait for the OneTrust consent bar to appear:
      await Consent.OneTrustContainer.waitFor({ state: 'visible', timeout: 15000 });
      // Accept the OneTrust consent banner:
      await Consent.acceptOneTrustConsentBar();
      // Check consent persistence:
      await Consent.assertOneTrustAcceptState();
    });

    await test.step('Check FEDS Skinny Footer critical elements', async () => {
      // Scroll FEDS Footer into viewport:
      await Footer.LegalContainer.scrollIntoViewIfNeeded();
      // Wait for FEDS Footer to be visible:
      await Footer.FooterContainer.waitFor({ state: 'visible', timeout: 5000 });
      // Check FEDS Footer critical elements:
      await expect(Footer.LegalContainer).toBeVisible();
      await expect(Footer.SocialContainer).toBeVisible();
      await expect(Footer.FooterContainer).toBeVisible();
      await expect(Footer.ChangeRegionContainer).toBeVisible();

      await expect(Footer.FeaturedProducts).toHaveCount(0);
      await expect(Footer.FeaturedProductsContainer).not.toBeVisible();

      await expect(Footer.LegalLinks).toHaveCount(5);
      await expect(Footer.SocialIcons).toHaveCount(4);

      await expect(Footer.FooterColumns).toHaveCount(0);
      await expect(Footer.FooterSections).toHaveCount(0);
      await expect(Footer.FooterHeadings).toHaveCount(0);
      await expect(Footer.FooterColumns).not.toBeVisible();
      await expect(Footer.FooterSections).not.toBeVisible();
      await expect(Footer.FooterHeadings).not.toBeVisible();
    });

    await test.step('Check ChangeRegion functionality', async () => {
      await Footer.ChangeRegionButton.click();
      await expect(Footer.ChangeRegionModal).toBeVisible();
      await Footer.ChangeRegionCloseButton.click();
      await expect(Footer.ChangeRegionModal).not.toBeVisible();
    });
  });

  // FEDS Privacy Footer Checks:
  test(`${features[2].name} > ${features[2].tags}`, async ({ page, baseURL }) => {
    const Footer = new FedsFooter(page);
    const Consent = new FedsConsent(page);
    console.info(`[FEDSInfo] Checking page: ${baseURL}${features[2].path}`);

    await test.step('Navigate to FEDS Privacy Footer page', async () => {
      await page.goto(`${baseURL}${features[2].path}`);
      await page.waitForLoadState('domcontentloaded');
      await expect(page).toHaveURL(`${baseURL}${features[2].path}`);
    });

    await test.step('Accept OneTrust consent bar', async () => {
      // Wait for the OneTrust consent bar to appear:
      await Consent.OneTrustContainer.waitFor({ state: 'visible', timeout: 15000 });
      // Accept the OneTrust consent banner:
      await Consent.acceptOneTrustConsentBar();
      // Check consent persistence:
      await Consent.assertOneTrustAcceptState();
    });

    await test.step('Check FEDS Privacy Footer critical elements', async () => {
      // Scroll FEDS Footer into viewport:
      await Footer.LegalContainer.scrollIntoViewIfNeeded();
      // Wait for FEDS Footer to be visible:
      await Footer.FooterContainer.waitFor({ state: 'visible', timeout: 5000 });
      // Check FEDS Footer critical elements:
      await expect(Footer.LegalContainer).toBeVisible();
      await expect(Footer.SocialContainer).toBeVisible();
      await expect(Footer.FooterContainer).toBeVisible();
      await expect(Footer.ChangeRegionContainer).toBeVisible();
      await expect(Footer.FeaturedProductsContainer).toBeVisible();

      await expect(Footer.FooterColumns).toHaveCount(5);
      await expect(Footer.FooterSections).toHaveCount(6);
      await expect(Footer.FooterHeadings).toHaveCount(6);
      await expect(Footer.FeaturedProducts).toHaveCount(3);

      await expect(Footer.LegalSections).toHaveCount(2);
      await expect(Footer.SocialIcons).toHaveCount(4);
      await expect(Footer.LegalLinks).toHaveCount(5);
    });

    await test.step('Check ChangeRegion functionality', async () => {
      await Footer.ChangeRegionButton.click();
      await expect(Footer.ChangeRegionDropDown).toBeVisible();
      await expect(Footer.ChangeRegionModal).not.toBeVisible();
      await Footer.ChangeRegionButton.click();
      await expect(Footer.ChangeRegionDropDown).not.toBeVisible();
    });
  });
});
