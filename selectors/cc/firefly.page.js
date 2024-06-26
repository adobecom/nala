import { expect } from '@playwright/test';

export default class firefly {
  constructor(page) {
    this.page = page;
    // firefly UI elements in page
    this.FFInteractiveCards = page.locator('.interactive-container');
    this.FFEntisement = page.locator('.enticement-container');
    this.promptDefaultText = page.locator('masonry-prompttext');
    this.searchPromptBox = page.locator('.masonry-prompttext').nth(1);
    this.generateCTA = page.locator('.con-button.blue.masonry-generate.button-xl').nth(1);
    // signin page locatores
    this.IMSPageLoad = page.locator('form#EmailForm');
    this.IMSFireflyCanvas = page.locator('.Canvas.Canvas--background-firefly2023');
    this.signInEmailAddress = page.locator('#EmailPage-EmailField');
    this.emailIdContinueBtn = page.locator('//button[@data-id="EmailPage-ContinueButton"]');
    this.IMSPasswordPage = page.locator('form#PasswordForm');
    this.signInPassword = page.locator('#PasswordPage-PasswordField');
    this.passwordContinueBtn = page.locator('//button[@data-id="PasswordPage-ContinueButton"]');
    this.IMSProfileInPasswordPage = page.locator('.Profile-Picture');
    this.FFpageLoad = page.locator('.universal-nav-container');
  }

  /**
   * @param  {string} email
   * @param  {string} password
   * @return {Promise} PlayWright promise
   */

  async stage_login(email, password) {
    expect(process.env.IMS_EMAIL, 'ERROR: No environment variable found for IMS_EMAIL').toBeTruthy();
    expect(process.env.IMS_PASS, 'ERROR: No environment variable found for IMS_PASS.').toBeTruthy();
    console.log('using IMS stage credentials to login to Firefly custom IMS page');
    // Wait for page to load & stabilize:
    await this.page.waitForLoadState('networkidle');
    // Wait for Firefly IMS page
    await this.IMSPageLoad.waitFor({ state: 'visible', timeout: 5000 });
    await this.signInEmailAddress.fill(email);
    await this.page.keyboard.press('Tab');
    await this.emailIdContinueBtn.click();
    // Wait for next IMS page to load
    await this.page.waitForLoadState('domcontentloaded');
    // Enter password and proceed
    await this.IMSPasswordPage.waitFor({ state: 'visible', timeout: 10000 });
    // await this.signInPassword.waitFor({ state: 'visible', timeout: 5000 });
    await this.signInPassword.fill(password);
    // Complete the login flow:
    await this.passwordContinueBtn.waitFor({ state: 'visible', timeout: 10000 });
    await this.passwordContinueBtn.click();
    // Check if login process was successful:
    await this.FFpageLoad.waitFor({ state: 'visible', timeout: 20000 });
    console.info('Login success');
  }

  // eslint-disable-next-line no-unused-vars
  async promtbar_input(searchtext) {
    console.log('this function use check give prompt text reside in product page');
    // eslint-disable-next-line no-template-curly-in-string
    this.promptsearchtext = this.page.locator('//textarea[contains (text(),"#${searchtext}")]');
    expect(this.promptsearchtext).toBeTruthy();
  }
}
