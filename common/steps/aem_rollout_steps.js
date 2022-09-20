const { Given } = require('@cucumber/cucumber');
const { Then } = require('@cucumber/cucumber');
const { When } = require('@cucumber/cucumber');
const fs = require('fs');
import { AemAuthorEditorPage } from '../pages/aem_author_editor_page';

Then(/^I rollout it to langmaster$/, rolloutToLangmaster);

Then(
  /^I rollout it with all subpages to langmaster$/,
  rolloutWithSubpagesToLangmaster
);

Then(
  /^I rollout "([^\"]*)" page to langmaster from sites$/,
  rolloutToLangmasterFromSites
);

Then(
  /^I rollout "([^\"]*)" page (with|without) all subpages to langmaster from sites$/,
  rolloutWithSubpagesToLangmasterFromSites
);

Then(
  /^I rollout "([^\"]*)" page with experience fragments "([^\"]*)" to langmaster from sites$/,
  rolloutWithExperienceFragmentsToLangmasterFromSites
);

Then(/^I verify the node in langmaster$/, checkInLangmaster);

Then(
  /^I verify the page "([^\"]*)" (|not )in langmaster$/,
  checkPageInLangmaster
);

Then(/^I verify the XF "([^\"]*)" (|not )in langmaster$/, checkXFInLangmaster);

Then(/^I rollout it (|with subpages )to country "([^\"]*)" from langmaster$/, rolloutToCountryFromLangmaster);

Then(
  /^I verify the page "([^\"]*)" (|not )in "([^\"]*)"$/,
  checkPageInCountry
);

/**
 * Step Definition:
 * ```
 * /^I rollout it to langmaster$/
 * ```
 * Function to rollout a page/XF to langmaster
 */
function rolloutToLangmaster() {
  this.context(AemAuthorEditorPage);
  this.page.retryAction(10, 1000, () => {
    this.page.pageInformation.click();
  });
  this.page.retryAction(10, 1000, () => {
    this.page.rollOutLink.click();
  });
  this.page.retryAction(10, 1000, () => {
    this.page.checkRollOut.click();
  });
  this.page.retryAction(10, 1000, () => {
    this.page.scheduleRollOutButton.click();
  });
}

/**
 * Step Definition:
 * ```
 * /^I rollout it to country "([^\"]*)" from langmaster$/
 * ```
 * Function to rollout a page to country from langmaster
 */
 function rolloutToCountryFromLangmaster(flag, path) {
  let paths = path.split(',');
  this.context(AemAuthorEditorPage);
  this.page.retryAction(10, 1000, () => {
    this.page.pageInformation.click();
  });
  this.page.retryAction(10, 1000, () => {
    this.page.rollOutLink.click();
  });
  if(flag ==='with subpages ') {
    this.page.retryAction(10, 1000, () => {
      this.page.rollOutPageAndAllSubpagesCheckbox.click();
    });
  }

  this.page.retryAction(10, 1000, () => {
    browser.$(`//coral-checkbox-label[contains(text(),"All")]/parent::label/parent::coral-checkbox/input`).click();
    browser.pause(10000);
    for(let apath of paths) {
      browser.$(`//*[contains(text(),"${apath.trim()}")]/parent::p/parent::td/preceding-sibling::td/coral-checkbox/input`).click();
      browser.pause(1000);
    }
  });
  this.page.retryAction(10, 1000, () => {
    this.page.checkRollOut.click();
    browser.pause(1000);
  });
  this.page.retryAction(10, 1000, () => {
    this.page.scheduleRollOutButton.click();
    browser.pause(1000);
  });
}

/**
 * Step Definition:
 * ```
 * /^I rollout it with all subpages to langmaster$/
 * ```
 * Function to rollout a page/XF with all subpages to langmaster
 */
function rolloutWithSubpagesToLangmaster() {
  this.context(AemAuthorEditorPage);
  this.page.pageInformation.click();
  this.page.rollOutLink.click();
  this.page.rollOutPageAndAllSubpagesCheckbox.click();
  this.page.checkRollOut.click();
  this.page.scheduleRollOutButton.click();
}

/**
 * Step Definition:
 * ```
 * /^I verify the node in langmaster$/
 * ```
 * Function to check a node exists in the langmaster or not
 */
function checkInLangmaster() {
  let currentUrl = browser.getUrl();
  let langUrl = currentUrl.replace('/us/', '/langmaster/');
  console.log(langUrl);
  browser.url(langUrl);
  expect(browser.getTitle()).not.toContain('404 Resource');
}

/**
 * Step Definition:
 * ```
 * /^I verify the page  "([^\"]*)" (|not )in langmaster$/
 * ```
 * Function to check a page exists in the langmaster or not
 */
function checkPageInLangmaster(pageName, flag) {
  let pageNames = pageName.split(',');
  let currentUrl = browser.getUrl();
  for (let page of pageNames) {
    let langUrl = currentUrl.replace('/us/', '/langmaster/');
    langUrl = langUrl.substr(0, langUrl.lastIndexOf('.html')) + `/${page}.html`;
    console.log(langUrl);
    browser.url(langUrl);
    console.log(browser.getTitle());
    if (flag === '') {
      console.log(flag);
      this.step('I switch to Iframe with ID "ContentFrame"');
      expect(browser.getTitle()).toContain(page);
    } else {
      console.log(flag);
      this.step('I switch to Iframe with ID "ContentFrame"');
      expect(browser.getPageSource()).toContain('No resource found');
    }
  }
}

