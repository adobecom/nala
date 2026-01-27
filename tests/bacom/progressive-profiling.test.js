import { expect, test } from '@playwright/test';
import { features } from '../../features/bacom/progressive-profiling.spec.js';
import ProgressiveProfilingForm from '../../selectors/bacom/progressive-profiling.page.js';

/**
 * BACOM Progressive Profiling Test Suite
 *
 * Tests progressive profiling rules for form field visibility and hiding behaviors
 * across Short DX, Medium DX, and RFI forms.
 *
 * =============================================================================
 * FORM FIELD SPECIFICATIONS
 * =============================================================================
 *
 * Essential / Short (flex_content):
 * - First name
 * - Last name
 * - Business email
 * - Organization name
 * - Country
 * - Company type (Depends on POI)
 *
 * Expanded / Medium (flex_event):
 * - First name
 * - Last name
 * - Business email
 * - Job title or role
 * - Department
 * - Organization name
 * - Country
 * - Company type (Depends on POI)
 *
 * Full / Long (flex_contact / RFI):
 * - First name
 * - Last name
 * - Business email
 * - Business phone
 * - Job Title or role
 * - Department
 * - Organization name
 * - Country
 * - State/province
 * - Zip/postal code
 * - Primary product of interest
 *
 * =============================================================================
 * PROGRESSIVE PROFILING RULES
 * =============================================================================
 *
 * KEY RULE: When a user fills a form, previously collected fields become HIDDEN
 * on subsequent forms (not just pre-filled).
 *
 * Journey Rules:
 * - Short → Medium: FirstName, LastName, Company, Phone, PostalCode, State, POI = HIDDEN
 * - Short → RFI: FirstName, LastName, Company = HIDDEN
 * - Medium → RFI: FirstName, LastName, Company, JobTitle, Department = HIDDEN
 *
 * =============================================================================
 * BROWSER/PLATFORM COVERAGE
 * =============================================================================
 * - Chrome (Desktop) - Primary browser
 * - Firefox (Desktop)
 * - Safari/WebKit (Desktop)
 *
 * Email: xiasun+test001@adobetest.com (required @adobetest.com domain)
 */

let ppForm;

/**
 * Field visibility rules by form type for UNKNOWN users
 * Note: companyType is conditional (depends on POI) - tested separately if needed
 */
const FIELD_RULES = {
  // Essential / Short (flex_content)
  short: {
    visible: ['email', 'firstName', 'lastName', 'company', 'country'],
    hidden: ['state', 'postalCode', 'phone', 'jobTitle', 'functionalArea', 'primaryProductInterest'],
    // companyType: conditional based on POI
  },
  // Expanded / Medium (flex_event)
  medium: {
    visible: ['email', 'firstName', 'lastName', 'company', 'country', 'jobTitle', 'functionalArea'],
    hidden: ['state', 'postalCode', 'phone', 'primaryProductInterest'],
    // companyType: conditional based on POI
  },
  // Full / Long (flex_contact / RFI)
  // Note: state/postalCode only appear AFTER selecting a country (dependent fields)
  rfi: {
    visible: ['email', 'firstName', 'lastName', 'company', 'country', 'phone', 'jobTitle', 'functionalArea', 'primaryProductInterest'],
    visibleAfterCountry: ['state', 'postalCode'], // These appear after selecting country
    hidden: [],
  },
};

// Test user data (using @adobetest.com emails as required)
const TEST_USER = {
  email: 'xiasun+test001@adobetest.com',
  firstName: 'NalaTest',
  lastName: 'Progressive',
  company: 'Adobe Nala Test Corp',
  country: 'United States',
  state: 'California',
  postalCode: '95110',
  phone: '408-555-9999',
  jobTitle: 'Individual Contributor',
  functionalArea: 'Marketing: General',
  primaryProductInterest: 'Real-time web analytics',
};

