const path = require('path');
const { test, expect } = require('@playwright/test');
const quiz = require('../features/quiz.spec.js');
const parse = require('../features/parse.js');
const selectors = require('../selectors/quiz.selectors.js');
const loadTestData = require('../common/data-provider.js');

// Parse the feature file into something flat that can be tested separately
const { name, features } = parse(quiz);

test.describe(`${name}`, () => {
  test.setTimeout(10 * 60 * 1000);
  // eslint-disable-next-line no-restricted-syntax
  for (const props of features) {
    test(props.title, async ({ page }) => {
      const testdata = await loadTestData(path.join('data/cc/quiz/', `${props.tag}.yml`));
      const url = props.url.includes('?milolibs=') ? `${props.url}&mboxDisable=1` : `${props.url}?mboxDisable=1`;

      // eslint-disable-next-line no-restricted-syntax
      for (const key of Object.keys(testdata)) {
        // eslint-disable-next-line no-await-in-loop, no-use-before-define
        await clickEachAnswer(url, page, key);
        // eslint-disable-next-line no-use-before-define, no-await-in-loop
        await checkResultPage(page, testdata[key]);
      }
    });
  }
});

/**
 * @param {string} url
 * @param {import('@playwright/test').Page} page
 * @param {string} key
 */
async function clickEachAnswer(url, page, key) {
  await page.goto(url);

  const answers = key.split('>').map((x) => x.trim());

  // eslint-disable-next-line no-restricted-syntax
  for (const answer of answers) {
    if (answer.includes('+')) {
      const options = answer.split('+').map((x) => x.trim());
      // select more than one answer
      // eslint-disable-next-line no-restricted-syntax
      for (const option of options) {
        // eslint-disable-next-line no-await-in-loop
        await page.locator(selectors['@answer'].replace('answer', option)).click();
      }
    } else {
      // select one answer
      // eslint-disable-next-line no-await-in-loop
      await page.locator(selectors['@answer'].replace('answer', answer)).click();
    }

    if (answers.indexOf(answer) < answers.length - 1) {
      // click next button
      // eslint-disable-next-line no-await-in-loop
      await page.getByRole('button', { name: selectors['@next-button'] }).click();
    }
  }

  // click get your results button
  await page.getByRole('button', { name: selectors['@result-button'] }).click();
}

/**
 * @param {import('@playwright/test').Page} page
 * @param {string} result
 */
async function checkResultPage(page, result) {
  const results = result.split('>').map((x) => x.trim());
  const type = results[0];
  let expectProduct = results[1];
  await page.waitForSelector(selectors['@uar-result']);
  let acturalProduct = await page.locator(selectors['@uar-result']).textContent();

  if (expectProduct === '2') {
    // eslint-disable-next-line prefer-destructuring
    expectProduct = results[2];
    acturalProduct = await page.locator(selectors['@uar-result-2']).textContent();
  }

  expect(page.url()).toContain(type);
  expect(acturalProduct).toContain(expectProduct);
}
