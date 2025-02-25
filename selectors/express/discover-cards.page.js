export default class DiscoverCard {
  constructor(page) {
    this.page = page;
    this.discoverCardsBlock = page.locator('.discover-cards');
    this.discoverCardsHeading = this.discoverCardsBlock.locator('h2');
    this.discoverCardsHeading2 = this.discoverCardsBlock.locator('h3');
    this.discoverCard = this.discoverCardsBlock.locator('.card');
    this.discoverCardTitle = this.discoverCard.locator('h4');
    this.discoverCardText = this.discoverCard.locator('p');
    this.discoverCardImage = this.discoverCard.locator('img');
    this.discoverCardButton = this.discoverCard.locator('.button');
    this.discoverCardsGalleryControl = this.discoverCardsBlock.locator('.gallery-control');
    this.dicoverCardsControlPrev = this.discoverCardsGalleryControl.locator('.prev');
    this.dicoverCardsControlNext = this.discoverCardsGalleryControl.locator('.next');
  }

  async gotoURL(url) {
    await this.page.goto(url);
    await this.page.waitForLoadState('networkidle');
  }

  async scrollToDiscoverCards() {
    await this.page.waitForLoadState('domcontentloaded');
    try {
      if (this.discoverCardsBlock) {
        await this.discoverCardsBlock.scrollIntoViewIfNeeded(2000);
      }
    } catch (error) {
      console.error('Error scrolling to Discover Card block', error);
      throw error;
    }
  }

  async clickButton(index) {
    await this.page.waitForLoadState('domcontentloaded');
    try {
      if (this.discoverCardButton) {
        await this.discoverCardButton.nth(index).click();
      }
    } catch (error) {
      console.error('Error clicking Disover Card button', error);
      throw error;
    }
  }
}
