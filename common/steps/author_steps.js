/** @module dc/steps */
const { Given } = require('@cucumber/cucumber');
const { Then } = require('@cucumber/cucumber');
const { When } = require('@cucumber/cucumber');

import { AuthorSignInPage } from '../pages/author_signin_page';

Given(/^I sign in as a(?:n) (author|admin)$/, signInAsRole);

/**
 * For author instance, sign in as an author or admin
 * Step Definition:
 * ```
 * /^I sign in as a(?:n) (author|admin)$/
 * ```
 * @param {string} user author or admin
 */
function signInAsRole(role) {
  let creds = browser.config.aemAccounts[role];

  let page = new AuthorSignInPage();
  page.open();
  page.signIn(creds);
}
