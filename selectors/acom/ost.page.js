export default class OSTPage {
    constructor(page) {
      this.page = page;
  
      this.searchField = page.locator('//input[contains(@data-testid,"search")]');
      this.productList = page.locator('//span[contains(@class,"productName spectrum-Menu-itemLabel")]');
      this.planType = page.locator('//button/span[contains(@class, "spectrum-Dropdown-label") and (.//ancestor::div/span[contains(text(),"plan type")])]');
      this.offerType = page.locator('//button/span[contains(@class, "spectrum-Dropdown-label") and (.//ancestor::div/span[contains(text(),"offer type")])]');
      this.nextButton = page.locator('//button[contains(@data-testid, "nextButton")]/span');
      this.price = page.locator('//div[@data-type="price"]/span');
      this.priceOptical = page.locator('//div[contains(@data-type, "priceOptical")]/span');
      this.priceStrikethrough = page.locator('//div[contains(@data-type, "priceStrikethrough")]/span');
      this.termCheckbox = page.locator('//input[@value="displayRecurrence"]');
      this.unitCheckbox = page.locator('//input[@value="displayPerUnit"]');
      this.taxlabelCheckbox = page.locator('//input[@value="displayTax"]');
    }
  }
  
