require('expect-webdriverio');
const { setWorldConstructor, World } = require('@cucumber/cucumber');
import logger from '@wdio/logger';
import { callStep } from './action/call_step';
import { findStep } from './action/find_step';

/** TheWorld represents an isolated context for each scenario */
class TheWorld extends World {
  /**
   * Constructor of TheWorld
   */
  constructor(options) {
    super(options);
    this.currPage = null;
    this.prevPage = null;
    this.log = logger('World');
  }

  /**
   * @type {Page}
   * @description Set the current page object
   */
  set page(value) {
    this.prevPage = this.currPage;
    this.currPage = value;
  }

  /**
   * @type {Page}
   * @description Get the current page object
   */
  get page() {
    return this.currPage;
  }

  /**
   * Call a step in a step defintion.
   *
   * @param {string} sentence The step to be run in a step definition.
   */
  step(sentence, table) {
    return callStep(sentence, table, this);
  }

  /**
   * Check if a step exists.
   *
   * @param {string} sentence The step to be checked for existence.
   */
  stepExists(sentence) {
    let stepDefs = findStep(sentence);
    return stepDefs.length > 0;
  }

  /**
   * Switch to the expected page context if it is not.
   *
   * @param {object} pageClass The expected page class for the current context.
   */
  context(pageClass) {
    if (!(this.page instanceof pageClass)) {
      this.page = new pageClass();
    }
  }
}

setWorldConstructor(TheWorld);

/**
 * Add custom commands to browser
 */
browser.addCommand('actionAndWait', (actionFn, waitFn, options) => {
  options = options || {};
  let retry = options.retry || 5;
  let interval = options.interval || 0;
  let handler = options.handler;
  while (retry-- > 0) {
    try {
      actionFn();
      waitFn();
      break;
    } catch (err) {
      console.log(`actionAndWait() failed: ${err.message}\nRetry...`);
      if (interval > 0) {
        browser.pause(interval);
      }
      if (handler) {
        handler();
      }
    }
  }
});

browser.addCommand('retryClick', (selector, options) => {
  options = options || {};
  let retry = options.retry || 5;
  let interval = options.interval || 500;
  while (retry-- > 0) {
    try {
      browser.$(selector).click();
      break;
    } catch (err) {
      if (interval > 0) {
        browser.pause(interval);
      }
    }
  }
});

browser.addCommand('logger', function(name) {
  return logger(name || 'browser');
});

browser.addCommand('highlightElement', function(element){
  // yellow background 
  browser.execute('arguments[0].style.backgroundColor = "#FDFF47";', element);
  // red outline
  browser.execute('arguments[0].style.outline = "#f00 solid 4px";', element);
});  
