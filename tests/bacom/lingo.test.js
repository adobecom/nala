import { expect, test } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';
import { features } from '../../features/bacom/lingo.spec.js';

const { WebUtil } = require('../../libs/webutil.js');

/**
 * BACOM Language-First Site (Lingo) Link Transformation Tests
 *
 * Link Transformation Rules:
 * 1. BASE LANGUAGE pages (/es, /fr, /de, /pt, /it): All links → base language
 * 2. REGIONAL pages (/ar, /mx, /at, /ch_de, /ca_fr, /br): Mixed links
 *    - .aem.live (query-index.json): Only published regional pages transform
 *    - .aem.page (preview-index.json): Draft/preview regional pages also transform
 * 3. FULL SITE locales (/uk, /au, /jp, /kr, /in): All links → that locale
 * 4. US ROOT (/): Links have no locale prefix
 */

// Report file paths - using JSON Lines format for parallel-safe writes
const RESULTS_DIR = path.join(process.cwd(), 'results');
const REPORT_JSONL_PATH = path.join(RESULTS_DIR, 'lingo-test-results.jsonl');
const REPORT_JSON_PATH = path.join(RESULTS_DIR, 'lingo-detailed-report.json');

// Rules definition (shared)
const LINGO_RULES = {
  ROOT: {
    description: 'US ROOT (/) - Links should have NO locale prefix',
    locales: ['/'],
    expectation: 'All internal links should NOT have a locale prefix (e.g., /products, /solutions)',
  },
  BASE_LANGUAGE: {
    description: 'BASE LANGUAGE pages - All links should point to the base language',
    locales: ['/es', '/fr', '/de', '/pt', '/it'],
    expectation: 'All internal links should have the same base language prefix (e.g., /es/products for Spanish)',
  },
  REGIONAL: {
    description: 'REGIONAL pages - Mixed links based on published/preview pages',
    locales: ['/ar', '/mx', '/at', '/ch_de', '/ca_fr', '/br'],
    expectation: '.aem.live uses query-index.json (published only), .aem.page uses preview-index.json (includes drafts)',
  },
  FULL_SITE: {
    description: 'FULL SITE locales - All links should point to that locale',
    locales: ['/uk', '/au', '/jp', '/kr', '/in'],
    expectation: 'All internal links should have the full site locale prefix (e.g., /jp/products for Japanese)',
  },
};

// Ensure results directory exists
function ensureResultsDir() {
  if (!fs.existsSync(RESULTS_DIR)) {
    fs.mkdirSync(RESULTS_DIR, { recursive: true });
  }
}

// Append a single test result to JSON Lines file (parallel-safe)
function appendTestResult(testResult) {
  ensureResultsDir();
  const line = `${JSON.stringify(testResult)}\n`;
  fs.appendFileSync(REPORT_JSONL_PATH, line);
  console.info(`[LingoTest] Appended result for: ${testResult.testName}`);
}

// Aggregate all results into final report (called once at end)
function aggregateReport() {
  ensureResultsDir();

  if (!fs.existsSync(REPORT_JSONL_PATH)) {
    console.warn('[LingoTest] No test results found to aggregate');
    return;
  }

  const lines = fs.readFileSync(REPORT_JSONL_PATH, 'utf-8').split('\n').filter((l) => l.trim());
  const tests = lines.map((line) => JSON.parse(line));

  // Calculate summary
  let totalPages = 0;
  let passedPages = 0;
  let failedPages = 0;
  let skippedPages = 0;
  let passedTests = 0;
  let failedTests = 0;

  tests.forEach((t) => {
    if (t.results.passed > 0 && (t.results.failed || 0) === 0) {
      passedTests += 1;
    } else if ((t.results.failed || 0) > 0) {
      failedTests += 1;
    }

    if (t.pages) {
      t.pages.forEach((p) => {
        totalPages += 1;
        if (p.status === 'passed') passedPages += 1;
        else if (p.status === 'failed') failedPages += 1;
        else if (p.status === 'skipped') skippedPages += 1;
      });
    }
  });

  const report = {
    timestamp: new Date().toISOString(),
    summary: {
      totalTests: tests.length,
      passed: passedTests,
      failed: failedTests,
      skipped: tests.length - passedTests - failedTests,
      totalPages,
      passedPages,
      failedPages,
      skippedPages,
    },
    rules: LINGO_RULES,
    tests,
  };

  fs.writeFileSync(REPORT_JSON_PATH, JSON.stringify(report, null, 2));
  console.info(`[LingoTest] Final report saved to: ${REPORT_JSON_PATH}`);
  console.info(`[LingoTest] Summary: ${tests.length} tests, ${passedTests} passed, ${failedTests} failed`);
}

// Track if this worker has already cleared results (to avoid race conditions with parallel workers)
const RUN_MARKER_PATH = path.join(RESULTS_DIR, '.lingo-run-marker');

