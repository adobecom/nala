import { expect, test } from '@playwright/test';
import { features } from '../../features/cc/fedpub.spec.js';
import FedPub from '../../selectors/cc/fedpub.page.js';


test.describe('FedPub Sanity test suite', () => {

  //Test 0 : FedPub-Sanity-Check
  test(`${features[0].name}, ${features[0].tags}`, async ({ page, baseURL }) => {
    console.info(`[Test Page]: ${baseURL}${features[0].path}`);
    const fedpub = new FedPub(page);
    const { data } = features[0];

    await test.step('step-1: Navigate to FedPub page', async () => {
      await page.goto(`${baseURL}${features[0].path}`);
      await page.waitForLoadState('networkidle');
      await expect(page).toHaveURL(`${baseURL}${features[0].path}`);
    });

    await test.step('step-2: Check FedPub page content', async () => {
      // Check page title:
      await expect(fedpub.fedPubTitle).toBeVisible();
      await expect(fedpub.fedPubTitle).toHaveText(data.title);

      // Check page first subtitle:
      await expect(fedpub.fedPubSubtitle1).toBeVisible();
      await expect(fedpub.fedPubSubtitle1).toHaveText(data.subTitle1);

      // Check page second subtitle:
      await expect(fedpub.fedPubSubtitle2).toBeVisible();
      await expect(fedpub.fedPubSubtitle2).toHaveText(data.subTitle2);

      // Check page 'Try for free' button:
      await expect(fedpub.tryForFreeButton).toBeVisible();
      await expect(fedpub.tryForFreeButton).toHaveAttribute('href', data.tryForFreeHref);
    });
  });
});
