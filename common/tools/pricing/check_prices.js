import localize from '../../support/functions/localize';

const waitTimeout = 10000;
export const buyButtonLocator = '[href*="https://commerce.adobe.com"], [href*="https://commerce-stg.adobe.com"]';
export const tabLocator = '.navList:not(.aem-GridColumn--default--hide) .spectrum-Tabs-item';
export const dropdownLocator = '.spectrum-Dropdown-trigger';
export const tabLinkstoOtherPages = `//*[contains(@data-toggleid, "toggle-acrobat-with-cc-all-apps")] | //*[contains(@data-toggleid, "toggle-student-teachers")] | //*[@class="spectrum-Tabs-itemLabel" and contains(text(), '${localize('Students & Teachers')}')]`;
export const dropdownLabelLocator = 'ul .spectrum-Menu-item';
export const radioButtonLocator = '//div[starts-with(@class, "navList") and //spectrum-radio and not(spectrum-tablist) and not(con-tablist)]';
export const radioButtonLabelLocator = '.spectrum-Radio-input';
export const radioButtonLabelText = '.spectrum-Radio-input ~ .spectrum-Radio-label';
export const qtyDropdownLocator = 'select[name="qty-select"].dexter-Dropdown';
export const nthQuantityLocator = `select[name="qty-select"] option:nth-child(3)`;
export const continueToCheckoutLocator = `=${localize('Continue to checkout')}`;
export const trialPages = ['online-contracts', 'free-trial'];
export const loading = 'coral-wait, .loading';
export const surveyPopup = 'iframe[data-src^="https://survey.adobe.com"]'
export const choiceNo = '#QID1-2-label'
export const closeSurvey = '[src$="siteintercept/svg-close-btn-black-7.svg"]'
export const UCv3SupportedGeo = ['us'];
export const UCv2ProductOffers = ['0E32602A854E56BF633D92B6B383A2BF', '51A532B0125F523CC6CBF352CA0CC931', 'CDBBCFE9BF5DB6E20BB77277183BBC3D', 'B126EEDE63DD0574C495726767B3D42E', '77CA3750B72767F9E985DD2997912DFE', '34F76738F3BFA36D46D73D6B5406918A', 'BEE806E2ECAB0755C8EE3DA5BBA1319B', '3EED504A0210027266204B98C27AAD0F', 'ADD857826A8DEE5A747D62053B25A4D2', '4F9E4CFDED9F1D3778AC7DAE883D49FC', 'C3C7915753BDD9E43D884F846C669FC4', 'B5AD4F53E1B747500017D374045CA57A', '2A922DAB547C22EEA5D3F8170254539E', '69EFE22A4071113CB2C72C58C9EF4E97', '4F5EFB5713F74AFFC5960C031FB24656', '2395115AE8BE7FABE101ED136FCB3525', 'AF794661A0494CF71F10ED37EFBA735F', '4B76650ECC8CA257DDC284B05FA8A6E1', '0A5A1FC0F3F85E51B6C53B19C7D80DF7', 'C592C0B7703044B6930FAE88193208FB', 'D858CC3D93A2ED67604AB3D413C3F3E5', '3BA289C82BE46483E176AB8B42819643', '0E32602A854E56BF633D92B6B383A2BF', '51A532B0125F523CC6CBF352CA0CC931', '84B492497FC7224F5CE3283B1192A6DB', 'FD0BEEBCA572B7BA7ABA7787F30F6965', '77CA3750B72767F9E985DD2997912DFE', '34F76738F3BFA36D46D73D6B5406918A', '8E7B6B16F97563FFAD8DC7DACE0BB58D', '177C8F46AAFC2D700A591642549CC3AC', 'F1FA0C678A0374EFC703FE4DA3D13CEE', 'BB938C4970986FF10BAD863B0A850661'];
export const productOffersWithKnownIssues = [];
export const gnavHeader = '#feds-topnav';
export const isUCv3 = UCv3SupportedGeo.includes(browser.config.profile.geolocation) && !['ie'].includes(browser.config.profile.browser)
export const nonExistentPage = [
  {
    page: 'acrobat/pricing/business',
    loc: [
      'jp'
    ]
  },
  {
    page: 'acrobat/pricing/students',
    loc: [
      'jp'
    ]
  }
];
const { JSDOM } = require('jsdom');
const wgxpath = require('wgxpath');
const fs = require('fs');
const {
  requestGetRetry,
  requestGet,
  requestHead
} = require('../../../common/support/functions/request_sync');

const {
  acomMap,
  acomMapReverse
} = require('./locale_mapper');

/**
 * Step Definition:
 * ```
 * /^Get all locales in Europe$/
 * ```
*/
export function getEURegions() {
  return [
    'at',
    'be',
    'bg',
    'hr',
    'cy',
    'cz',
    'dk',
    'ee',
    'fi',
    'fr',
    'de',
    'gr',
    'hu',
    'ie',
    'it',
    'lv',
    'lt',
    'lu',
    'mt',
    'nl',
    'pl',
    'pt',
    'ro',
    'sk',
    'si',
    'es',
    'se',
    'no'
  ];
}

export function isTrialPage(pageUrl) {
  for(let i = 0; i < trialPages.length; i++) {
    if(pageUrl.includes(trialPages[i])) {
      return true;
    }
  }

  return false;
}

/**
 * find container element from starting source element
 * @param {Object} source source element
 * @param {String} locator target css class
 */
export function findContainerElement(source, locator) {
  try {
    while (
      !source.getAttribute('class').includes(locator) ||
      (source.getAttribute('class').includes(locator) &&
        !source.$(buyButtonLocator).isExisting())
    ) {
      source = source.$(function () {
        return this.parentNode;
      });
    }
  } catch (error) {
    //console.log(error);
  }

  try {
    while (
      source.getTagName() != 'body' &&
      !source.$('.type-price').isExisting() &&
      !source.$('.pricing').isExisting() &&
      !source.$('[data-path*="/offers/pricing"]').isExisting()
    ) {
      source = source.$(function () {
        return this.parentNode;
      });
    }
  } catch (error) {}

  return source;
}

