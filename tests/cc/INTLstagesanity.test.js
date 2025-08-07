import { expect, test } from '@playwright/test';
import { features } from '../../features/cc/INTLstagesanity.spec.js';
import Stageintlpages from '../../selectors/cc/INTLstagesanity.page.js';

let stageintlpages;
test.describe('INTL CC, CCT page checks', () => {
  test.beforeEach(async ({ page }) => {
    stageintlpages = new Stageintlpages(page);
  });
  test(`${features[0].name},${features[0].tags}`, async ({ page, baseURL }) => {
    console.info(`[Test Page]: ${baseURL}${features[0].path}`);
    await test.step('free trail, buy now, phone number CTA, marquee CTAs, Price pods checks', async () => {
      await page.goto(`${baseURL}${features[0].path}`);
      await page.waitForLoadState('domcontentloaded');
      await expect(page).toHaveURL(`${baseURL}${features[0].path}`);
    });
    await test.step('STAGE CC business US page checks', async () => {
      await page.waitForLoadState();
      expect(await stageintlpages.gnavFreeTrial).toBeTruthy();
      expect(await stageintlpages.gnavBuyNow).toBeTruthy();
      expect(await stageintlpages.gnavContactSalesPhoneNumner).toBeTruthy();
      expect(await stageintlpages.freeTrial).toBeTruthy();
      expect(await stageintlpages.jarvisFeature).toBeTruthy();
      expect(await stageintlpages.merchCard).toBeTruthy();
      expect(await stageintlpages.cardPrice).toBeTruthy();
    });
  });
  test(`${features[1].name},${features[1].tags}`, async ({ page, baseURL }) => {
    console.info(`[Test Page]: ${baseURL}${features[1].path}`);
    await test.step('CC india locale sanity', async () => {
      await page.goto(`${baseURL}${features[1].path}`);
      await page.waitForLoadState('domcontentloaded');
      await expect(page).toHaveURL(`${baseURL}${features[1].path}`);
    });
    await test.step('CC IN locale Gnav, Marquee, tabs, price, javis checks', async () => {
      await page.waitForLoadState();
      expect(await stageintlpages.gnavFeatures).toBeTruthy();
      expect(await stageintlpages.gnavComparePlans).toBeTruthy();
      expect(await stageintlpages.marqueeFreeTrial).toBeTruthy();
      expect(await stageintlpages.tabsFeature).toBeTruthy();
      expect(await stageintlpages.stickyPromoBar).toBeTruthy();
      expect(await stageintlpages.jarvisFeature).toBeTruthy();
    });
  });
  test(`${features[2].name},${features[2].tags}`, async ({ page, baseURL }) => {
    console.info(`[Test Page]: ${baseURL}${features[2].path}`);
    await test.step('KR Locale Student page sanidy', async () => {
      await page.goto(`${baseURL}${features[2].path}`);
      await page.waitForLoadState('domcontentloaded');
      await expect(page).toHaveURL(`${baseURL}${features[2].path}`);
    });
    await test.step('KR locale CC Stu page for megamenu,bread crumbs, masonry blk, marquee , prices, student phno, footer ', async () => {
      await page.waitForLoadState();
      expect(await stageintlpages.megaMenuItem).toBeTruthy();
      expect(await stageintlpages.breadCrumb).toBeTruthy();
      expect(await stageintlpages.marqueeBuyCTA).toBeTruthy();
      expect(await stageintlpages.masonryLayout).toBeTruthy();
      expect(await stageintlpages.marqueePrice).toBeTruthy();
      expect(await stageintlpages.priceCard).toBeTruthy();
      expect(await stageintlpages.studentSupportPhoneNumber).toBeTruthy();
      expect(await stageintlpages.globelFooter).toBeTruthy();
    });
  });
  test(`${features[3].name},${features[3].tags}`, async ({ page, baseURL }) => {
    console.info(`[Test Page]: ${baseURL}${features[3].path}`);
    await test.step('JP Photoshop checks', async () => {
      await page.goto(`${baseURL}${features[3].path}`);
      await page.waitForLoadState('domcontentloaded');
      await expect(page).toHaveURL(`${baseURL}${features[3].path}`);
    });
    await test.step('JP PS product integreation,mobile/tablet/desktop promo presence check', async () => {
      await page.waitForLoadState();
      expect(await stageintlpages.psNavigationToProduct).toBeTruthy();
      expect(await stageintlpages.mobilePromoText).toBeTruthy();
      expect(await stageintlpages.tabletPromoText).toBeTruthy();
      expect(await stageintlpages.desktopPromoText).toBeTruthy();
    });
  });
  test(`${features[4].name},${features[4].tags}`, async ({ page, baseURL }) => {
    console.info(`[Test Page]: ${baseURL}${features[1].path}`);
    await test.step('FR locale premiere product page checks', async () => {
      await page.goto(`${baseURL}${features[4].path}`);
      await page.waitForLoadState('domcontentloaded');
      await expect(page).toHaveURL(`${baseURL}${features[4].path}`);
    });
    await test.step('FR Premier page for princing , merch card checks', async () => {
      await page.waitForLoadState();
      expect(await stageintlpages.pricingModelReferece).toBeTruthy();
      expect(await stageintlpages.merchCard1).toBeTruthy();
      expect(await stageintlpages.merchCard2).toBeTruthy();
      expect(await stageintlpages.jarvisFeature).toBeTruthy();
    });
  });
  test(`${features[5].name},${features[5].tags}`, async ({ page, baseURL }) => {
    console.info(`[Test Page]: ${baseURL}${features[1].path}`);
    await test.step('FR CC Business page checks', async () => {
      await page.goto(`${baseURL}${features[5].path}`);
      await page.waitForLoadState('domcontentloaded');
      await expect(page).toHaveURL(`${baseURL}${features[5].path}`);
    });
    await test.step('FR business admin console, sale contact, bu tabs, product feature table test', async () => {
      await page.waitForLoadState();
      expect(await stageintlpages.adminConsoleGnavLink).toBeTruthy();
      expect(await stageintlpages.salesContactGnavLink).toBeTruthy();
      expect(await stageintlpages.businessTabListContainer).toBeTruthy();
      expect(await stageintlpages.productFeatureTable).toBeTruthy();
      expect(await stageintlpages.firstRow).toBeTruthy();
      expect(await stageintlpages.secondRow).toBeTruthy();
    });
  });
});
