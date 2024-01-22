export default class BeforeAfter {
  constructor(page) {
    this.page = page;

    // BeforeAfter Selectors:
    this.beforeAftr = page.locator("(//div[@class='before-after-slider vertical'])[1]");
    this.beforeafterVertical = page.locator(['@beforeafter-vertical']);
    this.beforeafterVerticalmoved = page.locator(['@beforeafter-vertical-moved']);
  }
}
