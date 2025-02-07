import { expect } from '@playwright/test';
import FedsFooter from './feds.footer.page.js';

export default class IllustratorPageSanity {
  constructor(page) {
    this.page = page;
    this.feds = new FedsFooter(page);

    // U-NAV Elements
    this.adobe = page.locator('.feds-brand-container a.feds-brand');
    this.appSwitcher = page.locator('#unav-app-switcher');
    this.signInButton = page.locator('#unav-profile div');
    this.fedsNav = page.locator('.feds-nav');
    this.creativityAndDesign = this.fedsNav.locator('.feds-navItem button').nth(0);
    this.illustrator = this.fedsNav.locator('.feds-navItem').nth(1);
    this.features = this.fedsNav.locator('.feds-navItem').nth(2);
    this.comparePlans = this.fedsNav.locator('.feds-navItem').nth(3);
    this.freeTrialDetails = this.fedsNav.locator('.feds-navItem').nth(4);
    this.tryItForFree = this.fedsNav.locator('.feds-navItem').nth(5);

    this.shopFor = page.locator('.feds-menu-headline').nth(0);
    this.featuredProducts = page.locator('.feds-menu-headline').nth(1);
    this.explore = page.locator('.feds-menu-headline').nth(2);

    this.hamburgerMenu = page.locator('.feds-toggle');
    this.closeMegaMenu = page.locator('.close-icon');
    this.adobeLogoMegaMenu = page.locator('.top-bar .feds-brand-image');

    this.breadHome = page.locator('.feds-nav .feds-breadcrumbs li').nth(0);
    this.breadAdobeCC = page.locator('.feds-nav .feds-breadcrumbs li').nth(1);
    this.breadAdobeIllustrator = page.locator('.feds-nav .feds-breadcrumbs li').nth(2);

    this.shopForNN = page.locator('.tabs button').nth(0);
    this.featuredProductsNN = page.locator('.tabs button').nth(1);
    this.exploreNN = page.locator('.tabs button').nth(2);

    this.creativityAndDesignTitle = page.locator('.title h7');

    // L-Nav Elements
    this.illustratorLnav = page.locator('.feds-localnav-title');
    this.overviewLnav = page.locator('.feds-localnav-items .feds-navLink').nth(0);

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
    this.threeDAndAR = page.locator('.feds-popup a[href*="3d"]').nth(0);
    this.pdf = page.locator('.feds-menu-items a[href$="acrobat-pro-cc.html"]');

    this.aiOverviewCC = page.locator('.feds-popup a[href$="ai/overview.html"]');
    this.adobeFirefly = page.locator('.feds-popup a[href$="products/firefly.html"]');

    this.adobecom = page.locator('.feds-crossCloudMenu-item').nth(0);
    this.pdfAndESignatures = page.locator('.feds-crossCloudMenu-item').nth(1);
    this.marketingAndCommerce = page.locator('.feds-crossCloudMenu-item').nth(2);
    this.helpAndSupport = page.locator('.feds-crossCloudMenu-item').nth(3);

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

    this.quickActions = page.locator('.feds-menu-headline').nth(0);
  }

  // U-NAV
  async validatingUnavElements(country) {
    const elementsToCheck = [
      { element: this.adobe, conditions: { defaultVisibility: true } },
      { element: this.appSwitcher, conditions: { defaultVisibility: true } },
      { element: this.signInButton, conditions: { defaultVisibility: true } },
      { element: this.creativityAndDesign, conditions: { defaultVisibility: true } },
      { element: this.illustrator, conditions: { defaultVisibility: true } },
      { element: this.features, conditions: { defaultVisibility: true } },
      { element: this.comparePlans, conditions: { defaultVisibility: true } },
      { element: this.freeTrialDetails, conditions: { defaultVisibility: true } },
      { element: this.tryItForFree, conditions: { includeCountries: ['Germany'] } },
    ];

    await Promise.all(elementsToCheck.map(async ({ element, conditions }) => {
      if (conditions.includeCountries && conditions.includeCountries.includes(country)) {
        await expect(element).toBeVisible();
      } else if (conditions.defaultVisibility) {
        await expect(element).toBeVisible();
      }
    }));
  }

