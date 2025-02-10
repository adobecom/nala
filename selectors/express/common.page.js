export default class commonElements {
  constructor(page) {
    this.page = page;
    this.mainHeading = page.locator('h1');
    this.heading2 = page.locator('h2');
    this.heading3 = page.locator('h3');
    this.heading4 = page.locator('h4');
    this.heading5 = page.locator('h5');
    this.subheading = page.locator('.subheading');
    this.expressLogo = page.locator('.express-logo');

    // Marquee block
    this.marqueeBlock = page.locator('.ax-marquee');
    this.marqueeVideo = this.marqueeBlock.locator('video');
    this.marqueeText = page.locator('.marquee-foreground p[style]');
    this.marqueeButton = page.locator('.button-inline');

    // Gen AI cards
    this.genAICards = page.locator('.gen-ai-cards');
    this.genAICardsHeading = page.locator('.gen-ai-cards-heading');
    this.genAICardsCarouselPlatform = page.locator('.gen-ai-cards-cards .carousel-platform');
    this.genAICardsCarouselCard = this.genAICardsCarouselPlatform.locator('.card');
    this.genAICardsCarouselCardTitle = this.genAICardsCarouselCard.locator('.cta-card-title');
    this.genAICardsCarouselCardText = this.genAICardsCarouselCard.locator('.cta-card-desc');
    this.genAICardsCarouselCardImage = this.genAICardsCarouselCard.locator('img');
    this.genAICardsCarouselCardButton = this.genAICardsCarouselCard.locator(' > div > .con-button');

    // Discover cards
    this.discoverCardsBlock = page.locator('.discover-cards');
    this.discoverCardsHeading = this.discoverCardsBlock.locator('h2');
    this.discoverCardsHeading2 = this.discoverCardsBlock.locator('h3');
    this.discoverCard = this.discoverCardsBlock.locator('.card');
    this.discoverCardTitle = this.discoverCard.locator('h4');
    this.discoverCardText = this.discoverCard.locator('p');
    this.discoverCardImage = this.discoverCard.locator('img');
    this.discoverCardButton = this.discoverCard.locator('.button');
    this.discoverCardsGalleryControl = this.discoverCardsBlock.locator('.gallery-control');
    this.dicoverCardsControlPrev = this.discoverCardsGalleryControl.locator('.prev');
    this.dicoverCardsControlNext = this.discoverCardsGalleryControl.locator('.next');

    // Tutorials card
    this.tutorialsBlock = page.locator('.tutorials');
    this.tutorialCard = page.locator('.tutorial-card');
    this.tutorialCardPlayButton = page.locator('svg.icon.icon-play');
    this.tutorialCardDuration = page.locator('.tutorial-card-duration');
    this.tutorialCardText = page.locator('.tutorial-card-text');

    // Logo row
    this.logoRowBlock = page.locator('.logo-row');

    // Banner
    this.bannerBlock = page.locator('.banner');
    this.bannerText = this.bannerBlock.locator('h2');
    this.bannerButton = this.bannerBlock.locator('a');
    this.bannerLink = this.bannerBlock.locator('a');

    // Floating button
    this.floatingButtonBlock = page.locator('.floating-button');
    this.floatingButtonInvisibleClass = page.locator('.floating-button--intersecting');
    this.floatingButtonLink = this.floatingButtonBlock.locator('a');

    // Faas form
    this.faasForm = page.locator('#sales-contact-form-1');
    this.faasFormCloseButton = page.locator('.dialog-close');
    this.susiLightDialog = page.locator('.susi-light');
    this.susiLightDialogCloseButton = page.locator('.dialog-close');
  }
}
