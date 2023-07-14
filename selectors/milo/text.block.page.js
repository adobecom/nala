import { expect } from '@playwright/test';
import { WebUtil } from '../../libs/webutil.js';

export class Text {
  constructor(page) {
    this.page = page;
    // text  locators
    this.text = page.locator('.text');
    this.textIntro = this.page.locator('.text.intro');
    this.textFullWidth = this.page.locator('.text.full-width');
    this.textFullWidthLarge = this.page.locator('.text.full-width.large');
    this.textLongFormLarge = this.page.locator('.text.long-form');
    this.textInsetLargeMSpacing = this.page.locator('.text.inset.medium.m-spacing');

    this.textDetailM = page.locator('.detail-m');
    this.textIntroDetailM = page.locator('.detail-m');
    this.textLongFormDetailL = page.locator('.detail-l');

    this.textHeadline = this.text.locator('#text');
    this.textIntroHeadline = this.text.locator('#text-intro');
    this.textFullWidthHeadline = this.text.locator('#text-full-width');
    this.textFullWidthLargeHeadline = this.text.locator('#text-full-width-large');
    this.textLongFormLargeHeadline = this.text.locator('#text-long-form-large');
    this.textInsetLargeMSpacingHeadline = this.text.locator('#text-inset-large-m-spacing');

    this.textBodyM = this.text.locator('.body-m').first();
    this.textBodyL = this.text.locator('.body-l').first();

    this.textPropertiesHeadingM = this.text.locator('#properties-h3').first();

    this.textBodyLink = this.page.locator('a[daa-ll^=link]');
    this.outlineButton = this.text.locator('.con-button.outline');

    // text block contents css
    this.cssProperties = {
      'detail-m': {
        'font-size': '12px',
        'line-height': '15px',
      },
      'detail-l': {
        'font-size': '16px',
        'line-height': '20px',
      },
      'heading-s': {
        'font-size': '20px',
        'line-height': '25px',
      },
      'heading-m': {
        'font-size': '24px',
        'line-height': '30px',
      },
      'heading-l': {
        'font-size': '28px',
        'line-height': '35px',
      },
      'heading-xl': {
        'font-size': '36px',
        'line-height': '45px',
      },
      'body-m': {
        'font-size': '18px',
        'line-height': '27px',
      },
      'body-l': {
        'font-size': '20px',
        'line-height': '30px',
      },
    };

    // text block contents attributes
    this.attProperties = {
      'outline': { 'daa-ll': /^outline\|(.*)/ },
      'filled': { 'daa-ll': /^filled\|(.*)/ },
      'text-link': { 'daa-ll': /^link\|(.*)/ },
      'text': {
        'class': 'text text-block con-block',
        'daa-lh': 'Text',
      },
      'text-intro': {
        'class': 'text intro text-block con-block has-bg max-width-8-desktop xxl-spacing-top xl-spacing-bottom',
        'daa-lh': 'Text (intro)',
        'style': 'background: rgb(255, 255, 255);',
      },
      'text-full-width': {
        'class': 'text full-width text-block con-block max-width-8-desktop center xxl-spacing',
        'daa-lh': 'Text (full width)',
      },
      'text-full-width-large': {
        'class': 'text full-width large text-block con-block max-width-8-desktop center xxl-spacing',
        'daa-lh': 'Text (full width, large)',
      },
      'text-long-form-large': {
        'class': 'text long-form large text-block con-block max-width-8-desktop',
        'daa-lh': 'Text (long form, large)',
      },
      'text-inset-medium-m-spacing': {
        'class': 'text inset medium m-spacing text-block con-block max-width-8-desktop',
        'daa-lh': 'Text (inset, large, m spacing)|Properties H3|Properties H3',
      },
    };
  }

