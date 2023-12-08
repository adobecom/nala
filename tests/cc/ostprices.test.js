import { expect, test } from '@playwright/test';
import { features } from '../../features/cc/ostprices.spec.js';
import Ostprices from '../../selectors/cc/ostprices.page.js';

let ost;
test.describe('test Offer selector tool price formats and checkout flows in US & Jp locale pages' , () =>  {
  test.beforeEach(async ({ page }) => {
  ost = new Ostprices(page);
  });

  // Test 0 : OST Currency Format price buy emailcta
  test(`${features[0].name},${features[0].tags}`, async ({ page, baseURL }) => {
    console.info(`[Test Page]: ${baseURL}${features[0].path}`);

    await test.step('step-1: page marquee shows the CC price and CTA US locale', async () => {
      await page.goto(`${baseURL}${features[0].path}`);
      await page.waitForLoadState('domcontentloaded');
      await expect(page).toHaveURL(`${baseURL}${features[0].path}`);
    });
    
    await test.step('step-2: Test CC all apps price and UCv3 email checkout, buy button checks in marquee', async () => {
      await page.waitForLoadState();
      
      expect(await ost.productName).toBeTruthy();
      expect(await ost.usCurrencySymbol).toBeTruthy();

      await expect(await ost.price).toBeVisible();
      await expect(await ost.emailBuynowCta).toBeVisible();
      await expect(await ost.priceBeforeDelimiter).toBeVisible();
  
      // click 'Buy now' (ucv3 checkout) button and verify the checkout page.
      await ost.emailBuynowCta.click()
      await page.waitForTimeout(1000);  
      await expect(page).toHaveURL(new RegExp('^https://commerce.adobe.com/store/'));
    });
  });

  // Test 1 : OST CC all apps price buy segment cta
 test(`${features[1].name},${features[1].tags}`, async ({ page, baseURL }) => {
   console.info(`[Test Page]: ${baseURL}${features[1].path}`);

   await test.step('step-1: page checks with month and year CC subscription, checkout', async () => {
    await page.goto(`${baseURL}${features[1].path}`);
    await page.waitForLoadState('domcontentloaded');
    await expect(page).toHaveURL(`${baseURL}${features[1].path}`);
  });
  
  await test.step('step-2: Verify the month and year price display , CTA for UCv3 segment checkout destination', async () => {
   await page.waitForLoadState();
   expect(ost.productName1).toBeTruthy();
   expect(ost.usCurrencySymbol).toBeTruthy();

   await expect(ost.ccPriceBeforeDelimiter).toBeVisible();
   await expect(ost.ccPriceAfterDelimiter).toBeVisible();
   await expect(ost.ccLicenseCommitment).toBeVisible();
   await expect(ost.ccNumberOfLicenses).toBeVisible();

   await expect(ost.productName2).toBeTruthy();
   await expect(ost.usCurrencySymbol).toBeTruthy();

   await expect(ost.psPriceBeforeDelimiter).toBeVisible();
   await expect(ost.psPriceAfterDelimiter).toBeVisible();
   await expect(ost.psLicenseCommitment).toBeVisible();
   await expect(ost.psNumberOfLicenses).toBeVisible();
  
   // click 'Buy now' (ucv3 checkout, checkout workflow = email ) button and verify the checkout page.   
   await ost.segmentationBuynowCta.click() 
   await page.waitForTimeout(1000);   
   await expect(page).toHaveURL(new RegExp('^https://commerce.adobe.com/store/segmentation'));
  });
});

  // Test 2 : OST student price buy cta
 test(`${features[2].name},${features[2].tags}`, async ({ page, baseURL }) => {
   console.info(`[Test Page]: ${baseURL}${features[2].path}`);

   await test.step('step-1: Light room STE edition price display with email checkout cta destination', async () => {
     await page.goto(`${baseURL}${features[2].path}`);
     await page.waitForLoadState('domcontentloaded');
     await expect(page).toHaveURL(`${baseURL}${features[2].path}`);
  });
  
  await test.step('step-2: verify LR STU price and email CTA', async () => {
   await page.waitForLoadState();
   await expect(ost.SteProductName).toBeTruthy();
   await expect(ost.usCurrencySymbol).toBeTruthy();
   await expect(ost.SteLrPrice).toBeVisible();

   await ost.emailBuynowCta.click();
   await page.waitForTimeout(1000);
   await expect(page).toHaveURL(new RegExp('^https://commerce.adobe.com/store/email'));
  });
});

 // Test 3 : OST strike-through price buy cta
 test(`${features[3].name},${features[3].tags}`, async ({ page, baseURL }) => {
   console.info(`[Test Page]: ${baseURL}${features[3].path}`);

   await test.step('step-1: page authored with CC product strike through price', async () => {
     await page.goto(`${baseURL}${features[3].path}`);
     await page.waitForLoadState('domcontentloaded');
     await expect(page).toHaveURL(`${baseURL}${features[3].path}`);
  });
  
  await test.step('step-2: verify CC strike through prices are showup correctly with valid store bundle CTA destination', async () => {
   await page.waitForLoadState();
   await expect(ost.productName3).toBeVisible();
   await expect(ost.usCurrencySymbol).toBeTruthy();
   await expect(ost.priceLabelActual).toBeVisible();
   await expect(ost.strikeThroughProperty).toBeTruthy();
   await expect(ost.strikeThroughPrice).toBeVisible();
   await expect(ost.priceLabelNow).toBeVisible();

   // click 'Choose a plan' (ucv3 checkout, checkout workflow = bundle ) button and verify the checkout page.   
   await expect(ost.bundleBuynowCta).toBeVisible();
   await ost.bundleBuynowCta.click();
   await page.waitForTimeout(1000);
   await expect(page).toHaveURL(new RegExp('^https://commerce.adobe.com/store/'));
 });
});

 // Test 4 : OST month-year-prices buy cta
 test(`${features[4].name},${features[4].tags}`, async ({ page, baseURL }) => {
   console.info(`[Test Page]: ${baseURL}${features[4].path}`);

   await test.step('step-1: Product - photoshop month, year price with CTAs', async () => {
     await page.goto(`${baseURL}${features[4].path}`);
     await page.waitForLoadState('domcontentloaded');
     await expect(page).toHaveURL(`${baseURL}${features[4].path}`);
  });
  
  await test.step('step-2: Photoshop product month, year price with CTAs', async () => {
   await page.waitForLoadState();
   await expect(ost.headingDiscription).toBeTruthy();
   await expect(ost.headingDiscription2).toBeTruthy();
   await expect(ost.firstCardHeading).toBeVisible();
   await expect(ost.individualPsPriceMonth).toBeVisible();
   await expect(ost.individualPsPriceYear).toBeVisible();

   await ost.emailBuynowCta.click();
   await page.waitForTimeout(1000);
   await expect(page).toHaveURL(new RegExp('^https://commerce.adobe.com/store/'));
  });
});

 // Test 5 : OST JP currency format-price buy email cta
 test(`${features[5].name},${features[5].tags}`, async ({ page, baseURL }) => {
   console.info(`[Test Page]: ${baseURL}${features[5].path}`);

   await test.step('step-1: page marquee shows the CC price and CTA for JP', async () => {
     await page.goto(`${baseURL}${features[5].path}`);
     await page.waitForLoadState('domcontentloaded');
     await expect(page).toHaveURL(`${baseURL}${features[5].path}`);
  });
  
  await test.step('step-2: Test CC all apps price and UCv3 email checkout, buy button checks in marquee for JP', async () => {
   await page.waitForLoadState();
   await expect(ost.productName).toBeVisible();
   await expect(ost.jpCurrencySymbol).toBeVisible();
   await expect(ost.jpProductPrice).toBeVisible();

   // click 'Buy now' (ucv3 checkout, checkout workflow = email ) button and verify the checkout page.   
   await expect(ost.emailBuynowCta).toBeVisible();
   await ost.emailBuynowCta.click();
   await page.waitForTimeout(1000);
   await expect(page).toHaveURL(new RegExp('^https://commerce.adobe.com/store/'));
   await expect(page).toHaveURL(new RegExp('co=JP&lang=ja'));
  });
});

 // Test 6 : OST JP currency format-price buy email cta
 test(`${features[6].name},${features[6].tags}`, async ({ page, baseURL }) => {
   console.info(`[Test Page]: ${baseURL}${features[6].path}`);

   await test.step('step-1: product with month, year subscriptions in JP', async () => {
     await page.goto(`${baseURL}${features[6].path}`);
     await page.waitForLoadState('domcontentloaded');
     await expect(page).toHaveURL(`${baseURL}${features[6].path}`);
  });
  
  await test.step('step-2: JP locale monthly, year subscriptions', async () => {
   await page.waitForLoadState();
   await expect(ost.productName1).toBeVisible();
   await expect(ost.productName2).toBeVisible();
   await expect(ost.cc_pricemonth_jp).toBeVisible();
   await expect(ost.ps_priceyear_jp).toBeVisible();
   await expect(ost.jpCurrencySymbol).toBeTruthy();


   // click 'Buy now' (ucv3 checkout, checkout workflow = segmentation ) button and verify the checkout page.   
   await expect(ost.segmentationBuynowCta).toBeVisible();
   await ost.segmentationBuynowCta.click();
   await page.waitForTimeout(1000);
   await expect(page).toHaveURL(new RegExp('^https://commerce.adobe.com/store/'));
   await expect(page).toHaveURL(new RegExp('co=JP&lang=ja'));
  });
});

 // Test 7 : OST JP CC all apps price buy segment cta
 test(`${features[7].name},${features[7].tags}`, async ({ page, baseURL }) => {
   console.info(`[Test Page]: ${baseURL}${features[7].path}`);

   await test.step('step-1: page has JP STE prices for LR product', async () => {
     await page.goto(`${baseURL}${features[7].path}`);
     await page.waitForLoadState('domcontentloaded');
     await expect(page).toHaveURL(`${baseURL}${features[7].path}`);
  });
  
  await test.step('step-2: Verify STE price for Lighthouse in JP currency', async () => {
   await page.waitForLoadState();
   await expect(ost.SteProductName).toBeTruthy();
   await expect(ost.jpCurrencySymbol).toBeTruthy();
   await expect(ost.SteLrJpPrice).toBeVisible();

  // click 'Get started' (ucv3 checkout, checkout workflow = email ) button and verify the checkout page.   
   await expect(ost.emailBuynowCta).toBeVisible();
   await ost.emailBuynowCta.click();
   await page.waitForTimeout(1000);
   await expect(page).toHaveURL(new RegExp('^https://commerce.adobe.com/store/email'));
   await expect(page).toHaveURL(new RegExp('co=JP&lang=ja'));
  });
});

 // Test 8 : OST JP CC student-price buy cta
 test(`${features[8].name},${features[8].tags}`, async ({ page, baseURL }) => {
  console.info(`[Test Page]: ${baseURL}${features[8].path}`);

  await test.step('step-1: product with month, year subscriptions in JP', async () => {
     await page.goto(`${baseURL}${features[8].path}`);
     await page.waitForLoadState('domcontentloaded');
     await expect(page).toHaveURL(`${baseURL}${features[8].path}`);
  });
  
  await test.step('step-2: JP locale monthly, year subscriptions', async () => {
   await page.waitForLoadState();
   await expect(ost.productName3).toBeVisible();
   await expect(ost.jpCurrencySymbol).toBeTruthy();
   await expect(ost.priceLabelActual).toBeVisible();
   await expect(ost.strikeThroughProperty).toBeTruthy();
   await expect(ost.strikeThroughPriceJp1).toBeVisible();
   await expect(ost.priceLabelNow).toBeVisible();

  // click 'Choose a plan' (ucv3 checkout, checkout workflow = bundle ) button and verify the checkout page.   
   await expect(ost.bundleBuynowCta).toBeVisible();
   await ost.bundleBuynowCta.click();
   await page.waitForTimeout(1000);
   await expect(page).toHaveURL(new RegExp('^https://commerce.adobe.com/store/bundle'));
   await expect(page).toHaveURL(new RegExp('co=JP&lang=ja'));
  });
});

 // Test 9 : OST JP CC student-price buy cta
 test(`${features[9].name},${features[9].tags}`, async ({ page, baseURL }) => {
  console.info(`[Test Page]: ${baseURL}${features[9].path}`);

  await test.step('step-1: product with month, year subscriptions in JP', async () => {
   await page.goto(`${baseURL}${features[9].path}`);
   await page.waitForLoadState('domcontentloaded');
   await expect(page).toHaveURL(`${baseURL}${features[9].path}`);
  });
  
  await test.step('step-2: JP locale monthly, year subscriptions', async () => {
   await page.waitForLoadState();
   await expect(ost.headingDiscription).toBeTruthy();
   await expect(ost.headingDiscription2).toBeTruthy();
   await expect(ost.firstCardHeading).toBeVisible();
   await expect(ost.individualPsPriceMonthJP).toBeVisible();
   await expect(ost.individualPsPriceYearJP).toBeVisible();

   await expect(ost.emailBuynowCta).toBeVisible();
   await ost.emailBuynowCta.click();
   await page.waitForTimeout(1000);
   await expect(page).toHaveURL(new RegExp('^https://commerce.adobe.com/store/'));
   await expect(page).toHaveURL(new RegExp('co=JP&lang=ja'));
  });
});
});
