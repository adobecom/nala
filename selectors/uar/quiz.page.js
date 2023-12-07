/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
import { expect } from '@playwright/test';

const { WebUtil } = require('../../libs/webutil.js');

export default class Quiz {
  constructor(page) {
    this.page = page;
    this.webUtil = new WebUtil(page);
    this.nextButton = page.getByRole('button', { name: 'Next' });
    this.resultButton = page.locator('div.quiz-button-container > button');
    this.uarResult = page.locator('.quiz-results h1');
    this.uarResult2 = page.locator('//div[contains(@data-path,"marquee-product")]//strong | //div[contains(@data-path,"check-bullet")]//h1 | //div[contains(@data-path,"express-product")]//h1');
    this.uarResult3 = page.locator('//div[contains(@data-path,"card")]//strong');
    this.screenshots = [];
  }

  /**
   * Select answer
   * @param {String} answer
   */
  async selectAnswer(answer) {
    const locator = `//*[text()="${answer}"]/ancestor::div[contains(@class,"quiz-option-text-container")]`;
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
  async clickEachAnswer(url, originalAnswer, keyNumber, version, isScreenshot = false, folderPath = 'screenshots/uar') {
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
          const desktopName = `${keyNumber} - ${version} - desktop - ${index} - ${answer.replace('/', '')}.png`;
          const tabletName = `${keyNumber} - ${version} - tablet - ${index} - ${answer.replace('/', '')}.png`;
          const mobileName = `${keyNumber} - ${version} - mobile - ${index} - ${answer.replace('/', '')}.png`;

          await this.webUtil.takeScreenshot(folderPath, desktopName, 1920, 1080);
          await this.webUtil.takeScreenshot(folderPath, tabletName, 768, 1024);
          await this.webUtil.takeScreenshot(folderPath, mobileName, 375, 812);

          this.screenshots.push(desktopName, tabletName, mobileName);
        }

        // click next button
        await this.clickNextButton();
      } else if (isScreenshot) {
        await this.page.waitForTimeout(500);
        const index = answers.length - 1;
        const desktopName = `${keyNumber} - ${version} - desktop - ${index} - ${answer.replace('/', '')}.png`;
        const tabletName = `${keyNumber} - ${version} - tablet - ${index} - ${answer.replace('/', '')}.png`;
        const mobileName = `${keyNumber} - ${version} - mobile - ${index} - ${answer.replace('/', '')}.png`;

        await this.webUtil.takeScreenshot(folderPath, desktopName, 1920, 1080);
        await this.webUtil.takeScreenshot(folderPath, tabletName, 768, 1024);
        await this.webUtil.takeScreenshot(folderPath, mobileName, 375, 812);

        this.screenshots.push(desktopName, tabletName, mobileName);
      }
    }

    // click get your results button
    await this.clickResultButton();
  }

  /**
   * Validate products on result page to match with expect products
   * @param {string} name
   */
  async checkResultPage(name, originalAnswer, keyNumber, version, isScreenshot = false, folderPath = 'screenshots/uar') {
    const newProduct = [];

    const actualProduct = await this.uarResult.nth(0);
    const text = await actualProduct.innerText();

    if (text.includes('We think you\'ll love')) {
      if (name.includes('3D')) {
        const actualProduct2 = await this.uarResult3.nth(0);
        newProduct.push(await actualProduct2.innerText());

        if (name.includes('double') || name.includes('triple')) {
          try {
            const actualProduct3 = await this.uarResult3.nth(1);
            newProduct.push(await actualProduct3.innerText());
          } catch (error) {
            if (error instanceof Error && error.message.includes('waiting for locator')) {
              console.info('No second product');
            }
          }
        }

        if (name.includes('triple')) {
          try {
            const actualProduct4 = await this.uarResult3.nth(2);
            newProduct.push(await actualProduct4.innerText());
          } catch (error) {
            if (error instanceof Error && error.message.includes('waiting for locator')) {
              console.info('No third product');
            }
          }
        }
      } else {
        const actualProduct2 = await this.uarResult2.nth(0);
        newProduct.push(await actualProduct2.innerText());

        if (name.includes('double') || name.includes('triple')) {
          try {
            const actualProduct3 = await this.uarResult2.nth(1);
            newProduct.push(await actualProduct3.innerText());
          } catch (error) {
            if (error instanceof Error && error.message.includes('waiting for locator')) {
              console.info('No second product');
            }
          }
        }

        if (name.includes('triple')) {
          try {
            const actualProduct4 = await this.uarResult2.nth(2);
            newProduct.push(await actualProduct4.innerText());
          } catch (error) {
            if (error instanceof Error && error.message.includes('waiting for locator')) {
              console.info('No third product');
            }
          }
        }
      }
    } else {
      newProduct.push(text);
    }

    if (isScreenshot) {
      await this.page.waitForTimeout(1000);

      const desktopName = `${keyNumber} - ${version} - desktop - result.png`;
      const tabletName = `${keyNumber} - ${version} - tablet - result.png`;
      const mobileName = `${keyNumber} - ${version} - mobile - result.png`;

      await this.webUtil.takeScreenshot(folderPath, desktopName, 1920, 1080);
      await this.webUtil.takeScreenshot(folderPath, tabletName, 768, 1024);
      await this.webUtil.takeScreenshot(folderPath, mobileName, 375, 812);

      this.screenshots.push(desktopName, tabletName, mobileName);
    }

    console.info(`==========new============\n${newProduct.sort().join('')}`);
    return newProduct.sort().join('');
  }

  async checkResultPageDX(value, keyNumber, version, isScreenshot = false, folderPath = 'screenshots/uar') {
    expect.soft(await this.page.url()).toContain(value);
    if (isScreenshot) {
      await this.page.waitForTimeout(1000);

      const desktopName = `${keyNumber} - ${version} - desktop - result.png`;
      const tabletName = `${keyNumber} - ${version} - tablet - result.png`;
      const mobileName = `${keyNumber} - ${version} - mobile - result.png`;

      await this.webUtil.takeScreenshot(folderPath, desktopName, 1920, 1080);
      await this.webUtil.takeScreenshot(folderPath, tabletName, 768, 1024);
      await this.webUtil.takeScreenshot(folderPath, mobileName, 375, 812);

      this.screenshots.push(desktopName, tabletName, mobileName);
    }
  }
}
