import { Section } from './section';

/** Class representing a sub-navigation menu */
export class SubNav extends Section {
  /**
   * @type {object}
   * @description Logo in a subnavigation
   */   
  get subnavLogo() {
    return $('.Subnav-logo');
  }

  /**
   * @type {object[]}
   * @description Array of subnavigation menu items
   */   
  get subnavMenuItems() {
    let usingLocalNav = ['default', 'uk'];
    if (usingLocalNav.includes(process.env.locale)) {
      return this.displayed$$('.feds-navList[daa-lh="localnav"] > .feds-navList-item a.feds-navLink');
    } else {
      return this.displayed$$('.Subnav-menu-item > a');
    }
  }

  /**
   * @type {object}
   * @description Buy button in subnavigation
   */   
   get buyNow() {
        return this.displayed$$('.feds-navLink--primaryCta')[0];
   }






  /**
   * @type {object}
   * @description "Contact Us" button in subnavigation
   */
  get contactUs() {
    return $('a.Subnav-menu-button');
  }

  /**
   * @type {object[]}
   * @description Array of submenu items in subnavigation
   */  
  get subnavMenuSubmenuItems() {
    return this.displayed$$('.Subnav-submenu-item > a');
  }
}
