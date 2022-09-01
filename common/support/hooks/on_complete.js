/**
 * On complete hook
 * Gets executed after all workers have shut down and the process is about to exit.
 * An error thrown in the `onComplete` hook will result in the test run failing.
 * @param {object} exitCode 0 - success, 1 - fail
 * @param {object} config wdio configuration object
 * @param {object[]} capabilities list of capabilities details
 * @param {object} results object containing test results
 */
function onComplete(exitCode, config, capabilities, results) {};

exports.onComplete = onComplete;
