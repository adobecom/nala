import { expect, test } from '@playwright/test';
import { features } from '../../features/helpx/noteText.spec.js';
import NoteText from '../../selectors/helpx/noteText.page.js';
import config from '../../configs/helpx.config.js';


let text;
let page;
let textTag= features[0].path;
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
  text = new NoteText(page);

});

test.describe(`Verify Note text with bullet points`, () => {

  // Note Text Sanity Checks:
  test(`${features[0].name}, ${features[0].tags}`, async ({baseURL}) => {
    await page.goto(`${helpxbaseURL}${textTag}`);
    await page.waitForLoadState('networkidle');
    console.log(`[Test Page]: ${baseURL}${textTag}`);
    await test.step('Navigate to text component page', async () => {
    await expect(page).toHaveURL(`${baseURL}${textTag}`);
    });    

    //veriy styles of note component
    await expect(text.b1textComponentNoteStyle).toBeVisible();
    await expect(text.b1textComponentNoteStyle).toHaveCSS("border", "2px solid rgb(79, 142, 233)");
    await expect(text.b1textComponentNoteStyle).toHaveCSS("border-radius", "4px");
    await expect(text.b1textComponentNoteStyle).toHaveCSS("color", "rgb(51, 51, 51)");
    await expect(text.b1textComponentNoteStyle).toHaveCSS("margin", "20px 0px");
    await expect(text.b1textComponentNoteStyle).toHaveCSS("padding", "20px");
    await expect(text.b1textComponentNoteStyle).toHaveCSS("font-size", "16px");
    await expect(text.b1textComponentNoteStyle).toHaveCSS("max-width", "100%");
    await expect(text.b1textComponentNoteStyle).toHaveCSS("position", "relative");
    
    //verify Note icon styles
    await expect(text.b1textComponentNoteIconStyle).toBeVisible();
    await expect(text.b1textComponentNoteIconStyle).toHaveCSS("background-size", "16px");
    await expect(text.b1textComponentNoteIconStyle).toHaveCSS("content", "\" \"");
    await expect(text.b1textComponentNoteIconStyle).toHaveCSS("padding", "10px");
    await expect(text.b1textComponentNoteIconStyle).toHaveCSS("margin-right", "3px");
    await expect(text.b1textComponentNoteIconStyle).toHaveCSS("float", "left");

    //verify text of Note component
    await expect(text.b1contentDiv).toBeVisible();
    await expect(text.b1innerDiv).toBeVisible();
    await expect(text.b1ulElement).toBeVisible();
    await expect(text.b1firstLiElement).toHaveText("Offers (free months or promo pricing) should not be used to collect the payment from customers.");
    await expect(text.b1secondLiElement).toHaveText("Offer can only be used for those accounts where Marketing Preferences(Phone) says “Yes” under communication preferences in Customer One/Hendrix.");

  });
});


test.describe(`Verify caution text with bullet points`, () => {

  // Note Text Sanity Checks:
  test(`${features[1].name}, ${features[1].tags}`, async ({baseURL}) => {
    await page.goto(`${helpxbaseURL}${textTag}`);
    await page.waitForLoadState('networkidle');
    console.log(`[Test Page]: ${baseURL}${textTag}`);
    await test.step('Navigate to text component page', async () => {
    await expect(page).toHaveURL(`${baseURL}${textTag}`);
    });    

      // verify styles of caution note component
    await expect(text.b2textComponentNoteStyle).toBeVisible();
    await expect(text.b2textComponentNoteStyle).toHaveCSS("border", "2px solid rgb(230, 134, 24)");
    await expect(text.b2textComponentNoteStyle).toHaveCSS("border-radius", "4px");
    await expect(text.b2textComponentNoteStyle).toHaveCSS("color", "rgb(51, 51, 51)");
    await expect(text.b2textComponentNoteStyle).toHaveCSS("margin", "20px 0px");
    await expect(text.b2textComponentNoteStyle).toHaveCSS("padding", "20px");
    await expect(text.b2textComponentNoteStyle).toHaveCSS("font-size", "16px");
    await expect(text.b2textComponentNoteStyle).toHaveCSS("max-width", "100%");
    await expect(text.b2textComponentNoteStyle).toHaveCSS("position", "relative");

    // verify caution Note icon styles
    await expect(text.b2textComponentNoteIconStyle).toBeVisible();
    await expect(text.b2textComponentNoteIconStyle).toHaveCSS("background-size", "16px");
    await expect(text.b2textComponentNoteIconStyle).toHaveCSS("content", "\" \"");
    await expect(text.b2textComponentNoteIconStyle).toHaveCSS("padding", "10px");
    await expect(text.b2textComponentNoteIconStyle).toHaveCSS("margin-right", "3px");
    await expect(text.b2textComponentNoteIconStyle).toHaveCSS("float", "left");

    // verify text of caution Note component
    await expect(text.b2contentDiv).toBeVisible();
    await expect(text.b2innerDiv).toBeVisible();
    await expect(text.b2ulElement).toBeVisible();
    await expect(text.b2firstLiElement).toHaveText("Offers (free months or promo pricing) should not be used to collect the payment from customers.");
    await expect(text.b2secondLiElement).toHaveText("Offer can only be used for those accounts where Marketing Preferences(Phone) says “Yes” under communication preferences in Customer One/Hendrix.");

  });
});


