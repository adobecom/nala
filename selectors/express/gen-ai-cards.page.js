export default class GenAICards {
  constructor(page) {
    this.page = page;
    this.genAICards = page.locator('.gen-ai-cards');
    this.headingSection = this.genAICards.locator('.gen-ai-cards-heading-section');
    this.cardsHeading = this.headingSection.locator('h2');
    this.headingSectionText = this.headingSection.locator('p');
    this.adobeGenerativeAITermsLink = this.headingSection.locator('.gen-ai-cards-link');
    this.cardsSection = this.genAICards.locator('.gen-ai-cards-cards');
    this.card = this.cardsSection.locator('.card');
    this.cardTitle = this.card.locator('.cta-card-title');
    this.cardText = this.card.locator('.cta-card-desc');
    this.cardImage = this.card.locator('img');
    this.cardButton = this.card.locator('.con-button');
    this.actionCard = this.cardsSection.locator('.gen-ai-action');
    this.actionCardInputForm = this.actionCard.locator('.gen-ai-input-form');
    this.actionCardInput = this.actionCard.locator('input');
    this.actionCardSubmitButton = this.actionCard.locator('button');
    this.carouselFaderLeft = this.cardsSection.locator('.carousel-fader-left');
    this.carouselFaderRight = this.cardsSection.locator('.carousel-fader-right');
    this.leftCarouselArrow = this.cardsSection.locator('.carousel-arrow-left');
    this.rightCarouselArrow = this.cardsSection.locator('.carousel-arrow-right');
    this.globalFooter = page.locator('.global-footer');
  }

  async gotoURL(url) {
    await this.page.goto(url);
    await this.globalFooter.waitFor();
  }

  async scrollToGenAICards() {
    await this.page.waitForLoadState('domcontentloaded');
    if (this.genAICards) {
      await this.genAICards.scrollIntoViewIfNeeded(2000);
    }
  }

  async clickButtonOfFirstCard() {
    await this.page.waitForLoadState('domcontentloaded');
    if (this.cardButton.first()) {
      await this.cardButton.first().click();
    }
  }

  async clickSubmitButtonOfFirstCard() {
    await this.page.waitForLoadState('domcontentloaded');
    if (this.actionCardSubmitButton.first()) {
      await this.actionCardSubmitButton.first().click();
    }
  }
}
