import { expect, test } from '@playwright/test';
import { features } from '../../features/helpx/legalNotices.spec.js';
import NoteText from '../../selectors/helpx/legalNotices.page.js';
import config from '../../configs/helpx.config.js';


let legalnotices;
let page;
let legalnoticestag= features[0].path;
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
  legalnotices = new NoteText(page);

});


test.describe(`Verify legal Notices is present on the page`, () => {


  test(`${features[0].name}, ${features[0].tags}`, async ({baseURL}) => {
    await page.goto(`${helpxbaseURL}${legalnoticestag}`);
    await page.waitForLoadState('domcontentloaded');
    console.log(`[Test Page]: ${baseURL}${legalnoticestag}`);
    await test.step('Navigate to text component page', async () => {
    await expect(page).toHaveURL(`${baseURL}${legalnoticestag}`);
    });    

    // Legal Notices
    await expect(legalnotices.b1ContentDiv).toBeVisible();
    await expect(legalnotices.b1H1Element).toBeVisible();
    await expect(legalnotices.b1StrongElement).toBeVisible();

    // Asserting that at least one paragraph is present
    await expect(legalnotices.b1Paragraphs).toHaveCount(3);

    // Asserting that the first and second links are not visible
    await expect(legalnotices.b1FirstLink).toBeVisible();
    await expect(legalnotices.b1SecondLink).toBeVisible();


  });
});

test.describe(`Verify legal Notices on Adding component in the table`, () => {


  test(`${features[1].name}, ${features[1].tags}`, async ({baseURL}) => {
    await page.goto(`${helpxbaseURL}${legalnoticestag}`);
    await page.waitForLoadState('domcontentloaded');
    console.log(`[Test Page]: ${baseURL}${legalnoticestag}`);
    await test.step('Navigate to text component page', async () => {
    await expect(page).toHaveURL(`${baseURL}${legalnoticestag}`);
    });    

      // Legal Privacy Notice
      await expect(legalnotices.b2LegalPrivacyNotice).toBeVisible();

      // Asserting the absence of 'data-failed' attribute
      await expect(legalnotices.b2FailedAttribute).toBeHidden();

      // Asserting the presence of 'data-reason' attribute
      await expect(legalnotices.b2ReasonAttribute).toBeHidden();



  });
});

test.describe(`Verify legal Notices Text in capital letters`, () => {


  test(`${features[2].name}, ${features[2].tags}`, async ({baseURL}) => {
    await page.goto(`${helpxbaseURL}${legalnoticestag}`);
    await page.waitForLoadState('domcontentloaded');
    console.log(`[Test Page]: ${baseURL}${legalnoticestag}`);
    await test.step('Navigate to text component page', async () => {
    await expect(page).toHaveURL(`${baseURL}${legalnoticestag}`);
    });    

    // Content Div
    await expect(legalnotices.b3ContentDiv).toBeVisible();

    // Asserting that at least one paragraph is present
    await expect(legalnotices.b3Paragraphs).toHaveCount(3);

    // Asserting the visibility of the first and second links
    await expect(legalnotices.b3FirstLink).toBeVisible();
    await expect(legalnotices.b3SecondLink).toBeVisible();

    // Asserting the visibility of the strong element within the paragraph
    await expect(legalnotices.b3StrongElement).toBeVisible();




  });
});

test.describe(`Verify legal Notices on Adding text in the table with Text in capital letters `, () => {


  test(`${features[3].name}, ${features[3].tags}`, async ({baseURL}) => {
    await page.goto(`${helpxbaseURL}${legalnoticestag}`);
    await page.waitForLoadState('domcontentloaded');
    console.log(`[Test Page]: ${baseURL}${legalnoticestag}`);
    await test.step('Navigate to text component page', async () => {
    await expect(page).toHaveURL(`${baseURL}${legalnoticestag}`);
    });    

      // Legal Privacy Notice
      await expect(legalnotices.b4LegalPrivacyNotice).toBeVisible();

      // Asserting the absence of 'data-failed' attribute
      await expect(legalnotices.b4FailedAttribute).toBeHidden();

      // Asserting the presence of 'data-reason' attribute
      await expect(legalnotices.b4ReasonAttribute).toBeHidden();



  });
});


test.describe(`Verify legal Notices on Adding original component format in the table`, () => {


  test(`${features[4].name}, ${features[4].tags}`, async ({baseURL}) => {
    await page.goto(`${helpxbaseURL}${legalnoticestag}`);
    await page.waitForLoadState('domcontentloaded');
    console.log(`[Test Page]: ${baseURL}${legalnoticestag}`);
    await test.step('Navigate to text component page', async () => {
    await expect(page).toHaveURL(`${baseURL}${legalnoticestag}`);
    });    

    // b5 Content Div
    await expect(legalnotices.b5ContentDiv).toBeVisible();

    // Asserting that at least one paragraph is present
    await expect(legalnotices.b5Paragraph).toHaveCount(1);

    // Asserting the visibility of the strong element within the paragraph
    await expect(legalnotices.b5StrongElement).toBeVisible();

    // b6 Legal Notice Online Privacy
    await expect(legalnotices.b6LegalNoticeOnlinePrivacy).toBeVisible();

    // Asserting the absence of 'data-failed' attribute
    await expect(legalnotices.b6FailedAttribute).toBeHidden();

    // Asserting the presence of 'data-reason' attribute
    await expect(legalnotices.b6ReasonAttribute).toBeHidden();




  });
});

test.describe(`Verify legal Notices on Adding full text in the table`, () => {


  test(`${features[5].name}, ${features[5].tags}`, async ({baseURL}) => {
    await page.goto(`${helpxbaseURL}${legalnoticestag}`);
    await page.waitForLoadState('domcontentloaded');
    console.log(`[Test Page]: ${baseURL}${legalnoticestag}`);
    await test.step('Navigate to text component page', async () => {
    await expect(page).toHaveURL(`${baseURL}${legalnoticestag}`);
    });    

      // b7 Content Div
      await expect(legalnotices.b7ContentDiv).toBeVisible();

      // Asserting that at least one paragraph is present
      await expect(legalnotices.b7Paragraph).toHaveCount(1);

      // Asserting the visibility of the strong element within the paragraph
      await expect(legalnotices.b7StrongElement).toBeVisible();

      // b8 Legal Notice Online Privacy
      await expect(legalnotices.b8LegalNoticeOnlinePrivacy).toBeVisible();

      // Asserting the absence of 'data-failed' attribute
      await expect(legalnotices.b8FailedAttribute).toBeHidden();

      // Asserting the presence of 'data-reason' attribute
      await expect(legalnotices.b8ReasonAttribute).toBeHidden();

  });
});

