import { expect } from '@playwright/test';
import { WebUtil } from '../../libs/webutil.js';
import TextBlock from './text.block.page.js';
import MediaBlock from './media.block.page.js';

export default class Modal {
  constructor(page) {
    this.page = page;
    // modal locators
    this.modal = this.page.locator('.dialog-modal');
    this.fragment = this.modal.locator('.fragment');
    this.headingXL = this.page.locator('.heading-xl');
    this.bodyM = this.page.locator('.body-m').nth(2);
    this.modalCloseButton = this.modal.locator('.dialog-close');
    this.marqueeLight = this.page.locator('.marquee.light');
    this.modelSelector = '.dialog-modal';

    // modal contents attributes
    this.attProperties = {
      'modal-link': {
        class: 'modal link-block ',
        'daa-ll': /^link\|(.*)/,
      },
    };
  }

  /**
 * Verifies that a modal with the specified ID can be opened and closed.
 * @param {string} modalData - Modal data required to verify modal.
 * @returns {Promise<boolean>} - A Promise that resolves to true if the verification
 * is successful, or false if an error occurs.
 */
  async verifyModal(modalData) {
    try {
      let text;
      let media;

      // verify modal link attributes and then click
      const modalLink = await this.page.locator(`a[href="#${modalData.modalId}"]`);
      await expect(await modalLink).toBeVisible();
      expect(await WebUtil.verifyAttributes(
        modalLink,
        this.attProperties['modal-link'],
      )).toBeTruthy();

      await modalLink.click();

      // validate modal content
      switch (modalData.fragment) {
        case 'text':
          await expect(await this.modal).toContainText(modalData.bodyText);
          await expect(await this.modalCloseButton).toBeVisible();
          expect(await WebUtil.isModalInViewport(
            this.page,
            this.modalSelector,
          )).toBeTruthy();

          // verify modal content (text fragment)
          text = new TextBlock(this.page);
          expect(await text.verifyText(modalData.contentType)).toBeTruthy();

          // close the modal
          await this.modalCloseButton.click();

          return true;

        case 'media':
          await expect(await this.modal).toContainText(modalData.bodyText);
          await expect(await this.modalCloseButton).toBeVisible();
          expect(await WebUtil.isModalInViewport(
            this.page,
            this.modalSelector,
          )).toBeTruthy();

          // verify modal content (media fragment)
          media = new MediaBlock(this.page);
          expect(await media.verifyMedia(modalData.contentType)).toBeTruthy();

          // close the modal using escape key press.
          await this.page.keyboard.press('Escape');

          return true;

        default:
          throw new Error(`Unsupported Text type: ${this.textType}`);
      }
    } catch (error) {
      console.error(`Error verifying modal: ${error}`);
      return false;
    }
  }
}
