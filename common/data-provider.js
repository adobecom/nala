const fs = require('fs');
// eslint-disable-next-line import/no-extraneous-dependencies
const yaml = require('js-yaml');
const { request } = require('@playwright/test');

/**
 * @param {string} filePath
 */
async function loadTestData(dataFilePath) {
  return dataFilePath.includes('.yml') ? yaml.load(fs.readFileSync(dataFilePath, 'utf8')) : JSON.parse(fs.readFileSync(dataFilePath, 'utf8'));
}

/**
 * @param {string} path
 * @param {string} url
 */
async function loadTestDataFromAPI(url, path) {
  const context = await request.newContext({ baseURL: url });
  const res = await context.fetch(path);
  return res.json();
}

module.exports = { loadTestData, loadTestDataFromAPI };
