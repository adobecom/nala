/** @module common/steps */
const { Given } = require('@cucumber/cucumber');
const { When } = require('@cucumber/cucumber');
const { Then } = require('@cucumber/cucumber');
import { GnavPage } from '../pages/gnav_page';

let currentPage = null;

import {
  tabLocator,
  dropdownLocator,
  tabLinkstoOtherPages,
  radioButtonLocator,
  handlePageWithTabWithDropdown,
  handlePageWithTabWithRadioButtons,
  handlePageWithTabNoDropdown,
  handlePageNoTabWithDropdown,
  handlePageNoTabWithRadioButtons,
  handlePageNoTabNoDropdown
} from '../tools/pricing/check_prices';

Then(
  /^I click all buy buttons and check the price(| ignoring the tabs)$/,
  iClickAllBuyButtonsAndCheckThePrice
);

Then(
  /^I click the buy buttons in the first (\d+) plans and check the price$/,
  iClickSomeBuyButtonsAndCheckThePrice
);

Then(
    /^I should see discount percentage$/,
    iSeeDiscountPercentage
);

/**
 * Step Definition:
 * ```
 * /^I click all buy buttons and check the price$/
 * ```
* @param {string} ignoreTab option given to ignore the tabs in the page
 */
 export function iClickAllBuyButtonsAndCheckThePrice(ignoreTab) {
  currentPage = this.page;
  let hasTab = browser.$(tabLocator).isExisting();
  let hasDropdown = browser.$(dropdownLocator).isDisplayed();
  let hasRadioButtons = browser.$(radioButtonLocator).isDisplayed();
  let hasTabsToOtherPages = browser.$(tabLinkstoOtherPages).isDisplayed();

  if (hasTab && !ignoreTab && !hasTabsToOtherPages) {
    if (hasDropdown) {
      console.log('with tab, with dropdown');
      handlePageWithTabWithDropdown();
    } else if (hasRadioButtons) {
      console.log('with tab, with radio buttons');
      handlePageWithTabWithRadioButtons();
    } else {
      console.log('with tab, no dropdown');
      handlePageWithTabNoDropdown();
    }
  } else if (hasDropdown) {
    console.log('no tab, with dropdown');
    handlePageNoTabNoDropdown(); // Also check CTAs outside the dropdown container
    handlePageNoTabWithDropdown();
  } else if (hasRadioButtons) {
    console.log('no tab, with radio buttons');
    handlePageNoTabWithRadioButtons();
  } else {
    console.log('no tab, no dropdown');
    handlePageNoTabNoDropdown();
  }
}

/**
 * Step Definition:
 * ```
 * /^I click the buy buttons in the first (\d+) plans and check the price$/
 * ```
* @param {string} count Number of plans to check
 */
export function iClickSomeBuyButtonsAndCheckThePrice(count) {
  currentPage = this.page;
  let hasTab = browser.$(tabLocator).isExisting();
  let hasDropdown = browser.$(dropdownLocator).isDisplayed();
  let hasRadioButtons = browser.$(radioButtonLocator).isDisplayed();
  let hasTabsToOtherPages = browser.$(tabLinkstoOtherPages).isDisplayed();

  if (hasRadioButtons) {
    console.log('no tab, with radio buttons');
    handlePageNoTabWithRadioButtons({ count: count });
  } else {
    console.log('no tab, no dropdown');
    handlePageNoTabNoDropdown({ count: count });
  }
}

function getPrice(country) {
    let priceNumber = {
        jp: '65',
        tw: '40'
    }[country.toLowerCase()];
    return priceNumber;
}

export function iSeeDiscountPercentage(){
    let element = $$(`//div[contains(@daa-lh, 'top|pdfpack')]//b//span`)[0]
    element.scrollIntoView({block: "center"});

    let expectedPrice;
    expectedPrice = getPrice(browser.config.profile.akamaiLocale || this.page.urlQuery.akamaiLocale);

    expect(element).toHaveText(expectedPrice);
}