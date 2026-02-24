import { expect } from '@playwright/test';

/**
 * Page Object Model for Primary Product Name Dropdown in DA UI
 * Used for testing the metadata builder tool in Document Authoring
 *
 * DA Live UI Structure:
 * - Left nav: Home, Apps, Files, Learn, Discover
 * - Toolbar: Icons for text, link, list, blocks, table, etc.
 * - Main content: Editor with metadata table
 */
export default class PPNDropdown {
  constructor(page) {
    this.page = page;

    // DA UI base URL pattern
    this.daBaseUrl = 'https://da.live/edit?ref=md-form-block#/adobecom/da-bacom';

    // DA UI Navigation and Toolbar
    this.leftNav = this.page.locator('nav, [class*="nav"], [class*="sidebar"]').first();
    this.toolbar = this.page.locator('[class*="toolbar"], [class*="actions"]').first();

    // Library button - opens the library panel
    this.openLibraryButton = this.page.locator('div.open-library, [title="Open library"]');

    // Library panel - the panel that opens after clicking Library button
    this.libraryPanel = this.page.locator('[class*="library-panel"], [class*="library"]:not(.open-library)').first();

    // Metadata builder item in the library - scroll to find it
    this.libraryMetadataItem = this.page.locator(
      'text=Metadata >> visible=true, '
      + '[class*="metadata-builder"], '
      + 'button:has-text("Metadata"), '
      + 'div:has-text("Metadata"):not(:has(div))',
    ).first();

    // Metadata builder dialog - detected by Close button or dialog title
    this.metadataBuilderDialog = this.page.locator('[role="dialog"]:has-text("Metadata Builder"), [class*="da-library-metadata"]').first();
    this.metadataDialogCloseButton = this.page.locator('button:has-text("Close")');
    this.metadataDialogTitle = this.page.locator('h1:has-text("Metadata Builder"), h2:has-text("Metadata Builder")').first();
    this.metadataTable = this.page.locator('table:has-text("metadata")');

    // Detect dialog is open - use the Close button which is visible in the dialog
    this.selectPropertyText = this.page.locator('button:has-text("Close")');

    // The Metadata Builder content is inside an iframe
    // Iframe selector: .da-library-type-plugin iframe
    this.metadataIframe = this.page.locator('.da-library-type-plugin iframe, iframe[src*="md-formatter"]').first();

    // These selectors will be used on the iframe frame (set in getMetadataFrame method)
    // Property dropdown - native select with class "select-property"
    this.propertyDropdownSelector = 'select.select-property';
    // Value dropdown - native select with class "select-value"
    this.valueDropdownSelector = 'select.select-value';

    // Fallback selectors for page context (won't work for iframe content)
    this.allDropdowns = this.page.locator('select');
    this.allNativeSelects = this.page.locator('select');

    // Action buttons - look for + or add buttons
    this.addButton = this.page.locator(
      'button:has-text("+"), '
      + 'button[title*="add" i], '
      + '[aria-label*="add" i], '
      + 'button:has(svg[class*="plus"])',
    ).first();

    this.removeButton = this.page.locator(
      'button:has-text("-"), '
      + 'button[title*="remove" i], '
      + 'button[title*="delete" i], '
      + '[aria-label*="remove" i]',
    ).first();

    this.saveButton = this.page.locator(
      'button:has-text("Save"), '
      + 'button[title*="save" i], '
      + '[aria-label*="save" i]',
    ).first();

    // Property-value pair rows - look for table rows or form rows
    this.propertyRows = this.page.locator('tr:has(td), [class*="row"]:has(select)');
    this.metadataFields = this.page.locator('td, [class*="field"]');

    // Error and validation elements
    this.errorMessage = this.page.locator(
      '[class*="error"], '
      + '[class*="validation"], '
      + '[role="alert"]',
    );
    this.requiredFieldError = this.page.locator('[class*="required"]');

    // Metadata block in the document - the table showing metadata
    this.metadataBlock = this.page.locator('table:has-text("metadata")');

    // Placeholder values
    this.placeholderProperty = 'Select property';
    this.placeholderValue = 'Select value';
  }

