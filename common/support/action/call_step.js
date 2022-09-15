const cucumber = require('@cucumber/cucumber');
/**
 * Run a Cucumber step sentence
 * @param {string} step The step sentence to be run
 * @param {object} world The world for the current scenario context
 */
export function callStep(step, table, world) {
    let allSteps = cucumber.supportCodeLibraryBuilder.stepDefinitionConfigs;
    let theSteps = allSteps.filter(s => new RegExp(s.pattern).test(step));
    if (theSteps.length == 0) {
        throw `No step definition for "${step}"`;
    } else if (theSteps.length > 1) {
        throw `Multiple step definitions for "${step}"`;
    }
    let theStep = theSteps[0];
    let args = new RegExp(theStep.pattern).exec(step);
    if (table) {
        args.push(table);
    }
    args.shift();
    let code = theStep.code;
    return code.call(world, ...args);
}