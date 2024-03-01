export default class breadcrumb {
  constructor(page) {
  this.page = page;
  // breadcrumb UI elements in page
  this.breadCrumbSection = page.locator('.feds-breadcrumbs');
  this.breadCrumbFirstLevel = this.breadCrumbSection.locator('.feds-breadcrumbs li').nth(0); 
  this.breadCrumbSecondLevel = this.breadCrumbSection.locator('.feds-breadcrumbs li').nth(1); 
  this.breadCrumbThirdLevel = this.breadCrumbSection.locator('.feds-breadcrumbs li').nth(2);
  this.currentPageIndicator = this.breadCrumbSection.locator('//li[@aria-current="page"]'); 
  this.firstLevelLink = page.locator('//a[@href="https://www.adobe.com/"]').nth(1);
  this.pageParentLink = page.locator('//a[@href="https://www.adobe.com/products/photoshop.html"]').nth(1);
}
};
