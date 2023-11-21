import { expect, test } from '@playwright/test';
import { features } from '../../features/acom/ost.spec.js';
import OSTPage from '../../selectors/acom/ost.page.js';
import ims from '../../libs/imslogin.js';

test.describe('OST page test suite', () => {
  // Verify OST search by offer ID
  test(`${features[0].name},${features[0].tags}`, async ({ page, baseURL }) => {
    const OST = new OSTPage(page);
    const testPage = `${baseURL}${features[0].path}`;

    console.info(`[Test Page]: `, testPage);

    await test.step('Open Offer Selector Tool', async () => {
        await page.goto(testPage);
        await page.waitForLoadState('domcontentloaded');
    });

    await test.step('Login to Adobe', async () => {
        await page.waitForURL('**/auth.services.adobe.com/en_US/index.html**/');
        features[0].url = testPage;
        ims.fillOutSignInForm(features[0], page);
    });
    
    await test.step('Enter Offer ID in the search field', async () => {
        await OST.searchField.waitFor({ state: 'visible', timeout: 10000 });
        await OST.searchField.fill("0ADF92A6C8514F2800BE9E87DB641D2A");
    });

    await test.step('Validate search results', async () => {
        await OST.productList.first().waitFor({ state: 'visible', timeout: 10000 });
        const skus = OST.productList;
        expect(await skus.count()).toBeLessThanOrEqual(2);
        expect(await skus.nth(0).innerText()).not.toContain("Creative Cloud All Apps");
        expect(await skus.nth(0).innerText()).toContain("Photoshop");
        expect(await skus.nth(1).innerText()).not.toContain("ccsn");
        expect(await skus.nth(1).innerText()).toContain("phsp");
    });

    await test.step('Validate entitlements', async () => {
        await OST.planType.waitFor({state: 'visible'});
        await OST.offerType.waitFor({state: 'visible'});
        expect(await OST.planType.innerText()).toContain("PUF");
        expect(await OST.offerType.innerText()).toContain("TRIAL");
    });

    await test.step('Click Next button in OST', async () => {
        await OST.nextButton.waitFor({ state: 'visible', timeout: 10000 });
        await OST.nextButton.click();
    });
  
    await test.step('Validate Offer price options', async () => {
        await OST.price.waitFor({state: 'visible', timeout: 10000});
        await OST.priceOptical.waitFor({state: 'visible', timeout: 10000});
        await OST.priceStrikethrough.waitFor({state: 'visible', timeout: 10000});

        const priceValue = "US$263.88";
        const opticalPriceValue = "US$21.99";
        const term = "/yr";
        const opticalTerm = "/mo";
        const unit = "per license";
        const taxLabel = "excl. tax"

        expect(await OST.price.innerText()).toContain(priceValue);
        expect(await OST.price.innerText()).toContain(term);
        expect(await OST.price.innerText()).toContain(unit);
        expect(await OST.price.innerText()).not.toContain(taxLabel);

        expect(await OST.priceOptical.innerText()).toContain(opticalPriceValue);
        expect(await OST.priceOptical.innerText()).toContain(opticalTerm);
        expect(await OST.priceOptical.innerText()).toContain(unit);
        expect(await OST.priceOptical.innerText()).not.toContain(taxLabel);

        expect(await OST.priceStrikethrough.innerText()).toContain(priceValue);
        expect(await OST.priceStrikethrough.innerText()).toContain(term);
        expect(await OST.priceStrikethrough.innerText()).toContain(unit);
        expect(await OST.priceStrikethrough.innerText()).not.toContain(taxLabel);

        //Click tax label checkbox
        await OST.taxlabelCheckbox.click();
        expect(await OST.price.innerText()).toContain(taxLabel);
        expect(await OST.priceOptical.innerText()).toContain(taxLabel);
        expect(await OST.priceStrikethrough.innerText()).toContain(taxLabel);

        //Click term checkbox
        await OST.termCheckbox.click();
        expect(await OST.price.innerText()).not.toContain(term);
        expect(await OST.priceOptical.innerText()).not.toContain(opticalTerm);
        expect(await OST.priceStrikethrough.innerText()).not.toContain(term);

        //Click unit checkbox
        await OST.unitCheckbox.click();
        expect(await OST.price.innerText()).not.toContain(unit);
        expect(await OST.priceOptical.innerText()).not.toContain(unit);
        expect(await OST.priceStrikethrough.innerText()).not.toContain(unit);

    });
  });
});
