import { classes } from 'polytype';
import { AemAuthorPage } from './aem_author_page';
import { CompConfigurationSection } from './comp_configuration_section';
import { Jarvis } from './jarvis_section';
import { BounceEditorSection } from './bounce_editor_section';

/** Page class for AEM Editor page*/
export class AemAuthorEditorPage extends classes(
  AemAuthorPage,
  CompConfigurationSection,
  Jarvis,
  BounceEditorSection
) {
  constructor(contentPath) {
    super();
    this.buildProps({
      urlPath: `/editor.html`,

      pageTitle: '.editor-GlobalBar-pageTitle',

      overlayWrapper: '#OverlayWrapper',

      sidePanelToggleButton: '//button[@title="Toggle Side Panel"]',
      previewButton: 'button[data-layer="Preview"]',
      publishOK: 'coral-button-label=OK',

      // Properties Menu
      propertyMenu: '//a[@icon="properties"]',
      openProperties: '//button[@title="Open Properties"]',
      viewAsPublished: '//button[@title="View as Published"]',
      publishPage: '//button[@title="Publish Page"]',
      exportToAdobeTarget: '//button[@title="Export to Adobe Target"]',
      exportPublish:
        '//coral-dialog-footer/button/coral-button-label[contains(text(),"Publish")]',
      exportOK: '#ok > coral-button-label',
      updateInAdobeTarget: '//button[@title="Update in Adobe Target"]',
      saveAsButton: '[title="Save as Version"]',
      publishPage2ndPage:
        '//button[@class="foundation-layout-inline2-item foundation-wizard-control coral3-Button coral3-Button--primary"]',
      rolloutPage: '#rolloutBtn',
      draggableComponent: 'div[data-type="Editable"][draggable="true"]',
      draggableComponents: '$$div[data-type="Editable"][draggable="true"]',
      helpxDraggableComponents:
        '$$div[data-type="Editable"][draggable="true"][title="Layout Container"]',
      //draggableComponents: '$$//div[@data-type="Editable" and @draggable="true"]',
      editableComponents: '$$div[data-type="Editable"]',
      deleteWarningButton: 'coral-dialog.is-open button[variant="warning"]',

      rootContainer:
        'div[data-text="Drag components here"][title="Layout Container [Root]"]',
      modalContainer:
        'div[data-text="Drag components here"][title="Paragraph System - HTL [Root]"]',
      modalInModalContainer:
        'div[title="Modal"]/*div[data-text="Drag components here"][title="Layout Container"]',
      parsysInModal:
        'div[data-text="Drag components here"][title="Layout Container"]',
      animationContainer:
        '//div[contains(@data-path,"animations") and contains(@data-text, "Drag components here")]',
      flexContainer:
        '//*[@class="cq-Overlay--component-name" and text()="Flex Container"]/..//*[@data-text="Drag components here"]',
      positionContainer:
        '//div[contains(@data-path,"position") and contains(@data-text, "Drag components here")]',
      modalContainer:
        '//div[contains(@data-path,"modalContainer/*") and contains(@data-text, "Drag components here")]',
      subnavContainer:
        '//div[contains(@data-path,"globalnavheader/subnav/childLinks/*") and contains(@data-text, "Drag components here")]',
      insertComponentDialog: '.InsertComponentDialog-list',
      componentGroups: '$$.InsertComponentDialog-list coral-selectlist-group',
      publishPageDownstream: '//button[@title="Publish Page Downstream"]',

      // Side Panel
      variationsTab: '[title="Variations"]',
      assetsTab: '[title="Assets"]',
      componentsTab: '[title="Components"]',
      contentTreeTab: '[title="Content Tree"]',
      sidePanelTitle: 'coral-panel.is-selected .sidepanel-tab-title',
      componentBrowser: '.editor-ComponentBrowser-components',
      contentTree: '.editor-ContentTree',
      assetCards: '$$.editor-Card-asset',
      componentList: 'coral-icon[icon="treeExpandAll"]',

      // Toolbars
      editableToolbar: '#EditableToolbar',
      insertButton: 'button[title="Insert component"]',
      parentButton: 'button[title="Parent"]',
      debugButton: 'button[title="Debug Placeholders"]',
      editButton: '#EditableToolbar>button[title="Edit"]',
      configureButton: 'button[title="Configure"]',
      stylesButton: 'button[title="Styles"]',
      copyButton: 'button[title="Copy"]',
      pasteButton: 'button[title="Paste"]',
      cutButton: 'button[title="Cut"]',
      deleteButton: 'button[title="Delete"]',
      groupButton: 'button[title="Group"]',
      convertToXf: 'button[title="Convert to experience fragment variation"]',
      xfdebuggerButton: 'button[title="Debug Experience Fragment"]',

      editedComponent: 'div.is-edited',
      activeComponent: 'div.is-active',

      // RTE toolbar
      rteToolbar: '.rte-toolbar.is-active',
      rteCursor: 'br[_rte_temp_br="brEOB"]',
      saveButton: '.is-active button[title="Save"]',
      fullscreenButton: '.is-active button[title="Fullscreen"]',
      fullscreenExitButton:
        'button[title="Fullscreen"][data-action="fullscreen#finish"]',

      rteEditor: 'div.rte-editor',

      // Dialog
      modalDialog: '.cq-Dialog.is-open',
      dialogFullscreen: 'coral-dialog button[title="Toggle Fullscreen"]',
      dialogDone: 'coral-dialog button[title="Done"]',
      dialogCancel: 'coral-dialog button[title="Cancel"]',
      guardrailModalOk:
        '#guardrail-modal > div.coral3-Dialog-wrapper > coral-dialog-footer > button > coral-button-label',

      // App Details(App Banner)
      closeCtaInAppBanner:
        '//div[contains(@data-path,"appbanner/closeCta") and contains(@title, "Button")]',
      imageInAppBanner:
        '//div[contains(@data-path,"appbanner/image") and contains(@data-text, "Image")]',
      visitAppStoreInAppBanner:
        '//div[contains(@data-path,"appbanner/visitAppStore") and contains(@title, "Button")]',
      visitPlayStoreInAppBanner:
        '//div[contains(@data-path,"appbanner/visitPlayStore") and contains(@title, "Button")]',

      //Tags
      tagsOpenProperties: '//input[@id="coral-id-32"]',
      articleButton: '//button[@value="caas:content-type/article"]',

      //Fail message
      sysErrorMessage: '.consonant-NoResultsView-title',

      //Component
      caasComponent: '.consonant-Wrapper-collection',
      pdfConverter: '.converter',

      /* FEDS authoring */
      // Authorable header
      fedsAuthHeader:
        '//div[contains(@data-path,"/topnav/") and contains(@data-path, "globalnav")]',
      // Authorable topnav component
      fedsAuthTopnav:
        '//div[contains(@data-path, "gnavtopnav") and contains(@data-text, "Topnav")]',
      // Authorable footer
      fedsAuthFooter:
        '//div[contains(@data-path,"/footer/") and contains(@data-path, "globalnav")]',
      // Authorable footer component
      fedsAuthFooternav:
        '//div[contains(@data-path,"gnavfooter") and contains(@data-text, "Footer")]'
    });
  }

  edit(contentPath) {
    this.open(`${this.urlPath}${contentPath}`);
  }

  clickEditable(element) {
    element.moveTo({ xOffset: 0, yOffset: 10 });
    browser.positionClick();
  }

  clickLayoutContainer(dataPath) {
    let xpath = `//div[contains(@data-path, "${dataPath}/*")]`;
    browser.retryClick(xpath);
  }

  getComponentGroups() {
    this.waitForDisplayed('insertComponentDialog', 60000);
    let groups = this.componentGroups;
    return groups.map(x => x.getAttribute('label'));
  }

  getComponents(group) {
    let comps = browser.$$(
      `coral-selectlist-group[label="${group}"] coral-selectlist-item`
    );

    return comps.map(x => x.getText());
  }

  getAvailableComponents() {
    let allComps = {};
    let groups = this.getComponentGroups();
    for (let group of groups) {
      allComps[group] = this.getComponents(group);
    }
    return allComps;
  }

  selectComponent(group, component) {
    this.waitForDisplayed('insertComponentDialog', 60000);
    let comp = browser.$(
      `//coral-selectlist-group[@label="${group}"]/coral-selectlist-item[text()="${component}"]`
    );
    comp.click();
    browser.pause(1000);
  }

  getComponentFromSidePanel(group, component) {
    let comp = browser.$(
      `//*[@data-group="${group}" and @data-title="${component}"]`
      //`//div[@class="editor-ComponentBrowser-component-title"]/div[1][text()="${component}"]//following-sibling::div[1][text()="${group}"]`
    );
    return comp;
  }

  getEditableComponents(component) {
    browser.$(`div[data-type="Editable"][title="${component}"]`);
    return browser.$$(`div[data-type="Editable"][title="${component}"]`);
  }

  doComponentAction(action, component, index) {
    if (component.includes('/')) {
      let comp = browser.$(`//div[contains(@data-path, "${component}")]`);
      comp.click();
    } else {
      let comps = this.getEditableComponents(component);
      comps[index].click();
    }
    this.waitForEnabled(`${action}Button`);
    this[`${action}Button`].click();
  }

  inputTextInFullScreen(text) {
    this.waitForEnabled('rteToolbar');
    browser.pause(500);
    this.click('fullscreenButton');
    let retries = 5;
    let actual = null;
    while (retries-- > 0 && actual !== text) {
      this.setValue('rteEditor', text);
      browser.pause(500);
      actual = this.getRteEditorText();
    }
    this.fullscreenExitButton.click();
    browser.pause(500);
    this.click('saveButton');
  }

  getRteEditorText() {
    return this.rteEditor.getText();
  }

  getCaaS() {
    return $('.consonant-Wrapper-collection');
  }

  getSysErrorMessage() {
    return $('.consonant-NoResultsView-title');
  }

  getModalDialogFeature() {
    return this.modalDialog.getAttribute('trackingfeature');
  }

  openSidePanel() {
    this.sidePanelToggleButton.click();
  }

  /**
   * @type {object}
   * @description Get the page information menu
   */
  get pageInformation() {
    return $("//a[@id='pageinfo-trigger']");
  }

  /**
   * @type {object}
   * @description Get the rollout sub menu item from the page information menu
   */
  get rollOutLink() {
    return $("//*[@id='rolloutBtn']");
  }

  /**
   * @type {object}
   * @description Get the rollout page and all sub pages checkbox from the page information menu
   */
  get rollOutPageAndAllSubpagesCheckbox() {
    return $('.msm-rollout-deep.coral-Form-field.coral3-Checkbox');
  }

  /**
   * @type {object}
   * @description Get the check icon on the rollout page
   */
  get checkRollOut() {
    return $("//*[@class='coral3-Icon coral3-Icon--sizeS coral3-Icon--check']");
  }

  /**
   * @type {object}
   * @description Get the schedule rollout done button
   */
  get scheduleRollOutButton() {
    return $('.schedule-rollout-done');
  }

  /**
   * @type {object}
   * @description Get the cta link on the page
   */
  get ctaLink() {
    return $("//div[contains(@class,'dexter-Cta')]/a");
  }

  /**
   * @type {object}
   * @description Get the root content table on the page
   */
  get rootContenttable() {
    return $("[id='root_content_table']");
  }

  /**
   * @type {object}
   * @description  Text style button
   */
  get textStyleButton() {
    return $(
      `//div[@class='rte-ui is-desktop']//div[@data-type='fullscreen']//*[@title='Hyperlink']`
    );
  }

  /**
   * @type {object}
   * @description  CCT Placeholder Style
   */
  get CCTPlaceholderStyle() {
    return $(
      '//*[@id="FullScreenWrapper"]/div[2]/coral-dialog-content/div/div[1]/div[2]/coral-popover[1]/div[3]/coral-popover-content/coral-buttonlist/button[1]/div/div/coral-list-item-content'
    );
  }

  /**
   * @type {object}
   * @description  Full screen exit button
   */
  get fullscreenExitButton() {
    return $('//button[@icon="fullScreenExit"]');
  }

  /**
   * @type {object}
   * @description Text Button Done element
   */
  get textbuttonDone() {
    return $('//coral-buttongroup/button[@icon="check"]/coral-icon');
  }

  /**
   * @type {object}
   * @description Intent text element
   */
  get textElement() {
    return $(`[title='Text']`);
  }

  /**
   * @type {object}
   * @description Edit Button element
   */
  get editButton() {
    return $('//div[@id="EditableToolbar"]/button[@icon="edit"]');
  }

  /**
   * @type {object}
   * @description  Full screen button
   */
  get fullscreenButton() {
    return $('//button[@icon="fullScreen"]');
  }

  /**
   * @type {object}
   * @description  Intent Text field element
   */
  get intentText() {
    return $('.rte-editorWrapper');
  }

  /**
   * @type {object}
   * @description Hyperlink element in Text component
   */
  get hyperlinkInTextComp() {
    return $(
      `//div[@class='rte-ui is-desktop']//div[@data-type='fullscreen']//*[@title='Hyperlink']`
    );
  }

  /**
   * @type {object}
   * @description Path in hyperlink in text component
   */
  get pathInHyperlink() {
    return $(`input[placeholder='Path']`);
  }

  /**
   * @type {object}
   * @description Button Apply in Hyperlink of text component
   */
  get buttonApply() {
    return $(`//button[@title='Apply']`);
  }

  /**
   * @type {object}
   * @description Save buttun in text component
   */
  get saveButton() {
    return $(`button[title='Save']`);
  }

  /**
   * @type {object}
   * @description Animate thumbnail in sites
   */
  get animate() {
    return $(
      `//img[@class='foundation-collection-item-thumbnail' and contains(@src,'animate')]`
    );
  }

  /**
   * @type {object}
   * @description More button in sites
   */
  get moreButton() {
    return $$(`button[title='More']`)[0];
  }

  /**
   * @type {object}
   * @description Rollout in sites
   */
  get rollout() {
    return $(`//coral-button-label[contains(text(),'Rollout')]`);
  }

  /**
   * @type {object}
   * @description Rollout button
   */
  get rolloutBtn() {
    return $(`[title='Rollout']`);
  }

  /**
   * @type {object}
   * @description Rollout options
   */
  get rolloutOptionsPageAndXF() {
    return $(`//*[@class=' coral3-Radio-input' and @value='xf']`);
  }

  /**
   * @type {object}
   * @description Rollout options
   */
  get rolloutOptionsPageAndAllSubpages() {
    return $(`//*[@class=' coral3-Radio-input' and @value='deep']`);
  }

  /**
   * @type {object}
   * @description Continue button
   */
  get continueBtn() {
    return $(`//*[contains(text(),'Continue')]`);
  }

  get inheritedXF() {
    return $('//div[@data-text="Inherited Experience Fragment"]');
  }

  /**
   * @type {object}
   * @description Get Sort pop up button on consonant card colledtion
   */
  get sortButton() {
    return $(`button[data-testid='consonant-Select-btn']`);
  }

  /**
   * @type {object}
   * @description Get save and close button after page properties are opened
   */
  get saveAndCloseButton() {
    return $(`button[id='shell-propertiespage-doneactivator']`);
  }

  /**
   * @type {object}
   * @description Get publish page button
   */
  get publishPage() {
    return $(`//button[@title='Publish Page']`);
  }

  /**
   * @type {object}
   * @description Get the second Sort pop up button on consonant card collection page
   */
  get sortButtonSecondOption() {
    return $(`button[data-testid='consonant-Select-option']`);
  }

  /**
   * @type {object}
   * @description Get Page information button
   */
  get pageInfo() {
    return $(`//a[@title='Page Information']`);
  }

  /**
   * @type {object}
   * @description Get Open Properties button
   */
  get OpenProperties() {
    return $(`//button[@title='Open Properties']`);
  }

  /**
   * @type {object}
   * @description Get the dexter geo overlay pop up
   */
  get dexterGeoOverlay() {
    return $('div#localeModal');
  }

  /**
   * @type {object}
   * @description Get the ok button on login dialog in AEM crx/de
   */
  get dexterGeoOverlayClose() {
    return $('div#localeModal .dexter-CloseButton');
  }

  /**
   * @type {object}
   * @description Get the XF picker overlay
   */
  get XFPickerOverlayClose() {
    return $('.foundation-picker-buttonlist.coral3-Overlay.is-open');
  }

  get addButtonXFPersonalize() {
    return $("(//coral-button-label[contains(text(),'Add')])[2]");
  }

  /**
   * Upload file to be converted or edited
   * @param {string|string[]} files full path of file or array of file paths
   */
  upload(files) {
    this.waitForEnabled('buttonChooseFile');
    this.waitForEnabled('fileInput');
    let value = Array.isArray(files) ? files.join('\n') : files;
    if (process.platform === 'win32') {
      value = value.replace('/', '\\');
    }
    //browser.setValue(this.fileInput, file);
    this.fileInput.addValue(value);
  }

  /**
   * @type {object}
   * @description Get button to choose a file
   */
  get buttonChooseFile() {
    return $('.choose-file');
  }

  /**
   * @type {object}
   * @description Get the file input element
   */
  get fileInput() {
    return $('#fileInput');
  }

  /**
   * @type {object}
   * @description Get the PDF Download button which has no "Try another File"
   */
  get pdfDownload() {
    return $(
      '//button[contains(@data-test-id, "download") and not(contains(@data-test-id, "tryAnotherFile"))] | //button[data-test-id="download"]'
    );
  }

  /**
   * @type {object}
   * @description Get preview page of uploaded document
   */
  get previewPage() {
    return $('//*[contains(@class,"PageView__PageView")]');
  }

  /**
   * @type {object}
   * @description Get the circle loader
   */
  get circleLoader() {
    return $('.spectrum-CircleLoader-fill');
  }

  /**
   * @type {object}
   * @description Get cancel upload button
   */
  get cancelUpload() {
    return $('//button[span[contains(text(), "Cancel")]]');
  }

  get xfDebuggerDialogBox() {
    return $(
      `//coral-dialog-header[contains(text(),'Experience Fragment Variations')]`
    );
  }
  /**
   * @type {object}
   * @description wordwrap option button on jp page
   */
  get jpWordWrapOptions() {
    return $(
      '//coral-icon[@class="coral3-Icon coral3-Icon--sizeS coral3-Icon--wand"]'
    );
  }
  /**
   * @type {object}
   * @description wordwrap button on jp page
   */
  get jpWordWrap() {
    return $(
      '//button[@class="js-editor-PageInfo-closePopover editor-PageInfo-action dexter-jp-word-wrap coral3-Button coral3-Button--secondary"]'
    );
  }
  /**
   * @type {object}
   * @description ok on jp page
   */
  get jpWordWrapok() {
    return $('//button[@id="ok"]');
  }
  /**
   * @type {object}
   * @description toggle wordwrap button on jp page
   */
  get toggleJpWordWrapView() {
    return $(
      '//button[@class="js-editor-PageInfo-closePopover editor-PageInfo-action dexter-jp-word-wrap-toggle coral3-Button coral3-Button--secondary"]'
    );
  }
  /**
   * @type {object}
   * @description revert wordwrap button on jp page
   */
  get revertJpWordWrapConfig() {
    return $(
      '//button[@class="js-editor-PageInfo-closePopover editor-PageInfo-action dexter-jp-word-wrap-revert coral3-Button coral3-Button--secondary"]'
    );
  }
  /**
   * @type {object}
   * @description Jp wordwrap button at component level after edit
   */

  get jpWordWrapOption() {
    return $(
      '//button[@title="Jp Word Wrap Options"]//coral-icon[@aria-label="wand"]'
    );
  }
  /**
   * @type {object}
   * @description Jp wordwrap button at component level
   */

  get jpWordWrapatcomponent() {
    return $('//coral-select[@name="jpwordwrapcomp"]//button[@type="button"]');
  }
  /**
   * @type {object}
   * @description Jp wordwrap ok at component level
   */
  get jpokatcomponent() {
    return $('//button[@id="ok"]');
  }
  /**
   * @type {object}
   * @description Jp wordwrap toggle at component level
   */
  get jptoggle() {
    return $('//coral-selectlist-item[@value="toggleJpWordWrap"]');
  }
  /**
   * @type {object}
   * @description Jp wordwrap revert at component level
   */
  get jprevertatcomponent() {
    return $('//coral-selectlist-item[@value="executeRevertJpWordWrap"]');
  }
  /**
   * @type {object}
   * @description selecting text component
   */
  get textcomponent() {
    return $('//div[@title="Text"]');
  }
  /**
   * @type {object}
   * @description executing JP wordwrap at component level
   */
  get executejpwordwrap() {
    return $('//coral-selectlist-item[@value="executeJpWordWrap"]');
  }
  /**
   * @type {object}
   * @description Preview wordwrap
   */
  jpPreviewWordWrapText(text) {
    return $(`//span[@class='nobr'][text()='${text}']`);
  }
  /**
   * @type {object}
   * @description Preview revert wordwrap
   */
  jpPreviewrevertText(text) {
    return $(`//span[@class='nobr'][text()='${text}']`);
  }
  /**
   * @type {object}
   * @description revert wordwrap text
   */
  jpunwrapedText(text) {
    return $(`//span[@class='nobr'][text()='${text}']`);
  }
  /**
   * @type {object}
   * @description revert wordwrap title
   */
  get titlecomponent() {
    return $('//div[@title="Title"]');
  }
}
