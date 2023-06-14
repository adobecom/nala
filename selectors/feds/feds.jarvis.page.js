/* eslint-disable import/no-import-module-exports */

exports.FedsJarvis = class FedsJarvis {
  constructor(page) {
    this.page = page;

    // Jarvis Selectors:
    this.JarvisHeader = page.locator('div#header');
    this.JarvisButton = page.locator('button#adbmsgCta');
    this.JarvisContainer = page.locator('iframe.adbmsgContentIframe');
    this.JarvisMessageArea = page.locator('div#messageArea');

    this.JarvisCloseButton = page.locator('button#jarvisHeaderClose');
    this.JarvisOptionsButton = page.locator('button#jarvisDropDown');
    this.JarvisMinimizeButton = page.locator('button#jarvisHeaderMinimizeButton');
  }

  // >> FEDS Jarvis methods declared here <<
};
