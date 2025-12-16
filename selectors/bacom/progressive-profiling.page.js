import { expect } from '@playwright/test';

/**
 * Progressive Profiling Form Page Object
 * Handles form field interactions and validations for progressive profiling tests
 *
 * =============================================================================
 * FORM FIELD SPECIFICATIONS
 * =============================================================================
 *
 * Essential / Short (flex_content):
 * - First name (FirstName)
 * - Last name (LastName)
 * - Business email (Email)
 * - Organization name (mktoFormsCompany)
 * - Country (Country)
 * - Company type* (mktoFormsCompanyType) - Depends on POI
 *
 * Expanded / Medium (flex_event):
 * - First name (FirstName)
 * - Last name (LastName)
 * - Business email (Email)
 * - Job title or role (mktoFormsJobTitle)
 * - Department (mktoFormsFunctionalArea)
 * - Organization name (mktoFormsCompany)
 * - Country (Country)
 * - Company type* (mktoFormsCompanyType) - Depends on POI
 *
 * Full / Long (flex_contact / RFI):
 * - First name (FirstName)
 * - Last name (LastName)
 * - Business email (Email)
 * - Business phone (Phone)
 * - Job Title or role (mktoFormsJobTitle)
 * - Department (mktoFormsFunctionalArea)
 * - Organization name (mktoFormsCompany)
 * - Country (Country)
 * - State/province (State)
 * - Zip/postal code (PostalCode)
 * - Primary product of interest (mktoFormsPrimaryProductInterest)
 *
 * =============================================================================
 * PROGRESSIVE PROFILING RULES
 * =============================================================================
 *
 * Previously collected fields become HIDDEN on subsequent forms:
 * - Short → Medium: firstName, lastName, company become HIDDEN
 * - Short → RFI: firstName, lastName, company become HIDDEN
 * - Medium → RFI: firstName, lastName, company, jobTitle, department become HIDDEN
 */
export default class ProgressiveProfilingForm {
  constructor(page) {
    this.page = page;
    this.marketo = this.page.locator('.marketo');

    // ==========================================================================
    // Core fields (Short/Essential form - flex_content)
    // ==========================================================================
    this.email = this.marketo.locator('input[name="Email"]');           // Business email
    this.firstName = this.marketo.locator('input[name="FirstName"]');   // First name
    this.lastName = this.marketo.locator('input[name="LastName"]');     // Last name
    this.company = this.marketo.locator('input[name="mktoFormsCompany"]'); // Organization name
    this.country = this.marketo.locator('select[name="Country"]');      // Country

    // ==========================================================================
    // Medium/Expanded form fields (flex_event) - additional fields
    // ==========================================================================
    this.jobTitle = this.marketo.locator('select[name="mktoFormsJobTitle"]');       // Job title or role
    this.functionalArea = this.marketo.locator('select[name="mktoFormsFunctionalArea"]'); // Department

    // ==========================================================================
    // RFI/Full form fields (flex_contact) - additional fields
    // ==========================================================================
    this.phone = this.marketo.locator('input[name="Phone"]');           // Business phone
    this.state = this.marketo.locator('select[name="State"]');          // State/province
    this.postalCode = this.marketo.locator('input[name="PostalCode"]'); // Zip/postal code
    this.primaryProductInterest = this.marketo.locator('select[name="mktoFormsPrimaryProductInterest"]'); // Primary product of interest

    // ==========================================================================
    // Conditional field (depends on POI)
    // ==========================================================================
    this.companyType = this.marketo.locator('select[name="mktoFormsCompanyType"]'); // Company type

    // ==========================================================================
    // Form elements
    // ==========================================================================
    this.submitButton = this.marketo.locator('#mktoButton_new');
    this.formTitle = this.marketo.locator('.marketo-title');
    this.formDescription = this.marketo.locator('.marketo-description');
    this.errorMessage = this.marketo.locator('.msg-error');

    // Field name to locator mapping
    this.fieldMap = {
      email: this.email,
      firstName: this.firstName,
      lastName: this.lastName,
      company: this.company,
      country: this.country,
      jobTitle: this.jobTitle,
      functionalArea: this.functionalArea,
      phone: this.phone,
      state: this.state,
      postalCode: this.postalCode,
      primaryProductInterest: this.primaryProductInterest,
      companyType: this.companyType,
    };
  }

  /**
   * Wait for the form to be fully loaded
   */
  async waitForFormLoad() {
    await this.marketo.waitFor({ state: 'visible', timeout: 30000 });
    await this.email.waitFor({ state: 'visible', timeout: 30000 });
  }

  /**
   * Get the current form template type from window object
   * @returns {Promise<string>} The form template (flex_content, flex_event, flex_contact)
   */
  async getFormTemplate() {
    const template = await this.page.evaluate(
      'window.mcz_marketoForm_pref?.form?.template',
    );
    return template || 'unknown';
  }

