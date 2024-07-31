import { test, expect } from '@playwright/test';
import { features } from '../../features/feds/prodSanity/tabiPadTesting/tabCreativeCloudUnavSanity.spec.js';
import CreativeCloudUnavSanity from '../../selectors/feds/feds.creativeCloudUnavSanity.page.js';

test.describe('Test Suite for Creative Cloud Page Components', () => {
  let creative;

  test.beforeEach(async ({ page }) => {
    creative = new CreativeCloudUnavSanity(page);
  });

  test.afterEach(async ({ page }) => {
    await page.close();
  });

  test(`${features[0].name}, ${features[0].tags}, ${features[0].country}`, async ({ page, baseURL }) => {
    console.info(`[Creative Cloud] Checking Page: United States = ${baseURL}${features[0].path}`);

    const pageURL = `${baseURL}${features[0].path}`;
    await page.goto(pageURL, { waitUntil: 'networkidle' });
    await expect(page).toHaveURL(pageURL);

    await creative.validatingGnav(features[0].country);
    await creative.validatingCreativityAndDesignTabiPad(features[0].country);
    await creative.validatingExplore(features[0].country);
    await creative.validatingLearnAndSupport();
    await creative.closingPromoButton();
    await creative.validatingFooter(features[0].country);
    await creative.validatingBuyNowButton(features[0].buyNowUrl);
  });

  test(`${features[1].name}, ${features[1].tags}, ${features[1].country}`, async ({ page, baseURL }) => {
    console.info(`[Creative Cloud] Checking Page: Germany = ${baseURL}${features[1].path}`);

    const pageURL = `${baseURL}${features[1].path}`;
    await page.goto(pageURL, { waitUntil: 'networkidle' });
    await expect(page).toHaveURL(pageURL);

    await creative.validatingGnav(features[1].country);
    await creative.validatingCreativityAndDesignTabiPad(features[1].country);
    await creative.validatingProgram(features[1].country);
    await creative.validatingSubjectArea(features[1].country);
    await creative.validatingTrainingAndSupport(features[1].country);
    await creative.closingPromoButton();
    await creative.validatingFooter(features[1].country);
    await creative.validatingBuyNowButton(features[1].buyNowUrl);
  });

  test(`${features[2].name}, ${features[2].tags}, ${features[2].country}`, async ({ page, baseURL }) => {
    console.info(`[Creative Cloud] Checking Page: France = ${baseURL}${features[2].path}`);

    const pageURL = `${baseURL}${features[2].path}`;
    await page.goto(pageURL, { waitUntil: 'networkidle' });
    await expect(page).toHaveURL(pageURL);

    await creative.validatingGnav(features[2].country);
    await creative.validatingCreativityAndDesignTabiPad(features[2].country);
    await creative.validatingExplore(features[2].country);
    await creative.validatingTrainingAndSupport(features[2].country);
    await creative.closingPromoButton();
    await creative.validatingFooter(features[2].country);
    await creative.validatingBuyNowButton(features[2].buyNowUrl);
  });

  test(`${features[3].name}, ${features[3].tags}, ${features[3].country}`, async ({ page, baseURL }) => {
    console.info(`[Creative Cloud] Checking Page: Italy = ${baseURL}${features[3].path}`);

    const pageURL = `${baseURL}${features[3].path}`;
    await page.goto(pageURL, { waitUntil: 'networkidle' });
    await expect(page).toHaveURL(pageURL);

    await creative.validatingGnav(features[3].country);
    await creative.validatingCreativityAndDesignTabiPad(features[3].country);
    await creative.validatingProgram(features[3].country);
    await creative.validatingSubjectArea(features[3].country);
    await creative.validatingTrainingAndSupport(features[3].country);
    await creative.closingPromoButton();
    await creative.validatingFooter(features[3].country);
    await creative.validatingBuyNowButton(features[3].buyNowUrl);
  });

  test(`${features[4].name}, ${features[4].tags}, ${features[4].country}`, async ({ page, baseURL }) => {
    console.info(`[Creative Cloud] Checking Page: United Kingdom = ${baseURL}${features[4].path}`);

    const pageURL = `${baseURL}${features[4].path}`;
    await page.goto(pageURL, { waitUntil: 'networkidle' });
    await expect(page).toHaveURL(pageURL);

    await creative.validatingGnav(features[4].country);
    await creative.validatingCreativityAndDesignTabiPad(features[4].country);
    await creative.validatingProgram(features[4].country);
    await creative.validatingSubjectArea(features[4].country);
    await creative.validatingTrainingAndSupport(features[4].country);
    await creative.closingPromoButton();
    await creative.validatingFooter(features[4].country);
    await creative.validatingBuyNowButton(features[4].buyNowUrl);
  });

  test(`${features[5].name}, ${features[5].tags}, ${features[5].country}`, async ({ page, baseURL }) => {
    console.info(`[Creative Cloud] Checking Page: Middle East And North Africa = ${baseURL}${features[5].path}`);

    const pageURL = `${baseURL}${features[5].path}`;
    await page.goto(pageURL, { waitUntil: 'networkidle' });
    await expect(page).toHaveURL(pageURL);

    await creative.validatingGnav(features[5].country);
    await creative.validatingCreativityAndDesignTabiPad(features[5].country);
    await creative.validatingExplore(features[5].country);
    await creative.validatingLearnAndSupport();
    await creative.closingPromoButton();
    await creative.validatingFooter(features[5].country);
    await creative.validatingBuyNowButton(features[5].buyNowUrl);
  });

  test(`${features[6].name}, ${features[6].tags}, ${features[6].country}`, async ({ page, baseURL }) => {
    console.info(`[Creative Cloud] Checking Page: Japan = ${baseURL}${features[6].path}`);

    const pageURL = `${baseURL}${features[6].path}`;
    await page.goto(pageURL, { waitUntil: 'networkidle' });
    await expect(page).toHaveURL(pageURL);

    await creative.validatingGnav(features[6].country);
    await creative.validatingCreativityAndDesignTabiPad(features[6].country);
    await creative.validatingProgram(features[6].country);
    await creative.validatingSubjectArea(features[6].country);
    await creative.validatingTrainingAndSupport(features[6].country);
    await creative.validatingFooter(features[6].country);
    await creative.validatingBuyNowButton(features[6].buyNowUrl);
  });

  test(`${features[7].name}, ${features[7].tags}, ${features[7].country}`, async ({ page, baseURL }) => {
    console.info(`[Creative Cloud] Checking Page: India = ${baseURL}${features[7].path}`);

    const pageURL = `${baseURL}${features[7].path}`;
    await page.goto(pageURL, { waitUntil: 'networkidle' });
    await expect(page).toHaveURL(pageURL);

    await creative.validatingGnav(features[7].country);
    await creative.validatingCreativityAndDesignTabiPad(features[7].country);
    await creative.validatingExplore(features[7].country);
    await creative.validatingLearnAndSupport();
    await creative.validatingFooter(features[7].country);
    await creative.validatingBuyNowButton(features[7].buyNowUrl);
  });

  test(`${features[8].name}, ${features[8].tags}, ${features[8].country}`, async ({ page, baseURL }) => {
    console.info(`[Creative Cloud] Checking Page: Spain = ${baseURL}${features[8].path}`);

    const pageURL = `${baseURL}${features[8].path}`;
    await page.goto(pageURL, { waitUntil: 'networkidle' });
    await expect(page).toHaveURL(pageURL);

    await creative.validatingGnav(features[8].country);
    await creative.validatingCreativityAndDesignTabiPad(features[8].country);
    await creative.validatingProgram(features[8].country);
    await creative.validatingSubjectArea(features[8].country);
    await creative.validatingTrainingAndSupport(features[8].country);
    await creative.closingPromoButton();
    await creative.validatingFooter(features[8].country);
    await creative.validatingBuyNowButton(features[8].buyNowUrl);
  });

  test(`${features[9].name}, ${features[9].tags}, ${features[9].country}`, async ({ page, baseURL }) => {
    console.info(`[Creative Cloud] Checking Page: Canada English = ${baseURL}${features[9].path}`);

    const pageURL = `${baseURL}${features[9].path}`;
    await page.goto(pageURL, { waitUntil: 'networkidle' });
    await expect(page).toHaveURL(pageURL);

    await creative.validatingGnav(features[9].country);
    await creative.validatingCreativityAndDesignTabiPad(features[9].country);
    await creative.validatingExplore(features[9].country);
    await creative.validatingLearnAndSupport();
    await creative.closingPromoButton();
    await creative.validatingFooter(features[9].country);
    await creative.validatingBuyNowButton(features[9].buyNowUrl);
  });

  test(`${features[10].name}, ${features[10].tags}, ${features[10].country}`, async ({ page, baseURL }) => {
    console.info(`[Creative Cloud] Checking Page: Korea = ${baseURL}${features[10].path}`);

    const pageURL = `${baseURL}${features[10].path}`;
    await page.goto(pageURL, { waitUntil: 'networkidle' });
    await expect(page).toHaveURL(pageURL);

    await creative.validatingGnav(features[10].country);
    await creative.validatingCreativityAndDesignTabiPad(features[10].country);
    await creative.validatingExplore(features[10].country);
    await creative.validatingLearnAndSupport();
    await creative.closingPromoButton();
    await creative.validatingFooter(features[10].country);
    await creative.validatingBuyNowButton(features[10].buyNowUrl);
  });

  test(`${features[11].name}, ${features[11].tags}, ${features[11].country}`, async ({ page, baseURL }) => {
    console.info(`[Creative Cloud] Checking Page: Canada French = ${baseURL}${features[11].path}`);

    const pageURL = `${baseURL}${features[11].path}`;
    await page.goto(pageURL, { waitUntil: 'networkidle' });
    await expect(page).toHaveURL(pageURL);

    await creative.validatingGnav(features[11].country);
    await creative.validatingCreativityAndDesignTabiPad(features[11].country);
    await creative.validatingExplore(features[11].country);
    await creative.validatingLearnAndSupport();
    await creative.closingPromoButton();
    await creative.validatingFooter(features[11].country);
    await creative.validatingBuyNowButton(features[11].buyNowUrl);
  });

  test(`${features[12].name}, ${features[12].tags}, ${features[12].country}`, async ({ page, baseURL }) => {
    console.info(`[Creative Cloud] Checking Page: Poland = ${baseURL}${features[12].path}`);

    const pageURL = `${baseURL}${features[12].path}`;
    await page.goto(pageURL, { waitUntil: 'networkidle' });
    await expect(page).toHaveURL(pageURL);

    await creative.validatingGnav(features[12].country);
    await creative.validatingCreativityAndDesignTabiPad(features[12].country);
    await creative.validatingExplore(features[12].country);
    await creative.validatingLearnAndSupport();
    await creative.closingPromoButton();
    await creative.validatingFooter(features[12].country);
    await creative.validatingBuyNowButton(features[12].buyNowUrl);
  });

  test(`${features[13].name}, ${features[13].tags}, ${features[13].country}`, async ({ page, baseURL }) => {
    console.info(`[Creative Cloud] Checking Page: Mexico = ${baseURL}${features[13].path}`);

    const pageURL = `${baseURL}${features[13].path}`;
    await page.goto(pageURL, { waitUntil: 'networkidle' });
    await expect(page).toHaveURL(pageURL);

    await creative.validatingGnav(features[13].country);
    await creative.validatingCreativityAndDesignTabiPad(features[13].country);
    await creative.validatingProgram(features[13].country);
    await creative.validatingSubjectArea(features[13].country);
    await creative.validatingTrainingAndSupport(features[13].country);
    await creative.closingPromoButton();
    await creative.validatingFooter(features[13].country);
    await creative.validatingBuyNowButton(features[13].buyNowUrl);
  });

  test(`${features[14].name}, ${features[14].tags}, ${features[14].country}`, async ({ page, baseURL }) => {
    console.info(`[Creative Cloud] Checking Page: Australia = ${baseURL}${features[14].path}`);

    const pageURL = `${baseURL}${features[14].path}`;
    await page.goto(pageURL, { waitUntil: 'networkidle' });
    await expect(page).toHaveURL(pageURL);

    await creative.validatingGnav(features[14].country);
    await creative.validatingCreativityAndDesignTabiPad(features[14].country);
    await creative.validatingExplore(features[14].country);
    await creative.validatingLearnAndSupport();
    await creative.closingPromoButton();
    await creative.validatingFooter(features[14].country);
    await creative.validatingBuyNowButton(features[14].buyNowUrl);
  });

  test(`${features[15].name}, ${features[15].tags}, ${features[15].country}`, async ({ page, baseURL }) => {
    console.info(`[Creative Cloud] Checking Page: Indonesia = ${baseURL}${features[15].path}`);

    const pageURL = `${baseURL}${features[15].path}`;
    await page.goto(pageURL, { waitUntil: 'networkidle' });
    await expect(page).toHaveURL(pageURL);

    await creative.validatingGnav(features[15].country);
    await creative.validatingCreativityAndDesignTabiPad(features[15].country);
    await creative.validatingExplore(features[15].country);
    await creative.validatingLearnAndSupport();
    await creative.closingPromoButton();
    await creative.validatingFooter(features[15].country);
    await creative.validatingBuyNowButton(features[15].buyNowUrl);
  });

  test(`${features[16].name}, ${features[16].tags}, ${features[16].country}`, async ({ page, baseURL }) => {
    console.info(`[Creative Cloud] Checking Page: Indonesia English = ${baseURL}${features[16].path}`);

    const pageURL = `${baseURL}${features[16].path}`;
    await page.goto(pageURL, { waitUntil: 'networkidle' });
    await expect(page).toHaveURL(pageURL);

    await creative.validatingGnav(features[16].country);
    await creative.validatingCreativityAndDesignTabiPad(features[16].country);
    await creative.validatingExplore(features[16].country);
    await creative.validatingLearnAndSupport();
    await creative.closingPromoButton();
    await creative.validatingFooter(features[16].country);
    await creative.validatingBuyNowButton(features[16].buyNowUrl);
  });

  test(`${features[17].name}, ${features[17].tags}, ${features[17].country}`, async ({ page, baseURL }) => {
    console.info(`[Creative Cloud] Checking Page: Turkey = ${baseURL}${features[17].path}`);

    const pageURL = `${baseURL}${features[17].path}`;
    await page.goto(pageURL, { waitUntil: 'networkidle' });
    await expect(page).toHaveURL(pageURL);

    await creative.validatingGnav(features[17].country);
    await creative.validatingCreativityAndDesignTabiPad(features[17].country);
    await creative.validatingProgram(features[17].country);
    await creative.validatingSubjectArea(features[17].country);
    await creative.validatingTrainingAndSupport(features[17].country);
    await creative.closingPromoButton();
    await creative.validatingFooter(features[17].country);
    await creative.validatingBuyNowButton(features[17].buyNowUrl);
  });

  test(`${features[18].name}, ${features[18].tags}, ${features[18].country}`, async ({ page, baseURL }) => {
    console.info(`[Creative Cloud] Checking Page: Thailand English = ${baseURL}${features[18].path}`);

    const pageURL = `${baseURL}${features[18].path}`;
    await page.goto(pageURL, { waitUntil: 'networkidle' });
    await expect(page).toHaveURL(pageURL);

    await creative.validatingGnav(features[18].country);
    await creative.validatingCreativityAndDesignTabiPad(features[18].country);
    await creative.validatingExplore(features[18].country);
    await creative.validatingLearnAndSupport();
    await creative.closingPromoButton();
    await creative.validatingFooter(features[18].country);
    await creative.validatingBuyNowButton(features[18].buyNowUrl);
  });

  test(`${features[19].name}, ${features[19].tags}, ${features[19].country}`, async ({ page, baseURL }) => {
    console.info(`[Creative Cloud] Checking Page: Thailand = ${baseURL}${features[19].path}`);

    const pageURL = `${baseURL}${features[19].path}`;
    await page.goto(pageURL, { waitUntil: 'networkidle' });
    await expect(page).toHaveURL(pageURL);

    await creative.validatingGnav(features[19].country);
    await creative.validatingCreativityAndDesignTabiPad(features[19].country);
    await creative.validatingProgram(features[19].country);
    await creative.validatingSubjectArea(features[19].country);
    await creative.validatingTrainingAndSupport(features[19].country);
    await creative.closingPromoButton();
    await creative.validatingFooter(features[19].country);
    await creative.validatingBuyNowButton(features[19].buyNowUrl);
  });

  test(`${features[20].name}, ${features[20].tags}, ${features[20].country}`, async ({ page, baseURL }) => {
    console.info(`[Creative Cloud] Checking Page: Singapore = ${baseURL}${features[20].path}`);

    const pageURL = `${baseURL}${features[20].path}`;
    await page.goto(pageURL, { waitUntil: 'networkidle' });
    await expect(page).toHaveURL(pageURL);

    await creative.validatingGnav(features[20].country);
    await creative.validatingCreativityAndDesignTabiPad(features[20].country);
    await creative.validatingExplore(features[20].country);
    await creative.validatingLearnAndSupport();
    await creative.closingPromoButton();
    await creative.validatingFooter(features[20].country);
    await creative.validatingBuyNowButton(features[20].buyNowUrl);
  });

  test(`${features[21].name}, ${features[21].tags}, ${features[21].country}`, async ({ page, baseURL }) => {
    console.info(`[Creative Cloud] Checking Page: Philippines = ${baseURL}${features[21].path}`);

    const pageURL = `${baseURL}${features[21].path}`;
    await page.goto(pageURL, { waitUntil: 'networkidle' });
    await expect(page).toHaveURL(pageURL);

    await creative.validatingGnav(features[21].country);
    await creative.validatingCreativityAndDesignTabiPad(features[21].country);
    await creative.validatingExplore(features[21].country);
    await creative.validatingLearnAndSupport();
    await creative.closingPromoButton();
    await creative.validatingFooter(features[21].country);
    await creative.validatingBuyNowButton(features[21].buyNowUrl);
  });

  test(`${features[22].name}, ${features[22].tags}, ${features[22].country}`, async ({ page, baseURL }) => {
    console.info(`[Creative Cloud] Checking Page: Philippines = ${baseURL}${features[22].path}`);

    const pageURL = `${baseURL}${features[22].path}`;
    await page.goto(pageURL, { waitUntil: 'networkidle' });
    await expect(page).toHaveURL(pageURL);

    await creative.validatingGnav(features[22].country);
    await creative.validatingCreativityAndDesignTabiPad(features[22].country);
    await creative.validatingExplore(features[22].country);
    await creative.validatingLearnAndSupport();
    await creative.closingPromoButton();
    await creative.validatingFooter(features[22].country);
    await creative.validatingBuyNowButton(features[22].buyNowUrl);
  });
});
