export default class fragmentreference {
  constructor(page) {
  this.page = page;
  // cc pages have fragment references
  this.pageFragment = page.locator('.fragment').first();
  this.fragmentHeading = this.pageFragment.locator('#pick-a-plan-to-start-creating');
  this.fragmentSection = page.locator('.section.xl-spacing.three-merch-cards.grid-width-10.mini-compare-chart');
  this.fragmentProduct1 = this.fragmentSection.locator('#all-appsprice---abm---creative-cloud-all-apps-100gb');
  this.fragmentProduct2 = this.fragmentSection.locator('#photographyprice---abm---creative-cloud-photography-plan-with-1tb');
  this.fragmentProduct3 = this.fragmentSection.locator('#single-appprice---abm---photography-plan-20gb');
}
};