/**
 * validate the price on checkout page with the price from plans
 * @param {String} pricingText price text from plans
 */
 export function validateCheckoutPage(pricingText, titleFromUI, pageUrl, quantity) {
  let url = new URL(browser.getUrl()).searchParams;
  let results = [];

  if (productOffersWithKnownIssues.includes(url.get('items[0][id]')) && !browser.config.profile.env.includes('prod')) {
    results = 'true';
  } else {
    let isUCv3Product =
      isUCv3 &&
      !pageUrl.match(/(?!(\/sign\/free-trial.html))(\/sign)/) &&
      !pageUrl.match(
        /(acrobat\/complete-pdf-solution.html)|(\/acrobat\/online.html)/
      ) &&
      !UCv2ProductOffers.includes(url.get('items[0][id]'));

    if ((pageUrl.match(/(?!(\/sign\/free-trial.html))(\/sign)/) || pageUrl.match(/(acrobat\/complete-pdf-solution.html)|(\/acrobat\/online.html)/)) && browser.config.profile.locale === '' && !UCv2ProductOffers.includes(url.get('items[0][id]'))) {
      isUCv3Product = true;
    }

    let productName = isUCv3Product ? '[data-testid="product-name"]' : '//*[contains(@class, "product-name")]';
    let subscription = isUCv3Product ? '[class*="CartItemView__item-price"] div:not([class^="strikethrough"]), [class*="Promo__promoDiscountPrice"] div' : '[name="subscription"]';
  
    if (
      browser.config.profile.locale.includes('jp') &&
      pageUrl.match(/(\/acrobat\/how-to\/)|(\/acrobat\/reader\/)/)
    ) {
      productName = '//*[@data-testid = "product-name"] | //*[contains(@class, "product-name")]';
      subscription = '[class*="CartItemView__item-price"] div:not([class^="strikethrough"]), [class*="Promo__promoDiscountPrice"] div, [name="subscription"]';
    }

    let handles = browser.getWindowHandles();
  
    if (handles.length > 1 ) browser.switchToWindow(handles[handles.length - 1]);
  
    browser.waitUntil(
      () => browser.$(productName).isDisplayed(),
      {
        timeout: waitTimeout,
        timeoutMsg: `Timeout waiting for the product name. URL = ${browser.getUrl()}`,
        interval: 1000
      }
    );
  
    browser.pause(2000);
    let pricingTextOnCheckoutPage = '';
    let pricingMatchResult = '';
  
    if (browser.$('.filter-control-single-value').isExisting()) {
      pricingTextOnCheckoutPage = browser
        .$('.filter-control-single-value')
        .getText();
    }
  
    if (browser.$(subscription).isExisting()) {
      pricingTextOnCheckoutPage = browser.$(subscription).getText();
    }
  
    console.log('pricing on checkout: ' + pricingTextOnCheckoutPage);
  
    if (
      pricingText != '' &&
      pricingText
        .replace(/[^0-9]/g, '')
        .includes(pricingTextOnCheckoutPage.replace(/[^0-9]/g, ''))
    ) {
      pricingMatchResult = 'true';
      console.log('pricing match: true');
    } else {
      if (
        (pricingText == '' && titleFromUI.includes('free trial')) ||
        (pricingText == '' && isTrialPage(pageUrl))) {
        pricingMatchResult = 'true';
        console.log('pricing match: true');
      } else {
        // DOTCOM-61816
        if (
          (browser.config.profile.locale.includes('jp') &&
            pageUrl.match(/(\/acrobat\/how-to\/)|(\/acrobat\/reader\/)/) &&
            (pricingText.includes(pricingTextOnCheckoutPage) ||
              pricingTextOnCheckoutPage.includes('1,738 円'))) ||
          (pageUrl.match(/\/acrobat\/online.html/) && pricingText === '')
        ) {
          pricingMatchResult = 'true';
          console.log('pricing match: true');
        } else {
          pricingMatchResult = `(x) ${pricingText.replace(
            /[^0-9]/g,
            ''
          )} vs ${pricingTextOnCheckoutPage.replace(/[^0-9]/g, '')}`;
          console.log(
            'pricing not match: ' +
              pricingText +
              ' vs ' +
              pricingTextOnCheckoutPage
          );
        }
      }
    }
    results.push(pricingMatchResult)
  
    let quantityMatchResult = 'true';
    if (quantity) {
      console.log(quantity)
      let cartQuantity = 1;
      cartQuantity = $('div[data-qe-id="product-attribute-selector-quantity"]').getAttribute("value");
      console.log("quantity: "+quantity);
      if (!(quantity == cartQuantity)) {
        quantityMatchResult = `(x) ${quantity} vs ${cartQuantity}`;
        console.log(
          'quantity not match: ' + quantity + ' vs ' + cartQuantity
        );
      }                                         
      results.push(quantityMatchResult)
    }
  
    if (browser.config.profile.geolocation && browser.config.profile.tags.match(/@desc-\S+.+?(?=\))|@MWPW-\S+?(?=\))/g)) {
      iShouldSeeTheCorrectCountryParameterInCurrentUrl(pageUrl);
      iShouldSeeTheCorrectLangParameterInCurrentUrl(pageUrl);
    }
    
    if (handles.length > 1 ) {
      browser.closeWindow();
      browser.pause(1000);
      browser.switchToWindow(handles[0]);
    }
  }
  return results;
}

/**
 * close dexter geo overlay if present
 */
export function closeGeoOverlay() {
  browser.pause(1000);
  if ($('div#localeModal').isDisplayed()) {
    $('div#localeModal .dexter-CloseButton').click();
  }
}

/**
 * click continue to checkout if present
 */
export function clickContinueToCheckout() {
  browser.pause(1500);
  if ($(continueToCheckoutLocator).isExisting()) {
    clickElement(browser.$(continueToCheckoutLocator));
    browser.pause(1500);
  }
}

/**
 * build price text with all pricing elements
 * @param {Array} pricing all pricing elements
 */
export function buildPricingText(pricing) {
  let pricingText = '';

  if (pricing != undefined) {
    console.log('print pricing');
    console.log('total pricing: ' + pricing.length);
    for (let k = 0; k < pricing.length; k++) {
      console.log('pricing tag css: ' + pricing[k].getAttribute('class'));
      pricing[k].waitForDisplayed({ timeout: 3000 });
      pricingText += pricing[k].getText().replace(/\s+/g, '').trim();
      console.log(pricing[k].getText().replace(/\s+/g, '').trim());
    }
  }

  return pricingText;
}

