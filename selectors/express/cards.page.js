export default class cards {
  constructor(page) {
    this.page = page;
    this.cards_highlight = page.locator('.cards.highlight');
    this.cards = page.locator('.cards');
    this.card = page.locator('.card');
    this.cardTitle = page.locator('.card-content > h2');
    this.cardImage = page.locator('.card-image');
    this.link = page.locator('.card-content > p > a');
    this.button = page.locator('.card-content > p.button-container > a');
    this.globalFooter = page.locator('.global-footer');
  }

  async gotoURL(url) {
    await this.page.goto(url);
    await this.globalFooter.waitFor();
  }
}
