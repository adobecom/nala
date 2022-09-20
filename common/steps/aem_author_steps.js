/** @module dc/steps */
const { Given } = require('@cucumber/cucumber');
const { Then } = require('@cucumber/cucumber');
const { When } = require('@cucumber/cucumber');
const fs = require('fs');
import DataTable from '@cucumber/cucumber/lib/models/data_table';
const {
  requestPost,
  requestGet
} = require('../support/functions/request_sync');
import { AemAuthorSitesPage } from '../pages/aem_author_sites_page';
import { AemAuthorXF } from '../pages/aem_author_XF_page';
import { AemAuthorEditorPage } from '../pages/aem_author_editor_page';
import { AemAuthorProjectsPage } from '../pages/aem_author_projects_page';
import { AemAuthor } from '../support/classes/aem_author';
import { cardinal } from '../support/functions/cardinal';
import { CompConfigurationSection } from '../pages/comp_configuration_section';
const urljoin = require('url-join');

// Global variable to record current component for page context changes
let currentComponent = '';

Then(/^I go to AEM Start$/, goToAemStart);

Then(/^I create a new content page:$/, createNewContentPage);

Then(
  /^I create a new content page in the test folder:$/,
  createNewContentPageInTestFolder
);

Then(/^I publish the page$/, publishPage);

Then(/^I use API to create a new content page:$/, createNewContentPageAPI);

Then(/^I have the page "([^"]*)" in the test folder$/, havePageInTestFolder);

Then(/^I verify the created card is (|not )present$/, verifyCard);

Then(/^I delete the tag "([^"]*)" in the tags folder$/, deleteTagInTagsFolder);

Then(/^I delete the (?:page|asset) "([^"]*)"$/, deletePage);

Then(
  /^I have the page "([^"]*)" in the current test page folder with title "([^"]*)"$/,
  havePageInCurrentTestPageFolder
);

//Then(/^I delete the page "([^"]*)"$/, deletePage);

Then(
  /^I delete the page "([^"]*)" in the test folder$/,
  deletePageInTestFolder
);

Then(
  /^I delete all test pages in the test folder$/, { timeout: 300000 },
  deleteAllTestPagesInTestFolder
);

Then(
  /^I delete all test XFs in the test folder$/, { timeout: 300000 },
  deleteAllTestXFsInTestFolder
);

Then(
  /^I delete all translate projects in the test folder$/,
  deleteAllTranslateProjectsTestFolder
);

Then(/^I edit the page "([^"]*)"$/, editPage);

Then(/^I edit the page "([^"]*)" in the test folder$/, editPageInTestFolder);

Then(/^I edit the test page in the test folder$/, editTestPageInTestFolder);

Then(
  /^I edit the test child page under the test page$/,
  editTestChildPageUnderTestPage
);

Then(
  /^I insert a component "([^"]*)"(| in modal| in subnav)$/,
  insertComponent
);

Then(/^I drag and drop a component "([^"]*)"$/, dragAndDropComponent);

Then(/^I type "([^"]*)" into Text component$/, typeTextIntoTextComponent);

Then(/^I preview the edited page$/, previewEditedPage);

Then(/^I delete all components$/, deleteAllComponents);

Then(/^I switch to the editor tab$/, switchToEditorTab);

Then(
  /^I should see "([^"]*)" in the content frame$/,
  shouldSeeTextInContentFrame
);

Then(
  /^I click (Configure|Copy|Cut|Delete|Paste|xfDebugger) of the newly added component$/,
  clickIconNewComnponent
);

Then(/^I click (Configure|Copy) of gnav header$/, clickIconGnavHeader);

Then(
  /^I click (Configure|Copy) of "([^\"]*)" subnav link$/,
  clickIconSubnavLink
);

Then(/^I configure the newly added component$/, configureNewComnponent);

Then(
  /^I configure the newly added component:$/,
  configureNewComnponentSettings
);

Then(/^I create a new experience fragment:$/, createNewXF);

Then(/^I use API to create a new experience fragment:$/, createNewXFAPI);

Then(/I have the popover "([^\"]*)"/, havePopover);

Then(/I have text "([^\"]*)" in the popover "([^\"]*)"/, haveTextInPopover);

// Configuration Dialog
Then(
  /^I open Configuration dialog of the newly added component$/,
  openConfigurationDialog
);

Then(
  /^I open Configuration dialog of gnav header$/,
  openConfigurationDialogGnavHeader
);

Then(
  /^I open Configuration dialog of "([^\"]*)" subnav link$/,
  openConfigurationDialogSubnavLink
);

Then(/^I should (|not )see Configuration dialog$/, shouldSeeConfiguationDialog);

Then(
  /^I click (Done|Cancel) in Configuration dialog$/,
  clickButtonInConfigurationDialog
);

Then(
  /^I click (Done|Cancel) to close Configuration dialog$/,
  clickButtonToCloseConfigurationDialog
);

Then(
  /^I should (|not )see invalid configuration for "([^"]*)" tab$/,
  shouldSeeInvalidConfiguration
);

Then(
  /^I select "([^"]*)" tab in Configuration dialog$/,
  selectTabInConfigurationDialog
);

Then(
  /^I configure settings in "([^"]*)" tab(| for breakpoint "([^"]*)"):$/,
  configureSettingsInTab
);

Then(
  /^I input "([^"]*)" then add a tag with value "([^"]*)" to the field with label "([^"]*)"$/,
  addTag
);

Then(/^I configure settings:$/, configureSettings);

Then(/^I configure settings for "([^"]*)":$/, configureSettingsFor);

Then(/^I open editor's side panel$/, openEditorSidePanel);

Then(
  /^I open (Assets|Components|Content Tree|Variations) tab on the side panel$/,
  openTabOnSidePanel
);

Then(/^I open the edited page on preview mode(| with parameters "([^"]*)")$/, openEditedPageOnPreviewMode);

Then(
  /^I view the edited page as published(| on (.+))$/,
  viewEditedPageAsPublished
);

Then(/^I should see the image "([^"]*)"$/, shouldSeeImage);

Then(
  /^I should (|not )see (any|an|\d+) element(?:|s) with attributes(| inside an iframe):$/,
  shouldSeeAnElementWithAttributes
);

Then(
  /^I should see an element "([^"]*)" with attributes:$/,
  shouldSeeAnElementNameWithAttributes
);

Then(
  /^I should (|not )see invalid configuration in "([^"]*)" tab for field$/,
  shouldSeeInvalidConfigurationForFields
);

Then(
  /^I should see height (\d+)px for element "([^"]*)"$/,
  shouldSeeHeightForElement
);

Then(
  /^I should see the styles for element "([^"]*)":$/,
  shouldSeeStylesForElement
);

Then(
  /^I insert "([^"]*)" into Layout container "([^"]*)"$/,
  insertIntoLayoutContainer
);

Then(
  /^I copy "([^"]*)" into Layout container "([^"]*)"$/,
  copyIntoLayoutContainer
);

Then(/^I type "([^"]*)" into Text component "([^"]*)"$/, typeIntoTextComponent);

Then(
  /^I should (|not )see "([^"]*)" in Accordion contents$/,
  shouldSeeInAccordionContent
);

Then(/^I click the (1st|2nd|3rd) Accordion header$/, clickAccordionHeader);

Then(/^I select the newly added component$/, selectTheNewlyAddedComponent);

Then(/^I should see the alert icon$/, shouldSeeTheAlertIcon);

Then(/^I mouse hover the alert icon$/, mouseHoverTheAlertIcon);

When(/^I click the (1st|2nd|3rd|4th|5th) rating star$/, clickRatingStar);

Then(/^I input "([^"]*)" and click Send$/, inputTextAndClickSend);

Then(/^I am not able to click any star this time$/, notAbleToClickAnyStar);

Then(
  /^I open Configure Button dialog in the flex component$/,
  openConfigureButtonDialgInFlexComponent
);

Then(
  /^I insert "([^"]*)" component into the flex container$/,
  insertComponentIntoFlexContainer
);

Then(
  /^I should see "([^"]*)" in element "([^"]*)"$/,
  shouldSeeTextInElementName
);

Then(
  /^I verify fields in "([^"]*)" tab(| for breakpoint "([^"]*)"):$/,
  verifyConfigurationModal
);

Then(
  /^I verify (|search )dropdown "([^"]*)" in tab "([^"]*)" has following values:$/,
  verifyDropdownValues
);

When(/^I mark "(.*)" checkbox$/, iMarkCheckboxnameCheckbox);

Then(
  /^I should see button containing text "([^\"]*)" is(| not) enabled$/,
  checkElementEnabled
);

Then(
  /^I configure settings in "([^"]*)" tab for "([^"]*)":$/,
  configureSettingsForTabDesktop
);

Then(
  /^I should (|not )see (any|an|\d+) element(?:|s) with following attributes inside parent node that has attribute "([^"]*)" with value "([^"]*)":$/,
  shouldSeeAnElementWithAttributesInParent
);

Then(/^I should be able to play the "([^"]*)"$/, clickPlayButtonOnVideo);

Then(
  /^I should see "([^"]*)" error on the page for "([^"]*)"$/,
  errorOnVideoComponent
);

Then(/^I should (|not )see label "([^"]*)"$/, shouldSeelabel);

Then(
  /^I should see element "([^"]*)" (width|height) as (\d+)% of viewport$/,
  shouldSeeElementSizeAsPctOfViewport
);

Then(/^I upload "([^"]*)" to Assets "([^"]*)"$/, uploadFiletoAssets);

Then(
  /^I upload the following files to Assets "([^"]*)":$/,
  uploadFollowingFilestoAssets
);

Then(/^I (activate|deactivate) the (?:page|asset) "([^"]*)"$/, replicatePage);

Then(
  /^I click (Configure|Copy) of Consonant card collection$/,
  clickConfigureIconConsCardCollection
);

Then(/^I click the element "([^\"]*)"$/, clickElementDex);

Then(/^I add carousel slide ids:$/, addCarouselSlides);

Then(/^I should (|not )see css selector:$/, shouldSeeAnElementWithCSSSelector);

Then(
  /^I should validate the carousel timeline with timer "([^"]*)"$/,
  validateCarouselTimelineProgressMeter
);

Then(/^I validate slides not pausing on hover:$/, slideShouldNotPauseOnHover);

Then(
  /^I should see attribute in selector "([^"]*)" with value:$/,
  seeAttributeWithValueInElement
);

Then(
  /^I add custom auto rotate timer to each slides:$/,
  addCustomAutoRotateSpeed
);

Then(/^I click on selector "([^"]*)"$/, clickOnSelector);

Then(/^I close the XF picker overlay$/, closeXFPickerOverlay);

Then(/^I should see template "([^"]*)"$/, iShouldSeeTemplate);

Then(
  /^I should see the page "([^"]*)" under the directory "([^"]*)"$/,
  iShouldSeeThePageUnderTheDirectory
);

Then(
  /^I should (|not )see "([^"]*)" in (|parent )HTML content of selector "([^"]*)"$/,
  seeContentInHTML
);

Then(/^I set the dry run checkbox to "([^"]*)"$/, setTheDryRunCheckboxTo);

Then(/^I upload file "([^"]*)"$/, iUploadFile);

Then(
  /^I submit the file to bulk editor successfully$/,
  verifyBulkEditorFileSubmission
);

Then(/^I should (|not )see "([^"]*)" in the url$/, seeContentInUrl);

Then(/^I debug$/, debugIssues);


Then(/^I verify tab navigation sequence:$/, tabNavigationSequence);

Then(/^I verify key and value in attribute "([^"]*)" in selector "([^"]*)":$/,getAttributeValueAsObjectAndVerify)

Then(/^I add xf personalize tag details:$/, addXfPersonalizeTags);

Then(/^I select circular loader size of xf "([^"]*)"$/, selectXfCircleLoaderSize);
Then(/^I set value "([^"]*)" in selector "([^"]*)"$/, setInputValue);

Then(/^I should (|not )see selector "([^"]*)"$/, seeSelector);

Then(/^I should rollout page$/, rolloutPage);

Then(/^I save page as:$/, savePageAs);

Then(/^I should see href link "([^"]*)" in an anchor tag$/, seeHrefLinkInAnchorTag)

Then(/^I should select quantity "([^"]*)" in the quantity selector$/, selectQuantitySelector);

Then(/^I update the cf offers "([^"]*)":$/, updateCFOffers);

Then(/^I verify the qs dropdown increment of "([^"]*)" starting from "([^"]*)" to "([^"]*)"$/, verifyQSDropdownIncrement);

Then(/^I click on Add Navigation Items button$/, clickOnAddNavigationItemsButton);

Then(/^I click button "([^"]*)" of element with selector "([^"]*)"$/, clickButtonOfElementBySelector)

Then(/^I set the page as future variation$/, setFutureVariation);

Then(/^I export to Adobe target$/, exportToAdobeTarget);

Then(/^I update in Adobe target$/, updateInAdobeTarget);

Then(/^I select all text as link and configure settings for this link:$/, selectAllTextAndConfigureSettingsForLink);

Then(/^I click Publish Page Downstream$/, clickPublishPageDownstream);

Then(/^I launch "([^"]*)" page in downstream enviornment$/, launchPageDownstream);

/** Step Definition:
 * ```
 * /^I click (Configure|Copy) of Consonant card collection$/
 * ```
 */
function clickConfigureIconConsCardCollection(icon) {
  this.page.retryAction(10, 1000, () => {
    this.page.clickEditable(browser.$('[title="Consonant Card Collection"]'));
    this.page.waitForDisplayed('editableToolbar', 10000);
    this.page.click(`${icon.toLowerCase()}Button`);
    this.page.waitForDisplayed('modalDialog');
  });
}

/**
 * Step Definition:
 * ```
 * /^I click on the element in Dexter author "([^\"]*)"$/
 * ```
 * @param {string} elementName Element name
 */
function clickElementDex(elementName) {
  this.page.checkElementName(elementName).click();
  browser.pause(2000);
}

/**
 * Step Definition:
 * ```
 * /^I click on the element in Dexter author "([^\"]*)"$/
 * ```
 * @param {string} elementName Element name
 */
