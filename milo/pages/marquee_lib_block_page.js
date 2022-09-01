import { GnavPage } from '../../common/pages/gnav_page';

/**
 * Page class for Milo Marquee Block page
 */
export class MarqueeBlockPage extends GnavPage {

  /**
   * @type {string}
   * @description URL path
   */
  get urlPath() {
    return '/docs/library/blocks/marquee';
  }

  /**
   * @type {object}
   * @description Get the breadcrumb icon in the footer
   */
  get breadcrumbIcon() {
    return $('.feds-breadcrumbs-logo');
  }

  /**
   * @type {object}
   * @description Banner
   */
  get banner() {
    return $('div#onetrust-consent-sdk');
  }

  /**
   * @type {object}
   * @description Subnav Button
   */
  get subNavButton() {
    return $('a.Subnav-menu-button');
  }

  /**
   * @type {object}
   * @description Region selector pop up window's close button
   */
  get regionSelectorContinueCurrentLang() {
    return $('.locale-modal_button');
  }

  /**
   * @type {object}
   * @description Get the locator of element where the text passed is equal to the element
   * @param {string} marqueeType marquee class type
   * @param {string} text marquee text
   */
  marqueeTextElementEquals(marqueeType, text) {
    return $(`//*[@class='${marqueeType}']`).$(`//*[text()='${text}']`);
  }

  /**
   * @type {object}
   * @description Get the locator of element where the text passed is contained in the element.
   * @param {string} marqueeType marquee class type
   * @param {string} text marquee text
   */
  marqueeTextElementContains(marqueeType, text) {
    return $(`//*[@class='${marqueeType}']`).$(`//*[contains(text(),'${text}')]`);
  }

  /**
   * @type {object}
   * @description Get the locator of button where the name passed is the text of the button
   * @param {string} marqueeType marquee class type
   * @param {string} nameButton marquee text
   */
  marqueeButton(marqueeType, nameButton) {
    return $(`//*[@class='${marqueeType}']`).$(`//*[text()='${nameButton}']`);
  }
}
