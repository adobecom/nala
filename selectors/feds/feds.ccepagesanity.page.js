import { expect } from '@playwright/test';
import FedsFooter from './feds.footer.page.js';

export default class CreativeCloudEnterpriseSanity {
  constructor(page) {
    this.page = page;
    this.footer = new FedsFooter(page);

    // U-Nav Elements
    this.adobe = page.locator('.feds-brand');
    this.appSwitcher = page.locator('#unav-app-switcher');
    this.signInButton = page.locator('#unav-profile div');
    this.hamburgerMenu = page.locator('.feds-toggle');

    this.creativityAndDesign = page.locator('.feds-navItem:nth-child(1) button');
    this.creativeCloudForBusiness = page.locator('.feds-navItem:nth-child(2) a');
    this.products = page.locator('.feds-navItem:nth-child(3) button');
    this.resources = page.locator('.feds-navItem:nth-child(4) button');
    this.adminConsole = page.locator('.feds-navItem:nth-child(5) a');
    this.comparePlans = page.locator('.feds-navItem:nth-child(6) a');
    this.freeTrial = page.locator('.feds-navItem:nth-child(7) a');
    this.contactSales = page.locator('.feds-navItem:nth-child(8)');
    this.contactNumber = page.locator('.feds-navItem:nth-child(9) a');

    this.solutions = page.locator('.feds-menu-column').nth(5);
    this.featuredProducts = page.locator('.feds-menu-column').nth(6);
    this.more = page.locator('.feds-menu-column').nth(7);

    this.learn = page.locator('.feds-menu-column').nth(8);
    this.support = page.locator('.feds-menu-column').nth(9);

    this.shopForFooter = page.locator('.feds-menu-section').nth(6);
    this.forBusinessFooter = page.locator('.feds-menu-section').nth(7);
    this.forEducationFooter = page.locator('.feds-menu-section').nth(8);
    this.forMobileFooter = page.locator('.feds-menu-section').nth(9);
    this.experienceCloudFooter = page.locator('.feds-menu-section').nth(10);
    this.supportFooter = page.locator('.feds-menu-section').nth(11);
    this.resourcesFooter = page.locator('.feds-menu-section').nth(12);
    this.adobeAcrobatFooter = page.locator('.feds-menu-section').nth(13);
    this.adobeFooter = page.locator('.feds-menu-section').nth(14);

    // Creativity & Design Elements
    this.whatIsCC = page.locator('.feds-popup [href*="creativecloud.html"]').nth(0);
    this.photographers = page.locator('.feds-popup [href*="photography.html"]').nth(0);
    this.studentsAndTeachers = page.locator('.feds-popup [href*="students.html"]');
    this.individuals = page.locator('.feds-popup [href*="creativecloud/all-apps.html"]').nth(0);
    this.business = page.locator('.feds-popup [href*="business.html"]');
    this.schoolsAndUniversities = page.locator('.feds-popup [href*="education.html"]');
    this.viewPlansAndPricing = page.locator('.feds-popup [href*="creativecloud/plans.html"]');

    this.acrobatPro = page.locator('.feds-popup [href*="J7XBWKC4&mv=other"]');
    this.governmentAgencies = page.locator('.feds-popup [href*="government.html"]');
    this.benifitsForCC = page.locator('.feds-popup [href*="cc-paid-member-benefits.html"]');
    this.seeAllProducts = page.locator('.feds-popup [href*="JVLHVXNY&mv=other"]');
    this.adobeExpressEs = page.locator('[href*="promoid=J469WP35&mv=other"]');
    this.adobeStockEs = page.locator('.feds-popup [href*="JQVGW2DZ&mv=other"]');

    this.photoshop = page.locator('.feds-popup [href*="products/photoshop.html"]');
    this.adobeExpress = page.locator('.feds-popup [href*="Y69SGP43&mv=other"]');
    this.lightroom = page.locator('.feds-popup [href*="photoshop-lightroom.html"]');
    this.illustrator = page.locator('.feds-popup [href*="products/illustrator.html"]');
    this.premierePro = page.locator('.feds-popup [href*="products/premiere.html"]');
    this.adobeStock = page.locator('.feds-popup [href*="stock.adobe.com"]');
    this.viewAllProducts = page.locator('.feds-popup [href*="category=creativity-design"]');

    this.photo = page.locator('.feds-popup [href*="D8F91JW4&mv=other"]');
    this.graphicDesign = page.locator('.feds-popup [href*="design.html"]');
    this.video = page.locator('.feds-popup [href*="video.html"]');
    this.illustratorEx = page.locator('.feds-popup [href*="illustration.html"]');
    this.socialMedia = page.locator('.feds-popup [href*="social-media.html"]');
    this.threeDAndAR = page.locator('.feds-popup [href*="3d"]').nth(0);
    this.pdf = page.locator('.feds-popup [href$="acrobat-pro-cc.html"]');

    this.aiOverview = page.locator('.feds-popup [href*="ai/overview.html"]');
    this.adobeFirefly = page.locator('.feds-popup [href*="products/firefly.html"]');
    this.adobeFireFlyTwo = page.locator('.feds-popup [href*="generative-ai/firefly.html"]');
    this.goToSpecialOffers = page.locator('.feds-popup [href*="special-offers.html"]');

    this.adobecom = page.locator('.feds-crossCloudMenu-item [href*="/"]').nth(0);
    this.pdfAndESignature = page.locator('.feds-crossCloudMenu-item [href*="acrobat.html"]');
    this.marketingAndCommerce = page.locator('.feds-crossCloudMenu-item [href*="business.adobe.com"]');
    this.helpAndSupport = page.locator('.feds-crossCloudMenu-item [href*="support.html"]');

    this.removeBackground = page.locator('[href*="KCJMVG5Q&mv=other"]');
    this.resizeImage = page.locator('[href*="GVTYXXVD&mv=other"]');
    this.covertImageToSVG = page.locator('[href*="K42KVPMS&mv=other"]');
    this.covertVideoToGIF = page.locator('[href*="JZBJVTCT&mv=other"]');
    this.createQRCode = page.locator('[href*="KH8NVBFP&mv=other"]');
    this.seeAllQuickActions = page.locator('[href*="H822XKN9&mv=other"]');

    this.resume = page.locator('[href*="GMCWY715&mv=other"]');
    this.posters = page.locator('[href*="FZPQYTPB&mv=other"]');
    this.card = page.locator('[href*="GVTYXYK3&mv=other"]');
    this.instagramPost = page.locator('[href*="7DRZ6CYM&mv=other"]');
    this.youTubeVideo = page.locator('[href*="7JJ1687L&mv=other"]');
    this.createNow = page.locator('[href*="J7XBWKS1&mv=other"]');

    this.threeDAndARUS = page.locator('.feds-popup [href*="substance3d"]').nth(0);
    this.adobeExpressIn = page.locator('[href*="HCS3XGLY&mv=other"]');
    this.seePlansAndPricing = page.locator('.feds-cta-wrapper [href*="WXYGHWCC&mv=other"]');

    this.quickActions = page.locator('.feds-menu-headline').nth(0);

    // Product Elements
    this.creativeCloudForTeamsPro = page.locator('.feds-popup [href*="business/teams.html"]');
    this.photoshopPro = page.locator('.feds-popup [href*="teams/photoshop.html"]');
    this.substanceThreeDPro = page.locator('.feds-popup [href*="collection-for-teams.html"]');

    // Resource Elements
    this.resourceCenter = page.locator('.feds-popup [href*="resources/main.html"]').nth(0);
    this.helpCenter = page.locator('.feds-popup [href*="enterprise/teams.html"]');
  }

