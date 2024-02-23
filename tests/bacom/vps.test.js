import { expect, test } from '@playwright/test';
import { features } from '../../features/helpx/vps.spec.js';
import vpsPage from '../../selectors/helpx/vps.page.js';
import helpxconfig from '../../configs/helpx.config.js';

let vps;
let page;
let context;

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
  context = await browser.newContext();
  // Set the authorization token in the header
  await context.setExtraHTTPHeaders({ authorization: `token ${authToken}` });
  //create a new page
  page = await context.newPage();
  vps = new vpsPage(page); 
  
});

const vpsTag = features[7].path;
test.describe('Verify hidden Tablet and mobile and Desktop for video in Viewport specific container', () => {

  test(`${features[7].name}, ${features[7].tags}`, async ({ baseURL }) => {
    await page.goto(`${baseURL}${vpsTag}`);
    await page.waitForLoadState('domcontentloaded');
    console.log(`[Test Page]: ${baseURL}${vpsTag}`);
    await test.step('Navigate to Viewport specific container page', async () => {
      await expect(page).toHaveURL(`${baseURL}${vpsTag}`);
    });


          await page.waitForTimeout(1000);
          await expect(vps.vpsForHiddenTabletMobileB26).not.toBeVisible();
          await expect(vps.linkForHiddenTabletMobileB26).not.toBeVisible();
  
          // Set viewport size for mobile
          await page.setViewportSize({ width: 375, height: 812 }); 
          await expect(vps.vpsForHiddenTabletMobileB26).not.toBeVisible();
          await expect(vps.linkForHiddenTabletMobileB26).not.toBeVisible();

          await page.waitForTimeout(1000);
          // Set viewport size for tablet
          await page.setViewportSize({ width: 768, height: 1024 }); 
          await expect(vps.vpsForHiddenTabletMobileB26).not.toBeVisible();
          await expect(vps.linkForHiddenTabletMobileB26).not.toBeVisible();
  });
});

test.describe('Verify hidden desktop in Viewport specific container', () => {

  test(`${features[0].name}, ${features[0].tags}`, async ({ baseURL }) => {
    await page.goto(`${baseURL}${vpsTag}`);
    await page.waitForLoadState('domcontentloaded');
    console.log(`[Test Page]: ${baseURL}${vpsTag}`);
    await test.step('Navigate to Viewport specific container page', async () => {
      await expect(page).toHaveURL(`${baseURL}${vpsTag}`);
    });

    await page.setViewportSize({ width: 1280, height: 800 }); 

    //Hidden Desktop
    await expect(vps.vpsForHiddenDesktop).not.toBeVisible();
    await expect(vps.vpsForHiddenDesktop).toHaveCSS("display","none")
    await expect(vps.vpsForImginHiddenDesktop).not.toBeVisible();

       await page.waitForTimeout(1000);
      // Set viewport size for mobile
      await page.setViewportSize({ width: 375, height: 812 }); 
      await expect(vps.vpsForHiddenDesktop).toBeVisible();
      
      
      await page.waitForTimeout(1000)
      // Set viewport size for tablet
      await page.setViewportSize({ width: 768, height: 1024 }); 
      await expect(vps.vpsForHiddenDesktop).toBeVisible();

     

  });
});

test.describe('Verify hidden tablet in Viewport specific container', () => {

  test(`${features[1].name}, ${features[1].tags}`, async ({ baseURL }) => {
    await page.goto(`${baseURL}${vpsTag}`);
    await page.waitForLoadState('domcontentloaded');
    console.log(`[Test Page]: ${baseURL}${vpsTag}`);
    await test.step('Navigate to Viewport specific container page', async () => {
      await expect(page).toHaveURL(`${baseURL}${vpsTag}`);
    });

    await page.waitForTimeout(1000);
    await page.setViewportSize({ width: 1280, height: 800 }); 

    //Hidden Desktop
    await expect(vps.vpsForHiddenTabletB4).toBeVisible();
    await expect(vps.vpsForImginHiddenTabletB4).toBeVisible();

      await page.waitForTimeout(1000);
      await page.setViewportSize({ width: 375, height: 812 }); 
      await expect(vps.vpsForHiddenTabletB4).toBeVisible();
      
      
      await page.waitForTimeout(1000)
      await page.setViewportSize({ width: 768, height: 1024 }); 
      await expect(vps.vpsForHiddenTabletB4).not.toBeVisible();
      await expect(vps.vpsForHiddenTabletB4).toHaveCSS("display","none")  

  });
});

