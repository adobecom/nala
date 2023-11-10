module.exports = {
  name: 'Promobar Block',
  features: [
    {
      name: '@FEDS-Promo-Checks',
      path: [
        '/libs/feds/drafts/qa/promo/feds-promo-bar',
      ],
      browserParams: '?georouting=off',
      envs: '@milo_live',
      tags: '@milo @feds @promobar @smoke @regression',
    },
  ],
};
