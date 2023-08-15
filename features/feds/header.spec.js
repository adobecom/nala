module.exports = {
  name: 'Header Block',
  features: [
    {
      name: '@FEDS-Header-Checks',
      path: [
        '/libs/feds/drafts/qa/header/feds-header-page',
      ],
      wcagTags: ['wcag2a', 'wcag2aa', 'wwcag21a', 'wcag21aa'],
      browserParams: '?hideGeorouting=on',
      envs: '@milo_live',
      tags: '@feds @header @feds-header',
    },
    {
      name: '@DC-Header-Checks',
      path: [
        '/acrobat/online/sign-pdf.html',
      ],
      wcagTags: ['wcag2a', 'wcag2aa', 'wwcag21a', 'wcag21aa'],
      browserParams: '?hideGeorouting=on',
      envs: '@adobe_prod',
      tags: '@dc @header @dc-header',
    },
  ],
};
