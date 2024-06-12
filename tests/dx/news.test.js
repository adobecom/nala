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
      console.log('url: ', baseURL + features[0].path);
      await page.goto(`${baseURL}${features[0].path}`);
      await newsPage.firstCardTitle.waitFor({ state: 'visible', timeout: 3000 });
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
      await expect(parseInt(result.split(' ')[0], 10)).toBeGreaterThan(6);
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
      await newsPage.firstCardTitle.waitFor({ state: 'visible', timeout: 3000 });
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
      await expect(paginationText.toLowerCase()).toBe('1 - 3 of 6 results');
    });

    await test.step('Load more cards', async () => {
      await newsPage.loadMore.click();
      const paginationText = await newsPage.paginationText.textContent();
      await expect(paginationText.toLowerCase()).toBe('1 - 6 of 6 results');
      await expect(await newsPage.loadMore).not.toBeVisible();
      const firstCardDate = new Date(await newsPage.firstCardDate.textContent()).getTime();
      const lastCardDate = new Date(await newsPage.lastCardDate.textContent()).getTime();
      await expect(firstCardDate).toBeLessThan(lastCardDate);
    });
  });

  test(`${features[2].name},${features[2].tags}`, async ({ page, baseURL }) => {
    await test.step('Go to News page', async () => {
      await page.goto(`${baseURL}${features[0].path}`);
      await newsPage.firstCardTitle.waitFor({ state: 'visible', timeout: 5000 });
      const result = await newsPage.resultNumber.textContent();
      await expect(parseInt(result.split(' ')[0], 10)).toBeGreaterThan(6);
    });

    await test.step('Find all automation regression cards', async () => {
      await newsPage.searchField.fill('Automation regression card');
      const result = await newsPage.resultNumber.textContent();
      await expect(parseInt(result.split(' ')[0], 10)).toBe(6);
    });

    await test.step('Test applications filter', async () => {
      await newsPage.expandFilterOptions('Applications');
      await newsPage.clickFilterOptions('Campaign');
      const resultAfterCampaignFilterApplied = await newsPage.resultNumber.textContent();
      await expect(parseInt(resultAfterCampaignFilterApplied.split(' ')[0], 10)).toBe(1);
      await newsPage.clickFilterOptions('Analytics');
      const resultAfterAnalyticsFilterApplied = await newsPage.resultNumber.textContent();
      await expect(parseInt(resultAfterAnalyticsFilterApplied.split(' ')[0], 10)).toBe(2);
      await newsPage.clearFilter('Applications', '2');
      const resultAfterClearingApplicationsFilter = await newsPage.resultNumber.textContent();
      await expect(parseInt(resultAfterClearingApplicationsFilter.split(' ')[0], 10)).toBe(6);
      await newsPage.expandFilterOptions('Applications');
    });

    await test.step('Test audience filter', async () => {
      await newsPage.expandFilterOptions('Audience');
      await newsPage.clickFilterOptions('Technical');
      const resultAfterTechnical = await newsPage.resultNumber.textContent();
      await expect(parseInt(resultAfterTechnical.split(' ')[0], 10)).toBe(1);
      await newsPage.clearSideBarFilterButton('Technical');
      const resultAfterClearingFilter = await newsPage.resultNumber.textContent();
      await expect(parseInt(resultAfterClearingFilter.split(' ')[0], 10)).toBe(6);
      await newsPage.expandFilterOptions('Audience');
    });

    await test.step('Test region filter', async () => {
      await newsPage.expandFilterOptions('Region');
      await newsPage.clickFilterOptions('Americas');
      await newsPage.clickFilterOptions('Japan');
      const resultAfterRegionFilters = await newsPage.resultNumber.textContent();
      await expect(parseInt(resultAfterRegionFilters.split(' ')[0], 10)).toBe(3);
      await newsPage.clickFilterOptions('Americas');
      const resultAfterUncheckingAmericas = await newsPage.resultNumber.textContent();
      await expect(parseInt(resultAfterUncheckingAmericas.split(' ')[0], 10)).toBe(1);
    });

    await test.step('Test topic filter', async () => {
      await newsPage.expandFilterOptions('Topic');
      await newsPage.clickFilterOptions('Solutions');
      const resultAfterTopicFilter = await newsPage.resultNumber.textContent();
      await expect(parseInt(resultAfterTopicFilter.split(' ')[0], 10)).toBe(1);
      await newsPage.clearAllSelector.click();
      const resultAfterClearingAllFilters = await newsPage.resultNumber.textContent();
      await expect(parseInt(resultAfterClearingAllFilters.split(' ')[0], 10)).toBeGreaterThan(6);
    });
  });


  test(`${features[3].name},${features[3].tags}`, async ({ page, baseURL }) => {
    await test.step('Click Sign In', async () => {
      await page.goto(`${baseURL}${features[0].path}`);
      await newsPage.signInButton.click();
      await page.waitForLoadState('domcontentloaded');
    });

    await test.step('Click Sign In', async () => {
      await newsPage.IMSEmailPage.waitFor({ state: 'visible', timeout: 5000 });
      await newsPage.emailField.fill(process.env.IMS_EMAIL);
      await newsPage.emailPageContinueButton.click();
      await page.waitForLoadState('domcontentloaded');
      await newsPage.IMSPasswordPage.waitFor({ state: 'visible', timeout: 10000 });
      await newsPage.passwordField.fill(process.env.IMS_PASS);
      await newsPage.passwordPageContinueButton.click();
      await page.waitForLoadState('domcontentloaded');
    });

    await test.step('Verify successfull login', async () => {
      await newsPage.profileIconButton.click();
      const userName = await newsPage.profileName.textContent();
      await expect(userName).toBe('Yugo-SPP-Stage Platinum');
    });

    // TODO: logout
  });
});
