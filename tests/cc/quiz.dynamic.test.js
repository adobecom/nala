// /* eslint-disable no-await-in-loop */
// /* eslint-disable no-use-before-define */
// const { test, expect } = require('@playwright/test');
// const quiz = require('../../features/cc/quiz.dynamic.spec.js');
// const parse = require('../../libs/parse.js');
// const selectors = require('../../selectors/cc/quiz.selectors.js');
// const { loadTestDataFromAPI } = require('../../common/data-provider.js');

// // Parse the feature file into something flat that can be tested separately
// const { name, features } = parse(quiz);
// const qCategory = [];
// const qRather = [];
// const qCustomer = [];
// const qPhoto = [];
// const qVideo = [];
// const qDesign = [];
// const qIllustration = [];
// const qPdf = [];
// const q3d = [];

// test.describe(`${name}`, () => {
//   test.beforeAll(async () => {
//     console.log('Load data from json');
//     const data = await loadTestDataFromAPI('https://main--milo--adobecom.hlx.page/', '/drafts/echampio/quiz/strings.json');

//     initializeOriginalData(data);
//   });

//   test.setTimeout(3 * 60 * 1000);
//   // eslint-disable-next-line no-restricted-syntax
//   for (const props of features) {
//     test(props.title, async ({ page }) => {
//       const testdata = buildTestData(props.tag);
//       const url = props.url.includes('?milolibs=') ? `${props.url}&mboxDisable=1` : `${props.url}?mboxDisable=1`;

//       // eslint-disable-next-line no-restricted-syntax
//       for (const key of Object.keys(testdata)) {
//         console.log(key);
//         await clickEachAnswer(url, page, key);
//         // await checkResultPage(page, testdata[key]);
//       }
//     });
//   }
// });

// /**
//  * @param {string} url
//  * @param {import('@playwright/test').Page} page
//  * @param {string} key
//  */
// async function clickEachAnswer(url, page, key) {
//   await page.goto(url);
//   // await page.waitForTimeout(2 * 1000);

//   const answers = key.split('>').map((x) => x.trim());

//   // eslint-disable-next-line no-restricted-syntax
//   for (const answer of answers) {
//     if (answer.includes('+')) {
//       const options = answer.split('+').map((x) => x.trim());
//       // select more than one answer
//       // eslint-disable-next-line no-restricted-syntax
//       for (const option of options) {
//         await page.locator(selectors['@answer'].replace('answer', option)).click();
//         // await page.waitForTimeout(0.5 * 1000);
//       }
//     } else {
//       // select one answer
//       await page.locator(selectors['@answer'].replace('answer', answer)).click();
//       // await page.waitForTimeout(1 * 1000);
//     }

//     if (answers.indexOf(answer) < answers.length - 1) {
//       // click next button
//       await page.getByRole('button', { name: selectors['@next-button'] }).click();

//       // await page.waitForTimeout(1000);
//     }
//   }

//   // click get your results button
//   await page.getByRole('button', { name: selectors['@result-button'] }).click();
//   // await page.waitForTimeout(5 * 1000);
// }

// /**
//  * @param {import('@playwright/test').Page} page
//  * @param {string} result
//  */
// async function checkResultPage(page, result) {
//   const results = result.split('>').map((x) => x.trim());
//   const type = results[0];
//   let expectProduct = results[1];
//   await page.waitForSelector(selectors['@uar-result']);
//   let acturalProduct = await page.locator(selectors['@uar-result']).textContent();

//   if (expectProduct === '2') {
//     // eslint-disable-next-line prefer-destructuring
//     expectProduct = results[2];
//     acturalProduct = await page.locator(selectors['@uar-result-2']).textContent();
//   }

//   expect(page.url()).toContain(type);
//   expect(acturalProduct).toContain(expectProduct);
// }

// /**
//  * Read data from remote json file and store into arrays
//  * @param {Object} data
//  */
// function initializeOriginalData(data) {
//   const dataMap = {
//     'q-category': qCategory,
//     'q-rather': qRather,
//     'q-customer': qCustomer,
//     'q-photo': qPhoto,
//     'q-video': qVideo,
//     'q-design': qDesign,
//     'q-illustration': qIllustration,
//     'q-pdf': qPdf,
//     'q-3d': q3d,
//   };

//   // eslint-disable-next-line no-restricted-syntax
//   for (const [key, value] of Object.entries(dataMap)) {
//     data[key].data.forEach((element) => {
//       if (key === 'q-category') {
//         value.push(element.title.trim());
//       } else {
//         value.push(element.text.trim());
//       }
//     });
//   }
// }

