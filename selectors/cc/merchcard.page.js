export default class merchcard {
  constructor(page) {
  this.page = page;
  // cc page march cards locators
  this.merchCard = page.locator('.merch-card.mini-compare-chart.static-links');
  this.merchProductTitle = this.merchCard.locator('all-appsprice---abm---creative-cloud-all-apps-100gb');
  this.meachBodyAppText = this.merchCard.locator('//div[@slot="body-m"]');
  this.merchBodyPrice = this.merchCard.locator('.price').nth(1);
  this.mercHeadPrice = this.merchCard.locator('.price').nth(0);
  this.merchActionArea = this.merchCard.locator('.action-area');
  this.merchFooterDiscription = this.merchCard.locator('.footer-row-cell-description').nth(0);
  this.merchFooerIcon = this.merchCard.locator('.footer-row-icon').nth(0);
  this.merchFreeTrialCTA = this.merchCard.locator('.con-button.outline.button-l');
  this.merchBuyNowCTA = this.merchCard.locator('.con-button.blue.button-l.placeholder-resolved');
  this.BestValueBadge = page.locator('//merch-card[@badge-text="Best value"]');
  //merch card Fragment references in page elements
  this.fragmentsection = page.locator('.fragment');
  this.ccAllappsPrice = this.fragmentsection.locator('//span[@class="price" and @aria-label="US$59.99 per month"]');
  this.ccOtherAppsPrice = this.fragmentsection.locator('//span[@class="price" and @aria-label="US$22.99"]');
  this.ccPhotographyPrice = this.fragmentsection.locator('//span[@class="price" and @aria-label="US$19.99 per month"]');
  this.ccSingleApp = this.fragmentsection.locator('//span[@class="price" and @aria-label="US$9.99 per month"]');
  this.ccOfferPrice = this.fragmentsection.locator('//span[@class="price" and @aria-label="US$19.99 per month"]');
  this.ccBusinessSingleApp = this.fragmentsection.locator('//span[@class="price" and @aria-label="US$37.99 per month per license"]');
  this.ccBusinessAllApps = this.fragmentsection.locator('//span[@class="price" and @aria-label="US$89.99 per month per license"]');
}
};

