/* eslint-disable import/prefer-default-export */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
export class Quiz {
  constructor(page) {
    this.page = page;
    this.nextButton = page.getByRole('button', { name: 'Next' });
    this.resultButton = page.locator('div.quiz-button-container > button');
    this.uarResult = page.locator('.quiz-results h1');
    this.uarResult2 = page.locator('//div[contains(@data-path,"marquee-product")]//strong | //div[contains(@data-path,"check-bullet")]//h1 | //div[contains(@data-path,"express-product")]//h1');
    this.uarResult3 = page.locator('//div[contains(@data-path,"card")]//strong');
  }

  /**
   * Select answer
   * @param {String} answer
   */
  async selectAnswer(answer) {
    const locator = `//*[text()="${answer}"]/ancestor::div[contains(@class,"consonant-OneHalfCard quiz-option")]`;
    await this.page.locator(locator).click();
  }

  /**
   * Click next button
   */
  async clickNextButton() {
    await this.nextButton.click();
  }

  /**
   * Click get your results button
   */
  async clickResultButton() {
    await this.resultButton.click();
  }

  /**
   * Select each answer and click next button on question page
   * @param {string} url
   * @param {string} originalAnswer
   */
  async clickEachAnswer(url, originalAnswer) {
    await this.page.goto(url);

    const answers = originalAnswer.split('>').map((x) => x.trim());

    for (const answer of answers) {
      if (answer.includes('+')) {
        const options = answer.split('+').map((x) => x.trim());
        // select more than one answer
        for (const option of options) {
          await this.selectAnswer(option);
        }
      } else {
        // select one answer
        await this.selectAnswer(answer);
      }

      if (answers.indexOf(answer) < answers.length - 1) {
        // click next button
        await this.clickNextButton();
      }
    }

    // click get your results button
    await this.clickResultButton();
  }

  /**
   * Validate products on result page to match with expect products
   * @param {string} name
   */
  async checkResultPage(name) {
    const newProduct = [];

    const actualProduct  = await this.uarResult.nth(0);
    const text = await actualProduct .innerText();

    if (text.includes('We think you\'ll love')) {
      const actualProduct 2 = await this.uarResult2.nth(0);
      newProduct.push(await actualProduct 2.innerText());

      if (name.includes('double') || name.includes('triple')) {
        const actualProduct 3 = await this.uarResult2.nth(1);
        newProduct.push(await actualProduct 3.innerText());
      }

      if (name.includes('triple')) {
        const actualProduct 4 = await this.uarResult2.nth(2);
        newProduct.push(await actualProduct 4.innerText());
      }
    } else {
      newProduct.push(text);
    }

    console.log('==========new============');
    console.log(newProduct.sort().join(''));
    return newProduct.sort().join('');
  }
}