test.describe(`Verify Alert text with bullet points`, () => {

  // Note Text Sanity Checks:
  test(`${features[2].name}, ${features[2].tags}`, async ({baseURL}) => {
    await page.goto(`${helpxbaseURL}${textTag}`);
    await page.waitForLoadState('networkidle');
    console.log(`[Test Page]: ${baseURL}${textTag}`);
    await test.step('Navigate to text component page', async () => {
    await expect(page).toHaveURL(`${baseURL}${textTag}`);
    });    

          // verify styles of alert note component
      await expect(text.b3textComponentNoteStyle).toBeVisible();
      await expect(text.b3textComponentNoteStyle).toHaveCSS("border", "2px solid rgb(217, 64, 46)"); 
      await expect(text.b3textComponentNoteStyle).toHaveCSS("border-radius", "4px");
      await expect(text.b3textComponentNoteStyle).toHaveCSS("color", "rgb(51, 51, 51)");
      await expect(text.b3textComponentNoteStyle).toHaveCSS("margin", "20px 0px");
      await expect(text.b3textComponentNoteStyle).toHaveCSS("padding", "20px");
      await expect(text.b3textComponentNoteStyle).toHaveCSS("font-size", "16px");
      await expect(text.b3textComponentNoteStyle).toHaveCSS("max-width", "100%");
      await expect(text.b3textComponentNoteStyle).toHaveCSS("position", "relative");

      // verify alert Note icon styles
      await expect(text.b3textComponentNoteIconStyle).toBeVisible();
      await expect(text.b3textComponentNoteIconStyle).toHaveCSS("background-size", "16px");
      await expect(text.b3textComponentNoteIconStyle).toHaveCSS("content", "\" \"");
      await expect(text.b3textComponentNoteIconStyle).toHaveCSS("padding", "10px");
      await expect(text.b3textComponentNoteIconStyle).toHaveCSS("margin-right", "3px");
      await expect(text.b3textComponentNoteIconStyle).toHaveCSS("float", "left");

      // verify text of alert Note component
      await expect(text.b3contentDiv).toBeVisible();
      await expect(text.b3innerDiv).toBeVisible();
      await expect(text.b3ulElement).toBeVisible();
      await expect(text.b3firstLiElement).toHaveText("Offers (free months or promo pricing) should not be used to collect the payment from customers.");
      await expect(text.b3secondLiElement).toHaveText("Offer can only be used for those accounts where Marketing Preferences(Phone) says “Yes” under communication preferences in Customer One/Hendrix.");

  });
});

test.describe(`Verify Tip text with bullet points`, () => {

  // Note Text Sanity Checks:
  test(`${features[3].name}, ${features[3].tags}`, async ({baseURL}) => {
    await page.goto(`${helpxbaseURL}${textTag}`);
    await page.waitForLoadState('networkidle');
    console.log(`[Test Page]: ${baseURL}${textTag}`);
    await test.step('Navigate to text component page', async () => {
    await expect(page).toHaveURL(`${baseURL}${textTag}`);
    });    

              // verify styles of tip note component
      await expect(text.b4textComponentNoteStyle).toBeVisible();
      await expect(text.b4textComponentNoteStyle).toHaveCSS("border", "2px solid rgb(68, 181, 86)"); // Change the color based on your actual styles
      await expect(text.b4textComponentNoteStyle).toHaveCSS("border-radius", "4px");
      await expect(text.b4textComponentNoteStyle).toHaveCSS("color", "rgb(51, 51, 51)");
      await expect(text.b4textComponentNoteStyle).toHaveCSS("margin", "20px 0px");
      await expect(text.b4textComponentNoteStyle).toHaveCSS("padding", "20px");
      await expect(text.b4textComponentNoteStyle).toHaveCSS("font-size", "16px");
      await expect(text.b4textComponentNoteStyle).toHaveCSS("max-width", "100%");
      await expect(text.b4textComponentNoteStyle).toHaveCSS("position", "relative");

      // verify tip Note icon styles
      await expect(text.b4textComponentNoteIconStyle).toBeVisible();
      await expect(text.b4textComponentNoteIconStyle).toHaveCSS("background-size", "16px");
      await expect(text.b4textComponentNoteIconStyle).toHaveCSS("content", "\" \"");
      await expect(text.b4textComponentNoteIconStyle).toHaveCSS("padding", "10px");
      await expect(text.b4textComponentNoteIconStyle).toHaveCSS("margin-right", "3px");
      await expect(text.b4textComponentNoteIconStyle).toHaveCSS("float", "left");

      // verify text of tip Note component
      await expect(text.b4contentDiv).toBeVisible();
      await expect(text.b4innerDiv).toBeVisible();
      await expect(text.b4ulElement).toBeVisible();
      await expect(text.b4firstLiElement).toHaveText("Offers (free months or promo pricing) should not be used to collect the payment from customers.");
      await expect(text.b4secondLiElement).toHaveText("Offer can only be used for those accounts where Marketing Preferences(Phone) says “Yes” under communication preferences in Customer One/Hendrix.");

  });
});

