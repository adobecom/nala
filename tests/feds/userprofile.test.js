/* eslint-disable no-restricted-syntax */
/* eslint-disable no-await-in-loop */
const { expect, test } = require('@playwright/test');
const parse = require('../../libs/parse.js');
const consent = require('../../features/feds/userprofile.spec.js');
import { FedsLogin } from '../../pages/feds.login.page';
import { FedsHeader } from '../../pages/feds.header.page';

const { name, features } = parse(consent);
test.describe(`${name}`, () => {
  features.forEach((props) => {
    test(props.title, async ({ page, browser }) => {
      // Initialize FEDS login page:
      const Login = new FedsLogin(page);
      const Header = new FedsHeader(page);
      // Load FEDS user profile page:
      await page.goto(props.url);
      // Wait for page to load & stabilize:
      await page.waitForLoadState('domcontentloaded');

      // Wait for FEDS GNAV to be visible:
      await Header.MainNavLogo.waitFor({state: 'visible', timeout: 5000});
      await Header.MainNavContainer.waitFor({state: 'visible', timeout: 5000});
      // Click 'Sign In' label:
      await Header.SignInLabel.waitFor({state: 'visible', timeout: 5000});
      await Header.SignInLabel.click();
      // Login with a valid ACOM account:
      await Login.loginOnAppForm(process.env.IMS_EMAIL, process.env.IMS_PASS);

      // Check FEDS user profile:
      await Header.openUserProfile();
      await expect(Header.ProfileModal).toBeVisible();
      await Header.checkUserProfile();
      await Header.closeUserProfile();
      await expect(Header.ProfileModal).not.toBeVisible();
    });
  });
});
