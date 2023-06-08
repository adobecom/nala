/* eslint-disable quote-props */
/* eslint-disable import/named */
/* eslint-disable import/no-import-module-exports */

import { expect } from '@playwright/test';

import { WebUtil } from '../../libs/webutil.js';

export default class Columns {
  constructor(page) {
    this.page = page;
    // columns  locators
    this.column = this.page.locator('.columns');
    this.rows = this.column.locator('.row');
    this.columns = this.column.locator('.col');

    // columns blocks css
    this.cssProperties = {
      '.columns > .row': {
        'display': 'grid',
        'gap': /^32px.*/,
        'margin-bottom': '16px',
        'grid-template-columns': /^(\d+(?:\.\d+)?px\s?)+$/,
      },

      '.columns.contained': {
        'max-width': /^\d{2}/,
        'margin': /^0px.*/,
      },

      '.columns.contained.middle': { 'align-items': 'center' },

      '.columns.table': { 'font-size': '14px' },

      '.columns.table > .row:first-child': {
        'text-transform': 'uppercase',
        'font-size': '11px',
        'font-weight': '700',
        'letter-spacing': '1px',
      },

      '.columns.table > .row': {
        'margin-bottom': '0px',
        'padding': /^16px.*/,
        'grid-template-columns': /^(\d+(?:\.\d+)?px\s?)+$/,
        'border-bottom': /^1px.*/,
        'align-items': 'center',
      },
    };

    // columns blocks attributes
    this.attProperties = {
      'columns': { 'class': 'columns' },
      'columns-contained': { 'class': 'columns contained' },
      'columns-contained-middle': { 'class': 'columns contained middle' },
      'columns-table': { 'class': 'columns table' },
      'columns-contained-table': { 'class': 'columns contained table' },
    };
  }

  /**
 * Verifies the visibility, css, attributes, styles, of elements or sections of
 * the specified Columns block.
 * @param {string} quoteType - The type of the Columns block to verify.
 * Possible values are 'columns', 'columns (contained)', 'columns (contained,middle)',and
 * columns (table),columns (contained,table),
 * @returns {Promise<boolean>} - Returns true if the specified Column type has the expected values.
 */
  async verifyColumns(columnType, data) {
    // verify column block is visible
    await expect(await this.column).toBeVisible();

    // verify rows and columns count
    await expect(await this.rows).toHaveCount(data.rows);
    await expect(await this.columns).toHaveCount(data.columns);

    // verify columns text
    await expect(await this.columns.nth(0)).toContainText(data.col0);
    await expect(await this.columns.nth(1)).toContainText(data.col1);

    // verify the css of columns row
    if (!columnType.includes('table')) {
      expect(await WebUtil.verifyCSS(
        await this.rows.nth(0),
        this.cssProperties['.columns > .row'],
      )).toBeTruthy();
    }

    switch (columnType) {
      case 'columns':
        // verify the attributes of columns type block
        expect(await WebUtil.verifyAttributes(
          await this.column,
          this.attProperties.columns,
        )).toBeTruthy();
        // verify third column content
        await expect(await this.columns.nth(2)).toContainText(data.col2);
        return true;

      case 'columns(contained)':
        // verify the attributes of columns type block
        expect(await WebUtil.verifyAttributes(
          await this.column,
          this.attProperties['columns-contained'],
        )).toBeTruthy();

        // verify the css of columns row
        expect(await WebUtil.verifyCSS(
          await this.column.nth(0),
          this.cssProperties['.columns.contained'],
        )).toBeTruthy();

        return true;

      case 'columns(contained,middle)':
        // verify the attributes of columns type block
        expect(await WebUtil.verifyAttributes(
          await this.column,
          this.attProperties['columns-contained-middle'],
        )).toBeTruthy();

        // verify the css of columns row
        expect(await WebUtil.verifyCSS(
          await this.column.nth(0),
          this.cssProperties['.columns.contained'],
        )).toBeTruthy();
        return true;

      case 'columns(table)':
        // verify the attributes of columns type block
        expect(await WebUtil.verifyAttributes(
          await this.column,
          this.attProperties['columns-table'],
        )).toBeTruthy();

        // verify the css of columns first row
        expect(await WebUtil.verifyCSS(
          await this.rows.nth(0),
          this.cssProperties['.columns.table > .row:first-child'],
        )).toBeTruthy();

        expect(await WebUtil.verifyCSS(
          await this.rows.nth(1),
          this.cssProperties['.columns.table > .row'],
        )).toBeTruthy();

        // verify columns text
        await expect(await this.columns.nth(2)).toContainText(data.col2);
        await expect(await this.columns.nth(3)).toContainText(data.col3);

        return true;

      case 'columns(contained,table)':
        // verify the attributes of columns type block
        expect(await WebUtil.verifyAttributes(
          await this.column,
          this.attProperties['columns-contained-table'],
        )).toBeTruthy();

        // verify the css of columns first row
        expect(await WebUtil.verifyCSS(
          await this.rows.nth(0),
          this.cssProperties['.columns.table > .row:first-child'],
        )).toBeTruthy();

        expect(await WebUtil.verifyCSS(
          await this.rows.nth(1),
          this.cssProperties['.columns.table > .row'],
        )).toBeTruthy();

        // verify columns text
        await expect(await this.columns.nth(2)).toContainText(data.col2);
        await expect(await this.columns.nth(3)).toContainText(data.col3);

        return true;
      default:
        throw new Error(`Unsupported Text type: ${this.columnsType}`);
    }
  }
}
