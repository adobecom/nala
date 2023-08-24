module.exports = {
  name: 'Consent Component',
  features: [
    {
      name: '@FEDS-Consent-Checks',
      path: [
        '/libs/feds/drafts/qa/consent/feds-consent-page',
      ],
      wcagTags: ['wcag2a', 'wcag2aa', 'wwcag21a', 'wcag21aa'],
      browserParams: '?customPrivacyLocation=de&georouting=off',
      envs: '@milo_live',
      tags: '@feds @consent @feds-consent',
    },
    {
      name: '@DC-Consent-Checks',
      path: [
        '/acrobat/online/sign-pdf.html',
      ],
      wcagTags: ['wcag2a', 'wcag2aa', 'wwcag21a', 'wcag21aa'],
      browserParams: '?customPrivacyLocation=de&georouting=off',
      envs: '@adobe_prod',
      tags: '@dc @consent @dc-consent',
    },
  ],
};
