const { Given } = require('@cucumber/cucumber');
const { Then } = require('@cucumber/cucumber');
const { When } = require('@cucumber/cucumber');
const fs = require('fs');
const urljoin = require('url-join');
const { authorPageGet } = require('../support/functions/sling');
import { AemFloodgatePage } from '../pages/aem_floodgate_page';
import { GnavPage } from '../pages/gnav_page';

//let currentLocTreeSlot = '';

Then(/^I select the site "([^"]*)"$/, clickSite);

Then(/^I click on "([^"]*)" from top menu$/, clickTopMenu);

Then(/^I create floodgate loc tree$/, createLocTree);

Then(/^I create floodgate loc tree with value "([^"]*)" if not exist$/, createLocTreeSlot);

Then(
  /^I verify that newly created floodgate has expected country folders from "([^"]*)"$/,
  verifyFloodgate
);

Then(/^I click on Copy to FG Tree$/, copyFG);

Then(/^I copy following pages to FG tree:$/, copyPagesToFGTree);

Then(/^I promote the floodgate tree$/, promoteFG);

Then(/^I promote and activate the floodgate tree$/, promoteAndActivateFG);

Then(/^I delete the floodgate tree "([^"]*)"$/, deleteFG);

Then(/^I check the status of promote(| and activate)$/, checkPromoteStatus);

Then(
  /^I open the "([^"]*)" page in publish(| in new window)$/,
  checkPageInPublish
);

Then(
  /^I open the "([^"]*)" page in publish with FG color "([^"]*)" request header$/,
  checkPageInPublishForFG
);

Then(/^I verify site "([^"]*)" doesn't exist$/, verifySiteNotExist);

Then(/^I verify floodgate folder properties$/, verifyFGFolderProperties);

/**
 * Step Definition:
 * ```
 * /^I select the site "([^"]*)"$/
 * ```
 *  * @param {string} siteName site name for which floodgate has to be created
 */
function clickSite(siteName) {
  this.context(AemFloodgatePage);
  let siteThumbnail = this.page.getSiteThumbnail(
    '/content/' + siteName.toLowerCase()
  );
  try {
    siteThumbnail.click();
  } catch (error) {
    error += `\nSite ${siteName} does not exist`;
    throw error;
  }
}

/**
 * Step Definition:
 * ```
 * /^I click on "([^"]*)" from top menu$/
 * ```
 *  * @param {string} label label/text of the menu
 */
function clickTopMenu(label) {
  let menuItem = this.page.getTopMenu(label);
  menuItem.click();
}

/**
 * Step Definition:
 * ```
 * /^I create floodgate loc tree$/
 * ```
 */
function createLocTree() {
  this.page.click('createFG');
  browser.pause(500);
  let floodGateSlot = this.page.getFloodGateSlot();
  this.currentLocTreeSlot = floodGateSlot;
  if (floodGateSlot != null) {
    this.page.setFloodGateSlot(floodGateSlot);
    this.page.retryAction(5, 1000, () => {
      this.page.click('dexterFGForm');
    });
    browser.pause(500);
    console.log('FG ' + this.currentLocTreeSlot + ' created');

    this.page.retryExpect(10, 2000, () => {
      expect(this.page.getSiteThumbnail(floodGateSlot)).toBeDisplayed();
    });

    this.step(`I verify that newly created floodgate has expected country folders from "/content/dexter/"`);
    this.step(`I verify floodgate folder properties`);
  } else {
    console.log(
      'No slot available to create loc tree. Please delete one to create new'
    );
  }
}

/**
 * Step Definition:
 * ```
 * /^I create floodgate loc tree with value "([^"]*)"$/
 * ```
 */
 function createLocTreeSlot(slotValue) {
  this.page.click('createFG');
  browser.pause(500);
  let floodGateSlot = this.page.getFloodGateSlotBySlotValue(slotValue);
  if(floodGateSlot === "disabled") {
    this.currentLocTreeSlot = slotValue;
  } else {
    this.currentLocTreeSlot = floodGateSlot;
  }

  if (floodGateSlot != null && floodGateSlot !== "disabled") {
    this.page.setFloodGateSlot(floodGateSlot);
    this.page.retryAction(5, 1000, () => {
      this.page.click('dexterFGForm');
    });
    browser.pause(500);
    console.log('FG ' + this.currentLocTreeSlot + ' created');
    this.page.retryExpect(10, 2000, () => {
      expect(this.page.getSiteThumbnail(floodGateSlot)).toBeDisplayed();
      });
  } else if(floodGateSlot === "disabled"){
    console.log(
      'This slot is existing, no need to create.'
    );
  } else {
    console.log(
      'No slot available to create loc tree. Please delete one to create new'
    );
  }
}


