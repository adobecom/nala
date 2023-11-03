import { expect } from '@playwright/test';
import { WebUtil } from '../../libs/webutil.js';

export default class ViewPort {
  constructor(page) {
    this.page = page;

    // ViewPort Selectors:
    this.hideDsktop = page.locator('.generic.hidden-desktop');
    this.hideTablet = page.locator('.generic.hidden-tablet');
    this.hideMobile = page.locator('.generic.hidden-mobile');

    // quote blocks css
    this.cssProperties = {
      'hideDsktop': {
        'display': 'none',
      },
      'hideTablet': {
        'display': 'block',
      },
      'hideMobile': {
        'display': 'block',
      },
    };

    // quote blocks attributes
    this.attProperties = {
      'hideDsktop': { 'class': 'generic hidden-desktop hidden-tablet' },
      'hideTablet': { 'class': 'generic hidden-tablet hidden-mobile' },
      'hideMobile': { 'class': 'generic hidden-desktop hidden-mobile' },
    };
  }
};
