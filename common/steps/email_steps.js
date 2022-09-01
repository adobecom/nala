/** @module common/steps */
const { Given } = require('@cucumber/cucumber');
const { When } = require('@cucumber/cucumber');
const { Then } = require('@cucumber/cucumber');
const { ImapAccount } = require('../support/classes/imap_account');

Given(/^I have my email credentials$/, haveMyEmailCredentials);

Then(/^I check my email box "([^\"]*)"$/, checkMyEmailBox);

Then(
  /^I wait for the email about "([^\"]*)"(?:| status)$/,
  waitForTheEmailAbout
);

Then(/^I get the recent (\d+) email(?:|s)$/, iGetTheRecentCount);

Then(
  /^I wait for verification code in email$/,
  iWaitForVerificationCodeInEmail
);

Then(
  /^I should see the email subject "([^\"]*)"$/,
  iShouldSeeTheEmailSubjectSubject
);

/**
 * Step Definition:
 * ```
 * /^I have my email credentials$/
 * ```
 * Create an ImapAccount object and use email credentials to set up
 * a connection.
 * Environment variable "EMAILCREDENTIALS" is needed to use this step.
 * Invalid email credetials will fail this step.
 */
function haveMyEmailCredentials() {
  let emailServer = 'outlook.office365.com';
  let credentials = process.env['EMAILCREDENTIALS'];
  if (!credentials) {
    throw `The environment varialbe "EMAILCREDENTIALS" is not defined`;
  }
  let [username, password] = credentials.split(':');
  console.log(username);
  console.log(password);

  this.email = new ImapAccount(emailServer, username, password);

  try {
    browser.call(async () => {
      await this.email.connect();
    });
  } catch (err) {
    throw `Unable to connect to IMAP server "${emailServer}". Please check email credentials.`;
  }
}

/**
 * Step Definition:
 * ```
 * /^I check my email box "([^\"]*)"$/
 * ```
 * The step flags all unseen emails as seen. The following
 * automation only check unseen emails for efficiency.
 */
function checkMyEmailBox(mailbox) {
  this.emailbox = mailbox;
  try {
    browser.call(async () => {
      await this.email.openMailbox(this.emailbox);
      await this.email.markSeen();
      await this.email.closeMailbox();
    });
  } catch (err) {
    throw `Unable to check email mailbox "${this.emailbox}"`;
  }
}

/**
 * Step Definition:
 * ```
 * /^I wait for the email about "([^\"]*)"(?:| status)$/
 * ```
 * @param {string} text Email text
 */
function waitForTheEmailAbout(text) {
  let messages = null;
  let message = null;
  let timeout = 600; // seconds
  let interval = 10; // seconds
  let startTime = new Date();
  while (true) {
    messages = browser.call(async () => {
      console.log('Checcking email...');
      let msgs = null;
      await this.email.openMailbox(this.emailbox);
      msgs = await this.email.getMessages(
        { seen: false },
        { envelope: true, bodyParts: ['text'] }
      );
      await this.email.closeMailbox();
      return msgs;
    });
    if (messages.length > 0) {
      if (messages.some(x => x.envelope.subject.includes(text))) {
        break;
      }
    }
    let timeDiff = (new Date() - startTime) / 1000;
    if (timeDiff > timeout) {
      break;
    }
    browser.pause(interval * 1000);
  }
  let veriCode = null;
  let msgText = null;
  for (let msg of messages) {
    if (msg.envelope.subject.includes(text)) {
      msgText = msg.bodyParts.get('text').toString();
      let m = msgText.match(/Your verification code is:\s+(\d+)/);
      if (m) {
        console.log(m[0]);
        veriCode = m[1];
      }
    }
  }
  if (veriCode) {
    this.verificationCode = veriCode;
  } else {
    console.log(msgText);
    throw `Unable to find the verification code in emails`;
  }
}

/**
 * Step Definition:
 * ```
 * /^I get the recent (\d+) email(?:|s)$/
 * ```
 * @param {string} count Number of emails
 */
function iGetTheRecentCount(count) {}

/**
 * Step Definition:
 * ```
 * /^I wait for verification code in email$/
 * ```
 */
function iWaitForVerificationCodeInEmail() {
  this.step('I wait for the email about "Verification code"');
  //this.step('I wait for the email about "Notification"');
}

/**
 * Step Definition:
 * ```
 * /^I should see the email subject "([^\"]*)"$/
 * ```
 * @param {string} subject Email subject
 */
function iShouldSeeTheEmailSubjectSubject(subject) {}
