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
    this.buyNow = page.locator('.feds-navItem.feds-navItem--centered').nth(0);
    this.phoneNumber = page.locator('.feds-navItem').nth(9);

    this.hamburgerMenu = page.locator('.feds-toggle');
    this.adobeLogoMegaMenu = page.locator('.top-bar .feds-brand-image');
    this.closeMegaMenu = page.locator('.close-icon');
    this.breadHome = page.locator('.feds-nav .feds-breadcrumbs li').nth(0);
    this.breadAdobeCC = page.locator('.feds-nav .feds-breadcrumbs li').nth(1);
    this.breadCCProForTeams = page.locator('.feds-nav .feds-breadcrumbs li').nth(2);
    this.creativityAndDesignTitle = page.locator('.title h2');

    this.shopForNN = page.locator('.tabs button').nth(0);
    this.featuredProductsNN = page.locator('.tabs button').nth(1);
    this.onlineToolsCCNN = page.locator('.tabs button').nth(2);
    this.more = page.locator('.tabs button').nth(3);

    // Creativity & Design Elements
    this.whatIsCC = page.locator('[href*="creativecloud.html"]').nth(0);
    this.viewPlansAndPricing = page.locator('[href*="creativecloud/plans.html"]').nth(0);

    this.whatIsCCMob = page.locator('.feds-navLink-content').nth(0);
    this.viewPlansAndPricingMob = page.locator('.sticky-cta a');

    // Products
    this.creativeCloudForTeamsPro = page.locator('.feds-menu-items [href*="business/teams.html"]').nth(0);
    this.productsPhotoshop = page.locator('.feds-menu-items [href$="teams/photoshop.html"]').nth(0);

    // Resources
    this.resourceCenter = page.locator('.feds-menu-items [href$="resources/main.html"]').nth(0);
    this.helpCenter = page.locator('.feds-menu-items [href$="enterprise/teams.html"]').nth(0);

    // Contact Sales
    this.requestInformation = page.locator('.feds-menu-column [href$="request-information.html"]').nth(0);
    this.requestInformationJp = page.locator('.feds-menu-column [href$="request-information.html"]').nth(1);

    // Chnage Region Elements
    this.changeRegion = page.locator('.feds-regionPicker-wrapper');
    this.uk = page.locator('//a[contains(text(), "United Kingdom")]');
    this.us = page.locator('//a[contains(text(), "United States")]');
  }

  // U-Nav
  async validatingUnavElements(country) {
    const elementsToCheck = [
      { element: this.cce.adobe, conditions: { defaultVisibility: true } },
      { element: this.cce.appSwitcher, conditions: { defaultVisibility: true } },
      { element: this.cce.signInButton, conditions: { defaultVisibility: true } },
      { element: this.creativityAndDesign, conditions: { defaultVisibility: true } },
      { element: this.creativeCloudForBusiness, conditions: { defaultVisibility: true } },
      { element: this.products, conditions: { defaultVisibility: true } },
      { element: this.resources, conditions: { defaultVisibility: true } },
      { element: this.adminConsole, conditions: { defaultVisibility: true } },
      { element: this.comparePlans, conditions: { defaultVisibility: true } },
      { element: this.contactSales, conditions: { defaultVisibility: true } },
      { element: this.freeTrial, conditions: { defaultVisibility: true } },
      { element: this.buyNow, conditions: { defaultVisibility: true } },
      { element: this.phoneNumber, conditions: { defaultVisibility: true, excludeCountries: ['Turkey', 'Korea'] } },
    ];

    await Promise.all(elementsToCheck.map(async ({ element, conditions }) => {
      if (conditions.includeCountries && conditions.includeCountries.includes(country)) {
        await expect(element).toBeVisible();
      } else if (conditions.excludeCountries && conditions.excludeCountries.includes(country)) {
        await expect(element).not.toBeVisible();
      } else if (conditions.defaultVisibility) {
        await expect(element).toBeVisible();
      }
    }));
  }

  // Creativity & Design
  async validatingCreativeAndDesignElements(country) {
    await this.creativityAndDesign.click({ timeout: 5000 });
    const elementsToCheck = [
      { element: this.whatIsCC, conditions: { defaultVisibility: true } },
      {
        element: this.viewPlansAndPricing,
        conditions: {
          defaultVisibility: true,
          excludeCountries: ['Indonesia English', 'Indonesia', 'Mexico', 'India'],
        },
      },
      { element: this.cce.adobecom, conditions: { defaultVisibility: true } },
      { element: this.cce.pdfAndESignature, conditions: { defaultVisibility: true } },
      { element: this.cce.marketingAndCommerce, conditions: { defaultVisibility: true } },
      { element: this.cce.helpAndSupport, conditions: { defaultVisibility: true } },
    ];

    await Promise.all(elementsToCheck.map(async ({ element, conditions }) => {
      if (conditions.includeCountries && conditions.includeCountries.includes(country)) {
        await expect(element).toBeVisible();
      } else if (conditions.excludeCountries && conditions.excludeCountries.includes(country)) {
        await expect(element).not.toBeVisible();
      } else if (conditions.defaultVisibility) {
        await expect(element).toBeVisible();
      }
    }));
  }

  // Products
  async validatingProductElements() {
    await this.products.click({ timeout: 5000 });
    const elements = [this.creativeCloudForTeamsPro, this.productsPhotoshop];
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
  async validatingContactSales(country) {
    await this.contactSales.click({ timeout: 5000 });
    await expect(country === 'Japan' ? this.requestInformationJp : this.requestInformation).toBeVisible();
    await this.contactSales.click({ timeout: 5000 });
  }

  // Footer
  async validatingFooterElements(country) {
    await this.footer.changeRegionContainer.scrollIntoViewIfNeeded();
    const elementsToCheck = [
      { element: this.footer.footerCreativeCloud, conditions: { defaultVisibility: true, excludeCountries: ['United States'] } },
      { element: this.footer.footerCreativeCloudForBusiness, conditions: { defaultVisibility: true, excludeCountries: ['United States'] } },
      {
        element: this.footer.footerDiscountsForStudentsAndTeachers,
        conditions: {
          defaultVisibility: true,
          excludeCountries: ['United States'],
        },
      },
      { element: this.footer.footerAppsforiOS, conditions: { defaultVisibility: true, excludeCountries: ['United States'] } },
      { element: this.footer.footerWhatIsExperienceCloud, conditions: { defaultVisibility: true } },
      { element: this.footer.footerDownloadAndInstall, conditions: { defaultVisibility: true } },
      { element: this.footer.footerAdobeBlogSecond, conditions: { defaultVisibility: true } },
      { element: this.footer.footerLogInToYourAccount, conditions: { defaultVisibility: true } },
      { element: this.footer.footerAbout, conditions: { defaultVisibility: true } },
      { element: this.footer.footerAdobeAcrobatReaderlogo, conditions: { defaultVisibility: true } },
      { element: this.footer.footerAdobeExpresslogo, conditions: { defaultVisibility: true, excludeCountries: ['United States'] } },
      { element: this.footer.footerPhotoshoplogo, conditions: { defaultVisibility: true } },
      { element: this.footer.footerIllustratorlogo, conditions: { defaultVisibility: true, excludeCountries: ['United States'] } },
      { element: this.footer.changeRegionContainer, conditions: { defaultVisibility: true } },
      { element: this.footer.facebookIcon, conditions: { defaultVisibility: true } },
      { element: this.footer.instagramIcon, conditions: { defaultVisibility: true } },
      { element: this.footer.twitterIcon, conditions: { defaultVisibility: true } },
      { element: this.footer.linkedInIcon, conditions: { defaultVisibility: true } },
      { element: this.footer.legalCopyright, conditions: { defaultVisibility: true } },
      { element: this.footer.privacyLink, conditions: { defaultVisibility: true } },
      { element: this.footer.termsOfUseLink, conditions: { defaultVisibility: true } },
      { element: this.footer.cookiePreferencesLink, conditions: { defaultVisibility: true } },
      {
        element: this.footer.doNotSellInformationLink,
        conditions: {
          defaultVisibility: true,
          excludeCountries: ['United States', 'Germany', 'Middle East And North Africa', 'Spain', 'Canada English', 'Poland', 'Australia',
            'Thailand English', 'Thailand', 'Philippines', 'Philippines English', 'Turkey', 'Indonesia English', 'Indonesia', 'Mexico',
            'India', 'Japan', 'Korea'],
        },
      },
      { element: this.footer.adChoicesLink, conditions: { defaultVisibility: true } },
      { element: this.footer.adChoicesLogo, conditions: { defaultVisibility: true } },
    ];

    await Promise.all(elementsToCheck.map(async ({ element, conditions }) => {
      if (conditions.includeCountries && conditions.includeCountries.includes(country)) {
        await expect(element).toBeVisible();
      } else if (conditions.excludeCountries && conditions.excludeCountries.includes(country)) {
        await expect(element).not.toBeVisible();
      } else if (conditions.defaultVisibility) {
        await expect(element).toBeVisible();
      }
    }));
  }

  // Change Region
  async validatingChangeRegion(country) {
    await this.changeRegion.click();
    const includeCountries = ['United States'];

    if (includeCountries.includes(country)) {
      await this.uk.click();
      await expect(this.page).toHaveURL('https://www.stage.adobe.com/uk/creativecloud/business/teams.html?georouting=off&mep=off');
    } else {
      await this.us.click();
      await expect(this.page).toHaveURL('https://www.stage.adobe.com/creativecloud/business/teams.html?georouting=off&mep=off');
    }
  }

  // ==================== Mobile ==================== //

  // Hambuger Menu
  async validatingHamburgerMenu() {
    await this.hamburgerMenu.click();

    const elements = [this.adobeLogoMegaMenu, this.closeMegaMenu, this.breadHome, this.breadAdobeCC, this.breadCCProForTeams,
      this.creativityAndDesignTitle];
    await Promise.all(elements.map(async (element) => {
      await expect(element).toBeVisible();
    }));

    const elementsToCheck = [
      { element: this.shopForNN, conditions: { defaultVisibility: true } },
      { element: this.featuredProductsNN, conditions: { defaultVisibility: true } },
      { element: this.onlineToolsCCNN, conditions: { defaultVisibility: true } },
      { element: this.more, conditions: { defaultVisibility: true } },
    ];
    await Promise.all(elementsToCheck.map(async ({ element, conditions }) => {
      if (conditions.defaultVisibility) {
        await expect(element).toBeVisible();
      }
    }));

    await expect(this.whatIsCCMob).toBeVisible();
    await expect(this.viewPlansAndPricingMob).toBeVisible();

    await this.featuredProductsNN.click();
    await this.onlineToolsCCNN.click();
    await this.more.click();
    await this.shopForNN.click();

    await this.closeMegaMenu.click();
  }
}
