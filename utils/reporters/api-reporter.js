const axios = require('axios');
const BaseReporter = require('./base-reporter.js');

const apiName = 'nala-api-testruns';
const action = 'posttestrun';
const apiVersion = 'v1';
const baseUrl = 'https://14257-testrunsmanagement-stage.adobeio-static.net/api';

async function postToAPI(data) {
  const axiosInstance = axios.create({
    baseURL: baseUrl,
    timeout: 30000,
  });
  return axiosInstance.post(
    `${`/${apiVersion}/web/${apiName}/${action}`}`,
    data,
  );
}

class APIReporter extends BaseReporter {
  constructor() {
    super({ persist: { type: 'api-reporter', path: baseUrl } });
    this.axios = axios.create({
      baseURL: baseUrl,
      timeout: 5000,
    });
  }

  async persistData() {
    // specify who initiated the test runs / this run is against which repo
    const persistedObject = this.getPersistedDataObject();
    try {
      const { status, data } = await postToAPI(persistedObject);
      if (status < 200 || status >= 400) {
        throw new Error('API returned non-200 status');
      }
      console.log(
        `testrun record ${data.name} were successfully persisted. Written bytes: ${data.writtenBytes}`,
      );
    } catch (err) {
      console.error('failed to post!');
      console.error(err);
    }
  }
}

module.exports = APIReporter;
