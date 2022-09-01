import { Section } from './section';

/** Class representing card collection component */
export class FAASForm extends Section {
  /**
   * @type {object}
   * @description Get the contact form
   */
  get faasForm() {
    return $('.faas-form');
  }

  /**
   * @type {object}
   * @description Get the form submit button
   */
  get submitButton() {
    return $('.faas-form input[type="submit"]');
  }
  
  /**
   * @type {object}
   * @description Get the error message
   */
  get faasErrorMessage() {
    return $('.faas-form .errorMessage');
  }

  get faasError() {
    return $('.faas-form .error');
  }
  
  /**
   * @type {object}
   * @description Get the country dropdown
   */
  get countryDropdown() {
    return $(".//div[contains(@class,'dropdownlist 14')]/select");
  }
  
  /**
   * @type {object}
   * @description Get the state dropdown
   */
  get stateDropdown() {
    return $(".//div[contains(@class,'dropdownlist 15')]/select");
  }  
  /**
   * @type {object}
   * @description Get the zip input
   */
  get zipInput() {
    return $(".//div[contains(@class,'textfield 16')]/input");
  }
    /**
   * @type {object}
   * @description Get the first name input
   */
  get firstNameInput() {
    return $(".//div[contains(@class,'textfield 8')]/input");
  }

    /**
   * @type {object}
   * @description Get the last name input
   */
  get lastNameInput() {
    return $(".//div[contains(@class,'textfield 9')]/input");
  }

  /**
   * @type {object}
   * @description Get the organization name input
   */
  get orgNameInput() {
    return $(".//div[contains(@class,'textfield 10')]/input");
  }
  
  /**
   * @type {object}
   * @description Get the website input
   */
  get websiteInput() {
    return $(".//div[contains(@class,'textfield 33')]/input");
  }
  
  /**
   * @type {object}
   * @description Get the phone number input
   */
  get phoneInput() {
    return $(".//div[contains(@class,'textfield 11')]/input");
  }
    
  /**
   * @type {object}
   * @description Get the email input
   */
  get emailInput() {
    return $(".//input[@type='email']");
  }
      
  /**
   * @type {object}
   * @description Get the number of employees input
   */
  get employeeNoInput() {
    return $(".//div[contains(@class,'dropdownlist 17')]/select");
  }
      
  /**
   * @type {object}
   * @description Get the industry dropdown
   */
  get industryDropdown() {
    return $(".//div[contains(@class,'dropdownlist 18')]/select");
  }
          
  /**
   * @type {object}
   * @description Get the company dropdown
   */
  get companyDropdown() {
    return $(".//div[contains(@class,'dropdownlist 130')]/select");
  }
      
  /**
   * @type {object}
   * @description Get the functional area dropdown
   */
  get functionalAreaDropdown() {
    return $(".//div[contains(@class,'dropdownlist 19')]/select");
  }
      
  /**
   * @type {object}
   * @description Get the job title dropdown
   */
  get jobTitleDropdown() {
    return $(".//div[contains(@class,'dropdownlist 20')]/select");
  }
      
  /**
   * @type {object}
   * @description Get the improve experience checkbox
   */
  get improveExpCheckbox() {
    return $(".//div[contains(@class,'checkbox 106')]/label");
  }

  /**
   * @type {object}
   * @description Get the B2B Partner checkbox
   */
  get b2bPartnerCheckbox() {
    return $(".//div[contains(@class,'checkbox 148')]/label");
  }
  
  /**
   * @type {object}
   * @description Get the primary product interest dropdown
   */
  get productInterestDropdown() {
    return $("#Form40_154");
  }  

  /**
   * @type {object}
   * @description Get the Questions and comments textArea
   */
  get questionsCommentsTextarea() {
    return $(".//div[contains(@class,'textarea 26')]/textarea");
  }

  /**
   * @type {object}
   * @description Get the Questions and comments textArea
   */
  get contactMeCheckbox() {
    return $("//input[@class='democheckbox']/following-sibling::label");
  }  
  
}