/**
 * Step Definition:
 * ```
 * /^I verify that newly created floodgate has expected country folders from "([^"]*)"$/
 * ```
 * @param {string} baseTree
 */
function verifyFloodgate(baseTree) {
  let baseUrl = browser.config.profile.baseUrl;
  let baseUrlPath = urljoin(baseUrl, baseTree, '.2.json');
  let missingLoc = [];
  console.log('BaseUrlPath: ' + baseUrlPath);
  let fgPathInConf = urljoin(
    baseUrl,
    '/conf/global/',
    this.currentLocTreeSlot.substring(
      this.currentLocTreeSlot.lastIndexOf('/') + 1
    ),
    '/localization/countries.-1.json'
  );
  let fgPath = urljoin(baseUrl, this.currentLocTreeSlot, '.2.json');

  let FGInConf = authorPageGet(fgPathInConf, 'author');
  this.expectedInBase = authorPageGet(baseUrlPath, 'author');
  this.FGInActual = authorPageGet(fgPath, 'author');

  let expectedLocalesInBase = getAllLocale(this.expectedInBase);
  let FGLocaleInConf = getAllLocale(FGInConf);
  let actualLocales = getAllLocale(this.FGInActual);
  FGLocaleInConf.push('langmaster');

  for (let i = 0; i < expectedLocalesInBase.length; i++) {
    if (
      FGLocaleInConf.includes(expectedLocalesInBase[i]) &&
      !actualLocales.includes(expectedLocalesInBase[i])
    ) {
      missingLoc.push(expectedLocalesInBase[i]);
    }
  }
  try {
    expect(missingLoc).toHaveLength(0);
  } catch (error) {
    error.message += 'Missing locales: ' + missingLoc;
    throw error;
  }
}

/**
 * @param {object} jsonData
 * @returns {array} arrLocale
 */
function getAllLocale(jsonData) {
  let arrLocale = [];
  if (Object.entries(jsonData).length != 0) {
    for (let key of Object.keys(jsonData)) {
      if (!key.includes('jcr')) {
        arrLocale.push(key);
      }
    }
  }
  console.log('ArrayLength: ' + arrLocale.length);
  return arrLocale;
}

/**
 * Step Definition:
 * ```
 * /^I click on Copy to FG Tree$/
 * ```
 */
function copyFG() {
  this.page.click('copyFG');
  browser.pause(1000);
}

/**
 * Step Definition:
 * ```
 * /^I promote the floodgate tree$/
 * ```
 */
function promoteFG() {
  this.page.click('promoteFG');
  browser.pause(1000);
  if (this.page.promotePopup.isDisplayed()) {
    this.page.click('promoteOnly');
    this.page.click('promoteButton');
  }
}

/**
 * Step Definition:
 * ```
 * /^I promote and activate the floodgate tree$/
 * ```
 */
function promoteAndActivateFG() {
  this.page.click('promoteFG');
  browser.pause(1000);
  if (this.page.promotePopup.isDisplayed()) {
    this.page.click('promoteAndActivate');
    this.page.click('promoteButton');
  }
}

/**
 * Step Definition:
 * ```
 * /^I delete the floodgate tree "([^"]*)"$/
 * ```
 * @param {string} siteName
 */
function deleteFG(siteName) {
  this.context(AemFloodgatePage);
  let siteThumbnail = this.page.getSiteThumbnail(
    '/content/' + siteName.toLowerCase()
  );

  if(siteThumbnail.isDisplayed()) {
    this.step(`I select the site "${siteName}"`);
    this.step(`I should see "Floodgate"`);
    this.step(`I click on "floodgate" from top menu`);
    this.page.click('deleteFG');
    browser.pause(1000);
    this.page.click('deleteFGForm');
    this.page.retryAction(5, 1000, () => {
      this.page.click('deletePopupClose');
      this.page.waitForDisplayed('deleteSuccess', 10000);
    });
  }
}

