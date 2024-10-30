export default class ckgLinkList {
  constructor(page) {
    this.page = page;
    this.imageList = page.locator('.image-list');
    this.imageListSmall = page.locator('.image-list.s');
    this.imageListXSmall = page.locator('.image-list.xs');
    this.imageListLarge = page.locator('.image-list.l');
    this.imageListXLarge = page.locator('.image-list.xl');
  }
}
