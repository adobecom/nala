/** @module common/steps */
const { Given } = require('@cucumber/cucumber');
const { When } = require('@cucumber/cucumber');
const { Then } = require('@cucumber/cucumber');
import { openWebsite } from '../support/action/open_website';
import { saveScreenshot } from '../support/action/save_screenshot';
import { saveFullScreenshot } from '../support/action/save_full_screenshot';
import { AdobeSignInPage } from '../pages/adobe_signin_page';
import { GnavPage } from '../pages/gnav_page';
const fs = require('fs');
const path = require('path');
const axios = require('axios');
const urljoin = require('url-join');
const { requestGet } = require('../support/functions/request_sync');
const url = require('url');

Given(/^I open the (url|site) "([^"]*)?"$/, openWebsite);

Given(/^I load the base page$/, loadBasePage)

Given(/^I go to "([^"]*)"$/, iGoToPath);

Given(/^I go to the page from file "([^"]*)" key as "([^"]*)"$/, iGoToPageFromFile);

Given(/^I go to "(.*)" publisher$/, iGoToPublisher);

When(/^I select the block "([^\"]*)"$/, iSelectMiloBlock);

Then(/^I wait for (\d+) second(?:|s)$/, iWaitForSeconds);

Then(/^I click sign in$/, iClickSignIn);

Then(/^I click sign in with Adobe$/, iClickSignInWithAdobe);

Then(/^I should see my personal profile in global header$/, iShouldSeeMyPersonalProfileInGlobalHeader);

Then(/^I should see my personal profile in (DocumentCloud|CreativeCloud) header$/, iShouldSeeMyPersonalProfileInCloudHeader);

Then(/^I take a screenshot$/, iTakeAScreenshot);

Then(/^I take a screenshot and save as "([^"]*)"$/, iTakeAScreenshotAndSaveAsFilename);

Then(/^I take a full screenshot and save as "([^"]*)"$/, iTakeAFullScreenshotAndSaveAsFilename);

Then(/^I take a full screenshot with width (\d+)$/, iTakeAFullScreenshotWithWidthWidth);

Then(/^I take full screenshots and save as:$/, iTakeFullScreenshotsAndSaveAs);

Then(/^I scroll the page to the top$/, iScrollThePageToTheTop);

Then(/^I scroll the page to the bottom$/, iScrollThePageToTheBottom);

Then(/^I scroll the footer into view$/, iScrollTheFooterIntoView);

Then(/^I scroll down the page(| slowly)$/, iScrollDownThePagespeed);

Then(/^I scroll into view of the element "([^"]*)"$/, iScrollDownToElem);

Then(/^I scroll up the page$/, iScrollUpThePage);

Then(/I scroll the page for "([^\"]*)" pixels$/, iScrollThePageFor);

Then(/^I update screenshots results into recording file "([^\"]*)"$/, iUpdateScreenshotsResultsIntoRecordingFileFilename);

Then(/^I close US geo popup if have$/, iCloseUsGeoPopupIfHave);

Then(/^I verify all the links in the page$/, { timeout: 1200000 }, iVerifyAllLinks);

Then(/^I should see "([^\"]*)" in the current url$/, iShouldSeeUrlInCurrentUrl);

Then(/^I should see query parameter "([^\"]*)" with value "([^\"]*)" in current url$/, iShouldSeeQueryParamWithValueInCurrentUrl);

Then(/^I should not see "([^\"]*)" in current url$/, iShouldNotSeeUrlInCurrentUrl);

Then(/^I press "([^"]*)" key (\d+) time(?:|s)$/, iPressKey);

Then(/^I go back$/, iGoBack);

Then(/^I go back to last page$/, iGoBackToLastPage);

Then(/^I switch to the new window$/, iSwitchToTheNewWindow);

Then(/^I close current window$/, iCloseCurrentWindow);

Then(/^I click on NavItem "([^"]*)"$/, clickOnNavItem);

Then(/^I click on CTA "([^"]*)"$/, clickOnCta);

Then(/^I click on title "([^"]*)"$/, clickOnTitle);

Then(/^I should see page status code (\d+)$/, shouldSeePageStatusCode);

Then(/^I click Sign in with Google$/, clickSignInWithGoogle);

