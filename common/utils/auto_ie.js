/*
 * The script works with WinAppDriver.
 * Download at https://github.com/microsoft/WinAppDriver/releases
 * Start up with command "WinAppDriver.exe 127.0.0.1 4723/wd/hub"
 *
 * There is a compatible issue with WDIO's webdriver and WinAppDriver
 * https://github.com/microsoft/WinAppDriver/issues/740
 * To work around the issue, some of actions here are using a HTTP request
 * direct to WinAppDriver.
 */
const WebDriver = new require('webdriver').default;
const request = require('request');
const yargs = require('yargs');
const fs = require('fs');
const he = require('he');

/**
 * Convert callback post to promise
 * @param {string} url URL to the post
 * @param {object} data Data to be posted
 */
function post(url, data) {
  return new Promise((resolve, reject) => {
    request.post(url, { json: data }, (error, response, body) => {
      if (error) reject(error);
      if (response.statusCode != 200) {
        reject('Invalid status code <' + response.statusCode + '>');
      }
      resolve(body);
    });
  });
}

/**
 * Convert callback sleep to promise
 * @param {number} ms Milliseconds
 */
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

let caps = {
  platformName: 'WINDOWS',
  platform: 'WINDOWS',
  deviceName: 'WindowsPC',
  app: 'Root'
};

let opt = {
  path: '/wd/hub',
  hostname: '127.0.0.1',
  port: 4723,
  protocol: 'http',
  capabilities: caps
};

/**
 * Use Windows UI Automation to open IE browser console
 */
async function openConsole() {
  const rootDriver = await WebDriver.newSession(opt);
  const ieWin = await rootDriver.findElement('class name', 'IEFrame');
  const ieHandle = await rootDriver.getElementAttribute(
    ieWin.ELEMENT,
    'NativeWindowHandle'
  );

  delete caps.app;
  caps.appTopLevelWindow = Number(ieHandle).toString(16);

  const ieDriver = await WebDriver.newSession(opt);

  let urlBase = `${opt.protocol}://${opt.hostname}:${opt.port}${opt.path}/session/${ieDriver.sessionId}/`;
  await sleep(3000);
  let url = urlBase + 'keys';
  await post(url, { value: ['\uE03C'] });
  await sleep(3000);
  let conTab = await ieDriver.findElement('name', 'Console (Ctrl+2)');
  url = urlBase + `element/${conTab.ELEMENT}/click`;
  await post(url);
  await sleep(3000);
  let con = await ieDriver.findElement('name', 'Console');
}

/**
 * Process raw data from UI Automation to item objects
 * @param {object[]} rows Raw data from UI Automation
 */
function getItems(rows) {
  items = [];
  for (let row of rows) {
    if (row.message == null && items.length > 0) {
      items[items.length - 1].link = row.link;
    } else {
      items.push({ message: row.message ? he.decode(row.message) : ''});
    }
  }
  return items;
}

/**
 * Get IE browser errors and save to `filename`
 * @param {string} filename Output filename
 */
async function getErrors(filename) {
  const rootDriver = await WebDriver.newSession(opt);
  const ieWin = await rootDriver.findElement('class name', 'IEFrame');
  const ieHandle = await rootDriver.getElementAttribute(
    ieWin.ELEMENT,
    'NativeWindowHandle'
  );

  delete caps.app;
  caps.appTopLevelWindow = Number(ieHandle).toString(16);

  const ieDriver = await WebDriver.newSession(opt);

  let urlBase = `${opt.protocol}://${opt.hostname}:${opt.port}${opt.path}/session/${ieDriver.sessionId}/`;

  let con = await ieDriver.findElement('name', 'Console');
  let tree = await ieDriver.findElementFromElement(
    con.ELEMENT,
    'tag name',
    'Tree'
  );

  let url = urlBase + `element/${tree.ELEMENT}/value`;
  await post(url, { value: ['\uE011'] });
  await sleep(1000);

  let rows = [];
  let adding = true;
  while (adding) {
    let treeItems = await ieDriver.findElementsFromElement(
      tree.ELEMENT,
      'tag name',
      'TreeItem'
    );
    if (treeItems.length === 0) {
      break;
    }
    adding = false;
    for (let item of treeItems) {
      let autoId = await ieDriver.getElementAttribute(
        item.ELEMENT,
        'AutomationId'
      );
      let index = autoId.replace('row_', '');
      let text = await ieDriver.getElementAttribute(item.ELEMENT, 'Name');
      let link = '';
      if (text == null) {
        let linkText = await ieDriver.findElementFromElement(
          item.ELEMENT,
          'tag name',
          'Text'
        );
        if (linkText.ELEMENT) {
          link = await ieDriver.getElementAttribute(linkText.ELEMENT, 'Name');
        }
      }
      if (index >= rows.length) {
        rows.push({ message: text, link: link });
        adding = true;
      }
    }
    await post(url, { value: ['\uE00F'] });
    sleep(1000);
  }
  let items = getItems(rows);
  fs.writeFileSync(filename, JSON.stringify(items, null, 2));
}

let args = yargs.argv;

if (args.run === 'openConsole') {
  openConsole().catch(e => {
    console.error(e);
    process.exit(1);
  });
} else if (args.run === 'getErrors') {
  getErrors(args.output).catch(e => {
    console.error(e);
    process.exit(1);
  });
}
