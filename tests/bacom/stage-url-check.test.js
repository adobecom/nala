/* eslint-disable no-restricted-syntax */
/* eslint-disable import/named */
import { expect, test } from '@playwright/test';
import { features } from '../../features/bacom/stage-url-check.spec.js';

const fs = require('fs');
const path = require('path');
const { request } = require('@playwright/test');
const { WebUtil } = require('../../libs/webutil.js');

const BASE_URL = 'https://business.stage.adobe.com';

// Screenshot settings
const TAKE_SCREENSHOTS = true; // Set to true to capture screenshots
const SCREENSHOT_DIR = 'screenshots/bacom-stage-ai-bots';

// Extensions to exclude from testing
const EXCLUDED_EXTENSIONS = ['.css', '.jpg', '.js', '.json', '.mp4', '.pdf', '.png', '.svg', '.webp', '.xml'];

// All AI Bot User-Agents to test with
const AI_USER_AGENTS = [
  { name: 'PerplexityBot', value: 'Mozilla/5.0 (compatible; PerplexityBot/1.0; +https://perplexity.ai/bot)' },
  { name: 'Perplexity-User', value: 'Perplexity-User/1.0' },
  { name: 'ClaudeBot', value: 'Mozilla/5.0 (compatible; ClaudeBot/1.0; +https://anthropic.com/claude-bot)' },
  { name: 'Claude-User', value: 'Claude-User/1.0' },
  { name: 'Claude-SearchBot', value: 'Mozilla/5.0 (compatible; Claude-SearchBot/1.0)' },
  { name: 'Tokowaka-AI', value: 'Mozilla/5.0 (compatible; Tokowaka-AI/1.0)' },
  { name: 'ChatGPT-User', value: 'ChatGPT-User/1.0' },
  { name: 'GPTBot', value: 'Mozilla/5.0 (compatible; GPTBot/1.0; +https://openai.com/gptbot)' },
  { name: 'OAI-SearchBot', value: 'Mozilla/5.0 (compatible; OAI-SearchBot/1.0; +https://openai.com/searchbot)' },
];

/**
 * Filter URLs to exclude specific file extensions
 * @param {string[]} urls - Array of URL paths
 * @returns {string[]} - Filtered URLs
 */
function filterUrls(urls) {
  return urls.filter((url) => {
    const lowerUrl = url.toLowerCase();
    return !EXCLUDED_EXTENSIONS.some((ext) => lowerUrl.endsWith(ext));
  });
}

/**
 * Make a GET request with a specific user-agent
 * @param {string} url - Full URL to request
 * @param {string} userAgent - User-Agent header value
 * @returns {Promise<object>} - Response object
 */
async function getRequestWithUserAgent(url, userAgent) {
  const context = await request.newContext({ extraHTTPHeaders: { 'User-Agent': userAgent } });
  const response = await context.get(url);
  return response;
}

/**
 * Generate a safe filename from URL path
 * @param {string} urlPath - URL path
 * @returns {string} - Safe filename
 */
