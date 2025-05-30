export default class AxColumns {
  constructor(page) {
    this.page = page;

    this.axColumns = page.locator('.ax-columns');
    this.axColumnsCenterVariant = page.locator('.ax-columns.center');
    this.axColumnsHighlightVariant = page.locator('.ax-columns.highlight');
    this.axColumnsCenteredVariant = page.locator('.ax-columns.centered');
    this.axColumnsTopCenterVariant = page.locator('.ax-columns.top');
    this.axColumnsFullsizeVariant = page.locator('.ax-columns.fullsize');
    this.axColumnsFullsizeCenterVariant = page.locator('.ax-columns.fullsize-center');
    this.axColumnsDarkVariant = page.locator('.ax-columns.dark');
    this.axColumnsLightVariant = page.locator('.ax-columns.light');
    this.axColumnsNumbered30Variant = page.locator('.ax-columns.numbered-30');

    // center variant
    this.centerVariantHeading = this.axColumnsCenterVariant.locator('h2');
    this.centerVariantContent = this.axColumnsCenterVariant.locator('p');

    // highlight variant
    this.highlightVariantColumn = this.axColumnsHighlightVariant.locator('.column');
    this.highlightVariantColumnPicture = this.axColumnsHighlightVariant.locator('.column-picture');
    this.highlightVariantPicture = this.axColumnsHighlightVariant.locator('picture');
    this.hightlightVariantImage = this.highlightVariantPicture.locator('img');
    this.highlightVariantColumnHeading = this.highlightVariantColumn.locator('h4');
    this.highlightVariantColumnContent = this.axColumnsHighlightVariant.locator('p');
    this.highlightVariantWatchNowButton = this.axColumnsHighlightVariant.getByRole('link', { name: 'Watch now' });
    this.highlightVariantAlternativeVideoSourceWebMButton = this.axColumnsHighlightVariant.getByRole(
      'link',
      { name: 'Alternative video source (WebM)' },
    );
    this.highlightVariantAlternateVideoSourceMP4Button = this.axColumnsHighlightVariant.getByRole(
      'link',
      { name: 'Alternate video source (MP4)' },
    );

    // centered variant
    this.centeredVariantColumnsVideo = this.axColumnsCenteredVariant.locator('.columns-video');
    this.centeredVariantColumn = this.axColumnsCenteredVariant.locator('.column');
    this.centeredVariantColumnVideo = this.axColumnsCenteredVariant.locator('.column-video');
    this.centeredVariantColumnPicture = this.axColumnsCenteredVariant.locator('.column-picture');
    this.centeredVariantColumnHeading = this.centeredVariantColumn.locator('h2');
    this.centeredVariantColumnContent = this.centeredVariantColumn.locator('p');
    this.centeredVariantVideo = this.centeredVariantColumnVideo.locator('video');
    this.centeredVariantPicture = this.centeredVariantColumnPicture.locator('picture');
    this.centeredVariantImage = this.centeredVariantPicture.locator('img');

    // top center variant
    this.topCenterVariantColumn = this.axColumnsTopCenterVariant.locator('.column');
    this.topCenterVariantColumnHeading = this.topCenterVariantColumn.locator('h3');
    this.topCenterVariantContent = this.topCenterVariantColumn.locator('p');
    this.topCenterVariantPicture = this.topCenterVariantColumn.locator('picture');

    // fullsize variant
    this.fullsizeVariantColumn = this.axColumnsFullsizeVariant.locator('.column');
    this.fullsizeVariantColumnHeading = this.fullsizeVariantColumn.locator('h1');
    this.fullsizeVariantColumnContent = this.fullsizeVariantColumn.locator('p');
    this.fullsizeVariantDesignNowButton = this.fullsizeVariantColumn.getByRole('link', { name: 'Design now' });
    this.fullsizeVariantColumnPicture = this.fullsizeVariantColumn.locator('.column-picture');
    this.fullsizeVariantPicture = this.fullsizeVariantColumn.locator('picture');
    this.fullsizeVariantImage = this.fullsizeVariantPicture.locator('img');

    // fullsize-center variant
    this.fullsizeCenterVariantColumnsVideo = this.axColumnsFullsizeCenterVariant.locator('.columns-video');
    this.fullsizeCenterVariantColumn = this.axColumnsFullsizeCenterVariant.locator('.column');
    this.fullsizeCenterVariantColumnHeading = this.fullsizeCenterVariantColumn.locator('h1');
    this.fullsizeCenterVariantColumnContent = this.fullsizeCenterVariantColumn.locator('p');
    this.fullsizeCenterVariantMakeYourLogoNowButton = this.fullsizeCenterVariantColumn.getByRole('link', { name: 'Make your logo now' });
    this.fullsizeCenterVariantColumnVideo = this.axColumnsFullsizeCenterVariant.locator('.column-video');
    this.fullsizeCenterVariantVideo = this.axColumnsFullsizeCenterVariant.locator('video');

    // dark variant
    this.darkVariantColumn = this.axColumnsDarkVariant.locator('.column');
    this.darkVariantColumnPicture = this.axColumnsDarkVariant.locator('.column-picture');
    this.darkVariantPicture = this.darkVariantColumnPicture.locator('picture');
    this.darkVariantImage = this.darkVariantPicture.locator('img');

    // light variant
    this.lightVariantColumn = this.axColumnsLightVariant.locator('.column');
    this.lightVariantColumnPicture = this.axColumnsLightVariant.locator('.column-picture');
    this.lightVariantPicture = this.lightVariantColumnPicture.locator('picture');
    this.lightVariantImage = this.lightVariantPicture.locator('img');
    this.lightVariantColumnHeading = this.lightVariantColumn.locator('h2');
    this.lightVariantColumnContent = this.lightVariantColumn.locator('p');
    this.lightVariantStartNowItsFreeButton = this.lightVariantColumn
      .getByRole('link', { name: 'Start now - it’s free' });

    // numbered-30 variant
    this.numbered30VariantColumn = this.axColumnsNumbered30Variant.locator('.column');
    this.numbered30VariantColumnPicture = this.axColumnsNumbered30Variant.locator('.column-picture');
    this.numbered30VariantPicture = this.numbered30VariantColumnPicture.locator('picture');
    this.numbered30VariantImage = this.numbered30VariantPicture.locator('img');
    this.numbered30VariantColumnHeading = this.numbered30VariantColumn.locator('h2');
    this.numbered30VariantContent = this.numbered30VariantColumn.locator('p');

    this.globalFooter = page.locator('.global-footer');
  }

  async gotoURL(url) {
    await this.page.goto(url);
    await this.globalFooter.waitFor();
  }

  async scrollToAxColumns() {
    await this.page.waitForLoadState('domcontentloaded');
    await this.axColumns.first().scrollIntoViewIfNeeded(2000);
  }

  async clickHighlightVariantWatchNowButton() {
    await this.page.waitForLoadState('domcontentloaded');
    if (this.highlightVariantWatchNowButton.first()) {
      await this.highlightVariantWatchNowButton.first().click();
    }
  }

  async clickAlternativeVideoSourceWebMButton() {
    await this.page.waitForLoadState('domcontentloaded');
    if (this.highlightVariantAlternativeVideoSourceWebMButton.first()) {
      await this.highlightVariantAlternativeVideoSourceWebMButton.first().click();
    }
  }

  async clickAlternateVideoSourceMP4Button() {
    await this.page.waitForLoadState('domcontentloaded');
    if (this.highlightVariantAlternateVideoSourceMP4Button.first()) {
      await this.highlightVariantAlternateVideoSourceMP4Button.first().click();
    }
  }

  async clickFullsizeVariantDesignNowButton() {
    await this.page.waitForLoadState('domcontentloaded');
    if (this.fullsizeVariantDesignNowButton.first()) {
      await this.fullsizeVariantDesignNowButton.first().click();
    }
  }

  async clickFullsizeCenterVariantMakeYourLogoNowButton() {
    await this.page.waitForLoadState('domcontentloaded');
    if (this.fullsizeCenterVariantMakeYourLogoNowButton.first()) {
      await this.fullsizeCenterVariantMakeYourLogoNowButton.first().click();
    }
  }

  async clickLightVariantStartNowItsFreeButton() {
    await this.page.waitForLoadState('domcontentloaded');
    if (this.lightVariantStartNowItsFreeButton.first()) {
      await this.lightVariantStartNowItsFreeButton.first().click();
    }
  }
}
