/* eslint-disable import/no-import-module-exports */
import { expect } from '@playwright/test';

export default class EventSpeakers {
  constructor(page) {
    this.page = page;
    this.eventSpeakers = page.locator('.event-speakers');
  }

  /**
   * Checks the speaker image is displayed.
   * @param {int} idx the speaker index
   */
  async checkImage(idx) {
    const imgSelector = this.eventSpeakers.locator(`div:nth-child(${idx}) > div > picture > img`);
    await expect(imgSelector).toBeVisible();
  }

  /**
   * Checks the rest of the speaker text displays after
   * selecting the respective button.
   * @param {int} idx
   */
  async checkDescription(idx) {
    const descSelector = this.eventSpeakers.locator(`div:nth-child(${idx}) > section > div.desc`);
    const descButtonSelector = this.eventSpeakers.locator(`div:nth-child(${idx}) > section > div.desc > button`);

    const before = await descSelector.textContent();
    await descButtonSelector.click();
    const after = await descSelector.textContent();

    expect(after.length).toBeGreaterThan(before.length);
  }
}
