export default class Stats {
  constructor(page) {
    this.page = page;
    this.statsLink = page.locator('.stat > div > p > strong > a');
    this.solutionsLink = page.locator('.solution > div > p:nth-child(2) > a');
  }

  /**
   * Selects the stats link of the stats block.
   */
  async clickStatsLink() {
    await this.statsLink.click();
  }

  /**
   * Selects the solutions link of the stats block.
   */
  async clickSolutionsLink() {
    await this.solutionsLink.click();
  }
}
