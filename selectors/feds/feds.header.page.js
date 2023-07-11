/* eslint-disable import/no-import-module-exports */
import { expect } from '@playwright/test';

exports.FedsHeader = class FedsHeader {
  constructor(page) {
    this.page = page;

    // GNAV selectors:
    this.gnavLogo = page.locator('a.gnav-logo');
    this.mainNavLogo = page.locator('a.feds-brand, a.gnav-brand');
    this.mainNavContainer = page.locator('nav.feds-topnav, .gnav-wrapper');
    this.megaMenuToggle = page.locator('div.feds-navItem--megaMenu, .section-menu');
    this.megaMenuContainer = page.locator('div.feds-navItem--megaMenu div.feds-popup, .section-menu .gnav-menu-container');
    this.megaMenuColumn = page.locator('div.feds-navItem--megaMenu div.feds-popup-column');

    // GNAV action selectors:
    this.signInLabel = page.locator('a.feds-signIn, a.gnav-signin');
    this.searchIcon = page.locator('button.feds-search-trigger, button.gnav-search-button');
    this.searchInput = page.locator('input.feds-search-input, input.gnav-search-input');
    this.closeSearch = page.locator('span.feds-search-close, button.gnav-search-button[daa-lh="header|Close"]');
    this.searchResults = page.locator('#feds-search-results, .gnav-search-results');
    this.advancedSearchLink = page.locator('#feds-search-results li a, .gnav-search-results li a');

    this.profileIcon = page.locator('button.feds-profile-button');
    this.profileModal = page.locator('div#feds-profile-menu');
    this.profileName = page.locator('p.feds-profile-name');
    this.profileEmail = page.locator('p.feds-profile-email');
    this.profileAccountLink = page.locator('p.feds-profile-account');
    this.profileDetails = page.locator('div.feds-profile-details');
    this.profileSignOut = page.locator('a.feds-profile-action');

    // GNAV breadcrumb selectors:
    this.breadcrumbList = page.locator('nav.feds-breadcrumbs');
    this.breadcrumbElems = page.locator('nav.feds-breadcrumbs li');
    this.breadcrumbContainer = page.locator('div.feds-breadcrumbs-wrapper');
  }

  /**
   * Opens the User Profile via click on GNAV profile icon.
   * !Note: Only use after user was logged in!
   * @param  {none}
   * @return {Promise} PlayWright promise
   */
  async openUserProfile() {
    await this.profileIcon.waitFor({ state: 'visible', timeout: 10000 });
    await this.profileIcon.click();
    await expect(this.profileModal).toBeVisible();
  }

  /**
   * Closes the User Profile via click on GNAV profile icon.
   * !Note: Only use after user was logged in!
   * @param  {none}
   * @return {Promise} PlayWright promise
   */
  async closeUserProfile() {
    await this.profileIcon.waitFor({ state: 'visible', timeout: 10000 });
    await this.profileIcon.click();
    await expect(this.profileModal).not.toBeVisible();
  }

  /**
   * Checks the elements of the User Profile component.
   * @param  {none}
   * @return {Promise} PlayWright promise
   */
  async checkUserProfile() {
    await expect(this.profileName).toBeVisible();
    await expect(this.profileEmail).toBeVisible();
    await expect(this.profileSignOut).toBeVisible();
    await expect(this.profileAccountLink).toBeVisible();
  }

  /**
   * Opens the search bar via click fron GNAV search icon.
   * @param  {none}
   * @return {Promise} PlayWright promise
   */
  async openSearchBar() {
    await this.searchIcon.waitFor({ state: 'visible', timeout: 10000 });
    await this.searchIcon.click();
    await expect(this.searchInput).toBeVisible();
  }

  /**
   * Closes the search bar via click fron GNAV search icon.
   * @param  {none}
   * @return {Promise} PlayWright promise
   */
  async closeSearchBar() {
    await this.closeSearch.waitFor({ state: 'visible', timeout: 10000 });
    await this.closeSearch.click();
    await expect(this.searchInput).not.toBeVisible();
  }
};
