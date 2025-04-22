/* eslint-disable no-plusplus */
import { expect, test } from '@playwright/test';
import { features } from '../../features/express/cards.spec.js';
import Card from '../../selectors/express/cards.page.js';

let card;

test.describe('Cards block testing', () => {
  // before each test block
  test.beforeEach(async ({ page }) => {
    card = new Card(page);
  });

  test(`${features[0].name},${features[0].tags}`, async ({ page, baseURL }) => {
    console.info(`${baseURL}${features[0].path}`);
    const testPage = `${baseURL}${features[0].path}`;
    await card.gotoURL(testPage);

    await test.step('Verify block displayed ', async () => {
      await page.waitForLoadState();
      await expect(card.cards).toBeVisible();
    });

    await test.step('Test button click ', async () => {
      const totalButtons = await card.button.count();
      expect(totalButtons).toBeTruthy();

      for (let i = 0; i < totalButtons; i++) {
        const text = await card.button.nth(i).innerText();
        expect(text.length).toBeTruthy();
        await card.button.nth(i).click();
        expect(page.url).not.toBe(testPage);
        await card.gotoURL(testPage);
      }
    });
  });

  test(`${features[1].name},${features[1].tags}`, async ({ page, baseURL }) => {
    console.info(`${baseURL}${features[1].path}`);
    const testPage = `${baseURL}${features[1].path}`;
    await card.gotoURL(testPage);

    await test.step('Verify block displayed ', async () => {
      await expect(card.cards_highlight).toBeVisible();
    });

    await test.step('Test button click ', async () => {
      const totalButtons = await card.button.count();
      expect(totalButtons).toBeTruthy();

      // buttons
      for (let i = 0; i < totalButtons; i++) {
        await page.waitForTimeout(2000);
        const text = await card.button.nth(i).innerText();
        expect(text.length).toBeTruthy();
        await card.button.nth(i).click();
        expect(page.url).not.toBe(testPage);
        await card.gotoURL(testPage);
      }

      // links
      await page.getByRole('link', { name: 'Getting Started Guide' }).click();
      expect(page.url).not.toBe(testPage);
      await card.gotoURL(testPage);

      await page.getByRole('link', { name: 'Deployment Guide' }).click();
      expect(page.url).not.toBe(testPage);
      await card.gotoURL(testPage);
    });
  });

  test(`${features[2].name},${features[2].tags}`, async ({ page, baseURL }) => {
    console.info(`${baseURL}${features[2].path}`);
    const testPage = `${baseURL}${features[2].path}`;
    await card.gotoURL(testPage);

    await test.step('Verify block displayed ', async () => {
      await expect(card.cards).toBeVisible();
      const noOfCards = await card.card.count();
      expect(noOfCards).toEqual(1);
    });

    await test.step('Test button click ', async () => {
      await page.waitForLoadState();

      const totalButtons = await card.button.count();
      expect(totalButtons).toEqual(2);

      const text1 = await card.button.nth(0).innerText();
      const text2 = await card.button.nth(1).innerText();
      expect(text1).toBe('Teaching Resources');
      expect(text2).toBe('Try now');

      for (let i = 0; i < totalButtons; i++) {
        await page.waitForTimeout(2000);
        const [newTab] = await Promise.all([
          page.waitForEvent('popup'),
          await card.button.nth(i).click(),
        ]);
        await newTab.waitForLoadState();
        expect(newTab.url).not.toBe(testPage);
        await newTab.close();
        await card.gotoURL(testPage);
      }
    });
  });

  test(`${features[3].name},${features[3].tags}`, async ({ page, baseURL }) => {
    console.info(`${baseURL}${features[3].path}`);
    const testPage = `${baseURL}${features[3].path}`;
    await card.gotoURL(testPage);

    await test.step('Verify block displayed ', async () => {
      await expect(card.cards).toBeVisible();
      const noOfCards = await card.card.count();
      expect(noOfCards).toEqual(2);
    });

    await test.step('Validate buttons and links, on click ', async () => {
      const totalButtons = await card.button.count();
      expect(totalButtons).toEqual(4);

      for (let i = 0; i < totalButtons; i++) {
        await page.waitForTimeout(2000);
        const text = await card.button.nth(i).innerText();
        expect(text.length).toBeTruthy();
        const [newTab] = await Promise.all([
          page.waitForEvent('popup'),
          await card.button.nth(i).click(),
        ]);
        expect(newTab.url).not.toBe(testPage);
        await newTab.waitForLoadState();
        await newTab.close();
        await card.gotoURL(testPage);
      }
    });
  });

  test(`${features[4].name},${features[4].tags}`, async ({ page, baseURL }) => {
    console.info(`${baseURL}${features[4].path}`);
    const testPage = `${baseURL}${features[4].path}`;
    await card.gotoURL(testPage);

    await test.step('Verify block displayed ', async () => {
      await expect(card.cards).toBeVisible();

      const noOfCards = await card.card.count();
      expect(noOfCards).toEqual(4);
    });

    await test.step('Validate buttons and links, on click ', async () => {
      const totalButtons = await card.button.count();
      expect(totalButtons).toEqual(8);

      for (let i = 0; i < totalButtons; i++) {
        await page.waitForTimeout(2000);
        const [newTab] = await Promise.all([
          page.waitForEvent('popup'),
          await card.button.nth(i).click(),
        ]);
        expect(newTab.url).not.toBe(testPage);
        await newTab.waitForLoadState();
        await newTab.close();
        await card.gotoURL(testPage);
      }
    });
  });

  test(`${features[5].name},${features[5].tags}`, async ({ page, baseURL }) => {
    console.info(`${baseURL}${features[5].path}`);
    const testPage = `${baseURL}${features[5].path}`;
    await card.gotoURL(testPage);

    await test.step('Verify block displayed ', async () => {
      await expect(card.cards).toBeVisible();
    });

    await test.step('Validate buttons and links, on click ', async () => {
      const totalButtons = await card.button.count();
      expect(totalButtons).toEqual(6);

      for (let i = 0; i < totalButtons; i++) {
        await page.waitForTimeout(2000);
        const [newTab] = await Promise.all([
          page.waitForEvent('popup'),
          await card.button.nth(i).click(),
        ]);
        expect(newTab.url).not.toBe(testPage);
        await newTab.waitForLoadState();
        await newTab.close();
        await card.gotoURL(testPage);
      }
    });
  });

  test(`${features[6].name},${features[6].tags}`, async ({ page, baseURL }) => {
    console.info(`${baseURL}${features[6].path}`);
    const testPage = `${baseURL}${features[6].path}`;
    await card.gotoURL(testPage);

    await test.step('Verify block displayed ', async () => {
      await expect(card.cards).toBeVisible();
    });

    await test.step('Validate buttons and links, on click ', async () => {
      const totalButtons = await card.button.count();
      expect(totalButtons).toEqual(6);

      for (let i = 0; i < totalButtons; i++) {
        await page.waitForTimeout(2000);
        const [newTab] = await Promise.all([
          page.waitForEvent('popup'),
          await card.button.nth(i).click(),
        ]);
        expect(newTab.url).not.toBe(testPage);
        await newTab.waitForLoadState();
        await newTab.close();
      }
    });
  });
});
