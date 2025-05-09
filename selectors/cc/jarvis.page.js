export default class jarvis {
  constructor(page) {
    this.page = page;
    this.jarvisFeature = page.locator('#adbmsgCta');
    this.enableExpandChat = page.locator('//button[contains(@class, "adbmsgCta outwardAnimate") and contains(@style, "display: none;")]');
  }
}
