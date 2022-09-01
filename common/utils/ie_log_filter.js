const yargs = require('yargs');
const fs = require('fs');
const yaml = require('js-yaml');
const he = require('he');

let argv = yargs.argv;

// Get the filter settings
let fileContents = fs.readFileSync(`${__dirname}/ie_log_filter.yml`, 'utf8');
let logIgnores = yaml.load(fileContents).ignores;

let rawdata = fs.readFileSync(argv.console);
let consoleLogs = JSON.parse(rawdata);

// transform it to match Chrome's
for (let e of consoleLogs) {
  let parts = e.message.split(' ', 1);
  e.level = parts[0];
  e.text = e.message.substring(parts[0].length + 1);
  e.url = e.link;
}

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
  consoleErrors += `<tr><td>${e.level}</td><td>${he.decode(e.text)}</td><td>${
    e.url
  }</td></tr>`;
  consoleErrorCount += 1;
}
consoleErrors += '</table>';
if (consoleErrorCount === 0) {
  consoleErrors = 'None';
}
fs.writeFileSync('console_errors.txt', consoleErrors);

process.exit(consoleErrorCount);