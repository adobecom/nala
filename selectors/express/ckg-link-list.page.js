export default class ckgLinkList {
  constructor(page) {
    this.page = page;
    this.ckgLinkList = page.locator('.ckg-link-list');
    this.pill = page.locator('.button-container.carousel-element');
    this.pillLink = page.locator('.button-container.carousel-element > a');
    this.carouselArrowLeftHidden = page.locator('.ckg-link-list .carousel-fader-left.arrow-hidden');
    this.carouselArrowRightHidden = page.locator('.ckg-link-list .carousel-fader-right.arrow-hidden');
    this.carouselArrowLeftShow = page.locator('.ckg-link-list .carousel-fader-left');
    this.carouselArrowRightShow = page.locator('.ckg-link-list .carousel-fader-right');
    this.carouselArrowLeft = page.locator('.ckg-link-list .carousel-fader-left');
    this.carouselArrowRight = page.locator('.ckg-link-list .carousel-fader-right');
    this.leftArrowBtn = page.locator('.ckg-link-list .button.carousel-arrow.carousel-arrow-left');
    this.rightArrowBtn = page.locator('.ckg-link-list .button.carousel-arrow.carousel-arrow-right');
  }
}
