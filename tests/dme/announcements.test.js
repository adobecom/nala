import { test, expect } from '@playwright/test';

const Announcements = require('../../features/dme/announcements.spec.js');

const { features } = Announcements;

test.describe('Validate announcements block', () => {
  test(`${features[0].name},${features[0].tags}`, async ({ page, baseURL }) => {
    await test.step('Go to Announcements page', async () => {
      await page.goto(`${baseURL}${features[0].path}`);
      await expect(page.url())
        .toContain('/channelpartners/drafts/automation/regression/announcements');
    });
  });
});
