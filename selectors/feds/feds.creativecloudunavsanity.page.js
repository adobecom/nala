import { expect } from "@playwright/test";

export default class CreativeCloudUnavSanity {
    constructor(page) {
        this.page = page;

        // Adobe Brand Logo, appswitcher and signIn button
        this.adobeLogo = page.locator('a.feds-brand');  
        this.appSwitcher = page.locator('#unav-app-switcher');
        this.signInButton = page.locator('#unav-profile');

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
        this.buyNowButton = page.locator('.feds-navItem:nth-child(8) a');

        // Creativity & Design
        this.whatIsCCU = page.locator('a[href$="adobe.com/creativecloud.html"]');
        this.photographersUs = page.locator('a[href$="photography.html"]:nth-child(2)');
        this.studentsAndTeachersUs = page.locator('a[href$="students.html"]:nth-child(3)');
        this.individualsUs = page.locator('a[href$="all-apps.html"]:nth-child(4)');
        this.businessUs = page.locator('a[href$="business.html"]:nth-child(5)');
        this.schoolsAndUniversitiesUs = page.locator('a[href$="education.html"]:nth-child(6)');
        this.viewPlansAndPricingUs = page.locator('.feds-cta--primary[href$="plans.html"]');
        this.photoshopUs = page.locator('a[href$="adobe.com/products/photoshop.html"]');
        this.adobeExpressUs = page.locator('a[href$="?promoid=Y69SGP43&mv=other"]');
        this.lightroomUs = page.locator('a[href$="lightroom.html"]:nth-child(3)');
        this.illustratorUs = page.locator('a[href$="illustrator.html"]:nth-child(4)');
        this.premiereProUs = page.locator('a[href$="premiere.html"]:nth-child(5)');
        this.adobeStockUs = page.locator('a[href*="stock.adobe.com"]:nth-child(6)');
        this.viewAllProductsUs = page.locator('a[href*="category=creativity-design"]:nth-child(7)');
        this.photoUs = page.locator('a[href$="D8F91JW4&mv=other"]');
        this.graphicDesignUs = page.locator('.feds-menu-items a[href$="/design.html"]');
        this.VideoUs = page.locator('.feds-menu-items a[href$="/video.html"]');
        this.illustrationUs = page.locator('.feds-menu-items a[href$="/illustration.html"]');
        this.socialMediaUs = page.locator('.feds-menu-items a[href$="/social-media.html"]');
        this.threeDAndARUs = page.locator('a[href$="/3d-ar.html"]');
        this.pdfUs = page.locator('.feds-menu-items a[href$="acrobat-pro-cc.html"]');
        this.aiOverviewCCUs = page.locator('a[href$="adobe.com/ai/overview.html"]');
        this.adobeFireflyUs = page.locator('a[href$="adobe.com/products/firefly.html"]');
        this.graphicDesignExploreUs = page.locator('a[href$="/design.html"]').nth(1);
        this.homeUs = page.locator('a[href$="creative-cloud.html"]');

        // Footer
        this.footerCreativeCloudUs = page.locator('a[href="/creativecloud.html"]');
        this.footerCreativeCloudForBusinessUs = page.locator('li a[href="/creativecloud/business.html"]');
        this.footerdiscountForStudentsAndTeachersUs = page.locator('li a[href$="/buy/students.html"]');
        this.footerappsForiOSUs = page.locator('a[href$="id852473028"]');
        this.footerWhatIsExperienceCloudUs = page.locator('.feds-menu-items a[href$="business.adobe.com/"]');
        this.footerDownloadAndInstallUs = page.locator('a[href$="download-install.html"]');
        this.footerAdobeBlogUs = page.locator('a[href$="blog.adobe.com/"]');
        this.footerLoginToYourAccountUs = page.locator('a[href$="account.adobe.com/"]');
        this.footerAboutUs = page.locator('a[href$="about-adobe.html"]');

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
    }

    /*Business Logics*/

    // United States
    async checkVisibilityOfUnavElements() {
        const unavElements = [
            this.creativityAndDesign, this.adobeCreativeCloud, this.explore, this.features,
            this.forBusiness, this.comparePlans, this.learnAndSupport, this.buyNowButton,
            this.appSwitcher, this.signInButton
        ];

        await Promise.all(unavElements.map(element => expect(element).toBeVisible()));
    }

    async checkVisibilityOfCreativityAndDesignElements() {
        const CreativityAndDesignElements = [
            this.whatIsCCU, this.photographersUs, this.studentsAndTeachersUs, this.individualsUs,
            this.businessUs, this.schoolsAndUniversitiesUs, this.viewPlansAndPricingUs, this.photoshopUs,
            this.adobeExpressUs, this.lightroomUs, this.illustratorUs, this.premiereProUs,
            this.adobeStockUs, this.viewAllProductsUs, this.photoUs, this.graphicDesignUs,
            this.VideoUs, this.illustrationUs, this.socialMediaUs, this.threeDAndARUs,
            this.pdfUs, this.aiOverviewCCUs, this.adobeFireflyUs
        ];
        await this.creativityAndDesign.click({ timeout: 5000 });
        await Promise.all(CreativityAndDesignElements.map(element => expect(element).toBeVisible()));
    }

    async checkVisibilityOfExploreElements() {
        const exploreElements = [this.graphicDesignExploreUs];
        await this.explore.click({ timeout: 5000 });
        await Promise.all(exploreElements.map(element => expect(element).toBeVisible()));
    }

    async checkVisibilityOfLearnAndSupportElements() {
        const learnAndSupportElements = [this.homeUs];
        await this.learnAndSupport.click({ timeout: 5000 });
        await Promise.all(learnAndSupportElements.map(element => expect(element).toBeVisible()));
        await this.learnAndSupport.click({ timeout: 5000 });
    }

    async checkVisibilityOfFooterElements() {
        const footerElements = [
            this.footerCreativeCloudUs, this.footerCreativeCloudForBusinessUs, this.footerdiscountForStudentsAndTeachersUs,
            this.footerappsForiOSUs, this.footerWhatIsExperienceCloudUs, this.footerDownloadAndInstallUs, this.footerAdobeBlogUs,
            this.footerLoginToYourAccountUs, this.footerAboutUs, this.footerAdobeAcrobatReaderlogo, this.footerAdobeExpresslogo,
            this.footerPhotoshoplogo, this.footerIllustratorlogo, this.changeRegion, this.facebookLogo, this.instagramLogo,
            this.twitterlogo, this.linkedinLogo, this.copyright, this.privacyPolicy, this.termsOfUse, this.cookies,
            this.protectMyPersonalData, this.adChoices
        ];

        await Promise.all(footerElements.map(element => expect(element).toBeVisible()));
    }

    async verifyBuyNowButton(page) {
        const url = await page.url();
        console.info("[Validation] URL of Buy Now Page:", url);
        await expect.soft(page).toHaveURL(url);
    }
}
