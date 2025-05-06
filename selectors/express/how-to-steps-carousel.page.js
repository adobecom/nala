export default class HowToStepsCarousel {
  constructor(page) {
    this.page = page;
    this.howToStepsCarouselContainer = page.locator('.how-to-steps-carousel-container');
    this.image = this.howToStepsCarouselContainer.locator('> picture');
    this.heading = this.howToStepsCarouselContainer.locator('h2');
    this.howToStepsCarousel = this.howToStepsCarouselContainer.locator('.how-to-steps-carousel');
    this.tipNumbers = this.howToStepsCarousel.locator('.tip-numbers');
    this.tipNumber = this.howToStepsCarousel.locator('.tip-number');
    this.tips = this.howToStepsCarousel.locator('.tips');
    this.tip = this.tips.locator('.tip');
    this.tipTitle = this.tip.locator('h3');
    this.tipText = this.tip.locator('div');
    this.button = this.howToStepsCarouselContainer.locator('.button');
    this.logoMakerPage = page.locator('data-testid="logo-maker"');
    this.globalFooter = page.locator('.global-footer');
  }

  async gotoURL(url) {
    await this.page.goto(url);
    await this.globalFooter.waitFor();
  }

  async scrollToHowToStepsCarousel() {
    await this.page.waitForLoadState('domcontentloaded');
    await this.howToStepsCarouselContainer.scrollIntoViewIfNeeded(2000);
  }

  async clickButton() {
    await this.page.waitForLoadState('domcontentloaded');
    if (this.button) {
      await this.button.click();
    }
  }
}
