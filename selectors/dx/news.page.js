export default class NewsPage {
  constructor(page) {
    this.page = page;
    this.resultNumber = page.locator('.partner-cards-cards-results').nth(0);
    this.firstCardTitle = page.locator('.card-title').nth(0);
    this.lastCardTitle = page.locator('.card-title').last();
    this.searchField = page.locator('.input');
    this.clearSearchSelector = page.locator('[aria-label="Reset"]');
    this.clearAllSelector = page.locator('[aria-label="Clear all"]');
    this.sortBtn = page.locator('.sort-btn');
    this.oldestOption = page.getByRole('button', { name: 'oldest' });
    this.paginationText = page.locator('.pagination-total-results');
    this.loadMore = page.locator('[aria-label="Load more"]');
    this.firstCardDate = page.locator('.card-date').nth(0);
    this.lastCardDate = page.locator('.card-date').nth(5);

    this.signInButton = page.locator('button[daa-ll="Sign In"].feds-signIn');
    this.profileIconButton = page.locator('.feds-profile-button');
    this.profileName = page.locator('.feds-profile-name');
    this.logoutButton = page.locator('[daa-ll="Sign Out"]');
    this.cardCount = page.locator('.card-wrapper');
    this.readCard = page.locator('.card-btn');
    this.signInButtonStageAdobe = page.locator('.profile-comp.secondary-button');
  }

  async expandFilterOptions(filterSection) {
    await this.page.locator(`[aria-label="${filterSection}"]`).click();
  }

  async clickFilterOptions(filterOption) {
    await this.page.locator(`sp-checkbox:text-is("${filterOption}")`).click();
  }

  async clearSideBarFilterButton(filterButton) {
    await this.page.locator(`[aria-label="${filterButton}"]`).click();
  }

  async clearFilter(filter, number) {
    await this.page.locator(`[aria-label="${filter}"] + [aria-label="${number}"]`).click();
  }
}
