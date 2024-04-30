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
  }

  /**
   * @description Adds a page break by selecting the insert page break button under
   * the inserts tab and then saves the file.
   */
  async addPageBreak() {
    await expect(async () => {
      await this.insertButton.click();
      await expect(this.insertPageBreakButton).toBeVisible();
      await this.insertPageBreakButton.click();
      await this.homeButton.click();
      await expect(this.undoButton).toBeVisible();
      await expect(this.undoButton).toBeEnabled();
    }).toPass();

    await this.page.keyboard.press('Control+S');
    await this.page.waitForTimeout(2000);
  }

  /**
   * @description Undos the previous change in session by selecting the undo button
   * under the home tab and then saves the file.
   */
  async undoChanges() {
    if (!this.undoButton.isVisible()) this.homeButton.click();

    await expect(async () => {
      await this.undoButton.click();
      await expect(this.undoButton).toBeDisabled();
    }).toPass();

    await this.page.keyboard.press('Control+S');
    await this.page.waitForTimeout(2000);
  }
}
