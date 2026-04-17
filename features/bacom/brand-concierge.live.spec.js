/**
 * Brand Concierge - BACOM live page tests
 *
 * BC ramp status on business.adobe.com:
 *   - M1.6  100% LIVE         - BC product page, inline entry blade
 *   - M2    IN PROGRESS (4/20) - Floating banner across ~32 BACOM pages.
 *                                URLs loaded from data/bacom/brand-concierge-m2-pages.yml
 *                                Tagged @bc-pending so they don't block regression
 *                                until the M2 ramp reaches 100%.
 *
 * `?promoid=brandcon` forces BC to render for employee / QA mode regardless
 * of Target bucketing. Paths are relative and combined with the project's
 * baseURL so the same spec can run against prod or stage.
 */

const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

const BC_PROMO_PARAM = '?promoid=brandcon';
const M2_DATA_FILE = path.join(__dirname, '../../data/bacom/brand-concierge-m2-pages.yml');

const { pages: m2Pages } = yaml.load(fs.readFileSync(M2_DATA_FILE, 'utf8'));

// M1.6 - inline entry blade, 100% LIVE on the BC product page.
const m16 = [
  {
    tcid: '0',
    name: '@bc-live bacom m1-6 brand-concierge product page',
    path: `/products/brand-concierge.html${BC_PROMO_PARAM}`,
    envs: '@bacom_prod @bacom_stage',
    tags: '@bc-live @bc-m1-6 @bc-bacom @bc-inline @regression',
    data: { variant: 'inline' },
  },
];

// M2 - floating banner overlay, one feature entry per page loaded from YAML.
const m2 = m2Pages.map((pagePath, index) => ({
  tcid: String(index + 1),
  name: `@bc-live bacom m2 floating - ${pagePath}`,
  path: `${pagePath}${BC_PROMO_PARAM}`,
  envs: '@bacom_prod @bacom_stage',
  // @bc-pending excludes from @regression until M2 ramps to 100%.
  // Flip to @regression (or add it) once the 20 Apr launch completes.
  tags: '@bc-live @bc-m2 @bc-bacom @bc-floating @bc-pending',
  data: { variant: 'floating' },
}));

module.exports = {
  FeatureName: 'Brand Concierge - BACOM live pages',
  features: [...m16, ...m2],
};
