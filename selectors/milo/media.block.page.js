import { expect } from '@playwright/test';
import { WebUtil } from '../../libs/webutil.js';

export default class Media {
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
    this.bodyS = this.media.locator('.body-s').nth(0);
    this.bodyM = this.media.locator('.body-m').nth(0);
    this.bodyXL = this.media.locator('.body-xl').nth(0);
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
      'learn-more': { 'daa-ll': /^Learn More[-\s]\d+\|(.*)/  },
      'watch-video': { 'daa-ll': /^Watch the Video[-\s]\d+\|(.*)/ },
      'media-small': {
        'class': 'media small con-block media-reverse-mobile',
        'daa-lh': 'b1|media|default|default',
      },
      'media': {
        'class': 'media con-block',
        'daa-lh': 'b1|media|default|default',
      },
      'media-large-dark': {
        'class': 'media large dark con-block has-bg media-reverse-mobile',
        'daa-lh': 'b1|media|default|default',
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
  async verifyMedia(mediaType, data) {
    switch (mediaType) {
      case 'media (small)':
        // verify media (small) visibility, content, css and attributes values
        await expect(this.mediaSmall).toBeVisible();
        
        await expect(await this.detailM).toContainText(data.detailText);
        await expect(await this.headingXS).toContainText(data.h2Text);
        await expect(await this.bodyS).toContainText(data.bodyText);
        await expect(await this.outlineButton).toContainText(data.outlineButtonText);
        await expect(await this.blueButton).toContainText(data.blueButtonText);       

        expect(await WebUtil.verifyCSS(this.mediaSmall, this.cssProperties.media)).toBeTruthy();
        expect(await WebUtil.verifyCSS(this.detailM, this.cssProperties['detail-m'])).toBeTruthy();
        expect(await WebUtil.verifyCSS(this.headingXS, this.cssProperties['heading-xs'])).toBeTruthy();
        expect(await WebUtil.verifyCSS(this.bodyTextS, this.cssProperties['body-s'])).toBeTruthy();
        expect(await WebUtil.verifyAttributes(this.media, this.attProperties['media-small'])).toBeTruthy();

        expect(await WebUtil.verifyCSS(this.blueButton, this.cssProperties.blue)).toBeTruthy();
        expect(await WebUtil.verifyCSS(this.outlineButton, this.cssProperties.outline)).toBeTruthy();

        expect(await WebUtil.verifyAttributes(this.blueButton, this.attProperties['learn-more'])).toBeTruthy();
        expect(await WebUtil.verifyAttributes(this.outlineButton, this.attProperties['watch-video'])).toBeTruthy();

        return true;

      case 'media':
        // verify media visibility, content, css and attributes values
        await expect(this.media).toBeVisible();

        await expect(await this.detailM).toContainText(data.detailText);
        await expect(await this.headingM).toContainText(data.h2Text);
        await expect(await this.bodyS).toContainText(data.bodyText);
        await expect(await this.blueButton).toContainText(data.blueButtonText); 

        expect(await WebUtil.verifyCSS(this.media, this.cssProperties.media)).toBeTruthy();
        expect(await WebUtil.verifyCSS(this.detailM, this.cssProperties['detail-m'])).toBeTruthy();
        expect(await WebUtil.verifyCSS(this.headingM, this.cssProperties['heading-m'])).toBeTruthy();
        expect(await WebUtil.verifyCSS(this.bodyTextS, this.cssProperties['body-s'])).toBeTruthy();
        expect(await WebUtil.verifyAttributes(this.media, this.attProperties.media)).toBeTruthy();     

        expect(await WebUtil.verifyCSS(this.blueButton, this.cssProperties.blue)).toBeTruthy();
        expect(await WebUtil.verifyAttributes(this.blueButton, this.attProperties['learn-more'])).toBeTruthy();

        return true;

      case 'media (large, dark)':
        // verify media (large, dark) visibility, content, css and attributes values
        await expect(this.mediaLargeDark).toBeVisible();

        await expect(await this.detailL).toContainText(data.detailText);
        await expect(await this.headingXL).toContainText(data.h2Text);
        await expect(await this.bodyM).toContainText(data.bodyText);
        await expect(await this.blueButton).toContainText(data.blueButtonText); 

        expect(await WebUtil.verifyCSS(this.media, this.cssProperties.media)).toBeTruthy();
        expect(await WebUtil.verifyCSS(this.detailL, this.cssProperties['detail-l'])).toBeTruthy();
        expect(await WebUtil.verifyCSS(this.headingXL, this.cssProperties['heading-xl'])).toBeTruthy();
        expect(await WebUtil.verifyCSS(this.bodyTextM, this.cssProperties['body-m'])).toBeTruthy();
        expect(await WebUtil.verifyAttributes(this.mediaLargeDark, this.attProperties['media-large-dark'])).toBeTruthy();

        expect(await WebUtil.verifyAttributes(this.blueButton, this.attProperties['learn-more'])).toBeTruthy();
        expect(await WebUtil.verifyCSS(this.blueButton, this.cssProperties.blue)).toBeTruthy();

        return true;

      default:
        throw new Error(`Unsupported media type: ${this.mediaType}`);
    }
  }
};
