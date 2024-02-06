export default class stickypromo {
  constructor(page) {
  this.page = page;
  // sticky promo bar UI elements in page
  this.stickyPromoSection = page.locator('.section.sticky-bottom');
  this.asideBlockStickiness = this.stickyPromoSection.locator('.aside.notification.medium.con-block');
  this.bodyActionArea = page.locator('body-s action-area').last();
  this.freeTrialButton = this.bodyActionArea.locator('.static');
  this.buyNowButton = page.locator('.con-button.outline').nth(1);
  this.jumpLink = page.locator('.body-m').nth(2);  
}
};
