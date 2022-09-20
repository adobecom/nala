const { Given } = require('@cucumber/cucumber');
const { Then } = require('@cucumber/cucumber');
const { When } = require('@cucumber/cucumber');

import { MerchScaleBasePage } from '../pages/merch_scale_page';
import { AemAuthorEditorPage } from '../pages/aem_author_editor_page';
import { AdobeSignInPage } from '../pages/adobe_signin_page';
import { Page } from '../pages/page';
import { GnavPage } from '../pages/gnav_page';
import { AuthorSignInPage } from '../pages/author_signin_page';

When(/^I open Offer Selector tool$/, iOpenOfferSelectorTool);

When(/^I search for "([^\"]*)" in Offer Selector Tool$/, iSearchForProductInOfferSelectorTool);

Then(/^I validate that search returns "([^\"]*)" in Offer Selector Tool$/, iValidateProductInOfferSelectorTool);

Then(/^I select the product "([^\"]*)" in Offer Selector Tool$/, iSelectProductInOfferSelectorTool);

When(/^I click Next in Offer Selector Tool$/, iClickNextButtonInOfferSelectorTool);

Then(/^I select the offer id "([^\"]*)" in Offer Selector Tool$/, iSelectOfferIDInOfferSelectorTool);

Then(/^I use "([^\"]*)" in Offer Selector Tool$/, iUsePriceInOfferSelectorTool);

Then(/^I configure component with title "([^\"]*)"$/, iConfigureComponentWithTitle);

When(/^I click Use button in Offer Selector tool$/, iClickUseButtonInOfferSelectorTool);

Then(/^I select "([^\"]*)" type "([^\"]*)" in Offer Selector Tool$/, iSelectPlanOfferTypeInOfferSelectorTool);

Then(/^I select (|customer|market) segment "([^\"]*)" in Offer Selector Tool$/, iSelectSegmentInOfferSelectorTool);

Then(/^I choose offer with product id "([^\"]*)" in cta$/, iChooseOfferInCTA);

Then(/^I confirm (|text|cta) with value "([^\"]*)" rendered$/, iValidateCheckoutAttributes);

Then(/^I double click on price in edit mode$/, iDoubleClickOnElement);

Then(/^I hover over the price in edit mode and see the tooltip$/, checkPriceTooltip);

Then(/^I should see price highlighted$/, checkPriceHighlighted);

Then(/^I close promo modal if have$/, iClosePromoModalIfHave);

Then(/^I save and close text edit$/, iSaveCloseEdit)

/**
 * Step Definition:
 * ```
 * /^I open Offer Selector tool$/
 * ```
 */
 function iOpenOfferSelectorTool() {
  this.context(AemAuthorEditorPage);
  this.obj = new MerchScaleBasePage();
  browser.pause(1000);
  expect(this.obj.offerSelectorToolButton).toBeDisplayed();
  this.obj.click('offerSelectorToolButton');
  browser.pause(1000);
}

/**
 * Step Definition:
 * ```
 * /^I search for "([^\"]*)" in Offer Selector Tool$/
 * ```
 * @param {string} product - product title
 */
 function iSearchForProductInOfferSelectorTool(product) {
  this.page = new MerchScaleBasePage();
  this.page.searchProductField.setValue(product);
}

/**
 * Step Definition:
 * ```
 * /^I validate that search returns "([^\"]*)" in Offer Selector Tool$/
 * ```
 * @param {string} product - product title
 */
 function iValidateProductInOfferSelectorTool(product) {
  this.page = new MerchScaleBasePage();
  let skus = this.page.productList;
  for(let sku of skus) {
    if (sku.getText()=== product) {
    console.log("Product found: " + sku.getText())
    expect(sku.getText()).toContain(product);
    break;
  }
}
}

/**
 * Step Definition:
 * ```
 * /^I select the product "([^\"]*)" in Offer Selector Tool$/
 * ```
 * @param {string} product - product title
 */
 function iSelectProductInOfferSelectorTool(product) {
  this.page = new MerchScaleBasePage();
  let skus = this.page.productList;
  for(let sku of skus) {
    if (sku.getText()=== product) {
    console.log("Product found: " + sku.getText())
    sku.click();
    browser.pause(2000);
    break;
  }
}
}