  /**
   * Opens the metadata builder from the library panel
   * Steps:
   * 1. Click "Library" button to open library panel
   * 2. Scroll down in the library to find Metadata Builder
   * 3. Click on Metadata Builder to open it
   */
  async openMetadataBuilder() {
    // Step 1: Click the "Library" button to open library panel
    console.log('Step 1: Opening library panel...');
    await this.openLibraryButton.waitFor({ state: 'visible', timeout: 30000 });
    await this.openLibraryButton.click();

    // Wait for library panel to open
    await this.page.waitForTimeout(1000);

    // Step 2: Scroll down in library to find "Metadata Builder" at the bottom
    console.log('Step 2: Scrolling down to find Metadata Builder at bottom of library...');

    // Find the library panel container to scroll within
    const libraryPanel = this.page.locator('[class*="da-library"]').first();

    // Scroll down multiple times to reach the bottom where "Metadata Builder" is
    for (let i = 0; i < 10; i++) {
      await libraryPanel.press('End');
      await this.page.waitForTimeout(300);
    }

    // Wait for scroll to settle
    await this.page.waitForTimeout(500);

    // Step 3: Find and click "Metadata Builder"
    // Use getByText with exact match to avoid false positives
    const metadataBuilderItem = this.page.getByText('Metadata Builder', { exact: true });

    console.log('Step 3: Clicking on Metadata Builder...');

    // The dialog indicator - "Select property" text appears in the dialog
    const selectPropertyText = this.page.locator('text="Select property"');

    // The dialog has a "Close" button and "Metadata Builder" title - use these to detect dialog
    const dialogCloseButton = this.page.locator('button:has-text("Close")');
    const dialogTitle = this.page.locator('h1:has-text("Metadata Builder"), h2:has-text("Metadata Builder")');

    // Click multiple times due to known bug - dialog appears and disappears
    for (let clickAttempt = 1; clickAttempt <= 5; clickAttempt++) {
      console.log(`Click attempt ${clickAttempt}...`);
      await metadataBuilderItem.click({ force: true });
      await this.page.waitForTimeout(1500);

      // Check if dialog opened - look for Close button or dialog title
      const dialogOpened = await dialogCloseButton.isVisible().catch(() => false)
        || await dialogTitle.isVisible().catch(() => false);
      if (dialogOpened) {
        console.log(`Metadata Builder dialog opened on attempt ${clickAttempt}!`);
        break;
      }

      if (clickAttempt === 5) {
        console.log('Warning: Dialog may not have opened after 5 attempts');
      }
    }

    // Check what elements are now visible - need to check in iframe
    const frameLocator = this.getMetadataFrameLocator();
    const selectCount = await frameLocator.locator('select').count();
    console.log(`Found ${selectCount} select dropdowns in iframe`);
  }

  /**
   * Gets the iframe frame locator containing the Metadata Builder form
   * @returns {FrameLocator} The iframe frame locator
   */
  getMetadataFrameLocator() {
    // Use frameLocator to access elements inside the iframe
    return this.page.frameLocator('.da-library-type-plugin iframe, iframe[src*="md-formatter"]');
  }

  /**
   * Gets the property dropdown locator from within the iframe
   */
  getPropertyDropdown() {
    const frameLocator = this.getMetadataFrameLocator();
    return frameLocator.locator(this.propertyDropdownSelector);
  }

  /**
   * Gets the value dropdown locator from within the iframe
   */
  getValueDropdown() {
    const frameLocator = this.getMetadataFrameLocator();
    return frameLocator.locator(this.valueDropdownSelector);
  }

  /**
   * Selects a property from the property dropdown
   * @param {string} propertyName - The property name to select
   */
  async selectProperty(propertyName) {
    const dropdown = this.getPropertyDropdown();
    await dropdown.selectOption({ label: propertyName });
  }

  /**
   * Selects a property by index
   * @param {number} index - The index of the property to select
   */
  async selectPropertyByIndex(index) {
    const dropdown = this.getPropertyDropdown();
    await dropdown.selectOption({ index });
  }

  /**
   * Selects a value from the value dropdown
   * @param {string} valueName - The value to select
   */
  async selectValue(valueName) {
    const dropdown = this.getValueDropdown();
    await dropdown.selectOption({ label: valueName });
  }

  /**
   * Selects a value by index
   * @param {number} index - The index of the value to select
   */
  async selectValueByIndex(index) {
    await this.valueDropdown.selectOption({ index });
  }

  /**
   * Clicks the add button to add a new property-value pair
   */
  async clickAddButton() {
    await this.addButton.click();
  }

  /**
   * Clicks the remove button to remove a property-value pair
   * @param {number} rowIndex - The index of the row to remove (optional)
   */
  async clickRemoveButton(rowIndex = 0) {
    const removeButtons = this.page.locator('.property-row button.remove, .property-row button:has-text("-")');
    await removeButtons.nth(rowIndex).click();
  }

  /**
   * Gets all options from the property dropdown
   * @returns {Promise<string[]>} Array of property option texts
   */
  async getPropertyOptions() {
    const dropdown = this.getPropertyDropdown();
    const options = await dropdown.locator('option').allTextContents();
    return options;
  }

  /**
   * Gets all options from the value dropdown
   * @returns {Promise<string[]>} Array of value option texts
   */
  async getValueOptions() {
    const dropdown = this.getValueDropdown();
    const options = await dropdown.locator('option').allTextContents();
    return options;
  }

  /**
   * Gets the currently selected property
   * @returns {Promise<string>} The selected property text
   */
  async getSelectedProperty() {
    return this.propertyDropdown.inputValue();
  }

