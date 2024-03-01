export default class cchometabs {
  constructor(page) {
  this.page = page;
  // cc home page tabs UI elements in page
  this.tabsBlock = page.locator('.tabList').first();
  this.tabsList = page.locator('tab-list-container').first();
  this.defaultSelectedTab = this.tabsList.locator('//button[@aria-selected="true" and @daa-ll="Overview-1--"]');
  this.secondTabSelected = this.tabsList.locator('//button[@aria-selected="true" and @daa-ll="Photo-2--"]');
  this.thirdTabSelected = this.tabsList.locator('//button[@aria-selected="true" and @daa-ll="Design-3--"]');
  this.fourthTabSelected = this.tabsList.locator('//button[@aria-selected="true" and @daa-ll="Video-4--"]');
  this.firstTab = page.locator('#tab-l-pills-1');
  this.secondTab = page.locator('#tab-l-pills-2');
  this.thirdTab = page.locator('#tab-l-pills-3');
  this.fourthTab = page.locator('#tab-l-pills-4');
  this.tabbodyContainer = page.locator('.tab-content-container').first();
  this.firstTabContainer = this.tabbodyContainer.locator('//div[@id="tab-panel-l-pills-1" and hidden="true"]');
  this.firstBodyHeading = this.tabbodyContainer.locator('#explore-our-most-popular-apps-for-creating-anything-you-can-imagine');
  this.secondBodyHeading = this.tabbodyContainer.locator('#Take your photos from good to gorgeous.');
  this.thirdBodyHeading = this.tabbodyContainer.locator('#Create dazzling designs for print, online, or anywhere.');
  this.fourthBodyHeading = this.tabbodyContainer.locator('Make your ideas move with video, animation, and special effects.');
  this.firstTabContent = page.locator('#create-edit-review-and-sign-pdfs');
  this.thirdTabContent = page.locator('#best-for-creating-gorgeous-images-rich-graphics-and-incredible-art');
}
};
