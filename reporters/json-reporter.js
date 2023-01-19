const fs = require('fs/promises');
const BaseReporter = require('./base-reporter.js');

const JSON_PATH = './nala-results.json';

class JSONReporter extends BaseReporter {
  constructor() {
    super({ persist: { type: 'json-reporter', path: JSON_PATH } });
  }

  async persistData() {
    const persistedObject = this.getPersistedDataObject();
    await fs.writeFile(JSON_PATH, JSON.stringify(persistedObject));
  }
}

module.exports = JSONReporter;
