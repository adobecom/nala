const glob = require('glob');
const path = require('path');
const {
  formatterHelpers,
  parseGherkinMessageStream,
  PickleFilter
} = require('@cucumber/cucumber');
const { EventEmitter } = require('events');
const { IdGenerator } = require('@cucumber/messages');
const { GherkinStreams } = require('@cucumber/gherkin-streams');

const findFilesPath = async featuresGlobPattern =>
  new Promise((resolve, reject) => {
    glob(featuresGlobPattern, (error, files) => {
      if (error) reject(error);
      resolve(files);
    });
  });

const getFeatureFilesPath = async featuresGlobPattern => {
  return await findFilesPath(featuresGlobPattern);
};

const getTestCases = async (featuresGlobPattern, tagExpression, names) => {
  const eventBroadcaster = new EventEmitter();

  const eventDataCollector = new formatterHelpers.EventDataCollector(
    eventBroadcaster
  );

  let featureFilePaths = await getFeatureFilesPath(featuresGlobPattern);

  const gherkinMsgStream = GherkinStreams.fromPaths(featureFilePaths, {
    newId: IdGenerator.uuid(),
    defaultDialect: 'en',
    includePickles: true,
    includeGherkinDocument: true,
    includeSource: true
  });

  let pickleIds = await parseGherkinMessageStream({
    cwd: process.cwd(),
    eventBroadcaster,
    eventDataCollector,
    gherkinMessageStream: gherkinMsgStream,
    order: 'defined',
    pickleFilter: new PickleFilter({
      tagExpression
    })
  });

  return pickleIds.map(result => {
    const pickle = eventDataCollector.getPickle(result);
    const gherkinDocument = eventDataCollector.getGherkinDocument(pickle.uri);
    const scenarioLocationMap =
      formatterHelpers.GherkinDocumentParser.getGherkinScenarioLocationMap(
        gherkinDocument
      );
    const stepLocationMap =
      formatterHelpers.GherkinDocumentParser.getGherkinStepMap(gherkinDocument);
    const location = formatterHelpers.PickleParser.getPickleLocation({
      gherkinDocument,
      pickle
    });
    const scenario = {};
    scenario.start = scenarioLocationMap[pickle.astNodeIds[0]].line;
    scenario.end =
      stepLocationMap[
        pickle.steps[pickle.steps.length - 1].astNodeIds[0]
      ].location.line;

    return { pickle, location, scenario, uri: pickle.uri };
  });
};

const getProcessedTestCases = async featuresGlobPattern => {
  let testCases = await getTestCases(featuresGlobPattern);

  // find scenario and scenario outline
  let scenarioCount = 0;
  let scenarioOutlineCount = 0;
  for (let i = 0; i < testCases.length; i++) {
    // Scenario
    if (testCases[i].pickle.astNodeIds.length === 1) {
      testCases[i].example = 0;
      scenarioCount++;
    }

    // Scenario Outline
    if (testCases[i].pickle.astNodeIds.length > 1) {
      if (
        i === 0 ||
        testCases[i].pickle.astNodeIds[0] !=
          testCases[i - 1].pickle.astNodeIds[0]
      ) {
        testCases[i].example = 1;
        scenarioOutlineCount++;
        testCases[i].scenario.examples = {
          start: testCases[i].location.line,
          end: testCases[i].location.line
        };
        testCases[i].firstExample = testCases[i];
      } else {
        testCases[i].example = testCases[i - 1].example + 1;
        testCases[i].firstExample = testCases[i - 1].firstExample;
        testCases[i].firstExample.scenario.examples.end =
          testCases[i].location.line;
      }
    }
  }

  return testCases;
};

module.exports = {
  getTestCases,
  getProcessedTestCases
};