function closeXFPickerOverlay() {
  this.page.XFPickerOverlayClose.click();
  browser.pause(1000);
}

/**
 * Step Definition:
 * ```
 * /^I should (|not )see label "([^"]*)"$/
 * ```
 */
function shouldSeelabel(neg, text) {
  let xpath = `//label[text()="${text}"]`;
  let elem = browser.$(xpath);
  if (neg === '') {
    expect(elem).toBeDisplayed();
  } else {
    expect(elem).not.toBeDisplayed();
  }
}

Then(/^I should see page title as "([^"]*)"$/, iValidatePageTitle);

Then(
  /^I should see color "([^\"]*)" for element containing text "([^\"]*)"$/,
  verifyColor
);

Then(/^I should see table header with text "(.*)"$/, validateTextInTableHeader);

Then(
  /^I insert a component "([^"]*)" in "([^"]*)"$/,
  insertComponentInSomePlace
);

Then(
  /^I should see css style for element "([^"]*)":$/,
  shouldSeeCSSStyleForElement
);

Then(/^I (hover|click) on element "([^"]*)"$/, operateOnElement);

Then(/^I switch to Iframe with ID "(.*)"$/, switchToIFrame);

Then(
  /^I verify edit and edit fullscreen feature of the text component$/,
  verifyEditModeOfText
);

Then(
  /^I insert a component "([^\"]*)" inside modal$/,
  insertComponentInsideModal
);

Then(
  /^I click (Configure|Copy|Cut|Delete|Paste) of "([^"]*)" component$/,
  clickIconNewComnponentOfAnyComponent
);

Then(
  /^I open Configuration dialog of "([^"]*)" component$/,
  openConfigurationDialogOfAnyComponent
);

Then(
  /^I click (Save|Cancel) in page properties Configuration dialog$/,
  clickButtonInPagePropertiesConfigurationDialog
);

Then(/^I open page properties$/, openPageProperties);

Then(/^I open page properties of XF$/, openPagePropertiesOfXF);

Then(/^I open editor's side panel in XF$/, openEditorSidePanelInXF);

Then(/^I select asset from side panel in XF$/, selectAssetFromSidePanelInXF);

Then(/^I view the page in view as published mode$/, viewAsPublished);

Then(
  /^I open Configure Button dialog in the position component$/,
  openConfigureButtonDialogInPositionComponent
);

Then(
  /^I should see "([^\"]*)" color is(| not) "([^\"]*)" on element "([^\"]*)"$/,
  shouldSeeColorChange
);

Then(/^I switch to tab "([^"]*)" on author$/, switchToTabInAuthor);

Then(/^I wait for the card collection to load$/, waitForCaaStoLoad);

Then(
  /^I create a new variation in experience fragment:$/,
  createNewXFVariation
);

Then(/^I validate the Send Me Link page:$/, validateSendMeLink);

Then(
  /^I validate the carousel page with text content and transition type:$/,
  validateCarouselWithTextContent
);

Then(/^Then I refresh the page$/, refreshPage);

function goToAemStart() {
  this.page = new AemStartPage();
  this.page.load();
}

function disableUserOnboarding(page) {
  browser.pause(1000);
  if (page.onboardingPopup.isDisplayed()) {
    page.onboardingPopup.$('.coral3-Checkbox-input').click();
    page.onboardingPopup.$$('button')[0].click();
  }
}

function dismisSurvey(page) {
  browser.pause(1000);
  if (page.surveyPopup.isDisplayed()) {
    let ratings = page.surveyPopup.$$('iCheck-helper');
    ratings[ratings.length - 1].click();
    page.surveyPopup.$('button').click();
  }
}
/**
 * Step Definition:
 * ```
 * /^I create a new content page:$/
 * ```
 */