  // UNAV
  async validatingUnavElements(country) {
    const elementsToCheck = [
      { element: this.adobe, conditions: { defaultVisibility: true } },
      { element: this.appSwitcher, conditions: { defaultVisibility: true } },
      { element: this.signInButton, conditions: { defaultVisibility: true } },
      { element: this.creativityAndDesign, conditions: { defaultVisibility: true } },
      { element: this.creativeCloudForBusiness, conditions: { defaultVisibility: true } },
      { element: this.products, conditions: { defaultVisibility: true } },
      { element: this.resources, conditions: { defaultVisibility: true } },
      { element: this.adminConsole, conditions: { defaultVisibility: true } },
      { element: this.comparePlans, conditions: { defaultVisibility: true } },
      { element: this.freeTrial, conditions: { defaultVisibility: true } },
      { element: this.contactSales, conditions: { defaultVisibility: true } },
      { element: this.contactNumber, conditions: { includeCountries: ['United States'] } },
    ];

    await Promise.all(elementsToCheck.map(async ({ element, conditions }) => {
      if (conditions.includeCountries && conditions.includeCountries.includes(country)) {
        await expect(element).toBeVisible();
      } else if (conditions.defaultVisibility) {
        await expect(element).toBeVisible();
      }
    }));
  }

  // Creativity & Design
  async validatingCreativityAndDesignElements(country) {
    await this.creativityAndDesign.click();
    const elementsToCheck = [
      { element: this.whatIsCC, conditions: { defaultVisibility: true } },
      { element: this.photographers, conditions: { defaultVisibility: true, excludeCountries: ['India'] } },
      { element: this.studentsAndTeachers, conditions: { defaultVisibility: true, excludeCountries: ['India'] } },
      { element: this.individuals, conditions: { defaultVisibility: true, excludeCountries: ['Germany', 'France', 'India'] } },
      { element: this.business, conditions: { defaultVisibility: true, excludeCountries: ['India'] } },
      {
        element: this.schoolsAndUniversities,
        conditions: { defaultVisibility: true, excludeCountries: ['Spain', 'India'] },
      },
      { element: this.viewPlansAndPricing, conditions: { defaultVisibility: true } },
      { element: this.photoshop, conditions: { defaultVisibility: true, includeCountries: ['India'] } },
      { element: this.adobeExpress, conditions: { defaultVisibility: true, excludeCountries: ['Spain', 'India'] } },
      { element: this.lightroom, conditions: { defaultVisibility: true, excludeCountries: ['Spain', 'India'] } },
      { element: this.illustrator, conditions: { defaultVisibility: true, includeCountries: ['India'] } },
      { element: this.premierePro, conditions: { defaultVisibility: true, includeCountries: ['India'] } },
      { element: this.adobeStock, conditions: { defaultVisibility: true, excludeCountries: ['India'] } },
      { element: this.viewAllProducts, conditions: { defaultVisibility: true, excludeCountries: ['Spain', 'India'] } },
      { element: this.photo, conditions: { defaultVisibility: true, excludeCountries: ['India'] } },
      { element: this.graphicDesign, conditions: { defaultVisibility: true, excludeCountries: ['India'] } },
      { element: this.video, conditions: { defaultVisibility: true, excludeCountries: ['India'] } },
      { element: this.illustratorEx, conditions: { defaultVisibility: true, excludeCountries: ['India'] } },
      { element: this.threeDAndAR, conditions: { defaultVisibility: true, excludeCountries: ['India'] } },
      { element: this.pdf, conditions: { defaultVisibility: true, excludeCountries: ['India'] } },
      { element: this.aiOverview, conditions: { defaultVisibility: true, excludeCountries: ['Japan'] } },
      { element: this.adobeFirefly, conditions: { defaultVisibility: true, excludeCountries: ['Japan'] } },
      { element: this.adobeFireFlyTwo, conditions: { includeCountries: ['Japan'] } },
      { element: this.adobecom, conditions: { defaultVisibility: true } },
      { element: this.pdfAndESignature, conditions: { defaultVisibility: true } },
      { element: this.marketingAndCommerce, conditions: { defaultVisibility: true } },
      { element: this.helpAndSupport, conditions: { defaultVisibility: true } },
      { element: this.acrobatPro, conditions: { includeCountries: ['Spain'] } },
      { element: this.adobeExpressEs, conditions: { includeCountries: ['Spain'] } },
      { element: this.adobeStockEs, conditions: { includeCountries: ['Spain'] } },
      { element: this.benifitsForCC, conditions: { includeCountries: ['Japan'] } },
      { element: this.goToSpecialOffers, conditions: { includeCountries: ['Spain'] } },
      { element: this.governmentAgencies, conditions: { includeCountries: ['Japan'] } },
      { element: this.seeAllProducts, conditions: { includeCountries: ['Spain'] } },
      { element: this.threeDAndARUS, conditions: { includeCountries: ['United States'] } },

      { element: this.removeBackground, conditions: { includeCountries: ['India'] } },
      { element: this.resizeImage, conditions: { includeCountries: ['India'] } },
      { element: this.covertImageToSVG, conditions: { includeCountries: ['India'] } },
      { element: this.covertVideoToGIF, conditions: { includeCountries: ['India'] } },
      { element: this.createQRCode, conditions: { includeCountries: ['India'] } },
      { element: this.seeAllQuickActions, conditions: { includeCountries: ['India'] } },
      { element: this.resume, conditions: { includeCountries: ['India'] } },
      { element: this.posters, conditions: { includeCountries: ['India'] } },
      { element: this.card, conditions: { includeCountries: ['India'] } },
      { element: this.instagramPost, conditions: { includeCountries: ['India'] } },
      { element: this.youTubeVideo, conditions: { includeCountries: ['India'] } },
      { element: this.createNow, conditions: { includeCountries: ['India'] } },
      { element: this.whatIsCC, conditions: { includeCountries: ['India'] } },
      { element: this.adobeExpressIn, conditions: { includeCountries: ['India'] } },
      { element: this.seePlansAndPricing, conditions: { includeCountries: ['India'] } },
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
    await this.products.click();
    const elements = [this.creativeCloudForTeamsPro, this.photoshopPro, this.substanceThreeDPro];
    await Promise.all(elements.map(async (element) => {
      await expect(element).toBeVisible();
    }));
    await this.products.click();
  }

  // Resources
  async validatingResourceElements() {
    await this.resources.click();
    const elements = [this.resourceCenter, this.helpCenter];
    await Promise.all(elements.map(async (element) => {
      await expect(element).toBeVisible();
    }));
    await this.resources.click();
  }

  // Footer
  async validatingFooterElements() {
    await this.footer.changeRegionButton.scrollIntoViewIfNeeded();
    const elements = [this.footer.footerCreativeCloud, this.footer.footerCreativeCloudForBusiness, this.footer.footerAbout,
      this.footer.footerDiscountsForStudentsAndTeachers, this.footer.footerAppsforiOS, this.footer.footerWhatIsExperienceCloud,
      this.footer.footerDownloadAndInstall, this.footer.footerAdobeBlogSecond, this.footer.footerLogInToYourAccount,
      this.footer.footerAdobeAcrobatReaderlogo, this.footer.footerAdobeExpresslogo, this.footer.footerPhotoshoplogo,
      this.footer.footerIllustratorlogo, this.footer.changeRegionButton, this.footer.facebookIcon, this.footer.instagramIcon,
      this.footer.twitterIcon, this.footer.linkedInIcon, this.footer.legalCopyright, this.footer.privacyLink, this.footer.termsOfUseLink,
      this.footer.cookiePreferencesLink, this.footer.protectMyPersonalData, this.footer.adChoicesLink, this.footer.adChoicesLogo];
    await Promise.all(elements.map(async (element) => {
      await expect(element).toBeVisible();
    }));
  }

  // Mobile Methods

  // U-Nav
  async validatingUnav() {
    const elements = [this.hamburgerMenu, this.adobe, this.appSwitcher, this.signInButton];
    await Promise.all(elements.map(async (element) => {
      await expect(element).toBeVisible();
    }));
  }

  // Creativity & Design
  async validatingCreativityAndDesign(country) {
    await this.hamburgerMenu.click();

    const skipCountries = ['United Kingdom', 'India', 'Spain'];
    const addCountries = ['United Kingdom', 'India', 'Spain'];

    if (!skipCountries.includes(country)) {
      await this.creativityAndDesignElements(country);
    } else if (addCountries.includes(country)) {
      await this.quickActionsElements(country);
    }

    await this.creativityAndDesign.click();
  }

  async creativityAndDesignElements(country) {
    await this.creativityAndDesign.click();
    const elementsToCheck = [
      { element: this.whatIsCC, conditions: { defaultVisibility: true } },
      { element: this.photographers, conditions: { defaultVisibility: true, excludeCountries: ['India'] } },
      { element: this.studentsAndTeachers, conditions: { defaultVisibility: true, excludeCountries: ['India'] } },
      {
        element: this.individuals,
        conditions: { defaultVisibility: true, excludeCountries: ['Germany', 'France', 'Italy'] },
      },
      { element: this.business, conditions: { defaultVisibility: true, excludeCountries: ['India'] } },
      {
        element: this.schoolsAndUniversities,
        conditions: { defaultVisibility: true, excludeCountries: ['India', 'Spain'] },
      },
      {
        element: this.viewPlansAndPricing,
        conditions: { defaultVisibility: true, excludeCountries: ['India', 'Spain'] },
      },
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
    await this.creativityAndDesign.click();
    await this.quickActions.click();
    const elementsToCheck = [
      { element: this.whatIsCC, conditions: { defaultVisibility: true, excludeCountries: ['India'] } },
      { element: this.photoshop, conditions: { defaultVisibility: true, excludeCountries: ['India'] } },
      { element: this.adobeExpress, conditions: { defaultVisibility: true, excludeCountries: ['India', 'Spain'] } },
      { element: this.lightroom, conditions: { defaultVisibility: true, excludeCountries: ['India', 'Spain'] } },
      { element: this.illustrator, conditions: { defaultVisibility: true, excludeCountries: ['India'] } },
      { element: this.premierePro, conditions: { defaultVisibility: true, excludeCountries: ['India'] } },
      { element: this.adobeStock, conditions: { defaultVisibility: true, excludeCountries: ['India'] } },
      { element: this.viewPlansAndPricing, conditions: { includeCountries: ['United Kingdom'] } },
      { element: this.acrobatPro, conditions: { includeCountries: ['Spain'] } },
      { element: this.adobeStockEs, conditions: { includeCountries: ['Spain'] } },
      { element: this.seeAllProducts, conditions: { includeCountries: ['Spain'] } },
      { element: this.removeBackground, conditions: { includeCountries: ['India'] } },
      { element: this.resizeImage, conditions: { includeCountries: ['India'] } },
      { element: this.covertImageToSVG, conditions: { includeCountries: ['India'] } },
      { element: this.covertVideoToGIF, conditions: { includeCountries: ['India'] } },
      { element: this.createQRCode, conditions: { includeCountries: ['India'] } },
      { element: this.seeAllQuickActions, conditions: { includeCountries: ['India'] } },
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
  async validatingProduct() {
    await this.products.click();
    await this.solutions.click();
    await expect(this.creativeCloudForTeamsPro).toBeVisible();
    await this.featuredProducts.click();
    await expect(this.photoshopPro).toBeVisible();
    await this.more.click();
    await expect(this.substanceThreeDPro).toBeVisible();
    await this.products.click();
  }

  // Resources
  async validatingResources() {
    await this.resources.click();
    await this.learn.click();
    await expect(this.resourceCenter).toBeVisible();
    await this.support.click();
    await expect(this.helpCenter).toBeVisible();
    await this.hamburgerMenu.click();
  }

  // Footer
  async validatingFooter() {
    await this.footer.changeRegionButton.scrollIntoViewIfNeeded();

    const elements = [this.footer.changeRegionButton, this.footer.facebookIcon, this.footer.twitterIcon,
      this.footer.linkedInIcon, this.footer.legalCopyright, this.footer.privacyLink, this.footer.termsOfUseLink,
      this.footer.cookiePreferencesLink, this.footer.protectMyPersonalData, this.footer.adChoicesLink,
      this.footer.adChoicesLogo, this.footer.instagramIcon];

    await Promise.all(elements.map(async (element) => {
      expect(element).toBeVisible();
    }));

    await this.shopForFooter.click();
    await expect(this.footer.footerCreativeCloud).toBeVisible();
    await this.forBusinessFooter.click();
    await expect(this.footer.footerCreativeCloudForBusiness).toBeVisible();
    await this.forEducationFooter.click();
    await expect(this.footer.footerDiscountsForStudentsAndTeachers).toBeVisible();
    await this.forMobileFooter.click();
    await expect(this.footer.footerAppsforiOS).toBeVisible();
    await this.experienceCloudFooter.click();
    await expect(this.footer.footerWhatIsExperienceCloud).toBeVisible();
    await this.supportFooter.click();
    await expect(this.footer.footerDownloadAndInstall).toBeVisible();
    await this.resourcesFooter.click();
    await expect(this.footer.footerAdobeBlogSecond).toBeVisible();
    await this.adobeAcrobatFooter.click();
    await expect(this.footer.footerLogInToYourAccount).toBeVisible();
    await this.adobeFooter.click();
    await expect(this.footer.footerAbout).toBeVisible();
  }

  // Tab & iPad Methods

  async validatingCreativityAndDesignElementsiPadTab(country) {
    await this.creativityAndDesign.click();
    const elementsToCheck = [
      { element: this.whatIsCC, conditions: { defaultVisibility: true } },
      { element: this.photographers, conditions: { defaultVisibility: true, excludeCountries: ['India'] } },
      { element: this.studentsAndTeachers, conditions: { defaultVisibility: true, excludeCountries: ['India'] } },
      { element: this.individuals, conditions: { defaultVisibility: true, excludeCountries: ['Germany', 'France', 'India'] } },
      { element: this.business, conditions: { defaultVisibility: true, excludeCountries: ['India'] } },
      {
        element: this.schoolsAndUniversities,
        conditions: { defaultVisibility: true, excludeCountries: ['Spain', 'India'] },
      },
      { element: this.viewPlansAndPricing, conditions: { defaultVisibility: true } },
      { element: this.photoshop, conditions: { defaultVisibility: true, includeCountries: ['India'] } },
      { element: this.adobeExpress, conditions: { defaultVisibility: true, excludeCountries: ['Spain', 'India'] } },
      { element: this.lightroom, conditions: { defaultVisibility: true, excludeCountries: ['Spain', 'India'] } },
      { element: this.illustrator, conditions: { defaultVisibility: true, includeCountries: ['India'] } },
      { element: this.premierePro, conditions: { defaultVisibility: true, includeCountries: ['India'] } },
      { element: this.adobeStock, conditions: { defaultVisibility: true, excludeCountries: ['India'] } },
      { element: this.viewAllProducts, conditions: { defaultVisibility: true, excludeCountries: ['Spain', 'India'] } },
      { element: this.photo, conditions: { defaultVisibility: true, excludeCountries: ['India'] } },
      { element: this.graphicDesign, conditions: { defaultVisibility: true, excludeCountries: ['India'] } },
      { element: this.video, conditions: { defaultVisibility: true, excludeCountries: ['India'] } },
      { element: this.illustratorEx, conditions: { defaultVisibility: true, excludeCountries: ['India'] } },
      { element: this.threeDAndAR, conditions: { defaultVisibility: true, excludeCountries: ['India'] } },
      { element: this.pdf, conditions: { defaultVisibility: true, excludeCountries: ['India'] } },
      { element: this.aiOverview, conditions: { defaultVisibility: true, excludeCountries: ['Japan'] } },
      { element: this.adobeFirefly, conditions: { defaultVisibility: true, excludeCountries: ['Japan'] } },
      { element: this.adobeFireFlyTwo, conditions: { includeCountries: ['Japan'] } },

      { element: this.acrobatPro, conditions: { includeCountries: ['Spain'] } },
      { element: this.adobeExpressEs, conditions: { includeCountries: ['Spain'] } },
      { element: this.adobeStockEs, conditions: { includeCountries: ['Spain'] } },
      { element: this.benifitsForCC, conditions: { includeCountries: ['Japan'] } },
      { element: this.goToSpecialOffers, conditions: { includeCountries: ['Spain'] } },
      { element: this.governmentAgencies, conditions: { includeCountries: ['Japan'] } },
      { element: this.seeAllProducts, conditions: { includeCountries: ['Spain'] } },
      { element: this.threeDAndARUS, conditions: { includeCountries: ['United States'] } },

      { element: this.removeBackground, conditions: { includeCountries: ['India'] } },
      { element: this.resizeImage, conditions: { includeCountries: ['India'] } },
      { element: this.covertImageToSVG, conditions: { includeCountries: ['India'] } },
      { element: this.covertVideoToGIF, conditions: { includeCountries: ['India'] } },
      { element: this.createQRCode, conditions: { includeCountries: ['India'] } },
      { element: this.seeAllQuickActions, conditions: { includeCountries: ['India'] } },
      { element: this.resume, conditions: { includeCountries: ['India'] } },
      { element: this.posters, conditions: { includeCountries: ['India'] } },
      { element: this.card, conditions: { includeCountries: ['India'] } },
      { element: this.instagramPost, conditions: { includeCountries: ['India'] } },
      { element: this.youTubeVideo, conditions: { includeCountries: ['India'] } },
      { element: this.createNow, conditions: { includeCountries: ['India'] } },
      { element: this.whatIsCC, conditions: { includeCountries: ['India'] } },
      { element: this.adobeExpressIn, conditions: { includeCountries: ['India'] } },
      { element: this.seePlansAndPricing, conditions: { includeCountries: ['India'] } },
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
