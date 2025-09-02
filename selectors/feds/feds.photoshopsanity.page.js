import { expect } from '@playwright/test';
import FedsFooter from './feds.footer.page.js';

export default class PhotoshopPageSanity {
  constructor(page) {
    this.page = page;
    this.feds = new FedsFooter(page);

    // UNav Elements
    this.adobelogo = page.locator('.feds-brand-container');
    this.fedsNav = page.locator('.feds-nav');
    this.gnavCC = this.fedsNav.locator('.feds-navItem button');
    this.gnavPhotoshop = this.fedsNav.locator('.feds-navItem').nth(1);
    this.gnavFeatures = this.fedsNav.locator('.feds-navItem').nth(2);
    this.gnavMobile = this.fedsNav.locator('.feds-navItem').nth(3);
    this.gnavComparePlans = this.fedsNav.locator('.feds-navItem').nth(4);
    this.gnavFreeTrialDetails = this.fedsNav.locator('.feds-navItem').nth(5);
    this.goToPhotoshop = this.page.locator('[href*="promoid=6DWQ781Q&mv=other"]');
    this.appSwitcher = page.locator('#unav-app-switcher');
    this.signIn = page.locator('#unav-profile');

    // Unav Elements for mobile
    this.hamburgerMenu = page.locator('.feds-toggle');
    this.adobeLogoMegaMenu = page.locator('.feds-brand').nth(0);
    this.closeMegaMenu = page.locator('.close-icon');
    this.breadHome = page.locator('.feds-nav .feds-breadcrumbs li').nth(0);
    this.breadAdobeCC = page.locator('.feds-nav .feds-breadcrumbs li').nth(1);
    this.breadPhotoshop = page.locator('.feds-nav .feds-breadcrumbs li').nth(2);
    this.creativityAndDesignTitle = page.locator('.title h2');

    this.shopFor = page.locator('.tabs button').nth(0);
    this.featuredProductsNN = page.locator('.tabs button').nth(1);
    this.onlineToolsCCNN = page.locator('.tabs button').nth(2);
    this.more = page.locator('.tabs button').nth(3);
    this.viewAllProducts = page.locator('.feds-popup [href*="catalog.html"]')
    this.viewPlansAndPricingMobCTA = page.locator('.feds-cta feds-cta--primary');

    // Lnav Mobile elements
    this.whatIsCCMob = page.locator('.feds-popup [href*="creativecloud.html"]').nth(1);
    this.mobPhotoshopDropdown = page.locator('.feds-localnav-title');
    this.mobOverview = page.locator('.feds-localnav-items .feds-navItem').nth(0);
    this.mobFeatures = page.locator('.feds-localnav-items .feds-navItem').nth(1);
    this.mobMobile = page.locator('.feds-localnav-items .feds-navItem').nth(2);
    this.mobComparePlans = page.locator('.feds-localnav-items .feds-navItem').nth(3);

    // Change Region Elements
    this.changeRegion = page.locator('.feds-regionPicker-wrapper');
    this.uk = page.locator('//a[contains(text(), "United Kingdom")]');
    this.us = page.locator('//a[contains(text(), "United States")]');

    // Creativity and design Elements
    this.whatIsCC = page.locator('.feds-popup [href*="creativecloud.html"]');
    this.whatIsCC = page.locator('.feds-popup [href*="creativecloud.html"]').nth(0);
    this.photographers = page.locator('.feds-popup [href*="photography.html"]');
    this.individuals = page.locator('.feds-popup [href*="all-apps.html"]');
    this.business = page.locator('.feds-popup [href*="business.html"]');
    this.studentAndTeachers = page.locator('.feds-popup [href*="business.html"]');
    this.viewPlansAndPricing = page.locator('.feds-popup [href*="plans.html"]').nth(0);

    this.photoshop = page.locator('.feds-popup [href*="products/photoshop.html"]');
    this.premierePro = page.locator('.feds-popup [href*="products/premiere.html"]');
    this.illustrator = page.locator('.feds-popup [href*="products/illustrator.html"]');
    this.adobeExpress = page.locator('.feds-popup [href*="express"]').nth(0);
    this.lightroom = page.locator('.feds-popup [href*="lightroom.html"]');
    this.adobeFirefly = page.locator('.feds-popup [href*="firefly.html"]');
    this.adobeStock = page.locator('.feds-popup [href*="stock.adobe.com/"]');
    this.viewAllProducts = page.locator('.feds-popup [href*="catalog.html"]');

    this.removeBackground = page.locator('.feds-popup [href*="remove-background"]');
    this.genAiImages = page.locator('.feds-popup [href*="text-to-image.html"]');
    this.genAiVideos = page.locator('.feds-popup [href*="ai-video-generator.html"]');
    this.genAiArt = page.locator('.feds-popup [href*="ai-art-generator.html"]');
    this.editPhotosWithAi = page.locator('.feds-popup [href*="ai-photo-editor.html"]');

    this.adobecom = page.locator('.feds-crossCloudMenu-item').nth(0);
    this.pdfAndESignatures = page.locator('.feds-crossCloudMenu-item').nth(1);
    this.marketingAndCommerce = page.locator('.feds-crossCloudMenu-item').nth(2);
    this.helpAndSupport = page.locator('.feds-crossCloudMenu-item').nth(3);

    this.closeDialogModel = page.locator('.dialog-close');
  }

