# Test Plan: Primary Product Name Dropdown

| **Field** | **Value** |
|-----------|-----------|
| Feature | Primary Product Name Metadata Dropdown |
| Version | 1.1 |
| Author | QA Team |
| Created | January 27, 2026 |
| Last Updated | February 4, 2026 |
| Status | ✅ Ready for Review |

> **Table of Contents**
> Use Confluence TOC macro: `{toc:printable=true|style=disc|maxLevel=3}`

---

## 1. Introduction

### 1.1 Purpose

This test plan outlines the testing strategy for the Primary Product Name (PPN) dropdown feature in the Document Authoring (DA) UI. The feature enables authors to select a Primary Product Name from a predefined dropdown list, ensuring data accuracy for Adobe Analytics reporting.

### 1.2 Background

The Primary Product Name Metadata is a critical data signal for reporting purposes in Adobe Analytics. This feature replaces free-text input with a governed dropdown to ensure correct and consistent values are entered.

### 1.3 References

| Reference | Link |
|-----------|------|
| Branch | `md-form-block` - [GitHub PR #60](https://github.com/adobecom/da-bacom/pull/60) |
| Test URL Pattern | `https://da.live/edit?ref=md-form-block#/adobecom/da-bacom/` |
| Spreadsheet Location | `https://da.live/sheet#/adobecom/da-bacom/drafts/slavin/nobu/allowed-ppn` |
| Deferred Bug | [MWPW-184169](https://jira.corp.adobe.com/browse/MWPW-184169) |

---

## 2. Scope

### 2.1 In Scope

| Area | Description |
|------|-------------|
| Dropdown functionality | Property and value selection |
| Metadata population | Selected values saved to document metadata |
| Governance | Prevention of free-text input and circumvention |
| Bug regression | Bugs #1-3 (MVP scope) |
| UI integration | Seamless integration with existing DA UI |
| Desktop testing | Desktop browser support |

### 2.2 Out of Scope

| Area | Reason |
|------|--------|
| Mobile testing | Tool is desktop-only per requirements |
| Bug #4 regression | Deferred to [MWPW-184169](https://jira.corp.adobe.com/browse/MWPW-184169) |
| PM spreadsheet management | Separate administrative workflow |
| Performance testing | Not required for MVP |

---

## 3. Test Environment

### 3.1 Test URLs

| Environment | URL |
|-------------|-----|
| Test Page | `https://da.live/edit?ref=md-form-block#/adobecom/da-bacom/drafts/nala/blocks/ppn-dropdown/basic` |
| Spreadsheet | `https://da.live/sheet#/adobecom/da-bacom/drafts/slavin/nobu/allowed-ppn` |

### 3.2 Browser Support

| Browser | Version | Priority |
|---------|---------|----------|
| Chrome | Latest | P0 |
| Firefox | Latest | P1 |
| Safari | Latest | P1 |
| Edge | Latest | P2 |

### 3.3 Prerequisites

- Access to DA Live environment
- Test page with metadata block NOT in the first section
- Spreadsheet with predefined property/value pairs configured

---

## 4. Test Cases

### 4.1 Functional Requirements

---

#### TC-001: Dropdown Displays Predefined Values

| Field | Value |
|-------|-------|
| **ID** | TC-001 |
| **Priority** | P0 - Critical |
| **Type** | Functional |
| **Tags** | `@smoke` `@regression` |

**Preconditions:**
- Spreadsheet `allowed-ppn` contains at least 2 properties with values

**Test Steps:**

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Navigate to DA edit page | Page loads successfully |
| 2 | Open metadata builder from library | Metadata builder panel opens |
| 3 | Click property dropdown | Dropdown displays predefined properties |
| 4 | Select a property | Property is selected |
| 5 | Click value dropdown | Dropdown displays predefined values for that property |

**Expected Results:**
- Property dropdown shows all properties from spreadsheet
- Value dropdown shows only values associated with selected property
- Placeholder options ("Select property", "Select value") are present

---

#### TC-002: Author Can Select Value from Dropdown

| Field | Value |
|-------|-------|
| **ID** | TC-002 |
| **Priority** | P0 - Critical |
| **Type** | Functional |
| **Tags** | `@smoke` `@regression` |

**Test Steps:**

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Open metadata builder | Builder opens |
| 2 | Select "primaryProductName" from property dropdown | Property selected |
| 3 | Select "Adobe Acrobat" from value dropdown | Value selected and displayed |
| 4 | Click "+" button | Property-value pair is added |

**Expected Results:**
- Selected value appears in the value field
- Property-value pair is added to the list

---

#### TC-003: Free Text Input Not Permitted

| Field | Value |
|-------|-------|
| **ID** | TC-003 |
| **Priority** | P0 - Critical |
| **Type** | Functional / Governance |
| **Tags** | `@smoke` `@regression` |

**Test Steps:**

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Open metadata builder | Builder opens |
| 2 | Select a property | Property selected |
| 3 | Attempt to type in value field | No text can be entered |
| 4 | Verify value field is a `<select>` element | Element is select, not input |

**Expected Results:**
- Value field is a dropdown (`<select>` element)
- Free text input is not possible
- Only predefined values can be selected

---

#### TC-004: Selected Value Populates Metadata Field

| Field | Value |
|-------|-------|
| **ID** | TC-004 |
| **Priority** | P0 - Critical |
| **Type** | Functional |
| **Tags** | `@smoke` `@regression` |

**Test Steps:**

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Open metadata builder | Builder opens |
| 2 | Select property: "primaryProductName" | Property selected |
| 3 | Select value: "Adobe Creative Cloud" | Value selected |
| 4 | Click "+" to add | Pair added |
| 5 | Save/apply metadata | Metadata saved |
| 6 | Verify document metadata | Metadata field contains selected value |

**Expected Results:**
- Document metadata reflects the selected Primary Product Name
- Value persists after page reload

---

#### TC-005: Metadata Builder Opens from Library

| Field | Value |
|-------|-------|
| **ID** | TC-005 |
| **Priority** | P1 - High |
| **Type** | UI Integration |
| **Tags** | `@smoke` `@regression` |

**Test Steps:**

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Navigate to DA edit page | Page loads |
| 2 | Locate library panel | Library is visible |
| 3 | Click metadata builder item | Metadata builder opens |
| 4 | Verify UI elements | Dropdowns and buttons are present |

**Expected Results:**
- Metadata builder seamlessly integrates with DA UI
- All controls are accessible and functional

---

### 4.2 Bug Regression Tests

---

#### TC-006: Bug #1 - No Empty Values in Dropdown

| Field | Value |
|-------|-------|
| **ID** | TC-006 |
| **Priority** | P0 - Critical |
| **Type** | Bug Regression |
| **Tags** | `@bug-regression` `@bug1` |
| **Original Bug** | Empty values appear when property has fewer values than others |

**Preconditions:**
- Spreadsheet has Property A with 10 values
- Spreadsheet has Property B with 3 values

**Test Steps:**

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Open metadata builder | Builder opens |
| 2 | Select Property A (more values) | 10 values shown in dropdown |
| 3 | Select Property B (fewer values) | Only 3 values shown |
| 4 | Scroll through value dropdown | No empty/blank options |

**Expected Results:**
- Value dropdown only shows valid values for selected property
- No empty options appear regardless of other properties' value counts

**Pass Criteria:**

```javascript
const valueOptions = await getValueDropdownOptions();
const emptyOptions = valueOptions.filter(opt => opt.trim() === '');
expect(emptyOptions.length).toBe(0);
```

---

#### TC-007: Bug #2 - Value Resets When Switching Properties

| Field | Value |
|-------|-------|
| **ID** | TC-007 |
| **Priority** | P0 - Critical |
| **Type** | Bug Regression |
| **Tags** | `@bug-regression` `@bug2` |
| **Original Bug** | Value maintains same index when switching properties |

**Test Steps:**

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Open metadata builder | Builder opens |
| 2 | Select "primaryProductName" | Property selected |
| 3 | Select 10th value in dropdown | Value at index 10 selected |
| 4 | Switch to "Footer-source" property | Property changes |
| 5 | Check value dropdown state | Value resets to placeholder |

**Expected Results:**
- Value dropdown resets to "Select value" placeholder
- Value does NOT maintain the same index (e.g., 10th position)
- No empty value is selected

**Pass Criteria:**

```javascript
const selectedValue = await getSelectedValue();
expect(selectedValue).toBe('Select value'); // or empty string
```

---

#### TC-008: Bug #3 - Cannot Add Without Selecting Value

| Field | Value |
|-------|-------|
| **ID** | TC-008 |
| **Priority** | P0 - Critical |
| **Type** | Bug Regression |
| **Tags** | `@bug-regression` `@bug3` |
| **Original Bug** | Clicking "+" without value auto-selects first value |

**Test Steps:**

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Open metadata builder | Builder opens |
| 2 | Select a property | Property selected |
| 3 | Do NOT select a value | Value shows placeholder |
| 4 | Click "+" button | Error shown OR action prevented |
| 5 | Verify no auto-selection | First value NOT auto-selected |

**Expected Results:**
- User cannot add property without explicitly selecting a value
- Error message displayed OR "+" button disabled
- First value is NOT automatically selected and saved

**Pass Criteria:**

```javascript
// Either error is shown
expect(errorMessage).toBeVisible();
// OR no row is added
expect(newRowCount).toBe(initialRowCount);
// AND first value is NOT selected
expect(selectedValue).not.toBe(firstValueOption);
```

---

#### TC-009: Bug #4 - Values Visible After Placeholder Flow

| Field | Value |
|-------|-------|
| **ID** | TC-009 |
| **Priority** | P2 - Low |
| **Type** | Bug Regression |
| **Tags** | `@bug-regression` `@bug4` `@deferred` |
| **JIRA** | [MWPW-184169](https://jira.corp.adobe.com/browse/MWPW-184169) |
| **Status** | ⏸️ DEFERRED - Not in MVP |

> **Note:** This test case is documented but deferred per stakeholder decision.

**Test Steps:**

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Open metadata builder | Builder opens |
| 2 | Select a property | Property selected |
| 3 | Select "Select property" (placeholder) | Reset to placeholder |
| 4 | Click "+" button | Action attempted |
| 5 | Select a property | Property selected |
| 6 | Click value dropdown | All values should be visible |

**Expected Results (When Fixed):**
- All values for selected property are displayed
- Dropdown does not show only placeholder

---

### 4.3 Non-Functional Requirements

---

#### TC-010: Seamless DA UI Integration

| Field | Value |
|-------|-------|
| **ID** | TC-010 |
| **Priority** | P1 - High |
| **Type** | Non-Functional / UI |
| **Tags** | `@non-functional` `@integration` |

**Test Steps:**

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Navigate to DA edit page | Page loads |
| 2 | Verify URL pattern | URL matches `da.live/edit?ref=md-form-block#/` |
| 3 | Open metadata builder | Builder opens within DA UI |
| 4 | Verify styling consistency | Matches DA UI design patterns |
| 5 | Verify accessibility | Keyboard navigation works |

**Expected Results:**
- Metadata builder appears as native DA UI component
- No visual inconsistencies with surrounding interface
- Controls are accessible via keyboard

---

#### TC-011: Governance - Cannot Circumvent Dropdown

| Field | Value |
|-------|-------|
| **ID** | TC-011 |
| **Priority** | P0 - Critical |
| **Type** | Security / Governance |
| **Tags** | `@non-functional` `@governance` |

**Test Steps:**

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Open metadata builder | Builder opens |
| 2 | Inspect value element type | Element is `<select>` |
| 3 | Attempt browser console injection | Injected value not persisted |
| 4 | Refresh/reload page | Only valid values remain |

**Expected Results:**
- Cannot bypass dropdown via developer tools
- Invalid values are rejected or not saved
- System enforces predefined value list

---

### 4.4 Edge Cases

---

#### TC-012: Multiple Property-Value Pairs

| Field | Value |
|-------|-------|
| **ID** | TC-012 |
| **Priority** | P1 - High |
| **Type** | Functional |
| **Tags** | `@edge-case` |

**Test Steps:**

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Add first pair: primaryProductName = Adobe Acrobat | Added successfully |
| 2 | Add second pair: Footer-source = bacom | Added successfully |
| 3 | Verify both pairs exist | Both displayed in list |
| 4 | Save metadata | Both values saved |

---

#### TC-013: Remove Property-Value Pair

| Field | Value |
|-------|-------|
| **ID** | TC-013 |
| **Priority** | P1 - High |
| **Type** | Functional |
| **Tags** | `@edge-case` |

**Test Steps:**

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Add a property-value pair | Pair added |
| 2 | Click remove/delete button | Pair removed from list |
| 3 | Save metadata | Removal persisted |

---

#### TC-014: Metadata Block Position Error

| Field | Value |
|-------|-------|
| **ID** | TC-014 |
| **Priority** | P2 - Medium |
| **Type** | Negative / Error Handling |
| **Tags** | `@edge-case` `@negative` |

**Preconditions:**
- Test page with metadata block in FIRST section

**Test Steps:**

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Navigate to page with metadata in first section | Error or limitation observed |
| 2 | Attempt to use metadata builder | Appropriate error handling |

**Expected Results:**
- Clear error message if metadata block in first section
- User understands the limitation

---

## 5. Test Data Requirements

### 5.1 Spreadsheet Configuration (`allowed-ppn`)

| Property Name | Values |
|---------------|--------|
| primaryProductName | Adobe Acrobat, Adobe Creative Cloud, Adobe Photoshop, Adobe Illustrator, Adobe Premiere Pro, Adobe After Effects, Adobe XD, Adobe Lightroom, Adobe InDesign, Adobe Dreamweaver |
| Footer-source | bacom, cc, dc |

### 5.2 Test Pages Required

| Page Path | Purpose |
|-----------|---------|
| `/drafts/nala/blocks/ppn-dropdown/basic` | Basic functionality testing |
| `/drafts/nala/blocks/ppn-dropdown/multi-property` | Multi-property testing |
| `/drafts/nala/blocks/ppn-dropdown/single-property` | Single property edge case |
| `/drafts/nala/blocks/ppn-dropdown/first-section-error` | Error handling test |

---

## 6. Entry and Exit Criteria

### 6.1 Entry Criteria

| # | Criteria | Status |
|---|----------|--------|
| 1 | Code deployed to test environment (`md-form-block` branch) | ⬜ Pending |
| 2 | Test pages created in DA environment | ⬜ Pending |
| 3 | Spreadsheet configured with test data | ⬜ Pending |
| 4 | Access to DA Live granted for testers | ⬜ Pending |
| 5 | Bugs #1-3 fixes verified in code review | ⬜ Pending |

### 6.2 Exit Criteria

| # | Criteria | Status |
|---|----------|--------|
| 1 | All P0 test cases pass | ⬜ Pending |
| 2 | All P1 test cases pass (or defects logged) | ⬜ Pending |
| 3 | Bug regression tests #1-3 pass | ⬜ Pending |
| 4 | No new P0/P1 defects found | ⬜ Pending |
| 5 | Test results documented | ⬜ Pending |

### 6.3 Suspension Criteria

- DA Live environment unavailable
- Blocking defects preventing test execution
- Spreadsheet configuration issues

---

## 7. Risks and Mitigations

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| DA environment instability | Medium | High | Use stable test URLs, coordinate with DevOps |
| Spreadsheet access issues | Low | Medium | Ensure proper permissions before testing |
| Browser compatibility issues | Low | Medium | Test on Chrome first (P0), then others |
| Bug #4 manifests in production | Medium | Low | Monitored in deferred JIRA ticket |

---

## 8. Test Execution Schedule

| Phase | Duration | Activities |
|-------|----------|------------|
| Smoke Test | 0.5 day | TC-001 to TC-005 |
| Bug Regression | 0.5 day | TC-006 to TC-008 |
| Full Regression | 1 day | All test cases |
| Exploratory | 0.5 day | Edge cases and ad-hoc testing |

---

## 9. Approvals

| Role | Name | Date | Status |
|------|------|------|--------|
| QA Lead | | | ⬜ Pending |
| Dev Lead | Jason Slavin | | ⬜ Pending |
| Product Manager | Malik Iscandari | | ⬜ Pending |

---

## 10. Test Case Summary

| Category | Test Cases | P0 | P1 | P2 |
|----------|------------|----|----|-----|
| Functional | TC-001 to TC-005 | 4 | 1 | 0 |
| Bug Regression | TC-006 to TC-009 | 3 | 0 | 1 |
| Non-Functional | TC-010 to TC-011 | 1 | 1 | 0 |
| Edge Cases | TC-012 to TC-014 | 0 | 2 | 1 |
| **Total** | **14** | **8** | **4** | **2** |

---

## Appendix A: Test Automation

### A.1 Automation Files

| File | Purpose |
|------|---------|
| `features/bacom/blocks/ppn-dropdown.spec.js` | Test specifications |
| `selectors/bacom/ppn-dropdown.page.js` | Page Object Model |
| `tests/bacom/blocks/ppn-dropdown.test.js` | Playwright tests |

### A.2 Running Tests

```bash
# Run all PPN dropdown tests
npx playwright test tests/bacom/blocks/ppn-dropdown.test.js

# Run smoke tests only
npx playwright test --grep "@smoke"

# Run bug regression tests
npx playwright test --grep "@bug-regression"

# Run with specific browser
npx playwright test --project=chromium
```

### A.3 Tags Reference

| Tag | Description |
|-----|-------------|
| `@ppn-dropdown` | All PPN dropdown tests |
| `@smoke` | Quick validation tests |
| `@regression` | Full regression suite |
| `@bug-regression` | Bug fix verification |
| `@bug1`, `@bug2`, `@bug3` | Specific bug tests |
| `@functional` | Functional requirements |
| `@non-functional` | NFR tests |
| `@edge-case` | Edge case scenarios |
| `@negative` | Negative/error tests |
| `@deferred` | Tests for deferred features |

---

## Appendix B: Confluence Notes

> **Importing to Confluence:**
> - Copy markdown content into Confluence using "Insert Markdown" or paste directly
> - Replace the TOC placeholder with the Confluence TOC macro: `{toc}`
> - Status indicators (✅ ⬜ ⏸️) render as-is in Confluence
> - For JIRA links, Confluence auto-links ticket IDs if configured
> - Consider using Confluence's Status macro for approval tracking