  // Creativity & Design
  async validatingCreativityAndDesignElements(country) {
    await this.creativityAndDesign.click();

    const elementsToCheck = [
      { element: this.whatIsCC, conditions: { defaultVisibility: true } },
      { element: this.photographers, conditions: { defaultVisibility: true, excludeCountries: ['India'] } },
      { element: this.individuals, conditions: { defaultVisibility: true, excludeCountries: ['India'] } },
      { element: this.viewPlansAndPricing, conditions: { defaultVisibility: true, excludeCountries: ['India', 'Spain'] } },

      { element: this.photoshop, conditions: { defaultVisibility: true } },
      { element: this.adobeExpress, conditions: { defaultVisibility: true } },
      { element: this.lightroom, conditions: { defaultVisibility: true, excludeCountries: ['India'] } },
      { element: this.illustratorCd, conditions: { defaultVisibility: true } },
      { element: this.premierePro, conditions: { defaultVisibility: true } },
      {
        element: this.adobeStock,
        conditions: {
          defaultVisibility: true,
          excludeCountries: ['India', 'Indonesia English', 'Indonesia'],
        },
      },
      { element: this.viewAllProducts, conditions: { defaultVisibility: true, excludeCountries: ['India'] } },

      { element: this.photo, conditions: { defaultVisibility: true, excludeCountries: ['India'] } },
      { element: this.graphicDesign, conditions: { defaultVisibility: true, excludeCountries: ['India'] } },
      { element: this.Video, conditions: { defaultVisibility: true, excludeCountries: ['India'] } },
      { element: this.threeDAndAR, conditions: { defaultVisibility: true, excludeCountries: ['India'] } },
      { element: this.pdf, conditions: { defaultVisibility: true, excludeCountries: ['India'] } },

      { element: this.adobecom, conditions: { defaultVisibility: true } },
      { element: this.pdfAndESignatures, conditions: { defaultVisibility: true } },
      { element: this.marketingAndCommerce, conditions: { defaultVisibility: true } },
      { element: this.helpAndSupport, conditions: { defaultVisibility: true } },

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
      { element: this.adobeExpressIn, conditions: { includeCountries: ['India'] } },
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

    await this.creativityAndDesign.click();
  }

  // Footer
  async validatingFooterElements() {
    await this.feds.changeRegionButton.scrollIntoViewIfNeeded();
    const elements = [
      this.feds.footerCreativeCloud, this.feds.footerCreativeCloudForBusiness, this.feds.footerDiscountsForStudentsAndTeachers,
      this.feds.footerAppsforiOS, this.feds.footerWhatIsExperienceCloud, this.feds.footerDownloadAndInstall,
      this.feds.footerAdobeBlogSecond, this.feds.footerLogInToYourAccount, this.feds.footerAbout, this.feds.footerAdobeAcrobatReaderlogo,
      this.feds.footerAdobeExpresslogo, this.feds.footerPhotoshoplogo, this.feds.footerIllustratorlogo, this.feds.changeRegionButton,
      this.feds.facebookIcon, this.feds.instagramIcon, this.feds.twitterIcon, this.feds.linkedInIcon, this.feds.legalCopyright,
      this.feds.privacyLink, this.feds.termsOfUseLink, this.feds.cookiePreferencesLink, this.feds.protectMyPersonalData,
      this.feds.adChoicesLogo,
    ];

    await Promise.all(elements.map(async (element) => {
      await expect(element).toBeVisible();
    }));
  }

  // Mobile methods:

  // U-Nav
  async validatingUnav(test) {
    const elements = [this.hamburgerMenu, this.adobe, this.appSwitcher, this.signInButton];
    await Promise.all(elements.map(async (element) => {
      await expect(element).toBeVisible();
    }));

    await this.scrollAndCheck(test, 880, 2000);
    await this.scrollToBottom(test);
    await this.scrollToTop(test);
    await this.scrollAndCheck(test, 1240, 2000);
  }

  // Hamburger Menu
  async validatingHamburgerMenu(country) {
    await this.hamburgerMenu.click();
    const elementsToCheck = [
      { element: this.creativityAndDesign, conditions: { defaultVisibility: true } },
      { element: this.illustrator, conditions: { defaultVisibility: true } },
      { element: this.features, conditions: { defaultVisibility: true } },
      { element: this.comparePlans, conditions: { defaultVisibility: true } },
      { element: this.freeTrialDetails, conditions: { defaultVisibility: true } },
      { element: this.tryItForFree, conditions: { includeCountries: ['Germany'] } },
    ];

    await Promise.all(elementsToCheck.map(async ({ element, conditions }) => {
      if (conditions.excludeCountries && conditions.excludeCountries.includes(country)) {
        await expect(element).not.toBeVisible();
      } else if (conditions.defaultVisibility) {
        await expect(element).toBeVisible();
      }
    }));
  }

  // Creativity & Design
  async validatingCreativityAndDesign(country) {
    await this.creativityAndDesign.click();

    const elementsToCheck = [
      { element: this.shopFor, conditions: { defaultVisibility: true } },
      { element: this.featuredProducts, conditions: { defaultVisibility: true } },
      { element: this.explore, conditions: { defaultVisibility: true } },
    ];

    await Promise.all(elementsToCheck.map(async ({ element, conditions }) => {
      if (conditions.excludeCountries && conditions.excludeCountries.includes(country)) {
        await expect(element).not.toBeVisible();
      } else if (conditions.defaultVisibility) {
        await expect(element).toBeVisible();
      }
    }));

    const skipCountries = ['United Kingdom', 'India', 'Spain'];
    const addCountries = ['United Kingdom', 'India', 'Spain'];

    if (!skipCountries.includes(country)) {
      await this.creativityAndDesignElements(country);
    } else if (addCountries.includes(country)) {
      await this.quickActionsElements(country);
    } else {
      await expect(this.whatIsCC).toBeVisible();
    }

    await this.hamburgerMenu.click();
  }

  async creativityAndDesignElements(country) {
    await this.page.waitForTimeout(1000);
    await this.shopFor.click();
    const elementsToCheck = [
      { element: this.whatIsCC, conditions: { defaultVisibility: true } },
    ];

    await Promise.all(elementsToCheck.map(async ({ element, conditions }) => {
      if (conditions.excludeCountries && conditions.excludeCountries.includes(country)) {
        await expect(element).not.toBeVisible();
      } else if (conditions.defaultVisibility) {
        await expect(element).toBeVisible();
      }
    }));
  }

  async quickActionsElements(country) {
    await this.quickActions.click();
    const elementsToCheck = [
      { element: this.whatIsCC, conditions: { defaultVisibility: true, excludeCountries: ['India'] } },
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

  // Footer
  async validatingFooter(test) {
    await this.feds.changeRegionButton.scrollIntoViewIfNeeded();

    const elements = [this.feds.changeRegionButton, this.feds.facebookIcon, this.feds.instagramIcon,
      this.feds.twitterIcon, this.feds.linkedInIcon, this.feds.legalCopyright, this.feds.privacyLink,
      this.feds.termsOfUseLink, this.feds.cookiePreferencesLink, this.feds.protectMyPersonalData,
      this.feds.adChoicesLogo, this.feds.adChoicesLink,
    ];
    await Promise.all(elements.map((element) => expect(element).toBeVisible()));

    await this.scrollAndCheckBackward(test, 330, 2000);
    await this.scrollToTop(test);
    await this.scrollToBottom(test);
    await this.scrollAndCheckBackward(test, 750, 2000);
  }

  // iPad and Tab Methods
  async validatingCreativityAndDesignTabiPad(country) {
    await this.creativityAndDesign.click();

    const elementsToCheck = [
      { element: this.whatIsCC, conditions: { defaultVisibility: true, excludeCountries: ['Germany'] } },
      { element: this.photographers, conditions: { defaultVisibility: true, excludeCountries: ['India'] } },
      { element: this.studentsAndTeachers, conditions: { defaultVisibility: true, excludeCountries: ['India'] } },
      { element: this.individuals, conditions: { defaultVisibility: true, excludeCountries: ['Germany', 'France', 'India'] } },
      { element: this.business, conditions: { defaultVisibility: true, excludeCountries: ['India'] } },
      { element: this.schoolsAndUniversities, conditions: { defaultVisibility: true, excludeCountries: ['India', 'Spain'] } },
      { element: this.viewPlansAndPricing, conditions: { defaultVisibility: true, excludeCountries: ['India', 'Spain'] } },

      { element: this.photoshop, conditions: { defaultVisibility: true } },
      { element: this.adobeExpress, conditions: { defaultVisibility: true } },
      { element: this.lightroom, conditions: { defaultVisibility: true, excludeCountries: ['India', 'Spain'] } },
      { element: this.illustratorCd, conditions: { defaultVisibility: true } },
      { element: this.premierePro, conditions: { defaultVisibility: true } },
      { element: this.adobeStock, conditions: { defaultVisibility: true, excludeCountries: ['India'] } },
      { element: this.viewAllProducts, conditions: { defaultVisibility: true, excludeCountries: ['India', 'Spain'] } },

      { element: this.photo, conditions: { defaultVisibility: true, excludeCountries: ['India'] } },
      { element: this.graphicDesign, conditions: { defaultVisibility: true, excludeCountries: ['India'] } },
      { element: this.Video, conditions: { defaultVisibility: true, excludeCountries: ['India'] } },
      { element: this.illustration, conditions: { defaultVisibility: true, excludeCountries: ['India'] } },
      { element: this.threeDAndAR, conditions: { defaultVisibility: true, excludeCountries: ['India'] } },
      { element: this.pdf, conditions: { defaultVisibility: true, excludeCountries: ['India'] } },

      { element: this.aiOverviewCC, conditions: { defaultVisibility: true, excludeCountries: ['Japan'] } },
      { element: this.adobeFirefly, conditions: { defaultVisibility: true, excludeCountries: ['Japan'] } },

      { element: this.adobeFireflyMp, conditions: { includeCountries: ['Japan'] } },
      { element: this.governmentAgencies, conditions: { includeCountries: ['Japan'] } },
      { element: this.benifitsForCC, conditions: { includeCountries: ['Japan'] } },
      { element: this.acrobatPro, conditions: { includeCountries: ['Spain'] } },
      { element: this.adobeStockEs, conditions: { includeCountries: ['Spain'] } },
      { element: this.seeAllProducts, conditions: { includeCountries: ['Spain'] } },
      { element: this.seePlansAndPricingEs, conditions: { includeCountries: ['Spain'] } },

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
      { element: this.adobeExpressIn, conditions: { includeCountries: ['India'] } },
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

    await this.creativityAndDesign.click();
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
      throw new Error('Page did not scroll as expected.');
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
      throw new Error('Page did not scroll Backward as expected.');
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
    console.log('Is the page scrolled th the bottom?', isScrolled);

    if (!isScrolled) {
      test.fail('Page did not scroll as expected.');
      throw new Error('Page did not scroll as expected.');
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
      throw new Error('Page did not scroll to the top as expected.');
    }
  }

  // New Nav Methods

  // L-Nav
  async validatingLnavElements() {
    await this.illustratorLnav.click();
    await expect(this.overviewLnav).toBeVisible();
    await this.illustratorLnav.click();
  }

  // Hamburger Menu
  async validatingHamburgerMenuElements() {
    await this.hamburgerMenu.click();

    const elements = [this.adobeLogoMegaMenu, this.closeMegaMenu, this.breadHome, this.breadAdobeCC, this.breadAdobeIllustrator,
      this.creativityAndDesignTitle];
    await Promise.all(elements.map((element) => expect(element).toBeVisible()));

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

    await expect(this.viewPlansAndPricing).toBeVisible();
    await expect(this.photoshop).toBeVisible();

    await this.shopForNN.click();
    await this.exploreNN.click();
    await this.featuredProductsNN.click();

    await this.closeMegaMenu.click();
  }
}
