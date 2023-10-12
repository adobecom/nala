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
      tags: '@milo @feds @consent @smoke @regression',
    },
    // !Note: To be moved/repurposed in @adobe_prod configured project!
    // {
    //   name: '@DC-Consent-Checks',
    //   path: [
    //     '/acrobat/online/sign-pdf.html',
    //   ],
    //   wcagTags: ['wcag2a', 'wcag2aa', 'wwcag21a', 'wcag21aa'],
    //   browserParams: '?customPrivacyLocation=de&georouting=off',
    //   envs: '@adobe_prod',
    //   tags: '@milo @feds @consent @smoke @regression',
    // },
  ],
};