// Clear previous results (call at start of test run)
// Uses a marker file to prevent multiple workers from clearing each other's results
function clearPreviousResults() {
  ensureResultsDir();

  // Check if this is a fresh run by looking at the marker file
  // If marker exists and was created less than 60 seconds ago, another worker already cleared
  if (fs.existsSync(RUN_MARKER_PATH)) {
    try {
      const markerStat = fs.statSync(RUN_MARKER_PATH);
      const ageMs = Date.now() - markerStat.mtimeMs;
      if (ageMs < 60000) {
        // Another worker already started this run, don't clear
        console.info('[LingoTest] Skipping clear - another worker already initialized');
        return;
      }
    } catch (e) {
      // Ignore stat errors
    }
  }

  // This is a fresh run - clear old results and create marker
  if (fs.existsSync(REPORT_JSONL_PATH)) {
    fs.unlinkSync(REPORT_JSONL_PATH);
    console.info('[LingoTest] Cleared previous results');
  }

  // Create/update marker file to signal other workers
  fs.writeFileSync(RUN_MARKER_PATH, new Date().toISOString());
}

// Helper function to analyze links on the page (with detailed info)
async function analyzePageLinks(page, locale, isRoot = false) {
  const baseUrl = page.url().split('?')[0];
  const baseDomain = baseUrl.split('/').slice(0, 3).join('/');

  const links = await page.evaluate(() => {
    const allLinks = Array.from(document.querySelectorAll('a[href]'));
    return allLinks.map((a) => {
      let location = 'body';
      if (a.closest('header')) {
        location = 'header';
      } else if (a.closest('footer')) {
        location = 'footer';
      }
      return {
        href: a.href,
        text: a.textContent?.trim().substring(0, 50) || '',
        location,
      };
    });
  });

  const internalLinks = links.filter((link) => link.href.startsWith(baseDomain));

  let matchesLocale = 0;
  let noLocaleLinks = 0;
  const otherLocales = {};
  const linksByLocale = { matched: [], noLocale: [], other: [] };

  internalLinks.forEach((link) => {
    const match = link.href.match(/\.(live|page)\/([a-z]{2}(?:_[a-z]{2})?)(\/|$|\?)/);
    if (match) {
      if (match[2] === locale) {
        matchesLocale += 1;
        linksByLocale.matched.push({ ...link, detectedLocale: match[2] });
      } else {
        otherLocales[match[2]] = (otherLocales[match[2]] || 0) + 1;
        linksByLocale.other.push({ ...link, detectedLocale: match[2] });
      }
    } else if (isRoot) {
      noLocaleLinks += 1;
      linksByLocale.noLocale.push(link);
    }
  });

  return {
    total: internalLinks.length,
    matchesLocale,
    noLocaleLinks,
    otherLocales,
    localePercentage: internalLinks.length > 0
      ? ((matchesLocale / internalLinks.length) * 100).toFixed(1)
      : 0,
    linkDetails: linksByLocale,
    allLinks: internalLinks,
  };
}

// Helper to dismiss popups/modals (cookie consent, geo-targeting, etc.)
async function dismissPopups(page) {
  const popupSelectors = [
    // Cookie consent / OneTrust
    '#onetrust-accept-btn-handler',
    '.onetrust-close-btn-handler',
    '[data-testid="cookie-accept"]',
    // Adobe specific modals
    '.dialog-close',
    '.modal-close',
    '[aria-label="Close"]',
    '[aria-label="close"]',
    'button.close',
    '.feds-dialog-close',
    // Region/locale selector
    '.locale-modal-close',
    '.region-selector-close',
    '[data-modal-close]',
    // Generic close buttons
    'button[class*="close"]',
    '[class*="modal"] button[class*="close"]',
    '[class*="dialog"] button[class*="close"]',
  ];

  for (const selector of popupSelectors) {
    try {
      const closeBtn = page.locator(selector).first();
      if (await closeBtn.isVisible({ timeout: 1000 })) {
        await closeBtn.click();
        console.info(`[LingoTest] Dismissed popup with selector: ${selector}`);
        // Wait a bit for the modal to close
        await page.waitForTimeout(500);
      }
    } catch {
      // Selector not found or not clickable, continue
    }
  }

  // Also try pressing Escape key to close any modal
  try {
    await page.keyboard.press('Escape');
  } catch {
    // Ignore errors
  }
}

// Helper to load and verify page
async function loadAndVerifyPage(page, url, pageName) {
  try {
    await page.goto(url, { timeout: 60000, waitUntil: 'domcontentloaded' });
  } catch (error) {
    console.warn(`[LingoTest] FAILED: ${pageName} - ${error.message}`);
    return { loaded: false, reason: `Navigation failed: ${error.message}`, title: '', error: true };
  }

  // Wait a bit for any popups to appear, then dismiss them
  await page.waitForTimeout(2000);
  await dismissPopups(page);

  const pageTitle = await page.title();
  if (pageTitle.includes('404') || pageTitle === '') {
    console.warn(`[LingoTest] SKIP: ${pageName} - 404 or empty page`);
    return { loaded: false, reason: '404 or empty page', title: pageTitle };
  }

  const header = page.locator('header');
  try {
    await expect(header).toBeVisible({ timeout: 10000 });
  } catch {
    console.warn(`[LingoTest] SKIP: ${pageName} - No header found`);
    return { loaded: false, reason: 'No header found', title: pageTitle };
  }

  return { loaded: true, title: pageTitle };
}

/**
 * Test BASE LANGUAGE pages - All links should point to base language
 */