/**
 * find and click all buy buttons and check price on the page with tab and dropdown
 */
 export function handlePageWithTabWithDropdown(pResult) {
  let pageUrl = browser.getUrl();
  let tabs = browser.$$(tabLocator);
  let nTabCount = tabs.length;
  let testResult = true;
  let links;
  pResult = pResult ?? [];

  for (let i = 0; i < nTabCount; i++) {
    console.log('Tab: ' + i);
    // access the page and click tab
    // requestHead(pageUrl);
    browser.navigateTo(pageUrl);
    closeGeoOverlay();
    tabs[i].click();
    // set dropdowns
    let planLocator = dropdownLocator;
    let navlist = browser.$$(planLocator).filter(x => x.isDisplayed());
    let planCount = navlist.length;
    for (let j = 0; j < planCount; j++) {
      // access the page and click tab
      browser.navigateTo(pageUrl);
      closeGeoOverlay();
      browser.execute('window.scrollTo(0, 0);');
      tabs[i].click();
      // set dropdown labels
      console.log('Plan #: ' + j);
      navlist[j].click();
      let planLabels = browser.$$(dropdownLabelLocator);
      let planLabelCount = planLabels.length;
      planLabels[0].click();
      // deal with dropdown label one by one
      for (let k = 0; k < planLabelCount; k++) {
        console.log('Plan label: ' + k);
        browser.pause(5000);
        browser.execute('window.scrollTo(0, 0);');
        tabs[i].click();
        navlist[j].scrollIntoView({ block: 'center', inline: 'nearest' });
        navlist[j].click();
        browser.pause(1000);
        clickElement(planLabels[k]);
        let planText = planLabels[k].getText();
        console.log(planText);
        // some pages is using table
        let containerLocator = '';
        if (
          browser.$('.dexter-Table').isExisting() &&
          (browser.$('.dexter-Table .type-price').isExisting() ||
            browser.$('.dexter-Table .pricing').isExisting())
        ) {
          containerLocator = 'row';
        } else if (
          browser.$('.position .type-price').isExisting() ||
          browser.$('.position .pricing').isExisting() ||
          browser
            .$('.position [data-path*="/offers/pricing"]')
            .isExisting()
        ) {
          containerLocator = 'position';
        } else {
          containerLocator = 'flex';
        }

        console.log('Container Locator: ' + containerLocator);

        browser.pause(3000);

        links = getCommerceLinks(planLocator, containerLocator, j);

        if (Object.keys(pResult).length === 0) expect(links.length).toBeGreaterThanOrEqual(1);

        // Set product default quantity
        let quantity = null;

        // Get correct quantity selector dropdown for clicking
        let qty1 = findContainerElement(
          browser.$$(planLocator).filter(x => x.isDisplayed())[j],
          containerLocator
        )
          .$$(qtyDropdownLocator)
          .filter(x => x.isDisplayed());

        if (qty1) {
          // select a non-default quantity for testing
          let nthQuantity = findContainerElement(
            browser.$$(planLocator).filter(x => x.isDisplayed())[j],
            containerLocator
          )
            .$$(nthQuantityLocator)
            .filter(x => x.isDisplayed());
          console.log('qty1');
          console.log(qty1);
          // select a non-default quantity and record if qty exists for product
          if (Object.keys(qty1).length > 0) {
            qty1[0].click();
            nthQuantity[0].click();

            console.log('quantity: ' + nthQuantity[0].getText());
            quantity = nthQuantity[0].getText();
          }
        }

        console.log('Total buttons under this container: ' + links.length);
        for (let s = 0; s < links.length; s++) {
          console.log('Button: ' + (s + 1));

          links = getCommerceLinks(planLocator, containerLocator, j);

          let titleFromUI = links[s].getText().trim();
          let urlFromUI = links[s].getAttribute('href');

          checkEmptyCodeParam(urlFromUI);

          console.log('From UI Display: ' + links[s].getAttribute('href'));
          let pricingText = buildPricingText(
            findPrices(planLocator, containerLocator, j)
          );
          links[s].scrollIntoView({ block: 'center', inline: 'nearest' });
          clickElement(links[s]);

          clickContinueToCheckout();

          let pricingMatchResult = null;
          let handles = browser.getWindowHandles();

          if (quantity) {
            // validate on checkout page
            pricingMatchResult = validateCheckoutPage(
              pricingText,
              titleFromUI,
              pageUrl,
              quantity
            );
          } else {
            // validate on checkout page
            pricingMatchResult = validateCheckoutPage(
              pricingText,
              titleFromUI,
              pageUrl
            );
          }
          if (Object.keys(pResult).length === 0) expect(pricingMatchResult).toContain('true');

          testResult = saveResult(
            pResult,
            titleFromUI,
            urlFromUI,
            planText,
            pricingText,
            pricingMatchResult
          );


          if (handles.length == 1) {
            browser.back();
            browser.pause(500);
            closeGeoOverlay();
          }

          if (k > 0) {
            browser.execute('window.scrollTo(0, 0);');
            tabs[i].click();
            navlist[j].click();
            clickElement(planLabels[k]);
            browser.pause(1000);
          }
        }
      }
    }
  }
  return testResult;
}


/**
 * find and click all buy buttons and check price on the page with tab and radio buttons
 */
