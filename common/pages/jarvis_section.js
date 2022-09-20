import { Section } from './section';

/** Class representing a Jarvis popup */
export class Jarvis extends Section {
  /**
   * @type {object}
   * @description Sticky Jarvis button in the page 
   */   
  get jarvisButton() {
    return $('#adbmsgCta');
  }

  /**
   * @type {object}
   * @description Jarvis popup window 
   */  
  get jarvisPopup() {
    return $('.adbmsgContentIframe');
  }

  /**
   * @type {object}
   * @description Jarvis popup window 
   */    
  get getStartedButton() {
    return $('.spectrum-Button.spectrum-Button--overBackground._18uCwSD1OFY2BIPOtf6Ryr');
  }

  /**
   * @type {object}
   * @description Jarvis popup window 
   */    
  get javisIframe() {
    return $('.adbmsgContentIframe');
  }
}
