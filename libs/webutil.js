/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
// eslint-disable-next-line import/no-import-module-exports
import { expect } from '@playwright/test';

/**
 * A utility class for common web interactions.
 */
exports.WebUtil = class WebUtil {
  /**
   * Create a new instance of WebUtil.
   * @param {object} page - A Playwright page object.
   */
  constructor(page) {
    this.page = page;
    this.locator = null;
  }

  /**
   * Check if the element associated with the current locator is visible.
   * @param {Locator} locator - The Playwright locator for the element to check.
   *
   */
  static async isVisible(locator) {
    this.locator = locator;
    await expect(this.locator).toBeVisible();
    return true;
  }

  /**
   * Check if the element associated with the current locator is displayed.
   * @param {Locator} locator - The Playwright locator for the element to check.
   * @returns {Promise<boolean>} - Resolves to `true` if the element is displayed, or `false`.
   */
  static async isDisplayed(locator) {
    this.locator = locator;
    try {
      return await this.locator.evaluate((e) => e.offsetWidth > 0 && e.offsetHeight > 0);
    } catch (e) {
      console.error(`Error checking if element is displayed for locator: ${locator.toString()}`, e);
      return false;
    }
  }

  /**
   * Click the element associated with the current locator.
   * @param {Locator} locator - The Playwright locator for the element to click.
   * @returns {Promise<void>} A Promise that resolves when the element has been clicked.
   */
  static async click(locator) {
    this.locator = locator;
    return this.locator.click();
  }

  /**
   * Get the inner text of the element associated with the current locator.
   * @param {Locator} locator - The Playwright locator for the element to retrieve text from.
   * @returns {Promise<string>} A Promise that resolves to the inner text of the element.
   */
  static async getInnerText(locator) {
    this.locator = locator;
    const innerText = await this.locator.innerText();
    return innerText;
  }

  /**
   * Get the text of the element associated with the current locator, filtered by the specified tag name.
   * @param {Locator} locator - The Playwright locator for the element to retrieve text from.
   * @param {string} tagName - The name of the tag to filter by (e.g. "p", "span", etc.).
   * @returns {Promise<string>} A Promise that resolves to the text of the element, filtered by the specified tag name.
   */
  static async getTextByTag(locator, tagName) {
    this.locator = locator;
    return this.locator.$eval(tagName, (e) => e.textContent);
  }

  /**
   * Get the value of the specified attribute on the element associated with the current locator.
   * @param {Locator} locator - The Playwright locator for the element to retrieve the attribute from.
   * @param {string} attributeName - The name of the attribute to retrieve (e.g. "class", "data-attr", etc.).
   * @returns {Promise<string>} A Promise that resolves to the value of the specified attribute on the element.
   */
  static async getAttribute(locator, attributeName) {
    this.locator = locator;
    return this.locator.getAttribute(attributeName);
  }

  /**
 * Verifies that the specified CSS properties of the given locator match the expected values.
 * @param {Object} locator - The locator to verify CSS properties for.
 * @param {Object} cssProps - The CSS properties and expected values to verify.
 * @returns {Boolean} - True if all CSS properties match the expected values, false otherwise.
 */
  static async verifyCSS(locator, cssProps) {
    this.locator = locator;
    // Verify the CSS properties and values
    let result = true;
    await Promise.allSettled(
      Object.entries(cssProps).map(async ([property, expectedValue]) => {
        try {
          await expect(this.locator).toHaveCSS(property, expectedValue);
        } catch (error) {
          console.error(`CSS property ${property} not found:`, error);
          result = false;
        }
      }),
    );
    return result;
  }

  /**
 * Verifies that the specified attribute properties of the given locator match the expected values.
 * @param {Object} locator - The locator to verify attributes.
 * @param {Object} attProps - The attribute properties and expected values to verify.
 * @returns {Boolean} - True if all attribute properties match the expected values, false otherwise.
 */
  static async verifyAttributes(locator, attProps) {
    this.locator = locator;
    let result = true;
    await Promise.allSettled(
      Object.entries(attProps).map(async ([property, expectedValue]) => {
        if (property === 'class' && typeof expectedValue === 'string') {
          // If the property is 'class' and the expected value is an string,
          // split the string value into individual classes
          const classes = expectedValue.split(' ');
          try {
            await expect(this.locator).toHaveClass(classes.join(' '));
          } catch (error) {
            console.error('Attribute class not found:', error);
            result = false;
          }
        } else {
          try {
            await expect(this.locator).toHaveAttribute(property, expectedValue);
          } catch (error) {
            console.error(`Attribute ${property} not found:`, error);
            result = false;
          }
        }
      }),
    );
    return result;
  }

  /**
   * Slow/fast scroll of entire page JS evaluation method, aides with lazy loaded content.
   * This wrapper method calls a scroll script in page.evaluate, i.e. page.evaluate(scroll, { dir: 'direction', spd: 'speed' });
   * @param direction string direction you want to scroll on the page
   * @param speed string speed you would like to scroll through the page. Options: slow, fast
  */
  async scrollPage(direction, speed) {
    const scroll = async (args) => {
      const { dir, spd } = args;
      // eslint-disable-next-line no-promise-executor-return
      const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
      const scrollHeight = () => document.body.scrollHeight;
      const start = dir === 'down' ? 0 : scrollHeight();
      const shouldStop = (position) => (dir === 'down' ? position > scrollHeight() : position < 0);
      const increment = dir === 'down' ? 100 : -100;
      const delayTime = spd === 'slow' ? 30 : 5;
      console.error(start, shouldStop(start), increment);
      for (let i = start; !shouldStop(i); i += increment) {
        window.scrollTo(0, i);
        // eslint-disable-next-line no-await-in-loop
        await delay(delayTime);
      }
    };

    await this.page.evaluate(scroll, { dir: direction, spd: speed });
  }
};
