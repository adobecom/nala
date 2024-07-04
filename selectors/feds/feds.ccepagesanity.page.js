import { expect } from '@playwright/test';

export default class CreativeCloudEnterpriseSanity {
  constructor(page) {
    this.page = page;

    // U-Nav Elements
    this.adobe = page.locator('.feds-brand');
    this.appSwitcher = page.locator('#unav-app-switcher');
    this.signInButton = page.locator('#unav-profile div');

    this.creativityAndDesign = page.locator('.feds-navItem:nth-child(1) button');
    this.creativeCloudForBusiness = page.locator('.feds-navItem:nth-child(2) a');
    this.products = page.locator('.feds-navItem:nth-child(3) button');
    this.resources = page.locator('.feds-navItem:nth-child(4) button');
    this.adminConsole = page.locator('.feds-navItem:nth-child(5) a');
    this.comparePlans = page.locator('.feds-navItem:nth-child(6) a');
    this.freeTrial = page.locator('.feds-navItem:nth-child(7) a');
    this.contactSales = page.locator('.feds-navItem:nth-child(8)');
    this.contactNumber = page.locator('.feds-navItem:nth-child(9) a');

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
    this.threeDAndAR = page.locator('.feds-popup [href*="3d-ar.html"]');
    this.pdf = page.locator('.feds-popup [href$="acrobat-pro-cc.html"]');

    this.aiOverview = page.locator('.feds-popup [href*="ai/overview.html"]');
    this.adobeFirefly = page.locator('.feds-popup [href*="products/firefly.html"]');
    this.adobeFireFlyTwo = page.locator('.feds-popup [href*="generative-ai/firefly.html"]');
    this.goToSpecialOffers = page.locator('.feds-popup [href*="special-offers.html"]');

    this.corporateInquiries = page.locator('.feds-popup [href*="tel:"]');

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

    // Product Elements
    this.creativeCloudForTeamsPro = page.locator('.feds-popup [href*="business/teams.html"]');
    this.photoshopPro = page.locator('.feds-popup [href*="teams/photoshop.html"]');
    this.substanceThreeDPro = page.locator('.feds-popup [href*="collection-for-teams.html"]');

    // Resource Elements
    this.resourceCenter = page.locator('.feds-popup [href*="resources/main.html"]').nth(0);
    this.helpCenter = page.locator('.feds-popup [href*="enterprise/teams.html"]');

    // Footer
    this.footerCreativeCloud = page.locator('.feds-footer-wrapper a[href*="creativecloud.html"]');
    this.footerCreativeCloudForBusiness = page.locator('.feds-footer-wrapper a[href*="creativecloud/business.html"]');
    this.footerdiscountForStudentsAndTeachers = page.locator('.feds-footer-wrapper a[href*="students.html"]');
    this.footerappsForiOS = page.locator('.feds-footer-wrapper a[href*="id852473028"]');
    this.footerWhatIsExperienceCloud = page.locator('.feds-footer-wrapper a[href*="business.adobe.com"]').nth(0);
    this.footerWhatIsExperienceCloudTwo = page.locator('.feds-footer-wrapper a[href*="experience-cloud.html"]');
    this.footerDownloadAndInstall = page.locator('.feds-footer-wrapper a[href*="download-install.html"]');
    this.footerAdobeBlog = page.locator('.feds-footer-wrapper a[href*="blog.adobe.com"]');
    this.footerLoginToYourAccount = page.locator('.feds-footer-wrapper a[href*="account.adobe.com"]').nth(0);
    this.footerAbout = page.locator('.feds-footer-wrapper a[href*="about-adobe.html"]').nth(0);

    // Featured Products
    this.footerAdobeAcrobatReaderlogo = page.locator('a[href$="reader/"]');
    this.footerAdobeExpresslogo = page.locator('a[href$="Z2G1FSYV&mv=other"]:nth-of-type(2)');
    this.footerPhotoshoplogo = page.locator('a[href$="photoshop/free-trial-download.html"]');
    this.footerIllustratorlogo = page.locator('a[href$="illustrator/free-trial-download.html"]');

    // Change Region and social media
    this.changeRegion = page.locator('.feds-regionPicker-wrapper');
    this.facebookLogo = page.locator('a[href*="facebook"]');
    this.instagramLogo = page.locator('a[href*="instagram.com"]');
    this.twitterlogo = page.locator('a[href*="twitter"]');
    this.linkedinLogo = page.locator('a[href*="linkedin"]');
    this.copyright = page.locator('.feds-footer-legalWrapper>p>span');
    this.privacyPolicy = page.locator('.feds-footer-legalWrapper a:nth-of-type(1)');
    this.termsOfUse = page.locator('.feds-footer-legalWrapper a:nth-of-type(2)');
    this.cookies = page.locator('.feds-footer-legalWrapper a:nth-of-type(3)');
    this.protectMyPersonalData = page.locator('.feds-footer-legalWrapper a:nth-of-type(4)');
    this.adChoices = page.locator('.feds-footer-legalWrapper a:nth-of-type(5)');
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
      { element: this.contactNumber, conditions: { defaultVisibility: true, excludeCountries: ['Australia'] } },
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
    await this.creativityAndDesign.click();
    const elementsToCheck = [
      { element: this.whatIsCC, conditions: { defaultVisibility: true, includeCountries: ['Germany'] } },
      { element: this.photographers, conditions: { defaultVisibility: true, excludeCountries: ['India'] } },
      { element: this.studentsAndTeachers, conditions: { defaultVisibility: true, excludeCountries: ['India'] } },
      {
        element: this.individuals,
        conditions: {
          defaultVisibility: true,
          excludeCountries: ['Germany', 'France', 'Thailand', 'Thailand English'],
        },
      },
      { element: this.business, conditions: { defaultVisibility: true, excludeCountries: ['India'] } },
      {
        element: this.schoolsAndUniversities,
        conditions: {
          defaultVisibility: true,
          excludeCountries: ['Spain', 'India'],
        },
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
      { element: this.socialMedia, conditions: { defaultVisibility: true, excludeCountries: ['India'] } },
      {
        element: this.threeDAndAR,
        conditions: {
          defaultVisibility: true,
          excludeCountries: ['United States', 'India'],
        },
      },
      { element: this.pdf, conditions: { defaultVisibility: true, excludeCountries: ['India'] } },
      {
        element: this.aiOverview,
        conditions: {
          defaultVisibility: true,
          excludeCountries: ['Germany', 'France', 'Italy', 'Japan', 'United Kingdom',
            'Middle East And North Africa', 'Spain', 'Canada English', 'Korea', 'Canada French',
            'Poland', 'Indonesia', 'Indonesia English', 'Turkey', 'Thailand English',
            'Thailand', 'Singapore', 'Philippines', 'Philippines English', 'India'],
        },
      },
      {
        element: this.adobeFirefly,
        conditions: {
          defaultVisibility: true,
          excludeCountries: ['Germany', 'France', 'Italy', 'United Kingdom', 'Middle East And North Africa',
            'Japan', 'Canada English', 'Korea', 'Canada French', 'Poland', 'Indonesia', 'Philippines English',
            'Indonesia English', 'Turkey', 'Thailand English', 'Thailand', 'Singapore', 'Philippines', 'India'],
        },
      },
      {
        element: this.adobeFireFlyTwo,
        conditions: {
          includeCountries: ['Germany', 'France', 'Italy', 'United Kingdom', 'Middle East And North Africa',
            'Japan', 'Canada English', 'Korea', 'Canada French', 'Poland', 'Indonesia', 'Philippines English',
            'Indonesia English', 'Turkey', 'Thailand English', 'Thailand', 'Singapore', 'Philippines', 'India'],
        },
      },
      { element: this.adobecom, conditions: { includeCountries: ['United States'] } },
      { element: this.pdfAndESignature, conditions: { includeCountries: ['United States'] } },
      { element: this.marketingAndCommerce, conditions: { includeCountries: ['United States'] } },
      { element: this.helpAndSupport, conditions: { includeCountries: ['United States'] } },
      { element: this.acrobatPro, conditions: { includeCountries: ['Spain'] } },
      { element: this.adobeExpressEs, conditions: { includeCountries: ['Spain'] } },
      { element: this.adobeStockEs, conditions: { includeCountries: ['Spain'] } },
      { element: this.benifitsForCC, conditions: { includeCountries: ['Japan'] } },
      { element: this.corporateInquiries, conditions: { includeCountries: ['Japan'] } },
      {
        element: this.goToSpecialOffers,
        conditions: {
          includeCountries: ['Spain', 'Turkey', 'Thailand English', 'Thailand', 'Philippines',
            'Philippines English'],
        },
      },
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
    await this.changeRegion.scrollIntoViewIfNeeded();
    const elements = [this.footerCreativeCloud, this.footerCreativeCloudForBusiness,
      this.footerdiscountForStudentsAndTeachers, this.footerappsForiOS, this.footerWhatIsExperienceCloud,
      this.footerDownloadAndInstall, this.footerAdobeBlog, this.footerLoginToYourAccount, this.footerAbout,
      this.footerAdobeAcrobatReaderlogo, this.footerAdobeExpresslogo, this.footerPhotoshoplogo,
      this.footerIllustratorlogo, this.changeRegion, this.facebookLogo, this.instagramLogo, this.twitterlogo,
      this.linkedinLogo, this.copyright, this.privacyPolicy, this.termsOfUse, this.cookies,
      this.protectMyPersonalData, this.adChoices];
    await Promise.all(elements.map(async (element) => {
      await expect(element).toBeVisible();
    }));
  }
}
