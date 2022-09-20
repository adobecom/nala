const { Given } = require('@cucumber/cucumber');
const { Then } = require('@cucumber/cucumber');
const { When } = require('@cucumber/cucumber');
const fs = require('fs');
import { AemAuthorProjectsPage } from '../pages/aem_author_projects_page';

let optionValue = {
  'English Copy': 'englishCopy',
  'Translate': 'translate'
};

Then(/^I delete the project "([^"]*)" under "([^"]*)"$/, deleteProject);

Then(/^I create a new content project:$/, createNewContentProject);

Then(/^I add the (page|XF) "([^"]*)" into the current project$/, addPageOrXFIntoProject);

Then(/^I add the pages "([^"]*)" into the current project by textbox$/, addPagesIntoProjectByTextbox);

Then(/^I add the page "([^"]*)" with (Descendants|XFRs) into the current project$/, addPageWithDesAndXFRsIntoProject);

Then(/^I go back to the current project page$/, goBackToCurrentProjectPage);

Then(/^I add "([^"]*)" as (English Copy|Translate)$/, addLanguageIntoProject);

Then(/^I generate and start subprojects$/, generateAndStartSubprojects);

Then(/^I cancel all subprojects$/, cancelAllSubprojects);

Then(/^I rollout "([^"]*)" to country "([^"]*)" from current project$/, rolloutToCountryFromProject);

Then(/^I copy this project$/, copyThisProject);

/**
 * Step Definition:
 * ```
 * /^I delete the project "([^"]*)" under "([^"]*)"$/
 * ```
 */
function deleteProject(projectName, folder) {
  this.page.open(`/projects.html${folder}`);
  browser.pause(1000);
  this.page.retryAction(10, 1000, () => {
    if($(`//*[contains(@data-foundation-collection-item-id, "${projectName}")]`).isDisplayed()) {
      $(`//*[contains(@data-foundation-collection-item-id, "${projectName}")]`).moveTo();
      $('[title="Select"]').click();
      browser.pause(1000);
      $('//*[@data-foundation-command-label="Delete"]').click();
      browser.pause(1000);
      $('[name="removeGroups"]').click();
      $('[type="submit"]').click();
      browser.pause(5000);
      console.log(`Delete project ${projectName}`);
    }
  });
}

/**
 * Step Definition:
 * ```
 * /^I create a new content project:$/
 * ```
 */
 function createNewContentProject(table) {
  let specs = table.rowsHash();
  this.page = new AemAuthorProjectsPage(specs['Folder']);
  this.page.open();

  // Need to handle onboarding or survey popup
  let retry = 5;
  while (retry-- > 0) {
    try {
      this.page.click('createButton');
      this.page.click('createProject');
      this.page.waitForDisplayed('templateCard');
      break;
    } catch (err) {
      disableUserOnboarding(this.page);
      dismisSurvey(this.page);
    }
  }

  this.page.waitForDisplayed('templateCard');
  let cards = this.page.templateCards;
  for (let card of cards) {
    let itemId = card.getAttribute('data-foundation-collection-item-id');
    if (itemId === specs['Template']) {
      card.click();
    }
  }
  if (specs['Title'].includes('${DateTime}')) {
    let d = new Date();
    // Hack. Use se Date and Time format
    let ts = `${d.toLocaleDateString('se')}T${d.toLocaleTimeString('se')}`;
    ts = ts.replace(/:/g, '-');
    specs['Title'] = specs['Title'].replace('${DateTime}', ts);
  }
  this.page.click('nextButton');
  this.page.setValue('titleInput', specs['Title'], 30000);
  this.testProjectPath = specs['Folder'] + '/' + specs['Title'];
  this.testProjectName = specs['Title'];
  this.page.click('nextButton');
  this.page.click('openButton');
  console.log("Create project " + this.testProjectName);
}

/**
 * Step Definition:
 * ```
 * /^I add the page "([^"]*)" into the current project$/
 * ```
 */
function addPageOrXFIntoProject(option, pagePath) {
  this.page.click('addItemButton');
  this.page.click('addTopButton');
  if(option === 'page') {
    this.page.click('addPagesOption');
  } else {
    this.page.click('addXFsOption');
  }
  let paths = pagePath.split('/');
  for(let i=0; i<paths.length-1; i++) {
    $(`//div[text()="${paths[i]}"]`).click();
    browser.pause(500);
  }
  $(`//img[contains(@src, "${paths[paths.length-1]}")]`).click();
  browser.pause(500);
  if(option === 'page') {
    this.page.click('confirmButton');
  } else {
    this.page.click('confirmXFButton');
  }
}

/**
 * Step Definition:
 * ```
 * /^I add the page "([^"]*)" with (Descendants|XFRs) into the current project$/
 * ```
 */
 function addPageWithDesAndXFRsIntoProject(pagePath, option) {
  
  this.page.click('addItemButton');
  this.page.click('addTopButton');
  this.page.click('addPagesOption');
  let paths = pagePath.split('/');
  for(let i=0; i<paths.length-1; i++) {
    $(`//div[text()="${paths[i]}"]`).click();
    browser.pause(500);
  }
  $(`//img[contains(@src, "${paths[paths.length-1]}")]`).click();
  browser.pause(500);
  this.page.click('confirmButton');
  browser.pause(5000);
  browser.$(`[labelled="Select All"]`).click();
  browser.pause(500);
  if(option === 'Descendants') {
    this.page.click('addDescendantsButton');
    browser.pause(2000);
    browser.$('//coral-button-label[text()="OK"]').click();
    browser.pause(5000);
  } else {
    this.page.click('addXFRsButton');
  }
  browser.pause(500);
}

/**
 * Step Definition:
 * ```
 * /^I add the pages "([^"]*)" into the current project by textbox$/
 * ```
 */
 function addPagesIntoProjectByTextbox(pagePath) {
  this.page.click('addItemButton');
  this.page.click('addTopButton');
  this.page.click('addPagesViaTextboxOption');
  let paths = pagePath.split(',');
  let pathString = "";
  for(let i=0; i<paths.length; i++) {
    pathString += paths[i] + "\r\n";
  }
  $('.coral-Textfield--multiline').setValue(pathString);
  browser.pause(500);
  this.page.click('addConfirmButton');
}

/**
 * Step Definition:
 * ```
 * I go back to the current project page
 * ```
 */
function goBackToCurrentProjectPage() {
  this.page.retryAction(10, 1000, () => {
    this.page.click('bettyBreadcrumbsButton');
    $(`//*[text()="${this.testProjectName}"]`).click();
    browser.pause(1000);
  });
}

/**
 * Step Definition:
 * ```
 * /^I add "([^"]*)" as (English Copy|Translate)$/
 * ```
 */
function addLanguageIntoProject(languageCollection, option) {
  this.page.click('globalCheckButton');
  
  let languages = languageCollection.split(',');
  for(let i=0; i<languages.length; i++) {
    $(`//*[@data-language-code="${languages[i]}"]/button[@data-button-type="${optionValue[option]}"]`).click();
    browser.pause(500);
  }
  this.page.click('submitButton');
}

/**
 * Step Definition:
 * ```
 * /^I generate and start subprojects$/
 * ```
 */
function generateAndStartSubprojects() {
  this.page.retryAction(10, 1000, () => {
    this.page.click('accordionDownButton');
  });
  this.page.retryAction(10, 1000, () => {
    this.page.click('generateSubprojectsButton');
  });
  browser.pause(2000);
  browser.refresh();
  this.page.retryAction(10, 1000, () => {
    this.page.click('accordionDownButton');
    browser.pause(2000);
    this.page.click('startSubprojectsButton');
  });
  browser.pause(2000);
  browser.refresh();
}

/**
 * Step Definition:
 * ```
 * /^I cancel all subprojects$/
 * ```
 */
function cancelAllSubprojects() {
  this.page.click('accordionDownButton');
  browser.pause(2000);
  this.page.click('cancelAllSubprojectsButton');
  browser.pause(2000);
  browser.refresh();
}

/**
 * Step Definition:
 * ```
 * /^I rollout "([^"]*)" to country "([^"]*)" from current project$/
 * ```
 */
function rolloutToCountryFromProject(page, locale) {
  this.page.click('rolloutPageLink');
  this.page.click('rolloutStepOne');
  browser.pause(2000);
  let locales = locale.split(',');
  this.page.retryAction(10, 1000, () => {
    browser.$(`[labelled="Select All"]`).click();
    browser.pause(10000);
    for(let alocale of locales) {
      browser.$(`//*[@value="${alocale}"]/preceding-sibling::td/coral-table-row-selectcheckbox`).click();
      browser.pause(1000);
    }
  });

  this.page.click('rolloutButton');
}

/**
 * Step Definition:
 * ```
 * /^I copy this project$/
 * ```
 */
 function copyThisProject() {
  this.page.click('copyProjectButton');
  $('//coral-button-label[text()="Copy"]').click();
  browser.pause(1000);
}