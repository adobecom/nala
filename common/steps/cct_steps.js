/** @module common/steps */
const { Given } = require('@cucumber/cucumber');
const { Then } = require('@cucumber/cucumber');
const { When } = require('@cucumber/cucumber');

When(/^I click on the "([^\"]*)"$/, clickElement);

Then(/^I should see "([^\"]*)"(| not) displayed$/, elementDisplayed);

Then(/^I hover over the "([^\"]*)"$/, elementHover);

When(/^I set browser size to "([^\"]*)" x "([^\"]*)"$/, setBrowserSize);

Then(
  /^I verify that element "([^\"]*)" should have attribute "([^\"]*)" with value(| not) "([^\"]*)"$/,
  checkAttributeValue
);

Then(
  /^I verify that element "([^\"]*)" should have attribute "([^\"]*)" which does not contain "([^\"]*)"$/,
  checkAttributeNotContains
);

Then(/^I refresh the page$/, pageRefresh);

Then(/^I should see "([^\"]*)"(| not) visible on the page$/, elemVisible);

Then(/^I press "([^"]*)" key$/, pressKey);

Then(/^I enter "([^\"]*)" in the input field "([^\"]*)"$/, enterInputText);

Then(/^I drag and drop "([^\"]*)" element to "([^\"]*)"$/, dragAndDrop);

Then(/^I type "([^\"]*)" text$/, typeText);

Then(/^I select text from "([^\"]*)" field$/, selectText);

Then(/^I should see "([^\"]*)" "([^\"]*)" displayed$/, listElements);

Then(/^I scroll to the "([^\"]*)" element$/, scrollToElement);

Then(/^I should see "([^\"]*)" is(| not) enabled$/, elementEnabled);

Then(/^I should (|not )see at least 1 element with attributes(| inside an iframe):$/, shouldSeeAtLeastOneElementWithAttributes);

Then(/^I should see element with selector "([^\"]*)"$/, shouldSeeElementWithSelector);

Then(/^I focus and click the element "([^\"]*)"$/, iFocusAndClickTheElement);;

/**
 * Step Definition:
 * ```
 * /^I click on the "([^\"]*)"$/
 * ```
 * @param {string} elementName Element name
 */
function clickElement(elementName) {
  // // Workaround Safari 13 click issue
  // if (browser.capabilities.browserName === 'Safari') {
  //   browser.execute(
  //     'arguments[0].click();',
  //     this.page.checkElementName(elementName)
  //   );
  // } else {
  this.page.retryAction(5, 1000, () => {
    this.page.checkElementName(elementName).click();
  });
  // }
  // this.page.checkElementName(elementName).click();

  //browser.pause(2000);
}

/**
 * Step Definition:
 * ```
 * /^I should see "([^\"]*)"(| not) displayed$/
 * ```
 * @param {string} elementName Element name
 * @param {string} neg Negation
 */
function elementDisplayed(elementName, neg) {
  if (neg) {
    expect(this.page.checkElementName(elementName)).not.toBeDisplayed();
  } else {
    expect(this.page.checkElementName(elementName)).toBeDisplayed();
  }

  browser.pause(2000);
}

/**
 * Step Definition:
 * ```
 * /^I hover over the "([^\"]*)"$/
 * ```
 * @param {string} elementName Element name
 */
function elementHover(elementName) {
  if (browser.capabilities.browserName === 'internet explorer') {
    this.page.checkElementName(elementName).scrollIntoView();
    // this.page.checkElementName(elementName).moveTo();
    this.page.checkElementName(elementName).click();
  } else {
    // this.page.checkElementName(elementName).scrollIntoView();
    this.page.checkElementName(elementName).moveTo();
  }

  browser.pause(2000);
}

/**
 * Step Definition:
 * ```
 * /^I set browser size to "([^\"]*)" x "([^\"]*)"$/
 * ```
 * @param {string} width Width size to set the browser to
 * @param {string} height Height size to set the browser to
 */
