module.exports = {
  name: 'Consent Component',
  features: [
    {
      name: '@FEDS-Consent-Checks',
      path: [
        '/libs/feds/drafts/qa/consent/feds-consent-page',
      ],
      envs: '@feds_live',
      tags: '@feds @consent @feds-consent',
    },
    {
      name: '@DC-Consent-Checks',
      path: [
        '/acrobat/online/sign-pdf.html',
      ],
      envs: '@adobe_prod',
      tags: '@dc @consent @dc-consent',
    },
  ],
};
