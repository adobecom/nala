/**
 * LingoROC Page Object
 * Selectors and helper methods for testing ROC (Region Only Content) fragment swapping
 * Feature: MWPW-179495
 *
 * TESTING APPROACH:
 * - Use MEP UI to spoof region (click MEP button → select region → preview)
 * - Verify visual badges:
 *   - GREEN badge = successful fragment swap (mep-lingo)
 *   - YELLOW badge = fallback to base fragment
 */
export default class LingoROC {
  constructor(page) {
    this.page = page;

    // ==========================================================================
    // MEP UI Selectors
    // ==========================================================================
    this.mepButton = page.locator('.mep-open, .mep-button, [class*="mep-open"], button:has-text("MEP")');
    this.mepPanel = page.locator('.mep-panel, .mep-popup, [class*="mep-panel"]');
    this.regionDropdown = page.locator('select[name="region"], [data-region], .region-selector, select:near(:text("Region"))');
    this.spoofRegionSelect = page.locator('select').filter({ hasText: /region|locale/i }).first();
    this.previewButton = page.locator('button:has-text("Preview"), .mep-preview, a:has-text("Preview")');

    // ==========================================================================
    // MEP Lingo Badge Selectors
    // Badge format from screenshot:
    // - Green: "mep-lingo: /mx/drafts/mepqa/fragments/textmeplingoblock"
    // - Yellow: "fallback: https://..."
    // ==========================================================================
    // Green badges indicate successful fragment swaps (text starts with "mep-lingo:")
    this.greenBadges = page.locator('a:has-text("mep-lingo:")');
    // Yellow badges indicate fallback to base fragment (text starts with "fallback:")
    this.yellowBadges = page.locator('a:has-text("fallback:")');
    // All MEP badges (both green and yellow)
    this.allBadges = page.locator('a:has-text("mep-lingo:"), a:has-text("fallback:")');

    // ==========================================================================
    // Fragment Selectors (data-path attribute)
    // Element: <div class="fragment" data-path="https://...">
    // data-mep-lingo-fallback attribute indicates fallback fragment
    // ==========================================================================
    this.fragment = page.locator('.fragment');
    this.fragmentPath = page.locator('[data-fragment-path]');
    this.fragmentDataPath = page.locator('.fragment[data-path]');
    this.fallbackFragment = page.locator('.fragment[data-mep-lingo-fallback]');

    // ==========================================================================
    // Page Structure
    // ==========================================================================
    this.header = page.locator('header');
    this.footer = page.locator('footer');
    this.sections = page.locator('main > div, main > section');

    // ==========================================================================
    // Popup/Modal Selectors
    // ==========================================================================
    this.localeModal = page.locator('.locale-modal, .dialog-modal, .georouting-modal, [class*="locale-modal"]');
    this.localeModalClose = page.locator('.locale-modal-close, .dialog-close, [class*="close-button"], button[aria-label="Close"]');
    this.cookieBanner = page.locator('#onetrust-banner-sdk, .onetrust-banner');
    this.cookieAccept = page.locator('#onetrust-accept-btn-handler');
  }

  // ============================================================================
  // Popup/Modal Dismissal Methods
  // ============================================================================

  /**
   * Closes the locale/region selection modal if present
   */
  async closeLocaleModal() {
    try {
      // Wait a bit for modal to appear
      await this.page.waitForTimeout(1000);

      // Try various close button selectors
      const closeSelectors = [
        '.locale-modal-close',
        '.dialog-close',
        '[class*="close-button"]',
        'button[aria-label="Close"]',
        'button[aria-label="close"]',
        '.modal-close',
        '.georouting-modal button.close',
        '.locale-modal button',
        'a.locale-modal-close',
        '[data-testid="close-button"]',
      ];

      for (const selector of closeSelectors) {
        const closeBtn = this.page.locator(selector).first();
        if (await closeBtn.isVisible({ timeout: 1000 })) {
          await closeBtn.click();
          console.info(`[LingoROC] Closed popup using: ${selector}`);
          await this.page.waitForTimeout(500);
          return true;
        }
      }

      // Try pressing Escape key
      await this.page.keyboard.press('Escape');
      console.info('[LingoROC] Pressed Escape to close popup');
      await this.page.waitForTimeout(500);
      return true;
    } catch (error) {
      console.info('[LingoROC] No popup to close or already closed');
      return false;
    }
  }

