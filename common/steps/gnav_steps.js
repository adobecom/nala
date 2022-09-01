/** @module common/steps */
const {Given} = require('@cucumber/cucumber');
const {When} = require('@cucumber/cucumber');
const {Then} = require('@cucumber/cucumber');
const {GnavPage} = require('../pages/gnav_page');
import { cardinal } from '../../common/support/functions/cardinal';
import localize from '../../common/support/functions/localize';

Then(/^I should see (menu items|sign in) in the header$/, iShouldSeeItemInTheHeader);

Then(/^I should see (region picker|copyright|adChoices|privacy|terms of use|cookie preferences) in the footer$/, iShouldSeeItemInTheFooter);

When(/^I click the subnav button$/, iClickTheSubnavButton);

When(/^I click the local nav button$/, iClickTheLocalnavButton);

When(/^I click the last local nav link$/, iClickTheLastLocalnavLink);

Then(/^I should see a button on sub nav$/, iShouldSeeAButtonOnSubNav);  

Then(/^I should see a button on local nav$/, iShouldSeeAButtonOnLocalNav);  

Then(/^I click the search icon on global navigation$/, iClickTheSearchIconOnGlobalNavigation);

When(/^I (input|enter) "([^\"]*)" in search field on global header$/, iInputTextInSearchFieldOnGlobalHeader);

Then(/^I should(| not) see a list of search results on global header$/, iShouldnegSeeAListOfSearchResultsOnGlobalHeader);

Then(/^I close the search field on global header$/, iCloseTheSearchFieldOnGlobalHeader);

Then(/^I click "([^\"]*)" on global footer$/, clickLinkOnGlobalFooter);

Then(/^I should see (\d+) menus in global footer$/, iShouldSeeCountMenusInGlobalFooter);

Then(/^I (open|close) (1st|2nd|3rd|4th|5th|all) menu item(?:|s) on global header$/, iOpOnGlobalHeader);

Then(/^I should(| not) see (1st|2nd|3rd|4th|5th|any) menu item open on global header$/, iShouldnegMenuItemOpenOnGlobalHeader);

Then(/^I navigate to the page at (1st|2nd|3rd|4th|5th) submenu item$/, navigateToPageAtNthSubmenuItem);

Then(/^I (should see|click) (Adobe logo|region switch|copyright|term of use|privacy notice|cookies notice|AdChoices) in global footer$/, iActionInGlobalFooter);

Then(/^I should see OneTrust popup$/, iShouldSeeOneTrustPopup);

Then(/^I close OneTrust popup$/, iCloseOneTrustPopup);

Then(/^I should see AdChoices popup$/, iShouldSeeAdchoicesPopup);

Then(/^I close AdChoices popup$/, iCloseAdchoicesPopup);

Then(/^I should see copyright matches the current year$/, iShouldSeeCopyrightMatchesTheCurrentYear);

Then(/^I click (Facebook|LinkedIn|Twitter|Instagram|Pinterest) logo in global footer$/, iClickLogoLogoInGlobalFooter);

Then(/^I (open|close) my profile$/, iActionMyProfile);

Then(/^I (open|close) App Launcher$/, iActionAppLauncher);

Then(/^I should see a search icon$/, iShouldSeeASearchIcon);

Then(/^I search "([^\"]*)" on global header$/, searchOnGlobalHeader);

Then(/^I should see the page has "([^\"]*)" globalnav experience$/, iShouldSeeNavExperience);

Then(/^I close extension popup window if existing$/, closeExtensionPopupWindow);

Then(/^I should see page breadcrumbs in the header$/, iShouldSeeBreadcrumbInHeader);

Then(/^I should see global nav for "([^"]*)"$/, iShouldSeeGlobalNav); 

Then(/^I should see nav text "([^"]*)" with "([^"]*)" to "([^"]*)" on "([^"]*)"$/, iShouldSeeNavText); 

Then(/^I should see nav text "([^"]*)" with "([^"]*)" to "([^"]*)" on "([^"]*)" is a "([^"]*)" type dynamic link$/, iShouldSeeDynamicLink); 

Then(/^I click "([^"]*)" local nav$/, iShouldClickLocalNavMenu); 

Then(/^I click the "([^"]*)" global nav dropdown$/, iShouldClickGlobalNavMenu); 

