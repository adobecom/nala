import { Section } from './section';

/** Class representing a sub-navigation menu */
export class LocalNav extends Section {
  /**
  * @type {object}
  * @description Get the page breadcrumb for local nav
  */
  get localNavBreadcrumb() {
    return $('#feds-header .feds-breadcrumbs');
  }

  /**
   * @type {object}
   * @description Buy button in local nav
   */
  get buyNowButton() {
    return this.displayed$$('//*[@data-feds-element="localnav"]//*[contains(@class, "feds-navLink--primaryCta")]')[0];
  }

  /**
   * @type {object}
   * @description Buy button in local nav
   */
  get freeTrialLink() {
    return this.displayed$$('(//*[@data-feds-element="localnav"]//ul[@daa-lh="localnav"]/li/a[@class="feds-navLink"])[last()]')[0];
  }

  /**
   * @type {object}
   * @description "Contact Us" button in local nav
   */
  get contactUs() {
    return this.displayed$$('//*[@data-feds-element="localnav"]//*[contains(@class, "feds-navLink--primaryCta")]')[0];
  }

  /**
   * @type {object}
   * @description Get nth local nav dropdown
   * @param {string} nth nth dropdown
   */
  getNthLocalnavDropdown(nth) {
    let nthDropdown = parseInt(nth);
    return this.displayed$$(`(//*[@data-feds-element="localnav"]//ul[@daa-lh="localnav"]/li/div[@class="feds-popup-trigger"])[${nthDropdown}]`)[0];
  }

  /**
   * @type {object}
   * @description Get nth local nav dropdown
   * @param {string} nth nth dropdown
   */
   getNthLocalnavDropdown(nth) {
    let nthDropdown = parseInt(nth);
    return this.displayed$$(`(//*[@data-feds-element="localnav"]//ul[@daa-lh="localnav"]/li/div[@class="feds-popup-trigger"])[${nthDropdown}]`)[0];
  }

  /**
  * @type {object}
  * @description Get global nav menu by text
  * @param {string} menu Menu name
  * @param {string} text Nav text
  */
  getGlobalNavMenuByText(menu, text) {
    return $('//*[contains(@class, "feds-navList-item--main")]//li[@id="'+menu+'"]//*[contains(text(), "'+text+'")]');
  }

  /**
  * @type {object}
  * @description Get global nav menu by menu name
  * @param {string} text Nav text
  */
  getGlobalNavMenuByName(text) {
    return $('//*[contains(@class, "feds-navList-item--main")]//div/a/span/span/span[@class="feds-navLink-text" and contains(text(), "'+text+'")]');
  }
  /**
  * @type {object}
  * @description Get global nav menu dropdown by item text
  * @param {string} text Nav text
  */
  getGlobalMenuDropdown(text) {
    return $('//*[@data-feds-element="localnav"]//li//span[contains(text(), "'+text+'")]//ancestor::a[contains(@aria-has-popup, true)]');
  }
  /**
  * @type {object}
  * @description Get global nav dropdown menu element by text
  * @param {string} menu Menu name
  * @param {string} text Nav text
  */
  getGlobalMenuNavDropdown(menu, text) {
    return $('//*[@id="'+menu+'"]/div/a[contains(@aria-has-popup, true)]');
  }
  /**
  * @type {object}
  * @description Get global nav menu by item link and text
  * @param {string} menu Menu name
  * @param {string} text Nav text
  * @param {string} link Nav link
  */
  getGlobalMenuNavLink(menu, text, link) {
    return $('//*[@id="'+menu+'"]//li//span[contains(text(), "'+text+'")]//ancestor::a[contains(@href, "'+link+'")]');
  }
  /**
  * @type {object}
  * @description Get global nav rich text menu by item link and text
  * @param {string} menu Menu name
  * @param {string} text Nav text
  * @param {string} link Nav link
  */
  getGlobalMenuRichTextLink(menu, text, link) {
    return $('//*[@id="'+menu+'"]//li//a[@class="feds-richText-link" and contains(@href, "'+link+'")]');
  }
  /**
  * @type {object}
  * @description Get global nav menu by menu name and text
  * @param {string} menu Menu name
  * @param {string} text Nav text
  */
  getGlobalMenuTitle(menu, text) {
    return $('//*[@id="'+menu+'"]//*[@class="feds-navList-headline"]//*[contains(text(), "'+text+'")]');
  }

