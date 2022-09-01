/** @module common/steps */
const {Given} = require('@cucumber/cucumber');
const {When} = require('@cucumber/cucumber');
const {Then} = require('@cucumber/cucumber');
import { GnavPage } from '../pages/gnav_page';
import geomock from '../support/functions/geomock';
import localize from '../support/functions/localize';

var categoryMap = {
  'Services': 'C0001',
  'Performance': 'C0002',
  'Functionality': 'C0003',
  'Advertising': 'C0004'
};

Given(/^I am in the country "([^\"]*)"$/, iAmInTheCountryGeo);

Given(/^I am in the country from locale$/, iAmInTheCountryFromLocale);

Given(/^I clear cookies$/, iClearCookies);

Given(/^I clear Operate cookies$/, iClearOperateCookies);

Given(/^I clear Performance cookies$/, iClearPerformanceCookies);

Given(/^I clear Functionality cookies$/, iClearFunctionalityCookies);

Given(/^I clear Advertising cookies$/, iClearAdvertisingCookies);

Given(/^I clear testing cookies$/, iClearTestingCookies);

Then(/^I click the accept button on OneTrust consent banner$/, iClickTheAcceptButtonOnOnetrustConsentBanner);

Then(/^I should (not |)see the OneTrust consent banner$/, iShouldNegseeTheOnetrustConsentBanner);

Then(/^I click the Personalize button on OneTrust consent banner$/, iClickThePersonalizeButtonOnOnetrustConsentBanner);

Then(/^I click Personalize on footer$/, iClickPersonalizeOnFooter);

Then(/^I click Cookie preferences$/, iClickCookiePreferencesOnFooter);

Then(/^I close toast message$/, iCloseToastMessage);

Then(/^I click AdChoices on footer$/, iClickAdchoicesOnFooter);

Then(/^I should see close button$/, iShouldSeeCloseButton);

When(/^I click close button$/, iClickCloseButton);

Then(/^I should see the banner in (light|dark) themes$/, iShouldSeeTheBannerInColorThemes);

Then(/^I verify some cookies have (|not )been dropped:$/, iVerifySomeCookiesHaveNegbeenDropped);

Then(/^I print out all cookies$/, iPrintOutAllCookies);

Then(/^I print out all new added cookies$/, iPrintOutAllNewAddedCookies);

Then(/^I print out active groups$/, iPrintOutActiveGroups);

Then(/^I navigate to (iPad Features|What’s New|Behance) page$/, iNavigateToTitlePage);

Then(/^I should see "([^\"]*)"$/, iShouldSeeText);

Then(/^I should see "([^\"]*)" in page source$/, iShouldSeeTextInPageSource);

Then(/^I should(| not) see "([^\"]*)" within viewport$/, iShouldSeeTextWithinViewport);

When(/^I switch to tablet view$/, iSwitchToTabletView);

When(/^I switch to mobile view$/, iSwitchToMobileView);

Then(/^I should not see "([^\"]*)"$/, iShouldNotSeeText);

Then(/^I enable (Performance|Functionality|Advertising) cookies$/, iEnableTitleCookies);

Then(/^I disable (Performance|Functionality|Advertising) cookies$/, iDisableTitleCookies);

Then(/^I enable all cookies$/, iEnableAllCookies);

Then(/^I enable all cookies without personalization if present$/, iEnableAllCookiesWithoutPersonalization);

Then(/^I disable all cookies$/, iDisableAllCookies);

Then(/^I scroll the cookie setting to the top$/, iScrollTheCookieSettingToTheTop);

Then(/^I scroll the cookie setting to the bottom$/, iScrollTheCookieSettingToTheBottom);

Then(/^I click Cookie Details link under (Services|Performance|Functionality|Advertising)$/, iClickCookieDetailsUnderTitle);

Then(/^I click View cookies under first host$/, iClickViewCookiesUnderFirstHost);

Then(/^I close the OneTrust consent banner if present$/, iCloseTheOnetrustConsentBanner);

Then(/^I check the Cookie Details view$/, iCheckCookieDetailsView);

/**
 * Step Definition:
 * ```
 * /^I am in the country "([^\"]*)"$/
 * ```
 * @param {string} geo GEO location
 */
function iAmInTheCountryGeo(geo) {
  geomock(geo);
  console.log('mock ' + geo);
}

/**
 * Step Definition:
 * ```
 * /^I am in the country from locale$/
 * ```
 */
