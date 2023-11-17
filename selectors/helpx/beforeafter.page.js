import { expect } from '@playwright/test';
import { WebUtil } from '../../libs/webutil.js';

export default class BeforeAfter {
  constructor(page) {
    this.page = page;

    // BeforeAfter Selectors:
    this.beforeAftr = page.locator('.beforeafter');
    this.beforeafterVertical = page.locator(selectors['@beforeafter-vertical']);
    this.beforeafterVerticalmoved = page.locator(
      selectors['@beforeafter-vertical-moved']
    );
  }
}
