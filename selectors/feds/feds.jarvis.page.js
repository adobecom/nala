/* eslint-disable import/no-import-module-exports */

export default class FedsJarvis {
  constructor(page) {
    this.page = page;

    // Jarvis Selectors:
    this.jarvisHeader = page.locator('div#header');
    this.jarvisButton = page.locator('button#adbmsgCta');
    this.jarvisContainer = page.locator('iframe.adbmsgContentIframe');
    this.jarvisMessageArea = page.locator('div#messageArea');

    this.jarvisCloseButton = page.locator('button#jarvisHeaderClose');
    this.jarvisOptionsButton = page.locator('button#jarvisDropDown');
    this.jarvisMinimizeButton = page.locator('button#jarvisHeaderMinimizeButton');
  }

  // >> FEDS Jarvis methods declared here <<
}
