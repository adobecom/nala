/** @module common/support/functions */
const { requestGetJson, requestHead } = require('./request_sync');

/**
 *
 * @param {*} urlPath
 * @param {*} user
 */
const authorPageGet = (urlPath, user) => {
  let config = {};
  if (!urlPath.startsWith('http')) {
    config.baseURL = browser.config.profile.authorBaseUrl;
  }
  if (user) {
    let account = browser.config.authorAccounts[user];
    config.auth = {
      username: account.username,
      password: account.password
    };
  }
  return requestGetJson(urlPath, config);
};

/**
 *
 * @param {*} urlPath
 * @param {*} user
 */
 const authorHeadGet = (urlPath, user) => {
  let config = {};
  if (!urlPath.startsWith('http')) {
    config.baseURL = browser.config.profile.authorBaseUrl;
  }
  if (user) {
    let account = browser.config.authorAccounts[user];
    config.auth = {
      username: account.username,
      password: account.password
    };
  }
  return requestHead(urlPath, config);
};

const publishPageGet = (urlPath, user) => {
  let config = {};
  if (!urlPath.startsWith('http')) {
    let pubInstances = Object.keys(browser.config.profile).filter(x =>
      x.startsWith('publishBaseUrl')
    );
    let pubInstance =
      pubInstances[
        Math.floor(new Date().getTime() / 1000) % pubInstances.length
      ];
    config.baseURL = browser.config.profile[pubInstance];
  }
  if (user) {
    let account = browser.config.authorAccounts[user];
    config.auth = {
      username: account.username,
      password: account.password
    };
  }
  return requestGetJson(urlPath, config);
};

exports.authorPageGet = authorPageGet;
exports.authorHeadGet = authorHeadGet;
exports.publishPageGet = publishPageGet;