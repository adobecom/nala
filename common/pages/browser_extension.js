import { Section } from './section';

/** Class representing a Dexter modal popup for browser extension detection */
export class BrowserExtensionModal extends Section {

  /**
   * @type {object}
   * @description Acrobat extension modal overlay 
   */  
  get acrobatExtensionPopup() {
    return $('.dexter-Modal#acrobatBrowserExtension, .dexter-Modal#frictionlessBrowserExtension');
  }

  /**
   * @type {object}
   * @description Extension modal CTA 
   */    
  get extensionButton() {
    return $('[href*="https://chrome.google.com/webstore"]');
  }

  /**
   * @type {object}
   * @description Close button for Acrobat extension popup modal 
   */    
  get closeAcrobatExtensionModal() {
    return $('[data-remember-close-name="modal_acrobatBrowserExtension"], [data-remember-close-name="modal_frictionlessBrowserExtension"]');
  }
}
