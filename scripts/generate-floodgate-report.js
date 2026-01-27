#!/usr/bin/env node
/**
 * Generate Beautiful Floodgate Test Summary Report
 * 
 * Usage:
 *   node scripts/generate-floodgate-report.js [--env=stage|prod]
 *   
 *   Or use environment variable:
 *   FG_ENV=prod node scripts/generate-floodgate-report.js
 *   
 * Output:
 *   - Console: Colorful summary
 *   - File: results/floodgate-report.md (Markdown)
 *   - File: results/floodgate-report.html (HTML)
 *   - File: results/floodgate-report-confluence.html (Confluence Cloud)
 *   - File: results/floodgate-report-confluence.txt (Confluence Wiki)
 */

const fs = require('fs');
const path = require('path');

// Parse command line arguments
const args = process.argv.slice(2);
let cliEnv = null;
args.forEach(arg => {
  if (arg.startsWith('--env=')) {
    cliEnv = arg.split('=')[1];
  }
});

// Environment: CLI arg > env var > default
const TEST_ENV = cliEnv || process.env.FG_ENV || 'stage';

// ANSI color codes for console output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  dim: '\x1b[2m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
  magenta: '\x1b[35m',
  white: '\x1b[37m',
  bgGreen: '\x1b[42m',
  bgRed: '\x1b[41m',
  bgYellow: '\x1b[43m',
  bgBlue: '\x1b[44m',
};

// Read JSON results
function readResults() {
  const jsonPath = path.join(__dirname, '../test-json-results/floodgate-results.json');
  
  if (!fs.existsSync(jsonPath)) {
    console.error(`${colors.red}Error: No test results found at ${jsonPath}${colors.reset}`);
    console.log(`${colors.yellow}Run tests first: npx playwright test --config=configs/floodgate.config.js${colors.reset}`);
    process.exit(1);
  }
  
  return JSON.parse(fs.readFileSync(jsonPath, 'utf-8'));
}

// Parse test results
function parseResults(data) {
  const suites = data.suites || [];
  const tests = [];
  
  function extractTests(suite, parentTitle = '') {
    const fullTitle = parentTitle ? `${parentTitle} > ${suite.title}` : suite.title;
    
    if (suite.specs) {
      suite.specs.forEach(spec => {
        spec.tests.forEach(test => {
          const result = test.results[test.results.length - 1] || {};
          // Extract stdout (console logs) - each entry is an object with 'text' property
          const stdoutArr = result.stdout || [];
          const stderrArr = result.stderr || [];
          const attachments = result.attachments || [];
          
          // Combine all stdout text entries
          const stdoutText = stdoutArr
            .map(s => (typeof s === 'object' && s.text) ? s.text : (typeof s === 'string' ? s : ''))
            .join('');
          const stderrText = stderrArr
            .map(s => (typeof s === 'object' && s.text) ? s.text : (typeof s === 'string' ? s : ''))
            .join('');
          
          tests.push({
            title: spec.title,
            suite: fullTitle,
            status: result.status || 'unknown',
            duration: result.duration || 0,
            error: result.error?.message || null,
            errorStack: result.error?.stack || null,
            stdout: stdoutText,
            stderr: stderrText,
            attachments: attachments,
          });
        });
      });
    }
    
    if (suite.suites) {
      suite.suites.forEach(s => extractTests(s, fullTitle));
    }
  }
  
  suites.forEach(s => extractTests(s));
  return tests;
}

// Categorize tests by phase
function categorizeTests(tests) {
  const categories = {
    'Phase A: Before Event': [],
    'Phase B: During Event': [],
    'Phase C: After Event': [],
    'Phase D: Edge Cases': [],
    'Security Tests': [],
    'Cache Tests': [],
    'Localization Tests': [],
    'Performance Tests': [],
    'Other': [],
  };
  
  tests.forEach(test => {
    if (test.suite.includes('Before Event')) {
      categories['Phase A: Before Event'].push(test);
    } else if (test.suite.includes('During Event')) {
      categories['Phase B: During Event'].push(test);
    } else if (test.suite.includes('After Event')) {
      categories['Phase C: After Event'].push(test);
    } else if (test.suite.includes('Edge Cases')) {
      categories['Phase D: Edge Cases'].push(test);
    } else if (test.suite.includes('Security')) {
      categories['Security Tests'].push(test);
    } else if (test.suite.includes('Cach')) {
      categories['Cache Tests'].push(test);
    } else if (test.suite.includes('Local')) {
      categories['Localization Tests'].push(test);
    } else if (test.suite.includes('Performance')) {
      categories['Performance Tests'].push(test);
    } else {
      categories['Other'].push(test);
    }
  });
  
  return categories;
}