function setBrowserSize(width, height) {
  // On Windows, there is a scroll bar. Need to an adjustment.
  browser.execute("document.querySelector('html').style.overflowY = 'hidden'");
  width = parseInt(width);
  height = parseInt(height);
  browser.setWindowSize(width, height);
}

/**
 * Step Definition:
 * ```
 * /^I verify that element "([^\"]*)" should have attribute "([^\"]*)" with value(| not) "([^\"]*)"$/
 * ```
 * @param {string} elementName Element name
 * @param {string} attributeName Attribute name
 * @param {string} neg Negation
 * @param {string} attributeValue Attribute value
 */
function checkAttributeValue(elementName, attributeName, neg, attributeValue) {
  if (this.page.checkElementName(elementName).getAttribute(attributeName)) {
    if (neg) {
      expect(
        this.page.checkElementName(elementName).getAttribute(attributeName)
      ).not.toEqual(attributeValue);
    } else {
      expect(
        this.page.checkElementName(elementName).getAttribute(attributeName)
      ).toContain(attributeValue);
    }
  } else {
    if (neg) {
      expect(
        this.page.checkElementName(elementName).getProperty(attributeName)
      ).not.toEqual(attributeValue);
    } else {
      expect(
        this.page.checkElementName(elementName).getProperty(attributeName)
      ).toContain(attributeValue);
      }
  }

  browser.pause(2000);
}

/**
 * Step Definition:
 * ```
 * /^I verify that element "([^\"]*)" should have attribute "([^\"]*)" which does not contain "([^\"]*)"$/
 * ```
 * @param {string} elementName Element name
 * @param {string} attributeName Attribute name
 * @param {string} attributeValue Attribute value
 */
function checkAttributeNotContains(elementName, attributeName, attributeValue) {
  const element = this.page.checkElementName(elementName);
  if (element.getAttribute(attributeName)) {
    expect(element.getAttribute(attributeName)).toEqual(
      expect.not.stringContaining(attributeValue)
    );
  } else {
    expect(
      element.getProperty(attributeName).notContains(attributeValue)
    ).toBeTruthy();
  }

  browser.pause(2000);
}

/**
 * Step Definition:
 * ```
 * /^I refresh the page$/
 * ```
 */
function pageRefresh() {
  browser.refresh();
  browser.pause(2000);
}

/**
 * Step Definition:
 * ```
 * /^I should see "([^\"]*)"(| not) visible on the page$/
 * ```
 * @param {string} elementName Element name
 * @param {string} neg Negation
 */
function elemVisible(elementName, neg) {
  let elem = this.page.checkElementName(elementName);

  let inView = browser.execute(
    'var elem = arguments[0],' +
      '  box = elem.getBoundingClientRect(),    ' +
      '  cx = box.left + box.width / 2,         ' +
      '  cy = box.top + box.height / 2,         ' +
      '  e = document.elementFromPoint(cx, cy); ' +
      'for (; e; e = e.parentElement) {         ' +
      '  if (e === elem)                        ' +
      '    return true;                         ' +
      '}                                        ' +
      'return false;                            ',
    elem
  );

  if (neg) {
    expect(inView).toEqual(false);
  } else {
    expect(inView).toEqual(true);
  }

  browser.pause(2000);
}

/**
 * Step Definition:
 * ```
 * /^I press "([^"]*)" key$/
 * ```
 * @param {string} key Keyboard character
 */
function pressKey(key) {
  browser.keys(key);
}

/**
 * Step Definition:
 * ```
 * /^I enter "([^\"]*)" in the input field ([^\"]*)"$/
 * ```
 * @param {string} inputText text to write into input field
 * @param {string} inputField field to write the text
 */
function enterInputText(inputText, inputField) {
  this.page[inputField].setValue(inputText);
  // this.page.ModalLicensesInput.setValue(inputText);
  browser.pause(2000);
}

