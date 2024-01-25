import { expect, test } from '@playwright/test';
import { features } from '../../features/helpx/beforeAfter.spec.js';
import BeforeAfter from '../../selectors/helpx/beforeafter.page.js';
import config from '../../configs/helpx.config.js';


let beforeAftr;
let page;

//Move the element
async function dragElementByDistance(page, elementSelector, distanceToDragX, distanceToDragY, waitTime,scrollHeight) {

  const scrollToHeight = scrollHeight;
 
  await page.evaluate((scrollToHeight) => {
      window.scrollTo(0, scrollToHeight);
  }, scrollToHeight);


  const elementToDrag = await elementSelector;

  if (!elementToDrag) {
    console.error(`Element with selector '${elementSelector}' not found.`);
    return;
  }

  const elementBoundingBox = await elementToDrag.boundingBox();
  const targetX = elementBoundingBox.x + distanceToDragX;
  const targetY = elementBoundingBox.y + distanceToDragY;

  await page.mouse.move(elementBoundingBox.x, elementBoundingBox.y);
  await page.mouse.down();
  await page.mouse.move(targetX, targetY);
  await page.mouse.up();

  await page.waitForTimeout(waitTime);
}


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
  beforeAftr = new BeforeAfter(page);

});


test.describe('BeforeAfter Sanity test suite', () => {

  // Before After Sanity Checks:
  test(`${features[0].name}, ${features[0].tags}`, async ({ baseURL }) => {
    const BeforeAfterTag = features[0].path;
    await page.goto(`${config.use?.baseURL}${BeforeAfterTag}`);
    await page.waitForLoadState('networkidle');
    console.log(`[Test Page]: ${baseURL}${BeforeAfterTag}`);
    //I verify url of the page
    await test.step('Navigate to beforeAfter page', async () => {
      await expect(page).toHaveURL(`${baseURL}${BeforeAfterTag}.html`);
    });


    await test.step('Check Before After page content', async () => {
      // Check Before After Page component is visible
      await expect(beforeAftr.beforeAftr).toBeVisible();
    });
  });
});

async function gotoBeforeAfterPage(tag){
  await page.goto(`${config.use?.baseURL}${tag}`);
  await page.waitForLoadState('networkidle');
  console.log(`[Test Page]: ${config.use?.baseURL}${tag}`);
}

test.describe('Verify Before After Component For Vertical Movement', () => {
  // Go To Page
  test(`${features[1].name}, ${features[1].tags}`, async () => {
    console.log("features[1].name" + features[1].name);
    const BeforeAfterTag = features[1].path;
    await gotoBeforeAfterPage(BeforeAfterTag)

      //Drag the slider-->up
      const elementToDrag = beforeAftr.sliderUp;
      await dragElementByDistance(page, elementToDrag, 100, -180, 2000);

       //verify the Image Properties
      await expect(beforeAftr.imageBefore).toHaveAttribute("style", "clip-path: inset(0px 0px 100%);");
      await expect(beforeAftr.sliderThumbContainer).toHaveAttribute("style","top: 0%;")

      //Drag the slider-->Down
     await dragElementByDistance(page, elementToDrag, 100, 350, 2000);
     await expect(beforeAftr.imageBefore).toHaveAttribute("style", "clip-path: inset(0px 0px 0%);");
     await expect(beforeAftr.sliderThumbContainer).toHaveAttribute("style","top: 100%;")

  });
});



test.describe('Verify Before After Component For Horizontal Movement', () => {
  // Go To Page
  test(`${features[2].name}, ${features[2].tags}`, async () => {
    console.log("features[2].name" + features[2].name);
    const BeforeAfterTag = features[2].path;
    await gotoBeforeAfterPage(BeforeAfterTag)

      
      const elementToDrag = beforeAftr.slidereleft;

      //Drag the slider-->right
     await dragElementByDistance(page, elementToDrag, -350, 50, 2000);
     await expect(beforeAftr.imageBeforeLeft).toHaveAttribute("style", "clip-path: inset(0px 100% 0px 0px);");
     await expect(beforeAftr.sliderThumbContainerLeft).toHaveAttribute("style","left: 0%;")

      //Drag the slider-->left
      await dragElementByDistance(page, elementToDrag, 750, 50, 2000);
      await expect(beforeAftr.imageBeforeLeft).toHaveAttribute("style", "clip-path: inset(0px 0% 0px 0px);");
      await expect(beforeAftr.sliderThumbContainerLeft).toHaveAttribute("style","left: 100%;")



  });
});

test.describe('Verify Before After Component For jpg and png Movement', () => {
  // Go To Page
  test(`${features[3].name}, ${features[3].tags}`, async () => {
    console.log("features[3].name" + features[3].name);
    const BeforeAfterTag = features[3].path;
    await gotoBeforeAfterPage(BeforeAfterTag)

      
      const elementToDrag = beforeAftr.sliderbw;

      //Drag the slider-->right
     await dragElementByDistance(page, elementToDrag, -350, 50, 2000,700);
     await expect(beforeAftr.imageBeforebw).toHaveAttribute("style", "clip-path: inset(0px 100% 0px 0px);");
     await expect(beforeAftr.sliderThumbContainerbw).toHaveAttribute("style","left: 0%;")

      //Drag the slider-->left
      await dragElementByDistance(page, elementToDrag, 750, 50, 2000,700);
      await expect(beforeAftr.imageBeforebw).toHaveAttribute("style", "clip-path: inset(0px 0% 0px 0px);");
      await expect(beforeAftr.sliderThumbContainerbw).toHaveAttribute("style","left: 100%;")



  });
});

