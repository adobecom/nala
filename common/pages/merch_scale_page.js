import { GnavPage } from './gnav_page';

/**
 *  Class representing a merch at scale pages.
 */
export class MerchScaleBasePage extends GnavPage {
  /**
   * @type {object}
   * @description  Offer Selector Tool button
   */
   get offerSelectorToolButton() {
    return $('//button[@title="Offer Selector Tool"]');
  }

  /**
   * @type {object}
   * @description  Offer Selector Tool Search field
   */
   get searchProductField() {
    return $('//input[@data-testid="search"]');
  }

  /**
   * @type {object}
   * @description  Offer Selector Tool productlist box
   */
   get productList() {
    return $$('//span[contains(@class,"productName spectrum-Menu-itemLabel")]');
  }

  /**
   * @type {object}
   * @description  Offer Selector Tool button in text component
   */
   get offerSelectorToolButton() {
    return $('//button[@title="Offer Selector Tool"]');
  }

  /**
   * @type {object}
   * @description  Offer Selector Tool navigation button label
   */
   get nextButtonLabel() {
    return $('//div[contains(@class,"spectrum-Dialog")]//button[contains(@class,"spectrum-Button--cta")]');
  }

  /**
   * @type {object}
   * @description  Offer Selector Tool - offer Id list
   */
   get offerIdList() {
    return $$('//div[contains(@id,"tab-offer")]');
  }

  /**
   * @type {object}
   * @description  Offer Selector Tool - plan type use element labels
   */
   get useLabelList() {
    return $$('//button[contains(@class,"spectrum-Button")]//span[contains(.,"Use")]');
  }

  /**
   * @type {object}
   * @description  Offer Selector Tool - product offer id element
   * @param {string} offerId offer id 
   */
   getOfferIdItem(offerId) {
    return $(`//div[contains(@id,"tabpanel-offer")]//span[contains(.,"${offerId}")]`);
  }

  /**
   * @type {object}
   * @description  get overlay wrapper for text component tool bar
   */
   get textOverlayWrapper() {
    return $('//div[contains(@id,"OverlayWrapper")]');
  }

  /**
   * @type {object}
   * @description  get editable component with title
   * @param {string} title - component title
   */
   getEditableComponent(title) {
    return $(`//div[contains(@title,"${title}")]`);
  }

  /**
   * @type {object}
   * @description  get editable configure tool bar element
   */
   get editableConfigure() {
    return $('//button[contains(@title,"Configure")]');
  }

  /**
   * @type {object}
   * @description  get offer selector use button
   */
   get useButtonLabel() {
    return $('//div[contains(@class,"spectrum-Dialog")]//span[contains(.,"Use")]');
  }

  /**
   * @type {object}
   * @description  get offer selector plan type dropdown
   */
   get offerTypeDropdownTrigger() {
    return $$('//button[contains(@class,"spectrum-Dropdown-trigger")]');
  }

  /**
   * @type {object}
   * @description  get offer selector plan/offer type dropdown value
   * @param {string} value Plan or Offer value
   */
   getOfferTypeDropdownLabel(value) {
    return $(`//span[.="${value}"]`);
  }

  /**
   * @type {object}
   * @description  get offer selector customer/market segment value
   * @param {string} segment - Customer/Market segment value
   */
   getSegment(segment) {
    return $(`//input[@value="${segment}"]`);
  }

  /**
   * @type {object}
   * @description  get choose offer dropdown button trigger
   */
   get ctaOfferDropdownTrigger() {
    return $('//button[contains(@class,"coral3-Select-button")]//span[contains(.,"Browse")]');
  }

  /**
   * @type {object}
   * @description  get choose offer dropdown button value
   * @param {string} offerId Product offer id
   */
   getCTAOfferDropdownLabel(offerId) {
    return $(`//coral-selectlist-item[contains(@class,"coral3-SelectList-item")and contains(.,"${offerId}")]`);
  }

  /**
   * @type {object}
   * @description  get cta element
   */
   get cta() {
    return $('//a[contains(@class,"spectrum-Button spectrum-Button--cta")]');
  }

  /**
   * @type {object}
   * @description  get text price element
   */
   get textPrice() {
    return $('//span[contains(@data-wcs-type,"price")]');
  }

  /**
   * @type {object}
   * @description  get price tooltip element
   */
   get priceTooltip() {
    return $('.dexter-OfferSelector-overlay.is-open');
  }

  /**
   * @type {object}
   * @description  get dexter promo modal Close button
   */
  get dexterClosePromoModal() { 
    return $('div#promo-modal-text-image a.dexter-CloseButton'); 
  }


}
