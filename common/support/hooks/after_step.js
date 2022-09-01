/**
 * Runs after a Cucumber Step.
 * @param {Pickle.IPickleStep} step             step data
 * @param {IPickle}            scenario         scenario pickle
 * @param {Object}             result           results object containing scenario results
 * @param {boolean}            result.passed    true if scenario has passed
 * @param {string}             result.error     error stack if scenario failed
 * @param {number}             result.duration  duration of scenario in milliseconds
 * @param {Object}             context          Cucumber World object
 */
function afterStep(step, scenario, result, context) {
  if (process.env.stepPause) {
    browser.pause(process.env.stepPause * 1000);
  }
}

exports.afterStep = afterStep;
