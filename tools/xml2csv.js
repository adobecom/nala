const fs = require('fs');
const yargs = require('yargs');
const xml2js = require('xml2js');
const axios = require('axios');
const url = require('url');

async function main() {
  let argv = yargs
    .options('file', {
      alias: 'f',
      required: true,
      describe: 'xml file to be converted to csv'
    })
    .parserConfiguration({ 'strip-aliased': true }).argv;
  let file = argv.file;
  links = [];
  let data = await readSitemapXml(file);
  let urls = data.urlset.url;
  for (let i = 0; i < urls.length; i++) {
    let url = urls[i].loc[0];
    links.push({
      url,
      sitemapUrl: file
    });
  }
  console.log(links);

  const csvString = [
    ['url', 'sitemapUrl'],
    ...links.map(item => [item.url, item.sitemapUrl])
  ]
    .map(e => e.join(','))
    .join('\n');
  fs.writeFile('url.csv', csvString, 'utf8', function (err) {
    if (err) {
      console.log(
        'Some error occured - file either not saved or corrupted file saved.'
      );
    } else {
      console.log("It's saved!");
    }
  });
}

/**
 * Read a XML and retrieve URLs
 * @param {string} url URL of the sitemap XML
 * @returns {string[]} Array of URLs in the sitemap XML
 */
async function readSitemapXml(url) {
  let data = null;
  let retry = 3;

  while (retry-- > 0 && !data) {
    try {
      data = await axios.get(url).then(response => {
        return response.data;
      });
    } catch (err) {
      console.log(err);
    }
  }

  if (data === '') {
    console.log(`Empty sitemap ${url}`);
    return { urlset: { url: [] } };
  }

  return await xml2js.parseStringPromise(data).catch(err => {
    console.log(`Error reading ${url}`);
    return { urlset: { url: [] } };
  });
}

main();