test.describe('Verify hidden mobile in Viewport specific container', () => {

  test(`${features[2].name}, ${features[2].tags}`, async ({ baseURL }) => {
    await page.goto(`${baseURL}${vpsTag}`);
    await page.waitForLoadState('domcontentloaded');
    console.log(`[Test Page]: ${baseURL}${vpsTag}`);
    await test.step('Navigate to Viewport specific container page', async () => {
      await expect(page).toHaveURL(`${baseURL}${vpsTag}`);
    });

    await page.waitForTimeout(1000);
    await page.setViewportSize({ width: 1280, height: 800 }); 

      // Hidden Mobile Assertions
      await expect(vps.vpsForHiddenMobileB6).toBeVisible();
      await expect(vps.vpsForImginHiddenMobileB6).toBeVisible();

      await page.waitForTimeout(1000);

      // Set viewport size for mobile
      await page.setViewportSize({ width: 375, height: 812 }); 
      await expect(vps.vpsForHiddenMobileB6).not.toBeVisible();
      await expect(vps.vpsForHiddenMobileB6).toHaveCSS("display","none");


      await page.waitForTimeout(1000);

      // Set viewport size for tablet
      await page.setViewportSize({ width: 768, height: 1024 }); 
      await expect(vps.vpsForHiddenMobileB6).toBeVisible();
  });
});

test.describe('Verify hidden desktop and tablet in Viewport specific container', () => {

  test(`${features[3].name}, ${features[3].tags}`, async ({ baseURL }) => {
    await page.goto(`${baseURL}${vpsTag}`);
    await page.waitForLoadState('domcontentloaded');
    console.log(`[Test Page]: ${baseURL}${vpsTag}`);
    await test.step('Navigate to Viewport specific container page', async () => {
      await expect(page).toHaveURL(`${baseURL}${vpsTag}`);
    });

    await page.setViewportSize({ width: 1280, height: 800 }); 
    await page.waitForTimeout(1000);

    // Hidden Desktop and Tablet Assertions
    await expect(vps.vpsForHiddenDesktopTabletB8).not.toBeVisible();
    await expect(vps.vpsForImginHiddenDesktopTabletB8).not.toBeVisible();
    await expect(vps.vpsForHiddenDesktopTabletB8).toHaveCSS("display", "none");


    await page.waitForTimeout(1000);

    // Set viewport size for mobile
    await page.setViewportSize({ width: 375, height: 812 }); 
    await expect(vps.vpsForHiddenDesktopTabletB8).toBeVisible();

    await page.waitForTimeout(1000);

    // Set viewport size for tablet
    await page.setViewportSize({ width: 768, height: 1024 }); 
    await expect(vps.vpsForHiddenDesktopTabletB8).not.toBeVisible();
    await expect(vps.vpsForHiddenDesktopTabletB8).toHaveCSS("display", "none");


  });
});