test.describe(`Verify caution text with serial numbers`, () => {

  // Note Text Sanity Checks:
  test(`${features[4].name}, ${features[4].tags}`, async ({baseURL}) => {
    await page.goto(`${helpxbaseURL}${textTag}`);
    await page.waitForLoadState('networkidle');
    console.log(`[Test Page]: ${baseURL}${textTag}`);
    await test.step('Navigate to text component page', async () => {
    await expect(page).toHaveURL(`${baseURL}${textTag}`);
    });    

    // verify styles of caution note component
    await expect(text.b5textComponentNoteStyle).toBeVisible();
    await expect(text.b5textComponentNoteStyle).toHaveCSS("border", "2px solid rgb(230, 134, 24)"); // Change the color based on your actual styles
    await expect(text.b5textComponentNoteStyle).toHaveCSS("border-radius", "4px");
    await expect(text.b5textComponentNoteStyle).toHaveCSS("color", "rgb(51, 51, 51)");
    await expect(text.b5textComponentNoteStyle).toHaveCSS("margin", "20px 0px");
    await expect(text.b5textComponentNoteStyle).toHaveCSS("padding", "20px");
    await expect(text.b5textComponentNoteStyle).toHaveCSS("font-size", "16px");
    await expect(text.b5textComponentNoteStyle).toHaveCSS("max-width", "100%");
    await expect(text.b5textComponentNoteStyle).toHaveCSS("position", "relative");

    // verify caution Note icon styles
    await expect(text.b5textComponentNoteIconStyle).toBeVisible();
    await expect(text.b5textComponentNoteIconStyle).toHaveCSS("background-size", "16px");
    await expect(text.b5textComponentNoteIconStyle).toHaveCSS("content", "\" \"");
    await expect(text.b5textComponentNoteIconStyle).toHaveCSS("padding", "10px");
    await expect(text.b5textComponentNoteIconStyle).toHaveCSS("margin-right", "3px");
    await expect(text.b5textComponentNoteIconStyle).toHaveCSS("float", "left");

    // verify text of caution Note component with ordered list
    await expect(text.b5contentDiv).toBeVisible();
    await expect(text.b5innerDiv).toBeVisible();
    await expect(text.b5olElement).toBeVisible();
    await expect(text.b5firstLiElement).toHaveText("Offers (free months or promo pricing) should not be used to collect the payment from customers.");
    await expect(text.b5secondLiElement).toHaveText("Offer can only be used for those accounts where Marketing Preferences(Phone) says “Yes” under communication preferences in Customer One/Hendrix.");

  });
});

