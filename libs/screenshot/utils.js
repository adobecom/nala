// eslint-disable-next-line import/no-extraneous-dependencies, import/no-import-module-exports, import/extensions
const { getComparator } = require('playwright-core/lib/utils');

const fs = require('fs');
const path = require('path');

const ALLOWED_BASE_DIRECTORY = 'screenshots';

function validatePath(filePath, options = { allowDirectory: false, forWriting: false }) {
  if (typeof filePath !== 'string') {
    throw new Error(`Invalid path: ${filePath}. Path should be a string.`);
  }

  // Resolve the input path to an absolute path
  const absolutePath = path.resolve(filePath);
  console.log(absolutePath);

  // Ensure the path is within the allowed base directory
  if (!absolutePath.startsWith(path.resolve(ALLOWED_BASE_DIRECTORY))) {
    throw new Error(`Path traversal attempt detected: ${filePath}`);
  }

  const dirPath = path.dirname(absolutePath);

  if (options.forWriting) {
    // Ensure the directory exists, or create it if necessary
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    } else if (!fs.lstatSync(dirPath).isDirectory()) {
      throw new Error(`Not a directory: ${dirPath}`);
    }
  } else {
    // Check if the path exists
    if (!fs.existsSync(absolutePath)) {
      throw new Error(`File or directory does not exist: ${absolutePath}`);
    }

    const stats = fs.lstatSync(absolutePath);
    if (options.allowDirectory && !stats.isFile() && !stats.isDirectory()) {
      throw new Error(`Not a file or directory: ${absolutePath}`);
    } else if (!options.allowDirectory && !stats.isFile()) {
      throw new Error(`Not a file: ${absolutePath}`);
    }
  }

  return absolutePath;
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
      const stableImage = fs.readFileSync(validatePath(`${stableArray[i].a}`));
      const betaImage = fs.readFileSync(validatePath(`${betaArray[i].a}`));
      const diffImage = comparator(stableImage, betaImage);

      if (diffImage) {
        result.diff = `${stableArray[i].a}-diff.png`;
        fs.writeFileSync(validatePath(`${stableArray[i].a}-diff.png`, { forWriting: true }), diffImage.diff);
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
  fs.writeFileSync(validatePath(resultFilePath, { forWriting: true }), JSON.stringify(results, null, 2));
}

module.exports = { compareScreenshots, writeResultsToFile, validatePath };
