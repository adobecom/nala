import { expect, test } from "@playwright/test";
import { features } from "../../features/feds/homePageSanity.spec";
import HomePageSanity from "../../selectors/feds/feds.homepagesanity.page.js";
import homePage from "../../features/feds/locales/homePage.json";

test.describe('Test Suite for Home Page Components', () => {

    const validateLocalePage = async (page, baseURL, featureIndex, locale) => {
        const home = new HomePageSanity(page);
        console.info(`[FEDSInfo] Checking page: ${baseURL}${features[featureIndex].path}`);

        await test.step(`Validating ${locale} Locale page`, async () => {
            const pageURL = `${baseURL}${features[featureIndex].path}`;
            await page.goto(pageURL, { waitUntil: 'domcontentloaded' });
            await expect(page).toHaveURL(pageURL);

            // Verifying the visibility of UNAV Elements
            await Promise.all(homePage.locales[locale].unavElements.map(element => expect(home[element]).toBeVisible()));

            // Verifying the visibility of Creative Cloud Elements
            await home.gnavCC.click({ timeout: 5000 });
            await Promise.all(homePage.locales[locale].ccElements.map(element => expect(home[element]).toBeVisible()));

            // Verifying the visibility of Document cloud Elements
            await home.gnavDC.click({ timeout: 5000 });
            await Promise.all(homePage.locales[locale].dcElements.map(element => expect(home[element]).toBeVisible()));

            // Verifying the visibility of Experience Cloud Elements
            await home.gnavEC.click({ timeout: 5000 });
            await Promise.all(homePage.locales[locale].ecElements.map(element => expect(home[element]).toBeVisible()));

            // Verifying the visibility of Help-X Elements
            await home.gnavHelpX.click({ timeout: 5000 });
            await Promise.all(homePage.locales[locale].helpXElements.map(element => expect(home[element]).toBeVisible()));
            await home.gnavHelpX.click({ timeout: 5000 });

            // Verifying the visibility of Footer Elements
            await home.changeRegion.scrollIntoViewIfNeeded();
            await Promise.all(homePage.locales[locale].footerElements.map(element => expect(home[element]).toBeVisible()));
        });
    };

    test(`${features[13].name}, ${features[13].tags}`, async ({ page, baseURL }) => {
        await validateLocalePage(page, baseURL, 13, "united states");
    });

    test(`${features[25].name}, ${features[25].tags}`, async ({ page, baseURL }) => {
        await validateLocalePage(page, baseURL, 25, "france");
    });
});