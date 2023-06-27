/* eslint-disable import/named */
/* eslint-disable import/extensions */
import { expect, test } from '@playwright/test';
import Accordion from '../../selectors/milo/accordion.block.page.js';
import * as accordionSpec from '../../features/milo/accordion.block.spec.js';

const { features } = accordionSpec;
let accordion;

test.describe('Milo Accordion Block test suite', () => {
  test.beforeEach(async ({ page }) => {
    accordion = new Accordion(page);
  });

  // Test - 1
  test(`${features[0].name} › @milo-live › ${features[0].tags} › https://milo.adobe.com`, async ({ page, baseURL }) => {
    console.info('[MiloInfo] Checking page: ', baseURL);

    // test step-1
    await test.step('Go to Accordion block test page', async () => {
      await page.goto(`${baseURL}${features[0].path}`);
      await page.waitForLoadState('domcontentloaded');
      await expect(page).toHaveURL(`${baseURL}${features[0].path}`);
    });

    // test step-2
    await test.step('Verify Accrodion block content/specs', async () => {
      const { data } = features[0];
      expect(await accordion.verifyAccordion('accordion', data)).toBeTruthy();
    });
  });

  // Test - 2
  test(`${features[1].name} › @milo-live › ${features[1].tags} › https://milo.adobe.com`, async ({ page, baseURL }) => {
    console.info('[MiloInfo] Checking page: ', baseURL);

    // test step-1
    await test.step('Go to Accordion block test page', async () => {
      await page.goto(`${baseURL}${features[1].path}`);
      await page.waitForLoadState('domcontentloaded');
      await expect(page).toHaveURL(`${baseURL}${features[1].path}`);
    });

    // test step-2
    await test.step('Verify Accrodion block content/specs', async () => {
      const { data } = features[1];
      expect(await accordion.verifyAccordion('accordion (seo)', data)).toBeTruthy();
    });
  });

  // Test - 3
  test(`${features[2].name} › @milo-live › ${features[2].tags} › https://milo.adobe.com`, async ({ page, baseURL }) => {
    console.info('[MiloInfo] Checking page: ', baseURL);

    // test step-1
    await test.step('Go to Accordion block test page', async () => {
      await page.goto(`${baseURL}${features[2].path}`);
      await page.waitForLoadState('domcontentloaded');
      await expect(page).toHaveURL(`${baseURL}${features[2].path}`);
    });

    // test step-2
    await test.step('Verify Accrodion block content/specs', async () => {
      const { data } = features[2];
      expect(await accordion.verifyAccordion('accordion (quiet, max-width-12-desktop-large)', data)).toBeTruthy();
    });
  });
});
