import { expect } from '@playwright/test';
import { WebUtil } from '../../libs/webutil.js';

export default class HowTo {
  constructor(page) {
    this.page = page;
    // how-to  locators
    this.howTo = page.locator('.how-to');
    this.howToForeground = this.howTo.locator('.foreground');
    this.howToLarge = this.page.locator('.how-to.large-image');
    this.howToSeo = this.page.locator('.how-to.seo');
    this.howToHeading = this.howTo.locator('.how-to-heading');
    this.howToImage = this.howTo.locator('.how-to-image');
    this.howToList = this.howTo.locator('li');
    this.howToLargeImage = page.locator('.how-to-image img');

    // howto contents css
    this.cssProperties = {
      '.how-to .foreground': {
        'padding': '80px 0px',
        'max-width': /%$/,
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
        'display': 'block',
        'grid-template-areas': 'none',
      },
      'how-to-seo': {
        'display': 'block',
        'grid-template-areas': 'none',
      },
    };

    // howto contents attributes
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
 * Possible values are 'how-to', 'how-to (large-image)', and 'how-to (seo)'.
 * @param {Integer} howToListCount - Howto block list count (ex: 3, 4, 5 etc..).
 * @returns {Promise<boolean>} - Returns true if the specified HowTo type has the expected values.
 */
  async verifyHowTo(howToType, howToListCount) {
    switch (howToType) {
      case 'how-to':
        // verify howto visibility and css values
        await expect(this.howTo).toBeVisible();
        expect(await WebUtil.verifyCSS(this.howToForeground, this.cssProperties['.how-to .foreground'])).toBeTruthy();
        expect(await WebUtil.verifyCSS(this.howToHeading, this.cssProperties['body-m'])).toBeTruthy();
        expect(await WebUtil.verifyCSS(this.howToImage, this.cssProperties['how-to-image'])).toBeTruthy();
        // verify howto list count
        await expect(await this.howToList).toHaveCount(howToListCount);
        return true;
      case 'how-to (large)':
        // verify howto large visibility and css values
        await expect(this.howToLarge).toBeVisible();
        expect(await WebUtil.verifyCSS(this.howToHeading, this.cssProperties['body-m'])).toBeTruthy();
        expect(await WebUtil.verifyCSS(this.howToLarge, this.cssProperties['how-to-large-image'])).toBeTruthy();
        expect(await WebUtil.verifyAttributes(await this.howToLargeImage, this.attProperties['how-to-large-image'])).toBeTruthy();
        // verify howto list count
        await expect(await this.howToList).toHaveCount(howToListCount);
        return true;
      case 'how-to (seo)':
        // verify howto seo visibility and css values
        await expect(this.howToSeo).toBeVisible();
        expect(await WebUtil.verifyCSS(this.howToHeading, this.cssProperties['body-m'])).toBeTruthy();
        expect(await WebUtil.verifyCSS(this.howToSeo, this.cssProperties['how-to-seo'])).toBeTruthy();
        // verify howto list count
        await expect(await this.howToList).toHaveCount(howToListCount);
        return true;
      default:
        throw new Error(`Unsupported howto type: ${this.howToList}`);
    }
  }
};
