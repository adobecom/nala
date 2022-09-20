import { AemAuthorPage } from './aem_author_page';

/** Page class for AEM floodgate */
export class AemFloodgatePage extends AemAuthorPage {
  constructor() {
    super();
    this.buildProps({
      selectListOverlay: '.coral3-Select-overlay.is-open',
      deleteSuccess: '//coral-icon[@icon="checkCircle"]',
      createFG: '//a[@id="popover-createfloodgatetree"]',
      copyFG: '//a[@id="popover-copyfloodgatetree"]',
      promoteFG: '//a[@id="popover-promotefloodgatetree"]',
      deleteFG: '//a[@id="popover-deletefloodgatetree"]',
      promoteOnly: '//input[@value="promoteonly"]',
      promoteAndActivate: '//input[@value="promote-activate"]',
      promoteButton: '//button[@form="dexter-promote-floodgate-form"]',
      copyInputArea:
        '//label[text()="Text Area containing page paths."]/following-sibling::textarea',
      copyButton: '//button[@form="dexter-copy-floodgate-form-submit"]',
      deleteFGForm: '//button[@form="dexter-delete-floodgate-form"]',
      deletePopupClose: '//coral-button-label[text() ="Close"]',
      promotePopup: '//coral-dialog-header[text()="Promote Floodgate Tree"]',
      dexterFGForm: '//button[@form="dexter-floodgate-form"]',
      promoteStatus: '//a[text()="here" and contains(href,promoteStatus.json)]'
    });
  }
  /**
   *
   * @param {string} siteName
   * @returns {object}
   */
  getSiteThumbnail(siteName) {
    return browser.$(
      `(//coral-columnview-item[@data-foundation-picker-collection-item-text="${siteName}"]//following::coral-columnview-item-thumbnail)[1]`
    );
  }

  /**
   *
   * @param {string} label
   * @returns {object}
   */
  getTopMenu(label) {
    return browser.$(
      `//coral-actionbar-item[@class="coral3-ActionBar-item"]/button[@trackingelement="${label}"]`
    );
  }

  /**
   *
   * @returns {object}
   */
  getFloodGateSlot() {
    let elem = browser.$$(
      '//coral-select-item[contains(text(),"Floodgate") and not (boolean(@disabled))]'
    );
    return elem.length > 0 ? elem[0].getAttribute('value') : null;
  }

  /**
   * @param {string} slotValue
   * @returns {object}
   */
   getFloodGateSlotBySlotValue(slotValue) {
    let elem = browser.$$(
      '//coral-select-item[contains(text(),"Floodgate") and not (boolean(@disabled))]'
    );

    if(elem.length > 0) {
      for(let el of elem) {
        if(el.getAttribute('value') === slotValue) {
          return el.getAttribute('value');
        }
      }

      return "disabled";
    } else {
      return null;
    }
  }

  /**
   *
   * @param {string} value
   */
  setFloodGateSlot(value) {
    let xpath = '//form[@id="dexter-floodgate-form"]/div[1]/coral-select';
    browser.$(`${xpath}/button`).click();
    browser.pause(1000);
    browser.waitUntil(() => this.selectListOverlay.isDisplayed());
    browser.$(`${xpath}//coral-selectlist-item[@value="${value}"]`).click();
  }
}