// Generate console report
function printConsoleReport(tests, categories) {
  const passed = tests.filter(t => t.status === 'passed').length;
  const failed = tests.filter(t => t.status === 'failed').length;
  const skipped = tests.filter(t => t.status === 'skipped').length;
  const total = tests.length;
  const passRate = total > 0 ? ((passed / total) * 100).toFixed(1) : 0;
  const totalDuration = tests.reduce((sum, t) => sum + t.duration, 0);
  
  console.log('\n');
  console.log(`${colors.bright}${colors.cyan}╔════════════════════════════════════════════════════════════════════╗${colors.reset}`);
  console.log(`${colors.bright}${colors.cyan}║${colors.reset}        ${colors.bright}🚀 FLOODGATE TEST SUMMARY REPORT 🚀${colors.reset}                      ${colors.cyan}║${colors.reset}`);
  console.log(`${colors.bright}${colors.cyan}╚════════════════════════════════════════════════════════════════════╝${colors.reset}`);
  console.log('');
  
  // Overall stats
  console.log(`${colors.bright}📊 OVERALL RESULTS${colors.reset}`);
  console.log(`${'─'.repeat(50)}`);
  
  const passColor = passRate >= 80 ? colors.green : passRate >= 50 ? colors.yellow : colors.red;
  console.log(`   Total Tests:  ${colors.bright}${total}${colors.reset}`);
  console.log(`   ✅ Passed:    ${colors.green}${passed}${colors.reset} (${passColor}${passRate}%${colors.reset})`);
  console.log(`   ❌ Failed:    ${colors.red}${failed}${colors.reset}`);
  console.log(`   ⏭️  Skipped:   ${colors.yellow}${skipped}${colors.reset}`);
  console.log(`   ⏱️  Duration:  ${colors.dim}${(totalDuration / 1000).toFixed(1)}s${colors.reset}`);
  console.log('');
  
  // Progress bar
  const barWidth = 40;
  const passedBar = Math.round((passed / total) * barWidth);
  const failedBar = Math.round((failed / total) * barWidth);
  const skippedBar = barWidth - passedBar - failedBar;
  
  console.log(`   [${'█'.repeat(passedBar)}${'█'.repeat(failedBar)}${'░'.repeat(Math.max(0, skippedBar))}]`
    .replace(/█/g, `${colors.green}█${colors.reset}`)
    .replace(/█/g, (match, offset) => offset < passedBar ? match : `${colors.red}█${colors.reset}`));
  console.log('');
  
  // By category
  console.log(`${colors.bright}📋 RESULTS BY PHASE${colors.reset}`);
  console.log(`${'─'.repeat(50)}`);
  
  Object.entries(categories).forEach(([category, catTests]) => {
    if (catTests.length === 0) return;
    
    const catPassed = catTests.filter(t => t.status === 'passed').length;
    const catFailed = catTests.filter(t => t.status === 'failed').length;
    const icon = catFailed === 0 ? '✅' : '❌';
    
    console.log(`   ${icon} ${category}`);
    console.log(`      ${colors.green}${catPassed} passed${colors.reset} / ${colors.red}${catFailed} failed${colors.reset} / ${catTests.length} total`);
  });
  console.log('');
  
  // Failed tests details
  const failedTests = tests.filter(t => t.status === 'failed');
  if (failedTests.length > 0) {
    console.log(`${colors.bright}${colors.red}❌ FAILED TESTS${colors.reset}`);
    console.log(`${'─'.repeat(50)}`);
    
    failedTests.forEach(test => {
      console.log(`   ${colors.red}✗${colors.reset} ${test.title}`);
      if (test.error) {
        console.log(`     ${colors.dim}${test.error.split('\n')[0]}${colors.reset}`);
      }
    });
    console.log('');
  }
  
  // Test list
  console.log(`${colors.bright}📝 ALL TESTS${colors.reset}`);
  console.log(`${'─'.repeat(50)}`);
  
  tests.forEach(test => {
    const icon = test.status === 'passed' ? `${colors.green}✓${colors.reset}` : 
                 test.status === 'failed' ? `${colors.red}✗${colors.reset}` : 
                 `${colors.yellow}○${colors.reset}`;
    const duration = `${colors.dim}(${(test.duration / 1000).toFixed(1)}s)${colors.reset}`;
    console.log(`   ${icon} ${test.title} ${duration}`);
  });
  
  console.log('\n');
  console.log(`${colors.cyan}═════════════════════════════════════════════════════════════════════${colors.reset}`);
  console.log(`${colors.dim}Report generated: ${new Date().toLocaleString()}${colors.reset}`);
  console.log(`${colors.cyan}═════════════════════════════════════════════════════════════════════${colors.reset}`);
  console.log('\n');
}

