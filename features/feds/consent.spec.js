module.exports = {
  name: 'FEDS Consent',
  features: [
    {
      name: '@consent',
      path: [
        '/libs/feds/drafts/qa/consent/feds-consent-page',
      ],
      envs: '@feds_live',
      tags: '@feds @feds-consent',
    },
  ],
};
