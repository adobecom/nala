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
        await validateLocalePage(page, baseURL, 13, "United States");
    });

    test(`${features[25].name}, ${features[25].tags}`, async ({ page, baseURL }) => {
        await validateLocalePage(page, baseURL, 25, "France");
    });

    test(`${features[57].name}, ${features[57].tags}`, async ({ page, baseURL }) => {
        await validateLocalePage(page, baseURL, 57, "United Kingdom");
    });

    test(`${features[21].name}, ${features[21].tags}`, async ({ page, baseURL }) => {
        await validateLocalePage(page, baseURL, 21, "Germany");
    });

    test(`${features[89].name}, ${features[89].tags}`, async ({ page, baseURL }) => {
        await validateLocalePage(page, baseURL, 89, "Japan");
    });
    
    test(`${features[30].name}, ${features[30].tags}`, async ({ page, baseURL }) => {
        await validateLocalePage(page, baseURL, 30, "Italy");
    });

    test(`${features[0].name}, ${features[0].tags}`, async ({ page, baseURL }) => {
        await validateLocalePage(page, baseURL, 0, "Argentina");
    });

    test(`${features[1].name}, ${features[1].tags}`, async ({ page, baseURL }) => {
        await validateLocalePage(page, baseURL, 1, "Brazil");
    });

    test(`${features[2].name}, ${features[2].tags}`, async ({ page, baseURL }) => {
        await validateLocalePage(page, baseURL, 2, "Canada English");
    });

    test(`${features[3].name}, ${features[3].tags}`, async ({ page, baseURL }) => {
        await validateLocalePage(page, baseURL, 3, "Canada French");
    });

    test(`${features[4].name}, ${features[4].tags}`, async ({ page, baseURL }) => {
        await validateLocalePage(page, baseURL, 4, "Chile");
    });

    test(`${features[5].name}, ${features[5].tags}`, async ({ page, baseURL }) => {
        await validateLocalePage(page, baseURL, 5, "Colombia");
    });

    test(`${features[6].name}, ${features[6].tags}`, async ({ page, baseURL }) => {
        await validateLocalePage(page, baseURL, 6, "Costa Rica");
    });

    test(`${features[7].name}, ${features[7].tags}`, async ({ page, baseURL }) => {
        await validateLocalePage(page, baseURL, 7, "Ecuador");
    });

    test(`${features[8].name}, ${features[8].tags}`, async ({ page, baseURL }) => {
        await validateLocalePage(page, baseURL, 8, "Guatemala");
    });

    test(`${features[9].name}, ${features[9].tags}`, async ({ page, baseURL }) => {
        await validateLocalePage(page, baseURL, 9, "Latin America");
    });

    test(`${features[10].name}, ${features[10].tags}`, async ({ page, baseURL }) => {
        await validateLocalePage(page, baseURL, 10, "Mexico");
    });

    test(`${features[11].name}, ${features[11].tags}`, async ({ page, baseURL }) => {
        await validateLocalePage(page, baseURL, 11, "Peru");
    });

    test(`${features[12].name}, ${features[12].tags}`, async ({ page, baseURL }) => {
        await validateLocalePage(page, baseURL, 12, "Puerto Rico");
    });

    test(`${features[14].name}, ${features[14].tags}`, async ({ page, baseURL }) => {
        await validateLocalePage(page, baseURL, 14, "Africa English");
    });

    test(`${features[15].name}, ${features[15].tags}`, async ({ page, baseURL }) => {
        await validateLocalePage(page, baseURL, 15, "Belgium French");
    });

    test(`${features[16].name}, ${features[16].tags}`, async ({ page, baseURL }) => {
        await validateLocalePage(page, baseURL, 16, "Belgium English");
    });

    test(`${features[17].name}, ${features[17].tags}`, async ({ page, baseURL }) => {
        await validateLocalePage(page, baseURL, 17, "Belgium Nederlands");
    });
    /*
    test(`${features[18].name}, ${features[18].tags}`, async ({ page, baseURL }) => {
        await validateLocalePage(page, baseURL, 18, "CIS English");
    });

    test(`${features[19].name}, ${features[19].tags}`, async ({ page, baseURL }) => {
        await validateLocalePage(page, baseURL, 19, "CIS Russian");
    });
    */
    test(`${features[20].name}, ${features[20].tags}`, async ({ page, baseURL }) => {
        await validateLocalePage(page, baseURL, 20, "Denmark");
    });

    test(`${features[22].name}, ${features[22].tags}`, async ({ page, baseURL }) => {
        await validateLocalePage(page, baseURL, 22, "Estonia");
    });

    test(`${features[23].name}, ${features[23].tags}`, async ({ page, baseURL }) => {
        await validateLocalePage(page, baseURL, 23, "Egypt English");
    });

    test(`${features[24].name}, ${features[24].tags}`, async ({ page, baseURL }) => {
        await validateLocalePage(page, baseURL, 24, "Spain");
    });

    test(`${features[26].name}, ${features[26].tags}`, async ({ page, baseURL }) => {
        await validateLocalePage(page, baseURL, 26, "Greece English");
    });

    test(`${features[27].name}, ${features[27].tags}`, async ({ page, baseURL }) => {
        await validateLocalePage(page, baseURL, 27, "Greece");
    });

    test(`${features[28].name}, ${features[28].tags}`, async ({ page, baseURL }) => {
        await validateLocalePage(page, baseURL, 28, "Ireland");
    });

    test(`${features[29].name}, ${features[29].tags}`, async ({ page, baseURL }) => {
        await validateLocalePage(page, baseURL, 29, "Israel English");
    });

    test(`${features[31].name}, ${features[31].tags}`, async ({ page, baseURL }) => {
        await validateLocalePage(page, baseURL, 31, "Kuwait English");
    });

    test(`${features[32].name}, ${features[32].tags}`, async ({ page, baseURL }) => {
        await validateLocalePage(page, baseURL, 32, "Latvia");
    });

    test(`${features[33].name}, ${features[33].tags}`, async ({ page, baseURL }) => {
        await validateLocalePage(page, baseURL, 33, "Lithuania");
    });

    test(`${features[34].name}, ${features[34].tags}`, async ({ page, baseURL }) => {
        await validateLocalePage(page, baseURL, 34, "Luxemburg German");
    });

    test(`${features[35].name}, ${features[35].tags}`, async ({ page, baseURL }) => {
        await validateLocalePage(page, baseURL, 35, "Luxemburg English");
    });

    test(`${features[36].name}, ${features[36].tags}`, async ({ page, baseURL }) => {
        await validateLocalePage(page, baseURL, 36, "Luxemburg French");
    });

    test(`${features[37].name}, ${features[37].tags}`, async ({ page, baseURL }) => {
        await validateLocalePage(page, baseURL, 37, "Hungary");
    });

    test(`${features[38].name}, ${features[38].tags}`, async ({ page, baseURL }) => {
        await validateLocalePage(page, baseURL, 38, "Middle East and North Africa English");
    });

    test(`${features[39].name}, ${features[39].tags}`, async ({ page, baseURL }) => {
        await validateLocalePage(page, baseURL, 39, "Nigeria");
    });

    test(`${features[40].name}, ${features[40].tags}`, async ({ page, baseURL }) => {
        await validateLocalePage(page, baseURL, 40, "Nederland");
    });

    test(`${features[41].name}, ${features[41].tags}`, async ({ page, baseURL }) => {
        await validateLocalePage(page, baseURL, 41, "Norway");
    });

    test(`${features[42].name}, ${features[42].tags}`, async ({ page, baseURL }) => {
        await validateLocalePage(page, baseURL, 42, "Poland");
    });

    test(`${features[43].name}, ${features[43].tags}`, async ({ page, baseURL }) => {
        await validateLocalePage(page, baseURL, 43, "Portugal");
    });

    test(`${features[44].name}, ${features[44].tags}`, async ({ page, baseURL }) => {
        await validateLocalePage(page, baseURL, 44, "Qatar English");
    });

    test(`${features[45].name}, ${features[45].tags}`, async ({ page, baseURL }) => {
        await validateLocalePage(page, baseURL, 45, "Romania");
    });

    test(`${features[46].name}, ${features[46].tags}`, async ({ page, baseURL }) => {
        await validateLocalePage(page, baseURL, 46, "Saudi Arabia");
    });

    test(`${features[47].name}, ${features[47].tags}`, async ({ page, baseURL }) => {
        await validateLocalePage(page, baseURL, 47, "Switzerland");
    });

    test(`${features[48].name}, ${features[48].tags}`, async ({ page, baseURL }) => {
        await validateLocalePage(page, baseURL, 48, "Slovenia");
    });

    test(`${features[49].name}, ${features[49].tags}`, async ({ page, baseURL }) => {
        await validateLocalePage(page, baseURL, 49, "Slovakia");
    });

    test(`${features[50].name}, ${features[50].tags}`, async ({ page, baseURL }) => {
        await validateLocalePage(page, baseURL, 50, "South Africa");
    });

    test(`${features[51].name}, ${features[51].tags}`, async ({ page, baseURL }) => {
        await validateLocalePage(page, baseURL, 51, "Switzerland French");
    });

    test(`${features[52].name}, ${features[52].tags}`, async ({ page, baseURL }) => {
        await validateLocalePage(page, baseURL, 52, "Finland");
    });

    test(`${features[53].name}, ${features[53].tags}`, async ({ page, baseURL }) => {
        await validateLocalePage(page, baseURL, 53, "Sweden");
    });

    test(`${features[54].name}, ${features[54].tags}`, async ({ page, baseURL }) => {
        await validateLocalePage(page, baseURL, 54, "Switzerland Italian");
    });

    test(`${features[55].name}, ${features[55].tags}`, async ({ page, baseURL }) => {
        await validateLocalePage(page, baseURL, 55, "Turkey");
    });

    test(`${features[56].name}, ${features[56].tags}`, async ({ page, baseURL }) => {
        await validateLocalePage(page, baseURL, 56, "United Arab Emirates English");
    });

    test(`${features[58].name}, ${features[58].tags}`, async ({ page, baseURL }) => {
        await validateLocalePage(page, baseURL, 58, "Austria");
    });

    test(`${features[59].name}, ${features[59].tags}`, async ({ page, baseURL }) => {
        await validateLocalePage(page, baseURL, 59, "Czech Republic");
    });

    test(`${features[60].name}, ${features[60].tags}`, async ({ page, baseURL }) => {
        await validateLocalePage(page, baseURL, 60, "Bulgaria");
    });

    test(`${features[61].name}, ${features[61].tags}`, async ({ page, baseURL }) => {
        await validateLocalePage(page, baseURL, 61, "Russia");
    });

    test(`${features[62].name}, ${features[62].tags}`, async ({ page, baseURL }) => {
        await validateLocalePage(page, baseURL, 62, "Ukraine");
    });
});