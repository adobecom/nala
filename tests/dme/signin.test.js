import { test, expect } from '@playwright/test';
import SignInPage from '../../selectors/dme/signin.page.js';

let signInPage;
const signin = require('../../features/dme/signin.spec.js');

const { features } = signin;
const redirectionFeatures = features.slice(1, 3);

test.describe('MAPC sign in flow', () => {
  test.beforeEach(async ({ page }) => {
    signInPage = new SignInPage(page);
  });

  test(`${features[0].name},${features[0].tags}`, async ({ page }) => {
    await test.step('Go to the home page', async () => {
      await page.goto(`${features[0].path}`);
      await page.waitForLoadState('domcontentloaded');
      await signInPage.signInButton.click();
    });

    await test.step('Sign in', async () => {
      await signInPage.signIn(page, `${features[0].data.partnerLevel}`);
    });

    await test.step('Verify redirection to restricted home after successful login', async () => {
      await signInPage.profileIconButton.waitFor({ state: 'visible', timeout: 20000 });
      const pages = await page.context().pages();
      await expect(pages[0].url()).toContain(`${features[0].data.expectedProtectedHomeURL}`);
    });

    await test.step('Logout', async () => {
      await signInPage.profileIconButton.click();
      await signInPage.logoutButton.click();
    });

    await test.step('Verify redirection to public page after logout', async () => {
      await signInPage.signInButton.waitFor({ state: 'visible', timeout: 10000 });
      const pages = await page.context().pages();
      await expect(pages[0].url())
        .toContain(`${features[0].data.expectedPublicPageURL}`);
    });
  });

  redirectionFeatures.forEach((feature) => {
    test(`${feature.name},${feature.tags}`, async ({ page, context }) => {
      const newTab = await context.newPage();
      const newTabPage = new SignInPage(newTab);
      await signInPage.verifyRedirectAfterLogin({
        page,
        test,
        expect,
        newTab,
        newTabPage,
        feature,
      });
    });
  });
});
