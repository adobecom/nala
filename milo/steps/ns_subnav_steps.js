const { Given } = require('cucumber');
const { Then } = require('cucumber');
const { When } = require('cucumber');
import { NSHomePage } from '../pages/ns_home_page';
const { requestGet } = require('../../common/support/functions/request_sync');

Given(/^I go to NS Experience Cloud home page$/, iGoToECPage);

Given(/^I go to EC "([^"]*)"$/, iGoToECPath);

Then(/^I should see "([^\"]*)" in a current url$/, iShouldSeeUrlInCurrentUrl);

Then(
  /^I open "(.*)" dropdown link and select "(.*)" option$/,
  iOpenDropdownOption
);

Then(
  /^I should see the breadcrumb on global footer$/,
  iShouldSeeTheBreadcrumbOnFooter
);

Then(
  /^I should navigate to links inside breadcrumb without errors$/,
  iShouldNavigateToLinksInsideBreadcrumbWithoutErrors
);

When(/^I click on text "(.*)"$/, iClickButton);

Then(
  /^I should (not |)see the OneTrust consent banner in a modal window$/,
  iShouldNegseeTheOnetrustConsentBanner
);

When(
  /^I click the subnav button in the header$/,
  iClickTheSubnavButtonInTheHeader
);

/**
 * Step Definition:
 * ```
 * /^I go to NS Experience Cloud home page$/
 * ```
 */
function iGoToECPage() {
  this.page = new NSHomePage();
  this.page.open();
}
/**
 * Step Definition:
 * ```
 * /^I go to EC "([^"]*)"$/
 * ```
 * @param {string} path URL
 */
function iGoToECPath(path) {
  this.page = new NSHomePage();
  this.page.open(path);
  console.log(browser.getUrl());
}

/**
 * Step Definition:
 * ```
 * /^I should see "([^\"]*)" in a current url$/
 * ```
 * @param {string} url Text to see in the current url
 */
function iShouldSeeUrlInCurrentUrl(url) {
  expect(browser).toHaveUrl(url, {
    containing: true,
    wait: 10000,
    interval: 1000
  });
}

/**
 * Step Definition:
 * ```
 * /^I open "(.*)" dropdown link and select "(.*)" option$/
 * ```
 * @param {string} element1 Subnav link text
 * @param {string} element2 Text of the option in the subnav link dropdown
 */
function iOpenDropdownOption(element1, element2) {
  if (browser.capabilities.browserName === 'Safari') {
    browser.execute('arguments[0].click();', this.page.dropdown(element1));
    browser.execute('arguments[0].click();', this.page.option(element2));
  } else {
    this.page.dropdown(element1).click();
    this.page.option(element2).click();
  }
}
/**
 * Step Definition:
 * ```
/^I should see the breadcrumb on global footer$/
 * ```
 */
function iShouldSeeTheBreadcrumbOnFooter() {
  this.page.waitForDisplayed('breadcrumbIcon', 10000);
}
/**
 * Step Definition:
 * ```
 * /^I should navigate to links inside breadcrumb without errors$/
 * ```
 */
function iShouldNavigateToLinksInsideBreadcrumbWithoutErrors() {
  this.page.waitForDisplayed('breadcrumbItems');
  const items = this.page.breadcrumbItems;
  const urls = items.map(link => link.getAttribute('href'));
  urls.forEach(function (url) {
    const response = requestGet(url);
    expect(response.status).toBe(200);
  });
}
/**
 * Step Definition:
 * ```
 * /^I click on text "(.*)"$/
 * ```
 * @param {string} nameButton Link text
 */
function iClickButton(nameButton) {
  if (browser.capabilities.browserName === 'Safari') {
    browser.execute('arguments[0].click();', this.page.button(nameButton));
  } else {
    this.page.button(nameButton).click();
  }
}
/**
 * Step Definition:
 * ```
 * /^I should (not |)see the OneTrust consent banner in a modal window$/
 * ```
 * @param {string} neg Negative verification
 */
function iShouldNegseeTheOnetrustConsentBanner(neg) {
  this.context(NSHomePage);
  if (neg === 'not ') {
    browser.pause(3000);
    this.page.waitForInvisible('');
  } else {
    browser.pause(5000);
    this.page.waitForDisplayed('banner');
  }
}
/**
 * Step Definition:
 * ```
 * /^I click the subnav button in the header$/
 * ```
 */
function iClickTheSubnavButtonInTheHeader() {
  if (browser.capabilities.browserName === 'Safari') {
    browser.execute('arguments[0].click();', this.page.subNavButton);
  } else {
    this.page.subNavButton.click();
  }
}
