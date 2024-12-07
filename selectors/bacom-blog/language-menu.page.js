import { expect } from '@playwright/test';

/**
 * @description A class that represents the language menu in the footer on bacom blog.
 */
export default class LanguageMenu {
  constructor(page) {
    this.page = page;
    this.footerRegionButton = this.page.locator('.feds-regionPicker');
    this.languageMenu = this.page.locator('ul#language-menu');
    this.au = this.languageMenu.getByText('AU (English)');
    this.uk = this.languageMenu.getByText('UK (English)');
    this.us = this.languageMenu.getByText('US (English)');
    this.de = this.languageMenu.getByText('Deutschland');
    this.fr = this.languageMenu.getByText('France');
    this.jp = this.languageMenu.getByText('日本');
  }

  /**
   * @description Opens the menu and verifies the menu items are displayed.
   */
  async openLanguageMenu() {
    await this.footerRegionButton.click();
    await expect(await this.footerRegionButton.getAttribute('aria-expanded')).toBe('true');
    await expect(await this.languageMenu).toBeVisible();
    await expect(await this.au).toBeVisible();
    await expect(await this.uk).toBeVisible();
    await expect(await this.us).toBeVisible();
    await expect(await this.de).toBeVisible();
    await expect(await this.fr).toBeVisible();
    await expect(await this.jp).toBeVisible();
  }

  /**
   * @description Closes language menu and verifies the menu is hidden.
  */
  async closeLanguageMenu() {
    await this.footerRegionButton.click();
    await expect(await this.footerRegionButton.getAttribute('aria-expanded')).toBe('false');
    await expect(await this.languageMenu).not.toBeVisible();
    await expect(await this.au).not.toBeVisible();
    await expect(await this.uk).not.toBeVisible();
    await expect(await this.us).not.toBeVisible();
    await expect(await this.de).not.toBeVisible();
    await expect(await this.fr).not.toBeVisible();
    await expect(await this.jp).not.toBeVisible();
  }

  /**
   * @description Selects a region from the language menu
   * @param {string} region Options: [au, uk, fr, de, jp, kr]
   */
  async changeFromUsToRegion(region) {
    const regionLink = this.page.locator(`//ul[@id='language-menu']/li/a[contains(@href, "${region}")]`);
    await regionLink.click();
    await expect(await this.page.url()).toContain(`/${region}/blog/`);
  }
}