function getScreenshotName(urlPath) {
  let name = urlPath.replace(/^\//, '').replace(/\//g, '_').replace(/\.html$/, '');
  if (!name) name = 'homepage';
  return name;
}

test.describe('BACOM Stage URL Check with All AI Bot User-Agents', () => {
  // Set longer timeout for large URL test suite with screenshots
  test.setTimeout(90 * 60 * 1000); // 90 minutes

  // Create screenshot directory if it doesn't exist
  if (TAKE_SCREENSHOTS && !fs.existsSync(SCREENSHOT_DIR)) {
    fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });
  }

  for (const feature of features) {
    // Test with ALL AI user-agents
    for (const agent of AI_USER_AGENTS) {
      const results = { passed: [], failed: [], screenshots: [] };

      // eslint-disable-next-line no-loop-func
      test(`${feature.name} with ${agent.name}, ${feature.tags}`, async ({ page }) => {
        // Set user-agent for the browser context
        await page.setExtraHTTPHeaders({ 'User-Agent': agent.value });

        // Load test data from YAML file
        const testdata = await WebUtil.loadTestData(`${feature.data}`);
        const allUrls = testdata.urls;

        // Filter out excluded extensions
        const urls = filterUrls(allUrls);

        // Create agent-specific screenshot folder
        const agentScreenshotDir = path.join(SCREENSHOT_DIR, agent.name);
        if (TAKE_SCREENSHOTS && !fs.existsSync(agentScreenshotDir)) {
          fs.mkdirSync(agentScreenshotDir, { recursive: true });
        }

        console.log('\n========================================');
        console.log(`  AI Bot: ${agent.name}`);
        console.log(`  User-Agent: ${agent.value}`);
        console.log(`  Screenshots: ${TAKE_SCREENSHOTS ? 'ENABLED' : 'DISABLED'}`);
        console.log('========================================');
        console.log(`Base URL: ${BASE_URL}`);
        console.log(`Total URLs: ${allUrls.length}`);
        console.log(`URLs after filtering: ${urls.length}`);
        console.log('\nStarting URL checks...\n');

        for (const urlPath of urls) {
          const fullUrl = `${BASE_URL}${urlPath}`;

          try {
            // First check HTTP status
            const response = await getRequestWithUserAgent(fullUrl, agent.value);
            const status = response.status();

            if (status === 200) {
              console.log(`✓ [${agent.name}] ${urlPath} - ${status}`);

              // Take screenshot for 200 responses
              if (TAKE_SCREENSHOTS) {
                try {
                  await page.goto(fullUrl, { waitUntil: 'networkidle', timeout: 30000 });
                  const screenshotName = `${getScreenshotName(urlPath)}.png`;
                  const screenshotPath = path.join(agentScreenshotDir, screenshotName);
                  await page.screenshot({ path: screenshotPath, fullPage: true });
                  console.log(`  📸 Screenshot: ${screenshotPath}`);
                  results.screenshots.push({ url: fullUrl, screenshot: screenshotPath });
                } catch (ssError) {
                  console.warn(`  ⚠️ Screenshot failed: ${ssError.message}`);
                }
              }

              results.passed.push({ url: fullUrl, status, agent: agent.name });
            } else if (status === 301 || status === 302) {
              console.log(`→ [${agent.name}] ${urlPath} - Redirect ${status}`);
              results.passed.push({ url: fullUrl, status, redirect: true, agent: agent.name });
            } else if (status === 404) {
              console.error(`✗ [${agent.name}] ${urlPath} - Not Found ${status}`);
              results.failed.push({ url: fullUrl, status, error: 'Not Found', agent: agent.name });
            } else if (status === 403) {
              console.error(`✗ [${agent.name}] ${urlPath} - BLOCKED ${status}`);
              results.failed.push({ url: fullUrl, status, error: 'Forbidden - Bot Blocked', agent: agent.name });
            } else {
              console.warn(`? [${agent.name}] ${urlPath} - ${status}`);
              results.failed.push({ url: fullUrl, status, agent: agent.name });
            }
          } catch (error) {
            console.error(`✗ [${agent.name}] ${urlPath} - Error: ${error.message}`);
            results.failed.push({ url: fullUrl, error: error.message, agent: agent.name });
          }
        }

        // Log summary for this user-agent
        console.log('\n----------------------------------------');
        console.log(`  SUMMARY for ${agent.name}`);
        console.log('----------------------------------------');
        console.log(`Passed: ${results.passed.length}`);
        console.log(`Failed: ${results.failed.length}`);
        console.log(`Screenshots: ${results.screenshots.length}`);

        if (results.failed.length > 0) {
          console.log('\nFailed URLs:');
          results.failed.forEach((item) => {
            console.log(`  - ${item.url}: ${item.status || item.error}`);
          });
        }
        console.log('----------------------------------------\n');

        // Save results for this agent
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        const filename = `bacom-stage-${agent.name}-${timestamp}.json`;
        fs.writeFileSync(filename, JSON.stringify({ agent: agent.name, userAgent: agent.value, results }, null, 2));
        console.log(`Results saved to ${filename}`);

        expect(results.failed.length, `${results.failed.length} URLs failed for ${agent.name}`).toBe(0);
      });
    }
  }
});
