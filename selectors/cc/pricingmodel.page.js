export default class pricingmodel {
  constructor(page) {
    this.page = page;
    // pricing model page UI elements in page
    this.startFreeTrialCTA = page.locator('.modal.link-block.con-button.blue.button-xl.button-justified-mobile');
    this.ModelWindow = page.locator('.dialog-modal.commerce-frame.height-fit-content');
    this.modelHeading = page.locator('Try the full version of Adobe apps with a 7-day free trial.');
    this.tablist = page.locator('//div[@role="tablist"]').nth(0);
    this.individualTab = this.tablist.locator('//div[@data-query-value="individual"]');
    this.individualAllApps = this.individualTab.locator('//div[@daa-lh="individual_all_apps_card"]');
    this.subscriptionPanel = this.individualTab.locator('.subscription-panel.xf-content-height');
    this.subscriptionCCProduct_annual = this.subscriptionPanel.locator('.subscription-panel-offer').nth(0);
    this.subscriptionCCProduct_annual_commitment = this.subscriptionPanel.locator('.subscription-panel-offer-commitment').nth(0);
    this.businessTab = this.tablist.locator('//div[@data-query-value="team"]');
    this.educationTab = this.tablist.locator('//div[@data-query-value="edu"]');
    this.sslTransactionIndicator = page.locator('Secure transaction').nth(1);
    this.modelClose = page.locator('dialog-close');
  }
}
