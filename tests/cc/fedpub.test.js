/* eslint-disable import/named */
/* eslint-disable no-await-in-loop */
/* eslint-disable import/extensions */
import { expect, test } from '@playwright/test';
import { FedPub } from '../../selectors/cc/fedpub.selectors.js';
import * as FedPubSpec from '../../features/cc/fedpub.spec.js';

const { features } = FedPubSpec;

test.describe('FedPub Sanity test suite', () => {
  // FedPub Sanity Checks:
  test(`${features[0].name}, ${features[0].tags}`, async ({ page, baseURL }) => {
    const fedpub = new FedPub(page);
    console.info(`[FedPub] Checking page: ${baseURL}${features[0].path}`);

    await test.step('Navigate to FedPub page', async () => {
      await page.goto(`${baseURL}${features[0].path}`);
      await page.waitForLoadState('networkidle');
      await expect(page).toHaveURL(`${baseURL}${features[0].path}`);
    });

    await test.step('Check FedPub page content', async () => {
      // Check page title:
      await expect(fedpub.fedPubTitle).toBeVisible();
      await expect(fedpub.fedPubTitle).toHaveText(fedpub.props.fedPubTitle);
      // Check page first subtitle:
      await expect(fedpub.fedPubSubtitle1).toBeVisible();
      await expect(fedpub.fedPubSubtitle1).toHaveText(fedpub.props.fedPubSubtitle1);
      // Check page second subtitle:
      await expect(fedpub.fedPubSubtitle2).toBeVisible();
      await expect(fedpub.fedPubSubtitle2).toHaveText(fedpub.props.fedPubSubtitle2);
      // Check page 'Try for free' button:
      await expect(fedpub.tryForFreeButton).toBeVisible();
      await expect(fedpub.tryForFreeButton).toHaveAttribute('href', fedpub.props.tryForFreeHref);
    });
  });
});