export function handlePageWithTabWithRadioButtons(pResult) {
  let pageUrl = browser.getUrl();
  let tabs = browser.$$(tabLocator);
  let nTabCount = tabs.length;
  let testResult = true;
  let links;
  let planLabels;
  let planLabelText;
  let planLocator = radioButtonLocator;
  let navlist;
  let planCount;
  pResult = pResult ?? [];

  for (let i = 0; i < nTabCount; i++) {
    console.log('Tab: ' + i);
    // access the page and click tab
    // requestHead(pageUrl);
    browser.navigateTo(pageUrl);

    closeGeoOverlay();

    browser.execute('window.scrollTo(0, 0);');

    tabs = browser.$$(tabLocator);
    tabs[i].click();
    browser.pause(1000);

    navlist = browser.$$(planLocator).filter(x => x.isDisplayed());

    // set radio button
    planCount = navlist.length;
    for (let j = 0; j < planCount; j++) {
      // access the page and click tab
      browser.navigateTo(pageUrl);

      closeGeoOverlay();

      browser.execute('window.scrollTo(0, 0);');

      tabs = browser.$$(tabLocator);
      clickElement(tabs[i], true);

      // set radio button labels
      console.log('Product type #: ' + j);

      // some pages are using table
      let containerLocator = '';
      if (
        browser.$('.dexter-Table').isExisting() &&
        (browser.$('.dexter-Table .type-price').isExisting() ||
          browser.$('.dexter-Table .pricing').isExisting())
      ) {
        containerLocator = 'row';
      } else {
        containerLocator = 'position';
      }

      browser.pause(500);

      navlist = browser.$$(planLocator).filter(x => x.isDisplayed());

      planLabels = findContainerElement(navlist[j], containerLocator).$$(
        radioButtonLabelLocator
      );
      planLabelText = findContainerElement(navlist[j], containerLocator).$$(
        radioButtonLabelText
      );
      planLabels[0].click();

      console.log(`Number of plans: ${planLabels.length}`);

      // deal with radio label one by one
      for (let k = 0; k < planLabels.length; k++) {
        console.log('Plan label: ' + k);

        browser.pause(5000);
        browser.execute('window.scrollTo(0, 0);');
        tabs = browser.$$(tabLocator);
        clickElement(tabs[i], true);

        navlist[j].scrollIntoView({ block: 'center', inline: 'nearest' });
        browser.pause(1000);

        navlist = browser.$$(planLocator).filter(x => x.isDisplayed());

        planLabels = findContainerElement(navlist[j], containerLocator).$$(
          radioButtonLabelLocator
        );
        planLabelText = findContainerElement(navlist[j], containerLocator).$$(
          radioButtonLabelText
        );

        clickElement(planLabels[k]);
        let planText = planLabelText[k].getText();
        console.log(planText);

        console.log('Container Locator: ' + containerLocator);
        browser.pause(1000);

        links = getCommerceLinks(planLocator, containerLocator, j);

        if (Object.keys(pResult).length === 0) expect(links.length).toBeGreaterThanOrEqual(1);

        // Set product default quantity
        let quantity = null;

        // Get correct quantity selector dropdown for clicking
        let qty1 = findContainerElement(
          browser.$$(planLocator).filter(x => x.isDisplayed())[j],
          containerLocator
        )
          .$$(qtyDropdownLocator)
          .filter(x => x.isDisplayed());

        if (qty1) {
          // select a non-default quantity for testing
          let nthQuantity = findContainerElement(
            browser.$$(planLocator).filter(x => x.isDisplayed())[j],
            containerLocator
          )
            .$$(nthQuantityLocator)
            .filter(x => x.isDisplayed());
          console.log('qty1');
          console.log(qty1);
          // select a non-default quantity and record if qty exists for product
          if (Object.keys(qty1).length > 0) {
            qty1[0].click();
            nthQuantity[0].click();

            console.log('quantity: ' + nthQuantity[0].getText());
            quantity = nthQuantity[0].getText();
          }
        }

        console.log('Total buttons under this container: ' + links.length);
        for (let s = 0; s < links.length; s++) {
          console.log('Button: ' + (s + 1));

          links = getCommerceLinks(planLocator, containerLocator, j);

          let titleFromUI = links[s].getText().trim();
          let urlFromUI = links[s].getAttribute('href');
          console.log('From UI Display: ' + links[s].getAttribute('href'));

          checkEmptyCodeParam(urlFromUI);

          let pricingText = buildPricingText(
            findPrices(planLocator, containerLocator, j)
          );

          links[s].scrollIntoView({ block: 'center', inline: 'nearest' });

          clickElement(links[s]);

          clickContinueToCheckout();

          let pricingMatchResult = null;
          let handles = browser.getWindowHandles();

          if (quantity) {
            // validate on checkout page
            pricingMatchResult = validateCheckoutPage(
              pricingText,
              titleFromUI,
              pageUrl,
              quantity
            );
          } else {
            // validate on checkout page
            pricingMatchResult = validateCheckoutPage(
              pricingText,
              titleFromUI,
              pageUrl
            );
          }

          if (Object.keys(pResult).length === 0) expect(pricingMatchResult).toContain('true');

          console.log(`Handles.length = ${handles.length}`);

          if (handles.length == 1) {
            clickBack(planLocator);
          }

          testResult = saveResult(
            pResult,
            titleFromUI,
            urlFromUI,
            planText,
            pricingText,
            pricingMatchResult
          );

          if (k > 0) {
            browser.execute('window.scrollTo(0, 0);');
            tabs = browser.$$(tabLocator);
            clickElement(tabs[i], true);

            navlist = browser.$$(planLocator).filter(x => x.isDisplayed());

            planLabels = findContainerElement(navlist[j], containerLocator).$$(
              radioButtonLabelLocator
            );
            planLabelText = findContainerElement(navlist[j], containerLocator).$$(
              radioButtonLabelText
            );
            browser.pause(500);
            clickElement(planLabels[k]);
            browser.pause(1000);
          }
        }
      }
    }
  }
  return testResult;
}

/**
 * find and click all buy buttons and check price on the page without tab, but with dropdown
 */
 export function handlePageNoTabWithDropdown(pResult) {
  let pageUrl = browser.getUrl();
  let testResult = true;
  let links;
  let dropdownlabels;
  let nDropdownLabelCount;
  let dropdowns;
  let nDropdownCount;
  pResult = pResult ?? [];

  // set dropdowns
  dropdowns = browser.$$(dropdownLocator).filter(x => x.isDisplayed());
  nDropdownCount = dropdowns.length;
  for (let j = 0; j < nDropdownCount; j++) {
    // set dropdown labels
    console.log('Dropdown: ' + j);
    dropdowns = browser.$$(dropdownLocator).filter(x => x.isDisplayed());
    dropdowns[j].scrollIntoView({block: "center", inline: "nearest"});
    dropdowns[j].click();
    browser.pause(500);
    dropdownlabels = browser.$$(dropdownLabelLocator);
    nDropdownLabelCount = dropdownlabels.length;
    dropdownlabels[0].click();
    // deal with dropdown label one by one
    for (let k = 0; k < nDropdownLabelCount; k++) {
      console.log('Dropdownlabel: ' + k);

      browser.pause(5000);
      dropdowns[j].scrollIntoView({block: "center", inline: "nearest"});
      dropdowns[j].click();
      browser.pause(1000);
      dropdownlabels = browser.$$(dropdownLabelLocator);
      dropdownlabels[k].click();
      let planText = dropdownlabels[k].getText();
      console.log(planText);

      // some pages is using table
      let containerLocator = '';
      if (
        browser.$('.dexter-Table').isExisting() &&
        (browser.$('.dexter-Table .type-price').isExisting() ||
          browser.$('.dexter-Table .pricing').isExisting())
      ) {
        containerLocator = 'row';
      } else if (
        browser.$('.position .type-price').isExisting() ||
        browser.$('.position .pricing').isExisting()
      ) {
        containerLocator = 'position';
      } else {
        containerLocator = 'flex';
      }

      console.log(containerLocator);

      links = getCommerceLinks(dropdownLocator, containerLocator, j);

      if (Object.keys(pResult).length === 0) expect(links.length).toBeGreaterThanOrEqual(1);

      console.log('Total buttons under this container: ' + links.length);

      for (let s = 0; s < links.length; s++) {
        console.log(s);

        links = getCommerceLinks(dropdownLocator, containerLocator, j);

        let titleFromUI = links[s].getText().trim();
        let urlFromUI = links[s].getAttribute('href');
        console.log('From UI Display: ' + links[s].getAttribute('href'));

        checkEmptyCodeParam(urlFromUI);

        let pricingText = buildPricingText(findPrices(dropdownLocator, containerLocator, j));

        links[s].scrollIntoView({block: "center", inline: "nearest"});
        clickElement(links[s]);

        clickContinueToCheckout();

        let handles = browser.getWindowHandles();

        // validate on checkout page
        let pricingMatchResult = validateCheckoutPage(pricingText, titleFromUI, pageUrl);
        if (Object.keys(pResult).length === 0) expect(pricingMatchResult).toContain('true');

        if (handles.length == 1) {
          browser.back();
          browser.pause(500);
          closeGeoOverlay();
        }

        testResult = saveResult(
          pResult,
          titleFromUI,
          urlFromUI,
          planText,
          pricingText,
          pricingMatchResult
        );

        if (k > 0) {
          dropdowns[j].scrollIntoView({block: "center", inline: "nearest"});
          dropdowns[j].click();
          dropdownlabels = browser.$$(dropdownLabelLocator);
          dropdownlabels[k].click();
        }
      }
    }
  }
  return testResult;
}


