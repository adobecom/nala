export default class merchtable {
  constructor(page) {
    this.page = page;
   // merch table page UI selectors to check 3 column layout
   this.merchTableSection = page.locator('.section.table-merch-section');
   this.firstColumn = this.merchTableSection.locator('.col.col-1.col-heading');
   this.secondColumn = this.merchTableSection.locator('.col.col-2.col-heading.light');
   this.thirdColumn = this.merchTableSection.locator('.col.col-3.col-heading.dark');
   this.productMnemonics = page.locator('//img[@src="./media_139dede8055046fb80034053bbe235aaadc823b7a.png?width=750&format=png&optimize=medium"]').first();
   //@merchtable-headrowitems
   this.FirstRowHeading = page.locator('.row.row-1.row-heading');
   this.firstColumnHeading = this.FirstRowHeading.locator('.col.col-1.col-heading');
   this.secondColumnHeading = this.FirstRowHeading.locator('.col.col-2.col-heading.light');
   this.thirdColumnHeading = this.FirstRowHeading.locator('.col.col-3.col-heading.dark');
   this.fixedColumnheading = page.locator('//div[@class="section-head-title col col-1"]//strong[text()="Includes:"]');
   //@merchtable-rowheadprices
   this.ccIndividaulProductPrice = page.locator('.price.price-optical').nth(0);
   this.ccStudentProductPrice = page.locator('.price.price-optical').nth(1);
   this.ccTeamsProductPrice = page.locator('.price').nth(2);
   this.freeTrialBtn = page.locator('.con-button.outline.button-l').first();
   this.buyNowBtn = page.locator('.con-button.blue.button-l').first();
   //@merchtable-appdetails
   this.listOfAppsInRows1 = page.locator('.col-merch-content').nth(0);
   this.appPhotoshop = this.listOfAppsInRows1.locator('//p[text()="Photoshop"]').nth(0);
   this.listOfAppsInRows2 = page.locator('.col-merch-content').nth(4);
   this.appFresco = this.listOfAppsInRows1.locator('//p[text()="fresco"]').nth(1);
   this.listOfAppsInRows3 = page.locator('.col-merch-content').nth(8);
   this.appPhotoshopExpress = this.listOfAppsInRows1.locator('//p[text()="Photoshop Express"]').nth(2);
}
};
