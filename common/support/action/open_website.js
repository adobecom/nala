/**
 * Open the given URL
 * @param {string} type Type of navigation (getUrl or site)
 * @param {string} page The URL to navigate to
 */
export function openWebsite(type, page) {
  const url = type === 'url' ? page : browser.options.baseUrl + page;
  browser.url(url);
};
