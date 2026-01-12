#!/usr/bin/env node
/**
 * Generate Confluence-compatible report from lingo-detailed-report.json
 * Uses Confluence Wiki Markup format
 * Usage: node scripts/generate-lingo-report-confluence.js
 */

const fs = require('fs');
const path = require('path');

const RESULTS_DIR = path.join(__dirname, '..', 'results');
const JSON_PATH = path.join(RESULTS_DIR, 'lingo-detailed-report.json');
const OUTPUT_PATH = path.join(RESULTS_DIR, 'lingo-report-confluence.txt');

// Read JSON data
let reportData;
try {
  reportData = JSON.parse(fs.readFileSync(JSON_PATH, 'utf-8'));
  console.log('✓ Loaded lingo-detailed-report.json');
} catch (error) {
  console.error('✗ Failed to load JSON:', error.message);
  process.exit(1);
}

// Calculate stats
let pagesWithCaaS = 0;
let totalCaaSCards = 0;
let totalLinks = 0;
let totalViolations = 0;
let totalCorrectFallbacks = 0;
let pagesRedirected = 0;
const allViolations = [];
const allSkipped = [];
const allBadLinks = [];
const allUnexpectedLocales = [];

if (reportData.tests) {
  reportData.tests.forEach(test => {
    if (test.pages) {
      test.pages.forEach(page => {
        if (page.hasCaaS) {
          pagesWithCaaS++;
          totalCaaSCards += page.cardCount || 0;
        }
        if (page.links && page.links.total) {
          totalLinks += page.links.total;
        }
        if (page.status === 'skipped') {
          allSkipped.push({
            locale: test.locale,
            pageName: page.name,
            reason: page.reason || 'Unknown'
          });
        }
        if (page.wasRedirected) {
          pagesRedirected++;
        }
        if (page.linkValidation) {
          totalCorrectFallbacks += page.linkValidation.correctFallbacks || 0;
          if (page.linkValidation.violations && page.linkValidation.violations.length > 0) {
            totalViolations += page.linkValidation.violations.length;
            page.linkValidation.violations.forEach(v => {
              allViolations.push({
                locale: test.locale,
                pageName: page.name,
                ...v
              });
            });
          }
          if (page.linkValidation.unexpectedLocales) {
            allUnexpectedLocales.push({
              locale: test.locale,
              pageName: page.name,
              ...page.linkValidation.unexpectedLocales
            });
          }
        }
        if (page.links?.badLinks && page.links.badLinks.length > 0) {
          page.links.badLinks.forEach(bl => {
            allBadLinks.push({
              locale: test.locale,
              pageName: page.name,
              ...bl
            });
          });
        }
      });
    }
  });
}

const summary = reportData.summary;
const passRate = summary.totalPages > 0 
  ? ((summary.passedPages / summary.totalPages) * 100).toFixed(1) 
  : 0;

// Generate Confluence Wiki Markup
let wiki = `h1. BACOM Lingo Test Report

{info}
*Generated:* ${new Date(reportData.timestamp).toLocaleString()}
{info}

h2. Summary

||Metric||Value||
|Total Tests|${summary.totalTests}|
|Tests Passed|(/) ${summary.passed}|
|Tests Failed|(x) ${summary.failed}|
|Total Pages|${summary.totalPages}|
|Pages Passed|(/) ${summary.passedPages} (${passRate}%)|
|Pages Skipped|${summary.skippedPages}|
|Pages with CaaS|${pagesWithCaaS}|
|CaaS Cards|${totalCaaSCards.toLocaleString()}|
|Links Analyzed|${totalLinks.toLocaleString()}|
|Correct Fallbacks|(/) ${totalCorrectFallbacks.toLocaleString()}|
|Violations Found|(!) ${totalViolations}|
|Pages Redirected|${pagesRedirected}|
${allBadLinks.length > 0 ? `|*BAD LINKS*|(*) *${allBadLinks.length}*|` : ''}
${allUnexpectedLocales.length > 0 ? `|Unexpected Locales|(!) ${allUnexpectedLocales.length} pages|` : ''}

`;

// Bad Links Section
if (allBadLinks.length > 0) {
  wiki += `h2. (!) BAD LINKS - Staging URLs Found (${allBadLinks.length} total)

{warning}
These links point to staging/preview URLs that should NOT appear on production pages!
{warning}

||Locale||Page||Location||Link Text||Bad URL||Issue||
`;
  allBadLinks.slice(0, 100).forEach(bl => {
    const text = (bl.text || '(no text)').substring(0, 25).replace(/\|/g, '\\|');
    const href = bl.href.length > 50 ? bl.href.substring(0, 50) + '...' : bl.href;
    wiki += `|{{${bl.locale}}}|${bl.pageName}|${bl.location}|${text}|{{${href}}}|${bl.issue}|\n`;
  });
  if (allBadLinks.length > 100) {
    wiki += `\n_... and ${allBadLinks.length - 100} more bad links_\n`;
  }
  wiki += '\n';
}

