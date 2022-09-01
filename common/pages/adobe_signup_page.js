import { Page } from './page';

/** Class representing Adobe account sign up page */
export class AdobeSignUpPage extends Page {
  /**
   * Construct AdobeSignUpPage object
   */
  constructor() {
    super();
    this.buildProps({
      emailField: '#Signup-EmailField',
      firstNameField: '#Signup-FirstNameField',
      lastNameField: '#Signup-LastNameField',
      passwordField: '#Signup-PasswordField',
      birthdayDayField: '.Signup-DateOfBirthChooser__day input',
      birthdayYearField: '.Signup-DateOfBirthChooser__year input',
      signupButton: '.Signup-CreateAccount button',
      code0: '.CodeInput input[data-index="0"]',
      code1: '.CodeInput input[data-index="1"]',
      code2: '.CodeInput input[data-index="2"]',
      code3: '.CodeInput input[data-index="3"]',
      code4: '.CodeInput input[data-index="4"]',
      code5: '.CodeInput input[data-index="5"]'
    });
  }

  /**
   * Fill in sign up information
   * @param {object} fields Fields to be inputted into sign up form
   */
  fillIn(fields) {
    this.emailField.click();
    if (fields.email) this.emailField.setValue(fields.email);
    this.firstNameField.click();
    if (fields.firstName) this.firstNameField.setValue(fields.firstName);
    this.lastNameField.click();
    if (fields.lastName) this.lastNameField.setValue(fields.lastName);
    this.passwordField.click();
    if (fields.password) this.passwordField.setValue(fields.password);
    this.birthdayDayField.click();
    if (fields.birthDay) this.birthdayDayField.setValue(fields.birthDay);
    this.birthdayYearField.click();
    if (fields.birthYear) this.birthdayYearField.setValue(fields.birthYear);
  }

  /**
   * Submit the sign up
   */
  submit() {
    this.waitForEnabled('signupButton');
    browser.pause(1000);
    this.signupButton.click();
  }

  /**
   * Input verification code in the sign up form
   * @param {string} code Verification code from email
   */
  inputVerificationCode(code) {
    let codeChars = [...code];
    for (let i = 0; i < codeChars.length; i++) {
      this[`code${i}`].click();
      this.waitForEnabled(`code${i}`);
      this[`code${i}`].setValue(codeChars[i]);
    }
  }
}
