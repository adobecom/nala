export default class CommercePage {
    constructor(page) {
      this.page = page;
  
      this.price = page.locator('//span[@data-template="price"]');
      this.priceOptical = page.locator('//span[@data-template="optical"]');
      this.priceStrikethrough = page.locator('//span[@data-template="strikethrough"]');
      this.buyNowCta = page.locator('//a[contains(@daa-ll, "Buy now")]');
      this.freeTrialCta = page.locator('//a[contains(@daa-ll, "Free trial")]');

    }
  }
  