  /**
 * Verifies the css, attributes, styles, of elements or sections of the specified Text block.
 *
 * @param {string} textType - The type of the Text block to verify.
 * Possible values are 'text', 'text (Intro)', 'Text (full width)'.
 * text (full-width, large), text (long form, large), and text (inset, large, m spacing)
 * @returns {Promise<boolean>} - Returns true if the specified Text type has the expected values.
 */
  async verifyText(textType) {
    switch (textType) {
      case 'text':
        // verify text visibility, css and attribute values
        await expect(await this.text).toBeVisible();
        expect(await WebUtil.verifyAttributes(await this.text, this.attProperties.text)).toBeTruthy();
        expect(await WebUtil.verifyCSS(await this.textHeadline, this.cssProperties['heading-l'])).toBeTruthy();
        expect(await WebUtil.verifyCSS(await this.textBodyM, this.cssProperties['body-m'])).toBeTruthy();
        expect(await WebUtil.verifyCSS(await this.textBodyLink, this.cssProperties['body-m'])).toBeTruthy();
        expect(await WebUtil.verifyAttributes(await this.textBodyLink, this.attProperties['text-link'])).toBeTruthy();
        expect(await WebUtil.verifyAttributes(await this.outlineButton, this.attProperties.outline)).toBeTruthy();

        return true;
      case 'text (intro)':
        // verify text (intro) visibility, css and attribute values
        await expect(this.textIntro).toBeVisible();
        expect(await WebUtil.verifyAttributes(await this.textIntro, this.attProperties['text-intro'])).toBeTruthy();
        expect(await WebUtil.verifyCSS(await this.textIntroDetailM, this.cssProperties['detail-m'])).toBeTruthy();
        expect(await WebUtil.verifyCSS(await this.textIntroHeadline, this.cssProperties['heading-l'])).toBeTruthy();
        expect(await WebUtil.verifyCSS(await this.textBodyM, this.cssProperties['body-m'])).toBeTruthy();

        return true;

      case 'text (full width)':
        // verify text (full width) visibility, css and attribute values
        await expect(this.textFullWidth).toBeVisible();
        expect(await WebUtil.verifyAttributes(await this.textFullWidth, this.attProperties['text-full-width'])).toBeTruthy();
        expect(await WebUtil.verifyCSS(await this.textFullWidthHeadline, this.cssProperties['heading-l'])).toBeTruthy();
        expect(await WebUtil.verifyCSS(await this.textBodyM, this.cssProperties['body-m'])).toBeTruthy();
        expect(await WebUtil.verifyAttributes(await this.textBodyLink, this.attProperties['text-link'])).toBeTruthy();

        return true;

      case 'text (full-width, large)':
        // verify text (full-width, large) visibility, css and attribute values
        await expect(this.textFullWidthLarge).toBeVisible();
        expect(await WebUtil.verifyAttributes(await this.textFullWidthLarge, this.attProperties['text-full-width-large'])).toBeTruthy();
        expect(await WebUtil.verifyCSS(await this.textFullWidthLargeHeadline, this.cssProperties['heading-xl'])).toBeTruthy();
        expect(await WebUtil.verifyCSS(await this.textBodyM, this.cssProperties['body-m'])).toBeTruthy();
        expect(await WebUtil.verifyAttributes(await this.textBodyLink, this.attProperties['text-link'])).toBeTruthy();

        return true;

      case 'text (long form, large)':
        // verify text (long-form, large) visibility, css and attribute values
        await expect(await this.textLongFormLarge).toBeVisible();
        expect(await WebUtil.verifyAttributes(await this.textLongFormLarge, this.attProperties['text-long-form-large'])).toBeTruthy();
        expect(await WebUtil.verifyCSS(await this.textLongFormDetailL, this.cssProperties['detail-l'])).toBeTruthy();
        expect(await WebUtil.verifyCSS(await this.textLongFormLargeHeadline, this.cssProperties['heading-l'])).toBeTruthy();
        expect(await WebUtil.verifyCSS(await this.textBodyL, this.cssProperties['body-l'])).toBeTruthy();

        return true;

      case 'text (inset, large, m spacing)':
        // verify text (inset, large, m spacing) visibility, css and attribute values
        await expect(await this.textInsetLargeMSpacing).toBeVisible();
        expect(await WebUtil.verifyAttributes(await this.textInsetLargeMSpacing, this.attProperties['text-inset-medium-m-spacing'])).toBeTruthy();
        expect(await WebUtil.verifyCSS(await this.textInsetLargeMSpacingHeadline, this.cssProperties['heading-m'])).toBeTruthy();
        expect(await WebUtil.verifyCSS(await this.textBodyL, this.cssProperties['body-l'])).toBeTruthy();
        expect(await WebUtil.verifyCSS(await this.textPropertiesHeadingM, this.cssProperties['heading-m'])).toBeTruthy();

        return true;

      default:
        throw new Error(`Unsupported Text type: ${this.textType}`);
    }
  }
};
