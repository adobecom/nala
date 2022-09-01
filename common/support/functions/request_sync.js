const { Request } = require('../classes/request');

/**
 * Convert async get request to sync using browser.call()
 * @param {string} url URL of the get request
 * @param {object} config options for Axios
 */
function requestGet(url, config) {
  return browser.call(() => {
    return Request.get(url, config);
  });
}

/**
 * Convert async head request to sync using browser.call()
 * @param {string} url URL of the get request
 * @param {object} config options for Axios
 */
function requestHead(url, config) {
  return browser.call(() => {
    return Request.head(url, config);
  });
}


/**
 * Convert async get JSON request to sync using browser.call()
 * @param {string} url URL of the get request
 * @param {object} config options for Axios
 */
function requestGetJson(url, config) {
  return requestGet(url, config).data;
}

/**
 *
 * @param {string} url URL of the get request
 * @param {object} promise that will be resolved to the response data
 */
async function requestGetJsonAsync(url, config) {
  const resp = await requestGet(url, config);
  return resp.data;
}

/**
 * Convert async post request to sync using browser.call()
 * @param {string} url URL of the post request
 * @param {object} config options for Axios
 */
function requestPost(url, data, config) {
  return browser.call(() => {
    return Request.post(url, data, config);
  });
}

/**
 * Retry requestGet
 * @param {string} url URL of the get request
 * @param {object} config options for Axios
 */
function requestGetRetry(url, config, retryOptions) {
  retryOptions = retryOptions || {};
  let retries = retryOptions.retries || 3;
  let interval = retryOptions.interval || 10000;
  let res = null;
  while (retries > 0) {
    try {
      res = requestGet(url, config);
      break;
    } catch (err) {
      if (retries == 1) {
        throw err;
      } else {
        console.log(err);
        console.log(`Retry in ${interval}ms`);
        browser.pause(interval);
      }
    }
    retries--;
  }
  return res;
}

// Use CommonJS syntax
exports.requestGet = requestGet;
exports.requestGetJson = requestGetJson;
exports.requestGetJsonAsync = requestGetJsonAsync;
exports.requestPost = requestPost;
exports.requestGetRetry = requestGetRetry;
exports.requestHead = requestHead;
