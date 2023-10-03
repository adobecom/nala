import { expect, test } from '@playwright/test';
import { WebUtil } from '../../libs/webutil.js';
import { features } from '../../features/blog/homepage.spec.js';
import HomePage from '../../selectors/blog/home.page.js';

let homePage;
let webUtil;

test.describe('Blog Home page test suite', () => {
  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    webUtil = new WebUtil(page);
  });

  test(`${features[0].name},${features[0].tags}`, async ({ page, baseURL }) => {
    console.info(`[Test Page]: ${baseURL}${features[0].path}`);

    await test.step('step-1: Go to Blog home page', async () => {
      await page.goto(`${baseURL}`);
      await page.waitForLoadState('domcontentloaded');
      await expect(page).toHaveURL(`${baseURL}`);
    });

    await test.step('step-2: Verify Header', async () => {
      const { data } = features[0];
      await expect(homePage.blogLogo).toBeVisible();
      await expect(homePage.gnavMain).toBeVisible();
      // News menu
      await expect(homePage.newsMenu).toBeVisible();
      await homePage.newsMenu.click();
      await expect(homePage.newsMenu).toHaveCount(data.news);      
      // Insight & Inspiration menu
      await expect(homePage.insightInspirationMenu).toBeVisible();
      await homePage.insightInspirationMenu.click();
      await expect(homePage.insightInspirationMenuList).toHaveCount(data.insightsAndInspiration);
      // Responsibility menu
      await expect(homePage.responsibilityMenu).toBeVisible();
      await homePage.responsibilityMenu.click();
      await expect(homePage.responsibilityMenuList).toHaveCount(data.responsibility);
      // Adobe Life
      await expect(homePage.adobeLifeMenu).toBeVisible();
      await homePage.adobeLifeMenu.click();
      await expect(homePage.responsibilityMenuList).toHaveCount(data.adobeLife);
      // Search and Personalization
      await expect(homePage.searchIcon).toBeVisible();
      await expect(homePage.signIn).toBeVisible();
      await expect(homePage.adobeLogo).toBeVisible();
    });

    await test.step('step-3: Verify Articles', async () => {
      // Featured article section
      await expect(homePage.featuredArticleBlock).toBeVisible();
      await expect(homePage.featuredArticleCard).toBeVisible();
      await expect(homePage.featuredArticleImage).toBeVisible();
      // Latest news text section
      await expect(homePage.textBlock).toBeVisible();
      await expect(homePage.textBlockHeader).toBeVisible();
      await expect(homePage.readMoreNewsButton).toBeVisible();
      // Article feeds section
      await webUtil.scrollPage('down', 'slow');
      await page.waitForLoadState('networkidle');
      await expect(homePage.loadMoreArticlesButton).toBeVisible();
    });

    await test.step('step-4: Verify Footer', async () => {
      // Change Language
      await expect(homePage.changeLanguageText).toBeVisible();
      await expect(homePage.changeLanguageButton).toBeVisible();
      await expect(homePage.changeLanguageList).toHaveCount(10); 
      // Copywright, privacy, terms of use, cookie pref, and donot sell info
      await expect(homePage.copywright).toBeVisible();
      await expect(homePage.privacyLink).toBeVisible();
      await expect(homePage.termsOfUseLink).toBeVisible();
      await expect(homePage.cookiePreferencesLink).toBeVisible();
      await expect(homePage.doNotSellInformationLink).toBeVisible();
      await expect(homePage.adChoicesLink).toBeVisible();
    });
  });
});
