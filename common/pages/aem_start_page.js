import { Page } from './page';

/** Page class for AEM start page*/
export class AemStartPage extends Page {
  constructor() {
    super();
    this.buildProps({
      urlPath: 'aem/start',
      
      homeCards: '$$.globalnav-homecard-title'
    })
  }

  goTo(homCard) {
    for (let elem of this.homeCards) {
      if (elem.text == homeCard) {
        elem.click();
      }
    }
  }
}