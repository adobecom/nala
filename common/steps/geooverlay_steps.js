/** @module dc/steps */
const {Given} = require('@cucumber/cucumber');
const {Then} = require('@cucumber/cucumber');
const {When} = require('@cucumber/cucumber');

Then(/^I should see the geo overlay$/, iShouldSeeTheGeoOverlay);

Then(/^I should not see the geo overlay$/, iShouldNotSeeTheGeoOverlay);

When(/^I click the first overlay link$/, iClickTheFirstOverlayLink);

When(/^I click the second overlay link$/, iClickTheSecondOverlayLink);

When(/^I click the last overlay link$/, iClickTheLastOverlayLink);

Then(/^I close the geo overlay if present$/, iCloseTheGeoOverlayIfPresent);

Then(/^I verify international cookies have been set correct$/, iVerifyInternationalCookiesHaveBeenSetCorrect);  

/**
 * Array of locales under adobe.com
 */
 const acomLocales = [
  'ae_en',
  'africa',
  'at',
  'au',
  'be_en',
  'be_fr',
  'be_nl',
  'bg',
  'br',
  'ca',
  'ca_fr',
  'ch_de',
  'ch_fr',
  'ch_it',
  'cl',
  'cn',
  'cy_en',
  'cz',
  'de',
  'dk',
  'ee',
  'es',
  'es_ca',
  'es_eu',
  'fi',
  'fr',
  'gr_en',
  'hk_en',
  'hk_zh',
  'hr',
  'hu',
  'ie',
  'il_en',
  'il_he',
  'in',
  'it',
  'jp',
  'kr',
  'la',
  'lt',
  'lu_de',
  'lu_en',
  'lu_fr',
  'lv',
  'mena_ar',
  'mena_en',
  'mt',
  'mx',
  'nl',
  'no',
  'nz',
  'pl',
  'pt',
  'ro',
  'ru',
  'sa_en',
  'se',
  'sea',
  'sg',
  'si',
  'sk',
  'th_en',
  'tr',
  'tw',
  'ua',
  'uk'
];

/**
 * Step Definition:
 * ```
 * /^I should see the geo overlay$/
 * ```
 */
function iShouldSeeTheGeoOverlay() {
  expect(this.page.dexterGeoOverlay.isDisplayed()).toBe(true);
}

/**
 * Step Definition:
 * ```
 * /^I should not see the geo overlay$/
 * ```
 */
function iShouldNotSeeTheGeoOverlay() {
  this.page.waitForInvisible('geoOverlay');
  this.page.waitForInvisible('dexterGeoOverlay');
}

/**
 * Step Definition:
 * ```
 * /^I click the first overlay link$/
 * ```
 */
function iClickTheFirstOverlayLink() {
  this.page.firstOverlayLink.click();
}

/**
 * Step Definition:
 * ```
 * /^I click the second overlay link$/
 * ```
 */
function iClickTheSecondOverlayLink() {
  this.page.secondOverlayLink.click();
}

/**
 * Step Definition:
 * ```
 * /^I click the last overlay link$/
 * ```
 */
function iClickTheLastOverlayLink() {
  this.page.lastOverlayLink.click();
}

/**
 * Step Definition:
 * ```
 * /^I close the geo overlay if present$/
 * ```
 */
function iCloseTheGeoOverlayIfPresent() {
  this.step('I wait for 2 seconds');
  if (this.page.dexterGeoOverlay.isDisplayed()) {
    this.page.dexterGeoOverlayClose.click();
  }
}

/**
 * Step Definition:
 * ```
 * /^I verify international cookies have been set correct$/
 * ```
 */
function iVerifyInternationalCookiesHaveBeenSetCorrect() {
  let localeCfg;

  let locale = browser.getUrl().match(/https:\/\/[^\/]+\/([^\/]+)(.*)/);
  if (locale) {
    locale = acomLocales.includes(locale[1]) ? locale[1] : '';
  } else {
    locale = '';
  }
  localeCfg = browser.config.locales.find(x => x.locale === locale);

  expect(browser.getCookies(['international'])[0]['value']).toContain(localeCfg.international);
}