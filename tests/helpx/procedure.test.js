import { expect, test } from '@playwright/test';
import features from '../../features/helpx/procedure.spec.js';
import Procedure from '../../selectors/helpx/procedure.page.js';
import helpxconfig from '../../configs/helpx.config.js';

let procedure;
let page;

test.beforeAll(async ({ browser }) => {
  //Verify TOKEN is set at environment variables
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
  //create a new page
  page = await context.newPage();
  procedure = new Procedure(page); //Attached Xpaths procedure page to playwright page
});

test.describe('Procedure Sanity test suite', () => {
  //Procedure Sanity Checks:
  test(`${features[0].name}, ${features[0].tags}`, async ({ baseURL }) => {
    let procedureTag = features.features[0].path;
    await page.goto(`${helpxconfig.use?.baseURL}${procedureTag}`);
    await page.waitForLoadState('networkidle');
    console.log(`[Test Page]: ${baseURL}${procedureTag}`);
    //I verify url of the page
    await test.step('Navigate to Procedure page', async () => {
      await expect(page).toHaveURL(`${baseURL}${procedureTag}.html`);
    });

    //I verify procedure component is present with step,image,TextBold
    await test.step('Check Procedure page content', async () => {
      // Check procedure:
      await expect(procedure.procedure).toBeVisible();
      //check Step count
      await expect(procedure.procedureStep).toHaveCount(3);
      // Check image in procedure:
      await expect(procedure.procedureImage).toBeVisible();
      // Check bold text in procedure:
      await expect(procedure.procedureTxtBold).toBeVisible();
    });
  });

});

async function launchprocedurepage(){
  //All Components page
 let procedureTag = features.features[1].path;
 await page.goto(`${helpxconfig.use?.baseURL}${procedureTag}`);
 await page.waitForLoadState('networkidle');
 console.log(`[All component procedure Page]: ${helpxconfig.use?.baseURL}${procedureTag}`);
}


