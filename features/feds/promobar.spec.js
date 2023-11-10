module.exports = {
  name: 'Promobar Block',
  features: [
    {
      name: '@FEDS-Promo-Checks',
      path: [
        '/libs/feds/drafts/qa/promo/feds-promo-bar',
      ],
      wcagTags: ['wcag2a', 'wcag2aa', 'wwcag21a', 'wcag21aa'],
      browserParams: '?georouting=off',
      envs: '@milo_live',
      tags: '@milo @feds @promobar @smoke @regression',
    },
  ],
};
