/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/no-import-module-exports */
// eslint-disable-next-line import/extensions
import { getComparator } from 'playwright-core/lib/utils';

const fs = require('fs');

/**
  * Take a screenshot of a page
  * @param {Page} page - The page object
  * @param {string} folderPath - The folder path to save the screenshot, e.g., screenshots/milo
  * @param {string} fileName - The file name of the screenshot
  * @param {object} options - The screenshot options, see https://playwright.dev/docs/api/class-page#page-screenshot
*/
async function take(page, folderPath, fileName, options = {}) {
  const urls = [];
  const result = {};
  const name = `${folderPath}/${fileName}.png`;
  urls.push(page.url());
  options.path = name;
  if (options.selector) {
    await page.locator(options.selector).screenshot(options);
  } else {
    await page.screenshot(options);
  }
  result.a = name;
  result.urls = urls.join(' | ');
  return result;
}

async function takeOne(page, url, callback, folderPath, fileName, options = {}) {
  const urls = [];
  const result = {};

  console.info(`[Test Page]: ${url}`);
  await page.goto(url);
  urls.push(url);
  if (typeof callback === 'function') { await callback(); }
  const name = `${folderPath}/${fileName}.png`;
  options.path = name;
  if (options.selector) {
    await page.locator(options.selector).screenshot(options);
  } else {
    await page.screenshot(options);
  }

  result.order = 1;
  result.a = name;
  result.urls = urls.join(' | ');
  return result;
}

async function takeTwo(page, urlStable, callbackStable, urlBeta, callbackBeta, folderPath, fileName) {
  const urls = [];
  const result = {};

  console.info(`[Test Page]: ${urlStable}`);
  await page.goto(urlStable);
  urls.push(urlStable);
  if (typeof callbackStable === 'function') { await callbackStable(); }
  const nameStable = `${folderPath}/${fileName}-a.png`;
  await page.screenshot({ path: nameStable, fullPage: true });
  result.order = 1;
  result.a = nameStable;

  console.info(`[Test Page]: ${urlBeta}`);
  await page.goto(urlBeta);
  urls.push(urlBeta);
  if (typeof callbackBeta === 'function') { await callbackBeta(); }
  const nameBeta = `${folderPath}/${fileName}-b.png`;
  await page.screenshot({ path: nameBeta, fullPage: true });

  result.b = nameBeta;
  result.urls = urls.join(' | ');
  return result;
}

async function takeTwoAndCompare(page, urlStable, callbackStable, urlBeta, callbackBeta, folderPath, fileName) {
  const urls = [];
  const result = {};

  console.info(`[Test Page]: ${urlStable}`);
  await page.goto(urlStable);
  urls.push(urlStable);
  if (typeof callbackStable === 'function') { await callbackStable(); }
  const nameStable = `${folderPath}/${fileName}-a.png`;
  await page.screenshot({ path: nameStable, fullPage: true });
  const baseImage = fs.readFileSync(nameStable);
  result.order = 1;
  result.a = nameStable;

  console.info(`[Test Page]: ${urlBeta}`);
  await page.goto(urlBeta);
  urls.push(urlBeta);
  if (typeof callbackBeta === 'function') { await callbackBeta(); }
  const nameBeta = `${folderPath}/${fileName}-b.png`;
  await page.screenshot({ path: nameBeta, fullPage: true });
  const currImage = fs.readFileSync(nameBeta);
  result.b = nameBeta;

  const comparator = getComparator('image/png');
  const diffImage = comparator(baseImage, currImage);

  if (diffImage) {
    const diffName = `${folderPath}/${fileName}-diff.png`;
    fs.writeFileSync(diffName, diffImage.diff);
    result.diff = diffName;
    console.info('Differences found');
  }

  result.urls = urls.join(' | ');
  return result;
}

function compareScreenshots(stableArray, betaArray) {
  const results = [];
  const comparator = getComparator('image/png');
  for (let i = 0; i < stableArray.length; i += 1) {
    if (betaArray[i].a.slice(-10) === stableArray[i].a.slice(-10)) {
      const result = {};
      const urls = [];
      result.order = i + 1;
      result.a = `${stableArray[i].a}`;
      result.b = `${betaArray[i].a}`;
      urls.push(stableArray[i].urls);
      urls.push(betaArray[i].urls);
      const stableImage = fs.readFileSync(`${stableArray[i].a}`);
      const betaImage = fs.readFileSync(`${betaArray[i].a}`);
      const diffImage = comparator(stableImage, betaImage);

      if (diffImage) {
        result.diff = `${stableArray[i].a}-diff.png`;
        fs.writeFileSync(`${stableArray[i].a}-diff.png`, diffImage.diff);
        console.info('Differences found');
      }
      result.urls = urls.join(' | ');
      results.push(result);
    } else {
      console.info('Screenshots are not matched');
      console.info(`${stableArray[i].a} vs ${betaArray[i].a}`);
    }
  }
  return results;
}

function writeResultsToFile(folderPath, testInfo, results) {
  const resultFilePath = `${folderPath}/results-${testInfo.workerIndex}.json`;
  fs.writeFileSync(resultFilePath, JSON.stringify(results, null, 2));
}

module.exports = {
  takeTwoAndCompare,
  compareScreenshots,
  takeOne,
  takeTwo,
  take,
  writeResultsToFile,
};
