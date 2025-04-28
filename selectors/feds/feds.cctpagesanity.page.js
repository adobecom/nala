import { expect } from '@playwright/test';
import CreativeCloudEnterpriseSanity from './feds.ccepagesanity.page.js';
import FedsFooter from './feds.footer.page.js';

export default class CreativeCloudTeamsSanity {
  constructor(page) {
    this.page = page;
    this.cce = new CreativeCloudEnterpriseSanity(page);
    this.footer = new FedsFooter(page);

    // U-Nav Elements
    this.creativityAndDesign = page.locator('.feds-navLink.feds-navLink--hoverCaret').nth(0);
    this.creativeCloudForBusiness = page.locator('.feds-navItem').nth(1);
    this.products = page.locator('.feds-navLink.feds-navLink--hoverCaret').nth(1);
    this.resources = page.locator('.feds-navLink.feds-navLink--hoverCaret').nth(2);
    this.adminConsole = page.locator('.feds-navItem').nth(4);
    this.comparePlans = page.locator('.feds-navItem').nth(5);
    this.contactSales = page.locator('.feds-navLink.feds-navLink--hoverCaret').nth(3);
    this.freeTrial = page.locator('.feds-navItem').nth(7);
    this.buyNow = page.locator('.feds-navItem.feds-navItem--centered');
    this.phoneNumber = page.locator('.feds-navItem').nth(9);

    // Creativity & Design Elements
    this.whatIsCC = page.locator('[href*="creativecloud.html"]').nth(0);
    this.viewPlansAndPricing = page.locator('[href*="creativecloud/plans.html"]').nth(0);

    // Products
    this.creativeCloudForTeamsPro = page.locator('.feds-menu-items [href*="business/teams.html"]');
    this.viewAllProducts = page.locator('.feds-menu-items [href*="business/teams/plans.html"]');

    // Resources
    this.resourceCenter = page.locator('.feds-menu-items [href$="resources/main.html"]');
    this.helpCenter = page.locator('.feds-menu-items [href$="enterprise/teams.html"]');

    // Contact Sales
    this.requestInformation = page.locator('.feds-menu-column [href$="request-information.html"]');

    // Georouting pop
    this.closeGeorouting = page.locator('.dexter-CloseButton').nth(5);

    // ----------------------------------- Dexter ----------------------------------- //
  }

  // U-Nav
  async validatingUnavElements() {
    const elements = [this.cce.adobe, this.cce.appSwitcher, this.cce.signInButton, this.creativityAndDesign,
      this.creativeCloudForBusiness, this.products, this.resources, this.adminConsole, this.comparePlans,
      this.contactSales, this.freeTrial, this.buyNow, this.phoneNumber];
    const promises = elements.map(async (element) => { await expect(element).toBeVisible(); });
    await Promise.all(promises);
  }

  // Creativity & Design
  async validatingCreativeAndDesignElements() {
    await this.creativityAndDesign.click({ timeout: 5000 });
    const elements = [this.whatIsCC, this.viewPlansAndPricing, this.cce.adobecom, this.cce.pdfAndESignature,
      this.cce.marketingAndCommerce, this.cce.helpAndSupport];
    const promises = elements.map(async (element) => { await expect(element).toBeVisible(); });
    await Promise.all(promises);
  }

  // Products
  async validatingProductElements() {
    await this.products.click({ timeout: 5000 });
    const elements = [this.creativeCloudForTeamsPro, this.viewAllProducts];
    const promises = elements.map(async (element) => { await expect(element).toBeVisible(); });
    await Promise.all(promises);
  }

  // Resources
  async validatingResourceElements() {
    await this.resources.click({ timeout: 5000 });
    const elements = [this.resourceCenter, this.helpCenter];
    const promises = elements.map(async (element) => { await expect(element).toBeVisible(); });
    await Promise.all(promises);
  }

  // Contact Sales
  async validatingContactSales() {
    await this.contactSales.click({ timeout: 5000 });
    await expect(this.requestInformation).toBeVisible();
    await this.contactSales.click({ timeout: 5000 });
  }

  // Footer
  async validatingFooterElements() {
    await this.footer.changeRegionContainer.scrollIntoViewIfNeeded();
    const elements = [this.footer.footerCreativeCloud, this.footer.footerCreativeCloudForBusiness,
      this.footer.footerDiscountsForStudentsAndTeachers, this.footer.footerAppsforiOS, this.footer.footerWhatIsExperienceCloud,
      this.footer.footerDownloadAndInstall, this.footer.footerAdobeBlogSecond, this.footer.footerLogInToYourAccount,
      this.footer.footerAbout, this.footer.footerAdobeAcrobatReaderlogo, this.footer.footerAdobeExpresslogo,
      this.footer.footerPhotoshoplogo, this.footer.footerIllustratorlogo, this.footer.changeRegionContainer, this.footer.facebookIcon,
      this.footer.instagramIcon, this.footer.twitterIcon, this.footer.linkedInIcon, this.footer.legalCopyright, this.footer.privacyLink,
      this.footer.termsOfUseLink, this.footer.cookiePreferencesLink, this.footer.doNotSellInformationLink, this.footer.adChoicesLink,
      this.footer.adChoicesLogo, this.footer.footerAdobeAcrobatReaderlogo, this.footer.footerAdobeExpresslogo,
      this.footer.footerPhotoshoplogo, this.footer.footerIllustratorlogo];
    const promises = elements.map(async (element) => { await expect(element).toBeVisible(); });
    await Promise.all(promises);
  }
}
