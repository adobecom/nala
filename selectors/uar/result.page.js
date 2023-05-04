/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
// eslint-disable-next-line import/no-import-module-exports
import { expect } from '@playwright/test';

exports.Result = class Result {
  constructor(page) {
    this.page = page;
    this.uarResult = page.locator('.uar-result > div h1');
    this.startFreeTrial1 = page.locator('[href*="z7H3"]');
    this.startFreeTrial2 = page.locator('[href*="mini-plans-web-cta-photoshop-card"]');
    this.startFreeTrial3 = page.locator('[href*="mini-plans-web-cta-premiere-pro-card"]');
    this.startFreeTrial4 = page.locator('[href*="mini-plans-web-cta-after-effects-card"]');
    this.logo = page.locator('(//img[@alt="CCX Logo"])[1]');
    this.socialPost = page.locator('(//img[@alt="CCX Social Post"])[1]');
    this.banner = page.locator('(//img[@alt="CCX Banner"])[1]');
    this.socialAd = page.locator('(//img[@alt="CCX Social Ad"])[1]');
    this.flyer = page.locator('(//img[@alt="CCX Banner"])[2]');
  }

  /**
   * Check product details on result page
   * @param {string} url
   * @param {string} results
   */
  async checkResultPage(url, results) {
    await this.page.goto(url);
    // need to refresh the page the load latest content
    await this.page.reload();
    await this.page.waitForLoadState('domcontentloaded');
    const pageText = await this.page.innerText('div');
    for (const values of Object.values(results)) {
      for (const value of values) {
        if (typeof value === 'string') {
          await this.validateTextAndLinks(url, value, pageText);
        } else if (Array.isArray(value)) {
          for (const text of value) {
            await this.validateTextAndLinks(url, text, pageText);
          }
        }
      }
    }
  }

  /**
   * Validate each text and link on result page
   * @param {string} url
   * @param {string} value
   * @param {string} pageText
   */
  async validateTextAndLinks(url, value, pageText) {
    if (value.includes('link:')) {
      const locator = `${value.split(':')[1]}`;
      if (locator.includes('start-free-trial-1')) {
        await this.startFreeTrial1.click();
      }

      if (locator.includes('start-free-trial-2')) {
        await this.startFreeTrial2.click();
      }

      if (locator.includes('start-free-trial-3')) {
        await this.startFreeTrial3.click();
      }

      if (locator.includes('start-free-trial-4')) {
        await this.startFreeTrial4.click();
      }

      if (locator.includes('logo')) {
        await this.logo.click();
      }

      if (locator.includes('social-post')) {
        await this.socialPost.click();
      }

      if (locator.includes('banner')) {
        await this.banner.click();
      }

      if (locator.includes('social-ad')) {
        await this.socialAd.click();
      }

      if (locator.includes('flyer')) {
        await this.flyer.click();
      }

      await this.page.waitForLoadState('domcontentloaded');
      expect(this.page.url()).toContain(`${value.split(':')[2]}`);
      await this.page.goto(url);
      // need to refresh the page the load latest content
      await this.page.reload();
      await this.page.waitForLoadState('domcontentloaded');
    } else {
      expect(pageText).toContain(value);
    }
  }
};
