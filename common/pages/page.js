import { Section } from './section';

const urljoin = require('url-join');
const querystring = require('querystring');
const { JSDOM } = require('jsdom');
const wgxpath = require('wgxpath');
const axios = require('axios');

/** Class representing a page */
export class Page extends Section {
  /**
   * Create a page
   * @param {string} urlPath URL path
   * @param {object} options
   * @param {string} options.urlQuery URL query string
   * @param {string} options.urlFrag URL fragment
   * @param {string} options.authorUrlPath URL path on AEM author
   */
  constructor(urlPath, options) {
    super();
    this._urlPath = urlPath || '/';
    options = options || {};
    this._urlQuery = options.urlQuery || {};
    this._urlFrag = options.urlFrag || null;
    this._headers = options.headers;
    this._authorUrlPath = options.authorUrlPath;
  }

  /**
   * @type {string}
   * @description URL path
   */
  get urlPath() {
    return this._urlPath;
  }

  /**
   * @type {string}
   * @description URL path on AEM author instance
   */
  get authorUrlPath() {
    return this._authorUrlPath;
  }

  /**
   * @type {string}
   * @description URL query string
   */
  get urlQuery() {
    return this._urlQuery;
  }

  /**
   * @type {string}
   * @description URL fragment
   */
  get urlFrag() {
    return this._urlFrag;
  }

  /**
   * @type {string}
   * @description URL request headers
   */
  get headers() {
    return this._headers;
  }

  /**
   * @type {string}
   * @description HTML page source
   */
  get pageSource() {
    return browser.getPageSource();
  }

  /**
   * Open a page at the path with query string.
   * If `path` starts with "http", it will not prefix `baseUrl` from the current profile
   * @param {string} path URL path
   * @param {string} query URL query string
   * @param {string} frag URL fragment
   * @param {object} headers Request headers
   */
  open(path, query, frag, headers) {
    this._urlPath = path || this.urlPath;
    this._urlQuery = query || this.urlQuery;
    this._urlFrag = frag || this.urlFrag;
    this._headers = headers || this.headers;
    // remove value is 'none'
    let params = Object.keys(this._urlQuery)
      .filter(key => this._urlQuery[key] != 'none')
      .reduce((obj, key) => {
        obj[key] = this._urlQuery[key];
        return obj;
      }, {});
    // if path already has fragment
    if (this._urlPath.includes('#')) {
      let parts = this._urlPath.split('#');
      this._urlPath = parts[0];
      this._urlFrag = parts[1];
    }
    // if path already has query params
    if (this._urlPath.includes('?')) {
      let parts = this._urlPath.split('?');
      this._urlPath = parts[0];
      Object.assign(params, querystring.decode(parts[1]));
    }
    // if query string for preview
    if (
      browser.config.profile.aem &&
      browser.config.profile[`${browser.config.profile.aem}Query`]
    ) {
      Object.assign(
        params,
        querystring.decode(
          browser.config.profile[`${browser.config.profile.aem}Query`]
        )
      );
    }
    let url = this._urlPath;
    if (
      ['preview', 'author'].includes(browser.config.profile.aem) &&
      this._authorUrlPath
    ) {
      url = this._authorUrlPath;
    }
    let qstr = querystring.encode(params);

    if (!url.startsWith('http')) {
      url = urljoin(browser.options.baseUrl, url);
    }
    url = url + (qstr ? `?${qstr}` : '');
    url = url + (this._urlFrag == null ? '' : `#${this._urlFrag}`);

    if (process.env.DEBUG) {
      console.log(this.constructor.name);
      console.log(url);
    }
    if (this._headers) {
      try {
        let pupper = browser.getPuppeteer();
        browser.call(async () => {
          const [page] = await pupper.pages();
          page.setExtraHTTPHeaders(this._headers);   
        });
      } catch (err) {
        err.message +=
          '\n' +
          'Setting page request headers is supported only for Chrome\n' +
          'Please use --devtools to enable it';
        throw err;
      }
    }
    if (browser.config.profile.oneTrustLocale) {
      let countryCode = browser.config.profile.oneTrustLocale;
      try {
        let pupper = browser.getPuppeteer();
        browser.call(async () => {
          const [page] = await pupper.pages();

          await page.setRequestInterception(true);

          page.on("request", interceptedRequest => {
            let url =  interceptedRequest.url();

            if (url.startsWith("https://geo2.adobe.com")) {
              url += `&country=${countryCode}`;
              interceptedRequest.continue({url});
            } else if (url.startsWith("https://geolocation.onetrust.com")) {
               axios.get(url).then(res => {
                let body = res.data;
                body.country = countryCode;
                interceptedRequest.respond({
                  body: JSON.stringify(body)
                });
              });
            } else {
              interceptedRequest.continue();
            }
          });
        });
      } catch (err) {
        err.message +=
          '\n' +
          'Intercepting network is supported only for Chrome\n' +
          'Please use --devtools to enable it';
        throw err;
      }  
    }
    browser.url(url);
  }

  /**
   * Wait for `condition` becoming true.
   * @param {function} condition
   * @param {number} timeout Wait timeout. Default to 10000
   * @param {string} timeoutMsg Timeout message.
   * @param {number} interval Interval for check the condition
   */
  waitUntil(condition, timeout = 10000, timeoutMsg, interval) {
    browser.waitUntil(condition, { timeout: timeout, interval: interval, timeoutMsg: timeoutMsg });
  }

  /**
   * Check if an element exists in the page
   * @param {string} elementName Element name
   */
  checkElementName(elementName) {
    let element = this[elementName];
    if (element == null) {
      throw `The element "${elementName}" is not found in the page "${this.constructor.name}"`;
    } else if (Array.isArray(element)) {
      if (element.length > 0) {
        element = element[0];
      } else {
        element = undefined;
      }
    }
    return element;
  }