Then(/^I should see "([^\"]*)" cross cloud link with "([^"]*)" text going to "([^"]*)"$/, iShouldSeeNthCrossCloudLink); 

Then(/^I should see a cross cloud logo with home icon going to "([^"]*)"$/, iShouldSeeCrossCloudLogo); 

/**
 * Step Definition:
 * ```
 * /^I should see (menu items|sign in) in the header$/
 * ```
 * @param {string} item "menu items" or "sign in"
 */
function iShouldSeeItemInTheHeader(item) {
  let elem = {
    'sign in': this.page.signInButton,
    'menu items': this.page.menuItems
  }[item];
  elem.waitForDisplayed(15000);
}

/**
 * Step Definition:
 * ```
 * /^I should see (region picker|copyright|adChoices|privacy|terms of use|cookie preferences) in the footer$/
 * ```
 * @param {string} item "region picker", "copyright", "adChoices", "privacy", "terms of use" or "cookie preferences"
 */
function iShouldSeeItemInTheFooter(item) {
  let elem = {
    'region picker': this.page.regionPicker,
    copyright: this.page.copyright,
    adChoices: this.page.adChoices,
    privacy: this.page.privacy,
    'terms of use': this.page.termOfUse,
    'cookie preferences': this.page.cookies
  }[item];
  elem.waitForDisplayed(15000);
}

/**
 * Step Definition:
 * ```
 * /^I click the subnav button$/
 * ```
 */
function iClickTheSubnavButton() {
  this.page.waitForDisplayed('buyNow');
    this.page.buyNow.click();
}

/**
 * Step Definition:
 * ```
 * /^I should see a button on sub nav$/
 * ```
 */
function iShouldSeeAButtonOnSubNav() {
  this.page.waitForDisplayed('buyNow');
}

/**
 * Step Definition:
 * ```
 * /^I click the search icon on global navigation$/
 * ```
 */
function iClickTheSearchIconOnGlobalNavigation() {
  this.context(GnavPage);
  this.page.waitForDisplayed('searchIcon');
  this.page.searchIcon.click();
}

/**
 * Step Definition:
 * ```
 * /^I (input|enter) "([^\"]*)" in search field on global header$/
 * ```
 * @param {string} inputOrEnter input: type text; enter: type text and hit enter
 * @param {string} text Text to be inputted into the search field
 */
function iInputTextInSearchFieldOnGlobalHeader(inputOrEnter,text) {
  this.page.waitForDisplayed('searchInput');
  if (inputOrEnter === 'enter') {
    text += '\n';
  }
  this.page.searchInput.setValue(text);
}

/**
 * Step Definition:
 * ```
 * /^I should(| not) see a list of search results on global header$/
 * ```
 * @param {string} neg Negative verification
 */
function iShouldnegSeeAListOfSearchResultsOnGlobalHeader(neg) {
  this.page.waitForDisplayed('searchResultsV2', 10000, neg === ' not');
}

/**
 * Step Definition:
 * ```
 * /^I close the search field on global header$/
 * ```
 */
function iCloseTheSearchFieldOnGlobalHeader() {
  this.page.waitForDisplayed('searchCloseIconV2');
  this.page.searchCloseIconV2.click();
}

/**
 * Step Definition:
 * ```
 * /^I click "([^\"]*)" on global footer$/
 * ```
 * @param {*} link
 */
function clickLinkOnGlobalFooter(link) {
  this.context(GnavPage);
  let items = this.page.footerMenuItems;
  items.find(x => x.getText() === link).click();
}

/**
 * Step Definition:
 * ```
 * /^I should see (\d+) menus in global footer$/
 * ```
 * @param {string} count Number of global nav footer menus
 */
 function iShouldSeeCountMenusInGlobalFooter(count) {
  this.context(GnavPage);
  expect(this.page.menuList.length).toEqual(count);
}

/**
 * Step Definition:
 * ```
 * /^I (open|close) (1st|2nd|3rd|4th|5th|all) menu item(?:|s) on global header$/
 * ```
 * @param {string} op Open or close the global nav header menu
 * @param {string} menu Global nav header menu
 */
 function iOpOnGlobalHeader(op, menu) {
  this.context(GnavPage);
  this.page.waitForDisplayed('menuItems', 10000);
  let items = this.page.menuItems;
  let order = cardinal(menu);
  items[order].click();
  this.page.waitForDisplayed('popup', 10000, op === 'close');
}