/**
 * Step Definition:
 * ```
 * /^I click Next in Offer Selector Tool$/
 * ```
 */
 function iClickNextButtonInOfferSelectorTool() {
  this.page = new MerchScaleBasePage();
  browser.pause(6000);
  this.page.nextButtonLabel.moveTo();
  this.page.nextButtonLabel.waitForDisplayed();
  this.page.retryAction(10, 1000, () => {
    browser.execute('arguments[0].click();', this.page.nextButtonLabel);
  });
  browser.pause(3000);
}

/**
 * Step Definition:
 * ```
 * /^I select the offer id "([^\"]*)" in Offer Selector Tool$/
 * ```
 * @param {string} offerId - product offer id
 */
 function iSelectOfferIDInOfferSelectorTool(offerId) {
  this.page = new MerchScaleBasePage();
  browser.execute('arguments[0].click();', this.page.getOfferIdItem(offerId));
  browser.pause(2000);
}

/**
 * Step Definition:
 * ```
 * /^I use "([^\"]*)" in Offer Selector Tool$/
 * ```
 * @param {string} pricePlanType - product offer price Plan type
 */
 function iUsePriceInOfferSelectorTool(pricePlanType) {
  this.page = new MerchScaleBasePage();
  let useLabelList = this.page.useLabelList;
    if (pricePlanType === "Price") {
    useLabelList[0].waitForDisplayed();
    this.page.retryAction(10, 1000, () => {
    browser.execute('arguments[0].click();', useLabelList[0]);
    });
    browser.pause(2000);
  }
    else if (pricePlanType === "Optical price") {
    useLabelList[1].waitForDisplayed();
    this.page.retryAction(10, 1000, () => {
    browser.execute('arguments[0].click();', useLabelList[1]);
    });
    browser.pause(2000);
  }
  else if (pricePlanType === "Price with tax") {
    useLabelList[1].waitForDisplayed();
    this.page.retryAction(10, 1000, () => {
    browser.execute('arguments[0].click();', useLabelList[2]);
    });
    browser.pause(2000);
  }
  else if (pricePlanType === "Strikethrough price") {
    useLabelList[1].waitForDisplayed();
    this.page.retryAction(10, 1000, () => {
    browser.execute('arguments[0].click();', useLabelList[3]);
    });
    browser.pause(2000);
  }
  else if (pricePlanType === "Strikethrough price with tax") {
    useLabelList[1].waitForDisplayed();
    this.page.retryAction(10, 1000, () => {
    browser.execute('arguments[0].click();', useLabelList[4]);
    });
    browser.pause(2000);
  }
  
}

/**
 * Step Definition:
 * ```
 * /^I save and close text edit$/
 * ```
 */
 function iSaveCloseEdit() {
  this.page = new MerchScaleBasePage();
  browser.execute('arguments[0].click();', this.page.textOverlayWrapper);
 }

/**
 * Step Definition:
 * ```
 * /^I configure component with title "([^\"]*)"$/
 * ```
 * @param {string} title - component title
 */
 function iConfigureComponentWithTitle(title) {
  this.page = new MerchScaleBasePage();
  this.page.getEditableComponent(title).waitForDisplayed();
  this.page.retryAction(10, 1000, () => {
    this.page.getEditableComponent(title).click();
    this.page.editableConfigure.waitForDisplayed();
    this.page.editableConfigure.click();
  });
  browser.pause(3000);
}

/**
 * Step Definition:
 * ```
 * /^I click Use button in Offer Selector Tool$/
 * ```
 */
 function iClickUseButtonInOfferSelectorTool() {
  this.page = new MerchScaleBasePage();
  this.page.useButtonLabel.moveTo();
  this.page.useButtonLabel.waitForDisplayed();
  this.page.retryAction(10, 1000, () => {
    browser.execute('arguments[0].click();', this.page.useButtonLabel);
  });
  browser.pause(3000);
}

/**
 * Step Definition:
 * ```
 * /^I select "([^\"]*)" type "([^\"]*)" in Offer Selector Tool$/
 * ```
 * @param {string} type Plan or Offer type
 * @param {string} value Plan or Offer value
 */
 function iSelectPlanOfferTypeInOfferSelectorTool(type, value) {
  this.page = new MerchScaleBasePage();
  if (type === "plan") {
  this.page.offerTypeDropdownTrigger[1].click();
  browser.pause(3000);
  this.page.getOfferTypeDropdownLabel(value).waitForDisplayed();
  console.log("Type found: " + this.page.getOfferTypeDropdownLabel(value).getText());
  this.page.retryAction(10, 1000, () => {
    this.page.getOfferTypeDropdownLabel(value).click();
  });
  }
  else if (type === "offer") {
  this.page.offerTypeDropdownTrigger[2].click();
  browser.pause(3000);
  this.page.getOfferTypeDropdownLabel(value).waitForDisplayed();
  console.log("Type found: " + this.page.getOfferTypeDropdownLabel(value).getText());
  this.page.retryAction(10, 1000, () => {
    this.page.getOfferTypeDropdownLabel(value).click();
  });
  }
}

