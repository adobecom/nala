import { expect } from '@playwright/test';

export default class IllustratorPageSanity {
  constructor(page) {
    this.page = page;

    // U-NAV Elements
    this.adobe = page.locator('.feds-brand');
    this.fedsNav = page.locator('.feds-nav');
    this.creativityAndDesign = this.fedsNav.locator('.feds-navItem button').nth(0);
    this.illustrator = this.fedsNav.locator('.feds-navItem').nth(1);
    this.features = this.fedsNav.locator('.feds-navItem').nth(2);
    this.comparePlans = this.fedsNav.locator('.feds-navItem').nth(3);
    this.freeTrialDetails = this.fedsNav.locator('.feds-navItem').nth(4);
    this.tryItForFree = this.fedsNav.locator('.feds-navItem').nth(5);
    this.appSwitcher = page.locator('#unav-app-switcher');
    this.signInButton = page.locator('#unav-profile div');
    this.signInButtonTwo = page.locator('.feds-signIn');

    // Creativity & Design Elements
    this.whatIsCC = page.locator('.feds-popup [href*="creativecloud.html"]').nth(0);
    this.photographers = page.locator('.feds-popup [href*="photography.html"]').nth(0);
    this.studentsAndTeachers = page.locator('.feds-popup [href*="students.html"]');
    this.individuals = page.locator('.feds-popup [href*="all-apps.html"]').nth(0);
    this.business = page.locator('.feds-popup [href*="business.html"]');
    this.schoolsAndUniversities = page.locator('.feds-popup [href*="education.html"]');
    this.viewPlansAndPricing = page.locator('.feds-cta--primary[href$="plans.html"]').nth(0);

    this.governmentAgencies = page.locator('.feds-popup [href*="government.html"]');
    this.benifitsForCC = page.locator('.feds-popup [href*="cc-paid-member-benefits.html"]');

    this.photoshop = page.locator('.feds-popup [href*="products/photoshop.html"]').nth(0);
    this.adobeExpress = page.locator('.feds-popup [href*="express"]').nth(0);
    this.lightroom = page.locator('.feds-popup [href*="photoshop-lightroom.html"]').nth(0);
    this.illustratorCd = page.locator('.feds-popup [href*="products/illustrator.html"]').nth(0);
    this.premierePro = page.locator('.feds-popup [href*="products/premiere.html"]').nth(0);
    this.adobeStock = page.locator('.feds-popup [href*="globalnav"]');
    this.adobeFireflyMp = page.locator('.feds-popup [href*="generative-ai/firefly.html"]');
    this.viewAllProducts = page.locator('.feds-popup [href*="category=creativity-design"]').nth(0);

    this.photo = page.locator('.feds-popup [href*="?promoid=D8F91JW4&mv=other"]');
    this.graphicDesign = page.locator('.feds-menu-items a[href$="/design.html"]');
    this.Video = page.locator('.feds-menu-items a[href$="/video.html"]');
    this.illustration = page.locator('.feds-menu-items a[href$="/illustration.html"]');
    this.socialMedia = page.locator('.feds-menu-items a[href$="/social-media.html"]');
    this.threeDAndAR = page.locator('.feds-popup a[href$="/3d-ar.html"]').nth(0);
    this.pdf = page.locator('.feds-menu-items a[href$="acrobat-pro-cc.html"]');

    this.seeSpecialOffers = page.locator('.feds-popup a[href*="special-offers.html"]');

    this.aiOverviewCC = page.locator('.feds-popup a[href$="ai/overview.html"]');
    this.adobeFirefly = page.locator('.feds-popup a[href$="products/firefly.html"]');

    this.adobecom = page.locator('.feds-popup a[href$="/index.html"]');
    this.pdfAndESignatures = page.locator('.feds-popup a[href$="/acrobat.html"]');
    this.marketingAndCommerce = page.locator('.feds-popup a[href*="business.adobe.com"]');
    this.helpAndSupport = page.locator('.feds-popup a[href$="support.html"]');

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
    this.seePlansAndPricing = page.locator('.feds-cta-wrapper [href*="WXYGHWCC&mv=other"]');

    this.adobeStockEs = page.locator('.feds-popup [href*="JQVGW2DZ&mv=other"]');
    this.acrobatPro = page.locator('[href$="J7XBWKC4&mv=other"]');
    this.seeAllProducts = page.locator('.feds-popup [href*="JVLHVXNY&mv=other"]');
    this.seePlansAndPricingEs = page.locator('.feds-cta-wrapper [href*="KLZPV68R&mv=other"]');

    // Footer
    this.footerCreativeCloud = page.locator('.feds-footer-wrapper a[href*="creativecloud.html"]');
    this.footerCreativeCloudForBusiness = page.locator('.feds-footer-wrapper a[href*="creativecloud/business.html"]');
    this.footerdiscountForStudentsAndTeachers = page.locator('.feds-footer-wrapper a[href*="students.html"]');
    this.footerappsForiOS = page.locator('.feds-footer-wrapper a[href*="id852473028"]');
    this.footerWhatIsExperienceCloud = page.locator('.feds-menu-items a[href*="business.adobe.com"]').nth(0);
    this.footerDownloadAndInstall = page.locator('.feds-footer-wrapper a[href$="download-install.html"]');
    this.footerAdobeBlog = page.locator('.feds-footer-wrapper a[href*="blog.adobe.com/"]');
    this.footerLoginToYourAccount = page.locator('a[href$="account.adobe.com/"]').nth(0);
    this.footerAbout = page.locator('.feds-footer-wrapper a[href$="about-adobe.html"]');

    // Featured Products
    this.footerAdobeAcrobatReaderlogo = page.locator('a[href$="reader/"]');
    this.footerAdobeExpresslogo = page.locator('a[href$="Z2G1FSYV&mv=other"]:nth-of-type(2)');
    this.footerPhotoshoplogo = page.locator('a[href$="photoshop/free-trial-download.html"]');
    this.footerIllustratorlogo = page.locator('.feds-featuredProducts a[href$="illustrator/free-trial-download.html"]');

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
    this.privacySection = page.locator('.feds-footer-privacySection:nth-child(2)');
  }

