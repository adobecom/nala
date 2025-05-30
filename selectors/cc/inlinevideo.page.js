export default class inlinevideo {
  constructor(page) {
    this.page = page;
    this.inlineVideoFeature = page.locator('.video-container.video-holder').nth(1);
    this.inlineButtonCTA = page.locator('.offset-filler').nth(1);
    this.inlineVideo_Default_Play = this.inlineVideoFeature.locator('.offset-filler.is-playing');
    this.inlineVideo_Pause = page.locator('a.pause-play-wrapper[aria-label="Play motion 2 "][aria-pressed="false"]');
  }
}