test.describe('Verify Before After Component For Capital Letter Before After Component', () => {
  // Go To Page
  test(`${features[4].name}, ${features[4].tags}`, async () => {
    console.log("features[4].name" + features[4].name);
    const BeforeAfterTag = features[4].path;
    await gotoBeforeAfterPage(BeforeAfterTag)

      
      const elementToDrag = beforeAftr.slidercapitalHeading;

      //Drag the slider-->right
     await dragElementByDistance(page, elementToDrag, -350, 50, 2000,1200);
     await expect(beforeAftr.imageBeforecapitalHeading).toHaveAttribute("style", "clip-path: inset(0px 100% 0px 0px);");
     await expect(beforeAftr.sliderThumbContainercapitalHeading).toHaveAttribute("style","left: 0%;")

      //Drag the slider-->left
      await dragElementByDistance(page, elementToDrag, 750, 50, 2000,1200);
      await expect(beforeAftr.imageBeforecapitalHeading).toHaveAttribute("style", "clip-path: inset(0px 0% 0px 0px);");
      await expect(beforeAftr.sliderThumbContainercapitalHeading).toHaveAttribute("style","left: 100%;")



  });
});

test.describe('Verify Before After Component For Horizontal Before After Component', () => {
  // Go To Page
  test(`${features[5].name}, ${features[5].tags}`, async () => {
    console.log("features[5].name" + features[5].name);
    const BeforeAfterTag = features[5].path;
    await gotoBeforeAfterPage(BeforeAfterTag)


      const elementToDrag = beforeAftr.sliderHorizontalbeforeHeading;

      //Drag the slider-->right
     await dragElementByDistance(page, elementToDrag, -350, 50, 2000,1700);
     await expect(beforeAftr.imageHorizontalbeforeHeading).toHaveAttribute("style", "clip-path: inset(0px 100% 0px 0px);");
     await expect(beforeAftr.sliderThumbContainerHorizontalbeforeHeading).toHaveAttribute("style","left: 0%;")

      //Drag the slider-->left
      await dragElementByDistance(page, elementToDrag, 750, 50, 2000,1700);
      await expect(beforeAftr.imageHorizontalbeforeHeading).toHaveAttribute("style", "clip-path: inset(0px 0% 0px 0px);");
      await expect(beforeAftr.sliderThumbContainerHorizontalbeforeHeading).toHaveAttribute("style","left: 100%;")



  });
});

test.describe('Verify Before After Component From XF', () => {
  // Go To Page
  test(`${features[6].name}, ${features[6].tags}`, async () => {
    console.log("features[6].name" + features[6].name);
    const BeforeAfterTag = features[6].path;
    await gotoBeforeAfterPage(BeforeAfterTag)


      const elementToDrag = beforeAftr.sliderXFfromlefttoright;

      //Drag the slider-->right
     await dragElementByDistance(page, elementToDrag, -350, 50, 2000,2000);
     await expect(beforeAftr.imageXFfromlefttoright).toHaveAttribute("style", "clip-path: inset(0px 100% 0px 0px);");
     await expect(beforeAftr.sliderThumbContainerXFfromlefttoright).toHaveAttribute("style","left: 0%;")

      //Drag the slider-->left
      await dragElementByDistance(page, elementToDrag, 750, 50, 2000,2000);
      await expect(beforeAftr.imageXFfromlefttoright).toHaveAttribute("style", "clip-path: inset(0px 0% 0px 0px);");
      await expect(beforeAftr.sliderThumbContainerXFfromlefttoright).toHaveAttribute("style","left: 100%;")



  });
});

test.describe('Verify Before After Component From XF for up to down', () => {
  // Go To Page
  test(`${features[7].name}, ${features[7].tags}`, async () => {
    console.log("features[7].name" + features[7].name);
    const BeforeAfterTag = features[7].path;
    await gotoBeforeAfterPage(BeforeAfterTag)


      const elementToDrag = beforeAftr.sliderXFfromUptoDown;

      //Drag the slider-->right
     await dragElementByDistance(page, elementToDrag, 100, -400, 2000,2500);
     await expect(beforeAftr.imageXFfromUptoDown).toHaveAttribute("style", "clip-path: inset(0px 0px 100%);");
     await expect(beforeAftr.sliderThumbContainerXFfromUptoDown).toHaveAttribute("style","top: 0%;")

      //Drag the slider-->left
      await dragElementByDistance(page, elementToDrag, 100,800, 2000,2500);
      await expect(beforeAftr.imageXFfromUptoDown).toHaveAttribute("style", "clip-path: inset(0px 0px 0%);");
      await expect(beforeAftr.sliderThumbContainerXFfromUptoDown).toHaveAttribute("style","top: 100%;")



  });
});

test.describe('Verify Before After Component For Incorrect Authoring', () => {
  // Go To Page
  test(`${features[8].name}, ${features[8].tags}`, async () => {
    console.log("features[8].name" + features[8].name);
    const BeforeAfterTag = features[8].path;
    await gotoBeforeAfterPage(BeforeAfterTag)


      const elementToDrag = beforeAftr.sliderFailedForIncorrectAuthoring;
      expect(elementToDrag).toBeTruthy();

  });
});
