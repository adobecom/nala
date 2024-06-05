
export default class Caas {
    constructor(page, nth=0) {
        this.page = page;

        //caas locators
        this.caasCards = this.page.locator('.consonant-card').nth(nth);
        this.caasTitle = this.page.locator('.consonant-FiltersInfo-title');
        this.caasPaginator = this.page.locator('.cconsonant-Pagination-summary');
    }
}