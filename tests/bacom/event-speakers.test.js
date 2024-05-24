import { test } from '@playwright/test';
import { features } from '../../features/bacom/event-speakers.spec.js';
import EventSpeakers from '../../selectors/bacom/event-speakers.page.js';

const miloLibs = process.env.MILO_LIBS || '';

test.describe('Bacom Event Speakers Test Suite', () => {
  test(`${features[0].name}, ${features[0].tags}`, async ({ page, baseURL }) => {
    const testPage = `${baseURL}${features[0].path}${miloLibs}`;
    console.info(`[Test Page]: ${testPage}`);
    const eventSpeakers = new EventSpeakers(page);

    await test.step('Go to test page', async () => {
      await page.goto(testPage);
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