  /**
   * Wait for an element existing or not.
   * @param {string} elementName Element name
   * @param {number} ms Timeout in milliseconds
   * @param {boolean} reverse When true, wait for the element not existing
   */
  waitForExist(elementName, ms = 10000, reverse = false) {
    this.checkElementName(elementName).waitForExist({ timeout: ms, reverse: reverse });
  }

  /**
   *  Wait for an element displaying or not
   * @param {string} elementName Element name
   * @param {number} timeout Timeout in milliseconds
   * @param {boolean} reverse When true, wait for the element not displaying
   */
  waitForDisplayed(elementName, timeout = 10000, reverse = false) {
    let elem = this.checkElementName(elementName);
    elem.waitForDisplayed({timeout: timeout, reverse: reverse});  
  }

  /**
   * Wait for an element enabled or not
   * @param {string} elementName Element name
   * @param {number} ms Timeout in milliseconds
   * @param {boolean} reverse When true, wait for the element not enabled
   */
  waitForEnabled(elementName, ms, reverse = false) {
    this.checkElementName(elementName).waitForEnabled({ timeout: ms, reverse: reverse });
  }

  /**
   * Wait for an element becoming invisible
   * @param {string} elementName Element name
   * @param {number} ms Timeout in milliseconds
   */
  waitForInvisible(elementName, ms) {
    if (this[elementName].isDisplayed()) {
      this[elementName].waitForDisplayed({timeout: ms, reverse: true });
    }
  }

  /**
   * Click an element
   * @param {string} elementName Element name
   * @param {number} ms Timeout waiting for enabled
   */
  click(elementName, ms = 10000) {
    this.waitForEnabled(elementName, ms);
    let count = 0;
    while (count < 10) {
      try {
        this[elementName].click();
        break;
      } catch (err) {
        count++;
        browser.pause(1000);
      }
    }
  }

  /**
   * Click an element and wait until current URL changed
   * @param {string} element
   */
  clickToNavigate(element) {
    // Somehow with selenium-standalone, getUrl following click causes
    // java.net.ConnectException: Connection refused (Connection refused)
    // Use pause to keep it safe.
    let urlFrom = browser.getUrl();
    let urlTo = urlFrom;
    let retry = 3;
    while (urlTo === urlFrom && retry-- > 0) {
      browser.pause(500);
      try {
        if (typeof element === 'string') {
          this[element].click();
        } else {
          element.click();
        }
      } catch (err) {}
      browser.pause(500);
      urlTo = browser.getUrl();
    }
  }

  /**
   * Click `clickElement` and wait for `waitElement` to be displayed or not
   * @param {string} clickElement Element name to be clicked
   * @param {string} waitElement Element name to be waited
   * @param {object} options
   * @param {boolean} options.reverse If true, wait for `waitElement` to disapper
   * @param {boolean} options.scroll If true, scroll `clickElement` into view
   * @param {number} options.retry Number of retries
   * @param {number} options.interval Interval in millisecond between retries
   * @param {function} options.handler Callback when doing a retry
   */
  clickAndWait(clickElement, waitElement, options) {
    options = options || {};
    let reverse = options.reverse || false; // Default value is false
    let scroll = options.scroll ?? true; // Default value is true
    let retry = options.retry || 5;
    let interval = options.interval || 1000;
    let handler = options.handler;
    while (retry-- > 0) {
      try {
        if (scroll) this[clickElement].scrollIntoView();
        this[clickElement].click();
        this[waitElement].waitForDisplayed({interval: interval, reverse: reverse });
        break;
      } catch (err) {
        console.log(
          `"${waitElement}" is ${
            reverse ? '' : 'not '
          }displayed, retry clicking "${clickElement}"`
        );
        if (handler) {
          handler();
        }
      }
    }
  }

  /**
   * set value on an element
   * @param {string} elementName Element name
   * @param {string} value value to be set on the element
   * @param {number} ms Timeout waiting for enabled
   */
  setValue(elementName, value, ms = 10000) {
    this.waitForEnabled(elementName, ms);
    let count = 0;
    while (count < 10) {
      try {
        this[elementName].setValue(value);
        break;
      } catch (err) {
        count++;
        browser.pause(1000);
      }
    }
  }

  /**
   * Parse HTML page source and return `src` values of script tags
   * @return {string[]}
   */
  getScriptFiles() {
    const dom = new JSDOM();
    const domParser = new dom.window.DOMParser();
    const doc = domParser.parseFromString(this.pageSource, 'text/html');
    const result = doc.evaluate(
      '//script',
      doc,
      null,
      wgxpath.XPathResultType.ANY_TYPE,
      null
    );
    let scripts = [];
    let node = undefined;
    while ((node = result.iterateNext())) {
      if (node.src) {
        scripts.push(node.src);
      }
    }
    return scripts;
  }

  /**
   * Helper function to do retrying
   * @param {number} retries Number of retries
   * @param {number} interval Interval in milliseconds between retries
   * @param {functioin} callback Callback to be retried
   */
  retryExpect(retries = 10, interval = 1000, callback) {
    while (retries-- > 0) {
      browser.pause(interval);
      callback();
    }
  }

  /**
   * Helper function to do retrying
   * @param {number} retries Number of retries
   * @param {number} interval Interval in milliseconds between retries
   * @param {functioin} callback Callback to be retried
   */
   retryAction(retries = 10, interval = 1000, callback) {
    while (retries > 0) {
      try {
        callback();
        break;
      } catch (err) {
        if (retries > 0) {
          retries--;
          browser.pause(interval);
          continue;
        } else {
          throw err;
        }
      }
    }
  }
}
