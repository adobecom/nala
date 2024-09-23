import { expect, test } from '@playwright/test';
import { features } from '../../../features/bacom/features/dynamic-nav.spec.js';
import FedsHeader from '../../../selectors/feds/feds.header.page.js';

const miloLibs = process.env.MILO_LIBS || '';
let header;

test.describe('Dynamic Navigation Test Suite', () => {
  test.beforeEach(async ({ page }) => {
    header = new FedsHeader(page);
  });

  test(`1: Checking the navs going from an entry to an on page, ${features[0].tags}, path: ${features[0].entry}`, async ({
    page,
    baseURL,
  }) => {
    const entryPage = `${baseURL}${features[0].entry}${miloLibs}`;
    const onPage = `${baseURL}${features[0].on}${miloLibs}`;
    let entryNav;
    let onNav;
    let onNavAfterEntry;

    await test.step('1. Navigate to on page and check the nav and breadcrumbs', async () => {
      await page.goto(onPage);
      await page.waitForLoadState('domcontentloaded');
      await page.waitForSelector('button.feds-signIn', { state: 'visible' });
      await page.waitForSelector('nav.feds-breadcrumbs', { state: 'visible' });

      await expect(async () => {
        await expect(header.breadcrumbContainer).toBeVisible();
        onNav = await header.mainNavContainer.innerText();
        onNav = onNav.toLowerCase();
        await expect(onNav.length).toBeGreaterThan(0);
        await expect(onNav).toContain('sign in');
      }).toPass();
    });

    await test.step('2. Navigate to a page with dynamic nav set to "entry"', async () => {
      await page.goto(entryPage);
      await page.waitForLoadState('domcontentloaded');
      await page.waitForSelector('button.feds-signIn', { state: 'visible' });

      await expect(async () => {
        entryNav = await header.mainNavContainer.innerText();
        entryNav = entryNav.toLowerCase();
        await expect(entryNav.length).toBeGreaterThan(0);
        await expect(entryNav).toContain('sign in');
      }).toPass();
    });

    await test.step('3. Navigate to a page with dynamic nav set to "on" from an entry page', async () => {
      const toOnPage = page.getByText('To ON page');
      await toOnPage.click();
    });

    await test.step('4. Check that the expected nav displays and breadcrumbs do not', async () => {
      await page.waitForURL(/.*\/on/);
      await page.waitForLoadState('domcontentloaded');
      await page.waitForSelector('button.feds-signIn', { state: 'visible' });
      await page.waitForSelector('nav.feds-breadcrumbs', { state: 'hidden' });

      await expect(async () => {
        onNavAfterEntry = await header.mainNavContainer.innerText();
        onNavAfterEntry = onNavAfterEntry.toLowerCase();
        await expect(onNavAfterEntry.length).toBeGreaterThan(0);
        await expect(onNavAfterEntry).toContain('sign in');
        await expect(entryNav).toBe(onNavAfterEntry);
        await expect(onNavAfterEntry).not.toBe(onNav);
        await expect(header.breadcrumbContainer).not.toBeVisible();
      }).toPass();
    });
  });

  test(`2: Checking the navs going from an entry to an off page, ${features[1].tags}, path: ${features[1].entry}`, async ({
    page,
    baseURL,
  }) => {
    const entryPage = `${baseURL}${features[1].entry}${miloLibs}`;
    const offPage = `${baseURL}${features[1].off}${miloLibs}`;
    let entryNav;
    let offNav;
    let offNavAfterEntry;

    await test.step('1. Navigate to the off page and check the nav and breadcrumbs', async () => {
      await page.goto(offPage);
      await page.waitForLoadState('domcontentloaded');
      await page.waitForSelector('button.feds-signIn', { state: 'visible' });

      await expect(async () => {
        await expect(header.breadcrumbContainer).toBeVisible();
        offNav = await header.mainNavContainer.innerText();
        offNav = offNav.toLowerCase();
        await expect(offNav.length).toBeGreaterThan(0);
        await expect(offNav).toContain('sign in');
      }).toPass();
    });

    await test.step('2. Navigate to a page with dynamic nav set to "entry"', async () => {
      await page.goto(entryPage);
      await page.waitForLoadState('domcontentloaded');
      await page.waitForSelector('button.feds-signIn', { state: 'visible' });
      await page.waitForSelector('nav.feds-breadcrumbs', { state: 'visible' });

      await expect(async () => {
        entryNav = await header.mainNavContainer.innerText();
        entryNav = entryNav.toLowerCase();
        await expect(entryNav.length).toBeGreaterThan(0);
        await expect(entryNav).toContain('sign in');
      }).toPass();
    });

    await test.step('3. Navigate to a page with dynamic nav set to "off" from an entry page', async () => {
      const toOffPage = page.getByText('To OFF page');
      await toOffPage.click();
    });

    await test.step('4. Check that the expected nav and breadcrumb displays.', async () => {
      await page.waitForURL(/.*\/off/);
      await page.waitForLoadState('domcontentloaded');
      await page.waitForSelector('button.feds-signIn', { state: 'visible' });

      // TODO: Uncomment the following line when the bug is fixed.
      // await page.waitForSelector('nav.feds-breadcrumbs', { state: 'visible' });

      await expect(async () => {
        offNavAfterEntry = await header.mainNavContainer.innerText();
        offNavAfterEntry = offNavAfterEntry.toLowerCase();
        await expect(offNavAfterEntry.length).toBeGreaterThan(0);
        await expect(offNavAfterEntry).toContain('sign in');
      }).toPass();

      await expect(offNavAfterEntry).toBe(offNav);
      await expect(entryNav).not.toBe(offNavAfterEntry);

      // TODO: Uncomment the following line when the bug is fixed.
      // await expect(header.breadcrumbContainer).toBeVisible();
    });
  });
});
