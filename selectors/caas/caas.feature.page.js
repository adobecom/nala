export default class Caas {
  constructor(page) {
    this.page = page;

    // caas locators
    this.caasFirstCard = this.page.locator('.consonant-Card').nth(0);
    this.caasCards = this.page.locator('.consonant-Card');
    this.caasTitle = this.page.locator('.consonant-FiltersInfo-title');
    this.caasPaginator = this.page.locator('.consonant-Pagination-btn--prev');
  }
}