/**
 * find and click all buy buttons and check price on the page without tab, but with radio buttons
 */
export function handlePageNoTabWithRadioButtons(pResult) {
  pResult = pResult || {};
  let pageUrl = browser.getUrl();
  let planLocator = radioButtonLocator;
  let navlist = browser.$$(planLocator).filter(x => x.isDisplayed());
  let navlistCount = navlist.length;
  let testResult = true;
  let links;
  let maxPlans = pResult.count || 10;
  let scroll = (browser.config.profile.browser === 'ie');

  // Some pages are using table
  let containerLocator = '';
  if (
    browser.$('.dexter-Table').isExisting() &&
    (browser.$('.dexter-Table .type-price').isExisting() ||
      browser.$('.dexter-Table .pricing').isExisting())
  ) {
    containerLocator = 'row';
  } else if (
    browser.$('.position .navList').isExisting()) {
    containerLocator = 'position';
  } else {
    containerLocator = 'flex';
  }

  console.log(containerLocator);

  for (let j = 0; j < navlistCount && maxPlans > 0; j++) {

    if (pageUrl.includes('acrobat/pricing/students.html')) {
      switch (j) {
        case 0:
          containerLocator = 'flex';
          break;
        case 1:
          containerLocator = 'position';
          break;
      }
    } 

    navlist = browser.$$(planLocator).filter(x => x.isDisplayed());

    // set radio button labels
    console.log('Plan #: ' + j);
    let planLabels = findContainerElement(navlist[j], containerLocator).$$(
      radioButtonLabelLocator
    );
    let planLabelText = findContainerElement(navlist[j], containerLocator).$$(
      radioButtonLabelText
    );

    let planLabelCount = planLabels.length;
    planLabels[0].click();
    // deal with radio button labels one by one
    for (let k = 0; k < planLabelCount && maxPlans-- > 0; k++) {
      console.log('Plan label: ' + k);

      planLabels = findContainerElement(navlist[j], containerLocator).$$(
        radioButtonLabelLocator
      );

      planLabelText = findContainerElement(navlist[j], containerLocator).$$(
        radioButtonLabelText
      );

      browser.pause(5000);
      navlist[j].scrollIntoView({ block: 'center', inline: 'nearest' });
      browser.pause(1000);
      clickElement(planLabels[k], scroll);
      let planText = planLabelText[k].getText();
      console.log(planText);

      browser.pause(1000);
      links = getCommerceLinks(planLocator, containerLocator, j);

      if (Object.keys(pResult).length === 0) expect(links.length).toBeGreaterThanOrEqual(1);

      // Set product default quantity
      let quantity = null;

      // Get correct quantity selector dropdown for clicking
      let qty1 = findContainerElement(
        browser.$$(planLocator).filter(x => x.isDisplayed())[j],
        containerLocator
      )
        .$$(qtyDropdownLocator)
        .filter(x => x.isDisplayed());

      if (qty1) {
        // select a non-default quantity for testing
        let nthQuantity = findContainerElement(
          browser.$$(planLocator).filter(x => x.isDisplayed())[j],
          containerLocator
        )
          .$$(nthQuantityLocator)
          .filter(x => x.isDisplayed());

        // select a non-default quantity and record if qty exists for product
        if (Object.keys(qty1).length > 0) {
          qty1[0].click();
          nthQuantity[0].click();

          console.log('quantity: ' + nthQuantity[0].getText());
          quantity = nthQuantity[0].getText();
        }
      }

      console.log('Total buttons under this container: ' + links.length);
      for (let s = 0; s < links.length; s++) {
        console.log('Button: ' + (s + 1));

        links = getCommerceLinks(planLocator, containerLocator, j);

        let titleFromUI = links[s].getText().trim();
        let urlFromUI = links[s].getAttribute('href');
        console.log('From UI Display: ' + links[s].getAttribute('href'));

        checkEmptyCodeParam(urlFromUI);

        let pricingText = buildPricingText(
          findPrices(planLocator, containerLocator, j)
        );

        links[s].scrollIntoView({ block: 'center', inline: 'nearest' });
        clickElement(links[s], scroll);

        clickContinueToCheckout();

        let pricingMatchResult = null;
        let handles = browser.getWindowHandles();

        // validate on checkout page
        if (quantity) {
          // validate on checkout page
          pricingMatchResult = validateCheckoutPage(
            pricingText,
            titleFromUI,
            pageUrl,
            quantity
          );
        } else {
          // validate on checkout page
          pricingMatchResult = validateCheckoutPage(
            pricingText,
            titleFromUI,
            pageUrl
          );
        }

        if (Object.keys(pResult).length === 0) expect(pricingMatchResult).toContain('true');

        console.log(`Handles.length = ${handles.length}`);

        if (handles.length == 1) {
          clickBack(planLocator);
        }

        testResult = saveResult(
          pResult,
          titleFromUI,
          urlFromUI,
          planText,
          pricingText,
          pricingMatchResult
        );

        navlist = browser.$$(planLocator).filter(x => x.isDisplayed());

        planLabelText = findContainerElement(navlist[j], containerLocator).$$(
          radioButtonLabelText
        );
        planLabels = findContainerElement(navlist[j], containerLocator).$$(
          radioButtonLabelLocator
        );

        if (k > 0) {
          planLabels[k].scrollIntoView({
            block: 'center',
            inline: 'nearest'
          });
          clickElement(planLabels[k], scroll);
          browser.pause(1000);
        }
      }
    }
  }
  return testResult;
}

