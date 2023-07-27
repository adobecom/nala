import { test } from '@playwright/test';
import { features } from '../../features/bacom/event-speakers.spec.js';
import EventSpeakers from '../../selectors/bacom/event-speakers.page.js';

test.describe('Bacom Event Speakers Test Suite', () => {
  test(`${features[0].name}, ${features[0].tags}`, async ({ page, baseURL }) => {
    console.info(`[Test Page]: ${baseURL}${features[0].path}`);
    const eventSpeakers = new EventSpeakers(page);

    await test.step('Go to test page', async () => {
      await page.goto(`${baseURL}${features[0].path}`);
      await page.waitForLoadState('domcontentloaded');
    });

    await test.step('Verify that the speaker image displays', async () => {
      await eventSpeakers.checkImage(features[0].speakerIdx);
    });

    await test.step('Verify that the rest of the text displays after button click', async () => {
      await eventSpeakers.checkDescription(features[0].speakerIdx);
    });
  });
});
