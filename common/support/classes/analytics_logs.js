const querystring = require('querystring');

/**
 * The class object stores analytics logs coming from performance logs.
 */
class AnalyticsLogs {
  /**
   * Constructor
   */
  constructor() {
    this.logs = [];
    this.postData = [];
    this.logger = browser.logger(this.constructor.name);
    this.eventOrder = [];
    this.suiteId = '';
  }

  /**
   * @type {number}
   * @description The length of analytics logs stored
   */
  get length() {
    return this.postData.length;
  }

  /**
   * Append logs coming from performance logs
   * @param {object[]} logs 
   */
  appendLogs(logs) {
    this.logs.push(...logs);
    for (let log of logs) {
      let msg = JSON.parse(log.message).message;
      let method = msg.method;
      if (method === 'Network.requestWillBeSent') {
        let params = msg.params;
        let request = params.request;
        let m = request.url.match(
          /^https:\/\/sstats.adobe.com\/b\/ss\/([a-z,]+).*/
        );
        if (m) {
          this.suiteId = m[1];
          if (request.method === 'POST' && request.postData) {
            let logItem = this.decodeFormData(request.postData);
            this.logger.info(JSON.stringify(logItem, null, 2));
            this.postData.push(logItem);
          }
        }
      }
    }
  }

  /**
   * Decode the raw data coming for performance logs
   * @param {string} data Raw data from performance logs
   */
  decodeFormData(data) {
    let entries = data.split('&');
    let result = {};
    let ns = [];
    for (let entry of entries) {
      let [key, value] = entry.split('=');
      if (key.endsWith('.')) {
        ns.push(key.slice(0, key.length - 1));
      } else if (key.startsWith('.')) {
        ns.pop();
      } else if (key.includes('.:')) {
        let [key2, value2] = key.split('.:', 2);
        ns.push(key2);
        key = '';
        value = value2;
      }
      if (value) {
        ns.push(key);
        result[ns.join('.')] = decodeURIComponent(value);
        ns.pop();
      }
    }
    return result;
  }

  /**
   * Compare actual with expected
   * @param {object} actual actual value
   * @param {object} expected expected value
   */
  compareOne(actual, expected) {
    let messages = [];
    for (let key in expected) {
      let exp = expected[key];
      if (key in actual) {
        
        let cmpResult = undefined;
        let op = exp.cmp || '=';
        // console.log('comparing actual key: ' + key);
        if (op === '=') {
          cmpResult = actual[key] === exp.value;
        } else if (op === '>') {
          cmpResult = parseFloat(actual[key]) > parseFloat(exp.value);
        } else if (op === '<') {
          cmpResult = parseFloat(actual[key]) < parseFloat(exp.value);
        } else if (op === '>=') {
          cmpResult = parseFloat(actual[key]) >= parseFloat(exp.value);
        } else if (op === '<=') {
          cmpResult = parseFloat(actual[key]) <= parseFloat(exp.value);
        } else {
          throw `Unsupported comparator ${op}`;
        }
        if (cmpResult === false) {
          console.log('cmpResult is false!');
          messages.push(
            `${key}: actual "${actual[key]}" ${op} expect "${exp.value}"`
          );
          console.log(`${key}: actual "${actual[key]}" ${op} expect "${exp.value}"`);
        } else {
          // console.log('cmpResult is true');
        }
      } else {
        console.log(`${key} is not found`);
        messages.push(`${key} is not found`);
      }
    }
    return messages;
  }

  /**
   * Handle expect value with a comparator
   * @param {object[][]} table 
   */
  tableToOne(table) {
    let expected = {};
    for (let x of table) {
      if (x.key in expected) {
        throw `There is a duplicated key "${x.key}"`;
      }
      expected[x.key] = { value: x.value, cmp: x.cmp };
    }
    return expected;
  }

  /**
   * Search a range of logs to find the expected log
   * @param {number} range Range of logs to be searched
   * @param {object} expected Expected value
   */
  compareMultiple(range, expected) {
    let messages = [];
    for (let i = 0; i < Math.min(range, this.postData.length); i++) {
      let actual = this.postData[this.postData.length - i - 1];
      let tmpMsgs = this.compareOne(actual, expected);
      if (tmpMsgs.length === 0) {
        // matched
        this.eventOrder.push(this.postData.length - i - 1);
        return [];
      } else {
        messages.push(`Analytics log item: ${i}`);
        messages.push(...tmpMsgs);
      }
    }
    return messages;
  }

  /**
   * Compare expect values with logs 
   * @param {object[][]} table Table of expected values
   * @param {object} options Options for the comparison
   * @param {number} options.ordinal The ordinal position of the log to be verified 
   * @param {number} options.range The range of logs to be verified
   * @param {boolean} options.all Verify all logs
   */
  compare(table, options) {
    options = options || {};
    let range = options.range;
    let ordinal = options.ordinal;
    let all = options.all;
    all = all == null ? true : false;

    console.log("Total logs: " + this.postData.length);

    if (ordinal) {
      let expected = this.tableToOne(table);
      let actual = this.postData[this.postData.length - ordinal];
      return this.compareOne(actual, expected);
    } else if (range && all === true) {
      let expected = this.tableToOne(table);
      return this.compareMultiple(range, expected);
    } else if (range && all == false) {
      let messages = [];
      for (let entry of table) {
        let expected = {};
        expected[entry.key] = { value: entry.value, cmp: entry.cmp };
        let tmpMsgs = this.compareMultiple(range, expected);
        if (tmpMsgs.length > 0) {
          messages.push(`${entry.key}: expect "${entry.value}", but not found`);
        }
      }
      return messages;
    } else {
      throw 'Please specify "range" or "ordinal" in options';
    }
  }
}

module.exports = {
  AnalyticsLogs
};
