// const path = require('path');
// const { test } = require('@playwright/test');
// const quiz = require('../../features/cc/quiz.analytics.spec.js');
// const parse = require('../../libs/parse.js');
// const { loadTestData } = require('../../common/data-provider.js');
// const { clickEachAnswer, checkResultPage } = require('./quiz.static.test.js');

// // Parse the feature file into something flat that can be tested separately
// const { name, features } = parse(quiz);

// test.describe.configure({ mode: 'serial' });

// let page;
// let networklogs;

// test.describe(`${name}`, () => {
//   test.skip(({ browserName }) => browserName !== 'firefox', 'firefox only!');

//   test.beforeAll(async ({ browser }) => {
//     page = await browser.newPage();
//     networklogs = [];
//     console.log('Before all tests: Enable network logging');
//     // Enable network logging
//     await page.route('**', (route) => {
//       const url = route.request().url();
//       if (url.includes('sstats.adobe.com/ee/or2/v1/interact') || url.includes('sstats.adobe.com/ee/or2/v1/collect')) {
//         networklogs.push(url);
//         // eslint-disable-next-line max-len, no-underscore-dangle
//         networklogs.push(JSON.stringify(route.request().postDataJSON().events[0].data._adobe_corpnew.digitalData.primaryEvent));
//       }
//       route.continue();
//     });
//   });

//   test.afterAll(async () => {
//     console.log('After all tests: Disable network logging');
//     // Disable network logging
//     await page.unroute('**');
//     await page.close();
//   });

//   test.setTimeout(2 * 60 * 1000);
//   // eslint-disable-next-line no-restricted-syntax
//   for (const props of features) {
//     // eslint-disable-next-line no-loop-func
//     test(props.title, async () => {
//       const testdata = await loadTestData(path.join('data/cc/quiz/', `${props.tag}.yml`));
//       const url = props.url.includes('?milolibs=') ? `${props.url}&mboxDisable=1` : `${props.url}?mboxDisable=1`;
//       // eslint-disable-next-line no-restricted-syntax
//       for (const key of Object.keys(testdata)) {
//         console.log(key);
//         networklogs.length = 0;
//         // eslint-disable-next-line no-await-in-loop, no-use-before-define
//         await clickEachAnswer(url, page, key);
//         // eslint-disable-next-line no-use-before-define, no-await-in-loop
//         await checkResultPage(page, testdata[key]);

//         console.log(networklogs);
//       }
//     });
//   }
// });
