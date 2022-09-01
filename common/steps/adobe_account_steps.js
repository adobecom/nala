/** @module common/steps */
const { Given } = require('@cucumber/cucumber');
const { When } = require('@cucumber/cucumber');
const { Then } = require('@cucumber/cucumber');
import { AdobeAccountHomePage } from '../pages/adobe_account_home_page';
import { AdobeSignInPage } from '../pages/adobe_signin_page';
import { AdobeSignUpPage } from '../pages/adobe_signup_page';
import { getRandomInt } from '../support/functions/random';

Given(/^I go to Adobe Account$/, iGoToAdobeAccount);

When(/^I sign in Adobe Account as "([^"]*)?"$/, iSignInAdobeAccountAsAccount);

When(/^I should see Adobe Account home page$/, iShouldSeeAdobeAccountHomePage);

Then(
  /^I sign up a new account from login page/,
  signUpANewAccountFromLoginPage
);

Then(/^I sign into my Adobe account$/, signIntoMyAdobeAccount);

When(
  /^I sign in Adobe Account as "([^"]*)?" from author$/,
  iSignInAdobeAccountAsAccountFromAuthor
);

/**
 * Step Definition:
 * ```
 * /^I go to Adobe Account$/
 * ```
 */
function iGoToAdobeAccount() {
  this.page = new AdobeAccountHomePage();
  this.page.open();
  // Redirect to sign in page
  this.page = new AdobeSignInPage();
}

/**
 * Account password will be retrieved from adobe_accounts.yml
 * Step Definition:
 * ```
 * /^I sign in Adobe Account as "([^"]*)?"$/
 * ```
 * @param {string} account Username of the account
 */
function iSignInAdobeAccountAsAccount(account) {
  if (!(account in browser.config.adobeAccounts)) {
    throw `The account '${account}' is not in adobe_accounts.yml`;
  }
  let user = browser.config.adobeAccounts[account];
  this.context(AdobeSignInPage);
  this.page.login(user.username, user.password);

  if (this.page.acceptUpdatedTerms.isDisplayed()) {
    this.page.acceptUpdatedTerms.click();
  }
}

/**
 * Step Definition:
 * ```
 * /^I should see Adobe Account home page$/
 * ```
 */
function iShouldSeeAdobeAccountHomePage() {
  this.page = new AdobeAccountHomePage();
  this.page.wait();
}

/**
 * Step Definition:
 * ```
 * /^I sign up a new account from login page$/
 * ```
 */
function signUpANewAccountFromLoginPage() {
  this.context(AdobeSignInPage);
  this.page.createAccount.click();
  this.context(AdobeSignUpPage);

  let user = {
    email: `xmtech+${getRandomInt(10000000, 99999999)}@adobetest.com`,
    password: 'Adobe_P@ssw0rd',
    firstName: 'Auto',
    lastName: 'Xmtech',
    birthMonth: '1',
    birthDay: '1',
    birthYear: '1980'
  };
  this.page.fillIn(user);

  // Check emails first. After submit, check new mails only.
  this.step('I check my email box "Adobe Account"');

  this.page.submit();

  this.step('I wait for verification code in email');

  this.page.inputVerificationCode(this.verificationCode);
}

/**
 * Step Definition:
 * ```
 * /^I sign into my Adobe account$/
 * ```
 */
function signIntoMyAdobeAccount() {
  this.step('I click sign in');
  this.step('I sign in Adobe Account as "Free"');
}

/**
 * Account password will be retrieved from authors.yml
 * Step Definition:
 * ```
 * /^I sign in Adobe Account as "([^"]*)?" from author$/
 * ```
 * @param {string} account Username of the account
 */
function iSignInAdobeAccountAsAccountFromAuthor(account) {
  if (!(account in browser.config.aemAccounts)) {
    throw `The account '${account}' is not in authors.yml`;
  }
  let user = browser.config.aemAccounts[account];
  this.context(AdobeSignInPage);
  this.page.login(user.username, user.password);

  if (this.page.acceptUpdatedTerms.isDisplayed()) {
    this.page.acceptUpdatedTerms.click();
  }
}
