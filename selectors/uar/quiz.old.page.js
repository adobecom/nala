/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
const { WebUtil } = require('../../libs/webutil.js');

export default class QuizOldPage {
  constructor(page) {
    this.page = page;
    this.webUtil = new WebUtil(page);
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
  async clickEachAnswer(url, originalAnswer, keyNumber, isScreenshot = false) {
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
        if (isScreenshot) {
          await this.page.waitForTimeout(500);

          const index = answers.indexOf(answer);
          const folderPath = 'screenshots/uar';
          const desktopName = `${keyNumber} - old - desktop - ${index} - ${answer.replace('/', '')}.png`;
          const tabletName = `${keyNumber} - old - tablet - ${index} - ${answer.replace('/', '')}.png`;
          const mobileName = `${keyNumber} - old - mobile - ${index} - ${answer.replace('/', '')}.png`;

          await this.webUtil.takeScreenshot(folderPath, desktopName, 1920, 1080);
          await this.webUtil.takeScreenshot(folderPath, tabletName, 768, 1024);
          await this.webUtil.takeScreenshot(folderPath, mobileName, 375, 812);
        }
        // click next button
        await this.clickNextButton();
      } else if (isScreenshot) {
        await this.page.waitForTimeout(500);
        const index = answers.length - 1;
        const folderPath = 'screenshots/uar';
        const desktopName = `${keyNumber} - old - desktop - ${index} - ${answer.replace('/', '')}.png`;
        const tabletName = `${keyNumber} - old - tablet - ${index} - ${answer.replace('/', '')}.png`;
        const mobileName = `${keyNumber} - old - mobile - ${index} - ${answer.replace('/', '')}.png`;

        await this.webUtil.takeScreenshot(folderPath, desktopName, 1920, 1080);
        await this.webUtil.takeScreenshot(folderPath, tabletName, 768, 1024);
        await this.webUtil.takeScreenshot(folderPath, mobileName, 375, 812);
      }
    }

    // click get your results button
    await this.clickResultButton();
  }

  /**
   * Validate products on result page to match with expect products
   * @param {string} name
   */
  async checkResultPage(name, originalAnswer, keyNumber, isScreenshot = false) {
    const oldProduct = [];

    const actualProduct = await this.uarResult.nth(0);
    const text = await actualProduct.innerText();

    if (text.includes('We think you\'ll love')) {
      const actualProduct2 = await this.uarResult2.nth(0);
      oldProduct.push(await actualProduct2.innerText());

      if (name.includes('double') || name.includes('triple')) {
        const actualProduct3 = await this.uarResult2.nth(1);
        oldProduct.push(await actualProduct3.innerText());
      }

      if (name.includes('triple')) {
        const actualProduct4 = await this.uarResult2.nth(2);
        oldProduct.push(await actualProduct4.innerText());
      }
    } else {
      oldProduct.push(text);
    }

    if (isScreenshot) {
      await this.page.waitForTimeout(1000);

      const folderPath = 'screenshots/uar';
      const desktopName = `${keyNumber} - old - desktop - result.png`;
      const tabletName = `${keyNumber} - old - tablet - result.png`;
      const mobileName = `${keyNumber} - old - mobile - result.png`;

      await this.webUtil.takeScreenshot(folderPath, desktopName, 1920, 1080);
      await this.webUtil.takeScreenshot(folderPath, tabletName, 768, 1024);
      await this.webUtil.takeScreenshot(folderPath, mobileName, 375, 812);
    }

    console.info(`==========old============\n${oldProduct.sort().join('')}`);
    return oldProduct.sort().join('');
  }
}
