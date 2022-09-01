/*
 * The script filters and generates 2 html tables to be included in
 * an email notification. One table is for network logs and the other
 * browser console errors.
 */
const yargs = require('yargs');
const fs = require('fs');
const yaml = require('js-yaml');

/**
 * Insert escape to special characters
 * @param {string} str Escape text string
 */
function escape_html(str) {
  if (str === null || str === '') return false;
  else str = str.toString();

  var map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  };

  return str.replace(/[&<>"']/g, function(m) {
    return map[m];
  });
}

let argv = yargs.argv;

// Get the filter settings
let fileContents = fs.readFileSync(`${__dirname}/log_filter.yml`, 'utf8');
let logIgnores = yaml.load(fileContents).ignores;

fileContents = fs.readFileSync(`${__dirname}/network_filter.yml`, 'utf8');
let networkIgnores = yaml.load(fileContents).ignores;

let rawdata = fs.readFileSync(argv.console);
let consoleLogs = JSON.parse(rawdata);

rawdata = fs.readFileSync(argv.network);
let networkLogs = JSON.parse(rawdata);

let consoleErrorCount = 0;

let consoleErrors =
  '<style>table,th,td{border:1px solid black;border-collapse:collapse;}</style>';
consoleErrors += '<table>';
consoleErrors += '<tr><th>Level</th><th>Message</th><th>URL</th></tr>';
for (let e of consoleLogs) {
  let okIgnore = false;
  for (let i of logIgnores) {
    e.url = e.url || '';
    if (e.level.match(i.level) && e.text.match(i.text) && e.url.match(i.url)) {
      okIgnore = true;
      break;
    }
  }
  if (okIgnore === true) {
    continue;
  }
  consoleErrors += `<tr><td>${e.level}</td><td>${escape_html(e.text)}</td><td>${
    e.url
  }</td></tr>`;
  consoleErrorCount += 1;
}
consoleErrors += '</table>';
if (consoleErrorCount === 0) {
  consoleErrors = 'None';
}
fs.writeFileSync('console_errors.txt', consoleErrors);

let networkErrorCount = 0;
let networkErrors =
  '<style>table,th,td{border:1px solid black;border-collapse:collapse;}</style>';
networkErrors += '<table>';
networkErrors += '<tr><th>Status</th><th>URL</th></tr>';
for (let n of networkLogs) {
  let okIgnore = false;
  for (let i of networkIgnores) {
    if (n.status == i.status && n.url.match(i.url)) {
      okIgnore = true;
      break;
    }
  }
  if (okIgnore === true) {
    continue;
  }
  networkErrors += `<tr><td>${n.status}</td><td>${n.url}</td></tr>`;
  networkErrorCount += 1;
}
if (networkErrorCount === 0) {
  networkErrors = 'None';
}
fs.writeFileSync('network_errors.txt', networkErrors);

if (consoleErrorCount + networkErrorCount) console.log("Unknown errors were logged.")

process.exit(consoleErrorCount + networkErrorCount);
