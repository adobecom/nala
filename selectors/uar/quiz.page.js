/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
const { WebUtil } = require('../../libs/webutil.js');
const { take } = require('../../libs/screenshot/take.js');

export default class Quiz {
  constructor(page) {
    this.page = page;
    this.webUtil = new WebUtil(page);
    this.nextButton = page.getByRole('button', { name: 'Next' });
    this.resultButton = page.locator('div.quiz-button-container > button');
    this.uarResult = page.locator('.quiz-results h1');
    this.uarResult2 = page.locator('//div[contains(@data-path,"marquee-product")]//strong | '
    + '//div[contains(@data-path,"check-bullet")]//h1 | '
    + '//div[contains(@data-path,"express-product")]//h1');
    this.uarResult3 = page.locator('//div[contains(@data-path,"card")]//h3');
    this.screenshots = [];
    this.quizInput = page.locator('#quiz-input');
    this.continueButton = page.getByRole('button', { name: 'Continue' });
    this.carouselNext = page.locator('.carousel-arrow.arrow-next');
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
  async clickEachAnswer(url, originalAnswer, keyNumber, version, project, folderPath, isScreenshot = false) {
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
          await this.takeScreenshot(
            keyNumber,
            version,
            index,
            answer,
            folderPath,
            project,
          );
        }

        // click next button
        await this.clickNextButton();
      } else if (isScreenshot) {
        await this.page.waitForTimeout(500);
        const index = answers.length - 1;
        await this.takeScreenshot(
          keyNumber,
          version,
          index,
          answer,
          folderPath,
          project,
        );
      }
    }

    // click get your results button
    await this.clickResultButton();
  }

  async takeScreenshot(keyNumber, version, index, answer, folderPath, project) {
    let fileName;

    if (answer === 'result') {
      fileName = `${keyNumber} - ${version} - ${project} - result`;
    } else {
      fileName = `${keyNumber} - ${version} - ${project} - ${index} - ${answer.replace('/', '')}`;
    }

    const result = await take(this.page, folderPath, fileName, {
      fullPage: true,
      style: '.global-navigation,.global-footer { display: none; }',
    });

    this.screenshots.push(result);
  }

  /**
   * Validate products on result page to match with expect products
   * @param {string} name
   */
  async checkResultPage(
    name,
    originalAnswer,
    keyNumber,
    version,
    project,
    folderPath,
    isScreenshot = false,
  ) {
    const newProduct = [];

    let currentUrl = await this.page.url();

    let actualProduct = await this.uarResult.nth(0);
    let text = await actualProduct.innerText();

    if (currentUrl.includes('milolibs=stage')) {
      currentUrl = await this.page.url();
      await this.page.goto(`${currentUrl}&milolibs=stage`);
      actualProduct = await this.uarResult.nth(0);
      text = await actualProduct.innerText();
    }

    currentUrl = await this.page.url();
    console.info(`currentUrl: ${currentUrl}`);

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

      await this.takeScreenshot(
        keyNumber,
        version,
        0,
        'result',
        folderPath,
        project,
      );
    }

    console.info(`==========new============\n${newProduct.sort().join('')}`);
    return newProduct.sort().join('');
  }

  async checkQuizEntry(url, key, keyNumber, version, project, folderPath, isScreenshot = false) {
    await this.page.goto(url);

    const answers = key.split('>').map((x) => x.trim());
    if (answers.length === 2) {
      await this.quizInput.fill(answers[0]);
      if (isScreenshot) {
        await this.page.waitForTimeout(500);

        const index = answers.indexOf(answers[0]);
        await this.takeScreenshot(
          keyNumber,
          version,
          index,
          answers[0],
          folderPath,
          project,
        );
      }
      await this.continueButton.click();
      await this.selectAnswer(answers[1]);
      if (isScreenshot) {
        await this.page.waitForTimeout(500);

        const index = answers.indexOf(answers[1]);
        await this.takeScreenshot(
          keyNumber,
          version,
          index,
          answers[1],
          folderPath,
          project,
        );
      }
      await this.resultButton.click();
      if (isScreenshot) {
        await this.page.waitForTimeout(1000);

        await this.takeScreenshot(
          keyNumber,
          version,
          0,
          'result',
          folderPath,
          project,
        );
      }
    } else {
      for (const answer of answers) {
        if (answer.includes('+')) {
          const options = answer.split('+').map((x) => x.trim());
          // select more than one answer
          for (const option of options) {
            if (option === 'PDFs' && project === 'iphone') {
              this.carouselNext.click();
              this.carouselNext.click();
              this.carouselNext.click();
            }
            await this.selectAnswer(option);
          }
        } else {
          // select one answer
          await this.selectAnswer(answer);
        }

        if (answers.indexOf(answer) < answers.length - 1 && answers.indexOf(answer) !== 0) {
          if (isScreenshot) {
            await this.page.waitForTimeout(500);

            const index = answers.indexOf(answer);
            await this.takeScreenshot(
              keyNumber,
              version,
              index,
              answer,
              folderPath,
              project,
            );
          }
          // click next button
          await this.clickNextButton();
        }

        if (answers.indexOf(answer) === 0) {
          if (isScreenshot) {
            await this.page.waitForTimeout(500);

            const index = answers.indexOf(answer);
            await this.takeScreenshot(
              keyNumber,
              version,
              index,
              answer,
              folderPath,
              project,
            );
          }
          await this.continueButton.click();
        }
      }

      // click get your results button
      await this.clickResultButton();
      if (isScreenshot) {
        await this.page.waitForTimeout(1000);

        await this.takeScreenshot(
          keyNumber,
          version,
          0,
          'result',
          folderPath,
          project,
        );
      }
    }
  }
}