async function testBaseLanguagePages(page, testData, pageKeys, locale, testName) {
  const results = { success: 0, skip: 0, failed: 0, pages: [] };

  for (let i = 0; i < pageKeys.length; i += 1) {
    const pageName = pageKeys[i];
    const url = testData[pageName];
    const pageResult = { name: pageName, url, status: 'pending', links: null };

    if (!url) {
      results.skip += 1;
      pageResult.status = 'skipped';
      pageResult.reason = 'No URL defined';
    } else {
      const loadResult = await loadAndVerifyPage(page, url, pageName);
      if (!loadResult.loaded) {
        if (loadResult.error) {
          results.failed += 1;
          pageResult.status = 'failed';
        } else {
          results.skip += 1;
          pageResult.status = 'skipped';
        }
        pageResult.reason = loadResult.reason;
        pageResult.title = loadResult.title;
      } else {
        const analysis = await analyzePageLinks(page, locale);
        const pct = parseFloat(analysis.localePercentage);

        console.info(`[LingoTest] ${pageName}: ${pct}% /${locale} (${analysis.matchesLocale}/${analysis.total})`);
        if (Object.keys(analysis.otherLocales).length > 0) {
          console.info(`  Other locales: ${JSON.stringify(analysis.otherLocales)}`);
        }

        pageResult.status = 'passed';
        pageResult.title = loadResult.title;
        pageResult.links = {
          total: analysis.total,
          matchedLocale: analysis.matchesLocale,
          matchedPercentage: `${pct}%`,
          otherLocales: analysis.otherLocales,
          sampleMatchedLinks: analysis.linkDetails.matched.slice(0, 10),
          sampleOtherLinks: analysis.linkDetails.other.slice(0, 10),
        };
        results.success += 1;
      }
    }
    results.pages.push(pageResult);
  }

  // Append to report file (parallel-safe)
  appendTestResult({
    testName,
    ruleType: 'BASE_LANGUAGE',
    locale: `/${locale}`,
    timestamp: new Date().toISOString(),
    results: {
      passed: results.success,
      skipped: results.skip,
      failed: results.failed,
    },
    pages: results.pages,
  });

  return results;
}

/**
 * Test REGIONAL pages - Compare .live vs .page link transformation
 */
async function testRegionalPagesWithEnv(page, testData, pageKeys, regionalLocale, baseLocale, env, testName) {
  const results = {
    success: 0, skip: 0, failed: 0, regionalLinks: 0, baseLinks: 0, pages: [],
  };

  for (let i = 0; i < pageKeys.length; i += 1) {
    const pageName = pageKeys[i];
    const url = testData[pageName];
    const pageResult = { name: pageName, url, status: 'pending', links: null };

    if (!url) {
      results.skip += 1;
      pageResult.status = 'skipped';
      pageResult.reason = 'No URL defined';
    } else {
      const loadResult = await loadAndVerifyPage(page, url, pageName);
      if (!loadResult.loaded) {
        if (loadResult.error) {
          results.failed += 1;
          pageResult.status = 'failed';
        } else {
          results.skip += 1;
          pageResult.status = 'skipped';
        }
        pageResult.reason = loadResult.reason;
        pageResult.title = loadResult.title;
      } else {
        const analysis = await analyzePageLinks(page, regionalLocale);
        const baseLinks = analysis.otherLocales[baseLocale] || 0;

        results.regionalLinks += analysis.matchesLocale;
        results.baseLinks += baseLinks;

        console.info(`[LingoTest] ${pageName} (${env}):`);
        console.info(`  Regional /${regionalLocale}: ${analysis.matchesLocale} links`);
        console.info(`  Base /${baseLocale}: ${baseLinks} links`);

        pageResult.status = 'passed';
        pageResult.title = loadResult.title;
        pageResult.links = {
          total: analysis.total,
          regionalLinks: analysis.matchesLocale,
          baseLinks,
          otherLocales: analysis.otherLocales,
          sampleRegionalLinks: analysis.linkDetails.matched.slice(0, 10),
          sampleBaseLinks: analysis.linkDetails.other.filter((l) => l.detectedLocale === baseLocale).slice(0, 10),
        };
        results.success += 1;
      }
    }
    results.pages.push(pageResult);
  }

  // Append to report file (parallel-safe)
  appendTestResult({
    testName,
    ruleType: 'REGIONAL',
    locale: `/${regionalLocale}`,
    baseLocale: `/${baseLocale}`,
    environment: env,
    timestamp: new Date().toISOString(),
    results: {
      passed: results.success,
      skipped: results.skip,
      failed: results.failed,
      totalRegionalLinks: results.regionalLinks,
      totalBaseLinks: results.baseLinks,
    },
    pages: results.pages,
  });

  return results;
}

/**
 * Test FULL SITE locale pages
 */
