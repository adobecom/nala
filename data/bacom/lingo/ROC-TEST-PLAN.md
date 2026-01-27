# ROC Fragment Swapping Test Plan

## Overview

**Feature:** MWPW-179495 - ROC (Region Only Content) Fragment Swapping  
**Environment:** Stage (`https://stage--da-bacom--adobecom.aem.page`)  
**Test Pages:** `/drafts/mepqa/fragments/base`

---

## Test Scope

### Languages and Regionals

| Language | Base | All Regionals | Tested | Skipped |
|----------|------|---------------|--------|---------|
| French | /fr | /be_fr, /ca_fr, /ch_fr, /lu_fr | /ch_fr, /ca_fr | /be_fr, /lu_fr |
| German | /de | /at, /ch_de, /lu_de | /at, /ch_de | /lu_de |
| Spanish | /es | /ar, /cl, /co, /la, /mx, /pe | /mx | /ar, /cl, /co, /la, /pe |
| Italian | /it | /ch_it | /ch_it | - |
| Portuguese | /pt | /br | /br | - |

### Feature Coverage

| Test Type | Regions | Fragments Tested |
|-----------|---------|------------------|
| **FULL FEATURE** | /ch_fr, /mx | textmeplingoblock, swapblock, sectionreplacement, noroc (fallback) |
| **BASIC** | /ca_fr, /at, /ch_de, /ch_it, /br | textmeplingoblock only |
| **NEGATIVE** | /ar | Should NOT swap to /mx |

### Test Count Summary

| Type | Count |
|------|-------|
| Full Feature | 2 |
| Basic | 5 |
| Negative | 1 |
| Multiple Fragments | 1 |
| **TOTAL** | **9** |

---

## Test Cases

### TC-001: French → Swiss French (FULL FEATURE)

| Field | Value |
|-------|-------|
| **ID** | TC-001 |
| **Priority** | P1 Smoke |
| **Tags** | `@french @ch_fr @full @smoke` |

**URL:**
```
https://stage--da-bacom--adobecom.aem.page/fr/drafts/mepqa/fragments/base?milolibs=mep-lingo&langFirst=on&mepHighlight=true&mep=&akamaiLocale=ch_fr
```

**Steps:**
1. Navigate to URL with `akamaiLocale=ch_fr`
2. Wait for page to load
3. Verify fragment badges

**Expected Results:**

| Fragment | Expected Path | Badge |
|----------|---------------|-------|
| textmeplingoblock | `/ch_fr/drafts/mepqa/fragments/textmeplingoblock` | 🟢 Green |
| swapblock | `/ch_fr/drafts/mepqa/fragments/swapblock` | 🟢 Green |
| sectionreplacement | `/ch_fr/drafts/mepqa/fragments/sectionreplacement` | 🟢 Green |
| noroc | `/fr/drafts/mepqa/fragments/noroc` (fallback) | 🟡 Yellow |

**Pass Criteria:** 3 green badges + 1 yellow badge

---

### TC-002: Spanish → Mexico (FULL FEATURE)

| Field | Value |
|-------|-------|
| **ID** | TC-002 |
| **Priority** | P1 Smoke |
| **Tags** | `@spanish @mx @full @smoke` |

**URL:**
```
https://stage--da-bacom--adobecom.aem.page/es/drafts/mepqa/fragments/base?milolibs=mep-lingo&langFirst=on&mepHighlight=true&mep=&akamaiLocale=mx
```

**Steps:**
1. Navigate to URL with `akamaiLocale=mx`
2. Wait for page to load
3. Verify fragment badges

**Expected Results:**

| Fragment | Expected Path | Badge |
|----------|---------------|-------|
| textmeplingoblock | `/mx/drafts/mepqa/fragments/textmeplingoblock` | 🟢 Green |
| swapblock | `/mx/drafts/mepqa/fragments/swapblock` | 🟢 Green |
| sectionreplacement | `/mx/drafts/mepqa/fragments/sectionreplacement` | 🟢 Green |
| noroc | `/es/drafts/mepqa/fragments/noroc` (fallback) | 🟡 Yellow |

**Pass Criteria:** 3 green badges + 1 yellow badge

---

### TC-003: French → Canadian French (BASIC)

| Field | Value |
|-------|-------|
| **ID** | TC-003 |
| **Priority** | P2 Regression |
| **Tags** | `@french @ca_fr @basic @regression` |

**URL:**
```
https://stage--da-bacom--adobecom.aem.page/fr/drafts/mepqa/fragments/base?milolibs=mep-lingo&langFirst=on&mepHighlight=true&mep=&akamaiLocale=ca_fr
```

**Expected Results:**

| Fragment | Expected Path | Badge |
|----------|---------------|-------|
| textmeplingoblock | `/ca_fr/drafts/mepqa/fragments/textmeplingoblock` | 🟢 Green |