function iAmInTheCountryFromLocale() {
  if (browser.config.profile.locale === 'uk') {
    browser.config.profile.akamaiLocale = 'GB';
  }
  geomock(browser.config.profile.akamaiLocale);
  console.log('mock ' + browser.config.profile.akamaiLocale);
}

/**
 * Step Definition:
 * ```
 * /^I clear cookies$/
 * ```
 */
function iClearCookies() {
  browser.deleteAllCookies();
}

/**
 * Step Definition:
 * ```
 * /^I clear Operate cookies$/
 * ```
 */
function iClearOperateCookies() {
  browser.deleteCookies(['fg_stg']);
}

/**
 * Step Definition:
 * ```
 * /^I clear Performance cookies$/
 * ```
 */
function iClearPerformanceCookies() {
  browser.deleteCookies([
    'gpv',
    's_cc',
    's_ppv',
    'AMCVS_9E1005A551ED61CA0A490D45%40AdobeOrg'
  ]);
}

/**
 * Step Definition:
 * ```
 * /^I clear Functionality cookies$/
 * ```
 */
function iClearFunctionalityCookies() {
  browser.deleteCookies([
    'feds_visitor_id',
    'feds_visitor_audience'
  ]);
}

/**
 * Step Definition:
 * ```
 * /^I clear Advertising cookies$/
 * ```
 */
function iClearAdvertisingCookies() {
  browser.deleteCookies([
    '_fbp',
    '_cs_c'
  ]);
}

/**
 * Step Definition:
 * ```
 * /^I clear testing cookies$/
 * ```
 */
function iClearTestingCookies() {
  browser.deleteCookies([
    'fg_stg',
    'AKA_A2',
    'gpv',
    's_cc',
    's_ppv',
    'AMCVS_9E1005A551ED61CA0A490D45%40AdobeOrg',
    'international',
    'feds_visitor_id',
    'feds_visitor_audience',
    '_fbp',
    '_cs_c'
  ]);
}

/**
 * Step Definition:
 * ```
 * /^I click the accept button on OneTrust consent banner$/
 * ```
 */
function iClickTheAcceptButtonOnOnetrustConsentBanner() {
  this.page.waitForDisplayed('enableAll', 30000);
  this.page.enableAll.click();
}

/**
 * Step Definition:
 * ```
 * /^I should (not |)see the OneTrust consent banner$/
 * ```
 * @param {string} neg Negative verification
 */
function iShouldNegseeTheOnetrustConsentBanner(neg) {
  this.context(GnavPage);
  if (neg === 'not ') {
    browser.pause(3000);
    this.page.waitForInvisible('banner');
  } else {
    browser.pause(5000);
    this.page.waitForDisplayed('banner');
  }
}

/**
 * Step Definition:
 * ```
 * /^I click the Personalize button on OneTrust consent banner$/
 * ```
 */
function iClickThePersonalizeButtonOnOnetrustConsentBanner() {
  this.page.waitForDisplayed('personalize', 30000);
  this.page.personalize.click();
  browser.pause(10000);
}

/**
 * Step Definition:
 * ```
 * /^I click Personalize on footer$/
 * ```
 */
function iClickPersonalizeOnFooter() {
  this.page.waitForDisplayed('personalizeLinkOnFooter', 30000);
  this.page.personalizeLinkOnFooter.click();
  browser.pause(10000);
}


/**
 * Step Definition:
 * ```
 * /^I click Cookie Preferences on footer$/
 * ```
 */
 function iClickCookiePreferencesOnFooter() {
  this.page.cookies.waitForDisplayed(30000)
  this.page.cookies.click();
  browser.pause(10000);
}

/**
 * Step Definition:
 * ```
 * /^I close toast message$/
 * ```
 */
function iCloseToastMessage() {
  this.page.closeSettingsToast.click();
}

/**
 * Step Definition:
 * ```
 * /^I click AdChoices on footer$/
 * ```
 */
function iClickAdchoicesOnFooter() {
  this.page.waitForDisplayed('adChoicesLinkOnFooter', 30000);
  this.page.adChoicesLinkOnFooter.click();
  browser.pause(10000);
}

/**
 * Step Definition:
 * ```
 * /^I should see close button$/
 * ```
 */
function iShouldSeeCloseButton() {
  this.page.waitForDisplayed('closeButton', 30000);
}

