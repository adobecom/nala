#!/usr/bin/env node
/**
 * Generate self-contained HTML report from lingo-detailed-report.json
 * Usage: node scripts/generate-lingo-report.js
 */

const fs = require('fs');
const path = require('path');

const RESULTS_DIR = path.join(__dirname, '..', 'results');
const JSON_PATH = path.join(RESULTS_DIR, 'lingo-detailed-report.json');
const HTML_PATH = path.join(RESULTS_DIR, 'lingo-report.html');

// Read JSON data
let reportData;
try {
  reportData = JSON.parse(fs.readFileSync(JSON_PATH, 'utf-8'));
  console.log('✓ Loaded lingo-detailed-report.json');
} catch (error) {
  console.error('✗ Failed to load JSON:', error.message);
  process.exit(1);
}

// Calculate CaaS stats and collect all violations, skipped, and fallbacks
let pagesWithCaaS = reportData.summary.pagesWithCaaS || 0;
let totalCaaSCards = reportData.summary.totalCaaSCards || 0;
let totalLinks = reportData.summary.totalLinksAnalyzed || 0;
let totalViolations = 0;
let totalCorrectFallbacks = 0;
let pagesRedirected = 0;
const allViolations = []; // Collect all violations for summary
const allSkipped = []; // Collect all skipped pages
const allFallbacks = []; // Collect pages that were redirected via 404 fallback
const allCaaSPages = []; // Collect all pages with CaaS content
const allUnexpectedLocales = []; // Collect all unexpected locale issues
const allBadLinks = []; // Collect all bad/staging links

