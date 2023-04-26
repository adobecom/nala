/* eslint-disable max-len */
/* eslint-disable quote-props */
/* eslint-disable import/named */
/* eslint-disable import/extensions */
/* eslint-disable import/no-import-module-exports */

import { expect } from '@playwright/test';

import { WebUtil } from '../../libs/webutil';

exports.HowTo = class HowTo {
  constructor(page) {
    this.page = page;
    // how-to  locators
    this.howTo = page.locator('.how-to');
    this.howToLarge = this.page.locator('.how-to.large-image');
    this.howToSeo = this.page.locator('.how-to.seo');

    // how-to details
    this.howToHeading = this.howTo.locator('.how-to-heading');
    this.howToImage = this.howTo.locator('.how-to-image');
    this.howToList = this.howTo.locator('li');

    // how-to large details
    this.howToHeading = this.howTo.locator('.how-to-heading');
    this.howToImage = this.howTo.locator('.how-to-image');
    this.howToList = this.howTo.locator('li');

    // how-to large details
    this.howToLargeImage = page.locator('.how-to-image img');

    // how contents css
    this.cssProperties = {
      'how-to': {
        'padding': '80px 24px',
        'max-width': '700px',
        'display': 'grid',
      },
      'how-to-image': {
        'align-self': 'center',
        'justify-self': 'center',
        'min-height': '100%',
      },
      'body-m': {
        'font-size': '18px',
        'line-height': '27px',
      },
      'how-to-large': {
        'padding': '80px 24px',
        'max-width': '700px',
      },
      'how-to-large-image': {
        'display': 'grid',
        'grid-template-areas': '"heading image" "list image"',
      },
      'how-to-seo': {
        'display': 'grid',
        'grid-template-areas': '"heading image" "list list"',
      },
    };

    this.attProperties = {
      'how-to-large-image': {
        'width': '600',
        'height': '300',
      },

    };
  }

  /**
 * Verifies the css, attributes, styles, of elements or sections of the specified HowTo block.
 *
 * @param {string} howToType - The type of the HowTo to verify.
 * Possible values are 'how-to', 'how-to, how-to (large-image)', and 'how-to (seo)'.
 * @returns {Promise<boolean>} - Returns true if the specified HowTo type has the expected values.
 */
  async verifyHowTo(howToType) {
    switch (howToType) {
      case 'how-to':
        // verify howto visibility and css values
        await expect(this.howTo).toBeVisible();
        expect(await WebUtil.verifyCSS(this.howTo, this.cssProperties['how-to'])).toBeTruthy();
        expect(await WebUtil.verifyCSS(this.howToHeading, this.cssProperties['body-m'])).toBeTruthy();
        expect(await WebUtil.verifyCSS(this.howToImage, this.cssProperties['how-to-image'])).toBeTruthy();
        await expect(await this.howToList).toHaveCount(4);
        return true;
      case 'how-to (large)':
        // verify howto large visibility and css values
        await expect(this.howToLarge).toBeVisible();
        expect(await WebUtil.verifyCSS(this.howToHeading, this.cssProperties['body-m'])).toBeTruthy();
        expect(await WebUtil.verifyCSS(this.howToLarge, this.cssProperties['how-to-large-image'])).toBeTruthy();
        expect(await WebUtil.verifyAttributes(await this.howToLargeImage, this.attProperties['how-to-large-image'])).toBeTruthy();
        await expect(await this.howToList).toHaveCount(4);
        return true;
      case 'how-to (seo)':
        // verify howto seo visibility and css values
        await expect(this.howToSeo).toBeVisible();
        expect(await WebUtil.verifyCSS(this.howToHeading, this.cssProperties['body-m'])).toBeTruthy();
        expect(await WebUtil.verifyCSS(this.howToSeo, this.cssProperties['how-to-seo'])).toBeTruthy();
        await expect(await this.howToList).toHaveCount(4);
        return true;
      default:
        throw new Error(`Unsupported marquee type: ${this.howToList}`);
    }
  }
};
