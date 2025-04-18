/* eslint-disable no-plusplus */
import { expect, test } from '@playwright/test';
import { features } from '../../features/express/gen-ai-cards.spec.js';
import GenAICards from '../../selectors/express/gen-ai-cards.page.js';

let genAICards;

test.describe('gen-ai-cards test suite', () => {
  test.beforeEach(async ({ page }) => {
    genAICards = new GenAICards(page);
  });

  features[0].path.forEach((path) => {
    test(`${features[0].name}, path: ${path}, test gen-ai cards with button`, async ({ baseURL, page }) => {
      const testPage = `${baseURL}${path}`;
      await genAICards.gotoURL(testPage);
      await genAICards.scrollToGenAICards();

      await test.step('validate elements in block', async () => {
        await expect(genAICards.genAICards).toBeVisible();
        await expect(genAICards.headingSection).toBeVisible();
        const heading = await genAICards.cardsHeading.innerText();
        expect(heading.length).toBeTruthy();
        await expect(genAICards.headingSectionText).toBeVisible();
        const headingText = await genAICards.headingSectionText.innerText();
        expect(headingText.length).toBeTruthy();
        const noOfCards = await genAICards.card.count();
        expect(noOfCards).toBeGreaterThan(0);
        if (noOfCards) {
          await expect(genAICards.card.first()).toBeVisible();
          await expect(genAICards.cardTitle.first()).toBeVisible();
          await expect(genAICards.cardText.first()).toBeVisible();
          await expect(genAICards.cardImage.first()).toBeVisible();
          await expect(genAICards.cardButton.first()).toBeVisible();
          await expect(genAICards.cardButton.first()).toBeEnabled();
          await expect(genAICards.carouselFaderLeft).toHaveClass(/arrow-hidden/);
          await expect(genAICards.carouselFaderRight).toHaveClass(/arrow-hidden/);
          await expect(genAICards.leftCarouselArrow).not.toBeVisible();
          await expect(genAICards.rightCarouselArrow).not.toBeVisible();
        }
      });

      await test.step('test button click', async () => {
        await genAICards.clickButtonOfFirstCard();
        expect(page.url()).not.toBe(testPage);
      });
    });
  });

  features[1].path.forEach((path) => {
    test(`${features[1].name}, path: ${path}, test gen-ai-card with prompt text`, async ({ baseURL, page }) => {
      const testPage = `${baseURL}${path}`;
      await genAICards.gotoURL(testPage);
      await genAICards.scrollToGenAICards();

      await test.step('validate elements in block ', async () => {
        await expect(genAICards.genAICards).toBeVisible();
        await expect(genAICards.headingSection).toBeVisible();
        const heading = await genAICards.cardsHeading.innerText();
        expect(heading.length).toBeTruthy();
        const noOfActionCards = await genAICards.actionCard.count();
        expect(noOfActionCards).toBeGreaterThan(0);
        await expect(genAICards.card.first()).toBeVisible();
        await expect(genAICards.cardTitle.first()).toBeVisible();
        await expect(genAICards.cardText.first()).toBeVisible();
        const text = await genAICards.cardText.first().innerText();
        expect(text).toBeTruthy();
        await expect(genAICards.cardImage.first()).toBeVisible();
        await expect(genAICards.actionCardInputForm.first()).toBeVisible();
        await expect(genAICards.actionCardInput.first()).toBeVisible();
        await expect(genAICards.actionCardInput.first()).toBeEnabled();
        await expect(genAICards.actionCardSubmitButton.first()).toBeVisible();
        await expect(genAICards.actionCardSubmitButton.first()).toBeDisabled();
        await expect(genAICards.carouselFaderLeft).toHaveClass(/arrow-hidden/);
        await expect(genAICards.carouselFaderRight).not.toHaveClass(/arrow-hidden/);
        await expect(genAICards.rightCarouselArrow).toBeVisible();
        await expect(genAICards.rightCarouselArrow).toBeEnabled();
      });

      await test.step('test button click', async () => {
        await genAICards.scrollToGenAICards();
        await genAICards.actionCardInput.first().fill('waterfall');
        await expect(genAICards.actionCardSubmitButton.first()).toBeEnabled();
        await genAICards.clickSubmitButtonOfFirstCard();
        expect(page.url()).not.toBe(testPage);
      });
    });
  });
});
