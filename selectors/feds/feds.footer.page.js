/* eslint-disable import/no-import-module-exports */
export default class FedsFooter {
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
    this.legalSections = page.locator('ul.feds-footer-privacySection');
    this.legalLinks = page.locator('div.feds-footer-legalWrapper a');
    this.legalCopyright = page.locator('span.feds-footer-copyright');
    this.privacyLink = page.locator('a[href*="privacy.html"]').nth(1);

    this.privacyLink = page.locator('a[href*="privacy.html"]').nth(1);

    this.termsOfUseLink = page.locator('a[href*="terms.html"]');
    this.cookiePreferencesLink = page.locator('a[href*="#openPrivacy"]');
    this.doNotSellInformationLink = page.locator('a[href*="rights"]');
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

    // Footer Section Selectors:
    this.footerCreativeCloud = page.locator(".feds-footer-wrapper a[href*='creativecloud.html']");
    this.footerViewAllProducts = page.locator(".feds-navLink[href*='/products/catalog.html?']");
    this.footerCreativeCloudForBusiness = page.locator(".feds-footer-wrapper [href$='cloud/business.html']").nth(0);
    this.footerAcrobatForBusiness = page.locator(".feds-footer-wrapper a[href$='acrobat/business.html']");
    this.footerDiscountsForStudentsAndTeachers = page.locator(".feds-footer-wrapper a[href$='buy/students.html']");
    this.footerDigitalLearningSolutions = page.locator("a[href$='/elearning.html']");
    this.footerAppsforiOS = page.locator("a[href*='app-store']");
    this.footerAppsforAndroid = page.locator("a[href*='play.google.com']");
    this.footerWhatIsExperienceCloud = page.locator('.feds-footer-wrapper a[href*="business"]').nth(4);
    this.footerTermsOfUse = page.locator('a[href*="experiencecloudterms"]');
    this.footerDownloadAndInstall = page.locator('.feds-footer-wrapper a[href*="download-install.html"]');
    this.footerGenuineSoftware = page.locator('a[href*="genuine.html"]');
    this.footerAdobeBlog = page.locator('.feds-navLink[href*="blog"]').nth(1);
    this.footerAdobeDeveloper = page.locator('a[href*="developer"]');
    this.footerLogInToYourAccount = page.locator('.feds-footer-wrapper a[href*="account.adobe"]').nth(0);
    this.footerAbout = page.locator('.feds-footer-wrapper [href*="about-adobe.html"]').nth(0);
    this.footerIntegrity = page.locator('a[href*="integrity.html"]');
    this.footerAdobeBlogSecond = page.locator('.feds-navLink[href*="blog"]').nth(0);
    this.protectMyPersonalData = page.locator('.feds-footer-legalWrapper a:nth-of-type(1)').nth(0);
    this.termsOfUseLinkTwo = page.locator('a[href*="terms.html"]').nth(1);
    this.termsOfUseLinkCA = page.locator('a[href*="terms.html"]');
    this.termsOfUseLinkPSCA = page.locator('a[href*="terms.html"]').nth(2);
    this.privacyLinkCA = page.locator('a[daa-ll="Privacy-1"]');

    // Featured Product Selectors:
    this.footerAdobeAcrobatReaderlogo = page.locator('a[href$="reader/"]');
    this.footerAdobeExpresslogo = page.locator('a[href$="Z2G1FSYV&mv=other"]:nth-of-type(1)').nth(1);
    this.footerPhotoshoplogo = page.locator('a[href$="photoshop/free-trial-download.html"]').nth(2);
    this.footerPhotoshoplogo = page.locator('a[href$="photoshop/free-trial-download.html"]').nth(2);
    this.footerIllustratorlogo = page.locator('.feds-featuredProducts a[href$="illustrator/free-trial-download.html"]');

    // Bacom Footer elements:
    // Headings
    this.contactUs = page.locator('footer .feds-menu-section:has(.feds-menu-items) .feds-menu-headline').nth(0);
    this.largeAndMediumBusiness = page.locator('footer .feds-menu-section:has(.feds-menu-items) .feds-menu-headline').nth(1);
    this.individualsAndSmallBusiness = page.locator('footer .feds-menu-section:has(.feds-menu-items) .feds-menu-headline').nth(2);
    this.resourcesAndSupport = page.locator('footer .feds-menu-section:has(.feds-menu-items) .feds-menu-headline').nth(3);
    this.adobe = page.locator('footer .feds-menu-section:has(.feds-menu-items) .feds-menu-headline').nth(4);
    this.ourSolutions = page.locator('footer .feds-menu-section:has(.feds-menu-items) .feds-menu-headline').nth(5);

