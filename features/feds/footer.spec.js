module.exports = {
  name: 'Footer Block',
  features: [
    {
      tcid: '0',
      name: '@FEDS-Default-Footer',
      path: [
        '/libs/feds/drafts/qa/footer/feds-default-footer',
      ],
      envs: '@feds_live',
      tags: '@feds @footer @feds-footer',
    },
    {
      tcid: '1',
      name: '@FEDS-Skinny-Footer',
      path: [
        '/libs/feds/drafts/qa/footer/feds-skinny-footer',
      ],
      envs: '@feds_live',
      tags: '@feds @footer @feds-footer',
    },
    {
      tcid: '2',
      name: '@FEDS-Privacy-Footer',
      path: [
        '/libs/feds/drafts/qa/footer/feds-privacy-footer',
      ],
      envs: '@milo_live',
      tags: '@feds @footer @feds-footer',
    },
    {
      name: '@DC-Footer-Checks',
      path: [
        '/acrobat/online/sign-pdf.html',
      ],
      envs: '@adobe_prod',
      tags: '@dc @footer @dc-footer',
    },
  ],
};
