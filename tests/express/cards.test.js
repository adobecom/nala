/* eslint-disable no-plusplus */
import { expect, test } from '@playwright/test';
import { features } from '../../features/express/cards.spec.js';
import Card from '../../selectors/express/cards.page.js';

let card;
const prodHomePage = 'https://www.adobe.com/express/';
const edExHomePage = 'https://edex.adobe.com/express/';

test.describe('Cards block testing', () => {
  // before each test block
  test.beforeEach(async ({ page }) => {
    card = new Card(page);
  });

  test(`${features[0].name},${features[0].tags}`, async ({ page, baseURL }) => {
    console.info(`${baseURL}${features[0].path}`);

    await test.step('Go to Cards (default) block test page', async () => {
      await page.goto(`${baseURL}${features[0].path}`);
      await page.waitForLoadState('domcontentloaded');
      await expect(page).toHaveURL(`${baseURL}${features[0].path}`);
    });

    await test.step('Verify block displayed ', async () => {
      await page.waitForLoadState();
      await expect(card.cards).toBeVisible();
    });

    await test.step('On click, goes to homepage ', async () => {
      await page.waitForLoadState();

      const totalButtons = await card.button.count();
      expect(totalButtons).toBeTruthy();

      for (let i = 0; i < totalButtons; i++) {
        const text = await card.button.nth(i).innerText();
        console.log(text);
        await card.button.nth(i).click();
        await page.waitForLoadState();
        await expect(page).toHaveURL(`${prodHomePage}`);
        await page.goBack();
        await page.waitForLoadState();
      }
    });
  });

  test(`${features[1].name},${features[1].tags}`, async ({ page, baseURL }) => {
    console.info(`${baseURL}${features[1].path}`);

    await test.step('Go to Cards (highlight) block test page', async () => {
      await page.goto(`${baseURL}${features[1].path}`);
      await page.waitForLoadState('domcontentloaded');
      await expect(page).toHaveURL(`${baseURL}${features[1].path}`);
    });

    await test.step('Verify block displayed ', async () => {
      await page.waitForLoadState();
      await expect(card.cards_highlight).toBeVisible();
    });

    await test.step('On click, goes to homepage ', async () => {
      await page.waitForLoadState();

      const totalButtons = await card.button.count();
      expect(totalButtons).toBeTruthy();

      // buttons
      for (let i = 0; i < totalButtons; i++) {
        const text = await card.button.nth(i).innerText();
        console.log(text);
        await card.button.nth(i).click();
        await expect(page).toHaveURL(`${prodHomePage}`);
        await page.goBack();
        await page.waitForLoadState();
      }

      // links
      await page.getByRole('link', { name: 'Getting Started Guide' }).click();
      await page.waitForLoadState();
      await expect(page).toHaveURL(`${prodHomePage}`);
      await page.goBack();
      await page.waitForLoadState();

      await page.getByRole('link', { name: 'Deployment Guide' }).click();
      await page.waitForLoadState();
      await expect(page).toHaveURL(`${prodHomePage}`);
      await page.goBack();
      await page.waitForLoadState();
    });
  });

  test(`${features[2].name},${features[2].tags}`, async ({ page, baseURL }) => {
    console.info(`${baseURL}${features[2].path}`);

    await test.step('Go to Cards (default - 1 card) block test page', async () => {
      await page.goto(`${baseURL}${features[2].path}`);
      await page.waitForLoadState('domcontentloaded');
      await expect(page).toHaveURL(`${baseURL}${features[2].path}`);
    });

    await test.step('Verify block displayed ', async () => {
      await page.waitForLoadState();
      await expect(card.cards).toBeVisible();

      const noOfCards = await card.card.count();
      expect(noOfCards).toEqual(1);
    });

    await test.step('On click, goes to homepage ', async () => {
      await page.waitForLoadState();

      const totalButtons = await card.button.count();
      expect(totalButtons).toEqual(2);

      const text1 = await card.button.nth(0).innerText();
      const text2 = await card.button.nth(1).innerText();
      expect(text1).toBe('Teaching Resources');
      expect(text2).toBe('Try now');

      for (let i = 0; i < totalButtons; i++) {
        const [newTab] = await Promise.all([
          page.waitForEvent('popup'),
          await card.button.nth(i).click(),
        ]);
        await newTab.waitForLoadState();
        await expect(newTab).toHaveURL(`${edExHomePage}`);
        await newTab.close();
      }
    });
  });

  test(`${features[3].name},${features[3].tags}`, async ({ page, baseURL }) => {
    console.info(`${baseURL}${features[3].path}`);

    await test.step('Go to Cards (default - 2 cards) block test page', async () => {
      await page.goto(`${baseURL}${features[3].path}`);
      await page.waitForLoadState('domcontentloaded');
      await expect(page).toHaveURL(`${baseURL}${features[3].path}`);
    });

    await test.step('Verify block displayed ', async () => {
      await page.waitForLoadState();
      await expect(card.cards).toBeVisible();

      const noOfCards = await card.card.count();
      expect(noOfCards).toEqual(2);
    });

    await test.step('Validate buttons and links, on click ', async () => {
      await page.waitForLoadState();

      const totalButtons = await card.button.count();
      expect(totalButtons).toEqual(4);

      for (let i = 0; i < totalButtons; i++) {
        const text = await card.button.nth(i).innerText();
        console.log(text);
        const [newTab] = await Promise.all([
          page.waitForEvent('popup'),
          await card.button.nth(i).click(),
        ]);
        await newTab.waitForLoadState();
        await expect(newTab).toHaveURL(`${edExHomePage}`);
        await newTab.close();
      }
    });
  });

  test(`${features[4].name},${features[4].tags}`, async ({ page, baseURL }) => {
    console.info(`${baseURL}${features[4].path}`);

    await test.step('Go to Cards (featured) block test page', async () => {
      await page.goto(`${baseURL}${features[4].path}`);
      await page.waitForLoadState('domcontentloaded');
      await expect(page).toHaveURL(`${baseURL}${features[4].path}`);
    });

    await test.step('Verify block displayed ', async () => {
      await page.waitForLoadState();
      await expect(card.cards).toBeVisible();

      const noOfCards = await card.card.count();
      expect(noOfCards).toEqual(4);
    });

    await test.step('Validate buttons and links, on click ', async () => {
      await page.waitForLoadState();

      const totalButtons = await card.button.count();
      expect(totalButtons).toEqual(8);

      for (let i = 0; i < totalButtons; i++) {
        const [newTab] = await Promise.all([
          page.waitForEvent('popup'),
          await card.button.nth(i).click(),
        ]);
        await newTab.waitForLoadState();
        await expect(newTab).toHaveURL(`${edExHomePage}`);
        await newTab.close();
      }
    });
  });

  test(`${features[5].name},${features[5].tags}`, async ({ page, baseURL }) => {
    console.info(`${baseURL}${features[5].path}`);

    await test.step('Go to Cards (large) block test page', async () => {
      await page.goto(`${baseURL}${features[5].path}`);
      await page.waitForLoadState('domcontentloaded');
      await expect(page).toHaveURL(`${baseURL}${features[5].path}`);
    });

    await test.step('Verify block displayed ', async () => {
      await page.waitForLoadState();
      await expect(card.cards).toBeVisible();
    });

    await test.step('Validate buttons and links, on click ', async () => {
      await page.waitForLoadState();

      const totalButtons = await card.button.count();
      expect(totalButtons).toEqual(6);

      for (let i = 0; i < totalButtons; i++) {
        const [newTab] = await Promise.all([
          page.waitForEvent('popup'),
          await card.button.nth(i).click(),
        ]);
        await newTab.waitForLoadState();
        await expect(newTab).toHaveURL(`${edExHomePage}`);
        await newTab.close();
      }
    });
  });

  test(`${features[6].name},${features[6].tags}`, async ({ page, baseURL }) => {
    console.info(`${baseURL}${features[6].path}`);

    await test.step('Got to Cards (dark) block test page', async () => {
      await page.goto(`${baseURL}${features[6].path}`);
      await page.waitForLoadState('domcontentloaded');
      await expect(page).toHaveURL(`${baseURL}${features[6].path}`);
    });

    await test.step('Verify block displayed ', async () => {
      await page.waitForLoadState();
      await expect(card.cards).toBeVisible();
    });

    await test.step('Validate buttons and links, on click ', async () => {
      await page.waitForLoadState();

      const totalButtons = await card.button.count();
      expect(totalButtons).toEqual(6);

      for (let i = 0; i < totalButtons; i++) {
        const [newTab] = await Promise.all([
          page.waitForEvent('popup'),
          await card.button.nth(i).click(),
        ]);
        await newTab.waitForLoadState();
        await expect(newTab).toHaveURL(`${edExHomePage}`);
        await newTab.close();
      }
    });
  });
});
