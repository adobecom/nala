/** @module javelin/steps */
const { Given } = require('cucumber');
const { Then } = require('cucumber');
const { When } = require('cucumber');
const {
  requestGetJson
} = require('../../common/support/functions/request_sync');
const {
  compareValues
} = require('../../common/support/functions/compareValues');


Then(/^I should see "([^\"]*)" consonant cards$/, iShouldSeeNConsonantCards);

Then(/^I should see "([^\"]*)" consonant card has linked title$/, iShouldSeeNthCardLinkedTitle);

Then(/^I should see "([^\"]*)" consonant card has title$/, iShouldSeeNthCardLinkedTitle);

Then(/^I should see "([^\"]*)" consonant card has description$/, iShouldSeeNthCardDescription);

Then(/^I should see "([^\"]*)" consonant card has valid image$/, iShouldSeeNthCardValidImage);

Then(/^I should see "([^\"]*)" consonant card has session date$/, iShouldSeeNthCardSessionDate);

Then(/^I should see "([^\"]*)" consonant card has "([^\"]*)" link$/, iShouldSeeNthCardLink);

Then(/^I should see card collection has cards$/, iShouldSeeCardCollectionHasCards);

Then(/^I should see "([^\"]*)" half-height card carousel on page with matching info:$/, iSeeCardCarouselSessions);

/**
 * Step Definition:
 * ```
 * /^Then I should see card collection has cards$/
 * ```
 */
 function iShouldSeeCardCollectionHasCards() {
    let cards = $$('.card-consonant');
    cards = cards.filter(card => card.isDisplayed());
    let cardCount = cards.length;
    expect(cardCount).toBeGreaterThan(0);
  }

/**
 * Step Definition:
 * ```
 * /^Then I should see "([^\"]*)" consonant cards$/
 * @param {string} n Number of cards to be verified for existence
 * ```
 */
 function iShouldSeeNConsonantCards(n) {
    let nCards = parseInt(n);
    let cards = $$('.card-consonant');
    cards = cards.filter(card => card.isDisplayed());
    let cardCount = cards.length;
    expect(cardCount).toEqual(nCards);
  }



/**
 * Step Definition:
 * ```
 * /^Then I should see "([^\"]*)" consonant card has linked title$/
 * @param {string} n Number of cards to be verified for existence
 * ```
 */
 function iShouldSeeNthCardLinkedTitle(n) {
    let nCards = parseInt(n);
     expect(browser.$(`.card-consonant:nth-of-type(${nCards}) .card_title a`)).toExist;
  }

  /**
   * Step Definition:
   * ```
   * /^Then I should see "([^\"]*)" consonant card has title$/
   * @param {string} n Number of cards to be verified for existence
   * ```
   */
   function iShouldSeeNthCardTitle(n) {
    let nCards = parseInt(n);
     expect(browser.$(`.card-consonant:nth-of-type(${nCards}) .card_title`)).toExist;
  }

  /**
   * Step Definition:
   * ```
   * /^Then I should see "([^\"]*)" consonant card has description$/
   * @param {string} n Number of cards to be verified for existence
   * ```
   */
   function iShouldSeeNthCardDescription(n) {
    let nCards = parseInt(n);
     expect(browser.$(`.card-consonant:nth-of-type(${nCards}) .card_description`)).toExist;
  }

  /**
   * Step Definition:
   * ```
   * /^Then I should see "([^\"]*)" consonant card has valid image$/
   * @param {string} n Number of cards to be verified for existence
   * ```
   */
   function iShouldSeeNthCardValidImage(n) {
    let nCards = parseInt(n);
    let imageLink = $(`.card-consonant:nth-of-type(${nCards}) .card_image img`).getAttribute("src");
     expect(browser.$(`.card-consonant:nth-of-type(${nCards}) .card_image img`)).toExist;
     expect(requestGet(imageLink).status).toBe(200);
  }

  /**
   * Step Definition:
   * ```
   * /^Then I should see "([^\"]*)" consonant card has session date$/
   * @param {string} n Number of cards to be verified for existence
   * ```
   */
   function iShouldSeeNthCardSessionDate(n) {
    let nCards = parseInt(n);
     expect(browser.$(`.card-consonant:nth-of-type(${nCards}) .date`)).toExist;
  }

  /**
   * Step Definition:
   * ```
   * /^I should see "nth" consonant card has "text" link$/
   * ```
   * @param {string} nth Button name
   * @param {string} text Link text
   */
   function iShouldSeeNthCardLink(nth, text) {
    let nCards = parseInt(nth);
    text = localize(text);
    expect(browser.$(`.card-consonant:nth-of-type(${nCards}) .card_footer a`)).toExist;
    expect(browser.$(`.card-consonant:nth-of-type(${nCards}) .card_footer a`)).toHaveText(text);
  }

  /**
   * Step Definition:
   * ```
   * /^I should see "([^\"]*)" half-height card carousel on page with matching info:$/
   * ```
   * @param {string} nth Nth carousel data is being checked for
   * @param {object} table table with info about card
   */
   function iSeeCardCarouselSessions(nth, table) {
     let index = 0;
    let nCarousel = parseInt(nth);
    for (let item of table.raw()) {
      expect($$(`.consonantcardcollection:nth-of-type(${nCarousel}) .consonant-Card.consonant-HalfHeightCard`).length).toEqual(table.raw().length);
      expect($(`.consonantcardcollection:nth-of-type(${nCarousel}) .consonant-Card.consonant-HalfHeightCard:nth-of-type(${index+1})`).getAttribute('href')).toContain(item[0]);
      // expect($(`.consonantcardcollection:nth-of-type(${nCarousel}) .consonant-Card.consonant-HalfHeightCard:nth-of-type(${index+1}) .consonant-HalfHeightCard-title`).getText()).toContain(item[2]);
      index++;
    }
  }

    /**
   * Step Definition:
   * ```
   * /^I should see "([^\"]*)" 4up NS card collection on page with matching info:$/
   * ```
   * @param {string} nth Nth carousel data is being checked for
   * @param {object} table table with info about card
   */
     function iSeeNSCardCarouselSessions(nth, table) {
      let index = 0;
      let nCarousel = parseInt(nth);
      for (let item of table.raw()) {
        expect($$(`.cardcollection:nth-of-type(${nCarousel}) .cardCollection-consonant.collectionLayout-4up .card`).length).toEqual(table.raw().length);
        expect($$(`.cardcollection:nth-of-type(${nCarousel}) .cardCollection-consonant.collectionLayout-4up .card:nth-of-type(${index+1})`).getAttribute('href')).toContain(item[0]);
        index++;
      }
   }
