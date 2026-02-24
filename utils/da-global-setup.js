// @ts-check
const fs = require('fs');
const path = require('path');

const AUTH_FILE = path.join(__dirname, '../.auth/da-user.json');

/**
 * Global setup for DA Bacom tests
 *
 * Checks if authentication file exists and is valid.
 * If not, warns the user to run the setup project first.
 */
async function globalSetup() {
  // Create .auth directory if it doesn't exist
  const authDir = path.dirname(AUTH_FILE);
  if (!fs.existsSync(authDir)) {
    fs.mkdirSync(authDir, { recursive: true });
  }

  // Check if auth file exists
  if (!fs.existsSync(AUTH_FILE)) {
    console.log('\n');
    console.log('╔════════════════════════════════════════════════════════════════╗');
    console.log('║              ⚠  AUTHENTICATION REQUIRED  ⚠                    ║');
    console.log('╠════════════════════════════════════════════════════════════════╣');
    console.log('║                                                                ║');
    console.log('║  No saved login session found.                                 ║');
    console.log('║                                                                ║');
    console.log('║  Run the setup first to login:                                 ║');
    console.log('║                                                                ║');
    console.log('║  npx playwright test --config=configs/da-bacom.config.js \\     ║');
    console.log('║      --project=da-setup --headed                               ║');
    console.log('║                                                                ║');
    console.log('║  Or use da-chrome-nosetup if you have a valid session file.    ║');
    console.log('║                                                                ║');
    console.log('╚════════════════════════════════════════════════════════════════╝');
    console.log('\n');
    return;
  }

  // Check if auth file is valid (not empty, has cookies)
  try {
    const authData = JSON.parse(fs.readFileSync(AUTH_FILE, 'utf8'));
    const hasCookies = authData.cookies && authData.cookies.length > 0;
    const hasOrigins = authData.origins && authData.origins.length > 0;

    if (hasCookies || hasOrigins) {
      console.log('✓ Using saved DA Live authentication session');
    } else {
      console.log('⚠ Auth file exists but may be empty. Re-run setup if tests fail.');
    }
  } catch (error) {
    console.log('⚠ Could not read auth file. Re-run setup if tests fail.');
  }
}

module.exports = globalSetup;