// /**
//  * build test data according to test tags
//  * @param {string} tag
//  * @returns
//  */
// function buildTestData(tag) {
//   const testdata = {};
//   // single + template
//   if (tag === '@quiz-single-template') {
//     qCategory.forEach((category) => {
//       qCustomer.forEach((customer) => {
//         if (category !== '3D/AR') {
//           const key = `${category} > ${qRather[0]} > ${customer}`;
//           testdata[key] = 'cc:app-reco&quiz=UARv2&selectedOptions=';
//         }
//       });
//     });
//   }

//   // double + template
//   if (tag === '@quiz-double-template') {
//     for (let i = 0; i < qCategory.length - 1; i += 1) {
//       for (let j = i + 1; j < qCategory.length - 1; j += 1) {
//         qCustomer.forEach((customer) => {
//           const key = `${qCategory[i]} + ${qCategory[j]} > ${qRather[0]} > ${customer}`;
//           testdata[key] = 'cc:app-reco&quiz=UARv2&selectedOptions=';
//         });
//       }
//     }
//   }

//   // triple + template
//   if (tag === '@quiz-triple-template') {
//     for (let i = 0; i < qCategory.length - 1; i += 1) {
//       for (let j = i + 1; j < qCategory.length - 1; j += 1) {
//         for (let k = j + 1; k < qCategory.length - 1; k += 1) {
//           qCustomer.forEach((customer) => {
//             const key = `${qCategory[i]} + ${qCategory[j]} + ${qCategory[k]} > ${qRather[0]} > ${customer}`;
//             testdata[key] = 'cc:app-reco&quiz=UARv2&selectedOptions=';
//           });
//         }
//       }
//     }
//   }

//   // single + flagship + photo
//   if (tag === '@quiz-single-flagship-photo') {
//     qCategory.forEach((category) => {
//       qCustomer.forEach((customer) => {
//         if (category === 'Photography') {
//           qPhoto.forEach((photo) => {
//             const key = `${category} > ${qRather[1]} > ${photo} > ${customer}`;
//             testdata[key] = 'cc:app-reco&quiz=UARv2&selectedOptions=';
//           });
//         }
//       });
//     });
//   }

//   // single + flagship + video
//   if (tag === '@quiz-single-flagship-video') {
//     qCategory.forEach((category) => {
//       qCustomer.forEach((customer) => {
//         if (category === 'Video') {
//           qVideo.forEach((video) => {
//             const key = `${category} > ${qRather[1]} > ${video} > ${customer}`;
//             testdata[key] = 'cc:app-reco&quiz=UARv2&selectedOptions=';
//           });
//         }
//       });
//     });
//   }

//   // single + flagship + design
//   if (tag === '@quiz-single-flagship-design') {
//     qCategory.forEach((category) => {
//       qCustomer.forEach((customer) => {
//         if (category === 'Graphic design') {
//           qDesign.forEach((design) => {
//             const key = `${category} > ${qRather[1]} > ${design} > ${customer}`;
//             testdata[key] = 'cc:app-reco&quiz=UARv2&selectedOptions=';
//           });
//         }
//       });
//     });
//   }

//   // single + flagship + illustration
//   if (tag === '@quiz-single-flagship-illustration') {
//     qCategory.forEach((category) => {
//       qCustomer.forEach((customer) => {
//         if (category === 'Illustration') {
//           qIllustration.forEach((illustration) => {
//             const key = `${category} > ${qRather[1]} > ${illustration} > ${customer}`;
//             testdata[key] = 'cc:app-reco&quiz=UARv2&selectedOptions=';
//           });
//         }
//       });
//     });
//   }

//   // single + flagship + pdf
//   if (tag === '@quiz-single-flagship-pdf') {
//     qCategory.forEach((category) => {
//       qCustomer.forEach((customer) => {
//         if (category === 'PDFs') {
//           qPdf.forEach((pdf) => {
//             const key = `${category} > ${qRather[1]} > ${pdf} > ${customer}`;
//             testdata[key] = 'cc:app-reco&quiz=UARv2&selectedOptions=';
//           });
//         }
//       });
//     });
//   }

//   // single + 3d
//   if (tag === '@quiz-single-3D') {
//     qCategory.forEach((category) => {
//       qCustomer.forEach((customer) => {
//         if (category === '3D/AR') {
//           q3d.forEach((item) => {
//             const key = `${category} > ${item} > ${customer}`;
//             testdata[key] = 'cc:app-reco&quiz=UARv2&selectedOptions=';
//           });
//         }
//       });
//     });
//   }

//   return testdata;
// }

// module.exports = { clickEachAnswer, checkResultPage };
