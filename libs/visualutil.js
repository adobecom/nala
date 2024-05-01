/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/no-import-module-exports */
// eslint-disable-next-line import/extensions
import { getComparator } from 'playwright-core/lib/utils';

const fs = require('fs');

async function takeOne(page, url, callback, folderPath, fileName, isFullPage = true) {
  const urls = [];
  const result = {};

  console.info(`[Test Page]: ${url}`);
  await page.goto(url);
  urls.push(url);
  if (typeof callback === 'function') { await callback(); }
  const name = `${folderPath}/${fileName}.png`;
  await page.screenshot({ path: name, fullPage: isFullPage });

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

function compareScreenshots(stableArray, betaArray, folderPath) {
  const comparator = getComparator('image/png');
  for (let i = 0; i < stableArray.length; i += 1) {
    if (betaArray[i].slice(-10) === stableArray[i].slice(-10)) {
      const stableImage = fs.readFileSync(`${folderPath}/${stableArray[i]}`);
      const betaImage = fs.readFileSync(`${folderPath}/${betaArray[i]}`);
      const diffImage = comparator(stableImage, betaImage);

      if (diffImage) {
        fs.writeFileSync(`${folderPath}/${stableArray[i]}-diff.png`, diffImage.diff);
        console.info('Differences found');
      }
    } else {
      console.info('Screenshots are not matched');
      console.info(`${stableArray[i]} vs ${betaArray[i]}`);
    }
  }
}

module.exports = { takeTwoAndCompare, compareScreenshots, takeOne, takeTwo };
