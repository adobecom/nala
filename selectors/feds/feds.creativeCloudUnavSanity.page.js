import { expect } from '@playwright/test';

export default class CreativeCloudUnavSanity {
  constructor(page) {
    this.page = page;

    // Adobe Brand Logo, appswitcher and signIn button
    this.adobeLogo = page.locator('a.feds-brand');
    this.appSwitcher = page.locator('#unav-app-switcher');
    this.signInButton = page.locator('#unav-profile');
    this.hamburgerMenu = page.locator('.feds-toggle');

    // Promo button
    this.closePromoButton = page.locator('.foreground.container button');

    // U-Nav Elements
    this.creativityAndDesign = page.locator('.feds-navItem:nth-child(1) button');
    this.adobeCreativeCloud = page.locator('.feds-navItem:nth-child(2) a');
    this.explore = page.locator('.feds-navItem:nth-child(3) button');
    this.features = page.locator('.feds-navItem:nth-child(4) a');
    this.forBusiness = page.locator('.feds-navItem:nth-child(5) a');
    this.comparePlans = page.locator('.feds-navItem:nth-child(6) a');
    this.learnAndSupport = page.locator('.feds-navItem:nth-child(7) button');
    this.buyNowButton = page.locator('.feds-cta-wrapper [href*="plans.html"]').nth(1);

    this.photoVideoAndDesign = page.locator('.feds-navItem:nth-child(1) button');
    this.creativeCloud = page.locator('.feds-navItem:nth-child(2) a');
    this.program = page.locator('.feds-navItem:nth-child(3) button');
    this.subjectArea = page.locator('.feds-navItem:nth-child(4) button');
    this.trainingAndSupport = page.locator('.feds-navItem:nth-child(5) button');
    this.pricesAndSubscriptions = page.locator('.feds-navItem:nth-child(6) a');
    this.trainingAndSupportLink = page.locator('.feds-navItem:nth-child(6) button');
    this.aboInfo = page.locator('.feds-navItem:nth-child(7) a');
    this.appRecomendation = page.locator('.feds-navItem:nth-child(8) a');

    this.creativeCloudProducts = page.locator('.feds-menu-headline').nth(0);

    // Creativity & Design
    this.whatIsCC = page.locator('.feds-popup [href*="creativecloud.html"]').nth(0);
    this.photographers = page.locator('.feds-popup [href*="photography.html"]').nth(0);
    this.studentsAndTeachers = page.locator('.feds-popup [href*="students.html"]').nth(0);
    this.individuals = page.locator('.feds-popup [href*="all-apps.html"]').nth(0);
    this.business = page.locator('.feds-popup [href*="business.html"]').nth(0);
    this.schoolsAndUniversities = page.locator('.feds-popup [href*="education.html"]');
    this.forGovernmentAgencies = page.locator('.feds-popup [href*="government.html"]');
    this.benifitsForCreativeCloudPaidMembers = page.locator('.feds-popup [href*="cc-paid-member-benefits.html"]');
    this.viewPlansAndPricing = page.locator('.feds-cta--primary[href$="plans.html"]').nth(0);
    this.seeAllProducts = page.locator('.feds-cta--primary[href*="products/catalog.html"]');

    this.photoshop = page.locator('.feds-popup [href*="products/photoshop.html"]').nth(0);
    this.adobeExpress = page.locator('.feds-popup [href*="express"]').nth(0);
    this.adobePro = page.locator('.feds-popup [href*="products/acrobat-pro-cc.html"]').nth(0);
    this.lightroom = page.locator('.feds-popup [href*="photoshop-lightroom.html"]').nth(0);
    this.illustrator = page.locator('.feds-popup [href*="products/illustrator.html"]').nth(0);
    this.premierePro = page.locator('.feds-popup [href*="products/premiere.html"]').nth(0);
    this.adobeStock = page.locator('.feds-popup [href*="globalnav"]');
    this.viewAllProducts = page.locator('.feds-popup [href*="category=creativity-design"]').nth(0);
    this.seePlansAndPricing = page.locator('.feds-popup [href*="creativecloud/plans.html"]');

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

    this.photo = page.locator('.feds-popup [href*="?promoid=D8F91JW4&mv=other"]');
    this.graphicDesign = page.locator('.feds-menu-items a[href$="/design.html"]');
    this.Video = page.locator('.feds-menu-items a[href$="/video.html"]');
    this.illustration = page.locator('.feds-menu-items a[href$="/illustration.html"]');
    this.socialMedia = page.locator('.feds-menu-items a[href$="/social-media.html"]');
    this.threeDAndAR = page.locator('.feds-popup a[href*="3d"]').nth(0);
    this.pdf = page.locator('.feds-menu-items a[href$="acrobat-pro-cc.html"]');

    this.aiOverviewCC = page.locator('.feds-popup a[href$="ai/overview.html"]');
    this.adobeFirefly = page.locator('.feds-popup a[href$="products/firefly.html"]');
    this.adobeFireflyCC = page.locator('.feds-popup a[href*="firefly.html"]').nth(0);

    this.adobecom = page.locator('.feds-crossCloudMenu-item').nth(0);
    this.pdfAndESignatures = page.locator('.feds-popup a[href$="/acrobat.html"]').nth(0);
    this.marketingAndCommerce = page.locator('.feds-popup a[href*="business.adobe.com"]').nth(0);
    this.helpAndSupport = page.locator('.feds-popup a[href$="support.html"]').nth(0);

    // Explore
    this.graphicDesignExplore = page.locator('.feds-popup a[href$="design.html"]').nth(1);
    this.graphicDesignExploreIn = page.locator('.feds-popup a[href$="design.html"]');

    // Learn & Support
    this.home = page.locator('.feds-popup a[href$="support/creative-cloud.html"]');

    // Program
    this.photoshopPr = page.locator('.feds-popup a[href$="products/photoshop.html"]').nth(1);
    this.photoshopAp = page.locator('.feds-popup a[href$="products/photoshop.html"]');

    // Subject Areas
    this.photoSa = page.locator('.feds-popup a[href$="creativecloud/photography.html"]').nth(1);
    this.photoCa = page.locator('.feds-popup a[href$="creativecloud/photography.html"]');

    // Training & Support
    this.innovations = page.locator('.feds-popup a[href$="creativecloud/features.html"]');

    // Footer
    this.footerCreativeCloud = page.locator('.feds-footer-wrapper a[href*="creativecloud.html"]');
    this.footerCreativeCloudForBusiness = page.locator('.feds-footer-wrapper a[href*="creativecloud/business.html"]');
    this.footerdiscountForStudentsAndTeachers = page.locator('.feds-footer-wrapper a[href*="students.html"]');
    this.footerappsForiOS = page.locator('.feds-footer-wrapper a[href*="id852473028"]');
    this.footerWhatIsExperienceCloud = page.locator('.feds-menu-items a[href*="business.adobe.com"]').nth(0);
    this.footerWhatIsExperienceCloudTwo = page.locator('.feds-menu-items a[href*="experience-cloud.html"]');
    this.footerDownloadAndInstall = page.locator('.feds-footer-wrapper a[href$="download-install.html"]');
    this.footerAdobeBlog = page.locator('.feds-footer-wrapper a[href*="blog.adobe.com/"]');
    this.footerLoginToYourAccount = page.locator('a[href$="account.adobe.com/"]').nth(0);
    this.footerAbout = page.locator('.feds-footer-wrapper a[href$="about-adobe.html"]').nth(0);

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
  async validatingGnav(country) {
    const section1 = ['United States', 'Middle East And North Africa', 'India', 'Canada English', 'Korea',
      'Canada French', 'Poland', 'Australia', 'Indonesia', 'Indonesia English'];
    const section2 = ['Germany', 'United Kingdom', 'Japan', 'Spain', 'Mexico', 'Turkey', 'Thailand'];
    const section3 = ['France'];
    const section4 = ['Italy'];
    const section5 = ['Thailand English', 'Singapore', 'Philippines', 'Philippines English'];

    let elements = [];

    if (section1.includes(country)) {
      elements = [
        this.adobeLogo, this.appSwitcher, this.signInButton, this.creativityAndDesign,
        this.adobeCreativeCloud, this.explore, this.features, this.forBusiness,
        this.comparePlans, this.learnAndSupport, this.buyNowButton,
      ];
    } else if (section2.includes(country)) {
      elements = [
        this.adobeLogo, this.appSwitcher, this.signInButton, this.photoVideoAndDesign,
        this.creativeCloud, this.program, this.subjectArea, this.trainingAndSupport,
        this.pricesAndSubscriptions, this.aboInfo, this.appRecomendation, this.buyNowButton,
      ];
    } else if (section3.includes(country)) {
      elements = [
        this.adobeLogo, this.appSwitcher, this.signInButton, this.creativityAndDesign,
        this.adobeCreativeCloud, this.explore, this.features, this.forBusiness,
        this.trainingAndSupportLink, this.buyNowButton,
      ];
    } else if (section4.includes(country)) {
      elements = [
        this.adobeLogo, this.appSwitcher, this.signInButton, this.photoVideoAndDesign,
        this.creativeCloud, this.program, this.subjectArea, this.trainingAndSupport,
        this.pricesAndSubscriptions, this.aboInfo, this.buyNowButton,
      ];
    } else if (section5.includes(country)) {
      elements = [
        this.adobeLogo, this.appSwitcher, this.signInButton, this.creativityAndDesign,
        this.adobeCreativeCloud, this.explore, this.features, this.forBusiness,
        this.comparePlans, this.learnAndSupport, this.appRecomendation, this.buyNowButton,
      ];
    }

    const visibilityPromises = elements.map((element) => expect(element).toBeVisible());
    await Promise.all(visibilityPromises);
  }

  // Creativity & Design
  async validatingCreativityAndDesign(country) {
    await this.creativityAndDesign.click();

    const elementsToCheck = [
      { element: this.whatIsCC, conditions: { defaultVisibility: true } },
      { element: this.photographers, conditions: { defaultVisibility: true, excludeCountries: ['India'] } },
      {
        element: this.studentsAndTeachers,
        conditions: { defaultVisibility: true, excludeCountries: ['India'] },
      },
      {
        element: this.individuals,
        conditions: { defaultVisibility: true, excludeCountries: ['Germany', 'France'] },
      },
      { element: this.business, conditions: { defaultVisibility: true, excludeCountries: ['India'] } },
      {
        element: this.schoolsAndUniversities,
        conditions: { defaultVisibility: true, excludeCountries: ['India', 'Spain'] },
      },
      { element: this.viewPlansAndPricing, conditions: { defaultVisibility: true } },
      { element: this.photoshop, conditions: { defaultVisibility: true } },
      { element: this.adobeExpress, conditions: { defaultVisibility: true } },
      { element: this.lightroom, conditions: { defaultVisibility: true, excludeCountries: ['India', 'Spain'] } },
      { element: this.illustrator, conditions: { defaultVisibility: true } },
      { element: this.premierePro, conditions: { defaultVisibility: true } },
      { element: this.adobeStock, conditions: { defaultVisibility: true, excludeCountries: ['India', 'Spain'] } },
      { element: this.viewAllProducts, conditions: { defaultVisibility: true, excludeCountries: ['India', 'Spain'] } },
      { element: this.photo, conditions: { defaultVisibility: true, excludeCountries: ['India'] } },
      { element: this.graphicDesign, conditions: { defaultVisibility: true, excludeCountries: ['India'] } },
      { element: this.Video, conditions: { defaultVisibility: true, excludeCountries: ['India'] } },
      { element: this.illustration, conditions: { defaultVisibility: true, excludeCountries: ['India'] } },
      { element: this.socialMedia, conditions: { defaultVisibility: true, excludeCountries: ['India'] } },
      { element: this.threeDAndAR, conditions: { defaultVisibility: true, excludeCountries: ['India'] } },
      { element: this.pdf, conditions: { defaultVisibility: true, excludeCountries: ['India'] } },
      { element: this.aiOverviewCC, conditions: { defaultVisibility: true, excludeCountries: ['Japan'] } },
      { element: this.adobeFirefly, conditions: { defaultVisibility: true, excludeCountries: ['Japan'] } },
      // { element: this.adobecom, conditions: { defaultVisibility: true } },
      // { element: this.pdfAndESignatures, conditions: { defaultVisibility: true } },
      // { element: this.marketingAndCommerce, conditions: { defaultVisibility: true } },
      // { element: this.helpAndSupport, conditions: { defaultVisibility: true } },
      { element: this.forGovernmentAgencies, conditions: { includeCountries: ['Japan'] } },
      { element: this.benifitsForCreativeCloudPaidMembers, conditions: { includeCountries: ['Japan'] } },
      { element: this.adobeFireflyCC, conditions: { includeCountries: ['Japan'] } },
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
      { element: this.adobePro, conditions: { includeCountries: ['Spain'] } },
      { element: this.seeAllProducts, conditions: { includeCountries: ['Spain'] } },
      { element: this.seePlansAndPricing, conditions: { includeCountries: ['Spain'] } },
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

    await this.creativityAndDesign.click();
  }

  // Explore
  async validatingExplore(country) {
    const includeCountries = ['India'];
    if (includeCountries.includes(country)) {
      await this.explore.click();
      await expect(this.graphicDesignExploreIn).toBeVisible();
      await this.explore.click();
    } else {
      await this.explore.click();
      await expect(this.graphicDesignExplore).toBeVisible();
      await this.explore.click();
    }
  }

  // Learn & Support
  async validatingLearnAndSupport() {
    await this.learnAndSupport.click();
    await expect(this.home).toBeVisible();
    await this.learnAndSupport.click();
  }

  // Program
  async validatingProgram(country) {
    const includeCountries = ['Spain'];
    if (includeCountries.includes(country)) {
      await this.program.click();
      await expect(this.photoshopAp).toBeVisible();
      await this.program.click();
    } else {
      await this.program.click();
      await expect(this.photoshopPr).toBeVisible();
      await this.program.click();
    }
  }

  // Subject Area
  async validatingSubjectArea(country) {
    const includeCountries = ['Spain'];
    if (includeCountries.includes(country)) {
      await this.subjectArea.click();
      await expect(this.photoCa).toBeVisible();
      await this.subjectArea.click();
    } else {
      await this.subjectArea.click();
      await expect(this.photoSa).toBeVisible();
      await this.subjectArea.click();
    }
  }

  // Training & Support
  async validatingTrainingAndSupport(country) {
    const includeCountries = ['France'];
    if (includeCountries.includes(country)) {
      await this.trainingAndSupportLink.click();
      await expect(this.home).toBeVisible();
      await this.trainingAndSupportLink.click();
    } else {
      await this.trainingAndSupport.click();
      await expect(this.innovations).toBeVisible();
      await this.trainingAndSupport.click();
    }
  }

  // Clicking on "Buy Now" button
  async validatingBuyNowButton() {
    await this.buyNowButton.click();
    const url = this.page.url();
    console.info('[Validation] URL of Buy Now Page:', url);
    await expect(this.page).toHaveURL(url);
  }

  // Footer
  async validatingFooter() {
    await this.changeRegion.scrollIntoViewIfNeeded();

    const elementsToCheck = [
      this.footerCreativeCloud, this.footerCreativeCloudForBusiness, this.footerdiscountForStudentsAndTeachers,
      this.footerappsForiOS, this.footerDownloadAndInstall, this.footerAdobeBlog, this.footerLoginToYourAccount,
      this.footerAbout, this.footerAdobeAcrobatReaderlogo, this.footerAdobeExpresslogo, this.footerPhotoshoplogo,
      this.footerIllustratorlogo, this.changeRegion, this.facebookLogo, this.instagramLogo, this.twitterlogo,
      this.linkedinLogo, this.copyright, this.privacyPolicy, this.termsOfUse, this.cookies, this.adChoices,
      this.protectMyPersonalData, this.footerWhatIsExperienceCloud,
    ];

    await Promise.all(elementsToCheck.map(async (element) => {
      await expect(element).toBeVisible();
    }));
  }

  // Promo Button
  async closingPromoButton() {
    try {
      await this.closePromoButton.click();
    } catch (error) {
      console.error('Error occurred while clicking the closing the Promo button');
    }
  }

  // Mobile, Tab & iPad methods

  // Gnav
  async validatingUnav() {
    const elements = [this.hamburgerMenu, this.adobeLogo, this.appSwitcher, this.signInButton];
    await Promise.all(elements.map(async (element) => {
      await expect(element).toBeVisible();
    }));
  }

  // Hamburger Menu
  async validatingHamburgerMenu(country) {
    await this.hamburgerMenu.click();

    const section1 = ['United States', 'Middle East And North Africa', 'Canada English', 'Korea',
      'Canada French', 'Poland', 'Australia', 'Indonesia', 'Indonesia English', 'Thailand English',
      'Singapore', 'Philippines', 'Philippines English', 'India'];
    const section2 = ['Germany', 'United Kingdom', 'Japan', 'Spain', 'Mexico', 'Turkey', 'Thailand'];
    const section3 = ['France'];
    const section4 = ['Italy'];

    let elements;

    if (section1.includes(country)) {
      elements = [this.creativityAndDesign, this.adobeCreativeCloud, this.explore, this.features,
        this.forBusiness, this.comparePlans, this.learnAndSupport, this.buyNowButton];
    } else if (section2.includes(country)) {
      elements = [this.photoVideoAndDesign, this.creativeCloud, this.program, this.subjectArea,
        this.trainingAndSupport, this.pricesAndSubscriptions, this.aboInfo, this.appRecomendation, this.buyNowButton];
    } else if (section3.includes(country)) {
      elements = [this.creativityAndDesign, this.adobeCreativeCloud, this.explore, this.features, this.forBusiness,
        this.trainingAndSupportLink, this.buyNowButton];
    } else if (section4.includes(country)) {
      elements = [this.creativityAndDesign, this.creativeCloud, this.program, this.subjectArea, this.trainingAndSupport,
        this.pricesAndSubscriptions, this.aboInfo, this.buyNowButton];
    }

    const visibilityPromises = elements.map((element) => expect(element).toBeVisible());
    await Promise.all(visibilityPromises);
  }

  // Creativity & Design
  async validatingCreativityDesign(country) {
    const skipCountries = ['United Kingdom', 'India', 'Spain'];
    const addCountries = ['United Kingdom', 'India', 'Spain'];

    if (!skipCountries.includes(country)) {
      await this.creativityDesign(country);
    } else if (addCountries.includes(country)) {
      await this.validatingCreativeCloudProducts(country);
    }

    await this.creativityAndDesign.click();
  }

  async creativityDesign(country) {
    await this.creativityAndDesign.click();

    const elementsToCheck = [
      { element: this.whatIsCC, conditions: { defaultVisibility: true } },
      { element: this.photographers, conditions: { defaultVisibility: true } },
      { element: this.studentsAndTeachers, conditions: { defaultVisibility: true } },
      { element: this.individuals, conditions: { defaultVisibility: true, excludeCountries: ['Germany', 'France', 'Italy'] } },
      { element: this.business, conditions: { defaultVisibility: true } },
      { element: this.schoolsAndUniversities, conditions: { defaultVisibility: true } },
      { element: this.viewPlansAndPricing, conditions: { defaultVisibility: true } },
      { element: this.forGovernmentAgencies, conditions: { includeCountries: ['Japan'] } },
      { element: this.benifitsForCreativeCloudPaidMembers, conditions: { includeCountries: ['Japan'] } },
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

  async validatingCreativeCloudProducts(country) {
    await this.creativityAndDesign.click();
    await this.creativeCloudProducts.click();

    const elementsToCheck = [
      { element: this.whatIsCC, conditions: { defaultVisibility: true, excludeCountries: ['India'] } },
      { element: this.photoshop, conditions: { defaultVisibility: true, excludeCountries: ['India'] } },
      { element: this.adobeExpress, conditions: { defaultVisibility: true } },
      { element: this.lightroom, conditions: { defaultVisibility: true, excludeCountries: ['India', 'Spain'] } },
      { element: this.illustrator, conditions: { defaultVisibility: true, excludeCountries: ['India'] } },
      { element: this.premierePro, conditions: { defaultVisibility: true, excludeCountries: ['India'] } },
      { element: this.adobeStock, conditions: { defaultVisibility: true, excludeCountries: ['India', 'Spain'] } },
      { element: this.viewPlansAndPricing, conditions: { defaultVisibility: true } },
      { element: this.adobePro, conditions: { includeCountries: ['Spain'] } },
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

  // Explore
  async validatingExploreSection(country) {
    const includeCountries = ['India'];
    const allowedCountries = ['United States', 'Middle East And North Africa', 'Canada English', 'Korea',
      'Canada French', 'Poland', 'Australia', 'Indonesia', 'Indonesia English', 'Thailand English',
      'Singapore', 'Philippines', 'Philippines English', 'India', 'France'];

    if (allowedCountries.includes(country)) {
      if (includeCountries.includes(country)) {
        await this.explore.click();
        await expect(this.graphicDesignExploreIn).toBeVisible();
        await this.explore.click();
      } else {
        await this.explore.click();
        await expect(this.graphicDesignExplore).toBeVisible();
        await this.explore.click();
      }
    }
  }

  // Learn & Support
  async validatingLearnAndSupportSection(country) {
    const allowedCountries = ['United States', 'Middle East And North Africa', 'Canada English', 'Korea',
      'Canada French', 'Poland', 'Australia', 'Indonesia', 'Indonesia English', 'Thailand English',
      'Singapore', 'Philippines', 'Philippines English', 'India'];

    if (allowedCountries.includes(country)) {
      await this.learnAndSupport.click();
      await expect(this.home).toBeVisible();
      await this.learnAndSupport.click();
    }
  }

  // Program
  async validatingProgramSection(country) {
    const includeCountries = ['Spain'];
    const allowedCountries = ['Germany', 'United Kingdom', 'Japan', 'Spain', 'Mexico', 'Turkey', 'Thailand', 'Italy'];

    if (allowedCountries.includes(country)) {
      if (includeCountries.includes(country)) {
        await this.program.click();
        await expect(this.photoshopAp).toBeVisible();
        await this.program.click();
      } else {
        await this.program.click();
        await expect(this.photoshopPr).toBeVisible();
        await this.program.click();
      }
    }
  }

  // Subject Area
  async validatingSubjectAreaSection(country) {
    const includeCountries = ['Spain'];
    const allowedCountries = ['Germany', 'United Kingdom', 'Japan', 'Spain', 'Mexico', 'Turkey', 'Thailand', 'Italy'];

    if (allowedCountries.includes(country)) {
      if (includeCountries.includes(country)) {
        await this.subjectArea.click();
        await expect(this.photoCa).toBeVisible();
        await this.subjectArea.click();
      } else {
        await this.subjectArea.click();
        await expect(this.photoSa).toBeVisible();
        await this.subjectArea.click();
      }
    }
  }

  // Training & Support
  async validatingTrainingAndSupportSection(country) {
    const includeCountries = ['France'];
    const allowedCountries = ['Germany', 'United Kingdom', 'Japan', 'Spain', 'Mexico', 'Turkey', 'Thailand', 'Italy', 'France'];

    if (allowedCountries.includes(country)) {
      if (includeCountries.includes(country)) {
        await this.trainingAndSupportLink.click();
        await expect(this.home).toBeVisible();
        await this.trainingAndSupportLink.click();
      } else {
        await this.trainingAndSupport.click();
        await expect(this.innovations).toBeVisible();
        await this.trainingAndSupport.click();
      }
    }
  }

  // Footer
  async validatingFooterSection() {
    await this.changeRegion.scrollIntoViewIfNeeded();

    const elements = [this.changeRegion, this.facebookLogo, this.instagramLogo, this.twitterlogo,
      this.linkedinLogo, this.copyright, this.privacyPolicy, this.termsOfUse, this.cookies, this.adChoices,
      this.protectMyPersonalData];

    await Promise.all(elements.map(async (element) => {
      await expect(element).toBeVisible();
    }));
  }
}
