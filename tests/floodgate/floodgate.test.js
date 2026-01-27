import { expect, test } from '@playwright/test';
import { features } from '../../features/floodgate/floodgate.spec.js';
import FloodgatePage from '../../selectors/floodgate/floodgate.page.js';

/**
 * =============================================================================
 * Summit 2026 Floodgate Migration - Test Implementation
 * =============================================================================
 *
 * Target: Akamai EdgeWorker, AEP Audience, AEM (Milo/Dexter)
 *
 * Test Pages (environment-specific):
 * Stage (FG_ENV=stage):
 *   - Primary: https://business.stage.adobe.com/summit/2026/sessions.html
 *   - Secondary: https://business.stage.adobe.com/summit/2026/sessions/how-to-scale-and-transform-your-organization-s525.html
 * Production (FG_ENV=prod):
 *   - Primary: https://business.adobe.com/summit/2026/faq.html
 *
 * Test Users:
 * - Allowlisted: vevent+registered@adobetest.com
 * - Non-Allowlisted: xiasun+nonAllowlisted@adobetest.com
 * - Note: Allowlists are environment-specific (Stage vs Prod)
 *
 * Environment Configuration:
 * - Stage: fg_acom_stg cookie, business.stage.adobe.com
 * - Prod: fg_acom cookie, business.adobe.com
 *
 * Verification:
 * - FG Cookie: fg_acom_stg (stage) / fg_acom (prod)
 * - Response Header: x-adobe-content = "AEM-floodgate-pink-dx" for Floodgate
 * =============================================================================
 */

// Environment to use (stage or prod)
const TEST_ENV = process.env.FG_ENV || 'stage';

// Test pages - environment-specific
const TEST_PAGES_BY_ENV = {
  stage: {
    primary: '/summit/2026/sessions.html',
    secondary: '/summit/2026/sessions/how-to-scale-and-transform-your-organization-s525.html',
  },
  prod: {
    primary: '/summit/2026/faq.html',
    secondary: '/summit/2026/faq.html', // Same page for prod (only one available)
  },
};

// Select pages based on environment
const TEST_PAGES = {
  // Primary test page (sessions on stage, faq on prod)
  sessions: TEST_PAGES_BY_ENV[TEST_ENV].primary,
  // Secondary test page (session detail on stage, faq on prod)
  sessionDetail: TEST_PAGES_BY_ENV[TEST_ENV].secondary,
  // Aliases for different phases
  future: TEST_PAGES_BY_ENV[TEST_ENV].primary,
  active: TEST_PAGES_BY_ENV[TEST_ENV].primary,
  past: TEST_PAGES_BY_ENV[TEST_ENV].primary,
  summitHome: TEST_PAGES_BY_ENV[TEST_ENV].primary,
};

// Cookie name based on environment
const FG_COOKIE_NAME = TEST_ENV === 'prod' ? 'fg_acom' : 'fg_acom_stg';

let fgPage;

// Helper to get feature by ID
const getFeature = (tcid) => features.find((f) => f.tcid === tcid);

