// Don't run this wdio.conf.js file directly.
// Use run.js, which dynamically fills in configs and run
// ======================================================
// Require babel to load the config file,
// so import can be used
require('@babel/register');
if (process.env.framework === 'cucumber') {
  module.exports = require('./wdio.conf.cucumber');
} else if (process.env.framework === 'mocha') {
  module.exports = require('./wdio.conf.mocha');
}
