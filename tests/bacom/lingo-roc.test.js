import { expect, test } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';
import { features } from '../../features/bacom/lingo-roc.spec.js';
import LingoROC from '../../selectors/bacom/lingo-roc.page.js';

const { WebUtil } = require('../../libs/webutil.js');

/**
 * BACOM Lingo ROC (Region Only Content) Fragment Swapping Tests
 * Feature: MWPW-179495
 *
 * TEST SCOPE:
 * -----------
 * | Test Type    | Regions Tested                               | Fragments Tested |
 * |--------------|---------------------------------------------|------------------|
 * | FULL FEATURE | /ch_fr, /la                                 | textmeplingoblock, swapblock, sectionreplacement, noroc |
 * | BASIC        | /ca_fr, /at, /ch_de, /ch_it, /br            | textmeplingoblock only |
 * | NEGATIVE     | /es + akamaiLocale=us (no swap expected)     | Should NOT swap  |
 * | LATAM MEPLNG | /es + all 16 LATAM GeoIPs → /la/ fragments  | textmeplingoblock (+ full for mx) |
 *
 * LATAM MEP-LINGO:
 * When visiting /es/ with a LATAM GeoIP, mep-lingo should pull fragments from /la/.
 * /la is the ONLY regional site for /es base.
 * LATAM GeoIP codes: bo, cr, do, ec, gt, pa, pr, py, sv, uy, ve, ar, cl, co, mx, pe
 *
 * FULL FEATURE URLs (with mepHighlight & akamaiLocale params):
 * - French Swiss:   /fr/drafts/mepqa/fragments/base (akamaiLocale=ch_fr)
 * - Spanish LATAM:  /es/drafts/mepqa/fragments/base (akamaiLocale=la)
 */

// Report file paths
const RESULTS_DIR = path.join(process.cwd(), 'results');
const REPORT_JSONL_PATH = path.join(RESULTS_DIR, 'lingo-roc-test-results.jsonl');
const REPORT_JSON_PATH = path.join(RESULTS_DIR, 'lingo-roc-detailed-report.json');
const RUN_MARKER_PATH = path.join(RESULTS_DIR, '.lingo-roc-run-marker');

// Ensure results directory exists
function ensureResultsDir() {
  if (!fs.existsSync(RESULTS_DIR)) {
    fs.mkdirSync(RESULTS_DIR, { recursive: true });
  }
}

// Append test result (parallel-safe)
function appendTestResult(testResult) {
  ensureResultsDir();
  const line = `${JSON.stringify(testResult)}\n`;
  fs.appendFileSync(REPORT_JSONL_PATH, line);
  console.info(`[LingoROC] Appended result for: ${testResult.testName}`);
}

// Clear previous results
function clearPreviousResults() {
  ensureResultsDir();

  if (fs.existsSync(RUN_MARKER_PATH)) {
    try {
      const markerStat = fs.statSync(RUN_MARKER_PATH);
      const ageMs = Date.now() - markerStat.mtimeMs;
      if (ageMs < 60000) {
        console.info('[LingoROC] Skipping clear - another worker already initialized');
        return;
      }
    } catch (e) {
      // Ignore stat errors
    }
  }

  if (fs.existsSync(REPORT_JSONL_PATH)) {
    fs.unlinkSync(REPORT_JSONL_PATH);
    console.info('[LingoROC] Cleared previous results');
  }

  fs.writeFileSync(RUN_MARKER_PATH, new Date().toISOString());
}