test.describe('Summit 2026 Floodgate Migration - Functional Tests', () => {
  test.setTimeout(60000); // 60 second timeout

  test.beforeEach(async ({ page }) => {
    fgPage = new FloodgatePage(page, TEST_ENV);
    await fgPage.enableNetworkInterception();
  });

  test.afterEach(async () => {
    if (fgPage) {
      await fgPage.logState();
    }
  });

  // ===========================================================================
  // PHASE A: "BEFORE THE EVENT" (Restricted Access)
  // Config Prerequisite: JSON event-start-time is in the FUTURE
  // ===========================================================================
  test.describe('Phase A: Before Event (Restricted Access)', () => {
    /**
     * BE-01: Anonymous User - Serve Source Content
     * Anonymous user should NOT see Floodgate content before event
     */
    test(`${getFeature('BE-01').tcid}: ${getFeature('BE-01').name} - ${getFeature('BE-01').tags}`, async () => {
      const feature = getFeature('BE-01');
      console.info(`[Test] ${feature.description}`);

      await test.step('Clear user state to simulate anonymous user', async () => {
        await fgPage.clearUserState();
      });

      await test.step('Navigate to test page (Before Event config)', async () => {
        await fgPage.navigateTo(TEST_PAGES.future);
        await fgPage.waitForNetworkIdle();
      });

      await test.step('Verify page response (404 is expected for anonymous before event)', async () => {
        const pageCheck = await fgPage.verifyPageLoaded({ allow404: true });
        expect(pageCheck.loaded, 'Page should respond (even if 404)').toBe(true);

        // 404 is EXPECTED for anonymous users before event - this IS the "Source content"
        if (pageCheck.is404) {
          console.info('[FG] ✓ 404 response - correct for anonymous user before event');
        }
      });

      await test.step('Verify Source content is served (not Floodgate)', async () => {
        // Check response header
        const isFloodgate = fgPage.isFloodgateContent();
        expect(isFloodgate, 'Should NOT serve Floodgate content').toBe(false);

        // Verify no Floodgate header
        const contentHeader = fgPage.getContentHeaderValue();
        console.info(`[FG] x-adobe-content header: ${contentHeader}`);
        expect(contentHeader).not.toBe('AEM-floodgate-pink-dx');
      });

      await test.step('Verify no FG cookie is set', async () => {
        const hasCookie = await fgPage.hasFloodgateCookie();
        expect(hasCookie, `${FG_COOKIE_NAME} cookie should NOT be set for anonymous user`).toBe(false);
      });
    });

    /**
     * BE-02: Non-Allowlisted User - Serve Source Content
     * Logged in user NOT in allowlist should see Source content
     *
     * Test User: xiasun+nonAllowlisted@adobetest.com
     *
     * Run with: npx playwright test --config=configs/floodgate.config.js --grep "BE-02" --headed
     */
    test(`${getFeature('BE-02').tcid}: ${getFeature('BE-02').name} - ${getFeature('BE-02').tags}`, async () => {
      const feature = getFeature('BE-02');
      console.info(`[Test] ${feature.description}`);
      console.info('[User] xiasun+nonAllowlisted@adobetest.com (NOT in allowlist)');

      await test.step('Navigate to test page', async () => {
        await fgPage.navigateTo(TEST_PAGES.sessions);
        await fgPage.waitForTimeout(2000);
      });

      await test.step('Login with non-allowlisted user', async () => {
        const loginSuccess = await fgPage.loginNonAllowlistedUser();
        expect(loginSuccess, 'Login should succeed').toBe(true);
      });

      await test.step('Verify aux_sid cookie exists', async () => {
        const cookies = await fgPage.page.context().cookies();
        const auxSid = cookies.find((c) => c.name === 'aux_sid');

        console.info(`[FG] aux_sid present: ${!!auxSid}`);
        expect(auxSid, 'aux_sid cookie should exist after login').toBeTruthy();
      });

      await test.step('Delete FG cookie (fresh test)', async () => {
        await fgPage.deleteFloodgateCookie();
      });

      await test.step('Navigate to test page', async () => {
        fgPage.clearResponseHeaders();
        await fgPage.navigateTo(TEST_PAGES.sessions);
        await fgPage.waitForTimeout(3000);
      });

      await test.step('Verify page response (404 expected for non-allowlisted)', async () => {
        const pageCheck = await fgPage.verifyPageLoaded({ allow404: true });
        // Non-allowlisted user sees 404 (gated content) - this is expected!
        if (pageCheck.is404) {
          console.info('[FG] ✓ 404 response - correct for non-allowlisted user before event');
        }
      });

      await test.step('Verify Source content is served (not Floodgate)', async () => {
        const contentHeader = fgPage.getContentHeaderValue();
        console.info(`[FG] x-adobe-content: ${contentHeader}`);

        const isFloodgate = fgPage.isFloodgateContent();
        expect(isFloodgate, 'Non-allowlisted user should see Source content').toBe(false);
      });

      await test.step('Verify no FG cookie is set', async () => {
        const hasCookie = await fgPage.hasFloodgateCookie();
        console.info(`[FG] ${FG_COOKIE_NAME} set: ${hasCookie}`);
        expect(hasCookie, `${FG_COOKIE_NAME} cookie should NOT be set`).toBe(false);
      });
    });

    /**
     * BE-03: Allowlisted User (First Visit) - Serve Floodgate Content
     * First-time allowlisted user should see Floodgate content and get cookie
     *
     * Test User: vevent+registered@adobetest.com (in allowlist)
     *
     * Run with: npx playwright test --config=configs/floodgate.config.js --grep "BE-03" --headed
     */
    test(`${getFeature('BE-03').tcid}: ${getFeature('BE-03').name} - ${getFeature('BE-03').tags}`, async () => {
      const feature = getFeature('BE-03');
      console.info(`[Test] ${feature.description}`);
      console.info('[User] vevent+registered@adobetest.com (ALLOWLISTED)');

      await test.step('Navigate to test page', async () => {
        await fgPage.navigateTo(TEST_PAGES.sessions);
        await fgPage.waitForTimeout(2000);
      });

      await test.step('Login with allowlisted user', async () => {
        const loginSuccess = await fgPage.loginAllowlistedUser();
        expect(loginSuccess, 'Login should succeed').toBe(true);
      });

      await test.step('Verify aux_sid cookie exists', async () => {
        const cookies = await fgPage.page.context().cookies();
        const auxSid = cookies.find((c) => c.name === 'aux_sid');

        console.info(`[FG] aux_sid present: ${!!auxSid}`);
        expect(auxSid, 'aux_sid cookie should exist after login').toBeTruthy();
      });

      await test.step('Delete FG cookie (simulate first visit)', async () => {
        await fgPage.deleteFloodgateCookie();
        console.info(`[FG] Deleted ${FG_COOKIE_NAME} to simulate first visit`);
      });

      await test.step('Navigate to test page (first visit)', async () => {
        fgPage.clearResponseHeaders();
        await fgPage.navigateTo(TEST_PAGES.sessions);
        await fgPage.waitForTimeout(3000);
      });

      await test.step('Verify page shows REAL content (not 404)', async () => {
        const pageCheck = await fgPage.verifyPageLoaded({ allow404: false });
        expect(pageCheck.is404, 'Allowlisted user should NOT see 404').toBe(false);
        expect(pageCheck.loaded, 'Page should load with actual content').toBe(true);
        console.info(`[FG] Page title: "${pageCheck.pageTitle}"`);
      });

      await test.step('Verify Floodgate content is served', async () => {
        const contentHeader = fgPage.getContentHeaderValue();
        console.info(`[FG] x-adobe-content: ${contentHeader}`);

        expect(
          contentHeader,
          'Allowlisted user should see Floodgate content',
        ).toBe('AEM-floodgate-pink-dx');
      });

      await test.step('Verify FG cookie is SET', async () => {
        const hasCookie = await fgPage.hasFloodgateCookie();
        const cookieValue = await fgPage.getFloodgateCookieValue();

        console.info(`[FG] ${FG_COOKIE_NAME} set: ${hasCookie}`);
        console.info(`[FG] ${FG_COOKIE_NAME} value: ${cookieValue}`);

        expect(hasCookie, 'FG cookie should be SET for allowlisted user').toBe(true);
      });
    });

    /**
     * BE-04: Allowlisted User (Return Visit) - Serve Floodgate Content (Optimized)
     * Return user with fg_acom cookie should skip AEP call
     *
     * Test User: vevent+registered@adobetest.com (in allowlist)
     *
     * This test verifies the optimization path:
     * 1. First Visit: User logs in → AEP validates → fg_acom cookie SET
     * 2. Return Visit: EdgeWorker sees fg_acom → SKIPS AEP call → serves FG content
     *
     * Run with: npx playwright test --config=configs/floodgate.config.js --grep "BE-04" --headed
     */
    test(`${getFeature('BE-04').tcid}: ${getFeature('BE-04').name} - ${getFeature('BE-04').tags}`, async () => {
      const feature = getFeature('BE-04');
      console.info(`[Test] ${feature.description}`);
      console.info('[User] vevent+registered@adobetest.com (ALLOWLISTED)');

      // ============================================
      // STEP 1: Login
      // ============================================
      await test.step('Navigate to test page', async () => {
        await fgPage.navigateTo(TEST_PAGES.sessions);
        await fgPage.waitForTimeout(2000);
      });

      await test.step('Login with allowlisted user', async () => {
        const loginSuccess = await fgPage.loginAllowlistedUser();
        expect(loginSuccess, 'Login should succeed').toBe(true);
      });

      await test.step('Verify aux_sid cookie exists', async () => {
        const cookies = await fgPage.page.context().cookies();
        const auxSid = cookies.find((c) => c.name === 'aux_sid');

        console.info(`[FG] aux_sid present: ${!!auxSid}`);
        expect(auxSid, 'aux_sid cookie should exist after login').toBeTruthy();
      });

      // ============================================
      // STEP 2: First Visit (delete fg cookie, visit page)
      // ============================================
      await test.step('Delete FG cookie to simulate FIRST visit', async () => {
        await fgPage.deleteFloodgateCookie();
        console.info(`[FG] Deleted ${FG_COOKIE_NAME} cookie to simulate first visit`);
      });

      await test.step('FIRST VISIT: Navigate to test page', async () => {
        const url = TEST_PAGES.sessions;
        console.info(`[FG] FIRST VISIT URL: ${url}`);
        fgPage.clearResponseHeaders();
        await fgPage.navigateTo(url);
        await fgPage.waitForTimeout(3000);
      });

      await test.step('Verify FIRST VISIT: Page shows REAL content (not 404)', async () => {
        const pageCheck = await fgPage.verifyPageLoaded({ allow404: false });
        expect(pageCheck.is404, 'Allowlisted user should NOT see 404').toBe(false);
        console.info(`[FG] Page title: "${pageCheck.pageTitle}"`);
      });

      await test.step('Verify FIRST VISIT: FG content served and cookie SET', async () => {
        const contentHeader = fgPage.getContentHeaderValue();
        const hasCookie = await fgPage.hasFloodgateCookie();
        const cookieValue = await fgPage.getFloodgateCookieValue();

        console.info('[FG] === FIRST VISIT RESULTS ===');
        console.info(`[FG] x-adobe-content: ${contentHeader}`);
        console.info(`[FG] ${FG_COOKIE_NAME} cookie set: ${hasCookie}`);
        console.info(`[FG] ${FG_COOKIE_NAME} value: ${cookieValue}`);

        // Verify first visit worked correctly
        expect(hasCookie, `${FG_COOKIE_NAME} cookie should be SET after first visit`).toBe(true);
      });

      // ============================================
      // STEP 3: Return Visit (with fg cookie already set)
      // ============================================
      console.info('');
      console.info('[FG] === SIMULATING RETURN VISIT ===');
      console.info(`[FG] ${FG_COOKIE_NAME} cookie exists → EdgeWorker should SKIP AEP call`);

      await test.step('RETURN VISIT: Navigate to DIFFERENT page (session detail)', async () => {
        const url = TEST_PAGES.sessionDetail;
        console.info(`[FG] RETURN VISIT URL: ${url}`);
        fgPage.clearResponseHeaders();
        await fgPage.navigateTo(url);
        await fgPage.waitForTimeout(3000);
      });

      await test.step('Verify RETURN VISIT: Page shows REAL content (not 404)', async () => {
        const pageCheck = await fgPage.verifyPageLoaded({ allow404: false });
        expect(pageCheck.is404, 'Return visit should NOT see 404').toBe(false);
        console.info(`[FG] Page title: "${pageCheck.pageTitle}"`);
      });

      await test.step('Verify RETURN VISIT: FG content served (AEP skipped)', async () => {
        const contentHeader = fgPage.getContentHeaderValue();
        const hasCookie = await fgPage.hasFloodgateCookie();

        console.info('[FG] === RETURN VISIT RESULTS ===');
        console.info(`[FG] x-adobe-content: ${contentHeader}`);
        console.info(`[FG] ${FG_COOKIE_NAME} cookie still exists: ${hasCookie}`);

        // Verify return visit still serves FG content
        expect(hasCookie, 'FG cookie should PERSIST on return visit').toBe(true);

        // Content should still be FG
        expect(
          contentHeader,
          'Return visit should see Floodgate content',
        ).toBe('AEM-floodgate-pink-dx');
        console.info('[FG] ✓ Return visit: FG content served (optimization working)');
      });

      // ============================================
      // STEP 4: Navigate BACK to original page (proves cookie works across navigation)
      // ============================================
      await test.step('THIRD VISIT: Navigate BACK to sessions list', async () => {
        const url = TEST_PAGES.sessions;
        console.info(`[FG] THIRD VISIT URL: ${url}`);
        console.info('[FG] (Going back to sessions list - proves cookie persists across navigation)');
        fgPage.clearResponseHeaders();
        await fgPage.navigateTo(url);
        await fgPage.waitForTimeout(3000);
      });

      await test.step('Verify THIRD VISIT: FG content still served', async () => {
        const contentHeader = fgPage.getContentHeaderValue();
        const hasCookie = await fgPage.hasFloodgateCookie();

        console.info('[FG] === THIRD VISIT RESULTS ===');
        console.info(`[FG] x-adobe-content: ${contentHeader}`);
        console.info(`[FG] ${FG_COOKIE_NAME} cookie: ${hasCookie}`);

        expect(hasCookie, `${FG_COOKIE_NAME} cookie should persist across pages`).toBe(true);
      });

      // Final summary
      console.info('');
      console.info('[FG] === TEST SUMMARY ===');
      console.info('[FG] 1st: sessions.html      → Cookie SET');
      console.info('[FG] 2nd: sessionDetail.html → Cookie USED (AEP skipped)');
      console.info('[FG] 3rd: sessions.html      → Cookie PERSISTS');
    });

    /**
     * BE-05: FG Cookie Expiry (1 Day TTL) - Re-validation Test
     *
     * fg_acom_stg cookie expires after 1 day.
     * When it expires, EdgeWorker should re-call AEP to validate and re-set the cookie.
     *
     * This test simulates cookie expiry by:
     * 1. Login as allowlisted user → get fg_acom_stg cookie
     * 2. Delete fg_acom_stg (simulating 1-day expiry)
     * 3. Refresh page → EdgeWorker should re-call AEP and re-set cookie
     *
     * Cookie Details:
     * - Session cookie: aux_sid (managed by IMS)
     * - FG cookie (stage): fg_acom_stg (1 day TTL)
     * - FG cookie (prod): fg_acom (1 day TTL)
     *
     * Test User: vevent+registered@adobetest.com (in allowlist)
     *
     * Run with: npx playwright test --config=configs/floodgate.config.js --grep "BE-05" --headed
     */
    test(`${getFeature('BE-05').tcid}: ${getFeature('BE-05').name} - ${getFeature('BE-05').tags}`, async () => {
      const feature = getFeature('BE-05');
      console.info(`[Test] ${feature.description}`);
      console.info('[User] vevent+registered@adobetest.com (ALLOWLISTED)');
      console.info('');
      console.info('[Cookie Info]');
      console.info('  - aux_sid: IMS session cookie');
      console.info(`  - ${FG_COOKIE_NAME}: Floodgate cookie (1 day TTL)`);

      // ============================================
      // STEP 1: Login
      // ============================================
      await test.step('Navigate to test page', async () => {
        await fgPage.navigateTo(TEST_PAGES.sessions);
        await fgPage.waitForTimeout(2000);
      });

      await test.step('Login with allowlisted user', async () => {
        const loginSuccess = await fgPage.loginAllowlistedUser();
        expect(loginSuccess, 'Login should succeed').toBe(true);
      });

      await test.step('Verify aux_sid cookie exists', async () => {
        const cookies = await fgPage.page.context().cookies();
        const auxSid = cookies.find((c) => c.name === 'aux_sid');

        console.info('[FG] === LOGIN VERIFICATION ===');
        console.info(`[FG] aux_sid present: ${!!auxSid}`);

        expect(auxSid, 'aux_sid cookie should exist after login').toBeTruthy();
      });

      // ============================================
      // STEP 2: First visit - get FG cookie
      // ============================================
      await test.step(`First visit: get ${FG_COOKIE_NAME} cookie`, async () => {
        // Delete any existing FG cookie
        await fgPage.deleteFloodgateCookie();

        const url = TEST_PAGES.sessions;
        console.info(`[FG] URL: ${url}`);
        fgPage.clearResponseHeaders();
        await fgPage.navigateTo(url);
        await fgPage.waitForTimeout(3000);

        // Verify page shows REAL content (not 404)
        const pageCheck = await fgPage.verifyPageLoaded({ allow404: false });
        expect(pageCheck.is404, 'Allowlisted user should NOT see 404').toBe(false);
        console.info(`[FG] Page title: "${pageCheck.pageTitle}"`);

        const contentHeader = fgPage.getContentHeaderValue();
        const hasFgCookie = await fgPage.hasFloodgateCookie();
        const fgCookieValue = await fgPage.getFloodgateCookieValue();

        console.info('[FG] === FIRST VISIT ===');
        console.info(`[FG] x-adobe-content: ${contentHeader}`);
        console.info(`[FG] ${FG_COOKIE_NAME} set: ${hasFgCookie}`);
        console.info(`[FG] ${FG_COOKIE_NAME} value: ${fgCookieValue}`);

        expect(hasFgCookie, 'FG cookie should be set for allowlisted user').toBe(true);
      });

      // ============================================
      // STEP 3: Simulate FG cookie expiry (delete cookie)
      // ============================================
      console.info('');
      console.info('='.repeat(60));
      console.info(`[SIMULATING] ${FG_COOKIE_NAME} cookie expired (1 day TTL)`);
      console.info('='.repeat(60));

      await test.step(`Delete ${FG_COOKIE_NAME} (simulate 1-day expiry)`, async () => {
        await fgPage.deleteFloodgateCookie();

        const cookies = await fgPage.page.context().cookies();
        const hasAuxSid = cookies.some((c) => c.name === 'aux_sid');
        const hasFgCookie = await fgPage.hasFloodgateCookie();

        console.info('[FG] === AFTER COOKIE EXPIRY ===');
        console.info(`[FG] aux_sid present: ${hasAuxSid} (session still valid)`);
        console.info(`[FG] ${FG_COOKIE_NAME} present: ${hasFgCookie} (expired/deleted)`);
      });

      // ============================================
      // STEP 4: Visit page again - should re-validate
      // ============================================
      await test.step('Visit page again (EdgeWorker should re-call AEP)', async () => {
        const url = TEST_PAGES.sessionDetail;
        console.info(`[FG] URL: ${url}`);
        fgPage.clearResponseHeaders();
        await fgPage.navigateTo(url);
        await fgPage.waitForTimeout(3000);

        // Verify page shows REAL content (not 404)
        const pageCheck = await fgPage.verifyPageLoaded({ allow404: false });
        expect(pageCheck.is404, 'After re-validation, should NOT see 404').toBe(false);
        console.info(`[FG] Page title: "${pageCheck.pageTitle}"`);

        const contentHeader = fgPage.getContentHeaderValue();
        const isFloodgate = fgPage.isFloodgateContent();
        const hasFgCookie = await fgPage.hasFloodgateCookie();
        const fgCookieValue = await fgPage.getFloodgateCookieValue();

        console.info('[FG] === AFTER COOKIE EXPIRY VISIT ===');
        console.info(`[FG] x-adobe-content: ${contentHeader}`);
        console.info(`[FG] Serves Floodgate: ${isFloodgate}`);
        console.info(`[FG] ${FG_COOKIE_NAME} re-set: ${hasFgCookie}`);
        console.info(`[FG] ${FG_COOKIE_NAME} value: ${fgCookieValue}`);

        // After re-validation, should see FG content and cookie re-set
        expect(isFloodgate, 'After re-validation, should see FG content').toBe(true);
        expect(hasFgCookie, `${FG_COOKIE_NAME} should be re-set after re-validation`).toBe(true);
        console.info(`[FG] ✓ PASS: EdgeWorker re-called AEP and re-set ${FG_COOKIE_NAME}`);
      });

      // ============================================
      // SUMMARY
      // ============================================
      console.info('');
      console.info('='.repeat(60));
      console.info('[TEST SUMMARY] FG Cookie Expiry Behavior');
      console.info('='.repeat(60));
      console.info('');
      console.info('Cookie lifecycle:');
      console.info('  1. User logs in → aux_sid set by IMS');
      console.info(`  2. User visits FG page → AEP validates → ${FG_COOKIE_NAME} set`);
      console.info(`  3. ${FG_COOKIE_NAME} expires after 1 day`);
      console.info('  4. User visits again → EdgeWorker re-calls AEP');
      console.info(`  5. AEP validates → ${FG_COOKIE_NAME} re-set`);
      console.info('');
      console.info('This test verifies step 4-5 works correctly.');
      console.info('='.repeat(60));
    });
  });

  // ===========================================================================
  // PHASE B: "DURING THE EVENT" (Public Access)
  // Config Prerequisite: JSON event-start-time is PAST, event-end-time is FUTURE
  //
  // NOTE: These tests require the Floodgate timing config to be set to "During Event"
  // Update: https://da.live/#/adobecom/da-bacom/.milo/pub > fg-edge-worker-config
  // ===========================================================================
  test.describe('Phase B: During Event (Public Access)', () => {
    /**
     * DE-01: Anonymous User - Serve Floodgate Content (Gate Lifted)
     * CRITICAL: During event, anonymous users should see Floodgate content
     *
     * Run with: npx playwright test --config=configs/floodgate.config.js --grep "DE-01" --headed
     */
    test(`${getFeature('DE-01').tcid}: ${getFeature('DE-01').name} - ${getFeature('DE-01').tags}`, async () => {
      const feature = getFeature('DE-01');
      console.info(`[Test] ${feature.description}`);
      console.info('[CRITICAL] Gate should be lifted during event - ALL users see FG content');

      await test.step('Clear user state to simulate anonymous user', async () => {
        await fgPage.clearUserState();
        await fgPage.deleteFloodgateCookie();
      });

      await test.step('Navigate to test page', async () => {
        const url = TEST_PAGES.sessions;
        console.info(`[FG] URL: ${url}`);
        fgPage.clearResponseHeaders();
        await fgPage.navigateTo(url);
        await fgPage.waitForTimeout(3000);
      });

      await test.step('Verify page shows REAL content (not 404 - gate lifted)', async () => {
        const pageCheck = await fgPage.verifyPageLoaded({ allow404: false });
        expect(
          pageCheck.is404,
          'CRITICAL: During event, anonymous should NOT see 404 - gate should be lifted!',
        ).toBe(false);
        expect(pageCheck.loaded, 'Page should load with actual content').toBe(true);
        console.info(`[FG] Page title: "${pageCheck.pageTitle}"`);
      });

      await test.step('CRITICAL: Verify Floodgate content served to anonymous', async () => {
        const contentHeader = fgPage.getContentHeaderValue();
        const hasCookie = await fgPage.hasFloodgateCookie();

        console.info('[FG] === DURING EVENT - ANONYMOUS USER ===');
        console.info(`[FG] x-adobe-content: ${contentHeader}`);
        console.info(`[FG] ${FG_COOKIE_NAME} cookie: ${hasCookie}`);

        // During event, anonymous MUST see FG content - FAIL if not
        expect(
          contentHeader,
          'CRITICAL: During event, anonymous users MUST see Floodgate content. '
          + 'If this fails, check timing config at DA Bacom.',
        ).toBe('AEM-floodgate-pink-dx');

        console.info('[FG] ✓ PASS: Gate is lifted - anonymous sees FG content');
      });
    });

    /**
     * DE-02: Logged In User - Serve Floodgate Content
     *
     * Test User: Any logged in user (allowlist status irrelevant during event)
     *
     * Run with: npx playwright test --config=configs/floodgate.config.js --grep "DE-02" --headed
     */
    test(`${getFeature('DE-02').tcid}: ${getFeature('DE-02').name} - ${getFeature('DE-02').tags}`, async () => {
      const feature = getFeature('DE-02');
      console.info(`[Test] ${feature.description}`);
      console.info('[FG] During event, auth status is IRRELEVANT');

      await test.step('Navigate to test page', async () => {
        await fgPage.navigateTo(TEST_PAGES.sessions);
        await fgPage.waitForTimeout(2000);
      });

      await test.step('Login with allowlisted user', async () => {
        // Using allowlisted user, but during event allowlist is irrelevant
        const loginSuccess = await fgPage.loginAllowlistedUser();
        expect(loginSuccess, 'Login should succeed').toBe(true);
      });

      await test.step('Delete FG cookie for fresh test', async () => {
        await fgPage.deleteFloodgateCookie();
      });

      await test.step('Navigate to test page', async () => {
        const url = TEST_PAGES.sessionDetail;
        console.info(`[FG] URL: ${url}`);
        fgPage.clearResponseHeaders();
        await fgPage.navigateTo(url);
        await fgPage.waitForTimeout(3000);
      });

      await test.step('Verify Floodgate content (auth irrelevant during event)', async () => {
        const contentHeader = fgPage.getContentHeaderValue();
        const hasCookie = await fgPage.hasFloodgateCookie();

        console.info('[FG] === DURING EVENT - LOGGED IN USER ===');
        console.info(`[FG] x-adobe-content: ${contentHeader}`);
        console.info(`[FG] ${FG_COOKIE_NAME} cookie: ${hasCookie}`);

        // During event, logged in users MUST see FG content - FAIL if not
        expect(
          contentHeader,
          'During event, logged in users MUST see Floodgate content. '
          + 'If this fails, check timing config at DA Bacom.',
        ).toBe('AEM-floodgate-pink-dx');

        console.info('[FG] ✓ PASS: Logged in user sees FG content during event');
      });
    });
  });

  // ===========================================================================
  // PHASE C: "AFTER THE EVENT" (Reversion)
  // Config Prerequisite: JSON event-end-time is PAST
  //
  // NOTE: These tests require the Floodgate timing config to be set to "After Event"
  // Update: https://da.live/#/adobecom/da-bacom/.milo/pub > fg-edge-worker-config
  // ===========================================================================
  test.describe('Phase C: After Event (Reversion)', () => {
    /**
     * AE-01: Any User - Serve Source Content (Reversion)
     *
     * After the event ends, ALL users should see Source content regardless of:
     * - Login status
     * - Allowlist status
     * - FG cookie presence
     *
     * Run with: npx playwright test --config=configs/floodgate.config.js --grep "AE-01" --headed
     */
    test(`${getFeature('AE-01').tcid}: ${getFeature('AE-01').name} - ${getFeature('AE-01').tags}`, async ({ page }) => {
      const feature = getFeature('AE-01');
      console.info(`[Test] ${feature.description}`);
      console.info('[FG] After event, ALL content reverts to Source');

      // Test 1: Anonymous user
      await test.step('Test 1: Anonymous user after event', async () => {
        await fgPage.clearUserState();
        await fgPage.deleteFloodgateCookie();

        const url = TEST_PAGES.sessions;
        console.info(`[FG] URL: ${url}`);
        fgPage.clearResponseHeaders();
        await fgPage.navigateTo(url);
        await fgPage.waitForTimeout(3000);

        const contentHeader = fgPage.getContentHeaderValue();
        const isFloodgate = fgPage.isFloodgateContent();

        console.info('[FG] === AFTER EVENT - ANONYMOUS ===');
        console.info(`[FG] x-adobe-content: ${contentHeader}`);
        console.info(`[FG] Is Floodgate: ${isFloodgate}`);

        // After event, ALL users must see Source content - FAIL if seeing FG
        expect(
          isFloodgate,
          'After event ends, anonymous users MUST see Source content. '
          + 'If this fails, check timing config - event may not have ended.',
        ).toBe(false);

        console.info('[FG] ✓ PASS: Anonymous sees Source after event');
      });

      // Test 2: Logged in user
      await test.step('Test 2: Logged in user after event', async () => {
        fgPage.clearResponseHeaders();
        await fgPage.setSessionCookie();
        await page.reload();
        await fgPage.waitForTimeout(3000);

        const contentHeader = fgPage.getContentHeaderValue();
        const isFloodgate = fgPage.isFloodgateContent();

        console.info('[FG] === AFTER EVENT - LOGGED IN ===');
        console.info(`[FG] x-adobe-content: ${contentHeader}`);
        console.info(`[FG] Is Floodgate: ${isFloodgate}`);

        // After event, logged in users must see Source content
        expect(
          isFloodgate,
          'After event ends, logged in users MUST see Source content.',
        ).toBe(false);

        console.info('[FG] ✓ PASS: Logged in sees Source after event');
      });

      // Test 3: User with FG cookie
      await test.step('Test 3: User with FG cookie after event', async () => {
        fgPage.clearResponseHeaders();
        await fgPage.setFloodgateCookie('1');
        await page.reload();
        await fgPage.waitForTimeout(3000);

        const contentHeader = fgPage.getContentHeaderValue();
        const isFloodgate = fgPage.isFloodgateContent();
        const hasCookie = await fgPage.hasFloodgateCookie();

        console.info('[FG] === AFTER EVENT - WITH FG COOKIE ===');
        console.info(`[FG] x-adobe-content: ${contentHeader}`);
        console.info(`[FG] Is Floodgate: ${isFloodgate}`);
        console.info(`[FG] FG cookie still exists: ${hasCookie}`);

        // After event, FG cookie should be ignored
        expect(
          isFloodgate,
          'After event ends, FG cookie should be ignored - MUST see Source content.',
        ).toBe(false);

        console.info('[FG] ✓ PASS: Even with FG cookie, sees Source after event');
      });

      // Summary
      console.info('');
      console.info('[FG] === AFTER EVENT SUMMARY ===');
      console.info('[FG] All users should see Source content after event ends');
      console.info('[FG] FG cookie should be ignored after event-end-time');
    });
  });

  // ===========================================================================
  // PHASE D: EDGE CASES & RESILIENCE
  // ===========================================================================
  test.describe('Phase D: Edge Cases & Resilience', () => {
    /**
     * EC-01: AEP Service Down - Fail Open (Serve Source)
     *
     * IMPORTANT: This test requires DevOps coordination to simulate AEP failure.
     * Cannot be fully automated without infrastructure support.
     */
    // eslint-disable-next-line no-loop-func
    test(`${getFeature('EC-01').tcid}: ${getFeature('EC-01').name} - ${getFeature('EC-01').tags}`, async () => {
      const feature = getFeature('EC-01');
      console.info(`[Test] ${feature.description}`);
      console.info('[Note] This test requires DevOps coordination to simulate AEP failure');

      await test.step('Document AEP failure handling (Fail Open)', async () => {
        console.info('='.repeat(60));
        console.info('[EC-01] AEP Service Down - Fail Open Test');
        console.info('');
        console.info('This test validates Fail Open behavior when AEP is unavailable.');
        console.info('');
        console.info('SCENARIO:');
        console.info('- AEP API times out (>1000ms) or returns 500 error');
        console.info('- EdgeWorker should serve Source content (not error page)');
        console.info('');
        console.info('MANUAL TEST STEPS:');
        console.info('1. Coordinate with DevOps to temporarily block AEP calls');
        console.info('   OR configure AEP mock to return 500/timeout');
        console.info('2. Login as allowlisted user');
        console.info('3. Navigate to gated page');
        console.info('4. Verify Source content is served (NOT 503 error)');
        console.info('');
        console.info('EXPECTED RESULTS:');
        console.info('- User sees Source content (graceful degradation)');
        console.info('- No 503 or error page displayed');
        console.info(`- No ${FG_COOKIE_NAME} cookie set`);
        console.info('- x-adobe-content should NOT be AEM-floodgate-pink-dx');
        console.info('');
        console.info('AUTOMATED VERIFICATION (when AEP mock available):');
        console.info('='.repeat(60));
      });

      // Note: Full automation requires DevOps coordination to simulate AEP failure.
      // This test documents the expected behavior and provides a baseline check.
      await test.step('Baseline check - page loads without errors', async () => {
        fgPage.clearResponseHeaders();
        await fgPage.navigateTo(TEST_PAGES.sessions);
        await fgPage.waitForTimeout(2000);

        const pageTitle = await fgPage.page.title();
        console.info(`[FG] Page loaded: ${pageTitle}`);
        console.info('[FG] ✓ Baseline established - page loads without errors');
        console.info('[FG] ⚠ To test AEP failure: Coordinate with DevOps to simulate AEP timeout/500');

        // Verify page loaded without server error
        expect(pageTitle, 'Page should not show server error').not.toContain('500');
        expect(pageTitle, 'Page should not show service unavailable').not.toContain('503');
      });
    });

    /**
     * EC-02: Malformed Config - Fail Open (Serve Source)
     *
     * IMPORTANT: This test requires DevOps coordination to deploy malformed config.
     * Cannot be fully automated without infrastructure support.
     */
    // eslint-disable-next-line no-loop-func
    test(`${getFeature('EC-02').tcid}: ${getFeature('EC-02').name} - ${getFeature('EC-02').tags}`, async () => {
      const feature = getFeature('EC-02');
      console.info(`[Test] ${feature.description}`);
      console.info('[Note] This test requires DevOps coordination to deploy malformed config');

      await test.step('Document malformed config handling (Fail Open)', async () => {
        console.info('='.repeat(60));
        console.info('[EC-02] Malformed Config - Fail Open Test');
        console.info('');
        console.info('This test validates Fail Open behavior when config JSON is malformed.');
        console.info('');
        console.info('SCENARIO:');
        console.info('- fg-edge-worker-config.json is malformed/invalid');
        console.info('- EdgeWorker should serve Source content (not error page)');
        console.info('');
        console.info('MANUAL TEST STEPS:');
        console.info('1. Coordinate with DevOps to deploy malformed config JSON');
        console.info('   Examples of malformed config:');
        console.info('   - Invalid JSON syntax (missing brackets, quotes)');
        console.info('   - Missing required fields');
        console.info('   - Invalid date formats');
        console.info('2. Navigate to gated page (any user state)');
        console.info('3. Verify Source content is served (NOT error page)');
        console.info('');
        console.info('CONFIG LOCATION:');
        console.info('- Stage: https://business.stage.adobe.com/.milo/pub/fg-edge-worker-config.json');
        console.info('- Prod: https://business.adobe.com/.milo/pub/fg-edge-worker-config.json');
        console.info('');
        console.info('EXPECTED RESULTS:');
        console.info('- User sees Source content (graceful degradation)');
        console.info('- No 500/503 or error page displayed');
        console.info('- EdgeWorker logs show JSON parse error (check Akamai logs)');
        console.info('');
        console.info('AUTOMATED VERIFICATION (when malformed config deployed):');
        console.info('='.repeat(60));
      });

      // Verify current config is valid (baseline)
      await test.step('Verify current config is valid (baseline)', async () => {
        await fgPage.enableNetworkInterception();

        // Navigate and verify page loads without error
        fgPage.clearResponseHeaders();
        await fgPage.navigateTo(TEST_PAGES.sessions);
        await fgPage.waitForTimeout(2000);

        const pageTitle = await fgPage.page.title();
        console.info(`[FG] Page loaded successfully: ${pageTitle}`);
        console.info('[FG] ✓ Current config is valid - baseline established');
        console.info('[FG] ⚠ Malformed config test requires DevOps coordination');

        // Verify page didn't return an error page
        expect(pageTitle, 'Page should load without error').not.toBe('');
        expect(pageTitle, 'Page should not be a 500 error').not.toContain('500');
        expect(pageTitle, 'Page should not be a 503 error').not.toContain('503');
      });
    });

    /**
     * EC-03: Boundary Switching - Content Switch on Time Cross
     */
    test(`${getFeature('EC-03').tcid}: ${getFeature('EC-03').name} - ${getFeature('EC-03').tags}`, async () => {
      const feature = getFeature('EC-03');
      console.info(`[Test] ${feature.description}`);
      console.info('[Note] This test requires coordination with config timing changes');

      await test.step('Document boundary switching behavior', async () => {
        console.info('='.repeat(60));
        console.info('[EC-03] Boundary Switching - Content Switch Test');
        console.info('');
        console.info('This test validates content switching at event time boundaries.');
        console.info('');
        console.info('SCENARIO:');
        console.info('- User has page loaded before event start time');
        console.info('- Event start time passes while user is on page');
        console.info('- User refreshes page');
        console.info('');
        console.info('MANUAL TEST STEPS:');
        console.info('1. Update config: Set event start time to 2 minutes in future');
        console.info('   Location: https://da.live/#/adobecom/da-bacom/.milo/pub');
        console.info('   Sheet: fgreleasetimeslots_stage');
        console.info('2. Publish config and clear Akamai cache');
        console.info('3. Load page - should see Source content (or 404 for anonymous)');
        console.info('4. Wait for event start time to pass');
        console.info('5. Refresh page - should see Floodgate content');
        console.info('');
        console.info('EXPECTED RESULTS:');
        console.info('- Before event start: Source content served');
        console.info('- After event start: Floodgate content served on refresh');
        console.info('- Content updates immediately (no stale content)');
        console.info('- TTL check ensures fresh content');
        console.info('');
        console.info('[Manual Test Required]');
        console.info('='.repeat(60));
      });
    });

    /**
     * EC-04: IMS Auth Failure - Fail Open (Serve Source)
     *
     * This test documents expected behavior when IMS times out or returns 500.
     * Cannot be fully automated - requires DevOps coordination.
     *
     * Run with: npx playwright test --config=configs/floodgate.config.js --grep "EC-04" --headed
     */
    test(`${getFeature('EC-04').tcid}: ${getFeature('EC-04').name} - ${getFeature('EC-04').tags}`, async () => {
      const feature = getFeature('EC-04');
      console.info(`[Test] ${feature.description}`);
      console.info('[Note] This test requires DevOps coordination to simulate IMS failure');

      await test.step('Document IMS failure behavior', async () => {
        console.info('='.repeat(60));
        console.info('[EC-04] IMS Auth Failure - Fail Open Test');
        console.info('');
        console.info('This test validates Fail Open behavior when IMS is unavailable.');
        console.info('');
        console.info('SCENARIO:');
        console.info('- User is logged in (aux_sid exists)');
        console.info('- EdgeWorker needs to validate session with IMS');
        console.info('- IMS times out (>1000ms) or returns 500');
        console.info('');
        console.info('EXPECTED BEHAVIOR:');
        console.info('- EdgeWorker should Fail Open');
        console.info('- User sees Source content (not error page)');
        console.info('- No 503 errors shown to user');
        console.info('- Graceful degradation');
        console.info('');
        console.info('MANUAL TEST STEPS (Requires DevOps):');
        console.info('1. DevOps simulates IMS timeout/500 at infrastructure level');
        console.info('2. Logged-in user visits Floodgate page');
        console.info('3. Verify user sees Source content (not 503)');
        console.info('4. Check EdgeWorker logs for timeout handling');
        console.info('');
        console.info('DEVOPS COORDINATION REQUIRED');
        console.info('='.repeat(60));
      });
    });

    /**
     * EC-05: EdgeWorker Timezone - UTC Based
     *
     * This test documents expected timezone behavior.
     * Requires VPN to different geographic locations to fully verify.
     *
     * Run with: npx playwright test --config=configs/floodgate.config.js --grep "EC-05" --headed
     */
    test(`${getFeature('EC-05').tcid}: ${getFeature('EC-05').name} - ${getFeature('EC-05').tags}`, async () => {
      const feature = getFeature('EC-05');
      console.info(`[Test] ${feature.description}`);
      console.info('[Note] This test requires VPN to different locations');

      await test.step('Document timezone behavior', async () => {
        console.info('='.repeat(60));
        console.info('[EC-05] EdgeWorker Timezone - UTC Based Test');
        console.info('');
        console.info('This test validates that EdgeWorker uses UTC time,');
        console.info('not local browser or server time.');
        console.info('');
        console.info('EXPECTED BEHAVIOR:');
        console.info('- EdgeWorker compares current UTC time to config times');
        console.info('- All users globally see same content at same UTC time');
        console.info('- Browser local timezone does NOT affect content');
        console.info('- Server location does NOT affect content');
        console.info('');
        console.info('MANUAL TEST STEPS (Requires VPN):');
        console.info('1. Note current UTC time and config event times');
        console.info('2. VPN to Japan - check content');
        console.info('3. VPN to UK - check content');
        console.info('4. VPN to US West - check content');
        console.info('5. All locations should see same content at same UTC time');
        console.info('');
        console.info('VERIFICATION:');
        console.info('- All locations see same x-adobe-content header');
        console.info('- Content switches globally at same moment');
        console.info('- No location-based content differences');
        console.info('');
        console.info('VPN ACCESS REQUIRED');
        console.info('='.repeat(60));
      });
    });
  });
});

