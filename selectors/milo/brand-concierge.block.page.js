export default class BrandConciergeBlock {
  constructor(page) {
    this.page = page;

    // Core block container (default / inline variant)
    this.block = this.page.locator('.brand-concierge').first();

    // Block variants
    this.brandConciergeHero = this.page.locator('.brand-concierge.hero');
    this.brandConciergeInline = this.page.locator('.brand-concierge.inline');
    this.floatingButtonOnly = this.page.locator('.brand-concierge.floating-button-only');

    // Floating button elements
    this.floatingButton = this.page.locator('.bc-floating-button').first();
    this.floatingButtonContainer = this.page.locator('.bc-floating-button-container').first();
    this.floatingButtonInput = this.page.locator('.bc-floating-input').first();
    this.floatingButtonHidden = this.page.locator('.bc-floating-button.floating-hidden');
    this.floatingButtonVisible = this.page.locator('.bc-floating-button.floating-show');

    // Modal elements
    this.modal = this.page.locator('#brand-concierge-modal');
    this.modalMount = this.page.locator('#brand-concierge-mount');
    this.modalCloseButton = this.page.locator('#brand-concierge-modal .dialog-close');

    // Inline input field (default / hero variants)
    this.inputField = this.block.locator('textarea, input[type="text"]');

    // Suggested prompt / pill buttons in inline surface
    this.promptButtons = this.block.locator('.prompt-card-button, button, a[role="button"]');

    // Web client script loader
    this.webClientScript = this.page.locator(
      'script[src*="adobe-brand-concierge-acom-brand-concierge-web-agent/static-assets/main.js"], '
      + 'script[src*="experience-platform-brand-concierge-web-agent/static-assets/main.js"]',
    );
  }
}