  // U-NAV
  async validatingUnavElements(country) {
    await this.page.waitForLoadState('domcontentloaded');

    const elements = [
      { element: this.adobe },
      { element: this.creativityAndDesign },
      { element: this.illustrator },
      { element: this.features },
      { element: this.comparePlans },
      { element: this.freeTrialDetails, includedCountries: ['Germany'] },
      { element: this.tryItForFree },
      {
        element: this.appSwitcher,
        excludedCountries: ['United Kingdom', 'India', 'Canada English', 'Canada French',
          'Mexico', 'Australia', 'Indonesia', 'Indonesia English', 'Thailand English', 'Thailand',
          'Singapore', 'Philippines', 'Philippines English', 'Middle East And North Africa'],
      },
      {
        element: this.signInButton,
        excludedCountries: ['United Kingdom', 'India', 'Canada English', 'Canada French',
          'Mexico', 'Australia', 'Indonesia', 'Indonesia English', 'Thailand English', 'Thailand',
          'Singapore', 'Philippines', 'Philippines English', 'Middle East And North Africa'],
      },
      {
        element: this.signInButtonTwo,
        includedCountries: ['United Kingdom', 'India', 'Canada English', 'Canada French',
          'Mexico', 'Australia', 'Indonesia', 'Indonesia English', 'Thailand English', 'Thailand',
          'Singapore', 'Philippines', 'Philippines English', 'Middle East And North Africa'],
      },
    ];

    await Promise.allSettled(elements.map(async ({ element, includedCountries = [], excludedCountries = [] }) => {
      if (
        !excludedCountries.includes(country) && (includedCountries.length === 0 || includedCountries.includes(country))
      ) {
        await expect(element).toBeVisible();
        return;
      }
      await expect(element).not.toBeVisible();
    }));
  }

