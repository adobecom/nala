import { expect } from '@playwright/test';
import FedsFooter from './feds.footer.page.js';

export default class BlogSanity {
  constructor(page) {
    this.page = page;
    this.footer = new FedsFooter(page);

    // G-Nav
    this.adobeBrandLogo = page.locator('a.gnav-brand.logo');
    this.adobeBrandTitle = page.locator('span.gnav-brand-title');

    this.news = page.locator('.gnav-navitem.has-menu').nth(0);
    this.insightsAndInspirations = page.locator('.gnav-navitem.has-menu').nth(1);
    this.digitalTransformation = page.locator('.gnav-navitem').nth(1);
    this.responsibility = page.locator('.gnav-navitem.has-menu').nth(2);
    this.adobeLife = page.locator('.gnav-navitem.has-menu').nth(3);
    this.moreAdobeBlogs = page.locator('.gnav-navitem.has-menu').nth(4);

    this.gnavSearch = page.locator('.gnav-search.contextual');
    this.signInBtn = page.locator('.gnav-profile');
    this.gnavLogo = page.locator('.gnav-logo');

    // News Elements
    this.productAndCompanyUpdates = page.locator('.gnav-navitem-menu [href*="/en/topics/news"]');
    this.topPage = page.locator('.gnav-navitem-menu [href*="topics/creativity"]');

    // Insights & Inspirations
    this.creativity = page.locator('.gnav-navitem-menu [href*="/en/topics/creativity"]');

    // Responsibility
    this.diversityAndInclusion = page.locator('.gnav-navitem-menu [href*="diversity--inclusion"]');
    this.topPageDD = page.locator('.gnav-navitem-menu [href*="topics/digital-document"]');

    // Adobe Life
    this.adobeCulture = page.locator('.gnav-navitem-menu [href*="adobe-culture"]');
    this.topPageCN = page.locator('.gnav-navitem-menu [href*="topics/corporate-news"]');

    // More Adobe Blogs
    this.adobeExperienceCloudBlog = page.locator('.gnav-navitem-menu [href*="adobe.com/blog/"]');

    // Change Region
    this.japan = page.locator('[href*="/jp/"]');
    this.us = page.locator('[href="/"]').nth(5);
  }

  // United States Page
  async validatingUSPage() {
    await this.validatingGnav();

    await this.news.click();
    await expect(this.productAndCompanyUpdates).toBeVisible();

    await this.insightsAndInspirations.click();
    await expect(this.creativity).toBeVisible();

    await this.responsibility.click();
    await expect(this.diversityAndInclusion).toBeVisible();

    await this.adobeLife.click();
    await expect(this.adobeCulture).toBeVisible();

    await this.moreAdobeBlogs.click();
    await expect(this.adobeExperienceCloudBlog).toBeVisible();
    await this.moreAdobeBlogs.click();

    await this.validatingFooterPrivacySection();
    await this.validatingRegionPicker();

    await this.footer.changeRegionButton.click();
    await this.japan.click();
  }

  // Japan Page
  async validatingJPPage() {
    await this.validatingJPGnav();

    await this.news.click();
    await expect(this.topPage).toBeVisible();

    await this.insightsAndInspirations.click();
    await expect(this.topPageDD).toBeVisible();

    await this.responsibility.click();
    await expect(this.topPageCN).toBeVisible();
    await this.responsibility.click();

    await this.validatingFooterPrivacySection();
    await this.validatingRegionPicker();

    await this.footer.changeRegionButton.click();
    await this.us.click();
  }

  // Validation Of Gnav
  async validatingGnav() {
    const elements = [this.adobeBrandLogo, this.adobeBrandTitle, this.news, this.insightsAndInspirations,
      this.responsibility, this.adobeLife, this.moreAdobeBlogs, this.gnavSearch, this.signInBtn, this.gnavLogo];
    await Promise.all(elements.map((element) => expect(element).toBeVisible()));
  }

  async validatingJPGnav() {
    const elements = [this.adobeBrandTitle, this.news, this.insightsAndInspirations, this.responsibility,
      this.digitalTransformation, this.gnavSearch, this.signInBtn, this.gnavLogo];
    await Promise.all(elements.map((element) => expect(element).toBeVisible()));
  }

  // Validation Of Footer
  async validatingFooterPrivacySection() {
    const elements = [this.footer.legalCopyright, this.footer.privacyLink, this.footer.termsOfUseLink,
      this.footer.cookiePreferencesLink, this.footer.doNotSellInformationLink, this.footer.adChoicesLink,
      this.footer.adChoicesLogo];
    await Promise.all(elements.map((element) => expect(element).toBeVisible()));
  }

  // Validating Region Picker
  async validatingRegionPicker() {
    const elements = [this.footer.changeRegionContainer, this.footer.changeRegionButton];
    await Promise.all(elements.map((element) => expect(element).toBeVisible()));
  }
}
