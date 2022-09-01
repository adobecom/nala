'use strict';

const util = require('util');
const fs = require('fs');
const yargs = require('yargs');
const mongodb = require('mongodb');

async function main() {
  let argv = yargs
    .options({
      db: {
        alias: 'd',
        describe: 'Database',
        default: 'mwp'
      },
      collection: {
        alias: 'l',
        describe: 'Collection',
        default: 'screenshots'
      },
      creds: {
        alias: 'c',
        describe: 'MongoDB credentials'
      }
    })
    .parserConfiguration({ 'strip-aliased': true }).argv;

  let creds = process.env.MONGODBCREDENTIALS || argv.creds;

  const mongoServer = 'webplatform.corp.adobe.com';
  const mongoPort = '27017';
  const urlparams = 'authSource=mwp&compressors=zlib';
  const url = `mongodb://${creds}@${mongoServer}:${mongoPort}?${urlparams}`;

  let mongoClient = new mongodb.MongoClient(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

  await mongoClient.connect();

  const db = mongoClient.db(argv.db);
  const collection = db.collection(argv.collection);

  delete argv._;
  delete argv['$0'];
  delete argv.db;
  delete argv.collection;
  delete argv.creds;
  argv.timestamp = new Date();

  await collection.insertOne(argv);
  await mongoClient.close();
}

main();
