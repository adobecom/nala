module.exports = {
  name: 'FEDS Footer',
  features: [
    {
      name: '@footer',
      path: [
        '/libs/feds/drafts/qa/footer/feds-footer-page',
      ],
      envs: '@feds_live',
      tags: '@feds @feds-footer',
    },
    {
      name: '@footer',
      path: [
        '/acrobat/online/sign-pdf.html',
      ],
      envs: '@adobe_prod',
      tags: '@feds @feds-footer',
    },
  ],
};
