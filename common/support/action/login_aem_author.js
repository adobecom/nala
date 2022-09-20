const urljoin = require('url-join');
/**
 * Log into AEM author through CRX/DE
 * @param  {string}   username Username for accessing AEM author instance
 * @param  {string}   password Password for accessing AEM author instance 
 */
export function loginAemAuthor(username, password) {
  if (!password && username in browser.config.authorAccounts) {
    password = browser.config.authorAccounts[username].password;
    username = browser.config.authorAccounts[username].username;
  }

  let baseUrl = browser.config.profile.authorBaseUrl || browser.config.baseUrl;

  // CRX/DE may not work
/*  
  let url = urljoin(baseUrl, 'crx/de/index.jsp');
  browser.url(url); 

  // Login code for crx/de  
  let loginButton = $('#loginbutton');
  loginButton.waitForDisplayed();
  loginButton.click();

  let loginDialog = $('#login-dialog');
  loginDialog.waitForDisplayed();

  let usernameInput = $('//label[text()="Name:"]/..//input');
  usernameInput.waitForEnabled();
  usernameInput.setValue(username);

  browser.pause(1000);

  let passwordInput = $('//label[text()="Password:"]/..//input');
  passwordInput.waitForEnabled();
  passwordInput.setValue(password);

  browser.pause(1000);
  
  let okButton = loginDialog.$$('button')[0];
  okButton.waitForEnabled();
  okButton.click();

  loginDialog.waitForDisplayed(10000, true);
*/  
  let url = urljoin(baseUrl, '/libs/granite/core/content/login.html');  
  browser.url(url); 
  
  let usernameInput = $('form#login #username');
  usernameInput.click();
  usernameInput.setValue(username);

  let passwordInput = $('form#login #password');
  passwordInput.click();
  passwordInput.setValue(password);

  let submitButton = browser.$('#submit-button');
  submitButton.waitForEnabled();
  submitButton.click();  
} 
