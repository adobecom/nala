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
 *    - Links point to regional locale if page exists
 *    - Links fall back to base language if regional page doesn't exist (404 fallback)
 * 3. FULL SITE locales (/uk, /au, /jp, /kr, /in): All links → that locale
 * 4. US ROOT (/): Links have no locale prefix
 *
 * 404 Fallback Rules (from locale-404-fallback tests):
 * - Regional locales that 404 will redirect to their base language
 * - English regional → / (root)
 * - Spanish regional (ar, cl, co, la, mx, pe) → /es
 * - German regional (at, ch_de, lu_de) → /de
 * - French regional (be_fr, ca_fr, ch_fr, lu_fr) → /fr
 * - Italian regional (ch_it) → /it
 * - Portuguese regional (br) → /pt
 */

// Report file paths - using JSON Lines format for parallel-safe writes
const RESULTS_DIR = path.join(process.cwd(), 'results');
const REPORT_JSONL_PATH = path.join(RESULTS_DIR, 'lingo-test-results.jsonl');
const REPORT_JSON_PATH = path.join(RESULTS_DIR, 'lingo-detailed-report.json');

// ============================================================================
// 404 FALLBACK RULES - Defines which regional locales fall back to which base
// ============================================================================
const FALLBACK_RULES = {
  // English regional locales → fall back to root (/)
  'en-root': {
    fallbackTo: '/',
    locales: [
      'ae_en', 'africa', 'ca', 'be_en', 'bg', 'cn', 'cz', 'dk', 'ee', 'fi',
      'gr_en', 'hk_en', 'id_en', 'ie', 'il_en', 'lu_en', 'mena_en', 'my_en',
      'nl', 'no', 'ph_en', 'pl', 'ro', 'ru', 'sa_en', 'se', 'sg', 'si',
      'nz', 'sk', 'th_en', 'tr', 'tw', 'ua', 'vn_en',
    ],
  },
  // German regional locales → fall back to /de
  de: {
    fallbackTo: '/de',
    locales: ['at', 'ch_de', 'lu_de'],
  },
  // Spanish regional locales → fall back to /es
  es: {
    fallbackTo: '/es',
    locales: ['ar', 'cl', 'co', 'la', 'mx', 'pe'],
  },
  // French regional locales → fall back to /fr
  fr: {
    fallbackTo: '/fr',
    locales: ['be_fr', 'ca_fr', 'ch_fr', 'lu_fr'],
  },
  // Italian regional locales → fall back to /it
  it: {
    fallbackTo: '/it',
    locales: ['ch_it'],
  },
  // Portuguese regional locales → fall back to /pt
  pt: {
    fallbackTo: '/pt',
    locales: ['br'],
  },
};

