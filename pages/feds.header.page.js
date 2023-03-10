import { FedsPage } from './feds.page';
import { expect } from '@playwright/test';

exports.FedsHeader = class FedsHeader extends FedsPage {

  constructor(page) {
    super();
    this.page = page;
    this.page.props = {
      lsKeyName: 'feds-notifications_en',
      components: {
        'NavBar': '#feds-topnav',
        'subnav': '#AdobeSecondaryNav',
        'NavDrawer': 'div.feds-drawer',
        'NavList': 'div.feds-navList-wrapper--main',
        'Localnav': 'div[data-feds-element="localnav"]',
        'breadcrumbs': 'div.feds-breadcrumbs',
        'regionPicker': 'a.feds-regionPicker',
      },
      headerData: {},
      pageClouds: []
    };

    // MegaMenu selectors:
    this.MegaMenuContainer = page.locator('#feds-header .feds-popup--open');
    this.MegaMenuItems = page.locator('#feds-header .feds-popup--open h5 + ul li');
    this.MegaMenuProducts = page.locator('#feds-header .feds-popup--open h5 + ul li a');
    this.MegaMenuProductLists = page.locator('#feds-header .feds-popup--open h5 + ul');
    this.MegaMenuAllLinks = page.locator('#feds-header .feds-popup--open a[class="feds-navLink"]');
    
    // MainNav selectors:
    this.HeaderCloud = page.locator('ul[data-feds-keyboardnavigationenabled] > li[id^="Globalnav"]');
    this.HeaderCloudItems = page.locator('ul[data-feds-keyboardnavigationenabled] > li[id^="Globalnav"]');
    this.MainNavLogo = page.locator('a.feds-logo');
    this.MainNavContainer = page.locator('#feds-topnav');
    this.MainNavItem = page.locator('div.feds-navList-wrapper--main li');
    this.MainNavItemList = page.locator('div.feds-navList-wrapper--main');
    this.MainNavSticky = page.locator('div[style^="transform: translateY"]');
    this.MainNavItemsContainer = page.locator('#feds-topnav ul li.feds-navList-item:nth-of-type(2)');

    this.SubNavContainer = page.locator('#AdobeSecondaryNav');
    this.SubNavLogo = page.locator('a.Subnav-logo');
    this.SubNavItems = page.locator('.Subnav-menu-item');
    this.SubNavItemList = page.locator('.Subnav-menu');
    this.MenuOptionsContainer = page.locator('div.Gnav-menu-content');

    // MainNav action icon selectors:
    this.SignInLabel = page.locator('a.feds-login');
    this.SignInLink = page.locator('li#Globalnav\\.Sign_In.feds-hideOnMobile a');
    this.RegisterLink = page.locator('li#Globalnav\\.Register.feds-hideOnMobile a');
    this.SearchIcon = page.locator('button.feds-search-trigger');
    this.SearchInput = page.locator('input.feds-search-input');
    this.CloseSearch = page.locator('span.feds-search-close');
    this.SearchResults = page.locator('#feds-search-results');
    this.AdvancedSearchLink = page.locator('#feds-search-results li a');

    this.ProfileIcon = page.locator('a.Profile-thumbnail');
    this.ProfileEmail = page.locator('.Profile-data .Profile-email');
    this.ProfileName = page.locator('.Profile-data .Profile-name');
    this.ProfileModal = page.locator('div.Profile-dropdown');
    this.ProfileSignOut = page.locator('a[data-profile="sign-out"]');

    this.AppLauncherIcon = page.locator('span.app-launcher-icon');
    this.AppLauncherModal = page.locator('div.spectrum-Dialog-content');
    this.AppLauncherInfoIcon = page.locator('span.info-icon');
    this.AppLauncherCloudApps = page.locator('div.cloud-apps');
    this.AppLauncherPrimaryApps = page.locator('div.primary-apps');
    this.AppLauncherMoreApps = page.locator('div.more-apps');

    // MainNav item selectors:
    this.CreativityDesign = page.locator('a[daa-ll^="Creativity"]');
    this.MarketingCommerce = page.locator('a[daa-ll^="Marketing"]');
    this.BusinessSolutions = page.locator('a[daa-ll^="Business"]');
    this.PDFeSignatures = page.locator('a[daa-ll^="PDF"]');
    this.LimitedOffers = page.locator('a[daa-ll^="Limited"]');
    this.HelpSupport = page.locator('a[daa-ll^="Help"]');
    this.Community = page.locator('a[daa-ll^="Community"]');
    this.Support = page.locator('a[daa-ll^="Support"]');

    // MainNav drop-downs:
    this.CreativityDesignSubmenu = page.locator('a[daa-ll^="Creativity"] + .feds-popup--open');
    this.MarketingCommerceSubmenu = page.locator('a[daa-ll^="Marketing"] + .feds-popup--open');
    this.BusinessSolutionsSubmenu = page.locator('a[daa-ll^="Business"] + .feds-popup--open');
    this.PDFeSignaturesSubmenu = page.locator('a[daa-ll^="PDF"] + .feds-popup--open');
    this.LimitedOffersSubmenu = page.locator('a[daa-ll^="Limited"] + .feds-popup--open');
    this.HelpSupportSubmenu = page.locator('a[daa-ll^="Help"] + .feds-popup--open');
    this.CommunitySubmenu = page.locator('a[daa-ll^="Community"] + .feds-popup--open');
    this.SupportSubmenu = page.locator('a[daa-ll^="Support"] + .feds-popup--open');
    this.MegaMenu = page.locator('.feds-popup--open');

    // Notification selectors:
    this.NotificationsList = page.locator('ul.feds-notifications-list');
    this.NotificationItems = page.locator('ul.feds-notifications-list li');
    this.NotificationsIcon = page.locator('button.feds-notifications-trigger');
    this.NotificationsCounter = page.locator('span#feds-notifications-counter');
    this.NotificationsDropdown = page.locator('div.feds-notifications-dropdown');
    this.NotificationsEmptyState = page.locator('div.feds-notifications-emptyView');

    this.NotificationTimer = page.locator('div.feds-notification-time');
    this.NotificationTitle = page.locator('div.feds-notification-title');
    this.NotificationContent = page.locator('div.feds-notification-content');
    this.NotificationDescription = page.locator('div.feds-notification-description');

    this.FirstNotification = page.locator('ul.feds-notifications-list li:nth-child(1)');
    this.SecondNotification = page.locator('ul.feds-notifications-list li:nth-child(2)');
    this.ThirdNotification = page.locator('ul.feds-notifications-list li:nth-child(3)');

    // Header - Breadcrumb:
    this.BreadcrumbList = page.locator('.feds-breadcrumbs-items');
    this.BreadcrumbElems = page.locator('.feds-breadcrumbs-element');

    // Miscellaneous selectors:
    this.FedsOverlay = page.locator('span.feds-search-curtain');
  }

  async openSearchBar() {
    await this.SearchIcon.waitFor('visible');
    await this.SearchIcon.click();
    await expect(this.SearchInput).toBeVisible();
  }

  async closeSearchBar() {
    await this.CloseSearch.waitFor('visible');
    await this.CloseSearch.click();
    await expect(this.SearchInput).not.toBeVisible();
  }
};
