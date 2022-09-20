import { Section } from './section';

export class CompConfigurationSection extends Section {
  constructor() {
    super();
    this.buildProps({
      tabPanels:
        '$$.coral-TabPanel-tab,coral-Dialog coral-tab-label,coral-tab-label',
      selectListOverlay: '.coral3-Select-overlay.is-open',
      selectList:
        '.coral3-Select-overlay.is-open .coral3-SelectList.coral3-Select-selectList',
      dialogHeader: '.cq-dialog-header',
      tabLists: '$$.cq-dialog-content *[role="tablist"]',
      overlays: '$$coral-overlay.is-open',
      selectionDialog: '.granite-pickerdialog.coral3-Dialog.is-open'
    });
  }

  getTabPanel(name) {
    return this.tabPanels.find(x => x.getText() === name);
  }

  selectTab(name) {
    let tab = this.getTabPanel(name);
    if (tab == null) {
      throw `The "${name}" tab is not found`;
    }
    tab.click();
  }

  /**
   * Get the XPath to the label in Configuration Dialog
   * If there are multiple instances of the same label name,
   * use the format <parent>:<label>
   * If there are multiple inputs for the same label name, (See image spacing)
   * use the format <label>[index]
   * @param {*} label
   */
  getLabelXpath(label) {
    if (label === '') {
      return '';
    }

    // Handle <label>[index] format
    let m = label.match(/(.+)\[\d+\]/);
    if (m) {
      label = m[1];
    }

    // In video component, there is a label "https://www.youtube.com/embed/"
    let labels = label.split(':');
    if (label.startsWith('http')) {
      labels = [label];
    }

    if (labels.length > 1) {
      if (parseInt(labels[1])) {
        // Handle "Border:1". There may be hidden elements.
        let sibOrder = parseInt(labels[1]);
        return `//*[text()="${labels[0]}"]/following-sibling::*[${sibOrder}]/*[1]`;
      } else {
        return `//*[text()="${labels[0]}"]/following-sibling::*//label[text()="${labels[1]}"]`;
      }
    } else {
      return `//*[self::label or self::h3 or self::h2][text()="${label}"]`;
    }
  }

  get activeTab() {
    if (this.tabLists.length === 0) {
      return '//*[contains(@class,"cq-dialog-content")]';
    } else {
      return '//coral-dialog//*[contains(@class,"is-active") or contains(@class,"is-selected")]';
    }
  }