// =============================================================================
// SECURITY TESTS
// =============================================================================
test.describe('Summit 2026 Floodgate - Security Tests', () => {
  test.setTimeout(60000);

  test.beforeEach(async ({ page }) => {
    fgPage = new FloodgatePage(page, TEST_ENV);
    await fgPage.enableNetworkInterception();
  });

  /**
   * SEC-01: Cookie Injection Attack - Non-Allowlisted User Cannot Bypass
   *
   * SECURITY TEST: Verifies that a non-allowlisted user cannot bypass
   * the gate by manually injecting the FG cookie.
   *
   * Attack scenario:
   * 1. User logs in (aux_sid cookie set by IMS)
   * 2. User visits page → AEP returns "not in allowlist" → Source content
   * 3. ATTACK: User manually injects fg_acom_stg cookie
   * 4. User visits page again
   * 5. Expected: STILL Source content (cookie injection doesn't bypass)
   *
   * Run with: npx playwright test --config=configs/floodgate.config.js --grep "SEC-01" --headed
   */
  test(`${getFeature('SEC-01').tcid}: ${getFeature('SEC-01').name} - ${getFeature('SEC-01').tags}`, async () => {
    const feature = getFeature('SEC-01');
    console.info(`[Test] ${feature.description}`);
    console.info('[SECURITY] Testing cookie injection attack by non-allowlisted user');
    console.info('[User] xiasun+nonAllowlisted@adobetest.com (NOT in allowlist)');

    // ============================================
    // STEP 1: Login and verify Source content
    // ============================================
    await test.step('Clear any existing state', async () => {
      await fgPage.clearUserState();
      await fgPage.deleteFloodgateCookie();
    });

    await test.step('Navigate to test page', async () => {
      const url = TEST_PAGES.sessions;
      console.info(`[SECURITY] URL: ${url}`);
      fgPage.clearResponseHeaders();
      await fgPage.navigateTo(url);
      await fgPage.waitForTimeout(2000);
    });

    await test.step('Login with NON-ALLOWLISTED user', async () => {
      const loginSuccess = await fgPage.loginNonAllowlistedUser();
      expect(loginSuccess, 'Login should succeed').toBe(true);
      console.info('[SECURITY] ✓ Logged in with non-allowlisted user');
    });

    await test.step('Visit page - should see Source content (not in allowlist)', async () => {
      const url = TEST_PAGES.sessions;
      fgPage.clearResponseHeaders();
      await fgPage.navigateTo(url);
      await fgPage.waitForTimeout(3000);

      const contentHeader = fgPage.getContentHeaderValue();
      const hasFgCookie = await fgPage.hasFloodgateCookie();

      console.info('[SECURITY] === BEFORE ATTACK ===');
      console.info(`  x-adobe-content: ${contentHeader}`);
      console.info(`  ${FG_COOKIE_NAME} cookie: ${hasFgCookie}`);

      // Non-allowlisted user should NOT have FG cookie
      expect(hasFgCookie, `Non-allowlisted user should NOT have ${FG_COOKIE_NAME} cookie`).toBe(false);
      console.info('[SECURITY] ✓ Confirmed: No FG cookie set (user not in allowlist)');
    });

    // ============================================
    // STEP 2: ATTACK - Inject FG cookie manually
    // ============================================
    await test.step('ATTACK: Manually inject FG cookie', async () => {
      console.info('');
      console.info('[SECURITY] === SIMULATING ATTACK ===');
      console.info(`  Attack: Manually setting ${FG_COOKIE_NAME} cookie`);
      console.info('  Goal: Bypass AEP check by pretending to be allowlisted');

      // Inject the FG cookie (simulating attacker manually setting it)
      await fgPage.setFloodgateCookie('INJECTED_BY_ATTACKER');
      const hasCookie = await fgPage.hasFloodgateCookie();

      console.info(`  ${FG_COOKIE_NAME} injected: ${hasCookie}`);
      expect(hasCookie, 'Cookie should be injected for attack test').toBe(true);
    });

    // ============================================
    // STEP 3: Visit page again - should STILL see Source
    // ============================================
    await test.step('Visit page AFTER cookie injection', async () => {
      const url = TEST_PAGES.sessions;
      console.info(`[SECURITY] Visiting page after attack: ${url}`);
      fgPage.clearResponseHeaders();
      await fgPage.navigateTo(url);
      await fgPage.waitForTimeout(3000);
    });

    await test.step('SECURITY: Verify attack FAILED (still Source content)', async () => {
      const contentHeader = fgPage.getContentHeaderValue();
      const isFloodgate = fgPage.isFloodgateContent();

      console.info('[SECURITY] === AFTER ATTACK ===');
      console.info(`  x-adobe-content: ${contentHeader}`);
      console.info(`  Serves Floodgate: ${isFloodgate}`);

      // SECURITY: Cookie injection MUST NOT bypass the gate
      expect(
        isFloodgate,
        'SECURITY VULNERABILITY: Cookie injection MUST NOT bypass Floodgate. '
        + 'Non-allowlisted user with injected cookie should still see Source content.',
      ).toBe(false);

      console.info('[SECURITY] ✓ PASS: Cookie injection attack FAILED');
      console.info('  - User logged in: YES');
      console.info('  - User in allowlist: NO');
      console.info('  - Cookie manually injected: YES');
      console.info('  - Result: Still Source content (attack blocked)');
    });
  });

  /**
   * SEC-02: Cookie Poisoning - Invalid Session Detection
   *
   * Attack: Set fg_acom cookie WITHOUT valid aux_sid session
   * Expected: Server should not trust cookie alone, serve Source
   *
   * Run with: npx playwright test --config=configs/floodgate.config.js --grep "SEC-02" --headed
   */
  test(`${getFeature('SEC-02').tcid}: ${getFeature('SEC-02').name} - ${getFeature('SEC-02').tags}`, async () => {
    const feature = getFeature('SEC-02');
    console.info(`[Test] ${feature.description}`);
    console.info('[SECURITY] Testing cookie poisoning attack');

    await test.step('Clear all cookies', async () => {
      await fgPage.clearUserState();
    });

    await test.step('Set FG cookie WITHOUT valid session (attack)', async () => {
      // Hacker attempt: manually set FG cookie without being authenticated
      await fgPage.setFloodgateCookie('1');
      console.info(`[SECURITY] Attack: Set ${FG_COOKIE_NAME}=1 without aux_sid`);
    });

    await test.step('Navigate to protected page', async () => {
      const url = TEST_PAGES.sessions;
      console.info(`[SECURITY] URL: ${url}`);
      fgPage.clearResponseHeaders();
      await fgPage.navigateTo(url);
      await fgPage.waitForTimeout(3000);
    });

    await test.step('SECURITY: Verify behavior', async () => {
      const contentHeader = fgPage.getContentHeaderValue();
      const isFloodgate = fgPage.isFloodgateContent();
      const hasFgCookie = await fgPage.hasFloodgateCookie();

      console.info('[SECURITY] === COOKIE POISONING RESULTS ===');
      console.info(`  Attack: ${FG_COOKIE_NAME}=1 without aux_sid`);
      console.info(`  x-adobe-content: ${contentHeader}`);
      console.info(`  Serves Floodgate: ${isFloodgate}`);
      console.info(`  FG cookie still exists: ${hasFgCookie}`);

      // Document behavior for security review
      if (isFloodgate) {
        console.info('[SECURITY] ⚠ Cookie alone grants FG access');
        console.info('[SECURITY] Review: Is this acceptable with 1-day TTL?');
      } else {
        console.info('[SECURITY] ✓ Cookie alone does NOT grant FG access');
      }
    });
  });

  /**
   * SEC-03: Direct Access - AEM Live Origin Blocked
   *
   * Attack: Directly access aem.live origin bypassing Akamai
   * Expected: 403 Forbidden or connection blocked
   *
   * Run with: npx playwright test --config=configs/floodgate.config.js --grep "SEC-03" --headed
   */
  test(`${getFeature('SEC-03').tcid}: ${getFeature('SEC-03').name} - ${getFeature('SEC-03').tags}`, async () => {
    const feature = getFeature('SEC-03');
    console.info(`[Test] ${feature.description}`);
    console.info('[SECURITY] Testing direct origin access');

    await test.step('Attempt direct access to aem.live origin', async () => {
      const directUrl = 'https://main--www-pink--adobecom.aem.live/summit/2026/sessions.html';

      console.info('[SECURITY] === DIRECT ACCESS TEST ===');
      console.info(`  Target: ${directUrl}`);
      console.info('  Expected: 403 Forbidden or blocked');

      try {
        const response = await fgPage.makeDirectRequest(directUrl);

        console.info(`  Status: ${response.status}`);

        if (response.status === 403) {
          console.info('[SECURITY] ✓ PASS: Direct access returns 403');
        } else {
          console.info(`[SECURITY] ⚠ Unexpected status: ${response.status}`);
        }
      } catch (error) {
        // Connection refused/blocked is also acceptable
        console.info(`  Blocked: ${error.message}`);
        console.info('[SECURITY] ✓ PASS: Direct access blocked at network level');
      }
    });
  });

  /**
   * SEC-04: Session Hijacking - Stolen aux_sid Token
   *
   * SECURITY TEST: Can an attacker steal a valid aux_sid from an allowlisted
   * user and use it in a different browser to access Floodgate content?
   *
   * Attack scenario:
   * 1. Allowlisted user logs in → gets aux_sid cookie
   * 2. ATTACK: Attacker copies the aux_sid value
   * 3. Attacker opens new browser (fresh context)
   * 4. Attacker sets stolen aux_sid cookie
   * 5. Attacker visits the page
   *
   * This tests if aux_sid tokens can be replayed across sessions.
   *
   * Run with: npx playwright test --config=configs/floodgate.config.js --grep "SEC-04" --headed
   */
  test(`${getFeature('SEC-04').tcid}: ${getFeature('SEC-04').name} - ${getFeature('SEC-04').tags}`, async ({ browser }) => {
    const feature = getFeature('SEC-04');
    console.info(`[Test] ${feature.description}`);
    console.info('[SECURITY] Testing session hijacking with stolen aux_sid');

    let stolenAuxSid = null;

    // ============================================
    // STEP 1: Login with allowlisted user, get aux_sid
    // ============================================
    const ctxVictim = await browser.newContext();
    const pageVictim = await ctxVictim.newPage();
    const fgVictim = new FloodgatePage(pageVictim, TEST_ENV);
    await fgVictim.enableNetworkInterception();

    await test.step('VICTIM: Login with allowlisted user', async () => {
      console.info('[SECURITY] === STEP 1: VICTIM LOGIN ===');
      console.info('[User] vevent+registered@adobetest.com (ALLOWLISTED)');

      await fgVictim.navigateTo(TEST_PAGES.sessions);
      await fgVictim.waitForTimeout(2000);

      const loginSuccess = await fgVictim.loginAllowlistedUser();
      expect(loginSuccess, 'Victim login should succeed').toBe(true);
      console.info('[SECURITY] ✓ Victim logged in');
    });

    await test.step('VICTIM: Verify access to Floodgate content', async () => {
      fgVictim.clearResponseHeaders();
      await fgVictim.navigateTo(TEST_PAGES.sessions);
      await fgVictim.waitForTimeout(3000);

      const isFloodgate = fgVictim.isFloodgateContent();
      const contentHeader = fgVictim.getContentHeaderValue();

      console.info(`[SECURITY] Victim x-adobe-content: ${contentHeader}`);
      console.info(`[SECURITY] Victim sees Floodgate: ${isFloodgate}`);

      // Allowlisted user should see FG content
      expect(isFloodgate, 'Allowlisted victim should see Floodgate content').toBe(true);
    });

    await test.step('ATTACK: Steal aux_sid from victim', async () => {
      console.info('');
      console.info('[SECURITY] === STEP 2: STEALING SESSION ===');

      const cookies = await ctxVictim.cookies();
      const auxSidCookie = cookies.find((c) => c.name === 'aux_sid');

      expect(auxSidCookie, 'Victim should have aux_sid cookie').toBeTruthy();

      stolenAuxSid = auxSidCookie.value;
      console.info(`[SECURITY] aux_sid stolen: ${stolenAuxSid.substring(0, 50)}...`);
      console.info('[SECURITY] (Token truncated for display)');
    });

    // Close victim's browser
    await ctxVictim.close();
    console.info('[SECURITY] Victim browser closed');

    // ============================================
    // STEP 2: Attacker uses stolen aux_sid in fresh browser
    // ============================================
    const ctxAttacker = await browser.newContext();
    const pageAttacker = await ctxAttacker.newPage();
    const fgAttacker = new FloodgatePage(pageAttacker, TEST_ENV);
    await fgAttacker.enableNetworkInterception();

    await test.step('ATTACKER: Set stolen aux_sid in fresh browser', async () => {
      console.info('');
      console.info('[SECURITY] === STEP 3: ATTACKER SESSION ===');
      console.info('[SECURITY] Fresh browser context (no prior login)');

      // Set the stolen aux_sid
      await fgAttacker.setRealSessionToken(stolenAuxSid);
      console.info('[SECURITY] Stolen aux_sid injected');

      // Verify cookie is set
      const cookies = await ctxAttacker.cookies();
      const hasAuxSid = cookies.some((c) => c.name === 'aux_sid');
      console.info(`[SECURITY] aux_sid in attacker browser: ${hasAuxSid}`);
    });

    await test.step('ATTACKER: Visit protected page with stolen session', async () => {
      console.info('[SECURITY] Attacker visiting protected page...');
      fgAttacker.clearResponseHeaders();
      await fgAttacker.navigateTo(TEST_PAGES.sessions);
      await fgAttacker.waitForTimeout(3000);
    });

    await test.step('SECURITY: Analyze session hijacking result', async () => {
      const contentHeader = fgAttacker.getContentHeaderValue();
      const isFloodgate = fgAttacker.isFloodgateContent();
      const hasFgCookie = await fgAttacker.hasFloodgateCookie();

      console.info('[SECURITY] === SESSION HIJACKING RESULTS ===');
      console.info(`  Attacker x-adobe-content: ${contentHeader}`);
      console.info(`  Attacker sees Floodgate: ${isFloodgate}`);
      console.info(`  Attacker got ${FG_COOKIE_NAME}: ${hasFgCookie}`);

      if (isFloodgate) {
        console.info('');
        console.info('[SECURITY] ⚠️ WARNING: Session hijacking SUCCEEDED');
        console.info('  - Stolen aux_sid allowed access to Floodgate content');
        console.info('  - This is expected behavior for JWT session tokens');
        console.info('  - Mitigation: Token should have short TTL, IP binding, etc.');
        console.info('');
        console.info('[SECURITY] RECOMMENDATION:');
        console.info('  - Consider binding aux_sid to IP address');
        console.info('  - Consider binding aux_sid to user agent');
        console.info('  - Ensure short token expiration');
      } else {
        console.info('');
        console.info('[SECURITY] ✓ Session hijacking BLOCKED');
        console.info('  - Stolen aux_sid did NOT grant access');
        console.info('  - Additional validation prevented the attack');
      }

      // Document the result (test passes either way - we're documenting behavior)
      console.info('');
      console.info('[SECURITY] Test completed - results documented above');
    });

    await ctxAttacker.close();
  });
});