Then(/^I should(| not) see JavaScript "([^\"]*)"$/, iShouldneg);

Then(/^I should see prelinks in response headers$/, iSeePrelinksInHeaders);

Then(/^I should see cache control in response headers$/, iSeeCacheControlHeader);

Then(/^Verify the page is (|not )404$/, verifyPageStatus);

Then(/^I set the url to http and verify that it changes to https$/, urlHTTP);

Then(/^I save the page url to "([^\"]*)" key as "([^\"]*)"$/, savePageUrlToFile);

Then(/^I should see the canonical link "([^"]*)" on "([^"]*)"$/, iShouldSeeTheCanonicalLink);

Then(/^I mouse hover to the element "([^"]*)"$/, iMouseHoverToElement);

/**
 * Step Definition:
 * ```
 * /^I go to "([^"]*)"$/
 * ```
 * @param {string} path Path to go to
 */
function iGoToPath(path) {
    this.page = new GnavPage();
    this.page.open(path);
    console.log(browser.getUrl());
}

/**
 * Step Definition:
 * ```
 * /^I go to the page from file "([^"]*)" key as "([^"]*)"$/
 * ```
 * @param {string} file json file
 * @param {string} key key in json file
 */
function iGoToPageFromFile(file, key) {
    let filePath = path.join('dexter', 'testdata', file);
    let data = JSON.parse(fs.readFileSync(filePath));
    this.page = new GnavPage();
    this.page.open(data[key]);
    console.log(browser.getUrl());
}

/**
 * Step Definition:
 * ```
 * /^I wait for (\d+) second(?:|s)$/
 * ```
 * @param {string} seconds Seconds to wait
 */
function iWaitForSeconds(seconds) {
    browser.pause(parseInt(seconds) * 1000);
}

/**
 * Step Definition:
 * ```
 * /^I click sign in$/
 * ```
 */
function iClickSignIn() {
    this.context(GnavPage);
    this.page.signIn();
    this.page = new AdobeSignInPage();
}

/**
 * Step Definition:
 * ```
 * /^I click sign in with Adobe$/
 * ```
 */
function iClickSignInWithAdobe() {
    this.step('I scroll down the page slowly');
    this.step('I scroll up the page');
    this.page.pdfCTAAdobe.click();
    this.step('I sign in as a "Paid" user from login page');
}

/**
 * Step Definition:
 * ```
 * /^I should see my personal profile in global header$/
 * ```
 */
function iShouldSeeMyPersonalProfileInGlobalHeader() {
    this.page = new GnavPage();
    this.page.waitForDisplayed('profileIcon', { timeout: 60000 });
}

/**
 * Step Definition:
 * ```
 * /^I should see my personal profile in (DocumentCloud|CreativeCloud) header$/
 * ```
 * @param {string} cloud DocumentCloud or CreativeCloud
 */
function iShouldSeeMyPersonalProfileInCloudHeader(cloud) {
    // To do: create DocumentCloud/CreateCloud page header
    $('.Profile-thumbnail').waitForDisplayed({ timeout: 60000 });
}

/**
 * Step Definition:
 * ```
 * /^I take a screenshot$/
 * ```
 */
function iTakeAScreenshot() {
    saveScreenshot();
}

/**
 * Step Definition:
 * ```
 * /^I take a screenshot and save as "([^"]*)"$/
 * ```
 * @param {string} filename File name to save the screenshot
 */
