import { expect } from '@playwright/test';
import { WebUtil } from '../../libs/webutil.js';

export default class Marquee {
  constructor(page) {
    this.page = page;
    // marquee types locators
    this.marquee = page.locator('.marquee').first();
    this.marqueeLight = page.locator('.marquee.light');
    this.marqueeSmall = page.locator('.marquee.small');
    this.marqueeSmallLight = page.locator('.marquee.small.light');
    this.marqueeLarge = page.locator('.marquee.large');
    this.marqueeLargeLight = page.locator('.marquee.large.light');
    this.marqueeQuiet = page.locator('.marquee.quiet');
    this.marqueeInline = page.locator('.marquee');
    this.marqueeSplitSmall = page.locator('.marquee.split.small');
    this.marqueeSplitLarge = page.locator('.marquee.split.large');
    this.marqueeSplitLargeLight = page.locator('.marquee.split.one-third.large.light');
    this.marqueeSplitOneThirdLargeLight = page.locator('.marquee.split.one-third.large.light');
    this.marqueeSplitOneThird = page.locator('.marquee.split.one-third');
    this.marqueeSplitOneThirdSmallLight = page.locator('.marquee.split.one-third.small.light');

    // marque section(s) locators
    // marquee details
    this.detailM = this.marquee.locator('.detail-m');
    this.detailL = this.marquee.locator('.detail-l');
    this.brandImage = this.marquee.locator('.detail-m');

    // marquee headings
    this.headingXL = this.marquee.locator('.heading-xl');
    this.headingXXL = this.marquee.locator('.heading-xxl');

    // marquee body area
    this.bodyM = this.marquee.locator('.body-m');
    this.bodyXL = this.marquee.locator('.body-xl');

    // marquee actions area
    this.actionArea = this.marquee.locator('.action-area');
    this.outlineButton = this.marquee.locator('.con-button.outline');
    this.outlineButtonS = this.marquee.locator('.con-button.outline.button-s');
    this.outlineButtonM = this.marquee.locator('.con-button.outline.button-m');
    this.outlineButtonL = this.marquee.locator('.con-button.outline.button-l');
    this.outlineButtonXL = this.marquee.locator('.con-button.outline.button-xl');

    this.blueButton = this.marquee.locator('.con-button.blue');
    this.filledBlueButton = this.marquee.locator('.con-button.blue');
    this.filledButtonM = this.marquee.locator('.con-button.blue.button-s');
    this.filledButtonM = this.marquee.locator('.con-button.blue.button-m');
    this.filledButtonL = this.marquee.locator('.con-button.blue.button-l');
    this.filledButtonXL = this.marquee.locator('.con-button.blue.button-xl');

    // background images
    this.background = this.marquee.locator('.background');
    this.backgroundImage = this.marquee.locator('div.background img');

    // foreground images
    this.foreground = this.marquee.locator('.foreground');
    this.foregroundImage = this.marquee.locator('div.foreground img');

    // media images
    this.mediaImage = this.marquee.locator('div.media img');

    // marquee contents css
    this.cssProperties = {
      'heading-xxl': {
        'font-size': '44px',
        'line-height': '55px',
      },
      'heading-xl': {
        'font-size': '36px',
        'line-height': '45px',
      },
      'detail-l': {
        'font-size': '16px',
        'line-height': '20px',
      },
      'detail-m': {
        'font-size': '12px',
        'line-height': '15px',
      },
      'detail-xl': {
        'font-size': '22px',
        'line-height': '33px',
      },
      'body-m': {
        'font-size': '18px',
        'line-height': '27px',
      },
      'body-xl': {
        'font-size': '22px',
        'line-height': '33px',
      },
      'outline-l': {
        'padding': '7px 18px 8px',
        'line-height': '20px',
        'border-radius': '20px',
        'font-size': '17px',
        'min-height': '21px',
      },
      'outline-xl': {
        'padding': '10px 24px 8px',
        'line-height': '24px',
        'border-radius': '25px',
        'font-size': '19px',
        'min-height': '28px',
        'border': '2px solid rgb(44, 44, 44)',
        'color': 'rgb(44, 44, 44)',
      },
      'filled-l': {
        'padding': '7px 18px 8px',
        'line-height': '20px',
        'border-radius': '20px',
        'font-size': '17px',
        'min-height': '21px',
        'border': '2px solid rgb(20, 115, 230)',
        'color': 'rgb(255, 255, 255)',
      },
      'filled-xl': {
        'padding': '10px 24px 8px',
        'line-height': '24px',
        'border-radius': '25px',
        'font-size': '19px',
        'min-height': '28px',
      },
      'marquee-light': { 'min-height': '560px' },
      'marquee-small': { 'min-height': '360px' },
      'marquee-large': { 'min-height': '700px' },
      'marquee-quiet': { 'min-height': '360px' },
      'marquee-inline': { 'min-height': '360px' },
      'marquee-small-light': { 'min-height': '360px' },
      'marquee-large-light': { 'min-height': '700px' },
      'marquee-split-small': { 'min-height': '360px' },
      'marquee-split-large': { 'min-height': '700px' },
      'marquee-split-one-third': { 'min-height': '560px' },
      'marquee-split-one-third-large-light': { 'min-height': '700px' },
      'marquee-split-one-third-small-light': { 'min-height': '360px' },

    };

    // marquee contents css
    this.attProperties = {
      'outline-l': { 'daa-ll': /^outline\|(.*)/ },
      'filled-l': { 'daa-ll': /^filled\|(.*)/ },
      'outline-xl': { 'daa-ll': /^outline\|(.*)/ },
      'filled-xl': { 'daa-ll': /^filled\|(.*)/ },
      'marquee-light': {
        'daa-lh': 'marquee|light',
        'daa-im': 'true',
      },
      'marquee-small': {
        'daa-lh': 'marquee|small',
        'daa-im': 'true',
      },
      'marquee-small-light': {
        'daa-lh': 'marquee|small|light',
        'daa-im': 'true',
      },
      'marquee-large': {
        'daa-lh': 'marquee|large',
        'daa-im': 'true',
      },
      'marquee-large-light': {
        'daa-lh': 'marquee|large|light',
        'daa-im': 'true',
      },
      'marquee-quiet': {
        'daa-lh': 'marquee|quiet',
        'daa-im': 'true',
      },
      'marquee-inline': {
        'daa-lh': 'marquee|inline',
        'daa-im': 'true',
      },
      'marquee-split-small': {
        'daa-lh': 'marquee|split|small',
        'daa-im': 'true',
        'style': 'background: rgb(0, 0, 0);',
      },
      'marquee-split-large': {
        'daa-lh': 'marquee|split|large',
        'daa-im': 'true',
        'style': 'background: rgb(0, 0, 0);',
      },
      'marquee-split-one-third-large-light': {
        'daa-lh': 'marquee|split|one-third|large|light',
        'daa-im': 'true',
        'style': 'background: rgb(245, 245, 245);',
      },
      'marquee-split-one-third': {
        'daa-lh': 'marquee|split|one-third',
        'daa-im': 'true',
        'style': 'background: rgb(0, 0, 0);',
      },
      'marquee-split-one-third-small-light': {
        'daa-lh': 'marquee|split|one-third|small|light',
        'daa-im': 'true',
        'style': 'background: rgb(245, 245, 245);',
      },
      'background': {
        'width': '750',
        'height': '375',
      },
      'media': {
        'width': '600',
        'height': '300',
      },
      'media-split-small': {
        'width': '720',
        'height': '520',
      },
      'media-split-large': {
        'width': '720',
        'height': '520',
      },
      'media-split-one-third': {
        'width': '720',
        'height': '520',
      },
    };
  }

