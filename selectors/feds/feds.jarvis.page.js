/* eslint-disable import/no-import-module-exports */
import { expect } from '@playwright/test';

export default class FedsJarvis {
  constructor(page) {
    this.page = page;

    // Jarvis Selectors:
    this.jarvisHeader = page.locator('div#header');
    this.jarvisButton = page.locator('button#adbmsgCta');
    this.jarvisContainer = page.locator('iframe.adbmsgContentIframe');
    this.jarvisMessageArea = page.locator('div#messageArea');
    this.jarvisHeaderButton = page.locator('a[href$="#open-jarvis-chat"]');

    this.jarvisCloseButton = page.locator('button#jarvisHeaderClose');
    this.jarvisOptionsButton = page.locator('button#jarvisDropDown');
    this.jarvisMinimizeButton = page.locator('button#jarvisHeaderMinimizeButton');
  }

  /**
   * Opens the Jarvis chat assistant from CTA button.
   * @param  {none}
   * @return {Promise} PlayWright promise
   */
  async openJarvisFromCta() {
    // Wait for Jarvis CTA button to appear:
    await this.jarvisButton.waitFor({ state: 'visible', timeout: 30000 });
    // Click Jarvis CTA button:
    await this.jarvisButton.click();
    // Assert Jarvis CTA button click:
    await expect(this.jarvisContainer).toBeVisible();
  }

  /**
   * Close the Jarvis chat assistant from iframe close button.
   * @param  {none}
   * @return {Promise} PlayWright promise
   */
  async closeJarvisFromIframe() {
    // Locate Jarvis iframe & click close button:
    await this.page.frameLocator('.adbmsgContentIframe').locator('button#jarvisHeaderClose').click();
    // Locate Jarvis iframe & confirm close dialog:
    await this.page.frameLocator('.adbmsgContentIframe').locator('button#jarvisQuitYesButton').click();
    // Assert Jarvis iframe close button click:
    await expect(this.jarvisContainer).not.toBeVisible();
  }
}
