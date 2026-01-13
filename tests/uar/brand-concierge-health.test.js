/* eslint-disable no-await-in-loop */
/* eslint-disable no-loop-func */
/* eslint-disable no-restricted-syntax */
import { test, expect } from '@playwright/test';
import Quiz from '../../selectors/uar/quiz.page.js';
import envs from '../../envs/envs.js';

const BrandConciergeSpec = require('../../features/uar/brand-concierge-health.spec.js');

const { features } = BrandConciergeSpec;

test.describe('Brand Concierge Health Check test suite', () => {
  let quiz;

  test.beforeEach(async ({ page }) => {
    quiz = new Quiz(page);
    quiz.initializeErrorMonitoring();
  });

  test.afterEach(async () => {
    quiz.logErrorSummary();
  });

  for (const feature of features) {
    test(
      `${feature.name}, ${feature.tags}`,
      async ({ page }) => {
        // Set timeout from feature config
        test.setTimeout(feature.timeout);
        const url = `${envs[feature.env]}${feature.path}`;
        console.info(`[Test Page]: ${url}`);
        console.info(`[Test Description]: ${feature.description}`);

        await test.step('Navigate and verify chat elements', async () => {
          await page.goto(url);
          await page.waitForLoadState('domcontentloaded');
          await expect(quiz.bcChatInput).toBeVisible();
          await expect(quiz.bcChatButton).toBeVisible();
          console.log('✅ Chat interface loaded successfully');
        });

        await test.step('Test Photoshop chat interaction', async () => {
          const success = await quiz.sendBCChatMessage(feature.prompt);
          if (success) {
            console.log('✅ Photoshop recommendation chat is working correctly');
          } else {
            console.log('⚠️ Photoshop chat may not be responding');
          }

          // Verify no console errors after chat interaction
          const unexpectedErrors = quiz.getUnexpectedConsoleErrors();
          if (unexpectedErrors.length > 0) {
            console.log(`❌ Found ${unexpectedErrors.length} unexpected console error(s) during chat:`);
            unexpectedErrors.forEach((error, index) => {
              console.log(`${index + 1}. ${error}`);
            });
          }
          expect(
            unexpectedErrors.length,
            `Found ${unexpectedErrors.length} unexpected console error(s) during Photoshop chat`,
          ).toBe(0);
        });

        await test.step('Test network resilience', async () => {
          // Reset errors for network test
          quiz.consoleErrors = [];
          
          // Block API requests to simulate network failure
          await quiz.simulateNetworkFailure();
          console.log('🌐 Network requests blocked - simulating network failure');

          // Try chat with blocked network - use try/catch to handle UI issues gracefully
          try {
            await quiz.bcChatInput.clear();
            await quiz.bcChatInput.fill(feature.prompt);
            // Try to click but don't fail if UI is blocked by modal/overlay
            await quiz.bcChatButton.click({ timeout: 5000 });
          } catch (error) {
            console.log('ℹ️ Expected behavior: Chat button may be blocked during network failure');
            console.log(`   Error type: ${error.name}`);
          }
          
          // Wait for any error handling to complete
          await page.waitForTimeout(3000);

          // Check that network failure doesn't cause JavaScript crashes
          const criticalErrors = quiz.getCriticalJavaScriptErrors();
          if (criticalErrors.length > 0) {
            console.log(`❌ Found ${criticalErrors.length} critical JavaScript error(s) during network failure:`);
            criticalErrors.forEach((error, index) => {
              console.log(`${index + 1}. ${error}`);
            });
          } else {
            console.log('✅ Network failure handled gracefully - no JavaScript crashes');
          }
          
          expect(
            criticalErrors.length,
            'Network failure should be handled gracefully without JavaScript crashes',
          ).toBe(0);
        });

        await test.step('Final health check summary', async () => {
          const allErrors = quiz.consoleErrors;
          const unexpectedErrors = quiz.getUnexpectedConsoleErrors();
          const criticalErrors = quiz.getCriticalJavaScriptErrors();
          
          console.log(`📊 Health Check Summary:`);
          console.log(`   Total console messages: ${allErrors.length}`);
          console.log(`   Unexpected errors: ${unexpectedErrors.length}`);
          console.log(`   Critical JavaScript errors: ${criticalErrors.length}`);
          
          if (unexpectedErrors.length === 0 && criticalErrors.length === 0) {
            console.log('✅ Brand Concierge chat is healthy!');
          }
          
          // Final assertion - no unexpected errors overall
          expect(
            unexpectedErrors.length,
            `Final health check failed: ${unexpectedErrors.length} unexpected console errors detected`,
          ).toBe(0);
        });
      },
    );
  }
});
