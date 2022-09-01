/** @module dc/steps */
const { Given } = require('@cucumber/cucumber');
const { Then } = require('@cucumber/cucumber');
const { When } = require('@cucumber/cucumber');
import { GnavPage } from '../../common/pages/gnav_page';

Then(
  /I should see Change Region "([^\"]*)" at the bottom of the page$/,
  iShouldSeeChangeRegionTextAtTheBottomOfThePage
);

Then(
  /^I should see the Change region button at bottom of page$/,
  iShouldSeeTheChangeRegionButtonAtBottomOfPage
);

Then(/^I (open|close) change region panel$/, iActionChangeRegionPanel);

Then(/^I open and close change region panel$/, iOpenAndCloseChangeRegionPanel);

Then(
  /^I should see localized content on region panel$/,
  iShouldSeeLocalizedContentOnRegionPanel
);

Then(/^I try to change region to "([^\"]*)"$/, iTryToChangeRegionToRegion);

Then(/^I change region to "([^\"]*)"$/, iChangeRegionToRegion);

When(/^I change region repeatedly to:$/, iChangeRegionRepeatedlyTo);

When(
  /^I change region repeatedly through all supported regions$/,
  { timeout: 600000 },
  iChangeRegionRepeatedlyThroughAllSupportedRegions
);

Then(
  /^I should be redirected for the following regions:$/,
  iShouldBeRedirectedForTheFollowingRegions
);

/**
 * Step Definition:
 * ```
 * /I should see Change Region "([^\"]*)" at the bottom of the page$/
 * ```
 * @param {string} text Region selector text link
 */
function iShouldSeeChangeRegionTextAtTheBottomOfThePage(text) {
  this.context(GnavPage);
  this.page.waitForDisplayed('regionPicker');
  expect(this.page.regionPicker).toHaveText(text);
}

/**
 * Step Definition:
 * ```
 * /^I should see the Change region button at bottom of page$/
 * ```
 */
function iShouldSeeTheChangeRegionButtonAtBottomOfPage() {
  this.context(GnavPage);
  this.page.waitForDisplayed('regionPicker');
}

/**
 * Step Definition:
 * ```
 * /^I (open|close) change region panel$/
 * ```
 * @param {string} action Open or close the region selector modal
 */
function iActionChangeRegionPanel(action) {
  this.context(GnavPage);
  if (action === 'open') {
    this.page.waitForDisplayed('regionPicker');
    this.page.clickAndWait('regionPicker', 'regionSwitch', {
      handler: () => {
        // Dismiss locale modal
        if (this.page.localeModalDefault.isDisplayed()) {
          this.page.localeModalDefault.click();
        }
        // Dismiss cookie consent
        if (this.page.CookieConsentAccept.isDisplayed()) {
          this.page.CookieConsentAccept.click();
        }
      }
    });
  } else {
    this.page.waitForDisplayed('regionSwitchClose');
    this.page.clickAndWait('regionSwitchClose', 'regionSwitch', {
      reverse: true
    });
  }
}

/**
 * Step Definition:
 * ```
 * /^I open and close change region panel$/
 * ```
 */
function iOpenAndCloseChangeRegionPanel() {
  this.step('I open change region panel');
  this.step('I close change region panel');
}

/**
 * Step Definition:
 * ```
 * /^I should see localized content on region panel$/
 * ```
 */
function iShouldSeeLocalizedContentOnRegionPanel() {
  //console.log(this.page.regionHeading.getText());
  expect(this.page.regionHeading.getText()).toContain(
    this.page.currentRegionHeading,
    {
      wait: 10000,
      interval: 1000
    }
  );
}

/**
 * Step Definition:
 * ```
 * /^I try to change region to "([^\"]*)"$/
 * ```
 * @param {string} region Country or region
 */
function iTryToChangeRegionToRegion(region) {
  return 'pending'; //     step "I open change region panel"
  //     @page.region_switch_panel.select(region)
  //     sleep 5
  //     #wait_for_ajax
}

/**
 * Step Definition:
 * ```
 * /^I change region to "([^\"]*)"$/
 * ```
 * @param {string} region Country or region
 */
function iChangeRegionToRegion(region) {
  this.step('I open change region panel');
  this.step('I should see localized content on region panel');
  let regionElement = this.page.regions.find(x => x.getText() === region);
  //regionElement.click();
  //browser.pause(2000);
  this.page.clickToNavigate(regionElement);
  while (this.page.localeModalDefault.isDisplayed()) {
    this.page.localeModalClose.click();
    browser.pause(1000);
  }
}

/**
 * Step Definition:
 * ```
 * /^I change region repeatedly to:$/
 * ```
 * @param {string[][]} table Regions to select
 */
function iChangeRegionRepeatedlyTo(table) {
  let locale = browser.config.locales.filter(
    x => x.locale === browser.config.profile.locale
  )[0];
  this.page.currentRegionHeading = locale.regionHeading;
  for (let region of table.rawTable) {
    this.step(`I change region to "${region[0]}"`);
    let locale = browser.config.locales.filter(
      x => x.name === `${region[0]}`
    )[0];
    this.page.currentRegionHeading = locale.regionHeading;

    // verify locale in the path
    expect(browser.getUrl()).toContain(locale.locale, {
      wait: 10000,
      interval: 1000
    });
    // verify '/content/dx-dc/' should not in the path
    expect(browser.getUrl()).not.toContain('/content/dx-dc/', {
      wait: 10000,
      interval: 1000
    });
    // verify cookie 'international' value set as country code
    let intlCookie = browser.getCookies(['international']);
    try {
      expect(intlCookie[0]['value']).toContain(locale.international);
    } catch (e) {
      e.message += `\nChecking cookie "international":\n${JSON.stringify(
        intlCookie
      )}`;
      throw e;
    }
    browser.pause(500);
  }
}

/**
 * Step Definition:
 * ```
 * /^I change region repeatedly through all supported regions$/
 * ```
 */
function iChangeRegionRepeatedlyThroughAllSupportedRegions() {
  
  let initLocale = browser.config.locales.filter(
    x => x.locale === browser.config.profile.locale
  )[0];
  this.page.currentRegionHeading = initLocale.regionHeading;

  for (let locale of browser.config.locales) {
    if (locale.region === 'United States') {
      continue;
    }

    let step = `I change region to "${locale.name}"`;
    console.log(step);
    this.step(step);
    this.page.currentRegionHeading = locale.regionHeading;

    // verify locale in the path
    expect(browser.getUrl()).toContain(locale.locale, {
      wait: 10000,
      interval: 1000
    });

    // !!! DC specific test !!!
    // verify '/content/dx-dc/' should not in the path
    expect(browser.getUrl()).not.toContain('/content/dx-dc/', {
      wait: 10000,
      interval: 1000
    });

    // verify cookie 'international' value set as country code
    expect(browser.getCookies(['international'])[0]['value']).toContain(
      locale.international
    );

    browser.pause(500);
  }
}

/**
 * Step Definition:
 * ```
 * /^I should be redirected for the following regions:$/
 * ```
 * @param {string[][]} table Selected regions
 */
function iShouldBeRedirectedForTheFollowingRegions(table) {
  return 'pending'; //     aggregate_failures "Change regions" do
  //       regions = table.hashes
  //       regions.each do |region|
  //         step "I try to change region to \"#{region['Region']}\""
  //         step "I wait for 1 second"
  //         expect(page).to have_current_path(region['Redirect'], ignore_query: true), \
  //           "Try to switch to '#{region['Region']}'\nGot URL path '#{URI(page.current_url).path}'\nExpect '#{region['Redirect']}'"
  //       end
  //     end
}
