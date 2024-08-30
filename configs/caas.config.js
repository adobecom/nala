// @ts-check
const { devices } = require('@playwright/test');
const envs = require('../envs/envs.js');

/**
 * @see https://playwright.dev/docs/test-configuration
 * @type {import('@playwright/test').PlaywrightTestConfig}
 */
const config = {
  testDir: '../tests/milo',
  outputDir: '../test-results',
  timeout: 60 * 1000,
  expect: { timeout: 10000 },
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    actionTimeout: 0,
    trace: 'on-first-retry',
  },

  projects: [
    {
      name: 'caas-live',
      use: {
        ...devices['Desktop Firefox'],
        baseURL: process.env.BASE_URL || envs['@milo_live'] || 'https://milo.adobe.com',
      },
    },
  ],
};

module.exports = config;
