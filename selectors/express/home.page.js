export default class homePage {
  constructor(page) {
    this.page = page;
    this.marqueeBlock = page.locator('.grid-marquee');
    this.headline = page.locator('.headline');
    this.ctas = page.locator('.ctas');
    this.ctaButton = this.ctas.locator('a');
    this.card = page.locator('button.card');
    this.cardFace = this.card.locator('.face');
    this.cardImage = this.cardFace.locator('picture img');
    this.cardDrawer = this.card.locator('.drawer');
    this.cardDrawerLink = this.cardDrawer.locator('a');
    this.cardDrawerPanel = page.locator('button.card > .drawer .panel');
    this.ratingsBlock = page.locator('.grid-marquee.ratings .ratings');
    this.ratingsContainer = this.ratingsBlock.locator('.ratings-container');
    this.ratingsStar = this.ratingsBlock.locator('svg');
    this.ratingsButton = this.ratingsBlock.locator('a');
    this.quotesBlock = page.locator('.quotes');
    this.quotesAuthorPhoto = page.locator('.quote .author-photo img');
    this.quotesAuthorDescription = page.locator('.quote .author-description');
    this.quotesQuoteComment = page.locator('.quote .quote-comment');
    this.pricingCardBlock = page.locator('.simplified-pricing-cards');
    this.comparePlansHeading = page.locator('#compare-adobe-express-plans');
    this.pricingCard = this.pricingCardBlock.locator('.card');
    this.pricingCardPlanExplanation = this.pricingCard.locator('.plan-explanation');
    this.pricingCardButton = this.pricingCard.locator('.button');
    this.pricingCardPricingArea = this.pricingCard.locator('.pricing-area');
    this.pricingCardPricingAreaText = this.pricingCardPricingArea.locator('p');
    this.pricingFooter = page.locator('.pricing-footer');
    this.pricingFooterLink = this.pricingFooter.locator('div > a');
    this.compareAllPlansButton = page.getByRole('link', { name: 'Compare all plans' });
    this.start30DayFreeTrialButton = page.getByRole('link', { name: 'Start 30-day free trial' });
    this.getAdobeAccessFreeButton = page.getByRole('link', { name: 'Get Adobe Express free' });
    this.start14DayFreeTrialButton = page.getByRole('link', { name: 'Start 14-day free trial' });
    this.requestInformationButton = page.getByRole('link', { name: 'Request information' });
  }
}
