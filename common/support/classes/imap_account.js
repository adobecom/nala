/** represent an IMAP email account */
class ImapAccount {
  /**
   * Construct an ImapAccount object
   * @param {string} server IMAP server host
   * @param {string} username email username
   * @param {string} password email password
   */
  constructor(server, username, password) {
    const { ImapFlow } = require('imapflow');
    // Use for silent log output
    const pino = require('pino')();
    pino.level = 'silent';

    this.server = server;
    this.username = username;
    this.password = password;

    this.client = new ImapFlow({
      host: this.server,
      port: 993,
      secure: true,
      auth: {
        user: this.username,
        pass: this.password
      },
      logger : pino
    });
  }

  /**
   * Connect to the IMAP account
   */
  async connect() {
    return await this.client.connect();
  }

  /**
   * Lock a mailbox to prevent other's modification
   * @param {string} mailbox Mailbox name
   */
  async lockMailbox(mailbox) {
    this.lock = await this.client.getMailboxLock(mailbox);
  }

  /**
   * Unlock the current locked mailbox
   */
  unlockMailbox() {
    return this.lock.release();
  }

  /**
   * 
   * @param {*} mailbox 
   */
  async openMailbox(mailbox) {
    this.mailbox = await this.client.mailboxOpen(mailbox);
    return this.mailbox;
  }

  /**
   * 
   */
  async closeMailbox() {
    return await this.client.mailboxClose();
  }

  /**
   * 
   */
  async logout() {
    return await this.client.logout();
  }

  /**
   * 
   * @param {*} range 
   * @param {*} query 
   */
  async getMessages(range, query) {
    let messages = []
    for await (let message of this.client.fetch(range, query)) {
      console.log(`${message.uid}: ${message.envelope.subject}`);
      messages.push(message);
    }
    return messages;
  }

  /**
   * 
   */
  async markSeen() {
    return await this.client.messageFlagsAdd({ seen: false }, ['\\Seen'], {uid: true});
  } 
}

module.exports = {
  ImapAccount
};
