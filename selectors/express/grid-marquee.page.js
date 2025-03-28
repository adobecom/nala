export default class GridMarquee {
  constructor(page) {
    this.page = page;
    this.gridMarquee = page.locator('.grid-marquee');
    this.expressLogo = this.gridMarquee.locator('.express-logo');
    this.headline = this.gridMarquee.locator('.headline');
    this.heading = this.headline.locator('h1');
    this.headlineText = this.headline.locator('p');
    this.ctas = this.headline.locator('.ctas');
    this.ctaButton = this.ctas.locator('a');
    this.cardsContainer = this.gridMarquee.locator('.cards-container');
    this.card = this.cardsContainer.locator('.card');
    this.cardFace = this.card.locator('.face');
    this.cardImage = this.cardFace.locator('picture img');
    this.cardDrawer = this.card.locator('.drawer');
    this.cardDrawerPanel = this.cardDrawer.locator('.panel');
    this.cardDrawerLink = this.cardDrawer.locator('a');
    this.ratings = this.gridMarquee.locator('.ratings');
    this.ratingsContainer = this.ratings.locator('.ratings-container');
    this.ratingsStar = this.ratings.locator('svg');
    this.ratingsButton = this.ratings.locator('a');
  }

  async gotoURL(url) {
    await this.page.goto(url);
    await this.page.waitForLoadState('domcontentloaded');
  }
}
