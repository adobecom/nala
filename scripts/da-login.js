// @ts-check
const { chromium } = require('@playwright/test');
const path = require('path');
const fs = require('fs');

const AUTH_FILE = path.join(__dirname, '../.auth/da-user.json');

/**
 * DA Live Manual Login Script
 *
 * This script opens a browser for you to login manually.
 * After login, it saves your session so all subsequent tests can reuse it.
 *
 * Usage:
 *   node scripts/da-login.js
 */
async function main() {
  // Create .auth directory if it doesn't exist
  const authDir = path.dirname(AUTH_FILE);
  if (!fs.existsSync(authDir)) {
    fs.mkdirSync(authDir, { recursive: true });
  }

  console.log('\n');
  console.log('╔════════════════════════════════════════════════════════════════╗');
  console.log('║                    DA LIVE MANUAL LOGIN                        ║');
  console.log('╠════════════════════════════════════════════════════════════════╣');
  console.log('║                                                                ║');
  console.log('║  A browser will open. Please:                                  ║');
  console.log('║                                                                ║');
  console.log('║  1. Login to DA Live with your Adobe credentials               ║');
  console.log('║  2. Make sure you can see the DA Live dashboard                ║');
  console.log('║  3. Come back here and press ENTER when done                   ║');
  console.log('║                                                                ║');
  console.log('║  Your session will be saved for all subsequent tests.          ║');
  console.log('║                                                                ║');
  console.log('╚════════════════════════════════════════════════════════════════╝');
  console.log('\n');

  // Launch browser
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  // Navigate to DA Live
  await page.goto('https://da.live');

  console.log('🌐 Browser opened. Please login to DA Live...\n');
  console.log('After logging in:\n');
  console.log('  1. In the Playwright Inspector window, click the "Resume" button (▶)\n');
  console.log('  OR close the browser window\n');

  // Use Playwright's pause - this opens the inspector
  await page.pause();

  // Save the authentication state
  await context.storageState({ path: AUTH_FILE });

  console.log(`\n✓ Authentication saved to: ${AUTH_FILE}`);
  console.log('✓ You can now run tests without logging in again.\n');

  // Close browser
  await browser.close();

  console.log('Example commands to run tests:\n');
  console.log('  npx playwright test tests/bacom/blocks/ppn-dropdown.test.js \\');
  console.log('      --config=configs/da-bacom.config.js --project=da-chrome-nosetup --headed\n');
}

main().catch((error) => {
  console.error('Error:', error);
  process.exit(1);
});