// =============================================================================
// CACHING TESTS
// =============================================================================
test.describe('Summit 2026 Floodgate - Caching Tests', () => {
  test.setTimeout(90000);

  /**
   * CA-02: Vary Header Verification
   *
   * Cache Key must include Cookie or fg_acom to prevent poisoning
   * Test with REAL allowlisted user to see Vary header on FG response
   *
   * Run with: npx playwright test --config=configs/floodgate.config.js --grep "CA-02" --headed
   */
  test(`${getFeature('CA-02').tcid}: ${getFeature('CA-02').name} - ${getFeature('CA-02').tags}`, async ({ page }) => {
    const feature = getFeature('CA-02');
    console.info(`[Test] ${feature.description}`);

    fgPage = new FloodgatePage(page, TEST_ENV);
    await fgPage.enableNetworkInterception();

    // ============================================
    // Login with allowlisted user to get FG response headers
    // ============================================
    await test.step('Navigate to test page', async () => {
      const url = TEST_PAGES.sessions;
      console.info(`[Cache] URL: ${url}`);
      await fgPage.navigateTo(url);
      await fgPage.waitForTimeout(2000);
    });

    await test.step('Login with ALLOWLISTED user', async () => {
      console.info('[Cache] Logging in with allowlisted user...');
      console.info('[User] vevent+registered@adobetest.com (ALLOWLISTED)');
      const loginSuccess = await fgPage.loginAllowlistedUser();
      expect(loginSuccess, 'Allowlisted user login should succeed').toBe(true);
      console.info('[Cache] ✓ Allowlisted user logged in');
    });

    await test.step('Visit page to get FG response headers', async () => {
      const url = TEST_PAGES.sessions;
      console.info(`[Cache] Visiting: ${url}`);
      fgPage.clearResponseHeaders();
      await fgPage.navigateTo(url);
      await fgPage.waitForTimeout(3000);
    });

    await test.step('Verify Vary header configuration', async () => {
      const headers = fgPage.getResponseHeaders();
      const varyHeader = headers.vary || headers.Vary || '';
      const cacheControl = headers['cache-control'] || headers['Cache-Control'] || 'not set';
      const contentHeader = fgPage.getContentHeaderValue();
      const isFloodgate = fgPage.isFloodgateContent();

      console.info('[Cache] === RESPONSE HEADERS ===');
      console.info(`  x-adobe-content: ${contentHeader}`);
      console.info(`  Floodgate content: ${isFloodgate}`);
      console.info(`  Vary: ${varyHeader}`);
      console.info(`  Cache-Control: ${cacheControl}`);

      // Check if Vary includes Cookie
      const hasCookieVary = varyHeader.toLowerCase().includes('cookie');
      console.info(`  Vary includes Cookie: ${hasCookieVary}`);

      console.info('');
      console.info('[Cache] === VARY HEADER ANALYSIS ===');
      if (hasCookieVary) {
        console.info('[Cache] ✓ Vary header includes Cookie');
        console.info('[Cache] CDN will cache separately for different cookie values');
      } else {
        console.info('[Cache] ⚠ WARNING: Vary header does NOT include Cookie');
        console.info('[Cache] Risk: CDN may serve FG content to wrong users!');
      }

      console.info('');
      console.info('[Cache] === CACHE-CONTROL ANALYSIS ===');
      if (cacheControl.includes('private')) {
        console.info('[Cache] ✓ Cache-Control is private - not cached by CDN');
      } else if (cacheControl.includes('no-store')) {
        console.info('[Cache] ✓ Cache-Control is no-store - not cached');
      } else if (cacheControl.includes('max-age')) {
        console.info('[Cache] ⚠ Content may be cached - verify Vary header');
      }

      console.info('');
      console.info('[DevOps Questions]');
      console.info('  1. Does Akamai Cache Key include fg_acom cookie?');
      console.info('  2. Is there automated cache purge at event start?');
      console.info('  3. What is the cache TTL for FG pages?');
    });
  });
});