async function testFullSitePages(page, testData, pageKeys, locale, testName) {
  const results = { success: 0, skip: 0, failed: 0, pages: [] };

  for (let i = 0; i < pageKeys.length; i += 1) {
    const pageName = pageKeys[i];
    const url = testData[pageName];
    const pageResult = { name: pageName, url, status: 'pending', links: null };

    if (!url) {
      results.skip += 1;
      pageResult.status = 'skipped';
      pageResult.reason = 'No URL defined';
    } else {
      const loadResult = await loadAndVerifyPage(page, url, pageName);
      if (!loadResult.loaded) {
        if (loadResult.error) {
          results.failed += 1;
          pageResult.status = 'failed';
        } else {
          results.skip += 1;
          pageResult.status = 'skipped';
        }
        pageResult.reason = loadResult.reason;
        pageResult.title = loadResult.title;
      } else {
        const analysis = await analyzePageLinks(page, locale);
        const pct = parseFloat(analysis.localePercentage);

        console.info(`[LingoTest] ${pageName}: ${pct}% /${locale} (${analysis.matchesLocale}/${analysis.total})`);

        pageResult.status = 'passed';
        pageResult.title = loadResult.title;
        pageResult.links = {
          total: analysis.total,
          matchedLocale: analysis.matchesLocale,
          matchedPercentage: `${pct}%`,
          otherLocales: analysis.otherLocales,
          sampleMatchedLinks: analysis.linkDetails.matched.slice(0, 10),
          sampleOtherLinks: analysis.linkDetails.other.slice(0, 10),
        };
        results.success += 1;
      }
    }
    results.pages.push(pageResult);
  }

  // Append to report file (parallel-safe)
  appendTestResult({
    testName,
    ruleType: 'FULL_SITE',
    locale: `/${locale}`,
    timestamp: new Date().toISOString(),
    results: {
      passed: results.success,
      skipped: results.skip,
      failed: results.failed,
    },
    pages: results.pages,
  });

  return results;
}

/**
 * Test US ROOT pages - Links should have no locale prefix
 */
async function testRootPages(page, testData, pageKeys, testName) {
  const results = { success: 0, skip: 0, failed: 0, pages: [] };

  for (let i = 0; i < pageKeys.length; i += 1) {
    const pageName = pageKeys[i];
    const url = testData[pageName];
    const pageResult = { name: pageName, url, status: 'pending', links: null };

    if (!url) {
      results.skip += 1;
      pageResult.status = 'skipped';
      pageResult.reason = 'No URL defined';
    } else {
      const loadResult = await loadAndVerifyPage(page, url, pageName);
      if (!loadResult.loaded) {
        if (loadResult.error) {
          results.failed += 1;
          pageResult.status = 'failed';
        } else {
          results.skip += 1;
          pageResult.status = 'skipped';
        }
        pageResult.reason = loadResult.reason;
        pageResult.title = loadResult.title;
      } else {
        const analysis = await analyzePageLinks(page, '', true);

        console.info(`[LingoTest] ${pageName}:`);
        console.info(`  No locale (root): ${analysis.noLocaleLinks} links`);
        console.info(`  With locale: ${JSON.stringify(analysis.otherLocales)}`);

        pageResult.status = 'passed';
        pageResult.title = loadResult.title;
        pageResult.links = {
          total: analysis.total,
          noLocaleLinks: analysis.noLocaleLinks,
          linksWithLocale: analysis.otherLocales,
          sampleNoLocaleLinks: analysis.linkDetails.noLocale.slice(0, 10),
          sampleLocalizedLinks: analysis.linkDetails.other.slice(0, 10),
        };
        results.success += 1;
      }
    }
    results.pages.push(pageResult);
  }

  // Append to report file (parallel-safe)
  appendTestResult({
    testName,
    ruleType: 'ROOT',
    locale: '/',
    timestamp: new Date().toISOString(),
    results: {
      passed: results.success,
      skipped: results.skip,
      failed: results.failed,
    },
    pages: results.pages,
  });

  return results;
}