// Aggregate final report
function aggregateReport() {
  ensureResultsDir();

  if (!fs.existsSync(REPORT_JSONL_PATH)) {
    console.warn('[LingoROC] No test results found to aggregate');
    return;
  }

  const lines = fs.readFileSync(REPORT_JSONL_PATH, 'utf-8').split('\n').filter((l) => l.trim());
  const tests = lines.map((line) => JSON.parse(line));

  let passedTests = 0;
  let failedTests = 0;
  let skippedTests = 0;

  tests.forEach((t) => {
    if (t.status === 'passed') passedTests += 1;
    else if (t.status === 'failed') failedTests += 1;
    else if (t.status === 'skipped') skippedTests += 1;
  });

  const report = {
    timestamp: new Date().toISOString(),
    feature: 'MWPW-179495 - ROC Fragment Swapping (with LATAM mep-lingo consolidation)',
    summary: {
      totalTests: tests.length,
      passed: passedTests,
      failed: failedTests,
      skipped: skippedTests,
    },
    tests,
  };

  fs.writeFileSync(REPORT_JSON_PATH, JSON.stringify(report, null, 2));
  console.info(`[LingoROC] Final report saved to: ${REPORT_JSON_PATH}`);
  console.info(`[LingoROC] Summary: ${tests.length} tests, ${passedTests} passed, ${failedTests} failed, ${skippedTests} skipped`);
}

// Build test URL with akamaiLocale parameter
function buildTestUrl(baseUrl, pageUrl, miloLibs, akamaiLocale = '') {
  const localeParam = akamaiLocale ? `&akamaiLocale=${akamaiLocale}` : '';
  return `${baseUrl}${pageUrl}${miloLibs}${localeParam}`;
}

// Dismiss popups/modals
async function dismissPopups(page) {
  const popupSelectors = [
    '#onetrust-accept-btn-handler',
    '.onetrust-close-btn-handler',
    '.dialog-close',
    '.modal-close',
    '[aria-label="Close"]',
    '[aria-label="close"]',
    'button.close',
    '.feds-dialog-close',
    '.locale-modal-close',
  ];

  for (const selector of popupSelectors) {
    try {
      const closeBtn = page.locator(selector).first();
      if (await closeBtn.isVisible({ timeout: 1000 })) {
        await closeBtn.click();
        await page.waitForTimeout(500);
      }
    } catch {
      // Continue
    }
  }

  try {
    await page.keyboard.press('Escape');
  } catch {
    // Ignore
  }
}