// Generate Markdown report
function generateMarkdownReport(tests, categories) {
  const passed = tests.filter(t => t.status === 'passed').length;
  const failed = tests.filter(t => t.status === 'failed').length;
  const skipped = tests.filter(t => t.status === 'skipped').length;
  const total = tests.length;
  const passRate = total > 0 ? ((passed / total) * 100).toFixed(1) : 0;
  const totalDuration = tests.reduce((sum, t) => sum + t.duration, 0);
  
  let md = `# 🚀 Floodgate Test Summary Report

**Generated:** ${new Date().toLocaleString()}  
**Environment:** Stage (business.stage.adobe.com)

---

## 📊 Overall Results

| Metric | Value |
|--------|-------|
| **Total Tests** | ${total} |
| **✅ Passed** | ${passed} (${passRate}%) |
| **❌ Failed** | ${failed} |
| **⏭️ Skipped** | ${skipped} |
| **⏱️ Duration** | ${(totalDuration / 1000).toFixed(1)}s |

### Pass Rate: ${passRate >= 80 ? '🟢' : passRate >= 50 ? '🟡' : '🔴'} ${passRate}%

---

## 📋 Results by Phase

`;

  Object.entries(categories).forEach(([category, catTests]) => {
    if (catTests.length === 0) return;
    
    const catPassed = catTests.filter(t => t.status === 'passed').length;
    const catFailed = catTests.filter(t => t.status === 'failed').length;
    const icon = catFailed === 0 ? '✅' : '❌';
    
    md += `### ${icon} ${category}\n\n`;
    md += `| Test | Status | Duration |\n`;
    md += `|------|--------|----------|\n`;
    
    catTests.forEach(test => {
      const statusIcon = test.status === 'passed' ? '✅' : test.status === 'failed' ? '❌' : '⏭️';
      const duration = `${(test.duration / 1000).toFixed(1)}s`;
      md += `| ${test.title} | ${statusIcon} ${test.status} | ${duration} |\n`;
    });
    
    md += `\n**Summary:** ${catPassed}/${catTests.length} passed\n\n`;
  });
  
  // Failed tests
  const failedTests = tests.filter(t => t.status === 'failed');
  if (failedTests.length > 0) {
    md += `---\n\n## ❌ Failed Tests Details\n\n`;
    
    failedTests.forEach(test => {
      md += `### ${test.title}\n\n`;
      md += `- **Suite:** ${test.suite}\n`;
      md += `- **Duration:** ${(test.duration / 1000).toFixed(1)}s\n`;
      if (test.error) {
        md += `- **Error:**\n\`\`\`\n${test.error}\n\`\`\`\n`;
      }
      md += '\n';
    });
  }
  
  md += `---\n\n## 🔗 Quick Links\n\n`;
  md += `- [HTML Report](../test-html-results/floodgate/index.html)\n`;
  md += `- [JSON Results](../test-json-results/floodgate-results.json)\n`;
  md += `- [Test Plan](../docs/floodgate/FLOODGATE-TEST-PLAN.md)\n`;
  
  return md;
}

