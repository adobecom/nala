/* eslint-disable no-restricted-syntax */
/* eslint-disable no-await-in-loop */
const path = require('path');
const { test, expect } = require('@playwright/test');
const result = require('../features/result.spec.js');
const parse = require('../features/parse.js');
const loadTestData = require('../common/data-provider.js');
const selectors = require('../selectors/result.selectors.js');

// Parse the feature file into something flat that can be tested separately
const { name, features } = parse(result);

test.describe(`${name}`, () => {
  // test.setTimeout(10 * 60 * 1000);
  for (const props of features) {
    test(props.title, async ({ page }) => {
      const testdata = await loadTestData(path.join('data/cc/quiz/', `${props.tag}.json`));
      for (const key of Object.keys(testdata)) {
        const url = props.url + key;
        // eslint-disable-next-line no-use-before-define
        await checkResultPage(url, page, testdata[key]);
      }
    });
  }
});

/**
 * @param {string} url
 * @param {import('@playwright/test').Page} page
 * @param {string} results
 */
async function checkResultPage(url, page, results) {
  await page.goto(url);
  await page.reload();
  await page.waitForSelector(selectors['@uar-result']);
  const pageText = await page.innerText('div');
  for (const values of Object.values(results)) {
    for (const value of values) {
      if (typeof value === 'string') {
        // eslint-disable-next-line no-use-before-define
        await validateTextAndLinks(url, page, value, pageText);
      } else if (Array.isArray(value)) {
        for (const text of value) {
          // eslint-disable-next-line no-use-before-define
          await validateTextAndLinks(url, page, text, pageText);
        }
      }
    }
  }
}

/**
 * @param {string} url
 * @param {import('@playwright/test').Page} page
 * @param {string} value
 * @param {string} pageText
 */
async function validateTextAndLinks(url, page, value, pageText) {
  if (value.includes('link:')) {
    await page.locator(selectors[`@${value.split(':')[1]}`]).click();
    await page.waitForTimeout(1000);
    expect(page.url()).toContain(`${value.split(':')[2]}`);
    await page.goto(url);
    await page.reload();
    await page.waitForSelector(selectors['@uar-result']);
  } else {
    expect(pageText).toContain(value);
  }
}