/**
 * Step Definition:
 * ```
 * /^I select (|customer|market) segment "([^\"]*)" in Offer Selector Tool$/
 * ```
 * @param {string} segment - Customer/Market segment value
 * @param {string} title - Customer/Market segment
 */
 function iSelectSegmentInOfferSelectorTool(title, segment) {
  this.page = new MerchScaleBasePage();
  browser.execute('arguments[0].click();', this.page.getSegment(segment));
  browser.pause(2000);
}

/**
 * Step Definition:
 * ```
 * /^I choose offer with product id "([^\"]*)" in cta$/
 * ```
 * @param {string} offerId Product offer id
 */
 function iChooseOfferInCTA(offerId) {
  this.page = new MerchScaleBasePage();
  this.page.ctaOfferDropdownTrigger.click();
  browser.pause(3000);
  this.page.getCTAOfferDropdownLabel(offerId).waitForDisplayed();
  console.log("Offer found: " + this.page.getCTAOfferDropdownLabel(offerId).getText());
  this.page.retryAction(10, 1000, () => {
    this.page.getCTAOfferDropdownLabel(offerId).click();
  });
}

/**
 * Step Definition:
 * ```
 * /^I confirm (|text|cta) with value "([^\"]*)" rendered$/
 * ```
 * @param {string} attrVal Value of the attribuite
 * @param {string} elemType Element or component types
 */
 function iValidateCheckoutAttributes(elemType, attrVal) {
  this.page = new MerchScaleBasePage();
  if (elemType === "text") {
    let price = this.page.textPrice.getText();
    console.log("Price: " + price);
    expect(price).toContain(attrVal);
  }
  else if (elemType === "cta") {
    let hrefUrl = this.page.cta.getAttribute("href");
    console.log("Checkout url: " + hrefUrl);
    expect(hrefUrl).toContain(attrVal);    
  }
  browser.pause(2000);
}

/**
 * Step Definition:
 * ```
 * /^I double click on price in edit mode$/
 * ```
 */
 function iDoubleClickOnElement(){
  this.context(AemAuthorEditorPage);
  this.obj = new MerchScaleBasePage();
  browser.switchToFrame($('#ContentFrame'));
  expect(this.obj.textPrice).toBeDisplayed();
  this.obj.textPrice.doubleClick();
  browser.switchToParentFrame();
  this.context(MerchScaleBasePage);
  browser.pause(1000);
}

/**
 * Step Definition:
 * ```
 * /^I hover over the price in edit mode and see the tooltip$/
 * ```
 */
 function checkPriceTooltip(){
  this.context(AemAuthorEditorPage);
  this.obj = new MerchScaleBasePage();
  browser.switchToFrame($('#ContentFrame'));
  expect(this.obj.textPrice).toBeDisplayed();
  this.obj.textPrice.moveTo();
  expect(this.obj.priceTooltip).toBeDisplayed();
  browser.switchToParentFrame();
  this.context(MerchScaleBasePage);
  browser.pause(1000);
}

/**
 * Step Definition:
 * ```
 * /^I should see price highlighted$/
 * ```
 */
 function checkPriceHighlighted(){
  this.context(AemAuthorEditorPage);
  this.obj = new MerchScaleBasePage();
  browser.switchToFrame($('#ContentFrame'));
  expect(this.obj.textPrice).toBeDisplayed();
  const rgbColor = browser.execute(
    "return window.getComputedStyle(arguments[0]).getPropertyValue('background-color');",
    this.obj.textPrice
);
  expect(rgbColor.toString().includes("rgb(255, 255, 0)"));
  browser.switchToParentFrame();
  this.context(MerchScaleBasePage);
  browser.pause(1000);
}

/**
 * Step Definition:
 * ```
 * /^I close promo modal if have$/
 * ```
 */
 function iClosePromoModalIfHave() {
  this.obj = new MerchScaleBasePage();
  if (this.obj.dexterClosePromoModal.isDisplayed()) {
    this.obj.dexterClosePromoModal.click();
  }
}

