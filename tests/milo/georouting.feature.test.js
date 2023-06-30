import { expect, test } from '@playwright/test';
import Georouting from '../../selectors/milo/georouting.feature.page.js';

const { features } = require('../../features/milo/georouting.spec.js');

let obj;

test.describe('Milo Georouting feature test suite', () => {
    test.beforeEach(async ({ page }) => {
        obj = new Georouting(page);
    });

    // Test - 0
    test(`${features[0].name},${features[0].tags}`, async ({ page, baseURL }) => {
        console.info(`[Test Page]: ${baseURL}${features[0].path}`);
        const { data } = features[0];

        await test.step('step-1: Clear cookies and access "de" page from "us" region', async () => {
            await page.context().clearCookies();
            await page.goto(`${baseURL}${features[0].path}`);
            await page.waitForLoadState('domcontentloaded');
            await expect(page).toHaveURL(`${baseURL}${features[0].path}`);
            await obj.geoModal.waitFor({ state: 'visible', timeout: 10000 });
        });

        await test.step('step-2: Verify georouting modal and its content', async () => {
            expect(await obj.verifyGeoModal(data)).toBeTruthy();;
        });

        await test.step('step-3: Click "de" link from modal and then verify international cookie value', async () => {
            await obj.deLink.click();
            expect((await page.context().cookies()).find(cookie => cookie.name === data.cookieName).value).toEqual(data.cookieValue);

        });
    });

    // Test - 1
    test(`${features[1].name},${features[1].tags}`, async ({ page, baseURL }) => {
        console.info(`[Test Page]: ${baseURL}${features[1].path}`);
        const { data } = features[1];

        await test.step('step-1: Clear cookies and access "us" page with query param (akamailLocale=DE)', async () => {
            await page.context().clearCookies();
            await page.goto(`${baseURL}${features[1].path}`);
            await page.waitForLoadState('domcontentloaded');
            await expect(page).toHaveURL(`${baseURL}${features[1].path}`);
            await obj.geoModal.waitFor({ state: 'visible', timeout: 10000 });
        });

        await test.step('step-2: Verify georouting modal and its content', async () => {
            expect(await obj.verifyGeoModal(data)).toBeTruthy();
        });

        await test.step('step-3: Click "de" button and then verify international cookie value', async () => {
            await obj.deLink.click();
            expect((await page.context().cookies()).find(cookie => cookie.name === data.cookieName).value).toEqual(data.cookieValue);

        });
    });

    // Test - 2
    test(`${features[2].name},${features[2].tags}`, async ({ page, baseURL }) => {
        console.info(`[Test Page]: ${baseURL}${features[2].path}`);
        const { data } = features[2];

        await test.step('step-1: Clear cookies and access "us" page', async () => {
            await page.context().clearCookies();
            await page.goto(`${baseURL}${features[2].path}`);
            await page.waitForLoadState('domcontentloaded');
            await expect(page).toHaveURL(`${baseURL}${features[2].path}`);
        });

        await test.step('step-2: Click "Change region" link from footer and navigate to "de" page', async () => {
            await obj.changeRegionLink.click();
            await obj.changeRegionModal.waitFor({ state: 'visible', timeout: 10000 });
            await obj.deLink.click();
        });

        await test.step('step-3: Verify international cookie value', async () => {
            expect((await page.context().cookies()).find(cookie => cookie.name === data.cookieName).value).toEqual(data.cookieValue);

        });
    });

    // Test - 3
    test(`${features[3].name},${features[3].tags}`, async ({ page, baseURL }) => {
        console.info(`[Test Page]: ${baseURL}${features[3].path}`);
        const { data } = features[3];

        await test.step('step-1: Clear cookies and access "us" page', async () => {
            await page.context().clearCookies();
            await page.goto(`${baseURL}${features[3].path}`);
            await page.waitForLoadState('domcontentloaded');
            await expect(page).toHaveURL(`${baseURL}${features[3].path}`);
            await obj.geoModal.waitFor({ state: 'visible', timeout: 10000 });
        });

        await test.step('step-2: Verify multi tab georouting modal and its content', async () => {
            expect(await obj.verifyMultiTabGeoModal(data)).toBeTruthy();
        });
    });

    // Test - 4
    test(`${features[4].name},${features[4].tags}`, async ({ page, baseURL }) => {
        console.info(`[Test Page]: ${baseURL}${features[4].path}`);
        const { data } = features[4];

        await test.step('step-1: Clear cookies and access given "de" page', async () => {
            await page.context().clearCookies();
            await page.goto(`${baseURL}${features[4].path}`);
            await page.waitForLoadState('domcontentloaded');
            await expect(page).toHaveURL(`${baseURL}${features[4].path}`);
        });

        await test.step('step-2: Verify that georouting modal is not shown', async () => {
            await expect(await obj.geoModal).not.toBeVisible();
        });
    });

    // Test - 5
    test(`${features[5].name},${features[5].tags}`, async ({ page, baseURL }) => {
        console.info(`[Test Page]: ${baseURL}${features[5].path}`);
        const { data } = features[5];

        await test.step('step-1: Clear cookies and access given "de" page', async () => {
            await page.context().clearCookies();
            await page.goto(`${baseURL}${features[5].path}`);
            await page.waitForLoadState('domcontentloaded');
            await expect(page).toHaveURL(`${baseURL}${features[5].path}`);
            await obj.geoModal.waitFor({ state: 'visible', timeout: 10000 });
        });

        await test.step('step-2: Close the georouting modal and then check that international cookie is not added', async () => {
            await obj.geoModalClose.click();
            expect((await page.context().cookies()).find(cookie => cookie.name === data.cookieName)).toBeUndefined();
        });
    });
});
