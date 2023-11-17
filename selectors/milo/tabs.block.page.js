export default class Tabs {
  constructor(page, nth = 0) {
    this.page = page;
    // tabs locators
    this.tab = this.page.locator('.tabs').nth(nth);
    this.xlTab = this.page.locator('.tabs.xl-spacing').nth(nth);
    this.queitDarkTab = this.page.locator('.tabs.quiet.dark.center').nth(nth);
    // tabs list
    this.tabList = this.tab.locator('.tablist');
    this.tabListContainer = this.tab.locator('.tab-list-container');
    this.tabsCount = this.tabListContainer.locator('button[role="tab"]');
    this.tab1 = this.tabListContainer.locator('button[role="tab"]').nth(0)
    this.tab2 = this.tabListContainer.locator('button[role="tab"]').nth(1)
    this.tab3 = this.tabListContainer.locator('button[role="tab"]').nth(2)
    // tabs panel and content
    this.tabContent = this.tab.locator('.tab-content');
    this.tab1Panel = this.tabContent.locator('div[role="tabpanel"]').nth(0)
    this.tab2Panel = this.tabContent.locator('div[role="tabpanel"]').nth(1)
    this.tab3Panel = this.tabContent.locator('div[role="tabpanel"]').nth(2)
  }
}