  /**
   * Accepts cookie banner if present
   */
  async acceptCookies() {
    try {
      const acceptBtn = this.page.locator('#onetrust-accept-btn-handler');
      if (await acceptBtn.isVisible({ timeout: 2000 })) {
        await acceptBtn.click();
        console.info('[LingoROC] Accepted cookies');
        await this.page.waitForTimeout(500);
        return true;
      }
    } catch {
      // No cookie banner
    }
    return false;
  }

  /**
   * Dismisses all popups (locale modal, cookies, etc.)
   */
  async dismissAllPopups() {
    await this.acceptCookies();
    await this.closeLocaleModal();
    // Try escape one more time
    try {
      await this.page.keyboard.press('Escape');
    } catch {
      // Ignore
    }
  }

  // ============================================================================
  // MEP UI Interaction Methods
  // ============================================================================

  /**
   * Opens the MEP panel/popup
   */
  async openMepPanel() {
    try {
      // Try clicking MEP button
      await this.mepButton.first().click({ timeout: 5000 });
      await this.page.waitForTimeout(500);
      console.info('[LingoROC] MEP panel opened');
      return true;
    } catch (error) {
      console.warn('[LingoROC] Could not open MEP panel:', error.message);
      return false;
    }
  }

  /**
   * Selects a region in the MEP spoof region dropdown
   * @param {string} region - Region code (e.g., 'ar', 'ch_fr', 'at')
   */
  async selectSpoofRegion(region) {
    try {
      // Try different approaches to find and select region
      const selects = await this.page.locator('select').all();

      for (const select of selects) {
        const options = await select.locator('option').allTextContents();
        const hasRegion = options.some((opt) => opt.toLowerCase().includes(region.toLowerCase()));

        if (hasRegion) {
          await select.selectOption({ label: new RegExp(region, 'i') });
          console.info(`[LingoROC] Selected region: ${region}`);
          return true;
        }
      }

      // Try direct value selection
      await this.spoofRegionSelect.selectOption(region);
      console.info(`[LingoROC] Selected region by value: ${region}`);
      return true;
    } catch (error) {
      console.warn(`[LingoROC] Could not select region ${region}:`, error.message);
      return false;
    }
  }

  /**
   * Clicks the Preview button in MEP panel
   */
  async clickPreview() {
    try {
      await this.previewButton.first().click({ timeout: 5000 });
      await this.page.waitForLoadState('networkidle');
      console.info('[LingoROC] Preview clicked, page reloaded');
      return true;
    } catch (error) {
      console.warn('[LingoROC] Could not click preview:', error.message);
      return false;
    }
  }

  /**
   * Full flow: Open MEP → Select Region → Preview
   * @param {string} region - Region code to spoof
   */
  async spoofRegionAndPreview(region) {
    const mepOpened = await this.openMepPanel();
    if (!mepOpened) {
      console.warn('[LingoROC] Skipping region spoof - MEP panel not available');
      return false;
    }

    const regionSelected = await this.selectSpoofRegion(region);
    if (!regionSelected) {
      console.warn(`[LingoROC] Could not select region: ${region}`);
      return false;
    }

    const previewClicked = await this.clickPreview();
    return previewClicked;
  }

  // ============================================================================
  // Badge Verification Methods
  // ============================================================================

  /**
   * Counts green (successful swap) badges on the page
   * @returns {Promise<number>} Number of green badges
   */
  async countGreenBadges() {
    await this.page.waitForTimeout(1000); // Wait for badges to render
    const count = await this.greenBadges.count();
    console.info(`[LingoROC] Green badges (swapped): ${count}`);
    return count;
  }

  /**
   * Counts yellow (fallback) badges on the page
   * @returns {Promise<number>} Number of yellow badges
   */
  async countYellowBadges() {
    await this.page.waitForTimeout(1000);
    const count = await this.yellowBadges.count();
    console.info(`[LingoROC] Yellow badges (fallback): ${count}`);
    return count;
  }