/**
 * Step Definition:
 * ```
 * /^I (should see|click) (Adobe logo|region switch|copyright|term of use|privacy notice|cookies notice|AdChoices) in global footer$/
 * ```
 * @param {string} action Click global nav footer item
 * @param {string} item Global nav footer item
 */
 function iActionInGlobalFooter(action, item) {
  this.context(GnavPage);
  let elementName = {
    'Adobe logo': 'adobeLogo',
    'region switch': 'regionPicker',
    copyright: 'copyright',
    'term of use': 'termOfUse',
    'privacy notice': 'privacy',
    'cookies notice': 'cookies',
    AdChoices: 'adChoices'
  }[item];
  this.page.waitForDisplayed(elementName);
  this.page[elementName].scrollIntoView();
  if (action === 'click') {
    if (elementName == 'adChoices') {
      this.page[elementName].click();
    } else {
      this.page.clickToNavigate(elementName);
    }
  }
}

/**
 * Step Definition:
 * ```
 * /^I should see OneTrust popup$/
 * ```
 */
function iShouldSeeOneTrustPopup() {
  this.page.waitForDisplayed('oneTrustPopup');
}

/**
 * Step Definition:
 * ```
 * /^I close OneTrust popup$/
 * ```
 */
 function iCloseOneTrustPopup() {
  this.page.waitForDisplayed('oneTrustClose');
  this.page.oneTrustClose.click();
}

/**
 * Step Definition:
 * ```
 * /^I should see AdChoices popup$/
 * ```
 */
function iShouldSeeAdchoicesPopup() {
  this.page.waitForDisplayed('adChoicesIframe');
}

/**
 * Step Definition:
 * ```
 * /^I close AdChoices popup$/
 * ```
 */
function iCloseAdchoicesPopup() {
  this.page.waitForEnabled('iframeClose');
  this.page.iframeClose.click();
  this.page.waitForDisplayed('adChoicesIframe', 10000, true);
}

/**
 * Step Definition:
 * ```
 * /^I should(| not) see (1st|2nd|3rd|4th|5th|any) menu item open on global header$/
 * ```
 * @param {string} neg Toggle for opening global nav header menu
 * @param {string} menu Global nav header menu
 */
 function iShouldnegMenuItemOpenOnGlobalHeader(neg, menu) {
  this.context(GnavPage);
  let actual = this.page.indexOfPopupMenu();
  let expected = null;
  if (menu === 'any' && neg === ' not') {
    expected = -1;
  } else {
    expected = cardinal(menu);
  }
  expect(actual).toEqual(expected);
}

/**
 * Step Definition:
 * ```
 * /^I navigate to the page at (1st|2nd|3rd|4th|5th) submenu item$/
 * ```
 * @param {string} nth Ordinal submenu item of the current popup menu
 */
function navigateToPageAtNthSubmenuItem(nth) {
  let items = this.page.popup.$$('a');
  let item = items[cardinal(nth)];
  let href = item.getAttribute('href');
  item.click();
  browser.pause(1000);
  let url = browser.getUrl();
  expect(url).toEqual(href);
}

/**
 * Step Definition:
 * ```
 * /^I should see copyright matches the current year$/
 * ```
 */
 function iShouldSeeCopyrightMatchesTheCurrentYear() {
  this.context(GnavPage);
  let actual = this.page.copyright.getText();
  let currentYear = new Date().getFullYear();
  expect(actual).toContain(currentYear.toString());
}

/**
 * Step Definition:
 * ```
 * /^I click (Facebook|LinkedIn|Twitter|Instagram|Pinterest) logo in global footer$/
 * ```
 * @param {string} logo Gnav footer social button
 */
 function iClickLogoLogoInGlobalFooter(logo) {
  this.context(GnavPage);
  let prop = logo.toLocaleLowerCase() + 'Logo';
  this.page.waitForDisplayed(prop);
  this.page[prop].scrollIntoView();
  browser.pause(1000);
  this.page[prop].click();
}

