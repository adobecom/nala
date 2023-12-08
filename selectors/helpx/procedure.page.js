import { expect } from '@playwright/test';
import { WebUtil } from '../../libs/webutil.js';

export default class Procedure {
  constructor(page) {
    this.page = page;

    // Procedure Selectors:
    this.procedure = page.locator('.procedure');
    this.procedureStep = page.locator('li[class=step]');
    this.procedureImage = page.locator('hli[class=step] img');
    this.procedureTxtBold = page.locator('li[class=step] strong');
  }
}
