/**
 * @description Finds the main tag and returns all the tags' text and href.
 * @param {page} page browser object
 * @returns an object with the link texts as the key and the href(s) as the value
 */
export async function findLinks(page) {
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForLoadState('networkidle');
  const results = {};

  const aTags = await page.evaluate(() => Array.from(document.querySelector('main')
    .getElementsByTagName('a'))
    .map((item) => [item.text, item.href]));

  if (aTags.length === 0) return results;

  aTags.forEach((item) => {
    const [text, href] = item;
    results[text] = href;
  });

  return results;
}

/**
 * @description Checks that each key and value from A is in B.
 * @param {object} a The source object.
 * @param {object} b checking the key and value from A are found in B.
 * @returns object The difference result object.
 */
export async function checkForDiff(a, b) {
  if (Object.keys(b).length === 0) return {};

  return Object.entries(a).reduce((rdx, [key, value]) => {
    const aValue = value ? value.toString() : value;
    const bValue = b[key] ? b[key].toString() : b[key];
    if (aValue !== bValue) {
      rdx[key] = [aValue, bValue];
    }

    return rdx;
  }, {});
}
