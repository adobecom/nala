/** @module common/steps */
const {Given} = require('@cucumber/cucumber');
const {When} = require('@cucumber/cucumber');
const {Then} = require('@cucumber/cucumber');
const fs = require('fs');
const path = require('path');
const { remote } = require('webdriverio');

Then(/^I should (|not )see a modal promoting the browser extension$/, iCheckBrowserExtensionModal);

Then(/^I click the extension modal button$/, iClickTheExtensionModalCTA);

Then(/^I close the extension modal$/, iCloseTheExtensionModal);

/**
 * Step Definition:
 * ```
 * /^I should (|not )see a modal promoting the "([^"]*)"$/
 * ```
 * @param {string} neg "" for positive or "not " for negative
 */
 function iCheckBrowserExtensionModal(neg) {
   // If the extension is already installed
   if (browser.config.profile.extensionPath && neg) {
     let handles = browser.getWindowHandles();
     if (handles.length > 1) {
       browser.switchToWindow(handles[handles.length - 1]);
       browser.closeWindow();
       browser.switchToWindow(handles[0]);
     }
     this.step('I close the geo overlay if present');
     expect(this.page.acrobatExtensionPopup.isDisplayed()).toBe(false);
   } else if (this.isModalDismissed) {
     expect(this.page.acrobatExtensionPopup.isDisplayed()).toBe(false);
   } else {
     this.step('I close the geo overlay if present');
     expect(this.page.acrobatExtensionPopup.isDisplayed()).toBe(true);
   }
 }

/**
 * Step Definition:
 * ```
 * /^I should confirm that a "([^"]*)" is not already installed$/
 * ```
 */
 function iClickTheExtensionModalCTA() {
   this.page.extensionButton.click();

   let handles = browser.getWindowHandles();
   browser.switchToWindow(handles[handles.length - 1]);
 }

 /**
 * Step Definition:
 * ```
 * /^I close the extension modal$/
 * ```
 */
  function iCloseTheExtensionModal() {
    this.page.closeAcrobatExtensionModal.click();
    this.isModalDismissed = true;
  }