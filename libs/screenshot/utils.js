// eslint-disable-next-line import/no-extraneous-dependencies, import/extensions, import/no-import-module-exports
import { getComparator } from 'playwright-core/lib/utils';

const fs = require('fs');

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

module.exports = { compareScreenshots, writeResultsToFile };
