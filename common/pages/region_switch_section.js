import { Section } from './section';

/** Class representing a region switch popup */
export class RegionSwitch extends Section {
  /**
   * @type {object[]}
   * @description Get all regions on the popup 
   */    
  get regions() {
    // dexter region switch,old
    return $$('.language-Navigation_region-List a,.modal-region li a');
  }

  /**
   * @type {object[]}
   * @description Get all regions on the popup on. Workaround for firefox to click mena_ar region
   */      
  get regionsAr() {
    return $$('.language-Navigation_region-List li');
  }

  /**
   * @type {object}
   * @description Get the heading
   */ 
  get regionHeading() {
    return $('.language-Navigation_heading,.modal-region .modal-content .regions-header');
  }

  /**
   * @type {object}
   * @description Get the subheading
   */   
  get regionSubHeading() {
    return $('.language-Navigation_subheading');
  }

  /**
   * @type {object}
   * @description Get the subheading
   */  
  get regionSwitchClose() {
    return $(
      '#languageNavigation .dexter-CloseButton,.modal-region .modal-toggle-visible'
    );
  }

  /**
   * Select a region on the region switch
   * @param {string} region Region to be selected
   */
  selectRegion(region) {
    let selected = this.regions.find(x => x.getText() === region);
    if (selected == null) {
      throw `The region "${region}" is not found`;
    }
    selected.click();
  }
}
