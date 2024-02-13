import { expect, test } from '@playwright/test';
import { features } from '../../features/milo/ost.tools.spec.js';
import OSTPage from '../../selectors/milo/ost.tools.page.js';
import ims from '../../libs/imslogin.js';

let authToken;
const miloLibs = process.env.MILO_LIBS || '';

test.beforeAll(async ({ browser }) => {
    test.slow();
    const page = await browser.newPage();
    const requestGnavPromise = page.waitForResponse('https://www.adobe.com/libs/blocks/global-navigation/utilities/keyboard/mainNav.js');
    await page.goto('https://www.adobe.com/?mboxDisable=1&adobe_authoring_enabled=true');
    await requestGnavPromise;
    const signinBtn = page.locator('button.feds-signIn').first();
    await expect(signinBtn).toBeVisible();
    await signinBtn.click();
    await page.waitForURL('**/auth.services.adobe.com/en_US/index.html**/');
    features[0].url = 'https://www.adobe.com/?mboxDisable=1&adobe_authoring_enabled=true';
    if (!process.env.IMS_EMAIL && !process.env.IMS_PASS) {
        process.env.IMS_EMAIL = 'autohelpx@gmail.com';
        process.env.IMS_PASS = Buffer.from("QWRvYmVfUEBzc3cwcmQx", 'base64').toString();
    }
    await ims.fillOutSignInForm(features[0], page);
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(3000);

    authToken = await page.evaluate(() => {return adobeIMS.getAccessToken().token});
    console.log('token: ', authToken);
});

