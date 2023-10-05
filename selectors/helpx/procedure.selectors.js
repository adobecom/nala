exports.Procedure = class Procedure {
    constructor(page) {
      this.page = page;
  
      // Procedure Selectors:
      this.procedure = page.locator('.procedure');
      this.procedureStep = page.locator('li[class=step]');
      this.procedureImage = page.locator('hli[class=step] img');
      this.procedureTxtBold = page.locator('li[class=step] strong');
    }
  
  };
  