/**
 * Step Definition:
 * ```
 * /^I click close button$/
 * ```
 */
function iClickCloseButton() {
  this.page.closeButton.click();
}

/**
 * Step Definition:
 * ```
 * /^I should see the banner in (light|dark) themes$/
 * ```
 * @param {string} color light or dark
 */
function iShouldSeeTheBannerInColorThemes(color) {
  console.log('banner is ' + color);
}

/**
 * Step Definition:
 * ```
 * /^I verify some cookies have (|not )been dropped:$/
 * ```
 * @param {string} neg Negative verification
 * @param {string[][]} table Table of cookies
 */
function iVerifySomeCookiesHaveNegbeenDropped(neg, table) {
  if (neg === 'not ') {
    let cookies = browser.getAllCookies();
    
    for (let item of table.raw()) {
      for (let cookie of cookies) {
        expect(item[0]).not.toEqual(cookie.name);
      }
    }
  } else {
    for (let item of table.raw()) {
      expect(browser.getCookies([item[0]])[0]['value']).toContain(item[1]);
    }
  }
}

/**
 * Step Definition:
 * ```
 * /^I print out all cookies$/
 * ```
 */
function iPrintOutAllCookies() {
  let cookies = browser.getAllCookies();
  console.log('===current cookie list start===');
  this.page.currentCookies = [];
  for (let cookie of cookies) {
    this.page.currentCookies.push(cookie.name + ': ' + cookie.value);
    console.log(cookie.name + ': ' + cookie.value);
  }
  console.log('===current cookie list end===');
}

/**
 * Step Definition:
 * ```
 * /^I print out all new added cookies$/
 * ```
 */
function iPrintOutAllNewAddedCookies() {
  let cookies = browser.getAllCookies();
  console.log('===new added cookie list start===');
  for (let cookie of cookies) {
    if (this.page.currentCookies.includes(cookie.name + ': ' + cookie.value)) {
      continue;
    } else {
      console.log(cookie.name + ': ' + cookie.value);
    }
  }
  console.log('===new added cookie list end===');
}

/**
 * Step Definition:
 * ```
 * /^I print out active groups$/
 * ```
 */
function iPrintOutActiveGroups() {
  let groups = browser.execute('return window.OptanonActiveGroups;');
  console.log(groups);
}

/**
 * Step Definition:
 * ```
 * /^I navigate to (iPad Features|What’s New|Behance) page$/
 * ```
 * @param {string} title "iPad Features", "What’s New", or "Behance"
 */
function iNavigateToTitlePage(title) {
  if (title === 'iPad Features') {
    $('.Subnav-menu-item:first-child > a').click();
  }
  
  if (title === 'What\u2019s New') {
    $('.Subnav-menu-item:nth-child(2) > a').click();
  }
  
  if (title === 'Behance') {
    $('//*[contains(@href, \'galleries/adobe/Photoshop\')]').click();
  }
}

/**
 * Step Definition:
 * ```
 * /^I should see "([^\"]*)"$/
 * ```
 * @param {string} text Text to be verified for existence
 */
function iShouldSeeText(text) {
  text = localize(text);

  this.page.retryExpect(5, 1000, () => {expect(browser.$('body')).toHaveTextContaining(text);});
}

/**
 * Step Definition:
 * ```
 * /^I should see "([^\"]*)"$/
 * ```
 * @param {string} text Text to be verified for existence
 */
 function iShouldSeeTextWithinViewport(flag, text) {
  text = localize(text);
  if(flag == '') {
    expect(browser.$(`//*[contains(text(), "${text}")]`).isDisplayedInViewport()).toBe(true);
  } else {
    expect(browser.$(`//*[contains(text(), "${text}")]`).isDisplayedInViewport()).toBe(false);
  }
}

/**
 * Step Definition:
 * ```
 * /^I should see "([^\"]*)" in page source$/
 * ```
 * @param {string} text Text to be verified for existence
 */
function iShouldSeeTextInPageSource(text) {
  expect(this.page.pageSource).toContain(text);
}

/**
 * Step Definition:
 * ```
 * /^I switch to tablet view$/
 * ```
 */
function iSwitchToTabletView() {
  browser.setWindowSize(800, 1024);
}

/**
 * Step Definition:
 * ```
 * /^I switch to mobile view$/
 * ```
 */
function iSwitchToMobileView() {
  browser.setWindowSize(414, 736);
}

