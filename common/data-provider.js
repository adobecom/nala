const fs = require('fs');
const yaml = require('js-yaml');

/**
 * @param {string} filePath
 */
async function loadTestData(dataFilePath) {
  return dataFilePath.includes('.yml') ? yaml.load(fs.readFileSync(dataFilePath, 'utf8')) : JSON.parse(fs.readFileSync(dataFilePath, 'utf8'));
}

module.exports = loadTestData;
