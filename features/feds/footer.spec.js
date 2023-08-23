module.exports = {
  name: 'Footer Block',
  features: [
    {
      name: '@FEDS-Default-Footer',
      path: [
        '/libs/feds/drafts/qa/footer/feds-default-footer',
      ],
      wcagTags: ['wcag2a', 'wcag2aa', 'wwcag21a', 'wcag21aa'],
      browserParams: '?georouting=off',
      envs: '@milo_live',
      tags: '@feds @footer @feds-footer',
    },
    {
      name: '@FEDS-Skinny-Footer',
      path: [
        '/libs/feds/drafts/qa/footer/feds-skinny-footer',
      ],
      wcagTags: ['wcag2a', 'wcag2aa', 'wwcag21a', 'wcag21aa'],
      browserParams: '?georouting=off',
      envs: '@milo_live',
      tags: '@feds @footer @feds-footer',
    },
    {
      name: '@FEDS-Privacy-Footer',
      path: [
        '/libs/feds/drafts/qa/footer/feds-privacy-footer',
      ],
      wcagTags: ['wcag2a', 'wcag2aa', 'wwcag21a', 'wcag21aa'],
      browserParams: '?georouting=off',
      envs: '@milo_live',
      tags: '@feds @footer @feds-footer',
    },
    {
      name: '@DC-Footer-Checks',
      path: [
        '/acrobat/online/sign-pdf.html',
      ],
      wcagTags: ['wcag2a', 'wcag2aa', 'wwcag21a', 'wcag21aa'],
      browserParams: '?georouting=off',
      envs: '@adobe_prod',
      tags: '@dc @footer @dc-footer',
    },
  ],
};
