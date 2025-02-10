/* eslint-disable no-plusplus */
import { expect, test } from '@playwright/test';
import { features } from '../../../features/express/testPages/homepage.spec.js';
import Home from '../../../selectors/express/home.page.js';
import Common from '../../../selectors/express/common.page.js';
import Footer from '../../../selectors/feds/feds.footer.page.js';

let home;
let common;
let footer;
const entitledPageURL = 'https://www.adobe.com/express/entitled';

test.describe('Test Homepage ', () => {
  test.beforeEach(async ({ page }) => {
    home = new Home(page);
    common = new Common(page);
    footer = new Footer(page);
  });

  test(`${features[0].name},${features[0].tags}`, async ({ page, baseURL }) => {
    test.slow();
    console.info(`${baseURL}${features[0].path}`);

    await test.step('Go to Express home page ', async () => {
      await page.goto(`${baseURL}${features[0].path}`);
      await page.waitForLoadState('domcontentloaded');
      await expect(page).toHaveURL(`${baseURL}${features[0].path}`);
    });

    await test.step('Verify page title displayed ', async () => {
      await page.waitForLoadState();
      await expect(common.mainHeading).toBeVisible();
      expect(common.mainHeading).toBeTruthy();
    });

    await test.step('Grid Marquee ', async () => {
      let url;
      await page.waitForLoadState('domcontentloaded');
      await expect(home.marqueeBlock).toBeVisible();
      await expect(common.expressLogo).toBeVisible();
      await expect(home.headline).toBeVisible();
      await expect(home.ctas).toBeVisible();
      await expect(home.ratingsBlock).toBeVisible();

      await home.start30DayFreeTrialButton.nth(0).click();
      await page.waitForLoadState('domcontentloaded');
      url = page.url();
      expect(url).toBe(entitledPageURL);
      await page.goBack();
      await page.waitForLoadState('domcontentloaded');
      await page.waitForTimeout(1000);

      await home.getAdobeAccessFreeButton.nth(0).click();
      await page.waitForLoadState('domcontentloaded');
      url = page.url();
      expect(url).toBe(entitledPageURL);
      await page.goBack();
      await page.waitForLoadState('domcontentloaded');
      await page.waitForTimeout(1000);
    });

    await test.step('Cards ', async () => {
      await page.waitForLoadState('domcontentloaded');
      const cardCount = await home.card.count();
      expect(cardCount).toBeGreaterThan(0);

      let url;
      if (cardCount) {
        for (let i = 0; i < cardCount; i++) {
          await expect(home.cardImage.nth(i)).toBeVisible();
          await home.cardImage.nth(i).hover();
          await expect(home.cardDrawer.nth(i)).toBeVisible();
        }
      }

      // Card image
      await home.cardImage.nth(0).hover();
      await home.cardImage.nth(0).click();
      await page.waitForLoadState('domcontentloaded');
      url = page.url();
      expect(url).toContain(entitledPageURL);
      await page.goBack();
      await page.waitForLoadState('domcontentloaded');

      // Card drawer
      await home.cardImage.nth(0).hover();
      await page.waitForLoadState('domcontentloaded');
      await home.cardDrawerLink.nth(0).click();
      await page.waitForLoadState('domcontentloaded');
      url = page.url();
      expect(url).toBe(entitledPageURL);
      await page.goBack();
      await page.waitForLoadState('domcontentloaded');
      await home.cardImage.nth(0).hover();
      await page.waitForLoadState('domcontentloaded');
      await home.cardDrawerLink.nth(1).click();
      await page.waitForLoadState('domcontentloaded');
      url = page.url();
      expect(url).toBe(entitledPageURL);
      await page.goBack();
      await page.waitForLoadState('domcontentloaded');
    });

    await test.step('Ratings block ', async () => {
      await page.waitForLoadState('domcontentloaded');
      expect(await home.ratingsBlock).toBeVisible();
      expect(await home.ratingsContainer.nth(0)).toBeVisible();
      expect(await home.ratingsContainer.nth(1)).toBeVisible();
      const appStoreRating = await home.ratingsContainer.nth(0).innerText();
      const googlePlayRating = await home.ratingsContainer.nth(1).innerText();
      expect(appStoreRating).toBeTruthy();
      expect(googlePlayRating).toBeTruthy();
    });

    await test.step('Gen AI Cards ', async () => {
      await page.waitForLoadState('domcontentloaded');
      await common.genAICards.scrollIntoViewIfNeeded(2000);
      expect(await common.genAICards).toBeVisible();
      expect(await common.genAICardsHeading).toBeTruthy();
      expect(await common.genAICardsHeading).toBeVisible();
      const noOfCards = await common.genAICardsCarouselCard.count();

      for (let i = 0; i < noOfCards; i++) {
        await expect(common.genAICardsCarouselCardTitle.nth(i)).toBeVisible();
        expect(common.genAICardsCarouselCardTitle.nth(i).innerText()).toBeTruthy();
        expect(common.genAICardsCarouselCardText.nth(i).innerText()).toBeTruthy();
        await expect(common.genAICardsCarouselCardImage.nth(i)).toBeVisible();
        await expect(common.genAICardsCarouselCardButton.nth(i)).toBeEnabled();
      }
      await common.genAICardsCarouselCardButton.nth(0).click();
      await page.waitForLoadState('domcontentloaded');
      await page.waitForURL(`${baseURL}/express/business/teams`);
      const url = page.url();
      expect(url).toEqual(`${baseURL}/express/business/teams`);
      await page.goBack();
      await page.waitForLoadState('domcontentloaded');
    });

    await test.step('Discover cards ', async () => {
      await page.waitForLoadState('domcontentloaded');
      await common.discoverCardsBlock.scrollIntoViewIfNeeded(2000);
      expect(await common.discoverCardsBlock).toBeVisible();
      expect(await common.discoverCardsHeading2).toBeVisible();
      expect(await common.discoverCardsHeading2).toBeTruthy();
      const heading = await common.discoverCardsHeading2.innerText();
      expect(heading.length).toBeGreaterThan(0);
      const noOfCards = await common.discoverCard.count();
      for (let i = 0; i < noOfCards; i++) {
        await expect(common.discoverCardImage.nth(i)).toBeVisible();
        await expect(common.discoverCardButton.nth(i)).toBeVisible();
        const cardTitle = await common.discoverCardTitle.nth(i).innerText();
        expect(cardTitle.length).toBeGreaterThan(0);
        const cardText = await common.discoverCardText.nth(i).innerText();
        expect(cardText.length).toBeGreaterThan(0);
        expect(common.discoverCardImage.nth(i)).toBeTruthy();
        await common.discoverCardButton.nth(i).click();
        await page.waitForLoadState('domcontentloaded');
        const url = page.url();
        expect(url).toBe(entitledPageURL);
        await page.goBack();
        await page.waitForLoadState('domcontentloaded');
        await page.waitForTimeout(1000);
        await common.discoverCardsBlock.scrollIntoViewIfNeeded(2000);
      }
      await expect(common.discoverCardsGalleryControl).toBeVisible();
    });

    await test.step('Quotes block ', async () => {
      await page.waitForLoadState('domcontentloaded');
      await home.quotesBlock.scrollIntoViewIfNeeded(2000);
      expect(await home.quotesBlock).toBeVisible();
      expect(await home.quotesAuthorPhoto.first()).toBeVisible();
      expect(await home.quotesAuthorDescription.first()).toBeVisible();
      expect(await home.quotesQuoteComment.first()).toBeVisible();
    });

    await test.step('Pricing cards block  ', async () => {
      let url;
      await page.waitForLoadState('domcontentloaded');
      await home.pricingCardBlock.scrollIntoViewIfNeeded(2000);
      expect(await home.pricingCardBlock).toBeVisible();
      expect(await home.comparePlansHeading).toBeVisible();
      const comparePlansHeading = await home.comparePlansHeading.innerText();
      expect(comparePlansHeading).toEqual('Compare Adobe Express Plans.');
      const noOfCards = await home.pricingCard.count();
      for (let i = 0; i < noOfCards; i++) {
        await expect(home.pricingCard.nth(i)).toBeVisible();
        await expect(home.pricingCardPlanExplanation.nth(i)).toBeVisible();
        await expect(home.pricingCardPricingArea.nth(i)).toBeVisible();
        const text = await home.pricingCardPricingAreaText.nth(i).innerText();
        if (text.length) {
          await expect(home.pricingCardPricingAreaText.nth(i)).toBeVisible();
        }
      }

      // Free card button
      await expect(home.getAdobeAccessFreeButton.nth(1)).toBeEnabled();
      await home.getAdobeAccessFreeButton.nth(1).click();
      await page.waitForLoadState('domcontentloaded');
      await page.waitForTimeout(1000);
      url = page.url();
      expect(url).toBe(entitledPageURL);
      await page.goto(`${baseURL}${features[0].path}`);
      await page.waitForLoadState('domcontentloaded');

      // Premium card button
      await home.pricingCardBlock.scrollIntoViewIfNeeded(2000);
      await expect(home.start30DayFreeTrialButton.nth(1)).toBeEnabled();
      await home.start30DayFreeTrialButton.nth(1).click();
      await page.waitForLoadState('domcontentloaded');
      await page.waitForTimeout(1000);
      url = page.url();
      expect(url).toBe(entitledPageURL);
      await page.goto(`${baseURL}${features[0].path}`);
      await page.waitForLoadState('domcontentloaded');

      // Teams card button
      await home.pricingCardBlock.scrollIntoViewIfNeeded(2000);
      await expect(home.start14DayFreeTrialButton).toBeEnabled();
      await home.start14DayFreeTrialButton.click();
      await page.waitForLoadState('domcontentloaded');
      await page.waitForTimeout(1000);
      url = page.url();
      expect(url).toBe(entitledPageURL);
      await page.goto(`${baseURL}${features[0].path}`);
      await page.waitForLoadState('domcontentloaded');

      // Enterprise card button
      await home.pricingCardBlock.scrollIntoViewIfNeeded(2000);
      await expect(home.requestInformationButton).toBeEnabled();
      await home.requestInformationButton.click();
      await page.waitForLoadState('domcontentloaded');
      await page.waitForTimeout(1000);
      await common.faasForm.waitFor({ state: 'visible', timeout: 5000 });
      await common.faasFormCloseButton.click();

      await expect(home.pricingFooter).toBeVisible();
      const noOfLinks = await home.pricingFooterLink.count();
      for (let i = 0; i < noOfLinks; i++) {
        await home.pricingFooter.scrollIntoViewIfNeeded(2000);
        await expect(home.pricingFooterLink.nth(i)).toBeVisible();
        await home.pricingFooterLink.nth(i).click();
        await page.waitForLoadState('domcontentloaded');
        await page.waitForTimeout(1000);
        url = page.url();
        expect(url).toContain(`${baseURL}/express/pricing?tab=`);
        await page.goBack();
        await page.waitForLoadState('domcontentloaded');
        await page.waitForTimeout(1000);
      }
      await expect(home.compareAllPlansButton).toBeVisible();
      await home.compareAllPlansButton.click();
      await page.waitForLoadState('domcontentloaded');
      url = page.url();
      expect(url).toBe(`${baseURL}/express/pricing`);
      await page.goBack();
      await page.waitForLoadState('domcontentloaded');
      await page.waitForTimeout(1000);
    });

    await test.step('Logo block ', async () => {
      await page.waitForLoadState('domcontentloaded');
      await common.logoRowBlock.scrollIntoViewIfNeeded(2000);
      expect(await common.logoRowBlock).toBeVisible();
    });

    await test.step('Banner block ', async () => {
      await page.waitForLoadState('domcontentloaded');
      await common.bannerBlock.scrollIntoViewIfNeeded(2000);
      expect(await common.bannerBlock).toBeVisible();
      expect(home.getAdobeAccessFreeButton.nth(2)).toBeVisible();
      await home.getAdobeAccessFreeButton.nth(2).click();
      await page.waitForLoadState('domcontentloaded');
      const url = page.url();
      expect(url).toBe(entitledPageURL);
      await page.goto(`${baseURL}${features[0].path}`);
      await page.waitForLoadState('domcontentloaded');
    });

    await test.step('floating button ', async () => {
      await common.logoRowBlock.scrollIntoViewIfNeeded(2000);
      await page.waitForLoadState('domcontentloaded');
      const count = await common.floatingButtonBlock.count();

      if (count) {
        await expect(common.floatingButtonInvisibleClass).not.toBeVisible();
      }

      expect(await common.floatingButtonBlock).toBeVisible();
      await common.floatingButtonLink.click();
      await page.waitForLoadState('domcontentloaded');
      await page.waitForTimeout(1000);
      const url = page.url();
      expect(url).toBe(entitledPageURL);
      await page.goto(`${baseURL}${features[0].path}`);
      await page.waitForLoadState('domcontentloaded');
    });

    await test.step('footer ', async () => {
      await footer.legalContainer.scrollIntoViewIfNeeded(2000);
      await footer.footerContainer.waitFor({ state: 'visible', timeout: 5000 });
      await expect(footer.footerContainer.first()).toBeVisible();
      await expect(footer.footerSections.first()).toBeVisible();
      await expect(footer.footerColumns.first()).toBeVisible();
      await expect(footer.footerHeadings.first()).toBeVisible();
      await expect(footer.legalContainer).toBeVisible();
    });
  });
});