// Escape HTML special characters
function escapeHtml(text) {
  if (!text) return '';
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// Format console logs for Confluence (simple, no spans)
function formatConsoleLogsSimple(logs) {
  if (!logs) return '';
  return escapeHtml(logs);
}

// Format console logs with syntax highlighting
function formatConsoleLogs(logs) {
  if (!logs) return '';
  
  return escapeHtml(logs)
    // Highlight [FG] tags
    .replace(/\[FG\]/g, '<span class="log-info">[FG]</span>')
    .replace(/\[Test\]/g, '<span class="log-info">[Test]</span>')
    .replace(/\[User\]/g, '<span class="log-info">[User]</span>')
    .replace(/\[Perf\]/g, '<span class="log-info">[Perf]</span>')
    .replace(/\[Cache\]/g, '<span class="log-info">[Cache]</span>')
    .replace(/\[Locale\]/g, '<span class="log-info">[Locale]</span>')
    .replace(/\[SECURITY\]/g, '<span class="log-warning">[SECURITY]</span>')
    // Highlight success markers
    .replace(/✓/g, '<span class="log-success">✓</span>')
    .replace(/PASS/g, '<span class="log-success">PASS</span>')
    // Highlight warnings/errors
    .replace(/⚠/g, '<span class="log-warning">⚠</span>')
    .replace(/✗/g, '<span class="log-error">✗</span>')
    .replace(/FAIL/g, '<span class="log-error">FAIL</span>')
    // Highlight headers (=== ... ===)
    .replace(/===([^=]+)===/g, '<span class="log-header">===$1===</span>')
    // Highlight separators
    .replace(/(─+|═+)/g, '<span class="log-separator">$1</span>')
    // Highlight URLs
    .replace(/(https?:\/\/[^\s]+)/g, '<span class="log-info">$1</span>')
    // Highlight cookie values
    .replace(/(fg_acom_stg|fg_acom|aux_sid):/g, '<span class="log-info">$1:</span>')
    .replace(/(x-adobe-content):/g, '<span class="log-info">$1:</span>');
}

// Generate HTML report
function generateHtmlReport(tests, categories) {
  const passed = tests.filter(t => t.status === 'passed').length;
  const failed = tests.filter(t => t.status === 'failed').length;
  const skipped = tests.filter(t => t.status === 'skipped').length;
  const total = tests.length;
  const passRate = total > 0 ? ((passed / total) * 100).toFixed(1) : 0;
  const totalDuration = tests.reduce((sum, t) => sum + t.duration, 0);
  
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Floodgate Test Report</title>
  <style>
    :root {
      --bg-primary: #0d1117;
      --bg-secondary: #161b22;
      --bg-card: #21262d;
      --text-primary: #f0f6fc;
      --text-secondary: #8b949e;
      --accent-green: #3fb950;
      --accent-red: #f85149;
      --accent-yellow: #d29922;
      --accent-blue: #58a6ff;
      --accent-purple: #a371f7;
      --border: #30363d;
    }
    
    * { box-sizing: border-box; margin: 0; padding: 0; }
    
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif;
      background: var(--bg-primary);
      color: var(--text-primary);
      line-height: 1.6;
      padding: 2rem;
    }
    
    .container { max-width: 1200px; margin: 0 auto; }
    
    h1 {
      font-size: 2.5rem;
      margin-bottom: 0.5rem;
      background: linear-gradient(135deg, var(--accent-blue), var(--accent-purple));
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    
    .subtitle { color: var(--text-secondary); margin-bottom: 2rem; }
    
    .stats-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 1rem;
      margin-bottom: 2rem;
    }
    
    .stat-card {
      background: var(--bg-card);
      border: 1px solid var(--border);
      border-radius: 12px;
      padding: 1.5rem;
      text-align: center;
    }
    
    .stat-value {
      font-size: 2.5rem;
      font-weight: bold;
    }
    
    .stat-label { color: var(--text-secondary); font-size: 0.9rem; }
    
    .passed { color: var(--accent-green); }
    .failed { color: var(--accent-red); }
    .skipped { color: var(--accent-yellow); }
    
    .progress-bar {
      height: 12px;
      background: var(--bg-card);
      border-radius: 6px;
      overflow: hidden;
      margin: 2rem 0;
    }
    
    .progress-fill {
      height: 100%;
      background: linear-gradient(90deg, var(--accent-green) 0%, var(--accent-green) ${passRate}%, var(--accent-red) ${passRate}%, var(--accent-red) 100%);
      transition: width 0.5s ease;
    }
    
    .section {
      background: var(--bg-secondary);
      border: 1px solid var(--border);
      border-radius: 12px;
      padding: 1.5rem;
      margin-bottom: 1.5rem;
    }
    
    .section h2 {
      font-size: 1.3rem;
      margin-bottom: 1rem;
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }
    
    table {
      width: 100%;
      border-collapse: collapse;
    }
    
    th, td {
      padding: 0.75rem;
      text-align: left;
      border-bottom: 1px solid var(--border);
    }
    
    th {
      color: var(--text-secondary);
      font-weight: 500;
      font-size: 0.85rem;
      text-transform: uppercase;
    }
    
    tr:hover { background: var(--bg-card); }
    
    .status-badge {
      display: inline-flex;
      align-items: center;
      gap: 0.25rem;
      padding: 0.25rem 0.75rem;
      border-radius: 20px;
      font-size: 0.85rem;
      font-weight: 500;
    }
    
    .status-passed { background: rgba(63, 185, 80, 0.15); color: var(--accent-green); }
    .status-failed { background: rgba(248, 81, 73, 0.15); color: var(--accent-red); }
    .status-skipped { background: rgba(210, 153, 34, 0.15); color: var(--accent-yellow); }
    
    .duration { color: var(--text-secondary); font-size: 0.9rem; }
    
    .test-row { cursor: pointer; }
    .test-row:hover { background: var(--bg-card); }
    
    .test-details {
      display: none;
      background: var(--bg-primary);
      border-top: 1px solid var(--border);
    }
    
    .test-details.expanded { display: table-row; }
    
    .test-details td {
      padding: 1rem;
    }
    
    .console-output {
      background: #0d1117;
      border: 1px solid var(--border);
      border-radius: 8px;
      padding: 1rem;
      font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
      font-size: 0.85rem;
      white-space: pre-wrap;
      word-break: break-word;
      max-height: 400px;
      overflow-y: auto;
      color: var(--text-secondary);
    }
    
    .console-output .log-info { color: #58a6ff; }
    .console-output .log-success { color: #3fb950; }
    .console-output .log-warning { color: #d29922; }
    .console-output .log-error { color: #f85149; }
    .console-output .log-header { color: #a371f7; font-weight: bold; }
    .console-output .log-separator { color: #30363d; }
    
    .expand-icon {
      display: inline-block;
      width: 20px;
      transition: transform 0.2s;
    }
    
    .test-row.expanded .expand-icon { transform: rotate(90deg); }
    
    .details-header {
      display: flex;
      gap: 1rem;
      margin-bottom: 0.5rem;
      font-size: 0.85rem;
      color: var(--text-secondary);
    }
    
    .details-header span {
      display: flex;
      align-items: center;
      gap: 0.25rem;
    }
    
    .error-box {
      background: rgba(248, 81, 73, 0.1);
      border: 1px solid var(--accent-red);
      border-radius: 8px;
      padding: 1rem;
      margin-bottom: 1rem;
      color: var(--accent-red);
      font-family: monospace;
      font-size: 0.85rem;
      white-space: pre-wrap;
    }
    
    footer {
      text-align: center;
      color: var(--text-secondary);
      margin-top: 2rem;
      padding-top: 2rem;
      border-top: 1px solid var(--border);
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>🚀 Floodgate Test Report</h1>
    <p class="subtitle">Generated: ${new Date().toLocaleString()} | Environment: Stage</p>
    
    <div class="stats-grid">
      <div class="stat-card">
        <div class="stat-value">${total}</div>
        <div class="stat-label">Total Tests</div>
      </div>
      <div class="stat-card">
        <div class="stat-value passed">${passed}</div>
        <div class="stat-label">Passed</div>
      </div>
      <div class="stat-card">
        <div class="stat-value failed">${failed}</div>
        <div class="stat-label">Failed</div>
      </div>
      <div class="stat-card">
        <div class="stat-value">${passRate}%</div>
        <div class="stat-label">Pass Rate</div>
      </div>
      <div class="stat-card">
        <div class="stat-value">${(totalDuration / 1000).toFixed(1)}s</div>
        <div class="stat-label">Duration</div>
      </div>
    </div>
    
    <div class="progress-bar">
      <div class="progress-fill"></div>
    </div>
    
    ${Object.entries(categories).map(([category, catTests]) => {
      if (catTests.length === 0) return '';
      const catPassed = catTests.filter(t => t.status === 'passed').length;
      const catFailed = catTests.filter(t => t.status === 'failed').length;
      const icon = catFailed === 0 ? '✅' : '❌';
      
      return `
    <div class="section">
      <h2>${icon} ${category} (${catPassed}/${catTests.length})</h2>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>Test</th>
            <th>Status</th>
            <th>Duration</th>
          </tr>
        </thead>
        <tbody>
          ${catTests.map((test, idx) => {
            const testId = `${category.replace(/[^a-zA-Z]/g, '')}-${idx}`;
            const hasLogs = test.stdout || test.stderr || test.error;
            const formattedLogs = formatConsoleLogs(test.stdout || '');
            
            return `
          <tr class="test-row${hasLogs ? '' : ' no-logs'}" onclick="toggleDetails('${testId}')" id="row-${testId}">
            <td class="expand-icon">${hasLogs ? '▶' : ''}</td>
            <td>${test.title}</td>
            <td>
              <span class="status-badge status-${test.status}">
                ${test.status === 'passed' ? '✓' : test.status === 'failed' ? '✗' : '○'} ${test.status}
              </span>
            </td>
            <td class="duration">${(test.duration / 1000).toFixed(2)}s</td>
          </tr>
          <tr class="test-details" id="details-${testId}">
            <td colspan="4">
              <div class="details-header">
                <span>📁 ${test.suite}</span>
                <span>⏱️ ${(test.duration / 1000).toFixed(2)}s</span>
              </div>
              ${test.error ? `<div class="error-box">❌ Error:\n${escapeHtml(test.error)}${test.errorStack ? '\n\nStack:\n' + escapeHtml(test.errorStack) : ''}</div>` : ''}
              ${hasLogs ? `<div class="console-output">${formattedLogs || '<span class="log-info">No console output</span>'}</div>` : ''}
            </td>
          </tr>`;
          }).join('')}
        </tbody>
      </table>
    </div>`;
    }).join('')}
    
    <footer>
      <p>Summit 2026 Floodgate Migration Test Suite</p>
      <p>📄 <a href="../docs/floodgate/FLOODGATE-TEST-PLAN.md" style="color: var(--accent-blue)">Test Plan</a></p>
      <p style="margin-top: 1rem; font-size: 0.85rem;">💡 Click on any test row to see detailed console logs</p>
    </footer>
  </div>
  
  <script>
    function toggleDetails(testId) {
      const row = document.getElementById('row-' + testId);
      const details = document.getElementById('details-' + testId);
      
      if (row && details) {
        row.classList.toggle('expanded');
        details.classList.toggle('expanded');
      }
    }
    
    // Expand all failed tests by default
    document.addEventListener('DOMContentLoaded', function() {
      document.querySelectorAll('.status-failed').forEach(function(badge) {
        const row = badge.closest('.test-row');
        if (row) {
          const testId = row.id.replace('row-', '');
          toggleDetails(testId);
        }
      });
    });
  </script>
</body>
</html>`;
}

// Generate Confluence Wiki Format Report
function generateConfluenceReport(tests, categories) {
  const passed = tests.filter(t => t.status === 'passed').length;
  const failed = tests.filter(t => t.status === 'failed').length;
  const skipped = tests.filter(t => t.status === 'skipped').length;
  const total = tests.length;
  const passRate = total > 0 ? ((passed / total) * 100).toFixed(1) : 0;
  const totalDuration = tests.reduce((sum, t) => sum + t.duration, 0);
  const env = TEST_ENV;
  const baseUrl = env === 'prod' ? 'business.adobe.com' : 'business.stage.adobe.com';
  const cookieName = env === 'prod' ? 'fg_acom' : 'fg_acom_stg';
  
  // Pass rate emoji
  const passRateEmoji = passRate >= 80 ? '✅' : passRate >= 50 ? '⚠️' : '❌';
  
  let wiki = `h1. Floodgate Test Summary Report

h2. Test Run Information

*Generated:* ${new Date().toLocaleString()}
*Environment:* ${env.toUpperCase()} (${baseUrl})
*Cookie:* {{${cookieName}}}

----

h2. Overall Results

|| Metric || Value ||
| Total Tests | *${total}* |
| ✅ Passed | *${passed}* (${passRate}%) |
| ❌ Failed | *${failed}* |
| ⏭️ Skipped | *${skipped}* |
| ⏱️ Duration | ${(totalDuration / 1000).toFixed(1)}s |

*Pass Rate:* ${passRateEmoji} *${passRate}%*

----

h2. Results by Phase

`;

  // Results by category
  Object.entries(categories).forEach(([category, catTests]) => {
    if (catTests.length === 0) return;
    
    const catPassed = catTests.filter(t => t.status === 'passed').length;
    const catFailed = catTests.filter(t => t.status === 'failed').length;
    const icon = catFailed === 0 ? '✅' : '❌';
    
    wiki += `h3. ${icon} ${category}\n\n`;
    wiki += `|| Test ID || Test Name || Status || Duration ||\n`;
    
    catTests.forEach(test => {
      // Extract test ID from title (e.g., "BE-01: Anonymous User...")
      const testIdMatch = test.title.match(/^([A-Z]+-\d+):/);
      const testId = testIdMatch ? testIdMatch[1] : '-';
      const testName = test.title.replace(/^[A-Z]+-\d+:\s*/, '').split(' - ')[0];
      
      let statusIcon;
      if (test.status === 'passed') {
        statusIcon = '(/)';
      } else if (test.status === 'failed') {
        statusIcon = '(x)';
      } else {
        statusIcon = '(!)';
      }
      
      const duration = `${(test.duration / 1000).toFixed(1)}s`;
      wiki += `| ${testId} | ${testName} | ${statusIcon} ${test.status} | ${duration} |\n`;
    });
    
    wiki += `\n*Summary:* ${catPassed}/${catTests.length} passed\n\n`;
  });

  // Failed tests details
  const failedTests = tests.filter(t => t.status === 'failed');
  if (failedTests.length > 0) {
    wiki += `----\n\nh2. ❌ Failed Tests Details\n\n`;
    
    failedTests.forEach(test => {
      const testIdMatch = test.title.match(/^([A-Z]+-\d+):/);
      const testId = testIdMatch ? testIdMatch[1] : 'Unknown';
      
      wiki += `h3. ${testId}: ${test.title.replace(/^[A-Z]+-\d+:\s*/, '').split(' - ')[0]}\n\n`;
      wiki += `*Suite:* ${test.suite}\n`;
      wiki += `*Duration:* ${(test.duration / 1000).toFixed(1)}s\n\n`;
      if (test.error) {
        wiki += `*Error:*\n{code}\n${test.error}\n{code}\n\n`;
      }
    });
  }

  // Environment info
  wiki += `----\n\nh2. Environment Configuration\n\n`;
  wiki += `|| Setting || Value ||\n`;
  wiki += `| Environment | ${env.toUpperCase()} |\n`;
  wiki += `| Base URL | {{https://${baseUrl}}} |\n`;
  wiki += `| FG Cookie | {{${cookieName}}} |\n`;
  wiki += `| Test Page | {{${env === 'prod' ? '/summit/2026/faq.html' : '/summit/2026/sessions.html'}}} |\n`;
  wiki += `| Config JSON | [Link|https://${baseUrl}/.milo/pub/fg-edge-worker-config.json] |\n\n`;

  // Test execution commands
  wiki += `----\n\nh2. How to Run Tests\n\n`;
  wiki += `{code:language=bash}\n`;
  wiki += `# Run all tests on ${env}\n`;
  if (env === 'prod') {
    wiki += `FG_ENV=prod npx playwright test --config=configs/floodgate.config.js --project=floodgate-prod-chrome --headed\n\n`;
  } else {
    wiki += `npx playwright test --config=configs/floodgate.config.js --project=floodgate-stage-chrome --headed\n\n`;
  }
  wiki += `# Run specific test\n`;
  wiki += `npx playwright test --config=configs/floodgate.config.js --grep "BE-01" --headed\n`;
  wiki += `{code}\n\n`;

  // Quick links
  wiki += `----\n\nh2. Quick Reference\n\n`;
  wiki += `* [Timing Config (DA)|https://da.live/#/adobecom/da-bacom/.milo/pub]\n`;
  wiki += `* [Stage Config JSON|https://business.stage.adobe.com/.milo/pub/fg-edge-worker-config.json]\n`;
  wiki += `* [Prod Config JSON|https://business.adobe.com/.milo/pub/fg-edge-worker-config.json]\n\n`;

  // Test users
  wiki += `h3. Test Users\n\n`;
  wiki += `|| User Type || Email || Used For ||\n`;
  wiki += `| Allowlisted | {{vevent+registered@adobetest.com}} | BE-03, BE-04, BE-05, DE-02 |\n`;
  wiki += `| Non-Allowlisted | {{xiasun+nonAllowlisted@adobetest.com}} | BE-02 |\n`;
  wiki += `| Anonymous | N/A | BE-01, DE-01, AE-01 |\n\n`;

  // Footer
  wiki += `----\n\n`;
  wiki += `_This report was auto-generated by the Floodgate test automation suite._\n`;
  wiki += `_For questions, contact the QE team._\n`;

  return wiki;
}

// Generate Simple HTML for Confluence Cloud (paste directly)
function generateConfluenceHtml(tests, categories) {
  const passed = tests.filter(t => t.status === 'passed').length;
  const failed = tests.filter(t => t.status === 'failed').length;
  const skipped = tests.filter(t => t.status === 'skipped').length;
  const total = tests.length;
  const passRate = total > 0 ? ((passed / total) * 100).toFixed(1) : 0;
  const totalDuration = tests.reduce((sum, t) => sum + t.duration, 0);
  const env = TEST_ENV;
  const baseUrl = env === 'prod' ? 'business.adobe.com' : 'business.stage.adobe.com';
  const cookieName = env === 'prod' ? 'fg_acom' : 'fg_acom_stg';
  
  const passRateColor = passRate >= 80 ? '#36B37E' : passRate >= 50 ? '#FFAB00' : '#FF5630';
  
  let html = `<h1>🚀 Floodgate Test Summary Report</h1>

<p><strong>Generated:</strong> ${new Date().toLocaleString()}<br/>
<strong>Environment:</strong> ${env.toUpperCase()} (${baseUrl})<br/>
<strong>Cookie:</strong> <code>${cookieName}</code></p>

<hr/>

<h2>📊 Overall Results</h2>

<table>
<tr style="background-color:#f4f5f7"><th>Metric</th><th>Value</th></tr>
<tr><td>Total Tests</td><td><strong>${total}</strong></td></tr>
<tr><td>✅ Passed</td><td><strong style="color:#36B37E">${passed}</strong> (${passRate}%)</td></tr>
<tr><td>❌ Failed</td><td><strong style="color:#FF5630">${failed}</strong></td></tr>
<tr><td>⏭️ Skipped</td><td><strong style="color:#FFAB00">${skipped}</strong></td></tr>
<tr><td>⏱️ Duration</td><td>${(totalDuration / 1000).toFixed(1)}s</td></tr>
</table>

<p><strong>Pass Rate:</strong> <span style="background-color:${passRateColor};color:white;padding:2px 8px;border-radius:3px">${passRate}%</span></p>

<hr/>

<h2>📋 Results by Phase</h2>

`;

  // Results by category
  Object.entries(categories).forEach(([category, catTests]) => {
    if (catTests.length === 0) return;
    
    const catPassed = catTests.filter(t => t.status === 'passed').length;
    const catFailed = catTests.filter(t => t.status === 'failed').length;
    const icon = catFailed === 0 ? '✅' : '❌';
    
    html += `<h3>${icon} ${category}</h3>\n\n`;
    html += `<table>\n`;
    html += `<tr style="background-color:#f4f5f7"><th>Test ID</th><th>Test Name</th><th>Status</th><th>Duration</th></tr>\n`;
    
    catTests.forEach(test => {
      const testIdMatch = test.title.match(/^([A-Z]+-\d+):/);
      const testId = testIdMatch ? testIdMatch[1] : '-';
      const testName = test.title.replace(/^[A-Z]+-\d+:\s*/, '').split(' - ')[0];
      
      let statusBadge;
      if (test.status === 'passed') {
        statusBadge = '<span style="background-color:#36B37E;color:white;padding:2px 8px;border-radius:3px">✓ passed</span>';
      } else if (test.status === 'failed') {
        statusBadge = '<span style="background-color:#FF5630;color:white;padding:2px 8px;border-radius:3px">✗ failed</span>';
      } else {
        statusBadge = '<span style="background-color:#FFAB00;color:white;padding:2px 8px;border-radius:3px">○ skipped</span>';
      }
      
      const duration = `${(test.duration / 1000).toFixed(1)}s`;
      html += `<tr><td>${testId}</td><td>${testName}</td><td>${statusBadge}</td><td>${duration}</td></tr>\n`;
      
      // Add details row if there are logs or errors
      if (test.stdout || test.error) {
        html += `<tr><td colspan="4" style="background-color:#f9f9f9;padding:10px">\n`;
        html += `<details>\n`;
        html += `<summary style="cursor:pointer;font-weight:bold">📋 View Details for ${testId}</summary>\n`;
        
        if (test.error) {
          html += `<div style="margin-top:10px">\n`;
          html += `<strong style="color:#FF5630">❌ Error:</strong>\n`;
          html += `<pre style="background-color:#fff0f0;padding:10px;border-radius:3px;border:1px solid #FF5630;overflow-x:auto;white-space:pre-wrap">${escapeHtml(test.error)}</pre>\n`;
          html += `</div>\n`;
        }
        
        if (test.stdout) {
          html += `<div style="margin-top:10px">\n`;
          html += `<strong>📝 Console Output:</strong>\n`;
          html += `<pre style="background-color:#f4f5f7;padding:10px;border-radius:3px;overflow-x:auto;white-space:pre-wrap;max-height:400px;overflow-y:auto">${formatConsoleLogsSimple(test.stdout)}</pre>\n`;
          html += `</div>\n`;
        }
        
        html += `</details>\n`;
        html += `</td></tr>\n`;
      }
    });
    
    html += `</table>\n`;
    html += `<p><strong>Summary:</strong> ${catPassed}/${catTests.length} passed</p>\n\n`;
  });

  // Failed tests details
  const failedTests = tests.filter(t => t.status === 'failed');
  if (failedTests.length > 0) {
    html += `<hr/>\n\n<h2>❌ Failed Tests Details</h2>\n\n`;
    
    failedTests.forEach(test => {
      const testIdMatch = test.title.match(/^([A-Z]+-\d+):/);
      const testId = testIdMatch ? testIdMatch[1] : 'Unknown';
      
      html += `<h3>${testId}</h3>\n`;
      html += `<p><strong>Suite:</strong> ${test.suite}<br/>\n`;
      html += `<strong>Duration:</strong> ${(test.duration / 1000).toFixed(1)}s</p>\n`;
      if (test.error) {
        html += `<p><strong>Error:</strong></p>\n<pre style="background-color:#f4f5f7;padding:10px;border-radius:3px;overflow-x:auto">${escapeHtml(test.error)}</pre>\n`;
      }
      html += '\n';
    });
  }

  // Environment info
  html += `<hr/>\n\n<h2>⚙️ Environment Configuration</h2>\n\n`;
  html += `<table>\n`;
  html += `<tr style="background-color:#f4f5f7"><th>Setting</th><th>Value</th></tr>\n`;
  html += `<tr><td>Environment</td><td>${env.toUpperCase()}</td></tr>\n`;
  html += `<tr><td>Base URL</td><td><code>https://${baseUrl}</code></td></tr>\n`;
  html += `<tr><td>FG Cookie</td><td><code>${cookieName}</code></td></tr>\n`;
  html += `<tr><td>Test Page</td><td><code>${env === 'prod' ? '/summit/2026/faq.html' : '/summit/2026/sessions.html'}</code></td></tr>\n`;
  html += `<tr><td>Config JSON</td><td><a href="https://${baseUrl}/.milo/pub/fg-edge-worker-config.json">Link</a></td></tr>\n`;
  html += `</table>\n\n`;

  // Test execution commands
  html += `<hr/>\n\n<h2>🖥️ How to Run Tests</h2>\n\n`;
  html += `<pre style="background-color:#f4f5f7;padding:10px;border-radius:3px;overflow-x:auto">`;
  html += `# Run all tests on ${env}\n`;
  if (env === 'prod') {
    html += `FG_ENV=prod npx playwright test --config=configs/floodgate.config.js --project=floodgate-prod-chrome --headed\n\n`;
  } else {
    html += `npx playwright test --config=configs/floodgate.config.js --project=floodgate-stage-chrome --headed\n\n`;
  }
  html += `# Run specific test\n`;
  html += `npx playwright test --config=configs/floodgate.config.js --grep "BE-01" --headed`;
  html += `</pre>\n\n`;

  // Quick links
  html += `<hr/>\n\n<h2>🔗 Quick Reference</h2>\n\n`;
  html += `<ul>\n`;
  html += `<li><a href="https://da.live/#/adobecom/da-bacom/.milo/pub">Timing Config (DA)</a></li>\n`;
  html += `<li><a href="https://business.stage.adobe.com/.milo/pub/fg-edge-worker-config.json">Stage Config JSON</a></li>\n`;
  html += `<li><a href="https://business.adobe.com/.milo/pub/fg-edge-worker-config.json">Prod Config JSON</a></li>\n`;
  html += `</ul>\n\n`;

  // Test users
  html += `<h3>Test Users</h3>\n\n`;
  html += `<table>\n`;
  html += `<tr style="background-color:#f4f5f7"><th>User Type</th><th>Email</th><th>Used For</th></tr>\n`;
  html += `<tr><td>Allowlisted</td><td><code>vevent+registered@adobetest.com</code></td><td>BE-03, BE-04, BE-05, DE-02</td></tr>\n`;
  html += `<tr><td>Non-Allowlisted</td><td><code>xiasun+nonAllowlisted@adobetest.com</code></td><td>BE-02</td></tr>\n`;
  html += `<tr><td>Anonymous</td><td>N/A</td><td>BE-01, DE-01, AE-01</td></tr>\n`;
  html += `</table>\n\n`;

  // Footer
  html += `<hr/>\n\n`;
  html += `<p><em>This report was auto-generated by the Floodgate test automation suite.<br/>`;
  html += `For questions, contact the QE team.</em></p>\n`;

  return html;
}

// Main
function main() {
  console.log(`${colors.cyan}Loading test results...${colors.reset}`);
  console.log(`${colors.cyan}Environment: ${colors.bright}${TEST_ENV.toUpperCase()}${colors.reset}`);
  
  const data = readResults();
  const tests = parseResults(data);
  const categories = categorizeTests(tests);
  
  // Console report
  printConsoleReport(tests, categories);
  
  // Ensure results directory exists
  const resultsDir = path.join(__dirname, '../results');
  if (!fs.existsSync(resultsDir)) {
    fs.mkdirSync(resultsDir, { recursive: true });
  }
  
  // Markdown report
  const mdReport = generateMarkdownReport(tests, categories);
  const mdPath = path.join(resultsDir, 'floodgate-report.md');
  fs.writeFileSync(mdPath, mdReport);
  console.log(`${colors.green}✓ Markdown report saved: ${mdPath}${colors.reset}`);
  
  // HTML report
  const htmlReport = generateHtmlReport(tests, categories);
  const htmlPath = path.join(resultsDir, 'floodgate-report.html');
  fs.writeFileSync(htmlPath, htmlReport);
  console.log(`${colors.green}✓ HTML report saved: ${htmlPath}${colors.reset}`);
  
  // Confluence Wiki report
  const confluenceReport = generateConfluenceReport(tests, categories);
  const confluencePath = path.join(resultsDir, 'floodgate-report-confluence.txt');
  fs.writeFileSync(confluencePath, confluenceReport);
  console.log(`${colors.green}✓ Confluence Wiki report saved: ${confluencePath}${colors.reset}`);
  
  // Confluence HTML report (for direct paste into Confluence Cloud)
  const confluenceHtml = generateConfluenceHtml(tests, categories);
  const confluenceHtmlPath = path.join(resultsDir, 'floodgate-report-confluence.html');
  fs.writeFileSync(confluenceHtmlPath, confluenceHtml);
  console.log(`${colors.green}✓ Confluence HTML report saved: ${confluenceHtmlPath}${colors.reset}`);
  
  console.log(`\n${colors.cyan}Open the HTML report:${colors.reset}`);
  console.log(`   open ${htmlPath}`);
  console.log(`\n${colors.cyan}For Confluence Cloud - Copy HTML and paste directly:${colors.reset}`);
  console.log(`   cat ${confluenceHtmlPath} | pbcopy`);
  console.log(`   Then paste into Confluence editor (Ctrl+V / Cmd+V)\n`);
}

main();
