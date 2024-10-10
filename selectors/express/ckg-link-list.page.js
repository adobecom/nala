export default class ckgLinkList {
  constructor(page) {
    this.page = page;
    this.ckgLinkList = page.locator('.ckg-link-list');
    this.pill = page.locator('.button-container.carousel-element');
    this.pillLink = page.locator('.button-container.carousel-element > a');
    this.leftArrow = page.locator('.ckg-link-list .button.carousel-arrow.carousel-arrow-left');
    this.rightArrow = page.locator('.ckg-link-list .button.carousel-arrow carousel-arrow-right');
  }
}
