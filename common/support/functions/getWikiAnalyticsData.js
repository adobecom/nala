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
 * Get analytics data from wiki page
 * @param  {string} wikiID wiki page ID
 * @param  {object} replacementObj words to be replaced
 * Example of replacementObj: {"verb-id": "verb-word-to-pdf", "domainName": "acrobat.adobe.com"}
 */
const getWikiAnalyticsData = (wikiID, replacementObj) => {
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
  const aTags = xpath(doc, '//td');
  let result = {};
  let hNodes = [];
  let eventKey = null;
  let aTag = null;
  let hTag = null;
  let i = 0;

  while ((hTag = hTags.iterateNext())) {
    hNodes.push(
      hTag.innerHTML.replace(/(<([^>]+)>)/gi, '').replace(/&nbsp;/g, '')
    );
  }
  if (hNodes.length > 4) {
    hNodes = hNodes.slice(0, 4);
  }

  //console.log(hNodes);

  while ((aTag = aTags.iterateNext())) {
    if (aTag.innerHTML.includes('New')) {
      throw 'New trigger event is added in wiki page table, please check';
    }

    if (hNodes[i % hNodes.length].includes('How to Trigger Event')) {
      eventKey = aTag.innerHTML.replace(/(<([^>]+)>)/gi, '');
    }
    if (hNodes[i % hNodes.length].includes('Expected Event')) {
      let eventData = [];
      let tempDataSet = aTag.innerHTML
        .replace(/(<([^>]+)>)/gi, '')
        .replace(/&nbsp;/g, '')
        // .split('|');
        .split(' |'); // to handle data input like "Sign in|gnav|acom" for Sign in trigger
      let tempDataSet2 = [];

      for (let dt of tempDataSet) {
        if (dt.includes('c.') && dt.indexOf('c.') != 0) {
          let dt1 = dt.slice(0, dt.indexOf('c.')).trim();
          let dt2 = dt.slice(dt.indexOf('c.'), dt.length).trim();
          tempDataSet2.push(dt1);
          tempDataSet2.push(dt2);
        } else {
          tempDataSet2.push(dt.trim());
        }
      }

      let j = 0;
      while (j + 1 < tempDataSet2.length) {
        let tempDataMap = {};
        tempDataMap['key'] = tempDataSet2[j];
        let value = tempDataSet2[j + 1];
        for (let placeholder in replacementObj) {
          value = value.replace(
            `&lt;${placeholder}&gt;`,
            replacementObj[placeholder]
          );
        }
        tempDataMap['value'] = value;
        j += 2;

        eventData.push(tempDataMap);
      }

      result[eventKey] = eventData;
    }

    i++;
  }

  return result;
};

export default getWikiAnalyticsData;
