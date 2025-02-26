export default class DiscoverCard {
  constructor(page) {
    this.page = page;
    this.cardsBlock = page.locator('.discover-cards');
    this.cardsHeading = this.cardsBlock.locator('h2');
    this.cardsHeading2 = this.cardsBlock.locator('h3');
    this.card = this.cardsBlock.locator('.card');
    this.cardTitle = this.card.locator('h4');
    this.cardText = this.card.locator('p');
    this.cardImage = this.card.locator('img');
    this.cardButton = this.card.locator('.button');
    this.cardsGalleryControl = this.cardsBlock.locator('.gallery-control');
    this.cardsControlPrev = this.cardsGalleryControl.locator('.prev');
    this.cardsControlNext = this.cardsGalleryControl.locator('.next');
  }

  async gotoURL(url) {
    await this.page.goto(url);
    await this.page.waitForLoadState('domcontentloaded');
  }

  async scrollToDiscoverCards() {
    await this.page.waitForLoadState('domcontentloaded');
    if (this.cardsBlock) {
      await this.cardsBlock.scrollIntoViewIfNeeded(2000);
    }
  }

  async clickButtonOfFirstCard() {
    await this.page.waitForLoadState('domcontentloaded');
    if (this.cardButton) {
      await this.cardButton.nth(0).click();
    }
  }
}
