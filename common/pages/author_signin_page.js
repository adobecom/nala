import { AuthorPage } from './author_page';

/** Class representing a sign in page on AEM author */
export class AuthorSignInPage extends AuthorPage {
  /**
   * @type {string}
   * @description Sign in page on author instance
   */
  get urlPath() {
    return '/libs/granite/core/content/login.html';
  }

  /**
   * @type {object}
   * @description Username input field
   */
  get username() {
    return $('#username');
  }

  /**
   * @type {object}
   * @description Password input field
   */
  get password() {
    return $('#password');
  }

  /**
   * @type {object}
   * @description Submit button
   */
  get submit() {
    return $('#submit-button');
  }

  /**
   * @type {object}
   * @description Local sign in dropdown
   */
   get localSignIn() {
    return $('.coral3-Accordion-item');
  }

  /**
   * Sign in as a user.
   * Wait until URL is redirected to '/aem/start' or '/libs/cq/core/content/welcome.html'
   * @param {object} creds
   * @param {string} creds.username
   * @param {string} creds.password
   */
  signIn(creds) {
    if (this.localSignIn.isExisting()) {
      this.localSignIn.click()
    }
    this.username.setValue(creds.username);
    this.password.setValue(creds.password);
    this.submit.click();
    browser.waitUntil(
      () => {
        let url = browser.getUrl();
        return [
          '/aem/start',
          '/libs/cq/core/content/welcome.html',
          'sites.html'
        ].some(x => url.includes(x));
      },
      10000,
      'Sign-in failed',
      1000
    );
  }
}
