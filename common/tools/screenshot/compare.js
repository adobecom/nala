'use strict';

const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');
const { spawnSync } = require('child_process');
const yargs = require('yargs');
const axios = require('axios');
const urljoin = require('url-join');

function command(cmd, args) {
  let output = spawnSync(cmd, [args], {
    shell: true
  });
  return output;
}

function magickCommand(cmd) {
  let output = command('magick', cmd);
  return output.stdout.toString('utf8');
}

function imageSize(filename) {
  let cmd = `identify -format "%[fx:w]x%[fx:h]" "${filename}"`;
  return magickCommand(cmd);
}

function extentImage(filename, size, outfile) {
  let cmd = `convert "${filename}" -background LimeGreen -extent ${size} "${outfile}"`;
  return magickCommand(cmd);
}

function thumbnailImage(filename, size, outfile) {
  let cmd = `convert "${filename}" -resize ${size} "${outfile}"`;
  return magickCommand(cmd);
}

function compare(imgFile1, imgFile2, outFile) {
  let cmd = `compare -metric AE "${imgFile1}" "${imgFile2}" "${outFile}"`;
  return command('magick', cmd);
}

function maxSize(sizes) {
  let maxsize = [0, 0];
  for (let s of sizes) {
    let size = s.split('x').map(x => parseInt(x));
    maxsize = [Math.max(size[0], maxsize[0]), Math.max(size[1], maxsize[1])];
  }
  return `${maxsize[0]}x${maxsize[1]}`;
}

async function downloadImage(url, localPath) {
  let writer = fs.createWriteStream(localPath);

  let res = await axios.get(url, {
    responseType: 'stream'
  });

  res.data.pipe(writer);

  return new Promise((resolve, reject) => {
    writer.on('finish', resolve);
    writer.on('error', reject);
  });
}

async function getSavedImages(envUrl, entries) {
  let res = await axios.get(urljoin(envUrl, 'results.json'));
  let entriesA = res.data;

  if (entries.length !== entriesA.length) {
    throw `envUrlA has ${entriesA.length} items, but the current page set has ${entries.length}`;
  }

  for (let i = 0; i < entries.length; i++) {
    let entry = entries[i];
    if (!entry.b) {
      entry.b = entry.a;
      entry.location = `|${entry.location}`;
    }
    let basename = path.basename(entriesA[i].a);
    entry.a = path.join(
      path.dirname(entry.a),
      basename.replace('.png', '-a.png')
    );
    await downloadImage(urljoin(envUrl, basename), entry.a);
    let locs = entry.location.split('|');
    locs[0] = entriesA[i].location;
    entry.location = locs.join('|');
  }
}

async function main() {
  let argv = yargs
    .options({
      config: {
        alias: 'c',
        demandOption: true,
        default: 'results.json'
      },
      envUrlA: {
        alias: 'a'
      }
    })
    .parserConfiguration({ 'strip-aliased': true }).argv;

  let entries = JSON.parse(fs.readFileSync(argv.config));

  if (argv.envUrlA) {
    await getSavedImages(argv.envUrlA, entries);
  }

  const tnSize = '120x120';
  let tmpfiles = [];

  for (let i = 0; i < entries.length; i++) {
    let entry = entries[i];
    console.log(entry);

    let files = [entry.a, entry.b];
    let sizes = files.map(x => imageSize(x));

    let size = maxSize(sizes);

    let tmps = files.map(x => x.replace(/.png$/, '-tmp.png'));
    for (let i = 0; i < 2; i++) {
      extentImage(files[i], size, tmps[i]);
    }
    tmpfiles.push(...tmps);

    let diffFile = entry.a.replace(/-[^-]+\.png$/, '-diff.png');
    let output = compare(tmps[0], tmps[1], diffFile);
    entry.diff = diffFile;
    entry.result = output.status === 0 ? 'PASS' : 'FAIL';
    entry.metric = output.stderr.toString('utf8');

    for (let f of [entry.a, entry.b, diffFile]) {
      thumbnailImage(f, tnSize, f.replace('.png', '_t.png'));
    }
  }

  fs.writeFileSync('results.json', JSON.stringify(entries, null, 2));

  try {
    for (let f of tmpfiles) {
      fs.unlinkSync(f);
    }
  } catch (err) {
    console.log(err);
  }
}

main();
