module.exports = {
  name: 'FEDS Accessibility',
  features: [
    {
      name: '@A11y-on-FEDS-pages',
      path: [
        '/libs/feds/drafts/qa/search/feds-search-page',
        // '/libs/feds/drafts/qa/header/feds-header-page',
        // '/libs/feds/drafts/qa/footer/feds-footer-page',
        // '/libs/feds/drafts/qa/consent/feds-consent-page',
      ],
      envs: '@feds_live',
      tags: '@feds @a11y @feds-a11y',
    }
  ],
};