if (reportData.tests) {
  reportData.tests.forEach(test => {
    if (test.pages) {
      test.pages.forEach(page => {
        if (page.hasCaaS) {
          pagesWithCaaS++;
          totalCaaSCards += page.cardCount || 0;
          allCaaSPages.push({
            testName: test.testName,
            locale: test.locale,
            pageName: page.name,
            pageUrl: page.url,
            cardCount: page.cardCount || 0,
            totalLinks: page.links?.total || 0
          });
        }
        if (page.links && page.links.total) {
          totalLinks += page.links.total;
        }
        // Collect skipped pages
        if (page.status === 'skipped') {
          allSkipped.push({
            testName: test.testName,
            locale: test.locale,
            pageName: page.name,
            pageUrl: page.url,
            reason: page.reason || 'Unknown'
          });
        }
        // Collect pages that were redirected (404 fallback)
        if (page.wasRedirected) {
          pagesRedirected++;
          allFallbacks.push({
            testName: test.testName,
            locale: test.locale,
            pageName: page.name,
            pageUrl: page.url,
            fallbackTo: page.links?.fallbackRule?.fallbackTo || 'Unknown'
          });
        }
        // Collect violations
        if (page.linkValidation) {
          totalCorrectFallbacks += page.linkValidation.correctFallbacks || 0;
          if (page.linkValidation.violations && page.linkValidation.violations.length > 0) {
            totalViolations += page.linkValidation.violations.length;
            page.linkValidation.violations.forEach(v => {
              allViolations.push({
                testName: test.testName,
                locale: test.locale,
                pageName: page.name,
                pageUrl: page.url,
                ...v
              });
            });
          }
          // Collect unexpected locale issues
          if (page.linkValidation.unexpectedLocales) {
            allUnexpectedLocales.push({
              testName: test.testName,
              locale: test.locale,
              pageName: page.name,
              pageUrl: page.url,
              ...page.linkValidation.unexpectedLocales
            });
          }
        }
        // Collect bad/staging links
        if (page.links?.badLinks && page.links.badLinks.length > 0) {
          page.links.badLinks.forEach(bl => {
            allBadLinks.push({
              testName: test.testName,
              locale: test.locale,
              pageName: page.name,
              pageUrl: page.url,
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

// Generate HTML
const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>BACOM Lingo Test Report</title>
  <style>
    :root {
      --bg-primary: #0f1419;
      --bg-secondary: #1a1f26;
      --bg-card: #242b33;
      --text-primary: #e7e9ea;
      --text-secondary: #8b98a5;
      --accent-blue: #1d9bf0;
      --accent-green: #00ba7c;
      --accent-red: #f4212e;
      --accent-yellow: #ffd400;
      --accent-purple: #7856ff;
      --border-color: #2f3336;
    }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: 'SF Pro Display', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      background: var(--bg-primary);
      color: var(--text-primary);
      line-height: 1.6;
    }
    .header {
      background: linear-gradient(135deg, #1a1f26 0%, #2d1f3d 100%);
      padding: 40px 20px;
      text-align: center;
      border-bottom: 1px solid var(--border-color);
    }
    .header h1 {
      font-size: 2.5rem;
      font-weight: 700;
      margin-bottom: 10px;
      background: linear-gradient(90deg, var(--accent-blue), var(--accent-purple));
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    .header .timestamp { color: var(--text-secondary); font-size: 0.9rem; }
    .container { max-width: 1400px; margin: 0 auto; padding: 30px 20px; }
    .summary-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
      gap: 16px;
      margin-bottom: 40px;
    }
    .stat-card {
      background: var(--bg-card);
      border-radius: 16px;
      padding: 20px;
      border: 1px solid var(--border-color);
    }
    .stat-card .label {
      color: var(--text-secondary);
      font-size: 0.8rem;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      margin-bottom: 6px;
    }
    .stat-card .value { font-size: 2rem; font-weight: 700; }
    .stat-card.passed .value { color: var(--accent-green); }
    .stat-card.failed .value { color: var(--accent-red); }
    .stat-card.skipped .value { color: var(--accent-yellow); }
    .stat-card.caas .value { color: var(--accent-purple); }
    .stat-card.links .value { color: var(--accent-blue); }
    .progress-bar {
      height: 6px;
      background: var(--bg-primary);
      border-radius: 3px;
      margin-top: 8px;
      overflow: hidden;
    }
    .progress-bar .fill {
      height: 100%;
      background: linear-gradient(90deg, var(--accent-green), var(--accent-blue));
      border-radius: 3px;
    }
    .section {
      background: var(--bg-secondary);
      border-radius: 16px;
      margin-bottom: 24px;
      border: 1px solid var(--border-color);
      overflow: hidden;
    }
    .section-header {
      background: var(--bg-card);
      padding: 16px 20px;
      border-bottom: 1px solid var(--border-color);
      cursor: pointer;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .section-header:hover { background: #2a3240; }
    .section-header h2 { font-size: 1.1rem; font-weight: 600; }
    .section-content { padding: 16px 20px; display: none; }
    .section-content.show { display: block; }
    .rules-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
      gap: 12px;
    }
    .rule-card {
      background: var(--bg-card);
      border-radius: 10px;
      padding: 16px;
      border: 1px solid var(--border-color);
    }
    .rule-card h4 { color: var(--accent-blue); margin-bottom: 8px; font-size: 0.95rem; }
    .rule-card p { color: var(--text-secondary); font-size: 0.85rem; margin-bottom: 8px; }
    .locale-tags { display: flex; flex-wrap: wrap; gap: 4px; }
    .locale-tag {
      background: var(--bg-primary);
      padding: 3px 8px;
      border-radius: 4px;
      font-size: 0.75rem;
      font-family: monospace;
    }
    .test-item {
      background: var(--bg-card);
      border-radius: 10px;
      margin-bottom: 10px;
      overflow: hidden;
    }
    .test-header {
      padding: 14px 16px;
      cursor: pointer;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .test-header:hover { background: #2a3240; }
    .test-header h3 { font-size: 0.95rem; font-weight: 500; }
    .test-header .meta { color: var(--text-secondary); font-size: 0.85rem; }
    .test-stats { display: flex; gap: 10px; font-size: 0.8rem; }
    .test-stats span { padding: 3px 8px; border-radius: 4px; }
    .test-stats .pass { background: rgba(0, 186, 124, 0.2); color: var(--accent-green); }
    .test-stats .fail { background: rgba(244, 33, 46, 0.2); color: var(--accent-red); }
    .test-stats .skip { background: rgba(255, 212, 0, 0.2); color: var(--accent-yellow); }
    .pages-list { display: none; padding: 0 16px 16px; }
    .pages-list.show { display: block; }
    .page-row {
      background: var(--bg-primary);
      border-radius: 8px;
      padding: 12px;
      margin-bottom: 8px;
      border: 1px solid var(--border-color);
    }
    .page-row .top { display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px; }
    .page-row .name { font-weight: 600; color: var(--accent-blue); font-size: 0.9rem; }
    .page-row .status { padding: 2px 8px; border-radius: 4px; font-size: 0.75rem; }
    .page-row .status.passed { background: rgba(0, 186, 124, 0.2); color: var(--accent-green); }
    .page-row .status.skipped { background: rgba(255, 212, 0, 0.2); color: var(--accent-yellow); }
    .page-row .url { font-size: 0.75rem; color: var(--text-secondary); word-break: break-all; margin-bottom: 6px; }
    .page-row .stats { display: flex; flex-wrap: wrap; gap: 12px; font-size: 0.8rem; }
    .page-row .stats .label { color: var(--text-secondary); }
    .page-row .stats .value { font-weight: 600; }
    .caas-badge {
      background: rgba(120, 86, 255, 0.2);
      color: var(--accent-purple);
      padding: 2px 8px;
      border-radius: 4px;
      font-size: 0.8rem;
    }
    .chevron { transition: transform 0.2s; }
    .chevron.open { transform: rotate(90deg); }
    @media (max-width: 768px) {
      .header h1 { font-size: 1.6rem; }
      .stat-card .value { font-size: 1.5rem; }
      .summary-grid { grid-template-columns: repeat(2, 1fr); }
    }
  </style>
</head>
<body>
  <div class="header">
    <h1>🔗 BACOM Lingo Test Report</h1>
    <p class="timestamp">Generated: ${new Date(reportData.timestamp).toLocaleString()}</p>
  </div>

  <div class="container">
    <!-- Summary -->
    <div class="summary-grid">
      <div class="stat-card">
        <div class="label">Total Tests</div>
        <div class="value">${summary.totalTests}</div>
      </div>
      <div class="stat-card passed">
        <div class="label">Tests Passed</div>
        <div class="value">${summary.passed}</div>
      </div>
      <div class="stat-card failed">
        <div class="label">Tests Failed</div>
        <div class="value">${summary.failed}</div>
      </div>
      <div class="stat-card">
        <div class="label">Total Pages</div>
        <div class="value">${summary.totalPages}</div>
      </div>
      <div class="stat-card passed">
        <div class="label">Pages Passed</div>
        <div class="value">${summary.passedPages}</div>
        <div class="progress-bar"><div class="fill" style="width: ${passRate}%"></div></div>
      </div>
      <div class="stat-card skipped">
        <div class="label">Pages Skipped</div>
        <div class="value">${summary.skippedPages}</div>
      </div>
      <div class="stat-card caas">
        <div class="label">Pages with CaaS</div>
        <div class="value">${pagesWithCaaS}</div>
      </div>
      <div class="stat-card caas">
        <div class="label">CaaS Cards</div>
        <div class="value">${totalCaaSCards.toLocaleString()}</div>
      </div>
      <div class="stat-card links">
        <div class="label">Links Analyzed</div>
        <div class="value">${totalLinks.toLocaleString()}</div>
      </div>
      <div class="stat-card passed">
        <div class="label">Correct Fallbacks</div>
        <div class="value">${totalCorrectFallbacks.toLocaleString()}</div>
      </div>
      <div class="stat-card failed">
        <div class="label">Violations Found</div>
        <div class="value">${totalViolations}</div>
      </div>
      <div class="stat-card skipped">
        <div class="label">Pages Redirected</div>
        <div class="value">${pagesRedirected}</div>
      </div>
      ${allUnexpectedLocales.length > 0 ? `
      <div class="stat-card" style="border: 2px solid #ff9500; background: linear-gradient(135deg, rgba(255, 149, 0, 0.15) 0%, var(--bg-card) 100%);">
        <div class="label" style="color: #ff9500;">Content Issues</div>
        <div class="value" style="color: #ff9500;">${allUnexpectedLocales.length}</div>
        <div style="font-size: 0.7rem; color: var(--text-secondary); margin-top: 4px;">Unexpected Locales</div>
      </div>
      ` : ''}
      ${allBadLinks.length > 0 ? `
      <div class="stat-card" style="border: 3px solid #dc2626; background: linear-gradient(135deg, rgba(220, 38, 38, 0.2) 0%, var(--bg-card) 100%); animation: pulse 2s infinite;">
        <div class="label" style="color: #dc2626;">🚨 Bad Links</div>
        <div class="value" style="color: #dc2626;">${allBadLinks.length}</div>
        <div style="font-size: 0.7rem; color: var(--text-secondary); margin-top: 4px;">Staging URLs Found</div>
      </div>
      ` : ''}
    </div>
    
    <!-- Bad/Staging Links Summary (if any) -->
    ${allBadLinks.length > 0 ? `
    <div class="section" style="border: 3px solid #dc2626; box-shadow: 0 0 30px rgba(220, 38, 38, 0.4); animation: glow 2s ease-in-out infinite alternate;">
      <div class="section-header" onclick="toggle('bad-links')" style="background: linear-gradient(135deg, rgba(220, 38, 38, 0.25) 0%, rgba(185, 28, 28, 0.2) 100%);">
        <h2 style="color: #dc2626;">🚨 BAD LINKS - Staging URLs Found (${allBadLinks.length} total)</h2>
        <span class="chevron open" id="bad-links-chev">▶</span>
      </div>
      <div class="section-content show" id="bad-links">
        <div style="background: rgba(220, 38, 38, 0.15); border-left: 4px solid #dc2626; padding: 12px 16px; margin-bottom: 16px; border-radius: 0 8px 8px 0;">
          <p style="color: var(--text-primary); font-weight: 700; margin-bottom: 4px;">⚠️ CRITICAL: These links point to staging/preview URLs!</p>
          <p style="color: var(--text-secondary); font-size: 0.9rem;">
            Links pointing to <code>hlx.page</code>, <code>hlx.live</code>, or branch URLs (e.g., <code>main--bacom--adobecom</code>) 
            are internal staging URLs that should NOT appear on production pages. These need to be fixed in the content.
          </p>
        </div>
        <table style="width:100%;border-collapse:collapse;font-size:0.85rem;">
          <thead>
            <tr style="border-bottom:1px solid var(--border-color);text-align:left;">
              <th style="padding:8px;color:var(--text-secondary)">Page</th>
              <th style="padding:8px;color:var(--text-secondary)">Location</th>
              <th style="padding:8px;color:var(--text-secondary)">Link Text</th>
              <th style="padding:8px;color:var(--text-secondary)">Bad URL</th>
              <th style="padding:8px;color:var(--text-secondary)">Issue</th>
            </tr>
          </thead>
          <tbody>
            ${allBadLinks.map(bl => `
              <tr style="border-bottom:1px solid var(--border-color);">
                <td style="padding:8px;">
                  <span style="color:var(--accent-blue);font-family:monospace;">${bl.locale || ''}</span><br>
                  <span style="font-size:0.8rem;">${bl.pageName || ''}</span>
                </td>
                <td style="padding:8px;">
                  <span style="background:${bl.location === 'caas' ? 'rgba(120,86,255,0.2)' : 'rgba(139,152,165,0.2)'};color:${bl.location === 'caas' ? 'var(--accent-purple)' : 'var(--text-secondary)'};padding:2px 6px;border-radius:4px;font-size:0.75rem;">${bl.location || 'body'}</span>
                </td>
                <td style="padding:8px;max-width:150px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;" title="${bl.text || ''}">${bl.text || '(no text)'}</td>
                <td style="padding:8px;font-family:monospace;color:#dc2626;font-size:0.75rem;max-width:300px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">
                  <a href="${bl.href}" target="_blank" style="color:#dc2626;text-decoration:none;" title="${bl.href}">${bl.href}</a>
                </td>
                <td style="padding:8px;color:var(--text-secondary);font-size:0.8rem;">${bl.issue || ''}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>
    <style>
      @keyframes glow {
        from { box-shadow: 0 0 20px rgba(220, 38, 38, 0.3); }
        to { box-shadow: 0 0 40px rgba(220, 38, 38, 0.6); }
      }
      @keyframes pulse {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.8; }
      }
    </style>
    ` : ''}
    
    <!-- Violations Summary (if any) -->
    ${totalViolations > 0 ? `
    <div class="section" style="border: 2px solid var(--accent-red);">
      <div class="section-header" onclick="toggle('violations')" style="background: rgba(244, 33, 46, 0.1);">
        <h2>⚠️ Link Transformation Violations (${totalViolations} total)</h2>
        <span class="chevron open" id="violations-chev">▶</span>
      </div>
      <div class="section-content show" id="violations">
        <p style="color: var(--text-secondary); margin-bottom: 16px;">
          These links point to the BASE locale when the regional page EXISTS in the Query Index. 
          According to the rule: <em>"If the regional page exists, the link should point to the regional page."</em>
        </p>
        <table style="width:100%;border-collapse:collapse;font-size:0.85rem;">
          <thead>
            <tr style="border-bottom:1px solid var(--border-color);text-align:left;">
              <th style="padding:8px;color:var(--text-secondary)">Locale</th>
              <th style="padding:8px;color:var(--text-secondary)">Page</th>
              <th style="padding:8px;color:var(--text-secondary)">Link Path</th>
              <th style="padding:8px;color:var(--text-secondary)">Should Be</th>
              <th style="padding:8px;color:var(--text-secondary)">Issue</th>
            </tr>
          </thead>
          <tbody>
            ${allViolations.map(v => `
              <tr style="border-bottom:1px solid var(--border-color);">
                <td style="padding:8px;color:var(--accent-blue);font-family:monospace;">${v.locale || ''}</td>
                <td style="padding:8px;">${v.pageName || ''}</td>
                <td style="padding:8px;font-family:monospace;color:var(--accent-red);">${v.pagePath || ''}</td>
                <td style="padding:8px;font-family:monospace;color:var(--accent-green);">${v.regionalPath || ''}</td>
                <td style="padding:8px;color:var(--text-secondary);font-size:0.8rem;">${v.issue || ''}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>
    ` : ''}
    
    <!-- Unexpected Locale Links Summary (if any) -->
    ${allUnexpectedLocales.length > 0 ? `
    <div class="section" style="border: 3px solid #ff9500; box-shadow: 0 0 20px rgba(255, 149, 0, 0.3);">
      <div class="section-header" onclick="toggle('unexpected-locales')" style="background: linear-gradient(135deg, rgba(255, 149, 0, 0.2) 0%, rgba(255, 94, 0, 0.15) 100%);">
        <h2 style="color: #ff9500;">🚨 Unexpected Locale Links - Content Issue (${allUnexpectedLocales.length} pages affected)</h2>
        <span class="chevron open" id="unexpected-locales-chev">▶</span>
      </div>
      <div class="section-content show" id="unexpected-locales">
        <div style="background: rgba(255, 149, 0, 0.1); border-left: 4px solid #ff9500; padding: 12px 16px; margin-bottom: 16px; border-radius: 0 8px 8px 0;">
          <p style="color: var(--text-primary); font-weight: 600; margin-bottom: 4px;">⚠️ These pages contain links pointing to unexpected locales.</p>
          <p style="color: var(--text-secondary); font-size: 0.9rem;">
            This typically indicates a content authoring issue - the page should only contain links to the expected locale (${allUnexpectedLocales[0]?.locale || 'target locale'}) or root (/), but found links pointing to other locale prefixes.
          </p>
        </div>
        ${allUnexpectedLocales.map((item, idx) => `
          <div style="background: var(--bg-card); border-radius: 10px; padding: 16px; margin-bottom: 12px; border: 1px solid rgba(255, 149, 0, 0.3);">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
              <div>
                <span style="color: #ff9500; font-weight: 700; font-size: 1rem;">${item.pageName}</span>
                <span style="color: var(--text-secondary); margin-left: 8px; font-size: 0.85rem;">on locale ${item.locale}</span>
              </div>
              <span style="background: rgba(255, 149, 0, 0.2); color: #ff9500; padding: 4px 12px; border-radius: 20px; font-size: 0.8rem; font-weight: 600;">
                ${item.locales?.reduce((sum, l) => sum + l.count, 0) || 0} unexpected links
              </span>
            </div>
            <div style="font-size: 0.75rem; color: var(--text-secondary); margin-bottom: 10px; word-break: break-all;">
              <a href="${item.pageUrl}" target="_blank" style="color: var(--accent-blue); text-decoration: none;">${item.pageUrl}</a>
            </div>
            <p style="color: var(--text-secondary); font-size: 0.85rem; margin-bottom: 8px;">${item.issue || ''}</p>
            <div style="display: flex; flex-wrap: wrap; gap: 8px;">
              ${(item.locales || []).map(l => `
                <span style="background: rgba(255, 149, 0, 0.15); border: 1px solid rgba(255, 149, 0, 0.4); padding: 4px 10px; border-radius: 6px; font-family: monospace; font-size: 0.8rem;">
                  <span style="color: #ff9500;">/${l.locale}</span>
                  <span style="color: var(--text-secondary);">: ${l.count} links</span>
                </span>
              `).join('')}
            </div>
            ${item.sampleLinks && item.sampleLinks.length > 0 ? `
              <div style="margin-top: 10px; padding-top: 10px; border-top: 1px solid var(--border-color);">
                <p style="color: var(--text-secondary); font-size: 0.75rem; margin-bottom: 6px;">Sample links:</p>
                <div style="display: flex; flex-wrap: wrap; gap: 4px;">
                  ${item.sampleLinks.slice(0, 5).map(l => `
                    <code style="background: var(--bg-primary); padding: 2px 6px; border-radius: 4px; font-size: 0.7rem; color: var(--text-secondary);">${l.href}</code>
                  `).join('')}
                  ${item.sampleLinks.length > 5 ? `<span style="color: var(--text-secondary); font-size: 0.7rem;">+${item.sampleLinks.length - 5} more</span>` : ''}
                </div>
              </div>
            ` : ''}
          </div>
        `).join('')}
      </div>
    </div>
    ` : ''}
    
    <!-- Skipped Pages Summary (if any) -->
    ${allSkipped.length > 0 ? `
    <div class="section" style="border: 2px solid var(--accent-yellow);">
      <div class="section-header" onclick="toggle('skipped-summary')" style="background: rgba(255, 212, 0, 0.1);">
        <h2>⏭️ Skipped Pages (${allSkipped.length} total)</h2>
        <span class="chevron" id="skipped-summary-chev">▶</span>
      </div>
      <div class="section-content" id="skipped-summary">
        <p style="color: var(--text-secondary); margin-bottom: 16px;">
          These pages were skipped during testing (usually due to navigation errors or timeouts).
        </p>
        <table style="width:100%;border-collapse:collapse;font-size:0.85rem;">
          <thead>
            <tr style="border-bottom:1px solid var(--border-color);text-align:left;">
              <th style="padding:8px;color:var(--text-secondary)">Locale</th>
              <th style="padding:8px;color:var(--text-secondary)">Page</th>
              <th style="padding:8px;color:var(--text-secondary)">Reason</th>
            </tr>
          </thead>
          <tbody>
            ${allSkipped.map(s => `
              <tr style="border-bottom:1px solid var(--border-color);">
                <td style="padding:8px;color:var(--accent-blue);font-family:monospace;">${s.locale || ''}</td>
                <td style="padding:8px;">${s.pageName || ''}</td>
                <td style="padding:8px;color:var(--text-secondary);font-size:0.8rem;">${s.reason || ''}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>
    ` : ''}
    
    <!-- 404 Fallback Redirects Summary -->
    ${allFallbacks.length > 0 ? `
    <div class="section" style="border: 2px solid var(--accent-purple);">
      <div class="section-header" onclick="toggle('fallback-summary')" style="background: rgba(120, 86, 255, 0.1);">
        <h2>🔄 Pages Redirected via 404 Fallback (${allFallbacks.length} total)</h2>
        <span class="chevron" id="fallback-summary-chev">▶</span>
      </div>
      <div class="section-content" id="fallback-summary">
        <p style="color: var(--text-secondary); margin-bottom: 16px;">
          These regional pages triggered a 404 fallback redirect to their base locale. 
          This is expected behavior when the regional page doesn't exist.
        </p>
        <table style="width:100%;border-collapse:collapse;font-size:0.85rem;">
          <thead>
            <tr style="border-bottom:1px solid var(--border-color);text-align:left;">
              <th style="padding:8px;color:var(--text-secondary)">Regional Locale</th>
              <th style="padding:8px;color:var(--text-secondary)">Page</th>
              <th style="padding:8px;color:var(--text-secondary)">Fallback To</th>
            </tr>
          </thead>
          <tbody>
            ${allFallbacks.map(f => `
              <tr style="border-bottom:1px solid var(--border-color);">
                <td style="padding:8px;color:var(--accent-blue);font-family:monospace;">${f.locale || ''}</td>
                <td style="padding:8px;">${f.pageName || ''}</td>
                <td style="padding:8px;color:var(--accent-green);font-family:monospace;">${f.fallbackTo || ''}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>
    ` : ''}
    
    <!-- CaaS Pages Summary -->
    ${allCaaSPages.length > 0 ? `
    <div class="section" style="border: 2px solid var(--accent-purple);">
      <div class="section-header" onclick="toggle('caas-summary')" style="background: rgba(120, 86, 255, 0.1);">
        <h2>🎴 Pages with CaaS Content (${allCaaSPages.length} pages, ${totalCaaSCards} cards)</h2>
        <span class="chevron" id="caas-summary-chev">▶</span>
      </div>
      <div class="section-content" id="caas-summary">
        <p style="color: var(--text-secondary); margin-bottom: 16px;">
          These pages contain dynamically loaded CaaS (Content as a Service) content. 
          Links within CaaS cards are also analyzed for link transformation validation.
        </p>
        <table style="width:100%;border-collapse:collapse;font-size:0.85rem;">
          <thead>
            <tr style="border-bottom:1px solid var(--border-color);text-align:left;">
              <th style="padding:8px;color:var(--text-secondary)">Locale</th>
              <th style="padding:8px;color:var(--text-secondary)">Page</th>
              <th style="padding:8px;color:var(--text-secondary)">Cards</th>
              <th style="padding:8px;color:var(--text-secondary)">Total Links</th>
              <th style="padding:8px;color:var(--text-secondary)">URL</th>
            </tr>
          </thead>
          <tbody>
            ${allCaaSPages.map(c => `
              <tr style="border-bottom:1px solid var(--border-color);">
                <td style="padding:8px;color:var(--accent-blue);font-family:monospace;">${c.locale || ''}</td>
                <td style="padding:8px;">${c.pageName || ''}</td>
                <td style="padding:8px;color:var(--accent-purple);font-weight:bold;">${c.cardCount}</td>
                <td style="padding:8px;">${c.totalLinks}</td>
                <td style="padding:8px;font-size:0.75rem;color:var(--text-secondary);max-width:300px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">
                  <a href="${c.pageUrl}" target="_blank" style="color:var(--accent-blue);text-decoration:none;">${c.pageUrl}</a>
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>
    ` : ''}

    <!-- Rules -->
    <div class="section">
      <div class="section-header" onclick="toggle('rules')">
        <h2>📋 Link Transformation Rules</h2>
        <span class="chevron" id="rules-chev">▶</span>
      </div>
      <div class="section-content" id="rules">
        <div class="rules-grid">
          ${Object.entries(reportData.rules).map(([key, rule]) => `
            <div class="rule-card">
              <h4>${key}</h4>
              <p>${rule.description}</p>
              <div class="locale-tags">
                ${rule.locales.map(l => `<span class="locale-tag">${l}</span>`).join('')}
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </div>

    <!-- Fallback Rules -->
    <div class="section">
      <div class="section-header" onclick="toggle('fallback')">
        <h2>🔄 404 Fallback Rules</h2>
        <span class="chevron" id="fallback-chev">▶</span>
      </div>
      <div class="section-content" id="fallback">
        <div class="rules-grid">
          ${Object.entries(reportData.fallbackRules).map(([key, rule]) => `
            <div class="rule-card">
              <h4>${key} → ${rule.fallbackTo}</h4>
              <p>Falls back to <code>${rule.fallbackTo}</code> on 404</p>
              <div class="locale-tags">
                ${rule.locales.slice(0, 8).map(l => `<span class="locale-tag">/${l}</span>`).join('')}
                ${rule.locales.length > 8 ? `<span class="locale-tag">+${rule.locales.length - 8}</span>` : ''}
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </div>

    <!-- Test Results -->
    <div class="section">
      <div class="section-header" onclick="toggle('tests')">
        <h2>🧪 Test Results (${reportData.tests.length} tests)</h2>
        <span class="chevron open" id="tests-chev">▶</span>
      </div>
      <div class="section-content show" id="tests">
        ${reportData.tests.map((test, i) => {
          const p = test.results.passed || 0;
          const f = test.results.failed || 0;
          const s = test.results.skipped || 0;
          return `
            <div class="test-item">
              <div class="test-header" onclick="toggleTest(${i})">
                <div>
                  <h3>${test.testName}</h3>
                  <span class="meta">${test.ruleType} ${test.locale}</span>
                </div>
                <div class="test-stats">
                  <span class="pass">✓ ${p}</span>
                  ${f > 0 ? `<span class="fail">✗ ${f}</span>` : ''}
                  ${s > 0 ? `<span class="skip">⊘ ${s}</span>` : ''}
                  ${test.results.violations > 0 ? `<span class="fail">⚠ ${test.results.violations} violations</span>` : ''}
                  ${test.results.correctFallbacks > 0 ? `<span class="pass" style="background:rgba(120,86,255,0.2);color:var(--accent-purple)">✓ ${test.results.correctFallbacks} valid fallbacks</span>` : ''}
                  <span class="chevron" id="t${i}-chev">▶</span>
                </div>
              </div>
              <div class="pages-list" id="t${i}">
                ${(test.pages || []).map(pg => `
                  <div class="page-row">
                    <div class="top">
                      <span class="name">${pg.name}</span>
                      <span class="status ${pg.status}">${pg.status}</span>
                    </div>
                    <div class="url">${pg.url || ''}</div>
                    ${pg.status === 'passed' || pg.status === 'warning' ? `
                      <div class="stats">
                        <span><span class="label">Links:</span> <span class="value">${pg.links?.total || 0}</span></span>
                        ${pg.links?.matchedPercentage ? `<span><span class="label">Match:</span> <span class="value" style="color:var(--accent-green)">${pg.links.matchedPercentage}</span></span>` : ''}
                        ${pg.links?.regionalLinks ? `<span><span class="label">Regional:</span> <span class="value">${pg.links.regionalLinks}</span></span>` : ''}
                        ${pg.links?.baseLinks ? `<span><span class="label">Base:</span> <span class="value">${pg.links.baseLinks}</span></span>` : ''}
                        ${pg.hasCaaS ? `<span class="caas-badge">🎴 ${pg.cardCount} cards</span>` : ''}
${pg.linkValidation ? `
                                          ${pg.linkValidation.skipped 
                                            ? `<span style="color:var(--accent-blue)">ℹ️ Redirected to base (validation skipped)</span>`
                                            : `<span style="color:var(--accent-green)">✅ ${pg.linkValidation.correctFallbacks} correct</span>
                                               ${pg.linkValidation.incorrectLinks > 0 ? `<span style="color:var(--accent-red)">❌ ${pg.linkValidation.incorrectLinks} violations</span>` : ''}`
                                          }
                                        ` : ''}
                      </div>
                      ${pg.linkValidation && pg.linkValidation.violations && pg.linkValidation.violations.length > 0 ? `
                        <div style="margin-top:8px;padding:8px;background:rgba(244,33,46,0.1);border-radius:6px;font-size:0.8rem;">
                          <strong style="color:var(--accent-red)">⚠️ Link Violations (regional page exists but link points to base):</strong>
                          <ul style="margin:4px 0 0 16px;color:var(--text-secondary)">
${pg.linkValidation.violations.slice(0, 5).map(v => `<li><code>${v.pagePath}</code> → should be <code style="color:var(--accent-green)">${v.regionalPath}</code></li>`).join('')}
                                            ${pg.linkValidation.violations.length > 5 ? `<li>... and ${pg.linkValidation.violations.length - 5} more</li>` : ''}
                                          </ul>
                                        </div>
                                      ` : ''}
                                      ${pg.linkValidation && pg.linkValidation.unexpectedLocales ? `
                                        <div style="margin-top:8px;padding:8px;background:rgba(255,212,0,0.1);border-radius:6px;font-size:0.8rem;">
                                          <strong style="color:var(--accent-yellow)">⚠️ Unexpected Locale Links (Content Issue):</strong>
                                          <p style="margin:4px 0;color:var(--text-secondary)">${pg.linkValidation.unexpectedLocales.issue}</p>
                                          <ul style="margin:4px 0 0 16px;color:var(--text-secondary)">
                                            ${pg.linkValidation.unexpectedLocales.locales.map(l => `<li><code>/${l.locale}</code>: ${l.count} links</li>`).join('')}
                                          </ul>
                                          ${pg.linkValidation.unexpectedLocales.sampleLinks && pg.linkValidation.unexpectedLocales.sampleLinks.length > 0 ? `
                                            <p style="margin-top:4px;color:var(--text-secondary);font-size:0.75rem;">Sample: ${pg.linkValidation.unexpectedLocales.sampleLinks.map(l => l.href).join(', ')}</p>
                                          ` : ''}
                                        </div>
                                      ` : ''}
                                      ${pg.links?.badLinks && pg.links.badLinks.length > 0 ? `
                                        <div style="margin-top:8px;padding:8px;background:rgba(220,38,38,0.15);border-radius:6px;font-size:0.8rem;border:1px solid rgba(220,38,38,0.3);">
                                          <strong style="color:#dc2626">🚨 Bad/Staging Links Found (${pg.links.badLinks.length}):</strong>
                                          <ul style="margin:4px 0 0 16px;color:var(--text-secondary)">
                                            ${pg.links.badLinks.slice(0, 5).map(bl => `<li><code style="color:#dc2626">${bl.href}</code> <span style="font-size:0.7rem">[${bl.location}]</span> - ${bl.issue}</li>`).join('')}
                                            ${pg.links.badLinks.length > 5 ? `<li>... and ${pg.links.badLinks.length - 5} more</li>` : ''}
                                          </ul>
                                        </div>
                                      ` : ''}
                    ` : `<div class="stats"><span style="color:var(--text-secondary)">${pg.reason || ''}</span></div>`}
                  </div>
                `).join('')}
              </div>
            </div>
          `;
        }).join('')}
      </div>
    </div>
  </div>

  <script>
    function toggle(id) {
      document.getElementById(id).classList.toggle('show');
      document.getElementById(id + '-chev').classList.toggle('open');
    }
    function toggleTest(i) {
      document.getElementById('t' + i).classList.toggle('show');
      document.getElementById('t' + i + '-chev').classList.toggle('open');
    }
  </script>
</body>
</html>`;

fs.writeFileSync(HTML_PATH, html);
console.log(`✓ Generated ${HTML_PATH}`);
console.log(`\nOpen the report:`);
console.log(`  open ${HTML_PATH}`);

