import { Page } from '../../common/pages/page';
/** Page class for apple sign in page*/
export class GoogleSignInPage extends Page {
  //set_url_matcher /(.*).accounts.google.com\/signin/

  /**
   * @type {object}
   * @description Get the input field for email from google login page
   */
  get emailField() {
    return $('input[type="email"]');
  }
  /**
   * @type {object}
   * @description Get the input field for password from google login page
   */
  get passwordField() {
    return $('input[type="password"]');
  }
  /**
   * @type {object}
   * @description Not used currently in any test case(scenario)
   */
  get emailNext() {
    return $('#identifierNext');
  }
  /**
   * @type {object}
   * @description Not used currently in any test case(scenario)
   */
  get passwordNext() {
    return $('#passwordNext');
  }

  /**
   * Login from apple login page
   * @param {string} email
   * @param {string} password
   */
  login(email, password) {
    this.emailField.waitForEnabled(60000);
    this.emailField.setValue(email);
    this.emailNext.click();
    browser.pause(10000);
    this.passwordField.waitForEnabled(60000);
    this.passwordField.setValue(password);
    this.passwordNext.click();
  }
}
