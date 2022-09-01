const fs = require('fs');
const yargs = require('yargs');
const path = require('path');
const nodemailer = require('nodemailer');

let notifyFailure = false;

async function main() {
  let argv = yargs
    .options({
      file: {
        alias: 'f',
        required: true,
        describe: 'json file input to generate seo report summary'
      },
      recipients: {
        alias: 'm',
        describe: 'Mail recipients',
        default: 'tek10248@adobe.com'
      }
    })
    .parserConfiguration({ 'strip-aliased': true }).argv;
  const recipients = argv.recipients;
  let seoreportSummary = {};
  let result = {};
  seoreportSummary['Summary'] = [];
  let file = argv.file;
  if (file.includes('seo_report.json')) {
    let jsonContent = JSON.parse(fs.readFileSync(file));
    getCount(jsonContent, result);

    seoreportSummary['Summary'].push({
      Passed: result['pass'],
      Failed: result['fail']
    });
  }
  fs.writeFileSync(
    'seo_report_summary.json',
    JSON.stringify(seoreportSummary, null, 2)
  );
  if (notifyFailure) {
    sendEmailOnFailure(recipients);
  }
}

/**
 * This functions calculated number of failures and success in a SEO report generated
 *
 * @param {json object} jsonData
 * @param {string} result
 */
function getCount(jsonData, result) {
  let fail = 0;
  let pass = 0;
  if (Object.keys(jsonData).length != 0) {
    let entriesSEO = jsonData;
    for (let j = 0; j < entriesSEO.length; j++) {
      console.log;
      let entrySEO = entriesSEO[j];
      if (
        entrySEO[0]['noDuplicatejsonLD'] === '(x)' ||
        entrySEO[0]['match'] === '(x)' ||
        entrySEO[0]['descriptionMatch'] === '(x)' ||
        entrySEO[0]['titleMatch'] === '(x)' ||
        entrySEO[0]['title'] === '' ||
        entrySEO[0]['description'] === ''
      ) {
        fail = fail + 1;
      } else {
        pass = pass + 1;
      }
    }
  }
  if (fail > 0) {
    notifyFailure = true;
  }
  result['fail'] = fail;
  result['pass'] = pass;
}

/**
 * Common function to send email using nodemailer
 *
 * @param {*} options
 * @param {*} pass
 * @returns
 */
async function sendMail(options, pass) {
  let transporter = nodemailer.createTransport({
    host: 'authrelay.corp.adobe.com',
    port: 465,
    secure: true,
    auth: {
      user: 'rlyorion@adobe.com',
      pass
    }
  });

  let info = await transporter.sendMail(options);
  return info;
}

/**
 * This function send an email if there is any failure in the SEO report generated
 *
 * @param {string} recipients list of email ids seperated by comma
 */
async function sendEmailOnFailure(recipients) {
  let locale = browser.config.profile.locale.toUpperCase();
  let wikiLocale = '';
  if (locale === '') {
    locale = 'US';
    wikiLocale = 'default';
  }
  let html = '';
  html += `There is a failure in SEO report for locale code ${locale} .<br>`;
  html += `Please review the report <a href="https://wiki.corp.adobe.com/display/webauto/SEO+Report+for+Frictionless+Pages+-+${wikiLocale}">SEO Report</a>.<br><br><br>`;
  html += `Platform Team<br>`;

  try {
    let info = await sendMail(
      {
        from: 'rlyorion@adobe.com', // sender address
        to: recipients, // list of receivers
        subject: `SEO Report failed for locale ${locale}`, // Subject line
        html // plain text body
      },
      ORIONRELAYPASSWORD
    );
    if (info) {
      console.log('Message sent: %s', info.messageId);
    }
  } catch (err) {
    console.log(err);
    throw new Error('when sending emails: ' + err);
  }
}

main().catch(err => {
  console.log(err);
});