  // Creativity & Design
  async validatingCreativityAndDesignElements(country) {
    await this.creativityAndDesign.click();
    await this.page.waitForLoadState('domcontentloaded');

    const elements = [
      { element: this.whatIsCC },
      { element: this.photographers },
      { element: this.studentsAndTeachers },
      { element: this.individuals, excludedCountries: ['Germany', 'France', 'Italy'] },
      { element: this.business },
      { element: this.schoolsAndUniversities, excludedCountries: ['Spain'] },
      { element: this.viewPlansAndPricing, excludedCountries: ['Spain'] },
      { element: this.photoshop },
      { element: this.adobeExpress },
      { element: this.lightroom, excludedCountries: ['Spain'] },
      { element: this.illustratorCd, excludedCountries: ['Spain'] },
      { element: this.premierePro },
      { element: this.adobeStock, excludedCountries: ['Spain'] },
      { element: this.viewAllProducts, excludedCountries: ['Spain'] },
      { element: this.photo },
      { element: this.graphicDesign },
      { element: this.Video },
      { element: this.illustration },
      { element: this.socialMedia },
      { element: this.threeDAndAR },
      { element: this.pdf },
      { element: this.aiOverviewCC, excludedCountries: ['Japan'] },
      { element: this.adobeFirefly, excludedCountries: ['Poland', 'Japan'] },
      { element: this.adobecom },
      { element: this.pdfAndESignatures },
      { element: this.marketingAndCommerce },
      { element: this.helpAndSupport },
      { element: this.seeSpecialOffers, includedCountries: ['United Kingdom'] },
      { element: this.adobeFireflyMp, includedCountries: ['Poland', 'Japan'] },
      { element: this.governmentAgencies, includedCountries: ['Japan'] },
      { element: this.benifitsForCC, includedCountries: ['Japan'] },
      { element: this.acrobatPro, includedCountries: ['Spain'] },
      { element: this.adobeStockEs, includedCountries: ['Spain'] },
      { element: this.seeAllProducts, includedCountries: ['Spain'] },
      { element: this.seePlansAndPricingEs, includedCountries: ['Spain'] },
    ];

    await Promise.allSettled(elements.map(async ({ element, includedCountries = [], excludedCountries = [] }) => {
      if (
        !excludedCountries.includes(country) && (includedCountries.length === 0 || includedCountries.includes(country))
      ) {
        await expect(element).toBeVisible();
        return;
      }
      await expect(element).not.toBeVisible();
    }));

    await this.creativityAndDesign.click();
  }

  async validatingCreativityAndDesignElementsSecondSet() {
    await this.creativityAndDesign.click();
    await this.page.waitForLoadState('domcontentloaded');

    const elements = [this.removeBackground, this.resizeImage, this.covertImageToSVG, this.covertVideoToGIF,
      this.createQRCode, this.seeAllQuickActions, this.resume, this.posters, this.card, this.instagramPost,
      this.youTubeVideo, this.createNow, this.whatIsCC, this.adobeExpressIn, this.photoshop, this.premierePro,
      this.illustratorCd, this.seePlansAndPricing, this.adobeFireflyMp, this.adobecom, this.pdfAndESignatures,
      this.marketingAndCommerce, this.helpAndSupport];

    await Promise.allSettled(elements.map(async (element) => {
      await expect(element).toBeVisible();
    }));

    await this.creativityAndDesign.click();
  }

  // Footer
  async validatingFooterElements(country) {
    await this.changeRegion.scrollIntoViewIfNeeded();
    const elements = [this.footerCreativeCloud, this.footerCreativeCloudForBusiness,
      this.footerdiscountForStudentsAndTeachers, this.footerappsForiOS, this.footerWhatIsExperienceCloud,
      this.footerDownloadAndInstall, this.footerAdobeBlog, this.footerLoginToYourAccount, this.footerAbout,
      this.footerAdobeAcrobatReaderlogo, this.footerAdobeExpresslogo, this.footerPhotoshoplogo,
      this.footerIllustratorlogo, this.changeRegion, this.facebookLogo, this.instagramLogo, this.twitterlogo,
      this.linkedinLogo, this.copyright, this.privacyPolicy, this.termsOfUse, this.cookies,
      this.protectMyPersonalData, this.adChoices, this.privacySection];

    await Promise.allSettled(elements.map(async (element) => {
      switch (element) {
        case this.privacySection:
          if (country === 'Korea') {
            await expect(element).toBeVisible();
          }
          break;
        default:
          await expect(element).toBeVisible();
      }
    }));
  }
}
