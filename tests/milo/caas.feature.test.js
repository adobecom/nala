import { expect, test } from "@playwright/test";
import { WebUtil } from "../../libs/webutil.js";
import { features } from "../../features/milo/caas.spec.js";
import Caas from "../../selectors/milo/caas.feature.page.js";

let webUtil;
let caas;
let consoleErrors = [];

//const miloLibs = process.env.MILO_LIBS || '';

test.describe("Milo CAAS Feature test suite", () => {
  test.beforeEach(async ({ page }) => {
    webUtil = new WebUtil(page);
    caas = new Caas(page);

    page.on("console", (exception) => {
      if (exception.type() === "error") {
        consoleErrors.push(exception.text());
      }
    });
  });

  test.afterEach(async () => {
    consoleErrors = [];
  });
    
      // Test 0 : Card Collection
      test(`${features[0].name},${features[0].tags}`, async ({ page, baseURL }) => {
        console.info(`[Test Page]: ${baseURL}${features[0].path}`);
        const {data} = features[0];

        await test.step('step-1: Go to CAAS collection test page', async () => {
            await page.goto(`${baseURL}${features[0].path}`);
            await page.waitForLoadState('domcontentloaded');
            await expect(page).toHaveURL(`${baseURL}${features[0].path}`);
        });

        await test.step('step-2: Verify CAAS collection content/specs', async () => {
            await expect(await caas.caasCards).toBeVisible();
            //await expect(await caas.caasCards).toHaveCount(data.cardsPerPage);

            // verify caas title and paginator
            await expect(await caas.caasTitle).toContainText(data.caasTitle);
            await expect(await caas.caasPaginator).toContainText(data.paginator);
        });
    });
});