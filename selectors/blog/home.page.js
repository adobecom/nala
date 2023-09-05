export default class BlogHomePage {
  constructor(page) {
    this.page = page;
       
    // Blog and Adobe Logo
    this.adobeLogo = this.page.locator('.gnav-logo');
    this.blogLogo = this.page.locator('.gnav-brand.no-logo');
   
    // Gnav menu locators
    this.gnavMain = this.page.locator('.gnav-mainnav');

    this.newsMenu = this.gnavMain.locator('.gnav-navitem.has-menu').nth(0);
    this.newsMenuList = this.newsMenu.locator('#navmenu-0 ul li');

    this.insightInspirationMenu = this.gnavMain.locator('.gnav-navitem.has-menu').nth(1);
    this.insightInspirationMenuList = this.insightInspirationMenu.locator('#navmenu-1 ul li');
    this.gnavPromoCard = this.insightInspirationMenu.locator('gnav-promo.card');

    this.responsibilityMenu = this.gnavMain.locator('.gnav-navitem.has-menu').nth(2);
    this.responsibilityMenuList = this.responsibilityMenu.locator('#navmenu-2 ul li');

    this.adobeLifeMenu = this.gnavMain.locator('.gnav-navitem.has-menu').nth(3);
    this.responsibilityMenuList = this.adobeLifeMenu.locator('#navmenu-3 ul li');

    // Contextual search and Sign-in profile locators
    this.gnavSearch = this.page.locator('.gnav-search.contextual');
    this.searchIcon = this.gnavSearch.locator('.gnav-search-button');

    this.gnavProfile = this.page.locator('.gnav-profile');
    this.signIn = this.gnavProfile.locator('.gnav-signin');

    // Featured article block locators
    this.featuredArticleBlock = this.page.locator('.featured-article');
    this.featuredArticleCard = this.featuredArticleBlock.locator('.featured-article-card');
    this.featuredArticleImage = this.featuredArticleBlock.locator('.featured-article-card-image');

    // Text block locators
    this.textBlock = this.page.locator('.text.text-block.con-block');
    this.textBlockHeader = this.textBlock.locator('#the-latest-news');
    this.readMoreNewsButton = this.textBlock.locator('.con-button.outline');

    // Article feed block locators
    this.articleFeedBlock = this.page.locator('.article-feed.appear');
    this.loadMoreArticlesButton = this.articleFeedBlock.locator('.load-more.con-button.outline');
    
    // Footer locators
    this.globalFooter = this.page.locator('.global-footer');
    this.changeLanguageText = this.globalFooter.locator('.feds-regionPicker-text');
    this.changeLanguageButton = this.globalFooter.locator('.feds-regionPicker');
    this.changeLanguageList = this.globalFooter.locator('.fragment p');    
    this.copywright = this.globalFooter.locator('.feds-footer-privacySection');
    this.privacyLink = this.globalFooter.locator('a.feds-footer-privacyLink').nth(0);
    this.termsOfUseLink = this.globalFooter.locator('a.feds-footer-privacyLink').nth(1);
    this.cookiePreferencesLink = this.globalFooter.locator('a.feds-footer-privacyLink').nth(2);
    this.doNotSellInformationLink = this.globalFooter.locator('a.feds-footer-privacyLink').nth(3);
    this.adChoicesLink = this.globalFooter.locator('a.feds-footer-privacyLink').nth(4);
  }
}

