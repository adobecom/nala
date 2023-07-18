module.exports = {
  name: 'Footer Block',
  features: [
    {
      name: '@FEDS-Default-Footer',
      path: [
        '/libs/feds/drafts/qa/footer/feds-default-footer',
      ],
      browserParams: '?hideGeorouting=on',
      envs: '@milo_live',
      tags: '@feds @footer @feds-footer',
    },
    {
      name: '@FEDS-Skinny-Footer',
      path: [
        '/libs/feds/drafts/qa/footer/feds-skinny-footer',
      ],
      browserParams: '?hideGeorouting=on',
      envs: '@milo_live',
      tags: '@feds @footer @feds-footer',
    },
    {
      name: '@FEDS-Privacy-Footer',
      path: [
        '/libs/feds/drafts/qa/footer/feds-privacy-footer',
      ],
      browserParams: '?hideGeorouting=on',
      envs: '@milo_live',
      tags: '@feds @footer @feds-footer',
    },
    {
      name: '@DC-Footer-Checks',
      path: [
        '/acrobat/online/sign-pdf.html',
      ],
      browserParams: '?hideGeorouting=on',
      envs: '@adobe_prod',
      tags: '@dc @footer @dc-footer',
    },
  ],
};