test.describe('BACOM Progressive Profiling Test Suite', () => {
  test.setTimeout(5 * 60 * 1000); // 5 minutes for form tests

  test.beforeEach(async ({ page }) => {
    ppForm = new ProgressiveProfilingForm(page);
  });

  // ===========================================================================
  // UNKNOWN USER TESTS - Field Visibility
  // ===========================================================================

  test.describe('Unknown User - Field Visibility', () => {
    /**
     * Test 0: Unknown user - Short DX form (Essential / flex_content)
     * Expected visible: firstName, lastName, email, company, country
     * Expected hidden: state, postalCode, phone, jobTitle, functionalArea, primaryProductInterest
     */
    test(`${features[0].tcid}: ${features[0].name}, ${features[0].tags}`, async ({ page }) => {
      const testPage = features[0].url;
      console.info(`[Test Page]: ${testPage}`);

      await test.step('Step 1: Clear user state to simulate unknown user', async () => {
        await ppForm.clearUserState();
      });

      await test.step('Step 2: Navigate to Short DX form', async () => {
        await page.goto(testPage);
        await page.waitForLoadState('domcontentloaded');
        await ppForm.clearStorageOnPage();
        await ppForm.waitForFormLoad();
      });

      await test.step('Step 3: Verify Short form fields are visible', async () => {
        const rules = FIELD_RULES.short;
        console.info('[PP] Expected visible fields: firstName, lastName, email, company, country');

        const results = await ppForm.verifyFieldVisibility(rules.visible, rules.hidden);

        console.info('[PP] Field visibility results:');
        results.details.forEach((d) => {
          console.info(`  ${d.field}: expected=${d.expected}, actual=${d.actual}, ${d.pass ? '✓' : '✗'}`);
        });

        expect(results.failed).toBe(0);
      });

      await test.step('Step 4: Verify no fields are pre-filled for unknown user', async () => {
        for (const field of FIELD_RULES.short.visible) {
          if (field !== 'country') { // Country may have a default
            const isPrefilled = await ppForm.isFieldPrefilled(field);
            expect(isPrefilled).toBe(false);
          }
        }
      });
    });

    /**
     * Test 1: Unknown user - Medium DX form (Expanded / flex_event)
     * Expected visible: firstName, lastName, email, company, country, jobTitle, functionalArea
     * Expected hidden: state, postalCode, phone, primaryProductInterest
     */
    test(`${features[1].tcid}: ${features[1].name}, ${features[1].tags}`, async ({ page }) => {
      const testPage = features[1].url;
      console.info(`[Test Page]: ${testPage}`);

      await test.step('Step 1: Clear user state', async () => {
        await ppForm.clearUserState();
      });

      await test.step('Step 2: Navigate to Medium DX form', async () => {
        await page.goto(testPage);
        await page.waitForLoadState('domcontentloaded');
        await ppForm.clearStorageOnPage();
        await ppForm.waitForFormLoad();
      });

      await test.step('Step 3: Verify Medium form fields are visible', async () => {
        const rules = FIELD_RULES.medium;
        console.info('[PP] Expected visible fields: firstName, lastName, email, company, country, jobTitle, functionalArea');

        const results = await ppForm.verifyFieldVisibility(rules.visible, rules.hidden);

        console.info('[PP] Field visibility results:');
        results.details.forEach((d) => {
          console.info(`  ${d.field}: expected=${d.expected}, actual=${d.actual}, ${d.pass ? '✓' : '✗'}`);
        });

        expect(results.failed).toBe(0);
      });
    });

    /**
     * Test 2: Unknown user - RFI form (Full / flex_contact)
     * Expected visible: ALL fields (firstName, lastName, email, company, country,
     *                   state, postalCode, phone, jobTitle, functionalArea, primaryProductInterest)
     * Note: state/postalCode are dependent fields - they appear AFTER selecting a country
     * Expected hidden: none
     */
    test(`${features[2].tcid}: ${features[2].name}, ${features[2].tags}`, async ({ page }) => {
      const testPage = features[2].url;
      console.info(`[Test Page]: ${testPage}`);

      await test.step('Step 1: Clear user state', async () => {
        await ppForm.clearUserState();
      });

      await test.step('Step 2: Navigate to RFI form', async () => {
        await page.goto(testPage);
        await page.waitForLoadState('domcontentloaded');
        await ppForm.clearStorageOnPage();
        await ppForm.waitForFormLoad();
      });

      await test.step('Step 3: Verify RFI form fields are visible (before country selection)', async () => {
        const rules = FIELD_RULES.rfi;
        console.info('[PP] Expected visible fields (before country):');
        console.info('     email, firstName, lastName, company, country, phone, jobTitle, functionalArea, POI');

        const results = await ppForm.verifyFieldVisibility(rules.visible, rules.hidden);

        console.info('[PP] Field visibility results:');
        results.details.forEach((d) => {
          console.info(`  ${d.field}: expected=${d.expected}, actual=${d.actual}, ${d.pass ? '✓' : '✗'}`);
        });

        expect(results.failed).toBe(0);
      });

      await test.step('Step 4: Select country and verify state/postalCode appear', async () => {
        // Select United States to trigger state/postalCode fields
        await ppForm.fillField('country', 'United States');
        await page.waitForTimeout(1000); // Wait for dependent fields to appear

        console.info('[PP] Checking dependent fields after country selection:');
        for (const field of FIELD_RULES.rfi.visibleAfterCountry) {
          const isVisible = await ppForm.isFieldVisible(field);
          console.info(`  ${field}: ${isVisible ? 'VISIBLE ✓' : 'HIDDEN ✗'}`);
          expect(isVisible, `Field "${field}" should be VISIBLE after selecting country`).toBe(true);
        }
      });
    });
  });

  // ===========================================================================
  // JOURNEY TESTS - Short to Medium
  // Previously collected fields should be HIDDEN on Medium form
  // ===========================================================================

  test.describe('Journey: Short to Medium Form', () => {
    /**
     * Test 3: Short to Medium journey
     *
     * After filling Short form (firstName, lastName, email, company, country):
     * - HIDDEN: firstName, lastName, company (already collected)
     * - HIDDEN: phone, postalCode, state, primaryProductInterest (not in Medium)
     * - VISIBLE: email, country (always shown)
     * - VISIBLE: jobTitle, functionalArea (NEW fields to collect)
     */
    test(`${features[3].tcid}: ${features[3].name}, ${features[3].tags}`, async ({ page }) => {
      const { journey } = features[3];
      const firstFormUrl = journey.firstForm.url;
      const secondFormUrl = journey.secondForm.url;

      console.info(`[Journey] First form (Short): ${firstFormUrl}`);
      console.info(`[Journey] Second form (Medium): ${secondFormUrl}`);

      await test.step('Step 1: Clear user state to start as unknown', async () => {
        await ppForm.clearUserState();
      });

      await test.step('Step 2: Fill and submit Short form', async () => {
        await page.goto(firstFormUrl);
        await page.waitForLoadState('domcontentloaded');
        await ppForm.waitForFormLoad();

        // Fill the short form: email, firstName, lastName, company, country
        await ppForm.fillShortForm(TEST_USER);

        // Submit and wait for redirect
        const submitted = await ppForm.submitAndWaitForRedirect();
        expect(submitted).toBe(true);
        console.info('[Journey] Short form submitted successfully');
      });

      await test.step('Step 3: Click email verification link (MANUAL STEP)', async () => {
        console.info('='.repeat(60));
        console.info('[MANUAL STEP] Email Verification Required:');
        console.info('1. Check your email for verification link');
        console.info('2. Click the link (or paste it in the browser)');
        console.info('3. The link will take you to the Medium form with progressive profiling');
        console.info('4. Wait for the form to fully load');
        console.info('');
        console.info('[Short → Medium] Field Verification:');
        console.info('  ✗ HIDDEN: firstName, lastName, company');
        console.info('  ✓ VISIBLE: email, country, jobTitle, dept');
        console.info('');
        console.info('5. Resume the test in Playwright Inspector');
        console.info('='.repeat(60));
        await page.pause();
      });
    });
  });

  // ===========================================================================
  // JOURNEY TESTS - Short to RFI
  // ===========================================================================

  test.describe('Journey: Short to RFI Form', () => {
    /**
     * Test 4: Short to RFI journey
     *
     * After filling Short form (firstName, lastName, email, company, country):
     * - HIDDEN: firstName, lastName, company (already collected)
     * - VISIBLE: email, country (always shown)
     * - VISIBLE: phone, postalCode, state, jobTitle, functionalArea, primaryProductInterest (NEW)
     */
    test(`${features[4].tcid}: ${features[4].name}, ${features[4].tags}`, async ({ page }) => {
      const { journey } = features[4];
      const firstFormUrl = journey.firstForm.url;
      const secondFormUrl = journey.secondForm.url;

      console.info(`[Journey] First form (Short): ${firstFormUrl}`);
      console.info(`[Journey] Second form (RFI): ${secondFormUrl}`);

      await test.step('Step 1: Clear user state', async () => {
        await ppForm.clearUserState();
      });

      await test.step('Step 2: Fill and submit Short form', async () => {
        await page.goto(firstFormUrl);
        await page.waitForLoadState('domcontentloaded');
        await ppForm.waitForFormLoad();
        await ppForm.fillShortForm(TEST_USER);
        const submitted = await ppForm.submitAndWaitForRedirect();
        expect(submitted).toBe(true);
      });

      await test.step('Step 3: Click email verification link (MANUAL STEP)', async () => {
        console.info('='.repeat(60));
        console.info('[MANUAL STEP] Email Verification Required:');
        console.info('1. Check your email for verification link');
        console.info('2. Click the link (or paste it in the browser)');
        console.info('3. The link will take you to the RFI form with progressive profiling');
        console.info('4. Wait for the form to fully load');
        console.info('');
        console.info('[Short → RFI] Field Verification:');
        console.info('  ✗ HIDDEN: firstName, lastName, company');
        console.info('  ✓ VISIBLE: email, country, phone, state, postalCode, jobTitle, dept, POI');
        console.info('');
        console.info('5. Resume the test in Playwright Inspector');
        console.info('='.repeat(60));
        await page.pause();
      });
    });
  });

  // ===========================================================================
  // JOURNEY TESTS - Medium to RFI
  // ===========================================================================

  test.describe('Journey: Medium to RFI Form', () => {
    /**
     * Test 5: Medium to RFI journey
     *
     * After filling Medium form (firstName, lastName, email, company, country, jobTitle, functionalArea):
     * - HIDDEN: firstName, lastName, company, jobTitle, functionalArea (already collected)
     * - VISIBLE: email, country (always shown)
     * - VISIBLE: phone, postalCode, state, primaryProductInterest (NEW)
     */
    test(`${features[5].tcid}: ${features[5].name}, ${features[5].tags}`, async ({ page }) => {
      const { journey } = features[5];
      const firstFormUrl = journey.firstForm.url;
      const secondFormUrl = journey.secondForm.url;

      console.info(`[Journey] First form (Medium): ${firstFormUrl}`);
      console.info(`[Journey] Second form (RFI): ${secondFormUrl}`);

      await test.step('Step 1: Clear user state', async () => {
        await ppForm.clearUserState();
      });

      await test.step('Step 2: Fill and submit Medium form', async () => {
        await page.goto(firstFormUrl);
        await page.waitForLoadState('domcontentloaded');
        await ppForm.waitForFormLoad();
        await ppForm.fillMediumForm(TEST_USER);
        const submitted = await ppForm.submitAndWaitForRedirect();
        expect(submitted).toBe(true);
      });

      await test.step('Step 3: Click email verification link (MANUAL STEP)', async () => {
        console.info('='.repeat(60));
        console.info('[MANUAL STEP] Email Verification Required:');
        console.info('1. Check your email for verification link');
        console.info('2. Click the link (or paste it in the browser)');
        console.info('3. The link will take you to the RFI form with progressive profiling');
        console.info('4. Wait for the form to fully load');
        console.info('');
        console.info('[Medium → RFI] Field Verification:');
        console.info('  ✗ HIDDEN: firstName, lastName, company, jobTitle, dept');
        console.info('  ✓ VISIBLE: email, country, phone, state, postalCode, POI');
        console.info('');
        console.info('5. Resume the test in Playwright Inspector');
        console.info('='.repeat(60));
        await page.pause();
      });
    });
  });

  // ===========================================================================
  // FORM SUBMISSION TESTS
  // ===========================================================================

  test.describe('Form Submission Tests', () => {
    /**
     * Test 6: Submit Short form (Essential / flex_content)
     * Fields to fill: email, firstName, lastName, company, country
     */
    test(`${features[6].tcid}: ${features[6].name}, ${features[6].tags}`, async ({ page }) => {
      const testPage = features[6].url;

      await test.step('Step 1: Clear user state', async () => {
        await ppForm.clearUserState();
      });

      await test.step('Step 2: Navigate to Short form', async () => {
        await page.goto(testPage);
        await page.waitForLoadState('domcontentloaded');
        await ppForm.waitForFormLoad();
      });

      await test.step('Step 3: Fill form with test data', async () => {
        console.info('[PP] Filling Short form: email, firstName, lastName, company, country');
        await ppForm.fillShortForm(TEST_USER);
      });

      await test.step('Step 4: Submit and verify redirect', async () => {
        const submitted = await ppForm.submitAndWaitForRedirect();
        expect(submitted).toBe(true);

        const currentUrl = page.url();
        expect(currentUrl).toContain('submissionid');
        console.info(`[PP] Redirected to: ${currentUrl}`);
      });
    });

    /**
     * Test 7: Submit Medium form (Expanded / flex_event)
     * Fields to fill: email, firstName, lastName, company, country, jobTitle, functionalArea
     */
    test(`${features[7].tcid}: ${features[7].name}, ${features[7].tags}`, async ({ page }) => {
      const testPage = features[7].url;

      await test.step('Step 1: Clear user state', async () => {
        await ppForm.clearUserState();
      });

      await test.step('Step 2: Navigate to Medium form', async () => {
        await page.goto(testPage);
        await page.waitForLoadState('domcontentloaded');
        await ppForm.waitForFormLoad();
      });

      await test.step('Step 3: Fill form with test data', async () => {
        console.info('[PP] Filling Medium form: email, firstName, lastName, company, country, jobTitle, functionalArea');
        await ppForm.fillMediumForm(TEST_USER);
      });

      await test.step('Step 4: Submit and verify redirect', async () => {
        const submitted = await ppForm.submitAndWaitForRedirect();
        expect(submitted).toBe(true);

        const currentUrl = page.url();
        expect(currentUrl).toContain('submissionid');
        console.info(`[PP] Redirected to: ${currentUrl}`);
      });
    });

    /**
     * Test 8: Submit RFI form (Full / flex_contact)
     * Fields to fill: ALL (email, firstName, lastName, company, country,
     *                 state, postalCode, phone, jobTitle, functionalArea, POI)
     */
    test(`${features[8].tcid}: ${features[8].name}, ${features[8].tags}`, async ({ page }) => {
      const testPage = features[8].url;

      await test.step('Step 1: Clear user state', async () => {
        await ppForm.clearUserState();
      });

      await test.step('Step 2: Navigate to RFI form', async () => {
        await page.goto(testPage);
        await page.waitForLoadState('domcontentloaded');
        await ppForm.waitForFormLoad();
      });

      await test.step('Step 3: Fill form with test data', async () => {
        console.info('[PP] Filling RFI form: ALL fields');
        await ppForm.fillRfiForm(TEST_USER);
      });

      await test.step('Step 4: Submit and verify redirect', async () => {
        const submitted = await ppForm.submitAndWaitForRedirect();
        expect(submitted).toBe(true);

        const currentUrl = page.url();
        expect(currentUrl).toContain('submissionid');
        console.info(`[PP] Redirected to: ${currentUrl}`);
      });
    });
  });

  // ===========================================================================
  // EDGE CASE TESTS
  // ===========================================================================

  test.describe('Edge Cases', () => {
    /**
     * Test 9: Cleared cookies - should behave as unknown user
     * Verify that clearing cookies resets user to unknown state
     */
    test(`${features[9].tcid}: ${features[9].name}, ${features[9].tags}`, async ({ page }) => {
      const testPage = features[9].url;

      await test.step('Step 1: First, fill a form to become "known"', async () => {
        await ppForm.clearUserState();
        await page.goto('https://business.adobe.com/resources/form-test-1-essential-dx-stage.html');
        await page.waitForLoadState('domcontentloaded');
        await ppForm.waitForFormLoad();
        await ppForm.fillShortForm(TEST_USER);
        await ppForm.submitAndWaitForRedirect();
      });

      await test.step('Step 2: Clear cookies to simulate unknown user', async () => {
        await ppForm.clearUserState();
      });

      await test.step('Step 3: Navigate to Medium form', async () => {
        await page.goto(testPage);
        await page.waitForLoadState('domcontentloaded');
        await ppForm.clearStorageOnPage();
        await ppForm.waitForFormLoad();
      });

      await test.step('Step 4: Verify all Medium fields are visible (unknown user behavior)', async () => {
        // After clearing cookies, user should be treated as unknown
        // All Medium form fields should be visible (not hidden)
        const rules = FIELD_RULES.medium;
        const results = await ppForm.verifyFieldVisibility(rules.visible, rules.hidden);

        console.info('[PP] Field visibility after cookie clear (should be like unknown user):');
        results.details.forEach((d) => {
          console.info(`  ${d.field}: ${d.actual}, ${d.pass ? '✓' : '✗'}`);
        });

        expect(results.failed).toBe(0);
      });

      await test.step('Step 5: Verify no pre-fill (behaves as unknown)', async () => {
        for (const field of ['email', 'firstName', 'lastName', 'company']) {
          const isPrefilled = await ppForm.isFieldPrefilled(field);
          console.info(`[PP] ${field} prefilled after cookie clear: ${isPrefilled}`);
          expect(isPrefilled, `Field "${field}" should NOT be pre-filled after cookie clear`).toBe(false);
        }
      });
    });
  });
});
