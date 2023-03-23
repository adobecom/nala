import { expect, test } from '@playwright/test';

exports.FedsLogin = class FedsLogin {

  constructor(page) {
    this.page = page;

    this.LoginButton = page.locator('button#sign_in');
    this.LoginForm = page.locator('form#adobeid_signin');
    this.EmailField = page.locator('input#adobeid_username');
    this.PasswordField  = page.locator('input#adobeid_password');

    this.LoggedInState = page.locator('img.feds-profile-img');
    this.LoginWithEnterpriseId = page.locator('a#enterprise_signin_link');
    this.ForgotPasswordLink  = page.locator('a#adobeid_trouble_signing_in');

    this.LoginWithFacebook = page.locator('a.mod-facebook');
    this.LoginWithGoogle = page.locator('a.mod-google');
    this.LoginWithApple = page.locator('a.mod-apple');

    this.AppEmailForm = page.locator('form#EmailForm');
    this.AppPasswordForm = page.locator('form#PasswordForm');
    this.AppEmailField = page.locator('input#EmailPage-EmailField');
    this.AppPasswordField = page.locator('input#PasswordPage-PasswordField');
    this.AppVisibilityToggle = page.locator('button.PasswordField-VisibilityToggle');
    this.AppPasswordContinue = page.locator('button[data-id^="EmailPage"]');
    this.AppLoginContinue = page.locator('button[data-id^="PasswordPage"]');
    this.PersonalAccountLogo = page.locator('img[alt="Personal Account"]');
    this.SelectAccountForm = page.locator('div[data-id="Profile"]');

    this.AppEmailFieldSelector = page.locator('input#EmailPage-EmailField');
    this.AppPasswordFieldSelector = page.locator('input#PasswordPage-PasswordField');
    this.CodePadChallenge = page.locator('div[data-id="ChallengeCodePage"]');
  }

  async loginOnAppForm(email, password) {
    console.info(`[EuroLogin] APP login form identified!`);
    console.info(`[EuroLogin] Logging in with '${email}' account ...`);
    // Wait for page to load & stabilize:
    await this.page.waitForLoadState('domcontentloaded');
    // Wait for the SUSI login form to load:
    await this.AppEmailForm.waitFor({state: 'visible', timeout: 10000});
    // Insert account email & click 'Continue':
    await this.AppEmailField.waitFor({state: 'visible', timeout: 10000});
    await this.AppEmailField.fill(email);
    await this.AppPasswordContinue.waitFor({state: 'visible', timeout: 10000});
    await expect(this.AppPasswordContinue).toHaveText('Continue');
    await this.AppPasswordContinue.click();
    // Insert account password & click 'Continue':
    await this.AppPasswordForm.waitFor({state: 'visible', timeout: 10000});
    await this.AppPasswordField.waitFor({state: 'visible', timeout: 10000});
    await this.AppPasswordField.fill(password);
    await this.AppLoginContinue.waitFor({state: 'visible', timeout: 10000});
    await expect(this.AppLoginContinue).toHaveText('Continue');
    await this.AppLoginContinue.click();
    // Assert the login process was successful:
    await this.LoggedInState.waitFor({state: 'visible', timeout: 10000});
    console.info(`[EuroLogin] Successfully logged-in as '${email}' (via APP login form).`);
  }

  async loginOnSusiForm(email, password) {
    console.info(`[EuroLogin] SUSI login form identified!`);
    console.info(`[EuroLogin] Logging in with '${email}' account ...`);
    // Wait for page to load & stabilize:
    await this.page.waitForLoadState('networkidle');
    // Wait for the SUSI login form to load:
    await this.LoginForm.waitFor({state: 'visible', timeout: 10000});
    // Set email & click 'Continue':
    await this.EmailField.waitFor({state: 'visible', timeout: 10000});
    await this.EmailField.fill(email);
    // !Note: Email field has short client-side validation (load).
    //        Password field is not interactable during that time.
    await this.page.keyboard.press('Tab');
    // Set password & click 'Continue':
    await this.AppPasswordForm.waitFor({state: 'visible', timeout: 10000});
    await this.PasswordField.waitFor({state: 'visible', timeout: 10000});
    await this.PasswordField.fill(password);
    // Complete the login flow:
    await this.LoginButton.waitFor({state: 'visible', timeout: 10000});
    await this.LoginButton.click();
    // Assert the login process was successful:
    await this.LoggedInState.waitFor({state: 'visible', timeout: 10000});
    console.info(`[EuroLogin] Successfully logged-in as '${email}' (via SUSI login form).`);
  }

  async togglePasswordVisibility(password) {
    await this.AppVisibilityToggle.waitFor({state: 'visible', timeout: 10000});
    await this.AppVisibilityToggle.click();
    await expect(this.AppPasswordField).toContain(password);
    await this.AppVisibilityToggle.click();
    await this.AppVisibilityToggle.waitFor({state: 'visible', timeout: 10000});
  }
};
