export default class Visual {
  constructor(page) {
    this.page = page;

    // visual locators
    this.endOfPage = this.page.locator('.feds-footer-privacyLink').first();
  }

  async waitForEndOfPage() {
    await this.endOfPage.waitFor();
  }
}
