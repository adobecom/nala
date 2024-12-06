import { expect } from '@playwright/test';

export default class HomePageSanity {
  constructor(page) {
    this.page = page;

    // U-Nav Elements
    this.adobelogo = page.locator('.feds-brand-container');
    this.gnavCC = page.locator('.feds-navItem:nth-child(1) button');
    this.gnavDC = page.locator('.feds-navItem:nth-child(2) button');
    this.gnavEC = page.locator('.feds-navItem:nth-child(3) button');
    this.gnavHelpX = page.locator('.feds-navItem:nth-child(4) button');
    this.appSwitcher = page.locator('.unav-comp-app-switcher');
    this.signInButton = page.locator('#unav-profile');
    this.gnavCCPP = page.locator('.feds-navItem:nth-child(1)');
    this.gnavSpecialOffers = page.locator('.feds-navItem:nth-child(2)');
    this.hamburgerMenu = page.locator('.feds-toggle');

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

    this.AIOverviewDCTwo = page.locator('.feds-popup a[href$="/ai/overview.html"]').nth(0);
    this.governmentTwo = page.locator('a[href$="/government.html"]').nth(1);
    this.consultationBeforePurchase = page.locator('.feds-popup a[href$="0120-693-724"]');

    // Experience Cloud Elements
    this.adobeExperienceCloud = page.locator('.feds-popup a[href*="business.stage.adobe.com"]').nth(0);
    this.customerDataPlatform = page.locator('a[href*="/rtcdp.html"]');
    this.marketingAutomation = page.locator('.feds-popup a[href*="marketo.html"]');
    this.viewAllProductsEC = page.locator('a[href*="products.html"]');
    this.adobeGenStudio = page.locator('.feds-navLink[href$="genstudio.html"]');
    this.aiAssistant = page.locator('a[href$="ai-assistant.html"]');
    this.adobeExperiencePlatform = page.locator('a[href$="platform.html"]');
    this.adobeGenAI = page.locator('a[href$="genai.html"]');
    this.findProduct = page.locator('a[href$="finder.html"]');
    this.resourceCentre = page.locator('a[href$="resources/main.html"]');
    this.customerSuccessStories = page.locator('a[href*="success-stories"]');
    this.servicesAndSupport = page.locator('a[href$="support/main.html"]');

    this.insightsAndAudiences = page.locator('.feds-popup a[href$="personalization.html"]');
    this.b2bMarketing = page.locator('.feds-popup a[href$="b2b-marketing.html"]');
    this.requestAdemo = page.locator('.feds-popup a[href$="experience-cloud.html"]');
    this.analytics = page.locator('.feds-popup a[href$="adobe-analytics.html"]');
    this.experienceManagerAssets = page.locator('.feds-popup a[href$="aem-assets.html"]');
    this.aiOverview = page.locator('.feds-popup a[href*="ai/overview.html"]').nth(1);
    this.adobeSummit = page.locator('a[href*="summit.adobe.com"]');

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

    // Footer Elements
    this.footerCreativeCloud = page.locator(".feds-footer-wrapper a[href*='creativecloud.html']");
    this.footerViewAllProducts = page.locator(".feds-navLink[href*='/products/catalog.html?']");
    this.footerCreativeCloudForBusiness = page.locator(".feds-footer-wrapper [href$='cloud/business.html']").nth(0);
    this.footerAcrobatForBusiness = page.locator(".feds-footer-wrapper a[href$='acrobat/business.html']");
    this.footerDiscountsForStudentsAndTeachers = page.locator(".feds-footer-wrapper a[href$='buy/students.html']");
    this.footerDigitalLearningSolutions = page.locator("a[href$='/elearning.html']");
    this.footerAppsforiOS = page.locator("a[href*='app-store']");
    this.footerAppsforAndroid = page.locator("a[href*='play.google.com']");
    this.footerTermsOfUse = page.locator('a[href*="experiencecloudterms"]');
    this.footerDownloadAndInstall = page.locator('.feds-footer-wrapper a[href*="download-install.html"]');
    this.footerGenuineSoftware = page.locator('a[href*="genuine.html"]');
    this.footerLogInToYourAccount = page.locator('.feds-footer-wrapper a[href*="account.adobe"]').nth(0);
    this.footerAbout = page.locator('.feds-footer-wrapper [href*="about-adobe.html"]').nth(0);
    this.footerIntegrity = page.locator('a[href*="integrity.html"]');

    // Featured Products
    this.footerAdobeAcrobatReaderlogo = page.locator('a[href$="reader/"]');
    this.footerAdobeExpresslogo = page.locator('a[href$="Z2G1FSYV&mv=other"]:nth-of-type(2)');
    this.footerPhotoshoplogo = page.locator('a[href$="photoshop/free-trial-download.html"]');
    this.footerIllustratorlogo = page.locator('a[href$="illustrator/free-trial-download.html"]');

    // Change Region and social media
    this.changeRegion = page.locator('.feds-regionPicker-wrapper');
    this.facebookLogo = page.locator('a[href*="facebook"]');
    this.instagramLogo = page.locator('a[href*="instagram"]').nth(0);
    this.twitterlogo = page.locator('a[href*="twitter"]');
    this.linkedinLogo = page.locator('a[href*="linkedin"]');
    this.copyright = page.locator('.feds-footer-legalWrapper>p>span');
    this.privacyPolicy = page.locator('.feds-footer-legalWrapper a:nth-of-type(1)');
    this.termsOfUse = page.locator('.feds-footer-legalWrapper a:nth-of-type(2)');
    this.cookies = page.locator('.feds-footer-legalWrapper a:nth-of-type(3)');
    this.protectMyPersonalData = page.locator('.feds-footer-legalWrapper a:nth-of-type(4)');
    this.adChoices = page.locator('.feds-footer-legalWrapper a:nth-of-type(5)');
    this.instagramLogoTwo = page.locator('a[href*="instagram"]').nth(1);
    this.weibo = page.locator('a[href*="weibo"]');
    this.socialMedia = page.locator('a[href*="social-media"]');
  }

