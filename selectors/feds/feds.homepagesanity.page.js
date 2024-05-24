import { expect, test } from '@playwright/test';
import { features } from "../../features/feds/homePageSanity.spec";

export default class HomePageSanity {
    constructor(page) {
        this.page = page;

        //U-Nav Elements
        this.adobelogo = page.locator('.feds-brand-container');
        this.gnavCC = page.locator('.feds-navItem:nth-child(1) button');
        this.gnavDC = page.locator('.feds-navItem:nth-child(2) button');
        this.gnavEC = page.locator('.feds-navItem:nth-child(3) button');
        this.gnavHelpX = page.locator('.feds-navItem:nth-child(4) button');
        this.appSwitcher = page.locator('.unav-comp-app-switcher');
        this.signInButton = page.locator('#unav-profile');
        this.loginButton = page.locator('.feds-signIn');
        this.Tologin = page.locator('.profile-signed-out>button');
        this.gnavCCPP = page.locator('.feds-navItem:nth-child(1)');
        this.gnavSpecialOffers = page.locator('.feds-navItem:nth-child(2)');

        // Creative Cloud Elements
        this.whatIsCC = page.locator('.feds-popup a[href*="creativecloud.html"]').nth(0);
        this.schoolsAndUniversities = page.locator('.feds-popup a[href$="education.html"]');
        this.viewPlansAndPrices = page.locator('.feds-cta.feds-cta--primary[href*="plans.html"]').nth(0);
        this.photoshop = page.locator('.feds-popup a[href*="photoshop.html"]');
        this.AdobeStock = page.locator('.feds-popup a[href*="stock.adobe.com"]');
        this.photo = page.locator('a[href$="promoid=D8F91JW4&mv=other"]');
        this.pdf = page.locator('a[href*="acrobat-pro-cc.html"]');
        this.aIOverviewCC = page.locator('.feds-popup a[href*="ai/overview.html"]').nth(0);
        this.adobeFirefly = page.locator('a[href*="firefly.html"]');

        this.individuals = page.locator('.feds-navLink[href*="all-apps.html"]');
        this.companies = page.locator('.feds-navLink[href*="promoid=KH8NV9ZS&mv=other"]');
        this.allApsOverview = page.locator('.feds-navLink[href*="?promoid=HVQ7WXK7&mv=other"]');
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

        // Document Cloud Elements
        this.adobeAcrobat = page.locator('a[href$="acrobat.html"] .feds-navLink-content');
        this.acrobatPlansAndPricing = page.locator('.feds-cta.feds-cta--primary[href$="/pricing.html"]');
        this.acrobatReader = page.locator('a[href$="pdf-reader.html"]');
        this.business = page.locator('.feds-popup a[href$="acrobat/business.html"]');
        this.government = page.locator('a[href$="/government.html"]');
        this.aiOverviewDC = page.locator('.feds-popup a[href$="/ai/overview.html"]').nth(1);
        this.aiInAcrobat = page.locator('.feds-navLink[href$="generative-ai-pdf.html"]');
        this.pdfToWord = page.locator('a[href$="pdf-to-word.html"]');
        this.wordToPDF = page.locator('a[href$="word-to-pdf.html"]');
        this.developerResources = page.locator('a[href$="it-tools.html"]');
        this.eventsAndWebinars = page.locator('a[href$="webinars.html"]');

        this.AIOverviewDCTwo = page.locator('.feds-popup a[href$="/ai/overview.html"]').nth(0);
        this.consultationBeforePurchase = page.locator('.feds-popup a[href$="0120-693-724"]');

        this.smallBusiness = page.locator('.feds-popup a[href*="small-business.html"]');
        this.homeAndPersonal = page.locator('.feds-popup a[href*="personal-document-management.html"]');

        // Experience Cloud Elements
        this.adobeExperienceCloud = page.locator('.feds-popup a[href*="business.adobe.com"]').nth(0);
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
        this.training = page.locator('a[href*="learning.adobe"]');

        this.insightsAndAudiences = page.locator('.feds-popup a[href$="personalization.html"]');
        this.b2bMarketing = page.locator('.feds-popup a[href$="b2b-marketing.html"]');
        this.requestAdemo = page.locator('.feds-popup a[href$="experience-cloud.html"]');
        this.analytics = page.locator('.feds-popup a[href$="adobe-analytics.html"]');
        this.experienceManagerAssets = page.locator('.feds-popup a[href$="aem-assets.html"]');
        this.aiProgramOverview = page.locator('.feds-popup a[href*="ai/overview.html"]').nth(1);
        this.aiProgramOverviewTwo = page.locator('.feds-popup a[href*="ai/overview.html"]').nth(2);
        this.aiOverview = page.locator('.feds-popup a[href*="ai/overview.html"]');
        this.adobeSummit = page.locator('a[href*="summit.adobe.com"]');
        this.senseiGenAI = page.locator('.feds-navLink[href*="adobe-sensei-genai.html"]');

        // Help-X Elements
        this.helpCentre = page.locator('.feds-popup a[href$="support.html"]:nth-child(1)');
        this.downloadAndInstall = page.locator(".feds-cta--secondary[href$='catalog.html']");
        this.contact = page.locator(".feds-cta--primary[href$='open-jarvis-chat']");
        this.manageMyAccount = page.locator(".feds-popup a[href*='account.adobe']").nth(0);
        this.subscribeToAdobeStatus = page.locator("a[href$='proactivesubscriptions']");
        this.creativeCloudTutorials = page.locator("a[href$='learn']");
        this.adobeExperienceLeague = page.locator("a[href*='experienceleague']:nth-child(4)");

        this.helpCentreTwo = page.locator('.feds-popup a[href$="support.html"]:nth-child(1)').nth(0);
        this.helpCentreThree = page.locator('.feds-popup a[href$="support.html"]:nth-child(2)');
        this.accountManagementTwo = page.locator('.feds-popup a[href$="account.adobe.com/"]').nth(1);
        this.showAllHelpTopics = page.locator('.feds-popup li a[href$="support.html"]');
        this.getInfoAboutTipsTutorialsSpecialOffers = page.locator('.feds-popup a[href$="?promoid=TKZTL9PK%20"]');

        // Footer Elements
        this.footerCreativeCloud = page.locator(".feds-footer-wrapper a[href*='creativecloud.html']");
        this.footerViewAllProducts = page.locator(".feds-navLink[href*='/products/catalog.html?']");
        this.footerCreativeCloudForBusiness = page.locator(".feds-footer-wrapper [href$='creativecloud/business.html']").nth(0);
        this.footerAcrobatForBusiness = page.locator(".feds-footer-wrapper a[href$='acrobat/business.html']");
        this.footerDiscountsForStudentsAndTeachers = page.locator(".feds-footer-wrapper a[href$='buy/students.html']");
        this.footerDigitalLearningSolutions = page.locator("a[href$='/elearning.html']");
        this.footerAppsforiOS = page.locator("a[href*='id852473028']");
        this.footerAppsforAndroid = page.locator("a[href*='id=com.adobe.cc']");
        this.footerWhatIsExperienceCloud = page.locator('.feds-footer-wrapper a[href*="business.adobe.com"]').nth(0);
        this.footerTermsOfUse = page.locator('a[href*="experiencecloudterms"]');
        this.footerDownloadAndInstall = page.locator('.feds-footer-wrapper a[href*="download-install.html"]');
        this.footerGenuineSoftware = page.locator('a[href*="genuine.html"]');
        this.footerAdobeBlog = page.locator('.feds-navLink[href*="blog.adobe"]');
        this.footerAdobeDeveloper = page.locator('a[href*="developer.adobe"]');
        this.footerLogInToYourAccount = page.locator('.feds-footer-wrapper a[href*="account.adobe"]').nth(0);
        this.footerAbout = page.locator('.feds-footer-wrapper [href*="about-adobe.html"]');
        this.footerIntegrity = page.locator('a[href*="integrity.html"]');

        // Featured Products
        this.footerAdobeAcrobatReaderlogo = page.locator('a[href$="reader/"]');
        this.footerAdobeExpresslogo = page.locator('a[href$="Z2G1FSYV&mv=other"]:nth-of-type(2)');
        this.footerPhotoshoplogo = page.locator('a[href$="photoshop/free-trial-download.html"]');
        this.footerIllustratorlogo = page.locator('a[href$="illustrator/free-trial-download.html"]');

        // Change Region and social media
        this.changeRegion = page.locator('.feds-regionPicker-wrapper');
        this.facebookLogo = page.locator('a[href*="facebook"]');
        this.instagramLogo = page.locator('a[href*="instagram"]');
        this.twitterlogo = page.locator('a[href*="twitter"]');
        this.linkedinLogo = page.locator('a[href*="linkedin"]');
        this.copyright = page.locator('.feds-footer-legalWrapper>p>span');
        this.privacyPolicy = page.locator('.feds-footer-legalWrapper a:nth-of-type(1)');
        this.termsOfUse = page.locator('.feds-footer-legalWrapper a:nth-of-type(2)');
        this.cookies = page.locator('.feds-footer-legalWrapper a:nth-of-type(3)');
        this.protectMyPersonalData = page.locator('.feds-footer-legalWrapper a:nth-of-type(4)');
        this.adChoices = page.locator('.feds-footer-legalWrapper a:nth-of-type(5)');
    };