/**
 * Step Definition:
 * ```
 * /^I verify the page "([^\"]*)" (|not )in "([^\"]*)"$/
 * ```
 * Function to check a page exists in the country or not
 */
 function checkPageInCountry(pageName, flag, path) {
  let pageNames = pageName.split(',');
  let paths = path.split(',');
  let currentUrl = browser.getUrl();
  for (let page of pageNames) {
    for(let apath of paths) {
      let langUrl = currentUrl.substr(0, currentUrl.indexOf('.html')) + `.html/content/dexter/${apath.trim()}/testautomation/${pageName}.html`;
      console.log(langUrl);
      browser.url(langUrl);
      console.log(browser.getTitle());
      if (flag === '') {
        console.log(flag);
        this.step('I switch to Iframe with ID "ContentFrame"');
        expect(page).toContain(browser.getTitle());
      } else {
        console.log(flag);
        this.step('I switch to Iframe with ID "ContentFrame"');
        expect(browser.getPageSource()).toContain('No resource found');
      }
    }
  }
}

/**
 * Step Definition:
 * ```
 * /^I verify the XF "([^\"]*)" (|not )in langmaster$/
 * ```
 * Function to check a XF exists in the langmaster or not
 */
function checkXFInLangmaster(XFName, flag) {
  console.log(XFName);
  let currentUrl = browser.getUrl();
  let langUrl =
    currentUrl.substr(0, currentUrl.indexOf('.html')) + `.html${XFName}`;
  console.log(langUrl);
  browser.url(langUrl);
  console.log(browser.getTitle());
  if (flag === '') {
    console.log(flag);
    this.step('I switch to Iframe with ID "ContentFrame"');
    expect(XFName).toContain(browser.getTitle());
  } else {
    console.log(flag);
    this.step('I switch to Iframe with ID "ContentFrame"');
    expect(browser.getPageSource()).toContain('No resource found');
  }
}

/**
 * Step Definition:
 * ```
 * /^I rollout ([^\"]*) page to langmaster from sites$/
 * ```
 * Function to rollout page to langmaster from sites
 */
function rolloutToLangmasterFromSites(pagename) {
  this.context(AemAuthorEditorPage);
  browser
    .$(
      `(//coral-columnview-column)[last()]//img[@class='foundation-collection-item-thumbnail' and contains(@src,'${pagename}.thumb')]`
    )
    .click();
  browser.pause(1000);
  if(this.page.moreButton.isDisplayed()) {
    this.page.moreButton.click();
  }
  this.page.rollout.click();
  let handles = browser.getWindowHandles();
  browser.switchToWindow(handles[handles.length - 1]);
  this.page.rolloutBtn.click();
  this.page.continueBtn.click();
}

/**
 * Step Definition:
 * ```
 * /^I rollout ([^\"]*) page (with|without) all subpages to langmaster from sites$/
 * ```
 * Function to rollout page with/without all subpages to langmaster from sites
 */
function rolloutWithSubpagesToLangmasterFromSites(pagename, flag) {
  this.context(AemAuthorEditorPage);
  browser
    .$(
      `(//coral-columnview-column)[last()-1]//img[@class='foundation-collection-item-thumbnail' and contains(@src,'${pagename}.thumb')]`
    )
    .click();
  browser.pause(1000);
  if(this.page.moreButton.isDisplayed()) {
    this.page.moreButton.click();
  }
  this.page.rollout.click();
  let handles = browser.getWindowHandles();
  browser.switchToWindow(handles[handles.length - 1]);
  if (flag === 'with') {
    this.page.rolloutOptionsPageAndAllSubpages.click();
  }
  this.page.rolloutBtn.click();
  this.page.continueBtn.click();
}

/**
 * Step Definition:
 * ```
 * /^I rollout "([^\"]*)" page with experience fragments "([^\"]*)" to langmaster from sites$/
 * ```
 * Function to rollout page with experience fragments to langmaster from sites
 */
function rolloutWithExperienceFragmentsToLangmasterFromSites(pagename, XFPath) {
  this.context(AemAuthorEditorPage);
  browser
    .$(
      `(//coral-columnview-column)[last()]//img[@class='foundation-collection-item-thumbnail' and contains(@src,'${pagename}.thumb')]`
    )
    .click();
  browser.pause(1000);
  if(this.page.moreButton.isDisplayed()) {
    this.page.moreButton.click();
  }
  this.page.rollout.click();
  let handles = browser.getWindowHandles();
  browser.switchToWindow(handles[handles.length - 1]);
  this.page.rolloutOptionsPageAndXF.click();
  browser.$(`//*[@data-path='${XFPath}']//input`).click();
  this.page.rolloutBtn.click();
  this.page.continueBtn.click();
}
