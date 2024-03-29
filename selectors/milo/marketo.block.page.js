import { expect } from '@playwright/test';

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
    await this.country.selectOption('United States');
    await this.functionalArea.selectOption('Other');
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

  async submitRFITemplateForm() {
    await this.country.selectOption('United States');
    await this.functionalArea.selectOption('Other', { timeout: 10000 });
    await this.jobTitle.selectOption('Other');
    await this.primaryProductInterest.selectOption('Digital marketing');
    await this.state.selectOption('California');
    await this.company.fill('Adobe');
    await this.firstName.fill('TestFirstName');
    await this.lastName.fill('TestLastName');
    await this.email.fill('test@adobe.com');
    await this.phone.fill('415-111-2222');
    await this.postalCode.fill('94111');
    await this.submitButton.click();
  }

  async submitDiscoverTemplateForm() {
    await this.country.selectOption('United States', { timeout: 10000 });
    await this.email.fill('test@adobe.com');
    await this.company.fill('Adobe');
    await this.submitButton.click();
  }

  async submitExploreTemplateForm() {
    await this.country.selectOption('United States');
    await this.functionalArea.selectOption('Other');
    await this.jobTitle.selectOption('Other');
    await this.firstName.fill('TestFirstName');
    await this.lastName.fill('TestLastName');
    await this.email.fill('test@adobe.com');
    await this.company.fill('Adobe');
    await this.submitButton.click();
  }

  async submitEvaluateTemplateForm() {
    await this.country.selectOption('United States');
    await this.functionalArea.selectOption('Other', { timeout: 10000 });
    await this.jobTitle.selectOption('Other');
    await this.state.selectOption('California');
    await this.firstName.fill('TestFirstName');
    await this.lastName.fill('TestLastName');
    await this.email.fill('test@adobe.com');
    await this.company.fill('Adobe');
    await this.phone.fill('415-111-2222');
    await this.postalCode.fill('94111');
    await this.submitButton.click();
  }

  async submitWebinarTemplateForm() {
    await this.country.selectOption('United States');
    await this.functionalArea.selectOption('Other', { timeout: 10000 });
    await this.jobTitle.selectOption('Other');
    await this.state.selectOption('California');
    await this.firstName.fill('TestFirstName');
    await this.lastName.fill('TestLastName');
    await this.email.fill('test@adobe.com');
    await this.phone.fill('415-111-2222');
    await this.company.fill('Adobe');
    await this.postalCode.fill('94111');
    await this.submitButton.click();
  }

  async submitTrialTemplateForm() {
    await this.functionalArea.selectOption('Other', { timeout: 10000 });
    await this.country.selectOption('United States');
    await this.jobTitle.selectOption('Other');
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
