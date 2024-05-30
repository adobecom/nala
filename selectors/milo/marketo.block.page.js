import { expect } from '@playwright/test';

const FIRST_NAME = 'firstNameTest';
const LAST_NAME = 'lastNameTest';
const PHONE = '415-123-4567';
const EMAIL = 'test+nosub@adobetest.com';
const COMPANY = 'Adobe';
const COUNTRY = 'United States';
const STATE = 'California';
const POSTAL_CODE = '94111';
const JOB_TITLE = 'Other';
const PRIMARY_PRODUCT_INTEREST = 'Digital marketing';
const FUNCTIONAL_AREA = 'Other';
const COMPANY_TYPE = 'Other';

export default class Marketo {
  constructor(page) {
    this.page = page;
    this.marketo = this.page.locator('.marketo');
    this.firstName = this.marketo.locator('input[name="FirstName"]');
    this.lastName = this.marketo.locator('input[name="LastName"]');
    this.email = this.marketo.locator('input[name="Email"]');
    this.phone = this.marketo.locator('input[name="Phone"]');
    this.company = this.marketo.locator('input[name="mktoFormsCompany"]');
    this.functionalArea = this.marketo.locator('select[name="mktoFormsFunctionalArea"]');
    this.country = this.marketo.locator('select[name="Country"]');
    this.state = this.marketo.locator('select[name="State"]');
    this.postalCode = this.marketo.locator('input[name="PostalCode"]');
    this.jobTitle = this.marketo.locator('select[name="mktoFormsJobTitle"]');
    this.primaryProductInterest = this.marketo.locator('select[name="mktoFormsPrimaryProductInterest"]');
    this.companyType = this.marketo.locator('select[name="mktoFormsCompanyType"]');
    this.submitButton = this.marketo.locator('#mktoButton_new');
  }

  /**
   * @description Checks that the form fields display.
   * Checking the fields that all form IDs have.
   */
  async checkFieldsDisplays() {
    await expect(this.country).toBeVisible({ timeout: 10000 });
    await expect(this.firstName).toBeVisible();
    await expect(this.lastName).toBeVisible();
    await expect(this.email).toBeVisible();
    await expect(this.company).toBeVisible();
    await expect(this.submitButton).toBeVisible();
  }

  /**
   * @description Form ID: MCZ Production (2277)
   */
  async submitProductionForm() {
    await this.country.selectOption(COUNTRY);
    await this.functionalArea.selectOption(FUNCTIONAL_AREA);
    await this.jobTitle.selectOption(JOB_TITLE);
    await this.primaryProductInterest.selectOption(PRIMARY_PRODUCT_INTEREST);
    await this.state.selectOption(STATE);
    await this.firstName.fill(FIRST_NAME);
    await this.lastName.fill(LAST_NAME);
    await this.email.fill(EMAIL);
    await this.phone.fill(PHONE);
    await this.company.fill(COMPANY);
    await this.postalCode.fill(POSTAL_CODE);
    await this.submitButton.click();
  }

  async submitRFITemplateForm() {
    await this.country.selectOption(COUNTRY);
    await this.functionalArea.selectOption(FUNCTIONAL_AREA);
    await this.jobTitle.selectOption(JOB_TITLE);
    await this.primaryProductInterest.selectOption(PRIMARY_PRODUCT_INTEREST);
    await this.state.selectOption(STATE);
    await this.company.fill(COMPANY);
    await this.firstName.fill(FIRST_NAME);
    await this.lastName.fill(LAST_NAME);
    await this.email.fill(EMAIL);
    await this.phone.fill(PHONE);
    await this.postalCode.fill(POSTAL_CODE);
    await this.submitButton.click();
  }

  async submitDiscoverTemplateForm() {
    await this.country.selectOption(COUNTRY);
    await this.email.fill(EMAIL);
    await this.company.fill(COMPANY);
    await this.submitButton.click();
  }

