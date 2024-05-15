import { expect, test } from "@playwright/test";
import { features } from "../../features/feds/creativeCloudUnavSanity.spec";
import CreativeCloudUnavSanity from "../../selectors/feds/feds.creativecloudunavsanity.page";

test.describe('Test Suite for Creative Cloud Page Components', () => {

    test(`${features[0].name}, ${features[0].tags}`, async ({ page, baseURL }) => {
        const creativeCloud = new CreativeCloudUnavSanity(page);
        console.info(`[FEDSInfo] Checking Page: ${baseURL}${features[0].path}`);

        await test.step('Validation of United States Creative Cloud page', async () => {
            const pageURL = `${baseURL}${features[0].path}`;
            await page.goto(pageURL, { waitUntil: 'domcontentloaded' });
            await expect(page).toHaveURL(pageURL);

            // Verifying the visibility of Adobe brand Logo
            await expect(creativeCloud.adobeLogo).toBeVisible();

            // Verifying the visibility of U-Nav Elements
            // await creativeCloud.checkVisibilityOfUnavElements();
            await Promise.all(features[0].unavElements.map(element => expect(creativeCloud[element]).toBeVisible()));

            // Verifying the visibility of Creativity & Design Elements
            await creativeCloud.checkVisibilityOfCreativityAndDesignElements();

            // Verifying the visibility of Explore Elements
            await creativeCloud.checkVisibilityOfExploreElements();

            // Verifying the visibility of Learn & Support  
            await creativeCloud.checkVisibilityOfLearnAndSupportElements();

            // closing the Promo button
            await creativeCloud.closePromoButton.click({ timeout: 5000 });

            // Verifying the visibility of Footer Elements
            await creativeCloud.checkVisibilityOfFooterElements();

            // Verifying and clicking the "Buy Now" button
            await creativeCloud.buyNowButton.click({ timeout: 5000 });
            await creativeCloud.verifyBuyNowButton(page);
        });
    });
});