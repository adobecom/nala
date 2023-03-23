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
      await Header.MainNavLogo.waitFor({state: 'visible', timeout: 10000});
      await Header.MainNavContainer.waitFor({state: 'visible', timeout: 10000});

      // Login with a valid ACOM account:
      await Header.SignInLabel.click();
      await Login.loginOnAppForm(process.env.IMS_EMAIL, process.env.IMS_PASS);

      // Check FEDS user profile:
      await Header.openUserProfile();
      await expect(Header.ProfileModal).toBeVisible();
      await expect(Header.ProfileName).toBeVisible();
      await expect(Header.ProfileEmail).toBeVisible();
      await expect(Header.ProfileSignOut).toBeVisible();
      await expect(Header.ProfileAccountLink).toBeVisible();
      await Header.closeUserProfile();
      await expect(Header.ProfileModal).not.toBeVisible();
    });
  });
});
