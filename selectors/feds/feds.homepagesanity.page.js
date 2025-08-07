import { expect } from '@playwright/test';

export default class HomePageSanity {
  constructor(page) {
    this.page = page;

    // U-Nav Elements
    this.adobelogo = page.locator('.feds-brand-container .feds-brand');
    this.gnavCC = page.locator('.feds-navItem:nth-child(1)').nth(0);
    this.gnavDC = page.locator('.feds-navItem:nth-child(2)').nth(0);
    this.gnavEC = page.locator('.feds-navItem:nth-child(3)');
    this.gnavHelpX = page.locator('.feds-navItem:nth-child(4)');
    this.appSwitcher = page.locator('.unav-comp-app-switcher');
    this.signInButton = page.locator('#unav-profile');
    this.hamburgerMenu = page.locator('.feds-toggle');
    this.mainMenuCC = page.locator('.main-menu').nth(0);
    this.mainMenuDC = page.locator('.main-menu').nth(1);
    this.mainMenuEC = page.locator('.main-menu').nth(2);
    this.closeMainMenu = page.locator('.close-icon').nth(3);

    this.inTheNews = page.locator('.highlight-row');
    this.readAStory = page.locator('a[href$="next-generation-creators"]');

    // App Switcher Elements
    this.webApps = page.locator('.unav-comp-app-switcher-popover-title');
    this.adobeExpressAS = page.locator('a[href*="D8F91NS"]');
    this.adobeFireflyAs = page.locator('a[href*="DDSB1DXR"]');
    this.acrobatAS = page.locator('a[href*="DRCFIIQN"]');
    this.photoshopAS = page.locator('a[href*="DZTGZS8L"]');
    this.lightroomAS = page.locator('a[href*="DMMD15GP"]');
    this.stockAS = page.locator('a[href$="id=FAKHZNJK&mv=other&mv2=unav"]');
    this.acrobatSignAS = page.locator('a[href*="BWBX2WJT"]');
    this.fontsAS = page.locator('a[href*="DHWC196Q"]');
    this.experienceCloudAS = page.locator('a[href*="F89JZJSJ"]');
    this.adobecomAS = page.locator('a[href$="promoid=FMHMZSLF&mv=other&mv2=unav"]');
    this.allAppsAS = page.locator('a[href$="promoid=FHRLZ9BG&mv=other&mv2=unav"]');

    // Creative Cloud Elements
    this.whatIsCC = page.locator('.feds-popup a[href*="creativecloud.html"]').nth(0);
    this.schoolsAndUniversities = page.locator('.feds-popup a[href$="education.html"]');
    this.viewPlansAndPrices = page.locator('.feds-cta.feds-cta--primary[href*="plans.html"]').nth(0);
    this.photoshop = page.locator('.feds-popup a[href*="photoshop.html"]');
    this.AdobeStock = page.locator('.feds-popup a[href*="stock.adobe.com"]');
    this.photo = page.locator('a[href$="promoid=D8F91JW4&mv=other"]');
    this.pdf = page.locator('a[href$="acrobat-pro-cc.html"]');
    this.aIOverviewCC = page.locator('.feds-popup a[href*="ai/overview.html"]').nth(0);
    this.adobeFirefly = page.locator('a[href*="firefly.html"]').nth(0);
    this.viewPlansAndPricing = page.locator('a[href$="category=creativity-design"]');

    this.individuals = page.locator('.feds-navLink[href*="all-apps.html"]');
    this.companies = page.locator('.feds-navLink[href*="promoid=KH8NV9ZS&mv=other"]');
    this.seeAllProducts = page.locator('.feds-cta.feds-cta--primary[href*="?promoid=JVLHVXNY&mv=other"]');
    this.seePlansAndPrices = page.locator('.feds-cta.feds-cta--secondary[href*="?promoid=KLZPV68R&mv=other"]');
    this.viewAllProductsCC = page.locator('.feds-navLink.feds-navLink--blue[href*="creativity-design"]');

    this.removeBackground = page.locator('.feds-popup a[href*="remove-background"]');
    this.createQRCode = page.locator('.feds-popup a[href*="qr-code-generator"]');
    this.seeAllQuickActions = page.locator('.feds-popup a[href*="H822XKN9&mv=other"]');
    this.resume = page.locator('.feds-popup a[href*="resume"]');
    this.youTubeVideo = page.locator('.feds-popup a[href*="youtube"]');
    this.createNow = page.locator('.feds-popup a[href*="J7XBWKS1&mv=other"]');
    this.illustrator = page.locator('.feds-popup a[href*="HZG8WTXS&mv=other"]');
    this.seePlansAndPricing = page.locator('.feds-popup a[href*="WXYGHWCC&mv=other"]');

    this.whatIsCCMobile = page.locator('.feds-popup a[href*="creativecloud"]').nth(0);
    this.shopFor = page.locator('.feds-menu-headline').nth(0);
    this.featuredProducts = page.locator('.feds-menu-headline').nth(1);
    this.explore = page.locator('.feds-menu-headline').nth(2);

    this.shopForNN = page.locator('.tabs button').nth(0);
    this.featuredProductsNN = page.locator('.tabs button').nth(1);
    this.exploreNN = page.locator('.tabs button').nth(2);

    this.creativityAndDesignTitle = page.locator('.title h2').nth(0);

    // Document Cloud Elements
    this.adobeAcrobat = page.locator('a[href$="acrobat.html"] .feds-navLink-content');
    this.acrobatPlansAndPricing = page.locator('.feds-cta.feds-cta--primary[href$="/pricing.html"]');
    this.acrobatReader = page.locator('a[href$="pdf-reader.html"]');
    this.business = page.locator('.feds-popup a[href$="acrobat/business.html"]');
    this.government = page.locator('a[href$="/government.html"]').nth(0);
    this.aiOverviewDC = page.locator('.feds-popup a[href$="/ai/overview.html"]').nth(1);
    this.aiInAcrobat = page.locator('.feds-navLink[href$="generative-ai-pdf.html"]');
    this.pdfToWord = page.locator('a[href$="pdf-to-word.html"]');
    this.wordToPDF = page.locator('a[href$="word-to-pdf.html"]');
    this.developerResources = page.locator('a[href$="it-tools.html"]');
    this.eventsAndWebinars = page.locator('a[href$="webinars.html"]');

    this.governmentTwo = page.locator('a[href$="/government.html"]').nth(1);
    this.consultationBeforePurchase = page.locator('.feds-popup a[href$="0120-693-724"]');

    this.products = page.locator('.feds-menu-headline').nth(3);
    this.shopForDc = page.locator('.feds-menu-headline').nth(4);
    this.quickActions = page.locator('.feds-menu-headline').nth(5);

    this.productsNN = page.locator('.tabs button').nth(3);
    this.shopForDcNN = page.locator('.tabs button').nth(4);
    this.quickActionsNN = page.locator('.tabs button').nth(5);

    this.pdfAndESignatureTitle = page.locator('.title h2').nth(1);

    // Experience Cloud Elements
    this.adobeExperienceCloud = page.locator('.feds-popup a[href*="business"]').nth(3);
    this.customerDataPlatform = page.locator('a[href*="/rtcdp.html"]');
    this.marketingAutomation = page.locator('.feds-popup a[href*="marketo.html"]');
    this.adobeGenStudio = page.locator('.feds-navLink[href$="genstudio.html"]');
    this.aiAssistant = page.locator('a[href$="ai-assistant.html"]');
    this.adobeExperiencePlatform = page.locator('a[href$="platform.html"]');
    this.adobeGenAI = page.locator('a[href$="genai.html"]');
    this.findProduct = page.locator('a[href$="finder.html"]');
    this.resourceCentre = page.locator('a[href$="resources/main.html"]');
    this.customerSuccessStories = page.locator('a[href*="success-stories"]');
    this.servicesAndSupport = page.locator('a[href$="support/main.html"]');
    this.viewAllProductsEcCm = page.locator('a[href$="products.html"]').nth(0);

    this.insightsAndAudiences = page.locator('.feds-popup a[href$="personalization.html"]');
    this.b2bMarketing = page.locator('.feds-popup a[href$="b2b-marketing.html"]');
    this.requestAdemo = page.locator('.feds-popup a[href$="experience-cloud.html"]');
    this.analytics = page.locator('.feds-popup a[href$="adobe-analytics.html"]');
    this.experienceManagerAssets = page.locator('.feds-popup a[href$="aem-assets.html"]');
    this.aiOverview = page.locator('.feds-popup a[href*="ai/overview.html"]').nth(1);
    this.adobeSummit = page.locator('a[href*="summit.adobe.com"]');

    this.adobeExperienceCloudIn = page.locator('.feds-popup a[href*="business"]').nth(2);
    this.aiAssistantMob = page.locator('a[href$="ai-assistant"]');
    this.b2bMarketingMob = page.locator('.feds-popup a[href$="b2b-marketing"]');
    this.financialServices = page.locator('.feds-popup a[href$="financial-services"]');
    this.useTheProductFinder = page.locator('.feds-popup a[href$="finder.html"]');

    this.featuredProductsEc = page.locator('.feds-menu-headline').nth(6);
    this.newReleases = page.locator('.feds-menu-headline').nth(7);
    this.whatWeSolve = page.locator('.feds-menu-headline').nth(8);
    this.Industries = page.locator('.feds-menu-headline').nth(9);
    this.notSureWhatYouNeed = page.locator('.feds-menu-headline').nth(10);

    this.featuredProductsEcNN = page.locator('.tabs button').nth(6);
    this.newReleasesNN = page.locator('.tabs button').nth(7);
    this.whatWeSolveNN = page.locator('.tabs button').nth(8);
    this.IndustriesNN = page.locator('.tabs button').nth(9);
    this.notSureWhatYouNeedNN = page.locator('.tabs button').nth(10);

    this.marketingAndCommerceTitle = page.locator('.title h2').nth(2);

    // Help-X Elements
    this.helpCentre = page.locator('.feds-popup a[href$="support.html"]:nth-child(1)');
    this.downloadAndInstall = page.locator(".feds-cta--secondary[href$='catalog.html']").nth(0);
    this.contact = page.locator(".feds-cta--primary[href$='open-jarvis-chat']");
    this.manageMyAccount = page.locator(".feds-popup a[href*='account.adobe']").nth(0);
    this.subscribeToAdobeStatus = page.locator("a[href$='proactivesubscriptions']");
    this.creativeCloudTutorials = page.locator("a[href$='learn']");
    this.adobeExperienceLeague = page.locator("a[href*='experienceleague']:nth-child(4)");
    this.downloadAndInstallTwo = page.locator(".feds-cta--secondary[href$='catalog.html']").nth(1);
    this.subscribeToAdobeStatusTwo = page.locator('a[href*="src=helpx"]');

    this.adobeLearn = page.locator('.feds-popup a[href*="learnIn=1"]').nth(0);

    this.helpAndCommunity = page.locator('.feds-menu-headline').nth(11);
    this.commonTasks = page.locator('.feds-menu-headline').nth(12);
    this.learningResources = page.locator('.feds-menu-headline').nth(13);

    this.helpAndCommunityNN = page.locator('.tabs button').nth(11);
    this.commonTasksNN = page.locator('.tabs button').nth(12);
    this.learningResourcesNN = page.locator('.tabs button').nth(13);

    this.learnAndSupportTitle = page.locator('.title h2').nth(3);

    // Footer Elements
    this.footerCreativeCloud = page.locator(".feds-footer-wrapper a[href*='creativecloud.html']");
    this.footerViewAllProducts = page.locator(".feds-navLink[href*='/products/catalog.html?']");
    this.footerCreativeCloudForBusiness = page.locator(".feds-footer-wrapper [href$='cloud/business.html']").nth(0);
    this.footerAcrobatForBusiness = page.locator(".feds-footer-wrapper a[href$='acrobat/business.html']").nth(0);
    this.footerDiscountsForStudentsAndTeachers = page.locator(".feds-footer-wrapper a[href$='buy/students.html']");
    this.footerDigitalLearningSolutions = page.locator("a[href$='/elearning.html']");
    this.footerAppsforiOS = page.locator("a[href*='id331646274']");
    this.footerAppsforAndroid = page.locator("a[href*='play.google.com']");
    this.footerTermsOfUse = page.locator('a[href*="experiencecloudterms"]');
    this.footerDownloadAndInstall = page.locator('.feds-footer-wrapper a[href*="download-install.html"]');
    this.footerGenuineSoftware = page.locator('a[href*="genuine.html"]');
    this.footerLogInToYourAccount = page.locator('.feds-footer-wrapper a[href*="account.adobe"]').nth(0);
    this.footerAbout = page.locator('.feds-footer-wrapper [href*="about-adobe.html"]').nth(0);
    this.footerIntegrity = page.locator('a[href*="integrity.html"]');

    // Featured Products
    this.footerAdobeAcrobatReaderlogo = page.locator('a[href$="reader/"]');
    this.footerAdobeExpresslogo = page.locator('a[href$="Z2G1FSYV&mv=other"]:nth-of-type(1)').nth(1);
    this.footerPhotoshoplogo = page.locator('a[href$="photoshop/free-trial-download.html"]').nth(0);
    this.footerIllustratorlogo = page.locator('a[href$="illustrator/free-trial-download.html"]');

    // Change Region and social media
    this.changeRegion = page.locator('.feds-regionPicker-wrapper');
    this.facebookLogo = page.locator('a[href*="facebook"]');
    this.instagramLogo = page.locator('a[href*="instagram"]').nth(0);
    this.twitterlogo = page.locator('a[href*="twitter"]');
    this.linkedinLogo = page.locator('a[href*="linkedin"]');
    this.copyright = page.locator('.feds-footer-copyright');
    this.privacyPolicy = page.locator('.feds-footer-legalWrapper a:nth-of-type(1)').nth(0);
    this.termsOfUse = page.locator('.feds-footer-legalWrapper a:nth-of-type(1)').nth(1);
    this.cookies = page.locator('.feds-footer-legalWrapper a:nth-of-type(1)').nth(2);
    this.protectMyPersonalData = page.locator('.feds-footer-legalWrapper a:nth-of-type(1)').nth(3);
    this.adChoices = page.locator('.feds-footer-legalWrapper a:nth-of-type(1)').nth(4);
    this.instagramLogoTwo = page.locator('a[href*="instagram"]').nth(1);
    this.weibo = page.locator('a[href*="weibo"]');
    this.socialMedia = page.locator('a[href*="social-media"]');
    this.cookiesA = page.locator('.feds-footer-legalWrapper a:nth-of-type(1)').nth(3);
    this.cookiesB = page.locator('.feds-footer-legalWrapper a:nth-of-type(1)').nth(4);
    this.cookiesC = page.locator('.feds-footer-legalWrapper a:nth-of-type(1)').nth(2);

    // Cookie Preference
    this.cookieSettings = page.locator('h2[id="pc-title"]');
    this.operate = page.locator('label.ot-switch-label').nth(0);
    this.measure = page.locator('label.ot-switch-label').nth(1);
    this.extend = page.locator('label.ot-switch-label').nth(2);
    this.personalize = page.locator('label.ot-switch-label').nth(3);
    this.closeCookie = page.locator('button[id="close-pc-btn-handler"]');

    // Change Region Elements
    this.uk = page.locator('//a[contains(text(), "United Kingdom")]');
    this.us = page.locator('//a[contains(text(), "United States")]');
    this.closeChangeRegion = page.locator('.dialog-close');
    this.cg = page.locator('p .tracking-header').nth(0);
  }

