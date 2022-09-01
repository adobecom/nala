/**
 * Resize the browser window to show full page
 * On macOS, from Chrome 86, Chrome and Chromium Edge has maximum height 8192
 *
 * @param {number} width width of browser
 */
export function resizeFullPage(width) {
  if (width < 0) {
    let size = browser.getWindowSize();
    width = size.width;
  }
  let height = 0;
  let newHeight = 100;
  let count = 0;

  // May take a few iterations to get to full page size
  while (height != newHeight && count < 20) {
    height = newHeight;
    if (browser.capabilities.browserName.match(/chrome|internet explorer/)) {
      browser.setWindowSize(width, height);
    } else if (browser.capabilities.browserName === 'Safari') {
      browser.setWindowSize(width, height + 20);
    } else if (browser.capabilities.browserName === 'firefox') {
      let adjustedHeight = height + 74;
      // Geckodriver can't handle a tall page
      if (adjustedHeight > 65464) {
        adjustedHeight = 65464;
      }
      browser.setWindowSize(width, adjustedHeight);
    } else if (browser.capabilities.browserName === 'msedge') {
      browser.setWindowSize(width, height);
    }
    browser.pause(1000);

    newHeight = browser.execute('return document.documentElement.scrollHeight');

    if (newHeight < 100) {
      // if there is a pop up, scrollHeight may be wrong
      console.log(
        'There may be a popup. Unable to set the browser height to the scroll height.'
      );
      console.log('Set the height to 800.');
      browser.setWindowSize(width, 800);
      break;
    } else if (count > 0 && newHeight - height > 2000) {
      console.log('Document height may be reset by client scripts');      
      break
    }

    count += 1;
  }
}
