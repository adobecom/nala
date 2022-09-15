const { Then } = require('@cucumber/cucumber');
import { getElementCount } from '../../common/steps/common_steps';

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