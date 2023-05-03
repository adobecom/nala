/* eslint-disable import/named */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-await-in-loop */
import { FedsLogin } from '../../selectors/feds/feds.login.page.js';
import { FedsHeader } from '../../selectors/feds/feds.header.page.js';

const { expect, test } = require('@playwright/test');
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
      // Click 'Sign In' label:
      await Header.SignInLabel.waitFor({ state: 'visible', timeout: 5000 });
      await Header.SignInLabel.click();
      // Login with a valid ACOM account:
      await Login.LoginOnAppForm(process.env.IMS_EMAIL, process.env.IMS_PASS);

      // Check FEDS user profile:
      await Header.OpenUserProfile();
      await expect(Header.ProfileModal).toBeVisible();
      await Header.CheckUserProfile();
      await Header.CloseUserProfile();
      await expect(Header.ProfileModal).not.toBeVisible();
    });
  });
});