  // U-NAV
  async validatingUnavElements(country) {
    const elementsToCheck = [
      { element: this.adobelogo, conditions: { defaultVisibility: true } },
      { element: this.appSwitcher, conditions: { defaultVisibility: true, excludeCountries: ['China'] } },
      { element: this.signInButton, conditions: { defaultVisibility: true } },
      { element: this.gnavCC, conditions: { defaultVisibility: true, excludeCountries: ['China'] } },
      { element: this.gnavDC, conditions: { defaultVisibility: true, excludeCountries: ['China'] } },
      { element: this.gnavEC, conditions: { defaultVisibility: true, excludeCountries: ['CIS English', 'CIS Russian', 'China'] } },
      { element: this.gnavHelpX, conditions: { defaultVisibility: true, excludeCountries: ['CIS English', 'CIS Russian', 'China'] } },
    ];

    await Promise.all(elementsToCheck.map(async ({ element, conditions }) => {
      if (conditions.excludeCountries && conditions.excludeCountries.includes(country)) {
        await expect(element).not.toBeVisible();
      } else if (conditions.defaultVisibility) {
        await expect(element).toBeVisible();
      }
    }));
  }

  // App Switcher
  async validatingAppSwitcherElements(country) {
    await this.appSwitcher.click();
    await this.page.waitForTimeout(5000);
    const elementsToCheck = [
      { element: this.webApps, conditions: { defaultVisibility: true } },
      { element: this.adobeExpressAS, conditions: { defaultVisibility: true } },
      { element: this.adobeFireflyAs, conditions: { defaultVisibility: true } },
      { element: this.acrobatAS, conditions: { defaultVisibility: true } },
      { element: this.photoshopAS, conditions: { defaultVisibility: true } },
      { element: this.lightroomAS, conditions: { defaultVisibility: true } },
      { element: this.stockAS, conditions: { defaultVisibility: true } },
      { element: this.acrobatSignAS, conditions: { defaultVisibility: true } },
      { element: this.fontsAS, conditions: { defaultVisibility: true } },
      { element: this.experienceCloudAS, conditions: { defaultVisibility: true } },
      { element: this.adobecomAS, conditions: { defaultVisibility: true } },
      { element: this.allAppsAS, conditions: { defaultVisibility: true } },
    ];

    await Promise.all(elementsToCheck.map(async ({ element, conditions }) => {
      if (conditions.excludeCountries && conditions.excludeCountries.includes(country)) {
        await expect(element).not.toBeVisible();
      } else if (conditions.defaultVisibility) {
        await expect(element).toBeVisible();
      }
    }));
    await this.page.waitForTimeout(5000);
  }