test.describe('Verify hidden desktop and mobile in Viewport specific container', () => {

  test(`${features[4].name}, ${features[4].tags}`, async ({ baseURL }) => {
    await page.goto(`${baseURL}${vpsTag}`);
    await page.waitForLoadState('domcontentloaded');
    console.log(`[Test Page]: ${baseURL}${vpsTag}`);
    await test.step('Navigate to Viewport specific container page', async () => {
      await expect(page).toHaveURL(`${baseURL}${vpsTag}`);
    });

    await page.setViewportSize({ width: 1280, height: 800 }); 
  
      await page.waitForTimeout(1000);

      // Hidden Desktop and Mobile Assertions
      await expect(vps.vpsForHiddenDesktopMobileB10).not.toBeVisible();
      await expect(vps.vpsForImginHiddenDesktopMobileB10).not.toBeVisible();


      await page.waitForTimeout(1000);

      // Set viewport size for mobile
      await page.setViewportSize({ width: 375, height: 812 }); 
      await expect(vps.vpsForHiddenDesktopMobileB10).not.toBeVisible();
      await expect(vps.vpsForHiddenDesktopMobileB10).toHaveCSS("display", "none");

      await page.waitForTimeout(1000);

      // Set viewport size for tablet
      await page.setViewportSize({ width: 768, height: 1024 }); 
      await expect(vps.vpsForHiddenDesktopMobileB10).toBeVisible();

  });
});

test.describe('Verify hidden Tablet and mobile in Viewport specific container', () => {

  test(`${features[5].name}, ${features[5].tags}`, async ({ baseURL }) => {
    await page.goto(`${baseURL}${vpsTag}`);
    await page.waitForLoadState('domcontentloaded');
    console.log(`[Test Page]: ${baseURL}${vpsTag}`);
    await test.step('Navigate to Viewport specific container page', async () => {
      await expect(page).toHaveURL(`${baseURL}${vpsTag}`);
    });

    await page.setViewportSize({ width: 1280, height: 800 }); 

        await page.waitForTimeout(1000);

        // Hidden Tablet and Mobile Assertions
        await expect(vps.vpsForHiddenTabletMobileB12).toBeVisible();
        await expect(vps.vpsForImginHiddenTabletMobileB12).toBeVisible();

          await page.waitForTimeout(1000);

        // Set viewport size for mobile
        await page.setViewportSize({ width: 375, height: 812 }); 
        await expect(vps.vpsForHiddenTabletMobileB12).not.toBeVisible();
        await expect(vps.vpsForHiddenTabletMobileB12).toHaveCSS("display", "none");

          await page.waitForTimeout(1000);

        // Set viewport size for tablet
        await page.setViewportSize({ width: 768, height: 1024 }); 
        await expect(vps.vpsForHiddenTabletMobileB12).not.toBeVisible();
        await expect(vps.vpsForHiddenTabletMobileB12).toHaveCSS("display", "none");

  });
});

test.describe('Verify hidden Tablet and mobile and Desktop in Viewport specific container', () => {

  test(`${features[6].name}, ${features[6].tags}`, async ({ baseURL }) => {
    await page.goto(`${baseURL}${vpsTag}`);
    await page.waitForLoadState('domcontentloaded');
    console.log(`[Test Page]: ${baseURL}${vpsTag}`);
    await test.step('Navigate to Viewport specific container page', async () => {
      await expect(page).toHaveURL(`${baseURL}${vpsTag}`);
    });


    await page.setViewportSize({ width: 1280, height: 800 }); 

      await page.waitForTimeout(1000);

      // Set viewport size for mobile
      await page.setViewportSize({ width: 375, height: 812 }); 
      await expect(vps.vpsForHiddenTabletMobileDesktopB14).not.toBeVisible();
      await expect(vps.vpsForHiddenTabletMobileDesktopB14).toHaveCSS("display", "none");

      await page.waitForTimeout(1000);

      // Set viewport size for tablet
      await page.setViewportSize({ width: 768, height: 1024 }); 
      await expect(vps.vpsForHiddenTabletMobileDesktopB14).not.toBeVisible();
      await expect(vps.vpsForHiddenTabletMobileDesktopB14).toHaveCSS("display", "none");

      await page.waitForTimeout(1000);

      // Set viewport size for desktop
      await page.setViewportSize({ width: 1280, height: 800 }); 
      await expect(vps.vpsForHiddenTabletMobileDesktopB14).not.toBeVisible();
      await expect(vps.vpsForHiddenTabletMobileDesktopB14).toHaveCSS("display", "none");
    
  
  });
});