  /**
  * @type {object}
  * @description Get global nav button by button name and text
  * @param {string} menu Menu name
  * @param {string} text Nav text
  * @param {string} link Nav link
  */
  getGlobalMenuButton(menu, text, link) {
    return $('//*[@id="'+menu+'"]//li//span[contains(text(), "'+text+'")]//ancestor::a[contains(@href, "'+link+'") and contains(@class, "feds-navLink--Cta")]');
  }
  /**
  * @type {object}
  * @description Get local nav menu by item text
  * @param {string} text Local nav item text
  */
  getLocalMenuItemText(text) {
    return $('//*[@data-feds-element="localnav"]//li//span[contains(text(), "'+text+'")]');
  }
  /**
  * @type {object}
  * @description Get local nav menu dropdown by item text
  * @param {string} text Nav text
  */
  getLocalMenuDropdown(text) {
    return $('//*[@data-feds-element="localnav"]//li//span[contains(text(), "'+text+'")]//ancestor::a[contains(@aria-has-popup, true)]');
  }
  /**
  * @type {object}
  * @description Get local nav menu dropdown by item text
  * @param {string} text Nav text
  */
  getLocalMenuNavText(text) {
    return $('//*[@data-feds-element="localnav"]//li//span[contains(text(), "'+text+'")]');
  }
  /**
  * @type {object}
  * @description Get local nav menu link by item text and link
  * @param {string} text Nav text
  * @param {string} link Nav link
  */
  getLocalMenuNavLink(text, link) {
    //*[@data-feds-element="localnav"]//*[contains(text(), "Free trial")]//ancestor::a[contains(@href, "/apps/download/substance3d-designer")]
    return $('//*[@data-feds-element="localnav"]//span[contains(text(), "'+text+'")]//ancestor::a[contains(@href, "'+link+'")]');
  }
  /**
  * @type {object}
  * @description Get local nav menu button by item text and link
  * @param {string} text Nav text
  * @param {string} link Nav link
  */
  getLocalMenuButton(text, link) {
    return $('//*[@data-feds-element="localnav"]//li//span[contains(text(), "'+text+'")]//ancestor::a[contains(@href, "'+link+'") and contains(@class, "feds-navLink--Cta")]');
  }
  /**
  * @type {object}
  * @description Get local nav dropdown menu item by text
  * @param {string} menuName Menu name
  * @param {string} text Nav text
  */
  getLocalMenuDropdownItemByText(menuName, text) {
    return $('//*[@data-feds-element="localnav"]//li//span[contains(text(), "'+menuName+'")]//ancestor::*[contains(@class,"feds-popup")]//li//span[contains(text(), "'+text+'")]');
  }
  /**
  * @type {object}
  * @description Get nth cross cloud item by link and text
  * @param {string} nth nth link position
  * @param {string} link cross cloud link
  * @param {string} text cross cloud text
  */
  getNthCrossCloudLinkByTextLink(nth, link, text) {
    return $('//ul[contains(@daa-lh,"Cross_Cloud")]/li['+nth+']/a[contains(@href, "'+link+'")]//span[contains(@class, "feds-navLink-text") and contains(text(), "'+text+'")]');
  }
  /**
  * @type {object}
  * @description Get nth cross cloud item link
  * @param {string} nth nth link position
  */
  getNthCrossCloudLink(nth) {
    return $('//ul[contains(@daa-lh,"Cross_Cloud")]/li['+nth+']/a');
  }
  /**
  * @type {object}
  * @description Get nth cross cloud item link text
  * @param {string} nth nth link position
  */
  getNthCrossCloudLinkList(nth) {
    return $('//ul[contains(@daa-lh,"Cross_Cloud")]/li['+nth+']//span/span/span');
  }
  /**
  * @type {object}
  * @description Get nth cross cloud logo link
  */
  getCrossCloudLogoLink() {
    return $('//ul[contains(@daa-lh,"Cross_Cloud")]//img[contains(@src, "adobe.com/content/dam/cc/icons/home_icon.svg")]//ancestor::a');
  }
  /**
  * @type {object}
  * @description Get nth cross cloud item link text
  * @param {string} link cross cloud link
  */
  getCrossCloudLogo(link) {
    return $('//ul[contains(@daa-lh,"Cross_Cloud")]//img[contains(@src, "adobe.com/content/dam/cc/icons/home_icon.svg")]//ancestor::a[contains(@href, "'+link+'")]');
  }
}