  async submitExploreTemplateForm() {
    await this.country.selectOption(COUNTRY);
    await this.functionalArea.selectOption(FUNCTIONAL_AREA);
    await this.jobTitle.selectOption(JOB_TITLE);
    await this.firstName.fill(FIRST_NAME);
    await this.lastName.fill(LAST_NAME);
    await this.email.fill(EMAIL);
    await this.company.fill(COMPANY);
    await this.submitButton.click();
  }

  async submitEvaluateTemplateForm() {
    await this.country.selectOption(COUNTRY);
    await this.functionalArea.selectOption(FUNCTIONAL_AREA);
    await this.jobTitle.selectOption(JOB_TITLE);
    await this.state.selectOption(STATE);
    await this.firstName.fill(FIRST_NAME);
    await this.lastName.fill(LAST_NAME);
    await this.email.fill(EMAIL);
    await this.company.fill(COMPANY);
    await this.phone.fill(PHONE);
    await this.postalCode.fill(POSTAL_CODE);
    await this.submitButton.click();
  }

  async submitWebinarTemplateForm() {
    await this.country.selectOption(COUNTRY);
    await this.functionalArea.selectOption(FUNCTIONAL_AREA);
    await this.jobTitle.selectOption(JOB_TITLE);
    await this.state.selectOption(STATE);
    await this.firstName.fill(FIRST_NAME);
    await this.lastName.fill(LAST_NAME);
    await this.email.fill(EMAIL);
    await this.phone.fill(PHONE);
    await this.company.fill(COMPANY);
    await this.postalCode.fill(POSTAL_CODE);
    await this.submitButton.click();
  }

  async submitTrialTemplateForm() {
    await this.functionalArea.selectOption(FUNCTIONAL_AREA);
    await this.country.selectOption(COUNTRY);
    await this.jobTitle.selectOption(JOB_TITLE);
    await this.state.selectOption(STATE);
    await this.firstName.fill(FIRST_NAME);
    await this.lastName.fill(LAST_NAME);
    await this.email.fill(EMAIL);
    await this.phone.fill(PHONE);
    await this.company.fill(COMPANY);
    await this.postalCode.fill(POSTAL_CODE);
    await this.submitButton.click();
  }

  async submitFullTemplateForm(poi = PRIMARY_PRODUCT_INTEREST) {
    await this.country.selectOption(COUNTRY);
    await this.functionalArea.selectOption(FUNCTIONAL_AREA);
    await this.jobTitle.selectOption(JOB_TITLE);
    await this.primaryProductInterest.selectOption(poi);
    await this.state.selectOption(STATE);
    await this.company.fill(COMPANY);
    await this.firstName.fill(FIRST_NAME);
    await this.lastName.fill(LAST_NAME);
    await this.email.fill(EMAIL);
    await this.phone.fill(PHONE);
    await this.postalCode.fill(POSTAL_CODE);
    await this.selectCompanyType();
    await this.submitButton.click();
  }

  async submitExpandedTemplateForm() {
    await this.country.selectOption(COUNTRY);
    await this.functionalArea.selectOption(FUNCTIONAL_AREA);
    await this.jobTitle.selectOption(JOB_TITLE);
    await this.firstName.fill(FIRST_NAME);
    await this.lastName.fill(LAST_NAME);
    await this.email.fill(EMAIL);
    await this.company.fill(COMPANY);
    await this.selectCompanyType();
    await this.submitButton.click();
  }

  async submitEssentialTemplateForm() {
    await this.country.selectOption(COUNTRY);
    await this.firstName.fill(FIRST_NAME);
    await this.lastName.fill(LAST_NAME);
    await this.email.fill(EMAIL);
    await this.company.fill(COMPANY);
    await this.selectCompanyType();
    await this.submitButton.click();
  }

  async getPOI() {
    const poi = await this.page.evaluate('window.mcz_marketoForm_pref.program.poi');
    return poi;
  }

  async selectCompanyType() {
    // The company type field will display if the poi is one of the below
    const expectedPOI = ['Commerce', 'ADOBEADVERTISINGCLOUD'];

    if (expectedPOI.includes(await this.getPOI())) {
      this.companyType.selectOption(COMPANY_TYPE);
    }
  }
}
