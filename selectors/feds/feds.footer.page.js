/* eslint-disable import/no-import-module-exports */
import { expect } from '@playwright/test';

exports.FedsFooter = class FedsFooter {
  constructor(page) {
    this.page = page;

    // Containers:
    this.FooterContainer = page.locator('footer.global-footer');
    this.FooterSections = page.$$('footer div.feds-menu-section');
    this.FooterColumns = page.$$('footer div.feds-menu-column');
    this.FooterHeadings = page.$$('footer div.feds-menu-headline');

    // Change Region Elements:
    this.ChangeRegionContainer = page.locator('div.feds-regionPicker-wrapper');
    this.ChangeRegionDropDown = page.locator('div.feds-regionPicker-wrapper a');
    this.ChangeRegionModal = page.locator('div#langnav');
    this.ChangeRegionCloseButton = page.locator('button.dialog-close');

    // Legal Elements:
    this.LegalContainer = page.locator('div.feds-footer-legalWrapper');
    this.LegalLinks = page.$$('div.feds-footer-legalWrapper a');
    this.LegalCopyright = page.locator('span.feds-footer-copyright');
    this.PrivacyLink = page.locator('a[href*="privacy.html"]');
    this.TermsOfUseLink = page.locator('a[href*="terms.html"]');
    this.CookiePreferencesLink = page.locator('a[href*="#openPrivacy"]');
    this.DoNotSellInformationLink = page.locator('a[href*="ca-rights.html"]');
    this.AdChoicesLink = page.locator('a[href*="opt-out.html"]');
    this.AdChoicesLogo = page.locator('svg.feds-adChoices-icon');

    // Adobe Socials Elements:
    this.TwitterIcon = page.locator('ul.feds-social a[aria-label="twitter"]');
    this.LinkedInIcon = page.locator('ul.feds-social a[aria-label="linkedin"]');
    this.FacebookIcon = page.locator('ul.feds-social a[aria-label="facebook"]');
    this.InstagramIcon = page.locator('ul.feds-social a[aria-label="instagram"]');
    this.SocialContainer = page.locator('ul.feds-social');
    this.SocialIcons = page.$$('ul.feds-social li');

    // Featured Products Elements:
    this.FeaturedProductsContainer = page.locator('div.feds-featuredProducts');
    this.FeaturedProducts = page.$$('div.feds-featuredProducts a');
    this.DownloadAdobeExpress = page.locator('footer a[daa-ll="Adobe_Express"]');
    this.DownloadAdobePhotoshop = page.locator('footer a[daa-ll="Photoshop"]');
    this.DownloadAdobeIllustrator = page.locator('footer a[daa-ll="Illustrator"]');
  }

  // >> FEDS Footer methods declared here <<
};
