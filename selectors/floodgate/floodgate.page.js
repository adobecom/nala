import { expect } from '@playwright/test';

/**
 * Floodgate Page Object
 *
 * Handles EdgeWorker content gating verification for Summit 2026 Floodgate Migration.
 *
 * Key Logic Gates:
 * - Time Check: Is CurrentTime <, >, or == EventStart/End?
 * - Auth Check: Is aux_sid (IMS session) present?
 * - Audience Check: Is the user in the AEP Allowlist?
 * - Cookie State: Is fg_acom already set?
 *
 * Verification Points:
 * - FG Cookie: fg_acom_stg (stage) / fg_acom (prod)
 * - Response Header: x-adobe-content = "AEM-floodgate-pink-dx" for Floodgate content
 */
export default class FloodgatePage {
  constructor(page, env = 'stage') {
    this.page = page;
    this.env = env;

    // Environment-specific configuration
    this.config = {
      stage: {
        baseUrl: 'https://business.stage.adobe.com',
        configUrl: 'https://business.stage.adobe.com/.milo/pub/fg-edge-worker-config.json',
        fgCookie: 'fg_acom_stg',
        domain: '.stage.adobe.com',
      },
      prod: {
        baseUrl: 'https://business.adobe.com',
        configUrl: 'https://business.adobe.com/.milo/pub/fg-edge-worker-config.json',
        fgCookie: 'fg_acom',
        domain: '.adobe.com',
      },
    }[env];

    // Header constants for verification
    this.headers = {
      contentHeader: 'x-adobe-content', // Response header to check
      floodgateValue: 'AEM-floodgate-pink-dx', // Value when FG content is served
      vary: 'vary',
      cacheControl: 'cache-control',
    };

    // Cookie constants
    this.cookies = {
      session: 'aux_sid',
      fg: this.config.fgCookie,
    };

    // Response headers from main document
    this.responseHeaders = {};

    // Page selectors for content verification
    this.selectors = {
      // Common page elements that should exist on any loaded page
      pageLoaded: '.feds-header, header, .gnav, nav',
      mainContent: 'main, .main-content, [role="main"]',
      // Summit specific selectors (update based on actual page)
      sessionsList: '.sessions-list, .session-cards, .card-collection',
      sessionTitle: 'h1, .session-title, .hero-title',
      // Footer to confirm full page load
      footer: 'footer, .feds-footer, .global-footer',
    };
  }

  /**
   * Verify page loaded and get page status
   * Note: 404 is valid "Source content" for non-logged-in users before event
   * @param {Object} options - Verification options
   * @param {boolean} options.allow404 - If true, 404 is considered valid (default: true)
   * @returns {Promise<{loaded: boolean, pageTitle: string, is404: boolean, url: string}>}
   */
  async verifyPageLoaded(options = {}) {
    const { allow404 = true } = options;

    const result = {
      loaded: false,
      pageTitle: '',
      is404: false,
      url: '',
      headerVisible: false,
    };

    try {
      // Wait for page to be in a loaded state
      await this.page.waitForLoadState('domcontentloaded');

      // Get current URL and title
      result.url = this.page.url();
      result.pageTitle = await this.page.title();

      // Check for header/nav (proves browser actually rendered something)
      const header = this.page.locator(this.selectors.pageLoaded);
      result.headerVisible = await header.first().isVisible({ timeout: 5000 }).catch(() => false);

      // Check if this is a 404 page
      result.is404 = result.pageTitle.includes('404')
        || result.pageTitle.toLowerCase().includes('not found');

      // Page is "loaded" if:
      // 1. We have some content (header visible OR we got a page title)
      // 2. AND either it's not 404, OR 404 is allowed
      result.loaded = (result.headerVisible || result.pageTitle.length > 0)
        && (allow404 || !result.is404);

      console.info(`[FG] Page URL: ${result.url}`);
      console.info(`[FG] Page title: "${result.pageTitle}"`);
      if (result.is404) {
        console.info('[FG] Page is 404 (expected for non-logged-in users before event)');
      }

      return result;
    } catch (error) {
      console.info(`[FG] Page load check error: ${error.message}`);
      return result;
    }
  }

  /**
   * Get text content from the page for verification
   * @param {string} selector - CSS selector
   * @returns {Promise<string>}
   */
  async getTextContent(selector) {
    try {
      const element = this.page.locator(selector).first();
      if (await element.isVisible({ timeout: 3000 })) {
        return await element.textContent();
      }
      return '';
    } catch {
      return '';
    }
  }

