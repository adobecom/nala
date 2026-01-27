/**
 * =============================================================================
 * Summit 2026 Floodgate Migration - Feature Definitions
 * =============================================================================
 *
 * Project: Summit 2026 Floodgate Migration
 * Target: Akamai EdgeWorker, AEP Audience, AEM (Milo/Dexter)
 * Version: 1.0
 *
 * Test Architecture:
 * - Time Check: Is CurrentTime <, >, or == EventStart/End?
 * - Auth Check: Is aux_sid (IMS session) present?
 * - Audience Check: Is user in AEP Allowlist?
 * - Cookie State: Is fg_acom already set?
 * - Content Delivery: Is X-Adobe-Content header present?
 *
 * Content Origins:
 * - Main/Source: main--www--adobecom
 * - Floodgate/Pink: main--www-pink--adobecom
 *
 * =============================================================================
 * PHASE OVERVIEW
 * =============================================================================
 * Phase A: "Before the Event" (Restricted Access)
 * Phase B: "During the Event" (Public Access)
 * Phase C: "After the Event" (Reversion)
 * Phase D: Edge Cases & Resilience
 *
 * Specialized Testing:
 * - Content Origin Verification
 * - Localization & Timezones
 * - Caching Strategy
 * - Performance Testing
 * - Security & Spoofing
 * =============================================================================
 */

