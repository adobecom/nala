import { expect } from '@playwright/test';

export default class CategoryPageSanity {
  constructor(page) {
    this.page = page;

    // close Locale Model
    this.closeLocaleModel = page.locator('.dexter-CloseButton').nth(37);
    this.closeRegionPickerPopUp = page.locator('.dexter-CloseButton').nth(36);

    // G-Nav Elements
    this.adobeLogo = page.locator('.feds-logo-image').nth(0);
    this.signInButton = page.locator('.profile-comp').nth(0);

    // Nav List Elements
    this.individuals = page.locator('.position .spectrum-Tabs-item').nth(0);
    this.business = page.locator('.position .spectrum-Tabs-item').nth(1);
    this.studentsAndTeachers = page.locator('.position .spectrum-Tabs-item').nth(2);
    this.schoolsAndUniversities = page.locator('.position .spectrum-Tabs-item').nth(3);

    // Individual Elements
    this.creativeCloudAllApps = page.locator('.cmp-title').nth(0);

    // Business Elements
    this.creativityAndDesignPlans = page.locator("[href$='creativecloud/business.html']");

    // Students and Teachers Elements
    this.studentsAndTeachersLabel = page.locator('div.cmp-text > h2').nth(1);

    // Schools and Universities Elements
    this.educationPlans = page.locator('div.cmp-text  > h2').nth(2);

    // Footer Elements
    this.changeRegion = page.locator('.feds-regionPicker').nth(0);
    this.copyright = page.locator('.feds-navList-header').nth(0);
    this.privacy = page.locator('.feds-navLink-text--default').nth(0);
    this.termsOfUse = page.locator('.feds-navLink-text--default').nth(1);
    this.cookiePreferences = page.locator('.feds-navLink-text--default').nth(2);
    this.doNotSell = page.locator('.feds-navLink-text--default').nth(3);
    this.adChoices = page.locator('.feds-navLink-text--default').nth(4);
  }

  // Close Locale Model
  async closingLocaleModel() {
    await this.closeLocaleModel.click();
  }

  // G-Nav
  async validatingGnav() {
    const elements = [this.adobeLogo, this.signInButton];

    await Promise.all(elements.map(async (element) => {
      await expect(element).toBeVisible();
    }));
  }

  // Individual
  async individualsElements() {
    await this.individuals.click();
    await expect(this.creativeCloudAllApps).toBeVisible();
  }

  // Business
  async businessElements() {
    await this.business.click();
    await expect(this.creativityAndDesignPlans).toBeVisible();
  }

  // Students and Teachers
  async studentsAndTeachersElements() {
    await this.studentsAndTeachers.click();
    await expect(this.studentsAndTeachersLabel).toBeVisible();
  }

  // Schools and Universities
  async schoolsAndUniversitiesElements() {
    await this.schoolsAndUniversities.click();
    await expect(this.educationPlans).toBeVisible();
  }

  // Footer
  async validatingFooter() {
    const elements = [this.changeRegion, this.copyright, this.privacy, this.termsOfUse, this.cookiePreferences,
      this.doNotSell, this.adChoices];

    await Promise.all(elements.map(async (element) => {
      await expect(element).toBeVisible();
    }));

    await this.changeRegion.click();
    await this.closeRegionPickerPopUp.click();
  }
}
