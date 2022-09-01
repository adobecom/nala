/**
 * Sets the body opacity of the given element/s to 0.
 *
 * @param {string} selectors selector of the element/s to hide.
 */
export function hideElements(selectors) {
  selectors.forEach(selector => {
    browser.execute(
      `document.querySelectorAll("${selector}").forEach(el => el.style.opacity = 0);`
      );
    })
  }
  
  /**
   * Restores the opacity of the element/s  back to 1 or given opacity value.
   *
   * @param {string} selectors selectors of the element/s to show.
   * @param {number} opacity a decimal value between 0 and 1
   */
  export function showElements(selectors, opacity = 1) {
    selectors.forEach(selector => {
      browser.execute(
        `document.querySelectorAll("${selector}").forEach(el => el.style.opacity = ${opacity});`
      );
    });
}