  /**
 * Verifies that the CSS properties of the specified marquee text types are correct.
 * @param {string} textType - The type of the marquee text to check.
 * @return {Promise<boolean>} - Returns true if the CSS properties of the specified marquee text type are correct.
 */
  async verifyMarqueeTextCSS(textType) {
    const cssProps = this.cssProperties[textType];

    if (!cssProps) {
      throw new Error(`Unsupported button type: ${textType}`);
    }
    // build the text locator
    const textLocator = await this.marquee.locator(` .${textType}`).first();

    // call common WebUtil verifyCSS method
    expect(WebUtil.verifyCSS(textLocator, cssProps)).toBeTruthy();

    return true;
  }

  /**
 * Verifies that the specified marquee button type has the expected 'daa-ll' attribute value.
 * @param {string} buttonType - The type of the marquee button to check. Possible values are 'outline' and 'filled'.
 * @return {Promise<boolean>} - Returns true if the specified marquee button type has the expected 'daa-ll' attribute value.
 */
  async verifyMarqueeButtonAttributes(buttonType) {
    const attProps = this.attProperties[buttonType];

    if (!attProps) {
      throw new Error(`Unsupported button type: ${buttonType}`);
    }
    // get the button locator
    const button = buttonType.startsWith('outline') ? this.outlineButton : this.blueButton;

    // call common WebUtil verifyAttributes method
    expect(WebUtil.verifyAttributes(button, attProps)).toBeTruthy();
    return true;
  }

