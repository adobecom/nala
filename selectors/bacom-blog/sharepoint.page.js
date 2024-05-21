import { expect } from '@playwright/test';

/**
 * A Class that represents sharepoint pages.
 */
export default class Sharepoint {
  constructor(page) {
    this.page = page;
    this.iframe = page.frameLocator('iframe[name="WacFrame_Word_0"]');
    this.insertButton = this.iframe.locator('#Insert');
    this.insertPageBreakButton = this.iframe.locator('#InsertPageBreak');
    this.homeButton = this.iframe.locator('#Home');
    this.undoButton = this.iframe.locator('#UndoRedo > button:first-of-type');
    this.editingElement = this.iframe.locator('#WACViewPanel_EditingElement');
    this.documentTitle = this.iframe.locator('button#documentTitle');
    this.dialogPanel = this.iframe.locator('#WACDialogPanel');
    this.dialogText = this.iframe.locator('#WACDialogTextPanel');
    this.navButton = this.iframe.locator('#FishBowlNavButton');
    this.pageBreaks = this.iframe.locator('span.PageBreakTextSpan');
  }

  /**
   * @description Gets the text of the dialog box.
   * @returns {Promise<string>} The text of the dialog box.
   */
  async getDialogText() {
    if (await this.dialogText.isVisible()) {
      return this.dialogText.textContent();
    }
    return '';
  }

  /**
   * @description Waits for the page to load by checking for key elements.
   * @returns {Promise<boolean>} True if the page is loaded, false otherwise.
   */
  async waitForLoad() {
    await this.page.waitForLoadState('domcontentloaded');
    await expect(this.homeButton).toBeVisible({ timeout: 1000 * 30 });
    await expect(this.navButton).toBeVisible({ timeout: 1000 * 30 });

    // check that there is no dialog box blocking the page
    return !await this.dialogPanel.isVisible();
  }

  /**
   * @description Saves the file by simulating the keyboard shortcut Control+S.
   */
  async saveFile() {
    await this.page.keyboard.press('Control+S');

    const saveStatus = await this.documentTitle.locator('div[aria-label]').first();
    await expect.soft(saveStatus).toHaveAttribute('aria-label', /.*Last saved: Just now/, { timeout: 1000 * 30 });
  }

  /**
   * @description Adds a page break by selecting the insert page break button under the inserts tab.
   */
  async addPageBreak() {
    const pageBreakCount = await this.pageBreaks.count();
    // Make sure the button is visible before clicking
    await expect(async () => {
      await this.insertButton.click();
      await expect(this.insertPageBreakButton).toBeVisible({ timeout: 1000 });
    }).toPass();

    // We can not trust the button to work immediately
    await expect(async () => {
      if (await this.insertPageBreakButton.isDisabled()) {
        await this.editingElement.focus();
        await this.page.keyboard.press('ArrowDown');
      }
      if (await this.insertPageBreakButton.isEnabled()) {
        await this.insertPageBreakButton.click();
      }

      await expect(this.pageBreaks).not.toHaveCount(pageBreakCount, { timeout: 1000 });
    }).toPass();
  }

  /**
   * @description Undos all previous changes in session by selecting the undo button under the home tab.
   */
  async undoChanges() {
    await expect(async () => {
      await this.homeButton.click();
      await expect(this.undoButton).toBeVisible({ timeout: 1000 });
    }).toPass();

    await expect(this.undoButton).toBeEnabled();

    await expect(async () => {
      await this.undoButton.click();
      await expect(this.undoButton).toBeDisabled({ timeout: 1000 });
    }).toPass();
  }
}
