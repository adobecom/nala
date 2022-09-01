const cucumber = require('@cucumber/cucumber');
/**
 * Find a Cucumber step sentence
 * @param {string} step The step sentence to be run
 * @param {object} world The world for the current scenario context
 */
export function findStep(step) {
  let allSteps = cucumber.supportCodeLibraryBuilder.stepDefinitionConfigs;
  let theSteps = allSteps.filter(s => new RegExp(s.pattern).test(step));

  return theSteps;
};