**Pass Criteria:** textmeplingoblock swapped to /ca_fr

---

### TC-004: German → Austria (BASIC)

| Field | Value |
|-------|-------|
| **ID** | TC-004 |
| **Priority** | P2 Regression |
| **Tags** | `@german @at @basic @regression` |

**URL:**
```
https://stage--da-bacom--adobecom.aem.page/de/drafts/mepqa/fragments/base?milolibs=mep-lingo&langFirst=on&mepHighlight=true&mep=&akamaiLocale=at
```

**Expected Results:**

| Fragment | Expected Path | Badge |
|----------|---------------|-------|
| textmeplingoblock | `/at/drafts/mepqa/fragments/textmeplingoblock` | 🟢 Green |

**Pass Criteria:** textmeplingoblock swapped to /at

---

### TC-005: German → Swiss German (BASIC)

| Field | Value |
|-------|-------|
| **ID** | TC-005 |
| **Priority** | P2 Regression |
| **Tags** | `@german @ch_de @basic @regression` |

**URL:**
```
https://stage--da-bacom--adobecom.aem.page/de/drafts/mepqa/fragments/base?milolibs=mep-lingo&langFirst=on&mepHighlight=true&mep=&akamaiLocale=ch_de
```

**Expected Results:**

| Fragment | Expected Path | Badge |
|----------|---------------|-------|
| textmeplingoblock | `/ch_de/drafts/mepqa/fragments/textmeplingoblock` | 🟢 Green |

**Pass Criteria:** textmeplingoblock swapped to /ch_de

---

### TC-006: Italian → Swiss Italian (BASIC)

| Field | Value |
|-------|-------|
| **ID** | TC-006 |
| **Priority** | P2 Regression |
| **Tags** | `@italian @ch_it @basic @regression` |

**URL:**
```
https://stage--da-bacom--adobecom.aem.page/it/drafts/mepqa/fragments/base?milolibs=mep-lingo&langFirst=on&mepHighlight=true&mep=&akamaiLocale=ch_it
```

**Expected Results:**

| Fragment | Expected Path | Badge |
|----------|---------------|-------|
| textmeplingoblock | `/ch_it/drafts/mepqa/fragments/textmeplingoblock` | 🟢 Green |

**Pass Criteria:** textmeplingoblock swapped to /ch_it

---

### TC-007: Portuguese → Brazil (BASIC)

| Field | Value |
|-------|-------|
| **ID** | TC-007 |
| **Priority** | P2 Regression |
| **Tags** | `@portuguese @br @basic @regression` |

**URL:**
```
https://stage--da-bacom--adobecom.aem.page/pt/drafts/mepqa/fragments/base?milolibs=mep-lingo&langFirst=on&mepHighlight=true&mep=&akamaiLocale=br
```

**Expected Results:**

| Fragment | Expected Path | Badge |
|----------|---------------|-------|
| textmeplingoblock | `/br/drafts/mepqa/fragments/textmeplingoblock` | 🟢 Green |

**Pass Criteria:** textmeplingoblock swapped to /br

---

### TC-008: Spanish → Argentina (NEGATIVE)

| Field | Value |
|-------|-------|
| **ID** | TC-008 |
| **Priority** | P2 Regression |
| **Tags** | `@spanish @ar @negative @regression` |

**URL:**
```
https://stage--da-bacom--adobecom.aem.page/es/drafts/mepqa/fragments/base?milolibs=mep-lingo&langFirst=on&mepHighlight=true&mep=&akamaiLocale=ar
```

**Purpose:** Verify that /mx fragments are NOT loaded when spoofing /ar region (no /ar regional content exists)

**Expected Results:**
- ❌ Should NOT see `/mx/drafts/mepqa/fragments/textmeplingoblock`
- ❌ Should NOT see `/mx/drafts/mepqa/fragments/swapblock`
- ❌ Should NOT see `/mx/drafts/mepqa/fragments/sectionreplacement`
- ✅ Should see fallback to base `/es` fragments

**Pass Criteria:** No regional swap occurs; page shows base /es content

---

### TC-009: French → Swiss French Multiple Fragments (base-all)

| Field | Value |
|-------|-------|
| **ID** | TC-009 |
| **Priority** | P2 Regression |
| **Tags** | `@french @ch_fr @multi @regression` |

**URL:**
```
https://stage--da-bacom--adobecom.aem.page/fr/drafts/mepqa/fragments/base-all?milolibs=mep-lingo&langFirst=on&mepHighlight=true&mep=&akamaiLocale=ch_fr
```

**Expected Results:**

| Fragment | Expected Path | Badge |
|----------|---------------|-------|
| sectionreplacement | `/ch_fr/drafts/mepqa/fragments/sectionreplacement` | 🟢 Green |

**Pass Criteria:** Should see `/ch_fr/drafts/mepqa/fragments/sectionreplacement` swapped