/**
 * find and click all buy buttons and check price on the page without tab and dropdown
 */
export function handlePageNoTabNoDropdown(pResult) {
  let pageUrl = browser.getUrl();
  browser.pause(1500);
  waitForGeoIPXF();
  let links = browser.$$(buyButtonLocator).filter(x => x.isDisplayed());;
  let testResult = true;
  pResult = pResult ?? [];
  let maxPlans = pResult.count || 10;
  let missingPage = false;

  nonExistentPage.filter(x => x.loc.includes(browser.config.profile.locale)).forEach(key => {
    if (pageUrl.includes(key.page)) missingPage = true;
    }
  )

  if ((Object.keys(pResult).length === 0 || pResult.count) && !missingPage) {
    expect(links.length).toBeGreaterThanOrEqual(1);
  }

  console.log('Total buttons under this page: ' + links.length);
  for (let s = 0; s < links.length && maxPlans-- > 0; s++) {
    links = browser.$$(buyButtonLocator).filter(x => x.isDisplayed());;

    console.log(s);

    let titleFromUI = links[s].getText().trim();
    let urlFromUI = links[s].getAttribute('href');
    console.log('From UI Display: ' + links[s].getAttribute('href'));
    
    checkEmptyCodeParam(urlFromUI);

    let planText = 'default plan';

    waitForGeoIPXF();

    let pricing = findContainerElement(
      browser.$$(buyButtonLocator).filter(x => x.isDisplayed())[s],
      'position'
    )
      .$$('[data-path*="/offers/pricing"] .type-price')
      .filter(x => x.isDisplayed());

    if (pricing.length == 0) {
      pricing = findContainerElement(
        browser.$$(buyButtonLocator).filter(x => x.isDisplayed())[s],
        'position'
      )
        .$$('.pricing')
        .filter(x => x.isDisplayed());
    }

    if (pricing.length == 0) {
      pricing = findContainerElement(
        browser.$$(buyButtonLocator).filter(x => x.isDisplayed())[s],
        'flex'
      )
        .$$('.type-price')
        .filter(x => x.isDisplayed());
    }

    if (pricing.length == 0) {
      pricing = findContainerElement(
        browser.$$(buyButtonLocator).filter(x => x.isDisplayed())[s],
        'flex'
      )
        .$$('.pricing')
        .filter(x => x.isDisplayed());
    }

    let pricingText = buildPricingText(pricing);

    browser.pause(500);

    links[s].scrollIntoView({block: "center", inline: "nearest"});

    clickElement(links[s]);

    browser.pause(500);

    clickContinueToCheckout();

    let handles = browser.getWindowHandles();

    // validate on checkout page
    let pricingMatchResult = validateCheckoutPage(pricingText, titleFromUI, pageUrl);

    if (Object.keys(pResult).length === 0) expect(pricingMatchResult).toContain('true');

    testResult = saveResult(
      pResult,
      titleFromUI,
      urlFromUI,
      planText,
      pricingText,
      pricingMatchResult
    );

    if (handles.length == 1) {
      browser.back();
      browser.pause(500);
      closeGeoOverlay();
      waitForGeoIPXF();
    }
  }
  return testResult;
}

/**
 * find and click all buy buttons and check price on the page with tab and without dropdown
 */
export function handlePageWithTabNoDropdown(pResult) {
  let pageUrl = browser.getUrl();
  let tabs = browser.$$(tabLocator);
  let nTabCount = tabs.length;
  let testResult = true;
  pResult = pResult ?? [];

  for (let i = 0; i < nTabCount; i++) {
    console.log('Tab: ' + (i + 1));

    browser.navigateTo(pageUrl);

    closeGeoOverlay();

    tabs[i].scrollIntoView({block: "center", inline: "nearest"});

    tabs[i].click();

    let links = browser.$$(buyButtonLocator).filter(x => x.isDisplayed());

    if (Object.keys(pResult).length === 0) expect(links.length).toBeGreaterThanOrEqual(1);

    console.log('Total buttons under this page: ' + links.length);
    for (let s = 0; s < links.length; s++) {
      console.log('Button: ' + (s + 1));
      //console.log("From DOM: " + pResult[index].url);
      let titleFromUI = links[s].getText().trim();
      let urlFromUI = links[s].getAttribute('href');
      checkEmptyCodeParam(urlFromUI);

      console.log('From UI Display: ' + links[s].getAttribute('href'));
      let planText = 'default plan';

      console.log(browser.$$(buyButtonLocator).filter(x => x.isDisplayed()));
      let pricing = findContainerElement(
        browser.$$(buyButtonLocator).filter(x => x.isDisplayed())[s],
        'position'
      )
        .$$('.type-price')
        .filter(x => x.isDisplayed());

      if (pricing.length == 0) {
        pricing = findContainerElement(
          browser.$$(buyButtonLocator).filter(x => x.isDisplayed())[s],
          'position'
        )
          .$$('.pricing')
          .filter(x => x.isDisplayed());
      }

      if (pricing.length == 0) {
        pricing = findContainerElement(
          browser.$$(buyButtonLocator).filter(x => x.isDisplayed())[s],
          'flex'
        )
          .$$('.type-price')
          .filter(x => x.isDisplayed());
      }

      if (pricing.length == 0) {
        pricing = findContainerElement(
          browser.$$(buyButtonLocator).filter(x => x.isDisplayed())[s],
          'flex'
        )
          .$$('.pricing')
          .filter(x => x.isDisplayed());
      }

      let pricingText = buildPricingText(pricing);

      browser.pause(500);

      links[s].scrollIntoView({block: "center", inline: "nearest"});

      clickElement(links[s]);

      browser.pause(500);

      clickContinueToCheckout();

      let handles = browser.getWindowHandles();

      // validate on checkout page
      let pricingMatchResult = validateCheckoutPage(
        pricingText,
        titleFromUI,
        pageUrl
      );

      if (Object.keys(pResult).length === 0) expect(pricingMatchResult).toContain('true');

      if (handles.length == 1) {
        browser.back();
        browser.pause(500);
        closeGeoOverlay();
      }

      tabs[i].scrollIntoView({block: "center", inline: "nearest"});

      tabs[i].click();
    }
  }
  return testResult;
}

