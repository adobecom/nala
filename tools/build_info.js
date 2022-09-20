const axios = require('axios').default;
const { JSDOM } = require('jsdom');
const wgxpath = require('wgxpath');
const urljoin = require('url-join');

/**
 * Get build info from a buildinfo link
 * The service /services/buildinfo is only accessible at an instance directly.
 * So the field buildInfoUrl should be provided in an environment's profile. 
 * @param {string} buildInfoUrl Link to build info URL
 * @returns {Array} Array of objects {{product: string, version: string}}
 */
async function getBuildInfo(buildInfoUrl) {
  let res = await axios.get(buildInfoUrl, {timeout: 2000});

  const dom = new JSDOM();
  const domParser = new dom.window.DOMParser();
  const doc = domParser.parseFromString(res.data, 'text/html');

  const xpProduct = '//h2';
  let xpVersion =
    '//h2[text()="${product}"]/following-sibling::dl[1]/dt[text()="project.version"]/following-sibling::dd[1]';
  let xpBuild =
    '//h2[text()="${product}"]/following-sibling::dl[1]/dt[text()="circle.build_number"]/following-sibling::dd[1]';

  let node = null;  
  let products = [];
  let itr = doc.evaluate(
    xpProduct,
    doc,
    null,
    wgxpath.XPathResultType.ANY_TYPE,
    null
  );

  while ((node = itr.iterateNext())) {
    let item = {};
    item.product = node.textContent;

    let xp = xpVersion.replace('${product}', item.product);
    let innerNode = null; 
    let innerItr = doc.evaluate(
      xp,
      doc,
      null,
      wgxpath.XPathResultType.ANY_TYPE,
      null
    );
    while ((innerNode = innerItr.iterateNext())) {
      item.version = innerNode.textContent;
    }

    xp = xpBuild.replace('${product}', item.product);
    innerItr = doc.evaluate(
      xp,
      doc,
      null,
      wgxpath.XPathResultType.ANY_TYPE,
      null
    );
    while ((innerNode = innerItr.iterateNext())) {
      item.build = innerNode.textContent;
    }    
    products.push(item);
  }

  return products;
}

exports.getBuildInfo = getBuildInfo;
