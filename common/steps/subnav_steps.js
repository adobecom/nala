/** @module common/steps */
const { Given } = require('@cucumber/cucumber');
const { Then } = require('@cucumber/cucumber');
const { When } = require('@cucumber/cucumber');

import localize from '../../common/support/functions/localize';

Then(
  /^I should see the subnav link for each menu item$/,
  iShouldSeeTheSubnavLinkForEachMenuItem
);

Then(
  /^I should see the sublinks for each (?:verb|item) below under "(.*)"$/,
  iShouldSeeTheSublinksForEachVerbBelowUnderSubnavitem
);

/**
 * Step Definition:
 * ```
 * /^I should see the subnav link for each menu item$/
 * ```
 * @param {string[][]} table Subnav menus (name, URL)
 */
function iShouldSeeTheSubnavLinkForEachMenuItem(table) {
  let index = 0;
  let rawTable = table.raw();
  let loc = browser.config.profile.locale;

  for (let [title, url] of rawTable) {
    let verbTitle = localize(title);

    expect(this.page.subnavMenuItems[index].getText()).toContain(verbTitle);

    if (url === '#') {
      try {
        expect(this.page.subnavMenuItems[index].getAttribute('href')).toContain(
          url
        );
      } catch {
        expect(
          this.page.subnavMenuItems[index].getAttribute('aria-haspopup')
        ).toEqual('true');
      }
    } else {
      let expectUrl = url[0] === '/' ? `${loc}${url}` : `${loc}/${url}`;
      expect(this.page.subnavMenuItems[index].getAttribute('href')).toContain(
        expectUrl
      );
    }

    index++;
  }
}

/**
 * Step Definition:
 * ```
 * /^I should see the sublinks for each verb below under "(.*)"$/
 * ```
 * @param {string} subnavItem Subnav menu
 * @param {string[][]} table Subnav links (name, URL)
 */
function iShouldSeeTheSublinksForEachVerbBelowUnderSubnavitem(
  subnavItem,
  table
) {
  let rawTable = table.raw();
  let loc = browser.config.profile.locale;

  let item = this.page.subnavMenuItems.find(
    x => x.getText() === localize(subnavItem)
  );

  item.click();

  for (let [index, submenuItem] of this.page.subnavMenuSubmenuItems.entries()) {
    let verbTitle = localize(rawTable[index][0]);
    let url = rawTable[index][1];
    let expectedUrl = null;
    if (url.startsWith('https:')) {
      expectedUrl = url;
    } else {
      expectedUrl = url[0] === '/' ? `${loc}${url}` : `${loc}/${url}`;
    }

    expect(submenuItem.getText()).toContain(verbTitle);
    expect(submenuItem.getAttribute('href')).toContain(expectedUrl);
    console.log(
      submenuItem.getText() + '\t|\t' + submenuItem.getAttribute('href')
    );
  }
}
