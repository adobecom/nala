import { test, expect } from '@playwright/test';
import AnnouncementsPage from '../../selectors/dme/announcements.page.js';

let announcementsPage;
const Announcements = require('../../features/dme/announcements.spec.js');

const { features } = Announcements;

test.describe('Validate announcements block', () => {
  test.beforeEach(async ({ page }) => {
    announcementsPage = new AnnouncementsPage(page);
  });
  test(`${features[0].name},${features[0].tags}`, async ({ page, baseURL }) => {
    await test.step('Go to Announcements page', async () => {
      await page.goto(`${baseURL}${features[0].path}`);
      await expect(page.url())
        .toContain('/channelpartners/drafts/automation/regression/announcements');
    });
  });
});
