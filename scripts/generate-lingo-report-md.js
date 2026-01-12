#!/usr/bin/env node
/**
 * Generate Markdown report from lingo-detailed-report.json
 * Wiki-friendly format with collapsible sections
 * Usage: node scripts/generate-lingo-report-md.js
 */

const fs = require('fs');
const path = require('path');

const RESULTS_DIR = path.join(__dirname, '..', 'results');
const JSON_PATH = path.join(RESULTS_DIR, 'lingo-detailed-report.json');
const MD_PATH = path.join(RESULTS_DIR, 'lingo-report.md');

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

// Generate Markdown
let md = `# 🔗 BACOM Lingo Test Report

> **Generated:** ${new Date(reportData.timestamp).toLocaleString()}

---

## 📊 Summary

| Metric | Value |
|--------|-------|
| **Total Tests** | ${summary.totalTests} |
| **Tests Passed** | ✅ ${summary.passed} |
| **Tests Failed** | ❌ ${summary.failed} |
| **Total Pages** | ${summary.totalPages} |
| **Pages Passed** | ✅ ${summary.passedPages} (${passRate}%) |
| **Pages Skipped** | ⏭️ ${summary.skippedPages} |
| **Pages with CaaS** | 🎴 ${pagesWithCaaS} |
| **CaaS Cards** | ${totalCaaSCards.toLocaleString()} |
| **Links Analyzed** | 🔗 ${totalLinks.toLocaleString()} |
| **Correct Fallbacks** | ✅ ${totalCorrectFallbacks.toLocaleString()} |
| **Violations Found** | ⚠️ ${totalViolations} |
| **Pages Redirected** | 🔄 ${pagesRedirected} |
${allBadLinks.length > 0 ? `| **🚨 Bad Links** | **${allBadLinks.length}** |` : ''}
${allUnexpectedLocales.length > 0 ? `| **⚠️ Unexpected Locales** | **${allUnexpectedLocales.length} pages** |` : ''}

---

`;

// Bad Links Section
if (allBadLinks.length > 0) {
  md += `## 🚨 BAD LINKS - Staging URLs Found (${allBadLinks.length} total)

> **⚠️ CRITICAL:** These links point to staging/preview URLs that should NOT appear on production pages!

| Locale | Page | Location | Link Text | Bad URL | Issue |
|--------|------|----------|-----------|---------|-------|
`;
  allBadLinks.forEach(bl => {
    const text = (bl.text || '(no text)').substring(0, 30);
    const href = bl.href.length > 60 ? bl.href.substring(0, 60) + '...' : bl.href;
    md += `| \`${bl.locale}\` | ${bl.pageName} | ${bl.location} | ${text} | \`${href}\` | ${bl.issue} |\n`;
  });
  md += '\n---\n\n';
}

// Violations Section
if (totalViolations > 0) {
  md += `## ⚠️ Link Transformation Violations (${totalViolations} total)

> These links point to the BASE locale when the regional page EXISTS in the Query Index.

| Locale | Page | Link Path | Should Be | Issue |
|--------|------|-----------|-----------|-------|
`;
  allViolations.slice(0, 50).forEach(v => {
    md += `| \`${v.locale}\` | ${v.pageName} | \`${v.pagePath || ''}\` | \`${v.regionalPath || ''}\` | ${v.issue || ''} |\n`;
  });
  if (allViolations.length > 50) {
    md += `\n*... and ${allViolations.length - 50} more violations*\n`;
  }
  md += '\n---\n\n';
}

// Unexpected Locales Section
if (allUnexpectedLocales.length > 0) {
  md += `## ⚠️ Unexpected Locale Links (${allUnexpectedLocales.length} pages affected)

> These pages contain links pointing to unexpected locales (content issue).

| Locale | Page | Issue | Unexpected Locales |
|--------|------|-------|-------------------|
`;
  allUnexpectedLocales.forEach(item => {
    const locales = (item.locales || []).map(l => `\`/${l.locale}\`: ${l.count}`).join(', ');
    md += `| \`${item.locale}\` | ${item.pageName} | ${item.issue || ''} | ${locales} |\n`;
  });
  md += '\n---\n\n';
}

