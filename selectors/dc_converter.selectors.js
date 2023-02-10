module.exports = {
  '@pdf-converter': '[class*=DCHosted]',
  '@pdf-file-upload-input': '[data-test-id="file-upload-input"][accept*=".pdf"]',
  '@ppt-file-upload-input': '[data-test-id="file-upload-input"][accept*=".pptx"]',
  '@jpg-file-upload-input': '[data-test-id="file-upload-input"][accept*=".jpg"]',
  '@word-file-upload-input': '[data-test-id="file-upload-input"][accept*=".docx"]',
  '@excel-file-upload-input': '[data-test-id="file-upload-input"][accept*=".xlsx"]',
  '@export-convert-button': '[data-test-id="export-form-convert-button"]',
  '@convert-button': '[data-test-id="convert"]',
  '@pdf-complete': 'div[class*=LifecycleComplete][data-verb]',
  '@file-preview': '[class*=DocumentView] #pages-view',
  '@download': '[data-test-id="download"]',
  '@widget-block-failed': '.dc-converter-widget[data-failed="true"]',
};
