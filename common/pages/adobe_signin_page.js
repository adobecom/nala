import { Page } from './page';

/** Class representing Adobe account sign in page */
export class AdobeSignInPage extends Page {
  /**
   * @type {object}
   * @description Username field in the sign in page
   */ 
  get emailField() {
    return $('#EmailPage-EmailField');
  }
  /**
   * @type {object}
   * @description Continue button after filling username/email field
   */   
  get emailContinue() {
    return $('.EmailPage__submit button');
  }
  /**
   * @type {object}
   * @description Password field in the sign in page
   */   
  get passwordField() {
    return $('#PasswordPage-PasswordField');
  }
  /**
   * @type {object}
   * @description Continue button after filling password field
   */   
  get passwordContinue() {
    return $('.PasswordPage__action-buttons-wrapper button');
  }
  /**
   * @type {object}
   * @description Get the account email id
   */   
  get accountProfileEmail() {
    return $('.account-profile-email');
  }
  /**
   * @type {object}
   * @description Button for using Facebook sign-in
   */ 
  get fackbookSignIn() {
    return $('.SocialButton--facebook');
  }
  /**
   * @type {object}
   * @description Button for using Google sign-in
   */ 
  get googleSignIn() {
    return $('.SocialButton--google');
  }
  /**
   * @type {object}
   * @description Button for using Apple sign-in
   */ 
  get appleSignIn() {
    return $('.SocialButton--apple');
  }
  /**
   * @type {object}
   * @description Button for passwordless opt-in 
   */   
  get passwordlessOptInButton() {
    return $('[data-id="PasswordlessOptInPP-continue-button"]');
  }
  /**
   * @type {object}
   * @description Button for accepting terms-of-use
   */ 
  get acceptUpdatedTerms() {
    return $('[data-id="PP-TermsOfUse-ContinueBtn"]');
  }

  /**
   * @type {object}
   * @description Link to open Adobe sign up page
   */
  get createAccount() {
    return $('.EmailPage__create-account-link');
  }

  /**
   * @type {object}
   * @description Adobe APP Email form
   */
  get appEmailForm() {
    return $('form#EmailForm');
  }

  /**
   * @type {object}
   * @description Adobe APP Login form
   */
  get appLoginForm() {
    return $('#App');
  }

  /**
   * @type {object}
   * @description Adobe SUSI Login form
   */
  get susiLoginForm() {
    return $('#adobesusi');
  }

  /**
   * Load the page
   */
  open() {
    super.open('/');
  }

  /**
   * Wait until the page to be loaded. Timeout in 60 seconds.
   */
  wait() {
    this.emailField.waitForDisplayed(60000);
  }

  /**
   * Do logging in action
   * @param {string} email username or email
   * @param {string} password password for the account
   */
  login(email, password) {
    this.emailField.waitForEnabled(30000);
    browser.actionAndWait(
      () => {
        this.emailField.clearValue();
        this.emailField.addValue(email);
        this.emailContinue.click();
      },
      () => {
        this.waitForDisplayed('passwordField', 10000);
      }
    );
    browser.actionAndWait(
      () => {
        this.passwordField.setValue(password);
        //this.passwordContinue.click();
        browser.execute('arguments[0].click()', this.passwordContinue);
      },
      () => {
        this.passwordContinue.waitForExist({ timeout: 20000, reverse: true });
      }
    );
  }
}
