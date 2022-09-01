import { saveScreenshot } from '../action/save_screenshot';
const fs = require('fs');
const path = require('path');

/**
 *
 * Runs after a Cucumber Scenario.
 * @param {ITestCaseHookParameter} world            world object containing information on pickle and test step
 * @param {Object}                 result           results object containing scenario results `{passed: boolean, error: string, duration: number}`
 * @param {boolean}                result.passed    true if scenario has passed
 * @param {string}                 result.error     error stack if scenario failed
 * @param {number}                 result.duration  duration of scenario in milliseconds
 * @param {Object}                 context          Cucumber World object
 */
function afterScenario(world, result, context) {
  if (browser.isChrome) {
    let logs = browser.getLogs('browser');
    if (logs) {
      fs.writeFileSync(
        path.join(browser.config.outputDir, 'browserLog.json'),
        JSON.stringify(logs, null, 2)
      );
    }
    if (browser.config.profile.checkBCE) {
      console.log('Check Browser Console Errors:');

      if (logs) {
        let errors = logs.filter(x => x.level === 'SEVERE');
        if (errors.length > 0) {
          console.log(errors);
          console.log(`SEVERE count: ${errors.length}`);
          result.passed = false;
        }
      }
    }
  } else if (browser.config.profile.checkBCE) {
    console.log(`The flag "checkBCE" only works with Chrome browser`);
  }

  if (process.env.scenarioPause && process.env.scenarioPause > 0) {
    browser.pause(process.env.scenarioPause * 1000);
  }
  if (devTools.has('Network')) {
    console.log(`Network log count: ${logNetwork.length}`);
  }
  if (devTools.has('Log')) {
    console.log(`Console log count: ${logConsole.length}`);
  }
  testCount += 1;

  if (!result.passed) {
    saveScreenshot('screenshots', world.pickle.name + `-failed`);
  }
}

exports.afterScenario = afterScenario;