  // U-NAV
  async validatingUnavElements(country) {
    const elementsToCheck = [
      { element: this.adobelogo, conditions: { defaultVisibility: true } },
      { element: this.appSwitcher, conditions: { defaultVisibility: true, excludeCountries: ['China'] } },
      { element: this.signInButton, conditions: { defaultVisibility: true } },
      {
        element: this.gnavCC,
        conditions: { defaultVisibility: true, excludeCountries: ['CIS English', 'CIS Russian', 'China'] },
      },
      {
        element: this.gnavDC,
        conditions: { defaultVisibility: true, excludeCountries: ['CIS English', 'CIS Russian', 'China'] },
      },
      {
        element: this.gnavEC,
        conditions: { defaultVisibility: true, excludeCountries: ['CIS English', 'CIS Russian', 'China'] },
      },
      {
        element: this.gnavHelpX,
        conditions: { defaultVisibility: true, excludeCountries: ['CIS English', 'CIS Russian', 'China'] },
      },
      {
        element: this.gnavCCPP,
        conditions: {
          includeCountries: ['CIS English', 'CIS Russian'],
          excludeCountries: ['China'],
        },
      },
      {
        element: this.gnavSpecialOffers,
        conditions: {
          includeCountries: ['CIS English', 'CIS Russian'],
          excludeCountries: ['China'],
        },
      },
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
  async validatingCCElements(country) {
    await this.gnavCC.click();
    const elementsToCheck = [
      { element: this.whatIsCC, conditions: { defaultVisibility: true, excludeCountries: ['Germany'] } },
      {
        element: this.schoolsAndUniversities,
        conditions: {
          defaultVisibility: true,
          excludeCountries: ['Brazil', 'Chile', 'Spain', 'India'],
        },
      },
      {
        element: this.viewPlansAndPrices,
        conditions: { defaultVisibility: true, excludeCountries: ['Brazil', 'Chile', 'Spain', 'Russia', 'India'] },
      },
      { element: this.photoshop, conditions: { defaultVisibility: true } },
      { element: this.AdobeStock, conditions: { defaultVisibility: true, excludeCountries: ['India'] } },
      {
        element: this.viewAllProductsCC,
        conditions: { defaultVisibility: true, excludeCountries: ['Brazil', 'Chile', 'Spain', 'India'] },
      },
      { element: this.photo, conditions: { defaultVisibility: true, excludeCountries: ['India'] } },
      { element: this.pdf, conditions: { defaultVisibility: true, excludeCountries: ['India'] } },
      { element: this.aIOverviewCC, conditions: { defaultVisibility: true, excludeCountries: ['Japan'] } },
      { element: this.adobeFirefly, conditions: { defaultVisibility: true } },
      { element: this.seeAllProducts, conditions: { includeCountries: ['Brazil', 'Chile', 'Spain'] } },
      { element: this.individuals, conditions: { includeCountries: ['Brazil', 'Chile'] } },
      { element: this.companies, conditions: { includeCountries: ['Brazil', 'Chile'] } },
      { element: this.seePlansAndPrices, conditions: { includeCountries: ['Brazil', 'Chile', 'Spain'] } },
      { element: this.removeBackground, conditions: { includeCountries: ['India'] } },
      { element: this.createQRCode, conditions: { includeCountries: ['India'] } },
      { element: this.seeAllQuickActions, conditions: { includeCountries: ['India'] } },
      { element: this.resume, conditions: { includeCountries: ['India'] } },
      { element: this.youTubeVideo, conditions: { includeCountries: ['India'] } },
      { element: this.createNow, conditions: { includeCountries: ['India'] } },
      { element: this.illustrator, conditions: { includeCountries: ['India'] } },
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

  // Document Cloud
  async validatingDCElements(country) {
    await this.gnavDC.click();
    const elementsToCheck = [
      { element: this.adobeAcrobat, conditions: { defaultVisibility: true } },
      { element: this.acrobatPlansAndPricing, conditions: { defaultVisibility: true } },
      { element: this.acrobatReader, conditions: { defaultVisibility: true } },
      { element: this.business, conditions: { defaultVisibility: true } },
      {
        element: this.government,
        conditions: {
          defaultVisibility: true,
          excludeCountries: ['France', 'Greece', 'Italy', 'Saudi Arabia', 'Finland', 'Japan'],
        },
      },
      {
        element: this.aiOverviewDC,
        conditions: {
          defaultVisibility: true,
          excludeCountries: ['Argentina', 'Brazil', 'Chile', 'Colombia', 'Costa Rica', 'Ecuador',
            'Guatemala', 'Latin America', 'Mexico', 'Peru', 'Puerto Rico', 'Estonia', 'Spain', 'Greece',
            'Italy', 'Lithuania', 'Hungary', 'Nederland', 'Poland', 'Portugal', 'Romania', 'Slovenia', 'Slovakia',
            'Finland', 'Sweden', 'Switzerland Italian', 'Turkey', 'Czech Republic', 'Bulgaria', 'Russia', 'Ukraine',
            'Israel Hebrew', 'UAE', 'Middle East And North Africa', 'Kingdom Of Saudi Arabia', 'Egypt', 'Kuwait',
            'Qatar', 'Indonesia', 'Malaysia', 'Philippines', 'Vietnam', 'India Hindi', 'Thailand',
            'Hong Kong', 'Taiwan', 'Japan', 'Korea', 'Latvia', 'Denmark', 'Norway', 'United States'],
        },
      },
      {
        element: this.aiInAcrobat,
        conditions: {
          defaultVisibility: true,
          excludeCountries: ['Argentina', 'Brazil', 'Chile', 'Colombia', 'Costa Rica', 'Ecuador',
            'Guatemala', 'Latin America', 'Mexico', 'Peru', 'Puerto Rico', 'Estonia', 'Spain', 'Greece', 'Italy',
            'Lithuania', 'Hungary', 'Nederland', 'Poland', 'Portugal', 'Romania', 'Slovenia', 'Slovakia',
            'Finland', 'Sweden', 'Switzerland Italian', 'Turkey', 'Czech Republic', 'Bulgaria', 'Russia', 'Ukraine',
            'Israel Hebrew', 'UAE', 'Middle East And North Africa', 'Kingdom Of Saudi Arabia', 'Egypt', 'Kuwait',
            'Qatar', 'Indonesia', 'Malaysia', 'Philippines', 'Vietnam', 'India Hindi', 'Thailand', 'Hong Kong',
            'Taiwan', 'Japan', 'Korea', 'Latvia', 'Denmark', 'Norway'],
        },
      },
      { element: this.pdfToWord, conditions: { defaultVisibility: true } },
      { element: this.wordToPDF, conditions: { defaultVisibility: true } },
      { element: this.developerResources, conditions: { defaultVisibility: true, excludeCountries: ['United States'] } },
      { element: this.eventsAndWebinars, conditions: { defaultVisibility: true, excludeCountries: ['United States'] } },
      { element: this.consultationBeforePurchase, conditions: { includeCountries: ['Japan'] } },
      { element: this.governmentTwo, conditions: { includeCountries: ['Japan'] } },
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
      { element: this.adobeExperienceCloud, conditions: { defaultVisibility: true, includeCountries: ['Brazil'] } },
      {
        element: this.customerDataPlatform,
        conditions: {
          defaultVisibility: true,
          excludeCountries: ['Brazil', 'India', 'United States'],
        },
      },
      { element: this.marketingAutomation, conditions: { defaultVisibility: true, excludeCountries: ['United States'] } },
      {
        element: this.viewAllProductsEC,
        conditions: {
          defaultVisibility: true,
          includeCountries: ['Brazil', 'India'],
          excludeCountries: ['United States'],
        },
      },
      { element: this.adobeGenStudio, conditions: { defaultVisibility: true, excludeCountries: ['Brazil', 'India', 'United States'] } },
      { element: this.aiAssistant, conditions: { defaultVisibility: true, excludeCountries: ['Brazil', 'India', 'United States'] } },
      {
        element: this.adobeExperiencePlatform,
        conditions: {
          defaultVisibility: true,
          excludeCountries: ['Brazil', 'India', 'United States'],
        },
      },
      {
        element: this.adobeGenAI,
        conditions: {
          defaultVisibility: true,
          includeCountries: ['Brazil'],
          excludeCountries: ['United States'],
        },
      },
      { element: this.findProduct, conditions: { defaultVisibility: true, excludeCountries: ['Brazil', 'India'] } },
      {
        element: this.resourceCentre,
        conditions: {
          defaultVisibility: true,
          includeCountries: ['Brazil', 'India'],
          excludeCountries: ['United States'],
        },
      },
      {
        element: this.customerSuccessStories,
        conditions: {
          defaultVisibility: true,
          includeCountries: ['Brazil', 'India'],
          excludeCountries: ['United States'],
        },
      },
      {
        element: this.servicesAndSupport,
        conditions: {
          defaultVisibility: true,
          includeCountries: ['Brazil', 'India'],
          excludeCountries: ['United States'],
        },
      },
      { element: this.insightsAndAudiences, conditions: { includeCountries: ['Brazil', 'India'] } },
      { element: this.b2bMarketing, conditions: { includeCountries: ['Brazil', 'India'] } },
      { element: this.requestAdemo, conditions: { includeCountries: ['Brazil', 'India'] } },
      { element: this.analytics, conditions: { includeCountries: ['Brazil', 'India'] } },
      { element: this.experienceManagerAssets, conditions: { includeCountries: ['Brazil', 'India'] } },
      { element: this.aiOverview, conditions: { includeCountries: ['Brazil'] } },
      { element: this.adobeSummit, conditions: { includeCountries: ['Brazil', 'India'] } },
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
      { element: this.helpCentre, conditions: { defaultVisibility: true } },
      { element: this.downloadAndInstall, conditions: { defaultVisibility: true } },
      { element: this.contact, conditions: { defaultVisibility: true } },
      { element: this.manageMyAccount, conditions: { defaultVisibility: true } },
      {
        element: this.subscribeToAdobeStatus,
        conditions: {
          defaultVisibility: true,
          excludeCountries: ['Kuwait English', 'Qatar English'],
        },
      },
      { element: this.creativeCloudTutorials, conditions: { defaultVisibility: true } },
      { element: this.adobeExperienceLeague, conditions: { defaultVisibility: true } },
      {
        element: this.subscribeToAdobeStatusTwo,
        conditions: { includeCountries: ['Kuwait English', 'Qatar English'] },
      },
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
      { element: this.footerCreativeCloud, conditions: { defaultVisibility: true, excludeCountries: ['China'] } },
      { element: this.footerViewAllProducts, conditions: { defaultVisibility: true, excludeCountries: ['China'] } },
      { element: this.footerCreativeCloudForBusiness, conditions: { defaultVisibility: true, excludeCountries: ['China'] } },
      { element: this.footerAcrobatForBusiness, conditions: { defaultVisibility: true, excludeCountries: ['China'] } },
      { element: this.footerDiscountsForStudentsAndTeachers, conditions: { defaultVisibility: true, excludeCountries: ['China'] } },
      { element: this.footerDigitalLearningSolutions, conditions: { defaultVisibility: true, excludeCountries: ['China'] } },
      {
        element: this.footerAppsforiOS,
        conditions: {
          defaultVisibility: true,
          excludeCountries: ['China', 'CIS English', 'CIS Russian', 'Egypt English', 'Kuwait English', 'Nigeria', 'Qatar English',
            'South Africa'],
        },
      },
      { element: this.footerAppsforAndroid, conditions: { defaultVisibility: true, excludeCountries: ['China'] } },
      { element: this.footerTermsOfUse, conditions: { defaultVisibility: true, excludeCountries: ['China'] } },
      { element: this.footerDownloadAndInstall, conditions: { defaultVisibility: true } },
      { element: this.footerGenuineSoftware, conditions: { defaultVisibility: true } },
      { element: this.footerLogInToYourAccount, conditions: { defaultVisibility: true } },
      { element: this.footerAbout, conditions: { defaultVisibility: true } },
      { element: this.footerIntegrity, conditions: { defaultVisibility: true } },
      { element: this.footerAdobeAcrobatReaderlogo, conditions: { defaultVisibility: true, excludeCountries: ['China'] } },
      { element: this.footerAdobeExpresslogo, conditions: { defaultVisibility: true, excludeCountries: ['China'] } },
      { element: this.footerPhotoshoplogo, conditions: { defaultVisibility: true, excludeCountries: ['China'] } },
      { element: this.footerIllustratorlogo, conditions: { defaultVisibility: true, excludeCountries: ['China'] } },
      { element: this.changeRegion, conditions: { defaultVisibility: true } },
      { element: this.facebookLogo, conditions: { defaultVisibility: true, excludeCountries: ['China'] } },
      { element: this.instagramLogo, conditions: { defaultVisibility: true, excludeCountries: ['India', 'China'] } },
      { element: this.twitterlogo, conditions: { defaultVisibility: true, excludeCountries: ['China'] } },
      { element: this.linkedinLogo, conditions: { defaultVisibility: true, excludeCountries: ['China'] } },
      { element: this.copyright, conditions: { defaultVisibility: true } },
      { element: this.privacyPolicy, conditions: { defaultVisibility: true } },
      { element: this.termsOfUse, conditions: { defaultVisibility: true } },
      { element: this.cookies, conditions: { defaultVisibility: true } },
      { element: this.protectMyPersonalData, conditions: { defaultVisibility: true } },
      { element: this.adChoices, conditions: { defaultVisibility: true } },
      { element: this.instagramLogoTwo, conditions: { includeCountries: ['India'] } },
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

  // Android, iOS and iPad methods.

  // U-NAV
  async validatingUnav() {
    const elements = [this.hamburgerMenu, this.adobelogo, this.appSwitcher, this.signInButton];
    await Promise.all(elements.map(async (element) => {
      await expect(element).toBeVisible();
    }));
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

    const excludeCountries = ['United Kingdom', 'India', 'Spain'];

    if (excludeCountries.includes(country)) {
      await expect(this.whatIsCCMobile).not.toBeVisible();
    } else {
      await expect(this.whatIsCCMobile).toBeVisible();
    }
  }

  // Marketing & Commerce
  async validatingMarketingAndCommerce() {
    await this.gnavEC.click();
    await expect(this.adobeExperienceCloud).toBeVisible();
    await this.hamburgerMenu.click();
  }

  // Footer
  async validatingFooter(country) {
    await this.changeRegion.scrollIntoViewIfNeeded();

    const includeCountry = ['India'];

    const elements = [this.changeRegion, this.facebookLogo, this.twitterlogo,
      this.linkedinLogo, this.copyright, this.privacyPolicy, this.termsOfUse, this.cookies,
      this.protectMyPersonalData, this.adChoices,
      includeCountry.includes(country) ? this.instagramLogoTwo : this.instagramLogo,
    ];
    await Promise.all(elements.map((element) => expect(element).toBeVisible()));
  }
}
