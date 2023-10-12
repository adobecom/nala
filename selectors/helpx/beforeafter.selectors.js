exports.BeforeAfter = class BeforeAfter {
  constructor(page) {
    this.page = page;

    // Procedure Selectors:
    this.beforeAftr = page.locator('.beforeafter');
    this.beforeAftr_vertical = page.locator('(//div[@class="slider-thumb-container"])[1]');
    this.beforeAftr_vertical_moved = page.locator('//div[@class="image before"][(contains(@style,"clip-path: inset(0px 0px "))]');
  }

};