  /**
   * Get the main heading (h1) text from the page
   * @returns {Promise<string>}
   */
  async getMainHeading() {
    return this.getTextContent('h1');
  }

  /**
   * Check if page contains specific text
   * @param {string} text - Text to search for
   * @returns {Promise<boolean>}
   */
  async pageContainsText(text) {
    try {
      const content = await this.page.textContent('body');
      return content.includes(text);
    } catch {
      return false;
    }
  }

  /**
   * Take a screenshot for visual verification
   * @param {string} name - Screenshot name
   * @returns {Promise<Buffer>}
   */
  async takeScreenshot(name) {
    const timestamp = Date.now();
    const path = `test-results/floodgate/screenshots/${name}-${timestamp}.png`;
    await this.page.screenshot({ path, fullPage: false });
    console.info(`[FG] Screenshot saved: ${path}`);
    return path;
  }

  /**
   * Comprehensive page verification
   * Checks both headers AND actual page content
   * @returns {Promise<{isFloodgate: boolean, pageLoaded: boolean, details: object}>}
   */
  async getContentStatus() {
    const result = {
      isFloodgate: false,
      pageLoaded: false,
      contentHeader: '',
      pageTitle: '',
      mainHeading: '',
      hasFgCookie: false,
    };

    // Check HTTP header
    result.contentHeader = this.getContentHeaderValue();
    result.isFloodgate = this.isFloodgateContent();

    // Verify page actually loaded
    const pageCheck = await this.verifyPageLoaded();
    result.pageLoaded = pageCheck.loaded;
    result.pageTitle = pageCheck.pageTitle;

    // Get main heading
    result.mainHeading = await this.getMainHeading();

    // Check cookie
    result.hasFgCookie = await this.hasFloodgateCookie();

    // Log comprehensive status
    console.info('[FG] === CONTENT DELIVERY VERIFICATION ===');
    console.info(`[FG] x-adobe-content: ${result.contentHeader}`);
    console.info(`[FG] Is Floodgate: ${result.isFloodgate}`);
    console.info(`[FG] Page Loaded: ${result.pageLoaded}`);
    console.info(`[FG] Page Title: "${result.pageTitle}"`);
    console.info(`[FG] Main Heading: "${result.mainHeading}"`);
    console.info(`[FG] FG Cookie: ${result.hasFgCookie}`);

    return result;
  }

  /**
   * Enable network interception to capture response headers
   */
  async enableNetworkInterception() {
    this.responseHeaders = {};

    // Listen to responses to capture headers from main document
    this.page.on('response', (response) => {
      if (response.request().resourceType() === 'document') {
        this.responseHeaders = response.headers();
      }
    });
  }

  /**
   * Get the last document response headers
   * @returns {Object} Response headers
   */
  getResponseHeaders() {
    return this.responseHeaders;
  }

  /**
   * Clear stored response headers (call before new navigation to capture fresh headers)
   */
  clearResponseHeaders() {
    this.responseHeaders = {};
  }

  /**
   * Check if Floodgate content is served (x-adobe-content = AEM-floodgate-pink-dx)
   * @returns {boolean}
   */
  isFloodgateContent() {
    const contentHeader = this.responseHeaders[this.headers.contentHeader];
    return contentHeader === this.headers.floodgateValue;
  }

  /**
   * Check if Source content is served (not Floodgate)
   * @returns {boolean}
   */
  isSourceContent() {
    return !this.isFloodgateContent();
  }

  /**
   * Get the x-adobe-content header value
   * @returns {string|undefined}
   */
  getContentHeaderValue() {
    return this.responseHeaders[this.headers.contentHeader];
  }

  /**
   * Clear all cookies and storage to simulate anonymous user
   */
  async clearUserState() {
    await this.page.context().clearCookies();
  }

