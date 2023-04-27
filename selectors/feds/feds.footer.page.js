/* eslint-disable import/no-import-module-exports */
import { expect } from '@playwright/test';

exports.FedsFooter = class FedsFooter {
  constructor(page) {
    this.page = page;

    // FOOTER - Containers:
    this.FooterContainer = page.locator('#feds-footernav');
    this.AdobeContainer = page.locator('#feds-footer #Globalnav\\.Adobe');
    this.SupportContainer = page.locator('#feds-footer #Globalnav\\.Support');
    this.ProductsContainer = page.locator('#feds-footer #Globalnav\\.Products');
    this.BlogsContainer = page.locator('#feds-footer #Globalnav\\.Blogs_Community');
    this.ItemsContainer = page.locator('footer ul li.feds-navList-item:nth-of-type(2)');

    // FOOTER - Breadcrumb:
    this.BreadcrumbLogo = page.locator('.feds-breadcrumbs-logo');
    this.BreadcrumbList = page.locator('.feds-breadcrumbs-items');
    this.BreadcrumbElems = page.locator$('.feds-breadcrumbs-element');

    // FOOTER - Social-Media Icons:
    this.SocialIcons = page.locator$('ul[daa-lh="Social"] li');
    this.TwitterIcon = page.locator('a[daa-ll*="Twitter"] span');
    this.LinkedInIcon = page.locator('a[daa-ll*="LinkedIn"] span');
    this.FacebookIcon = page.locator('a[daa-ll*="Facebook"] span');
    this.InstagramIcon = page.locator('a[daa-ll*="Instagram"] span');
    this.SocialIconsContainer = page.locator('ul[daa-lh="Social"]');

    // FOOTER - Legacy Downloads:
    this.DownloadAir = page.locator('#Globalnav\\.Adobe_AIR');
    this.DownloadFlashPlayer = page.locator('#Globalnav\\.Adobe_Flash_Player');
    // FOOTER - Featured Downloads:
    this.DownloadPhotoshop = page.locator('#feds-footer a[daa-ll*="Photoshop"]');
    this.DownloadIllustrator = page.locator('#feds-footer a[daa-ll*="Illustrator"]');
    this.DownloadAcrobatReader = page.locator('#feds-footer a[daa-ll*="Adobe_Acrobat_Reader"]');

    // FOOTER - Copyright Banner:
    this.TermsLink = page.locator('a[daa-ll^="Term"]');
    this.PrivacyLink = page.locator('a[daa-ll^="Privacy"]');
    this.CookiesLink = page.locator('a[daa-ll^="Cookies"]');
    this.AdChoicesLogo = page.locator('a[daa-ll^="AdChoices"]');
    this.AdChoicesLink = page.locator('a[data-feds-action="open-adchoices-modal"] span.feds-navLink-contentWrapper');
    this.CopyrightBanner = page.locator('#feds-footernav [daa-lh*="Copyright"]');

    this.RegionPickerBtn = page.locator('a.feds-regionPicker');
    this.RegionPickerModal = page.locator('nav.language-Navigation');
    this.RegionPickerClose = page.locator('a.dexter-CloseButton');
  }

  // >> FEDS Footer methods declared here <<
};
