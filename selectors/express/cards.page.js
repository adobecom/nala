export default class cards {
  constructor(page) {
    this.page = page;
    this.cards = page.locator('.cards.highlight');
    this.card = page.locator('.card');
    this.cardTitle = page.locator('.card-content > h2');
    this.cardImage = page.locator('.card-image');
    this.link = page.locator('.card-content > p > a');
    this.button = page.locator('.card-content > p.button-container > a');
  }
}
