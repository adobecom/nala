const { JSDOM } = require('jsdom');
const wgxpath = require('wgxpath');
const { requestGet } = require('./request_sync');

function xpath(root, query) {
  return root.evaluate(
    query,
    root,
    null,
    wgxpath.XPathResultType.ANY_TYPE,
    null
  );
}

/**
 * Get data from sitemap
 * @param  {string} path sitemap path
 */
const getSitemapData = (path) => {
  let res = requestGet(
    browser.config.profile.baseUrl + path
  )

  const dom = new JSDOM();
  const domParser = new dom.window.DOMParser();
  const doc = domParser.parseFromString(res.data, 'text/html');

  const locTags = xpath(doc, '//loc');
  let result = [];
  let locTag = null;

  while ((locTag = locTags.iterateNext())) {
    let pageUrl = locTag.innerHTML.trim();
    result.push(pageUrl)
  }

  return result;
};

export default getSitemapData;
