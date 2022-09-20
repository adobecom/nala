import { AemAuthorPage } from './aem_author_page';

/** Page class for AEM start page*/
export class AemAuthorXF extends AemAuthorPage {
  constructor(contentPath) {
    super();
    this.buildProps({
      urlPath: `/aem/experience-fragments.html${contentPath}`,

      createButton: 'button[id="xf-create-pulldown"]',
      createPage: '.cq-experiencefragments-admin-create-xf',
      liveCopy: '.cq-siteadmin-admin-createlivecopy',
      nextButton: [
        'this.displayed$',
        'button[data-foundation-wizard-control-action="next"]'
      ],
      templateCard: 'coral-masonry-item',
      templateCards: '$$coral-masonry-item',

      titleInput: 'input[name="./jcr:title"]',
      pageNameInput: 'input[name="pageName"]',
      openButton: '.coral3-Dialog-wrapper .coral3-Button--primary',
      sidePanelToggleButton: '//button[@title="Toggle Side Panel"]',
      sidePanelAssetButton: '//coral-tab/coral-icon[@icon="asset"]',
      variation: '#cq-experiencefragments-admin-create-variation',
      liveCopyFrom: '#cq-siteadmin-admin-createlivecopy-form',
    });
  }

  openSidePanel() {
    this.sidePanelToggleButton.click();
  }

  selectAssetFromSidePanel() {
    this.sidePanelAssetButton.click();
  }
}
