import { test, expect } from '@playwright/test';
import NewsPage from '../../selectors/dx/news.page.js';

let newsPage;
const News = require('../../features/dx/news.spec.js');

const { features } = News;

test.describe('Validate news block', () => {
  test.beforeEach(async ({ page }) => {
    newsPage = new NewsPage(page);
  });
  test(`${features[0].name},${features[0].tags}`, async ({ page, baseURL }) => {
    await test.step('Go to News page', async () => {
      await page.goto(`${baseURL}${features[0].path}`);
      await newsPage.firstCardTitle.waitFor({ state: 'visible', timeout: 30000 });
      const result = await newsPage.resultNumber.textContent();
      await expect(parseInt(result.split(' ')[0], 10)).toBeGreaterThan(6);
    });

    await test.step('Enter Automation regression card in search field', async () => {
      await newsPage.searchField.fill('Automation regression card');
      const result = await newsPage.resultNumber.textContent();
      await expect(parseInt(result.split(' ')[0], 10)).toBe(6);
    });

    await test.step('Clear search field on X', async () => {
      await newsPage.clearSearchSelector.click();
      const result = await newsPage.resultNumber.textContent();
      await expect(parseInt(result.split(' ')[0], 10)).toBeGreaterThan(6);
    });

    await test.step('Enter Automation regression card no1 in search field', async () => {
      await newsPage.searchField.fill('Automation regression card no1');
      const result = await newsPage.resultNumber.textContent();
      await expect(parseInt(result.split(' ')[0], 10)).toBe(1);
    });

    await test.step('Clear all', async () => {
      await newsPage.clearAllSelector.click();
      const result = await newsPage.resultNumber.textContent();
      await expect(parseInt(result.split(' ')[0], 10)).toBeGreaterThan(7);
    });

    await test.step('Enter This is automation in search field', async () => {
      await newsPage.searchField.fill('This is automation');
      const result = await newsPage.resultNumber.textContent();
      await expect(parseInt(result.split(' ')[0], 10)).toBe(5);
    });
  });

  test(`${features[1].name},${features[1].tags}`, async ({ page, baseURL }) => {
    await test.step('Go to News page', async () => {
      await page.goto(`${baseURL}${features[0].path}`);
      await newsPage.firstCardTitle.waitFor({ state: 'visible', timeout: 30000 });
      const result = await newsPage.resultNumber.textContent();
      await expect(parseInt(result.split(' ')[0], 10)).toBeGreaterThan(6);
    });

    await test.step('Select Oldest sort option', async () => {
      await newsPage.searchField.fill('Automation regression card');
      const result = await newsPage.resultNumber.textContent();
      await expect(parseInt(result.split(' ')[0], 10)).toBe(6);
      await newsPage.sortBtn.click();
      await newsPage.oldestOption.click();
      const paginationText = await newsPage.paginationText.textContent();
      console.log('page test', paginationText);
      await expect(paginationText.toLowerCase()).toBe('1 - 3 of 6 results');
    });

    await test.step('Load more cards', async () => {
      await newsPage.loadMore.click();
      const paginationText = await newsPage.paginationText.textContent();
      console.log('page test', paginationText);
      await expect(paginationText.toLowerCase()).toBe('1 - 6 of 6 results');
      await expect(await newsPage.loadMore).not.toBeVisible();
      const firstCardDate = new Date(await newsPage.firstCardDate.textContent()).getTime();
      const lastCardDate = new Date(await newsPage.lastCardDate.textContent()).getTime();
      await expect(firstCardDate).toBeLessThan(lastCardDate);
    });
  });
});
