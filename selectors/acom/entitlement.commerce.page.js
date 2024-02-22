export default class EntitlementCommerce {
  constructor(page) {
    this.page = page;
    // universal nav login account type
    this.loginType = page.locator('div.feds-profile > div > div > ul > li:nth-child(5) > button');
    // entitlement block locators
    this.ccAllAppsCTA = page.locator('//*[contains(@daa-ll,"CC All Apps")]');
    this.photoshopBuyCTA = page.locator('//*[contains(@daa-ll,"Buy now-1--Photoshop")]');
    this.photoshopFreeCTA = page.locator('//*[contains(@daa-ll,"Free trial-2--Photoshop")]');
    this.switchModalIframe = page.locator('#upgrade-modal > iframe');
  }
}