    this.requestDemo = page.locator("a[href*='request-consultation']").nth(2);
    this.personalizationAtScale = page.locator("a[href*='personalization-at-scale.html']").nth(2);
    this.contentSupplyChain = page.locator("a[href*='content-supply-chain.html']").nth(3);
    this.unifiedCustomerExperience = page.locator("a[href*='unified-customer-experience.html']").nth(2);
    this.creativityAndProduction = page.locator("a[href*='creation-production.html']").nth(1);
    this.b2b = page.locator("a[href*='b2b-marketing.html']").nth(2);
    this.genAi = page.locator("a[href*='adobe-genai.html']");

    this.exploreAllProducts = page.locator("a[href*='/products.html']").nth(7);
    this.acrobatPro = page.locator("a[href*='acrobat-business.html']").nth(4);
    this.acrobatSign = page.locator("a[href*='sign-solutions.html']").nth(2);
    this.adobeAnalytics = page.locator("a[href*='adobe-analytics.html']").nth(2);
    this.adobeExpress1 = page.locator("a[href*='express-business.html']").nth(2);
    this.adobeFireflySolutions = page.locator("a[href*='firefly-business.html']").nth(3);
    this.footerCreativeCloudForBusiness = page.locator("a[href*='creativecloud-business.html']").nth(2);
    this.experienceManager = page.locator("a[href*='experience-manager.html']");
    this.frameioBusiness = page.locator("a[href*='frameio-business.html']").nth(2);
    this.genStudio = page.locator("a[href*='performance-marketing.html']").nth(2);
    this.realTimeCDP = page.locator("a[href*='rtcdp.html']").nth(2);

    this.exploreAllProducts1 = page.locator("a[href*='catalog']");
    this.adobeExpress2 = page.locator("a[href*='express']").nth(3);
    this.adobeFirefly = page.locator("a[href*='firefly.html']");
    this.adobeStock = page.locator("a[href*='stock']");
    this.creativeCloud1 = page.locator("a[href*='/business.html']");
    this.illustrator = page.locator("a[href*='illustrator.html']");
    this.photoshop = page.locator("a[href*='photoshop.html']");
    this.adobePremiere = page.locator("a[href*='premiere.html']");

    this.resourceCenter = page.locator("a[href*='resources/main.html']").nth(3);
    this.resourceCenterPT = page.locator("a[href*='resources/main.html']").nth(5);
    this.customerSuccessStories = page.locator("a[href*='customer-success-stories.html']").nth(2);
    this.adobeForBblog = page.locator("a[href*='blog']").nth(7);
    this.adobeForBblogUK = page.locator("a[href*='blog']").nth(5);
    this.experienceCloudSupport = page.locator("a[href*='support/main.html']").nth(1);
    this.ccSupport = page.locator("a[href*='support.html']").nth(2);
    this.communityForums = page.locator("a[href*='experienceleaguecommunities']").nth(1);
    this.developerResources = page.locator("a[href*='https://developer.adobe.com']").nth(1);

    this.about = page.locator("a[href*='about-adobe.html']");
    this.AiOverview = page.locator("a[href*='overview.html']");
    this.careers = page.locator("a[href*='careers.html']");
    this.events = page.locator("a[href*='events.html']").nth(1);
    this.eventsUK = page.locator("a[href*='events.html']").nth(2);

    this.newsroom = page.locator("a[href*='news.adobe.com']").nth(1);
    this.corporateResponsibility = page.locator("a[href*='corporate-responsibility']").nth(0);
    this.investorRelations = page.locator("a[href*='investor-relations.html']");
    this.supplyChain = page.locator("a[href*='corporate-responsibility']").nth(1);
    this.trustCenter = page.locator("a[href*='trust.html']");
    this.adobeForAll = page.locator("a[href*='diversity.html']");

    this.cookies = page.locator('.feds-footer-legalWrapper a:nth-of-type(1)').nth(2);
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

    // Change Region
    this.regionpicker = page.locator('.feds-regionPicker-wrapper');
    // this.searchContainer = page.locator('.search-input-wrapper input[placeholder="Search language"]');
    this.searchContainer = page.locator('#language-selector-search');
    this.deutsche = page.locator('.language-item').nth(0);
    this.AU = page.locator('.language-item').nth(1);
    this.UK = page.locator('.language-item').nth(2);
    this.US = page.locator('.language-item').nth(3);
    this.francias = page.locator('.language-item').nth(4);
    this.italian = page.locator('.language-item').nth(5);
    this.spanish = page.locator('.language-item').nth(6);
    this.portuguese = page.locator('.language-item').nth(7);
    this.jp = page.locator('.language-item').nth(8);
    this.kr = page.locator('.language-item').nth(9);
  }
  // >> FEDS Footer methods declared here <<
}
