module.exports = {
  name: 'Consent Component',
  features: [
    {
      name: '@FEDS-Consent-Checks',
      path: [
        '/libs/feds/drafts/qa/consent/feds-consent-page',
      ],
      browserParams: '?customPrivacyLocation=de&hideGeorouting=on',
      envs: '@milo_live',
      tags: '@feds @consent @feds-consent',
    },
    {
      name: '@DC-Consent-Checks',
      path: [
        '/acrobat/online/sign-pdf.html',
      ],
      browserParams: '?customPrivacyLocation=de&hideGeorouting=on',
      envs: '@adobe_prod',
      tags: '@dc @consent @dc-consent',
    },
  ],
};
