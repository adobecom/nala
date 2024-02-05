export default class promocloseaction {
  constructor(page) {
  this.page = page;
  // promobar with close action UI elements
  this.promoBar = page.locator('.foreground.container').last();
  this.promoBarMobile = this.promoBar.locator('.mobile-up.promo-text');
  this.promoBarTablet = this.promoBar.locator('.tablet-up.promo-text');
  this.promoBarDesktop = this.promoBar.locator('.desktop-up.promo-text');
  this.PromoText = this.promoBarDesktop.locator('.text-area').nth(0);
  this.promosticky = page.locator('.section.promo-sticky-section.popup.static-links.sticky-bottom');
  this.promoNotSticky = page.locator('.section.promo-sticky-section.popup.static-links.sticky-bottom.close-sticky-section');
  this.promoCTA = page.locator('.body-s.action-area').last();
  this.promoClose = page.locator('.promo-close'); 
  this.promoBackGroundImage = page.locator('//source[@srcset="./media_1124d05560db538e1dc17f6f393e0c32bcb341f67.png?width=2000&format=webply&optimize=medium"]');
}
};
