const path = require('path');
const { test, expect } = require('@playwright/test');
const quiz = require('../features/quiz.analytics.spec.js');
const parse = require('../features/parse.js');
const selectors = require('../selectors/quiz.selectors.js');
const loadTestData = require('../common/data-provider.js');

// Parse the feature file into something flat that can be tested separately
const { name, features } = parse(quiz);

test.describe.configure({ mode: 'serial' });

let page;
let networklogs;

test.beforeAll(async ({ browser }) => {
  console.log('Before tests');
  page = await browser.newPage();
  networklogs = [];

  // Enable network logging
  await page.route('**', (route) => {
    const url = route.request().url();
    if (url.includes('sstats.adobe.com/ee/or2/v1/interact') || url.includes('sstats.adobe.com/ee/or2/v1/collect')) {
      networklogs.push(url);
      // eslint-disable-next-line max-len, no-underscore-dangle
      networklogs.push(JSON.stringify(route.request().postDataJSON().events[0].data._adobe_corpnew.digitalData.primaryEvent));
    }
    route.continue();
  });
});

test.afterAll(async () => {
  console.log('After tests');
  // Disable network logging
  await page.unroute('**');
  await page.close();
});

test.describe(`${name}`, () => {
  test.setTimeout(10 * 60 * 1000);
  // eslint-disable-next-line no-restricted-syntax
  for (const props of features) {
    // eslint-disable-next-line no-loop-func
    test(props.title, async () => {
      const testdata = await loadTestData(path.join('data/cc/quiz/', `${props.tag}.yml`));
      const url = props.url.includes('?milolibs=') ? `${props.url}&mboxDisable=1` : `${props.url}?mboxDisable=1`;
      const key = Object.keys(testdata)[0];
      // eslint-disable-next-line no-await-in-loop, no-use-before-define
      await clickEachAnswer(url, key);
      // eslint-disable-next-line no-use-before-define, no-await-in-loop
      await checkResultPage(testdata[key]);
    });
  }
});

/**
 * @param {string} url
 * @param {string} key
 */
async function clickEachAnswer(url, key) {
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
      // eslint-disable-next-line no-await-in-loop
      await page.waitForTimeout(2 * 1000);
    }
  }

  // click get your results button
  await page.getByRole('button', { name: selectors['@result-button'] }).click();
}

/**
 * @param {string} result
 */
async function checkResultPage(result) {
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
  console.log(networklogs);
}
