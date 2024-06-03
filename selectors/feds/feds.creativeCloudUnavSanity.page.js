import { expect, test } from "@playwright/test";
import { features } from "../../features/feds/prodSanity/creativeCloudUnavSanity.spec";

export default class CreativeCloudUnavSanity {
    constructor(page) {
        this.page = page;

        // Adobe Brand Logo, appswitcher and signIn button
        this.adobeLogo = page.locator('a.feds-brand');
        this.appSwitcher = page.locator('#unav-app-switcher');
        this.signInButton = page.locator('#unav-profile');
        this.signInButtonTwo = page.locator('.feds-signIn');

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

        this.photoVideoAndDesign = page.locator('.feds-navItem:nth-child(1) button');
        this.creativeCloud = page.locator('.feds-navItem:nth-child(2) a');
        this.program = page.locator('.feds-navItem:nth-child(3) button');
        this.subjectArea = page.locator('.feds-navItem:nth-child(4) button');
        this.trainingAndSupport = page.locator('.feds-navItem:nth-child(5) button');
        this.pricesAndSubscriptions = page.locator('.feds-navItem:nth-child(6) a');
        this.aboInfo = page.locator('.feds-navItem:nth-child(7) a');
        this.appRecomendation = page.locator('.feds-navItem:nth-child(8) a');

        this.buyNowButton = page.locator('.feds-cta-wrapper [href*="plans.html"]').nth(1);
        this.buyNowButtonTwo = page.locator('.feds-cta-wrapper [href*="plans.html?filter=acrobat"]');

        // Creativity & Design
        this.whatIsCC = page.locator('.feds-popup [href*="creativecloud.html"]').nth(0);
        this.photographers = page.locator('.feds-popup [href*="photography.html"]').nth(0);
        this.studentsAndTeachers = page.locator('.feds-popup [href*="students.html"]');
        this.individuals = page.locator('.feds-popup [href*="all-apps.html"]').nth(0);
        this.educationInstitutions = page.locator('.feds-popup [href*="education.html"]');
        this.business = page.locator('.feds-popup [href*="business.html"]');
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
        this.adobeStockTwo = page.locator('.feds-popup [href*="?promoid=JQVGW2DZ&mv=other"]');
        this.adobeFireflyPro = page.locator('.feds-popup a[href$="generative-ai/firefly.html"]').nth(0);
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

        this.adobeExpressIn = page.locator('[href*="HCS3XGLY&mv=other"]');

        this.photo = page.locator('.feds-popup [href*="?promoid=D8F91JW4&mv=other"]');
        this.graphicDesign = page.locator('.feds-menu-items a[href$="/design.html"]');
        this.Video = page.locator('.feds-menu-items a[href$="/video.html"]');
        this.illustration = page.locator('.feds-menu-items a[href$="/illustration.html"]');
        this.socialMedia = page.locator('.feds-menu-items a[href$="/social-media.html"]');
        this.threeDAndAR = page.locator('.feds-popup a[href$="/3d-ar.html"]').nth(0);
        this.pdf = page.locator('.feds-menu-items a[href$="acrobat-pro-cc.html"]');

        this.aiOverviewCC = page.locator('.feds-popup a[href$="ai/overview.html"]');
        this.adobeFirefly = page.locator('.feds-popup a[href$="products/firefly.html"]');
        this.adobeFireflyCC = page.locator('.feds-popup a[href*="firefly.html"]');

        this.adobecom = page.locator('.feds-popup a[href$="/index.html"]');
        this.pdfAndESignatures = page.locator('.feds-popup a[href$="/acrobat.html"]');
        this.marketingAndCommerce = page.locator('.feds-popup a[href*="business.adobe.com"]');
        this.helpAndSupport = page.locator('.feds-popup a[href$="support.html"]');

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
        this.footerAbout = page.locator('.feds-footer-wrapper a[href$="about-adobe.html"]');

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
    async validatingUnavElements() {
        await this.page.waitForLoadState("networkidle");
        const elements = [this.adobeLogo, this.creativityAndDesign, this.adobeCreativeCloud, this.explore, this.features, this.forBusiness, this.comparePlans,
        this.learnAndSupport, this.buyNowButton, this.appSwitcher, this.signInButton];
        const promises = elements.map(async element => { await expect(element).toBeVisible() })
        await Promise.all(promises);
    };

    async validatingUnavSecondSetOfElements() {
        await this.page.waitForLoadState("networkidle");
        const elements = [this.adobeLogo, this.photoVideoAndDesign, this.creativeCloud, this.program, this.subjectArea, this.trainingAndSupport,
        this.pricesAndSubscriptions, this.aboInfo, this.appRecomendation, this.buyNowButton, this.appSwitcher, this.signInButton];
        const promises = elements.map(async element => { await expect(element).toBeVisible() })
        await Promise.all(promises);
    };

    async validatingUnavThirdSetOfElements() {
        await this.page.waitForLoadState("networkidle");
        const elements = [this.adobeLogo, this.creativityAndDesign, this.creativeCloud, this.program, this.subjectArea, this.trainingAndSupport,
        this.pricesAndSubscriptions, this.aboInfo, this.appRecomendation, this.buyNowButton, this.signInButtonTwo];
        const promises = elements.map(async element => { await expect(element).toBeVisible() })
        await Promise.all(promises);
    };

    async validatingUnavFourthSetOfElements() {
        await this.page.waitForLoadState("networkidle");
        const elements = [this.adobeLogo, this.creativityAndDesign, this.adobeCreativeCloud, this.explore, this.features, this.forBusiness, this.comparePlans,
        this.learnAndSupport, this.buyNowButton, this.signInButtonTwo];
        const promises = elements.map(async element => { await expect(element).toBeVisible() });
        await Promise.all(promises);
    };

    // Creativity & Design 
    async validatingCreativityAndDesignElements() {
        await this.creativityAndDesign.click({ timeout: 5000 });
        await this.page.waitForLoadState("networkidle");
        const elements = [this.whatIsCC, this.photographers, this.studentsAndTeachers, this.individuals, this.business, this.schoolsAndUniversities,
        this.viewPlansAndPricing, this.photoshop, this.adobeExpress, this.lightroom, this.illustrator, this.premierePro, this.adobeStock, this.viewAllProducts,
        this.photo, this.graphicDesign, this.Video, this.illustration, this.socialMedia, this.threeDAndAR, this.pdf, this.aiOverviewCC, this.adobeFirefly,
        this.adobecom, this.pdfAndESignatures, this.marketingAndCommerce, this.helpAndSupport];

        const promises = elements.map(async element => { await expect(element).toBeVisible() })
        await Promise.all(promises);
        await this.creativityAndDesign.click({ timeout: 5000 });
    };

    async validatingCreativityAndDesignElementsSecondSet() {
        await this.creativityAndDesign.click({ timeout: 5000 });
        await this.page.waitForLoadState('networkidle');
        const elements = [this.whatIsCC, this.photoshop, this.adobeExpress, this.lightroom, this.illustrator, this.premierePro, this.adobeStock, this.viewPlansAndPricing,
        this.individuals, this.business, this.photographers, this.studentsAndTeachers, this.schoolsAndUniversities, this.viewAllProducts, this.photo, this.graphicDesign,
        this.Video, this.illustration, this.socialMedia, this.threeDAndAR, this.pdf, this.aiOverviewCC, this.adobeFirefly, this.adobecom, this.pdfAndESignatures,
        this.marketingAndCommerce, this.helpAndSupport];

        const promises = elements.map(async element => { await expect(element).toBeVisible() })
        await Promise.all(promises);
        await this.creativityAndDesign.click({ timeout: 5000 });
    };

    async validatingCreativityAndDesignElementsThirdSet() {
        await this.creativityAndDesign.click({ timeout: 5000 });
        await this.page.waitForLoadState("networkidle");
        const elements = [this.whatIsCC, this.photographers, this.studentsAndTeachers, this.individuals, this.business, this.schoolsAndUniversities,
        this.forGovernmentAgencies, this.benifitsForCreativeCloudPaidMembers, this.viewPlansAndPricing, this.photoshop, this.adobeExpress, this.lightroom,
        this.illustrator, this.premierePro, this.adobeStock, this.adobeFireflyPro, this.viewAllProducts, this.photo, this.graphicDesign, this.Video, this.illustration,
        this.socialMedia, this.threeDAndAR, this.pdf, this.adobeFirefly, this.adobecom, this.pdfAndESignatures, this.marketingAndCommerce, this.helpAndSupport];

        const promises = elements.map(async element => { await expect(element).toBeVisible() })
        await Promise.all(promises);
        await this.creativityAndDesign.click({ timeout: 5000 });
    };

    async validatingCreativityAndDesignElementsFourthSet() {
        await this.creativityAndDesign.click({ timeout: 5000 });
        await this.page.waitForLoadState("networkidle");
        const elements = [this.whatIsCC, this.photoshop, this.adobeExpress, this.adobePro, this.illustrator, this.premierePro, this.adobeStockTwo, this.seeAllProducts,
        this.individuals, this.photographers, this.studentsAndTeachers, this.business, this.seePlansAndPricing, this.photo, this.graphicDesign, this.Video, this.illustration,
        this.socialMedia, this.threeDAndAR, this.pdf, this.aiOverviewCC, this.adobeFirefly, this.adobecom, this.pdfAndESignatures, this.marketingAndCommerce, this.helpAndSupport];

        const promises = elements.map(async element => { await expect(element).toBeVisible() })
        await Promise.all(promises);
        await this.creativityAndDesign.click({ timeout: 5000 });
    };

    async validatingCreativityAndDesignElementsFifthSet() {
        await this.creativityAndDesign.click({ timeout: 5000 });
        await this.page.waitForLoadState("networkidle");
        const elements = [this.whatIsCC, this.photographers, this.studentsAndTeachers, this.individuals, this.business, this.schoolsAndUniversities,
        this.viewPlansAndPricing, this.photoshop, this.adobeExpress, this.lightroom, this.illustrator, this.premierePro, this.adobeStock, this.viewAllProducts,
        this.photo, this.graphicDesign, this.Video, this.illustration, this.socialMedia, this.threeDAndAR, this.pdf, this.adobeFirefly,
        this.adobecom, this.pdfAndESignatures, this.marketingAndCommerce, this.helpAndSupport];

        const promises = elements.map(async element => { await expect(element).toBeVisible() })
        await Promise.all(promises);
        await this.creativityAndDesign.click({ timeout: 5000 });
    };

    async validatingCreativityAndDesignElementsSixthSet() {
        await this.creativityAndDesign.click({ timeout: 5000 });
        await this.page.waitForLoadState("networkidle");
        const elements = [this.whatIsCC, this.photographers, this.studentsAndTeachers, this.individuals, this.business, this.schoolsAndUniversities,
        this.viewPlansAndPricing, this.photoshop, this.adobeExpress, this.lightroom, this.illustrator, this.premierePro, this.adobeStock, this.viewAllProducts,
        this.photo, this.graphicDesign, this.Video, this.illustration, this.socialMedia, this.threeDAndAR, this.pdf, this.aiOverviewCC, this.adobeFireflyCC,
        this.adobecom, this.pdfAndESignatures, this.marketingAndCommerce, this.helpAndSupport];

        const promises = elements.map(async element => { await expect(element).toBeVisible() });
        await Promise.all(promises);
        await this.creativityAndDesign.click({ timeout: 5000 });
    };

    async validatingCreativityAndDesignElementsSeventhSet() {
        await this.creativityAndDesign.click({ timeout: 5000 });
        await this.page.waitForLoadState("networkidle");
        const elements = [this.removeBackground, this.resizeImage, this.covertImageToSVG, this.covertVideoToGIF, this.createQRCode, this.seeAllQuickActions, this.resume,
        this.posters, this.card, this.instagramPost, this.youTubeVideo, this.createNow, this.whatIsCC, this.adobeExpressIn, this.photoshop, this.premierePro,
        this.illustrator, this.seePlansAndPricing, this.adobeFireflyCC, this.adobecom, this.pdfAndESignatures, this.marketingAndCommerce, this.helpAndSupport];

        const promises = elements.map(async element => { await expect(element).toBeVisible() });
        await Promise.all(promises);
        await this.creativityAndDesign.click({ timeout: 5000 });
    };

    // Photo Video & Design
    async validatingPhotoVideoAndDesignElements() {
        this.photoVideoAndDesign.click({ timeout: 5000 });
        await this.page.waitForLoadState("networkidle");
        const elements = [this.whatIsCC, this.photographers, this.studentsAndTeachers, this.educationInstitutions, this.business, this.schoolsAndUniversities,
        this.viewPlansAndPricing, this.photoshop, this.adobeExpress, this.premierePro, this.illustrator, this.lightroom, this.adobeStock, this.viewAllProducts,
        this.photo, this.graphicDesign, this.Video, this.illustration, this.socialMedia, this.threeDAndAR, this.pdf, this.aiOverviewCC, this.adobeFirefly,
        this.adobecom, this.pdfAndESignatures, this.marketingAndCommerce, this.helpAndSupport];

        const promises = elements.map(async element => { await expect(element).toBeVisible() })
        await Promise.all(promises);
        this.photoVideoAndDesign.click({ timeout: 5000 });
    };

    // Explore
    async validatingExploreElements() {
        this.explore.click({ timeout: 5000 });
        const elements = [this.graphicDesignExplore];
        const promises = elements.map(async element => { await expect(element).toBeVisible() })
        await Promise.all(promises);
        this.explore.click({ timeout: 5000 });
    };

    async validatingExploreElementsSecondSet() {
        this.explore.click({ timeout: 5000 });
        const elements = [this.graphicDesignExploreIn];
        const promises = elements.map(async element => { await expect(element).toBeVisible() })
        await Promise.all(promises);
        this.explore.click({ timeout: 5000 });
    };

    // Learn & Support
    async validatingLearnAndSupportElements() {
        this.learnAndSupport.click({ timeout: 5000 });
        const elements = [this.home];
        const promises = elements.map(async element => { await expect(element).toBeVisible() });
        await Promise.all(promises);
        this.learnAndSupport.click({ timeout: 5000 });
    };

    // Program
    async validatingProgramElements() {
        this.program.click({ timeout: 5000 });
        const elements = [this.photoshopPr];
        const promises = elements.map(async element => { await expect(element).toBeVisible() })
        await Promise.all(promises);
        this.program.click({ timeout: 5000 });
    }

    async validatingProgramSecondSetOfElements() {
        this.program.click({ timeout: 5000 });
        const elements = [this.photoshopAp];
        const promises = elements.map(async element => { await expect(element).toBeVisible() })
        await Promise.all(promises);
        this.program.click({ timeout: 5000 });
    }

    // Subject Area
    async validatingSubjectAreaElements() {
        this.subjectArea.click({ timeout: 5000 });
        const elements = [this.photoSa];
        const promises = elements.map(async element => { await expect(element).toBeVisible() })
        await Promise.all(promises);
        this.subjectArea.click({ timeout: 5000 });
    }

    async validatingSubjectAreaSecondSetOfElements() {
        this.subjectArea.click({ timeout: 5000 });
        const elements = [this.photoCa];
        const promises = elements.map(async element => { await expect(element).toBeVisible() })
        await Promise.all(promises);
        this.subjectArea.click({ timeout: 5000 });
    }

    // Training & Support
    async validatingTrainingAndSupportElements() {
        this.trainingAndSupport.click({ timeout: 5000 });
        const elements = [this.innovations];
        const promises = elements.map(async element => { await expect(element).toBeVisible() })
        await Promise.all(promises);
        this.trainingAndSupport.click({ timeout: 5000 });
    }

    // Footer
    async validatingFooterElements() {
        const elements = [this.footerCreativeCloud, this.footerCreativeCloudForBusiness, this.footerdiscountForStudentsAndTeachers, this.footerappsForiOS,
        this.footerWhatIsExperienceCloud, this.footerDownloadAndInstall, this.footerAdobeBlog, this.footerLoginToYourAccount, this.footerAbout,
        this.footerAdobeAcrobatReaderlogo, this.footerAdobeExpresslogo, this.footerPhotoshoplogo, this.footerIllustratorlogo, this.changeRegion, this.facebookLogo,
        this.instagramLogo, this.twitterlogo, this.linkedinLogo, this.copyright, this.privacyPolicy, this.termsOfUse, this.cookies, this.protectMyPersonalData,
        this.adChoices];
        const promises = elements.map(async element => { await expect(element).toBeVisible() })
        await Promise.all(promises);
    };

    async validatingFooterElementsSecondSet() {
        const elements = [this.footerCreativeCloud, this.footerCreativeCloudForBusiness, this.footerdiscountForStudentsAndTeachers, this.footerappsForiOS,
        this.footerWhatIsExperienceCloudTwo, this.footerDownloadAndInstall, this.footerAdobeBlog, this.footerLoginToYourAccount, this.footerAbout,
        this.footerAdobeAcrobatReaderlogo, this.footerAdobeExpresslogo, this.footerPhotoshoplogo, this.footerIllustratorlogo, this.changeRegion, this.facebookLogo,
        this.instagramLogo, this.twitterlogo, this.linkedinLogo, this.copyright, this.privacyPolicy, this.termsOfUse, this.cookies, this.protectMyPersonalData,
        this.adChoices];
        const promises = elements.map(async element => { await expect(element).toBeVisible() })
        await Promise.all(promises);
    };

    async validatingFooterElementsThirdSet() {
        const elements = [this.footerCreativeCloud, this.footerWhatIsExperienceCloudTwo, this.footerDownloadAndInstall, this.footerAdobeBlog,
        this.footerLoginToYourAccount, this.footerAbout, this.footerAdobeAcrobatReaderlogo, this.footerAdobeExpresslogo, this.footerPhotoshoplogo,
        this.footerIllustratorlogo, this.changeRegion, this.facebookLogo, this.instagramLogo, this.twitterlogo, this.linkedinLogo, this.copyright,
        this.privacyPolicy, this.termsOfUse, this.cookies, this.protectMyPersonalData, this.adChoices];
        const promises = elements.map(async element => { await expect(element).toBeVisible() })
        await Promise.all(promises);
    };

    // Promo Button
    async closingPromoButton() {
        try {
            await this.closePromoButton.click({ timeout: 5000 });
        } catch (error) {
            console.error("Error occurred while clicking the closing the Promo button");
        }
    };

    // Test Script
    async validatingCreativeCloudUnavPages(page, baseURL, featureIndex, locale, creativeCloudUnav, creativeCloud) {

        console.info(`[FEDSInfo] Checking Page: ${baseURL}${features[featureIndex].path}`);

        const validateElementVisibility = async (element) => {
            await Promise.all(element.map(elem => expect(creativeCloud[elem]).toBeVisible()));
        };

        await test.step(`Validating ${locale} Locale Page`, async () => {
            const pageURL = `${baseURL}${features[featureIndex].path}`;
            await page.goto(pageURL, { waitUntil: 'domcontentloaded' });
            await expect(page).toHaveURL(pageURL);

            // Verifying the visibility of UNAV Elements
            await page.waitForLoadState('domcontentloaded');
            const { unavElements } = creativeCloudUnav.locales[locale];
            if (unavElements) await this[unavElements]();

            // Verifying the visibility of Elements for each Section
            const elementsToVerify = ["creativityAndDesignElements", "photoVideoAndDesignElements", "exploreElements", "learnAndSupportElements",
                "programElements", "subjectAreaElements", "trainingAndSupportElements"];

            for (const element of elementsToVerify) {
                const { [element]: elementVisibility } = creativeCloudUnav.locales[locale];
                if (elementVisibility) {
                    await this[elementVisibility]();
                }
            }

            // closing the Promo button
            await this.closingPromoButton();

            // Verifiying the visibility of footer Elements
            await this.changeRegion.scrollIntoViewIfNeeded();
            const { footerElements } = creativeCloudUnav.locales[locale];
            if (footerElements) await this[footerElements]();

            // Verifying and clicking the "Buy Now" button
            try {
                await this.buyNowButton.click({ timeout: 5000 });
            } catch (error) {
                await this.buyNowButtonTwo.click({ timeout: 5000 });
            }
            await page.waitForLoadState('domcontentloaded');
            const url = await page.url();
            console.info("[Validation] URL of Buy Now Page:", url);
            await expect.soft(page).toHaveURL(url);
        });
    };

};