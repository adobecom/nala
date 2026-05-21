export default class Visual {
  constructor(page) {
    this.page = page;

    // visual locators
    this.endOfPage = this.page.locator('.feds-footer-privacyLink').first();
  }

  async waitForEndOfPage() {
    await this.endOfPage.waitFor();
  }

  // Scrolls to the bottom in viewport-sized steps, pausing to let lazy-loaded
  // content render. Stops once scroll position is stable at the page bottom,
  // then waits for the footer to confirm the full page is loaded.
  async scrollToBottom(stepDelay = 400) {
    const { page } = this;
    let lastHeight = 0;

    for (;;) {
      // eslint-disable-next-line no-await-in-loop
      await page.evaluate(() => window.scrollBy(0, window.innerHeight));
      // eslint-disable-next-line no-await-in-loop
      await page.waitForTimeout(stepDelay);

      // eslint-disable-next-line no-await-in-loop
      const { height, atBottom } = await page.evaluate(() => ({
        height: document.documentElement.scrollHeight,
        atBottom: window.scrollY + window.innerHeight >= document.documentElement.scrollHeight,
      }));

      if (atBottom && height === lastHeight) break;
      lastHeight = height;
    }

    await this.endOfPage.waitFor({ state: 'visible' });
  }
}
