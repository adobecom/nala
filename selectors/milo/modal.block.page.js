import { expect } from '@playwright/test';
import { WebUtil } from '../../libs/webutil.js';

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

    // text block
    this.text = this.modal.locator('.text');
    this.textHeading = this.text.locator('h2');
    this.textBodyM = this.text.locator('.body-m');

    // media block
    this.media = this.modal.locator('.media');
    this.detailM = this.media.locator('.detail-m');
    this.textHeadingMedia = this.media.locator('h2');
    this.textBodySMedia = this.media.locator('.body-s').first();

    // modal contents attributes
    this.attProperties = {
      'modal-link': {
        class: 'modal link-block ',
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
          await expect(await this.text).toBeVisible();
          await expect(await this.textHeading).toContainText(modalData.h2Text);
          await expect(await this.textBodyM).toContainText(modalData.bodyText);

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
          await expect(await this.media).toBeVisible();
          await expect(await this.textHeadingMedia).toContainText(modalData.h2Text);
          await expect(await this.textBodySMedia).toContainText(modalData.bodyText);

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