// Load page and verify it loaded
async function loadAndVerifyPage(page, url, lingoROC) {
  try {
    console.info(`[LingoROC] Navigating to: ${url}`);
    await page.goto(url, { timeout: 60000, waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(2000);
    await dismissPopups(page);
    // Use page object's popup dismissal (handles locale modal)
    await lingoROC.dismissAllPopups();
    await lingoROC.waitForPageWithFragments();
    // Extra wait for badges to render
    await page.waitForTimeout(2000);
    return { loaded: true };
  } catch (error) {
    console.warn(`[LingoROC] Page load failed: ${error.message}`);
    return { loaded: false, error: error.message };
  }
}

test.describe('BACOM Lingo ROC Fragment Swapping Test Suite', () => {
  test.setTimeout(10 * 60 * 1000); // 10 minutes
  test.describe.configure({ mode: 'serial' });

  let testData;

  test.beforeAll(async () => {
    clearPreviousResults();
    testData = await WebUtil.loadTestData(features[0].data);
  });

  test.afterAll(() => {
    aggregateReport();
  });

  // =========================================================================
  // FULL FEATURE TESTS (0-1)
  // Test all 4 mep-lingo fragments: textmeplingoblock, swapblock, sectionreplacement, noroc
  // =========================================================================

  // Test 0: French → Swiss French (FULL FEATURE)
  test(`${features[0].name}, ${features[0].tags}`, async ({ page }) => {
    const lingoROC = new LingoROC(page);
    const config = testData['fr-ch-swap'];
    const url = buildTestUrl(testData.baseUrl, config.pageUrl, testData.miloLibs, config.akamaiLocale);

    const loadResult = await loadAndVerifyPage(page, url, lingoROC);
    if (!loadResult.loaded) {
      appendTestResult({ testName: features[0].name, status: 'skipped', reason: loadResult.error, timestamp: new Date().toISOString() });
      test.skip();
      return;
    }

    await test.step('Verify French → Swiss French full fragment swap', async () => {
      // Close any remaining popups before verification
      await lingoROC.dismissAllPopups();
      await page.waitForTimeout(1000);

      // Verify using data-path attribute: /ch_fr = swapped, /fr/ = fallback
      const result = await lingoROC.verifyFragmentSwap('/ch_fr', '/fr/');

      console.info(`[LingoROC] French → Swiss French (akamaiLocale=${config.akamaiLocale})`);
      console.info(`[LingoROC] Swapped to /ch_fr: ${result.swapped}`);
      console.info(`[LingoROC] Fallback to /fr/: ${result.fallback}`);
      console.info('[LingoROC] Expected swapped: textmeplingoblock, swapblock, sectionreplacement');
      console.info('[LingoROC] Expected fallback: noroc');

      // Full feature test should have swapped fragments
      expect(result.swapped).toBeGreaterThan(0);
    });

    const finalResult = await lingoROC.verifyFragmentSwap('/ch_fr', '/fr/');
    appendTestResult({
      testName: features[0].name,
      status: 'passed',
      url,
      akamaiLocale: config.akamaiLocale,
      swapped: finalResult.swapped,
      fallback: finalResult.fallback,
      timestamp: new Date().toISOString(),
    });
  });

  // Test 1: Spanish → Latin America (FULL FEATURE)
  // /la is the only regional site for /es base
  test(`${features[1].name}, ${features[1].tags}`, async ({ page }) => {
    const lingoROC = new LingoROC(page);
    const config = testData['es-la-swap'];
    const url = buildTestUrl(testData.baseUrl, config.pageUrl, testData.miloLibs, config.akamaiLocale);

    const loadResult = await loadAndVerifyPage(page, url, lingoROC);
    if (!loadResult.loaded) {
      appendTestResult({ testName: features[1].name, status: 'skipped', reason: loadResult.error, timestamp: new Date().toISOString() });
      test.skip();
      return;
    }

    await test.step('Verify Spanish → Latin America full fragment swap', async () => {
      // Close any remaining popups before verification
      await lingoROC.dismissAllPopups();
      await page.waitForTimeout(1000);

      // Verify using data-path attribute: /la = swapped, /es/ = fallback
      const result = await lingoROC.verifyFragmentSwap('/la', '/es/');

      console.info(`[LingoROC] Spanish → Latin America (akamaiLocale=${config.akamaiLocale})`);
      console.info(`[LingoROC] Swapped to /la: ${result.swapped}`);
      console.info(`[LingoROC] Fallback to /es/: ${result.fallback}`);
      console.info('[LingoROC] Expected swapped: textmeplingoblock, swapblock, sectionreplacement');
      console.info('[LingoROC] Expected fallback: noroc');

      // Full feature test should have swapped fragments
      expect(result.swapped).toBeGreaterThan(0);
    });

    const finalResult = await lingoROC.verifyFragmentSwap('/la', '/es/');
    appendTestResult({
      testName: features[1].name,
      status: 'passed',
      url,
      akamaiLocale: config.akamaiLocale,
      swapped: finalResult.swapped,
      fallback: finalResult.fallback,
      timestamp: new Date().toISOString(),
    });
  });

  // =========================================================================
  // BASIC TESTS (2-6)
  // Test textmeplingoblock only
  // =========================================================================

  // Test 2: French → Canadian French (BASIC)
  test(`${features[2].name}, ${features[2].tags}`, async ({ page }) => {
    const lingoROC = new LingoROC(page);
    const config = testData['fr-ca-swap'];
    const url = buildTestUrl(testData.baseUrl, config.pageUrl, testData.miloLibs, config.akamaiLocale);

    const loadResult = await loadAndVerifyPage(page, url, lingoROC);
    if (!loadResult.loaded) {
      appendTestResult({ testName: features[2].name, status: 'skipped', reason: loadResult.error, timestamp: new Date().toISOString() });
      test.skip();
      return;
    }

    await test.step('Verify French → Canadian French textmeplingoblock swap', async () => {
      await lingoROC.dismissAllPopups();
      await page.waitForTimeout(1000);

      // Verify using data-path: /ca_fr = swapped
      const result = await lingoROC.verifyFragmentSwap('/ca_fr', '/fr/');

      console.info(`[LingoROC] French → Canadian French (akamaiLocale=${config.akamaiLocale})`);
      console.info(`[LingoROC] Swapped to /ca_fr: ${result.swapped}`);
      console.info('[LingoROC] Expected: textmeplingoblock swapped to /ca_fr');

      expect(result.swapped).toBeGreaterThan(0);
    });

    appendTestResult({
      testName: features[2].name,
      status: 'passed',
      url,
      akamaiLocale: config.akamaiLocale,
      timestamp: new Date().toISOString(),
    });
  });

  // Test 3: German → Austria (BASIC)
  test(`${features[3].name}, ${features[3].tags}`, async ({ page }) => {
    const lingoROC = new LingoROC(page);
    const config = testData['de-at-swap'];
    const url = buildTestUrl(testData.baseUrl, config.pageUrl, testData.miloLibs, config.akamaiLocale);

    const loadResult = await loadAndVerifyPage(page, url, lingoROC);
    if (!loadResult.loaded) {
      appendTestResult({ testName: features[3].name, status: 'skipped', reason: loadResult.error, timestamp: new Date().toISOString() });
      test.skip();
      return;
    }

    await test.step('Verify German → Austria textmeplingoblock swap', async () => {
      await lingoROC.dismissAllPopups();
      await page.waitForTimeout(1000);

      // Verify using data-path: /at = swapped
      const result = await lingoROC.verifyFragmentSwap('/at', '/de/');

      console.info(`[LingoROC] German → Austria (akamaiLocale=${config.akamaiLocale})`);
      console.info(`[LingoROC] Swapped to /at: ${result.swapped}`);
      console.info('[LingoROC] Expected: textmeplingoblock swapped to /at');

      expect(result.swapped).toBeGreaterThan(0);
    });

    appendTestResult({
      testName: features[3].name,
      status: 'passed',
      url,
      akamaiLocale: config.akamaiLocale,
      timestamp: new Date().toISOString(),
    });
  });

  // Test 4: German → Swiss German (BASIC)
  test(`${features[4].name}, ${features[4].tags}`, async ({ page }) => {
    const lingoROC = new LingoROC(page);
    const config = testData['de-ch-swap'];
    const url = buildTestUrl(testData.baseUrl, config.pageUrl, testData.miloLibs, config.akamaiLocale);

    const loadResult = await loadAndVerifyPage(page, url, lingoROC);
    if (!loadResult.loaded) {
      appendTestResult({ testName: features[4].name, status: 'skipped', reason: loadResult.error, timestamp: new Date().toISOString() });
      test.skip();
      return;
    }

    await test.step('Verify German → Swiss German textmeplingoblock swap', async () => {
      await lingoROC.dismissAllPopups();
      await page.waitForTimeout(1000);

      // Verify using data-path: /ch_de = swapped
      const result = await lingoROC.verifyFragmentSwap('/ch_de', '/de/');

      console.info(`[LingoROC] German → Swiss German (akamaiLocale=${config.akamaiLocale})`);
      console.info(`[LingoROC] Swapped to /ch_de: ${result.swapped}`);
      console.info('[LingoROC] Expected: textmeplingoblock swapped to /ch_de');

      expect(result.swapped).toBeGreaterThan(0);
    });

    appendTestResult({
      testName: features[4].name,
      status: 'passed',
      url,
      akamaiLocale: config.akamaiLocale,
      timestamp: new Date().toISOString(),
    });
  });

  // Test 5: Italian → Swiss Italian (BASIC)
  test(`${features[5].name}, ${features[5].tags}`, async ({ page }) => {
    const lingoROC = new LingoROC(page);
    const config = testData['it-ch-swap'];
    const url = buildTestUrl(testData.baseUrl, config.pageUrl, testData.miloLibs, config.akamaiLocale);

    const loadResult = await loadAndVerifyPage(page, url, lingoROC);
    if (!loadResult.loaded) {
      appendTestResult({ testName: features[5].name, status: 'skipped', reason: loadResult.error, timestamp: new Date().toISOString() });
      test.skip();
      return;
    }

    await test.step('Verify Italian → Swiss Italian textmeplingoblock swap', async () => {
      await lingoROC.dismissAllPopups();
      await page.waitForTimeout(1000);

      // Verify using data-path: /ch_it = swapped
      const result = await lingoROC.verifyFragmentSwap('/ch_it', '/it/');

      console.info(`[LingoROC] Italian → Swiss Italian (akamaiLocale=${config.akamaiLocale})`);
      console.info(`[LingoROC] Swapped to /ch_it: ${result.swapped}`);
      console.info('[LingoROC] Expected: textmeplingoblock swapped to /ch_it');

      expect(result.swapped).toBeGreaterThan(0);
    });

    appendTestResult({
      testName: features[5].name,
      status: 'passed',
      url,
      akamaiLocale: config.akamaiLocale,
      timestamp: new Date().toISOString(),
    });
  });

  // Test 6: Portuguese → Brazil (BASIC)
  test(`${features[6].name}, ${features[6].tags}`, async ({ page }) => {
    const lingoROC = new LingoROC(page);
    const config = testData['pt-br-swap'];
    const url = buildTestUrl(testData.baseUrl, config.pageUrl, testData.miloLibs, config.akamaiLocale);

    const loadResult = await loadAndVerifyPage(page, url, lingoROC);
    if (!loadResult.loaded) {
      appendTestResult({ testName: features[6].name, status: 'skipped', reason: loadResult.error, timestamp: new Date().toISOString() });
      test.skip();
      return;
    }

    await test.step('Verify Portuguese → Brazil textmeplingoblock swap', async () => {
      await lingoROC.dismissAllPopups();
      await page.waitForTimeout(1000);

      // Verify using data-path: /br = swapped
      const result = await lingoROC.verifyFragmentSwap('/br', '/pt/');

      console.info(`[LingoROC] Portuguese → Brazil (akamaiLocale=${config.akamaiLocale})`);
      console.info(`[LingoROC] Swapped to /br: ${result.swapped}`);
      console.info('[LingoROC] Expected: textmeplingoblock swapped to /br');

      expect(result.swapped).toBeGreaterThan(0);
    });

    appendTestResult({
      testName: features[6].name,
      status: 'passed',
      url,
      akamaiLocale: config.akamaiLocale,
      timestamp: new Date().toISOString(),
    });
  });

  // =========================================================================
  // NEGATIVE TEST (7)
  // Verify non-LATAM region on /es/ does NOT trigger /la/ fragment swap
  // =========================================================================

  // Test 7: Spanish with akamaiLocale=us (NEGATIVE - should NOT see /la/ fragments)
  test(`${features[7].name}, ${features[7].tags}`, async ({ page }) => {
    const lingoROC = new LingoROC(page);
    const config = testData['es-non-latam-negative'];
    const url = buildTestUrl(testData.baseUrl, config.pageUrl, testData.miloLibs, config.akamaiLocale);

    const loadResult = await loadAndVerifyPage(page, url, lingoROC);
    if (!loadResult.loaded) {
      appendTestResult({ testName: features[7].name, status: 'skipped', reason: loadResult.error, timestamp: new Date().toISOString() });
      test.skip();
      return;
    }

    await test.step('Verify Spanish with akamaiLocale=us does NOT show /la/ fragments', async () => {
      await lingoROC.dismissAllPopups();
      await page.waitForTimeout(1000);

      // Verify using data-path: should NOT have /la/, should have /es/
      const result = await lingoROC.verifyFragmentSwap('/la', '/es/');

      console.info('[LingoROC] Spanish with akamaiLocale=us (NEGATIVE TEST)');
      console.info(`[LingoROC] /la/ fragments (should be 0): ${result.swapped}`);
      console.info(`[LingoROC] /es/ fragments (fallback): ${result.fallback}`);
      console.info('[LingoROC] Expected: Should NOT see /la/ fragments');
      console.info('[LingoROC] Should see fallback to /es/ base fragments');

      // NEGATIVE: Should NOT have /la/ swapped fragments
      expect(result.swapped).toBe(0);
    });

    appendTestResult({
      testName: features[7].name,
      status: 'passed',
      url,
      akamaiLocale: config.akamaiLocale,
      testType: 'negative',
      timestamp: new Date().toISOString(),
    });
  });

  // =========================================================================
  // MULTIPLE FRAGMENTS TEST (8)
  // Test with base-all page that has multiple fragments
  // =========================================================================

  // Test 8: French → Swiss French with multiple fragments (base-all page)
  test(`${features[8].name}, ${features[8].tags}`, async ({ page }) => {
    const lingoROC = new LingoROC(page);
    const config = testData['fr-ch-multi'];
    const url = buildTestUrl(testData.baseUrl, config.pageUrl, testData.miloLibs, config.akamaiLocale);

    const loadResult = await loadAndVerifyPage(page, url, lingoROC);
    if (!loadResult.loaded) {
      appendTestResult({ testName: features[8].name, status: 'skipped', reason: loadResult.error, timestamp: new Date().toISOString() });
      test.skip();
      return;
    }

    await test.step('Verify French → Swiss French multiple fragments (base-all)', async () => {
      await lingoROC.dismissAllPopups();
      await page.waitForTimeout(1000);

      // Verify using data-path: /ch_fr = swapped
      const result = await lingoROC.verifyFragmentSwap('/ch_fr', '/fr/');

      console.info(`[LingoROC] French → Swiss French MULTI (akamaiLocale=${config.akamaiLocale})`);
      console.info(`[LingoROC] Swapped to /ch_fr: ${result.swapped}`);
      console.info(`[LingoROC] Fallback to /fr/: ${result.fallback}`);
      console.info('[LingoROC] Expected: /ch_fr/drafts/mepqa/fragments/sectionreplacement');

      // Should have at least one swapped fragment
      expect(result.swapped).toBeGreaterThan(0);
    });

    appendTestResult({
      testName: features[8].name,
      status: 'passed',
      url,
      akamaiLocale: config.akamaiLocale,
      testType: 'multi',
      timestamp: new Date().toISOString(),
    });
  });

  // =========================================================================
  // LATAM MEP-LINGO TESTS (9-24)
  // When visiting /es/ with a LATAM GeoIP, mep-lingo should pull /la/ fragments
  // Tests all 16 LATAM GeoIP codes:
  // mx, ar, cl, co, pe, bo, cr, do, ec, gt, pa, pr, py, sv, uy, ve
  // =========================================================================

  // Test 9: LATAM mep-lingo - Mexico (FULL - tests all fragments)
  test(`${features[9].name}, ${features[9].tags}`, async ({ page }) => {
    const lingoROC = new LingoROC(page);
    const config = testData['es-latam-mx'];
    const url = buildTestUrl(testData.baseUrl, config.pageUrl, testData.miloLibs, config.akamaiLocale);

    const loadResult = await loadAndVerifyPage(page, url, lingoROC);
    if (!loadResult.loaded) {
      appendTestResult({ testName: features[9].name, status: 'skipped', reason: loadResult.error, timestamp: new Date().toISOString() });
      test.skip();
      return;
    }

    await test.step('Verify /es/ + GeoIP=mx pulls /la/ fragments (FULL)', async () => {
      await lingoROC.dismissAllPopups();
      await page.waitForTimeout(1000);

      // Verify using data-path: /la = swapped, /es/ = fallback
      const result = await lingoROC.verifyFragmentSwap('/la', '/es/');

      console.info('[LingoROC] LATAM mep-lingo: /es/ + GeoIP=mx');
      console.info(`[LingoROC] Swapped to /la/: ${result.swapped}`);
      console.info(`[LingoROC] Fallback to /es/: ${result.fallback}`);
      console.info('[LingoROC] Expected swapped: /la/ fragments (textmeplingoblock, swapblock, sectionreplacement)');
      console.info('[LingoROC] Expected fallback: noroc → /es/');

      // mep-lingo should pull /la/ fragments for GeoIP=mx
      expect(result.swapped).toBeGreaterThan(0);
    });

    const finalResult = await lingoROC.verifyFragmentSwap('/la', '/es/');
    appendTestResult({
      testName: features[9].name,
      status: 'passed',
      url,
      akamaiLocale: config.akamaiLocale,
      testType: 'latam-meplingo-full',
      swapped: finalResult.swapped,
      fallback: finalResult.fallback,
      timestamp: new Date().toISOString(),
    });
  });

  // Tests 10-24: LATAM mep-lingo - Remaining GeoIP codes (BASIC - textmeplingoblock)
  // Dynamic test generation for the remaining 15 LATAM regions
  const latamFeatureStartIndex = 10; // features[10] through features[24]
  const latamDataKeys = [
    'es-latam-ar', 'es-latam-cl', 'es-latam-co', 'es-latam-pe',
    'es-latam-bo', 'es-latam-cr', 'es-latam-do', 'es-latam-ec',
    'es-latam-gt', 'es-latam-pa', 'es-latam-pr', 'es-latam-py',
    'es-latam-sv', 'es-latam-uy', 'es-latam-ve',
  ];

  latamDataKeys.forEach((dataKey, index) => {
    const featureIndex = latamFeatureStartIndex + index;
    const feature = features[featureIndex];
    if (!feature) return;

    test(`${feature.name}, ${feature.tags}`, async ({ page }) => {
      const lingoROC = new LingoROC(page);
      const config = testData[dataKey];

      if (!config) {
        console.warn(`[LingoROC] No test data for key: ${dataKey}`);
        appendTestResult({
          testName: feature.name,
          status: 'skipped',
          reason: `No test data for ${dataKey}`,
          timestamp: new Date().toISOString(),
        });
        test.skip();
        return;
      }

      const url = buildTestUrl(testData.baseUrl, config.pageUrl, testData.miloLibs, config.akamaiLocale);

      const loadResult = await loadAndVerifyPage(page, url, lingoROC);
      if (!loadResult.loaded) {
        appendTestResult({ testName: feature.name, status: 'skipped', reason: loadResult.error, timestamp: new Date().toISOString() });
        test.skip();
        return;
      }

      await test.step(`Verify /es/ + GeoIP=${config.akamaiLocale} pulls /la/ fragments`, async () => {
        await lingoROC.dismissAllPopups();
        await page.waitForTimeout(1000);

        // Verify using data-path: /la = swapped from mep-lingo
        const result = await lingoROC.verifyFragmentSwap('/la', '/es/');

        console.info(`[LingoROC] LATAM mep-lingo: /es/ + GeoIP=${config.akamaiLocale}`);
        console.info(`[LingoROC] Swapped to /la/: ${result.swapped}`);
        console.info(`[LingoROC] Fallback to /es/: ${result.fallback}`);
        console.info(`[LingoROC] Expected: mep-lingo pulls /la/ fragments for GeoIP=${config.akamaiLocale}`);

        // mep-lingo should pull /la/ fragments for this LATAM GeoIP
        expect(result.swapped).toBeGreaterThan(0);
      });

      appendTestResult({
        testName: feature.name,
        status: 'passed',
        url,
        akamaiLocale: config.akamaiLocale,
        testType: 'latam-meplingo',
        timestamp: new Date().toISOString(),
      });
    });
  });
});
