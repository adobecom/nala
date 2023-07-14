import { expect, test } from '@playwright/test';
import { features } from '../../features/milo/accordion.block.spec.js';
import { Accordion } from '../../selectors/milo/accordion.block.page.js';

let accordion;

test.describe('Milo Accordion Block test suite', () => {
  test.beforeEach(async ({ page }) => {
    accordion = new Accordion(page);
  });

  test(`${features[0].name},${features[0].tags}`, async ({ page, baseURL }) => {
    console.info('[Test Page]: ', baseURL);

    await test.step('step-1: Go to Accordion block test page', async () => {
      await page.goto(`${baseURL}${features[0].path}`);
      await page.waitForLoadState('domcontentloaded');
      await expect(page).toHaveURL(`${baseURL}${features[0].path}`);
    });

    await test.step('step-2: Verify Accrodion block content/specs', async () => {
      const { data } = features[0];
      expect(await accordion.verifyAccordion('accordion', data)).toBeTruthy();
    });
  });

  test(`${features[1].name},${features[1].tags}`, async ({ page, baseURL }) => {
    console.info('[Test Page]: ', baseURL);

    await test.step('step-1: Go to Accordion block test page', async () => {
      await page.goto(`${baseURL}${features[1].path}`);
      await page.waitForLoadState('domcontentloaded');
      await expect(page).toHaveURL(`${baseURL}${features[1].path}`);
    });

    await test.step('step-2: Verify Accrodion block content/specs', async () => {
      const { data } = features[1];
      expect(await accordion.verifyAccordion('accordion (seo)', data)).toBeTruthy();
    });
  });

  test(`${features[2].name},${features[2].tags}`, async ({ page, baseURL }) => {
    console.info('[Test Page]: ', baseURL);

    await test.step('step-1: Go to Accordion block test page', async () => {
      await page.goto(`${baseURL}${features[2].path}`);
      await page.waitForLoadState('domcontentloaded');
      await expect(page).toHaveURL(`${baseURL}${features[2].path}`);
    });

    await test.step('step-2: Verify Accrodion block content/specs', async () => {
      const { data } = features[2];
      expect(await accordion.verifyAccordion('accordion (quiet, max-width-12-desktop-large)', data)).toBeTruthy();
    });
  });
});

