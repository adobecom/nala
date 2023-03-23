import { expect } from '@playwright/test';

exports.FedsHeader = class FedsHeader {

  constructor(page) {
    this.page = page;

    // GNAV selectors:
    this.MainNavLogo = page.locator('a.feds-brand');
    this.MainNavContainer = page.locator('nav.feds-topnav');

    // GNAV action selectors:
    this.SignInLabel = page.locator('a.feds-signIn');
    this.SearchIcon = page.locator('button.feds-search-trigger');
    this.SearchInput = page.locator('input.feds-search-input');
    this.CloseSearch = page.locator('span.feds-search-close');
    this.SearchResults = page.locator('#feds-search-results');
    this.AdvancedSearchLink = page.locator('#feds-search-results li a');

    this.ProfileIcon = page.locator('button.feds-profile-button');
    this.ProfileModal = page.locator('div#feds-profile-menu');
    this.ProfileName = page.locator('p.feds-profile-name');
    this.ProfileEmail = page.locator('p.feds-profile-email');
    this.ProfileAccountLink = page.locator('p.feds-profile-account');
    this.ProfileDetails = page.locator('div.feds-profile-details');
    this.ProfileSignOut = page.locator('a.feds-profile-action');

    // GNAV breadcrumb selectors:
    this.BreadcrumbList = page.locator('nav.feds-breadcrumbs');
    this.BreadcrumbElems = page.locator('nav.feds-breadcrumbs li');
    this.BreadcrumbContainer = page.locator('div.feds-breadcrumbs-wrapper');
  }

  async openUserProfile() {
    await this.ProfileIcon.waitFor({state: 'visible', timeout: 10000});
    await this.ProfileIcon.click();
    await expect(this.ProfileModal).toBeVisible();
  }

  async closeUserProfile() {
    await this.ProfileIcon.waitFor({state: 'visible', timeout: 10000});
    await this.ProfileIcon.click();
    expect(this.ProfileModal).not.toBeVisible();
  }

  async checkUserProfile() {
    await expect(this.ProfileName).toBeVisible();
    await expect(this.ProfileEmail).toBeVisible();
    await expect(this.ProfileSignOut).toBeVisible();
    await expect(this.ProfileAccountLink).toBeVisible();
  }

  async openSearchBar() {
    await this.SearchIcon.waitFor({state: 'visible', timeout: 10000});
    await this.SearchIcon.click();
    await expect(this.SearchInput).toBeVisible();
  }

  async closeSearchBar() {
    await this.CloseSearch.waitFor({state: 'visible', timeout: 10000});
    await this.CloseSearch.click();
    await expect(this.SearchInput).not.toBeVisible();
  }
};
