export default class NewsPage {
  constructor(page) {
    this.page = page;
    this.resultNumber = page.locator('.partner-cards-cards-results').nth(0);
    this.firstCardTitle = page.locator('.card-title').nth(0);
    this.searchField = page.locator('.input');
    this.clearSearchSelector = page.locator('[aria-label="Reset"]');
    this.clearAllSelector = page.locator('[aria-label="Clear all"]');
    this.sortBtn = page.locator('.sort-btn');
    this.oldestOption = page.getByRole('button', { name: 'Date: oldest' });
    this.paginationText = page.locator('.pagination-total-results');
    this.loadMore = page.locator('[aria-label="Load more"]');
    this.firstCardDate = page.locator('.card-date').nth(0);
    this.lastCardDate = page.locator('.card-date').nth(5);

    this.clearApplicationsFilter = page.locator('[aria-label="2"]');
    this.clearSideBarFilterButtonTechnical = page.locator('[aria-label="Technical"]');
  }

  async expandFilterOptions(filterSection) {
    await this.page.locator(`[aria-label="${filterSection}"]`).click();
  }

  async clickFilterOptions(filterOption) {
    await this.page.locator(`sp-checkbox:text-is("${filterOption}")`).click();
  }
}
