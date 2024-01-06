import { expect, test } from '@playwright/test';
import { WebUtil } from '../../libs/webutil.js';
import { features } from '../../features/milo/accordion.block.spec.js';
import AccordionBlock from '../../selectors/milo/accordion.block.page.js';

let webUtil;
let accordion;
let consoleErrors = [];
let miloLib = '?milolibs=stage';
const knownConsoleErrors = ['Access-Control-Allow-Origin','Failed to load resource: net::ERR_FAILED'];

test.describe('Milo Accordion Block test suite', () => {
  test.beforeEach(async ({ page }) => {
    webUtil = new WebUtil(page);
    accordion = new AccordionBlock(page);

    page.on('console', (exception) => {
      if (exception.type() === 'error') {
        consoleErrors.push(exception.text());
      }
    });
  });

  test.afterEach(async () =>{
    consoleErrors = [];
  });  

  // Test 0 : Accordion
  test(`${features[0].name},${features[0].tags}`, async ({ page, baseURL }) => {
    console.info(`[Test Page]: ${baseURL}${features[0].path}${miloLib}`);
    const { data } = features[0];

    await test.step('step-1: Go to Accordion block test page', async () => {
      await page.goto(`${baseURL}${features[0].path}${miloLib}`);
      await page.waitForLoadState('domcontentloaded');
      await expect(page).toHaveURL(`${baseURL}${features[0].path}${miloLib}`);
    });

    await test.step('step-2: Verify Accrodion block content/specs', async () => {
      await expect(await accordion.accordion).toBeVisible();

      // verify accordion headers, buttons, and icons count
      await expect(await accordion.accordionHeaders).toHaveCount(data.headers);
      await expect(await accordion.accordionButtons).toHaveCount(data.headers);
      await expect(await accordion.accordionButtonIcons).toHaveCount(data.headers);

      // verify accordion headers text content
      await expect(await accordion.accordionHeaders.nth(0)).toContainText(data.heading0);
      await expect(await accordion.accordionHeaders.nth(1)).toContainText(data.heading1);
      await expect(await accordion.accordionHeaders.nth(2)).toContainText(data.heading2);
      
      // verify accordion buttons open close clicks 
      await expect(await accordion.accordionButtons.nth(0)).toHaveAttribute('aria-expanded', 'false');
      await accordion.accordionButtonIcons.nth(0).click();
      await expect(await accordion.accordionButtons.nth(0)).toHaveAttribute('aria-expanded', 'true');
      await accordion.accordionButtonIcons.nth(0).click();
      await expect(await accordion.accordionButtons.nth(0)).toHaveAttribute('aria-expanded', 'false');
    });

    await test.step('step-3: Verify analytics attributes', async () => {
      expect(await webUtil.verifyAttributes_(accordion.accordion, accordion.attributes['analytics']['accordion.daa-lh'])).toBeTruthy();        
    });

    await test.step('step-4: Verify browser console errors', async () => {
      consoleErrors.length > knownConsoleErrors.length && console.log('[Console error]:', consoleErrors);      
      expect.soft(consoleErrors.length).toBeLessThanOrEqual(knownConsoleErrors.length);      
    });    
  });

  // Test 1 : Accordion (seo) 
  test(`${features[1].name},${features[1].tags}`, async ({ page, baseURL }) => {
    console.info(`[Test Page]: ${baseURL}${features[1].path}`);
    const { data } = features[1];

    await test.step('step-1: Go to Accordion block test page', async () => {
      await page.goto(`${baseURL}${features[1].path}`);
      await page.waitForLoadState('domcontentloaded');
      await expect(page).toHaveURL(`${baseURL}${features[1].path}`);
    });

    await test.step('step-2: Verify Accrodion seo block specs', async () => {      
      await expect(await accordion.accordion).toBeVisible();

      const scriptContent = await page.evaluate(() => {
        const scriptElement = document.querySelector('script[type="application/ld+json"]');
        return scriptElement ? scriptElement.textContent : null;
      });
      expect(scriptContent).toBeTruthy();
      console.log('[SEO Script content]:', scriptContent);

      expect(await webUtil.verifyAttributes_(accordion.accordion, accordion.attributes['accordion-container.seo'])).toBeTruthy();
    });

    await test.step('step-3: Verify analytics attributes', async () => {
      expect(await webUtil.verifyAttributes_(accordion.accordion, accordion.attributes['analytics']['accordion.daa-lh'])).toBeTruthy();        
    });

    await test.step('step-4: Verify browser console errors', async () => {
      consoleErrors.length > knownConsoleErrors.length && console.log('[Console error]:', consoleErrors);      
      expect.soft(consoleErrors.length).toBeLessThanOrEqual(knownConsoleErrors.length);      
    });
  });

// Test 2 : Accordion (quiet, max-width-12-desktop-large)  
  test(`${features[2].name},${features[2].tags}`, async ({ page, baseURL }) => {
    console.info(`[Test Page]: ${baseURL}${features[2].path}`);
    const { data } = features[2];

    await test.step('step-1: Go to Accordion block test page', async () => {
      await page.goto(`${baseURL}${features[2].path}`);
      await page.waitForLoadState('domcontentloaded');
      await expect(page).toHaveURL(`${baseURL}${features[2].path}`);
    });

    await test.step('step-2: Verify Accrodion block content/specs', async () => {
      await expect(await accordion.accordion).toBeVisible();

      // verify accordion headers, buttons, and icons count
      await expect(await accordion.accordionHeaders).toHaveCount(data.headers);
      await expect(await accordion.accordionButtons).toHaveCount(data.headers);
      await expect(await accordion.accordionButtonIcons).toHaveCount(data.headers);

      // verify accordion headers text content
      await expect(await accordion.accordionHeaders.nth(0)).toContainText(data.heading0);
      await expect(await accordion.accordionHeaders.nth(1)).toContainText(data.heading1);
      await expect(await accordion.accordionHeaders.nth(2)).toContainText(data.heading2);

      expect(await webUtil.verifyAttributes_(accordion.accordion, accordion.attributes['accordion-container-quiet-large'])).toBeTruthy();
    });

    await test.step('step-3: Verify analytics attributes', async () => {
      expect(await webUtil.verifyAttributes_(accordion.accordion, accordion.attributes['analytics']['accordion.daa-lh'])).toBeTruthy();        
    });

    await test.step('step-4: Verify browser console errors', async () => {
      consoleErrors.length > knownConsoleErrors.length && console.log('[Console error]:', consoleErrors);      
      expect.soft(consoleErrors.length).toBeLessThanOrEqual(knownConsoleErrors.length);      
    });
  });
});