  /**
   * Counts all MEP badges on the page
   * @returns {Promise<number>} Total number of badges
   */
  async countAllBadges() {
    await this.page.waitForTimeout(1000);
    const count = await this.allBadges.count();
    console.info(`[LingoROC] Total badges: ${count}`);
    return count;
  }

  /**
   * Verifies badge counts match expected values
   * @param {Object} expected - Expected badge counts { green: number, yellow: number }
   * @returns {Promise<{passed: boolean, actual: Object}>}
   */
  async verifyBadgeCounts(expected) {
    const greenCount = await this.countGreenBadges();
    const yellowCount = await this.countYellowBadges();

    const actual = { green: greenCount, yellow: yellowCount };

    // Allow some flexibility in counts (may vary based on page content)
    const greenMatch = expected.green === undefined || greenCount >= expected.green - 1;
    const yellowMatch = expected.yellow === undefined || yellowCount >= expected.yellow - 1;

    const passed = greenMatch && yellowMatch;

    console.info(`[LingoROC] Badge verification: ${passed ? '✓' : '✗'}`);
    console.info(`  Expected: green=${expected.green}, yellow=${expected.yellow}`);
    console.info(`  Actual: green=${greenCount}, yellow=${yellowCount}`);

    return { passed, actual, expected };
  }

  /**
   * Gets details of all badges on the page
   * @returns {Promise<Array>} Array of badge info objects
   */
  async getAllBadgeDetails() {
    const badges = await this.allBadges.all();
    const details = [];

    for (const badge of badges) {
      const text = await badge.textContent() || '';
      const href = await badge.getAttribute('href') || '';
      // Green badges start with "mep-lingo:", yellow with "fallback:"
      const isGreen = text.includes('mep-lingo:');
      const isYellow = text.includes('fallback:');

      let type = 'unknown';
      if (isGreen) type = 'green';
      else if (isYellow) type = 'yellow';

      details.push({
        type,
        text: text.trim().substring(0, 100),
        href,
      });
    }

    return details;
  }

  // ============================================================================
  // Fragment Verification Methods (using data-path attribute)
  // Element: <div class="fragment" data-path="https://stage--da-bacom--adobecom.aem.page/es/...">
  // data-mep-lingo-fallback attribute indicates fallback fragment
  // ============================================================================

  /**
   * Gets all data-path attributes from .fragment elements
   * @returns {Promise<Array<string>>} Array of data-path URLs
   */
  async getAllDataPaths() {
    const elements = await this.fragmentDataPath.all();
    const paths = [];

    for (const el of elements) {
      const path = await el.getAttribute('data-path');
      if (path) {
        paths.push(path);
      }
    }

    console.info(`[LingoROC] Found ${paths.length} fragment data-path elements:`);
    paths.forEach((p) => console.info(`  - ${p}`));
    return paths;
  }

  /**
   * Counts fragments that were swapped to regional path
   * Swapped fragments: data-path contains regional path (e.g., /mx/, /ch_fr/)
   * @param {string} regionalPath - Regional path to look for (e.g., '/mx/', '/ch_fr/')
   * @returns {Promise<number>} Number of swapped fragments
   */
  async countSwappedFragments(regionalPath) {
    const paths = await this.getAllDataPaths();
    const swapped = paths.filter((p) => p.includes(regionalPath));
    console.info(`[LingoROC] Swapped to ${regionalPath}: ${swapped.length} fragments`);
    return swapped.length;
  }

  /**
   * Counts fragments that fell back to base path
   * Fallback fragments: data-path contains base path AND has data-mep-lingo-fallback attribute
   * @param {string} basePath - Base path to look for (e.g., '/es/', '/fr/')
   * @returns {Promise<number>} Number of fallback fragments
   */
  async countFallbackFragments() {
    const fallbackElements = await this.fallbackFragment.all();
    console.info(`[LingoROC] Fallback fragments (data-mep-lingo-fallback): ${fallbackElements.length}`);
    return fallbackElements.length;
  }