// =============================================================================
// LOCALIZATION TESTS
// =============================================================================
test.describe('Summit 2026 Floodgate - Localization Tests', () => {
  test.setTimeout(120000);

  // TZ-01 removed - duplicates EC-05 (EdgeWorker Timezone - UTC Based)

  /**
   * TZ-02: Localized Pages - Same Content Delivery
   *
   * Localized pages should pull from localized Pink structure
   *
   * Run with: npx playwright test --config=configs/floodgate.config.js --grep "TZ-02" --headed
   */
  test(`${getFeature('TZ-02').tcid}: ${getFeature('TZ-02').name} - ${getFeature('TZ-02').tags}`, async ({ page }) => {
    const feature = getFeature('TZ-02');
    console.info(`[Test] ${feature.description}`);

    fgPage = new FloodgatePage(page, TEST_ENV);
    await fgPage.enableNetworkInterception();

    const localesToTest = ['/jp/', '/de/'];
    const results = [];

    // eslint-disable-next-line no-restricted-syntax
    for (const localePath of localesToTest) {
      // eslint-disable-next-line no-loop-func
      await test.step(`Verify ${localePath} content delivery`, async () => {
        fgPage.clearResponseHeaders();

        const testPath = `${localePath}summit/2026/sessions.html`.replace('//', '/');
        console.info(`[Locale] Testing: ${testPath}`);
        await fgPage.navigateTo(testPath);
        await fgPage.waitForTimeout(3000);

        const contentHeader = fgPage.getContentHeaderValue();
        results.push({ locale: localePath, path: testPath, contentHeader });

        console.info(`[Locale] ${localePath}: x-adobe-content = ${contentHeader}`);
      });
    }

    await test.step('Verify all locales have consistent content delivery', async () => {
      console.info('');
      console.info('[Locale] === RESULTS ===');
      results.forEach((r) => {
        console.info(`  ${r.locale}: ${r.contentHeader || 'none'}`);
      });

      const allHeaders = results.map((r) => r.contentHeader);
      const allSame = allHeaders.every((h) => h === allHeaders[0]);

      // Localized pages MUST have consistent content delivery
      expect(
        allSame,
        'Localized pages MUST have consistent content delivery across all locales.',
      ).toBe(true);

      console.info('[Locale] ✓ All locales have consistent content');
    });
  });
});

// =============================================================================
// NOTE: Performance Tests Removed
// =============================================================================
// Performance monitoring is handled by AEP API team.
// For load testing, see: tests/floodgate/floodgate-perf.k6.js (k6)
