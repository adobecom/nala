/**
 * Brand Concierge - BACOM live page tests
 *
 * BC ramp status on business.adobe.com:
 *   - M1.6 100% LIVE  - BC product page
 *   - M2   IN PROGRESS - ~30 BACOM pages with floating button (TBD)
 *
 * `?promoid=brandcon` forces BC render for employee/QA mode.
 */

const BC_PROMO_PARAM = '?promoid=brandcon';

module.exports = {
  FeatureName: 'Brand Concierge - BACOM live pages',
  features: [
    // ===== M1.6 BACOM BC product page (100% LIVE, no Target) =====
    // Full URL used because the BACOM playwright config targets aem.live,
    // but this page lives on business.adobe.com in production.
    {
      tcid: '0',
      name: '@bc-live bacom brand-concierge product page',
      path: `https://business.adobe.com/products/brand-concierge.html${BC_PROMO_PARAM}`,
      envs: '@bacom_prod',
      tags: '@bc-live @bc-m1-6 @bc-bacom @bc-inline @regression',
      data: { variant: 'inline' },
    },

    // ===== M2 BACOM floating (IN PROGRESS, placeholder) =====
    // When the full ~30-page list ramps live, add entries below using
    // variant: 'floating'. Skipping for now while still in planning.
  ],
};
