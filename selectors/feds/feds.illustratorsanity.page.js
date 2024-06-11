import { expect, test } from '@playwright/test';
import { features } from '../../features/feds/prodSanity/illustratorsanity.spec.js';

export default class IllustratorPageSanity {
  constructor(page) {
    this.page = page;

    // U-NAV Elements
    this.adobe = page.locator('.feds-brand');
    this.creativityAndDesign = page.locator('.feds-navItem:nth-child(1) button');
    this.illustrator = page.locator('.feds-navItem:nth-child(2) a');
    this.features = page.locator('.feds-navItem:nth-child(3) a');
    this.comparePlans = page.locator('.feds-navItem:nth-child(4) a');
    this.freeTrialDetails = page.locator('.feds-navItem:nth-child(5) a');
    this.tryItForFree = page.locator('.feds-navItem:nth-child(6) div');
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
  async validatingunavElements(locale) {
    await this.page.waitForLoadState('networkidle');
    const elements = [this.adobe, this.creativityAndDesign, this.illustrator, this.features, this.comparePlans,
      this.freeTrialDetails, this.tryItForFree, this.appSwitcher, this.signInButton];
    const promises = elements.map(async (element) => {
      switch (element) {
        case this.tryItForFree:
          if (locale === 'Germany') {
            await expect(element).toBeVisible();
          }
          break;
        default:
          await expect(element).toBeVisible();
          break;
      }
    });
    await Promise.all(promises);
  }

  async validatingunavElementsSecondSet() {
    await this.page.waitForLoadState('networkidle');
    const elements = [this.adobe, this.creativityAndDesign, this.illustrator, this.features,
      this.comparePlans, this.freeTrialDetails, this.signInButtonTwo];
    const promises = elements.map(async (element) => { await expect(element).toBeVisible(); });
    await Promise.all(promises);
  }

  // Creativity & Design
  async validatingCreativityAndDesignElements(locale) {
    await this.creativityAndDesign.click({ timeout: 5000 });
    await this.page.waitForLoadState('networkidle');
    const elements = [this.whatIsCC, this.photographers, this.studentsAndTeachers, this.individuals,
      this.business, this.schoolsAndUniversities, this.viewPlansAndPricing, this.photoshop, this.adobeExpress,
      this.lightroom, this.illustratorCd, this.premierePro, this.adobeStock, this.viewAllProducts, this.photo,
      this.graphicDesign, this.Video, this.illustration, this.socialMedia, this.threeDAndAR, this.pdf,
      this.aiOverviewCC, this.adobeFirefly, this.adobecom, this.pdfAndESignatures, this.marketingAndCommerce,
      this.helpAndSupport, this.seeSpecialOffers, this.adobeFireflyMp];

    const promises = elements.map(async (element) => {
      switch (element) {
        case this.seeSpecialOffers:
          if (locale === 'United Kingdom') { await expect(element).toBeVisible(); }
          break;
        case this.adobeFirefly:
          if (locale !== 'Poland') { return; }
          await expect(element).toBeVisible();
          break;
        case this.adobeFireflyMp:
          if (locale === 'Poland') { await expect(element).toBeVisible(); }
          break;
        default: await expect(element).toBeVisible();
      }
    });
    await Promise.all(promises);
    await this.creativityAndDesign.click({ timeout: 5000 });
  }

  async validatingCreativityAndDesignElementsSecondSet() {
    await this.creativityAndDesign.click({ timeout: 5000 });
    await this.page.waitForLoadState('networkidle');
    const elements = [this.whatIsCC, this.photographers, this.studentsAndTeachers, this.schoolsAndUniversities,
      this.business, this.viewPlansAndPricing, this.photoshop, this.adobeExpress, this.premierePro,
      this.illustratorCd, this.lightroom, this.adobeStock, this.viewAllProducts, this.photo, this.graphicDesign,
      this.Video, this.illustration, this.socialMedia, this.threeDAndAR, this.pdf, this.aiOverviewCC,
      this.adobeFirefly, this.adobecom, this.pdfAndESignatures, this.marketingAndCommerce, this.helpAndSupport];
    const promises = elements.map(async (element) => { await expect(element).toBeVisible(); });
    await Promise.all(promises);
    await this.creativityAndDesign.click({ timeout: 5000 });
  }

  async validatingCreativityAndDesignElementsThirdSet() {
    await this.creativityAndDesign.click({ timeout: 5000 });
    await this.page.waitForLoadState('networkidle');
    const elements = [this.whatIsCC, this.photographers, this.studentsAndTeachers, this.individuals, this.business,
      this.schoolsAndUniversities, this.governmentAgencies, this.benifitsForCC, this.viewPlansAndPricing,
      this.photoshop, this.adobeExpress, this.lightroom, this.illustratorCd, this.premierePro, this.adobeStock,
      this.adobeFireflyMp, this.viewAllProducts, this.photo, this.graphicDesign, this.Video, this.illustration,
      this.socialMedia, this.threeDAndAR, this.pdf, this.adobeFirefly, this.adobecom, this.pdfAndESignatures,
      this.marketingAndCommerce, this.helpAndSupport];
    const promises = elements.map(async (element) => { await expect(element).toBeVisible(); });
    await Promise.all(promises);
    await this.creativityAndDesign.click({ timeout: 5000 });
  }

  async validatingCreativityAndDesignElementsFourthSet() {
    await this.creativityAndDesign.click({ timeout: 5000 });
    await this.page.waitForLoadState('networkidle');
    const elements = [this.removeBackground, this.resizeImage, this.covertImageToSVG, this.covertVideoToGIF,
      this.createQRCode, this.seeAllQuickActions, this.resume, this.posters, this.card, this.instagramPost,
      this.youTubeVideo, this.createNow, this.whatIsCC, this.adobeExpressIn, this.photoshop, this.premierePro,
      this.illustratorCd, this.seePlansAndPricing, this.adobeFireflyMp, this.adobecom, this.pdfAndESignatures,
      this.marketingAndCommerce, this.helpAndSupport];
    const promises = elements.map(async (element) => { await expect(element).toBeVisible(); });
    await Promise.all(promises);
    await this.creativityAndDesign.click({ timeout: 5000 });
  }

  async validatingCreativityAndDesignElementsFifthSet() {
    await this.creativityAndDesign.click({ timeout: 5000 });
    await this.page.waitForLoadState('networkidle');
    const elements = [this.whatIsCC, this.photoshop, this.adobeExpress, this.acrobatPro, this.illustratorCd,
      this.premierePro, this.adobeStockEs, this.seeAllProducts, this.individuals, this.photographers,
      this.studentsAndTeachers, this.business, this.seePlansAndPricingEs, this.photo, this.graphicDesign,
      this.Video, this.illustration, this.socialMedia, this.threeDAndAR, this.pdf, this.aiOverviewCC,
      this.adobeFirefly, this.adobecom, this.pdfAndESignatures, this.marketingAndCommerce, this.helpAndSupport];
    const promises = elements.map(async (element) => { await expect(element).toBeVisible(); });
    await Promise.all(promises);
    await this.creativityAndDesign.click({ timeout: 5000 });
  }

  // Footer
  async validatingfooterElements(locale) {
    await this.page.waitForLoadState('networkidle');
    const elements = [this.footerCreativeCloud, this.footerCreativeCloudForBusiness,
      this.footerdiscountForStudentsAndTeachers, this.footerappsForiOS, this.footerWhatIsExperienceCloud,
      this.footerDownloadAndInstall, this.footerAdobeBlog, this.footerLoginToYourAccount, this.footerAbout,
      this.footerAdobeAcrobatReaderlogo, this.footerAdobeExpresslogo, this.footerPhotoshoplogo,
      this.footerIllustratorlogo, this.changeRegion, this.facebookLogo, this.instagramLogo, this.twitterlogo,
      this.linkedinLogo, this.copyright, this.privacyPolicy, this.termsOfUse, this.cookies,
      this.protectMyPersonalData, this.adChoices, this.privacySection];

    const promises = elements.map(async (element) => {
      switch (element) {
        case this.privacySection:
          if (locale === 'Korea') {
            await expect(element).toBeVisible();
          }
          break;
        default: await expect(element).toBeVisible();
      }
    });
    await Promise.all(promises);
  }

  // Test Script
  async validatingIllustratorPage(page, baseURL, featureIndex, locale, illustrator) {
    console.info(`[FEDSInfo] Checking Page: ${baseURL}${features[featureIndex].path}`);

    await test.step(`Validating ${locale} Locale Page`, async () => {
      const pageURL = `${baseURL}${features[featureIndex].path}`;
      await page.goto(pageURL, { waitUntil: 'domcontentloaded' });
      await expect(page).toHaveURL(pageURL);

      // Verifying the visibility of U-NAV Elements
      const { unavElements } = illustrator.locales[locale];
      if (unavElements) await this[unavElements]();

      // Verifying the Visibility of Creativity & Design Elemants
      const { creativityAndDesignElements } = illustrator.locales[locale];
      if (creativityAndDesignElements) await this[creativityAndDesignElements]();

      // Verifying the visibility of Footer Elements
      await this.changeRegion.scrollIntoViewIfNeeded();
      const { footerElements } = illustrator.locales[locale];
      if (footerElements) await this[footerElements]();
    });
  }
}