// Skipped Pages Section
if (allSkipped.length > 0) {
  md += `## ⏭️ Skipped Pages (${allSkipped.length} total)

| Locale | Page | Reason |
|--------|------|--------|
`;
  allSkipped.forEach(s => {
    md += `| \`${s.locale}\` | ${s.pageName} | ${s.reason} |\n`;
  });
  md += '\n---\n\n';
}

// Link Transformation Rules
md += `## 📋 Link Transformation Rules

`;
Object.entries(reportData.rules || {}).forEach(([key, rule]) => {
  const locales = rule.locales.slice(0, 10).map(l => `\`${l}\``).join(', ');
  const more = rule.locales.length > 10 ? ` +${rule.locales.length - 10} more` : '';
  md += `### ${key}

> ${rule.description}

**Locales:** ${locales}${more}

`;
});

md += `---

## 🔄 404 Fallback Rules

`;
Object.entries(reportData.fallbackRules || {}).forEach(([key, rule]) => {
  const locales = rule.locales.slice(0, 8).map(l => `\`/${l}\``).join(', ');
  const more = rule.locales.length > 8 ? ` +${rule.locales.length - 8} more` : '';
  md += `- **${key}** → \`${rule.fallbackTo}\`: ${locales}${more}\n`;
});

md += `
---

## 🧪 Test Results

`;

// Test Results with collapsible sections
(reportData.tests || []).forEach((test, i) => {
  const p = test.results.passed || 0;
  const f = test.results.failed || 0;
  const s = test.results.skipped || 0;
  
  md += `<details>
<summary><strong>${test.testName}</strong> - ${test.ruleType} ${test.locale} | ✅ ${p} ${f > 0 ? `❌ ${f}` : ''} ${s > 0 ? `⏭️ ${s}` : ''}</summary>

| Page | Status | Links | Match % | CaaS | Notes |
|------|--------|-------|---------|------|-------|
`;
  
  (test.pages || []).forEach(pg => {
    const links = pg.links?.total || '-';
    const match = pg.links?.matchedPercentage || '-';
    const caas = pg.hasCaaS ? `🎴 ${pg.cardCount}` : '-';
    let notes = '';
    if (pg.links?.badLinks?.length > 0) {
      notes = `🚨 ${pg.links.badLinks.length} bad links`;
    } else if (pg.linkValidation?.violations?.length > 0) {
      notes = `⚠️ ${pg.linkValidation.violations.length} violations`;
    } else if (pg.status === 'skipped') {
      notes = pg.reason || 'skipped';
    }
    
    const statusIcon = pg.status === 'passed' ? '✅' : pg.status === 'skipped' ? '⏭️' : pg.status === 'warning' ? '⚠️' : '❌';
    md += `| ${pg.name} | ${statusIcon} | ${links} | ${match} | ${caas} | ${notes} |\n`;
  });
  
  md += `
</details>

`;
});

md += `---

## 📚 Feature Coverage

| Feature | Covered |
|---------|---------|
| Site Mapping | ✅ |
| Link Transformation | ✅ |
| Query Index | ✅ |
| Preview Index | ✅ (stage) |
| Dynamic Fragments | ✅ (lingo-roc.test.js) |
| CaaS | ✅ |
| Akamai Rules | ✅ (locale-404-fallback.test.js) |
| Language Selector | ❌ |
| Language Banner | ❌ |
| SEO (hreflang) | ❌ |

---

*Report generated by Nala Lingo Test Suite*
`;

fs.writeFileSync(MD_PATH, md);
console.log(`✓ Generated ${MD_PATH}`);
console.log(`\nView the report:`);
console.log(`  cat ${MD_PATH}`);
