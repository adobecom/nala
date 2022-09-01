/** @module dc/steps */
const {Given} = require('@cucumber/cucumber');
const {Then} = require('@cucumber/cucumber');
const {When} = require('@cucumber/cucumber');

import { GoogleSignInPage } from '../pages/google_signin_page';
import { AppleSignInPage } from '../pages/apple_signin_page';
import { AdobeSignInPage } from '../pages/adobe_signin_page';

When(/^I sign in as "([^\"]*)" team admin$/, iSignInAsProductTeamAdmin);

When(/^I sign in as a(?:|n) (.*) user$/, iSignInAsAproductUser);

When(/^I sign in as a(?:|n) "([^\"]*)" user from login page$/, iSignInAsAproductUserFromLoginPage);

When(/^I sign in as a(?:|n) "([^\"]*)" user from Google login page$/, iSignInAsAproductUserFromGoogleLoginPage);

Then(/^I click the checkbox for the Updated Terms of Use window if present$/, iClickTheCheckboxForTheUpdatedTermsOfUseWindowIfPresent);

When(/^I sign in as a(?:|n) "([^\"]*)" user from Apple login page$/, iSignInAsAproductUserFromAppleLoginPage);

Then(/^I click Sign In on global navigation if it exists$/, iClickSignInOnGlobalNavigationIfItExists);

Then(/^I sign in Adobe ID$/, iSignInAdobeId);

Then(/^I should see Adobe Sign In page$/, iShouldSeeAdobeSignInPage);

Then(/^I should see Google Sign In page$/, iShouldSeeGoogleSignInPage);

Then(/^I should see Apple Sign In page$/, iShouldSeeAppleSignInPage);

When(/^I click (Facebook|Google|Apple) sign-in button from login page$/, iClickSocialsigninSigninButtonFromLoginPage);

Then(/^I skip two step verification pop-up if present$/, iSkipTwoStepVerificationPopupIfPresent);

Then(/^I sign out if a user is signing in$/, iSignOutIfAUserIsSigningIn);  

/**
 * Step Definition:
 * ```
 * /^I sign in as "([^\"]*)" team admin$/
 * ```
 * @param {string} product Product name
 */
function iSignInAsProductTeamAdmin(product) {
  this.step(`I sign in as a ${ product } user`);
}

/**
 * Step Definition:
 * ```
 * /^I sign in as a(?:|n) (.*) user$/
 * ```
 * @param {string} product Product name
 */
function iSignInAsAproductUser(product) {
  this.step('I click sign in');
  this.step(`I sign in Adobe Account as "${ product }"`);
}

/**
 * Step Definition:
 * ```
 * /^I sign in as a(?:|n) "([^\"]*)" user from login page$/
 * ```
 * @param {string} product Product name
 */
function iSignInAsAproductUserFromLoginPage(product) {
  this.step(`I sign in Adobe Account as "${ product }"`);
}

/**
 * Step Definition:
 * ```
 * /^I sign in as a(?:|n) "([^\"]*)" user from Google login page$/
 * ```
 * @param {string} product Product name
 */
function iSignInAsAproductUserFromGoogleLoginPage(product) {
  this.page = new GoogleSignInPage();
  if (!(product in browser.config.adobeAccounts)) {
    throw `The account '${ product }' is not in adobe_accounts.yml`;
  }
  let user = browser.config.adobeAccounts[product];
  this.page.login(user.username, user.password);
}

/**
 * Step Definition:
 * ```
 * /^I click the checkbox for the Updated Terms of Use window if present$/
 * ```
 */
function iClickTheCheckboxForTheUpdatedTermsOfUseWindowIfPresent() {
}

/**
 * Step Definition:
 * ```
 * /^I sign in as a(?:|n) "([^\"]*)" user from Apple login page$/
 * ```
 * @param {string} product Product name
 */
function iSignInAsAproductUserFromAppleLoginPage(product) {
  this.page = new AppleSignInPage();
  if (!(product in browser.config.adobeAccounts)) {
    throw `The account '${ product }' is not in adobe_accounts.yml`;
  }
  let user = browser.config.adobeAccounts[product];
  this.page.login(user.username, user.password);
}

/**
 * Step Definition:
 * ```
 * /^I click Sign In on global navigation if it exists$/
 * ```
 */
function iClickSignInOnGlobalNavigationIfItExists() {
}

/**
 * Step Definition:
 * ```
 * /^I sign in Adobe ID$/
 * ```
 */
function iSignInAdobeId() {
}

/**
 * Step Definition:
 * ```
 * /^I should see Adobe Sign In page$/
 * ```
 */
function iShouldSeeAdobeSignInPage() {
  this.context(AdobeSignInPage);
  if (this.page.susiLoginForm.isExisting()) {
    console.info('[FEDsInfo] Found SUSI Login form.');
  } else if (this.page.appLoginForm.isExisting()) {
    console.info('[FEDsInfo] Found APP Login form.');
  }
  // Wait for the email form to be displayed:
  this.page.appEmailForm.waitForDisplayed();
}

/**
 * Step Definition:
 * ```
 * /^I should see Google Sign In page$/
 * ```
 */
function iShouldSeeGoogleSignInPage() {
}

/**
 * Step Definition:
 * ```
 * /^I should see Apple Sign In page$/
 * ```
 */
function iShouldSeeAppleSignInPage() {
}

/**
 * Step Definition:
 * ```
 * /^I click (Facebook|Google|Apple) sign-in button from login page$/
 * ```
 * @param {string} socialSignIn Type of social log-in button
 */
function iClickSocialsigninSigninButtonFromLoginPage(socialSignIn) {
  this.page = new AdobeSignInPage();
  switch (socialSignIn) {
  case 'Facebook':
    this.page.facebookSignIn.click();
    break;
  case 'Google':
    this.page.googleSignIn.click();
    break;
  case 'Apple':
    this.page.appleSignIn.click();
    break;
  }
}

/**
 * Step Definition:
 * ```
 * /^I skip two step verification pop-up if present$/
 * ```
 */
function iSkipTwoStepVerificationPopupIfPresent() {
}

/**
 * Step Definition:
 * ```
 * /^I sign out if a user is signing in$/
 * ```
 */
function iSignOutIfAUserIsSigningIn() {
  if (this.page.profileIcon) {
    this.step('I close the geo overlay if present');
    this.page.profileIcon.click();
    this.page.signOutButton.click();
  }
}