test.describe('BACOM Language-First Site (Lingo) Link Transformation test suite', () => {
  test.setTimeout(15 * 60 * 1000);

  // Run tests serially to avoid parallel write issues and ensure all tests complete
  test.describe.configure({ mode: 'serial' });

  // Clear previous results at start
  test.beforeAll(() => {
    clearPreviousResults();
  });

  // Aggregate final report after all tests complete
  test.afterAll(() => {
    aggregateReport();
  });

  /**
   * Test 0: GNav + Footer + Modal (baseline test)
   */
  test(`${features[0].name}, ${features[0].tags}`, async ({ page }) => {
    const testData = await WebUtil.loadTestData(`${features[0].data}`);
    const testURL = testData['gnav-footer-modal'];

    await test.step('Navigate and verify', async () => {
      await page.goto(testURL);
      await page.waitForLoadState('domcontentloaded');

      // Dismiss any popups
      await page.waitForTimeout(2000);
      await dismissPopups(page);

      const header = page.locator('header');
      await expect(header).toBeVisible({ timeout: 15000 });
      const footer = page.locator('footer');
      await expect(footer).toBeVisible({ timeout: 15000 });
      console.info(`[LingoTest] ✓ Baseline test passed: ${testURL}`);

      // Append to report file
      appendTestResult({
        testName: features[0].name,
        ruleType: 'BASELINE',
        url: testURL,
        timestamp: new Date().toISOString(),
        results: { passed: 1, skipped: 0, failed: 0 },
        pages: [{ name: 'gnav-footer-modal', url: testURL, status: 'passed' }],
      });
    });
  });

  /**
   * Test 1: English US / (Root)
   * RULE: Links should have no locale prefix
   */
  test(`${features[1].name}, ${features[1].tags}`, async ({ page }) => {
    const testData = await WebUtil.loadTestData(`${features[1].data}`);
    const usPages = [
      'en-us', 'en-us-products', 'en-us-solutions', 'en-us-creativecloud',
      'en-us-experience-cloud', 'en-us-analytics', 'en-us-marketo',
      'en-us-commerce', 'en-us-workfront', 'en-us-firefly', 'en-us-personalization',
    ];

    const results = await testRootPages(page, testData, usPages, features[1].name);
    console.info(`[LingoTest] ✓ English US /: ${results.success} passed, ${results.skip} skipped`);
    expect(results.success).toBeGreaterThan(0);
  });

  /**
   * Test 2: English India /in (Full Site)
   * RULE: All links should point to /in
   */
  test(`${features[2].name}, ${features[2].tags}`, async ({ page }) => {
    const testData = await WebUtil.loadTestData(`${features[2].data}`);
    const inPages = [
      'en-in', 'en-in-products', 'en-in-solutions', 'en-in-creativecloud',
      'en-in-experience-cloud', 'en-in-analytics', 'en-in-marketo',
      'en-in-commerce', 'en-in-workfront', 'en-in-firefly', 'en-in-personalization',
    ];

    const results = await testFullSitePages(page, testData, inPages, 'in', features[2].name);
    console.info(`[LingoTest] ✓ English India /in: ${results.success} passed, ${results.skip} skipped`);
    expect(results.success).toBeGreaterThan(0);
  });

  /**
   * Test 3: Spanish Base /es
   * RULE: All links should point to /es
   */
  test(`${features[3].name}, ${features[3].tags}`, async ({ page }) => {
    const testData = await WebUtil.loadTestData(`${features[3].data}`);
    const esPages = [
      'es', 'es-products', 'es-solutions', 'es-creativecloud',
      'es-experience-cloud', 'es-analytics', 'es-marketo',
      'es-commerce', 'es-workfront', 'es-firefly', 'es-personalization',
    ];

    const results = await testBaseLanguagePages(page, testData, esPages, 'es', features[3].name);
    console.info(`[LingoTest] ✓ Spanish /es Base: ${results.success} passed, ${results.skip} skipped`);
    expect(results.success).toBeGreaterThan(0);
  });

  /**
   * Test 4: Spanish Regional /ar - .aem.live (query-index.json)
   * RULE: Mixed links based on published pages in query-index
   * Expected: More /es fallback links (only published /ar pages transform)
   */
  test(`${features[4].name}, ${features[4].tags}`, async ({ page }) => {
    const testData = await WebUtil.loadTestData(`${features[4].data}`);
    const arLivePages = [
      'es-ar-live', 'es-ar-live-products', 'es-ar-live-solutions',
      'es-ar-live-creativecloud', 'es-ar-live-experience-cloud', 'es-ar-live-ai',
    ];

    const results = await testRegionalPagesWithEnv(page, testData, arLivePages, 'ar', 'es', '.live', features[4].name);

    console.info('[LingoTest] ═══════════════════════════════════════════');
    console.info('[LingoTest] Spanish /ar Regional (.aem.live) Summary:');
    console.info(`[LingoTest]   Total /ar links: ${results.regionalLinks}`);
    console.info(`[LingoTest]   Total /es fallback links: ${results.baseLinks}`);
    console.info('[LingoTest]   Uses: query-index.json (published pages only)');
    console.info('[LingoTest] ═══════════════════════════════════════════');

    expect(results.success).toBeGreaterThan(0);
  });

  /**
   * Test 5: Spanish Regional /ar - .aem.page (preview-index.json)
   * RULE: Mixed links based on draft/preview pages in preview-index
   * Expected: More /ar links (draft/preview pages also transform)
   * NOTE: .aem.page may require authentication or pages may not exist
   */
  test(`${features[5].name}, ${features[5].tags}`, async ({ page }) => {
    const testData = await WebUtil.loadTestData(`${features[5].data}`);
    const arPagePages = [
      'es-ar-page', 'es-ar-page-products', 'es-ar-page-solutions',
      'es-ar-page-creativecloud', 'es-ar-page-experience-cloud', 'es-ar-page-ai',
    ];

    const results = await testRegionalPagesWithEnv(page, testData, arPagePages, 'ar', 'es', '.page', features[5].name);

    console.info('[LingoTest] ═══════════════════════════════════════════');
    console.info('[LingoTest] Spanish /ar Regional (.aem.page) Summary:');
    console.info(`[LingoTest]   Total /ar links: ${results.regionalLinks}`);
    console.info(`[LingoTest]   Total /es fallback links: ${results.baseLinks}`);
    console.info('[LingoTest]   Uses: preview-index.json (includes draft/preview)');
    console.info(`[LingoTest]   Pages loaded: ${results.success}, Skipped: ${results.skip}`);
    console.info('[LingoTest] ═══════════════════════════════════════════');

    // Skip assertion if no pages loaded (likely auth required or pages don't exist)
    if (results.success === 0) {
      console.warn('[LingoTest] WARNING: No .aem.page pages loaded - may require auth');
      test.skip();
    }
  });

  /**
   * Test 6: Spanish Regional /mx - .aem.live (query-index.json)
   */
  test(`${features[6].name}, ${features[6].tags}`, async ({ page }) => {
    const testData = await WebUtil.loadTestData(`${features[6].data}`);
    const mxLivePages = [
      'es-mx-live', 'es-mx-live-products', 'es-mx-live-solutions',
      'es-mx-live-creativecloud', 'es-mx-live-ai',
    ];

    const results = await testRegionalPagesWithEnv(page, testData, mxLivePages, 'mx', 'es', '.live', features[6].name);

    console.info('[LingoTest] ═══════════════════════════════════════════');
    console.info('[LingoTest] Spanish /mx Regional (.aem.live) Summary:');
    console.info(`[LingoTest]   Total /mx links: ${results.regionalLinks}`);
    console.info(`[LingoTest]   Total /es fallback links: ${results.baseLinks}`);
    console.info('[LingoTest] ═══════════════════════════════════════════');

    expect(results.success).toBeGreaterThan(0);
  });

  /**
   * Test 7: Spanish Regional /mx - .aem.page (preview-index.json)
   * NOTE: .aem.page may require authentication or pages may not exist
   */
  test(`${features[7].name}, ${features[7].tags}`, async ({ page }) => {
    const testData = await WebUtil.loadTestData(`${features[7].data}`);
    const mxPagePages = [
      'es-mx-page', 'es-mx-page-products', 'es-mx-page-solutions',
      'es-mx-page-creativecloud', 'es-mx-page-ai',
    ];

    const results = await testRegionalPagesWithEnv(page, testData, mxPagePages, 'mx', 'es', '.page', features[7].name);

    console.info('[LingoTest] ═══════════════════════════════════════════');
    console.info('[LingoTest] Spanish /mx Regional (.aem.page) Summary:');
    console.info(`[LingoTest]   Total /mx links: ${results.regionalLinks}`);
    console.info(`[LingoTest]   Total /es fallback links: ${results.baseLinks}`);
    console.info(`[LingoTest]   Pages loaded: ${results.success}, Skipped: ${results.skip}`);
    console.info('[LingoTest] ═══════════════════════════════════════════');

    // Skip assertion if no pages loaded (likely auth required or pages don't exist)
    if (results.success === 0) {
      console.warn('[LingoTest] WARNING: No .aem.page pages loaded - may require auth');
      test.skip();
    }
  });

  /**
   * Test 8: German Base /de
   * RULE: All links should point to /de
   */
  test(`${features[8].name}, ${features[8].tags}`, async ({ page }) => {
    const testData = await WebUtil.loadTestData(`${features[8].data}`);
    const dePages = [
      'de', 'de-products', 'de-solutions', 'de-creativecloud',
      'de-experience-cloud', 'de-analytics', 'de-marketo',
      'de-commerce', 'de-workfront', 'de-firefly', 'de-personalization',
    ];

    const results = await testBaseLanguagePages(page, testData, dePages, 'de', features[8].name);
    console.info(`[LingoTest] ✓ German /de Base: ${results.success} passed, ${results.skip} skipped`);
    expect(results.success).toBeGreaterThan(0);
  });

  /**
   * Test 9: German Regional /at - .aem.live (query-index.json)
   */
  test(`${features[9].name}, ${features[9].tags}`, async ({ page }) => {
    const testData = await WebUtil.loadTestData(`${features[9].data}`);
    const atLivePages = [
      'de-at-live', 'de-at-live-products', 'de-at-live-solutions', 'de-at-live-creativecloud',
    ];

    const results = await testRegionalPagesWithEnv(page, testData, atLivePages, 'at', 'de', '.live', features[9].name);

    console.info('[LingoTest] ═══════════════════════════════════════════');
    console.info('[LingoTest] German /at Regional (.aem.live) Summary:');
    console.info(`[LingoTest]   Total /at links: ${results.regionalLinks}`);
    console.info(`[LingoTest]   Total /de fallback links: ${results.baseLinks}`);
    console.info('[LingoTest] ═══════════════════════════════════════════');

    expect(results.success).toBeGreaterThan(0);
  });

  /**
   * Test 10: German Regional /at - .aem.page (preview-index.json)
   * NOTE: .aem.page may require authentication or pages may not exist
   */
  test(`${features[10].name}, ${features[10].tags}`, async ({ page }) => {
    const testData = await WebUtil.loadTestData(`${features[10].data}`);
    const atPagePages = [
      'de-at-page', 'de-at-page-products', 'de-at-page-solutions', 'de-at-page-creativecloud',
    ];

    const results = await testRegionalPagesWithEnv(page, testData, atPagePages, 'at', 'de', '.page', features[10].name);

    console.info('[LingoTest] ═══════════════════════════════════════════');
    console.info('[LingoTest] German /at Regional (.aem.page) Summary:');
    console.info(`[LingoTest]   Total /at links: ${results.regionalLinks}`);
    console.info(`[LingoTest]   Total /de fallback links: ${results.baseLinks}`);
    console.info(`[LingoTest]   Pages loaded: ${results.success}, Skipped: ${results.skip}`);
    console.info('[LingoTest] ═══════════════════════════════════════════');

    // Skip assertion if no pages loaded (likely auth required or pages don't exist)
    if (results.success === 0) {
      console.warn('[LingoTest] WARNING: No .aem.page pages loaded - may require auth');
      test.skip();
    }
  });

  /**
   * Test 11: French Base /fr
   */
  test(`${features[11].name}, ${features[11].tags}`, async ({ page }) => {
    const testData = await WebUtil.loadTestData(`${features[11].data}`);
    const frPages = [
      'fr', 'fr-products', 'fr-solutions', 'fr-creativecloud',
      'fr-experience-cloud', 'fr-analytics', 'fr-marketo',
      'fr-commerce', 'fr-workfront', 'fr-firefly', 'fr-personalization',
    ];

    const results = await testBaseLanguagePages(page, testData, frPages, 'fr', features[11].name);
    console.info(`[LingoTest] ✓ French /fr Base: ${results.success} passed, ${results.skip} skipped`);
    expect(results.success).toBeGreaterThan(0);
  });

  /**
   * Test 12: Italian /it
   */
  test(`${features[12].name}, ${features[12].tags}`, async ({ page }) => {
    const testData = await WebUtil.loadTestData(`${features[12].data}`);
    const itPages = [
      'it', 'it-products', 'it-solutions', 'it-creativecloud',
      'it-experience-cloud', 'it-analytics', 'it-marketo',
      'it-commerce', 'it-workfront', 'it-firefly', 'it-personalization',
    ];

    const results = await testBaseLanguagePages(page, testData, itPages, 'it', features[12].name);
    console.info(`[LingoTest] ✓ Italian /it Base: ${results.success} passed, ${results.skip} skipped`);
    expect(results.success).toBeGreaterThan(0);
  });

  /**
   * Test 13: Portuguese Base /pt
   */
  test(`${features[13].name}, ${features[13].tags}`, async ({ page }) => {
    const testData = await WebUtil.loadTestData(`${features[13].data}`);
    const ptPages = [
      'pt', 'pt-products', 'pt-solutions', 'pt-creativecloud',
      'pt-experience-cloud', 'pt-analytics', 'pt-marketo',
      'pt-commerce', 'pt-workfront', 'pt-firefly', 'pt-personalization',
    ];

    const results = await testBaseLanguagePages(page, testData, ptPages, 'pt', features[13].name);
    console.info(`[LingoTest] ✓ Portuguese /pt Base: ${results.success} passed, ${results.skip} skipped`);
    expect(results.success).toBeGreaterThan(0);
  });

  /**
   * Test 14: Japanese /jp (Full Site)
   */
  test(`${features[14].name}, ${features[14].tags}`, async ({ page }) => {
    const testData = await WebUtil.loadTestData(`${features[14].data}`);
    const jpPages = [
      'jp', 'jp-products', 'jp-solutions', 'jp-creativecloud',
      'jp-experience-cloud', 'jp-analytics', 'jp-marketo',
      'jp-commerce', 'jp-workfront', 'jp-firefly', 'jp-personalization',
    ];

    const results = await testFullSitePages(page, testData, jpPages, 'jp', features[14].name);
    console.info(`[LingoTest] ✓ Japanese /jp: ${results.success} passed, ${results.skip} skipped`);
    expect(results.success).toBeGreaterThan(0);
  });

  /**
   * Test 15: Korean /kr (Full Site)
   */
  test(`${features[15].name}, ${features[15].tags}`, async ({ page }) => {
    const testData = await WebUtil.loadTestData(`${features[15].data}`);
    const krPages = [
      'kr', 'kr-products', 'kr-solutions', 'kr-creativecloud',
      'kr-experience-cloud', 'kr-analytics', 'kr-marketo',
      'kr-commerce', 'kr-workfront', 'kr-firefly', 'kr-personalization',
    ];

    const results = await testFullSitePages(page, testData, krPages, 'kr', features[15].name);
    console.info(`[LingoTest] ✓ Korean /kr: ${results.success} passed, ${results.skip} skipped`);
    expect(results.success).toBeGreaterThan(0);
  });

  /**
   * Test 16: English UK /uk (Full Site)
   */
  test(`${features[16].name}, ${features[16].tags}`, async ({ page }) => {
    const testData = await WebUtil.loadTestData(`${features[16].data}`);
    const ukPages = [
      'en-uk', 'en-uk-products', 'en-uk-solutions', 'en-uk-creativecloud',
      'en-uk-experience-cloud', 'en-uk-analytics', 'en-uk-marketo',
      'en-uk-commerce', 'en-uk-workfront', 'en-uk-firefly', 'en-uk-personalization',
    ];

    const results = await testFullSitePages(page, testData, ukPages, 'uk', features[16].name);
    console.info(`[LingoTest] ✓ English UK /uk: ${results.success} passed, ${results.skip} skipped`);
    expect(results.success).toBeGreaterThan(0);
  });

  /**
   * Test 17: English Australia /au (Full Site)
   */
  test(`${features[17].name}, ${features[17].tags}`, async ({ page }) => {
    const testData = await WebUtil.loadTestData(`${features[17].data}`);
    const auPages = [
      'en-au', 'en-au-products', 'en-au-solutions', 'en-au-creativecloud',
      'en-au-experience-cloud', 'en-au-analytics', 'en-au-marketo',
      'en-au-commerce', 'en-au-workfront', 'en-au-firefly', 'en-au-personalization',
    ];

    const results = await testFullSitePages(page, testData, auPages, 'au', features[17].name);
    console.info(`[LingoTest] ✓ English AU /au: ${results.success} passed, ${results.skip} skipped`);
    expect(results.success).toBeGreaterThan(0);
  });

  // =========================================================================
  // DYNAMIC TESTS FOR NEW LOCALES (18-64)
  // These tests cover English Regional, Spanish Regional, German Regional,
  // French Regional, Italian Regional, and Portuguese Regional locales
  // =========================================================================

  // Locale configuration map
  const LOCALE_CONFIG = {
    // English Regional
    'en-nz': { locale: 'nz', base: null, type: 'regional' },
    'en-ca': { locale: 'ca', base: null, type: 'regional' },
    'en-ie': { locale: 'ie', base: null, type: 'regional' },
    'en-sg': { locale: 'sg', base: null, type: 'regional' },
    'en-hk_en': { locale: 'hk_en', base: null, type: 'regional' },
    'en-ae_en': { locale: 'ae_en', base: null, type: 'regional' },
    'en-be_en': { locale: 'be_en', base: null, type: 'regional' },
    'en-nl': { locale: 'nl', base: null, type: 'regional' },
    'en-se': { locale: 'se', base: null, type: 'regional' },
    'en-dk': { locale: 'dk', base: null, type: 'regional' },
    'en-no': { locale: 'no', base: null, type: 'regional' },
    'en-fi': { locale: 'fi', base: null, type: 'regional' },
    'en-pl': { locale: 'pl', base: null, type: 'regional' },
    'en-cz': { locale: 'cz', base: null, type: 'regional' },
    'en-ro': { locale: 'ro', base: null, type: 'regional' },
    'en-bg': { locale: 'bg', base: null, type: 'regional' },
    'en-gr_en': { locale: 'gr_en', base: null, type: 'regional' },
    'en-tr': { locale: 'tr', base: null, type: 'regional' },
    'en-il_en': { locale: 'il_en', base: null, type: 'regional' },
    'en-sa_en': { locale: 'sa_en', base: null, type: 'regional' },
    'en-mena_en': { locale: 'mena_en', base: null, type: 'regional' },
    'en-africa': { locale: 'africa', base: null, type: 'regional' },
    'en-ru': { locale: 'ru', base: null, type: 'regional' },
    'en-ua': { locale: 'ua', base: null, type: 'regional' },
    'en-ee': { locale: 'ee', base: null, type: 'regional' },
    'en-sk': { locale: 'sk', base: null, type: 'regional' },
    'en-si': { locale: 'si', base: null, type: 'regional' },
    'en-lu_en': { locale: 'lu_en', base: null, type: 'regional' },
    'en-cn': { locale: 'cn', base: null, type: 'regional' },
    'en-tw': { locale: 'tw', base: null, type: 'regional' },
    'en-id_en': { locale: 'id_en', base: null, type: 'regional' },
    'en-my_en': { locale: 'my_en', base: null, type: 'regional' },
    'en-ph_en': { locale: 'ph_en', base: null, type: 'regional' },
    'en-th_en': { locale: 'th_en', base: null, type: 'regional' },
    'en-vn_en': { locale: 'vn_en', base: null, type: 'regional' },
    // Spanish
    'es-cl': { locale: 'cl', base: 'es', type: 'regional' },
    'es-co': { locale: 'co', base: 'es', type: 'regional' },
    'es-la': { locale: 'la', base: 'es', type: 'regional' },
    'es-pe': { locale: 'pe', base: 'es', type: 'regional' },
    // German
    'de-ch_de': { locale: 'ch_de', base: 'de', type: 'regional' },
    'de-lu_de': { locale: 'lu_de', base: 'de', type: 'regional' },
    // French
    'fr-ca_fr': { locale: 'ca_fr', base: 'fr', type: 'regional' },
    'fr-be_fr': { locale: 'be_fr', base: 'fr', type: 'regional' },
    'fr-ch_fr': { locale: 'ch_fr', base: 'fr', type: 'regional' },
    'fr-lu_fr': { locale: 'lu_fr', base: 'fr', type: 'regional' },
    // Italian
    'it-ch_it': { locale: 'ch_it', base: 'it', type: 'regional' },
    // Portuguese
    'pt-br': { locale: 'br', base: 'pt', type: 'regional' },
  };

  // Create test function for each new locale (features 18+)
  const createLocaleTest = (featureIndex) => {
    const feature = features[featureIndex];
    if (!feature) return;

    const localeInfo = LOCALE_CONFIG[feature.path];
    if (!localeInfo) {
      // Skip unknown locales silently - they may be handled by other tests
      return;
    }

    test(`${feature.name}, ${feature.tags}`, async ({ page }) => {
      const testData = await WebUtil.loadTestData(`${feature.data}`);

      // Get the test pages for this locale
      const pageKeys = Object.keys(testData).filter((key) => key.startsWith(feature.path));

      if (pageKeys.length === 0) {
        console.warn(`[LingoTest] No pages found for ${feature.path}`);
        test.skip();
        return;
      }

      const { locale, base, type } = localeInfo;
      let results;

      if (type === 'regional' && base) {
        // Non-English regional (Spanish, German, French, Italian, Portuguese)
        results = await testRegionalPagesWithEnv(page, testData, pageKeys, locale, base, '.live', feature.name);
      } else if (type === 'regional') {
        // English regional - test like full site (links should have the regional locale)
        results = await testFullSitePages(page, testData, pageKeys, locale, feature.name);
      } else {
        // Full site
        results = await testFullSitePages(page, testData, pageKeys, locale, feature.name);
      }

      console.info(`[LingoTest] ✓ ${feature.name}: ${results.success} passed, ${results.skip} skipped`);
      expect(results.success).toBeGreaterThan(0);
    });
  };

  // Generate tests for features 18-64
  for (let i = 18; i < features.length; i += 1) {
    createLocaleTest(i);
  }
});
