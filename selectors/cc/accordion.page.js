export default class accordion {
  constructor(page) {
    this.page = page;
    // Accordion UI elements in page
    this.accordionSection = page.locator('.accordion-container.seo.static-links.con-block.max-width-10-desktop');
    this.accordionName = this.accordionSection.locator('#accordion-1');
    this.accordionQuestion1 = this.accordionName.locator('//dt[@role="heading"]').nth(0);
    this.accordionDefinition1 = this.accordionName.locator('#accordion-1-trigger-1');
    this.accordionQuestion2 = this.accordionName.locator('//dt[@role="heading"]').nth(1);
    this.accordionDefinition2 = this.accordionName.locator('#accordion-1-trigger-2');
    this.DefaultState = this.accordionName.locator('//button[@id="accordion-1-trigger-1" and @aria-expanded="false"]');
    this.accordexpanded = this.accordionName.locator('//button[@id="accordion-1-trigger-1" and @aria-expanded="true"]');
    this.firstQuestionLink = page.locator('//a[@daa-ll="Learn more about the-2--What is Adobe Creati"]');
  }
}
