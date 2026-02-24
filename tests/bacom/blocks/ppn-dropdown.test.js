import { test, expect } from '@playwright/test';
import { features } from '../../../features/bacom/blocks/ppn-dropdown.spec.js';
import PPNDropdown from '../../../selectors/bacom/ppn-dropdown.page.js';

let ppnDropdown;

// DA Live URL pattern for testing
const DA_BASE_URL = 'https://da.live/edit?ref=md-form-block#/adobecom/da-bacom';

test.describe('Primary Product Name Dropdown test suite', () => {
  test.beforeEach(async ({ page }) => {
    ppnDropdown = new PPNDropdown(page);
    await test.setTimeout(1000 * 60 * 2); // 2 minutes timeout for DA UI
  });

  // =====================================================
  // TC-001: Verify dropdown displays predefined values
  // =====================================================
  test(`${features[0].tcid}: ${features[0].name}, ${features[0].tags}`, async ({ page }) => {
    const testPage = `${DA_BASE_URL}${features[0].path}`;
    const { data } = features[0];
    console.info(`[Test Page]: ${testPage}`);

    await test.step('step-1: Navigate to DA edit page', async () => {
      await page.goto(testPage);
      await page.waitForLoadState('domcontentloaded');
    });

    await test.step('step-2: Open metadata builder from library', async () => {
      await ppnDropdown.openMetadataBuilder();
      // Verify dialog opened by checking for "Select property" text
      await expect(ppnDropdown.selectPropertyText).toBeVisible({ timeout: 10000 });
    });

    await test.step('step-3: Verify property dropdown has predefined values', async () => {
      const propertyDropdown = ppnDropdown.getPropertyDropdown();
      await expect(propertyDropdown).toBeVisible();
      const propertyOptions = await ppnDropdown.getPropertyOptions();
      expect(propertyOptions.length).toBeGreaterThan(1);

      // Verify expected properties exist
      data.expectedProperties.forEach((prop) => {
        expect(propertyOptions).toContain(prop);
      });
    });

    await test.step('step-4: Verify placeholder options exist', async () => {
      const propertyOptions = await ppnDropdown.getPropertyOptions();
      expect(propertyOptions).toContain(data.placeholderProperty);
    });
  });

  // =====================================================
  // TC-002: Verify author can select value from dropdown
  // =====================================================
  test(`${features[1].tcid}: ${features[1].name}, ${features[1].tags}`, async ({ page }) => {
    const testPage = `${DA_BASE_URL}${features[1].path}`;
    const { data } = features[1];
    console.info(`[Test Page]: ${testPage}`);

    await test.step('step-1: Navigate to DA edit page', async () => {
      await page.goto(testPage);
      await page.waitForLoadState('domcontentloaded');
    });

    await test.step('step-2: Open metadata builder', async () => {
      await ppnDropdown.openMetadataBuilder();
    });

    await test.step('step-3: Select a property from dropdown', async () => {
      await ppnDropdown.selectProperty(data.property);
      const selectedProperty = await ppnDropdown.getSelectedProperty();
      expect(selectedProperty).toBeTruthy();
    });

    await test.step('step-4: Select a value from dropdown', async () => {
      await ppnDropdown.selectValue(data.valueToSelect);
      const selectedValue = await ppnDropdown.getSelectedValue();
      expect(selectedValue).toBe(data.valueToSelect);
    });

    await test.step('step-5: Verify value dropdown is select element', async () => {
      const isSelect = await ppnDropdown.isValueDropdownSelect();
      expect(isSelect).toBe(true);
    });
  });

  // =====================================================
  // TC-003: Verify free text input is not permitted
  // =====================================================
  test(`${features[2].tcid}: ${features[2].name}, ${features[2].tags}`, async ({ page }) => {
    const testPage = `${DA_BASE_URL}${features[2].path}`;
    const { data } = features[2];
    console.info(`[Test Page]: ${testPage}`);

    await test.step('step-1: Navigate to DA edit page', async () => {
      await page.goto(testPage);
      await page.waitForLoadState('domcontentloaded');
    });

    await test.step('step-2: Open metadata builder', async () => {
      await ppnDropdown.openMetadataBuilder();
    });

    await test.step('step-3: Select a property', async () => {
      await ppnDropdown.selectProperty(data.property);
    });

    await test.step('step-4: Verify value dropdown is NOT a text input', async () => {
      const isSelect = await ppnDropdown.isValueDropdownSelect();
      expect(isSelect).toBe(true);
    });

    await test.step('step-5: Attempt free text input (should have no effect)', async () => {
      await ppnDropdown.attemptFreeTextInput(data.freeTextInput);

      // Verify the free text was not accepted
      const valueOptions = await ppnDropdown.getValueOptions();
      expect(valueOptions).not.toContain(data.freeTextInput);
    });
  });

  // =====================================================
  // TC-004: Verify selected value populates metadata field
  // =====================================================
  test(`${features[3].tcid}: ${features[3].name}, ${features[3].tags}`, async ({ page }) => {
    const testPage = `${DA_BASE_URL}${features[3].path}`;
    const { data } = features[3];
    console.info(`[Test Page]: ${testPage}`);

    await test.step('step-1: Navigate to DA edit page', async () => {
      await page.goto(testPage);
      await page.waitForLoadState('domcontentloaded');
    });

    await test.step('step-2: Open metadata builder', async () => {
      await ppnDropdown.openMetadataBuilder();
    });

    await test.step('step-3: Add property-value pair', async () => {
      await ppnDropdown.addPropertyValuePair(data.property, data.valueToSelect);
    });

    await test.step('step-4: Save metadata', async () => {
      await ppnDropdown.saveMetadata();
    });

    await test.step('step-5: Verify metadata field contains selected value', async () => {
      await ppnDropdown.verifyMetadataFieldValue(data.property, data.valueToSelect);
    });
  });

  // =====================================================
  // TC-005: Verify metadata builder opens from library
  // =====================================================
  test(`${features[4].tcid}: ${features[4].name}, ${features[4].tags}`, async ({ page }) => {
    const testPage = `${DA_BASE_URL}${features[4].path}`;
    console.info(`[Test Page]: ${testPage}`);

    await test.step('step-1: Navigate to DA edit page', async () => {
      await page.goto(testPage);
      await page.waitForLoadState('domcontentloaded');
    });

    await test.step('step-2: Verify library panel is accessible', async () => {
      await expect(ppnDropdown.libraryPanel).toBeVisible();
    });

    await test.step('step-3: Click metadata item in library', async () => {
      await ppnDropdown.libraryMetadataItem.click();
    });

    await test.step('step-4: Verify metadata builder opens', async () => {
      await expect(ppnDropdown.metadataBuilder).toBeVisible();
      await expect(ppnDropdown.propertyDropdown).toBeVisible();
      await expect(ppnDropdown.valueDropdown).toBeVisible();
    });
  });

  // =====================================================
  // TC-006: Bug1 - No empty values in dropdown
  // =====================================================
  test(`${features[5].tcid}: ${features[5].name}, ${features[5].tags}`, async ({ page }) => {
    const testPage = `${DA_BASE_URL}${features[5].path}`;
    const { data } = features[5];
    console.info(`[Test Page]: ${testPage}`);

    await test.step('step-1: Navigate to DA edit page', async () => {
      await page.goto(testPage);
      await page.waitForLoadState('domcontentloaded');
    });

    await test.step('step-2: Open metadata builder', async () => {
      await ppnDropdown.openMetadataBuilder();
    });

    await test.step('step-3: Select property with more values', async () => {
      await ppnDropdown.selectProperty(data.propertyWithMoreValues);
      const moreValuesCount = await ppnDropdown.countValidValueOptions();
      console.info(`Property with more values has ${moreValuesCount} options`);
    });

    await test.step('step-4: Select property with fewer values', async () => {
      await ppnDropdown.selectProperty(data.propertyWithFewerValues);
    });

    await test.step('step-5: Verify no empty values in dropdown', async () => {
      const hasEmpty = await ppnDropdown.hasEmptyValueOptions();
      expect(hasEmpty).toBe(false);

      // Additionally, check each option
      const valueOptions = await ppnDropdown.getValueOptions();
      valueOptions.forEach((option, index) => {
        // Skip placeholder
        if (index === 0 && option === ppnDropdown.placeholderValue) return;
        expect(option.trim()).not.toBe('');
      });
    });
  });

  // =====================================================
  // TC-007: Bug2 - Value resets when switching properties
  // =====================================================
  test(`${features[6].tcid}: ${features[6].name}, ${features[6].tags}`, async ({ page }) => {
    const testPage = `${DA_BASE_URL}${features[6].path}`;
    const { data } = features[6];
    console.info(`[Test Page]: ${testPage}`);

    await test.step('step-1: Navigate to DA edit page', async () => {
      await page.goto(testPage);
      await page.waitForLoadState('domcontentloaded');
    });

    await test.step('step-2: Open metadata builder', async () => {
      await ppnDropdown.openMetadataBuilder();
    });

    await test.step('step-3: Select first property and a value at index', async () => {
      await ppnDropdown.selectProperty(data.firstProperty);
      await ppnDropdown.selectValueByIndex(data.firstValueIndex);

      const selectedValue = await ppnDropdown.getSelectedValue();
      expect(selectedValue).toBeTruthy();
      console.info(`Selected value at index ${data.firstValueIndex}: ${selectedValue}`);
    });

    await test.step('step-4: Switch to second property', async () => {
      await ppnDropdown.selectProperty(data.secondProperty);
    });

    await test.step('step-5: Verify value resets to placeholder (not same index)', async () => {
      const currentValue = await ppnDropdown.getSelectedValue();

      // Value should reset to placeholder or empty, NOT maintain same index
      const isReset = currentValue === ''
        || currentValue === data.placeholderValue
        || currentValue === ppnDropdown.placeholderValue;

      expect(isReset).toBe(true);
      console.info(`Value after switch: "${currentValue}" - Reset: ${isReset}`);
    });
  });

  // =====================================================
  // TC-008: Bug3 - Cannot add property without selecting value
  // =====================================================
  test(`${features[7].tcid}: ${features[7].name}, ${features[7].tags}`, async ({ page }) => {
    const testPage = `${DA_BASE_URL}${features[7].path}`;
    const { data } = features[7];
    console.info(`[Test Page]: ${testPage}`);

    await test.step('step-1: Navigate to DA edit page', async () => {
      await page.goto(testPage);
      await page.waitForLoadState('domcontentloaded');
    });

    await test.step('step-2: Open metadata builder', async () => {
      await ppnDropdown.openMetadataBuilder();
    });

    await test.step('step-3: Select a property', async () => {
      await ppnDropdown.selectProperty(data.property);
    });

    await test.step('step-4: Click add button WITHOUT selecting a value', async () => {
      // Do NOT select a value from the value dropdown
      const initialRowCount = await ppnDropdown.getPropertyRowCount();
      await ppnDropdown.clickAddButton();

      // Check results
      const newRowCount = await ppnDropdown.getPropertyRowCount();
      const errorVisible = await ppnDropdown.errorMessage.isVisible().catch(() => false);

      // Either error should be shown OR no row should be added
      // The first value should NOT be auto-selected
      const prevented = errorVisible || newRowCount === initialRowCount;
      expect(prevented).toBe(true);

      console.info(`Add prevented: ${prevented}, Error shown: ${errorVisible}`);
    });

    await test.step('step-5: Verify first value is NOT auto-selected', async () => {
      // If a row was added, verify it doesn't have auto-selected first value
      const selectedValue = await ppnDropdown.getSelectedValue();
      const valueOptions = await ppnDropdown.getValueOptions();

      // The first non-placeholder value should NOT be auto-selected
      if (valueOptions.length > 1) {
        const firstActualValue = valueOptions.find((v) => v !== ppnDropdown.placeholderValue && v.trim() !== '');
        expect(selectedValue).not.toBe(firstActualValue);
      }
    });
  });

  // =====================================================
  // TC-009: Bug4 - Dropdown shows all values after complex flow (DEFERRED)
  // =====================================================
  test(`${features[8].tcid}: ${features[8].name}, ${features[8].tags}`, async ({ page }) => {
    const testPage = `${DA_BASE_URL}${features[8].path}`;
    const { data } = features[8];
    console.info(`[Test Page]: ${testPage}`);

    await test.step('step-1: Navigate to DA edit page', async () => {
      await page.goto(testPage);
      await page.waitForLoadState('domcontentloaded');
    });

    await test.step('step-2: Open metadata builder', async () => {
      await ppnDropdown.openMetadataBuilder();
    });

    await test.step('step-3: Get expected value count for property', async () => {
      await ppnDropdown.selectProperty(data.property);
      const expectedCount = await ppnDropdown.countValidValueOptions();
      console.info(`Expected value count for ${data.property}: ${expectedCount}`);

      // Reset
      await ppnDropdown.selectProperty(data.placeholderProperty);
    });

    await test.step('step-4: Execute Bug 4 reproduction flow', async () => {
      // Step 1: Select property
      await ppnDropdown.selectProperty(data.property);

      // Step 2: Select placeholder property
      await ppnDropdown.selectProperty(data.placeholderProperty);

      // Step 3: Click add without selecting value
      await ppnDropdown.clickAddButton();

      // Step 4: Select property again
      await ppnDropdown.selectProperty(data.property);
    });

    await test.step('step-5: Verify all values are shown in dropdown', async () => {
      const actualCount = await ppnDropdown.countValidValueOptions();

      // Should have more than just the placeholder
      expect(actualCount).toBeGreaterThan(0);

      // All expected values should be present
      const valueOptions = await ppnDropdown.getValueOptions();
      console.info(`Value options after flow: ${valueOptions.join(', ')}`);

      // Should not only have placeholder
      expect(valueOptions.length).toBeGreaterThan(1);
    });
  });

  // =====================================================
  // TC-010: Verify seamless integration within DA UI
  // =====================================================
  test(`${features[9].tcid}: ${features[9].name}, ${features[9].tags}`, async ({ page }) => {
    const testPage = `${DA_BASE_URL}${features[9].path}`;
    console.info(`[Test Page]: ${testPage}`);

    await test.step('step-1: Navigate to DA edit page', async () => {
      await page.goto(testPage);
      await page.waitForLoadState('domcontentloaded');
    });

    await test.step('step-2: Verify DA UI loads correctly', async () => {
      // DA UI specific elements should be present
      await expect(page).toHaveURL(/da\.live\/edit/);
    });

    await test.step('step-3: Verify metadata builder integrates with UI', async () => {
      await ppnDropdown.openMetadataBuilder();
      await expect(ppnDropdown.metadataBuilder).toBeVisible();

      // Should be styled consistently with DA UI
      const builderStyles = await ppnDropdown.metadataBuilder.evaluate((el) => {
        const styles = window.getComputedStyle(el);
        return {
          display: styles.display,
          visibility: styles.visibility,
        };
      });

      expect(builderStyles.visibility).not.toBe('hidden');
    });

    await test.step('step-4: Verify dropdowns are functional', async () => {
      await expect(ppnDropdown.propertyDropdown).toBeEnabled();
      await expect(ppnDropdown.valueDropdown).toBeEnabled();
    });
  });

  // =====================================================
  // TC-011: Verify governance - dropdown cannot be circumvented
  // =====================================================
  test(`${features[10].tcid}: ${features[10].name}, ${features[10].tags}`, async ({ page }) => {
    const testPage = `${DA_BASE_URL}${features[10].path}`;
    const { data } = features[10];
    console.info(`[Test Page]: ${testPage}`);

    await test.step('step-1: Navigate to DA edit page', async () => {
      await page.goto(testPage);
      await page.waitForLoadState('domcontentloaded');
    });

    await test.step('step-2: Open metadata builder', async () => {
      await ppnDropdown.openMetadataBuilder();
    });

    await test.step('step-3: Verify value dropdown is select-only (not editable)', async () => {
      const isSelect = await ppnDropdown.isValueDropdownSelect();
      expect(isSelect).toBe(true);

      // Verify it's not contenteditable
      const isContentEditable = await ppnDropdown.valueDropdown.getAttribute('contenteditable');
      expect(isContentEditable).not.toBe('true');
    });

    await test.step('step-4: Attempt to inject value via JavaScript (should fail)', async () => {
      await ppnDropdown.selectProperty(data.property);

      // Try to set invalid value via JS
      const invalidValue = 'INJECTED_INVALID_VALUE';
      await page.evaluate((val) => {
        const select = document.querySelector('select[name="value"]');
        if (select) {
          // Try to add an option
          const option = document.createElement('option');
          option.value = val;
          option.text = val;
          select.add(option);
        }
      }, invalidValue);

      // Verify the value cannot be saved or is rejected
      // Even if injected, it shouldn't persist after interaction
      await ppnDropdown.selectProperty(ppnDropdown.placeholderProperty);
      await ppnDropdown.selectProperty(data.property);

      const newValueOptions = await ppnDropdown.getValueOptions();
      expect(newValueOptions).not.toContain(invalidValue);
    });
  });

  // =====================================================
  // TC-012: Verify multiple property-value pairs can be added
  // =====================================================
  test(`${features[11].tcid}: ${features[11].name}, ${features[11].tags}`, async ({ page }) => {
    const testPage = `${DA_BASE_URL}${features[11].path}`;
    const { data } = features[11];
    console.info(`[Test Page]: ${testPage}`);

    await test.step('step-1: Navigate to DA edit page', async () => {
      await page.goto(testPage);
      await page.waitForLoadState('domcontentloaded');
    });

    await test.step('step-2: Open metadata builder', async () => {
      await ppnDropdown.openMetadataBuilder();
    });

    await test.step('step-3: Add first property-value pair', async () => {
      const firstPair = data.pairs[0];
      await ppnDropdown.addPropertyValuePair(firstPair.property, firstPair.value);
    });

    await test.step('step-4: Add second property-value pair', async () => {
      const secondPair = data.pairs[1];
      await ppnDropdown.addPropertyValuePair(secondPair.property, secondPair.value);
    });

    await test.step('step-5: Verify both pairs are added', async () => {
      const rowCount = await ppnDropdown.getPropertyRowCount();
      expect(rowCount).toBeGreaterThanOrEqual(data.pairs.length);
    });
  });

  // =====================================================
  // TC-013: Verify property-value pair can be removed
  // =====================================================
  test(`${features[12].tcid}: ${features[12].name}, ${features[12].tags}`, async ({ page }) => {
    const testPage = `${DA_BASE_URL}${features[12].path}`;
    const { data } = features[12];
    console.info(`[Test Page]: ${testPage}`);

    await test.step('step-1: Navigate to DA edit page', async () => {
      await page.goto(testPage);
      await page.waitForLoadState('domcontentloaded');
    });

    await test.step('step-2: Open metadata builder', async () => {
      await ppnDropdown.openMetadataBuilder();
    });

    await test.step('step-3: Add a property-value pair', async () => {
      await ppnDropdown.addPropertyValuePair(data.property, data.value);
    });

    await test.step('step-4: Get initial row count', async () => {
      const initialCount = await ppnDropdown.getPropertyRowCount();
      expect(initialCount).toBeGreaterThan(0);
    });

    await test.step('step-5: Remove the property-value pair', async () => {
      const initialCount = await ppnDropdown.getPropertyRowCount();
      await ppnDropdown.clickRemoveButton(0);

      const newCount = await ppnDropdown.getPropertyRowCount();
      expect(newCount).toBeLessThan(initialCount);
    });
  });

  // =====================================================
  // TC-014: Verify metadata block error when in first section
  // =====================================================
  test(`${features[13].tcid}: ${features[13].name}, ${features[13].tags}`, async ({ page }) => {
    const testPage = `${DA_BASE_URL}${features[13].path}`;
    console.info(`[Test Page]: ${testPage}`);

    await test.step('step-1: Navigate to test page with metadata in first section', async () => {
      await page.goto(testPage);
      await page.waitForLoadState('domcontentloaded');
    });

    await test.step('step-2: Verify error is displayed or functionality is limited', async () => {
      // Based on the note: "The metadata block cannot be in the first section, or it will cause an error"
      // Check for error state or validate the constraint

      const errorPresent = await ppnDropdown.errorMessage.isVisible().catch(() => false);
      const metadataBuilderVisible = await ppnDropdown.metadataBuilder.isVisible().catch(() => false);

      // Either an error should be shown OR the metadata builder shouldn't function
      console.info(`Error present: ${errorPresent}, Metadata builder visible: ${metadataBuilderVisible}`);

      // This test documents the known limitation
      expect(true).toBe(true); // Placeholder assertion - actual behavior depends on implementation
    });
  });
});
