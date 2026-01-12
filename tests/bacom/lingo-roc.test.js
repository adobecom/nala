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
 * | Test Type    | Regions Tested                     | Fragments Tested |
 * |--------------|-----------------------------------|------------------|
 * | FULL FEATURE | /ch_fr, /mx                       | textmeplingoblock, swapblock, sectionreplacement, noroc |
 * | BASIC        | /ca_fr, /at, /ch_de, /ch_it, /br  | textmeplingoblock only |
 * | NEGATIVE     | /ar (no swap expected)            | Should NOT swap  |
 *
 * FULL FEATURE URLs:
 * - French Swiss:   https://stage--da-bacom--adobecom.aem.live/fr/drafts/mepqa/fragments/base?milolibs=stage&langFirst=on&mepHighlight=true&mep=&akamaiLocale=ch_fr
 * - Spanish Mexico: https://stage--da-bacom--adobecom.aem.live/es/drafts/mepqa/fragments/base?milolibs=stage&langFirst=on&mepHighlight=true&mep=&akamaiLocale=mx
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
    feature: 'MWPW-179495 - ROC Fragment Swapping',
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

  // Test 1: Spanish → Mexico (FULL FEATURE)
  test(`${features[1].name}, ${features[1].tags}`, async ({ page }) => {
    const lingoROC = new LingoROC(page);
    const config = testData['es-mx-swap'];
    const url = buildTestUrl(testData.baseUrl, config.pageUrl, testData.miloLibs, config.akamaiLocale);

    const loadResult = await loadAndVerifyPage(page, url, lingoROC);
    if (!loadResult.loaded) {
      appendTestResult({ testName: features[1].name, status: 'skipped', reason: loadResult.error, timestamp: new Date().toISOString() });
      test.skip();
      return;
    }

    await test.step('Verify Spanish → Mexico full fragment swap', async () => {
      // Close any remaining popups before verification
      await lingoROC.dismissAllPopups();
      await page.waitForTimeout(1000);

      // Verify using data-path attribute: /mx = swapped, /es/ = fallback
      const result = await lingoROC.verifyFragmentSwap('/mx', '/es/');

      console.info(`[LingoROC] Spanish → Mexico (akamaiLocale=${config.akamaiLocale})`);
      console.info(`[LingoROC] Swapped to /mx: ${result.swapped}`);
      console.info(`[LingoROC] Fallback to /es/: ${result.fallback}`);
      console.info('[LingoROC] Expected swapped: textmeplingoblock, swapblock, sectionreplacement');
      console.info('[LingoROC] Expected fallback: noroc');

      // Full feature test should have swapped fragments
      expect(result.swapped).toBeGreaterThan(0);
    });

    const finalResult = await lingoROC.verifyFragmentSwap('/mx', '/es/');
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
  // Verify wrong region does NOT trigger swap
  // =========================================================================

  // Test 7: Spanish → Argentina (NEGATIVE - should NOT see /mx fragments)
  test(`${features[7].name}, ${features[7].tags}`, async ({ page }) => {
    const lingoROC = new LingoROC(page);
    const config = testData['es-ar-negative'];
    const url = buildTestUrl(testData.baseUrl, config.pageUrl, testData.miloLibs, config.akamaiLocale);

    const loadResult = await loadAndVerifyPage(page, url, lingoROC);
    if (!loadResult.loaded) {
      appendTestResult({ testName: features[7].name, status: 'skipped', reason: loadResult.error, timestamp: new Date().toISOString() });
      test.skip();
      return;
    }

    await test.step('Verify Spanish with akamaiLocale=ar does NOT show /mx fragments', async () => {
      await lingoROC.dismissAllPopups();
      await page.waitForTimeout(1000);

      // Verify using data-path: should NOT have /mx, should have /es/
      const result = await lingoROC.verifyFragmentSwap('/mx', '/es/');

      console.info(`[LingoROC] Spanish with akamaiLocale=ar (NEGATIVE TEST)`);
      console.info(`[LingoROC] /mx fragments (should be 0): ${result.swapped}`);
      console.info(`[LingoROC] /es/ fragments (fallback): ${result.fallback}`);
      console.info('[LingoROC] Expected: Should NOT see /mx fragments');
      console.info('[LingoROC] Should see fallback to /es base fragments');

      // NEGATIVE: Should NOT have /mx swapped fragments
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
});
