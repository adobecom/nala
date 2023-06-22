/* eslint-disable no-restricted-syntax */
import { fedpub } from '../../selectors/cc/fedpub.selectors.js';

const { test } = require('@playwright/test');
const fedpubSpec = require('../../features/cc/fedpub.sanity.js');

const { features } = fedpubSpec;
const { WebUtil } = require('../../libs/webutil.js');

test('ulr has html ext' , async({page}) =>
{await page.goto(`${ba$seURL}{features[0].path}`)} );

await expert(page).toHaveURL('html');
