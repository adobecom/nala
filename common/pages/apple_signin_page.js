import { Page } from '../../common/pages/page';

/** Page class for apple sign in page*/
export class AppleSignInPage extends Page {
  //set_url_matcher /(.*).appleid.apple.com\/auth\/authorize/

  /**
   * @type {object}
   * @description Get the input field for email from apple login page
   */
  get emailField() {
    return $('input[id="account_name_text_field"]');
  }

  /**
   * @type {object}
   * @description Get the input field for password from apple login page
   */
  get passwordField() {
    return $('input[id="password_text_field"]');
  }

  /**
   * @type {object}
   * @description Get the sign in button from apple login page
   */
  get signInButton() {
    return $('#sign-in');
  }

  /**
   * Login from apple login page
   * @param {string} email
   * @param {string} password
   */
  login(email, password) {
    this.emailField.waitForEnabled(60000);
    this.emailField.setValue(email);
    this.signInButton.click();
    browser.pause(3000);
    this.passwordField.setValue(password);
    this.signInButton.click();
  }
}
