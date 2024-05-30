export default class NewsPage {
  constructor(page) {
    this.page = page;
    this.resultNumber = page.locator('.partner-cards-cards-results').nth(0);
    this.firstCardTitle = page.locator('.card-title').nth(0);
  }

  async clickSearchField() {
    await this.searchField.click();
  }

  /**
   * @returns get result number
   */
  async getResultNumber() {
    const text = await this.resultNumber.textContent();
    return text;
  }

  /**
   * @returns get first card text
   */
  async getFirstCardTitle() {
    const text = await this.firstCardTitle.textContent();
    return text;
  }
}