/**
 * Step Definition:
 * ```
 * /^I copy following pages to FG tree:$/
 * ```
 * @param {string[]} table List of page paths
 */
function copyPagesToFGTree(table) {
  let paths = table.rawTable;
  let pagePaths = paths.join('\n') + '\n';
  let inputArea = this.page.copyInputArea;
  inputArea.setValue(pagePaths);
  browser.pause(3000);
  this.page.retryAction(5, 1000, () => {
    this.page.click('copyButton');
  });
}

/**
 * Step Definition:
 * ```
 * /^I check the status of promote(| and activate)$/
 * ```
 */
function checkPromoteStatus(activate) {
  this.page.click('promoteStatus');
  browser.pause(1000);
  this.step(`I switch to the new window`);
  this.page.retryExpect(10, 1000, () => {
    expect(browser.$('body')).toHaveTextContaining('Promote Status: Success');
  });
  if (activate != '') {
    this.page.retryExpect(10, 1000, () => {
      expect(browser.$('body')).toHaveTextContaining(
        'Replication Status: complete'
      );
    });
  }
}

/**
 * Step Definition:
 * ```
 * /^I open the "([^"]*)" page in publish(| in new window)$/
 * ```
 * @param {string} pageName page name
 * @param {string} newWindow to check if url needs to open in new window
 */
function checkPageInPublish(pageName, newWindow) {
  this.context(GnavPage);
  let basePublish = browser.config.profile.publishUrl;
  let publishUrl = urljoin(basePublish, pageName);
  if (newWindow != '') {
    browser.newWindow(publishUrl);
  } else {
    this.page.open(publishUrl);
  }
  this.step(`I switch to the new window`);
}

/**
 * Step Definition:
 * ```
 * /^I open the "([^"]*)" page in publish with FG color "([^"]*)" request header$/
 * ```
 * @param {string} pageName page name
 * @param {string} fgColor like pink, blue etc.
 */
function checkPageInPublishForFG(pageName, fgColor) {
  this.context(GnavPage);
  let basePublish = browser.config.profile.publishUrl;
  let publishUrl = urljoin(basePublish, pageName);
  this.page.open(publishUrl, '', '', { 'X-Adobe-Floodgate': fgColor });
  this.step(`I switch to the new window`);
}

/**
 * Step Definition:
 * ```
 * /^I verify site "([^"]*)" doesn't exist$/
 * ```
 * @param {string} siteName site name like dexter
 */
function verifySiteNotExist(siteName) {
  this.context(AemFloodgatePage);
  let siteThumbnail = this.page.getSiteThumbnail(
    '/content/' + siteName.toLowerCase()
  );
  expect(siteThumbnail).not.toBeDisplayed();
}

/**
 * Step Definition:
 * ```
 * /^I verify floodgate folder properties$/
 * ```
 */
function verifyFGFolderProperties() {
  let expectedProperties = getFolderProperties(this.expectedInBase);
  let expectedCloudConfig = expectedProperties.cloudConfig;
  let expectedTemplates = expectedProperties.allowedTemplates;
  let fgProperties = getFolderProperties(this.FGInActual);
  let fgCloudConfig = fgProperties.cloudConfig;
  let fgTemplates = fgProperties.allowedTemplates;
  try {
    expect(expectedCloudConfig.sort()).toEqual(fgCloudConfig.sort());
  } catch (error) {
    error += ` Cloud config for FG ${this.currentLocTreeSlot} don't match the main tree`;
    throw error;
  }
  try {
    expect(expectedTemplates.sort()).toEqual(fgTemplates.sort());
  } catch (error) {
    error += ` Allowed templates for FG ${this.currentLocTreeSlot} don't match the main tree`;
    throw error;
  }
}

/**
 *
 * @param {object} jsonData
 * @returns {object}
 */
function getFolderProperties(jsonData) {
  let cloudConfig = jsonData['jcr:content']['cq:cloudserviceconfigs'];
  let allowedTemplates = jsonData['jcr:content']['cq:allowedTemplates'];
  return { cloudConfig, allowedTemplates };
}
