export default class CCPhotoshopUnity {
  constructor(page) {
    this.page = page;

    this.unityBlock = page.locator('.upload-block.unity-enabled');
    this.uploadButton = this.unityBlock.locator("div.upload-grid.desktop-up button[type='button']");
    this.fileInput = this.unityBlock.locator('input[type="file"][id="file-upload"]').first();
    this.dropZone = this.unityBlock.locator('div.upload-grid.desktop-up >> div.drop-zone');
    this.alertContent = this.unityBlock.locator('div.upload-grid.desktop-up div.alert-content');
    this.dragAndDropText = this.unityBlock.locator('div.drop-zone p:has-text("Drag and drop an image")');
    this.videoElement = this.unityBlock.locator('div.upload-grid.desktop-up video');
    this.OnlineVideoElement = this.unityBlock.locator('div.media-container video');
    this.OnlinedropZoneText = this.unityBlock.locator('div.upload-grid.desktop-up div.drop-zone p:nth-child(1)');
    this.OnlineAgreementText = this.unityBlock.locator("//div[@class='upload-grid desktop-up']//p[contains(text(),'By uploading your')]");
    this.dropZoneParagraph = this.unityBlock.locator("div[class='upload-grid desktop-up'] div[class='drop-zone'] p").first();
    this.uploadDisclaimer = this.unityBlock.locator('div.upload-grid.desktop-up p', { hasText: 'By uploading your image or video' });
    this.removeBackgroundButton = page.locator('sp-action-button:has-text("Remove background")');
    this.progressHolder = page.locator('div.progress-holder');
    this.photoshopPreviewHeading = page.locator('h2#one-moment-as-we-take-you-to-photoshop-preview:has-text("One moment")').nth(0);
  }
}