  /**
   * Login with Adobe IMS
   *
   * @param {string} email - User email
   * @param {string} password - User password
   * @param {Object} options - Login options
   * @returns {Promise<boolean>} - True if login successful
   */
  async login(email, password, options = {}) {
    const { timeout = 30000, waitForCookie = true } = options;

    console.info(`[FG] Logging in with: ${email}`);

    try {
      // Check if already logged in (aux_sid cookie exists)
      const existingCookies = await this.page.context().cookies();
      const existingAuxSid = existingCookies.find((c) => c.name === 'aux_sid');
      if (existingAuxSid) {
        console.info('[FG] ✓ Already logged in - aux_sid cookie exists');
        return true;
      }

      // Click sign-in button (may vary by page)
      const signInButton = this.page.locator('button:has-text("Sign in"), a:has-text("Sign in"), .feds-signIn');
      if (await signInButton.first().isVisible({ timeout: 5000 })) {
        await signInButton.first().click();
        console.info('[FG] Sign in button clicked');
        await this.page.waitForTimeout(2000);
      }

      // Select "Adobe Account" if account type selector appears
      const adobeAccountButton = this.page.locator(
        'button:has-text("Adobe Account"), '
        + 'a:has-text("Adobe Account"), '
        + '[data-id="Adobe_Account"], '
        + '.spectrum-Button:has-text("Adobe Account")',
      );
      if (await adobeAccountButton.first().isVisible({ timeout: 3000 }).catch(() => false)) {
        await adobeAccountButton.first().click();
        console.info('[FG] Adobe Account selected');
        await this.page.waitForTimeout(2000);
      }

      // Wait for email input and enter email
      const emailInput = this.page.locator('input[type="email"], input[name="username"], #EmailPage-EmailField');
      await emailInput.waitFor({ state: 'visible', timeout });
      await emailInput.fill(email);
      console.info('[FG] Email entered');

      // Click continue button after email
      const continueSelector = 'button:has-text("Continue"), '
        + 'button[data-id="EmailPage-ContinueButton"], '
        + '[data-testid="EmailPage-ContinueButton"]';
      const continueButton = this.page.locator(continueSelector);
      await continueButton.first().click();
      console.info('[FG] Continue button clicked');
      await this.page.waitForTimeout(2000);

      // Wait for password input and enter password
      // Use visible password input (filter out hidden ones with tabindex=-1)
      const passwordInput = this.page.locator('input[type="password"]:visible').first();
      await passwordInput.waitFor({ state: 'visible', timeout });
      await passwordInput.fill(password);
      console.info('[FG] Password entered');

      // Click sign in / continue button (use type="submit" to be specific)
      const submitButton = this.page.locator('button[type="submit"]');
      await submitButton.first().click();
      console.info('[FG] Sign in submitted');

      // Wait for login to complete (aux_sid cookie should be set)
      if (waitForCookie) {
        await this.page.waitForTimeout(5000);

        // Check for aux_sid cookie
        const cookies = await this.page.context().cookies();
        const auxSid = cookies.find((c) => c.name === 'aux_sid');

        if (auxSid) {
          console.info('[FG] ✓ Login successful - aux_sid cookie found');
          return true;
        }
        console.info('[FG] ⚠ aux_sid cookie not found after login');
        return false;
      }

      return true;
    } catch (error) {
      console.info(`[FG] Login error: ${error.message}`);
      return false;
    }
  }

  /**
   * Login with the allowlisted test user
   * @returns {Promise<boolean>}
   */
  async loginAllowlistedUser() {
    return this.login('vevent+registered@adobetest.com', 'AdobeTest1234!');
  }

  /**
   * Login with the non-allowlisted test user
   * @returns {Promise<boolean>}
   */
  async loginNonAllowlistedUser() {
    return this.login('xiasun+nonAllowlisted@adobetest.com', 'AdobeTest1234!');
  }

  /**
   * Clear local/session storage after page is loaded
   */
  async clearStorageOnPage() {
    try {
      await this.page.evaluate(() => {
        localStorage.clear();
        sessionStorage.clear();
      });
    } catch (e) {
      console.info('[FG] Could not clear storage:', e.message);
    }
  }

  /**
   * Simulate logged in user with IMS session (aux_sid JWT token)
   *
   * NOTE: aux_sid is set for ANY logged-in user, regardless of allowlist status.
   * The allowlist check (AEP validation) happens server-side based on the user's
   * identity extracted from this JWT. The EdgeWorker:
   * 1. Sees aux_sid cookie → User is logged in
   * 2. Calls AEP to check if user is in allowlist
   * 3. If allowlisted → serves Floodgate content + sets fg_acom cookie
   * 4. If not allowlisted → serves Source content
   *
   * @param {string} sessionValue - aux_sid JWT token value (IMS session)
   */
  async setSessionCookie(sessionValue = null) {
    // Use provided token or a realistic JWT-like test token
    const token = sessionValue || this.generateTestSessionToken();

    await this.page.context().addCookies([{
      name: this.cookies.session,
      value: token,
      domain: this.config.domain,
      path: '/',
    }]);
  }

