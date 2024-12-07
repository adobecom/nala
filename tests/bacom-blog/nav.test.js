import { test, expect } from '@playwright/test';
import { features } from '../../features/bacom-blog/nav.spec.js';
import FedsHeader from '../../selectors/feds/feds.header.page.js';

let fedsHeader;

const miloLibs = process.env.MILO_LIBS || '';

test.describe('Bacom Blog header nav test suite', () => {
  test.beforeEach(async ({ page }) => {
    fedsHeader = new FedsHeader(page);
  });

  test(`0: Selecting header nav links, ${features[0].tags}`, async ({ page, baseURL, context }) => {
    console.info(`[Test Page]: ${baseURL}${features[0].path}${miloLibs}`);
    const testPage = `${baseURL}${features[0].path}${miloLibs}`;
    await page.goto(testPage);
    await page.waitForLoadState('networkidle');

    await test.step('Selecting Adobe Account from the Sign In dropdown', async () => {
      await fedsHeader.signInButton.click();
      const navigatedTo = page.url();
      await expect(navigatedTo).not.toBe(testPage);
      await expect(navigatedTo).toContain('auth-stg1.services.adobe.com');
    });

    await test.step('Selecting third nav option', async () => {
      await page.goto(testPage);
      await page.waitForLoadState('networkidle');
      await fedsHeader.thirdNavItem.click();
      const navigatedTo = page.url();
      await expect(navigatedTo).not.toBe(testPage);
    });

    await test.step('Selecting brand logo', async () => {
      if (testPage.includes('main--bacom')) {
        await page.waitForTimeout(3000);
        const [newPage] = await Promise.all([
          context.waitForEvent('page'),
          fedsHeader.mainNavLogo.click(),
        ]);
        await newPage.waitForLoadState('domcontentloaded');
        const navigatedTo = newPage.url();
        await expect(navigatedTo).not.toBe(testPage);
        await newPage.close();
      } else {
        await fedsHeader.mainNavLogo.click();
        const navigatedTo = page.url();
        await expect(navigatedTo).not.toBe(testPage);
      }
    });

    await test.step('Selecting the nav CTA', async () => {
      await page.goto(testPage);
      await page.waitForLoadState('domcontentloaded');
      if (testPage.includes('main--bacom')) {
        const [newPage] = await Promise.all([
          context.waitForEvent('page'),
          fedsHeader.fedsCta.click(),
        ]);
        await newPage.waitForLoadState('domcontentloaded');
        const navigatedTo = newPage.url();
        await expect(navigatedTo).not.toBe(testPage);
        await newPage.close();
      } else {
        await fedsHeader.fedsCta.click();
        const navigatedTo = page.url();
        await expect(navigatedTo).not.toBe(testPage);
      }
    });
  });
});
