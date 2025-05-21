export default class carousel {
  constructor(page) {
    this.page = page;
    this.carouselContainer = page.locator('.carousel.container.no-buttons-mobile');
    this.carouselCenterSlideActive = this.carouselContainer.locator('.section.carousel-slide.center.active');
    this.carouselActiveImage = this.carouselCenterSlideActive.locator('//img[@loading="eager"]');
    this.carouselTileText = page.locator('.tracking-header').nth(0);
    this.carouselButtonContainer = page.locator('.carousel-button-container');
    this.carouselButtonLeft = this.carouselButtonContainer.locator('.carousel-button.carousel-previous');
    this.carouselButtonRight = this.carouselButtonContainer.locator('.carousel-button.carousel-next');
    this.carouselIndicators = page.locator('.carousel-indicators');
    this.carouselFirstCard_default = this.carouselIndicators.locator('//li[@class="carousel-indicator active" and @data-index="0"]');
    this.carouselCard_load2 = this.carouselIndicators.locator('//li[@class="carousel-indicator active" and @data-index="1"]');
    this.carouselCard_load3 = this.carouselIndicators.locator('//li[@class="carousel-indicator active" and @data-index="2"]');
    this.carouselcardShow2 = this.carouselIndicators.locator('//div[@class="section carousel-slide center active" and @style="order: 2;"]');
    this.carouselcardShow3 = this.carouselIndicators.locator('//div[@class="section carousel-slide center active" and @style="order: 1;"]');
  }
}
