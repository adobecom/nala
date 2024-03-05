import { expect, test } from '@playwright/test';
import { features } from '../../features/acom/entitlement_Commerce.spec.js';
import EntitlementCommerce from '../../selectors/acom/entitlement.commerce.page.js';
import FedsLogin from '../../selectors/feds/feds.login.page.js';
import FedsHeader from '../../selectors/feds/feds.header.page.js';

test.describe('Acom Loggedin Entitlements test suite', () => {
  // Validate Upgrade commerce flow
  test(`${features[0].name}, ${features[0].tags}`, async ({ page, baseURL }) => {
    console.info(`[Test Page]: ${baseURL}${features[0].path}`);
    const entitlementCommerce = new EntitlementCommerce(page);
    const { data } = features[0];
    const Login = new FedsLogin(page);
    const Header = new FedsHeader(page);

    // Go to test example
    await test.step('Go to test page', async () => {
      await page.goto(`${baseURL}${features[0].path}`);
      await page.waitForLoadState('domcontentloaded');
    });

    // Login with Adobe test account:
    await test.step('Login with a valid Adobe account', async () => {
      await Header.signInButton.waitFor({ state: 'visible', timeout: 5000 });
      await Header.signInButton.click();
      if (entitlementCommerce.loginType.isVisible()) {
        await entitlementCommerce.loginType.waitFor({ state: 'visible', timeout: 5000 });
        await entitlementCommerce.loginType.click();
      }
      await Login.loginOnAppForm(process.env.IMS_EMAIL_PAID_PS, process.env.IMS_PASS_PAID_PS);
    });

    // Validate Upgrade eligibility check w.r.t Buy CTA
    await test.step('Verify cc all apps card cta title', async () => {
      await page.waitForLoadState('domcontentloaded');
      await entitlementCommerce.ccAllAppsCTA.waitFor({ state: 'visible', timeout: 5000 });
      await expect(entitlementCommerce.ccAllAppsCTA).toHaveText(data.UpgradeCTATitle);
    });

    // Validate Upgrade eligibility check w.r.t Switch modal
    await test.step('Verify Switch modal launch for Upgrade', async () => {
      await entitlementCommerce.ccAllAppsCTA.click();
      await entitlementCommerce.switchModalIframe.waitFor({ state: 'visible', timeout: 30000 });
      await expect(entitlementCommerce.switchModalIframe).toBeVisible();
    });
  });

  // Validate Download commerce flow
  test(`${features[1].name}, ${features[1].tags}`, async ({ page, baseURL }) => {
    console.info(`[Test Page]: ${baseURL}${features[0].path}`);
    const entitlementCommerce = new EntitlementCommerce(page);
    const { data } = features[1];
    const Login = new FedsLogin(page);
    const Header = new FedsHeader(page);

    // Go to test example
    await test.step('Go to test page', async () => {
      await page.goto(`${baseURL}${features[1].path}`);
      await page.waitForLoadState('domcontentloaded');
    });

    // Login with Adobe test account:
    await test.step('Login with a valid Adobe account', async () => {
      await Header.signInButton.waitFor({ state: 'visible', timeout: 5000 });
      await Header.signInButton.click();
      if (entitlementCommerce.loginType.isVisible()) {
        await entitlementCommerce.loginType.waitFor({ state: 'visible', timeout: 5000 });
        await entitlementCommerce.loginType.click();
      }
      await Login.loginOnAppForm(process.env.IMS_EMAIL_PAID_PS, process.env.IMS_PASS_PAID_PS);
    });

    // Validate Download eligibility check w.r.t Buy CTA
    await test.step('Verify photoshop card cta title', async () => {
      await page.waitForLoadState('domcontentloaded');
      await entitlementCommerce.photoshopBuyCTA.waitFor({ state: 'visible', timeout: 5000 });
      await expect(entitlementCommerce.photoshopBuyCTA).toHaveText(data.DownloadCTATitle);
      await expect(entitlementCommerce.photoshopFreeCTA).toHaveText(data.TrialCTATitle);
    });

    // Validate Download eligibility check w.r.t download link
    await test.step('Verify download link for download', async () => {
      await entitlementCommerce.photoshopBuyCTA.click();
      await page.waitForLoadState('domcontentloaded');
      await expect(page.url()).toContain(data.DownloadUrl);
    });
  });
});