test.describe('OST page test suite', () => {
  // Verify OST search by offer ID
  test(`${features[0].name},${features[0].tags}`, async ({ page, baseURL, browserName }) => {
    test.skip(browserName === 'firefox', 'Firefox clipboard copy is flaky');

    const OST = new OSTPage(page);
    console.info(`[Test Page]: ${baseURL}${features[0].path}${miloLibs}`);

    const testPage = `${baseURL}${features[0].path}${features[0].browserParams}${authToken}&${miloLibs}`;
    const data = features[0].data;

    await test.step('Open Offer Selector Tool', async () => {
        await page.goto(testPage);
        await page.waitForLoadState('domcontentloaded');
    });
    
    await test.step('Enter Offer ID in the search field', async () => {
        await OST.searchField.waitFor({ state: 'visible', timeout: 10000 });
        await OST.searchField.fill(data.offerID);
        await page.waitForTimeout(2000);
    });

    await test.step('Validate search results', async () => {
        await OST.productList.first().waitFor({ state: 'visible', timeout: 10000 });
        const skus = OST.productList;
        expect(await skus.count()).toBeLessThanOrEqual(2);
        expect(await skus.nth(0).innerText()).toContain(data.productName);
        expect(await skus.nth(1).innerText()).toContain(data.productNameShort);
    });
  });

  // Verify OST offer entitlements
  test(`${features[1].name},${features[1].tags}`, async ({ page, baseURL, browserName }) => {
    test.skip(browserName === 'firefox', 'Firefox clipboard copy is flaky');

    const OST = new OSTPage(page);
    console.info(`[Test Page]: ${baseURL}${features[1].path}${miloLibs}`);

    const testPage = `${baseURL}${features[1].path}${features[1].browserParams}${authToken}&${miloLibs}`;
    const data = features[1].data;

    await test.step('Open Offer Selector Tool', async () => {
        await page.goto(testPage);
        await page.waitForLoadState('domcontentloaded');
    });
    
    await test.step('Enter Offer ID in the search field', async () => {
        await OST.searchField.waitFor({ state: 'visible', timeout: 10000 });
        await OST.searchField.fill(data.offerID);
        await page.waitForTimeout(2000);
    });

    await test.step('Validate entitlements', async () => {
        await OST.planType.waitFor({state: 'visible', timeout: 10000 });
        await OST.offerType.waitFor({state: 'visible', timeout: 10000 });
        expect(await OST.planType.innerText()).toContain(data.planType);
        expect(await OST.offerType.innerText()).toContain(data.offerType);
    });
  });

  // Verify OST offer price options display
  test(`${features[2].name},${features[2].tags}`, async ({ page, baseURL, browserName }) => {
    test.skip(browserName === 'firefox', 'Firefox clipboard copy is flaky');

    const OST = new OSTPage(page);
    console.info(`[Test Page]: ${baseURL}${features[2].path}${miloLibs}`);

    const testPage = `${baseURL}${features[2].path}${features[2].browserParams}${authToken}&${miloLibs}`;
    const data = features[2].data;

    let clipboardText;

    await test.step('Open Offer Selector Tool', async () => {
        await page.goto(testPage);
        await page.waitForLoadState('domcontentloaded');
    });
    
    await test.step('Enter Offer ID in the search field', async () => {
        await OST.searchField.waitFor({ state: 'visible', timeout: 10000 });
        await OST.searchField.fill(data.offerID);
    });

    await test.step('Click Next button in OST', async () => {
        await OST.nextButton.waitFor({ state: 'visible', timeout: 10000 });
        await OST.nextButton.click();
    });
  
    await test.step('Validate Offer regular price option', async () => {
        await OST.price.waitFor({state: 'visible', timeout: 10000});
        await OST.priceUse.waitFor({state: 'visible', timeout: 10000});
    
        expect(await OST.price.innerText()).toContain(data.price);
        expect(await OST.price.innerText()).toContain(data.term);
        expect(await OST.price.innerText()).toContain(data.unit);
        expect(await OST.price.innerText()).not.toContain(data.taxLabel);

        await OST.priceUse.click();
        clipboardText = await page.evaluate("navigator.clipboard.readText()");
        expect(await clipboardText).toContain("milo.adobe.com/tools/ost");
        expect(await clipboardText).toContain("type=price");
        expect(await clipboardText).toContain("term=true");
        expect(await clipboardText).toContain("seat=true");
        expect(await clipboardText).toContain("tax=false");
        expect(await clipboardText).toContain("exclusive=false");
    });

    await test.step('Validate Offer optical price option', async () => {
        await OST.priceOptical.waitFor({state: 'visible', timeout: 10000});
        await OST.priceOpticalUse.waitFor({state: 'visible', timeout: 10000});

        expect(await OST.priceOptical.innerText()).toContain(data.opticalPrice);
        expect(await OST.priceOptical.innerText()).toContain(data.opticalTerm);
        expect(await OST.priceOptical.innerText()).toContain(data.unit);
        expect(await OST.priceOptical.innerText()).not.toContain(data.taxLabel);

        await OST.priceOpticalUse.click();
        clipboardText = await page.evaluate("navigator.clipboard.readText()");
        expect(await clipboardText).toContain("milo.adobe.com/tools/ost");
        expect(await clipboardText).toContain("type=priceOptical");
        expect(await clipboardText).toContain("term=true");
        expect(await clipboardText).toContain("seat=true");
        expect(await clipboardText).toContain("tax=false");
        expect(await clipboardText).toContain("exclusive=false");
    });

    await test.step('Validate Offer strikethrough price option', async () => {
        await OST.priceStrikethrough.waitFor({state: 'visible', timeout: 10000});
        await OST.priceStrikethroughUse.waitFor({state: 'visible', timeout: 10000});

        expect(await OST.priceStrikethrough.innerText()).toContain(data.price);
        expect(await OST.priceStrikethrough.innerText()).toContain(data.term);
        expect(await OST.priceStrikethrough.innerText()).toContain(data.unit);
        expect(await OST.priceStrikethrough.innerText()).not.toContain(data.taxLabel);
        
        await OST.priceStrikethroughUse.click();
        clipboardText = await page.evaluate("navigator.clipboard.readText()");
        expect(await clipboardText).toContain("milo.adobe.com/tools/ost");
        expect(await clipboardText).toContain("type=priceStrikethrough");
        expect(await clipboardText).toContain("term=true");
        expect(await clipboardText).toContain("seat=true");
        expect(await clipboardText).toContain("tax=false");
        expect(await clipboardText).toContain("exclusive=false");
    });
  });

  // Verify OST enebalement for price term text
  test(`${features[3].name},${features[3].tags}`, async ({ page, baseURL, browserName }) => {
    test.skip(browserName === 'firefox', 'Firefox clipboard copy is flaky');

    const OST = new OSTPage(page);
    console.info(`[Test Page]: ${baseURL}${features[3].path}${miloLibs}`);

    const testPage = `${baseURL}${features[3].path}${features[3].browserParams}${authToken}&${miloLibs}`;
    const data = features[3].data;

    let clipboardText;

    await test.step('Open Offer Selector Tool', async () => {
        await page.goto(testPage);
        await page.waitForLoadState('domcontentloaded');
    });
    
    await test.step('Enter Offer ID in the search field', async () => {
        await OST.searchField.waitFor({ state: 'visible', timeout: 10000 });
        await OST.searchField.fill(data.offerID);
    });

    await test.step('Click Next button in OST', async () => {
        await OST.nextButton.waitFor({ state: 'visible', timeout: 10000 });
        await OST.nextButton.click();
    });
  
    await test.step('Validate term enablement', async () => {
        await OST.price.waitFor({state: 'visible', timeout: 10000});
        await OST.priceOptical.waitFor({state: 'visible', timeout: 10000});
        await OST.priceStrikethrough.waitFor({state: 'visible', timeout: 10000});
        await OST.priceUse.waitFor({state: 'visible', timeout: 10000});
        await OST.priceOpticalUse.waitFor({state: 'visible', timeout: 10000});
        await OST.priceStrikethroughUse.waitFor({state: 'visible', timeout: 10000});

        expect(await OST.price.innerText()).toContain(data.term);               
        await OST.priceUse.click();
        clipboardText = await page.evaluate("navigator.clipboard.readText()");
        expect(await clipboardText).toContain("type=price");
        expect(await clipboardText).toContain("term=true");

        expect(await OST.priceOptical.innerText()).toContain(data.opticalTerm);
        await OST.priceOpticalUse.click();
        clipboardText = await page.evaluate("navigator.clipboard.readText()");
        expect(await clipboardText).toContain("type=priceOptical");
        expect(await clipboardText).toContain("term=true");

        expect(await OST.priceStrikethrough.innerText()).toContain(data.term);
        await OST.priceStrikethroughUse.click();
        clipboardText = await page.evaluate("navigator.clipboard.readText()");
        expect(await clipboardText).toContain("type=priceStrikethrough");
        expect(await clipboardText).toContain("term=true");

        //Check term checkbox
        await OST.termCheckbox.click();

        expect(await OST.price.innerText()).not.toContain(data.term);
        await OST.priceUse.click();
        clipboardText = await page.evaluate("navigator.clipboard.readText()");
        expect(await clipboardText).toContain("term=false");

        expect(await OST.priceOptical.innerText()).not.toContain(data.opticalTerm);
        await OST.priceOpticalUse.click();
        clipboardText = await page.evaluate("navigator.clipboard.readText()");
        expect(await clipboardText).toContain("term=false");

        expect(await OST.priceStrikethrough.innerText()).not.toContain(data.term);
        await OST.priceStrikethroughUse.click();
        clipboardText = await page.evaluate("navigator.clipboard.readText()");
        expect(await clipboardText).toContain("term=false");
        
        //Uncheck term checkbox
        await OST.termCheckbox.click();

        expect(await OST.price.innerText()).toContain(data.term);
        await OST.priceUse.click();
        clipboardText = await page.evaluate("navigator.clipboard.readText()");
        expect(await clipboardText).toContain("term=true");

        expect(await OST.priceOptical.innerText()).toContain(data.opticalTerm);
        await OST.priceOpticalUse.click();
        clipboardText = await page.evaluate("navigator.clipboard.readText()");
        expect(await clipboardText).toContain("term=true");

        expect(await OST.priceStrikethrough.innerText()).toContain(data.term);
        await OST.priceStrikethroughUse.click();
        clipboardText = await page.evaluate("navigator.clipboard.readText()");
        expect(await clipboardText).toContain("term=true");        
    });
  });

  // Verify OST enebalement for price unit text
  test(`${features[4].name},${features[4].tags}`, async ({ page, baseURL, browserName }) => {
    test.skip(browserName === 'firefox', 'Firefox clipboard copy is flaky');

    const OST = new OSTPage(page);
    console.info(`[Test Page]: ${baseURL}${features[4].path}${miloLibs}`);

    const testPage = `${baseURL}${features[4].path}${features[4].browserParams}${authToken}&${miloLibs}`;
    const data = features[4].data;

    let clipboardText;

    await test.step('Open Offer Selector Tool', async () => {
        await page.goto(testPage);
        await page.waitForLoadState('domcontentloaded');
    });
    
    await test.step('Enter Offer ID in the search field', async () => {
        await OST.searchField.waitFor({ state: 'visible', timeout: 10000 });
        await OST.searchField.fill(data.offerID);
    });

    await test.step('Click Next button in OST', async () => {
        await OST.nextButton.waitFor({ state: 'visible', timeout: 10000 });
        await OST.nextButton.click();
    });
  
    await test.step('Validate unit enablement', async () => {
        await OST.price.waitFor({state: 'visible', timeout: 10000});
        await OST.priceOptical.waitFor({state: 'visible', timeout: 10000});
        await OST.priceStrikethrough.waitFor({state: 'visible', timeout: 10000});
        await OST.priceUse.waitFor({state: 'visible', timeout: 10000});
        await OST.priceOpticalUse.waitFor({state: 'visible', timeout: 10000});
        await OST.priceStrikethroughUse.waitFor({state: 'visible', timeout: 10000});

        expect(await OST.price.innerText()).toContain(data.unit);
        await OST.priceUse.click();
        clipboardText = await page.evaluate("navigator.clipboard.readText()");
        expect(await clipboardText).toContain("type=price");
        expect(await clipboardText).toContain("seat=true");

        expect(await OST.priceOptical.innerText()).toContain(data.unit);
        await OST.priceOpticalUse.click();
        clipboardText = await page.evaluate("navigator.clipboard.readText()");
        expect(await clipboardText).toContain("type=priceOptical");
        expect(await clipboardText).toContain("seat=true");

        expect(await OST.priceStrikethrough.innerText()).toContain(data.unit);
        await OST.priceStrikethroughUse.click();
        clipboardText = await page.evaluate("navigator.clipboard.readText()");
        expect(await clipboardText).toContain("type=priceStrikethrough");
        expect(await clipboardText).toContain("seat=true");

        //Check unit checkbox
        await OST.unitCheckbox.click();

        expect(await OST.price.innerText()).not.toContain(data.unit);
        await OST.priceUse.click();
        clipboardText = await page.evaluate("navigator.clipboard.readText()");
        expect(await clipboardText).toContain("seat=false");

        expect(await OST.priceOptical.innerText()).not.toContain(data.unit);
        await OST.priceOpticalUse.click();
        clipboardText = await page.evaluate("navigator.clipboard.readText()");
        expect(await clipboardText).toContain("seat=false");

        expect(await OST.priceStrikethrough.innerText()).not.toContain(data.unit);
        await OST.priceStrikethroughUse.click();
        clipboardText = await page.evaluate("navigator.clipboard.readText()");
        expect(await clipboardText).toContain("seat=false");

        //Uncheck unit checkbox
        await OST.unitCheckbox.click();

        expect(await OST.price.innerText()).toContain(data.unit);
        await OST.priceUse.click();
        clipboardText = await page.evaluate("navigator.clipboard.readText()");
        expect(await clipboardText).toContain("seat=true");

        expect(await OST.priceOptical.innerText()).toContain(data.unit);
        await OST.priceOpticalUse.click();
        clipboardText = await page.evaluate("navigator.clipboard.readText()");
        expect(await clipboardText).toContain("seat=true");

        expect(await OST.priceStrikethrough.innerText()).toContain(data.unit);
        await OST.priceStrikethroughUse.click();
        clipboardText = await page.evaluate("navigator.clipboard.readText()");
        expect(await clipboardText).toContain("seat=true");

    });
  });

  // Verify OST enebalement for price tax label
  test(`${features[5].name},${features[5].tags}`, async ({ page, baseURL, browserName }) => {
    test.skip(browserName === 'firefox', 'Firefox clipboard copy is flaky');

    const OST = new OSTPage(page);
    console.info(`[Test Page]: ${baseURL}${features[5].path}${miloLibs}`);

    const testPage = `${baseURL}${features[5].path}${features[5].browserParams}${authToken}&${miloLibs}`;
    const data = features[5].data;

    let clipboardText;

    await test.step('Open Offer Selector Tool', async () => {
        await page.goto(testPage);
        await page.waitForLoadState('domcontentloaded');
    });
    
    await test.step('Enter Offer ID in the search field', async () => {
        await OST.searchField.waitFor({ state: 'visible', timeout: 10000 });
        await OST.searchField.fill(data.offerID);
    });

    await test.step('Click Next button in OST', async () => {
        await OST.nextButton.waitFor({ state: 'visible', timeout: 10000 });
        await OST.nextButton.click();
    });
  
    await test.step('Validate tax label enablement', async () => {
        await OST.price.waitFor({state: 'visible', timeout: 10000});
        await OST.priceOptical.waitFor({state: 'visible', timeout: 10000});
        await OST.priceStrikethrough.waitFor({state: 'visible', timeout: 10000});
        await OST.priceUse.waitFor({state: 'visible', timeout: 10000});
        await OST.priceOpticalUse.waitFor({state: 'visible', timeout: 10000});
        await OST.priceStrikethroughUse.waitFor({state: 'visible', timeout: 10000});


        expect(await OST.price.innerText()).not.toContain(data.taxLabel);
        await OST.priceUse.click();
        clipboardText = await page.evaluate("navigator.clipboard.readText()");
        expect(await clipboardText).toContain("type=price");
        expect(await clipboardText).toContain("tax=false");

        expect(await OST.priceOptical.innerText()).not.toContain(data.taxLabel);
        await OST.priceOpticalUse.click();
        clipboardText = await page.evaluate("navigator.clipboard.readText()");
        expect(await clipboardText).toContain("type=priceOptical");
        expect(await clipboardText).toContain("tax=false");

        expect(await OST.priceStrikethrough.innerText()).not.toContain(data.taxLabel);
        await OST.priceStrikethroughUse.click();
        clipboardText = await page.evaluate("navigator.clipboard.readText()");
        expect(await clipboardText).toContain("type=priceStrikethrough");
        expect(await clipboardText).toContain("tax=false");

        //Check tax label checkbox
        await OST.taxlabelCheckbox.click();

        expect(await OST.price.innerText()).toContain(data.taxLabel);
        await OST.priceUse.click();
        clipboardText = await page.evaluate("navigator.clipboard.readText()");
        expect(await clipboardText).toContain("tax=true");

        expect(await OST.priceOptical.innerText()).toContain(data.taxLabel);
        await OST.priceOpticalUse.click();
        clipboardText = await page.evaluate("navigator.clipboard.readText()");
        expect(await clipboardText).toContain("tax=true");

        expect(await OST.priceStrikethrough.innerText()).toContain(data.taxLabel);
        await OST.priceStrikethroughUse.click();
        clipboardText = await page.evaluate("navigator.clipboard.readText()");
        expect(await clipboardText).toContain("tax=true");

        //Uncheck tax label checkbox
        await OST.taxlabelCheckbox.click();

        expect(await OST.price.innerText()).not.toContain(data.taxLabel);
        await OST.priceUse.click();
        clipboardText = await page.evaluate("navigator.clipboard.readText()");
        expect(await clipboardText).toContain("tax=false");

        expect(await OST.priceOptical.innerText()).not.toContain(data.taxLabel);
        await OST.priceOpticalUse.click();
        clipboardText = await page.evaluate("navigator.clipboard.readText()");
        expect(await clipboardText).toContain("tax=false");

        expect(await OST.priceStrikethrough.innerText()).not.toContain(data.taxLabel);
        await OST.priceStrikethroughUse.click();
        clipboardText = await page.evaluate("navigator.clipboard.readText()");
        expect(await clipboardText).toContain("tax=false");
    });
  });

  // Verify OST enebalement for tax inclusivity in the price
  test(`${features[6].name},${features[6].tags}`, async ({ page, baseURL, browserName }) => {
    test.skip(browserName === 'firefox', 'Firefox clipboard copy is flaky');

    const OST = new OSTPage(page);
    console.info(`[Test Page]: ${baseURL}${features[6].path}${miloLibs}`);

    const testPage = `${baseURL}${features[6].path}${features[6].browserParams}${authToken}&${miloLibs}`;
    const data = features[6].data;

    let clipboardText;

    await test.step('Open Offer Selector Tool', async () => {
        await page.goto(testPage);
        await page.waitForLoadState('domcontentloaded');
    });
    
    await test.step('Enter Offer ID in the search field', async () => {
        await OST.searchField.waitFor({ state: 'visible', timeout: 10000 });
        await OST.searchField.fill(data.offerID);
    });

    await test.step('Click Next button in OST', async () => {
        await OST.nextButton.waitFor({ state: 'visible', timeout: 10000 });
        await OST.nextButton.click();
    });
  
    await test.step('Validate tax inclusivity enablement', async () => {
        await OST.price.waitFor({state: 'visible', timeout: 10000});
        await OST.priceOptical.waitFor({state: 'visible', timeout: 10000});
        await OST.priceStrikethrough.waitFor({state: 'visible', timeout: 10000});
        await OST.priceUse.waitFor({state: 'visible', timeout: 10000});
        await OST.priceOpticalUse.waitFor({state: 'visible', timeout: 10000});
        await OST.priceStrikethroughUse.waitFor({state: 'visible', timeout: 10000});

        await OST.priceUse.click();
        clipboardText = await page.evaluate("navigator.clipboard.readText()");
        expect(await clipboardText).toContain("type=price");
        expect(await clipboardText).toContain("exclusive=false");

        await OST.priceOpticalUse.click();
        clipboardText = await page.evaluate("navigator.clipboard.readText()");
        expect(await clipboardText).toContain("type=priceOptical");
        expect(await clipboardText).toContain("exclusive=false");

        await OST.priceStrikethroughUse.click();
        clipboardText = await page.evaluate("navigator.clipboard.readText()");
        expect(await clipboardText).toContain("type=priceStrikethrough");
        expect(await clipboardText).toContain("exclusive=false");

        //Check tax label checkbox
        await OST.taxInlcusivityCheckbox.click();

        await OST.priceUse.click();
        clipboardText = await page.evaluate("navigator.clipboard.readText()");
        expect(await clipboardText).toContain("exclusive=true");

        await OST.priceOpticalUse.click();
        clipboardText = await page.evaluate("navigator.clipboard.readText()");
        expect(await clipboardText).toContain("exclusive=true");

        await OST.priceStrikethroughUse.click();
        clipboardText = await page.evaluate("navigator.clipboard.readText()");
        expect(await clipboardText).toContain("exclusive=true");

        //Uncheck tax label checkbox
        await OST.taxInlcusivityCheckbox.click();

        await OST.priceUse.click();
        clipboardText = await page.evaluate("navigator.clipboard.readText()");
        expect(await clipboardText).toContain("exclusive=false");

        await OST.priceOpticalUse.click();
        clipboardText = await page.evaluate("navigator.clipboard.readText()");
        expect(await clipboardText).toContain("exclusive=false");

        await OST.priceStrikethroughUse.click();
        clipboardText = await page.evaluate("navigator.clipboard.readText()");
        expect(await clipboardText).toContain("exclusive=false");
    });
  });

  // Verify OST offer price promo 
  test(`${features[7].name},${features[7].tags}`, async ({ page, baseURL, browserName }) => {
    test.skip(browserName === 'firefox', 'Firefox clipboard copy is flaky');

    const OST = new OSTPage(page);
    console.info(`[Test Page]: ${baseURL}${features[7].path}${miloLibs}`);

    const testPage = `${baseURL}${features[7].path}${features[7].browserParams}${authToken}&${miloLibs}`;
    const data = features[7].data;

    let clipboardText;

    await test.step('Open Offer Selector Tool', async () => {
        await page.goto(testPage);
        await page.waitForLoadState('domcontentloaded');
    });
    
    await test.step('Enter Offer ID in the search field', async () => {
        await OST.searchField.waitFor({ state: 'visible', timeout: 10000 });
        await OST.searchField.fill(data.offerID);
    });

    await test.step('Click Next button in OST', async () => {
        await OST.nextButton.waitFor({ state: 'visible', timeout: 10000 });
        await OST.nextButton.click();
    });
  
    await test.step('Validate price with promo option', async () => {
        await OST.price.waitFor({state: 'visible', timeout: 10000});
        await OST.priceUse.waitFor({state: 'visible', timeout: 10000});
        await OST.priceOptical.waitFor({state: 'visible', timeout: 10000});
        await OST.priceOpticalUse.waitFor({state: 'visible', timeout: 10000});
        await OST.priceStrikethrough.waitFor({state: 'visible', timeout: 10000});
        await OST.priceStrikethroughUse.waitFor({state: 'visible', timeout: 10000});
        await OST.promoField.waitFor({state: 'visible', timeout: 10000});
        await OST.cancelPromo.waitFor({state: 'visible', timeout: 10000});

        await OST.priceUse.click();
        clipboardText = await page.evaluate("navigator.clipboard.readText()");
        expect(await clipboardText).not.toContain("promo=");

        await OST.priceOpticalUse.click();
        clipboardText = await page.evaluate("navigator.clipboard.readText()");
        expect(await clipboardText).not.toContain("promo=");

        await OST.priceStrikethroughUse.click();
        clipboardText = await page.evaluate("navigator.clipboard.readText()");
        expect(await clipboardText).not.toContain("promo="); 

        // Add promo
        await OST.promoField.fill(data.promo);

        await OST.priceUse.click();
        clipboardText = await page.evaluate("navigator.clipboard.readText()");
        expect(await clipboardText).toContain(`promo=${data.promo}`);

        await OST.priceOpticalUse.click();
        clipboardText = await page.evaluate("navigator.clipboard.readText()");
        expect(await clipboardText).toContain(`promo=${data.promo}`);

        await OST.priceStrikethroughUse.click();
        clipboardText = await page.evaluate("navigator.clipboard.readText()");
        expect(await clipboardText).toContain(`promo=${data.promo}`); 

        // Cancel promo
        await OST.cancelPromo.click();

        await OST.priceUse.click();
        clipboardText = await page.evaluate("navigator.clipboard.readText()");
        expect(await clipboardText).not.toContain("promo=");

        await OST.priceOpticalUse.click();
        clipboardText = await page.evaluate("navigator.clipboard.readText()");
        expect(await clipboardText).not.toContain("promo=");

        await OST.priceStrikethroughUse.click();
        clipboardText = await page.evaluate("navigator.clipboard.readText()");
        expect(await clipboardText).not.toContain("promo="); 
    });
  });
  
  // Verify OST checkout link generation
  test(`${features[8].name},${features[8].tags}`, async ({ page, baseURL, browserName }) => {
    test.skip(browserName === 'firefox', 'Firefox clipboard copy is flaky');

    const OST = new OSTPage(page);
    console.info(`[Test Page]: ${baseURL}${features[8].path}${miloLibs}`);

    const testPage = `${baseURL}${features[7].path}${features[8].browserParams}${authToken}&${miloLibs}`;
    const data = features[8].data;

    await test.step('Open Offer Selector Tool', async () => {
        await page.goto(testPage);
        await page.waitForLoadState('domcontentloaded');
    });
    
    await test.step('Enter Offer ID in the search field', async () => {
        await OST.searchField.waitFor({ state: 'visible', timeout: 10000 });
        await OST.searchField.fill(data.offerID);
    });

    await test.step('Click Next button in OST', async () => {
        await OST.nextButton.waitFor({ state: 'visible', timeout: 10000 });
        await OST.nextButton.click();
    });
  
    await test.step('Go to Checkout link tab', async () => {
        await OST.checkoutTab.waitFor({state: 'visible', timeout: 10000});
        await OST.checkoutTab.click();
    });

    await test.step('Validate Checkout Link', async () => {
        await OST.checkoutLink.waitFor({state: 'visible', timeout: 10000});
        await OST.promoField.waitFor({state: 'visible', timeout: 10000});
        await OST.workflowMenu.waitFor({state: 'visible', timeout: 10000});

        await expect(OST.checkoutLink).toHaveAttribute('href', new RegExp(`${data.offerID}`));
        await expect(OST.checkoutLink).toHaveAttribute('href', new RegExp(`${data.workflowStep_1}`));
        await expect(OST.checkoutLink).not.toHaveAttribute('href', /apc=/);
        
        // Add promo
        await OST.promoField.fill(data.promo);
        await expect(OST.checkoutLink).toHaveAttribute('href', new RegExp(`${data.promo}`));
        
        // Change Forkflow step
        await OST.workflowMenu.click();
        await page.locator(`div[data-key="${data.workflowStep_2}"]`).waitFor({ state: 'visible', timeout: 10000 });
        await page.locator(`div[data-key="${data.workflowStep_2}"]`).click();
        // await OST.workflowMenu.selectOption({ value: data.workflowStep_2});
        await expect(OST.checkoutLink).toHaveAttribute('href', new RegExp(`${data.workflowStep_2}`));

    });
  });
});