  // UK model close button
  async validatingcloseDialogModel(country) {
    if (country === 'United Kingdom') {
      try {
        await this.closeDialogModel.click();
      } catch (error) {
        console.error('Model not found');
      }
    }
  }

  // Unav elements
  async validatingUnavElements(country) {
    const elementsToCheck = [
      { element: this.adobelogo, conditions: { defaultVisibility: true } },
      { element: this.appSwitcher, conditions: { defaultVisibility: true } },
      { element: this.signIn, conditions: { defaultVisibility: true } },
      { element: this.gnavCC, conditions: { defaultVisibility: true } },
      { element: this.gnavPhotoshop, conditions: { defaultVisibility: true } },
      { element: this.gnavFeatures, conditions: { defaultVisibility: true } },
      { element: this.gnavComparePlans, conditions: { defaultVisibility: true } },
      { element: this.gnavFreeTrialDetails, conditions: { defaultVisibility: true , excludeCountries : ['Korea'] } },
      { element: this.gnavMobile, conditions: { defaultVisibility: true } },
      { element: this.goToPhotoshop, conditions: { defaultVisibility: true } },
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
  async validatingCreativityAndDesignElements(country) {
    await this.page.waitForTimeout(10000);
    await this.gnavCC.click({ timeout: 10000 });
    await this.page.waitForTimeout(10000);

    const elementsToCheck = [
      { element: this.whatIsCC, conditions: { defaultVisibility: true } },
      { element: this.photographers, conditions: { defaultVisibility: true } },
      { element: this.studentAndTeachers, conditions: { defaultVisibility: true } },
      { element: this.business, conditions: { defaultVisibility: true } },
      { element: this.viewPlansAndPricing, conditions: { defaultVisibility: true } },

      { element: this.photoshop, conditions: { defaultVisibility: true } },
      { element: this.adobeExpress, conditions: { defaultVisibility: true } },
      { element: this.lightroom, conditions: { defaultVisibility: true } },
      { element: this.illustrator, conditions: { defaultVisibility: true } },
      { element: this.premierePro, conditions: { defaultVisibility: true } },
      { element: this.adobeFirefly, conditions: { defaultVisibility: true, excludeCountries: ['United Kingdom', 'Spain'] } },
      { element: this.adobeStock, conditions: { defaultVisibility: true } },
      { element: this.viewAllProducts, conditions: { defaultVisibility: true } },

      { element: this.removeBackground, conditions: { defaultVisibility: true, excludeCountries: ['Germany'] } },
      { element: this.genAiImages, conditions: { defaultVisibility: true, excludeCountries: ['Germany', 'India'] } },
      { element: this.genAiVideos, conditions: { defaultVisibility: true, excludeCountries: ['Germany', 'India' ] } },
      { element: this.genAiArt, conditions: { defaultVisibility: true, excludeCountries: ['Germany', 'India'] } },
      { element: this.editPhotosWithAi, conditions: { defaultVisibility: true, excludeCountries: ['Germany','India'] } },
      { element: this.adobecom, conditions: { defaultVisibility: true } },
      { element: this.pdfAndESignatures, conditions: { defaultVisibility: true } },
      { element: this.marketingAndCommerce, conditions: { defaultVisibility: true } },
      { element: this.helpAndSupport, conditions: { defaultVisibility: true } },
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
    await this.gnavCC.click({ timeout: 20000 });
  }

  // Footer
  async validatingFooterElements(country) {
    await this.feds.changeRegionButton.scrollIntoViewIfNeeded();
    const elementsToCheck = [
      { element: this.feds.changeRegionButton, conditions: { defaultVisibility: true } },
      { element: this.feds.facebookIcon, conditions: { defaultVisibility: true } },
      { element: this.feds.instagramIcon, conditions: { defaultVisibility: true } },
      { element: this.feds.twitterIcon, conditions: { defaultVisibility: true } },
      { element: this.feds.linkedInIcon, conditions: { defaultVisibility: true } },
      { element: this.feds.legalCopyright, conditions: { defaultVisibility: true } },
      { element: this.feds.cookiePreferencesLink, conditions: { defaultVisibility: true } },
      { element: this.feds.protectMyPersonalData, conditions: { defaultVisibility: true } },
      { element: this.feds.adChoicesLogo, conditions: { defaultVisibility: true } },
      { element: this.feds.adChoicesLink, conditions: { defaultVisibility: true } },
      { element: this.feds.termsOfUseLinkCA, conditions: { includeCountries: ['Canada English'] } },
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

  // Change region Validation
  async validatingChangeRegion(country) {
    await this.changeRegion.click();
    const includeCountries = ['United States'];

    if (includeCountries.includes(country)) {
      await this.uk.click();
      await expect(this.page).toHaveURL('https://www.stage.adobe.com/uk/products/photoshop.html?georouting=off&mep=off');
    } else {
      await this.us.click();
      await expect(this.page).toHaveURL('https://www.stage.adobe.com/products/photoshop.html?georouting=off&mep=off');
    }
  }

// ==================== Mobile ==================== //
  // U-Nav
  async validatingUnavMobile() {
    const elements = [this.hamburgerMenu, this.adobelogo, this.appSwitcher, this.signIn];
    await Promise.all(elements.map(async (element) => {
      await expect(element).toBeVisible();
      await this.page.waitForTimeout(5000);
    }));
  }

  // Hambuger Menu
  async validatingHamburgerMenu() {
    await this.hamburgerMenu.click();

    const elements = [this.adobeLogoMegaMenu, this.closeMegaMenu, this.breadHome, this.breadAdobeCC, this.breadPhotoshop,
      this.creativityAndDesignTitle];
    await Promise.all(elements.map(async (element) => {
      await expect(element).toBeVisible();
    }));

    const elementsToCheck = [
      { element: this.shopFor, conditions: { defaultVisibility: true } },
      { element: this.featuredProductsNN, conditions: { defaultVisibility: true } },
      { element: this.onlineToolsCCNN, conditions: { defaultVisibility: true } },
      { element: this.more, conditions: { defaultVisibility: true } },
    ];
    await Promise.all(elementsToCheck.map(async ({ element, conditions }) => {
      if (conditions.defaultVisibility) {
        await expect(element).toBeVisible();
      }
    }));

    await this.featuredProductsNN.click();
    await this.onlineToolsCCNN.click();
    await this.more.click();
    await this.shopFor.click();

    await this.closeMegaMenu.click();
  }

  // L-Nav Elements
  async validatingLnavElements() {
    await this.mobPhotoshopDropdown.click();
    await expect(this.mobOverview).toBeVisible();
    await this.mobFeatures.click();
    await this.page.goBack();
    await this.mobPhotoshopDropdown.click();
    await this.mobMobile.click();
    await this.page.goBack();
    await this.mobPhotoshopDropdown.click();
    await this.mobComparePlans.click();
    await this.page.goBack();
  }

  // Creativity & Design
  async validatingCreativityAndDesign(country) {
    await this.hamburgerMenu.click();
    await this.creativityAndDesign.click();

    const elementsToCheck = [
      { element: this.shopFor, conditions: { defaultVisibility: true } },
      { element: this.featuredProductsNN, conditions: { defaultVisibility: true } },
      { element: this.onlineToolsCCNN, conditions: { defaultVisibility: true } },
      { element: this.more, conditions: { defaultVisibility: true } },
    ];
    await Promise.all(elementsToCheck.map(async ({ element, conditions }) => {
      if (conditions.excludeCountries && conditions.excludeCountries.includes(country)) {
        await expect(element).not.toBeVisible();
      } else if (conditions.defaultVisibility) {
        await expect(element).toBeVisible();
      }
    }));

    const skipCountries = ['United Kingdom', 'India', 'Spain'];
    const addCountries = ['United Kingdom', 'India', 'Spain'];

    if (!skipCountries.includes(country)) {
      await this.creativityAndDesignElements(country);
    } else if (addCountries.includes(country)) {
      await this.quickActionsElements(country);
    } else {
      await expect(this.whatIsCCMob).toBeVisible();
    }
  }

  async creativityAndDesignElements(country) {
    await this.page.waitForTimeout(1000);
    await this.shopFor.click();
    const elementsToCheck = [
      { element: this.whatIsCCMob, conditions: { defaultVisibility: true } },
    ];

    await Promise.all(elementsToCheck.map(async ({ element, conditions }) => {
      if (conditions.excludeCountries && conditions.excludeCountries.includes(country)) {
        await expect(element).not.toBeVisible();
      } else if (conditions.defaultVisibility) {
        await expect(element).toBeVisible();
      }
    }));
  }

  async quickActionsElements(country) {
    await this.quickActions.click();
    const elementsToCheck = [
      { element: this.whatIsCCMob, conditions: { defaultVisibility: true, excludeCountries: ['India'] } },
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
}
