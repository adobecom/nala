#!/usr/bin/env node
/**
 * Generate Markdown report from locale-404-test-results.json
 * Usage: node scripts/generate-locale-404-report-md.js [--env=prod|stage]
 */

const fs = require('fs');
const path = require('path');

const RESULTS_DIR = path.join(__dirname, '..', 'results');
const JSON_PATH = path.join(RESULTS_DIR, 'locale-404-test-results.json');
const MD_PATH = path.join(RESULTS_DIR, 'locale-404-fallback-report.md');

// Environment URLs
const ENVIRONMENTS = {
  stage: 'business.stage.adobe.com',
  prod: 'business.adobe.com',
};

// Read JSON data
let reportData;
try {
  reportData = JSON.parse(fs.readFileSync(JSON_PATH, 'utf-8'));
  console.log('✓ Loaded locale-404-test-results.json');
} catch (error) {
  console.error('✗ Failed to load JSON:', error.message);
  process.exit(1);
}

/**
 * Detect environment from test results or CLI args
 */
function detectEnvironment() {
  // Check CLI args first (e.g., --env=prod)
  const envArg = process.argv.find((arg) => arg.startsWith('--env='));
  if (envArg) {
    const env = envArg.split('=')[1];
    if (ENVIRONMENTS[env]) {
      return ENVIRONMENTS[env];
    }
  }

  // Try to detect from project name in results
  const config = reportData.config || {};
  const projects = config.projects || [];
  const projectName = projects[0]?.name || '';

  if (projectName.includes('prod')) {
    return ENVIRONMENTS.prod;
  }
  if (projectName.includes('stage')) {
    return ENVIRONMENTS.stage;
  }

  // Try to detect from test attachments or stdout
  const suites = reportData.suites?.[0]?.suites || [];
  for (const suite of suites) {
    for (const spec of suite.specs || []) {
      const test = spec.tests?.[0];
      const result = test?.results?.[0];
      const stdout = result?.stdout || [];

      for (const output of stdout) {
        if (typeof output === 'string') {
          if (output.includes('business.adobe.com') && !output.includes('stage')) {
            return ENVIRONMENTS.prod;
          }
          if (output.includes('business.stage.adobe.com')) {
            return ENVIRONMENTS.stage;
          }
        }
      }
    }
  }

  // Default to stage
  return ENVIRONMENTS.stage;
}

const environment = detectEnvironment();
console.log(`✓ Environment: ${environment}`);

// Parse test results
const suites = reportData.suites?.[0]?.suites || [];
let totalTests = 0;
let passedTests = 0;
let failedTests = 0;
let totalDuration = 0;

const categories = [];

suites.forEach((suite) => {
  const category = {
    name: suite.title,
    tests: [],
    passed: 0,
    failed: 0,
  };

  (suite.specs || []).forEach((spec) => {
    const test = spec.tests?.[0];
    const result = test?.results?.[0];
    const status = result?.status || 'unknown';
    const duration = result?.duration || 0;

    totalTests += 1;
    totalDuration += duration;

    if (status === 'passed') {
      passedTests += 1;
      category.passed += 1;
    } else {
      failedTests += 1;
      category.failed += 1;
    }

    // Parse locale and base site from title
    const match = spec.title.match(/(\/.+?) -> (.+?) \|/);
    const locale = match?.[1] || '';
    const baseSite = match?.[2] || '';

    category.tests.push({
      title: spec.title,
      locale,
      baseSite,
      status,
      duration,
      errors: result?.errors || [],
    });
  });

  if (category.tests.length > 0) {
    categories.push(category);
  }
});

const passRate = totalTests > 0 ? ((passedTests / totalTests) * 100).toFixed(1) : 0;
const avgDuration = totalTests > 0 ? (totalDuration / totalTests).toFixed(0) : 0;

// Generate Markdown
let md = `# 🔄 Locale 404 Fallback Test Report

> **Generated:** ${new Date().toLocaleString()}  
> **Environment:** \`${environment}\`

---

## 📊 Summary

| Metric | Value |
|--------|-------|
| **Total Tests** | ${totalTests} |
| **Passed** | ✅ ${passedTests} (${passRate}%) |
| **Failed** | ❌ ${failedTests} |
| **Avg Duration** | ${avgDuration}ms |
| **Total Duration** | ${(totalDuration / 1000).toFixed(1)}s |

---

## 📋 Test Categories

`;

// Category summaries
categories.forEach((cat, i) => {
  const icon = cat.failed === 0 ? '✅' : '❌';
  md += `### ${i + 1}. ${cat.name} — ${cat.tests.length} Tests ${icon}

`;

  // Group by base site
  const byBaseSite = {};
  cat.tests.forEach((t) => {
    if (!byBaseSite[t.baseSite]) {
      byBaseSite[t.baseSite] = [];
    }
    byBaseSite[t.baseSite].push(t);
  });

  md += `| Locale | Base Site | Status | Duration |
|--------|-----------|--------|----------|
`;

  cat.tests.forEach((t) => {
    const statusIcon = t.status === 'passed' ? '✅' : '❌';
    md += `| \`${t.locale}\` | \`${t.baseSite}\` | ${statusIcon} | ${t.duration}ms |\n`;
  });

  md += '\n';
});

// Failed tests detail
if (failedTests > 0) {
  md += `---

## ❌ Failed Tests

`;
  categories.forEach((cat) => {
    cat.tests.filter((t) => t.status !== 'passed').forEach((t) => {
      md += `### ${t.locale} → ${t.baseSite}

**Title:** ${t.title}

`;
      if (t.errors.length > 0) {
        md += `**Errors:**
\`\`\`
${t.errors.map((e) => e.message || JSON.stringify(e)).join('\n')}
\`\`\`

`;
      }
    });
  });
}

// Fallback rules summary
md += `---

## 📚 Fallback Rules Reference

| Base Site | Regional Locales |
|-----------|------------------|
| \`/\` (Root) | ae_en, africa, be_en, bg, ca, cn, cz, dk, ee, fi, gr_en, hk_en... (34 locales) |
| \`/de\` (German) | at, ch_de, lu_de |
| \`/es\` (Spanish) | ar, cl, co, la, mx, pe |
| \`/fr\` (French) | be_fr, ca_fr, ch_fr, lu_fr |
| \`/it\` (Italian) | ch_it |
| \`/pt\` (Portuguese) | br |

---

## 🔗 Related Tests

| Test File | Description |
|-----------|-------------|
| \`lingo.test.js\` | Link transformation & CaaS detection |
| \`lingo-roc.test.js\` | Dynamic fragments (ROC) |
| \`locale-404-fallback.test.js\` | This test - Akamai 404 rules |

---

*Report generated by Nala Locale 404 Test Suite*
`;

fs.writeFileSync(MD_PATH, md);
console.log(`✓ Generated ${MD_PATH}`);
console.log(`\n📊 Results: ${passedTests}/${totalTests} passed (${passRate}%)`);
