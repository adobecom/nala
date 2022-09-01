import getScreenshotName from '../functions/get_screenshot_name';
/**
 * Save the current screenshot
 * @param {string} folder filename to be saved
 * @param {string} filename filename to be saved
 */
export function saveScreenshot(folder, filename) {
  browser.saveScreenshot(getScreenshotName(folder, filename, browser));
};