function createNewContentPage(table) {
  let specs = table.rowsHash();
  if (specs['Folder'].includes('${TestFolder}')) {
    let fldr = browser.config.profile.testFolder;
    specs['Folder'] = specs['Folder'].replace('${TestFolder}', fldr);
  }

  if (specs['Template'].includes('${TestCaaSTemplate}')) {
    if (!browser.config.profile.caasTemplate) {
      throw 'No CaaS template in profiles';
    }
    specs['Template'] = [
      browser.config.profile.templateFolder,
      browser.config.profile.caasTemplate
    ].join('/');
  }
  this.page = new AemAuthorSitesPage(specs['Folder']);
  this.page.open();

  // Need to handle onboarding or survey popup
  let retry = 5;
  while (retry-- > 0) {
    try {
      this.page.click('createButton');
      this.page.click('createPage');
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
  if (specs['Page Name'].includes('${DateTime}')) {
    let d = new Date();
    // Hack. Use se Date and Time format
    let ts = `${d.toLocaleDateString('se')}T${d.toLocaleTimeString('se')}`;
    ts = ts.replace(/:/g, '-');
    specs['Page Name'] = specs['Page Name'].replace('${DateTime}', ts);
    this.testPageName = specs['Page Name'];
  }
  this.page.click('nextButton');
  this.page.setValue('titleInput', specs['Title'], 30000);
  this.page.setValue('pageNameInput', specs['Page Name']);
  this.page.click('nextButton');
  this.page.click('openButton');
  //Disable subnav
  disableSubnav(specs['Folder'] + '/' + specs['Page Name']);
}

function waitForCaaStoLoad() {
  this.context(AemAuthorEditorPage);
  if (this.page.sysErrorMessage.isDisplayed()) {
    this.page.retryExpect(10, 1000, () => {
      browser.refresh();
      browser.pause(2000);
      expect(this.page.sysErrorMessage).not.toBeDisplayed();
    });
  }
  this.page.waitForEnabled('caasComponent', 30000);
  browser.pause(3000);
  this.page.retryExpect(10, 1000, () => {
    expect(this.page.caasComponent).toBeDisplayed();
  });
}

/**
 * Step Definition:
 * ```
 * /^I create a new content page in the test folder:$/
 * ```
 */
function createNewContentPageInTestFolder(table) {
  if (!browser.config.profile.testFolder) {
    throw 'No "testFolder" in the current profile';
  }
  table.rawTable.push(['Folder', browser.config.profile.testFolder]);
  let template = table.rawTable.find(x => x[0] === 'Template');
  if (template) {
    if (!template[1].startsWith('/')) {
      if (!browser.config.profile.templateFolder) {
        throw 'No "templateFolder" in the current profile';
      }
      template[1] = [browser.config.profile.templateFolder, template[1]].join(
        '/'
      );
    }
  } else {
    if (
      !browser.config.profile.templateFolder ||
      !browser.config.profile.defaultTemplate
    ) {
      throw 'No "templateFolder" or "defaultTemplate" in the current profile';
    }
    table.rawTable.push([
      'Template',
      [
        browser.config.profile.templateFolder,
        browser.config.profile.defaultTemplate
      ].join('/')
    ]);
  }
  createNewContentPage.call(this, table);
}

/**
 * Step Definition:
 * ```
 * /^I use API to create a new content page:$/
 * ```
 */
function createNewContentPageAPI(table) {
  let specs = table.rowsHash();
  let urlPath = '/libs/wcm/core/content/sites/createpagewizard/jcr:content';

  const formData = new URLSearchParams();
  formData.append('parentPath', specs['Folder']);
  formData.append('template', specs['Template']);
  formData.append('./jcr:title', specs['Title']);
  formData.append('pageName', specs['Page Name']);

  let auth = browser.config.aemAccounts.author;

  let res = requestPost(urlPath, formData, {
    baseURL: browser.config.profile.baseUrl,
    auth,
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
  });

  return res.data;
  // equivalent curl command:
  // curl -u username:password -X POST
  // -F "parentPath=/content/dx-dc/us/en/temp-dx/test/TestCreate0"
  // -F "template=/conf/doccloud/settings/wcm/templates/full-width-with-globalnav"
  // -F "./jcr:title=Test Create"
  // -F "pageName=TestCreate"
  //"https://dx-dc-author-dev02.acrobat.adobe.com/libs/wcm/core/content/sites/createpagewizard/jcr:content"
}
/**
 * Step Definition:
 * ```
 * /^I verify the created card is (|not )present$/
 * ```
 */
function verifyCard(neg) {
  if (neg === '') {
    this.page.retryExpect(5, 1000, () => {
      expect(browser.$('body')).toHaveTextContaining(this.dateTimeValue);
    });
  } else {
    expect(browser.$('body')).not.toHaveTextContaining(this.dateTimeValue);
  }
}

function disableSubnav(contentPath) {
  try {
    // check if there a subnav node
    let baseURL = browser.config.profile.baseUrl;
    let auth = browser.config.aemAccounts.author;
    let gnavPath = `${contentPath}/jcr:content/root/globalnavheader`;
    let urlPath = `${gnavPath}.json`;
    let res = requestGet(urlPath, {
      baseURL,
      auth
    });
    // if no, throw an exception
    // if yes, continue and disable subnav
    urlPath = `${gnavPath}/subnav`;
    let formData = new URLSearchParams();
    formData.append('jcr:primaryType', 'nt:unstructured');
    res = requestPost(urlPath, formData, {
      baseURL,
      auth,
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    });

    urlPath = `${gnavPath}/subnav/disable`;
    formData.append('disable', true);
    formData.append('disable@TypeHint', 'Boolean');
    formData.append('type', 'override');
    res = requestPost(urlPath, formData, {
      baseURL,
      auth,
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    });
  } catch (err) {
    console.log('Unable to disable SubNav');
  }
}

/**
 * Step Definition:
 * ```
 * /^I have the page "([^"]*)" in the test folder:$/
 * ```
 */
function havePageInTestFolder(contentName) {
  // allow timestamp is content name
  if (contentName.includes('${DateTime}')) {
    let d = new Date();
    // Hack. Use se Date and Time format
    let ts = `${d.toLocaleDateString('se')}T${d.toLocaleTimeString('se')}`;
    ts = ts.replace(/:/g, '-');
    contentName = contentName.replace('${DateTime}', ts);
  }
  // save the value for later use
  let testFolder = browser.config.profile.testFolder;
  this.testPageName = contentName;
  deletePageInTestFolder.call(this, contentName);
  let table = new DataTable({ rows: [] });
  table.rawTable.push(['Folder', testFolder]);
  table.rawTable.push([
    'Template',
    [
      browser.config.profile.templateFolder,
      browser.config.profile.defaultTemplate
    ].join('/')
  ]);
  table.rawTable.push(['Title', 'Test Page']);
  table.rawTable.push(['Page Name', contentName]);
  createNewContentPageAPI.call(this, table);
  disableSubnav(`${testFolder}/${contentName}`);
}

/**
 * Step Definition:
 * ```
 * /^I have the page "([^"]*)" in the current test page folder:$/
 * ```
 */
function havePageInCurrentTestPageFolder(contentName, title) {
  // allow timestamp is content name
  if (contentName.includes('${DateTime}')) {
    let d = new Date();
    // Hack. Use se Date and Time format
    let ts = `${d.toLocaleDateString('se')}T${d.toLocaleTimeString('se')}`;
    ts = ts.replace(/:/g, '-');
    contentName = contentName.replace('${DateTime}', ts);
  }
  // save the value for later use
  let testFolder = browser.config.profile.testFolder + '/' + this.testPageName;
  this.testChildPageName = contentName;
  deletePageInTestFolder.call(this, contentName);
  let table = new DataTable({ rows: [] });
  table.rawTable.push(['Folder', testFolder]);
  table.rawTable.push([
    'Template',
    [
      browser.config.profile.templateFolder,
      browser.config.profile.defaultTemplate
    ].join('/')
  ]);
  table.rawTable.push(['Title', title]);
  table.rawTable.push(['Page Name', contentName]);
  createNewContentPageAPI.call(this, table);
  disableSubnav(`${testFolder}/${contentName}`);
}

/**
 * Step Definition:
 * ```
 * /^I edit the page "([^"]*)"$/
 * ```
 */
function editPage(contentPath) {
  this.page = new AemAuthorEditorPage();
  this.page.edit(contentPath);
  // It may have the onboarding popup
  this.page.waitForDisplayed('pageTitle');
  disableUserOnboarding(this.page);  
}

/**
 * Step Definition:
 * ```
 * /^I edit the page "([^"]*)" in the test folder$/
 * ```
 */
function editPageInTestFolder(contentName) {
  if (!browser.config.profile.testFolder) {
    throw 'No "testFolder" in the current profile';
  }
  editPage.call(
    this,
    [browser.config.profile.testFolder, contentName].join('/')
  );
}

/**
 * Step Definition:
 * ```
 * /^I edit the test page in the test folder$/
 * ```
 */
function editTestPageInTestFolder() {
  // This step should be after
  // /^I have the page "([^"]*)" in the test folder:$/
  // It sets this.testPageName
  editPageInTestFolder.call(this, `${this.testPageName}.html`);
  console.log(browser.getUrl());
}

/**
 * Step Definition:
 * ```
 * /^I edit the test child page under the test page$/
 * ```
 */
function editTestChildPageUnderTestPage() {
  // This step should be after
  // /^I have the page "([^"]*)" in the test folder:$/
  // It sets this.testPageName
  editPageInTestFolder.call(
    this,
    `${this.testPageName}/${this.testChildPageName}.html`
  );
  console.log(browser.getUrl());
}

/**
 * Step Definition:
 * ```
 * /^I delete the (?:page|asset) "([^"]*)"$/
 * ```
 */
function deletePage(contentPath) {
  let auth = browser.config.aemAccounts.author;
  let author = new AemAuthor(browser.config.profile.baseUrl, auth);
  author.deletePage(contentPath);
}

/**
 * Step Definition:
 * ```
 * /^I delete the page "([^"]*)" in the test folder$/
 * ```
 */
function deletePageInTestFolder(contentName) {
  if (!browser.config.profile.testFolder) {
    throw 'No "testFolder" in the current profile';
  }
  deletePage.call(
    this,
    [browser.config.profile.testFolder, contentName].join('/')
  );
}

/**
 * Step Definition:
 * ```
 * /^I delete the tag "([^"]*)" in the tags folder$/
 * ```
 */
function deleteTagInTagsFolder(contentName) {
  if (!browser.config.profile.tagsFolder) {
    throw 'No "tagsFolder" in the current profile';
  }
  deletePage.call(
    this,
    [browser.config.profile.tagsFolder, contentName].join('/')
  );
}

/**
 * Step Definition:
 * ```
 * /^I delete all test pages in the test folder$/
 * ```
 */
function deleteAllTestPagesInTestFolder() {
  let auth = browser.config.aemAccounts.author;
  let author = new AemAuthor(browser.config.profile.baseUrl, auth);
  let contentPath = browser.config.profile.testFolder;
  let pages = author.getChildPages(contentPath);
  for (let page in pages) {
    if (page.match(/Test-(\d+)-(\d+)-(\d+)T(\d+)-(\d+)-(\d+)/)) {
      let testPage = contentPath + '/' + page;
      console.log(testPage);
      author.deletePage(testPage);
    }

    if (page.match(/Test-(.+)-(\d+)-(\d+)-(\d+)T(\d+)-(\d+)-(\d+)/)) {
      let testPage = contentPath + '/' + page;
      console.log(testPage);
      author.deletePage(testPage);
    }
  }
}

/**
 * Step Definition:
 * ```
 * /^I delete all test XFs in the test folder$/
 * ```
 */
 function deleteAllTestXFsInTestFolder() {
  let auth = browser.config.aemAccounts.author;
  let author = new AemAuthor(browser.config.profile.baseUrl, auth);
  let contentPath = browser.config.profile.xfFolder;
  let pages = author.getChildPages(contentPath);
  for (let page in pages) {
    if (page.match(/xf*/)) {
      let testPage = contentPath + '/' + page;
      console.log(testPage);
      author.deletePage(testPage);
    }
  }
}

/**
 * Step Definition:
 * ```
 * /^I delete all translate projects in the test folder$/
 * ```
 */
function deleteAllTranslateProjectsTestFolder() {
  this.step('I sign in as an author');
  this.step('I go to "projects.html/content/projects/testautomation"');
  this.page.retryAction(5, 1000, () => {
    $('.coral3-Icon--selectAll').click();
  });
  browser.pause(1000);
  this.page.retryAction(5, 1000, () => {
    $('//*[@data-foundation-command-label="Delete"]').click();
  });
  
  browser.pause(1000);
  this.page.retryAction(5, 1000, () => {
    $('[name="removeGroups"]').click();
    $('[type="submit"]').click();
  });
  browser.pause(5000);
}

/**
 * Step Definition:
 * ```
 * /^I insert a component "([^"]*)"$/
 * ```
 */
function insertComponent(component, modal) {
  this.context(AemAuthorEditorPage);
  let [group, comp] = component.split('/');
  let beforeInsert = '';

  this.page.retryAction(5, 1000, () => {
    // Click the root container and then the insert button
    if (modal != '' && modal.includes('modal')) {
      this.page.click('modalContainer');
    } else if (modal != '' && modal.includes('subnav')) {
      this.page.click('subnavContainer');
    } else {
      this.page.click('rootContainer');
    }
    this.page.click('insertButton');

    // To track the newly added component
    beforeInsert = browser.$$('div[data-type="Editable"]');
    beforeInsert = beforeInsert.map(x => x.getAttribute('data-path'));

    // Select group and component from the dialog
    this.page.selectComponent(group, comp);
  });

  let retry = 30;
  let newComponents = [];
  while (retry-- > 0) {
    // Save the newly added component is ThisWorld
    let afterInsert = browser.$$('div[data-type="Editable"]');
    newComponents = afterInsert.filter(
      x => !beforeInsert.find(y => y === x.getAttribute('data-path'))
    );
    if (newComponents.length > 0) {
      break;
    } else {
      browser.pause(1000);
      disableUserOnboarding(this.page);
    }
  }
  if (newComponents.length === 0) {
    throw `Failed to insert the component ${component}`;
  }
  this.newComponent = newComponents[0];
  currentComponent = newComponents[0].getAttribute('data-path');
}

/**
 * Step Definition:
 * ```
 * /^I type "([^"]*)" into Text component$/
 * ```
 */
function typeTextIntoTextComponent(text) {
  this.page.doComponentAction('edit', 'Text', 0);
  this.page.inputTextInFullScreen(text);
}

/**
 * Step Definition:
 * ```
 * /^I preview the edited page$/
 * ```
 */
function previewEditedPage() {
  this.page.click('previewButton');
}

/**
 * Step Definition:
 * ```
 * /^I delete all components$/
 * ```
 */
function deleteAllComponents() {
  let undeletables = [];
  this.page.waitForDisplayed('draggableComponent');
  while (true) {
    let editables = this.page.draggableComponents;
    let deleteCount = 0;
    editables = editables.filter(
      x => !undeletables.find(y => y === x.getAttribute('data-path'))
    );
    for (let editable of editables) {
      let dataPath = editable.getAttribute('data-path');
      this.page.retryAction(5, 1000, () => {
        this.page.clickEditable(editable);
        this.page.waitForDisplayed('editableToolbar', 10000);
      });

      let buttons = browser.$$('button[title="Delete"]');
      if (buttons.length > 0) {
        buttons[0].click();
        this.page.click('deleteWarningButton');
        browser.pause(1000);
      } else {
        undeletables.push(dataPath);
        this.page.clickEditable(this.page.overlayWrapper);
      }
      deleteCount++;
      break;
    }
    if (deleteCount === 0) {
      break;
    }
  }
}

/**
 * Step Definition:
 * ```
 * /^I switch to the editor tab$/
 * ```
 */
function switchToEditorTab() {
  browser.switchWindow('editor.html');
}

/**
 * Step Definition:
 * ```
 * /^I should see "([^"]*)" in the content frame$/
 * ```
 */
function shouldSeeTextInContentFrame(text) {
  browser.switchToFrame($('#ContentFrame'));
  expect(browser.$('body')).toHaveTextContaining(text);
  browser.switchToParentFrame();
}

/**
 * Step Definition:
 * ```
 * /^I click (Configure|Copy|Cut|Delete|xfDebugger) of the newly added component$/
 * ```
 */
function clickIconNewComnponent(icon) {
  this.page.retryAction(5, 1000, () => {
    this.page.clickEditable(this.newComponent);
    this.page.waitForDisplayed('editableToolbar', 10000);
    this.page.click(`${icon.toLowerCase()}Button`);
    if (icon === 'Configure') {
      this.page.waitForDisplayed('modalDialog');
    }
  });
}

/**
 * Step Definition:
 * ```
 * /^I click (Configure|Copy) of gnav header$/
 * ```
 */
function clickIconGnavHeader(icon) {
  this.page.retryAction(10, 1000, () => {
    this.page.clickEditable(browser.$('[title="GlobalNav Header [Root]"]'));
    this.page.waitForDisplayed('editableToolbar', 10000);
    this.page.click(`${icon.toLowerCase()}Button`);
    this.page.waitForDisplayed('modalDialog');
  });
}

/**
 * Step Definition:
 * ```
 * /^I click (Configure|Copy) of "([^\"]*)" subnav link$/
 * ```
 */
function clickIconSubnavLink(icon, nthSubLink) {
  this.page.retryAction(5, 1000, () => {
    this.page.clickEditable(
      browser.$$(
        '//div[contains(@data-path,"globalnavheader/subnav/childLinks/subnavlink") and contains(@title, "Subnav Link")]'
      )[cardinal(nthSubLink)]
    );
    this.page.waitForDisplayed('editableToolbar', 10000);
    this.page.click(`${icon.toLowerCase()}Button`);
    this.page.waitForDisplayed('modalDialog');
  });
}

/**
 * Step Definition:
 * ```
 * /^I configure the newly added component$/
 * ```
 * This step opens and closes Configuration dialog
 * without changing anything
 */
function configureNewComnponent() {
  clickIconNewComnponent.call(this, 'Configure');
  browser.pause(2000);
  this.page.click('dialogCancel');
}

/**
 * Step Definition:
 * ```
 * /^I configure the newly added component:$/
 * ```
 * This step should be followed by a setting table. e.g.
 *  | General       | ----------- |
 *  | Button Text * | Button Name |
 *  | Spacing       | ----------- |
 *  | Top Padding   | 4px         |
 * It lists settings in each tab.
 */
function configureNewComnponentSettings(table) {
  openConfigurationDialog.call(this);
  let settings = table.rawTable;
  let tabs = [];
  let tab = null;
  let tabSettings = null;
  for (let i = 0; i < settings.length; i++) {
    if (Array.from(settings[i][1]).every(c => c === '-')) {
      tab = settings[i][0];
      tabSettings = new DataTable({ rows: [] });
      if (tab) {
        tabs.push({ name: tab, settings: tabSettings });
      }
    } else if (tab) {
      tabSettings.rawTable.push(settings[i]);
    }
  }
  if (tabs.length > 0) {
    for (let t of tabs) {
      //Adding blank parameter for breakpoint
      configureSettingsInTab.call(this, t.name, '', t.settings);
    }
  } else {
    //Adding blank parameter for breakpoint
    configureSettingsInTab.call(this, 'None', '', table);
  }
  clickButtonToCloseConfigurationDialog.call(this, 'Done');
}

/**
 * Step Definition:
 * ```
 * /^I create a new experience fragment:$/
 * ```
 * Function to create a new experience fragment
 * @param {object} table
 */
function createNewXF(table) {
  let specs = table.rowsHash();

  let auth = browser.config.aemAccounts.author;
  let author = new AemAuthor(browser.config.profile.baseUrl, auth);
  
  author.createFolder(specs['Folder']);

  this.page = new AemAuthorXF(specs['Folder']);
  this.page.open();
  disableUserOnboarding(this.page);
  this.page.click('createButton');
  this.page.click('createPage');
  this.page.waitForDisplayed('templateCard');
  let cards = this.page.templateCards;
  for (let card of cards) {
    let itemId = card.getAttribute('data-foundation-collection-item-id');
    if (itemId === specs['Template']) {
      card.click();
    }
  }
  this.page.click('nextButton');
  this.page.setValue('titleInput', specs['Title']);
  this.page.setValue('pageNameInput', specs['Page Name']);
  this.page.click('nextButton');
  this.page.click('openButton');
  console.log(browser.getUrl());
}

/**
 * Step Definition:
 * ```
 * /^I open Configuration dialog of the newly added component$/
 * ```
 */
function openConfigurationDialog() {
  this.step('I click Configure of the newly added component');
}

/**
 * Step Definition:
 * ```
 * /^I open Configuration dialog of gnav header$/
 * ```
 */
function openConfigurationDialogGnavHeader() {
  this.step('I click Configure of gnav header');
}

/**
 * Step Definition:
 * ```
 * /^I open Configuration dialog of "([^\"]*)" subnav link$/
 * ```
 */
function openConfigurationDialogSubnavLink(nthSubLink) {
  this.step(`I click Configure of "${nthSubLink}" subnav link`);
}

/**
 * Step Definition:
 * ```
 * /^I should (|not )see Configuration dialog$/
 * ```
 */
function shouldSeeConfiguationDialog(neg) {
  if (neg === '') {
    expect(this.page.modalDialog).toBeDisplayed();
  } else {
    expect(this.page.modalDialog).not.toBeDisplayed();
  }
}

/**
 * Step Definition:
 * ```
 * /^I click (Done|Cancel) in Configuration dialog$/
 * ```
 */
function clickButtonInConfigurationDialog(button) {
  this.context(AemAuthorEditorPage);
  this.page.click(`dialog${button}`);
  // ensuring the dialog box is closed
  try {
    expect(this.page.modalDialog).not.toBeDisplayed();
  } catch (error) {
    // retry
    this.page.click(`dialog${button}`);
  }

  // expect box to close now
  let invalidField = $$(`//*[contains(@class,"is-invalid")]`)[0];
  if(!invalidField){
    expect(this.page.modalDialog).not.toBeDisplayed();
  }
  else {
    expect(this.page.modalDialog).toBeDisplayed();
  }
}

/**
 * Step Definition:
 * ```
 * /^I click (Done|Cancel) to close Configuration dialog$/
 * ```
 */
function clickButtonToCloseConfigurationDialog(button) {
  this.page.clickAndWait(`dialog${button}`, `modalDialog`, {
    reverse: true
  });
}

/**
 * Step Definition:
 * ```
 * /^I should (|not )see invalid configuration for "([^"]*)" tab$/
 * ```
 */
function shouldSeeInvalidConfiguration(neg, tabName) {
  let tab = this.page.getTabPanel(tabName);
  if (neg === '') {
    expect(tab).toHaveAttrContaining('class', 'is-invalid');
  } else {
    expect(tab).not.toHaveAttrContaining('class', 'is-invalid');
  }
}

/**
 * Step Definition:
 * ```
 * /^I select "([^"]*)" tab in Configuration dialog$/
 * ```
 */
function selectTabInConfigurationDialog(tabName) {
  this.context(CompConfigurationSection);
  this.page.selectTab(tabName);
}

/**
 * Step Definition:
 * ```
 * /^I configure settings in "([^"]*)" tab:$/
 * ```
 */
function configureSettingsInTab(tabName, breakpoint, table) {
  if (tabName !== 'None') {
    selectTabInConfigurationDialog.call(this, tabName);
    browser.pause(500);
  }
  let settings = table.rawTable;
  for (let i = 0; i < settings.length; i++) {
    let retry = 10;
    while (retry-- > 0) {
      let [label, value] = settings[i];
      label = label.replace(/"/g, '');
      let varMatch = value.match(/<profile\.(.+)\>/);
      if (varMatch) {
        value = value.replace(varMatch[0], browser.config.profile[varMatch[1]]);
      }

      try {
        if (value.match(/@#\d+/)) {
          // Multifield items
          let mfLabel = label;
          let mfId = parseInt(value.match(/@#(\d+)/)[1]) - 1;
          let mfItems = [];
          mfItems.push([]);
          while (i + 1 < settings.length) {
            let [subLabel, subValue] = settings[i + 1];
            if (subLabel.startsWith('-')) {
              mfItems[mfId].push([subLabel.match(/-\s*(.*)/)[1], subValue]);
              i += 1;
            } else if (subLabel === mfLabel) {
              mfId = parseInt(subValue.match(/@#(\d+)/)[1]) - 1;
              mfItems.push([]);
              i += 1;
            } else {
              break;
            }
          }
          this.page.configureMultifieldItems(mfLabel, mfItems);
          break;
        }
        try {
          this.page.waitForLabel(label);
        } catch (err) {
          console.log(`Continuing even if ${label} still not displayed.`);
        }
        if (
          label === 'Custom Width' &&
          value.match(/(\d+)\s(Pixels|Percent)/)
        ) {
          let valueMatch = value.match(/(\d+)\s(Pixels|Percent)/);
          browser.$('input[name="./customWidth"]').setValue(valueMatch[1]);
          let selectXPath = '//coral-select[@name="./customWidthType"]';
          browser.$(`${selectXPath}//button`).click();
          browser
            .$(
              `${selectXPath}//coral-selectlist-item[text()="${valueMatch[2]}"]`
            )
            .click();
        } else if (label === '' && value === 'Override') {
          // DC Converter App: Tablet and Desktop tabs has no label for Override.
          this.page.setSelectField(label, 'Override');
        } else if (label.match(/(Top|Right|Left|Bottom) (Padding|Margin)/)) {
          if (breakpoint != '') {
            this.page.setSliderValue(label, value, breakpoint);
          } else {
            this.page.setSliderValue(label, value);
          }
        } else if (label.match(/(Layer Position)/)) {
          if (breakpoint != '') {
            this.page.setSliderValue(label, value, breakpoint);
          } else {
            this.page.setSliderValue(label, value);
          }
        } else if (['checked', 'unchecked'].includes(value)) {
          this.page.selectCheckbox(label, value === 'checked');
        } else if (value.match(/Assets:Images:(.+)/)) {
          let regMatch = value.match(/Assets:Images:(.+)/);
          let elems = this.page.assetCards.filter(x =>
            //x.getAttribute('data-path').match(/.jpg|.png|.svg/)
            // Sometimes images don't have an extension
            x.getAttribute('data-type') === 'Images'
          );
          let index = cardinal(regMatch[1].toLowerCase());
          let elem = elems[index];
          this.images = this.images || {};
          this.images[value] = elem.getAttribute('data-path');
          let target = this.page.getFileUpload(label);
          elem.dragAndDrop(target);
        } else if (value.startsWith('button')) {
          this.page.getButton(label, value).click();
        } else if (this.page.getSelectField(label)) {
          this.page.setSelectField(label, value);
        } else if (this.page.getSpacingSelectField(label)) {
          this.page.setSpacingSelectField(label, value);
        } else if (value.match(/^\/content\/dam\/.+\.(jpg|png|svg)$/)) {
          let elem = $(`//coral-card[@data-path="${value}"]`);
          let target = this.page.getFileUpload(label);
          elem.dragAndDrop(target);
        } else if (this.page.getMultiplePicker(label)) {
          this.page.setMultiplePicker(label, value);
        } else {
          let retry = 5;
          while (retry-- > 0) {
            try {
              let elem = this.page.getInputField(label);
              if (value.includes('${DateTime}')) {
                let d = new Date();
                // Hack. Use se Date and Time format
                let ts = `${d.toLocaleDateString('se')}T${d.toLocaleTimeString(
                  'se'
                )}`;
                ts = ts.replace(/:/g, '-');
                value = value.replace('${DateTime}', ts);
                elem.setValue(value);
                this.dateTimeValue = value;
              }
              //To skip item selection, for Offer selector tool wizard to open and proceed with offer selection
              if (value === "Browse")
              {break;}
              elem.setValue(value);
              let actual = elem.getValue();
              if (actual === value) {
                break;
              }
            } catch (err) {
              if (retry === 0) {
                throw err;
              }
              browser.pause(500);
            }
          }
        }
        break;
      } catch (err) {
        if (retry === 0) {
          // Done with retry. Give up.
          err.message += `\nError while inputting the value "${value}" into the field "${label}"`;
          throw err;
        }
        // There may be a suggestion list. Dismiss it.
        if (this.page.overlays.length > 0) {
          browser.keys('Escape');
          browser.pause(500);
        }

        browser.pause(500);
      }
    }
    browser.pause(500);
  }
}

/**
 * Step Definition:
 * ```
 * /^I configure settings:$/
 * ```
 */
function configureSettings(table) {
  //Adding blank parameter for breakpoint
  configureSettingsInTab.call(this, 'None', '', table);
}

/**
 * Step Definition:
 * ```
 * /^I configure settings for "([^"]*)":$/
 * ```
 * This is only for Accordion component for now.
 */
function configureSettingsFor(group, table) {
  let items = table.hashes();
  if (group == 'Navigation Items') {
    this.page.configureNavigationItems(items);
  } else {
    this.page.configureAccordionItems(items);
  }
}

/**
 * Step Definition:
 * ```
 * /^I open editor's side panel$/
 * ```
 */
function openEditorSidePanel() {
  this.page.clickAndWait(`sidePanelToggleButton`, `assetsTab`);
}

/**
 * Step Definition:
 * ```
 * /^I open (Assets|Components|Content Tree) tab on the side panel$/
 * ```
 */
function openTabOnSidePanel(tab) {
  openEditorSidePanel.call(this);
  let count = 5;
  while (count-- > 0) {
    try {
      browser.$(`[title="${tab}"]`).click();
      browser.pause(500);
      let text = this.page.sidePanelTitle.getText();
      if (text === tab) {
        break;
      }
    } catch (err) {
      console.log(`Retry opening side panel tab "${tab}"`);
    }
  }
}

/**
 * Step Definition:
 * ```
 * /^I open the edited page on preview mode$/
 * ```
 */
function openEditedPageOnPreviewMode(urlParams) {
  // Sometimes, need to lose focus to trigger saving events
  // Try to click page title
  this.context(AemAuthorEditorPage);
  if (this.page.editableToolbar.isDisplayed()) {
    // Esc doesn't work
    //browser.keys('Escape');
    this.page.click('pageTitle');
  }
  let url = browser.getUrl();
  url = url.replace('editor.html/', '') + '?wcmmode=disabled';
  if (urlParams) {
    url += urlParams;
  }
  browser.pause(1000);
  browser.navigateTo(url);

  browser.waitUntil(
    () => browser.execute(() => document.readyState === 'complete'),
    {
      timeout: 60000,
      timeoutMsg: 'Timeout waiting for page ready',
      interval: 1000
    }
  );
}

/**
 * Step Definition:
 * ```
 * /^I view the edited page as published(| on (.+))$/
 * ```
 * @param {*} device Device name to be emulated
 */
function viewEditedPageAsPublished(device) {
  // Sometimes, need to lose focus to trigger saving events
  // Try to click page title
  this.context(AemAuthorEditorPage);
  if (this.page.editableToolbar.isDisplayed()) {
    // Esc doesn't work
    //browser.keys('Escape');
    this.page.click('pageTitle');
  }
  if (device) {
    browser.emulateDevice(device);
  }
  let url = browser.getUrl();
  url = url.replace('editor.html/', '') + '?wcmmode=disabled';
  browser.pause(1000);
  browser.navigateTo(url);
}

function quoteText(text) {
  if (text.includes('"')) {
    return `'${text}'`;
  } else {
    return `"${text}"`;
  }
}

/**
 * Step Definition:
 * ```
 * /^I should see the image "([^"]*)"$/
 * ```
 * @param {*} name Image name
 */
function shouldSeeImage(name) {
  let image = this.images[name];
  console.log(image); //picture/source[contains(@srcset, "1970")]
}

/**
 * Step Definition:
 * ```
 * /^I should (|not )see (any|an|\d+) element(?:|s) with attributes(| inside an iframe):$/
 * ```
 */
function shouldSeeAnElementWithAttributes(neg, elementCount, frame, table) {
  // Use XPath
  // Using CSS need to handle id and class specially
  let rawTable = table.rawTable;
  let attribs = [];
  for (let row of rawTable) {
    if (row.length === 2) {
      if(row[0]==="text") {
        attribs.push(`${row[0]}()=${quoteText(row[1])}`);
      } else {
        attribs.push(`@${row[0]}=${quoteText(row[1])}`);
      }
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
  elementCount = elementCount === 'an' ? '1' : elementCount;
  try {
    if (neg === '') {
      expect(elems.length).toEqual(parseInt(elementCount));
    } else {
      expect(elems.length).toEqual(0);
    }
  } catch (e) {
    e.message += `\nFinding elements: "${xpath}"`;
    throw e;
  }
}

function expandAttrVariable(value) {
  const path = require('path');
  let m = value.match(/<(Assets:Images:.+)>/);
  if (m) {
    return path.parse(this.images[m[1]]).name;
  }
  return value;
}

/**
 * Step Definition:
 * ```
 * /^I should see an element "([^"]*)" with attributes:$/
 * ```
 * @param element
 * @param table
 */
function shouldSeeAnElementNameWithAttributes(element, table) {
  let rawTable = table.rawTable;
  let attribs = [];
  for (let row of rawTable) {
    if (row.length === 2) {
      let value = expandAttrVariable.call(this, row[1]);
      attribs.push(`@${row[0]}=${quoteText(value)}`);
    } else if (row.length === 3) {
      let value = expandAttrVariable.call(this, row[2]);
      if (row[1] === '=') {
        attribs.push(`@${row[0]}=${quoteText(value)}`);
      } else {
        attribs.push(`${row[1]}(@${row[0]},${quoteText(value)})`);
      }
    } else {
      throw 'Invalid attribute table';
    }
  }
  attribs = attribs.join(' and ');
  let xpath = `//${element}[${attribs}]`;
  let elems = browser.$$(xpath);
  try {
    expect(elems.length).toEqual(1);
  } catch (e) {
    e.message += `\nFinding elements: "${xpath}"`;
    throw e;
  }
}

/**
 * Step Definition:
 * ```
 * /^I should (|not )see invalid configuration in "([^"]*)" tab for field$/
 * ```
 */
function shouldSeeInvalidConfigurationForFields(neg, tabName, table) {
  selectTabInConfigurationDialog.call(this, tabName);
  let settings = table.rawTable;
  for (let row of settings) {
    let elem = this.page.getInputField(row[0]);
    if (neg === '') {
      expect(elem).toHaveAttrContaining('class', 'is-invalid');
    } else {
      expect(elem).not.toHaveAttrContaining('class', 'is-invalid');
    }
  }
}

/**
 * Step Definition:
 * ```
 * /^I should see height (\d+)px for element "([^"]*)"$/
 * ```
 * @param {*} height Expected height in pixels
 * @param {*} selector Selector of the element
 */
function shouldSeeHeightForElement(height, selector) {
  let elem = browser.$(selector);
  if (!elem.isDisplayed()) {
    throw `Element "${selector}" is not found`;
  }
  expect(elem.getSize().height).toEqual(parseInt(height));
}

/**
 * Step Definition:
 * ```
 * /^I should see the styles for element "([^"]*)":$/
 * ```
 * @param {*} selector Selector of the element
 * @param {*} table Table of expected styles
 */
function shouldSeeStylesForElement(selector, table) {
  let expectedStyles = table.rawTable;

  let elem = browser.$(selector);
  if (!elem.isDisplayed()) {
    throw `Element "${selector}" is not found`;
  }
  let aggregate = [];
  for (let [prop, expected] of expectedStyles) {
    let actual = elem.getCSSProperty(prop);
    try {
      expect(actual.value).toEqual(expected);
    } catch (err) {
      aggregate.push(err);
    }
  }

  // append other error messages to the first one
  if (aggregate.length > 0) {
    aggregate[0].message = aggregate.map(x => x.message).join('\n');
    throw aggregate[0];
  }
}

/**
 * Step Definition:
 * ```
 * /^I insert "([^"]*)" into Layout container "([^"]*)"$/
 * ```
 */
function insertIntoLayoutContainer(component, container) {
  this.context(AemAuthorEditorPage);
  let [group, comp] = component.split('/');

  // To track the newly added component
  let beforeInsert = browser.$$('div[data-type="Editable"]');
  beforeInsert = beforeInsert.map(x => x.getAttribute('data-path'));

  this.page.retryAction(5, 1000, () => {
    // Click the root container and then the insert button
    this.page.clickLayoutContainer(container);
    this.page.click('insertButton');

    // Select group and component from the dialog
    this.page.selectComponent(group, comp);
  });

  // Save the newly added component is ThisWorld
  let afterInsert = browser.$$('div[data-type="Editable"]');
  let newComponents = afterInsert.filter(
    x => !beforeInsert.find(y => y === x.getAttribute('data-path'))
  );
  this.newComponent = newComponents[0];
}

/**
 * Step Definition:
 * ```
 * /^I copy "([^"]*)" into Layout container "([^"]*)"$/
 * ```
 */
function copyIntoLayoutContainer(componentEditable, container) {
  this.context(AemAuthorEditorPage);

  // Click the component and then the copy button
  let editable = browser.$(
    `//div[contains(@data-path,"${componentEditable}")]`
  );
  this.page.clickEditable(editable);
  this.page.click('copyButton');

  // Click the root container and then the paste button
  this.page.clickLayoutContainer(container);
  this.page.click('pasteButton');
}

/**
 * Step Definition:
 * ```
 * /^I type "([^"]*)" into Text component "([^"]*)"$/
 * ```
 */
function typeIntoTextComponent(text, componentPath) {
  this.page.doComponentAction('edit', componentPath);
  this.page.inputTextInFullScreen(text);
}

/**
 * Step Definition:
 * ```
 * /^I should (|not )see "([^"]*)" in Accordion contents$/
 * ```
 */
function shouldSeeInAccordionContent(neg, text) {
  let xpath = `//*[@class="spectrum-Accordion-itemContent"]//*[text()="${text}"]`;
  let elem = browser.$(xpath);
  if (neg === '') {
    expect(elem).toBeDisplayed();
  } else {
    expect(elem).not.toBeDisplayed();
  }
}

/**
 * Step Definition:
 * ```
 * /^I click the (1st|2nd|3rd) Accordion header$/
 * ```
 */
function clickAccordionHeader(ordinal) {
  let index = cardinal(ordinal);
  $('.spectrum-Accordion-itemHeader').waitForDisplayed();
  let accordionHeaders = browser.$$('.spectrum-Accordion-itemHeader');
  accordionHeaders[index].click();
}

/**
 * Step Definition:
 * ```
 * /^I select the newly added component$/
 * ```
 */
function selectTheNewlyAddedComponent() {
  this.context(AemAuthorEditorPage);

  this.newComponent = browser.$(`div[data-path="${currentComponent}"]`);
}

/**
 * Step Definition:
 * ```
 * /^I should see the alert icon$/
 * ```
 */
function shouldSeeTheAlertIcon() {
  this.context(AemAuthorEditorPage);

  this.page.retryExpect(5, 1000, () => {
    expect(
      browser.$$('.coral3-Icon--alert').filter(x => x.isDisplayed())[0]
    ).toBeDisplayed();
  });
}

/**
 * Step Definition:
 * ```
 * /^I mouse hover the alert icon$/
 * ```
 */
function mouseHoverTheAlertIcon() {
  let alert = browser.$$('.coral3-Icon--alert').filter(x => x.isDisplayed())[0];
  alert.moveTo();
}

/**
 * Step Definition:
 * ```
 * /^I click the (1st|2nd|3rd|4th|5th) rating star$/
 * ```
 * @param {string} ordinal Index of the rating stars
 */
function clickRatingStar(ordinal) {
  let index = cardinal(ordinal);
  let ratingStars = browser.$$('//input[@name="rating"]');
  ratingStars[index].click();
}

/**
 * Step Definition:
 * ```
 * /^I input "([^"]*)" and click Send$/
 * ```
 * @param {string} text The rating comments you are going to send
 */
function inputTextAndClickSend(text) {
  let ratingComments = browser.$('#rating-comments');
  ratingComments.setValue(text);

  let sendButton = browser.$('//input[@value="Send"]');
  sendButton.click();
}

/**
 * Step Definition:
 * ```
 * /^I am not able to click any star this time$/
 * ```
 */
function notAbleToClickAnyStar() {
  let ratingFields = browser.$('.hlx-Review-ratingFields');

  expect(ratingFields.getAttribute('disabled')).toBe('true');
}

/**
 * Step Definition:
 * ```
 * /^I open Configure Button dialog in the flex component$/
 * ```
 */
function openConfigureButtonDialgInFlexComponent() {
  let elem = browser.$('//*[contains(@data-path,"flex/cta")]');
  elem.click();
  this.page.click('configureButton');
  this.page.waitForDisplayed('modalDialog');
}

/**
 * Step Definition:
 * ```
 * /^I insert "([^"]*)" component into the flex container$/
 * ```
 * @param {*} component
 */
function insertComponentIntoFlexContainer(component) {
  insertComponentInSomePlace.call(this, component, 'flexContainer');
}

/**
 * Step Definition:
 * ```
 * /^I should see "([^"]*)" in element "([^"]*)"$/
 * ```
 * @param {string} text Text expected in inner text of an element
 * @param {string} element Element name to be verified
 */
function shouldSeeTextInElementName(text, element) {
  // e.g.  //article[contains(@class,"dexter-FlexContainer-Items")]//*[text()[.="Text in Flex component"]]
  let xpath = `//${element}//*[text()[.="${text}"]]`;
  let elements = browser.$$(xpath);
  expect(elements).toHaveLength(1);
}

/**
 * Step Definition:
 * ```
 * /^I verify fields in "([^"]*)" tab:$/
 * ```
 */
function verifyConfigurationModal(tabName, breakpoint, table) {
  if (tabName !== 'None') {
    selectTabInConfigurationDialog.call(this, tabName);
  }
  let settings = table.rawTable;
  for (let i = 0; i < settings.length; i++) {
    let [label, value] = settings[i];
    let elem = '';
    value = value.toLowerCase();
    if (value === 'text') {
      elem = this.page.getInputField(label);
    } else if (value === 'button') {
      elem = this.page.getButton(label, value);
    } else if (value === 'dropdown') {
      elem = this.page.getSelectField(label);
    } else if (value == 'checkbox') {
      elem = this.page.getCheckbox(label);
    } else if (value == 'slider') {
      elem = this.page.getSpacingSlider(label, breakpoint);
    } else if (value == 'fileupload') {
      elem = this.page.getFileUpload(label);
    } else if (value == 'searchdropdown') {
      elem = this.page.getSearchSelectField(label);
    }
    console.log(label);
    expect(elem).toBeDisplayed();
  }
}

/**
 * Step Definition:
 * ```
 * /^I verify dropdown "([^"]*)" in tab "([^"]*)" has following values:$/
 * ```
 */
function verifyDropdownValues(flag, label, tabName, table) {
  if (tabName !== 'None') {
    selectTabInConfigurationDialog.call(this, tabName);
  }
  let settings = table.rawTable;
  let allValues = [];
  if(flag.includes('search')) {
    allValues = this.page.getAllSearchSelectValue(label);
  } else {
    allValues = this.page.getAllSelectValue(label);
  }
  let allExpectedValues = settings.map(x => x[0].trim());
  // array comparison
  expect(allValues).toMatchObject(allExpectedValues);
}

const containsAll = (arr1, arr2) =>
  arr2.every(arr2Item => arr1.includes(arr2Item));

const sameMembers = (arr1, arr2) =>
  containsAll(arr1, arr2) && containsAll(arr2, arr1);

/**
 * Step Definition:
 * ```
 * /^I mark "(.*)" checkbox$/
 * ```
 * @param {string} checkbox_name Input element name attribute
 */
function iMarkCheckboxnameCheckbox(checkbox_name) {
  $('input[name="${checkbox_name}"]').click();
}

/**
 * Step Definition:
 * ```
 * /^I should see button containing text "(.*)" is(| not) enabled$/
 * ```
 * @param {string} text contains text
 * @param {string} neg Negation
 */
function checkElementEnabled(text, neg) {
  if (neg) {
    expect($('//button[contains(text(),"' + text + '")]').isEnabled()).toEqual(
      false
    );
  } else {
    expect($('//button[contains(text(),"' + text + '")]').isEnabled()).toEqual(
      true
    );
  }
  browser.pause(2000);
}

/**
 * Step Definition:
 * ```
 * /^I should see color "([^\"]*)" for element containing text "([^\"]*)"$/
 * ```
 * @param {string} color rgb color
 * @param {string} text element containing text
 */
function verifyColor(color, text) {
  const rgbColor = browser.execute(
    "return window.getComputedStyle(arguments[0], ':before').getPropertyValue('color');",
    $('//*[contains(text(),"' + text + '")]')
  );
  // convert rgb to hex
  let rgbColors = rgbColor.split('(')[1].split(')')[0];
  rgbColors = rgbColors.split(',');
  // conversion to hex
  let colorConv = rgbColors.map(function (x) {
    // convert to a base16 string
    x = parseInt(x).toString(16);
    // add zero if we only get one character
    return x.length == 1 ? '0+x' : x;
  });
  colorConv = '#' + colorConv.join('');
  expect(colorConv).toContain(color);
}

/**
 * Step Definition:
 * ```
 * /^I configure settings in "([^"]*)" tab for "([^"]*)$/
 * ```
 * @param {string} tabName tab name
 * @param {string} breakpoint Tablet or Desktop
 * @param {object} table
 */
/**
 * 
 
 */
function configureSettingsForTabDesktop(tabName, breakpoint, table) {
  if (tabName !== 'None') {
    selectTabInConfigurationDialog.call(this, tabName);
  }
  let settings = table.rawTable;
  for (let i = 0; i < settings.length; i++) {
    let [label, value] = settings[i];
    if (['checked', 'unchecked'].includes(value)) {
      this.page.selectCheckboxForVideo(label, value === 'checked', breakpoint);
    } else {
      let retry = 3;
      while (retry-- > 0) {
        let elem = this.page.getInputFieldForVideo(label, breakpoint);
        elem.setValue(value);
        let actual = elem.getValue();
        if (actual === value) {
          break;
        }
      }
    }
    browser.pause(500);
  }
}

/**
 * Step Definition:
 * ```
 * /^I should (|not )see (any|an|\d+) element(?:|s) with following attributes inside parent node that has attribute "([^"]*)" with value "([^"]*)$/
 * ```
 * @param {string} neg not or blank
 * @param {string/Number} elementCount number of element
 * @param {string} parentAttrib attribute of the parent component
 * @param {string} parentAttribValue attribute value of the parent component
 * @param {object} table
 */
function shouldSeeAnElementWithAttributesInParent(
  neg,
  elementCount,
  parentAttrib,
  parentAttribValue,
  table
) {
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
  let xpath = `//*[@${parentAttrib}=${quoteText(
    parentAttribValue
  )}]//*[${attribs}]`;
  let elems = browser.$$(xpath);
  elementCount = elementCount === 'an' ? '1' : elementCount;
  try {
    if (neg === '') {
      expect(elems.length).toEqual(parseInt(elementCount));
    } else {
      expect(elems.length).toEqual(0);
    }
  } catch (e) {
    e.message += `\nFinding elements: "${xpath}"`;
    throw e;
  }
}

/**
 * Step Definition:
 * ```
 * /^I should be able to play the "([^"]*)"$/
 * ```
 * @param {string} videoType video type like vimeo/youtube etc.
 */
function clickPlayButtonOnVideo(videoType) {
  if (videoType === 'adobeTV') {
    console.log('correctplace');
    switchToVideoIframe();
    $("//button[contains(@class, 'mpc-player')]").click();
    browser.pause(500);
    expect($('//*[contains(@class,"mpc-player__controls")]')).toBeDisplayed();
  } else if (videoType === 'ambientVideo') {
    $("//*[@class='cta video-play']/..//a").click();
    browser.pause(200);
    expect($("//video[@class='video-desktop inline-play']")).toBeDisplayed();
  }
}

/**
 * switch to the video iframe
 */
function switchToVideoIframe() {
  let frame = browser.$('//*[contains(@class,"videoContainer")]/iframe');
  browser.switchToFrame(frame);
}

/**
 * Step Definition:
 * ```
 * /^I should see "([^"]*)" error on the page for "([^"]*)"$/
 * ```
 * @param {string} errorMessage error message displayed on screen
 * @param {string} videoType video type like vimeo/youtube etc.
 */
function errorOnVideoComponent(errorMessage, videoType) {
  if (videoType === 'adobeTV') {
    switchToVideoIframe();
    expect($(`//h1[text()="${errorMessage}"]`)).toBeDisplayed();
  } else if (videoType === 'vimeo') {
    switchToVideoIframe();
    expect($(`//p[text()="${errorMessage}"]`)).toBeDisplayed();
  } else if (videoType === 'youtube') {
    $('//*[contains(@class,"videoContainer")]/iframe').click();
    switchToVideoIframe();
    expect($(`//span[contains(text(),"${errorMessage}")]`)).toBeDisplayed();
  }
}

/**
 * Step Definition:
 * ```
 * /^I should see page title as "([^"]*)"$/
 * ```
 * @param {string} title Passed as Page Title
 */
function iValidatePageTitle(title) {
  console.log('Page Title: ' + browser.getTitle());
  expect(browser.getTitle()).toContain(title);
}

Then(
  /^I open dropdown with name "(.*)" and select "(.*)" option$/,
  iOpenDropdownOption
);
/**
 * Step Definition:
 * ```
 * /^I open dropdown with name "(.*)" and select "(.*)" option$/
 * ```
 * @param {string} dropdown Dropdown button
 * @param {string} option Dropdown option
 */
function iOpenDropdownOption(dropdown, option) {
  $(`//*[@name='${dropdown}']//button`).click();
  $(`//*[contains(text(),'${option}')]`).click();
}

Then(
  /^I input "(.*)" in the input field with name "(.*)"$/,
  iEnterValueInInputField
);

/**
 * Step Definition:
 * ```
 * /^I input "(.*)" in the input field with name "(.*)"$/
 * ```
 * @param {string} inputValue Value to be entered in input field
 * @param {string} inputFieldName Name of the Input Field
 */
function iEnterValueInInputField(inputValue, inputFieldName) {
  $(`//input[@name='${inputFieldName}']`).click();
  $(`//input[@name='${inputFieldName}']`).setValue(inputValue);
}

/**
 * Step Definition:
 * ```
 * /^I should see table header with text "(.*)"$/
 * ```
 * @param {string} text Table header text to be verified for existence
 */
function validateTextInTableHeader(text) {
  expect($(`//th//*[contains(text(),'${text}')]`)).toBeDisplayed();
}

Then(
  /^I verify that element "([^\"]*)" should have attribute "([^\"]*)" with value "([^\"]*)" on author$/,
  checkAttributeValueOnAuthor
);

/**
 * Step Definition:
 * ```
 * /^I verify that element "([^\"]*)" should have attribute "([^\"]*)" with value "([^\"]*)" on author$/
 * ```
 * @param {string} elementName Element name
 * @param {string} attributeName Attribute name
 * @param {string} attributeValue Attribute value
 */
function checkAttributeValueOnAuthor(
  elementName,
  attributeName,
  attributeValue
) {
  this.context(AemAuthorEditorPage);
  if (this.page.checkElementName(elementName).getAttribute(attributeName)) {
    expect(
      this.page.checkElementName(elementName).getAttribute(attributeName)
    ).toContain(attributeValue);
  } else {
    expect(
      this.page.checkElementName(elementName).getProperty(attributeName)
    ).toContain(attributeValue);
  }

  browser.pause(2000);
}

/**
 * Step Definition:
 * ```
 * /^I insert a component "([^"]*)" in "([^"]*)"$/
 * ```
 * @param {string} component dexter component
 * @param {string} container container name
 */
function insertComponentInSomePlace(component, container) {
  this.context(AemAuthorEditorPage);
  let [group, comp] = component.split('/');

  // Click the root container and then the insert button
  this.page.click(`${container}`);
  this.page.click('insertButton');

  // To track the newly added component
  let beforeInsert = browser.$$('div[data-type="Editable"]');
  beforeInsert = beforeInsert.map(x => x.getAttribute('data-path'));

  // Select group and component from the dialog
  this.page.selectComponent(group, comp);

  // Save the newly added component is ThisWorld
  let afterInsert;
  browser.waitUntil(
    () => {
      // after addition count should be greater than before
      afterInsert = browser.$$('div[data-type="Editable"]');
      return afterInsert.length > beforeInsert.length;
    },
    {
      timeout: 10000,
      timeoutMsg: 'failed to verify the added component'
    }
  );

  let newComponents = afterInsert.filter(
    x => !beforeInsert.find(y => y === x.getAttribute('data-path'))
  );

  this.newComponent = newComponents[0];
  currentComponent = newComponents[0].getAttribute('data-path');
}

/**
 * Step Definition:
 * ```
 * /^I should see css style for element "([^"]*)":$/
 * ```
 * @param {string} selector element selector
 * @param {string[][]} table css styles to validate
 */
function shouldSeeCSSStyleForElement(selector, table) {
  let csses = table.rawTable;
  for (let css of csses) {
    expect($(selector).getHTML()).toContain(String(css));
  }
}

/**
 * Step Definition:
 * ```
 * /^I (hover|click) on element "([^"]*)"$/
 * ```
 * @param {string} action
 * @param {string} selector element selector
 */
function operateOnElement(action, selector) {
  if (action === 'hover') {
    $(selector).moveTo();
  }

  if (action === 'click') {
    $(selector).click();
  }
}

/**
 * Step Definition:
 * ```
 * /^I switch to Iframe with ID ([^\"]*)$/
 * ```
 * @param {string} Iframe ID
 */
function switchToIFrame(value) {
  let iframe = $$(`//iframe[@id='${value}']`)[0];
  browser.switchToFrame(iframe);
}

function verifyEditModeOfText() {
  this.page.doComponentAction('edit', 'Text', 0);
  this.page.waitForEnabled('rteToolbar');
  browser.pause(500);
  expect(this.page.fullscreenButton).toBeDisplayed();
  this.page.click('fullscreenButton');
  browser.pause(500);
  this.page.fullscreenExitButton.click();
}

function insertComponentInsideModal(component) {
  this.context(AemAuthorEditorPage);
  let [group, comp] = component.split('/');

  // Click the root container and then the insert button

  this.page.click('parsysInModal');

  this.page.click('insertButton');

  // To track the newly added component
  let beforeInsert = browser.$$('div[data-type="Editable"]');
  beforeInsert = beforeInsert.map(x => x.getAttribute('data-path'));

  // Select group and component from the dialog
  this.page.selectComponent(group, comp);

  // Save the newly added component is ThisWorld
  let afterInsert;

  // checking if the added component is updated
  browser.waitUntil(
    () => {
      // after addition count should be greater than before
      afterInsert = browser.$$('div[data-type="Editable"]');
      return afterInsert.length > beforeInsert.length;
    },
    10000,
    'failed to verify the added component'
  );

  let newComponents = afterInsert.filter(
    x => !beforeInsert.find(y => y === x.getAttribute('data-path'))
  );

  this.newComponent = newComponents[0];
  currentComponent = newComponents[0].getAttribute('data-path');
}

/**
 * Step Definition:
 * ```
 * /^I use API to create a new experience fragment:$/
 * ```
 * @param {*} table
 */
function createNewXFAPI(table) {
  let specs = table.rowsHash();

  let auth = browser.config.aemAccounts.author;
  let author = new AemAuthor(browser.config.profile.baseUrl, auth);

  author.createFolder(specs['Folder']);

  let urlPath =
    '/libs/cq/experience-fragments/content/v2/experience-fragments/createxfwizard/jcr:content';

  const formData = new URLSearchParams();
  formData.append('parentPath', specs['Folder']);
  formData.append('variantTemplate', specs['Template']);
  formData.append('variantName', specs['Variant']);
  formData.append('./jcr:title', specs['Title']);
  formData.append('pageName', specs['Page Name']);

  let res = requestPost(urlPath, formData, {
    baseURL: browser.config.profile.baseUrl,
    auth,
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
  });

  return res.data;
  // equivalent curl command:
  // curl -u username:password -X POST
  // -F 'parentPath=/content/experience-fragments/dexter/us/en/testautomation' \
  // -F 'variantName=master' \
  // -F 'variantTemplate=/conf/dexter/settings/wcm/templates/experience-fragment-popover' \
  // -F './jcr:title=Test Popover Title 2' \
  // -F 'pageName=TestPopoverName2' \
  // -F './jcr:description=Test Popover Description'
  // "https://dexter-author.qa01.corp.adobe.com/libs/cq/experience-fragments/content/v2/experience-fragments/createxfwizard/jcr:content"
}

/**
 * Step Definition:
 * ```
 * /^I set text "([^\"]*)" in popover "([^\"]*)"$/
 * ```
 * @param {string} text Text to be set in the popover
 * @param {string} popover Name of the popover
 */
function setTextInPopover(text, popover) {
  let xfFolder = browser.config.profile.xfFolder;
  if (!xfFolder) {
    throw 'No "xfFolder" in the current profile';
  }
  if (!popover) {
    throw 'No popover name specified';
  }
  let urlPath = `${xfFolder}/${popover}/jcr%3Acontent/root/text`;

  const formData = new URLSearchParams();
  formData.append('text', `<p>${text}</p>`);
  formData.append('textIsRich', 'true');

  let auth = browser.config.aemAccounts.author;

  let res = requestPost(urlPath, formData, {
    baseURL: browser.config.profile.baseUrl,
    auth,
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
  });

  return res.data;
  // equivalent curl command:
  // curl -u username:password -X POST
  // -F 'text=<p>Popover Text</p>' \
  // -F 'textIsRich=true' \
  // "https://dexter-author.qa01.corp.adobe.com/${xfFolder}/${xfName}/${xfVariant}/jcr:content/root/text"
}

/**
 * Step Definition:
 * ```
 * /I have the popover "([^\"]*)"/
 * ```
 * Create a popover if it doesn't exist
 * @param {*} popover
 */
function havePopover(popover) {
  let xfFolder = browser.config.profile.xfFolder;
  if (!xfFolder) {
    throw 'No "xfFolder" in the current profile';
  }
  let urlPath = `${xfFolder}/${popover}/.json`;
  let auth = browser.config.aemAccounts.author;

  let res = requestGet(urlPath, {
    baseURL: browser.config.profile.baseUrl,
    auth,
    validateStatus: false
  });

  if (res.status == '200') {
    // popover exists
    return;
  }

  // Create a new popover XF
  let [poName, poVariant] = popover.split('/');

  // Prepare the table to call createNewXFAPI()
  let table = new DataTable({ rows: [] });
  table.rawTable.push(['Folder', xfFolder]);
  table.rawTable.push([
    'Template',
    '/conf/dexter/settings/wcm/templates/experience-fragment-popover'
  ]);
  table.rawTable.push(['Variant', poVariant]);
  table.rawTable.push(['Title', 'Test Popover XF']);
  table.rawTable.push(['Page Name', poName]);

  createNewXFAPI.call(this, table);
}

/**
 * Step Definition:
 * ```
 * /I have text "([^\"]*)" in the popover "([^\"]*)"/
 * ```
 * @param {string} text Text in the popover
 * @param {string} popover Popover name in the default XF folder
 */
function haveTextInPopover(text, popover) {
  havePopover.call(this, popover);
  setTextInPopover.call(this, text, popover);
}

/**
 * Step Definition:
 * ```
 * /^I click (Configure|Copy|Cut|Delet|) of "([^"]*)" component$/
 * ```
 */
function clickIconNewComnponentOfAnyComponent(icon, component) {
  let count = 5;
  while (count > 0) {
    try {
      this.page.click(`${component}`);
      this.page.waitForDisplayed('editableToolbar', 10000);
      this.page.click(`${icon.toLowerCase()}Button`);
      this.page.waitForDisplayed('modalDialog');
      break;
    } catch (err) {
      if (count > 0) {
        count--;
        continue;
      } else {
        throw err;
      }
    }
  }
}

/**
 * Step Definition:
 * ```
 * /^I open Configuration dialog of "([^"]*)" component$/
 * ```
 */
function openConfigurationDialogOfAnyComponent(component) {
  this.context(AemAuthorEditorPage);
  this.step(`I click Configure of "${component}" component`);
}

/**
 * Step Definition:
 * ```
 * /^I click (Save|Cancel) in page properties Configuration dialog$/
 * ```
 */
function clickButtonInPagePropertiesConfigurationDialog(button) {
  this.context(AemAuthorEditorPage);
  this.page.click(`button${button}`);
}

/**
 * Step Definition:
 * ```
 * /^I open page properties$/
 * ```
 */
function openPageProperties() {
  this.page.click('propertyMenu');
  this.page.click('openProperties');
}

/**
 * Step Definition:
 * ```
 * /^I open page properties of XF$/
 * ```
 *
 */
 function openPagePropertiesOfXF(){
  $('//a[@icon="properties"]').click();
  browser.pause(1000);
  $('//button[@title="Open Properties"]').click();
}

/**
 * Step Definition:
 * ```
 * /^I publish the page$/
 * ```
 */
function publishPage() {
  this.page.click('propertyMenu');
  browser.pause(3000);
  this.page.click('publishPage');
  browser.pause(3000);
  if (this.page.publishPage2ndPage.isDisplayed()) {
    browser.pause(3000);
    this.page.click('publishPage2ndPage');
  }
}

/**
 * Step Definition:
 * ```
 * /^I open editor's side panel in XF$/
 * ```
 */
function openEditorSidePanelInXF() {
  this.context(AemAuthorXF);
  this.page.retryAction(5, 1000, () => {
    this.page.openSidePanel();
    this.page.waitForDisplayed('assetCards');
  });
}

/**
 * Step Definition:
 * ```
 * /^I select asset from side panel in XF$/
 * ```
 */
function selectAssetFromSidePanelInXF() {
  this.context(AemAuthorXF);
  this.page.selectAssetFromSidePanel();
}

/**
 * Step Definition:
 * ```
 * /^I should see element "([^"]*)" (width|height) as (\d+)% of viewport$/
 * ```
 * @param {string} selector Selector or XPath of the element
 * @param {string} wOrH Width or Height
 * @param {string} pct Percentage of viewport
 */
function shouldSeeElementSizeAsPctOfViewport(selector, wOrH, pct) {
  let elem = browser.$(selector);
  let sizeElem = 0;
  let script = null;
  if (wOrH === 'width') {
    script =
      'Math.max(document.documentElement.clientWidth, window.innerWidth || 0)';
    sizeElem = elem.getSize().width;
  } else {
    script =
      'Math.max(document.documentElement.clientHeight, window.innerHeight || 0)';
    sizeElem = elem.getSize().height;
  }
  let sizeViewport = browser.execute(`return ${script}`);
  console.log(sizeViewport);
  console.log(sizeElem);
  expect(Math.round((100 * sizeElem) / sizeViewport)).toEqual(parseInt(pct));
}

/**
 * Step Definition:
 * ```
 * /^I view the page in view as published mode$/
 * ```
 */
function viewAsPublished() {
  this.page.click('propertyMenu');
  this.page.click('viewAsPublished');
}

/**
 * Step Definition:
 * ```
 * /^I input "([^"]*)" then add a tag with value "([^"]*)" to the field with label "([^"]*)"$/
 * ```
 */
function addTag(initValue, value, label) {
  let elem = this.page.getInputField(label);
  elem.setValue(initValue);
  browser.pause(3000);
  browser.$(`//button[@value='${value}']`).click();
}

/**
 * Step Definition:
 * ```
 * /^I open Configure Button dialog in the position component$/
 * ```
 */
function openConfigureButtonDialogInPositionComponent() {
  let elem = browser.$('//*[contains(@data-path,"position/cta")]');
  elem.click();
  this.page.click('configureButton');
  this.page.waitForDisplayed('modalDialog');
}

/**
 * Step Definition:
 * ```
 * /^I drag and drop a component "([^"]*)"$/
 * ```
 */
function dragAndDropComponent(component) {
  this.context(AemAuthorEditorPage);
  let [group, comp] = component.split('/');

  // Click the plus icon on side panel to see all the components
  this.page.click('componentList');
  browser.pause(2000);
  // To track the newly added component
  let beforeInsert = browser.$$('div[data-type="Editable"]');
  beforeInsert = beforeInsert.map(x => x.getAttribute('data-path'));

  // Select group and component from the side panel
  let elem = this.page.getComponentFromSidePanel(group, comp);
  //Drag and drop the element
  let target = this.page.rootContainer;
  elem.dragAndDrop(target);
  browser.pause(5000);
  // Save the newly added component is ThisWorld
  let afterInsert = browser.$$('div[data-type="Editable"]');
  let newComponents = afterInsert.filter(
    x => !beforeInsert.find(y => y === x.getAttribute('data-path'))
  );
  this.newComponent = newComponents[0];
  currentComponent = newComponents[0].getAttribute('data-path');
}

/**
 * Step Definition:
 * ```
 * /^I upload "([^"]*)" to Assets "([^"]*)"$/
 * ```
 * @param {string} file Local file to be uploaded
 * @param {string} contentPath DAM content folder to store the asset
 */
function uploadFiletoAssets(file, contentPath) {
  let auth = browser.config.aemAccounts.author;
  let author = new AemAuthor(browser.config.profile.baseUrl, auth);
  if (file.includes('<common>')) {
    const commonModule = 'node_modules/@mwp/common-automation';
    if (fs.existsSync(commonModule)) {
      file = file.replace(
        '<common>',
        'node_modules/@mwp/common-automation/common'
      );
    } else {
      file = file.replace('<common>', 'common');
    }
  }
  let res = author.uploadToAsset(contentPath, file);
}

/**
 * Step Definition:
 * ```
 * /^I upload the following files to Assets "([^"]*)":$/
 * ```
 * @param {string} contentPath DAM content folder to store the asset
 * @param {string[][]} table List of files
 */
function uploadFollowingFilestoAssets(contentPath, table) {
  let files = table.rawTable;
  for (let file of files) {
    uploadFiletoAssets.call(this, file[0], contentPath);
  }
}

/**
 * Step Definition:
 * ```
 * /^I should see "([^\"]*)" color change$/
 * ```
 */
function shouldSeeColorChange(property, flag, color, selector) {
  if (flag == '') {
    expect($(selector).getCSSProperty(property)['value']).toContain(color);
  } else {
    expect($(selector).getCSSProperty(property)['value']).not.toContain(color);
  }
}

/**
 * Step Definition:
 * ```
 * /^I (Activate|Deactivate) the (?:page|asset) "([^"]*)"$/
 * ```
 */
function replicatePage(replicateStatus, contentPath) {
  let auth = browser.config.aemAccounts.author;
  let author = new AemAuthor(browser.config.profile.baseUrl, auth);
  author.replicatePage(replicateStatus, contentPath);
}

/**
 * Step Definition:
 * ```
 * /^I switch to tab "([^"]*)" on author$/
 * ```
 */
function switchToTabInAuthor(tabName) {
  selectTabInConfigurationDialog.call(this, tabName);
}

/**
 * Step Definition:
 * ```
 * /^I create a new variation in experience fragment:$/
 * ```
 * Function to create a new experience fragment
 * @param {object} table
 */
function createNewXFVariation(table) {
  let specs = table.rowsHash();

  this.page = new AemAuthorXF(specs['Folder']);
  this.page.open();
  disableUserOnboarding(this.page);
  this.page.click('createButton');
  this.page.click('variation');
  this.page.waitForDisplayed('templateCard');
  let cards = this.page.templateCards;
  for (let card of cards) {
    let itemId = card.getAttribute('data-foundation-collection-item-id');
    if (itemId === specs['Template']) {
      card.click();
    }
  }
  this.page.click('nextButton');
  this.page.titleInput.setValue(specs['Title']);
  this.page.pageNameInput.setValue(specs['Page Name']);
  this.page.click('nextButton');
  this.page.click('openButton');
}

/*
* Step Definition:
* ```
* /^I validate the Send Me Link page:$/
* ```
* This api will functionally validate the send me link page 
* @param {Object} dataTable : This will take in few inputs from the user for validate those:
*   | button                    | cta to open send link page|
    | description               | desc for the home page |
    | customPhoneLabel          | Cell Number  |
    | customPhonePlaceholder    | text place holder |
    | ctaSendText               | cta button to send text |
    | successTitle              | success title | 
    | successDescription        | success desc | 
    | ctaTextClose              | close cta button|
*/
function validateSendMeLink(dataTable) {
  // table to object
  let data = {};
  dataTable.rawTable.forEach(el => {
    data[el[0]] = el[1];
  });

  //click on the button
  $(`[href='${data['button']}']`).waitForClickable();
  $(`[href='${data['button']}']`).click();

  // verify all the text para
  $('.sendlinkform-desc .cmp-text').waitForDisplayed();
  expect($('.sendlinkform-desc .cmp-text')).toHaveText(data['description']);
  $('[for="phone_number"]').waitForDisplayed();
  expect($('[for="phone_number"]')).toHaveText(data['customPhoneLabel']);
  $('.phone_number').waitForDisplayed();
  expect($('.phone_number')).toHaveAttr(
    'placeholder',
    data['customPhonePlaceholder']
  );
  $('.sl-cta').waitForDisplayed();
  expect($('.sl-cta')).toHaveText(data['ctaSendText']);

  // verify CTA send type
  if (data['ctaSendType']) {
    expect($('.sl-cta')).toHaveAttrContaining('class', data['ctaSendType']);
  }

  // fetch phone number from pool of numbers
  let randomPhoneNo = () => {
    let phoneNumbers = ['800-585-0774', '415-841-3535', '415-832-2000', '415-832-2020','415-832-4700', 
    '206-675-7000', '206-675-7600', '651-766-4700', '408-536-2800', '408-537-6000', '617-766-2360', 
    '510-817-6300', '385-345-0000', '503-889-2800', '571-765-5400'];
    let number = phoneNumbers[Math.floor(Math.random() * phoneNumbers.length)]
    console.warn('Sending a message to: ', number);
    return number;
  }

  // enter a correct phone number
  $('.phone_number').click();
  $('.phone_number').setValue(randomPhoneNo());
  browser.pause(5000);
  $('.sl-cta').waitForClickable();
  $('.sl-cta').click();
  // validate the success page
  $('.success-title .cmp-text').waitForDisplayed();
  expect($('.success-title .cmp-text')).toHaveText(data['successTitle']);

  $('.success-desc .cmp-text').waitForDisplayed();
  expect($('.success-desc .cmp-text')).toHaveText(data['successDescription']);

  $('.close-cta').waitForDisplayed();
  expect($('.close-cta')).toHaveText(data['ctaTextClose']);

  // close cta type
  if (data['ctaCloseType']) {
    expect($('.close-cta')).toHaveAttrContaining('class', data['ctaCloseType']);
  }
  $('.close-cta').click();

  // go back to the start
  //click on the button
  $(`[href="${data['button']}"]`).click();
  // enter wrong number and validate the error texts
  $('.phone_number').click();
  $('.phone_number').setValue('12345');
  browser.pause(3000);
  $('.sl-cta').click();
  this.page.retryAction(20, 1000, () => {
    expect($('.spectrum-Tooltip-label')).toBeDisplayed();
    expect($('.spectrum-Tooltip-label')).toHaveText('Something went wrong! Please try later.');
  });
}

/**
 * Step Definition:
 * ```
 * /^I add carousel slide ids:$/
 * ```
 * This function is meant to add list of slides in the carousel component.
 * @param {Data table} slides: List of names of the slides to be added.
 */
function addCarouselSlides(slides) {
  slides = slides.rawTable[0];

  // add number of slides as per request.
  slides.forEach(slide => {
    // click on the add button
    $('//coral-button-label[contains(text(),"Add")]').$('..').click();
  });

  // add slide id for each slides added in the previous steps.
  let slideIdInput = $$('.carousel-slide-id-validation');
  slideIdInput.forEach((input, index) => {
    input.click();
    input.setValue(slides[index]);
  });
}

/**
 * Step Definition:
 * ```
 * /^I validate the carousel page with text content and transition type:$/
 * ```
 * @param {dataTable} info: Information about the slides.
 * Pass all the slides and then at the end pass transition type.
 */
function validateCarouselWithTextContent(info) {
  let slides = info.rawTable[0].slice(0, info.rawTable[0].length - 1);
  // transition type at the end of the table
  let transitionType = info.rawTable[0][info.rawTable[0].length - 1];
  if (transitionType === 'increment') {
    // slide should have transition without any click
    // get the slide data and verify them
    slides.forEach((slide, index) => {
      $(`[data-slide-name=${slide}]`).waitForDisplayed();
      browser.waitUntil(
        () => {
          let ele = $(`[data-slide-name=${slide}]`);
          let cond1 = ele.getAttribute('class').includes('is-active');
          let cond2 = ele.getAttribute('data-index') == index + 1;
          return cond1 & cond2;
        },
        10000,
        `error occurred at ${slide}`
      );
    });
  } else if (transitionType === 'none') {
    // verify the auto transition, other than active slide other should be hidden
    slides.forEach((slide, index) => {
      $(`[data-slide-name=${slide}]`).waitForDisplayed();
      browser.waitUntil(
        () => {
          let ele = $(`[data-slide-name=${slide}]`);
          let cond1 = ele.getAttribute('class').includes('is-active');
          let cond2 = ele.getAttribute('data-index') == index + 1;
          return cond1 & cond2;
        },
        10000,
        `error occurred at ${slide}`
      );
    });

    // verify the controls
    $('.dexter-Carousel--pause').waitForDisplayed();

    // click on the pause button
    $('.dexter-Carousel--pause').click();

    // the pause button should now be hidden
    expect($('.dexter-Carousel--pause')).toHaveAttrContaining(
      'class',
      'is-hidden'
    );
  } else {
    slides.forEach((slide, index) => {
      $(`[data-slide-name=${slide}]`).waitForDisplayed();
      let ele = $(`[data-slide-name=${slide}]`);

      // verify its index
      expect(ele).toHaveAttribute('data-index', index + 1);

      // verify if the slide is active
      expect(ele).toHaveAttributeContaining('class', 'is-active');
      // click on the next button
      $('.dexter-Carousel--next').click();
    });
  }

  // check the slide transition type
  expect($('.dexter-Carousel-content')).toHaveAttributeContaining(
    'class',
    transitionType
  );
}

/**
 * Step Definition:
 * /^I should (|not )see css selector:$/
 * @param {string} neg: add 'not' to negate the statement
 * @param {table} table: list of selectors type | value
 */
function shouldSeeAnElementWithCSSSelector(neg, table) {
  let rawTable = table.rawTable;
  // traverse through each of the item to find if the selector is present
  if (!neg.includes('not')) {
    rawTable.forEach(item => {
      if (item[0] === 'class') {
        $(`.${item[1]}`).waitForDisplayed();
      } else if (item[0] === 'id') {
        $(`#${item[1]}`).waitForDisplayed();
      } else {
        // check point
        throw new Error(
          `Wrong css selector type provided, please use class or id only`
        );
      }
    });
  } else {
    rawTable.forEach(item => {
      if (item[0] === 'class') {
        $(`.${item[1]}`).waitForDisplayed(3000, true);
      } else if (item[0] === 'id') {
        $(`#${item[1]}`).waitForDisplayed(3000, true);
      } else {
        // check point
        throw new Error(
          `Wrong css selector type provided, please use class or id only`
        );
      }
    });
  }
}

/**
 * Step Definition:
 * /^I should validate the carousel timeline with timer "([^"]*)"$/
 * This api will validate the timeline meter progress
 * @param {string} timer
 */
function validateCarouselTimelineProgressMeter(timer) {
  $('.progress-meter').waitForDisplayed();
  let meters = $$('.progress-meter');

  // validate the data frequency
  meters.forEach(meter => {
    expect(meter).toHaveAttributeContaining('data-frequency', timer);
    expect(meter).toHaveAttributeContaining('style', '%');
  });
}

/**
 * Step Definition:
 * /^I validate slides not pausing on hover:$/
 * Validate slide should not pause on hover
 * @param {table} table
 */
function slideShouldNotPauseOnHover(table) {
  let slides = table.rawTable[0];

  // hover over the slides
  $('.dexter-Carousel-content').moveTo();

  // validate the no hover pause is true
  $('[data-nopause-onhover="true"]').waitForDisplayed();

  // for each slide check the active status still changes
  slides.forEach(slide => {
    browser.waitUntil(
      () => {
        return $(`[data-slide-name=${slide}]`)
          .getAttribute('class')
          .includes('is-active');
      },
      10000,
      `Failed to validate ${slide}`
    );
  });
}

/**
 * Step Definition:
 * /^I should see attribute in selector "([^"]*)" with value:$/
 * This api will validate the presence of an attribute with in a node with css selector
 * @param {selector} cssSelector
 * @param {table} table
 */
function seeAttributeWithValueInElement(cssSelector, table) {
  let items = table.rawTable;
  items.forEach(item => {
    expect($(cssSelector)).toHaveAttribute(item[0], item[1]);
  });
}

/**
 * Step Definition:
 * /^I add custom auto rotate timer to each slides:$/
 * @param {table} table : slideIds and silde timer should be provided.
 */
function addCustomAutoRotateSpeed(table) {
  let slides = table.rawTable;
  slides.forEach(() => {
    // add number of slides
    $(
      '[data-granite-coral-multifield-name="./slides-overrides"] [coral-multifield-add]'
    ).click();
  });

  slides.forEach((slide, index) => {
    // add slide id and timer
    $(`[name="./slides-overrides/item${index}/./slideId"]`).click();
    $(`[name="./slides-overrides/item${index}/./slideId"]`).setValue(slide[0]);
    $(
      `[name="./slides-overrides/item${index}/./slideRotateFrequency"] .coral3-Textfield`
    ).click();
    $(
      `[name="./slides-overrides/item${index}/./slideRotateFrequency"] .coral3-Textfield`
    ).setValue(slide[1]);
  });
}

/**
 * /^I click on selector "([^"]*)" $/
 * This will click on any of the valid selector provide
 * @param {selector} selector : provide a valid HTML selector
 */
function clickOnSelector(selector) {
  $(selector).waitForClickable();
  $(selector).click();
}

/**
 * Step Definition:
 * ```
 * /^I should see template "([^"]*)"$/
 * ```
 * @param {str} template Template name
 */
function iShouldSeeTemplate(templateName) {
  let template = browser.$(`//*[coral-card-title/text()='${templateName}']`);
  expect(template).toBeDisplayed();
}

/**
 * Step Definition:
 * ```
 * /^I should see the page "([^"]*)" under the directory "([^"]*)"$/
 * ```
 * @param {str} pageName Page name
 * @param {str} directory Directory
 */
function iShouldSeeThePageUnderTheDirectory(pageName, directory) {
  let url =
    browser.config.profile.baseUrl + directory + '/' + pageName + '.html';
  let response = requestGet(url, {
    auth: browser.config.authorAccounts.author
  });
  expect(response.status).toBe(200);
}

/*
 * /^I should (|not )see "([^"]*)" in (|parent )HTML content of selector "([^"]*)"$/
 * Use this api to find any content in a HTML of a selector
 * @param {string} neg: not or ''
 * @param {string} content : content to be found
 * @param {selector} selector: HTML selector
 */
function seeContentInHTML(neg, content, parent, selector) {
  // get the HTML
  $(selector).waitForDisplayed();
  let html;
  if (parent === '') {
    html = $(selector).getHTML();
  } else if (parent.includes('parent')) {
    html = $(selector).$('..').getHTML();
  } else {
    throw new Error('Check parent attribute: Attribute invalid');
  }
  // check in content is present
  let flag = html.includes(content);

  // assert the flag as required
  if (!neg.includes('not')) {
    expect(flag).toBe(true);
  } else {
    expect(flag).toBe(false);
  }
}

/**
 * /^I debug$/
 * This is not a functional api. it is created just for convenience and can be used for debug purpose.
 */
function debugIssues() {
  browser.debug();
}

/**
 * /^I should (|not )see "([^"]*)" in the url$/
 * Use this api to find any content in URL of a open window
 * @param {string} neg: not || ''
 * @param {string} content: partial or full text to find
 */
function seeContentInUrl(neg, content) {
  if (!neg.includes('not')) {
    expect(browser.getUrl().includes(content)).toBe(true);
  } else {
    expect(browser.getUrl().includes(content)).toBe(false);
  }
}

/**
 * This api is to test focus bound on the list of selectors
 * @param {table} table : list of all the selectors where the focus is bound
 */
function tabNavigationSequence(table) {
  let links = table.rawTable;
  links.forEach((link, index) => {
    links[index] = link[0];
  });
  // navigate through links in circle
  // implementing circular array
  let circularArr = (arr, index) => {
    return arr[index % arr.length];
  };
  for (let i = 0; i < 2 * links.length; i++) {
    let item = circularArr(links, i);
    $(item).isFocused();
    expect($(item).isFocused()).toBeTruthy();
    browser.keys('Tab');
  }
}

/**
 * /^Then I refresh the page$/
 * refresh page with this api
 */
function refreshPage() {
  browser.refresh();
}

/* Step Defintion:
 * ```
 * /^I set the dry run checkbox to "([^"]*)"$/
 * ```
 * @param {str} state The state of the dry run button.
 * Set to true or false
 */
function setTheDryRunCheckboxTo(state) {
  const checkbox = browser.$('//input[@type="checkbox" and @name="dryRun"]');
  // Set dryRun checkbox state
  if (state === 'true' && checkbox.isSelected() === false) {
    checkbox.click();
    expect(checkbox.isSelected()).toBe(true);
  } else if (state === 'false' && checkbox.isSelected() === true) {
    checkbox.click();
    expect(checkbox.isSelected()).toBe(false);
  }
}

/*
 * Step Definition:
 * ```
 * /^I upload file "([^"]*)"$/
 * ```
 * @param {str} filePath Path to the file starting with project directory.
 * Include the file name and extension.
 */
function iUploadFile(filePath) {
  const fileInput = browser.$('//input[@name="csvFile"]');
  const uploadedFileNameField = browser.$('.csv-upload-file-name');
  const [fileName] = filePath.split('/').slice(-1);
  const fullFilePath = process.cwd() + filePath;

  // File upload
  fileInput.addValue(fullFilePath);
  expect(uploadedFileNameField.getText()).toContain(fileName);
}

/*
 * Step Definition:
 * ```
 * /^I submit the file to bulk editor successfully$/
 * ```
 * This function selects the submit button on bulk editor page
 * and verifies the success message.
 */
function verifyBulkEditorFileSubmission() {
  const submitButton = browser.$('#bulkeditorsubmit');
  const dialogModal = browser.$('//coral-dialog-header');
  const dialogModalCloseButton = browser.$(
    '//button/coral-button-label[text()="Close"]'
  );

  expect(submitButton).toBeEnabled();
  submitButton.click();

  // Verifying success message
  dialogModal.waitForDisplayed(30000);
  expect(dialogModal.getText()).toBe('Success');

  // Closing dialog modal
  dialogModalCloseButton.click();
  dialogModal.waitForDisplayed({ reverse: true });
  expect(dialogModal).not.toBeDisplayed();
}

/**
 * This is to very an attribute key and value in an object
 * /I verify key and value in attribute "([^"]*)" in selector "([^"]*)"/
 * @param {*} attribute 
 * @param {*} selector 
 * @param {*} table 
 */
function getAttributeValueAsObjectAndVerify(attribute, selector, table) {
  $(selector).waitForDisplayed();
  // get the value of the specified attribute
  let val =  $(selector).getAttribute(attribute);
  val = JSON.parse(val);
  if(Array.isArray(val)) {
    // going for the first element as required
    val = val[0]
  }

  // verify each requested key and val in the value object retrieved
  let items = table.rawTable;
  items.forEach(item => {
    expect(val[item[0]]).toEqual(item[1]);
  })
}

function addXfPersonalizeTags(table) {
  // click add button
  this.page.addButtonXFPersonalize.click();

  // add tags and variation
  let items = table.rowsHash();
  let path
  let input;

  // add user tags
  if(items['userTags'] != undefined) {
    input = items['userTags'];
    $('[name*="userDataTags"] .coral3-Button').click();
    path = items['userTags']
  }

  // add platform tags
  if(items['platformTags'] != undefined) {
    input = items['platformTags'];
    $('[name*="platformTags"] .coral3-Button').click();
    path = items['platformTags']
  }

  path = path.split(':');

  // select site
  $(`[title="${path[0].trim()}"]`).click();

  // select all the paths in the site
  path = path[1].split('/');
  path.forEach((el, index) => {
    if(index === path.length-1) {
      $(`[title="${el.trim()}"]`).$('..').$('.coral3-Icon--tag').click();
    } else {
      $(`[title="${el.trim()}"]`).click();
    }
  }) 

  // click on the select option
  $('.granite-pickerdialog-submit').click();
  
  // check tag selected
  $(`[value="${input.replace(/\s/g, "").toLowerCase()}"]`);

  // add variations
  $('[name*="personalizedData/item0/./fragmentPath"] .coral3-Textfield').click();
  $('[name*="personalizedData/item0/./fragmentPath"] .coral3-Textfield').setValue(items['variationPath']);
}


function selectXfCircleLoaderSize(value) {
  $('[name="./loaderCircleSize"]').click();
  $('.is-openBelow').waitForDisplayed();
  
  // click on the specified value
  // large medium and small
  $(`[name="./loaderCircleSize"] [ handle="list"] [value="${value}"]`).click();
}

/**
 * This api will set value to a input container or a text box
 * @param {string} input 
 * @param {HTML selector} selector 
 */
function setInputValue(input, selector) {
  $(selector).click();
  $(selector).clearValue();
  $(selector).setValue(input);
}

/**
 * Check if a selector is visible
 * @param {CSS Selector} selector 
 */
function seeSelector(neg, selector) {
  if(neg === "not") {
    $(selector).waitForDisplayed({reverse: true, timeout: 5000});
  } else {
    $(selector).waitForDisplayed();
  }
}

/**
 * ^I should rollout page$/
 * This api will rollout a page
 */
function rolloutPage() {
  this.page.click('propertyMenu');
  this.page.click('rolloutPage');

  // click on the check icon
  $(".msm-rollout-submit .coral3-Icon--check").click();

  //click on now radio button
  $("[value='now'] [type='radio']").click();

  // done
  $('.schedule-rollout-done').click();
}

/**
 * /^I save page as:$/
 * @param {table} table: table to include label and comments
 */
function savePageAs(table) {
  this.context(AemAuthorEditorPage);
  let items = table.rowsHash();
  this.page.click('propertyMenu');

  $("[title='Save as Version']").waitForClickable();
  $("[title='Save as Version']").click();

  // add label and comment 
  $('[labelledby="version-label"]').click();
  $('[labelledby="version-label"]').setValue(items['Label']);

  $('[labelledby="version-comment"]').click();
  $('[labelledby="version-comment"]').setValue(items['Comment']);

  // create
  $('#dx-create-version').click();
}

/**
 * /^I should see href link "([^"]*)" in an anchor tag$
 * This api will help find partial or full href link in an anchor tag 
 * @param {string} link : link in href
 */
function seeHrefLinkInAnchorTag(link) {
  $(`//a[contains(@href, '${link}')]`).waitForDisplayed();
}

/**
 * /^I should select quantity "([^"]*)" in the quantity selector$/
 * Select the specified menu from the dropdown menu 
 * @param {Integer} option 
 */
function selectQuantitySelector(option) {
  // click on the dropdown menu
  let dropdown = $('.dexter-Dropdown');
  dropdown.click();

  // select the quantity
  browser.pause(1000);
  dropdown.selectByVisibleText(option);
}

/**
 * /^I update the cf offers "([^"]*)":$/
 * This api will update the cf offers 
 * @param {string} offerName 
 * @param {table} table 
 */
function updateCFOffers(offerName, table) {
  const URL = `${browser.config.profile.baseUrl}/editor.html/content/dam/${offerName}`
  browser.url(URL);

  // wait for the page to load
  $('.cfm-Form').waitForDisplayed();

  $('//label[text()="Increment. Defaults to 1."]').waitForDisplayed();

  // iterate and update each field specified
  let fields = table.rawTable;
  fields.forEach(field => {
    let selector = `//label[text()="${field[0]}"]/parent::div //input[@is="coral-textfield"]`
    $(selector).click();
    $(selector).setValue(field[1]);
  })

  browser.pause(1000);
  // click save 
  $('button[aria-label="Save"]').click();
}

/**
 * /^I verify the qs dropdown increment of "([^"]*)" starting from "([^"]*)" to "([^"]*)"$/
 * This api will validate the values in qs dropdown menu
 * @param {Integer} increment : increment value of the set
 * @param {Integer} start : starting value of the set
 * @param {Integer} end : End of the set
 */
function verifyQSDropdownIncrement(increment, start, end) {
  // click on the dropdown menu
  let dropdown = $('.dexter-Dropdown');
  dropdown.click();

  // get all the values in the dropdown menu and validate
  let html = dropdown.getHTML();
  for(let i=start; i<=end; i+=increment) {
    if(i === end) {
      expect(html.includes(`${i}+`)).toBe(true);
    } else {
      expect(html.includes(`value="${i}"`)).toBe(true);
    }
  }
}

function clickOnAddNavigationItemsButton() {
  let button = $$('//coral-multifield//button//coral-button-label[text()="Add"]')[0];
  button.click();
}

function clickButtonOfElementBySelector(buttonTitle, selector) {
  let element = $(selector);
  let toolbar = $('#EditableToolbar');
  let modalDialog = $('.cq-Dialog.is-open');
  this.page.retryAction(5, 1000, () => {
    browser.execute('arguments[0].click()', element);
    toolbar.waitForDisplayed(10000);
    let listOfDisplayedButtons = $$(`//button[@title="${buttonTitle}"]`);
    let displayedButton;
    for (let button of listOfDisplayedButtons) {
      if (button.isDisplayed()) {
        displayedButton = button;
      }
    }
    displayedButton.click();
    if (buttonTitle === "Configure") {
      modalDialog.waitForDisplayed();
    }
  });
}

/**
 * Step Definition:
 * ```
 * /^I set the page as future variation$/
 * ```
 */
 function setFutureVariation() {
  this.context(AemAuthorSitesPage);
  if (this.page.setAsFutureVariation.isDisplayed()) {
    this.page.click('setAsFutureVariation');
    this.page.click('okButton')
  }
}

/**
 * Step Definition:
 * ```
 * /^I export to Adobe target$/
 * ```
 */
 function exportToAdobeTarget() {
   this.context(AemAuthorEditorPage);
   this.page.click('propertyMenu');
    browser.pause(3000);
    this.page.click('exportToAdobeTarget');
    browser.pause(3000);
}

/**
 * Step Definition:
 * ```
 * /^I update in Adobe target$/
 * ```
 */
 function updateInAdobeTarget() {
  this.context(AemAuthorEditorPage);
  this.page.click('propertyMenu');
   browser.pause(3000);
   this.page.click('updateInAdobeTarget');
   browser.pause(3000);
}

/**
 * Step Definition:
 * ```
 * /^I select all text as link and configure settings for this link:$/
 * ```
 * @param {table} table 
 */
 function selectAllTextAndConfigureSettingsForLink(table) {
  let fields = table.rawTable;
  this.page.retryAction(5, 1000, () => {
    browser.keys(['Command', 'a']);
    browser.keys(['Command']);
    browser.pause(2000);
  });
  
  this.page.retryAction(5, 1000, () => {
    browser.$('.coral3-Icon--link').click();
  });

  for(let i = 0; i < fields.length; i++) {
    if(fields[i][0] == "Path") {
      this.page.retryAction(5, 1000, () => {
        browser.$(`//input[@placeholder="${fields[i][0]}"]`).setValue(fields[i][1]);
      });
    }

    if(fields[i][0] == "Tooltip Text") {
      this.page.retryAction(5, 1000, () => {
        browser.$(`//input[@placeholder="${fields[i][0]}"]`).setValue(fields[i][1]);
      });
    }

    if(fields[i][0] == "Target") {
      this.page.retryAction(5, 1000, () => {
        browser.$('//*[@handle="targetSelect"]/button').click();
        browser.$(`//*[contains(@class, 'coral3-SelectList-item')][contains(.,'${fields[i][1]}')]`).click();
      });
    }

    if(fields[i][0] == "Style") {
      this.page.retryAction(5, 1000, () => {
        browser.$('//*[@placeholder="Choose Link Styles"]/button').click();
        browser.$(`//*[contains(@class, 'coral3-SelectList-item')][contains(.,'${fields[i][1]}')]`).click();
      });
    }
  }

  this.page.retryAction(5, 1000, () => {
    browser.$('//button[@title="Apply"]').click();
  });

  browser.pause(5000);

  this.page.retryAction(5, 1000, () => {
    browser.$('//button[@title="Save"]').click();
  });
}

/**
 * Step Definition:
 * ```
 * /^I click Publish Page Downstream$/
 * ```
 */
 function clickPublishPageDownstream() {
  this.context(AemAuthorEditorPage);
  this.page.click('propertyMenu');
   browser.pause(3000);
   this.page.click('publishPageDownstream');
   browser.pause(3000);
   if (this.page.guardrailModalOk.isDisplayed()) {
    browser.pause(3000);
    this.page.click('guardrailModalOk');
  }
   browser.pause(3000);
   if (this.page.publishPage2ndPage.isDisplayed()) {
    browser.pause(3000);
    this.page.click('publishPage2ndPage');
  }
}

/**
 * Step Definition:
 * ```
 * /^I launch "([^"]*)" page in downstream enviornment$/
 * ```
 * @param {string} pageName page name
 */
 function launchPageDownstream(pageName) {
  this.context(AemAuthorEditorPage);
  let basePublish = browser.config.profile.downstreamUrl;
  let publishUrl = urljoin(basePublish, pageName);
  browser.newWindow(publishUrl);
}
