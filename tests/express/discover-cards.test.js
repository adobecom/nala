/* eslint-disable no-plusplus */
import { expect, test } from '@playwright/test';
import { features } from '../../features/express/discover-cards.spec.js';
import DiscoverCard from '../../selectors/express/discover-cards.page.js';

let discoverCard;

test.describe('Discover cards test suite', () => {
  test.beforeEach(async ({ page }) => {
    discoverCard = new DiscoverCard(page);
  });

  features[0].path.forEach((path) => {
    test(`${features[0].name},${features[0].tags} path: ${path}`, async ({ baseURL, page }) => {
      const testPage = `${baseURL}${path}`;
      await discoverCard.gotoURL(testPage);

      await test.step('Validate Discover Cards block', async () => {
        await discoverCard.scrollToDiscoverCards();
        await expect(discoverCard.discoverCardsBlock).toBeVisible();

        const noOfCards = await discoverCard.discoverCard.count();
        expect(noOfCards).toBeGreaterThan(0);

        await expect(discoverCard.discoverCardTitle.nth(0)).toBeVisible();
        const title = await discoverCard.discoverCardTitle.nth(0).innerText();
        expect(title.length).toBeTruthy();
        await expect(discoverCard.discoverCardImage.nth(0)).toBeVisible();
        const text = await discoverCard.discoverCardText.nth(0).innerText();
        expect(text.length).toBeTruthy();
        await expect(discoverCard.discoverCardButton.nth(0)).toBeEnabled();
        await discoverCard.clickButton(0);
        await discoverCard.gotoURL(testPage);
      });
    });
  });
});
