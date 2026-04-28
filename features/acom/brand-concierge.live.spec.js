/**
 * Brand Concierge - ACOM live page tests
 *
 * These tests target pages where BC has been deployed into production
 * (ramped 100% or covered by an AB test). All URLs append
 * `?promoid=brandcon` to force BC to render in employee mode, bypassing
 * Target bucketing.
 *
 * Release status tracked here:
 *   - M1   100% LIVE    - Creative Cloud category pages
 *   - M1.5 100% LIVE    - 404 and Flash end-of-life
 *   - M1.5v2 50% LIVE   - Homepage marquee variant
 *   - M2 100% LIVE      - JDI pages (features, downloads)
 *
 * The query param is harmless when BC is not yet deployed; those tests
 * will just skip their BC assertions.
 */

const BC_PROMO_PARAM = '?promoid=brandcon';

module.exports = {
  FeatureName: 'Brand Concierge - ACOM live pages',
  features: [
    // ===== M1 - Creative Cloud category pages (100% LIVE) =====
    {
      tcid: '0',
      name: '@bc-live acom cc home',
      path: `/creativecloud.html${BC_PROMO_PARAM}`,
      envs: '@adobe_prod',
      tags: '@bc-live @bc-m1 @bc-acom @bc-inline @regression',
      data: { variant: 'inline' },
    },
    {
      tcid: '1',
      name: '@bc-live acom cc campaign pricing',
      path: `/creativecloud/adobe/campaign/pricing.html${BC_PROMO_PARAM}`,
      envs: '@adobe_prod',
      tags: '@bc-live @bc-m1 @bc-acom @bc-inline @regression',
      data: { variant: 'inline' },
    },
    {
      tcid: '2',
      name: '@bc-live acom cc photography apps',
      path: `/creativecloud/photography/apps.html${BC_PROMO_PARAM}`,
      envs: '@adobe_prod',
      tags: '@bc-live @bc-m1 @bc-acom @bc-inline @regression',
      data: { variant: 'inline' },
    },
    {
      tcid: '3',
      name: '@bc-live acom cc design',
      path: `/creativecloud/design.html${BC_PROMO_PARAM}`,
      envs: '@adobe_prod',
      tags: '@bc-live @bc-m1 @bc-acom @bc-inline @regression',
      data: { variant: 'inline' },
    },
    {
      tcid: '4',
      name: '@bc-live acom cc video',
      path: `/creativecloud/video.html${BC_PROMO_PARAM}`,
      envs: '@adobe_prod',
      tags: '@bc-live @bc-m1 @bc-acom @bc-inline @regression',
      data: { variant: 'inline' },
    },
    {
      tcid: '5',
      name: '@bc-live acom cc illustration',
      path: `/creativecloud/illustration.html${BC_PROMO_PARAM}`,
      envs: '@adobe_prod',
      tags: '@bc-live @bc-m1 @bc-acom @bc-inline @regression',
      data: { variant: 'inline' },
    },

    // ===== M1.5 - 404 + Flash end-of-life (100% LIVE) =====
    {
      tcid: '6',
      name: '@bc-live acom 404 page',
      path: `/error-pages/404.html${BC_PROMO_PARAM}`,
      envs: '@adobe_prod',
      tags: '@bc-live @bc-m1-5 @bc-acom @bc-inline @regression',
      data: { variant: 'inline' },
    },
    {
      tcid: '7',
      name: '@bc-live acom flash end-of-life',
      path: `/products/flashplayer/end-of-life-alternative.html${BC_PROMO_PARAM}`,
      envs: '@adobe_prod',
      tags: '@bc-live @bc-m1-5 @bc-acom @bc-inline @regression',
      data: { variant: 'inline' },
    },

    // ===== M2 JDI - 100% LIVE =====
    {
      tcid: '8',
      name: '@bc-live acom cc features',
      path: `/creativecloud/features.html${BC_PROMO_PARAM}`,
      envs: '@adobe_prod',
      tags: '@bc-live @bc-m2 @bc-acom @bc-inline @regression',
      data: { variant: 'inline' },
    },
    {
      tcid: '9',
      name: '@bc-live acom downloads',
      path: `/downloads.html${BC_PROMO_PARAM}`,
      envs: '@adobe_prod',
      tags: '@bc-live @bc-m2 @bc-acom @bc-inline @regression',
      data: { variant: 'inline' },
    },

    // ===== AB-bucketed / partial ramp (optional tag, excluded from regression) =====
    // M1.5v2 homepage marquee is at 50% treatment. Anonymous viewers may or
    // may not see it. Tracked with @bc-optional so nightly can opt in without
    // blocking regression runs.
    {
      tcid: '10',
      name: '@bc-live acom homepage marquee (50% AB)',
      path: `/${BC_PROMO_PARAM}`,
      envs: '@adobe_prod',
      tags: '@bc-live @bc-m1-5-v2 @bc-acom @bc-hero @bc-optional',
      data: { variant: 'hero' },
    },
  ],
};
