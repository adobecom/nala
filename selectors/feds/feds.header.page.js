/* eslint-disable import/no-import-module-exports */
import { expect } from '@playwright/test';

exports.FedsHeader = class FedsHeader {
  constructor(page) {
    this.page = page;

    // GNAV selectors:
    this.GnavLogo = page.locator('a.gnav-logo');
    this.MainNavLogo = page.locator('a.feds-brand, a.gnav-brand');
    this.MainNavContainer = page.locator('nav.feds-topnav, .gnav-wrapper');
    this.MegaMenuToggle = page.locator('div.feds-navItem--megaMenu, .section-menu');
    this.MegaMenuContainer = page.locator('div.feds-navItem--megaMenu div.feds-popup, .section-menu .gnav-menu-container');
    this.MegaMenuColumn = page.locator('div.feds-navItem--megaMenu div.feds-popup-column');

    // GNAV action selectors:
    this.SignInLabel = page.locator('a.feds-signIn, a.gnav-signin');
    this.SearchIcon = page.locator('button.feds-search-trigger, button.gnav-search-button');
    this.SearchInput = page.locator('input.feds-search-input, input.gnav-search-input');
    this.CloseSearch = page.locator('span.feds-search-close, button.gnav-search-button[daa-lh="header|Close"]');
    this.SearchResults = page.locator('#feds-search-results, .gnav-search-results');
    this.AdvancedSearchLink = page.locator('#feds-search-results li a, .gnav-search-results li a');

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

  /**
   * Opens the User Profile via click on GNAV profile icon.
   * !Note: Only use after user was logged in!
   * @param  {none}
   * @return {Promise} PlayWright promise
   */
  async OpenUserProfile() {
    await this.ProfileIcon.waitFor({ state: 'visible', timeout: 10000 });
    await this.ProfileIcon.click();
    await expect(this.ProfileModal).toBeVisible();
  }

  /**
   * Closes the User Profile via click on GNAV profile icon.
   * !Note: Only use after user was logged in!
   * @param  {none}
   * @return {Promise} PlayWright promise
   */
  async CloseUserProfile() {
    await this.ProfileIcon.waitFor({ state: 'visible', timeout: 10000 });
    await this.ProfileIcon.click();
    await expect(this.ProfileModal).not.toBeVisible();
  }

  /**
   * Checks the elements of the User Profile component.
   * @param  {none}
   * @return {Promise} PlayWright promise
   */
  async CheckUserProfile() {
    await expect(this.ProfileName).toBeVisible();
    await expect(this.ProfileEmail).toBeVisible();
    await expect(this.ProfileSignOut).toBeVisible();
    await expect(this.ProfileAccountLink).toBeVisible();
  }

  /**
   * Opens the search bar via click fron GNAV search icon.
   * @param  {none}
   * @return {Promise} PlayWright promise
   */
  async OpenSearchBar() {
    await this.SearchIcon.waitFor({ state: 'visible', timeout: 10000 });
    await this.SearchIcon.click();
    await expect(this.SearchInput).toBeVisible();
  }

  /**
   * Closes the search bar via click fron GNAV search icon.
   * @param  {none}
   * @return {Promise} PlayWright promise
   */
  async CloseSearchBar() {
    await this.CloseSearch.waitFor({ state: 'visible', timeout: 10000 });
    await this.CloseSearch.click();
    await expect(this.SearchInput).not.toBeVisible();
  }
};
