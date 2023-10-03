/* eslint-disable import/named */
/* eslint-disable no-await-in-loop */
/* eslint-disable import/extensions */
import { expect, test } from '@playwright/test';
import { features } from '../../features/feds/userprofile.spec.js';
import FedsLogin from '../../selectors/feds/feds.login.page.js';
import FedsHeader from '../../selectors/feds/feds.header.page.js';

test.describe('User Profile Component test suite', () => {
  // FEDS User Profile Checks:
  test(`${features[0].name}, ${features[0].tags}`, async ({ page, baseURL }) => {
    const Login = new FedsLogin(page);
    const Header = new FedsHeader(page);
    console.info(`[FEDSInfo] Checking page: ${baseURL}${features[0].path}`);

    await test.step('Navigate to FEDS user profile page', async () => {
      await page.goto(`${baseURL}${features[0].path}${features[0].browserParams}`);
      await page.waitForLoadState('domcontentloaded');
      await expect(page).toHaveURL(`${baseURL}${features[0].path}${features[0].browserParams}`);
      // Wait for FEDS GNAV to be visible:
      await Header.mainNavLogo.waitFor({ state: 'visible', timeout: 5000 });
      await Header.mainNavContainer.waitFor({ state: 'visible', timeout: 5000 });
    });

    await test.step('Login with a valid Adobe account', async () => {
      // Click 'Sign In' label:
      await Header.signInButton.waitFor({ state: 'visible', timeout: 5000 });
      await Header.signInButton.click();
      await Login.loginOnAppForm(process.env.IMS_EMAIL, process.env.IMS_PASS);
    });

    await test.step('Check FEDS user profile component', async () => {
      await Header.openUserProfile();
      await expect(Header.profileModal).toBeVisible();
      await Header.checkUserProfile();
      await Header.closeUserProfile();
      await expect(Header.profileModal).not.toBeVisible();
    });
  });
});