  // Creativity & Design
  async validatingCCElements(country) {
    await this.gnavCC.click();
    const elementsToCheck = [
      { element: this.whatIsCC, conditions: { defaultVisibility: true } },
      {
        element: this.viewPlansAndPrices,
        conditions: {
          defaultVisibility: true,
          excludeCountries: ['Brazil', 'Chile', 'Spain'],
        },
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

  // Document Cloud
  async validatingDCElements(country) {
    await this.gnavDC.click();
    const elementsToCheck = [
      { element: this.adobeAcrobat, conditions: { defaultVisibility: true } },
      { element: this.acrobatPlansAndPricing, conditions: { defaultVisibility: true } },
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

  // Experience Cloud
  async validatingECElements(country) {
    await this.gnavEC.click();
    const elementsToCheck = [
      { element: this.adobeExperienceCloud, conditions: { defaultVisibility: true, excludeCountries: ['Japan'] } },
      { element: this.viewAllProductsEcCm, conditions: { defaultVisibility: true } },
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

  // Helpx
  async validatingHelpXElements(country) {
    await this.gnavHelpX.click();
    const elementsToCheck = [
      { element: this.contact, conditions: { defaultVisibility: true } },
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
    await this.gnavHelpX.click();
  }

  // Footer
  async validatingFooterElements(country) {
    await this.changeRegion.scrollIntoViewIfNeeded();
    const elementsToCheck = [
      { element: this.footerCreativeCloud, conditions: { defaultVisibility: true, excludeCountries: ['China', 'United States'] } },
      { element: this.footerViewAllProducts, conditions: { defaultVisibility: true, excludeCountries: ['China', 'United States'] } },
      {
        element: this.footerCreativeCloudForBusiness,
        conditions: {
          defaultVisibility: true,
          excludeCountries: ['China', 'United States'],
        },
      },
      {
        element: this.footerDiscountsForStudentsAndTeachers,
        conditions: {
          defaultVisibility: true,
          excludeCountries: ['China', 'United States'],
        },
      },
      {
        element: this.footerDigitalLearningSolutions,
        conditions: {
          defaultVisibility: true,
          excludeCountries: ['China', 'United States'],
        },
      },
      { element: this.footerAppsforAndroid, conditions: { defaultVisibility: true, excludeCountries: ['China', 'United States'] } },
      { element: this.footerTermsOfUse, conditions: { defaultVisibility: true, excludeCountries: ['China', 'United States'] } },
      { element: this.footerDownloadAndInstall, conditions: { defaultVisibility: true, excludeCountries: ['Luxemburg German'] } },
      {
        element: this.footerGenuineSoftware,
        conditions: {
          defaultVisibility: true,
          excludeCountries: ['Luxemburg German', 'United States'],
        },
      },
      { element: this.footerLogInToYourAccount, conditions: { defaultVisibility: true, excludeCountries: ['Korea', 'Luxemburg German'] } },
      { element: this.footerCreativeCloud, conditions: { defaultVisibility: true, excludeCountries: ['China'] } },
      { element: this.footerViewAllProducts, conditions: { defaultVisibility: true, excludeCountries: ['China'] } },
      { element: this.footerCreativeCloudForBusiness, conditions: { defaultVisibility: true, excludeCountries: ['China'] } },
      { element: this.footerDiscountsForStudentsAndTeachers, conditions: { defaultVisibility: true, excludeCountries: ['China'] } },
      { element: this.footerDigitalLearningSolutions, conditions: { defaultVisibility: true, excludeCountries: ['China'] } },
      { element: this.footerAppsforiOS, conditions: { defaultVisibility: true, excludeCountries: ['China'] } },
      { element: this.footerAppsforAndroid, conditions: { defaultVisibility: true, excludeCountries: ['China'] } },
      { element: this.footerTermsOfUse, conditions: { defaultVisibility: true, excludeCountries: ['China'] } },
      { element: this.footerDownloadAndInstall, conditions: { defaultVisibility: true } },
      { element: this.footerGenuineSoftware, conditions: { defaultVisibility: true } },
      { element: this.footerLogInToYourAccount, conditions: { defaultVisibility: true, excludeCountries: ['Korea'] } },
      { element: this.footerAbout, conditions: { defaultVisibility: true } },
      { element: this.footerIntegrity, conditions: { defaultVisibility: true, excludeCountries: ['United States'] } },
      { element: this.footerAdobeAcrobatReaderlogo, conditions: { defaultVisibility: true, excludeCountries: ['China'] } },
      { element: this.footerAdobeExpresslogo, conditions: { defaultVisibility: true, excludeCountries: ['China', 'United States'] } },
      { element: this.footerPhotoshoplogo, conditions: { defaultVisibility: true, excludeCountries: ['China', 'Denmark'] } },
      {
        element: this.footerIllustratorlogo,
        conditions: {
          defaultVisibility: true,
          excludeCountries: ['China', 'Denmark', 'United States'],
        },
      },
      { element: this.changeRegion, conditions: { defaultVisibility: true } },
      { element: this.facebookLogo, conditions: { defaultVisibility: true, excludeCountries: ['China'] } },
      { element: this.instagramLogo, conditions: { defaultVisibility: true, excludeCountries: ['China'] } },
      { element: this.twitterlogo, conditions: { defaultVisibility: true, excludeCountries: ['China'] } },
      { element: this.linkedinLogo, conditions: { defaultVisibility: true, excludeCountries: ['China'] } },
      { element: this.copyright, conditions: { defaultVisibility: true } },
      { element: this.privacyPolicy, conditions: { defaultVisibility: true } },
      { element: this.termsOfUse, conditions: { defaultVisibility: true } },
      { element: this.cookies, conditions: { defaultVisibility: true } },
      { element: this.protectMyPersonalData, conditions: { defaultVisibility: true } },
      { element: this.adChoices, conditions: { defaultVisibility: true } },
      { element: this.weibo, conditions: { includeCountries: ['China'] } },
      { element: this.socialMedia, conditions: { includeCountries: ['China'] } },
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

  // Cookie Preference
  async validatingCookiePreference(country) {
    const includeCountries = ['Denmark', 'Luxemburg German', 'Switzerland', 'Austria'];
    const includeCountriesA = ['Germany'];
    const includeCountriesB = ['CIS Russian', 'CIS English'];

    if (includeCountries.includes(country)) {
      await this.cookiesA.click();
    } else if (includeCountriesA.includes(country)) {
      await this.cookiesB.click();
    } else if (includeCountriesB.includes(country)) {
      await this.page.waitForTimeout(2000);
      await this.cookiesC.click();
    } else {
      await this.cookies.click();
    }

    await this.page.waitForTimeout(2000);
    await expect(this.cookieSettings).toBeVisible();
    await expect(this.operate).toBeChecked();
    await expect(this.measure).toBeChecked();
    await expect(this.extend).toBeChecked();
    await expect(this.personalize).toBeChecked();
    await this.closeCookie.click();
  }

  // Change Region
  async validatingChangeRegion(country) {
    await this.changeRegion.click();
    const includeCountries = ['United States'];

    if (includeCountries.includes(country)) {
      await this.uk.click();
      await expect(this.page).toHaveURL('https://www.stage.adobe.com/uk/?georouting=off&mep=off');
    } else {
      await this.us.click();
      await expect(this.page).toHaveURL('https://www.stage.adobe.com/?georouting=off&mep=off');
    }
  }

  // ============================= Android, iOS and iPad methods ============================= //

  // U-NAV
  async validatingUnav(test) {
    const elements = [this.hamburgerMenu, this.adobelogo, this.appSwitcher, this.signInButton];
    await Promise.all(elements.map(async (element) => {
      await expect(element).toBeVisible();
    }));

    await this.scrollAndCheck(test, 750, 5000);
    await this.scrollAndCheck(test, 1500, 2000);
    await this.scrollToBottom(test);
    await this.scrollToTop(test);
  }

  // Close App Switcher
  async tapTopOnMobile(test) {
    const viewport = this.page.viewportSize();
    if (!viewport) {
      test.fail('Viewport size is not available.');
      return;
    }

    const x = viewport.width / 2;
    const y = 5;

    try {
      await this.page.touchscreen.tap(x, y);
      console.log(`Tapped at top of the page: (${x}, ${y})`);
    } catch (e) {
      test.fail(`Failed to tap at top of page: ${e.message}`);
    }
  }

  // Hamburger Menu Items
  async validatingHamburgerMenu() {
    await this.hamburgerMenu.click();
    const elements = [this.gnavCC, this.gnavDC, this.gnavEC, this.gnavHelpX];
    await Promise.all(elements.map(async (element) => {
      await expect(element).toBeVisible();
    }));
  }

  // Creativity & Design
  async validatingCreativityAndDesign(country) {
    await this.gnavCC.click();

    const elementsToCheck = [
      { element: this.shopForNN, conditions: { defaultVisibility: true } },
      { element: this.featuredProductsNN, conditions: { defaultVisibility: true } },
      { element: this.exploreNN, conditions: { defaultVisibility: true } },
    ];
    await Promise.all(elementsToCheck.map(async ({ element, conditions }) => {
      if (conditions.defaultVisibility) {
        await expect(element).toBeVisible();
      }
    }));

    await expect(this.creativityAndDesignTitle).toBeVisible();
    
    if (country === 'Spain') {
      await expect(this.viewPlansAndPricing).toBeVisible();
    } else {
      await expect(this.viewPlansAndPrices).toBeVisible();
      await expect(this.whatIsCCMobile).toBeVisible();
    }

    await this.featuredProductsNN.click();
    await this.exploreNN.click();

    await this.mainMenuCC.click();
  }

  // PDF & E-Signatures
  async validatingPDFAndESignatures(country) {
    await this.gnavDC.click();

    const elementsToCheck = [
      { element: this.productsNN, conditions: { defaultVisibility: true, excludeCountries: ['United States'] } },
      { element: this.shopForDcNN, conditions: { defaultVisibility: true } },
      { element: this.quickActionsNN, conditions: { defaultVisibility: true } },
    ];

    await Promise.all(elementsToCheck.map(async ({ element, conditions }) => {
      if (conditions.includeCountries && conditions.includeCountries.includes(country)) {
        await expect(element).toBeVisible();
      } else if (conditions.excludeCountries && conditions.excludeCountries.includes(country)) {
        await expect(element).not.toBeVisible();
      } else if (conditions.defaultVisibility) {
        await expect(element).toBeVisible();
    }));

    await expect(this.pdfAndESignatureTitle).toBeVisible();
    await expect(this.acrobatPlansAndPricing).toBeVisible();
    await expect(this.adobeAcrobat).toBeVisible();

    await this.quickActionsNN.click();

    await this.mainMenuDC.click();
  }

  // Marketing & Commerce
  async validatingMarketingAndCommerce(country) {
    await this.gnavEC.click();

    const elementsToCheck = [
      { element: this.marketingAndCommerceTitle, conditions: { defaultVisibility: true } },
      { element: this.adobeExperienceCloud, conditions: { defaultVisibility: true, excludeCountries: ['Japan'] } },
      { element: this.featuredProductsEcNN, conditions: { defaultVisibility: true, excludeCountries: ['United States'] } },
      { element: this.whatWeSolveNN, conditions: { defaultVisibility: true } },
      { element: this.viewAllProductsEcCm, conditions: { defaultVisibility: true } },
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

    if (!country === 'Japan') {
      await this.newReleasesNN.click();
      await this.whatWeSolveNN.click();
    }
    await this.mainMenuEC.click();
  }

  // Learn & Support
  async validatingLearnAndSupport(country) {
    await this.gnavHelpX.click();

    const elementsToCheck = [
      { element: this.helpAndCommunityNN, conditions: { defaultVisibility: true, excludeCountries: ['United States'] } },
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

    await expect(this.learnAndSupportTitle).toBeVisible();
    await expect(this.contact).toBeVisible();
    await expect(this.helpCentre).toBeVisible();

    await this.closeMainMenu.click();
  }

  // Footer
  async validatingFooter(test) {
    await this.changeRegion.scrollIntoViewIfNeeded();

    const elements = [this.changeRegion, this.facebookLogo, this.twitterlogo,
      this.linkedinLogo, this.copyright, this.privacyPolicy, this.termsOfUse, this.cookies,
      this.protectMyPersonalData, this.adChoices, this.instagramLogo,
    ];
    await Promise.all(elements.map((element) => expect(element).toBeVisible()));

    await this.scrollAndCheckBackward(test, 300, 2000);
    await this.scrollAndCheckBackward(test, 550, 2000);
    await this.scrollToTop(test);
    await this.scrollToBottom(test);
  }

  // Scroll the page
  async scrollAndCheck(test, scrollAmount, waitTime) {
    const initialScrollY = await this.page.evaluate(() => window.scrollY);
    await this.page.evaluate((amount) => window.scrollBy(0, amount), scrollAmount);
    await this.page.waitForTimeout(waitTime);
    const newScrollY = await this.page.evaluate(() => window.scrollY);
    const isScrolled = newScrollY > initialScrollY;
    console.log('Is the page scrolled?', isScrolled);

    if (!isScrolled) {
      test.fail('Page did not scroll as expected.');
    }
  }

  async scrollAndCheckBackward(test, scrollAmount, waitTime) {
    const initialScrollY = await this.page.evaluate(() => window.scrollY);
    await this.page.evaluate((amount) => window.scrollBy(0, amount), -scrollAmount);
    await this.page.waitForTimeout(waitTime);
    const newScrollY = await this.page.evaluate(() => window.scrollY);
    const isScrolled = newScrollY < initialScrollY;
    console.log('Is the page scrolled Backward?', isScrolled);

    if (!isScrolled) {
      test.fail('Page did not scroll Backward as expected.');
    }
  }

  async scrollToBottom(test) {
    const initialScrollY = await this.page.evaluate(() => window.scrollY);
    await this.page.evaluate(() => {
      window.scrollTo(0, document.body.scrollHeight);
    });
    await this.page.waitForTimeout(2000);
    const newScrollY = await this.page.evaluate(() => window.scrollY);
    const isScrolled = newScrollY > initialScrollY;
    console.log('Is the page scrolled to the bottom?', isScrolled);

    if (!isScrolled) {
      test.fail('Page did not scroll as expected.');
    }
  }

  async scrollToTop(test) {
    const initialScrollY = await this.page.evaluate(() => window.scrollY);
    await this.page.evaluate(() => {
      window.scrollTo(0, 0);
    });
    await this.page.waitForTimeout(2000);
    const newScrollY = await this.page.evaluate(() => window.scrollY);
    const isScrolled = newScrollY < initialScrollY;
    console.log('Is the page scrolled to the top?', isScrolled);

    if (!isScrolled) {
      test.fail('Page did not scroll to the top as expected.');
    }
  }
}
