export default class FedPub {
  constructor(page, nth=0) {
    this.page = page;

    this.section = this.page.locator('.section').nth(nth);
    this.readingWith = this.page.locator('.reading-with').nth(nth);
    
    // FedPub locators
    this.fedPubTitle = this.page.locator('h1#the-best-camera-settings-for-rain-photography');
    this.fedPubSubtitle1 = this.page.locator('h2#choose-the-right-camera-settings-for-a-rainy-day');
    this.fedPubSubtitle2 = this.page.locator('h2#use-adobe-photo-editing-software');
    this.tryForFreeButton = this.page.locator('a.feds-cta').nth(0);
    this.rainPhotographyTextLink = this.page.locator('a[href*="rain-photography"]');
}
};