  /**
   * Generate a test session token (JWT-like format)
   * NOTE: This is for testing structure only - actual auth requires real IMS login
   * @returns {string} A test JWT-like token
   */
  // eslint-disable-next-line class-methods-use-this
  generateTestSessionToken() {
    // This is a placeholder structure - real tokens come from IMS login
    // Format: header.payload.signature (base64 encoded)
    const header = Buffer.from(JSON.stringify({ alg: 'RS256', kid: 'ims_na1-stg1-key-ck-1', itt: 'ck' })).toString('base64');
    const payload = Buffer.from(JSON.stringify({
      sid: `${Date.now()}_test-session_nala`,
      uid: 'TEST_USER_ID@c62f24cc5b5b7e0e0a494004',
      aid: 'TEST_USER_ID@c62f24cc5b5b7e0e0a494004',
      lastUsedAt: Date.now(),
      userType: null,
      emailVerified: false,
    })).toString('base64');
    const signature = 'test_signature_placeholder';

    return `${header}.${payload}.${signature}`;
  }

  /**
   * Set a real aux_sid token from an actual logged-in session
   * Use this for testing with real allowlisted users
   *
   * How to get a real token:
   * 1. Open browser DevTools on business.stage.adobe.com
   * 2. Login with your Adobe account
   * 3. Go to Application > Cookies
   * 4. Copy the value of 'aux_sid' cookie
   * 5. Pass it to this method
   *
   * @param {string} realToken - The actual aux_sid JWT from browser
   */
  async setRealSessionToken(realToken) {
    if (!realToken) {
      throw new Error('Real token is required. Get it from browser cookies after logging in.');
    }

    await this.page.context().addCookies([{
      name: this.cookies.session,
      value: realToken,
      domain: this.config.domain,
      path: '/',
    }]);

    console.info('[FG] Set real aux_sid token (JWT)');
  }

  /**
   * Simulate user with Floodgate cookie (return visitor)
   * @param {string} value - fg_acom cookie value
   */
  async setFloodgateCookie(value = '1') {
    await this.page.context().addCookies([{
      name: this.cookies.fg,
      value,
      domain: this.config.domain,
      path: '/',
    }]);
  }

  /**
   * Check if Floodgate cookie exists in browser
   * @returns {Promise<boolean>}
   */
  async hasFloodgateCookie() {
    const cookies = await this.page.context().cookies();
    return cookies.some((c) => c.name === this.cookies.fg);
  }

  /**
   * Get the Floodgate cookie value
   * @returns {Promise<string|null>}
   */
  async getFloodgateCookieValue() {
    const cookies = await this.page.context().cookies();
    const fgCookie = cookies.find((c) => c.name === this.cookies.fg);
    return fgCookie ? fgCookie.value : null;
  }

  /**
   * Check if session cookie exists
   * @returns {Promise<boolean>}
   */
  async hasSessionCookie() {
    const cookies = await this.page.context().cookies();
    return cookies.some((c) => c.name === this.cookies.session);
  }

  /**
   * Delete Floodgate cookie
   */
  async deleteFloodgateCookie() {
    const cookies = await this.page.context().cookies();
    const otherCookies = cookies.filter((c) => c.name !== this.cookies.fg);
    await this.page.context().clearCookies();
    if (otherCookies.length > 0) {
      await this.page.context().addCookies(otherCookies);
    }
  }

  /**
   * Inject client-side header (for security spoofing test)
   * @param {string} headerName - Header name
   * @param {string} headerValue - Header value
   */
  async injectClientHeader(headerName, headerValue) {
    await this.page.setExtraHTTPHeaders({ [headerName]: headerValue });
  }

  /**
   * Navigate to a test page
   * @param {string} path - Page path (relative to baseUrl)
   * @param {Object} options - Navigation options
   */
  async navigateTo(path, options = {}) {
    const url = path.startsWith('http') ? path : `${this.config.baseUrl}${path}`;

    // Capture response headers directly from the navigation
    const response = await this.page.goto(url, {
      waitUntil: 'domcontentloaded',
      timeout: 30000,
      ...options,
    });

    // Store the response headers from the main document
    if (response) {
      this.responseHeaders = response.headers();
      console.info(`[FG] Captured headers for: ${url}`);
    }
  }

