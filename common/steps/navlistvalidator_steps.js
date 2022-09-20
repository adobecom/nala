/** @module common/steps */
const {Then} = require('@cucumber/cucumber');

Then(/^I run NavListValidator$/, runNavListValidator);
Then(/^I should not see error attributes, where it is expected to have nonused tab with "([^\"]*)"$/, checkForDataNavlistErrorAttributes);


/**
 * Step Definition:
 * ```
 * /^I run NavlistValidator$/
 * ```
 */
function runNavListValidator() {
  browser.execute(
      'window.dexter.NavListValidator.run();'
  );
}

/**
 * Step Definition:
 * ```
 * I should not see error attributes, where it is expected to have nonused tab with
 * * @param {string} tabOrder option given to ignore navlist author error for specific tab
 * ```
 */
function checkForDataNavlistErrorAttributes(tabOrder) {
  const elementsWithErrors = $$('[data-navlist-author-error]')
   if (tabOrder) {
       const tabNameAttribute = elementsWithErrors.length === 1 ? elementsWithErrors[0].getAttribute('data-navlist-author-error-item-names'): null;
       const expectedNavlistTab = tabNameAttribute ? $(`.navList [data-navlist-author-error="nonused-navitem"] [data-item-name${tabOrder}="${tabNameAttribute}"]`) : null;
       if (expectedNavlistTab) {
           expect(elementsWithErrors.length).toBe(1);
       } else {
           expect(elementsWithErrors.length).toBe(0);
       }
   } else {
     expect(elementsWithErrors.length).toBe(0);
   }
}

