exports.TreeView = class TreeView {
  constructor(page) {
    this.page = page;
    this.firstAccordion = page.locator('li[role=menuitem]:first-of-type');
    this.firstAccordionButton = page.locator(
      'li[role=menuitem]:first-of-type > button',
    );
    this.firstAccordionFirstItem = page.locator(
      'li[role=menuitem]:first-of-type > ul > li:first-of-type > a',
    );
  }

  /**
   * @returns the first accordion's expanded state
   */
  async getFirstAccordionState() {
    const expanded = await this.firstAccordion.getAttribute('aria-expanded');
    return expanded;
  }
};
