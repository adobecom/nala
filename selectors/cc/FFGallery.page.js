import { expect } from '@playwright/test';

export default class FFGallery {
  constructor(page) {
    this.page = page;
    // firefly UI elements in page
    this.FFGalleryBlock = page.locator('.firefly-gallery.container.firefly-gallery-block.con-block');
    this.FFGalleryContent = this.FFGalleryBlock.locator('.firefly-gallery-content');
    this.gridBlock_design = this.FFGalleryBlock.locator('.firefly-gallery-masonry-grid');
    this.grid_TallCards = this.FFGalleryBlock.locator('.firefly-gallery-item.skeleton-item.firefly-gallery-item-tall.loaded').first();
    this.grid_ShortCards = this.FFGalleryBlock.locator('.firefly-gallery-item.skeleton-item.firefly-gallery-item-short.loaded').first();
    this.imageAuthorInfoSection = this.FFGalleryBlock.locator('.firefly-gallery-user-info').first();
    this.imageAuthorName = this.FFGalleryBlock.locator('.firefly-gallery-username').first();
    this.imageDisplayInCard = this.FFGalleryBlock.locator('.firfirefly-gallery-image').first();
    this.imageHoverText = this.FFGalleryBlock.locator('div.firefly-gallery-image:has(img[alt]:not([alt=""])').first();
    this.imagePromptText = this.FFGalleryBlock.locator('.firefly-gallery-prompt').first();
    this.cardViewCTA = this.FFGalleryBlock.locator('.firefly-gallery-view-button').first();
    this.cardNavigationToProductPage = page.locator('.firefly-gallery-overlay[href*="firefly.adobe.com"]').first();
  }

  /**
   * Wait for the Firefly gallery API request and assert it was called.
   * Must be called before navigation/action that triggers the API call.
   * @param {number} timeout milliseconds to wait (default 10000)
   * @returns {Promise<import('@playwright/test').Response>} matched response
   */
  async waitForGalleryApiCall(timeout = 10000) {
    const expectedBase = 'https://community-hubs.adobe.io/api/v2/ff_community/assets';
    const expectedQuery = 'category_id=text2Image';

    const responsePromise = this.page.waitForResponse(
      (response) => response.url().startsWith(expectedBase)
        && response.url().includes(expectedQuery)
        && response.status() === 200,
      { timeout },
    );

    return responsePromise;
  }

  /**
   * Navigate to gallery and verify API request is made.
   * @param {string} url - Page URL to navigate to
   * @param {number} timeout milliseconds to wait (default 10000)
   */
  async verifyGalleryApiCallOnPageLoad(url, timeout = 10000) {
    try {
      const apiResponsePromise = this.waitForGalleryApiCall(timeout);
      await this.page.goto(url, { waitUntil: 'domcontentloaded' });
      const response = await apiResponsePromise;
      expect(response).toBeTruthy();
      expect(response.status()).toBe(200);
      return response;
    } catch (error) {
      throw new Error(`Gallery API call failed: ${error.message}`);
    }
  }
}
