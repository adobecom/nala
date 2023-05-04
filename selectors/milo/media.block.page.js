/* eslint-disable max-len */
/* eslint-disable quote-props */
/* eslint-disable import/named */
/* eslint-disable import/extensions */
/* eslint-disable import/no-import-module-exports */

import { expect } from '@playwright/test';

import { WebUtil } from '../../libs/webutil';

exports.Media = class Media {
  constructor(page) {
    this.page = page;
    // media types
    this.media = page.locator('.media');
    this.mediaSmall = page.locator('.media.small');
    this.mediaLargeDark = page.locator('.media.large');

    // media details
    this.detailM = this.media.locator('.detail-m');
    this.detailL = this.media.locator('.detail-l');

    // media headings
    this.headingXS = this.media.locator('.heading-xs');
    this.headingM = this.media.locator('.heading-m');
    this.headingXL = this.media.locator('.heading-xl');

    // media body area
    this.bodyS = this.media.locator('.body-s');
    this.bodyM = this.media.locator('.body-m');
    this.bodyXL = this.media.locator('.body-xl');
    this.bodyTextM = this.media.locator('p:nth-of-type(2)');
    this.bodyTextS = this.media.locator('p:nth-of-type(2)');

    // media actions area
    this.actionArea = this.media.locator('.action-area');
    this.outlineButton = this.media.locator('.con-button.outline');
    this.blueButton = this.media.locator('.con-button.blue');

    // media image
    this.mediaImage = this.media.locator('.image');
    this.mediaImg = this.mediaImage.locator('img');

    // media contents css
    this.cssProperties = {
      'media': {
        'margin': /^0px(.*)/,
        'position': 'relative',
      },
      'media-large-dark': {
        'margin': /^0px(.*)/,
        'position': 'relative',
      },
      'heading-xl': {
        'font-size': '36px',
        'line-height': '45px',
      },
      'heading-m': {
        'font-size': '24px',
        'line-height': '30px',
      },
      'heading-xs': {
        'font-size': '18px',
        'line-height': '22.5px',
      },
      'detail-l': {
        'font-size': '16px',
        'line-height': '20px',
      },
      'detail-m': {
        'font-size': '12px',
        'line-height': '15px',
      },
      'body-m': {
        'font-size': '18px',
        'line-height': '27px',
      },
      'body-s': {
        'font-size': '16px',
        'line-height': '24px',
      },
      'outline': {
        'border': '2px solid rgb(44, 44, 44)',
        'color': 'rgb(44, 44, 44)',
        'border-radius': '16px',
        'display': 'block',
        'padding': '5px 14px',
        'font-size': '15px',
        'line-height': '16px',
        'font-style': 'normal',
        'font-weight': '700',
      },
      'blue': {
        'border': '2px solid rgb(20, 115, 230)',
        'color': 'rgb(255, 255, 255)',
        'background': /^rgb\(20,\s*115,\s*230\)(.*)/,
        'border-radius': '16px',
        'display': 'block',
        'padding': '5px 14px',
        'font-size': '15px',
        'line-height': '16px',
        'font-style': 'normal',
        'font-weight': '700',
      },
    };

    // media contents attributes
    this.attProperties = {
      'outline': { 'daa-ll': /^outline\|(.*)/ },
      'filled': { 'daa-ll': /^filled\|(.*)/ },
      'media-small': {
        'class': 'media small con-block media-reverse-mobile',
        'daa-lh': 'media|small',
        'daa-im': 'true',
      },
      'media': {
        'class': 'media con-block',
        'daa-lh': 'media',
        'daa-im': 'true',
      },
      'media-large-dark': {
        'class': 'media large dark con-block has-bg media-reverse-mobile',
        'daa-lh': 'media|large|dark',
        'daa-im': 'true',
      },
      'media-small-image': {
        'width': '400',
        'height': '300',
      },
    };
  }

  /**
 * Verifies the css, attributes, styles, of elements or
 * sections of the specified Media block.
 *
 * @param {string} mediaType - The type of the Media block to verify.
 * Possible values are 'media (small)', 'media ', and 'media (large,dark)'.
 * @returns {Promise<boolean>} - Returns true if the specified media block type has the expected values.
 */
  async verifyMedia(mediaType) {
    switch (mediaType) {
      case 'media (small)':
        // verify media (small) visibility, css and attributes values
        await expect(this.mediaSmall).toBeVisible();
        expect(await WebUtil.verifyCSS(this.mediaSmall, this.cssProperties.media)).toBeTruthy();
        expect(await WebUtil.verifyCSS(this.detailM, this.cssProperties['detail-m'])).toBeTruthy();
        expect(await WebUtil.verifyCSS(this.headingXS, this.cssProperties['heading-xs'])).toBeTruthy();
        expect(await WebUtil.verifyCSS(this.bodyTextS, this.cssProperties['body-s'])).toBeTruthy();
        expect(await WebUtil.verifyAttributes(this.media, this.attProperties['media-small'])).toBeTruthy();

        expect(await WebUtil.verifyCSS(this.blueButton, this.cssProperties.blue)).toBeTruthy();
        expect(await WebUtil.verifyCSS(this.outlineButton, this.cssProperties.outline)).toBeTruthy();

        expect(await WebUtil.verifyAttributes(this.blueButton, this.attProperties.filled)).toBeTruthy();
        expect(await WebUtil.verifyAttributes(this.outlineButton, this.attProperties.outline)).toBeTruthy();

        return true;

      case 'media':
        // verify media visibility, css and attributes values
        await expect(this.media).toBeVisible();
        expect(await WebUtil.verifyCSS(this.media, this.cssProperties.media)).toBeTruthy();
        expect(await WebUtil.verifyCSS(this.detailM, this.cssProperties['detail-m'])).toBeTruthy();
        expect(await WebUtil.verifyCSS(this.headingM, this.cssProperties['heading-m'])).toBeTruthy();
        expect(await WebUtil.verifyCSS(this.bodyTextS, this.cssProperties['body-s'])).toBeTruthy();
        expect(await WebUtil.verifyAttributes(this.media, this.attProperties.media)).toBeTruthy();

        expect(await WebUtil.verifyCSS(this.blueButton, this.cssProperties.blue)).toBeTruthy();
        expect(await WebUtil.verifyAttributes(this.blueButton, this.attProperties.filled)).toBeTruthy();

        return true;

      case 'media (large, dark)':
        // verify media (large, dark) visibility, css and attributes values
        await expect(this.mediaLargeDark).toBeVisible();
        expect(await WebUtil.verifyCSS(this.media, this.cssProperties.media)).toBeTruthy();
        expect(await WebUtil.verifyCSS(this.detailL, this.cssProperties['detail-l'])).toBeTruthy();
        expect(await WebUtil.verifyCSS(this.headingXL, this.cssProperties['heading-xl'])).toBeTruthy();
        expect(await WebUtil.verifyCSS(this.bodyTextM, this.cssProperties['body-m'])).toBeTruthy();
        expect(await WebUtil.verifyAttributes(this.mediaLargeDark, this.attProperties['media-large-dark'])).toBeTruthy();

        expect(await WebUtil.verifyAttributes(this.blueButton, this.attProperties.filled)).toBeTruthy();
        expect(await WebUtil.verifyCSS(this.blueButton, this.cssProperties.blue)).toBeTruthy();

        return true;

      default:
        throw new Error(`Unsupported media type: ${this.mediaType}`);
    }
  }
};
