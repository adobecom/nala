/* eslint-disable quote-props */
/* eslint-disable import/named */
/* eslint-disable import/no-import-module-exports */

import { expect } from '@playwright/test';

import { WebUtil } from '../../libs/webutil.js';

export default class Accordion {
  constructor(page) {
    this.page = page;

    // accordion  locators
    this.accordion = this.page.locator('.accordion-container');
    this.accordionForeground = this.accordion.locator('.foreground');
    this.accordionHeaders = this.accordion.locator('dt[role=heading]');
    this.accordionButtons = this.accordion.locator('dt button');
    this.accordionButtonIcons = this.accordion.locator('.accordion-icon');

    // accordion blocks css
    this.cssProperties = {
      '.con-block.max-width-10-desktop .foreground': { 'max-width': /^\d{2}/ },

      '.con-block.max-width-12-desktop-large .foreground': { 'max-width': /^\d{2}/ },

      'accordion dd': {
        'margin': /^0.*/,
        'padding': '16px',
        'font-size': '16px',
        'line-height': '24px',
      },

      '.accordion-icon': {
        'position': 'absolute',
        'right': '16px',
        'top': /^\d{2}/,
        'margin-top': '-6px',
        'width': '12px',
        'height': '12px',
        'pointer-events': 'none',
      },

      '.accordion dt button': {
        'align-items': 'center',
        'border': '',
        'border-width': '1px 0px 0px',
        'color': 'rgb(44, 44, 44)',
        'display': 'flex',
        'font-family': '"Adobe Clean", adobe-clean, "Trebuchet MS", sans-serif',
        'font-size': '18px',
        'font-weight': '700',
        'line-height': '25px',
        'padding': '24px 32px 24px 16px',
        'position': 'relative',
        'text-align': 'left',
        'width': /^\d{4}/,
      },

    };

    // accordion blocks attributes
    this.attProperties = {
      'accordion-container': {
        'class': 'accordion-container con-block max-width-10-desktop',
        'daa-lh': 'accordion-container|con-block|max-width-10-desktop',
        'daa-im': 'true',
      },

      'accordion-container seo': {
        'class': 'accordion-container seo con-block max-width-10-desktop',
        'daa-lh': 'accordion-container|seo|con-block|max-width-10-desktop',
        'daa-im': 'true',
      },

      'accordion-container-quiet-large': {
        'class': 'accordion-container quiet max-width-12-desktop-large con-block',
        'daa-lh': 'accordion-container|quiet|max-width-12-desktop-large|con-block',
        'daa-im': 'true',
      },

      'accordion-trigger': { 'daa-ll': /^link\|(.*)/ },
    };
  }

  /**
 * Verifies the visibility, css, attributes, styles, and content of
 * the Accordion block.
 *
 * @param {string} accordionType - The type of the Accordion block to verify.
 * Possible values are 'accordion', 'accordion (seo)', and
 * 'Accordion (quiet, max-width-12-desktop-large)'.
 * @returns {Promise<boolean>} - Returns true if the specified Quote type has the expected values.
 */
  async verifyAccordion(accordionType, data) {
    // verify accordion block is visible
    await expect(await this.accordion).toBeVisible();

    // verify accordion headers, buttons, and icons count
    await expect(await this.accordionHeaders).toHaveCount(data.headers);
    await expect(await this.accordionButtons).toHaveCount(data.headers);
    await expect(await this.accordionButtonIcons).toHaveCount(data.headers);

    // verify accordion headers text content
    await expect(await this.accordionHeaders.nth(0)).toContainText(data.heading0);
    await expect(await this.accordionHeaders.nth(1)).toContainText(data.heading1);
    await expect(await this.accordionHeaders.nth(2)).toContainText(data.heading2);

    // verify accordion button css
    expect(await WebUtil.verifyCSS(
      await this.accordionButtons.nth(0),
      this.cssProperties['.accordion dt button'],
    )).toBeTruthy();

    // verify accordion icon css
    expect(await WebUtil.verifyCSS(
      await this.accordionButtonIcons.nth(0),
      this.cssProperties['.accordion-icon'],
    )).toBeTruthy();

    switch (accordionType) {
      case 'accordion':
        // verify accordion attributes and css
        expect(await WebUtil.verifyAttributes(
          await this.accordion,
          this.attProperties['accordion-container'],
        )).toBeTruthy();

        // verify accordion forground css
        expect(await WebUtil.verifyCSS(
          await this.accordionForeground.nth(0),
          this.cssProperties['.con-block.max-width-10-desktop .foreground'],
        )).toBeTruthy();

        return true;

      case 'accordion (seo)':
        // verify accordion attributes and css
        expect(await WebUtil.verifyAttributes(
          await this.accordion,
          this.attProperties['accordion-container seo'],
        )).toBeTruthy();

        // verify accordion forground css
        expect(await WebUtil.verifyCSS(
          await this.accordionForeground.nth(0),
          this.cssProperties['.con-block.max-width-10-desktop .foreground'],
        )).toBeTruthy();

        // verify seo script
        // eslint-disable-next-line no-case-declarations
        const scriptContent = await this.page.evaluate(() => {
          const scriptElement = document.querySelector('script[type="application/ld+json"]');
          return scriptElement ? scriptElement.textContent : null;
        });
        expect(scriptContent).toBeTruthy();
        console.log('Script content:', scriptContent);

        return true;

      case 'accordion (quiet, max-width-12-desktop-large)':
        // verify accordion attributes and css
        expect(await WebUtil.verifyAttributes(
          await this.accordion,
          this.attProperties['accordion-container-quiet-large'],
        )).toBeTruthy();

        // verify accordion forground css
        expect(await WebUtil.verifyCSS(
          await this.accordionForeground.nth(0),
          this.cssProperties['.con-block.max-width-10-desktop .foreground'],
        )).toBeTruthy();

        return true;
      default:
        throw new Error(`Unsupported Text type: ${this.accordionType}`);
    }
  }
}
