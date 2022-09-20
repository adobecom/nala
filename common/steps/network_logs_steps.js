/** @module common/steps */
const { Given } = require('@cucumber/cucumber');
const { When } = require('@cucumber/cucumber');
const { Then } = require('@cucumber/cucumber');
const fs = require('fs');

Then(/^I should see the HTTP response headers:$/, iShouldSeeResponseHeaders);

Then(
  /^I should not see any non-200 response (?:status|code)$/,
  iShouldNotSeeNon200ResponseStatus
);

Then(
  /^I should see a 200 response (?:status|code)$/,
  iShouldSee200ResponseStatus
);

function parseDriverLog(message) {
  // Get WebSocket for now
  let match = message.match(/DevTools WebSocket Event: (\S+) (\S+) /);
  if (match) {
    let event = {};
    event.name = match[1];
    event.id = match[2];
    event.details = message.substring(match[0].length);
    event.details = JSON.parse(event.details);
    return event;
  }
}

function parsePerformanceLog(message) {
  return JSON.parse(message).message;
}

function getUrlResponseHeader(url, logs) {
  for (let log of logs) {
    if (log.method === 'Network.responseReceived') {
      if (url === log.params.response.url) {
        return log.params.response.headers;
      }
    }
  }
}

function getNetworkLogs() {
  if (!this.networkLogs) {
    this.networkLogs = [];
  }
  let logs = browser.getLogs('performance');
  let parsedLogs = [];
  for (let log of logs) {
    let parsedLog = parsePerformanceLog(log.message);
    if (parsedLog) {
      parsedLogs.push(parsedLog);
    }
  }
  this.networkLogs.push(...parsedLogs);
}

/**
 * Step Definition:
 * ```
 * /^I should see the HTTP response headers:$/
 * ```
 * @param {string[][]} table Table of response headers
 */
function iShouldSeeResponseHeaders(table) {
  getNetworkLogs.call(this);
  let expected = table.rawTable;

  let headers = getUrlResponseHeader(browser.getUrl(), this.networkLogs);

  let errMsgs = [];
  let rowSize = expected[0].length;
  if (rowSize === 2) {
    for (let [key, value] of expected) {
      if (headers[key] !== value) {
        errMsgs.push(
          `Expect "${value}" for the header "${key}", but the actual is "${headers[key]}"`
        );
      }
    }
  } else if (rowSize === 3) {
    for (let [key, op, value] of expected) {
      if (!headers[key][op](value)) {
        errMsgs.push(
          `Expect "${headers[key]}", the header "${key}", ${op} "${value}"`
        );
      }
    }
  }
  errMsgs = errMsgs.join('\n');
  if (errMsgs) {
    throw errMsgs;
  }
}

/**
 * Step Definition:
 * ```
 * /^I should not see any non-200 response status$/
 * ```
 */
function iShouldNotSeeNon200ResponseStatus() {
  getNetworkLogs.call(this);
  let non200s = [];
  for (let log of this.networkLogs) {
    if (
      log.method === 'Network.responseReceived' &&
      (log.params.response.status / 100) >> 0 != 2
    ) {
      non200s.push(log);
    }
  }
  if (non200s.length > 0) {
    non200s.forEach(x => console.log(x));
  }
  expect(non200s).toHaveLength(0);
}

/**
 * Step Definition:
 * ```
 * /^I should see a 200 response (?:status|code)$/
 * ```
 */
function iShouldSee200ResponseStatus() {
  getNetworkLogs.call(this);
  let url = browser.getUrl()
  for (let log of this.networkLogs) {
    if (log.method === 'Network.responseReceived') {
      if (url === log.params.response.url) {
        expect(log.params.response.status).toEqual(200);
      }
    }
  }  
}
