/* eslint-disable no-restricted-syntax */
/* eslint-disable no-await-in-loop */
const { expect, test } = require('@playwright/test');
const parse = require('../features/parse.js');
const consent = require('../features/consent.spec.js');
const selectors = require('../selectors/consent.selectors.js');

const { name, features } = parse(consent);
test.describe(`${name}`, () => {
  features.forEach((props) => {
    test(props.title, async ({ page, browser }) => {
      const OneTrustTitle = page.locator(selectors['@OneTrustTitle']);
      const OneTrustMessage = page.locator(selectors['@OneTrustMessage']);
      const OneTrustEnableButton = page.locator(selectors['@OneTrustEnableButton']);
      const OneTrustCookiesButton = page.locator(selectors['@OneTrustCookiesButton']);
      const OneTrustDontEnableButton = page.locator(selectors['@OneTrustDontEnableButton']);

      const OneTrustContainer = page.locator(selectors['@OneTrustContainer']);
      const OneTrustConsentFrame = page.locator(selectors['@OneTrustConsentFrame']);
      const OneTrustConfirmChoices = page.locator(selectors['@OneTrustConfirmChoices']);
      const OneTrustModalDontEnable = page.locator(selectors['@OneTrustDontEnable']);
      const OneTrustModalEnableAll = page.locator(selectors['@OneTrustEnableAll']);
      const OneTrustModalClose = page.locator(selectors['@OneTrustModalClose']);

      // Load OneTrust consent component page:
      const url = props.title.match(/stage|prod/) ? `${props.url}.html` : props.url;
      await page.goto(url);

      // Wait for the OneTrust consent bar to be displayed:
      await page.waitForSelector(selectors['@OneTrustContainer']);
      await expect(OneTrustContainer).toBeVisible();

      // Check the contents of the consent bar:
      await expect(OneTrustTitle).toHaveText('Make It Your Own');
      await expect(OneTrustMessage).toContainText('Adobe and its vendors use cookies and similar technologies to improve your experience and measure your interactions with our websites, products and services.');
      await expect(OneTrustEnableButton).toHaveText('Enable all');
      await expect(OneTrustDontEnableButton).toHaveText('Don\'t Enable');
      await expect(OneTrustCookiesButton).toHaveText('Cookie Settings');
    });
  });
});
