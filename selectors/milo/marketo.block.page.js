import { expect } from '@playwright/test';

export default class Marketo {
  constructor(page) {
    this.page = page;
    this.marketo = this.page.locator('.marketo');
    this.salutation = this.marketo.locator('#Salutation');
    this.firstName = this.marketo.locator('#FirstName');
    this.lastName = this.marketo.locator('#LastName');
    this.email = this.marketo.locator('#Email');
    this.phone = this.marketo.locator('#Phone');
    this.company = this.marketo.locator('#mktoFormsCompany');
    this.functionalArea = this.marketo.locator('#mktoFormsFunctionalArea');
    this.country = this.marketo.locator('#Country');
    this.state = this.marketo.locator('#State');
    this.postalCode = this.marketo.locator('#PostalCode');
    this.jobTitle = this.marketo.locator('#mktoFormsJobTitle');
    this.primaryProductInterest = this.marketo.locator('#mktoFormsPrimaryProductInterest');
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
   * @description Form ID: MCZ Short Form (2259)
   */
  async submitShortForm() {
    await this.country.selectOption('United States');
    await this.firstName.fill('TestFirstName');
    await this.lastName.fill('TestLastName');
    await this.email.fill('test@adobe.com');
    await this.company.fill('Adobe');
    await this.submitButton.click();
  }

  /**
   * @description Form ID: MCZ Production (2277)
   */
  async submitProductionForm() {
    await this.functionalArea.selectOption('Other');
    await this.country.selectOption('United States');
    await this.jobTitle.selectOption('Other');
    await this.primaryProductInterest.selectOption('Digital marketing');
    await this.state.selectOption('California');
    await this.firstName.fill('TestFirstName');
    await this.lastName.fill('TestLastName');
    await this.email.fill('test@adobe.com');
    await this.phone.fill('415-111-2222');
    await this.company.fill('Adobe');
    await this.postalCode.fill('94111');
    await this.submitButton.click();
  }
}
