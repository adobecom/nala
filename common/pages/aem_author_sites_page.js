import { AemAuthorPage } from './aem_author_page';

/** Page class for AEM start page*/
export class AemAuthorSitesPage extends AemAuthorPage {
  constructor(contentPath) {
    super();
    this.buildProps({
      urlPath: `/sites.html${contentPath}`,

      createButton: 'button[trackingfeature="aem:sites:globalcreate"]',
      createPage: '.cq-siteadmin-admin-createpage',
      nextButton: ['this.displayed$', 'button[data-foundation-wizard-control-action="next"]'],
      templateCard: 'coral-masonry-item',
      templateCards: '$$coral-masonry-item',

      titleInput: 'input[name="./jcr:title"]',
      pageNameInput: 'input[name="pageName"]',
      openButton: '.coral3-Dialog-wrapper .coral3-Button--primary',
      setAsFutureVariation: '//coral-button-label[text() = "Set future variation"]',
      okButton: '//coral-button-label[text() = "Ok"]',

      // Properties Menu
      propertyMenu: '//a[@icon="properties"]',
      openProperties: '//button[@title="Open Properties"]',

      tagsOpenSelectionDialogButton: '//label[text()="Tags"]/following-sibling::foundation-autocomplete//div//button[@title="Open Selection Dialog"]',
      qaCCTB2BResourceCenterOption: '//coral-columnview-item[@data-foundation-picker-collection-item-value="qa_cct-b2b-resource-center:"]',
      adobeProductsOption: '//coral-columnview-item[@data-foundation-picker-collection-item-value="qa_cct-b2b-resource-center:adobe-products"]',
      analyticsOptionThumbnail: '//coral-columnview-item[@data-foundation-picker-collection-item-value="qa_cct-b2b-resource-center:adobe-products/analytics"]//coral-columnview-item-thumbnail',
      selectionDialogSubmitButton: '//div[contains(@class, "region")]//button[contains(@class, "submit")]',
      labelTagsOpenSelectionDialogButton: '//label[text()="Label Tag"]/following-sibling::foundation-autocomplete//div//button[@title="Open Selection Dialog"]',
      testFeaturedLabelTagOption: '//coral-columnview-item[@data-foundation-picker-collection-item-value="qa_cct-b2b-resource-center:test-featured-label-tag"]//coral-columnview-item-thumbnail',
      collectionTagsOpenSelectionDialogButton: '//label[text()="Select Collection Tags"]/following-sibling::foundation-autocomplete//div//button[@title="Open Selection Dialog"]',
      configureComponentSubmitButton: '//coral-dialog[contains(@class, "cq-dialog")]//button[contains(@class, "submit")]'
    })
  }
}