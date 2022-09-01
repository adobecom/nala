import getScreenshotName from '../functions/get_screenshot_name';
import { resizeFullPage } from './resize_full_page';
/**
 * Save the current full page screenshot
 * @param  {number} width width of browser
 * @param  {string} folder filename to be saved
 * @param  {string} filename filename to be saved
 */
export function saveFullScreenshot(width, folder, filename) {
  resizeFullPage(width);
  browser.saveScreenshot(getScreenshotName(folder, filename, browser));
};
