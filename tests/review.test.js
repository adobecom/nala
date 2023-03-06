/* eslint-disable no-restricted-syntax */
/* eslint-disable no-await-in-loop */
const { expect, test } = require('@playwright/test');
const converter = require('../features/review.spec.js');
const parse = require('../features/parse.js');
const selectors = require('../selectors/review.selectors.js');

const { name, features } = parse(converter);
test.describe(`${name}`, () => {
  features.forEach((props) => {
    test(props.title, async ({ page, browser }) => {
      const reviewBlock = page.locator(selectors['@review-block']);
      const reviewTitle = page.locator(selectors['@review-title']);
      const reviewStats = page.locator(selectors['@review-stats']);
      const ratingFields = page.locator(selectors['@rating-fields']);
      const goodRating = page.getByRole('radio', { name: '3 star' });
      const outstandingRating = page.getByRole('radio', { name: '5 star' });
      const textField = page.locator(selectors['@rating-comments']);
      const sendButton = page.getByRole('button', { name: 'Send' });
      const failedBlock = page.locator(selectors['@review-block-failed']);

      await page.goto(props.url);

      await expect(reviewBlock).toBeVisible();
      if (await failedBlock.isVisible()) {
        console.log(`${browser.browserType().name()}: ${await failedBlock.getAttribute('data-reason')} on ${props.url}`);
        await expect.soft(failedBlock).not.toBeVisible();
      }
      await expect(reviewTitle).toBeVisible();
      await expect(reviewStats).toBeVisible();
      await expect(ratingFields).toBeVisible();

      await outstandingRating.hover();
      await goodRating.check();
      await textField.fill('Test comment');
      await outstandingRating.check();
      await sendButton.click();
      await expect(page.getByText('Thank you for your feedback!')).toBeVisible();
    });
  });
});