**Known Issue:** When using `akamaiLocale=fr` (base), getting 404 error for `/fr/assets/lingo/query-index-preview.json`

---

## URL Parameters Reference

| Parameter | Value | Purpose |
|-----------|-------|---------|
| `milolibs` | `mep-lingo` | Load MEP Lingo feature branch |
| `langFirst` | `on` | Enable language-first site mode |
| `mepHighlight` | `true` | Show visual badges |
| `mep` | (empty) | MEP parameter |
| `akamaiLocale` | `ch_fr`, `mx`, etc. | Spoof the region |

---

## Badge Reference

| Badge | Color | Meaning |
|-------|-------|---------|
| 🟢 | Green | Fragment successfully swapped to regional version |
| 🟡 | Yellow | Fallback to base fragment (no regional exists) |
| - | No badge | Block fallback (authored content used) |

---

## All Test URLs

### Full Feature Tests
| Test | URL |
|------|-----|
| FR→CH | `https://stage--da-bacom--adobecom.aem.page/fr/drafts/mepqa/fragments/base?milolibs=mep-lingo&langFirst=on&mepHighlight=true&mep=&akamaiLocale=ch_fr` |
| ES→MX | `https://stage--da-bacom--adobecom.aem.page/es/drafts/mepqa/fragments/base?milolibs=mep-lingo&langFirst=on&mepHighlight=true&mep=&akamaiLocale=mx` |

### Basic Tests
| Test | URL |
|------|-----|
| FR→CA | `https://stage--da-bacom--adobecom.aem.page/fr/drafts/mepqa/fragments/base?milolibs=mep-lingo&langFirst=on&mepHighlight=true&mep=&akamaiLocale=ca_fr` |
| DE→AT | `https://stage--da-bacom--adobecom.aem.page/de/drafts/mepqa/fragments/base?milolibs=mep-lingo&langFirst=on&mepHighlight=true&mep=&akamaiLocale=at` |
| DE→CH | `https://stage--da-bacom--adobecom.aem.page/de/drafts/mepqa/fragments/base?milolibs=mep-lingo&langFirst=on&mepHighlight=true&mep=&akamaiLocale=ch_de` |
| IT→CH | `https://stage--da-bacom--adobecom.aem.page/it/drafts/mepqa/fragments/base?milolibs=mep-lingo&langFirst=on&mepHighlight=true&mep=&akamaiLocale=ch_it` |
| PT→BR | `https://stage--da-bacom--adobecom.aem.page/pt/drafts/mepqa/fragments/base?milolibs=mep-lingo&langFirst=on&mepHighlight=true&mep=&akamaiLocale=br` |

### Negative Test
| Test | URL |
|------|-----|
| ES→AR | `https://stage--da-bacom--adobecom.aem.page/es/drafts/mepqa/fragments/base?milolibs=mep-lingo&langFirst=on&mepHighlight=true&mep=&akamaiLocale=ar` |

### Multiple Fragments Test (base-all page)
| Test | URL |
|------|-----|
| FR→CH (multi) | `https://stage--da-bacom--adobecom.aem.page/fr/drafts/mepqa/fragments/base-all?milolibs=mep-lingo&langFirst=on&mepHighlight=true&mep=&akamaiLocale=ch_fr` |

---

## Execution Commands

```bash
# All 8 tests
npx playwright test tests/bacom/lingo-roc.test.js

# Full feature tests only (ch_fr, mx)
npx playwright test tests/bacom/lingo-roc.test.js --grep "@full"

# Basic tests only
npx playwright test tests/bacom/lingo-roc.test.js --grep "@basic"

# Negative test only
npx playwright test tests/bacom/lingo-roc.test.js --grep "@negative"

# By language
npx playwright test tests/bacom/lingo-roc.test.js --grep "@french"
npx playwright test tests/bacom/lingo-roc.test.js --grep "@spanish"
npx playwright test tests/bacom/lingo-roc.test.js --grep "@german"
npx playwright test tests/bacom/lingo-roc.test.js --grep "@italian"
npx playwright test tests/bacom/lingo-roc.test.js --grep "@portuguese"

# Smoke tests only
npx playwright test tests/bacom/lingo-roc.test.js --grep "@smoke"

# Regression tests
npx playwright test tests/bacom/lingo-roc.test.js --grep "@regression"
```

---

## Pass/Fail Criteria Summary

| Test Type | Pass Criteria |
|-----------|---------------|
| Full Feature (TC-001, TC-002) | Swapped fragments contain regional path (e.g., `/ch_fr/`, `/mx/`) |
| Basic (TC-003 to TC-007) | At least 1 swapped fragment with regional path |
| Negative (TC-008) | No regional swap occurs, fallback to base |
| Multiple Fragments (TC-009) | Swapped fragments contain `/ch_fr/` path |

---

## JIRA

**Ticket:** MWPW-179495
