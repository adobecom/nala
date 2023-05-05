/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
// eslint-disable-next-line import/no-import-module-exports
import { expect } from '@playwright/test';

exports.Quiz = class Quiz {
  constructor(page) {
    this.page = page;
    this.nextButton = page.getByRole('button', { name: 'Next' });
    this.resultButton = page.getByRole('button', { name: 'Get your results' });
    this.uarResult = page.locator('.uar-result > div h1');
    this.uarResult2 = page.locator('.uar-result > div b');
  }

  /**
   * Select answer
   * @param {String} answer
   */
  async selectAnswer(answer) {
    const locator = `//div[@class="quiz-options"]//*[@aria-label="${answer}"]`;
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
   * @param {string} expectResult
   */
  async checkResultPage(expectResult) {
    const results = expectResult.split('>').map((x) => x.trim());
    const type = results[0];
    let expectProduct = results[1];
    let acturalProduct = await this.uarResult.textContent();

    if (expectProduct === 'more products') {
      // eslint-disable-next-line prefer-destructuring
      expectProduct = results[2];
      acturalProduct = await this.uarResult2.allTextContents();
    }

    // check url
    expect(this.page.url()).toContain(type);
    // check more than one product
    if (expectProduct.split(',').length > 1) {
      for (const product of expectProduct.split(',')) {
        expect(acturalProduct.toString()).toContain(product);
      }
    } else {
      expect(acturalProduct.toString()).toContain(expectProduct);
    }
  }
};
