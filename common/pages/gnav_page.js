import { classes } from 'polytype';
import { Page } from './page';
import { Header } from './header_section';
import { LocalNav } from './localnav_section';
import { Footer } from './footer_section';
import { RegionSwitch } from './region_switch_section';
import { LocaleModal } from './locale_modal_section';
import { Consent } from './consent_section';
import { SubNav } from './subnav_section';
import { CardCollection } from './card_collection_section';
import { BrowserExtensionModal } from './browser_extension';


/** Class representing a page with global navigation */
export class GnavPage extends classes(
  Page,
  Header,
  LocalNav,
  Footer,
  RegionSwitch,
  LocaleModal,
  Consent,
  SubNav,
  CardCollection,
  BrowserExtensionModal
) {
  /**
   * Create a page with global navigation
   * @param {string} urlPath
   * @param {object} options
   */
  constructor(urlPath, options) {
    super({ super: Page, arguments: [urlPath, options] });
  }

  /**
   * @type {string}
   * @description URL query string
   */
  get urlQuery() {
    let q = super.urlQuery;
    let keys = ['akamaiLocale'];
    for (let key of keys) {
      switch (browser.config.profile[key]) {
        case undefined:
          break;
        case 'auto':
          q[key] = browser.config.profile.locale.split('/')[0];
          break;
        default:
          q[key] = browser.config.profile[key];
      }
    }
    return q;
  }

  /**
   * @type {object}
   * @description Get the modal element. Work for GNav 2 or 1.
   */
  get localeModal() {
    return $('#localeModal,.modal-frame');
  }

  /**
   * @type {object}
   * @description Get cooke consent accept button
   */
  get CookieConsentAccept() {
    return $('#onetrust-accept-btn-handler');
  }

  /**
   * @type {object}
   * @description Get the region switch. Work for GNav 2 or 1.
   */
  get regionSwitch() {
    return $('.language-Navigation_region-List,.modal-region');
  }

  /**
   * @type {object}
   * @description Get the subnav element
   */
  get subNav() {
    return $('#AdobeSecondaryNav');
  }

  /**
   * @type {object}
   * @description Get Jarvis element
   */
  get jarvis() {
    return $('#adbMsgClientWrapper');
  }

  /**
   * @type {object}
   * @description get geo overlay modal
   */
  get dexterGeoOverlay() {
    return $('div#localeModal');
  }

  /**
   * @type {object}
   * @description get close button on geo ovelay modal
   */
  get dexterGeoOverlayClose() {
    return $('div#localeModal .dexter-CloseButton');
  }

  /**
   * @type {object}
   * @description Get the last link in the geo overlay modal
   */
  get lastOverlayLink() {
    return $('#localeModal > div > div > div > a:nth-last-child(1)');
  }

  /**
   * @type {object}
   * @description Get the first link in the geo overlay modal
   */
  get firstOverlayLink() {
    return $('#localeModal > div > div > div > a:nth-child(4)');
  }

  /**
   * @type {object}
   * @description Get the second link in the geo overlay modal
   */
  get secondOverlayLink() {
    return $('#localeModal > div > div > div > a:nth-child(5)');
  }

  /**
   * @type {object}
   * @description get OneTrust modal
   */
  get oneTrustPopup() {
    return $('#ot-content');
  }

  /**
   * @type {object}
   * @description get OneTrust modal close button
   */
  get oneTrustClose() {
    return $('.main.ot-close-icon');
  }

  /**
   * @type {object}
   * @description GNAV Header container
   */
  get GnavHeader() { return $('#feds-topnav'); }

  /**
   * @type {object}
   * @description GNAV Footer container
   */
  get GnavFooter() { return $('#feds-footernav'); }

  /**
   * @type {object}
   * @description GNAV Logo
   */
  get AdobeLogo() { return $('a.feds-logo'); }

}
