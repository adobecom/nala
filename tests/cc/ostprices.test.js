import { expect, test } from '@playwright/test';
import { features } from '../../features/cc/ostprices.spec.js';
import Ostprices from '../../selectors/cc/ostprices.page.js';

let ost;
test.describe('test Offer selector tool price formats and checkout flows in US & Jp locale pages' , () =>  {
  test.beforeEach(async ({ page }) => {
  ost = new Ostprices(page);
  });

   test(`${features[0].name},${features[0].tags}`, async ({ page, baseURL }) => {
    console.info(`[Test Page]: ${baseURL}${features[0].path}`);
    await test.step('page marquee shows the CC price and CTA US locale', async () => {
    await page.goto(`${baseURL}${features[0].path}`);
    await page.waitForLoadState('domcontentloaded');
    await expect(page).toHaveURL(`${baseURL}${features[0].path}`);
    });
    
  await test.step('Test CC all apps price and UCv3 email checkout, buy button checks in marquee', async () => {
  page.waitForLoadState();
  await expect(await ost.productname).toBeTruthy();
  await expect(ost.uscountrycurrencysymbol).toBeTruthy();
  await expect(ost.price).toBeVisible();
  await expect(ost.checkout_lable).toBeVisible();
  await expect(ost.buynowcta).toBeVisible();
  await expect(ost.pricebeforedelimiter).toBeVisible();
  await page.locator('//a[@daa-ll="Buy now-1|Make Create Amazing"]').click();
  await expect(page).toHaveURL(new RegExp('^https://commerce.adobe.com/store/'));
  });
});

test(`${features[1].name},${features[1].tags}`, async ({ page, baseURL }) => {
  console.info(`[Test Page]: ${baseURL}${features[1].path}`);
  await test.step('page checks with month and year CC subscription, checkout', async () => {
  await page.goto(`${baseURL}${features[1].path}`);
  await page.waitForLoadState('domcontentloaded');
  await expect(page).toHaveURL(`${baseURL}${features[1].path}`);
  });
  
 await test.step('Verify the month and year price display , CTA for UCv3 segment checkout destination', async () => {
 page.waitForLoadState();
 await expect(ost.productname_1).toBeTruthy();
 await expect(ost.uscountrycurrencysymbol).toBeTruthy();
 await expect(ost.cc_pricebeforedelimiter).toBeVisible();
 await expect(ost.cc_priceafterdelimiter).toBeVisible();
 await expect(ost.cc_licensecommitment).toBeVisible();
 await expect(ost.cc_numberoflicenses).toBeVisible();
 await expect(ost.productname_2).toBeTruthy();
 await expect(ost.uscountrycurrencysymbol).toBeTruthy();
 await expect(ost.ps_pricebeforedelimiter).toBeVisible();
 await expect(ost.ps_priceafterdelimiter).toBeVisible();
 await expect(ost.ps_licensecommitment).toBeVisible();
 await expect(ost.ps_numberoflicenses).toBeVisible();
 await page.locator('//a[@daa-ll="Buy now-1|Generative AI.This c"]').click();
 await expect(page).toHaveURL(new RegExp('^https://commerce.adobe.com/store/segmentation'));
});
});

test(`${features[2].name},${features[2].tags}`, async ({ page, baseURL }) => {
  console.info(`[Test Page]: ${baseURL}${features[2].path}`);
  await test.step('Light room STE edition price display with email checkout cta destination', async () => {
  await page.goto(`${baseURL}${features[2].path}`);
  await page.waitForLoadState('domcontentloaded');
  await expect(page).toHaveURL(`${baseURL}${features[2].path}`);
  });
  
 await test.step('step-2: verify LR STU price and email CTA', async () => {
 page.waitForLoadState();
 await expect(ost.STEProductname).toBeTruthy();
 await expect(ost.STEdisc).toBeVisible();
 await expect(ost.uscountrycurrencysymbol).toBeTruthy();
 await expect(ost.STE_LR_price).toBeVisible();
 await page.locator('//a[@daa-ll="Get started-1|Adobe Light room"]').click();
 await expect(page).toHaveURL(new RegExp('^https://commerce.adobe.com/store/email'));
});
});

test(`${features[3].name},${features[3].tags}`, async ({ page, baseURL }) => {
  console.info(`[Test Page]: ${baseURL}${features[3].path}`);
  await test.step('page authored with CC product strike through price', async () => {
  await page.goto(`${baseURL}${features[3].path}`);
  await page.waitForLoadState('domcontentloaded');
  await expect(page).toHaveURL(`${baseURL}${features[3].path}`);
  });
  
 await test.step('step-2: verify CC strike through prices are showup correctly with valid store bundle CTA destination', async () => {
 page.waitForLoadState();
 await expect(ost.producatname_3).toBeVisible();
 await expect(ost.uscountrycurrencysymbol).toBeTruthy();
 await expect(ost.product_discription).toBeVisible();
 await expect(ost.pricelabel_actual).toBeVisible();
 await expect(ost.strikethroughproperty).toBeTruthy();
 await expect(ost.strikethrouthprice).toBeVisible();
 await expect(ost.pricelabel_now).toBeVisible();
 await expect(ost.purchaseCTAbandle).toBeVisible();
 await page.locator('//a[@daa-ll="choose a plan-1|Actual price"]').click();
 await expect(page).toHaveURL(new RegExp('^https://commerce.adobe.com/store/bundle'));
});
});

test(`${features[4].name},${features[4].tags}`, async ({ page, baseURL }) => {
  console.info(`[Test Page]: ${baseURL}${features[4].path}`);
  await test.step('Product - photoshop month, year price with CTAs', async () => {
  await page.goto(`${baseURL}${features[4].path}`);
  await page.waitForLoadState('domcontentloaded');
  await expect(page).toHaveURL(`${baseURL}${features[4].path}`);
  });
  
 await test.step('step-2: Photoshop product month, year price with CTAs', async () => {
 page.waitForLoadState();
 await expect(ost.headingdiscription).toBeTruthy();
 await expect(ost.headingdiscription2).toBeTruthy();
 await expect(ost.firstcardheading).toBeVisible();
 await expect(ost.secondcardheading).toBeVisible();
 await expect(ost.individualPSpricemonth).toBeVisible();
 await expect(ost.individualPSpriceyear).toBeVisible();
 await page.locator('//a[@class="con-button placeholder-resolved"]').first().click();
 await expect(page).toHaveURL(new RegExp('^https://commerce.adobe.com/store/'));
});
});

test(`${features[5].name},${features[5].tags}`, async ({ page, baseURL }) => {
  console.info(`[Test Page]: ${baseURL}${features[5].path}`);
  await test.step('page marquee shows the CC price and CTA for JP', async () => {
  await page.goto(`${baseURL}${features[5].path}`);
  await page.waitForLoadState('domcontentloaded');
  await expect(page).toHaveURL(`${baseURL}${features[5].path}`);
  });
  
 await test.step('Test CC all apps price and UCv3 email checkout, buy button checks in marquee for JP', async () => {
 page.waitForLoadState();
 await expect(ost.productname).toBeVisible();
 await expect(ost.jpcountrycurrencysymbol).toBeVisible();
 await expect(ost.jpproductprice).toBeVisible();
 await page.locator('//a[@daa-ll="Buy now-1|Make Create Amazing"]').click();
 await expect(page).toHaveURL(new RegExp('^https://commerce.adobe.com/store/'));
 await expect(page).toHaveURL(new RegExp('co=JP&lang=ja'));
});
});

test(`${features[6].name},${features[6].tags}`, async ({ page, baseURL }) => {
  console.info(`[Test Page]: ${baseURL}${features[6].path}`);
  await test.step('product with month, year subscriptions in JP', async () => {
  await page.goto(`${baseURL}${features[6].path}`);
  await page.waitForLoadState('domcontentloaded');
  await expect(page).toHaveURL(`${baseURL}${features[6].path}`);
  });
  
 await test.step('JP locale monthly, year subscriptions', async () => {
 page.waitForLoadState();
 await expect(ost.productname_1).toBeVisible();
 await expect(ost.productname_2).toBeVisible();
 await expect(ost.cc_pricemonth_jp).toBeVisible();
 await expect(ost.ps_priceyear_jp).toBeVisible();
 await expect(ost.jpcountrycurrencysymbol).toBeTruthy();
 await page.locator('//a[@daa-ll="Buy now-1|Generative AI.This c"]').click();
 await expect(page).toHaveURL(new RegExp('^https://commerce.adobe.com/store/'));
 await expect(page).toHaveURL(new RegExp('co=JP&lang=ja'));
});
});

test(`${features[7].name},${features[7].tags}`, async ({ page, baseURL }) => {
  console.info(`[Test Page]: ${baseURL}${features[7].path}`);
  await test.step('page has JP STE prices for LR product', async () => {
  await page.goto(`${baseURL}${features[7].path}`);
  await page.waitForLoadState('domcontentloaded');
  await expect(page).toHaveURL(`${baseURL}${features[7].path}`);
  });
  
await test.step('step-2: Verify STE price for Lighthouse in JP currency', async () => {
 page.waitForLoadState();
 await expect(ost.STEProductname).toBeTruthy();
 await expect(ost.STEdisc).toBeVisible();
 await expect(ost.jpcountrycurrencysymbol).toBeTruthy();
 await expect(ost.STE_LR_JP_price).toBeVisible();
 await page.locator('//a[@daa-ll="Get started-1|Adobe Light room"]').click();
 await expect(page).toHaveURL(new RegExp('^https://commerce.adobe.com/store/email'));
 await expect(page).toHaveURL(new RegExp('co=JP&lang=ja'));
});
});

test(`${features[8].name},${features[8].tags}`, async ({ page, baseURL }) => {
  console.info(`[Test Page]: ${baseURL}${features[8].path}`);
  await test.step('product with month, year subscriptions in JP', async () => {
  await page.goto(`${baseURL}${features[8].path}`);
  await page.waitForLoadState('domcontentloaded');
  await expect(page).toHaveURL(`${baseURL}${features[8].path}`);
  });
  
 await test.step('JP locale monthly, year subscriptions', async () => {
 page.waitForLoadState();
 await expect(ost.producatname_3).toBeVisible();
 await expect(ost.jpcountrycurrencysymbol).toBeTruthy();
 await expect(ost.product_discription).toBeVisible();
 await expect(ost.pricelabel_actual).toBeVisible();
 await expect(ost.strikethroughproperty).toBeTruthy();
 await expect(ost.strikethroughprice_jp_1).toBeVisible();
 await expect(ost.pricelabel_now).toBeVisible();
 await expect(ost.purchaseCTAbandle).toBeVisible();
 await page.locator('//a[@daa-ll="choose a plan-1|Actual price"]').click();
 await expect(page).toHaveURL(new RegExp('^https://commerce.adobe.com/store/bundle'));
 await expect(page).toHaveURL(new RegExp('co=JP&lang=ja'));
});
});

test(`${features[9].name},${features[9].tags}`, async ({ page, baseURL }) => {
  console.info(`[Test Page]: ${baseURL}${features[9].path}`);
  await test.step('product with month, year subscriptions in JP', async () => {
  await page.goto(`${baseURL}${features[9].path}`);
  await page.waitForLoadState('domcontentloaded');
  await expect(page).toHaveURL(`${baseURL}${features[9].path}`);
  });
  
 await test.step('JP locale monthly, year subscriptions', async () => {
 page.waitForLoadState();
 await expect(ost.headingdiscription).toBeTruthy();
 await expect(ost.headingdiscription2).toBeTruthy();
 await expect(ost.firstcardheading).toBeVisible();
 await expect(ost.secondcardheading).toBeVisible();
 await expect(ost.individualPSpricemonth_jp).toBeVisible();
 await expect(ost.individualPSpriceyear_jp).toBeVisible();
 await page.locator('//a[@class="con-button placeholder-resolved"]').first().click();
 await expect(page).toHaveURL(new RegExp('^https://commerce.adobe.com/store/'));
 await expect(page).toHaveURL(new RegExp('co=JP&lang=ja'));
  });
});
});
