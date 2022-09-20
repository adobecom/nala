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
 * Get data from wiki page
 * @param  {string} wikiID wiki page ID
 * @param  {string} replacements words to be replaced
 * Example of replacements string: "verb-id:verb-word-to-pdf,domainName:acrobat.adobe.com"
 */
const getWikiData = (wikiID, replacements) => {
  if (process.env.JIRACREDENTIALS === undefined) {
    throw 'No JIRACREDENTIALS in your env variables, please add it';
  }

  let creds = process.env.JIRACREDENTIALS.split(':');
  let config = {};
  config.auth = {
    username: creds[0],
    password: creds[1]
  };

  let res = requestGet(
    `https://wiki.corp.adobe.com/rest/api/content/${wikiID}?expand=body.view`,
    config
  );

  let wikiUrl = `https://wiki.corp.adobe.com${res.data._links.webui}`;
  console.log(wikiUrl);
  //console.log(res.data.body.view.value);

  const dom = new JSDOM();
  const domParser = new dom.window.DOMParser();
  const doc = domParser.parseFromString(res.data.body.view.value, 'text/html');

  const hTags = xpath(doc, '//th');
  const aTags = xpath(doc, '//td/a');
  let result = {};
  let eventKey = null;
  let aTag = null;
  let hTag = null;
  let index = 0;
  let tableHeader = [];

  while ((hTag = hTags.iterateNext())) {
    tableHeader.push(
      hTag.innerHTML.replace(/(<([^>]+)>)/gi, '').replace(/&nbsp;/g, '')
    );
  }

  //console.log(tableHeader);

  let tableObject = [];
  while ((aTag = aTags.iterateNext())) {
    let tempData = aTag.textContent;
    let replacementsArray = replacements.split(',');

    for (let i = 0; i < replacementsArray.length; i++) {
      let oldString = replacementsArray[i].split(':')[0];
      let newString = replacementsArray[i].split(':')[1];

      tempData = tempData.replace(oldString, newString);
    }
    tableObject.push(tempData);
  }

  return tableObject;
};

export default getWikiData;