module.exports = {
  name: 'Summit 2026 Floodgate Migration',
  features: [
    // =========================================================================
    // PHASE A: "BEFORE THE EVENT" (Restricted Access)
    // Config Prerequisite: JSON event-start-time is in the FUTURE
    // =========================================================================
    {
      tcid: 'BE-01',
      name: 'Anonymous User - Serve Source Content',
      description: 'Anonymous user should see Source content before event starts',
      phase: 'A',
      tags: '@floodgate @before-event @anonymous @smoke @regression',
      userState: 'anonymous',
      configPrereq: 'event-start-time in FUTURE',
      expected: {
        content: 'source',
        contentHeader: null, // x-adobe-content should NOT be "AEM-floodgate-pink-dx"
        fgCookieSet: false, // fg_acom_stg should NOT be set
      },
      technicalVerification: [
        'x-adobe-content is NOT "AEM-floodgate-pink-dx"',
        'fg_acom_stg cookie is NOT set',
      ],
    },
    {
      tcid: 'BE-02',
      name: 'Non-Allowlisted User - Serve Source Content',
      description: 'Logged in user NOT in allowlist should see Source content',
      phase: 'A',
      tags: '@floodgate @before-event @non-allowlisted @smoke @regression',
      userState: 'loggedIn-nonAllowlisted',
      configPrereq: 'event-start-time in FUTURE',
      expected: {
        content: 'source',
        contentHeader: null, // x-adobe-content NOT "AEM-floodgate-pink-dx"
        fgCookieSet: false, // fg_acom_stg NOT set (AEP returns Invalid)
      },
      technicalVerification: [
        'User validated against AEP; returns "Invalid"',
        'x-adobe-content is NOT "AEM-floodgate-pink-dx"',
        'fg_acom_stg cookie is NOT set',
      ],
    },
    {
      tcid: 'BE-03',
      name: 'Allowlisted User (First Visit) - Serve Floodgate Content',
      description: 'First-time allowlisted user should see Floodgate content and get cookie',
      phase: 'A',
      tags: '@floodgate @before-event @allowlisted @first-visit @smoke @regression',
      userState: 'loggedIn-allowlisted',
      configPrereq: 'event-start-time in FUTURE',
      expected: {
        content: 'floodgate',
        contentHeader: 'AEM-floodgate-pink-dx', // x-adobe-content header value
        fgCookieSet: true, // fg_acom_stg IS set
      },
      technicalVerification: [
        'AEP returns "Valid"',
        'x-adobe-content: "AEM-floodgate-pink-dx"',
        'fg_acom_stg cookie IS set',
      ],
    },
    {
      tcid: 'BE-04',
      name: 'Allowlisted User (Return Visit) - Serve Floodgate Content (Optimized)',
      description: 'Return allowlisted user with fg_acom cookie should see Floodgate content without AEP call',
      phase: 'A',
      tags: '@floodgate @before-event @allowlisted @return-visit @smoke @regression',
      userState: 'loggedIn-allowlisted-withCookie',
      configPrereq: 'event-start-time in FUTURE',
      expected: {
        content: 'floodgate',
        contentHeader: 'AEM-floodgate-pink-dx',
        fgCookieExists: true, // fg_acom_stg already exists → skip AEP call
      },
      technicalVerification: [
        'fg_acom_stg cookie exists → EdgeWorker skips AEP call',
        'x-adobe-content: "AEM-floodgate-pink-dx"',
      ],
    },
    {
      tcid: 'BE-05',
      name: 'FG Cookie Expiry (1 Day TTL) - Re-validation',
      description: 'When fg_acom_stg expires (1 day TTL), EdgeWorker re-calls AEP and re-sets cookie',
      phase: 'A',
      tags: '@floodgate @before-event @session-expiry @edge-case @regression',
      userState: 'loggedIn-nofgCookie',
      configPrereq: 'event-start-time in FUTURE',
      expected: {
        content: 'floodgate',
        fgCookieSet: true,
        note: 'fg_acom_stg re-set after AEP re-validation',
      },
      technicalVerification: [
        'aux_sid still valid (session active)',
        'fg_acom_stg deleted (simulating 1-day expiry)',
        'EdgeWorker re-calls AEP to validate',
        'fg_acom_stg re-set after validation',
        'x-adobe-content: AEM-floodgate-pink-dx',
      ],
    },

    // =========================================================================
    // PHASE B: "DURING THE EVENT" (Public Access)
    // Config Prerequisite: JSON event-start-time is PAST, event-end-time is FUTURE
    // =========================================================================
    {
      tcid: 'DE-01',
      name: 'Anonymous User - Serve Floodgate Content (Gate Lifted)',
      description: 'During event, anonymous users should see Floodgate content',
      phase: 'B',
      tags: '@floodgate @during-event @anonymous @critical @smoke @regression',
      userState: 'anonymous',
      configPrereq: 'event-start-time PAST, event-end-time FUTURE',
      expected: {
        content: 'floodgate',
        contentHeader: 'AEM-floodgate-pink-dx',
      },
      technicalVerification: [
        'CRITICAL: Gate is lifted - no auth required',
        'x-adobe-content: "AEM-floodgate-pink-dx"',
      ],
    },
    {
      tcid: 'DE-02',
      name: 'Logged In User - Serve Floodgate Content',
      description: 'During event, logged in users should see Floodgate content regardless of allowlist',
      phase: 'B',
      tags: '@floodgate @during-event @logged-in @smoke @regression',
      userState: 'loggedIn',
      configPrereq: 'event-start-time PAST, event-end-time FUTURE',
      expected: {
        content: 'floodgate',
        contentHeader: 'AEM-floodgate-pink-dx',
      },
      technicalVerification: [
        'Auth status irrelevant during event',
        'x-adobe-content: "AEM-floodgate-pink-dx"',
      ],
    },

    // =========================================================================
    // PHASE C: "AFTER THE EVENT" (Reversion)
    // Config Prerequisite: JSON event-end-time is PAST
    // =========================================================================
    {
      tcid: 'AE-01',
      name: 'Any User - Serve Source Content (Reversion)',
      description: 'After event, all users should see Source content',
      phase: 'C',
      tags: '@floodgate @after-event @reversion @smoke @regression',
      userState: 'any',
      configPrereq: 'event-end-time PAST',
      expected: {
        content: 'source',
        contentHeader: null, // x-adobe-content NOT "AEM-floodgate-pink-dx"
      },
      technicalVerification: [
        'x-adobe-content is NOT "AEM-floodgate-pink-dx"',
        'Content reverted to source',
      ],
    },

    // =========================================================================
    // PHASE D: EDGE CASES & RESILIENCE
    // =========================================================================
    {
      tcid: 'EC-01',
      name: 'AEP Service Down - Fail Open (Serve Source)',
      description: 'If AEP API times out or returns 500, user sees Source content',
      phase: 'D',
      tags: '@floodgate @edge-case @aep-failure @resilience @p0 @regression',
      userState: 'loggedIn-allowlisted',
      simulatedFailure: 'aep-timeout',
      expected: {
        content: 'source',
        hasFloodgateHeader: false,
        noError: true,
      },
      technicalVerification: [
        'If AEP API times out (>1000ms) or returns 500',
        'User sees Source content',
        'No 503 errors',
      ],
    },
    {
      tcid: 'EC-02',
      name: 'Malformed Config - Fail Open (Serve Source)',
      description: 'EdgeWorker handles JSON parse errors gracefully',
      phase: 'D',
      tags: '@floodgate @edge-case @config-error @resilience @regression',
      userState: 'any',
      simulatedFailure: 'malformed-config',
      expected: {
        content: 'source',
        hasFloodgateHeader: false,
        noError: true,
      },
      technicalVerification: [
        'EdgeWorker handles JSON parse errors gracefully',
        'No 5xx errors',
      ],
    },
    {
      tcid: 'EC-03',
      name: 'Boundary Switching - Content Switch on Time Cross',
      description: 'User active while time crosses start time should see content update on refresh',
      phase: 'D',
      tags: '@floodgate @edge-case @boundary-switch @regression @manual',
      userState: 'anonymous',
      expected: { content: 'switchOnRefresh' },
      automatable: false,
      requiresManual: 'Wait for actual time boundary crossing',
      technicalVerification: [
        'Refresh updates content immediately',
        'No stale content served',
      ],
    },
    {
      tcid: 'EC-04',
      name: 'IMS Auth Failure - Fail Open (Serve Source)',
      description: 'If IMS times out or returns 500, user sees Source content (Fail Open)',
      phase: 'D',
      tags: '@floodgate @edge-case @ims-failure @resilience @regression @manual @devops',
      userState: 'loggedIn-allowlisted',
      simulatedFailure: 'ims-timeout',
      expected: { content: 'source', hasFloodgateHeader: false, noError: true },
      automatable: false,
      requiresDevOps: 'Simulate IMS timeout/500 at infrastructure level',
      technicalVerification: [
        'IMS API times out or returns 500',
        'User sees Source content (Fail Open)',
        'No 503 errors',
      ],
    },
    {
      tcid: 'EC-05',
      name: 'EdgeWorker Timezone - UTC Based',
      description: 'EdgeWorker uses UTC time, not local browser/server time',
      phase: 'D',
      tags: '@floodgate @edge-case @timezone @regression @manual @vpn',
      userState: 'anonymous',
      expected: { usesUTC: true, notLocalTime: true },
      automatable: false,
      requiresVPN: 'VPN to Japan, UK, US to verify all see same content at same UTC time',
      technicalVerification: [
        'VPN to different geographic locations',
        'All locations see same content at same UTC time',
        'EdgeWorker does not use local browser time',
      ],
    },

    // =========================================================================
    // LOCALIZATION & TIMEZONES
    // TZ-01 removed - duplicates EC-05 (EdgeWorker Timezone - UTC Based)
    // =========================================================================
    {
      tcid: 'TZ-02',
      name: 'Localized Pages - Same Content Delivery',
      description: 'Localized pages should have same content delivery status',
      phase: 'localization',
      tags: '@floodgate @timezone @localized @regression',
      locales: ['/jp/', '/de/'],
      expected: { sameContentHeader: true },
      technicalVerification: [
        'Visit /jp/ or /de/ summit pages',
        'Check x-adobe-content header matches other locales',
      ],
    },

    // =========================================================================
    // CACHING STRATEGY
    // Note: CA-01 (Cache Leak Check) removed - cannot test CDN caching from client side
    // The real cache safety is verified by Vary header (CA-02) and DevOps config review
    // =========================================================================
    {
      tcid: 'CA-02',
      name: 'Vary Header Verification',
      description: 'Verify Vary header contains Cookie or X-Adobe-Floodgate',
      phase: 'caching',
      tags: '@floodgate @cache @vary-header @regression',
      expected: {
        varyHeaderPresent: true,
        containsCookie: true,
      },
      technicalVerification: [
        'Inspect HTTP Response Headers',
        'Vary header must contain Cookie or X-Adobe-Floodgate',
      ],
    },
    {
      tcid: 'CA-03',
      name: 'Event Start - Cache TTL Check',
      description: 'Content updates immediately at event start',
      phase: 'caching',
      tags: '@floodgate @cache @ttl @regression',
      expected: { contentUpdatesImmediately: true },
      technicalVerification: [
        'Wait for Event Start Time -> Refresh',
        'Content updates immediately (TTL check)',
      ],
    },

    // =========================================================================
    // PERFORMANCE TESTING - Removed (AEP team responsibility)
    // =========================================================================
    // Performance monitoring is handled by the AEP API team.
    // For k6 load testing reference, see: tests/floodgate/floodgate-perf.k6.js

    // =========================================================================
    // SECURITY & SPOOFING
    // =========================================================================
    {
      tcid: 'SEC-01',
      name: 'Cookie Injection Attack - Non-Allowlisted User Cannot Bypass',
      description: 'Non-allowlisted user cannot bypass gate by injecting FG cookie',
      phase: 'security',
      tags: '@floodgate @security @cookie-injection @critical @p0 @regression',
      userState: 'loggedIn-nonAllowlisted',
      attackMethod: 'cookieInjection',
      expected: { content: 'source', attackBlocked: true },
      technicalVerification: [
        '1. Login with non-allowlisted user → Source content (no FG cookie)',
        '2. ATTACK: Manually inject fg_acom_stg cookie',
        '3. Visit page again',
        '4. RESULT: Still Source content (attack blocked)',
      ],
      note: 'Tests that injected cookies do not bypass AEP authorization check',
    },
    {
      tcid: 'SEC-02',
      name: 'Cookie Poisoning - Invalid Session Detection',
      description: 'Server detects invalid session when cookie set without valid session',
      phase: 'security',
      tags: '@floodgate @security @cookie-poisoning @critical @p0 @regression',
      attackMethod: 'cookiePoisoning',
      expected: {
        invalidSessionDetected: true,
        content: 'source',
      },
      technicalVerification: [
        'Set fg_acom=1 without session',
        'Server detects invalid session',
        'Returns Source content',
      ],
    },
    {
      tcid: 'SEC-03',
      name: 'Direct Access - AEM Live Origin Blocked',
      description: 'Direct access to aem.live origin should return 403',
      phase: 'security',
      tags: '@floodgate @security @direct-access @critical @p0 @regression',
      attackMethod: 'directAccess',
      expected: { status: 403 },
      technicalVerification: [
        'Access ...aem.live origin directly',
        '403 Forbidden',
      ],
    },
    {
      tcid: 'SEC-04',
      name: 'Session Hijacking - Stolen aux_sid Token',
      description: 'Test if stolen aux_sid from allowlisted user can be replayed in another browser',
      phase: 'security',
      tags: '@floodgate @security @session-hijacking @critical @p0 @regression',
      attackMethod: 'sessionHijacking',
      expected: { documentsVulnerability: true },
      technicalVerification: [
        '1. Allowlisted user logs in → gets aux_sid',
        '2. ATTACK: Copy aux_sid value',
        '3. Open fresh browser (anonymous)',
        '4. Set stolen aux_sid cookie',
        '5. Visit page → document if access granted',
      ],
      note: 'Documents session token replay vulnerability. aux_sid is JWT - replay may succeed.',
    },
  ],
};
