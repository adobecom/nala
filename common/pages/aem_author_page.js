import { Page } from './page';

/** Page class for AEM start page*/
export class AemAuthorPage extends Page {
  constructor() {
    super();
    this.buildProps({
      onboardingPopup: '$.granite-shell-onboarding-popover',
      surveyPopup: '#mainForm, #omg_survey'

    });
  }

  /**
   * @type {object}
   * @description Get accordion layout container
   */
  get accordionLayoutContainer() {
    return $(
      'div[data-path*="/jcr:content/root/content/accordion/content-Item1"][title="Layout Container"]'
    );
  }

  /**
   * @type {object}
   * @description Get XF Variation Path
   */
  get xfVariationPath() {
    return $('input[placeholder="Experience fragment variation path"]');
  }

  /**
   * @type {object}
   * @description Button Done element
   */
  get buttonDone() {
    return $('//coral-dialog-header/div/button[@icon="check"]/coral-icon');
  }

  /**
   * @type {object}
   * @description Button Save & Close element
   */
  get buttonSave() {
    return $('//coral-button-label[contains(text(),"Save & Close")]');
  }

  /**
   * @type {object}
   * @description Button cancel element
   */
  get buttonCancel() {
    return $('//coral-button-label[contains(text(),"Cancel")]');
  }

  /**
   * @type {object}
   * @description title link
   */
  get titleLink() {
    return $('//a[@class="cmp-title__link"]');
  }

  /**
   * @type {object}
   * @description Lazy load checkbox
   */
  get laxyLoadXF() {
    return $('//coral-checkbox[@name="./lazyLoad"]/label');
  }

  /**
   * @type {object}
   * @description Invalid input box
   */
  get invalidInputBox() {
    return $('.is-invalid');
  }

  /**
   * @type {object}
   * @description Alert icon
   */
  get alert() {
    return $('//coral-icon[@icon="alert"][@tabindex=0]');
  }

  /**
   * @type {object}
   * @description Tooltip content
   */
  get tooltipContent() {
    return $(
      '//coral-tooltip-content[contains(text(),"Please fill out this field.")]'
    );
  }

  /**
   * @type {object}
   * @description Add Button In Accordion
   */
  get addButtonInAccordion() {
    return $('//coral-button-label[contains(text(),"Add")]');
  }

  /**
   * @type {object}
   * @description Remove button In Accordion
   */
  get removeButtonInAccordion() {
    return $('//button[@handle="remove"]');
  }

  /**
   * @type {object}
   * @description Left Rail Icon
   */
  get leftRailButton() {
    return $('button[icon="railLeft"]');
  }

  /**
   * @type {object}
   * @description Components Icon
   */
  get componentsIcon() {
    return $('[title="Components"]');
  }

  /**
   * @type {object}
   * @description Accordion component in left rail
   */
  get accordionComponent() {
    return $('//div[contains(text(),"Accordion")]');
  }

  /**
   * @type {object}
   * @description Layout container root
   */
  get layoutContainer() {
    return $('//div[@title="Layout Container [Root]"]');
  }

  /**
   * @type {object}
   * @description Accordion component on the page
   */
  get accordion() {
    return $('[title="Accordion"]');
  }

  /**
   * @type {object}
   * @description Button element on left rail
   */
  get button() {
    return $('[data-title="Button"]');
  }

  /**
   * @type {object}
   * @description Table component in components tab
   */
  get tableComponent() {
    return $('[data-path="/apps/dexter/components/structure/table"]');
  }

  /**
   * @type {object}
   * @description Table component on the page
   */
  get table() {
    return $('[data-text="Table"]');
  }

  /**
   * @type {object}
   * @description Second 'Selected by default' checkbox
   */
  get selectByDefaultCheckboxInAccordion() {
    return $('coral-checkbox[name="./items/item0/./selected"]');
  }

  /**
   * @type {object}
   * @description Second 'Disable' checkbox
   */
  get disableCheckboxInAccordion() {
    return $('coral-checkbox[name="./items/item0/./disabled"]');
  }

  /**
   * @type {object}
   * @description Done button in XF configuration dialog
   */
  get done() {
    return $('[title="Done"]');
  }

  /**
   * @type {object}
   * @description Parsys in page
   */
  get parsysPage() {
    return $(
      '[data-path*="/jcr:content/root/content/*"][data-text="Drag components here"]'
    );
  }

  /**
   * @type {object}
   * @description Parsys in Modal
   */
  get parsysModal() {
    return $(
      '[data-path*="/jcr:content/modalContainer/*"][data-text="Drag components here"]'
    );
  }

  /**
   * @type {object}
   * @description Parsys in XF Page
   */
  get parsysXFPage() {
    return $(
      '[data-path*="/jcr:content/root/*"][data-text="Drag components here"]'
    );
  }

  /**
   * @type {object}
   * @description Add additional row in table
   */
  get additionalRow() {
    return $('[data-granite-coral-multifield-name="./rows"]>button');
  }

  /**
   * @type {object}
   * @description Add additional column in table
   */
  get additionalColumn() {
    return $('[data-granite-coral-multifield-name="./columns"]>button');
  }

  /**
   * @type {object}
   * @description Table row
   */
  get tableRowLayoutContainer() {
    return $(
      '//div[contains(@data-path,"table/row") and (@draggable="false")]'
    );
  }

  /**
   * @type {object}
   * @description Text component on left rail
   */
  get text() {
    return $('[data-title="Text"]');
  }

  /**
   * @type {object}
   * @description Text component on author page
   */
  get textComponent() {
    return $('[title="Text"]');
  }

  /**
   * @type {object}
   * @description IFrame component in left rail
   */
  get iframeComponent() {
    return $('//div[contains(text(),"IFrame")]');
  }

  /**
   * @type {object}
   * @description IFrame component on the page
   */
  get iFrame() {
    return $('[title="IFrame"]');
  }

  /**
   * @type {object}
   * @description Layout container in Modal
   */
  get modalLayoutContainer() {
    return $$('//div[@title="Layout Container"]')[0];
  }
}
