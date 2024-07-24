import { test, expect } from '@playwright/test';
import SignInPage from '../../selectors/dx/signin.page.js';

let signInPage;
const signin = require('../../features/dx/signin.spec.js');

const { features } = signin;
const uniqueFeatures = features.slice(8, 11);

test.describe('MAPP sign in flow', () => {
  test.beforeEach(async ({ page }) => {
    signInPage = new SignInPage(page);
  });

  test(`${features[0].name},${features[0].tags}`, async ({ page }) => {
    await test.step('Go to public home page', async () => {
      await page.goto(`${features[0].path}`);
      await page.waitForLoadState('domcontentloaded');
      await signInPage.signInButton.click();
    });

    await test.step('Sign in', async () => {
      await signInPage.signIn(page, `${features[0].data.partnerLevel}`);
    });

    await test.step('Verify redirection to protected home page after successful login', async () => {
      await signInPage.profileIconButton.waitFor({ state: 'visible', timeout: 20000 });
      const pages = await page.context().pages();
      await expect(pages[0].url())
        .toContain(`${features[0].data.expectedProtectedURL}`);
    });

    await test.step('Logout', async () => {
      await signInPage.profileIconButton.click();
      await signInPage.logoutButton.click();
    });

    await test.step('Verify redirection to public home page after logout', async () => {
      await signInPage.signInButton.waitFor({ state: 'visible', timeout: 10000 });
      const pages = await page.context().pages();
      await expect(pages[0].url())
        .toContain(`${features[0].data.expectedPublicURL}`);
    });
  });

  test(`${features[1].name},${features[1].tags}`, async ({ page }) => {
    await test.step('Go to public home page', async () => {
      await page.goto(`${features[1].path}`);
      await page.waitForLoadState('domcontentloaded');
      const joinNowButton = await signInPage.joinNowButton;
      await expect(joinNowButton).toBeVisible();
      const explorePastArticlesButton = await signInPage.explorePastArticles;
      await expect(explorePastArticlesButton).toBeVisible();
      const newsletterLink = await signInPage.newsletterLink;
      await expect(newsletterLink).toBeHidden();
      await signInPage.signInButton.click();
    });

    await test.step('Sign in', async () => {
      await signInPage.signIn(page, `${features[1].data.partnerLevel}`);
    });

    await test.step('Verify restricted news after successful login', async () => {
      await signInPage.profileIconButton.waitFor({ state: 'visible', timeout: 20000 });
      const pages = await page.context().pages();
      await expect(pages[0].url())
        .toContain(`${features[1].data.expectedToSeeInURL}`);
      const joinNowButton = await signInPage.joinNowButton;
      await expect(joinNowButton).toBeHidden();
      const explorePastArticlesButton = await signInPage.explorePastArticles;
      await expect(explorePastArticlesButton).toBeVisible();
      const newsletterLink = await signInPage.newsletterLink;
      await expect(newsletterLink).toBeVisible();
    });

    await test.step('Logout', async () => {
      await signInPage.profileIconButton.click();
      await signInPage.logoutButton.click();
    });

    await test.step('Verify public news page after logout', async () => {
      await signInPage.signInButton.waitFor({ state: 'visible', timeout: 10000 });
      const pages = await page.context().pages();
      await expect(pages[0].url())
        .toContain(`${features[1].data.expectedToSeeInURL}`);
      const joinNowButton = await signInPage.joinNowButton;
      await expect(joinNowButton).toBeVisible();
      const explorePastArticlesButton = await signInPage.explorePastArticles;
      await expect(explorePastArticlesButton).toBeVisible();
      const newsletterLink = await signInPage.newsletterLink;
      await expect(newsletterLink).toBeHidden();
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

    await test.step('Sign in with spp community user', async () => {
      await signInPage.signIn(page, `${features[2].data.partnerLevel}`);
      await signInPage.userNameDisplay.waitFor({ state: 'visible', timeout: 15000 });
    });

    await test.step('Open public page in a new tab', async () => {
      const newTab = await context.newPage();
      await newTab.goto(`${features[2].path}`);
      const newTabPage = new SignInPage(newTab);
      await newTabPage.profileIconButton.waitFor({ state: 'visible', timeout: 20000 });
      const pages = await page.context().pages();
      await expect(pages[1].url())
        .toContain(`${features[2].data.expectedProtectedURL}`);
    });
  });

  test(`${features[3].name},${features[3].tags}`, async ({ page, context }) => {
    await test.step('Go to stage.adobe.com', async () => {
      const url = `${features[3].baseURL}`;
      await page.evaluate((navigationUrl) => {
        window.location.href = navigationUrl;
      }, url);

      await signInPage.signInButtonStageAdobe.click();
      await page.waitForLoadState('domcontentloaded');
    });

    await test.step('Sign in with spp platinum user', async () => {
      await signInPage.signIn(page, `${features[3].data.partnerLevel}`);
      await signInPage.userNameDisplay.waitFor({ state: 'visible', timeout: 15000 });
    });

    await test.step('Open restricted page in a new tab', async () => {
      const newTab = await context.newPage();
      await newTab.goto(`${features[3].path}`);
      const newTabPage = new SignInPage(newTab);
      await newTabPage.profileIconButton.waitFor({ state: 'visible', timeout: 20000 });
      const pages = await page.context().pages();
      await expect(pages[1].url())
        .toContain(`${features[3].data.expectedProtectedURL}`);
    });
  });

  test(`${features[4].name},${features[4].tags}`, async ({ page }) => {
    await test.step('Go to public home page', async () => {
      await page.goto(`${features[4].path}`);
      await page.waitForLoadState('domcontentloaded');
      await signInPage.signInButton.click();
    });

    await test.step('Sign in', async () => {
      await signInPage.signIn(page, `${features[4].data.partnerLevel}`);
    });

    await test.step('Verify redirection to contact not found page after successful login', async () => {
      await signInPage.profileIconButton.waitFor({ state: 'visible', timeout: 20000 });
      const pages = await page.context().pages();
      await expect(pages[0].url())
        .toContain(`${features[4].data.expectedToSeeInURL}`);
    });

    await test.step('Logout', async () => {
      await signInPage.profileIconButton.click();
      await signInPage.logoutButton.click();
    });

    await test.step('Go to public news page', async () => {
      await page.goto(`${features[4].newsPath}`);
      await page.waitForLoadState('domcontentloaded');
      await signInPage.signInButton.click();
    });

    await test.step('Sign in', async () => {
      await signInPage.signIn(page, `${features[4].data.partnerLevel}`);
    });

    await test.step('Verify redirection to contact not found page after successful login', async () => {
      await signInPage.profileIconButton.waitFor({ state: 'visible', timeout: 20000 });
      const pages = await page.context().pages();
      await expect(pages[0].url())
        .toContain(`${features[4].data.expectedToSeeInURL}`);
    });
  });

  test(`${features[5].name},${features[5].tags}`, async ({ page, context }) => {
    await test.step('Go to stage.adobe.com', async () => {
      const url = `${features[5].baseURL}`;
      await page.evaluate((navigationUrl) => {
        window.location.href = navigationUrl;
      }, url);

      await signInPage.signInButtonStageAdobe.click();
      await page.waitForLoadState('domcontentloaded');
    });

    await test.step('Sign in with tpp platinum user', async () => {
      await signInPage.signIn(page, `${features[5].data.partnerLevel}`);
      await signInPage.userNameDisplay.waitFor({ state: 'visible', timeout: 15000 });
    });

    await test.step('Open protected home page in a new tab', async () => {
      const newTab = await context.newPage();
      await newTab.goto(`${features[5].path}`);
      const newTabPage = new SignInPage(newTab);
      await newTabPage.profileIconButton.waitFor({ state: 'visible', timeout: 20000 });
      const pages = await page.context().pages();
      await expect(pages[1].url())
        .toContain(`${features[5].data.expectedToSeeInURL}`);
      const signInButton = await signInPage.signInButton;
      await expect(signInButton).toBeHidden();
    });
  });

  test(`${features[6].name},${features[6].tags}`, async ({ page, context }) => {
    await test.step('Go to stage.adobe.com', async () => {
      const url = `${features[6].baseURL}`;
      await page.evaluate((navigationUrl) => {
        window.location.href = navigationUrl;
      }, url);

      await signInPage.signInButtonStageAdobe.click();
      await page.waitForLoadState('domcontentloaded');
    });

    await test.step('Sign in with tpp platinum user', async () => {
      await signInPage.signIn(page, `${features[6].data.partnerLevel}`);
      await signInPage.userNameDisplay.waitFor({ state: 'visible', timeout: 15000 });
    });

    await test.step('Open public page in a new tab', async () => {
      const newTab = await context.newPage();
      await newTab.goto(`${features[6].path}`);
      const newTabPage = new SignInPage(newTab);
      await newTabPage.profileIconButton.waitFor({ state: 'visible', timeout: 20000 });
      const pages = await page.context().pages();
      await expect(pages[1].url())
        .toContain(`${features[6].data.expectedToSeeInURL}`);
      const signInButton = await newTabPage.signInButton;
      await expect(signInButton).toBeHidden();
      const joinNowButton = await newTabPage.joinNowButton;
      await expect(joinNowButton).toBeVisible();
    });
  });

  test(`${features[7].name},${features[7].tags}`, async ({ page }) => {
    await test.step('Go to protected home page', async () => {
      await page.goto(`${features[7].path}`);
      const pages = await page.context().pages();
      await expect(pages[0].url())
        .toContain(`${features[7].expectedToSeeInURL}`);
    });
  });

  uniqueFeatures.forEach((feature) => {
    test(`${feature.name},${feature.tags}`, async ({ page }) => {
      await signInPage.verifyLandingPageAfterLogin({
        page,
        partnerLevel: feature.data.partnerLevel,
        status: feature.data.status,
        expectedLandingPageURL: feature.data.expectedLandingPageURL,
        test,
        expect,
        path: feature.path,
      });
    });
  });
});
