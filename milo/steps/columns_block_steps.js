const { Then } = require('@cucumber/cucumber');
import { getElementCount } from '../../common/steps/common_steps';

Then(/^I should see (\d+) columns$/, iSeeColumnAmount);

Then(/^I should see (\d+) rows$/, iSeeRowAmount);

Then(
    /^I should see "([^\"]*)" in the (\d+) column (\d+) row$/,
    iSeeTextInColRow
);

Then(
    /^I should see (\d+) pictures in the (\d+) column (\d+) row$/,
    iSeePictureAmountInColRow
);

/**
 * Step Definition:
 * ```
 * /^I should see (\d+) columns$/
 * ```
 * @param {number} amount number of columns expected to be present
 */
function iSeeColumnAmount(amount) {
    getElementCount();
}

/**
 * Step Definition:
 * ```
 * /^I should see (\d+) rows$/
 * ```
 * @param {number} amount number of rows expected to be present
 */
function iSeeRowAmount(amount) {
    getElementCount();
}

/**
 * Step Definition:
 * ```
 * /^I should see "([^\"]*)" in the (\d+) column (\d+) row
 * ```
 * @param {string} text content in column block row
 * @param {number} columnNumber number of column
 * @param {number} rowNumber number of row
 */
function iSeeTextInColRow(text, columnNumber, rowNumber) {}

/**
 * Step Definition:
 * ```
 * /^I should see (\d+) pictures in the (\d+) column (\d+) row$/
 * ```
 * @param {number} elementCount element count expected in column block row
 * @param {number} columnNumber number of column
 * @param {number} rowNumber number of row
 */
function iSeePictureAmountInColRow(elementCount, columnNumber, rowNumber) {
    getElementCount();
}