  /**
   * Get the Product of Interest (POI) from the form config
   * @returns {Promise<string>} The POI value
   */
  async getPOI() {
    const poi = await this.page.evaluate(
      'window.mcz_marketoForm_pref?.program?.poi',
    );
    return poi || '';
  }

  /**
   * Check if a field is visible on the form
   * @param {string} fieldName - Name of the field to check
   * @returns {Promise<boolean>} True if field is visible
   */
  async isFieldVisible(fieldName) {
    const field = this.fieldMap[fieldName];
    if (!field) {
      console.warn(`[PP] Unknown field: ${fieldName}`);
      return false;
    }

    try {
      const isVisible = await field.isVisible({ timeout: 5000 });
      return isVisible;
    } catch {
      return false;
    }
  }

  /**
   * Check if a field is hidden on the form
   * @param {string} fieldName - Name of the field to check
   * @returns {Promise<boolean>} True if field is hidden
   */
  async isFieldHidden(fieldName) {
    return !(await this.isFieldVisible(fieldName));
  }

  /**
   * Check if a field has a pre-filled value
   * @param {string} fieldName - Name of the field to check
   * @returns {Promise<boolean>} True if field has a value
   */
  async isFieldPrefilled(fieldName) {
    const field = this.fieldMap[fieldName];
    if (!field) {
      console.warn(`[PP] Unknown field: ${fieldName}`);
      return false;
    }

    try {
      const isVisible = await field.isVisible({ timeout: 3000 });
      if (!isVisible) return false;

      const tagName = await field.evaluate((el) => el.tagName.toLowerCase());

      if (tagName === 'select') {
        const selectedValue = await field.inputValue();
        // A select is prefilled if it has a non-empty, non-placeholder value
        return selectedValue !== '' && selectedValue !== '0';
      }
      // For input fields
      const value = await field.inputValue();
      return value !== '' && value.length > 0;
    } catch {
      return false;
    }
  }

  /**
   * Get the current value of a field
   * @param {string} fieldName - Name of the field
   * @returns {Promise<string>} The field value
   */
  async getFieldValue(fieldName) {
    const field = this.fieldMap[fieldName];
    if (!field) return '';

    try {
      const isVisible = await field.isVisible({ timeout: 3000 });
      if (!isVisible) return '';

      return await field.inputValue();
    } catch {
      return '';
    }
  }

  /**
   * Fill a form field with a value
   * @param {string} fieldName - Name of the field
   * @param {string} value - Value to fill
   */
  async fillField(fieldName, value) {
    const field = this.fieldMap[fieldName];
    if (!field) {
      console.warn(`[PP] Unknown field: ${fieldName}`);
      return;
    }

    const tagName = await field.evaluate((el) => el.tagName.toLowerCase());

    if (tagName === 'select') {
      // Try to select by visible text first, then by index
      try {
        await field.selectOption({ label: value });
      } catch {
        await field.selectOption({ index: 1 });
      }
    } else {
      await field.fill(value);
    }
  }

  /**
   * Fill the Short/Essential form (flex_content) with test data
   * Fields: email, firstName, lastName, company, country
   * @param {Object} userData - User data object with field values
   */
  async fillShortForm(userData) {
    await this.fillField('email', userData.email);
    await this.fillField('firstName', userData.firstName);
    await this.fillField('lastName', userData.lastName);
    await this.fillField('company', userData.company);
    await this.fillField('country', userData.country);
  }

  /**
   * Fill the Medium/Expanded form (flex_event) with test data
   * Fields: email, firstName, lastName, company, country, jobTitle, functionalArea
   * @param {Object} userData - User data object with field values
   */
  async fillMediumForm(userData) {
    await this.fillShortForm(userData);
    await this.fillField('jobTitle', userData.jobTitle);
    await this.fillField('functionalArea', userData.functionalArea);
  }

  /**
   * Fill the RFI/Full form (flex_contact) with test data
   * Fields: ALL (email, firstName, lastName, company, country, jobTitle, functionalArea,
   *         phone, state, postalCode, primaryProductInterest)
   * @param {Object} userData - User data object with field values
   */
  async fillRfiForm(userData) {
    await this.fillMediumForm(userData);
    await this.fillField('phone', userData.phone);
    await this.fillField('state', userData.state);
    await this.fillField('postalCode', userData.postalCode);
    await this.fillField('primaryProductInterest', userData.primaryProductInterest);
  }

  /**
   * Fill only the visible/new fields on a form
   * Used for journey scenarios where some fields are HIDDEN
   * @param {Object} userData - User data object
   * @param {string[]} fieldsToFill - Array of field names to fill (only visible ones)
   */
  async fillVisibleFields(userData, fieldsToFill) {
    for (const fieldName of fieldsToFill) {
      const isVisible = await this.isFieldVisible(fieldName);
      if (isVisible && userData[fieldName]) {
        await this.fillField(fieldName, userData[fieldName]);
      }
    }
  }

