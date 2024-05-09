import { expect } from "@playwright/test";

export default class CreativeCloudUnavSanity {
    constructor(page) {
        this.page = page;

        /*Adobe Brand Logo, appswitcher and signIn button*/
        this.adobeLogo = page.locator('a.feds-brand');
        this.adobelogoDe = page.locator('#gnt_17_0');
        this.appSwitcher = page.locator('#unav-app-switcher');
        this.signInButton = page.locator('#unav-profile');

        /*Promo Bar*/
        this.closePromoButton = page.locator('.promo-close');
        this.closePromoButtonDe = page.locator("//a[contains(@daa-ll,'Get started')]/ancestor::div[@role='document']/descendant::a[@class='dexter-CloseButton']");

        /*U-Nav Elements*/
        //United States
        this.creativityAndDesign = page.locator("//button[contains(@daa-ll,'Creativity Design')]");
        this.adobeCreativeCloud = page.locator("//a[contains(@daa-ll,'Adobe Creative Cloud')]");
        this.explore = page.locator("//button[contains(@daa-ll,'Explore')]");
        this.features = page.locator("//a[contains(@daa-ll,'Features')]");
        this.forBusiness = page.locator("//a[contains(@daa-ll,'For Business')]");
        this.comparePlans = page.locator("//a[contains(@daa-ll,'Compare Plans')]");
        this.learnAndSupport = page.locator("//button[contains(@daa-ll,'Learn Support')]");
        this.buyNowButton = page.locator("//a[contains(@daa-ll,'Buy now') and @class='feds-cta feds-cta--primary']");

        //Germany
        this.photoVideoAndDesignDe = page.locator("//li[@id='Globalnav.Creativity_Design']");
        this.creativeCloudDe = page.locator("//li[@id='gnt_548_0']");
        this.programsDe = page.locator("");
        this.subjectAreasDe = page.locator("");
        this.pricesAndSubscriptionsDe = page.locator("");
        this.subscriptionInfoDe = page.locator("");
        this.appRecomendationDe = page.locator("");
        this.buyNowDe = page.locator("");

        /*Creativity & Design*/
        //United States
        this.whatIsCCU = page.locator("//a[contains(@daa-ll,'What is Creative Cloud')]");
        this.photographersUs = page.locator("//a[contains(@daa-ll,'Photographers')]");
        this.studentsAndTeachersUs = page.locator("//a[contains(@daa-ll,'Students and teachers')]");
        this.individualsUs = page.locator("//a[contains(@daa-ll,'Individuals')]");
        this.businessUs = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Business')]");
        this.schoolsAndUniversitiesUs = page.locator("(//a[contains(@daa-ll,'Schools and universities')])[1]");
        this.viewPlansAndPricingUs = page.locator("//a[contains(@daa-ll,'View plans and pricing') and @class='feds-cta feds-cta--primary']");
        this.photoshopUs = page.locator("(//div[@class='feds-menu-items']/descendant::a[contains(@daa-ll,'Photoshop')])[1]");
        this.adobeExpressUs = page.locator("(//div[@class='feds-menu-items']/descendant::a[contains(@daa-ll,'Adobe Express')])[1]");
        this.lightroomUs = page.locator("//div[@class='feds-menu-items']/descendant::a[contains(@daa-ll,'Lightroom')]");
        this.illustratorUs = page.locator("//div[@class='feds-menu-items']/descendant::a[contains(@daa-ll,'Illustrator')]");
        this.premiereProUs = page.locator("(//div[@class='feds-menu-items']/descendant::a[contains(@daa-ll,'Premiere Pro')])[1]");
        this.adobeStockUs = page.locator("(//div[@class='feds-menu-items']/descendant::a[contains(@daa-ll,'Adobe Stock')])[1]");
        this.viewAllProductsUs = page.locator("//a[contains(@daa-ll,'View all products') and @class='feds-navLink feds-navLink--blue']");
        this.photoUs = page.locator("//div[@daa-lh='Explore']/descendant::a[contains(@daa-ll,'Photo')]");
        this.graphicDesignUs = page.locator("//div[@daa-lh='Explore']/descendant::a[contains(@daa-ll,'Graphic design')]");
        this.VideoUs = page.locator("//div[@daa-lh='Explore']/descendant::a[contains(@daa-ll,'Video')]");
        this.illustrationUs = page.locator("//div[@daa-lh='Explore']/descendant::a[contains(@daa-ll,'Illustration')]");
        this.socialMediaUs = page.locator("//div[@daa-lh='Explore']/descendant::a[contains(@daa-ll,'Social media')]");
        this.threeDAndARUs = page.locator("//div[@daa-lh='Explore']/descendant::a[contains(@daa-ll,'3D AR')]");
        this.pdfUs = page.locator("//div[@daa-lh='Explore']/descendant::a[contains(@daa-ll,'PDF')]");
        this.aiOverviewCCUs = page.locator("//div[@daa-lh='Artificial Intelligence']/descendant::a[contains(@daa-ll,'AI Overview')]");
        this.adobeFireflyUs = page.locator("//div[@daa-lh='Artificial Intelligence']/descendant::a[contains(@daa-ll,'Adobe Firefly')]");
        this.graphicDesignExploreUs = page.locator("//div[@class='feds-menu-column']/descendant::a[contains(@daa-ll,'Graphic Design')]");
        this.homeUs = page.locator("//div[@class='feds-menu-column']/descendant::a[contains(@daa-ll,'Home')]");

        /*Footer*/
        this.footerCreativeCloudUs = page.locator("//div[@daa-lh='Shop for']/descendant::a[contains(@daa-ll,'Creative Cloud')]");
        this.footerCreativeCloudForBusinessUs = page.locator("//div[@daa-lh='For business']/descendant::a[contains(@daa-ll,'Creative Cloud for business')]");
        this.footerdiscountForStudentsAndTeachersUs = page.locator("//div[@daa-lh='For education']/descendant::a[contains(@daa-ll,'Discounts for students and tea')]");
        this.footerappsForiOSUs = page.locator("//div[@daa-lh='For mobile']/descendant::a[contains(@daa-ll,'Apps for iOS')]");
        this.footerWhatIsExperienceCloudUs = page.locator("//div[@daa-lh='Experience Cloud']/descendant::a[contains(@daa-ll,'What is Experience Cloud')]");
        this.footerDownloadAndInstallUs = page.locator("//div[@daa-lh='Support']/descendant::a[contains(@daa-ll,'Download and install')]");
        this.footerAdobeBlogUs = page.locator("//div[@daa-lh='Resources']/descendant::a[contains(@daa-ll,'Adobe Blog')]");
        this.footerLoginToYourAccountUs = page.locator("//div[@daa-lh='Adobe Account']/descendant::a[contains(@daa-ll,'Log in to your account')]");
        this.footerAboutUs = page.locator("//div[@daa-lh='Adobe']/descendant::a[contains(@daa-ll,'About')]");

        //Featured Products
        this.footerAdobeAcrobatReaderlogo = page.locator("//div[@class='feds-featuredProducts']//a[contains(@daa-ll,'Adobe Acrobat Reader')]");
        this.footerAdobeExpresslogo = page.locator("//div[@class='feds-featuredProducts']//a[contains(@daa-ll,'Adobe Express')]");
        this.footerPhotoshoplogo = page.locator("//div[@class='feds-featuredProducts']//a[contains(@daa-ll,'Photoshop')]");
        this.footerIllustratorlogo = page.locator("//div[@class='feds-featuredProducts']//a[contains(@daa-ll,'Illustrator')]");
        this.footerAdobeReaderlogo = page.locator("//div[@class='feds-featuredProducts']//a[contains(@daa-ll,'Acrobat Reader')]");

        //Change Region and social media
        this.changeRegion = page.locator('div.feds-regionPicker-wrapper');
        this.facebookLogo = page.locator("//a[contains(@daa-ll,'facebook')]");
        this.instagramLogo = page.locator("//a[contains(@daa-ll,'instagram')]");
        this.twitterlogo = page.locator("//a[contains(@daa-ll,'twitter')]");
        this.linkedinLogo = page.locator("//a[contains(@daa-ll,'linkedin')]");
        this.copyright = page.locator('div.feds-footer-legalWrapper>p>span');
        this.privacyPolicy = page.locator('div.feds-footer-legalWrapper>p>a').nth(0);
        this.termsOfUse = page.locator('div.feds-footer-legalWrapper>p>a').nth(1);
        this.cookies = page.locator('div.feds-footer-legalWrapper>p>a').nth(2);
        this.protectMyPersonalData = page.locator('div.feds-footer-legalWrapper>p>a').nth(3);
        this.adChoices = page.locator('div.feds-footer-legalWrapper>p>a').nth(4);
    }

    /*Business Logics*/

    //United States
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
        await this.buyNowButton.click({ timeout: 5000 });
        const url = await page.url();
        console.info("[Validation] URL of Buy Now Page:", url);
        await expect.soft(page).toHaveURL(url);
    }
}
