export default class Table {
  constructor(page, nth = 0) {
    this.page = page;
    // tabel locators
    this.table = this.page.locator('.table').nth(nth);
    this.highlightTable = this.page.locator('.table.highlight').nth(nth);
    this.stickyTable = this.page.locator('.table.sticky').nth(nth);
    this.collapseStickyTable = this.page.locator('.table.highlight.collapse.sticky').nth(nth);
    this.merchTable = this.page.locator('.table.merch').nth(nth);
    this.merchHighlightStickyTable = this.page.locator('.table.merch.highlight.sticky').nth(nth);

    this.highlightRow = this.table.locator('.row-highlight');
    this.headingRow = this.table.locator('.row-heading');
    this.stickyRow = this.table.locator('.row-heading');

    this.headingRowColumns = this.headingRow.locator('.col');
    this.rows = this.table.locator('.row');
    this.sectionRows = this.table.locator('.section-row');
  }

  // get highlight row column locator
  async getHighlightRowColumnTitle(colIndex) {
    return await this.highlightRow.locator(`.col-highlight`).nth(colIndex);
  }

  // get header row column title locator
  async getHeaderColumnTitle(colIndex) {
    const headerColumn =  await this.headingRow.locator(`.col-${colIndex}`);
    return headerColumn.locator(`.tracking-header`);
  }

  // get header row column price ('p') locator
  async getHeaderColumnPricing(colIndex) {
    const headerColumn =  await this.headingRow.locator(`.col-${colIndex}`);
    return headerColumn.locator(`.pricing`);
  }

  // get header row column image (merch-table) locator
  async getHeaderColumnImg(colIndex) {
    const headerColumn =  await this.headingRow.locator(`.col-${colIndex}`);
    return headerColumn.locator(`img`);
  }

  // get header row column additional text price ('p') locator
  async getHeaderColumnAdditionalText(colIndex) {
    const headerColumn =  await this.headingRow.locator(`.col-${colIndex}`);
    return headerColumn.locator(`p`).nth(3);
  }

  // get header row column action buttons (outline) locator
  async getHeaderColumnOutlineButton(colIndex) {
    const headerColumn =  await this.headingRow.locator(`.col-${colIndex}`);
    return headerColumn.locator(`.con-button.outline`);
  }

  // get header row column action buttons (blue) locator
  async getHeaderColumnBlueButton(colIndex) {
    const headerColumn =  await this.headingRow.locator(`.col-${colIndex}`);
    return headerColumn.locator(`.con-button.blue`);
  }

  // get section row title locator
  async getSectionRowTitle(index) {
    const sectionRow = await this.table.locator(`.section-row`).nth(index);
    return sectionRow.locator(`.section-row-title`);     
  }

  // get section row merch content locator
  async getSectionRowMerchContent(index) {
    const sectionRow = await this.table.locator(`.section-row`).nth(index);
    return sectionRow.locator(`.col-merch-content`).nth(0);     
  }

  // get section row merch content locator
  async getSectionRowMerchContentImg(index) {
    const sectionRow = await this.table.locator(`.section-row`).nth(index);
    return sectionRow.locator(`.col-merch-content img`);     
  }

  // get table cell data locator
  async getSectionRowCell(rowIndex, colIndex) {
    const sectionRow = await this.table.locator(`.section-row`).nth(rowIndex);
    return sectionRow.locator(`.col-${colIndex}`)
  }
}