/**
 * Step Definition:
 * ```
 * /^I (open|close) my profile$/
 * ```
 * @param {string} action Open or close the user profile dropdown
 */
 function iActionMyProfile(action) {
  if (this.page.profileDropdown.isExisting() && action == 'close' || !this.page.profileDropdown.isExisting() && action == 'open') {
    this.page.profileIcon.click();
  }
}

/**
 * Step Definition:
 * ```
 * /^I (open|close) App Launcher$/
 * ```
 * @param {string} action Open or close the app launcher
 */
function iActionAppLauncher(action) {
  this.context(GnavPage);
  if (action == 'open' && !this.page.appLaunchPopover.isExisting() || action == 'close' && this.page.appLaunchPopover.isExisting()) {
    this.page.appLaunchIcon.click();
  }
}

/**
 * Step Definition:
 * ```
 * /^I should see a search icon$/
 * ```
 */
function iShouldSeeASearchIcon() {
  this.context(GnavPage);
  expect(this.page.searchIcon).toBeDisplayed();
}

/**
 * Step Definition:
 * ```
 * /^I search "([^\"]*)" on global header$/
 * ```
 * @param {string} text Term to be searched
 */
function searchOnGlobalHeader(text) {
  this.page.searchIcon.click();
  this.step(`I input "${text}" in search field on global header`);
}

/**
 * Step Definition:
 * ```
 * /^I should see the page has "([^\"]*)" globalnav experience$/
 * ```
 * @param {string} experience Expected configured gnav experience
 */
 function iShouldSeeNavExperience(experience) {
  var result = browser.execute(function() {
    return window['fedsConfig']
  });
  console.log(result.content.experience);
  console.log(experience);
  expect(result.content.experience).toEqual(experience);
}
/**
 * Step Definition:
 * ```
 * /^I close extension popup window if existing$/
 * ```
 *
 */
