export default class intlstagesanity {
  constructor(page) {
    this.page = page;
    // CC US Business Teams UI elements in page
    this.gnavFreeTrial = page.locator('//a[@class="feds-navLink" and  @daa-ll="Free trial-8"]').nth(0);
    this.gnavBuyNow = page.locator('//a[@class="feds-cta feds-cta--primary" and @daa-ll="Buy now-9"]').nth(0);
    this.gnavContactSalesPhoneNumner = page.locator('//a[@class="feds-navLink" and @daa-ll="800 915 9428-10"]').nth(0);
    this.freeTrial = page.locator('//a[@is="checkout-link" and @daa-ll="Free trial-2--Build your brand Gro"]');
    this.jarvisFeature = page.locator('#adbmsgCta');
    this.merchCard = page.locator('//merch-card[@class="merch-card segment secure" and @daa-lh="b1|merch-card"]');
    this.cardPrice = this.merchCard.locator('.price');

    // CC IN locale page locators
    this.gnavFeatures = page.locator('//a[@daa-ll="Features-4"]').nth(0);
    this.gnavComparePlans = page.locator('//a[@daa-ll="Compare Plans-6"]"]').nth(0);
    this.marqueeFreeTrial = page.locator('//a[@daa-ll="Free trial-3--Save over 35 on Crea"]');
    this.tabsFeature = page.locator('.tabList').nth(0);
    this.stickyPromoBar = page.locator('.section.promo-sticky-section.sticky-bottom');

    // KR locale Student page locators
    this.megaMenuItem = page.locator('//section[@daa-lh="크리에이티비티 및 디자인"]');
    this.breadCrumb = page.locator('.feds-breadcrumbs');
    this.marqueeBuyCTA = page.locator('//a[@is="checkout-link" and @daa-ll="구매하기-2--무한한 창작을 위한 첫걸음을 시작해 "]');
    this.masonryLayout = page.locator('.section.masonry-layout.masonry-up');
    this.marqueePrice = page.locator('.price.price-alternative').nth(0);
    this.priceCard = page.locator('.price.price-alternative').nth(1);
    this.studentSupportPhoneNumber = page.locator('//a[@href="tel:0805004019" and @daa-ll="080 500 4019-1--"]');
    this.globelFooter = page.locator('.feds-menu-items').nth(0);

    // Photoshop JP locale page locators
    this.psNavigationToProduct = page.locator('//a[@daa-ll="Photoshopを開く"]');
    this.mobilePromoText = page.locator('.mobile-up.promo-text');
    this.tabletPromoText = page.locator('.tablet-up.promo-text');
    this.desktopPromoText = page.locator('.desktop-up.promo-text');

    // FR premiere prodcut page locators
    this.pricingModelReferece = page.locator('//a[@href="#marqueectatwp"]');
    this.merchCard1 = page.locator('//merch-card[@class="merch-card mini-compare-chart static-links"]').nth(0);
    this.merchCard2 = page.locator('//merch-card[@class="merch-card mini-compare-chart static-links"]').nth(1);

    // FR CC business page locators
    this.adminConsoleGnavLink = page.locator('//a[@class="feds-navLink" and @daa-ll="Admin Console-5"]').nth(0);
    this.salesContactGnavLink = page.locator('//a[@href="tel:0805542592" and @class="feds-navLink"]').nth(0);
    this.businessTabListContainer = page.locator('.section.tablist-business-size-section');
    this.productFeatureTable = page.locator('.table.sticky-tablet-up.cancel-sticky');
    this.firstRow = this.productFeatureTable.locator('.row.row-1.row-heading');
    this.secondRow = this.productFeatureTable.locator('.row.row-2.divider');
  }
}
