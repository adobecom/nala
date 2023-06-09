module.exports = {
  name: 'Footer Block',
  features: [
    {
      name: '@FEDS-Footer-Checks',
      path: [
        '/libs/feds/drafts/qa/footer/feds-footer-page',
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
