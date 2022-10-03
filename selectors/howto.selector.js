const { expect } = require("@playwright/test")

exports.HowTo = class HowTo {

  constructor(page){

    this.page = page
    this.howToBlock = page.locator('.how-to')
    this.howToHeading1 = page.locator('.how-to h1')
    this.howToHeading2 = page.locator('.how-to h2')
    this.howToFirstAnswer = page.locator('//ol/li[1]/div')
    this.howToFourthAnswer = page.locator('//ol/li[4]/div')
  }

  

}


