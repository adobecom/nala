import { expect } from '@playwright/test';
import { WebUtil } from '../../libs/webutil.js';

export default class Text {
  constructor(page) {
    this.page = page;
    // text  locators
    this.text = page.locator('.text');
    this.textIntro = this.page.locator('.text.intro');
    this.textFullWidth = this.page.locator('.text.full-width');
    this.textFullWidthLarge = this.page.locator('.text.full-width.large');
    this.textLongFormLarge = this.page.locator('.text.long-form');
    this.textInsetLargeMSpacing = this.page.locator('.text.inset.medium.m-spacing');
    this.textlegal = this.page.locator('.text.legal.text-block.con-block.has-bg');
    this.textLinkFarm = this.page.locator('.text.link-farm.text-block.con-block.has-bg');

    this.textDetailM = page.locator('.detail-m');
    this.textIntroDetailM = page.locator('.detail-m');
    this.textLongFormDetailL = page.locator('.detail-l');
    this.textLegalDetail = page.locator('.foreground');
    
    this.textHeadline = this.text.locator('#text');
    this.textIntroHeadline = this.text.locator('#text-intro');
    this.textFullWidthHeadline = this.text.locator('#text-full-width');
    this.textFullWidthLargeHeadline = this.text.locator('#text-full-width-large');
    this.textLongFormLargeHeadline = this.text.locator('#text-long-form-large');
    this.textInsetLargeMSpacingHeadline = this.text.locator('#text-inset-large-m-spacing');
    this.textLinkFarmHeadline = this.text.locator('#text-link-farm-title');
    this.textLinkFarmcolumnheading = this.text.locator('#heading-1');
    this.textLinkFarmcolumns = this.text.locator('h3');
    this.textLinkColumnOne = this.text.locator('div div:nth-child(1) a');
    this.linkFormText = this.text.locator('p').nth(1);
    
    this.textBodyM = this.text.locator('.body-m').first();
    this.textBodyL = this.text.locator('.body-l').first();
    this.textBodyM1 = this.text.locator('.body-m').first();
       
    this.textPropertiesHeadingM = this.text.locator('#properties-h3').first();

    this.textBodyLink = this.page.locator('.body-m a');
    this.textActionAreaLink = this.page.locator('.body-m.action-area a').nth(1);
    this.outlineButton = this.text.locator('.con-button.outline');

    this.textInsetLargeMSpacingList1 = this.page.locator('.text.inset.medium.m-spacing ul').nth(0);
    this.listOneItems = this.textInsetLargeMSpacingList1.locator('li')

    this.textInsetLargeMSpacingList2 = this.page.locator('.text.inset.medium.m-spacing ul').nth(1);
    this.listTwoItems = this.textInsetLargeMSpacingList2.locator('li')

    this.generalTermsOfUse = this.textlegal.locator('.body-m').nth(1);
    this.publishText = this.textlegal.locator('.body-m').nth(2);
    this.generalTerms = this.textlegal.locator('.body-m').nth(4);
    this.legalInfoLink = this.textlegal.locator('.body-m').nth(5);

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
      'body-m1': {
        'font-size': '12px',
        'line-height': '18px',
      },
      'body-l': {
        'font-size': '20px',
        'line-height': '30px',
      },
      'foreground': {
        'font-size': '12px',
        'line-height': '18px',
      },
    };

