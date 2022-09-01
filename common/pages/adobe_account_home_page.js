import { Page } from './page';

/** Class representing Adobe account sign in page */
export class AdobeAccountHomePage extends Page {
  /**
   * @type {object}
   * @description Username field in the sign in page
   */   
  get accountProfileEmail() {
    return $('.account-profile-email');
  }

  /**
   * @type {string}
   * @description Root path '/'
   */   
  get urlPath() {
    return '/';
  }

  /**
   * Wait for the page to be loaded
   */
  wait() {
    this.accountProfileEmail.waitForDisplayed(60000);
  }
}
