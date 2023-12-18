export default class Procedure {
  constructor(page) {
    this.page = page;

    // Procedure Selectors:
    this.procedure = page.locator('.procedure');
    this.procedureStep = page.locator("//li[contains(@class,'step')]");
    this.procedureImage = page.locator("//li[@class='step']//descendant::picture/img");
    this.procedureTxtBold = page.locator('li[class=step] strong');
  }
}
