module.exports = {
  name: 'Header Block',
  features: [
    {
      name: '@FEDS-Header-Checks',
      path: [
        '/libs/feds/drafts/qa/header/feds-header-page',
      ],
      wcagTags: ['wcag2a', 'wcag2aa', 'wwcag21a', 'wcag21aa'],
      browserParams: '?georouting=off',
      envs: '@milo_live',
      tags: '@milo @feds @header @smoke @regression',
    },
    // !Note: To be moved/repurposed in @adobe_prod configured project!
    // {
    //   name: '@DC-Header-Checks',
    //   path: [
    //     '/acrobat/online/sign-pdf.html',
    //   ],
    //   wcagTags: ['wcag2a', 'wcag2aa', 'wwcag21a', 'wcag21aa'],
    //   browserParams: '?georouting=off',
    //   envs: '@adobe_prod',
    //   tags: '@dc @header @dc-header',
    // },
  ],
};
