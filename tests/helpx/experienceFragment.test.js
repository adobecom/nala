import { expect, test } from '@playwright/test';
import { features } from '../../features/helpx/experienceFragment.spec.js';
import xf from '../../selectors/helpx/experienceFragment.page.js';
import config from '../../configs/helpx.config.js';
import experiencefragemnt from '../../selectors/helpx/experienceFragment.page.js';

let xfPage
let page;
let xfTag= features[0].path;
const helpxbaseURL = config.use?.baseURL;

test.beforeAll(async ({ browser }) => {
  if (process.env.HLX_TKN !== undefined && process.env.HLX_TKN !== '') {
    // The environment variable is set and has a non-blank value
    console.log('Environment variable is set and not blank');
  } else {
    // The environment variable is either not set or has a blank value
    const errorMessage =
      "Environment variable 'HLX_TKN' is not set or blank. Please ensure it is properly configured.";
    throw new Error(errorMessage);
  }

  const authToken = process.env.HLX_TKN;
  const context = await browser.newContext();
  // Set the authorization token in the header
  await context.setExtraHTTPHeaders({ authorization: `token ${authToken}` });
  page = await context.newPage();
  xfPage = new experiencefragemnt(page);

});


test.describe('Verify TOC in Experience Fragment page', () => {
  // Draft Sanity Checks:
  test(`${features[0].name}, ${features[0].tags}`, async ({baseURL}) => {
    await page.goto(`${helpxbaseURL}${xfTag}`);
    await page.waitForLoadState('domcontentloaded');
    console.log(`[Test Page]: ${baseURL}${xfTag}`);
    await test.step('Navigate to Experience Fragment page', async () => {
    await expect(page).toHaveURL(`${baseURL}${xfTag}`);
    });

    //verify TOC is present in the page and verify its css properties
    await page.waitForSelector('.toc');
    await expect(xfPage.toc).toBeVisible();
    await expect(xfPage.toc).toHaveCSS('overflow-y', 'auto');
    await expect(xfPage.toc).toHaveCSS('max-height', '684px');
    await expect(xfPage.toc).toHaveCSS('min-height', '500px');
    await expect(xfPage.toc).toHaveCSS('max-width', '275px');
    await expect(xfPage.toc).toHaveCSS('position', 'fixed');
    await expect(xfPage.toc).toHaveCSS('z-index', '10');
    await expect(xfPage.toc).toHaveCSS('top', '232px');
        
    
  });
});

test.describe('Verify HTML structure of TOC in XF', () => {
  // Draft Sanity Checks:
  test(`${features[1].name}, ${features[1].tags}`, async ({baseURL}) => {
    await page.goto(`${helpxbaseURL}${xfTag}`);
    await page.waitForLoadState('domcontentloaded');
    console.log(`[Test Page]: ${baseURL}${xfTag}`);
    await test.step('Navigate to Experience Fragment page', async () => {
    await expect(page).toHaveURL(`${baseURL}${xfTag}`);
    });

    await page.waitForSelector('.toc');
    await expect(xfPage.toclielements).toHaveCount(25);
    await expect(xfPage.toclifirstelement).toBeVisible();
    await expect(xfPage.tocligroupelements).toHaveCount(24);
    
        
    
  });
});

test.describe('verify attributes on click of the toc', () => {
  // Draft Sanity Checks:
  test(`${features[2].name}, ${features[2].tags}`, async ({baseURL}) => {
    await page.goto(`${helpxbaseURL}${xfTag}`);
    await page.waitForLoadState('domcontentloaded');
    console.log(`[Test Page]: ${baseURL}${xfTag}`);
    await test.step('Navigate to Experience Fragment page', async () => {
    await expect(page).toHaveURL(`${baseURL}${xfTag}`);
    });

    await page.waitForSelector('.toc');
    await expect(xfPage.tocFirstElement).toHaveAttribute("aria-expanded","false");
    xfPage.tocFirstElement.click();
    await expect(xfPage.tocFirstElement).toHaveAttribute("aria-expanded","true");
    
    
        
    
  });
});

test.describe('Verify the expanded toc and check the content and click on the link', () => {
  // Draft Sanity Checks:
  test(`${features[3].name}, ${features[3].tags}`, async ({baseURL}) => {
    await page.goto(`${helpxbaseURL}${xfTag}`);
    await page.waitForLoadState('domcontentloaded');
    console.log(`[Test Page]: ${baseURL}${xfTag}`);
    await test.step('Navigate to Experience Fragment page', async () => {
    await expect(page).toHaveURL(`${baseURL}${xfTag}`);
    });

    await page.waitForSelector('.toc');
    await expect(xfPage.tocSubHeading).toHaveText("Introduction to Photoshop")
    await xfPage.tocSubHeading.click();
    await expect(xfPage.tocSubElementContents).toHaveCount(8);
    await expect(xfPage.tocSubElementsAttributevalues).toBeVisible();
    
    
        
    
  });
});

