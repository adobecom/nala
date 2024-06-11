export default class Caas {
  constructor(page) {
    this.page = page;

    // caas locators
    this.caasCards = this.page.locator('.consonant-Card');
    this.caasTitle = this.page.locator('.consonant-FiltersInfo-title');
    this.caasPaginator = this.page.locator('.consonant-Pagination-summary');
  }
};
