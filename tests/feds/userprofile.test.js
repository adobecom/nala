/* eslint-disable import/named */
/* eslint-disable no-await-in-loop */
/* eslint-disable import/extensions */
import { expect, test } from '@playwright/test';
import { FedsLogin } from '../../selectors/feds/feds.login.page';
import { FedsHeader } from '../../selectors/feds/feds.header.page';

const parse = require('../../libs/parse.js');
const userProfile = require('../../features/feds/userprofile.spec.js');

const { name, features } = parse(userProfile);
test.describe(`${name}`, () => {
  features.forEach((props) => {
    test(props.title, async ({ page }) => {
      // Initialize FEDS login page:
      const Login = new FedsLogin(page);
      const Header = new FedsHeader(page);
      // Load FEDS user profile page:
      await page.goto(props.url);
      // Wait for page to load & stabilize:
      await page.waitForLoadState('domcontentloaded');
      // Wait for FEDS GNAV to be visible:
      await Header.MainNavLogo.waitFor({ state: 'visible', timeout: 5000 });
      await Header.MainNavContainer.waitFor({ state: 'visible', timeout: 5000 });

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
});