    // text block contents attributes
    this.attProperties = {
      'outline': { 'daa-ll': /^outline\|(.*)/ },
      'filled': { 'daa-ll': /^filled\|(.*)/ },
      'learn-more': { 'daa-ll': /^Learn more[-\s]\d+\|(.*)/  },
      'text-link': { 'daa-ll': /^Explore the premium collection[-\s]\d+|(.*)/ },
      'text': {
        'class': 'text text-block con-block',
        'daa-lh': 'b1|text|default|default',
      },
      'text-intro': {
        'class': 'text intro text-block con-block has-bg max-width-8-desktop xxl-spacing-top xl-spacing-bottom',
        'daa-lh': 'b1|text|default|default',
        'style': 'background: rgb(255, 255, 255);',
      },
      'text-full-width': {
        'class': 'text full-width text-block con-block max-width-8-desktop center xxl-spacing',
        'daa-lh': 'b1|text|default|default',
      },
      'text-full-width-large': {
        'class': 'text full-width large text-block con-block max-width-8-desktop center xxl-spacing',
        'daa-lh': 'b1|text|default|default',
      },
      'text-long-form-large': {
        'class': 'text long-form large text-block con-block max-width-8-desktop',
        'daa-lh': 'b1|text|default|default',
      },
      'text-inset-medium-m-spacing': {
        'class': 'text inset medium m-spacing text-block con-block max-width-8-desktop',
        'daa-lh': 'b1|text|default|default',
      },
      'text-legal': {
        'class': 'text legal text-block con-block has-bg',
      },
      'text-Link-farm': {
        'class': 'text link-farm text-block con-block has-bg',
        'daa-lh' : 'b1|text|default|default',
        'style': 'background: rgb(255, 255, 255);',
      },
      'headingprops': {
        'id' : 'heading-1',
       },
    };
  }

  /**
 * Verifies the css, attributes, styles, of elements or sections of the specified Text block.
 *
 * @param {string} textType - The type of the Text block to verify.
 * Possible values are 'text', 'text (Intro)', 'Text (full width)'.
 * text (full-width, large), text (long form, large), and text (inset, large, m spacing).
 * text (legal), text (link-farm).
 * @returns {Promise<boolean>} - Returns true if the specified Text type has the expected values.
 */
  async verifyText(textType, data) {
    switch (textType) {
      case 'text':
        // verify text visibility, content, css and attribute values
        await expect(await this.text).toBeVisible();

        await expect(await this.textHeadline).toContainText(data.h3Text);
        await expect(await this.textBodyM).toContainText(data.bodyText);
        await expect(await this.outlineButton).toContainText(data.outlineButtonText);

        expect(await WebUtil.verifyAttributes(await this.text, this.attProperties.text)).toBeTruthy();
        expect(await WebUtil.verifyCSS(await this.textHeadline, this.cssProperties['heading-l'])).toBeTruthy();
        expect(await WebUtil.verifyCSS(await this.textBodyM, this.cssProperties['body-m'])).toBeTruthy();
        expect(await WebUtil.verifyCSS(await this.textActionAreaLink, this.cssProperties['body-m'])).toBeTruthy();
        expect(await WebUtil.verifyAttributes(await this.textActionAreaLink, this.attProperties['text-link'])).toBeTruthy();
        expect(await WebUtil.verifyAttributes(await this.outlineButton, this.attProperties['learn-more'])).toBeTruthy();

        return true;
      case 'text (intro)':
        // verify text (intro) visibility, css and attribute values
        await expect(this.textIntro).toBeVisible();
        await expect(await this.textIntroHeadline).toContainText(data.h2Text);
        await expect(await this.textBodyM).toContainText(data.bodyText);

        expect(await WebUtil.verifyAttributes(await this.textIntro, this.attProperties['text-intro'])).toBeTruthy();
        expect(await WebUtil.verifyCSS(await this.textIntroDetailM, this.cssProperties['detail-m'])).toBeTruthy();
        expect(await WebUtil.verifyCSS(await this.textIntroHeadline, this.cssProperties['heading-l'])).toBeTruthy();
        expect(await WebUtil.verifyCSS(await this.textBodyM, this.cssProperties['body-m'])).toBeTruthy();

        return true;

      case 'text (full width)':
        // verify text (full width) visibility, content, css and attribute values
        await expect(this.textFullWidth).toBeVisible();

        await expect(await this.textFullWidthHeadline).toContainText(data.h3Text);
        await expect(await this.textBodyM).toContainText(data.bodyText);
        await expect(await this.textBodyLink).toContainText(data.linkText);

        expect(await WebUtil.verifyAttributes(await this.textFullWidth, this.attProperties['text-full-width'])).toBeTruthy();
        expect(await WebUtil.verifyCSS(await this.textFullWidthHeadline, this.cssProperties['heading-l'])).toBeTruthy();
        expect(await WebUtil.verifyCSS(await this.textBodyM, this.cssProperties['body-m'])).toBeTruthy();
        expect(await WebUtil.verifyAttributes(await this.textBodyLink, this.attProperties['text-link'])).toBeTruthy();

        return true;

      case 'text (full-width, large)':
        // verify text (full-width, large) visibility, content, css and attribute values
        await expect(this.textFullWidthLarge).toBeVisible();

        await expect(await this.textFullWidthLargeHeadline).toContainText(data.h2Text);
        await expect(await this.textBodyM).toContainText(data.bodyText);
        await expect(await this.textBodyLink).toContainText(data.linkText);

        expect(await WebUtil.verifyAttributes(await this.textFullWidthLarge, this.attProperties['text-full-width-large'])).toBeTruthy();
        expect(await WebUtil.verifyCSS(await this.textFullWidthLargeHeadline, this.cssProperties['heading-xl'])).toBeTruthy();
        expect(await WebUtil.verifyCSS(await this.textBodyM, this.cssProperties['body-m'])).toBeTruthy();
        expect(await WebUtil.verifyAttributes(await this.textBodyLink, this.attProperties['text-link'])).toBeTruthy();

        return true;

      case 'text (long form, large)':
        // verify text (long-form, large) visibility, content, css and attribute values
        await expect(await this.textLongFormLarge).toBeVisible();

        await expect(await this.textLongFormDetailL).toContainText(data.detailText);
        await expect(await this.textLongFormLargeHeadline).toContainText(data.h2Text);
        await expect(await this.textBodyL).toContainText(data.bodyText);
 
        expect(await WebUtil.verifyAttributes(await this.textLongFormLarge, this.attProperties['text-long-form-large'])).toBeTruthy();
        expect(await WebUtil.verifyCSS(await this.textLongFormDetailL, this.cssProperties['detail-l'])).toBeTruthy();
        expect(await WebUtil.verifyCSS(await this.textLongFormLargeHeadline, this.cssProperties['heading-l'])).toBeTruthy();
        expect(await WebUtil.verifyCSS(await this.textBodyL, this.cssProperties['body-l'])).toBeTruthy();

        return true;

      case 'text (inset, large, m spacing)':
        // verify text (inset, large, m spacing) visibility, content, css and attribute values
        await expect(await this.textInsetLargeMSpacing).toBeVisible();

        await expect(await this.textInsetLargeMSpacingHeadline).toContainText(data.h3Text);
        await expect(await this.textBodyL).toContainText(data.bodyText);
        await expect(await this.listOneItems).toHaveCount(data.listCount1);

        expect(await WebUtil.verifyAttributes(await this.textInsetLargeMSpacing, this.attProperties['text-inset-medium-m-spacing'])).toBeTruthy();
        expect(await WebUtil.verifyCSS(await this.textInsetLargeMSpacingHeadline, this.cssProperties['heading-m'])).toBeTruthy();
        expect(await WebUtil.verifyCSS(await this.textBodyL, this.cssProperties['body-l'])).toBeTruthy();
        expect(await WebUtil.verifyCSS(await this.textPropertiesHeadingM, this.cssProperties['heading-m'])).toBeTruthy();

        return true;

        case 'text (legal)':
        // verify text (legal) visibility, content, css and attribute values
        await expect(await this.textlegal).toBeVisible();

        await expect(await this.generalTermsOfUse).toContainText(data.termsOfUseText);
        await expect(await this.publishText).toContainText(data.publishText);
        await expect(await this.generalTerms).toContainText(data.generalTermsText);
        await expect(await this.legalInfoLink).toContainText(data.linkText);
    
        expect(await WebUtil.verifyAttributes(await this.textlegal, this.attProperties['text-legal'])).toBeTruthy();
        expect(await WebUtil.verifyCSS(await this.textBodyM1, this.cssProperties['body-m1'])).toBeTruthy();
     
        return true;

        case 'text (link-farm)':
        // verify text (link-farm) visibility, content, css and attribute values
        await expect(await this.textLinkFarm).toBeVisible();

        await expect(await this.textLinkFarmcolumns).toHaveCount(data.headingColumns);
        await expect(await this.textLinkColumnOne).toHaveCount(data.linksCount);
        await expect(await this.linkFormText).toContainText(data.linkText);

        expect(await WebUtil.verifyAttributes(await this.textLinkFarm, this.attProperties['text-Link-farm'])).toBeTruthy();
        expect(await WebUtil.verifyCSS(await this.textLinkFarmHeadline, this.cssProperties['heading-l'])).toBeTruthy();
        expect(await WebUtil.verifyAttributes(await this.textLinkFarmcolumnheading, this.attProperties['headingprops'])).toBeTruthy();

        return true;

      default:
        throw new Error(`Unsupported Text type: ${this.textType}`);
    }
  }
};