  /**
   * Fill only the new/progressive fields (fields that appear after previous form fill)
   * @param {Object} userData - User data object
   * @param {string[]} newFields - Array of field names to fill
   */
  async fillProgressiveFields(userData, newFields) {
    for (const fieldName of newFields) {
      if (userData[fieldName]) {
        await this.fillField(fieldName, userData[fieldName]);
      }
    }
  }

  /**
   * Submit the form
   */
  async submitForm() {
    await this.submitButton.click();
  }

  /**
   * Submit form and wait for redirect to thank you page
   * @returns {Promise<boolean>} True if redirected successfully
   */
  async submitAndWaitForRedirect() {
    await this.submitForm();

    try {
      await expect(async () => {
        await this.submitButton.waitFor({ state: 'detached', timeout: 30000 });
        const currentUrl = this.page.url();
        expect(currentUrl).toContain('submissionid');
      }).toPass({ timeout: 60000 });
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Verify field visibility matches expected rules
   * @param {string[]} expectedVisible - Fields that should be visible
   * @param {string[]} expectedHidden - Fields that should be hidden
   * @returns {Promise<Object>} Results with pass/fail counts
   */
  async verifyFieldVisibility(expectedVisible, expectedHidden) {
    const results = {
      passed: 0,
      failed: 0,
      details: [],
    };

    // Check visible fields
    for (const fieldName of expectedVisible) {
      const isVisible = await this.isFieldVisible(fieldName);
      if (isVisible) {
        results.passed += 1;
        results.details.push({ field: fieldName, expected: 'visible', actual: 'visible', pass: true });
      } else {
        results.failed += 1;
        results.details.push({ field: fieldName, expected: 'visible', actual: 'hidden', pass: false });
      }
    }

    // Check hidden fields
    for (const fieldName of expectedHidden) {
      const isHidden = await this.isFieldHidden(fieldName);
      if (isHidden) {
        results.passed += 1;
        results.details.push({ field: fieldName, expected: 'hidden', actual: 'hidden', pass: true });
      } else {
        results.failed += 1;
        results.details.push({ field: fieldName, expected: 'hidden', actual: 'visible', pass: false });
      }
    }

    return results;
  }

  /**
   * Verify field pre-fill status matches expected rules
   * @param {string[]} expectedPrefilled - Fields that should be pre-filled
   * @param {string[]} expectedEmpty - Fields that should be empty (new progressive fields)
   * @returns {Promise<Object>} Results with pass/fail counts
   */
  async verifyFieldPrefill(expectedPrefilled, expectedEmpty) {
    const results = {
      passed: 0,
      failed: 0,
      details: [],
    };

    // Check pre-filled fields
    for (const fieldName of expectedPrefilled) {
      const isPrefilled = await this.isFieldPrefilled(fieldName);
      if (isPrefilled) {
        results.passed += 1;
        const value = await this.getFieldValue(fieldName);
        results.details.push({
          field: fieldName, expected: 'prefilled', actual: `prefilled (${value})`, pass: true,
        });
      } else {
        results.failed += 1;
        results.details.push({
          field: fieldName, expected: 'prefilled', actual: 'empty', pass: false,
        });
      }
    }

    // Check empty fields (new progressive fields should not be pre-filled)
    for (const fieldName of expectedEmpty) {
      const isPrefilled = await this.isFieldPrefilled(fieldName);
      if (!isPrefilled) {
        results.passed += 1;
        results.details.push({
          field: fieldName, expected: 'empty', actual: 'empty', pass: true,
        });
      } else {
        results.failed += 1;
        const value = await this.getFieldValue(fieldName);
        results.details.push({
          field: fieldName, expected: 'empty', actual: `prefilled (${value})`, pass: false,
        });
      }
    }

    return results;
  }

  /**
   * Log the current form state for debugging
   */
  async logFormState() {
    console.info('[PP] Form State:');
    console.info(`  Template: ${await this.getFormTemplate()}`);
    console.info(`  POI: ${await this.getPOI()}`);

    for (const [name, field] of Object.entries(this.fieldMap)) {
      try {
        const isVisible = await field.isVisible({ timeout: 1000 });
        if (isVisible) {
          const value = await field.inputValue();
          console.info(`  ${name}: visible, value="${value}"`);
        } else {
          console.info(`  ${name}: hidden`);
        }
      } catch {
        console.info(`  ${name}: not found`);
      }
    }
  }

  /**
   * Clear browser storage to simulate unknown user
   * Note: localStorage/sessionStorage can only be cleared after navigating to a page
   */
  async clearUserState() {
    // Clear cookies - this works without a page
    await this.page.context().clearCookies();
  }

  /**
   * Clear localStorage and sessionStorage after page is loaded
   * Must be called AFTER navigating to a page
   */
  async clearStorageOnPage() {
    try {
      await this.page.evaluate(() => {
        localStorage.clear();
        sessionStorage.clear();
      });
    } catch (e) {
      // Ignore errors - storage may not be accessible on some pages
      console.info('[PP] Could not clear storage (may be expected):', e.message);
    }
  }
}
