export default class AxMarquee {
  constructor(page) {
    this.page = page;
    this.subheading = page.locator('.subheading');
    this.expressLogo = page.locator('.express-logo');
    this.axmarquee = page.locator('.ax-marquee');
    this.mainHeading = this.axmarquee.locator('h1');
    this.video = this.axmarquee.locator('video');
    this.text = this.axmarquee.locator('.marquee-foreground p');
    this.reduceMotionWrapper = this.axmarquee.locator('.reduce-motion-wrapper');
    this.playAnimationText = this.axmarquee.locator('.play-animation-text');
    this.pauseAnimationText = this.axmarquee.locator('.pause-animation-text');
    this.reduceMotionPlayVideoBtn = this.axmarquee.locator('.icon-play-video');
    this.reduceMotionPauseVideoBtn = this.axmarquee.locator('.icon-pause-video');
    this.reduceMotionPlayVideoTxt = this.axmarquee.locator('.play-animation-text');
    this.reduceMotionPauseVideoTxt = this.axmarquee.locator('.pause-animation-text');
    this.ctaButton = this.axmarquee.locator('.button');
  }

  async gotoURL(url) {
    await this.page.goto(url);
    await this.page.waitForLoadState('domcontentloaded');
  }
}