function iTakeAScreenshotAndSaveAsFilename(filename) {
    if (this.page.screenshotResults === undefined) {
        this.page.screenshotResults = [];
        this.page.screenshotOrder = 1;
    }

    filename = filename
        .replace(/<<Env>>/, process.env.env)
        .replace(/<<Browser>>/, process.env.browser)
        .replace(/<<Locale>>/, process.env.locale)
        .replace(/\//, '_');
    saveScreenshot('screenshots', filename);

    let result = {};

    result.a = path.join('screenshots', filename + '.png');
    result.b = path.join('screenshots', filename + '.png');
    result.order = this.page.screenshotOrder++;
    result.location = browser.getUrl();

    this.page.screenshotResults.push(result);
}

/**
 * Step Definition:
 * ```
 * /^I take a full screenshot and save as "([^"]*)"$/
 * ```
 * @param {string} filename File name to save the screenshot
 */
function iTakeAFullScreenshotAndSaveAsFilename(filename) {
    if (this.page.screenshotResults === undefined) {
        this.page.screenshotResults = [];
        this.page.screenshotOrder = 1;
    }
    let layout = null;
    if (browser.config.profile.layout) {
        layout = browser.config.layouts[browser.config.profile.layout];
    }
    let width = -1;
    let size = layout.split('x').map(x => parseInt(x));
    width = size[0];
    filename = filename
        .replace(/<<Env>>/, process.env.env)
        .replace(/<<Layout>>/, process.env.layout)
        .replace(/<<Browser>>/, process.env.browser)
        .replace(/<<Locale>>/, process.env.locale)
        .replace(/\//, '_');
    saveFullScreenshot(Number(width), 'screenshots', filename);

    let result = {};

    result.a = path.join('screenshots', filename + '.png');
    result.b = path.join('screenshots', filename + '.png');
    result.order = this.page.screenshotOrder++;
    result.location = browser.getUrl();

    this.page.screenshotResults.push(result);
}

/**
 * Step Definition:
 * ```
 * /^I take a full screenshot with width (\d+)$/
 * ```
 * @param {string} width Browser width
 */
function iTakeAFullScreenshotWithWidthWidth(width) {
    saveFullScreenshot(Number(width));
}

/**
 * Step Definition:
 * ```
 * /^I take full screenshots and save as:$/
 * ```
 * @param {string[][]} table Table of `Width` and `File Name`
 */
function iTakeFullScreenshotsAndSaveAs(table) {
    let items = table.hashes();
    for (let item of items) {
        let filename = item['File Name'];
        filename = filename.replace(/<<Browser>>/, process.env.browser);
        saveFullScreenshot(Number(item['Width']), 'screenshots', filename);
    }
}

/**
 * Step Definition:
 * ```
 * /^I scroll the page to the top$/
 * ```
 */
function iScrollThePageToTheTop() {
    if (process.env.browser != 'iphone' && process.env.browser != 'ipad') {
        //browser.pause(3000);
        browser.execute('window.scrollTo(0, 0);'); //browser.pause(3000);
    }
}

/**
 * Step Definition:
 * ```
 * /^I scroll the footer into view$/
 * ```
 */
function iScrollTheFooterIntoView() {
    const el = $('.globalNavFooter');
    el.scrollIntoView();
    browser.pause(5000);
    el.scrollIntoView();
}

/**
 * Step Definition:
 * ```
 * /^I scroll the page to the bottom$/
 * ```
 */
function iScrollThePageToTheBottom() {
    if (process.env.browser != 'iphone' && process.env.browser != 'ipad') {
        browser.pause(3000);
        browser.execute('window.scrollTo(0,document.body.scrollHeight);'); //browser.pause(3000);
    }
}

/**
 * Step Definition:
 * ```
 * /^I scroll down the page(| slowly)$/
 * ```
 * @param {string} speed "" - Jump to the end or " slowly" - Scroll page by page
 */
function iScrollDownThePagespeed(speed) {
    if (speed === '') {
        browser.execute('window.scrollTo(0, document.body.scrollHeight)');
    } else if (speed === ' slowly') {
        let height = browser.execute('return document.body.scrollHeight');

        const viewh = browser.execute(
            'return Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0)'
        );

        for (let i = 0; i < height; i += viewh) {
            browser.execute(
                "window.scroll({top: arguments[0], left: 0, behavior: 'smooth'})",
                i
            );
            browser.pause(1000);
            height = browser.execute('return document.body.scrollHeight');
        }
        browser.execute('window.scrollTo(0, document.body.scrollHeight)');
    }
}

function iScrollDownToElem(element) {
    const elem = $(element);
    browser.pause(2000);
    elem.scrollIntoView();

}

/**
 * Step Definition:
 * ```
 * /^I scroll up the page$/
 * ```
 */
function iScrollUpThePage() {
    browser.execute('window.scrollTo(0, 0)');
}

/**
 * Step Definition:
 * ```
 * /^I update screenshots results into recording file "([^\"]*)"$/
 * ```
 * @param {string} filename File name to save screenshot
 */
function iUpdateScreenshotsResultsIntoRecordingFileFilename(filename) {
    fs.writeFileSync(
        filename,
        JSON.stringify(this.page.screenshotResults, null, 2)
    );
}

/**
 * Step Definition:
 * ```
 * /^I close US geo popup if have$/
 * ```
 */
function iCloseUsGeoPopupIfHave() {
    this.context(GnavPage);
    if (this.page.dexterGeoOverlay.isDisplayed()) {
        this.page.lastOverlayLink.click();
    }
}

/**
 * Step Definition:
 * ```
 * /^I verify all the links in the page$/
 * ```
 */
function iVerifyAllLinks() {
    const links = $$('a');
    const hrefs = links.map(link => link.getAttribute('href'));
    const httpUrls = [
        ...new Set(
            hrefs
            .filter(href => !!href)
            .map(href => href.split('#')[0])
            .filter(href => /^http/.test(href))
            .filter(href => href.indexOf(browser.getUrl()) === -1)
            .sort()
        )
    ];
    const nonHttpUrls = hrefs.filter(href => !/^http/.test(href));
    const config = {
        headers: {
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/44.0.2403.89 Safari/537.36',
            Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/',
            'Cache-Control': 'no-cache'
        },
        timeout: 60000
    };
    nonHttpUrls.forEach(url => console.log(`Non HTTP url: ${url}`));
    let fail = false;
    const responses = browser.call(
        () =>
        new Promise((resolve, reject) =>
            Promise.all(
                httpUrls.map(url =>
                    axios.get(url, config).catch(e => {
                        if (!url.includes("aws.amazon.com")) {
                            const status = e.response ? .status;
                            if (status === 999) return { status, config: { url } };
                            fail = true;
                            console.log('Broken URL:', e.response ? .status, url);
                            return;
                        }
                    })
                )
            ).then(resolve)
        )
    );
    const successList = responses.filter(
        res => res && (res.status < 400 || res.status === 999)
    );
    console.log(`Verified ${successList.length} links`);
    successList.forEach(res => console.log(`Link verified: ${res.config.url}`));
    expect(fail).toStrictEqual(false);
}

/**
 * Step Definition:
 * ```
 * /^I scroll the page for "([^\"]*)" pixels$/
 * ```
 * @param {number} y
 */
function iScrollThePageFor(y) {
    const scrollY = parseInt(y);
    browser.execute(`window.scrollTo(0, ${scrollY})`);
}

/**
 * Step Definition:
 * ```
 * /^I should see "([^\"]*)" in current url$/
 * ```
 * @param {string} url Page URL
 */
function iShouldSeeUrlInCurrentUrl(url) {
    expect(browser).toHaveUrlContaining(url, {
        wait: 10000,
        interval: 1000
    });
}

/**
 * Step Definition:
 * ```
 * /^I should not see "([^\"]*)" in current url$/
 * ```
 * @param {string} url Page URL
 */
function iShouldNotSeeUrlInCurrentUrl(url) {
    expect(browser).not.toHaveUrl(url, {
        containing: true,
        wait: 10000,
        interval: 1000
    });
}

/**
 * Step Definition:
 * ```
 * /^I should see query parameter "([^\"]*)" with value "([^\"]*)" in current url$/
 * ```
 * @param {string} key Query param key
 * @param {string} value Query param value
 */
function iShouldSeeQueryParamWithValueInCurrentUrl(key, value) {
    if (value === '<<Locale>>' && process.env.profile.includes('preview')) {
        value = browser.config.currentLocale.locale.split('/')[1];
    }
    if (value === '<<Locale>>' && !process.env.profile.includes('preview')) {
        value = browser.config.currentLocale.author.split('/')[1];
    }
    const queryParam = key.concat('=').concat(value);
    expect(browser).toHaveUrl(queryParam, {
        containing: true,
        wait: 10000,
        interval: 1000
    });
}

/**
 * Step Definition:
 * ```
 * /^I press "([^"]*)" key (\d+) time(?:|s)$/
 * ```
 * @param {string} key Keyboard character
 * @param {string} count Number of times to press the key
 */
function iPressKey(key, count) {
    count = parseInt(count);
    for (let i = 0; i < count; i++) {
        browser.keys(key);
        browser.pause(1000);
    }
}

/**
 * Step Definition:
 * ```
 * /^I go back$/
 * ```
 */
function iGoBack() {
    browser.back();
}

/**
 * Step Definition:
 * ```
 * /^I go back to last page$/
 * ```
 */
function iGoBackToLastPage() {
    this.step('I go back');
}

/**
 * Step Definition:
 * ```
 * /^I switch to the new window$/
 * ```
 */
function iSwitchToTheNewWindow() {
    let handles;
    browser.waitUntil(() => {
        handles = browser.getWindowHandles();
        return handles.length > 1;
    })
    browser.switchToWindow(handles[handles.length - 1]);
}

/**
 * Step Definition:
 * ```
 * /^I close current window$/
 * ```
 */
function iCloseCurrentWindow() {
    browser.closeWindow();
    browser.pause(1000);
    let handles = browser.getWindowHandles();
    browser.switchToWindow(handles[handles.length - 1]);
}

/**
 * Step Definition:
 * ```
 * /^I go to "(.*)" publisher$/
 * ```
 * @param {string} path URI
 */
function iGoToPublisher(path) {
    console.log('path:' + path);
    let config = {};
    if (!path.startsWith('http')) {
        let pubInstances = Object.keys(browser.config.profile).filter(x =>
            x.startsWith('publishBaseUrl')
        );
        let pubDomain = process.env.pubDomain;
        console.log('Publisher env Passed:' + pubDomain);
        for (let i = 0; i < pubInstances.length; i++) {
            if (pubInstances[i] == pubDomain) {
                config.baseURL = browser.config.profile[pubInstances[i]];
                console.log('Pub instance found :' + pubInstances[i]);
                let fullurl = urljoin(config.baseURL, path);
                console.log('Final url:' + fullurl);
                browser.url(fullurl);
                this.page = new GnavPage();
                break;
            } else {
                console.log('Publish Enviornment not passed');
            }
        }
    }
}

/**
 * Step Definition:
 * ```
 * /^I click on NavItem "([^"]*)"$/
 * ```
 * @param {string} navItem Title of navigation item
 */
function clickOnNavItem(navItem) {
    let elem = browser.$(
        `//*[contains(@class,"navList")]//*[@class="spectrum-Tabs-itemLabel" and text()="${navItem}"]`
    );
    elem.click();
}

/**
 * Step Definition:
 * ```
 * /^I click on CTA "([^"]*)"$/
 * ```
 * @param {string} label Label of Button/CTA
 */
function clickOnCta(label) {
    let elem = browser.$(
        `//*[contains(@class,"con-button")]//*[@class="spectrum-Button-label" and text()="${label}"] | ` +
        `//*[contains(@class,"con-button")]//*[text()[contains(.,"${label}")]] | `
    );
    elem.click();
}

/**
 * Step Definition:
 * ```
 * /^I click on title "([^"]*)"$/
 * ```
 * @param {string} title title text to be clicked
 */
function clickOnTitle(title) {
    let elem = browser.$(
        `//*[contains(@class,"title")]//*[text()[contains(.,"${title}")]]`
    );
    // Click its cooridnates. Sometime it's designed to be intercepted.
    elem.click({ x: 0, y: 0 });
}

/**
 * Step Definition:
 * ```
 * /^I should see page status code (\d+)$/
 * ```
 * @param {*} code HTTP request page staus code
 */
function shouldSeePageStatusCode(code) {
    let url = browser.getUrl();
    let options = { validateStatus: false };
    if (browser.config.profile.aem === 'preview') {
        let username = 'author';
        options.auth = {
            username: browser.config.authorAccounts[username].username,
            password: browser.config.authorAccounts[username].password
        };
    }
    let res = requestGet(url, options);
    expect(res.status).toEqual(code);
}

function clickSignInWithGoogle() {
    this.page.pdfCTAGoogle.click();
    this.step('I sign in as a "Frictionless" user from Google login page');
}

/**
 * Step Definition:
 * ```
 * /^I should(| not) see JavaScript "([^\"]*)"$/
 * ```
 * @param {string} neg Toggle to check if script exists or not
 * @param {string} script Script element to check
 */
function iShouldneg(neg, script) {
    let links = this.page.getScriptFiles();
    let basenames = [];
    for (let link of links) {
        basenames.push(path.basename(url.parse(link).path));
    }
    if (neg) {
        expect(basenames).not.toContain(script);
    } else {
        expect(basenames).toContain(script);
    }
}

/**
 * Step Definition:
 * ```
 * /^I should see prelinks in response headers$/
 * ```
 * @param {string[][]} table Prelinks data table
 */
function iSeePrelinksInHeaders(table) {
    let response = requestGet(browser.getUrl());
    for (let data of table.rawTable) {
        console.log('Passed Prelink:' + data[0]);
        console.log('Prelinks fetched: ' + response.headers.link);
        expect(response.headers.link).toContain(data[0]);
    }
}

/**
 * Step Definition:
 * ```
 * /^I should see cache control in response headers$/
 * ```
 * @param {string[][]} table Cache control header data table
 */
function iSeeCacheControlHeader(table) {
    let response = requestGet(browser.getUrl());
    for (let data of table.rawTable) {
        console.log('Passed header: ' + data[0]);
        let headerPassed = data[0].replace(/([^a-zA-z0-9",:!-]+)/g, s0 => '');
        console.log('Passed header parsed: ' + headerPassed);
        console.log('Header fetched: ' + JSON.stringify(response.headers));
        expect(JSON.stringify(response.headers)).toContain(headerPassed);
    }
}

/**
 * Step Definition:
 * ```
 * /^Verify the page is (|not) 404$/
 *  * @param {string} neg Negation of expectation
 * ```
 */
function verifyPageStatus(neg) {
    if (neg) {
        expect(browser).not.toHaveTitle('404', { containing: true });
    } else {
        expect(browser).toHaveTitle('404', { containing: true });
    }
}

/**
 * Step Definition:
 * ```
 * /^I set the url to http and verify that it changes to https$/
 * ```
 */
function urlHTTP() {
    let currentUrl = browser.getUrl();
    let updatedURL = currentUrl.replace(`https:`, `http:`);
    browser.url(updatedURL);
    expect(browser.getUrl()).toContain(`https:`);
}

/**
 * Step Definition:
 * ```
 * /^I save the page url to "([^\"]*)" key as "([^\"]*)"$/
 * ```
 */
function savePageUrlToFile(file, key) {
    let filePath = path.join('dexter', 'testdata', file);
    let data = JSON.parse(fs.readFileSync(filePath));

    let urls = browser.getUrl().split('/');
    data[key] = urls[urls.length - 2] + '/' + urls[urls.length - 1];

    try {
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    } catch (error) {
        console.log('fail to write url into file');
    }
}

/**
 * Step Definition:
 * ```
 * /^I should see the canonical link "([^"]*)" present on "([^"]*)"$/
 * ```
 * @param {str} canonicalLink The canonical rel link
 * @param {str} pageUrl The page checked against
 */
function iShouldSeeTheCanonicalLink(canonicalLink, pageUrl) {
    let expectedCanonicalLink;
    if (canonicalLink === 'default') {
        expectedCanonicalLink =
            browser.config.profile.baseUrl + pageUrl.split('?')[0];
    } else {
        expectedCanonicalLink = browser.config.profile.baseUrl + canonicalLink;
    }
    let pageCanonicalLink = browser
        .$('//link[@rel="canonical"]')
        .getAttribute('href');
    expect(pageCanonicalLink).toBe(expectedCanonicalLink);
}

/**
 * Step Definition:
 * ```
 * /^I mouse hover to the element "([^"]*)"$/
 * ```
 * @param {String} element mousehover to element
 *
 */
function iMouseHoverToElement(element) {
    $(element).moveTo();
}

/**
 * Step Definition
 * ```
 * /^I select the block "([^\"]*)"$/
 * ```
 * @param {String} className element class name to select
 *
 */
function iSelectMiloBlock(className) {
    let miloBlock = $('[class="' + className + '"]');
    expect(miloBlock.isDisplayed()).toBe(true);
}

export function getElementCount(element) {

}

function loadBasePage() {
    const URL = browser.options.baseUrl;
    browser.url(URL);
}