  waitForLabel(label) {
    if (label !== '') {
      let normLabel = label;
      let m = label.match(/([^\[]+)\[\d+\]/);
      if (m) {
        normLabel = m[1];
      }
      m = label.match(/[^:]+:([^:]+)/);
      if (m) {
        normLabel = m[1];
      }
      if (!parseInt(normLabel)) {
        // If it's not an integer. The label could be "Border:1" to get first sibling
        browser.waitUntil(
          () =>
            browser
              .$$(`${this.activeTab}//*[contains(text(), "${normLabel}")]`)
              .map(x => x.isDisplayed())
              .some(x => x === true),
          20000
        );
      }
    }
  }

  getCheckbox(text, parent) {
    let xpaths = [
      // Image
      `//span[text()="${text}"]/../input`,
      // Accordion
      `//*[text()="${text}"]/ancestor::coral-checkbox/input`
    ];
    let elem = [];
    let visibleElem = null;
    for (let xpath of xpaths) {
      if (parent && typeof parent === 'string') {
        elem = browser.$$(`${parent}${xpath}`);
      } else {
        parent = parent || browser;
        elem = parent.$$(xpath);
      }
      elem.forEach(el => {
        if (el.isDisplayed()) {
          visibleElem = el;
        }
      });
      if (visibleElem != null) {
        break;
      }
    }
    return visibleElem;
  }

  selectCheckbox(label, state = true, parent) {
    let checkbox = this.getCheckbox(label, parent);
    let value = checkbox.isSelected();
    if (
      (value === false && state === true) ||
      (value === true && state === false)
    ) {
      checkbox.click();
    }
  }

  getFileUpload(label) {
    let labelXpath = this.getLabelXpath(label);
    let elem = browser.$(`${this.activeTab}${labelXpath}/../coral-fileupload`);
    return elem;
  }

  getInputField(label, parent) {
    let labelXpath = this.getLabelXpath(label);
    //let xpath = `${labelXpath}/following::*[self::input or self::textarea][1]`;
    let xpath = `${labelXpath}/..//*[self::input or self::textarea or self::div[contains(@class, "cq-RichText-editable")]]`;
    if (parent && typeof parent === 'string') {
      xpath = `${parent}${xpath}`;
      parent = null;
    }
    parent = parent || browser;
    let elems = parent.$$(xpath);
    elems = elems.filter(x => x.isDisplayed());
    return elems[0];
  }

  getMultiplePicker(label, parent) {
    let labelXpath = this.getLabelXpath(label);
    let xpath = `${this.activeTab}${labelXpath}/following-sibling::*[contains(@class, 'cq-ui-tagfield')][1]`;
    if (parent && typeof parent === 'string') {
      xpath = `${parent}${xpath}`;
      parent = null;
    }
    parent = parent || browser;
    let elems = parent.$$(xpath);
    elems = elems.filter(x => x.isDisplayed());
    return elems[0];
  }

  setTagPicker(label, value, item) {
    let labelXpath = this.getLabelXpath(label);
    let xpath = null;
    if (labelXpath) {
      xpath = `${labelXpath}/following-sibling::*[contains(@class, 'cq-ui-tagfield')][1]//input`;
    } else {
      xpath = '//*[contains(@class, "cq-ui-tagfield")]//input';
    }
    xpath = (item ? item : '') + xpath;
    xpath = `${this.activeTab}${xpath}`;
    let elem = browser.$(xpath);
    elem.setValue(value);
    /*  
    // The following code is used to select tags from a UI tree.
    // Not sure if we need it.      
    let xpath = this.getLabelXpath(label);
    if (browser.$(`${xpath}/..//*[contains(@class,"coral3-Button")]`).isDisplayed()) {
      browser.$(`${xpath}/..//*[contains(@class,"coral3-Button")]`).click();
      browser.waitUntil(() => this.selectionDialog.isDisplayed());
      let tags = value.split(':');
      let tag_pathes = tags[1].split('/');
      if (tag_pathes.length == 0) {
        xpath = `//coral-columnview-item-content[contains(text(), "${tags[0].trim()}")]`;
        browser.$(xpath).click();
        browser.$(`${xpath}/preceding::*[contains(@class,'foundation-collection-item-thumbnail')][1]`).click();
      } else {
        browser.$(`//coral-columnview-item-content[contains(text(), "${tags[0].trim()}")]`).click();
        for(let i = 0; i < tag_pathes.length; i++) {
          xpath = `//coral-columnview-item-content[contains(text(), "${tag_pathes[i].trim()}")]`;
          browser.$(xpath).click();
        }
        browser.$(`${xpath}/preceding::*[contains(@class,'foundation-collection-item-thumbnail')][1]`).click();
      }

      browser.$(`//coral-button-label[contains(text(), "Select")]`).click();
    }
*/
  }

  setMultiplePicker(label, value, item) {
    this.setTagPicker(label, value + '\n', item);
  }

  setSinglePicker(label, value, item) {
    this.setTagPicker(label, value, item);
  }

  getSelectFieldXPath(label) {
    if (label === '') {
      return ['//coral-select', 0];
    } else {
      let m = label.match(/^(.+)\[(\d+)\]$/);
      let index = 0;
      if (m) {
        label = m[1];
        index = parseInt(m[2]);
      }
      let xpath = this.getLabelXpath(label);
      // handle "Border:3"
      if (xpath.endsWith('/*[1]')) {
        xpath += '/parent::coral-select';
      } else {
        xpath += '/..//coral-select';
      }
      return [xpath, index];
    }
  }

  getSelectField(label, item) {
    let [xpath, index] = this.getSelectFieldXPath(label);
    xpath = (item ? item : '') + xpath;
    xpath = `(${this.activeTab}${xpath})[${index + 1}]`;
    let elem = browser.$(xpath);
    // handle config in subnav tab
    if (!elem.isDisplayed()) {
      xpath = this.getLabelXpath(label) + '/..//select';
      elem = browser.$$(xpath).filter(x => x.isDisplayed())[0];
    }

    return elem ? elem : null;
  }

  getSearchSelectFieldXPath(label) {
    if (label === '') {
      return ['//div[contains(@class,"coral-Form-field  dexter-Dialog-select--ctaStyle granite-autocomplete coral-Autocomplete")]', 0];
    } else {
      let m = label.match(/^(.+)\[(\d+)\]$/);
      let index = 0;
      if (m) {
        label = m[1];
        index = parseInt(m[2]);
      }
      let xpath = this.getLabelXpath(label);
      // handle "Border:3"
      if (xpath.endsWith('/*[1]')) {
        xpath += '/parent::coral-select';
      } else {
        xpath += '/../div';
      }
      return [xpath, index];
    }
  }

  getSearchSelectField(label, item) {
    let [xpath, index] = this.getSearchSelectFieldXPath(label);
    xpath = (item ? item : '') + xpath;
    xpath = `(${this.activeTab}${xpath})[${index + 1}]`;
    let elem = browser.$(xpath);
    // handle config in subnav tab
    if (!elem.isDisplayed()) {
      xpath = this.getLabelXpath(label) + '/..//select';
      elem = browser.$$(xpath).filter(x => x.isDisplayed())[0];
    }

    return elem ? elem : null;
  }

  setSelectField(label, value, item) {
    let [xpath, index] = this.getSelectFieldXPath(label);
    xpath = (item ? item : '') + xpath;
    xpath = `(${this.activeTab}${xpath})[${index + 1}]`;
    if (browser.$(`${xpath}/button`).isDisplayed()) {
      let [actual, retry] = [null, 5];
      while (actual !== value && retry-- > 0) {
        if (!this.selectListOverlay.isDisplayed()) {
          browser.$(`${xpath}/button`).click();
          browser.pause(500);
        }
        if(value != "") {
          browser.$(`${xpath}//coral-selectlist-item[(text()="${value}")]`).click();
        } else {
          browser.$$(`${xpath}//coral-selectlist-item`)[0].click()
        }
        browser.pause(500);
        actual = browser.$(xpath).getText();
      }
    } else {
      // handle config in subnav tab
      xpath =
        this.getLabelXpath(label) + '/..//*[contains(@class,"coral-Select")]';
      let elem = browser.$$(`${xpath}/select`).filter(x => x.isDisplayed())[0];
      elem.selectByVisibleText(value);
    }
  }

  setSliderValue(label, value, breakpoint) {
    let compNum = 0;
    let m = value.match(/(\d+)px/);
    if (!m) {
      throw `Invalid value "${value}" for configuration setting "${label}"`;
    }
    if (breakpoint === 'Tablet') {
      compNum = 1;
    } else if (breakpoint === 'Desktop') {
      compNum = 2;
    }

    let labelXpath = this.getLabelXpath(label);
    let expectValue = parseInt(m[1]);
    let buttonElem = browser.$$(`${labelXpath}/..//button`);
    let leftHandle = browser.$$(`${labelXpath}/..//div[@handle="leftHandle"]`);
    
    this.retryAction(10, 1000, () => {
      buttonElem[compNum].click();
      browser.pause(500);
      expect(buttonElem[compNum].getAttribute('class')).toContain('--enabled');
    });

    this.retryAction(10, 1000, () => {
      leftHandle[compNum].click();
      browser.pause(500);
      expect(leftHandle[compNum].getAttribute('class')).toContain('is-focused');
    }); 
  
    let count = 0;
    while (count < 100) {
      let leftInput = browser.$$(
        `${labelXpath}/..//input[@handle="leftInput"]`
      );
      let actual = leftInput[compNum].getAttribute('aria-valuenow');
      if (parseInt(actual) >= expectValue) {
        break;
      }
      browser.keys('ArrowRight');
      count = count + 4;
    }
  }

  configureMultifieldItems(label, items) {
    let form = `//label[text()="${label}"]/..`;
    this.setMultifieldItems(form, items);
  }

  configureAccordionItems(items) {
    this.configureMultifieldItems('Accordion Items', items);
  }

  configureNavigationItems(items) {
    let form = '//label[text()="Navigation Items"]/..';
    this.configureMultifieldItems(form, items);
  }

  deleteAllItemsInMultifield(form, delXPath) {
    while (true) {
      let delButtons = browser.$$(`${form}${delXPath}`);
      delButtons = delButtons.filter(x => x.isDisplayed());
      if (delButtons.length === 0) {
        break;
      } else {
        delButtons[0].click();
        browser.pause(1000);
      }
    }
  }

  retrySetInputField(label, value, item) {
    let retry = 3;
    while (retry-- > 0) {
      let elem = this.getInputField(label, item);
      elem.setValue(value);
      let actual = elem.getValue();
      if (actual === value) {
        break;
      }
    }
  }

  fillItemInMultifield(form, index, settings) {
    let item = `${form}//coral-multifield-item[${index + 1}]`;
    let [prevLabel, prevValue] = [null, null];

    for (let i = 0; i < settings.length; i++) {
      let [label, value] = settings[i];
      if (label === '') {
        this.setSinglePicker(label, value, item);
      } else if (prevLabel === label && prevValue === 'Custom') {
        this.retrySetInputField(label, value, item);
      } else if (['checked', 'unchecked'].includes(value)) {
        this.selectCheckbox(label, value === 'checked', item);
      } else if (this.getSelectField(label, item)) {
        this.setSelectField(label, value, item);
      } else {
        this.retrySetInputField(label, value, item);
      }
      [prevLabel, prevValue] = [label, value];
    }
  }

  setMultifieldItems(form, items) {
    let addButton = `//coral-button-label[text()="Add"]/..`;
    let delButton = `//coral-icon[@icon="delete"]/..`;
    // delete all items
    this.deleteAllItemsInMultifield(form, delButton);
    for (let i = 0; i < items.length; i++) {
      browser.$(`${form}${addButton}`).click();
      browser.pause(500);
      this.fillItemInMultifield(form, i, items[i]);
    }
  }

  getButton(label, value) {
    let values = value.split(':');
    let elem = null;
    if (values.length === 1) {
      elem = browser.$(`//label[text()="${label}"]//following::button[1]`);
    } else {
      elem = browser.$(`//label[text()="${label}"]/following-sibling::*//button[.="${values[1]}" or @aria-label="${values[1]}"]`);
    }
    return elem;
  }

  getAllSelectValue(label, item) {
    let [xpath, index] = this.getSelectFieldXPath(label);
    xpath = (item ? item : '') + xpath;
    xpath = `(${this.activeTab}${xpath})[${index + 1}]`;
    //let selectXpath = `(//label[text()="${label}"])[1]//following-sibling::coral-select`;
    let selectArray = [];
    browser.$(`${xpath}/button`).click();
    this.waitForDisplayed('selectListOverlay');
    this.waitForDisplayed('selectList');
    let allValueElements = browser.$$(`${xpath}//coral-selectlist-item`);
    for (let i = 0; i < allValueElements.length; i++) {
      selectArray[i] = allValueElements[i].getText().trim();
    }
    //click to close dropdown
    browser.$(`${xpath}/button`).click();
    return selectArray;
  }

  getAllSearchSelectValue(label, item) {
    let [xpath, index] = this.getSearchSelectFieldXPath(label);
    xpath = (item ? item : '') + xpath;
    xpath = `(${this.activeTab}${xpath})[${index + 1}]`;
    
    let selectArray = [];
    browser.$(`${xpath}//button`).click();
    //this.waitForDisplayed('selectListOverlay');
    //this.waitForDisplayed('selectList');
    let allValueElements = browser.$$(`${xpath}//li`);
    for (let i = 0; i < allValueElements.length; i++) {
      selectArray[i] = allValueElements[i].getText().trim();
    }
    //click to close dropdown
    browser.$(`${xpath}//button`).click();
    return selectArray;
  }


  /**
   *
   * @param {string} label label of the checkbox
   * @param {string} state checked/unchecked
   * @param {string} breakpoint breakpoint Tablet or Desktop
   */
  selectCheckboxForVideo(label, state = true, breakpoint) {
    let checkbox = '';
    if (label === 'Auto Play Video') {
      checkbox = browser.$(
        `//coral-checkbox[@name = './ambientVideo/videoAutoPlay${breakpoint}']/input[1]`
      );
    }
    let value = checkbox.isSelected();
    if (
      (value === false && state === true) ||
      (value === true && state === false)
    ) {
      checkbox.click();
    }
  }

  /**
   *
   * @param {string} label label of the input box
   * @param {string} breakpoint breakpoint Tablet or Desktop
   * @returns {string} element
   */
  getInputFieldForVideo(label, breakpoint) {
    let xpath = '';
    if (label === 'File') {
      xpath = `//foundation-autocomplete[@name='./ambientVideo/videoURLFor${breakpoint}']/div[1]/div[1]/input[1]`;
    }
    let elems = browser.$$(xpath);
    elems = elems.filter(x => x.isDisplayed());
    return elems[0];
  }

  getSpacingSlider(label, breakpoint) {
    let compNum = 0;
    if (breakpoint === 'Tablet') {
      compNum = 1;
    } else if (breakpoint === 'Desktop') {
      compNum = 2;
    }
    let labelXpath = `//label[text()="${label}"]`;
    let elem = browser.$$(`${labelXpath}/..//button`);
    return elem[compNum];
  }

  getSpacingSelectField(label) {
    let xpath = `//*[text()="${label}"]//following-sibling::div/coral-select`;
    let elem = browser.$$(xpath);
    return elem.length > 0 ? elem[0] : null;
  }

  setSpacingSelectField(label, value) {
    let selectXpath = `//*[text()="${label}"]//following-sibling::div/coral-select`;
    let elem = browser.$$(selectXpath);
    for (let i = 0; i < elem.length; i++) {
      if (elem[i].isDisplayed()) {
        browser
          .$(
            `//*[text()="${label}"]//following-sibling::div[${
              i + 1
            }]/coral-select/button`
          )
          .click();
        browser.waitUntil(() => this.selectListOverlay.isDisplayed());
        browser
          .$(
            `//*[text()="${label}"]//following-sibling::div[${
              i + 1
            }]/coral-select//coral-selectlist-item[text()="${value}"]`
          )
          .click();
      }
    }
  }
}