function closeExtensionPopupWindow(){
    let closeExtensionPopup = $$(`//a[@data-remember-close-name="modal_acrobatBrowserExtension"]`)[0];

    if(!closeExtensionPopup){
        browser.pause(500);
    }
    else{
        closeExtensionPopup.click();
        expect(closeExtensionPopup).not.toBeDisplayed();
    }
  }

  /**
   * Step Definition:
   * ```
   * /^I should see global nav for $/
   * @param {string} text Global nav name
   */
     function iShouldSeeGlobalNav(text) {
      text = localize(text);
      this.page.waitUntil(() => {
        expect(this.page.getGlobalNavMenuByName()).toExist();
        return true;
      });
    }
  
  /**
   * Step Definition:
   * ```
   * /^I should see breadcrumb in header$/
   * ```
   */
   function iShouldSeeBreadcrumbInHeader() {
    this.page.waitUntil(() => {
      expect(this.page.localNavBreadcrumb).toExist();
      return true;
    });
  }
  
  /**
   * Step Definition:
   * ```
   * /^I should see nav text "text" with "feature" to "link" on "menu" $/
   * @param {string} text Nav text 
   * @param {string} feature Nav feature
   * @param {string} link Nav link
   * @param {string} menu Menu name 
   */
  function iShouldSeeNavText(text, feature, link, menu) {
    text = localize(text);
    this.page.waitUntil(() => {
      if (menu.includes('Globalnav')) {
        // Validate global nav/cross cloud menu items
        expect(this.page.getGlobalNavMenuByText(menu, text)).toExist();
        switch(feature) {
          case ('link'):
            expect(this.page.getGlobalMenuNavLink(menu, text, link)).toExist();
            expect(this.page.getGlobalMenuNavLink(menu, text, link).getAttribute("innerText")).toContain(text);
            break;
          case ('richtext-link'):
            expect(this.page.getGlobalMenuRichTextLink(menu, text, link)).toExist();
            expect(this.page.getGlobalMenuRichTextLink(menu, text, link).getAttribute("innerText")).toContain(text);
            break;
          case ('menu'):
            expect(this.page.getGlobalNavMenuByName(text)).toExist();
            break;
          case ('title'):
            expect(this.page.getGlobalMenuTitle(menu, text)).toExist();
            break;
          case ('button'):
            expect(this.page.getGlobalMenuButton(menu, text, link)).toExist();
            expect(this.page.getGlobalMenuButton(menu, text, link).getAttribute("innerText")).toContain(text); 
            break;
          default:
            console.log("not supported");
        }
      } else if (menu == 'localnav') {
        // Validate base level local nav menu items
          expect(this.page.getLocalMenuNavText(text)).toExist();
          switch(feature) {
            case ('link'):
              expect(this.page.getLocalMenuNavLink(text, link)).toExist();
              break;
            case ('menu'):
              expect(this.page.getLocalMenuDropdown(text)).toExist();
              break;
            case ('button'):
              expect(this.page.getLocalMenuButton(text, link)).toExist();
              break;
            default:
              console.log("not supported");
          }
      } else if (menu.includes('local-')) {
        // Validate local nav dropdown menu items
        let menuName = menu.replace('local-','');
        expect(this.page.getLocalMenuDropdownItemByText(menuName, text)).toExist();
      }
      return true;
    });
  }
  
  
  /**
   * Step Definition:
   * ```
   * /^I should click "menuName" local nav$/
   * @param {string} menuName Local nav menu name
   */
  function iShouldClickLocalNavMenu(menuName) {
    this.page.getLocalMenuDropdown(menuName).click();
  }
  
  /**
   * Step Definition:
   * ```
   * /^I click the "menuName" global nav dropdown$/
   * @param {string} menuName Global nav menu name
   */
  function iShouldClickGlobalNavMenu(menuName) {
    this.page.getGlobalMenuNavDropdown(menuName).click();
  }
  
  /**
   * Step Definition:
   * ```
   * /^I should see "nth" cross cloud link with "text" text going to "link"$/
   * @param {string} nth Nth cross cloud link 
   * @param {string} text Cross cloud link text 
   * @param {string} link Cross cloud link
   */
  function iShouldSeeNthCrossCloudLink(nth, text, link) {
    text = localize(text);
    nth = parseInt(nth);
    // expect(this.page.getNthCrossCloudLinkList(nth).getText()).toMatch(text);
    // expect(this.page.getNthCrossCloudLink(nth).getAttribute("href")).toMatch(link);
    expect(this.page.getNthCrossCloudLinkByTextLink(nth, link, text)).toExist();
    return true;
  }
  
  /**
   * Step Definition:
   * ```
   * /^I should see a cross cloud logo with home icon going to "https://www.adobe.com/index.html"$/
   * @param {string} link Cross cloud link
   */
  function iShouldSeeCrossCloudLogo(link) {
    expect(this.page.getCrossCloudLogoLink().getAttribute("href")).toMatch(link);
    expect(this.page.getCrossCloudLogo(link)).toExist();
    return true;
  }
  
  /**
   * Step Definition:
   * ```
   * /^I should see nav text "text" with "feature" to "link" on "menu" $/
   * @param {string} text Nav text 
   * @param {string} feature Nav feature
   * @param {string} link Nav link
   * @param {string} menu Menu name 
   * @param {string} dynamiclink Dynamic link type
   */
   function iShouldSeeDynamicLink(text, feature, link, menu, dynamiclink) {
    text = localize(text);
    console.log(this.page.getLocalMenuNavLink(text, link).getAttribute('data-navlink-dynamiclinktype'))
    this.page.waitUntil(() => {
      if (menu == 'localnav') {
        // Validate base level local nav menu items
          expect(this.page.getLocalMenuNavText(text)).toExist();
          switch(feature) {
            case ('link'):
              expect(this.page.getLocalMenuNavLink(text, link).getAttribute('data-navlink-dynamiclinktype')).toContain(dynamiclink);
              break;
            case ('button'):
              expect(this.page.getLocalMenuButton(text, link).getAttribute('data-navlink-dynamiclinktype')).toContain(dynamiclink);
              break;
            default:
              console.log("not supported");
          }
      }
      return true;
    });
  }

/**
 * Step Definition:
 * ```
 * /^I should see a button on local nav$/
 * ```
 */
function iShouldSeeAButtonOnLocalNav() {
  expect(this.page.buyNowButton.isExisting()).toBe(true);
}

/**
 * Step Definition:
 * ```
 * /^I click the last local nav link$/
 * ```
 */
 function iClickTheLastLocalnavLink() {
  this.page.freeTrialLink.click();
}

/**
 * Step Definition:
 * ```
 * /^I click the local nav button$/
 * ```
 */
 function iClickTheLocalnavButton() {
  this.page.buyNowButton.click();
}