  /**
   * Gets the currently selected value
   * @returns {Promise<string>} The selected value text
   */
  async getSelectedValue() {
    return this.valueDropdown.inputValue();
  }

  /**
   * Checks if the value dropdown contains any empty options (Bug 1)
   * @returns {Promise<boolean>} True if empty options exist
   */
  async hasEmptyValueOptions() {
    const options = await this.getValueOptions();
    // Filter out placeholder option and check for empty/whitespace-only options
    const emptyOptions = options.filter((opt, index) => {
      // Skip the first option if it's the placeholder
      if (index === 0 && opt === this.placeholderValue) return false;
      return opt.trim() === '';
    });
    return emptyOptions.length > 0;
  }

  /**
   * Counts the number of non-empty value options
   * @returns {Promise<number>} Count of valid value options
   */
  async countValidValueOptions() {
    const options = await this.getValueOptions();
    return options.filter((opt) => opt.trim() !== '' && opt !== this.placeholderValue).length;
  }

  /**
   * Attempts to type free text into the value dropdown (should fail)
   * @param {string} text - The text to attempt to type
   */
  async attemptFreeTextInput(text) {
    // Try to type directly into the select element
    await this.valueDropdown.focus();
    await this.page.keyboard.type(text);
  }

  /**
   * Verifies the value dropdown is a select element (not text input)
   * @returns {Promise<boolean>} True if it's a select element
   */
  async isValueDropdownSelect() {
    const tagName = await this.valueDropdown.evaluate((el) => el.tagName.toLowerCase());
    return tagName === 'select';
  }

  /**
   * Adds a complete property-value pair
   * @param {string} property - The property name
   * @param {string} value - The value to select
   */
  async addPropertyValuePair(property, value) {
    await this.selectProperty(property);
    await this.selectValue(value);
    await this.clickAddButton();
  }

  /**
   * Verifies the metadata field contains the expected value
   * @param {string} property - The property name
   * @param {string} expectedValue - The expected value
   */
  async verifyMetadataFieldValue(property, expectedValue) {
    const metadataField = this.page.locator(`[data-property="${property}"]`);
    await expect(metadataField).toContainText(expectedValue);
  }

  /**
   * Gets the number of property-value rows
   * @returns {Promise<number>} Count of property rows
   */
  async getPropertyRowCount() {
    return this.propertyRows.count();
  }

  /**
   * Verifies the dropdown value resets after switching properties (Bug 2)
   * @param {string} firstProperty - The first property to select
   * @param {number} valueIndex - The index of the value to select
   * @param {string} secondProperty - The second property to switch to
   * @returns {Promise<boolean>} True if value properly resets
   */
  async verifyValueResetsOnPropertySwitch(firstProperty, valueIndex, secondProperty) {
    // Select first property and a value
    await this.selectProperty(firstProperty);
    await this.selectValueByIndex(valueIndex);

    // Switch to second property
    await this.selectProperty(secondProperty);

    // Check if value has reset to placeholder
    const selectedValue = await this.getSelectedValue();
    return selectedValue === '' || selectedValue === this.placeholderValue;
  }

  /**
   * Verifies that clicking add without selecting a value shows error (Bug 3)
   * @returns {Promise<boolean>} True if error is shown or action is prevented
   */
  async verifyAddWithoutValuePrevented() {
    const initialRowCount = await this.getPropertyRowCount();
    await this.clickAddButton();

    // Check if error is shown OR if no new row was added
    const errorVisible = await this.errorMessage.isVisible().catch(() => false);
    const newRowCount = await this.getPropertyRowCount();

    return errorVisible || newRowCount === initialRowCount;
  }

  /**
   * Executes the complex flow from Bug 4
   * @param {string} property - The property to test with
   * @returns {Promise<number>} Number of options in value dropdown
   */
  async executeBug4Flow(property) {
    // Step 1: Select a property
    await this.selectProperty(property);

    // Step 2: Select the placeholder property
    await this.selectProperty(this.placeholderProperty);

    // Step 3: Click add button without selecting a value
    await this.clickAddButton();

    // Step 4: Select a property again
    await this.selectProperty(property);

    // Step 5: Check value dropdown options
    const options = await this.getValueOptions();
    return options.filter((opt) => opt.trim() !== '').length;
  }

  /**
   * Saves the metadata and verifies it's applied
   */
  async saveMetadata() {
    await this.saveButton.click();
    // Wait for save to complete
    await this.page.waitForTimeout(1000);
  }

  /**
   * Navigates to a DA edit page
   * @param {string} pagePath - The path to the page
   */
  async navigateToDAPage(pagePath) {
    const fullUrl = `${this.daBaseUrl}${pagePath}`;
    await this.page.goto(fullUrl);
    await this.page.waitForLoadState('domcontentloaded');
  }
}