// Get the fallback base for a regional locale
function getFallbackBase(locale) {
  // eslint-disable-next-line no-restricted-syntax
  for (const [base, rule] of Object.entries(FALLBACK_RULES)) {
    if (rule.locales.includes(locale)) {
      return { base, fallbackTo: rule.fallbackTo };
    }
  }
  return null;
}

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
    description: 'REGIONAL pages - Mixed links based on page existence',
    locales: ['/ar', '/mx', '/at', '/ch_de', '/ca_fr', '/br'],
    expectation: 'Links point to regional locale if page exists, otherwise fall back to base language (404 fallback)',
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

  // CaaS statistics
  let pagesWithCaaS = 0;
  let totalCaaSCards = 0;
  let totalLinks = 0;

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

        // Aggregate CaaS stats
        if (p.hasCaaS) {
          pagesWithCaaS += 1;
          totalCaaSCards += p.cardCount || 0;
        }
        if (p.links && p.links.total) {
          totalLinks += p.links.total;
        }
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
      // CaaS summary
      pagesWithCaaS,
      totalCaaSCards,
      totalLinksAnalyzed: totalLinks,
    },
    rules: LINGO_RULES,
    fallbackRules: FALLBACK_RULES,
    tests,
  };

  fs.writeFileSync(REPORT_JSON_PATH, JSON.stringify(report, null, 2));
  console.info(`[LingoTest] Final report saved to: ${REPORT_JSON_PATH}`);
  console.info(`[LingoTest] Summary: ${tests.length} tests, ${passedTests} passed, ${failedTests} failed`);
  console.info(`[LingoTest] CaaS: ${pagesWithCaaS} pages with CaaS, ${totalCaaSCards} total cards, ${totalLinks} links analyzed`);
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
      if (a.closest('header') || a.closest('nav.gnav')) {
        location = 'header';
      } else if (a.closest('footer')) {
        location = 'footer';
      } else if (a.closest('.caas-preview') || a.closest('[aria-label="Card Collection"]') || a.closest('.caas')) {
        location = 'caas';
      }
      return {
        href: a.href,
        text: a.textContent?.trim().substring(0, 50) || '',
        location,
      };
    });
  });

  const internalLinks = links.filter((link) => link.href.startsWith(baseDomain));

  // Detect bad/staging links (hlx.page, hlx.live, branch URLs)
  const badLinks = [];
  const stagingPatterns = [
    { pattern: /\.hlx\.page/, issue: 'Points to hlx.page (staging/preview URL)' },
    { pattern: /\.hlx\.live/, issue: 'Points to hlx.live (staging URL)' },
    { pattern: /main--[a-z]+--adobecom\./, issue: 'Points to branch preview URL (main--*--adobecom)' },
    { pattern: /--[a-z]+--adobecom\.hlx\./, issue: 'Points to branch preview URL (*--adobecom.hlx)' },
  ];

  links.forEach((link) => {
    for (const { pattern, issue } of stagingPatterns) {
      if (pattern.test(link.href)) {
        badLinks.push({
          ...link,
          issue,
          shouldBe: link.href
            .replace(/https:\/\/main--bacom--adobecom\.hlx\.page/, 'https://business.stage.adobe.com')
            .replace(/https:\/\/main--bacom--adobecom\.hlx\.live/, 'https://business.adobe.com')
            .replace(/\.hlx\.page/, '.adobe.com')
            .replace(/\.hlx\.live/, '.adobe.com'),
        });
        break;
      }
    }
  });

  if (badLinks.length > 0) {
    console.warn(`[LingoTest] ⚠️ Found ${badLinks.length} bad/staging links on page!`);
    badLinks.forEach((bl) => console.warn(`  - ${bl.href} (${bl.issue}) [${bl.location}]`));
  }

  let matchesLocale = 0;
  let noLocaleLinks = 0;
  const otherLocales = {};
  const linksByLocale = { matched: [], noLocale: [], other: [] };

  internalLinks.forEach((link) => {
    // Updated regex to handle business.stage.adobe.com URLs
    const match = link.href.match(/adobe\.com\/([a-z]{2}(?:_[a-z]{2})?)(\/|$|\?)/);
    if (match) {
      if (match[1] === locale) {
        matchesLocale += 1;
        linksByLocale.matched.push({ ...link, detectedLocale: match[1] });
      } else {
        otherLocales[match[1]] = (otherLocales[match[1]] || 0) + 1;
        linksByLocale.other.push({ ...link, detectedLocale: match[1] });
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
    badLinks,
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

// Cache for query-index data to avoid fetching multiple times
const queryIndexCache = new Map();

/**
 * Fetch the Query Index for a regional locale
 * Query Index holds the list of pages that exist for that locale
 * Path: /<locale>/assets/lingo/query-index.json
 */
async function fetchQueryIndex(baseDomain, locale) {
  const cacheKey = `${baseDomain}/${locale}`;
  if (queryIndexCache.has(cacheKey)) {
    return queryIndexCache.get(cacheKey);
  }

  const indexUrl = `${baseDomain}/${locale}/assets/lingo/query-index.json`;
  console.info(`[LingoTest] Fetching Query Index: ${indexUrl}`);

  try {
    const response = await fetch(indexUrl);
    if (!response.ok) {
      console.warn(`[LingoTest] Query Index not found: ${indexUrl} (${response.status})`);
      queryIndexCache.set(cacheKey, { exists: false, pages: new Set(), total: 0 });
      return queryIndexCache.get(cacheKey);
    }

    const data = await response.json();
    // Extract paths from the index - handle both 'path' and 'Path' field names
    const pages = new Set();
    if (data.data && Array.isArray(data.data)) {
      data.data.forEach((item) => {
        const pagePath = item.path || item.Path;
        if (pagePath) {
          // Normalize path: remove locale prefix and .html extension
          let normalized = pagePath;
          // Remove locale prefix (e.g., /ar/products -> /products)
          const localeMatch = normalized.match(/^\/[a-z]{2}(?:_[a-z]{2})?(\/.*)/);
          if (localeMatch) {
            [, normalized] = localeMatch;
          }
          // Remove .html extension
          normalized = normalized.replace(/\.html$/, '');
          // Ensure path starts with /
          if (!normalized.startsWith('/')) {
            normalized = `/${normalized}`;
          }
          pages.add(normalized);
        }
      });
    }

    console.info(`[LingoTest] Query Index for /${locale}: ${pages.size} pages found`);
    const result = { exists: true, pages, total: data.total || pages.size };
    queryIndexCache.set(cacheKey, result);
    return result;
  } catch (error) {
    console.warn(`[LingoTest] Failed to fetch Query Index: ${error.message}`);
    queryIndexCache.set(cacheKey, { exists: false, pages: new Set(), total: 0, error: error.message });
    return queryIndexCache.get(cacheKey);
  }
}

/**
 * Check if a page path exists in the Query Index
 */
function pageExistsInIndex(queryIndex, pagePath) {
  if (!queryIndex.exists || queryIndex.pages.size === 0) {
    return false;
  }
  // Normalize the path for comparison
  let normalized = pagePath;
  normalized = normalized.replace(/\.html$/, '');
  if (!normalized.startsWith('/')) {
    normalized = `/${normalized}`;
  }
  // Also try with trailing slash variations
  return queryIndex.pages.has(normalized)
    || queryIndex.pages.has(`${normalized}/`)
    || queryIndex.pages.has(normalized.replace(/\/$/, ''));
}

/**
 * Validate regional page links according to the rule:
 * "If the regional page does not exist, links should point to the base site"
 *
 * Uses Query Index (/<locale>/assets/lingo/query-index.json) to check page existence
 * This is how Link Transformation actually works - it checks the Query Index
 */
async function validateRegionalLinks(baseLocaleLinks, regionalLocale, baseLocale, baseDomain) {
  const validationResults = {
    correct: [], // Links correctly pointing to base (regional not in index)
    incorrect: [], // Links incorrectly pointing to base (regional IS in index - BUG!)
    unchecked: [], // Links that couldn't be checked
    queryIndexInfo: null,
  };

  // Fetch the Query Index for the regional locale
  const queryIndex = await fetchQueryIndex(baseDomain, regionalLocale);
  validationResults.queryIndexInfo = {
    locale: regionalLocale,
    indexUrl: `${baseDomain}/${regionalLocale}/assets/lingo/query-index.json`,
    exists: queryIndex.exists,
    totalPages: queryIndex.total,
  };

  if (!queryIndex.exists) {
    console.warn(`[LingoTest] No Query Index for /${regionalLocale} - cannot validate links`);
    baseLocaleLinks.forEach((link) => {
      validationResults.unchecked.push({
        linkHref: link.href,
        reason: 'Query Index not available for validation',
      });
    });
    return validationResults;
  }

  // Only check unique paths to avoid redundant checks
  const uniquePaths = new Map();
  baseLocaleLinks.forEach((link) => {
    // Extract path from link href
    // e.g., https://business.stage.adobe.com/es/products -> /products
    const urlMatch = link.href.match(/adobe\.com\/[a-z]{2}(?:_[a-z]{2})?(\/[^?#]*)/);
    if (urlMatch) {
      let pagePath = urlMatch[1] || '/';
      // Remove .html extension for comparison
      pagePath = pagePath.replace(/\.html$/, '');
      if (!uniquePaths.has(pagePath)) {
        uniquePaths.set(pagePath, link);
      }
    }
  });

  console.info(`[LingoTest] Validating ${uniquePaths.size} unique base-locale links against Query Index...`);

  // Check each unique path against the Query Index
  for (const [pagePath, link] of uniquePaths) {
    const existsInIndex = pageExistsInIndex(queryIndex, pagePath);
    const regionalPath = `/${regionalLocale}${pagePath}`;

    if (existsInIndex) {
      // Regional page EXISTS in Query Index but link points to base - this is a BUG!
      validationResults.incorrect.push({
        linkHref: link.href,
        linkText: link.text,
        pagePath,
        regionalPath,
        issue: `Page exists in /${regionalLocale} Query Index but link points to base /${baseLocale}`,
      });
    } else {
      // Regional page NOT in Query Index - link correctly points to base
      validationResults.correct.push({
        linkHref: link.href,
        linkText: link.text,
        pagePath,
        regionalPath,
        reason: `Page not in /${regionalLocale} Query Index, correctly falls back to /${baseLocale}`,
      });
    }
  }

  return validationResults;
}

// Helper to load and verify page - now handles 404 redirects for regional pages
async function loadAndVerifyPage(page, url, pageName, expectedLocale = null) {
  try {
    const response = await page.goto(url, { timeout: 60000, waitUntil: 'domcontentloaded' });
    const finalUrl = page.url();

    // Check if we were redirected due to 404 fallback
    const fallbackInfo = expectedLocale ? getFallbackBase(expectedLocale) : null;
    const wasRedirected = response && response.url() !== url;

    if (wasRedirected && fallbackInfo) {
      console.info(`[LingoTest] ${pageName}: Redirected (404 fallback) from ${expectedLocale} to ${fallbackInfo.fallbackTo}`);
    }

    return {
      loaded: true,
      wasRedirected,
      finalUrl,
      fallbackInfo,
    };
  } catch (error) {
    console.warn(`[LingoTest] FAILED: ${pageName} - ${error.message}`);
    return { loaded: false, reason: `Navigation failed: ${error.message}`, title: '', error: true };
  }
}

// Wait for page to be ready and dismiss popups
async function waitForPageReady(page) {
  await page.waitForTimeout(2000);
  await dismissPopups(page);

  const pageTitle = await page.title();
  if (pageTitle.includes('404') || pageTitle === '') {
    return { ready: false, reason: '404 or empty page', title: pageTitle };
  }

  const header = page.locator('header');
  try {
    await expect(header).toBeVisible({ timeout: 10000 });
  } catch {
    return { ready: false, reason: 'No header found', title: pageTitle };
  }

  return { ready: true, title: pageTitle };
}

// Wait for CaaS/dynamic content to load (cards, carousels, etc.)
async function waitForCaaSContent(page, pageName) {
  // CaaS container selectors - these are common patterns for dynamically loaded content
  const caasSelectors = [
    '.caas-container', // CaaS main container
    '.consonant-CardsGrid', // Consonant cards grid
    '.card-collection', // Card collection
    '.consonant-Wrapper', // Consonant wrapper
    '[data-component="CardCollection"]', // Card collection component
    '.merch-cards', // Merch cards
    '.fragment .cards', // Cards within fragments
    '.section .cards', // Cards within sections
    '.caas-preview', // Lazy-loaded CaaS preview container
  ];

  // Lazy-loaded CaaS markers - these indicate CaaS content that needs to be scrolled into view
  const lazyCaaSMarkers = [
    '.caas.link-block', // CaaS link-block (lazy-loaded marker)
    'a.caas[data-block-status]', // CaaS anchor with block status
  ];

  let caasFound = false;
  let caasSelector = '';
  let hasLazyCaaS = false;

  // First check for lazy-loaded CaaS markers (not yet rendered)
  for (const selector of lazyCaaSMarkers) {
    try {
      const markers = page.locator(selector);
      const count = await markers.count();
      if (count > 0) {
        hasLazyCaaS = true;
        console.info(`[LingoTest] ${pageName}: Found ${count} lazy CaaS marker(s) (${selector}), scrolling to trigger load...`);

        // Scroll through the page to trigger lazy loading of CaaS content
        await page.evaluate(async () => {
          const scrollStep = window.innerHeight * 0.8;
          const maxScroll = document.documentElement.scrollHeight;
          for (let pos = 0; pos < maxScroll; pos += scrollStep) {
            window.scrollTo(0, pos);
            await new Promise((r) => { setTimeout(r, 300); });
          }
          // Scroll back to top
          window.scrollTo(0, 0);
        });

        // Wait for lazy content to render
        await page.waitForTimeout(2000);
        break;
      }
    } catch {
      // Continue to next selector
    }
  }

  // Check if any CaaS container exists on the page (including newly loaded ones)
  for (const selector of caasSelectors) {
    try {
      const container = page.locator(selector).first();
      if (await container.isVisible({ timeout: 2000 })) {
        caasSelector = selector;
        caasFound = true;
        break;
      }
    } catch {
      // Continue to next selector
    }
  }

  // Also check for Card Collection sections (used by lazy-loaded CaaS)
  if (!caasFound) {
    try {
      const cardCollections = page.locator('[aria-label="Card Collection"]');
      const count = await cardCollections.count();
      if (count > 0) {
        caasSelector = '[aria-label="Card Collection"]';
        caasFound = true;
      }
    } catch {
      // Continue
    }
  }

  if (!caasFound && !hasLazyCaaS) {
    // No CaaS container found, page might not have dynamic content
    console.info(`[LingoTest] ${pageName}: No CaaS container detected`);
    return { hasCaaS: false, cardCount: 0 };
  }

  if (caasFound) {
    console.info(`[LingoTest] ${pageName}: CaaS container found (${caasSelector}), waiting for cards...`);
  }

  // Wait for cards to render inside the container
  const cardSelectors = [
    '.consonant-Card',
    '.card',
    '[data-card]',
    '.caas-card',
    '.merch-card',
    'article.card',
    '.card-item',
    '[aria-label="Card Collection"] li', // Lazy-loaded CaaS card items
    '.caas-preview li', // CaaS preview card items
  ];

  let cardCount = 0;
  const maxWaitTime = 10000; // 10 seconds max wait
  const startTime = Date.now();

  // Poll for cards to appear
  while (Date.now() - startTime < maxWaitTime) {
    for (const cardSelector of cardSelectors) {
      try {
        const cards = page.locator(cardSelector);
        const count = await cards.count();
        if (count > cardCount) {
          cardCount = count;
        }
      } catch {
        // Continue
      }
    }

    if (cardCount > 0) {
      // Wait a bit more for all cards to finish loading
      await page.waitForTimeout(1500);

      // Re-count to get final number
      for (const cardSelector of cardSelectors) {
        try {
          const cards = page.locator(cardSelector);
          const count = await cards.count();
          if (count > cardCount) {
            cardCount = count;
          }
        } catch {
          // Continue
        }
      }
      break;
    }

    await page.waitForTimeout(500);
  }

  // If we had lazy CaaS markers but found no cards, still report CaaS was present
  const hasCaaS = caasFound || hasLazyCaaS;
  console.info(`[LingoTest] ${pageName}: Found ${cardCount} CaaS cards (hasCaaS: ${hasCaaS})`);
  return { hasCaaS, cardCount };
}

// Combined wait for page ready and CaaS content
async function waitForPageWithCaaS(page, pageName) {
  const readyResult = await waitForPageReady(page);
  if (!readyResult.ready) {
    return readyResult;
  }

  // Wait for CaaS content if present
  const caasResult = await waitForCaaSContent(page, pageName);
  return {
    ...readyResult,
    hasCaaS: caasResult.hasCaaS,
    cardCount: caasResult.cardCount,
  };
}

/**
 * Test BASE LANGUAGE pages - All links should point to base language
 * Now waits for CaaS dynamic content before analyzing links
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
        // Use CaaS-aware waiting for pages with dynamic content
        const readyResult = await waitForPageWithCaaS(page, pageName);
        if (!readyResult.ready) {
          results.skip += 1;
          pageResult.status = 'skipped';
          pageResult.reason = readyResult.reason;
          pageResult.title = readyResult.title;
        } else {
          const analysis = await analyzePageLinks(page, locale);
          const pct = parseFloat(analysis.localePercentage);

          console.info(`[LingoTest] ${pageName}: ${pct}% /${locale} (${analysis.matchesLocale}/${analysis.total})`);
          if (readyResult.hasCaaS) {
            console.info(`  CaaS detected: ${readyResult.cardCount} cards loaded`);
          }
          if (Object.keys(analysis.otherLocales).length > 0) {
            console.info(`  Other locales: ${JSON.stringify(analysis.otherLocales)}`);
          }

          pageResult.status = 'passed';
          pageResult.title = readyResult.title;
          pageResult.hasCaaS = readyResult.hasCaaS || false;
          pageResult.cardCount = readyResult.cardCount || 0;
          pageResult.links = {
            total: analysis.total,
            matchedLocale: analysis.matchesLocale,
            matchedPercentage: `${pct}%`,
            otherLocales: analysis.otherLocales,
            sampleMatchedLinks: analysis.linkDetails.matched.slice(0, 10),
            sampleOtherLinks: analysis.linkDetails.other.slice(0, 10),
            badLinks: analysis.badLinks,
          };
          results.success += 1;
        }
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
 * Test REGIONAL pages - Compare regional vs base language links
 * Now aware of 404 fallback rules
 */
async function testRegionalPages(page, testData, pageKeys, regionalLocale, baseLocale, testName) {
  const results = {
    success: 0, skip: 0, failed: 0, regionalLinks: 0, baseLinks: 0, pages: [],
  };

  const fallbackInfo = getFallbackBase(regionalLocale);

  for (let i = 0; i < pageKeys.length; i += 1) {
    const pageName = pageKeys[i];
    const url = testData[pageName];
    const pageResult = { name: pageName, url, status: 'pending', links: null };

    if (!url) {
      results.skip += 1;
      pageResult.status = 'skipped';
      pageResult.reason = 'No URL defined';
    } else {
      const loadResult = await loadAndVerifyPage(page, url, pageName, regionalLocale);
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
        const readyResult = await waitForPageWithCaaS(page, pageName);
        if (!readyResult.ready) {
          results.skip += 1;
          pageResult.status = 'skipped';
          pageResult.reason = readyResult.reason;
          pageResult.title = readyResult.title;
        } else {
          const analysis = await analyzePageLinks(page, regionalLocale);
          const baseLinks = analysis.otherLocales[baseLocale] || 0;

          results.regionalLinks += analysis.matchesLocale;
          results.baseLinks += baseLinks;

          console.info(`[LingoTest] ${pageName}:`);
          console.info(`  Regional /${regionalLocale}: ${analysis.matchesLocale} links`);
          console.info(`  Base /${baseLocale}: ${baseLinks} links (fallback)`);
          if (readyResult.hasCaaS) {
            console.info(`  CaaS detected: ${readyResult.cardCount} cards loaded`);
          }
          if (fallbackInfo) {
            console.info(`  404 Fallback Rule: /${regionalLocale} → ${fallbackInfo.fallbackTo}`);
          }

          // VALIDATE: Check if links to base locale are correct
          // Rule: If regional page doesn't exist, link should go to base
          // If regional page DOES exist but link goes to base, that's a BUG
          //
          // IMPORTANT: If page was REDIRECTED to base site, skip validation!
          // On base sites, NO link transformation happens - all links stay on base.
          // This is correct behavior per the rule:
          // "If the user is on the base-site, no link transformation based on IP will happen."
          let validation = null;
          let hasViolations = false;

          if (loadResult.wasRedirected) {
            // Page redirected to base site - all links pointing to base is CORRECT
            console.info('  ℹ️ Page redirected to base site - skipping link validation');
            console.info(`  ✅ All ${baseLinks} links correctly point to base (base site rule)`);
            validation = {
              rule: 'Page redirected to base site - no link transformation on base sites',
              skipped: true,
              reason: 'After 404 redirect, user is on base site where all links should point to base',
              correct: [],
              incorrect: [],
              unchecked: [],
              queryIndexInfo: null,
            };
          } else {
            // Page loaded as regional - validate links against Query Index
            const baseLocaleLinks = analysis.linkDetails.other.filter(
              (l) => l.detectedLocale === baseLocale,
            );

            if (baseLocaleLinks.length > 0) {
              // Extract base domain (e.g., https://business.stage.adobe.com)
              const urlObj = new URL(url);
              const baseDomain = `${urlObj.protocol}//${urlObj.host}`;
              validation = await validateRegionalLinks(
                baseLocaleLinks,
                regionalLocale,
                baseLocale,
                baseDomain,
              );

              console.info(`  ✅ Correct fallbacks: ${validation.correct.length}`);
              if (validation.incorrect.length > 0) {
                console.warn(`  ❌ INCORRECT (regional exists but link to base): ${validation.incorrect.length}`);
                validation.incorrect.forEach((v) => {
                  console.warn(`     - ${v.pagePath}: ${v.issue}`);
                });
                hasViolations = true;
              }
              if (validation.unchecked.length > 0) {
                console.info(`  ⚠️ Unchecked: ${validation.unchecked.length}`);
              }
            }

            // Check for UNEXPECTED LOCALE links (not regional, not base)
            // These are potential content issues - hardcoded links to wrong locale
            const unexpectedLocales = Object.entries(analysis.otherLocales)
              .filter(([locale]) => locale !== baseLocale && locale !== regionalLocale)
              .map(([locale, count]) => ({ locale, count }));

            if (unexpectedLocales.length > 0) {
              const unexpectedLinks = analysis.linkDetails.other.filter(
                (l) => l.detectedLocale !== baseLocale && l.detectedLocale !== regionalLocale,
              );
              console.warn('  ⚠️ UNEXPECTED LOCALES (potential content issues):');
              unexpectedLocales.forEach(({ locale, count }) => {
                console.warn(`     - /${locale}: ${count} links (should be /${regionalLocale} or /${baseLocale})`);
              });

              // Store unexpected locale info
              validation = validation || { correct: [], incorrect: [], unchecked: [] };
              validation.unexpectedLocales = {
                locales: unexpectedLocales,
                totalLinks: unexpectedLinks.length,
                sampleLinks: unexpectedLinks.slice(0, 5).map((l) => ({
                  href: l.href,
                  text: l.text?.substring(0, 50),
                  detectedLocale: l.detectedLocale,
                })),
                issue: `Links to unexpected locales found on /${regionalLocale}`,
              };
            }
          }

          pageResult.status = hasViolations ? 'warning' : 'passed';
          pageResult.title = readyResult.title;
          pageResult.wasRedirected = loadResult.wasRedirected;
          pageResult.hasCaaS = readyResult.hasCaaS || false;
          pageResult.cardCount = readyResult.cardCount || 0;
          pageResult.links = {
            total: analysis.total,
            regionalLinks: analysis.matchesLocale,
            baseLinks,
            otherLocales: analysis.otherLocales,
            fallbackRule: fallbackInfo,
            sampleRegionalLinks: analysis.linkDetails.matched.slice(0, 10),
            sampleBaseLinks: analysis.linkDetails.other.filter((l) => l.detectedLocale === baseLocale).slice(0, 10),
            badLinks: analysis.badLinks,
          };

          // Add validation results to page result
          if (validation) {
            if (validation.skipped) {
              // Page redirected to base - validation skipped
              pageResult.linkValidation = {
                rule: validation.rule,
                skipped: true,
                reason: validation.reason,
                correctFallbacks: 0,
                incorrectLinks: 0,
                unchecked: 0,
                violations: [],
              };
            } else {
              pageResult.linkValidation = {
                rule: 'If regional page does not exist (not in Query Index), link should point to base site',
                queryIndex: validation.queryIndexInfo,
                correctFallbacks: validation.correct.length,
                incorrectLinks: validation.incorrect.length,
                unchecked: validation.unchecked.length,
                violations: validation.incorrect.slice(0, 10), // First 10 violations
                correctExamples: validation.correct.slice(0, 5), // First 5 correct examples
              };

              // Add unexpected locales if found
              if (validation.unexpectedLocales) {
                pageResult.linkValidation.unexpectedLocales = validation.unexpectedLocales;
              }
            }
          }

          results.success += 1;
        }
      }
    }
    results.pages.push(pageResult);
  }

  // Calculate validation summary
  let totalCorrectFallbacks = 0;
  let totalViolations = 0;
  results.pages.forEach((p) => {
    if (p.linkValidation) {
      totalCorrectFallbacks += p.linkValidation.correctFallbacks;
      totalViolations += p.linkValidation.incorrectLinks;
    }
  });

  // Append to report file (parallel-safe)
  appendTestResult({
    testName,
    ruleType: 'REGIONAL',
    locale: `/${regionalLocale}`,
    baseLocale: `/${baseLocale}`,
    fallbackRule: fallbackInfo,
    timestamp: new Date().toISOString(),
    results: {
      passed: results.success,
      skipped: results.skip,
      failed: results.failed,
      totalRegionalLinks: results.regionalLinks,
      totalBaseLinks: results.baseLinks,
      // Validation summary
      validationRule: 'If regional page does not exist, link should point to base site',
      correctFallbacks: totalCorrectFallbacks,
      violations: totalViolations,
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
        const readyResult = await waitForPageWithCaaS(page, pageName);
        if (!readyResult.ready) {
          results.skip += 1;
          pageResult.status = 'skipped';
          pageResult.reason = readyResult.reason;
          pageResult.title = readyResult.title;
        } else {
          const analysis = await analyzePageLinks(page, locale);
          const pct = parseFloat(analysis.localePercentage);

          console.info(`[LingoTest] ${pageName}: ${pct}% /${locale} (${analysis.matchesLocale}/${analysis.total})`);
          if (readyResult.hasCaaS) {
            console.info(`  CaaS detected: ${readyResult.cardCount} cards loaded`);
          }

          pageResult.status = 'passed';
          pageResult.title = readyResult.title;
          pageResult.hasCaaS = readyResult.hasCaaS || false;
          pageResult.cardCount = readyResult.cardCount || 0;
          pageResult.links = {
            total: analysis.total,
            matchedLocale: analysis.matchesLocale,
            matchedPercentage: `${pct}%`,
            otherLocales: analysis.otherLocales,
            sampleMatchedLinks: analysis.linkDetails.matched.slice(0, 10),
            sampleOtherLinks: analysis.linkDetails.other.slice(0, 10),
            badLinks: analysis.badLinks,
          };
          results.success += 1;
        }
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
        const readyResult = await waitForPageWithCaaS(page, pageName);
        if (!readyResult.ready) {
          results.skip += 1;
          pageResult.status = 'skipped';
          pageResult.reason = readyResult.reason;
          pageResult.title = readyResult.title;
        } else {
          const analysis = await analyzePageLinks(page, '', true);

          console.info(`[LingoTest] ${pageName}:`);
          console.info(`  No locale (root): ${analysis.noLocaleLinks} links`);
          if (readyResult.hasCaaS) {
            console.info(`  CaaS detected: ${readyResult.cardCount} cards loaded`);
          }
          console.info(`  With locale: ${JSON.stringify(analysis.otherLocales)}`);

          pageResult.status = 'passed';
          pageResult.title = readyResult.title;
          pageResult.hasCaaS = readyResult.hasCaaS || false;
          pageResult.cardCount = readyResult.cardCount || 0;
          pageResult.links = {
            total: analysis.total,
            noLocaleLinks: analysis.noLocaleLinks,
            linksWithLocale: analysis.otherLocales,
            sampleNoLocaleLinks: analysis.linkDetails.noLocale.slice(0, 10),
            sampleLocalizedLinks: analysis.linkDetails.other.slice(0, 10),
            badLinks: analysis.badLinks,
          };
          results.success += 1;
        }
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

// ============================================================================
// LOCALE CONFIGURATION MAP
// Defines locale type, base language (for fallback), and URL locale code
// ============================================================================
const LOCALE_CONFIG = {
  // English Regional (404 fallback to root /)
  'en-nz': { locale: 'nz', base: null, type: 'regional-en' },
  'en-ca': { locale: 'ca', base: null, type: 'regional-en' },
  'en-ie': { locale: 'ie', base: null, type: 'regional-en' },
  'en-sg': { locale: 'sg', base: null, type: 'regional-en' },
  'en-hk_en': { locale: 'hk_en', base: null, type: 'regional-en' },
  'en-ae_en': { locale: 'ae_en', base: null, type: 'regional-en' },
  'en-be_en': { locale: 'be_en', base: null, type: 'regional-en' },
  'en-nl': { locale: 'nl', base: null, type: 'regional-en' },
  'en-se': { locale: 'se', base: null, type: 'regional-en' },
  'en-dk': { locale: 'dk', base: null, type: 'regional-en' },
  'en-no': { locale: 'no', base: null, type: 'regional-en' },
  'en-fi': { locale: 'fi', base: null, type: 'regional-en' },
  'en-pl': { locale: 'pl', base: null, type: 'regional-en' },
  'en-cz': { locale: 'cz', base: null, type: 'regional-en' },
  'en-ro': { locale: 'ro', base: null, type: 'regional-en' },
  'en-bg': { locale: 'bg', base: null, type: 'regional-en' },
  'en-gr_en': { locale: 'gr_en', base: null, type: 'regional-en' },
  'en-tr': { locale: 'tr', base: null, type: 'regional-en' },
  'en-il_en': { locale: 'il_en', base: null, type: 'regional-en' },
  'en-sa_en': { locale: 'sa_en', base: null, type: 'regional-en' },
  'en-mena_en': { locale: 'mena_en', base: null, type: 'regional-en' },
  'en-africa': { locale: 'africa', base: null, type: 'regional-en' },
  'en-ru': { locale: 'ru', base: null, type: 'regional-en' },
  'en-ua': { locale: 'ua', base: null, type: 'regional-en' },
  'en-ee': { locale: 'ee', base: null, type: 'regional-en' },
  'en-sk': { locale: 'sk', base: null, type: 'regional-en' },
  'en-si': { locale: 'si', base: null, type: 'regional-en' },
  'en-lu_en': { locale: 'lu_en', base: null, type: 'regional-en' },
  'en-cn': { locale: 'cn', base: null, type: 'regional-en' },
  'en-tw': { locale: 'tw', base: null, type: 'regional-en' },
  'en-id_en': { locale: 'id_en', base: null, type: 'regional-en' },
  'en-my_en': { locale: 'my_en', base: null, type: 'regional-en' },
  'en-ph_en': { locale: 'ph_en', base: null, type: 'regional-en' },
  'en-th_en': { locale: 'th_en', base: null, type: 'regional-en' },
  'en-vn_en': { locale: 'vn_en', base: null, type: 'regional-en' },
  // Spanish Regional (404 fallback to /es)
  'es-ar': { locale: 'ar', base: 'es', type: 'regional' },
  'es-mx': { locale: 'mx', base: 'es', type: 'regional' },
  'es-cl': { locale: 'cl', base: 'es', type: 'regional' },
  'es-co': { locale: 'co', base: 'es', type: 'regional' },
  'es-la': { locale: 'la', base: 'es', type: 'regional' },
  'es-pe': { locale: 'pe', base: 'es', type: 'regional' },
  // German Regional (404 fallback to /de)
  'de-at': { locale: 'at', base: 'de', type: 'regional' },
  'de-ch_de': { locale: 'ch_de', base: 'de', type: 'regional' },
  'de-lu_de': { locale: 'lu_de', base: 'de', type: 'regional' },
  // French Regional (404 fallback to /fr)
  'fr-ca_fr': { locale: 'ca_fr', base: 'fr', type: 'regional' },
  'fr-be_fr': { locale: 'be_fr', base: 'fr', type: 'regional' },
  'fr-ch_fr': { locale: 'ch_fr', base: 'fr', type: 'regional' },
  'fr-lu_fr': { locale: 'lu_fr', base: 'fr', type: 'regional' },
  // Italian Regional (404 fallback to /it)
  'it-ch_it': { locale: 'ch_it', base: 'it', type: 'regional' },
  // Portuguese Regional (404 fallback to /pt)
  'pt-br': { locale: 'br', base: 'pt', type: 'regional' },
};

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
    // Dynamically get all en-us pages
    const usPages = Object.keys(testData).filter((key) => key.startsWith('en-us'));

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
    // Dynamically get all en-in pages
    const inPages = Object.keys(testData).filter((key) => key.startsWith('en-in'));

    const results = await testFullSitePages(page, testData, inPages, 'in', features[2].name);
    console.info(`[LingoTest] ✓ English India /in: ${results.success} passed, ${results.skip} skipped`);
    expect(results.success).toBeGreaterThan(0);
  });

  /**
   * Test 3: English UK /uk (Full Site)
   */
  test(`${features[3].name}, ${features[3].tags}`, async ({ page }) => {
    const testData = await WebUtil.loadTestData(`${features[3].data}`);
    // Dynamically get all en-uk pages
    const ukPages = Object.keys(testData).filter((key) => key.startsWith('en-uk'));

    const results = await testFullSitePages(page, testData, ukPages, 'uk', features[3].name);
    console.info(`[LingoTest] ✓ English UK /uk: ${results.success} passed, ${results.skip} skipped`);
    expect(results.success).toBeGreaterThan(0);
  });

  /**
   * Test 4: English Australia /au (Full Site)
   */
  test(`${features[4].name}, ${features[4].tags}`, async ({ page }) => {
    const testData = await WebUtil.loadTestData(`${features[4].data}`);
    // Dynamically get all en-au pages
    const auPages = Object.keys(testData).filter((key) => key.startsWith('en-au'));

    const results = await testFullSitePages(page, testData, auPages, 'au', features[4].name);
    console.info(`[LingoTest] ✓ English AU /au: ${results.success} passed, ${results.skip} skipped`);
    expect(results.success).toBeGreaterThan(0);
  });

  // =========================================================================
  // DYNAMIC TESTS (features 5+)
  // Covers all regional, base language, and full site locales
  // =========================================================================

  const createDynamicTest = (featureIndex) => {
    const feature = features[featureIndex];
    if (!feature) return;

    test(`${feature.name}, ${feature.tags}`, async ({ page }) => {
      const testData = await WebUtil.loadTestData(`${feature.data}`);

      // Get the test pages for this locale
      const pageKeys = Object.keys(testData).filter((key) => key.startsWith(feature.path));

      if (pageKeys.length === 0) {
        console.warn(`[LingoTest] No pages found for ${feature.path}`);
        test.skip();
        return;
      }

      const localeInfo = LOCALE_CONFIG[feature.path];
      let results;

      if (localeInfo) {
        // Regional locale
        const { locale, base, type } = localeInfo;

        if (type === 'regional' && base) {
          // Non-English regional (Spanish, German, French, Italian, Portuguese)
          results = await testRegionalPages(page, testData, pageKeys, locale, base, feature.name);
          console.info('[LingoTest] ═══════════════════════════════════════════');
          console.info(`[LingoTest] Regional /${locale} Summary:`);
          console.info(`[LingoTest]   Regional links: ${results.regionalLinks}`);
          console.info(`[LingoTest]   Base /${base} fallback links: ${results.baseLinks}`);
          console.info(`[LingoTest]   404 Fallback Rule: /${locale} → /${base}`);
          console.info('[LingoTest] ═══════════════════════════════════════════');
        } else if (type === 'regional-en') {
          // English regional - test like full site but log fallback info
          results = await testFullSitePages(page, testData, pageKeys, locale, feature.name);
          console.info('[LingoTest] ═══════════════════════════════════════════');
          console.info(`[LingoTest] English Regional /${locale} Summary:`);
          console.info(`[LingoTest]   Pages loaded: ${results.success}`);
          console.info(`[LingoTest]   404 Fallback Rule: /${locale} → / (root)`);
          console.info('[LingoTest] ═══════════════════════════════════════════');
        }
      } else if (feature.path.startsWith('es') && feature.path === 'es') {
        // Spanish base
        const esPages = Object.keys(testData).filter((key) => key.startsWith('es') && !key.includes('-'));
        results = await testBaseLanguagePages(page, testData, esPages.length > 0 ? esPages : pageKeys, 'es', feature.name);
        console.info(`[LingoTest] ✓ Spanish /es Base: ${results.success} passed, ${results.skip} skipped`);
      } else if (feature.path === 'de') {
        // German base
        const dePages = Object.keys(testData).filter((key) => key.startsWith('de') && !key.includes('-'));
        results = await testBaseLanguagePages(page, testData, dePages.length > 0 ? dePages : pageKeys, 'de', feature.name);
        console.info(`[LingoTest] ✓ German /de Base: ${results.success} passed, ${results.skip} skipped`);
      } else if (feature.path === 'fr') {
        // French base
        const frPages = Object.keys(testData).filter((key) => key.startsWith('fr') && !key.includes('-'));
        results = await testBaseLanguagePages(page, testData, frPages.length > 0 ? frPages : pageKeys, 'fr', feature.name);
        console.info(`[LingoTest] ✓ French /fr Base: ${results.success} passed, ${results.skip} skipped`);
      } else if (feature.path === 'it') {
        // Italian base
        const itPages = Object.keys(testData).filter((key) => key.startsWith('it') && !key.includes('-'));
        results = await testBaseLanguagePages(page, testData, itPages.length > 0 ? itPages : pageKeys, 'it', feature.name);
        console.info(`[LingoTest] ✓ Italian /it Base: ${results.success} passed, ${results.skip} skipped`);
      } else if (feature.path === 'pt') {
        // Portuguese base
        const ptPages = Object.keys(testData).filter((key) => key.startsWith('pt') && !key.includes('-'));
        results = await testBaseLanguagePages(page, testData, ptPages.length > 0 ? ptPages : pageKeys, 'pt', feature.name);
        console.info(`[LingoTest] ✓ Portuguese /pt Base: ${results.success} passed, ${results.skip} skipped`);
      } else if (feature.path === 'jp') {
        // Japanese full site
        results = await testFullSitePages(page, testData, pageKeys, 'jp', feature.name);
        console.info(`[LingoTest] ✓ Japanese /jp: ${results.success} passed, ${results.skip} skipped`);
      } else if (feature.path === 'kr') {
        // Korean full site
        results = await testFullSitePages(page, testData, pageKeys, 'kr', feature.name);
        console.info(`[LingoTest] ✓ Korean /kr: ${results.success} passed, ${results.skip} skipped`);
      } else {
        // Default: test as full site
        const localePath = feature.path.replace('en-', '').replace(/^(es|de|fr|it|pt)-/, '');
        results = await testFullSitePages(page, testData, pageKeys, localePath, feature.name);
        console.info(`[LingoTest] ✓ ${feature.path}: ${results.success} passed, ${results.skip} skipped`);
      }

      expect(results.success).toBeGreaterThan(0);
    });
  };

  // Generate tests for features 5+
  for (let i = 5; i < features.length; i += 1) {
    createDynamicTest(i);
  }
});
