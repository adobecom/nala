/** @module common/steps */
const {Given} = require('@cucumber/cucumber');
const {When} = require('@cucumber/cucumber');
const {Then} = require('@cucumber/cucumber');

Then(/^I should see a chat icon$/, iShouldSeeAChatIcon);

Then(/^I should not see a chat icon$/, iShouldNotSeeAChatIcon);

When(/^I click the chat button$/, iClickTheChatButton);

Then(/^I should see jarvis popup window$/, iShouldSeeJarvisPopupWindow);

When(/^I click "([^\"]*)" in jarvis popup window$/, iClickTextInJarvisPopupWindow);

Then(/^I redirct to login page or chat close$/, iRedirctToLoginPageOrChatClose);

Then(/^I should see "([^\"]*)" in jarvis popup window$/, iShouldSeeTextInJarvisPopupWindow);

When(/^I click on element "([^\"]*)" in jarvis popup window$/, iClickElementInJarvisPopupWindow);

/**
 * Step Definition:
 * ```
 * /^I should see a chat icon$/
 * ```
 */
function iShouldSeeAChatIcon() {
  expect(this.page.jarvisButton).toBeDisplayed();
}

/**
 * Step Definition:
 * ```
 * /^I should not see a chat icon$/
 * ```
 */
function iShouldNotSeeAChatIcon() {
  expect(this.page.jarvisButton).not.toBeDisplayed();
}

/**
 * Step Definition:
 * ```
 * /^I click the chat button$/
 * ```
 */
function iClickTheChatButton() {
  //browser.pause(5000);
  this.page.click('jarvisButton');
}

/**
 * Step Definition:
 * ```
 * /^I should see jarvis popup window$/
 * ```
 */
function iShouldSeeJarvisPopupWindow() {
  this.page.jarvisPopup.waitForDisplayed({timeout: 30000})
  expect(this.page.jarvisPopup).toBeDisplayed();
}

/**
 * Step Definition:
 * ```
 * /^I click "([^\"]*)" in jarvis popup window$/
 * ```
 * @param {string} text Text to be clicked
 */
function iClickTextInJarvisPopupWindow(text) {
  browser.pause(5000);
  browser.switchToFrame(this.page.javisIframe);
  this.page.click('getStartedButton');
}

/**
 * Step Definition:
 * ```
 * /^I click on element "([^\"]*)" in jarvis popup window$/
 * ```
 * @param {string} selector element to be clicked
 */
 function iClickElementInJarvisPopupWindow(selector) {
  browser.pause(5000);
  browser.switchToFrame(this.page.javisIframe);
  $(selector).click();
}

/**
 * Step Definition:
 * ```
 * /^I redirct to login page or chat close$/
 * ```
 */
function iRedirctToLoginPageOrChatClose() {
  this.step('I should see "login" in current url');
}

/**
 * Step Definition:
 * ```
 * /^I should see "([^\"]*)" in jarvis popup window$/
 * ```
 * @param {string} text Text to be verified for existence
 */
function iShouldSeeTextInJarvisPopupWindow(text) {
  browser.pause(5000);
  console.log(this.page.jarvisButton.getCSSProperty('display'));
  if (this.page.jarvisButton.getCSSProperty('display').value == 'block') {
    this.page.click('jarvisButton');
  }
  browser.switchToFrame(this.page.javisIframe);
  this.step(`I should see "${ text }"`);
}