/* eslint-disable import/prefer-default-export */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */

export class QuizOldPage {
  constructor(page) {
    this.page = page;
    this.nextButton = page.getByRole('button', { name: 'Next' });
    this.resultButton = page.getByRole('button', { name: 'Get your results' });
    this.uarResult = page.locator('.uar-result h1');
    this.uarResult2 = page.locator('.uar-result b, .uar-quiz-result b');
  }

  /**
   * Select answer
   * @param {String} answer
   */
  async selectAnswer(answer) {
    const locator = `//div[text()="${answer}"]/ancestor::div[contains(@class,"quiz-card")]`;
    await this.page.locator(locator).click();
  }

  /**
   * Click next button
   */
  async clickNextButton() {
    await this.nextButton.click();
    await this.page.waitForTimeout(500);
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
    const oldProduct = [];

    const acturalProduct = await this.uarResult.nth(0);
    const text = await acturalProduct.innerText();

    if (text.includes('We think you\'ll love')) {
      const acturalProduct2 = await this.uarResult2.nth(0);
      oldProduct.push(await acturalProduct2.innerText());

      if (name.includes('double') || name.includes('triple')) {
        const acturalProduct3 = await this.uarResult2.nth(1);
        oldProduct.push(await acturalProduct3.innerText());
      }

      if (name.includes('triple')) {
        const acturalProduct4 = await this.uarResult2.nth(2);
        oldProduct.push(await acturalProduct4.innerText());
      }
    } else {
      oldProduct.push(text);
    }

    console.log('==========old============');
    console.log(oldProduct.sort().join(''));
    return oldProduct.sort().join('');
  }
}
