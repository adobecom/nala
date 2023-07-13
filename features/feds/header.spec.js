module.exports = {
  name: 'Header Block',
  features: [
    {
      name: '@FEDS-Header-Checks',
      path: [
        '/libs/feds/drafts/qa/header/feds-header-page',
      ],
      envs: '@milo_live',
      tags: '@feds @header @feds-header',
    },
    {
      name: '@DC-Header-Checks',
      path: [
        '/acrobat/online/sign-pdf.html',
      ],
      envs: '@adobe_prod',
      tags: '@dc @header @dc-header',
    },
  ],
};
