/**
  * Take a screenshot of a page
  * @param {Page} page - The page object
  * @param {string} folderPath - The folder path to save the screenshot, e.g., screenshots/milo
  * @param {string} fileName - The file name of the screenshot
  * @param {object} options - The screenshot options, see https://playwright.dev/docs/api/class-page#page-screenshot
  * @returns {object} The screenshot result
*/
async function take(page, folderPath, fileName, options = {}) {
  const urls = [];
  const result = {};
  const name = `${folderPath}/${fileName}.png`;
  urls.push(page.url());
  options.path = name;
  if (options.selector) {
    await page.locator(options.selector).screenshot(options);
  } else {
    await page.screenshot(options);
  }
  result.a = name;
  result.urls = urls.join(' | ');
  return result;
}

/**
 * Take a screenshot of a page
 * @param {Page} page - The page object
 * @param {string} url - The URL of the page to take a screenshot
 * @param {function} callback - The callback function to run before taking the screenshot
 * @param {string} folderPath - The folder path to save the screenshot, e.g., screenshots/milo
 * @param {string} fileName - The file name of the screenshot
 * @param {object} options - The screenshot options, see https://playwright.dev/docs/api/class-page#page-screenshot
 * @returns {object} The screenshot result
 */
async function takeOne(page, url, callback, folderPath, fileName, options = {}) {
  const urls = [];
  const result = {};

  console.info(`[Test Page]: ${url}`);
  await page.goto(url);
  urls.push(url);
  if (typeof callback === 'function') { await callback(); }
  const name = `${folderPath}/${fileName}.png`;
  options.path = name;
  if (options.selector) {
    await page.locator(options.selector).screenshot(options);
  } else {
    await page.screenshot(options);
  }

  result.order = 1;
  result.a = name;
  result.urls = urls.join(' | ');
  return result;
}

/**
 * Take screenshots of two pages
 * @param {Page} page - The page object
 * @param {string} urlStable - The URL of the stable page
 * @param {function} callbackStable - The callback function to run before taking the screenshot of the stable page
 * @param {string} urlBeta - The URL of the beta page
 * @param {function} callbackBeta - The callback function to run before taking the screenshot of the beta page
 * @param {string} folderPath - The folder path to save the screenshots, e.g., screenshots/milo
 * @param {string} fileName - The file name of the screenshots
 * @returns {object} The screenshot results
 */
async function takeTwo(page, urlStable, callbackStable, urlBeta, callbackBeta, folderPath, fileName) {
  const urls = [];
  const result = {};

  console.info(`[Test Page]: ${urlStable}`);
  await page.goto(urlStable);
  urls.push(urlStable);
  if (typeof callbackStable === 'function') { await callbackStable(); }
  const nameStable = `${folderPath}/${fileName}-a.png`;
  await page.screenshot({ path: nameStable, fullPage: true });
  result.order = 1;
  result.a = nameStable;

  console.info(`[Test Page]: ${urlBeta}`);
  await page.goto(urlBeta);
  urls.push(urlBeta);
  if (typeof callbackBeta === 'function') { await callbackBeta(); }
  const nameBeta = `${folderPath}/${fileName}-b.png`;
  await page.screenshot({ path: nameBeta, fullPage: true });

  result.b = nameBeta;
  result.urls = urls.join(' | ');
  return result;
}

module.exports = {
  takeOne,
  takeTwo,
  take,
};