/**
 * Step Definition:
 * ```
 * /^I drag and drop  "([^\"]*)" element to ([^\"]*)"$/
 * ```
 * @param {string} element element to drag and drop
 * @param {string} target target to drop
 */
function dragAndDrop(element, target) {
  this.page[element].dragAndDrop(this.page[target]);
  // this.page.ModalLicensesInput.setValue(inputText);
  browser.pause(2000);
}

/**
 * Step Definition:
 * ```
 * /^I type "([^\"]*)" text$/
 * ```
 * @param {string} inputText text to write
 */
function typeText(inputText) {
  // let keySeq = inputText.replace("/n", keys("Enter"));
  browser.keys(inputText);
  browser.pause(2000);
}

/**
 * Step Definition:
 * ```
 * /^I select text from "([^\"]*)" field$/
 * ```
 * @param {string} inputText text element
 */
function selectText(inputText) {
  this.page[inputText].click();
  browser.keys(['Shift', 'ArrowUp']);
  // browser.keys("ArrowDown");
  browser.keys('Shift');

  browser.pause(2000);
}

/**
 * Step Definition:
 * ```
 * /^I should see "([^\"]*)" "([^\"]*)" displayed$/
 * ```
 * @param {string} number Number of elements
 * @param {element} elementName Element
 */
function listElements(number, elementName) {
  let cards = this.page[elementName].filter(function(e) {
    return e.isDisplayed() === true;
  });

  expect(cards.length).toEqual(parseInt(number));

  browser.pause(2000);
}

/**
 * Step Definition:
 * ```
 * /^I scroll to the "([^\"]*)" element$/
 * ```
 * @param {string} element Element name
 */
function scrollToElement(element) {
  this.page[element].scrollIntoView();
  browser.pause(2000);
}

/**
 * Step Definition:
 * ```
 * /^I should see "([^\"]*)" is(| not) enabled$/
 * ```
 * @param {string} element Element name
 * @param {string} neg Negation
 */
function elementEnabled(element, neg) {
  if (neg) {
    expect(this.page.checkElementName(element).isEnabled()).toEqual(false);
  } else {
    expect(this.page.checkElementName(element).isEnabled()).toEqual(true);
  }
  browser.pause(2000);
}

function shouldSeeElementWithSelector(selector) {
  let elem = $(selector);
  expect(elem).toBeDisplayed();
}

function iFocusAndClickTheElement(selector) {
  let elem = this.page.checkElementName(selector);
  browser.execute('arguments[0].click()', elem);
}

/**
 * Step Definition:
 * ```
 * /^I should (|not )see at least 1 element with attributes(| inside an iframe):$/
 * ```
 */
function shouldSeeAtLeastOneElementWithAttributes(neg, frame, table) {
  // Use XPath
  // Using CSS need to handle id and class specially
  let rawTable = table.rawTable;
  let attribs = [];
  for (let row of rawTable) {
    if (row.length === 2) {
      attribs.push(`@${row[0]}=${quoteText(row[1])}`);
    } else if (row.length === 3) {
      if (row[1] === '=') {
        attribs.push(`@${row[0]}=${quoteText(row[2])}`);
      } else {
        attribs.push(`${row[1]}(@${row[0]},${quoteText(row[2])})`);
      }
    } else {
      throw 'Invalid attribute table';
    }
  }
  attribs = attribs.join(' and ');
  let xpath = `//*[${attribs}]`;
  if (frame != '') {
    switchToVideoIframe();
  }
  let elems = browser.$$(xpath);
  try {
    if (neg === '') {
      expect(elems.length).toBeGreaterThanOrEqual(1);
    } else {
      expect(elems.length).toEqual(0);
    }
  } catch (e) {
    e.message += `\nFinding elements: "${xpath}"`;
    throw e;
  }
}

function quoteText(text) {
  if (text.includes('"')) {
    return `'${text}'`;
  } else {
    return `"${text}"`;
  }
}
