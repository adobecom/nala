import { test, expect } from '@playwright/test';
import { features } from '../../features/feds/prodSanity/dcpagessanity.spec.js';
import DCSanity from '../../selectors/feds/feds.documentcloudsanity.page.js';

let dcsanity;
test.describe('DC production pages Gnav sanity', () => {
  test.beforeEach(async ({ page }) => {
    dcsanity = new DCSanity(page);
  });

  test(`${features[0].name}, ${features[0].tags}, ${features[0].country}`, async ({ page, baseURL }) => {
    console.info(`[FEDSInfo] Checking Page: ${baseURL}${features[0].path}`);
    const pageURL = `${baseURL}${features[0].path}`;
    await page.goto(pageURL, { waitUntil: 'domcontentloaded' });
    await expect(page).toHaveURL(pageURL);
    // await dcsanity.CloseGeoModel();
    await dcsanity.ValidateGnav();
  });

  test(`${features[1].name}, ${features[1].tags}, ${features[1].country}`, async ({ page, baseURL }) => {
    console.info(`[FEDSInfo] Checking Page: ${baseURL}${features[1].path}`);
    const pageURL = `${baseURL}${features[1].path}`;
    await page.goto(pageURL, { waitUntil: 'domcontentloaded' });
    await expect(page).toHaveURL(pageURL);
    // await dcsanity.CloseGeoModel();
    await dcsanity.ValidateGnav();
  });

  test(`${features[2].name}, ${features[2].tags}, ${features[2].country}`, async ({ page, baseURL }) => {
    console.info(`[FEDSInfo] Checking Page: ${baseURL}${features[2].path}`);
    const pageURL = `${baseURL}${features[2].path}`;
    await page.goto(pageURL, { waitUntil: 'domcontentloaded' });
    await expect(page).toHaveURL(pageURL);
    await dcsanity.CloseGeoModel();
    await dcsanity.ValidateGnav();
  });

  test(`${features[3].name}, ${features[3].tags}, ${features[3].country}`, async ({ page, baseURL }) => {
    console.info(`[FEDSInfo] Checking Page: ${baseURL}${features[3].path}`);
    const pageURL = `${baseURL}${features[3].path}`;
    await page.goto(pageURL, { waitUntil: 'domcontentloaded' });
    await expect(page).toHaveURL(pageURL);
    await dcsanity.CloseGeoModel();
    await dcsanity.ValidateGnav();
  });

  test(`${features[4].name}, ${features[4].tags}, ${features[4].country}`, async ({ page, baseURL }) => {
    console.info(`[FEDSInfo] Checking Page: ${baseURL}${features[4].path}`);
    const pageURL = `${baseURL}${features[4].path}`;
    await page.goto(pageURL, { waitUntil: 'domcontentloaded' });
    await expect(page).toHaveURL(pageURL);
    await dcsanity.CloseGeoModel();
    await dcsanity.ValidateGnav();
  });

  test(`${features[5].name}, ${features[5].tags}, ${features[5].country}`, async ({ page, baseURL }) => {
    console.info(`[FEDSInfo] Checking Page: ${baseURL}${features[5].path}`);
    const pageURL = `${baseURL}${features[5].path}`;
    await page.goto(pageURL, { waitUntil: 'domcontentloaded' });
    await expect(page).toHaveURL(pageURL);
    await dcsanity.CloseGeoModel();
    await dcsanity.ValidateGnav();
  });

  test(`${features[6].name}, ${features[6].tags}, ${features[6].country}`, async ({ page, baseURL }) => {
    console.info(`[FEDSInfo] Checking Page: ${baseURL}${features[6].path}`);
    const pageURL = `${baseURL}${features[6].path}`;
    await page.goto(pageURL, { waitUntil: 'domcontentloaded' });
    await expect(page).toHaveURL(pageURL);
    await dcsanity.CloseGeoModel();
    await dcsanity.ValidateGnav();
  });

  test(`${features[7].name}, ${features[7].tags}, ${features[7].country}`, async ({ page, baseURL }) => {
    console.info(`[FEDSInfo] Checking Page: ${baseURL}${features[7].path}`);
    const pageURL = `${baseURL}${features[7].path}`;
    await page.goto(pageURL, { waitUntil: 'domcontentloaded' });
    await expect(page).toHaveURL(pageURL);
    await dcsanity.CloseGeoModel();
    await dcsanity.ValidateGnav();
  });

  test(`${features[8].name}, ${features[8].tags}, ${features[8].country}`, async ({ page, baseURL }) => {
    console.info(`[FEDSInfo] Checking Page: ${baseURL}${features[8].path}`);
    const pageURL = `${baseURL}${features[8].path}`;
    await page.goto(pageURL, { waitUntil: 'domcontentloaded' });
    await expect(page).toHaveURL(pageURL);
    await dcsanity.CloseGeoModel();
    await dcsanity.ValidateGnav();
  });

  test(`${features[9].name}, ${features[9].tags}, ${features[9].country}`, async ({ page, baseURL }) => {
    console.info(`[FEDSInfo] Checking Page: ${baseURL}${features[9].path}`);
    const pageURL = `${baseURL}${features[9].path}`;
    await page.goto(pageURL, { waitUntil: 'domcontentloaded' });
    await expect(page).toHaveURL(pageURL);
    await dcsanity.CloseGeoModel();
    await dcsanity.ValidateGnav();
  });

  test(`${features[10].name}, ${features[10].tags}, ${features[10].country}`, async ({ page, baseURL }) => {
    console.info(`[FEDSInfo] Checking Page: ${baseURL}${features[10].path}`);
    const pageURL = `${baseURL}${features[10].path}`;
    await page.goto(pageURL, { waitUntil: 'domcontentloaded' });
    await expect(page).toHaveURL(pageURL);
    await dcsanity.CloseGeoModel();
    await dcsanity.ValidateGnav();
  });

  test(`${features[11].name}, ${features[11].tags}, ${features[11].country}`, async ({ page, baseURL }) => {
    console.info(`[FEDSInfo] Checking Page: ${baseURL}${features[11].path}`);
    const pageURL = `${baseURL}${features[11].path}`;
    await page.goto(pageURL, { waitUntil: 'domcontentloaded' });
    await expect(page).toHaveURL(pageURL);
    await dcsanity.CloseGeoModel();
    await dcsanity.ValidateGnav();
  });

  test(`${features[12].name}, ${features[12].tags}, ${features[12].country}`, async ({ page, baseURL }) => {
    console.info(`[FEDSInfo] Checking Page: ${baseURL}${features[12].path}`);
    const pageURL = `${baseURL}${features[12].path}`;
    await page.goto(pageURL, { waitUntil: 'domcontentloaded' });
    await expect(page).toHaveURL(pageURL);
    await dcsanity.CloseGeoModel();
    await dcsanity.ValidateGnav();
  });

  test(`${features[13].name}, ${features[13].tags}, ${features[13].country}`, async ({ page, baseURL }) => {
    console.info(`[FEDSInfo] Checking Page: ${baseURL}${features[13].path}`);
    const pageURL = `${baseURL}${features[13].path}`;
    await page.goto(pageURL, { waitUntil: 'domcontentloaded' });
    await expect(page).toHaveURL(pageURL);
    await dcsanity.CloseGeoModel();
    await dcsanity.ValidateGnav();
  });

  test(`${features[14].name}, ${features[14].tags}, ${features[14].country}`, async ({ page, baseURL }) => {
    console.info(`[FEDSInfo] Checking Page: ${baseURL}${features[14].path}`);
    const pageURL = `${baseURL}${features[14].path}`;
    await page.goto(pageURL, { waitUntil: 'domcontentloaded' });
    await expect(page).toHaveURL(pageURL);
    await dcsanity.CloseGeoModel();
    await dcsanity.ValidateGnav();
  });

  test(`${features[15].name}, ${features[15].tags}, ${features[15].country}`, async ({ page, baseURL }) => {
    console.info(`[FEDSInfo] Checking Page: ${baseURL}${features[15].path}`);
    const pageURL = `${baseURL}${features[15].path}`;
    await page.goto(pageURL, { waitUntil: 'domcontentloaded' });
    await expect(page).toHaveURL(pageURL);
    await dcsanity.CloseGeoModel();
    await dcsanity.ValidateGnav();
  });

  test(`${features[16].name}, ${features[16].tags}, ${features[16].country}`, async ({ page, baseURL }) => {
    console.info(`[FEDSInfo] Checking Page: ${baseURL}${features[16].path}`);
    const pageURL = `${baseURL}${features[16].path}`;
    await page.goto(pageURL, { waitUntil: 'domcontentloaded' });
    await expect(page).toHaveURL(pageURL);
    await dcsanity.CloseGeoModel();
    await dcsanity.ValidateGnav();
  });

  test(`${features[17].name}, ${features[17].tags}, ${features[17].country}`, async ({ page, baseURL }) => {
    console.info(`[FEDSInfo] Checking Page: ${baseURL}${features[17].path}`);
    const pageURL = `${baseURL}${features[17].path}`;
    await page.goto(pageURL, { waitUntil: 'domcontentloaded' });
    await expect(page).toHaveURL(pageURL);
    await dcsanity.CloseGeoModel();
    await dcsanity.ValidateGnav();
  });

  test(`${features[18].name}, ${features[18].tags}, ${features[18].country}`, async ({ page, baseURL }) => {
    console.info(`[FEDSInfo] Checking Page: ${baseURL}${features[18].path}`);
    const pageURL = `${baseURL}${features[18].path}`;
    await page.goto(pageURL, { waitUntil: 'domcontentloaded' });
    await expect(page).toHaveURL(pageURL);
    await dcsanity.CloseGeoModel();
    await dcsanity.ValidateGnav();
  });

  test(`${features[19].name}, ${features[19].tags}, ${features[19].country}`, async ({ page, baseURL }) => {
    console.info(`[FEDSInfo] Checking Page: ${baseURL}${features[19].path}`);
    const pageURL = `${baseURL}${features[19].path}`;
    await page.goto(pageURL, { waitUntil: 'domcontentloaded' });
    await expect(page).toHaveURL(pageURL);
    await dcsanity.CloseGeoModel();
    await dcsanity.ValidateGnav();
  });

  test(`${features[20].name}, ${features[20].tags}, ${features[20].country}`, async ({ page, baseURL }) => {
    console.info(`[FEDSInfo] Checking Page: ${baseURL}${features[20].path}`);
    const pageURL = `${baseURL}${features[20].path}`;
    await page.goto(pageURL, { waitUntil: 'domcontentloaded' });
    await expect(page).toHaveURL(pageURL);
    // await dcsanity.CloseGeoModel();
    await dcsanity.ValidateGnav();
  });

  test(`${features[21].name}, ${features[21].tags}, ${features[21].country}`, async ({ page, baseURL }) => {
    console.info(`[FEDSInfo] Checking Page: ${baseURL}${features[21].path}`);
    const pageURL = `${baseURL}${features[21].path}`;
    await page.goto(pageURL, { waitUntil: 'domcontentloaded' });
    await expect(page).toHaveURL(pageURL);
    await dcsanity.CloseGeoModel();
    await dcsanity.ValidateGnav();
  });

  test(`${features[22].name}, ${features[22].tags}, ${features[22].country}`, async ({ page, baseURL }) => {
    console.info(`[FEDSInfo] Checking Page: ${baseURL}${features[22].path}`);
    const pageURL = `${baseURL}${features[22].path}`;
    await page.goto(pageURL, { waitUntil: 'domcontentloaded' });
    await expect(page).toHaveURL(pageURL);
    await dcsanity.CloseGeoModel();
    await dcsanity.ValidateGnav();
  });
});