/**
 * Step Definition:
 * ```
 * /^I should not see "([^\"]*)"$/
 * ```
 * @param {string} text Text to be verified for non-existence
 */
function iShouldNotSeeText(text) {
  expect(browser.$('body')).not.toHaveTextContaining(text);
}

/**
 * Step Definition:
 * ```
 * /^I enable (Performance|Functionality|Advertising) cookies$/
 * ```
 * @param {string} title Performance, Functionality, or Advertising
 */
function iEnableTitleCookies(title) {
  this.page.checkPersonalizeCategoryEnable(categoryMap[title]);
  browser.pause(5000);
  this.page.personalizeConfirmMyChoices.click();
}

/**
 * Step Definition:
 * ```
 * /^I disable (Performance|Functionality|Advertising) cookies$/
 * ```
 * @param {string} title Performance, Functionality, or Advertising
 */
function iDisableTitleCookies(title) {
  this.page.checkPersonalizeCategoryEnable(categoryMap[title]);
  browser.pause(5000);
  this.page.personalizeConfirmMyChoices.click();
}

/**
 * Step Definition:
 * ```
 * /^I enable all cookies$/
 * ```
 */
function iEnableAllCookies() {
  this.page.checkPersonalizeCategoryEnable('C0002');
  
  this.page.checkPersonalizeCategoryEnable('C0003');
  
  this.page.checkPersonalizeCategoryEnable('C0004');
  
  browser.pause(5000);
  this.page.personalizeConfirmMyChoices.click();
}

/**
 * Step Definition:
 * ```
 * /^I enable all cookies without personalization if present$/
 * ```
 */
function iEnableAllCookiesWithoutPersonalization() {
  const enableAllCookiesBtn = this.page.enableAllCookies;
  if (!enableAllCookiesBtn.isExisting()) return;
  enableAllCookiesBtn.click();
}

/**
 * Step Definition:
 * ```
 * /^I disable all cookies$/
 * ```
 */
function iDisableAllCookies() {
  this.page.checkPersonalizeCategoryEnable('C0002');
  
  this.page.checkPersonalizeCategoryEnable('C0003');
  
  this.page.checkPersonalizeCategoryEnable('C0004');
  
  browser.pause(5000);
  this.page.personalizeConfirmMyChoices.click();
}

/**
 * Step Definition:
 * ```
 * /^I scroll the cookie setting to the top$/
 * ```
 */
function iScrollTheCookieSettingToTheTop() {
  let elt = this.page.personalizeDisableAll;
  elt.scrollIntoView();
}

/**
 * Step Definition:
 * ```
 * /^I scroll the cookie setting to the bottom$/
 * ```
 */
function iScrollTheCookieSettingToTheBottom() {
  let elt = $('//*[@data-optanongroupid=\'C0004\']/div');
  elt.scrollIntoView();
}

/**
 * Step Definition:
 * ```
 * /^I click Cookie Details link under (Services|Performance|Functionality|Advertising)$/
 * ```
 * @param {string} title Services, Performance, Functionality, or Advertising
 */
function iClickCookieDetailsUnderTitle(title) {
  console.log(categoryMap[title]);
  this.page.clickPersonalizeCategoryCookieDetails(categoryMap[title]);
}

/**
 * Step Definition:
 * ```
 * /^I click View cookies under first host$/
 * ```
 */
function iClickViewCookiesUnderFirstHost() {
  this.page.clickPersonalizeCategoryCookieDetailsViewCookies();
}

/**
 * Step Definition:
 * ```
 * /^Enable all cookies if One Trust banner is present$/
 * ```
 */
 function iCloseTheOnetrustConsentBanner() {
  this.context(GnavPage);
  this.step('I wait for 2 seconds');
  if (this.page.banner.isDisplayed()) {
    this.step('I click the accept button on OneTrust consent banner');
    this.step('I close toast message');
    this.step('I wait for 1 seconds');
  }
}

/**
 * Step Definition:
 * ```
 * /^I check the Cookie Details view$/
 * ```
 */
function iCheckCookieDetailsView() {
  // Check if user is on Cookie Details view:
  expect($('section#vendors-list').isDisplayed()).toEqual(true);
  // Check Hosts cannot be filtered out anymore:
  expect($('input[type="checkbox"]').isDisplayed()).toEqual(false);
  // Check Search field is available:
  expect($('input#vendor-search-handler').isDisplayed()).toEqual(true);
}