  /**
   * Wait for network to be idle
   * @param {number} timeout - Timeout in ms
   */
  async waitForNetworkIdle(timeout = 5000) {
    await this.page.waitForLoadState('networkidle', { timeout });
  }

  /**
   * Wait for a specific amount of time
   * @param {number} ms - Time to wait in milliseconds
   */
  async waitForTimeout(ms) {
    await this.page.waitForTimeout(ms);
  }

  /**
   * Verify content text is visible on page
   * @param {string} text - Text to find
   * @returns {Promise<boolean>}
   */
  async hasContentText(text) {
    try {
      await expect(this.page.getByText(text)).toBeVisible({ timeout: 5000 });
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Verify Vary header contains expected value
   * @param {string} expectedValue - Expected value (e.g., 'Cookie')
   * @returns {boolean}
   */
  hasVaryHeader(expectedValue) {
    const varyHeader = this.responseHeaders[this.headers.vary] || '';
    return varyHeader.toLowerCase().includes(expectedValue.toLowerCase());
  }

  /**
   * Get Time To First Byte from performance timing
   * @returns {Promise<number>} TTFB in milliseconds
   */
  async getTTFB() {
    const timing = await this.page.evaluate(() => {
      const perf = performance.getEntriesByType('navigation')[0];
      return perf ? perf.responseStart - perf.requestStart : 0;
    });
    return timing;
  }

  /**
   * Make a direct HTTP request (without browser context)
   * @param {string} url - URL to request
   * @param {Object} options - Request options
   * @returns {Promise<Object>} Response object
   */
  // eslint-disable-next-line class-methods-use-this
  async makeDirectRequest(url, options = {}) {
    const { request } = await import('@playwright/test');
    const context = await request.newContext();
    const response = await context.get(url, options);
    return {
      status: response.status(),
      headers: response.headers(),
      body: await response.text(),
    };
  }

  /**
   * Verify Floodgate config JSON is accessible
   * @returns {Promise<Object>} Config JSON
   */
  async getFloodgateConfig() {
    const response = await this.makeDirectRequest(this.config.configUrl);
    if (response.status === 200) {
      try {
        return JSON.parse(response.body);
      } catch {
        return null;
      }
    }
    return null;
  }

  /**
   * Log current test state for debugging
   */
  async logState() {
    console.info('[FG] Test State:');
    console.info(`  Environment: ${this.env}`);
    console.info(`  Base URL: ${this.config.baseUrl}`);
    console.info(`  Has FG Cookie: ${await this.hasFloodgateCookie()}`);
    console.info(`  Has Session Cookie: ${await this.hasSessionCookie()}`);
    console.info(`  Content Header: ${this.getContentHeaderValue()}`);
    console.info(`  Is Floodgate Content: ${this.isFloodgateContent()}`);
  }

  /**
   * Clear response headers (for re-testing)
   */
  clearNetworkLogs() {
    this.responseHeaders = {};
  }

  /**
   * Verify expected content delivery based on test scenario
   * @param {Object} expected - Expected state
   * @returns {Object} Verification results
   */
  async verifyContentDelivery(expected) {
    const results = {
      passed: true,
      details: [],
    };

    // Check content header
    if (expected.isFloodgate !== undefined) {
      const actual = this.isFloodgateContent();
      const passed = actual === expected.isFloodgate;
      results.details.push({
        check: 'isFloodgateContent',
        expected: expected.isFloodgate,
        actual,
        passed,
      });
      if (!passed) results.passed = false;
    }

    // Check FG cookie
    if (expected.hasFgCookie !== undefined) {
      const actual = await this.hasFloodgateCookie();
      const passed = actual === expected.hasFgCookie;
      results.details.push({
        check: 'hasFloodgateCookie',
        expected: expected.hasFgCookie,
        actual,
        passed,
      });
      if (!passed) results.passed = false;
    }

    // Check content header value
    if (expected.contentHeader !== undefined) {
      const actual = this.getContentHeaderValue();
      const passed = actual === expected.contentHeader;
      results.details.push({
        check: 'contentHeaderValue',
        expected: expected.contentHeader,
        actual,
        passed,
      });
      if (!passed) results.passed = false;
    }

    return results;
  }
}
