export default class SignInPage {
  constructor(page) {
    this.page = page;
    this.signInButton = page.locator('button[daa-ll="Sign In"].feds-signIn');
    this.signInButtonStageAdobe = page.locator('.profile-comp.secondary-button');
    this.profileIconButton = page.locator('.feds-profile-button');
    this.joinNowButton = page.locator('a:has-text("Join now")');
    this.explorePastArticles = page.locator('a:has-text("Explore past articles")');
    this.newsletterLink = page.locator('a:has-text("product newsletter")');
    this.logoutButton = page.locator('[daa-ll="Sign Out"]');
    this.userNameDisplay = page.locator('.user-name');

    this.IMSEmailPage = page.locator('form#EmailForm');
    this.emailField = page.locator('#EmailPage-EmailField');
    this.emailPageContinueButton = page.locator('//button[@data-id="EmailPage-ContinueButton"]');
    this.IMSPasswordPage = page.locator('form#PasswordForm');
    this.passwordField = page.locator('#PasswordPage-PasswordField');
    this.passwordPageContinueButton = page.locator('//button[@data-id="PasswordPage-ContinueButton"]');
  }

  async signIn(page, partnerLevel) {
    const email = process.env.IMS_EMAIL.split(partnerLevel)[1].split(';')[0];
    await page.waitForLoadState('domcontentloaded');
    await this.emailField.fill(email);
    await this.emailPageContinueButton.click();
    await this.passwordField.fill(process.env.IMS_PASS);
    await this.passwordPageContinueButton.click();
  }

  async verifyLandingPageAfterLogin({ page, expect, path, partnerLevel, expectedLandingPageURL }) {
    await page.goto(path);
    await page.waitForLoadState('domcontentloaded');
    await this.signInButton.click();
    await this.signIn(page, partnerLevel);
    await this.profileIconButton.waitFor({ state: 'visible', timeout: 20000 });
    const pages = await page.context().pages();
    await expect(pages[0].url()).toContain(expectedLandingPageURL);
  }
}
