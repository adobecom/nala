export default class PageNotFound {
  constructor(page) {
    this.page = page;
       
    // 404 fragment
    this.fragment = this.page.locator('.fragment').nth(0);
    this.header1Text = this.fragment.locator('#these-are-uncharted-waters');   
  }
}