test.describe(`Verify Note text with Numbered list`, () => {

  // Note Text Sanity Checks:
  test(`${features[5].name}, ${features[5].tags}`, async ({baseURL}) => {
    await page.goto(`${helpxbaseURL}${textTag}`);
    await page.waitForLoadState('networkidle');
    console.log(`[Test Page]: ${baseURL}${textTag}`);
    await test.step('Navigate to text component page', async () => {
    await expect(page).toHaveURL(`${baseURL}${textTag}`);
    });    

        // verify styles of note component
      await expect(text.b6textComponentNoteStyle).toBeVisible();
      await expect(text.b6textComponentNoteStyle).toHaveCSS("border", "2px solid rgb(79, 142, 233)"); // Change the color based on your actual styles
      await expect(text.b6textComponentNoteStyle).toHaveCSS("border-radius", "4px");
      await expect(text.b6textComponentNoteStyle).toHaveCSS("color", "rgb(51, 51, 51)");
      await expect(text.b6textComponentNoteStyle).toHaveCSS("margin", "20px 0px");
      await expect(text.b6textComponentNoteStyle).toHaveCSS("padding", "20px");
      await expect(text.b6textComponentNoteStyle).toHaveCSS("font-size", "16px");
      await expect(text.b6textComponentNoteStyle).toHaveCSS("max-width", "100%");
      await expect(text.b6textComponentNoteStyle).toHaveCSS("position", "relative");

      // verify note icon styles
      await expect(text.b6textComponentNoteIconStyle).toBeVisible();
      await expect(text.b6textComponentNoteIconStyle).toHaveCSS("background-size", "16px");
      await expect(text.b6textComponentNoteIconStyle).toHaveCSS("content", "\" \"");
      await expect(text.b6textComponentNoteIconStyle).toHaveCSS("padding", "10px");
      await expect(text.b6textComponentNoteIconStyle).toHaveCSS("margin-right", "3px");
      await expect(text.b6textComponentNoteIconStyle).toHaveCSS("float", "left");

      // verify text of note component with ordered list
      await expect(text.b6contentDiv).toBeVisible();
      await expect(text.b6innerDiv).toBeVisible();
      await expect(text.b6olElement).toBeVisible();
      await expect(text.b6firstLiElement).toHaveText("Offers (free months or promo pricing) should not be used to collect the payment from customers.");
      await expect(text.b6secondLiElement).toHaveText("Offer can only be used for those accounts where Marketing Preferences(Phone) says “Yes” under communication preferences in Customer One/Hendrix.");

  });
});

test.describe(`Verify Alert text with bullet list`, () => {

  // Note Text Sanity Checks:
  test(`${features[6].name}, ${features[6].tags}`, async ({baseURL}) => {
    await page.goto(`${helpxbaseURL}${textTag}`);
    await page.waitForLoadState('networkidle');
    console.log(`[Test Page]: ${baseURL}${textTag}`);
    await test.step('Navigate to text component page', async () => {
    await expect(page).toHaveURL(`${baseURL}${textTag}`);
    });    

       // verify styles of alert note component
      await expect(text.b7textComponentNoteStyle).toBeVisible();
      await expect(text.b7textComponentNoteStyle).toHaveCSS("border", "2px solid rgb(217, 64, 46)"); // Change the color based on your actual styles
      await expect(text.b7textComponentNoteStyle).toHaveCSS("border-radius", "4px");
      await expect(text.b7textComponentNoteStyle).toHaveCSS("color", "rgb(51, 51, 51)");
      await expect(text.b7textComponentNoteStyle).toHaveCSS("margin", "20px 0px");
      await expect(text.b7textComponentNoteStyle).toHaveCSS("padding", "20px");
      await expect(text.b7textComponentNoteStyle).toHaveCSS("font-size", "16px");
      await expect(text.b7textComponentNoteStyle).toHaveCSS("max-width", "100%");
      await expect(text.b7textComponentNoteStyle).toHaveCSS("position", "relative");

      // verify alert note icon styles
      await expect(text.b7textComponentNoteIconStyle).toBeVisible();
      await expect(text.b7textComponentNoteIconStyle).toHaveCSS("background-size", "16px");
      await expect(text.b7textComponentNoteIconStyle).toHaveCSS("content", "\" \"");
      await expect(text.b7textComponentNoteIconStyle).toHaveCSS("padding", "10px");
      await expect(text.b7textComponentNoteIconStyle).toHaveCSS("margin-right", "3px");
      await expect(text.b7textComponentNoteIconStyle).toHaveCSS("float", "left");

      // verify text of alert note component with bullet points
      await expect(text.b7contentDiv).toBeVisible();
      await expect(text.b7innerDiv).toBeVisible();
      await expect(text.b7ulElement).toBeVisible();
      await expect(text.b7firstLiElement).toHaveText("Offers (free months or promo pricing) should not be used to collect the payment from customers.");
      await expect(text.b7secondLiElement).toHaveText("Offer can only be used for those accounts where Marketing Preferences(Phone) says “Yes” under communication preferences in Customer One/Hendrix.");

  });
});

