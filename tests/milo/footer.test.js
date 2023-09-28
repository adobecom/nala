/* eslint-disable import/named */
/* eslint-disable no-await-in-loop */
/* eslint-disable import/extensions */
import { expect, test } from '@playwright/test';
import { features } from '../../features/milo/footer.spec.js';
import FedsFooter from '../../selectors/feds/feds.footer.page.js';
import FedsConsent from '../../selectors/feds/feds.consent.page.js';

// eslint-disable-next-line import/no-extraneous-dependencies
const AxeBuilder = require('@axe-core/playwright').default;

test.describe('Footer Block test suite', () => {
  // FEDS Default Footer Checks:
  test(`${features[0].name}, ${features[0].tags}`, async ({ page, baseURL }, testInfo) => {
    const Footer = new FedsFooter(page);
    const Consent = new FedsConsent(page);
    console.info(`[FEDSInfo] Checking page: ${baseURL}${features[0].path}`);

    await test.step('Navigate to FEDS Default Footer page', async () => {
      await page.goto(`${baseURL}${features[0].path}${features[0].browserParams}`);
      await page.waitForLoadState('domcontentloaded');
      await expect(page).toHaveURL(`${baseURL}${features[0].path}${features[0].browserParams}`);
    });

    await test.step('Accept OneTrust consent bar', async () => {
      // Wait for the OneTrust consent bar to appear:
      await Consent.oneTrustContainer.waitFor({ state: 'visible', timeout: 15000 });
      // Accept the OneTrust consent banner:
      await Consent.acceptOneTrustConsentBar();
      // Check consent persistence:
      await Consent.assertOneTrustAcceptState();
    });

    await test.step('Check FEDS Default Footer critical elements', async () => {
      // Scroll FEDS Footer into viewport:
      await Footer.legalContainer.scrollIntoViewIfNeeded();
      // Wait for FEDS Footer to be visible:
      await Footer.footerContainer.waitFor({ state: 'visible', timeout: 5000 });
      // Check FEDS Footer critical elements:
      await expect(Footer.legalContainer).toBeVisible();
      await expect(Footer.socialContainer).toBeVisible();
      await expect(Footer.footerContainer).toBeVisible();
      await expect(Footer.changeRegionContainer).toBeVisible();
      // !Note: Footer featuredProducts not appearing in NALA. Possible BUG!
      // await expect(Footer.featuredProductsContainer).toBeVisible();
      await expect(Footer.footerColumns).toHaveCount(5);
      await expect(Footer.footerSections).toHaveCount(6);
      await expect(Footer.footerHeadings).toHaveCount(6);
      await expect(Footer.socialIcons).toHaveCount(4);
      await expect(Footer.legalLinks).toHaveCount(5);
    });

    await test.step('Check ChangeRegion functionality', async () => {
      await Footer.changeRegionButton.click();
      await expect(Footer.changeRegionModal).toBeVisible();
      await Footer.changeRegionCloseButton.click();
      await expect(Footer.changeRegionModal).not.toBeVisible();
    });

    await test.step('Analyze page accessibility', async () => {
      // Analyze page accessibility:
      const a11yReport = await new AxeBuilder({ page })
        .withTags(features[0].wcagTags)
        // eslint-disable-next-line no-underscore-dangle
        .include(Footer.footerContainer._selector)
        .analyze();
      // Assert there are no page accessibility violations:
      expect.soft(a11yReport.violations.length).toBeLessThan(5);
      // Attach A11y results to test output:
      await testInfo.attach('a11y-scan-results', {
        body: JSON.stringify(a11yReport, null, 2),
        contentType: 'application/json',
      });
    });
  });

  // FEDS Skinny Footer Checks:
  test(`${features[1].name}, ${features[1].tags}`, async ({ page, baseURL }, testInfo) => {
    const Footer = new FedsFooter(page);
    const Consent = new FedsConsent(page);
    console.info(`[FEDSInfo] Checking page: ${baseURL}${features[1].path}`);

    await test.step('Navigate to FEDS Skinny Footer page', async () => {
      await page.goto(`${baseURL}${features[1].path}${features[1].browserParams}`);
      await page.waitForLoadState('domcontentloaded');
      await expect(page).toHaveURL(`${baseURL}${features[1].path}${features[1].browserParams}`);
    });

    await test.step('Accept OneTrust consent bar', async () => {
      // Wait for the OneTrust consent bar to appear:
      await Consent.oneTrustContainer.waitFor({ state: 'visible', timeout: 15000 });
      // Accept the OneTrust consent banner:
      await Consent.acceptOneTrustConsentBar();
      // Check consent persistence:
      await Consent.assertOneTrustAcceptState();
    });

    await test.step('Check FEDS Skinny Footer critical elements', async () => {
      // Scroll FEDS Footer into viewport:
      await Footer.legalContainer.scrollIntoViewIfNeeded();
      // Wait for FEDS Footer to be visible:
      await Footer.footerContainer.waitFor({ state: 'visible', timeout: 5000 });
      // Check FEDS Footer critical elements:
      await expect(Footer.legalContainer).toBeVisible();
      await expect(Footer.socialContainer).toBeVisible();
      await expect(Footer.footerContainer).toBeVisible();
      await expect(Footer.changeRegionContainer).toBeVisible();

      await expect(Footer.featuredProducts).toHaveCount(0);
      await expect(Footer.featuredProductsContainer).not.toBeVisible();

      await expect(Footer.legalLinks).toHaveCount(5);
      await expect(Footer.socialIcons).toHaveCount(4);

      await expect(Footer.footerColumns).toHaveCount(0);
      await expect(Footer.footerSections).toHaveCount(0);
      await expect(Footer.footerHeadings).toHaveCount(0);
      await expect(Footer.footerColumns).not.toBeVisible();
      await expect(Footer.footerSections).not.toBeVisible();
      await expect(Footer.footerHeadings).not.toBeVisible();
    });

    await test.step('Check ChangeRegion functionality', async () => {
      await Footer.changeRegionButton.click();
      await expect(Footer.changeRegionModal).toBeVisible();
      await Footer.changeRegionCloseButton.click();
      await expect(Footer.changeRegionModal).not.toBeVisible();
    });

    await test.step('Analyze page accessibility', async () => {
      // Analyze page accessibility:
      const a11yReport = await new AxeBuilder({ page })
        .withTags(features[1].wcagTags)
        // eslint-disable-next-line no-underscore-dangle
        .include(Footer.footerContainer._selector)
        .analyze();
      // Assert there are no page accessibility violations:
      expect.soft(a11yReport.violations.length).toBeLessThan(5);
      // Attach A11y results to test output:
      await testInfo.attach('a11y-scan-results', {
        body: JSON.stringify(a11yReport, null, 2),
        contentType: 'application/json',
      });
    });
  });

  // FEDS Privacy Footer Checks:
  test(`${features[2].name}, ${features[2].tags}`, async ({ page, baseURL }, testInfo) => {
    const Footer = new FedsFooter(page);
    const Consent = new FedsConsent(page);
    console.info(`[FEDSInfo] Checking page: ${baseURL}${features[2].path}`);

    await test.step('Navigate to FEDS Privacy Footer page', async () => {
      await page.goto(`${baseURL}${features[2].path}${features[2].browserParams}`);
      await page.waitForLoadState('domcontentloaded');
      await expect(page).toHaveURL(`${baseURL}${features[2].path}${features[2].browserParams}`);
    });

    await test.step('Accept OneTrust consent bar', async () => {
      // Wait for the OneTrust consent bar to appear:
      await Consent.oneTrustContainer.waitFor({ state: 'visible', timeout: 15000 });
      // Accept the OneTrust consent banner:
      await Consent.acceptOneTrustConsentBar();
      // Check consent persistence:
      await Consent.assertOneTrustAcceptState();
    });

    await test.step('Check FEDS Privacy Footer critical elements', async () => {
      // Scroll FEDS Footer into viewport:
      await Footer.legalContainer.scrollIntoViewIfNeeded();
      // Wait for FEDS Footer to be visible:
      await Footer.footerContainer.waitFor({ state: 'visible', timeout: 5000 });
      // Check FEDS Footer critical elements:
      await expect(Footer.legalContainer).toBeVisible();
      await expect(Footer.socialContainer).toBeVisible();
      await expect(Footer.footerContainer).toBeVisible();
      await expect(Footer.changeRegionContainer).toBeVisible();
      await expect(Footer.featuredProductsContainer).toBeVisible();

      await expect(Footer.footerColumns).toHaveCount(5);
      await expect(Footer.footerSections).toHaveCount(6);
      await expect(Footer.footerHeadings).toHaveCount(6);
      await expect(Footer.featuredProducts).toHaveCount(3);

      await expect(Footer.legalSections).toHaveCount(2);
      await expect(Footer.socialIcons).toHaveCount(4);
      await expect(Footer.legalLinks).toHaveCount(5);
    });

    await test.step('Check ChangeRegion functionality', async () => {
      await Footer.changeRegionButton.click();
      await expect(Footer.changeRegionDropDown).toBeVisible();
      await expect(Footer.changeRegionModal).not.toBeVisible();
      await Footer.changeRegionButton.click();
      await expect(Footer.changeRegionDropDown).not.toBeVisible();
    });

    await test.step('Analyze footer block accessibility', async () => {
      // Analyze page accessibility:
      const a11yReport = await new AxeBuilder({ page })
        .withTags(features[2].wcagTags)
        // eslint-disable-next-line no-underscore-dangle
        .include(Footer.footerContainer._selector)
        .analyze();
      // Assert there are no page accessibility violations:
      expect.soft(a11yReport.violations.length).toBeLessThan(5);
      // Attach A11y results to test output:
      await testInfo.attach('a11y-scan-results', {
        body: JSON.stringify(a11yReport, null, 2),
        contentType: 'application/json',
      });
    });
  });
});
