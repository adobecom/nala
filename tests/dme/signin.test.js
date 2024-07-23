import { test, expect } from '@playwright/test';
import SignInPage from '../../selectors/dme/signin.page.js';

let signInPage;
const signin = require('../../features/dme/signin.spec.js');

const { features } = signin;

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

  test(`${features[1].name},${features[1].tags}`, async ({ page, context }) => {
    await test.step('Go to stage.adobe.com', async () => {
      const url = `${features[1].baseURL}`;
      await page.evaluate((navigationUrl) => {
        window.location.href = navigationUrl;
      }, url);

      await signInPage.signInButtonStageAdobe.click();
      await page.waitForLoadState('domcontentloaded');
    });

    await test.step('Sign in with cpp spain platinum user', async () => {
      await signInPage.signIn(page, `${features[1].data.partnerLevel}`);
      await signInPage.userNameDisplay.waitFor({ state: 'visible', timeout: 20000 });
    });

    await test.step('Open public page in a new tab', async () => {
      const newTab = await context.newPage();
      await newTab.goto(`${features[1].path}`);
      const newTabPage = new SignInPage(newTab);
      await newTabPage.profileIconButton.waitFor({ state: 'visible', timeout: 20000 });
      const pages = await page.context().pages();
      await expect(pages[1].url())
        .toContain(`${features[1].data.expectedToSeeInURL}`);
    });
  });

  test(`${features[2].name},${features[2].tags}`, async ({ page, context }) => {
    await test.step('Go to stage.adobe.com', async () => {
      const url = `${features[2].baseURL}`;
      await page.evaluate((navigationUrl) => {
        window.location.href = navigationUrl;
      }, url);

      await signInPage.signInButtonStageAdobe.click();
      await page.waitForLoadState('domcontentloaded');
    });

    await test.step('Sign in with cpp spain platinum user', async () => {
      await signInPage.signIn(page, `${features[2].data.partnerLevel}`);
      await signInPage.userNameDisplay.waitFor({ state: 'visible', timeout: 20000 });
    });

    await test.step('Open restricted page in a new tab', async () => {
      const newTab = await context.newPage();
      await newTab.goto(`${features[2].path}`);
      const newTabPage = new SignInPage(newTab);
      await newTabPage.profileIconButton.waitFor({ state: 'visible', timeout: 20000 });
      const pages = await page.context().pages();
      await expect(pages[1].url())
        .toContain(`${features[2].data.expectedToSeeInURL}`);
    });
  });
});