test.describe(`Verify All other Styles of Note Text`, () => {

  // Note Text Sanity Checks:
  test(`${features[7].name}, ${features[7].tags}`, async ({baseURL}) => {
    await page.goto(`${helpxbaseURL}${textTag}`);
    await page.waitForLoadState('networkidle');
    console.log(`[Test Page]: ${baseURL}${textTag}`);
    await test.step('Navigate to text component page', async () => {
    await expect(page).toHaveURL(`${baseURL}${textTag}`);
    });    

            // Tips Note Assertions
        await expect(text.b8textComponentNoteStyle).toBeVisible();
        await expect(text.b8textComponentNoteStyle).toHaveCSS("background-color", "rgba(0, 0, 0, 0)"); // Adjust based on actual styles
        await expect(text.b8textComponentNoteIconStyle).toBeVisible();
        await expect(text.b8contentDiv).toBeVisible();
        await expect(text.b8innerDiv).toBeVisible();
        await expect(text.b8olElement).toBeVisible();
        await expect(text.b8firstLiElement).toHaveText("Offers (free months or promo pricing) should not be used to collect the payment from customers.");
        await expect(text.b8secondLiElement).toHaveText("Offer can only be used for those accounts where Marketing Preferences(Phone) says “Yes” under communication preferences in Customer One/Hendrix.");

        // Caution Note Assertions
        await expect(text.b9textComponentNoteStyle).toBeVisible();
        await expect(text.b9textComponentNoteStyle).toHaveCSS("background-color", "rgba(0, 0, 0, 0)"); // Adjust based on actual styles
        await expect(text.b9textComponentNoteIconStyle).toBeVisible();
        await expect(text.b9contentDiv).toBeVisible();
        await expect(text.b9innerDiv).toBeVisible();
        await expect(text.b9olElement).toBeVisible();
        await expect(text.b9firstLiElement).toHaveText("Offers (free months or promo pricing) should not be used to collect the payment from customers.");
        await expect(text.b9secondLiElement).toHaveText("Offer can only be used for those accounts where Marketing Preferences(Phone) says “Yes” under communication preferences in Customer One/Hendrix.");

        // Note with Ordered List Assertions
        await expect(text.b10textComponentNoteStyle).toBeVisible();
        await expect(text.b10textComponentNoteStyle).toHaveCSS("background-color", "rgba(0, 0, 0, 0)"); // Adjust based on actual styles
        await expect(text.b10textComponentNoteIconStyle).toBeVisible();
        await expect(text.b10contentDiv).toBeVisible();
        await expect(text.b10innerDiv).toBeVisible();
        await expect(text.b10ulElement).toBeVisible();
        await expect(text.b10firstLiElement).toHaveText("Offers (free months or promo pricing) should not be used to collect the payment from customers.");
        await expect(text.b10secondLiElement).toHaveText("Offer can only be used for those accounts where Marketing Preferences(Phone) says “Yes” under communication preferences in Customer One/Hendrix.");

        // Content Assertions
        await expect(text.b11contentDiv).toBeVisible();

        // Tips Note with Text Content Assertions
        await expect(text.b12textComponentNoteStyle).toBeVisible();
        await expect(text.b12textComponentNoteStyle).toHaveCSS("background-color", "rgba(0, 0, 0, 0)"); // Adjust based on actual styles
        await expect(text.b12textComponentNoteIconStyle).toBeVisible();
        await expect(text.b12contentDiv).toBeVisible();
        await expect(text.b12innerDiv).toBeVisible();

        // Content Assertions
        await expect(text.b13contentDiv).toBeVisible();

        // Alert Note Assertions
        await expect(text.b14textComponentNoteStyle).toBeVisible();
        await expect(text.b14textComponentNoteStyle).toHaveCSS("background-color", "rgba(0, 0, 0, 0)"); // Adjust based on actual styles
        await expect(text.b14textComponentNoteIconStyle).toBeVisible();
        await expect(text.b14contentDiv).toBeVisible();
        await expect(text.b14innerDiv).toBeVisible();
        await expect(text.b14innerDiv).toHaveText("Update since last published date: added a new update, 'Plan Change Scenarios'.");

        // Content Assertions
        await expect(text.b15contentDiv).toBeVisible();

        // Note with Ordered List and Unordered List Assertions
        await expect(text.b16textComponentNoteStyle).toBeVisible();
        await expect(text.b16textComponentNoteStyle).toHaveCSS("background-color", "rgba(0, 0, 0, 0)"); // Adjust based on actual styles
        await expect(text.b16textComponentNoteIconStyle).toBeVisible();
        await expect(text.b16contentDiv).toBeVisible();
        await expect(text.b16innerDiv).toBeVisible();
        await expect(text.b16ulElement).toBeVisible();
        await expect(text.b16firstLiElement).toHaveText("Issue was resolved during your first interaction with the customer (FCR – first contact resolution) OR");

  });
});
