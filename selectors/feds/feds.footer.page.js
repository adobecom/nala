/* eslint-disable import/no-import-module-exports */

exports.FedsFooter = class FedsFooter {
  constructor(page) {
    this.page = page;

    // Container Selectors:
    this.footerContainer = page.locator('footer.global-footer');
    this.footerSections = page.locator('footer div.feds-menu-section');
    this.footerColumns = page.locator('footer div.feds-menu-column');
    this.footerHeadings = page.locator('footer div.feds-menu-headline');

    // Change Region Selectors:
    this.changeRegionContainer = page.locator('div.feds-regionPicker-wrapper');
    this.changeRegionButton = page.locator('div.feds-regionPicker-wrapper a.feds-regionPicker');
    this.changeRegionModal = page.locator('div#langnav');
    this.changeRegionDropDown = page.locator('div.region-selector');
    this.changeRegionCloseButton = page.locator('button.dialog-close');

    // Legal Selectors:
    this.legalContainer = page.locator('div.feds-footer-legalWrapper');
    this.legalSections = page.locator('p.feds-footer-privacySection');
    this.legalLinks = page.locator('div.feds-footer-legalWrapper a');
    this.legalCopyright = page.locator('span.feds-footer-copyright');
    this.privacyLink = page.locator('a[href*="privacy.html"]');
    this.termsOfUseLink = page.locator('a[href*="terms.html"]');
    this.cookiePreferencesLink = page.locator('a[href*="#openPrivacy"]');
    this.doNotSellInformationLink = page.locator('a[href*="ca-rights.html"]');
    this.adChoicesLink = page.locator('a[href*="opt-out.html"]');
    this.adChoicesLogo = page.locator('svg.feds-adChoices-icon');

    // Adobe Socials Selectors:
    this.twitterIcon = page.locator('ul.feds-social a[aria-label="twitter"]');
    this.linkedInIcon = page.locator('ul.feds-social a[aria-label="linkedin"]');
    this.facebookIcon = page.locator('ul.feds-social a[aria-label="facebook"]');
    this.instagramIcon = page.locator('ul.feds-social a[aria-label="instagram"]');
    this.socialContainer = page.locator('ul.feds-social');
    this.socialIcons = page.locator('ul.feds-social li');

    // Featured Products Selectors:
    this.featuredProductsContainer = page.locator('div.feds-featuredProducts');
    this.featuredProducts = page.locator('div.feds-featuredProducts a');
    this.downloadAdobeExpress = page.locator('footer a[daa-ll="Adobe_Express"]');
    this.downloadAdobePhotoshop = page.locator('footer a[daa-ll="Photoshop"]');
    this.downloadAdobeIllustrator = page.locator('footer a[daa-ll="Illustrator"]');
  }

  // >> FEDS Footer methods declared here <<
};