    async validateGnavHomePage(page, baseURL, featureIndex, locale, homePage, home) {

        console.info(`[FEDSInfo] Checking page: ${baseURL}${features[featureIndex].path}`);

        await test.step(`Validating ${locale} Locale page`, async () => {
            const pageURL = `${baseURL}${features[featureIndex].path}`;
            await page.goto(pageURL, { waitUntil: 'domcontentloaded' });
            await expect(page).toHaveURL(pageURL);

            // Verifying the visibility of UNAV Elements
            await page.waitForLoadState('domcontentloaded');
            await Promise.all(homePage.locales[locale].unavElements.map(element => expect(home[element]).toBeVisible()));

            // Verifying the visibility of Creative Cloud Elements
            await this.gnavCC.click({ timeout: 5000 });
            await Promise.all(homePage.locales[locale].ccElements.map(element => expect(home[element]).toBeVisible()));

            // Verifying the visibility of Document cloud Elements
            await this.gnavDC.click({ timeout: 5000 });
            await Promise.all(homePage.locales[locale].dcElements.map(element => expect(home[element]).toBeVisible()));

            // Verifying the visibility of Experience Cloud Elements
            await this.gnavEC.click({ timeout: 5000 });
            await Promise.all(homePage.locales[locale].ecElements.map(element => expect(home[element]).toBeVisible()));

            // Verifying the visibility of Help-X Elements
            await this.gnavHelpX.click({ timeout: 5000 });
            await Promise.all(homePage.locales[locale].helpXElements.map(element => expect(home[element]).toBeVisible()));
            await this.gnavHelpX.click({ timeout: 5000 });

            // Verifying the visibility of Footer Elements
            await this.changeRegion.scrollIntoViewIfNeeded();
            await Promise.all(homePage.locales[locale].footerElements.map(element => expect(home[element]).toBeVisible()));
        });
    };
};