  /**
 * Verifies that the specified marquee button type has the expected classes.
 * @param {string} buttonType - The type of the marquee button to check.
 * @return {Promise<boolean>} - Returns true if the specified marquee button type has the expected classes.
 */
  async verifyMarqueeButtonClasses(buttonType) {
    let button;
    let classes;

    if (buttonType.startsWith('outline')) {
      button = this.outlineButton;
      classes = ['con-button', 'outline'];
    } else if (buttonType.startsWith('filled')) {
      button = this.blueButton;
      classes = ['con-button', 'blue'];
    }
    const [, size] = buttonType.split('-');
    classes = [...classes, `button-${size}`, 'button-justified-mobile'];

    // verify the classes
    await expect(await button).toHaveClass(classes.join(' '));
    return true;
  }

  /**
 * Verifies that the CSS properties of the specified marquee button type are correct.
 * @param {string} buttonType - The type of the marquee button to check. Possible values are 'outline' and 'filled'.
 * @return {Promise<boolean>} - Returns true if the CSS properties of the specified marquee button type are correct.
 */
  async verifyMarqueeButtonCSS(buttonType) {
    let buttonClass = '';
    const buttonSize = buttonType.split('-')[1];

    const cssProps = this.cssProperties[buttonType];

    if (!cssProps) {
      throw new Error(`Unsupported button type: ${buttonType}`);
    }

    if (buttonType.startsWith('filled')) {
      buttonClass = 'blue';
    } else if (buttonType.startsWith('outline')) {
      buttonClass = 'outline';
    }
    // build the button locator
    const buttonLocator = await this.marquee.locator(`.con-button.${buttonClass}.button-${buttonSize}`).first();

    // call common WebUtil verifyCSS method
    expect(WebUtil.verifyCSS(buttonLocator, cssProps)).toBeTruthy();
    return true;
  }

  /**
 * Verifies that the marquee has the given width and height attributes for the specified image type.
 * @param {string} imageType - The type of image to verify, either 'background' or 'media'.
 * @param {number} width - The expected width of the specified image.
 * @param {number} height - The expected height of the specified image.
 * @return {Promise<boolean>} - Returns true if the specified image of the marquee has the expected values.
 */
  async verifyMarqueeImageAttributes(imageType) {
    let imageElement;
    const attProps = this.attProperties[imageType];

    if (!attProps) {
      throw new Error(`Unsupported images : ${imageType}`);
    }

    if (imageType.startsWith('background')) {
      imageElement = this.backgroundImage;
    } else if (imageType.startsWith('media')) {
      imageElement = this.mediaImage;
    } else {
      throw new Error(`Invalid image type: ${imageType}`);
    }
    await expect(await imageElement).toHaveAttribute('width', attProps.width);
    await expect(await imageElement).toHaveAttribute('height', attProps.height);
    return true;
  }

