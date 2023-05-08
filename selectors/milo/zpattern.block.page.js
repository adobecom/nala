/* eslint-disable no-restricted-syntax */
/* eslint-disable max-len */
/* eslint-disable no-await-in-loop */
/* eslint-disable quote-props */
/* eslint-disable import/named */
/* eslint-disable import/extensions */
/* eslint-disable import/no-import-module-exports */

import { expect } from '@playwright/test';

import { WebUtil } from '../../libs/webutil';

exports.ZPattern = class ZPattern {
  constructor(page) {
    this.page = page;
    // z-pattern  locators
    this.zPattern = page.locator('.z-pattern').first();

    // zpatter header
    this.zPatternHeader = this.zPattern.locator('.heading-row');
    this.smallIntroHeadingText = this.zPattern.locator('#small-default-intro-text-optional');
    this.mediumIntroHeadingText = this.zPattern.locator('#medium-intro-text-optional');
    this.largeIntroHeadingText = this.zPattern.locator('#large-intro-text-optional');
    this.darkIntroHeadingText = this.zPattern.locator('#intuitive-block-authoring');

    this.zPatternMeidaBlocks = this.zPattern.locator('.media');

    // zpattern contents css
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
      'heading-l': {
        'font-size': '28px',
        'line-height': '35px',
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
      'outline-button': {
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
      'con-button-blue': {
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
      'body-text': {
        'border': '0px none rgb(44, 44, 44)',
        'color': 'rgb(44, 44, 44)',
        'background': /^rgba\(0,\s*0,\s*0,\s*0\)(.*)/,
        'border-radius': '0px',
        'display': 'block',
        'padding': '0px',
        'font-size': '16px',
        'line-height': '24px',
        'font-style': 'normal',
        'font-weight': '400',
      },

    };

    // zpattern contents attributes
    this.attProperties = {
      'z-pattern': { 'style': 'background: rgb(245, 245, 245);' },
      'z-pattern-dark': { 'style': 'background: rgb(50, 50, 50);' },
      'small-default-intro-text-optional': { 'class': 'heading-l headline' },
      'medium-intro-text-optional': { 'class': 'heading-l headline' },
      'large-intro-text-optional': { 'class': 'heading-xl headline' },
      'dark-intro-text-optional': { 'class': 'heading-l headline' },
      'media-medium': {
        'class': 'media medium con-block',
        'daa-lh': 'media|medium',
        'daa-im': 'true',
      },
      'small-media-reversed': {
        'class': 'media small media-reversed con-block',
        'daa-lh': 'media|small|media-reversed',
        'daa-im': 'true',
      },
      'medium-media-reversed': {
        'class': 'media medium media-reversed con-block',
        'daa-lh': 'media|medium|media-reversed',
        'daa-im': 'true',
      },
      'medium-media-reverse-mobile': {
        'class': 'media medium con-block media-reverse-mobile',
        'daa-lh': 'media|medium|',
        'daa-im': 'true',
      },
      'large-media-reversed': {
        'class': 'media large media-reversed con-block',
        'daa-lh': 'media|large|media-reversed',
        'daa-im': 'true',
      },
      'media-image': {
        'width': '600',
        'height': '300',
      },

    };
  }

  /**
 * Verifies the css, attributes & styles, of elements  of the specified Z Pattern block.
 *
 * @param {string} howToType - The type of the Z Pattern to verify.
 * Possible values are 'zpattern', z-pattern (small), z-pattern (large) and z-pattern (dark)
 * @returns {Promise<boolean>} - Returns true if the specified Z Pattern type has the expected values.
 */
  async verifyZPattern(zPatternType) {
    const mediaBlocks = await this.zPatternMeidaBlocks.all();
    const mediaBlocksArray = await Promise.all(mediaBlocks.map(async (block) => block));

    switch (zPatternType) {
      case 'z-pattern':
        // verify z-pattern style background
        expect(await WebUtil.verifyAttributes(this.zPattern, this.attProperties['z-pattern'])).toBeTruthy();

        // verify Z pattern intro text css and attributes
        expect(await WebUtil.verifyCSS(this.mediumIntroHeadingText, this.cssProperties['heading-l'])).toBeTruthy();
        expect(await WebUtil.verifyAttributes(this.mediumIntroHeadingText, this.attProperties['medium-intro-text-optional'])).toBeTruthy();

        // verify Z pattern elements css and attributes
        for (const mediaBlock of mediaBlocksArray) {
          const classAttribute = await mediaBlock.getAttribute('class');
          const hasReversedClass = classAttribute.includes('media-reversed');
          if (hasReversedClass) {
            expect(await WebUtil.verifyAttributes(mediaBlock, this.attProperties['medium-media-reversed'])).toBeTruthy();
          }

          const detailText = await mediaBlock.locator('.detail-m');
          const headerText = await mediaBlock.locator('.heading-m');
          const bodyText = await mediaBlock.locator('.body-s').nth(0);
          const blueButton = await mediaBlock.locator('.blue').nth(0);
          const image = await mediaBlock.locator('.image img').nth(0);
          expect(await WebUtil.verifyCSS(detailText, this.cssProperties['detail-m'])).toBeTruthy();
          expect(await WebUtil.verifyCSS(headerText, this.cssProperties['heading-m'])).toBeTruthy();
          expect(await WebUtil.verifyCSS(bodyText, this.cssProperties['body-s'])).toBeTruthy();
          expect(await WebUtil.verifyCSS(blueButton, this.cssProperties['con-button-blue'])).toBeTruthy();

          expect(await WebUtil.verifyAttributes(image, this.attProperties['media-image'])).toBeTruthy();
        }
        return true;

      case 'z-pattern (small)':
        // verify Z pattern (small)  intro text css and attributes
        expect(await WebUtil.verifyCSS(this.smallIntroHeadingText, this.cssProperties['heading-l'])).toBeTruthy();
        expect(await WebUtil.verifyAttributes(this.smallIntroHeadingText, this.attProperties['small-default-intro-text-optional'])).toBeTruthy();

        // verify Z pattern (small) elements css and attributes
        for (const mediaBlock of mediaBlocksArray) {
          const classAttribute = await mediaBlock.getAttribute('class');
          const hasReversedClass = classAttribute.includes('media-reversed');
          if (hasReversedClass) {
            expect(await WebUtil.verifyAttributes(mediaBlock, this.attProperties['small-media-reversed'])).toBeTruthy();
          }
          const detailText = await mediaBlock.locator('.detail-m');
          const headerText = await mediaBlock.locator('.heading-xs');
          const bodyText = await mediaBlock.locator('.body-s').nth(0);
          const blueButton = await mediaBlock.locator('.blue').nth(0);
          const image = await mediaBlock.locator('.image img').nth(0);
          expect(await WebUtil.verifyCSS(detailText, this.cssProperties['detail-m'])).toBeTruthy();
          expect(await WebUtil.verifyCSS(headerText, this.cssProperties['heading-xs'])).toBeTruthy();
          expect(await WebUtil.verifyCSS(bodyText, this.cssProperties['body-s'])).toBeTruthy();
          expect(await WebUtil.verifyCSS(blueButton, this.cssProperties['con-button-blue'])).toBeTruthy();

          expect(await WebUtil.verifyAttributes(image, this.attProperties['media-image'])).toBeTruthy();
        }
        return true;

      case 'z-pattern (large)':

        // verify Z pattern (large) intro text css and attributes
        expect(await WebUtil.verifyCSS(this.largeIntroHeadingText, this.cssProperties['heading-xl'])).toBeTruthy();
        expect(await WebUtil.verifyAttributes(this.largeIntroHeadingText, this.attProperties['large-intro-text-optional'])).toBeTruthy();

        // verify Z pattern (large) elements css and attributes
        for (const mediaBlock of mediaBlocksArray) {
          const classAttribute = await mediaBlock.getAttribute('class');
          const hasReversedClass = classAttribute.includes('media-reversed');
          if (hasReversedClass) {
            expect(await WebUtil.verifyAttributes(mediaBlock, this.attProperties['large-media-reversed'])).toBeTruthy();
          }
          const detailText = await mediaBlock.locator('.detail-l');
          const headerText = await mediaBlock.locator('.heading-xl');
          const bodyText = await mediaBlock.locator('.body-m').nth(0);
          const blueButton = await mediaBlock.locator('.blue').nth(0);
          const image = await mediaBlock.locator('.image img').nth(0);
          expect(await WebUtil.verifyCSS(detailText, this.cssProperties['detail-l'])).toBeTruthy();
          expect(await WebUtil.verifyCSS(headerText, this.cssProperties['heading-xl'])).toBeTruthy();
          expect(await WebUtil.verifyCSS(bodyText, this.cssProperties['body-m'])).toBeTruthy();
          expect(await WebUtil.verifyCSS(blueButton, this.cssProperties['con-button-blue'])).toBeTruthy();
          expect(await WebUtil.verifyAttributes(image, this.attProperties['media-image'])).toBeTruthy();
        }
        return true;

      case 'z-pattern (dark)':
        // verify z-pattern (dark) style background
        expect(await WebUtil.verifyAttributes(this.zPattern, this.attProperties['z-pattern-dark'])).toBeTruthy();

        // verify Z pattern (dark) intro text css and attributes
        expect(await WebUtil.verifyCSS(this.darkIntroHeadingText, this.cssProperties['heading-l'])).toBeTruthy();
        expect(await WebUtil.verifyAttributes(this.darkIntroHeadingText, this.attProperties['dark-intro-text-optional'])).toBeTruthy();

        // verify Z pattern (dark) elements css and attributes
        for (const mediaBlock of mediaBlocksArray) {
          const classAttribute = await mediaBlock.getAttribute('class');
          const hasReversedClass = classAttribute.includes('media-reversed');
          if (hasReversedClass) {
            expect(await WebUtil.verifyAttributes(mediaBlock, this.attProperties['medium-media-reverse-mobile'])).toBeTruthy();
          }
          const detailText = await mediaBlock.locator('.detail-m');
          const headerText = await mediaBlock.locator('.heading-m');
          const bodyText = await mediaBlock.locator('.body-s').nth(0);
          const blueButton = await mediaBlock.locator('.blue').nth(0);
          const image = await mediaBlock.locator('.image img').nth(0);
          expect(await WebUtil.verifyCSS(detailText, this.cssProperties['detail-m'])).toBeTruthy();
          expect(await WebUtil.verifyCSS(headerText, this.cssProperties['heading-m'])).toBeTruthy();
          expect(await WebUtil.verifyCSS(bodyText, this.cssProperties['body-s'])).toBeTruthy();
          expect(await WebUtil.verifyCSS(blueButton, this.cssProperties['con-button-blue'])).toBeTruthy();
          expect(await WebUtil.verifyAttributes(image, this.attProperties['media-image'])).toBeTruthy();
        }
        return true;
      default:
        throw new Error(`Unsupported Z Pattern type: ${this.zPatternType}`);
    }
  }
};
