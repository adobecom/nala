import { Section } from './section';

/** Class representing a region overlay popup when geo IP doesn't match page locale */
export class LocaleModal extends Section {
  /**
   * @type {string}
   * @description Buttons on the popup 
   */    
  get localeModalButtons() {
    return $$('#localeModal .locale-modal_button');
  }

  /**
   * @type {object}
   * @description Continue with the current locale and don't redirect 
   */    
  get localeModalDefault() {
    return $('#localeModal .locale-modal_button[href="/index.html"],.modal-frame .current-lang,.locale-modal a.current-lang');
  }

  /**
   * @type {object}
   * @description Close button 
   */     
  get localeModalClose() {
    return $('#localeModal .dexter-CloseButton,.modal-frame .close');
  }
}