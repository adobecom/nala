/* eslint-disable max-len */
export default class productionsanity {
  constructor(page) {
    this.page = page;
    // creativecloud page elements
    this.Gnav = page.locator('.feds-topnav');
    this.fedsNav = this.Gnav.locator('.feds-navLink.feds-navLink--hoverCaret').nth(0);
    this.signIn = this.Gnav.locator('.profile-comp.secondary-button');
    this.jarvisFeature = page.locator('#adbmsgCta');
    this.plansPriceingCTA = page.locator('.icon-area.con-button.outline');
    this.pricePods = page.locator('.section.xl-spacing.three-merch-cards.grid-width-10.mini-compare-chart');
    this.ccAllAppsPrice = this.pricePods.locator('//span[@class="price" and @aria-label="US$59.99 per month"]');
    this.ccPhotographyPrice = this.pricePods.locator('//span[@class="price" and @aria-label="US$19.99 per month"]').nth(0);
    this.buyNowCTA = this.pricePods.locator('.con-button.blue.button-l.placeholder-resolved').nth(0);
    // after effects product page elements
    this.localNav = this.Gnav.locator('feds-nav');
    this.magaMenuItems = this.Gnav.locator('.feds-navItem.feds-navItem--section.feds-navItem--megaMenu');
    this.localNavActiveItem = page.locator('//a[@daa-ll="After Effects-2"]');
    // eslint-disable-next-line max-len
    this.afterEffectProductPriceInMarquee = page.locator('//span[@aria-label="US$22.99 per month" and @class="price"]').nth(0);
    this.buyNowAECTA = page.locator('.con-button.blue.button-xl.button-justified-mobile');
    // creative cloud pricing page elements
    this.universalNav = this.Gnav.locator('#universal-nav');
    this.startFreeTrialCTA = page.locator('.modal.link-block.con-button.blue');
    this.tabSection = page.locator('.tab-list-container').nth(0);
    // Illustrator page elements
    this.appSwitcher = this.Gnav.locator('.unav-comp-app-switcher.unav-comp-icon');
    this.breadCrumb = this.Gnav.locator('.feds-breadcrumbs');
    this.freeTrialCTA = page.locator('.modal.link-block.con-button.outline.button-l.button-justified-mobile');
    // CCT page elements
    this.CCBusinessGnavLink = this.Gnav.locator('//a[@daa-ll="Creative Cloud for business-2"]');
    this.CCTBuynowCTA = this.Gnav.locator('//a[@daa-ll="Buy now-9"]');
    this.supportContact = this.Gnav.locator('//a[@daa-ll="800 915 9428-10"]');
    this.CCTeamsSingleAppPrice = page.locator('//span[@aria-label="US$37.99 per month per license" and @class="price"]'); 
    // CC Priceing model with all plans
    this.modelNavList = page.locator('.navList');
    this.individualPlanTab = page.locator('//span[@data-analytics-navlist-label="individualplanTab"]');
    this.businessPlanTab = page.locator('//span[@data-analytics-navlist-label="businessplanTab"]');
    this.studentAndTeacherTab = page.locator('//span[@data-analytics-navlist-label="studentsplanTab"]');
    this.IndividualPlanProduct1 = page.locator('.text.aem-GridColumn.aem-GridColumn--default--12.twp-card-title').nth(0);
    this.IndividualPlanProduct2 = page.locator('.text.aem-GridColumn.aem-GridColumn--default--12.twp-card-title').nth(1);
    this.IndividualPlanProduct1Price = page.locator('//span[@class="price" and @aria-label="US$22.99 per month per license"]').nth(0);
    this.IndividualPlanProduct2Price = page.locator('//span[@class="price" and @aria-label="US$59.99 per month per license"]');
    this.subscriptionModelPanel = page.locator('.subscription-panel');
    this.panelSubScriptionPick1 = page.locator('//span[@class="price" and @aria-label="US$22.99 per month per license"]').nth(1);
    this.panelSubScriptionPick2 = page.locator('//span[@class="price" and @aria-label="US$263.88 per year per license"]').nth(0);
    this.purchaseCTA = page.locator('.spectrum-Button.spectrum-Button--cta');
    // CC UK locale page locators
    this.UKGnavPriceCTA = this.Gnav.locator('.feds-cta.feds-cta--primary').nth(0);
    this.breadCrumbUKAnimationLink = this.breadCrumb.locator('//a[@href="/uk/creativecloud/animation-software.html"]');
    this.LearnMoreLink = page.locator('//a[@href="/uk/creativecloud/animation/discover/animation.html" and @daa-ll="Learn more-1--Ultimate beginner s "]');
    // CC DE locale page locators
    this.DEGnavPriceCTA = this.Gnav.locator('.feds-cta.feds-cta--primary').nth(2);
    this.ExpandableGnavMenuItems = this.Gnav.locator('.feds-navLink.feds-navLink--hoverCaret').nth(0);
    this.NavLocalizaedItems1 = this.Gnav.locator('//a[@class="feds-navLink" and @daa-ll="Für Unternehmen-5"]');
    this.consonantCards = page.locator('.consonant-HalfHeightCard-img').nth(0);
    // CC JP locale page locators
    this.JPExpandableMegaMenu = this.Gnav.locator('.feds-navItem.feds-navItem--section.feds-navItem--active.feds-navItem--megaMenu');
    this.LocalizedNavLinks = this.Gnav.locator('//a[@class="feds-navLink" and @daa-ll="新機能-4"]');
    this.CCJPAllAppsPrice = page.locator('//span[@class="price" and @aria-label="7,780 &#20870; 毎月"]');
    this.checkOutLink = page.locator('//a[@is="checkout-link"]').nth(0);
    this.JPGnavPriceCTA = this.Gnav.locator('.feds-cta.feds-cta--primary').nth(2);
    // CC FR locale page locators
    this.FRLocalizedNavLinks = this.Gnav.locator('//a[@class="feds-navLink" and @daa-ll="Nouveautés-4"]');
    this.marqueeCTAFR = page.locator('//a[@daa-ll="Explorer les outils -1--Qu est ce que l anim"]');
  }
}
