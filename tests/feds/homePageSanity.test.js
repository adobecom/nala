import { expect, test } from "@playwright/test";
import { features } from "../../features/feds/homePageSanity.spec";
import HomePageSanity from "../../selectors/feds/feds.homepagesanity.page.js";
import homePage from "../../features/feds/locales/homePage.json";

test.describe('Test Suite for Home Page Components', () => {

    features.forEach((props) => {
        test(`${props.name}, ${props.tags}`, async ({ page, baseURL }) => {
            const home = new HomePageSanity(page);
            await home.validateGnavHomePage(page, baseURL, props.tcid, props.country, homePage, home);
        });
    });
});