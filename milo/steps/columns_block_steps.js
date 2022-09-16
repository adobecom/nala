const { Given } = require('@cucumber/cucumber');
const { Then } = require('@cucumber/cucumber');
const { When } = require('@cucumber/cucumber');
import { getElementCount } from '../../common/steps/common_steps';
import { ColumnsBlockPage } from '../pages/columns_lib_block_page';

Given(/^I go to "([^\"]*)" columns block page$/, iGoToColumnsPage);

When(/^I select the block "([^\"]*)"$/, iSelectMiloBlock);

Then(/^I should see "(.+)" columns$/, iSeeColumnAmount);

Then(/^I should see "(.+)" rows$/, iSeeRowAmount);

Then(
    /^I should see "([^\"]*)" in the "(.+)" column "(.+)" row$/,
    iSeeTextInColRow
);

Then(
    /^I should see "(.+)" pictures in the "(.+)" column "(.+)" row$/,
    iSeePictureAmountInColRow
);

/**
 * Step Definition:
 * ```
 * /^I go to "([^\"]*)" columns block page$/
 * ```
 * @param {string} path Path to go to
 */
function iGoToColumnsPage(path) {
    this.page = new ColumnsBlockPage();
    this.page.open(path);
    console.log(browser.getUrl());
}

/**
 * Step Definition
 * ```
 * /^I select the block "([^\"]*)"$/
 * ```
 * @param {String} className element class name to select
 *
 */
function iSelectMiloBlock(className) {
    let miloBlock = $('[class="' + className + '"]');
    expect(miloBlock.isDisplayed()).toBe(true);
}

/**
 * Step Definition:
 * ```
 * /^I should see "(.+)" columns$/
 * ```
 * @param {number} amount number of columns expected to be present
 */
function iSeeColumnAmount(amount) {
    getElementCount();
}

/**
 * Step Definition:
 * ```
 * /^I should see "(.+)" rows$/
 * ```
 * @param {number} amount number of rows expected to be present
 */
function iSeeRowAmount(amount) {
    getElementCount();
}

/**
 * Step Definition:
 * ```
 * /^I should see "([^\"]*)" in the "(.+)" column "(.+)" row$/
 * ```
 * @param {string} text content in column block row
 * @param {number} columnNumber number of column
 * @param {number} rowNumber number of row
 */
function iSeeTextInColRow(text, columnNumber, rowNumber) {}

/**
 * Step Definition:
 * ```
 * /^I should see "(.+)" pictures in the "(.+)" column "(.+)" row$/
 * ```
 * @param {number} elementCount element count expected in column block row
 * @param {number} columnNumber number of column
 * @param {number} rowNumber number of row
 */
function iSeePictureAmountInColRow(elementCount, columnNumber, rowNumber) {
    getElementCount();
}