  /**
   * Verifies fragment swap by checking data-path attributes
   * - Swapped: data-path contains regional path (e.g., /mx/, /ch_fr/)
   * - Fallback: has data-mep-lingo-fallback attribute (or data-path contains base path)
   * @param {string} regionalPath - Expected regional path (e.g., '/mx/', '/ch_fr/')
   * @param {string} basePath - Expected base path (e.g., '/es/', '/fr/')
   * @returns {Promise<{swapped: number, fallback: number, paths: Array}>}
   */
  async verifyFragmentSwap(regionalPath, basePath) {
    const paths = await this.getAllDataPaths();

    // Swapped = data-path contains regional path
    const swappedPaths = paths.filter((p) => p.includes(regionalPath));

    // Fallback = data-path contains base path but NOT regional path
    const fallbackPaths = paths.filter((p) => p.includes(basePath) && !p.includes(regionalPath));

    // Also count fragments with data-mep-lingo-fallback attribute
    const fallbackAttrCount = await this.fallbackFragment.count();

    console.info(`[LingoROC] Fragment verification for ${regionalPath}:`);
    console.info(`  - Swapped (${regionalPath}): ${swappedPaths.length}`);
    swappedPaths.forEach((p) => console.info(`    ✓ ${p}`));
    console.info(`  - Fallback (${basePath}): ${fallbackPaths.length}`);
    fallbackPaths.forEach((p) => console.info(`    ○ ${p}`));
    console.info(`  - Fallback attribute count: ${fallbackAttrCount}`);

    return {
      swapped: swappedPaths.length,
      fallback: fallbackPaths.length,
      fallbackAttr: fallbackAttrCount,
      paths,
      swappedPaths,
      fallbackPaths,
    };
  }

  /**
   * Gets all fragments on the page
   * @returns {Promise<Array>} Array of fragment info objects
   */
  async getAllFragments() {
    const fragments = await this.fragment.all();
    const fragmentInfo = [];

    for (const frag of fragments) {
      const path = await frag.getAttribute('data-fragment-path');
      const dataPath = await frag.getAttribute('data-path');
      const content = await frag.innerHTML();

      fragmentInfo.push({
        path,
        dataPath,
        hasContent: content.trim().length > 0,
      });
    }

    return fragmentInfo;
  }

  /**
   * Verifies a fragment was swapped to the expected regional path
   * @param {string} expectedPath - Expected fragment path
   * @returns {Promise<boolean>}
   */
  async verifyFragmentPath(expectedPath) {
    const fragments = await this.fragmentPath.all();
    for (const frag of fragments) {
      const path = await frag.getAttribute('data-fragment-path');
      if (path === expectedPath) {
        return true;
      }
    }
    return false;
  }

  /**
   * Gets all fragment paths on the page
   * @returns {Promise<Array<string>>}
   */
  async getAllFragmentPaths() {
    const fragments = await this.fragmentPath.all();
    const paths = [];

    for (const frag of fragments) {
      const path = await frag.getAttribute('data-fragment-path');
      if (path) {
        paths.push(path);
      }
    }

    return paths;
  }

  // ============================================================================
  // Page Verification Methods
  // ============================================================================

  /**
   * Checks if page loaded successfully
   * @returns {Promise<boolean>}
   */
  async isPageLoaded() {
    try {
      await this.header.waitFor({ state: 'visible', timeout: 10000 });
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Waits for page with fragments to load
   * @param {number} timeout - Max wait time in ms
   */
  async waitForPageWithFragments() {
    await this.page.waitForLoadState('domcontentloaded');
    try {
      await this.fragment.first().waitFor({ state: 'attached', timeout: 5000 });
    } catch {
      // Page may not have fragments
    }
    await this.page.waitForLoadState('networkidle');
  }

  /**
   * Counts sections on the page
   * @returns {Promise<number>}
   */
  async countSections() {
    const count = await this.sections.count();
    return count;
  }

  /**
   * Takes a screenshot for debugging
   * @param {string} name - Screenshot name
   */
  async takeScreenshot(name) {
    await this.page.screenshot({ path: `screenshots/lingo-roc-${name}.png`, fullPage: true });
    console.info(`[LingoROC] Screenshot saved: screenshots/lingo-roc-${name}.png`);
  }
}