  /**
 * Verifies the css, attributes, styles, of elements or sections of the specified marquee type.
 *
 * @param {string} marqueeType - The type of the marquee to verify.
 * Possible values are 'marquee (light)', 'marquee (small)', and 'marquee (small, light)'.
 * @returns {Promise<boolean>} - Returns true if the specified marquee type has the expected values.
 */
  async verifyMarquee(marqueeType) {
    switch (marqueeType) {
      case 'marquee (light)':
        // verify marquee visibility, css, analytics and other attributes
        console.log('In Marquee Block page title : ', await this.page.title());
        await expect(await this.marqueeLight).toBeVisible();
        expect(WebUtil.verifyCSS(await this.marqueeLight, this.cssProperties['marquee-light'])).toBeTruthy();
        expect(WebUtil.verifyAttributes(await this.marqueeLight, this.attProperties['marquee-light'])).toBeTruthy();

        // verify action button css, attributes and classes
        await Promise.all(['filled-l', 'outline-l'].map(async (type) => {
          expect(await this.verifyMarqueeButtonCSS(type)).toBeTruthy();
          expect(await this.verifyMarqueeButtonAttributes(type)).toBeTruthy();
          expect(await this.verifyMarqueeButtonClasses(type)).toBeTruthy();
        }));

        // verify image attributes
        expect(await this.verifyMarqueeImageAttributes('media')).toBeTruthy();

        return true;

      case 'marquee (small)':
        // verify marquee visibility, css, analytics and other attributes
        await expect(await this.marqueeSmall).toBeVisible();
        expect(WebUtil.verifyCSS(this.marqueeSmall, this.cssProperties['marquee-small'])).toBeTruthy();
        expect(WebUtil.verifyAttributes(this.marqueeSmall, this.attProperties['marquee-small'])).toBeTruthy();

        // verify button css, analytics attributes and classes
        expect(await this.verifyMarqueeButtonCSS('filled-l')).toBeTruthy();
        expect(await this.verifyMarqueeButtonAttributes('filled-l')).toBeTruthy();
        expect(await this.verifyMarqueeButtonClasses('filled-l')).toBeTruthy();

        // verify background image attributes
        expect(await this.verifyMarqueeImageAttributes('background')).toBeTruthy();

        return true;

      case 'marquee (small, light)':
        // verify marquee visibility, css, analytics and other attributes
        await expect(await this.marqueeSmallLight).toBeVisible();
        expect(WebUtil.verifyCSS(this.marqueeSmallLight, this.cssProperties['marquee-small-light'])).toBeTruthy();
        expect(WebUtil.verifyAttributes(this.marqueeSmallLight, this.attProperties['marquee-small-light'])).toBeTruthy();

        // verify button css, analytics attributes and classes
        await Promise.all(['filled-l', 'outline-l'].map(async (type) => {
          expect(await this.verifyMarqueeButtonCSS(type)).toBeTruthy();
          expect(await this.verifyMarqueeButtonAttributes(type)).toBeTruthy();
          expect(await this.verifyMarqueeButtonClasses(type)).toBeTruthy();
        }));

        // verify background image attributes
        expect(await this.verifyMarqueeImageAttributes('background')).toBeTruthy();
        expect(await this.verifyMarqueeImageAttributes('media')).toBeTruthy();

        return true;

      case 'marquee (large)':
      // verify marquee visibility, css, analytics and other attributes
        await expect(await this.marqueeLarge).toBeVisible();
        expect(WebUtil.verifyCSS(this.marqueeLarge, this.cssProperties['marquee-large'])).toBeTruthy();
        expect(WebUtil.verifyAttributes(this.marqueeLarge, this.attProperties['marquee-large'])).toBeTruthy();

        // verify heading text css
        expect(await this.verifyMarqueeTextCSS('heading-xxl')).toBeTruthy();

        // verify button css, analytics attributes and classes
        expect(await this.verifyMarqueeButtonCSS('filled-xl')).toBeTruthy();
        expect(await this.verifyMarqueeButtonAttributes('filled-xl')).toBeTruthy();
        expect(await this.verifyMarqueeButtonClasses('filled-xl')).toBeTruthy();

        return true;

      case 'marquee (large, light)':
      // verify marquee visibility, css, analytics and other attributes
        await expect(await this.marqueeLargeLight).toBeVisible();
        expect(WebUtil.verifyCSS(this.marqueeLargeLight, this.cssProperties['marquee-large-light'])).toBeTruthy();
        expect(WebUtil.verifyAttributes(this.marqueeLargeLight, this.attProperties['marquee-large-light'])).toBeTruthy();

        // verify heading text css
        expect(await this.verifyMarqueeTextCSS('heading-xxl')).toBeTruthy();

        // verify button css, analytics attributes and classes
        expect(await this.verifyMarqueeButtonCSS('outline-xl')).toBeTruthy();
        expect(await this.verifyMarqueeButtonAttributes('outline-xl')).toBeTruthy();
        expect(await this.verifyMarqueeButtonClasses('outline-xl')).toBeTruthy();
        return true;

      case 'marquee (quiet)':
      // verify marquee visibility, css, analytics and other attributes
        await expect(await this.marqueeQuiet).toBeVisible();
        expect(WebUtil.verifyCSS(this.marqueeQuiet, this.cssProperties['marquee-quiet'])).toBeTruthy();
        expect(WebUtil.verifyAttributes(this.marqueeQuiet, this.attProperties['marquee-quiet'])).toBeTruthy();

        // verify heading text css
        expect(await this.verifyMarqueeTextCSS('heading-xl')).toBeTruthy();

        // verify button css, analytics attributes and classes
        expect(await this.verifyMarqueeButtonCSS('filled-l')).toBeTruthy();
        expect(await this.verifyMarqueeButtonAttributes('filled-l')).toBeTruthy();
        expect(await this.verifyMarqueeButtonClasses('filled-l')).toBeTruthy();

        return true;

      case 'marquee (inline)':
      // verify marquee visibility, css, analytics and other attributes
        await expect(await this.marqueeInline).toBeVisible();
        await expect(this.marqueeInline).toHaveCSS('min-height', '360px');
        await expect(this.marqueeInline).toHaveAttribute('daa-lh', 'marquee|inline');

        return true;

      case 'marquee (split, small)':
        // marquee marquee visible, css, analytic and other attributes
        await expect(this.marqueeSplitSmall).toBeVisible();
        expect(WebUtil.verifyCSS(this.marqueeSplitSmall, this.cssProperties['marquee-split-small'])).toBeTruthy();
        expect(WebUtil.verifyAttributes(this.marqueeSplitSmall, this.attProperties['marquee-split-small'])).toBeTruthy();

        // verify button css, analytics attributes and classes
        await Promise.all(['filled-l', 'outline-l'].map(async (type) => {
          expect(await this.verifyMarqueeButtonCSS(type)).toBeTruthy();
          expect(await this.verifyMarqueeButtonAttributes(type)).toBeTruthy();
          expect(await this.verifyMarqueeButtonClasses(type)).toBeTruthy();
        }));

        // verify image attributes
        expect(await this.verifyMarqueeImageAttributes('media-split-small')).toBeTruthy();
        return true;

      case 'marquee (split, large)':
        // marquee marquee visible, css, analytic and other attributes
        await expect(await this.marqueeSplitLarge).toBeVisible();
        expect(WebUtil.verifyCSS(this.marqueeSplitLarge, this.cssProperties['marquee-split-large'])).toBeTruthy();
        expect(WebUtil.verifyAttributes(this.marqueeSplitLarge, this.attProperties['marquee-split-large'])).toBeTruthy();

        // verify detail, heading and body text css
        await Promise.all(['detail-l', 'heading-xxl', 'body-xl'].map(async (type) => {
          expect(await this.verifyMarqueeTextCSS(type)).toBeTruthy();
        }));

        // verify button css, analytics attributes and classes
        expect(await this.verifyMarqueeButtonCSS('filled-xl')).toBeTruthy();
        expect(await this.verifyMarqueeButtonAttributes('filled-xl')).toBeTruthy();
        expect(await this.verifyMarqueeButtonClasses('filled-xl')).toBeTruthy();

        // verify image attributes
        expect(await this.verifyMarqueeImageAttributes('media-split-large')).toBeTruthy();

        return true;

      case 'marquee (split, one-third, large, light)':
        // marquee marquee visible, css, analytic and other attributes
        await expect(this.marqueeSplitOneThirdLargeLight).toBeVisible();
        expect(WebUtil.verifyCSS(this.marqueeSplitOneThirdLargeLight, this.cssProperties['marquee-split-one-third-large-light'])).toBeTruthy();
        expect(WebUtil.verifyAttributes(this.marqueeSplitOneThirdLargeLight, this.attProperties['marquee-split-one-third-large-light'])).toBeTruthy();

        // verify detail, heading and body texts css
        await Promise.all(['detail-l', 'heading-xxl', 'body-xl'].map(async (type) => {
          expect(await this.verifyMarqueeTextCSS(type)).toBeTruthy();
        }));

        // verify button css, analytics attributes and classes
        expect(await this.verifyMarqueeButtonCSS('filled-xl')).toBeTruthy();
        expect(await this.verifyMarqueeButtonAttributes('filled-xl')).toBeTruthy();
        expect(await this.verifyMarqueeButtonClasses('filled-xl')).toBeTruthy();

        // verify image attributes
        expect(await this.verifyMarqueeImageAttributes('media-split-one-third')).toBeTruthy();

        return true;

      case 'marquee (split, one-third)':
        // marquee marquee visible, css, analytic and other attributes
        await expect(this.marqueeSplitOneThird).toBeVisible();
        expect(WebUtil.verifyCSS(this.marqueeSplitOneThird, this.cssProperties['marquee-split-one-third'])).toBeTruthy();
        expect(WebUtil.verifyAttributes(this.marqueeSplitOneThird, this.attProperties['marquee-split-one-third'])).toBeTruthy();

        // verify detail, heading and body texts css
        await Promise.all(['detail-m', 'heading-xl', 'body-m'].map(async (type) => {
          expect(await this.verifyMarqueeTextCSS(type)).toBeTruthy();
        }));

        // verify button css, analytics attributes and classes
        expect(await this.verifyMarqueeButtonCSS('filled-l')).toBeTruthy();
        expect(await this.verifyMarqueeButtonAttributes('filled-l')).toBeTruthy();
        expect(await this.verifyMarqueeButtonClasses('filled-l')).toBeTruthy();

        // verify image attributes
        expect(await this.verifyMarqueeImageAttributes('media-split-one-third')).toBeTruthy();

        return true;

      case 'marquee (split, one-third, small, light)':
        // marquee marquee visible, css, analytic and other attributes
        await expect(this.marqueeSplitOneThirdSmallLight).toBeVisible();
        expect(WebUtil.verifyCSS(this.marqueeSplitOneThirdSmallLight, this.cssProperties['marquee-split-one-third-small-light'])).toBeTruthy();
        expect(WebUtil.verifyAttributes(this.marqueeSplitOneThirdSmallLight, this.attProperties['marquee-split-one-third-small-light'])).toBeTruthy();

        // verify detail, heading and body texts css
        await Promise.all(['detail-m', 'heading-xl', 'body-m'].map(async (type) => {
          expect(await this.verifyMarqueeTextCSS(type)).toBeTruthy();
        }));
        // verify button css, analytics attributes and classes
        expect(await this.verifyMarqueeButtonCSS('filled-l')).toBeTruthy();
        expect(await this.verifyMarqueeButtonAttributes('filled-l')).toBeTruthy();
        expect(await this.verifyMarqueeButtonClasses('filled-l')).toBeTruthy();

        // verify image attributes
        expect(await this.verifyMarqueeImageAttributes('media-split-one-third')).toBeTruthy();
        return true;
      default:
        throw new Error(`Unsupported marquee type: ${marqueeType}`);
    }
  }
};