/**
 * Step Definition:
 * ```
 * /^I should see the correct country parameter in current url$/
 * ```
 */
 export function iShouldSeeTheCorrectCountryParameterInCurrentUrl(pageUrl) {
  let geoIp;
  let coParam;
  let locale;
  const GEOIP_OVERRIDES = { sea: 'sg', la: 'us', mena: 'dz', uk: 'gb', tn: 'dz' };
  const CO_OVERRIDES = { uk: 'gb', "": 'us', tn: 'dz', la: 'us', mena: 'dz' };
  const overrideGeoIP = () => { geoIp = GEOIP_OVERRIDES[geoIp] || geoIp };
  const overrideCountryCode = () => { coParam = CO_OVERRIDES[locale] || coParam };
  
  geoIp = browser.config.profile.geolocation || 'us';
  locale = acomMap[browser.config.profile.locale] || browser.config.profile.locale;

  let jpHowTo = pageUrl.match(/(acrobat\/how-to\/)|(\/acrobat\/reader\/)/) && locale.includes('jp');
  
  overrideGeoIP();

  coParam = geoIp.toUpperCase();
  
  /*
  Cases without geo-ip pricing:
   (1) if the visitor in EU is visiting an EU page
   (2) The page is not a reader page or sign/free-trial.html
   (3) The page is a Sign page, an online.html or complete-pdf-solution
  */
  if (
    (getEURegions().includes(geoIp) &&
      getEURegions().includes(locale) &&
      !pageUrl.match(/((\/sign\/free-trial.html)|(\/reader))/)) ||
    pageUrl.match(/(?!(\/sign\/free-trial.html))(\/sign)/) ||
    pageUrl.match(
      /(acrobat\/complete-pdf-solution.html)|(acrobat\/online.html)/
    )
  ) {
    coParam = browser.config.locales
      .find(x => x.locale === browser.config.profile.locale)
      .akamai;
    overrideCountryCode();
    coParam = coParam.toUpperCase();
  }

  // DOTCOM-61816
  if (jpHowTo) {
    coParam = ['JP', geoIp.toUpperCase()];
  }
  let countryCode = new URL(browser.getUrl()).searchParams.get('co');;
  let coResult = coParam.includes(countryCode);

  console.log(`Expected co=${ coParam }`);
  expect(coResult).toBe(true);
}

/**
 * Step Definition:
 * ```
 * /^I should see the correct language parameter in current url$/
 * ```
 */
 export function iShouldSeeTheCorrectLangParameterInCurrentUrl(pageUrl) {
  let lang;
  let url = new URL(browser.getUrl()).searchParams;

  if (browser.config.profile.tags.includes('preview')) {
    lang = browser.config.profile.locale.split('/')[1];
  } else {
    lang = browser.config.locales.find(x => x.locale === browser.config.profile.locale).author.split('/')[1];
  }
  if (browser.config.profile.locale.includes('no') && browser.config.profile.geolocation !== 'no') lang = 'nb';
  if (
    (browser.config.profile.locale.includes('tw') &&
      browser.config.profile.geolocation === 'tw') ||
    (browser.config.profile.geolocation === 'us' &&
      UCv2ProductOffers.includes(url.get('items[0][id]')))
  )
    lang = lang.toLowerCase();
  
  console.log(`Expected lang=${ lang }`);
  expect(browser).toHaveUrl(`lang=${ lang }`, {
    containing: true,
    wait: 10000,
    interval: 1000
  });
}


/**
 * Step Definition:
 * ```
 * /^Find all pricing elements next to the locator within the container$/
 * ```
 */
 export function findPrices(planLocator, containerLocator, index) {
  waitForGeoIPXF();

   let pricing = findContainerElement(
     browser.$$(planLocator).filter(x => x.isDisplayed())[index],
     containerLocator
   )
     .$$(`//div[contains(@data-path,'/offers/pricing/')]//*[contains(@class, 'type-price')] | //div[contains(@data-path,'/commerce/') and contains(@data-path,'/pricing/')]//*[contains(@class, 'type-price')]`)
     .filter(x => x.isDisplayed());

   let pricingReg = findContainerElement(
     browser.$$(planLocator).filter(x => x.isDisplayed())[index],
     containerLocator
   )
     .$$('.pricing')
     .filter(x => x.isDisplayed());

   let pricingNoGeoIPDisclaimer = findContainerElement(
     browser.$$(planLocator).filter(x => x.isDisplayed())[index],
     containerLocator
   )
     .$$(`//div[contains(@data-path,'/offers/pricing/')]//*[contains(@class, 'type-light')] | //div[contains(@data-path,'/commerce/') and contains(@data-path,'/pricing/')]//*[contains(@class, 'type-light')]`)
     .filter(x => x.isDisplayed());

   let pricingXF = findContainerElement(
     browser.$$(planLocator).filter(x => x.isDisplayed())[index],
     containerLocator
   )
     .$$(`//div[contains(@data-path,'/offers/pricing/')] | //div[contains(@data-path,'/commerce/') and contains(@data-path,'/pricing/')]`)
     .filter(x => x.isDisplayed());

   pricing.push(...pricingReg, ...pricingNoGeoIPDisclaimer, ...pricingXF);

   return pricing;
 }

export function saveResult(
  pResult,
  titleFromUI,
  urlFromUI,
  planText,
  pricingText,
  pricingMatchResult
) {
  let testResult = true;
  pricingMatchResult.forEach(result => {
    if (result.includes('(x)')) testResult = false;
  });

  updatePResult(
    pResult,
    titleFromUI,
    urlFromUI,
    planText,
    pricingText,
    pricingMatchResult
  );

  return testResult;
}

export function updatePResult(
  pResult,
  titleFromUI,
  urlFromUI,
  planText,
  pricingText,
  pricingMatchResult
) {
  let url = new URL(urlFromUI);
  let urlParams = {};

  for (const [key, value] of url.searchParams) {
    urlParams[key.replace(/\[|\]/g, '_')] = value;
  }

  for (let l = 0; l < pResult.length; l++) {
    if (
      pResult[l]['url'] === urlFromUI ||
      (pResult[l]['01_title'] === titleFromUI &&
        pResult[l]['items_0__id_'] === urlParams['items_0__id_'])
    ) {
      pResult[l]['02_plan'] = planText;
      pResult[l]['03_price'] = pricingText;
      pResult[l]['04_button_click'] = 'true';
      pResult[l]['05_pricing_match'] = pricingMatchResult[0];
      if (pricingMatchResult.length > 1) {
        pResult[l]['06_quantity_match'] = pricingMatchResult[1];
      }
    }
  }
}