// Violations Section
if (totalViolations > 0) {
  wiki += `h2. (!) Link Transformation Violations (${totalViolations} total)

{note}
These links point to the BASE locale when the regional page EXISTS in the Query Index.
{note}

||Locale||Page||Link Path||Should Be||Issue||
`;
  allViolations.slice(0, 50).forEach(v => {
    wiki += `|{{${v.locale}}}|${v.pageName}|{{${v.pagePath || ''}}}|{{${v.regionalPath || ''}}}|${v.issue || ''}|\n`;
  });
  if (allViolations.length > 50) {
    wiki += `\n_... and ${allViolations.length - 50} more violations_\n`;
  }
  wiki += '\n';
}

// Unexpected Locales Section
if (allUnexpectedLocales.length > 0) {
  wiki += `h2. (!) Unexpected Locale Links (${allUnexpectedLocales.length} pages affected)

||Locale||Page||Issue||Unexpected Locales||
`;
  allUnexpectedLocales.forEach(item => {
    const locales = (item.locales || []).map(l => `/${l.locale}: ${l.count}`).join(', ');
    wiki += `|{{${item.locale}}}|${item.pageName}|${item.issue || ''}|${locales}|\n`;
  });
  wiki += '\n';
}

// Link Transformation Rules
wiki += `h2. Link Transformation Rules

`;
Object.entries(reportData.rules || {}).forEach(([key, rule]) => {
  const locales = rule.locales.slice(0, 10).map(l => `{{${l}}}`).join(', ');
  const more = rule.locales.length > 10 ? ` +${rule.locales.length - 10} more` : '';
  wiki += `h3. ${key}

_${rule.description}_

*Locales:* ${locales}${more}

`;
});

// 404 Fallback Rules
wiki += `h2. 404 Fallback Rules

`;
Object.entries(reportData.fallbackRules || {}).forEach(([key, rule]) => {
  const locales = rule.locales.slice(0, 6).map(l => `{{/${l}}}`).join(', ');
  const more = rule.locales.length > 6 ? ` +${rule.locales.length - 6} more` : '';
  wiki += `* *${key}* → {{${rule.fallbackTo}}}: ${locales}${more}\n`;
});

// Test Results Summary
wiki += `
h2. Test Results by Locale

`;

(reportData.tests || []).forEach((test, i) => {
  const p = test.results.passed || 0;
  const f = test.results.failed || 0;
  const s = test.results.skipped || 0;
  
  wiki += `{expand:${test.testName} - ${test.locale} | (/) ${p} ${f > 0 ? `(x) ${f}` : ''} ${s > 0 ? `(!) ${s}` : ''}}
||Page||Status||Links||Match %||CaaS||Notes||
`;
  
  (test.pages || []).forEach(pg => {
    const links = pg.links?.total || '-';
    const match = pg.links?.matchedPercentage || '-';
    const caas = pg.hasCaaS ? pg.cardCount : '-';
    let notes = '';
    if (pg.links?.badLinks?.length > 0) {
      notes = `(*) ${pg.links.badLinks.length} bad`;
    } else if (pg.linkValidation?.violations?.length > 0) {
      notes = `(!) ${pg.linkValidation.violations.length} violations`;
    } else if (pg.status === 'skipped') {
      notes = pg.reason || 'skipped';
    }
    
    const statusIcon = pg.status === 'passed' ? '(/)' : pg.status === 'skipped' ? '(!)' : pg.status === 'warning' ? '(!)' : '(x)';
    wiki += `|${pg.name}|${statusIcon}|${links}|${match}|${caas}|${notes}|\n`;
  });
  
  wiki += `{expand}

`;
});

// Feature Coverage
wiki += `h2. Feature Coverage

||Feature||Covered||
|Site Mapping|(/)|
|Link Transformation|(/)|
|Query Index|(/)|
|Preview Index|(/) (stage)|
|Dynamic Fragments|(/) (lingo-roc.test.js)|
|CaaS|(/)|
|Akamai Rules|(/) (locale-404-fallback.test.js)|
|Language Selector|(x)|
|Language Banner|(x)|
|SEO (hreflang)|(x)|

----
_Report generated by Nala Lingo Test Suite_
`;

fs.writeFileSync(OUTPUT_PATH, wiki);
console.log(`✓ Generated ${OUTPUT_PATH}`);
console.log(`\nHow to use in Confluence:`);
console.log(`  1. Edit your Confluence page`);
console.log(`  2. Click "Insert" → "Markup" (or press Ctrl+Shift+D)`);
console.log(`  3. Select "Confluence Wiki" from dropdown`);
console.log(`  4. Paste the contents of lingo-report-confluence.txt`);
console.log(`  5. Click "Insert"`);