test.describe("All Components in Procedure component",()=>{

  //Procedure and Step Component
  test(`${features[1].name}, ${features[1].tags}`, async () => {
    await launchprocedurepage();
     const procedureTitle = procedure.procedureTitle;
     //verify Title Text and CSS values
     await expect(procedureTitle).toBeVisible();
     await expect(procedureTitle).toHaveCSS('max-width', '1050px');
     await expect(procedureTitle).toHaveCSS('line-height', '41.4px');
     await expect(procedureTitle).toHaveCSS('font-size', '36px');
     await expect(procedureTitle).toHaveCSS('font-weight', '500');
     await expect(procedureTitle).toHaveCSS('text-align', 'left');
     await expect(procedureTitle).toHaveCSS('word-break', 'break-word');
     await expect(procedureTitle).toHaveCSS('padding', '0px 40px');
     await expect(procedureTitle).toHaveCSS('min-height', '72px');
     await expect(procedureTitle).toHaveCSS('display', 'flex');
     await expect(procedureTitle).toHaveCSS('flex-direction', 'column');
     await expect(procedureTitle).toHaveCSS('justify-content', 'center');
     await expect(procedureTitle).toHaveText("Procedure and Step Component")
   });
 
   test(`${features[1].name}, ${features[1].tags}`, async()=>{
    await launchprocedurepage();
     await expect(procedure.procedurecapitalLetter).toBeVisible();
     await expect(procedure.secondProcedureElement).toBeVisible();
     await expect(procedure.thirdProcedureElement).toBeVisible();
   })
 
   test(`${features[1].name}, ${features[1].tags}`, async()=>{
    await launchprocedurepage();
     await expect(procedure.failedProcedureElement).toBeVisible();
   })
 
   test(`${features[1].name}, ${features[1].tags}`, async () => {
    await launchprocedurepage();
     await expect(procedure.draftProcedure).toBeVisible();
   });
 
   test(`${features[1].name}, ${features[1].tags}`, async()=>{
    await launchprocedurepage();
     // Verifying visibility for each element
     await expect(procedure.textInProcedureComponent).toBeVisible();
     await expect(procedure.StrongtextInProcedureComponent).toBeVisible();
     await expect(procedure.thirdStepLink).toBeVisible();
     await expect(procedure.iconinprocedureComponet).toBeVisible();
     await expect(procedure.notealertinprocedure).toBeVisible();
     await expect(procedure.noteiconinprocedure).toBeVisible();
     await expect(procedure.notecautionInprocedure).toBeVisible();
     await expect(procedure.notetipinProcedure).toBeVisible();
   })
 
 
   test(`${features[1].name}, ${features[1].tags}`, async()=>{
     await launchprocedurepage();
     const scrollToHeight = 4500;
 
     await page.evaluate((scrollToHeight) => {
         window.scrollTo(0, scrollToHeight);
     }, scrollToHeight);
 
     await page.waitForTimeout(1000); 
     await expect(procedure.videoinprocedure).toBeVisible();
     await expect(procedure.youtubevideoinprocedure).toBeVisible();
   })
 
   test(`${features[1].name}, ${features[1].tags}`, async()=>{
    await launchprocedurepage(); 
    const scrollToHeight = 4700;
 
     await page.evaluate((scrollToHeight) => {
         window.scrollTo(0, scrollToHeight);
     },  scrollToHeight);
     await page.waitForTimeout(1000); 
 
     await expect(procedure.pdfforprocedure).toBeVisible();
     await expect(procedure.xlsxforprocedure).toBeVisible();
     await expect(procedure.pptforprocedure).toBeVisible();
 
   })
 
   test(`${features[1].name}, ${features[1].tags}`,async()=>{
    await launchprocedurepage(); 
    const scrollToHeight = 5000;
 
     await page.evaluate((scrollToHeight) => {
         window.scrollTo(0, scrollToHeight);
     }, scrollToHeight);
 
     await page.waitForTimeout(1000); 
    await  expect(procedure.beforeafterfirst).toBeVisible();
    await  expect(procedure.beforeaftersecond).toBeVisible();
 
 
   })
 
 
   test(`${features[1].name}, ${features[1].tags}`,async()=>{
    await launchprocedurepage();    
     const scrollToHeight = 6000;
 
     await page.evaluate((scrollToHeight) => {
         window.scrollTo(0, scrollToHeight);
     }, scrollToHeight);
 
     await page.waitForTimeout(1000); 
     await expect(procedure.as3Inprocedure).toBeVisible();
     await expect(procedure.cplusplusInprocedure).toBeVisible();
     expect(procedure.sqlInprocedure).toBe.length==2;
 
   })
 
 
   test(`${features[1].name}, ${features[1].tags}`,async()=>{
    await launchprocedurepage();
     const scrollToHeight = 7500;
 
     await page.evaluate((scrollToHeight) => {
         window.scrollTo(0, scrollToHeight);
     }, scrollToHeight);
 
     await page.waitForTimeout(5000); 
     await expect(procedure.codeBlock).toBeVisible();
     await expect(procedure.imageWithinProcedure).toBeVisible();
     await expect(procedure.ambientVideo).toBeVisible();
     await expect(procedure.downloadSection).toBeVisible();
     await expect(procedure.miloVideo).toBeVisible();
     await expect(procedure.beforeAfterSlider).toBeVisible();
     await expect(procedure.listWithLinks).toBeVisible();
     await expect(procedure.noteUpdate).toBeVisible();
     await expect(procedure.noteAddReason).toBeVisible();
 
   })
 
   test(`${features[1].name}, ${features[1].tags}`, async()=>{
    await launchprocedurepage();
    const scrollToHeight = 2500;
    await page.evaluate((scrollToHeight) => {
        window.scrollTo(0, scrollToHeight);
    }, scrollToHeight);

    await page.waitForTimeout(1000); 
    // Verifying visibility for image elements
    await expect(procedure.webpImageinProcedure).toBeVisible();
    await expect(procedure.pngImageInprocedure).toBeVisible();
    await expect(procedure.textBeforeImageInProcedure).toBeVisible();
    await expect(procedure.imageafterTextInProcedure).toBeVisible();
    await expect(procedure.urlBasedURLInProcedure).toBeVisible();
  })
})

