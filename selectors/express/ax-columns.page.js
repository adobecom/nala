export default class AxColumns {
  constructor(page) {
    this.page = page;

    // center variant
    this.axColumns = page.locator('.ax-columns');
    this.heading = this.axColumns.locator('h2');
    this.content = this.axColumns.locator('p');

    // highlight variant
    this.picture = this.axColumns.locator('picture');
    this.image = this.picture.locator('img');
    this.column = this.axColumns.locator('.column');
    this.columnHeading = this.column.locator('h4');
    this.columnContent = this.column.locator('p');
    this.highlightVariantButton1 = this.column.getByRole('link', { name: 'Watch now' });
    this.highlightVariantButton2 = this.column.getByRole('link', { name: 'Alternative video source (WebM)' });
    this.highlightVariantButton3 = this.column.getByRole('link', { name: 'Alternate video source (MP4)' });

    // centered variant
    this.columnsVideo = this.axColumns.locator('.columns-video');
    this.columnsPicture = this.axColumns.locator('.columns-picture');
    this.column2 = this.axColumns.locator('.column');
    this.columnHeading2 = this.column.locator('h2');
    this.columnVideo = this.axColumns.locator('.column-video');
    this.video = this.columnVideo.locator('video');
    this.videoSource = this.columnVideo.locator('source');
    this.content2 = this.column.locator('p');

    // top center variant
    this.column3 = this.axColumns.locator('.column');
    this.picture = this.column3.locator('picture');
    this.pictureSource = this.picture.locator('source');
    this.columnHeading3 = this.column3.locator('h3');

    // fullsize variant
    this.column4 = this.axColumns.locator('.column');
    this.columnHeading4 = this.column4.locator('h1');
    this.columnContent4 = this.column4.locator('p');
    this.culumnButton = this.column4.getByRole('link', { name: 'Design now' });
    this.picture = this.column4.locator('picture');

    // fullsize-center variant

    // dark variant

    // light variant

    // numbered-30 variant

    this.globalFooter = page.locator('.global-footer');
  }

  async gotoURL(url) {
    await this.page.goto(url);
    await this.globalFooter.waitFor();
  }

  async scrollToAxColumns() {
    await this.page.waitForLoadState('domcontentloaded');
    await this.axColumns.scrollIntoViewIfNeeded(2000);
  }

  async clickButton() {
    await this.page.waitForLoadState('domcontentloaded');
    if (this.button) {
      await this.button.click();
    }
  }
}
