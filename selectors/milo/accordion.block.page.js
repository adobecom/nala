export default class Accordion {
  constructor(page, nth = 0) {
    this.page = page;

    // accordion locators
    this.accordion = this.page.locator('.accordion-container').nth(nth);
    this.accordionForeground = this.accordion.locator('.foreground');
    this.accordionHeaders = this.accordion.locator('div[role=heading]');
    this.accordionButtons = this.accordion.locator('button');
    this.accordionButtonIcons = this.accordion.locator('.accordion-icon');
    this.outlineButton = this.accordion.locator('.con-button.outline').nth(nth);
    this.blueButton = this.accordion.locator('.con-button.blue').nth(nth);
    this.textLink = this.accordion.locator('//a[contains(text(), "Text link")]').nth(nth);

    // accordion blocks attributes
    this.attributes = {
      'accordion-container': { class: 'accordion-container con-block max-width-10-desktop' },
      'accordion-container.seo': { class: 'accordion-container seo con-block max-width-10-desktop' },
      'accordion-container-quiet-large': { class: 'accordion-container quiet max-width-12-desktop-large con-block' },
      analytics: {
        'accordion.daa-lh': { 'daa-lh': /b[1-9]|accordion-container|default|default/ },
        'section.daa-lh': { 'daa-lh': /s[1-9]/ },
        'content.daa-lh': { 'daa-lh': /b[1-9]|content|default|default/ },
      },
    };
  }
}
