/* eslint-disable no-plusplus */
import { expect, test } from '@playwright/test';
import { features } from '../../features/express/simplified-pricing-cards.spec.js';
import SimplifiedPricingCards from '../../selectors/express/simplified-pricing-cards.page.js';

let simplifiedPricingCards;

test.describe('simplified-pricing-cards test suite', () => {
  test.beforeEach(async ({ page }) => {
    simplifiedPricingCards = new SimplifiedPricingCards(page);
  });

  features[0].path.forEach((path) => {
    test(`${features[0].name}, path: ${path},`, async ({ baseURL, page }) => {
      const testPage = `${baseURL}${path}`;
      await simplifiedPricingCards.gotoURL(testPage);
      await simplifiedPricingCards.scrollToPricingCards();

      await test.step('validate elements in block', async () => {
        await expect(simplifiedPricingCards.simplifiedPricingCards).toBeVisible();
        const noOfCards = await simplifiedPricingCards.card.count();
        expect(noOfCards).toEqual(4);
        for (let i = 0; i < noOfCards; i++) {
          await expect(simplifiedPricingCards.card.nth(i)).toBeVisible();
          const headerText = await simplifiedPricingCards.cardHeader.nth(i).innerText();
          expect(headerText.length).toBeTruthy();
          await expect(simplifiedPricingCards.heading.nth(i)).toBeVisible();
          const heading = await simplifiedPricingCards.heading.nth(i).innerText();
          expect(heading.length).toBeTruthy();

          if (i !== 0) {
            await expect(simplifiedPricingCards.planExplanation.nth(i)).toBeVisible();
            const planExplanation = await simplifiedPricingCards.planExplanation.nth(i).innerText();
            expect(planExplanation.length).toBeTruthy();
          }

          await expect(simplifiedPricingCards.pricingArea.nth(i)).toBeVisible();
          if (i !== 3) {
            await expect(simplifiedPricingCards.pricingRow.nth(i)).toBeVisible();
            await expect(simplifiedPricingCards.pricingPrice.nth(i)).toBeVisible();
            await expect(simplifiedPricingCards.pricingRowSuf.nth(i)).toBeVisible();
          }
        }
      });

      await test.step('test button click', async () => {
        await simplifiedPricingCards.gotoURL(testPage);
        await simplifiedPricingCards.clickFreeButton();
        expect(page.url()).not.toBe(testPage);

        await simplifiedPricingCards.gotoURL(testPage);
        await simplifiedPricingCards.clickPremiumButton();
        expect(page.url()).not.toBe(testPage);

        await simplifiedPricingCards.gotoURL(testPage);
        await simplifiedPricingCards.clickTeamsButton();
        expect(page.url()).not.toBe(testPage);

        await simplifiedPricingCards.gotoURL(testPage);
        await simplifiedPricingCards.clickEnterpriseButton();
        expect(page.url()).not.toBe(testPage);
      });
    });
  });
});
