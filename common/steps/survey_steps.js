/** @module common/steps */
const {Given} = require('@cucumber/cucumber');
const {When} = require('@cucumber/cucumber');
const {Then} = require('@cucumber/cucumber');

import { GnavPage } from '../../common/pages/gnav_page';

Then(/^I dismiss the Qualtrics survey pop-up$/, dismissQualtricsSurvey);

/** Step Definition:
 * ```
 * /^I dismiss the Qualtrics survey pop-up$/
 * ```
 */
export function dismissQualtricsSurvey() {
  this.context(GnavPage);
  
  if (browser.config.profile.env === 'stage') {
    // Need to interact with the page to see the survey pop-up
    if (this.page.searchIcon.isDisplayed()) {
      this.page.searchIcon.click();
      this.step('I close the search field on global header');
    } else {
      $('body').click();
    }
  }

  if (this.page.surveyPopup.isDisplayed()) {
    browser.switchToFrame(this.page.surveyPopup);
    this.page.choiceNo.click();
    browser.switchToParentFrame();
    this.page.waitForDisplayed('closeSurvey');
    this.page.closeSurvey.click();
  }
  this.step('I scroll the page to the top');
}
