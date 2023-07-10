/* eslint-disable import/named */
/* eslint-disable no-await-in-loop */
/* eslint-disable import/extensions */
import { expect, test } from '@playwright/test';
import { FedsLogin } from '../../selectors/feds/feds.login.page.js';
import { FedsHeader } from '../../selectors/feds/feds.header.page.js';
import { features } from '../../features/feds/userprofile.spec.js';

test.describe('User Profile Component test suite', () => {
  // FEDS User Profile Checks:
  test(`${features[0].name}, ${features[0].tags}`, async ({ page, baseURL }) => {
    const Login = new FedsLogin(page);
    const Header = new FedsHeader(page);
    console.info(`[FEDSInfo] Checking page: ${baseURL}${features[0].path}`);

    await test.step('Navigate to FEDS user profile page', async () => {
      await page.goto(`${baseURL}${features[0].path}`);
      await page.waitForLoadState('domcontentloaded');
      await expect(page).toHaveURL(`${baseURL}${features[0].path}`);
      // Wait for FEDS GNAV to be visible:
      await Header.MainNavLogo.waitFor({ state: 'visible', timeout: 5000 });
      await Header.MainNavContainer.waitFor({ state: 'visible', timeout: 5000 });
    });

    await test.step('Login with a valid Adobe account', async () => {
      // Click 'Sign In' label:
      await Header.SignInLabel.waitFor({ state: 'visible', timeout: 5000 });
      await Header.SignInLabel.click();
      await Login.loginOnAppForm(process.env.IMS_EMAIL, process.env.IMS_PASS);
    });

    await test.step('Check FEDS user profile component', async () => {
      await Header.openUserProfile();
      await expect(Header.ProfileModal).toBeVisible();
      await Header.checkUserProfile();
      await Header.closeUserProfile();
      await expect(Header.ProfileModal).not.toBeVisible();
    });
  });
});
