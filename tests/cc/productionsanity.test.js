import { expect, test } from '@playwright/test';
import { features } from '../../features/cc/productionsanity.spec.js';
import Prodsanity from '../../selectors/cc/productionsanity.page.js';

let prodsanity;
test.describe('verify Key product pages and features on Production pages', () => {
  test.beforeEach(async ({ page }) => {
    prodsanity = new Prodsanity(page);
  });
  // Test creative cloud page sanity
  test(`${features[0].name},${features[0].tags}`, async ({ page, baseURL }) => {
    console.info(`[Test Page]: ${baseURL}${features[0].path}`);
    await test.step('CC page sanity checks', async () => {
      await page.goto(`${baseURL}${features[0].path}`);
      await page.waitForLoadState('domcontentloaded');
      await expect(page).toHaveURL(`${baseURL}${features[0].path}`);
    });
    await test.step('creativecloud page gnav, marquee cta, price pod checks', async () => {
      await page.waitForLoadState();
      expect(await prodsanity.Gnav).toBeTruthy();
      expect(await prodsanity.fedsNav).toBeTruthy();
      expect(await prodsanity.signIn).toBeTruthy();
      expect(await prodsanity.jarvisFeature).toBeTruthy();
      expect(await prodsanity.plansPriceingCTA).toBeTruthy();
      await prodsanity.plansPriceingCTA.click();
      expect(await prodsanity.pricePods).toBeTruthy();
      expect(await prodsanity.ccAllAppsPrice).toBeTruthy();
      expect(await prodsanity.ccPhotographyPrice).toBeTruthy();
      expect(await prodsanity.buyNowCTA).toBeTruthy();
      await prodsanity.buyNowCTA.click();
      await page.waitForTimeout(1000);
      await expect(page).toHaveURL(/^https:\/\/commerce.adobe.com\/store\/commitment/);
    });
  });
  // Test creative after effects products page sanity
  test(`${features[1].name},${features[1].tags}`, async ({ page, baseURL }) => {
    console.info(`[Test Page]: ${baseURL}${features[1].path}`);
    const expectedUrl = features[1].url;
    await test.step('after effects products page sanity check', async () => {
      await page.goto(`${baseURL}${features[1].path}`);
      await page.waitForLoadState('domcontentloaded');
      await expect(page).toHaveURL(`${baseURL}${features[1].path}`);
    });
    await test.step('After Effects product page sanity', async () => {
      await page.waitForLoadState();
      expect(await prodsanity.Gnav).toBeTruthy();
      expect(await prodsanity.localNav).toBeTruthy();
      expect(await prodsanity.magaMenuItems).toBeTruthy();
      expect(await prodsanity.localNavActiveItem).toBeTruthy();
      expect(await prodsanity.afterEffectProductPriceInMarquee).toBeTruthy();
      expect(await prodsanity.buyNowAECTA).toBeTruthy();
      await prodsanity.buyNowAECTA.click();
      await page.waitForTimeout(1000);
      await expect(page).toHaveURL(expectedUrl);
    });
  });
  // creative cloud pricing page elements checks
  test(`${features[2].name},${features[2].tags}`, async ({ page, baseURL }) => {
    console.info(`[Test Page]: ${baseURL}${features[2].path}`);
    await test.step('creative cloud pricing page elements checks', async () => {
      await page.goto(`${baseURL}${features[2].path}`);
      await page.waitForLoadState('domcontentloaded');
      await expect(page).toHaveURL(`${baseURL}${features[2].path}`);
    });
    await test.step('creative cloud pricing page elements checks sanity', async () => {
      await page.waitForLoadState();
      expect(await prodsanity.Gnav).toBeTruthy();
      expect(await prodsanity.universalNav).toBeTruthy();
      expect(await prodsanity.startFreeTrialCTA).toBeTruthy();
      expect(await prodsanity.tabSection).toBeTruthy();
    });
  });
  // Illustrator page sanity checks
  test(`${features[3].name},${features[3].tags}`, async ({ page, baseURL }) => {
    console.info(`[Test Page]: ${baseURL}${features[3].path}`);
    const expectedUrl = features[3].url;
    await test.step('Illustrator page elements checks', async () => {
      await page.goto(`${baseURL}${features[3].path}`);
      await page.waitForLoadState('domcontentloaded');
      await expect(page).toHaveURL(`${baseURL}${features[3].path}`);
    });
    await test.step('Illustrator page sanity checks', async () => {
      await page.waitForLoadState();
      expect(await prodsanity.Gnav).toBeTruthy();
      expect(await prodsanity.appSwitcher).toBeTruthy();
      expect(await prodsanity.breadCrumb).toBeTruthy();
      expect(await prodsanity.freeTrialCTA).toBeTruthy();
      await prodsanity.freeTrialCTA.click();
      await expect(page).toHaveURL(expectedUrl);
    });
  });
  // CCT milo pages sanity checks
  test(`${features[4].name},${features[4].tags}`, async ({ page, baseURL }) => {
    console.info(`[Test Page]: ${baseURL}${features[4].path}`);
    const expectedUrl = features[4].url;
    await test.step('CCT milo pages elements checks', async () => {
      await page.goto(`${baseURL}${features[4].path}`);
      await page.waitForLoadState('domcontentloaded');
      await expect(page).toHaveURL(`${baseURL}${features[4].path}`);
    });
    await test.step('CCT milo pages sanity checks', async () => {
      await page.waitForLoadState();
      expect(await prodsanity.Gnav).toBeTruthy();
      expect(await prodsanity.CCBusinessGnavLink).toBeTruthy();
      expect(await prodsanity.CCTBuynowCTA).toBeTruthy();
      expect(await prodsanity.supportContact).toBeTruthy();
      expect(await prodsanity.CCTeamsSingleAppPrice).toBeTruthy();
      expect(await prodsanity.jarvisFeature).toBeTruthy();
      await prodsanity.CCTBuynowCTA.click();
      await page.waitForTimeout(1000);
      await expect(page).toHaveURL(expectedUrl);
    });
  });
  // CC Model with price segments
  test(`${features[5].name},${features[5].tags}`, async ({ page, baseURL }) => {
    console.info(`[Test Page]: ${baseURL}${features[5].path}`);
    await test.step('CC Model with price segments', async () => {
      await page.goto(`${baseURL}${features[5].path}`);
      await page.waitForLoadState('domcontentloaded');
      await expect(page).toHaveURL(`${baseURL}${features[5].path}`);
    });
    await test.step('CC Model with price segments sanity check', async () => {
      await page.waitForLoadState();
      expect(await prodsanity.modelNavList).toBeTruthy();
      expect(await prodsanity.individualPlanTab).toBeTruthy();
      expect(await prodsanity.businessPlanTab).toBeTruthy();
      expect(await prodsanity.studentAndTeacherTab).toBeTruthy();
      expect(await prodsanity.IndividualPlanProduct1).toBeTruthy();
      expect(await prodsanity.IndividualPlanProduct2).toBeTruthy();
      expect(await prodsanity.IndividualPlanProduct1Price).toBeTruthy();
      expect(await prodsanity.IndividualPlanProduct2Price).toBeTruthy();
      expect(await prodsanity.subscriptionModelPanel).toBeTruthy();
      expect(await prodsanity.panelSubScriptionPick1).toBeTruthy();
      expect(await prodsanity.panelSubScriptionPick2).toBeTruthy();
      expect(await prodsanity.purchaseCTA).toBeTruthy();
    });
  });
  // CC UK animation discorvery page sanity
  test(`${features[6].name},${features[6].tags}`, async ({ page, baseURL }) => {
    console.info(`[Test Page]: ${baseURL}${features[6].path}`);
    const expectedUrl = features[6].url;
    await test.step('CC UK animation discorvery page sanity ', async () => {
      await page.goto(`${baseURL}${features[6].path}`);
      await page.waitForLoadState('domcontentloaded');
      await expect(page).toHaveURL(`${baseURL}${features[6].path}`);
    });
    await test.step('CC UK animation discorvery page sanity check', async () => {
      await page.waitForLoadState();
      expect(await prodsanity.Gnav).toBeTruthy();
      expect(await prodsanity.UKGnavPriceCTA).toBeTruthy();
      expect(await prodsanity.breadCrumbUKAnimationLink).toBeTruthy();
      expect(await prodsanity.jarvisFeature).toBeTruthy();
      expect(await prodsanity.LearnMoreLink).toBeTruthy();
      await prodsanity.LearnMoreLink.click();
      await page.waitForTimeout(1000);
      await expect(page).toHaveURL(expectedUrl);
    });
  });
  // CC DE tools page sanity
  test(`${features[7].name},${features[7].tags}`, async ({ page, baseURL }) => {
    console.info(`[Test Page]: ${baseURL}${features[7].path}`);
    const expectedUrl = features[7].url;
    await test.step('CC DE tools page sanity ', async () => {
      await page.goto(`${baseURL}${features[7].path}`);
      await page.waitForLoadState('domcontentloaded');
      await expect(page).toHaveURL(`${baseURL}${features[7].path}`);
    });
    await test.step('CC DE tools page sanity check', async () => {
      await page.waitForLoadState();
      expect(await prodsanity.Gnav).toBeTruthy();
      expect(await prodsanity.DEGnavPriceCTA).toBeTruthy();
      expect(await prodsanity.ExpandableGnavMenuItems).toBeTruthy();
      expect(await prodsanity.jarvisFeature).toBeTruthy();
      expect(await prodsanity.NavLocalizaedItems1).toBeTruthy();
      expect(await prodsanity.consonantCards).toBeTruthy();
      await prodsanity.DEGnavPriceCTA.click();
      await page.waitForTimeout(1000);
      await expect(page).toHaveURL(expectedUrl);
    });
  });
  // CC JP file types page sanity
  test(`${features[8].name},${features[8].tags}`, async ({ page, baseURL }) => {
    console.info(`[Test Page]: ${baseURL}${features[8].path}`);
    const expectedUrl = features[8].url;
    await test.step('CC JP file types page sanity', async () => {
      await page.goto(`${baseURL}${features[8].path}`);
      await page.waitForLoadState('domcontentloaded');
      await expect(page).toHaveURL(`${baseURL}${features[8].path}`);
    });
    await test.step('CC JP file types page sanity check', async () => {
      await page.waitForLoadState();
      expect(await prodsanity.Gnav).toBeTruthy();
      expect(await prodsanity.JPGnavPriceCTA).toBeTruthy();
      expect(await prodsanity.JPExpandableMegaMenu).toBeTruthy();
      expect(await prodsanity.jarvisFeature).toBeTruthy();
      expect(await prodsanity.LocalizedNavLinks).toBeTruthy();
      expect(await prodsanity.CCJPAllAppsPrice).toBeTruthy();
      expect(await prodsanity.checkOutLink).toBeTruthy();
      await prodsanity.JPGnavPriceCTA.click();
      await page.waitForTimeout(1000);
      await expect(page).toHaveURL(expectedUrl);
    });
  });
  // CC FR animation discover page sanity
  test(`${features[9].name},${features[9].tags}`, async ({ page, baseURL }) => {
    console.info(`[Test Page]: ${baseURL}${features[9].path}`);
    const expectedUrl = features[9].marqueelink;
    await test.step('CC FR animation discover page sanity', async () => {
      await page.goto(`${baseURL}${features[9].path}`);
      await page.waitForLoadState('domcontentloaded');
      await expect(page).toHaveURL(`${baseURL}${features[9].path}`);
    });
    await test.step('CC FR animation discover page sanity check', async () => {
      await page.waitForLoadState();
      expect(await prodsanity.Gnav).toBeTruthy();
      expect(await prodsanity.FRLocalizedNavLinks).toBeTruthy();
      expect(await prodsanity.jarvisFeature).toBeTruthy();
      expect(await prodsanity.marqueeCTAFR).toBeTruthy();
      await prodsanity.marqueeCTAFR.click();
      await page.waitForTimeout(1000);
      await expect(page).toHaveURL(expectedUrl);
    });
  });
});