function xpath(root, query) {
  return root.evaluate(
    query,
    root,
    null,
    wgxpath.XPathResultType.ANY_TYPE,
    null
  );
}

export function collectCheckoutStatus(data, result, pageUrl) {
  const dom = new JSDOM();
  const domParser = new dom.window.DOMParser();
  const doc = domParser.parseFromString(data, 'text/html');

  const aTags = xpath(doc, '//a');
  let pResult = [];
  let aTag = null;

  while ((aTag = aTags.iterateNext())) {
    let aResult = {};

    if (
      // ucv1 and ucv2
      aTag.hasAttribute('href') &&
      aTag.getAttribute('href').includes('/checkout/') &&
      aTag.getAttribute('href').includes('https')
    ) {
      aResult['title'] = aTag.innerHTML
        .replace(/(<([^>]+)>)/gi, '')
        .replace(/&nbsp;/g, '')
        .trim();
      aResult['api'] = '';
      aResult['url'] = aTag.getAttribute('href');

      if (aTag.hasAttribute('data-offer-ucv1')) {
        aResult['api'] = aTag.getAttribute('data-offer-ucv1');
      }

      if (aTag.hasAttribute('data-offer-ucv2')) {
        aResult['api'] = aTag.getAttribute('data-offer-ucv2');
      }

      if (aTag.hasAttribute('data-checkout-type')) {
        aResult['api'] = aTag.getAttribute('data-checkout-type');
      }

      pResult.push(aResult);
    } else if (
      // ucv3
      aTag.hasAttribute('href') &&
      aTag.getAttribute('href').includes('adobe.com/store/') &&
      aTag.getAttribute('href').includes('https')
    ) {
      aResult['title'] = aTag.innerHTML
        .replace(/(<([^>]+)>)/gi, '')
        .replace(/&nbsp;/g, '')
        .trim();
      aResult['api'] = '';
      aResult['url'] = aTag.getAttribute('href').replace('&code=', '') ;

      if (aTag.hasAttribute('data-offer-ucv3')) {
        aResult['api'] = aTag.getAttribute('data-offer-ucv3');
      }

      if (aTag.hasAttribute('data-checkout-type')) {
        aResult['api'] = aTag.getAttribute('data-checkout-type');
      }

      pResult.push(aResult);
    }
  }

  if (pResult.length > 0) {
    let fResult = {};
    fResult['page'] = pageUrl;
    fResult['buttons'] = pResult;
    result['site'].push(fResult);
  }
}

export function scanPages(site, sitemap, number, env, locale, config, akamaiLocale) {
  const dom = new JSDOM();
  const domParser = new dom.window.DOMParser();
  const doc = domParser.parseFromString(sitemap.data, 'text/html');

  const locTags = xpath(doc, '//loc');
  let result = {};
  result['site'] = [];

  let locTag = null;

  while ((locTag = locTags.iterateNext())) {
    let pageUrl = locTag.innerHTML.trim();

    if (number == 1 && browser.config.profile.aem == 'preview') {
      pageUrl = pageUrl + '?' + browser.config.profile.previewQuery + `&mboxDisable=1&akamaiLocale=${akamaiLocale}`;

      console.log(pageUrl);
    }
    if (number == 2 && env == 'acom-stage') {
      pageUrl = pageUrl.replace(
        'https://www.adobe.com',
        'https://www.stage.adobe.com'
      );
    }

    console.log(pageUrl);

    if (number == 1 || (number == 2 && locale == '' && pageUrl.includes('com/acrobat/')) || (number == 2 && locale != '' && pageUrl.includes(`com/${locale}/acrobat/`))) {
      let res;

      if(browser.config.profile.aem != 'preview') {
        pageUrl += `?mboxDisable=1&akamaiLocale=${akamaiLocale}`;
      }

      try {
        res = requestGet(pageUrl, config);
      } catch (error) {
        //console.log(error.msg);
        continue;
      }

      //console.log(res.data);
      collectCheckoutStatus(res.data, result, pageUrl);

      //console.log(result);
      fs.writeFileSync(
        `pricingpagecheck${number}_${env}_${site}.json`,
        JSON.stringify(result, null, 2)
      );
    }
  }
}

function getCommerceLinks(planLocator, containerLocator, index) {
  waitForGeoIPXF();

  let links = findContainerElement(
    browser.$$(planLocator).filter(x => x.isDisplayed())[index],
    containerLocator
  )
    .$$(buyButtonLocator)
    .filter(x => x.isDisplayed());

  return links;
}

function waitForGeoIPXF() {
  if (browser.config.profile.tags.includes('preview')) {
    browser.pause(1500);
    browser.$(loading).waitForExist({ timeout: 30000, reverse: true });
    browser.pause(1500);
  } else {
    browser.pause(1000);
  }
}

function checkEmptyCodeParam(urlFromUI) {
  if (
    !isUCv3 &&
    !browser.config.profile.locale === '' &&
    !(
      browser.config.profile.locale === '' &&
      browser.getUrl().includes('/sign/')
    ) &&
    !(
      browser.config.profile.locale.includes('jp') &&
      browser.getUrl().match(/(\/acrobat\/how-to\/)/)
    )
  ) {
    let buttonUrl = new URL(urlFromUI).searchParams;
    expect(buttonUrl.get('code')).toBe('');
  }
}

function clickElement(element, scroll) {

  let retry = 5;
  while (retry-- > 0) {
    try {
      if (scroll) browser.execute('window.scrollTo(0, 0);');
      element.click();
      console.log(retry);
      break;
    } catch (err) {
      if (browser.$(surveyPopup).isDisplayed()) {
        browser.switchToFrame(browser.$(surveyPopup));
        browser.$(choiceNo).click();
        browser.switchToParentFrame();
        browser.$(closeSurvey).waitForDisplayed({ timeout: 2000 });
        browser.$(closeSurvey).click();
      }
      closeGeoOverlay();
    }
  }
}

function clickBack(waitElement) {
  let retry = 5;

  browser.back();
  console.log(`Click back.. ${(new Date()).toLocaleString()}`);

  while (retry-- > 0) {
    try {
      $(waitElement).waitForDisplayed({ interval: 2000, timeout: 10000 });
      break;
    } catch (err) {
      console.log(
        `"${waitElement}" is not displayed`
      );
      console.log(`Still waiting.. ${(new Date()).toLocaleString()}`);
      closeGeoOverlay();
    }
  }
  closeGeoOverlay();
}