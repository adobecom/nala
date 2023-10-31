import { expect } from '@playwright/test';
import { WebUtil } from '../../libs/webutil.js';

export default class Draft {
  constructor(page) {
    this.page = page;

    // Draft Selectors:
    this.beforeAftr = page.locator('.before-after-slider');
    this.procedure = page.locator('.procedure');
    this.codeBlock = page.locator('.code');
    this.generic = page.locator('.generic');

    // draft blocks css
    this.cssProperties = {
      'beforeAftr': {
        'display': 'none',
      },
      'procedure': {
        'display': 'none',
      },
      'codeBlock': {
        'display': 'none',
      },
      'generic': {
        'display': 'none',
      },
    };

    // draft blocks attributes
    this.attProperties = {
      'beforeAftr': { 'class': 'before-after-slider vertical draft' },
      'procedure': { 'class': 'procedure draft' },
      'codeBlock': { 'class': 'code language-as3 line-numbers draft' },
      'generic': { 'class': 'generic draft class1 class2' },
    };  
  }
};
