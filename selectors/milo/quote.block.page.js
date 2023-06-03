/* eslint-disable quote-props */
/* eslint-disable import/named */
/* eslint-disable import/no-import-module-exports */

import { expect } from '@playwright/test';

import { WebUtil } from '../../libs/webutil.js';

export default class Quote {
  constructor(page) {
    this.page = page;
    // quote  locators
    this.quote = this.page.locator('.quote');
    this.quoteImage = this.quote.locator('.quote-image');
    this.quoteCopy = this.quote.locator('p.quote-copy');
    this.quoteFigCaption = this.quote.locator('p.figcaption');
    this.quoteFigCaptionCite = this.quote.locator('cite p');
    this.sectionDark = this.page.locator('.section.dark');

    // quote blocks css
    this.cssProperties = {
      'quote': {
        'text-align': 'center',
        'margin': /^0px.*/,
      },

      'quote-contained': {
        'text-align': 'center',
        'margin': /^0px.*/,
      },

      'quote-align-right': {
        'text-align': 'right',
        'margin': /^0px.*/,
      },

      'quote-copy': {
        'font-size': '24px',
        'font-weight': 'bold',
      },

      'quote-inline-figure': {
        'display': 'flex',
        'align-content': 'center',
        'flex': '1 0 40%',
        'margin': '0px',
        'justify-content': 'center',
      },

      'quote-inline-image': {
        'height': '200px',
        'max-height': '200px',
      },

      'figcaption': {
        'font-size': '16px',
        'font-weight': 'bold',
      },
    };

    // quote blocks attributes
    this.attProperties = {
      'quote': { 'class': 'quote con-block' },
      'quote-contained': { 'class': 'quote contained con-block' },
      'quote-inline': { 'class': 'quote inline contained con-block' },
      'quote-borders': { 'class': 'quote borders contained con-block' },
      'quote-align-right': { 'class': 'quote contained align-right con-block' },
      'quote-xl-spacing': { 'class': 'quote contained xl-spacing con-block' },
      'section-dark': { 'style': 'background: rgb(102, 102, 102);' },

    };
  }

  /**
 * Verifies the visibility, css, attributes, styles, of elements or sections of
 * the specified Quote block.
 *
 * @param {string} quoteType - The type of the Quote block to verify.
 * Possible values are 'quote', 'quote (contained)', 'quote (inline)'.
 * quote (borders), quote (align-right), and quote (xl-spaced)
 * @returns {Promise<boolean>} - Returns true if the specified Quote type has the expected values.
 */
  async verifyQuote(quoteType, data) {
    await expect(await this.quote).toBeVisible();

    switch (quoteType) {
      case 'quote':
        // verify quote block image visibility, attributes, css and different contents
        await expect(await this.quoteImage).toBeVisible();
        expect(await WebUtil.verifyAttributes(
          await this.quote,
          this.attProperties.quote,
        )).toBeTruthy();
        expect(await WebUtil.verifyCSS(await this.quote, this.cssProperties.quote)).toBeTruthy();
        await expect(await this.quoteCopy).toContainText(data.quoteCopy);
        await expect(await this.quoteFigCaption).toContainText(data.figCaption);
        await expect(await this.quoteFigCaptionCite).toContainText(data.cite);

        return true;
      case 'quote (contained)':
        // verify quote (contained) block image visibility, attributes, css and different contents
        await expect(await this.quoteImage).toBeVisible();
        expect(await WebUtil.verifyAttributes(
          await this.quote,
          this.attProperties['quote-contained'],
        )).toBeTruthy();
        expect(await WebUtil.verifyCSS(await this.quote, this.cssProperties['quote-contained'])).toBeTruthy();
        await expect(await this.quoteCopy).toContainText(data.quoteCopy);
        await expect(await this.quoteFigCaption).toContainText(data.figCaption);
        await expect(await this.quoteFigCaptionCite).toContainText(data.cite);

        return true;

      case 'quote (inline)':
        // verify quote (inline) block image visibility, attributes, css and different contents
        await expect(await this.quoteImage).toBeVisible();
        expect(await WebUtil.verifyAttributes(
          await this.quote,
          this.attProperties['quote-inline'],
        )).toBeTruthy();
        expect(await WebUtil.verifyCSS(await this.quote, this.cssProperties.quote)).toBeTruthy();
        expect(await WebUtil.verifyCSS(await this.quoteImage, this.cssProperties['quote-inline-figure'])).toBeTruthy();
        await expect(await this.quoteCopy).toContainText(data.quoteCopy);
        await expect(await this.quoteFigCaption).toContainText(data.figCaption);
        await expect(await this.quoteFigCaptionCite).toContainText(data.cite);

        return true;

      case 'quote (borders)':
        // verify quote (borders) block image not visibility, attributes, css and different contents
        await expect(await this.quoteImage).not.toBeVisible();
        expect(await WebUtil.verifyAttributes(
          await this.quote,
          this.attProperties['quote-borders'],
        )).toBeTruthy();
        expect(await WebUtil.verifyCSS(await this.quote, this.cssProperties.quote)).toBeTruthy();
        await expect(await this.quoteCopy).toContainText(data.quoteCopy);
        await expect(await this.quoteFigCaption).toContainText(data.figCaption);
        await expect(await this.quoteFigCaptionCite).toContainText(data.cite);

        return true;

      case 'quote (align-right)':
        // verify quote (align-right) block image visibility, attributes, css and different content
        await expect(await this.quoteImage).toBeVisible();
        expect(await WebUtil.verifyAttributes(
          await this.quote,
          this.attProperties['quote-align-right'],
        )).toBeTruthy();
        expect(await WebUtil.verifyCSS(await this.quote, this.cssProperties['quote-align-right'])).toBeTruthy();
        await expect(await this.quoteCopy).toContainText(data.quoteCopy);
        await expect(await this.quoteFigCaption).toContainText(data.figCaption);
        await expect(await this.quoteFigCaptionCite).toContainText(data.cite);

        return true;

      case 'quote (xl-spaced)':
        // verify quote (xl-spaced) block image visibility, attributes, css and different content
        await expect(await this.sectionDark).toBeVisible();
        expect(await WebUtil.verifyAttributes(
          await this.sectionDark,
          this.attProperties['section-dark'],
        )).toBeTruthy();

        await expect(await this.quoteImage).not.toBeVisible();
        expect(await WebUtil.verifyAttributes(
          await this.quote,
          this.attProperties['quote-xl-spacing'],
        )).toBeTruthy();

        expect(await WebUtil.verifyCSS(await this.quote, this.cssProperties.quote)).toBeTruthy();
        await expect(await this.quoteCopy).toContainText(data.quoteCopy);
        await expect(await this.quoteFigCaption).toContainText(data.figCaption);
        await expect(await this.quoteFigCaptionCite).toContainText(data.cite);

        return true;
      default:
        throw new Error(`Unsupported Text type: ${this.quoteType}`);
    }
  }
}
