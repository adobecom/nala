module.exports = {
  name: 'Breadcrumbs Component',
  features: [
    {
      name: '@FEDS-Breadcrumbs-With-Base',
      path: [
        '/libs/feds/drafts/qa/breadcrumbs/feds-breadcrumbs-with-base',
      ],
      browserParams: '?georouting=off',
      envs: '@milo_live',
      tags: '@milo @feds @breadcrumbs @smoke @regression',
    },
    {
      name: '@FEDS-Breadcrumbs-From-Document',
      path: [
        '/libs/feds/drafts/qa/breadcrumbs/feds-breadcrumbs-from-document',
      ],
      browserParams: '?georouting=off',
      envs: '@milo_live',
      tags: '@milo @feds @breadcrumbs @smoke @regression',
    },
    {
      name: '@FEDS-Breadcrumbs-Hidden-Links',
      path: [
        '/libs/feds/drafts/qa/breadcrumbs/feds-breadcrumbs-hidden-links',
      ],
      browserParams: '?georouting=off',
      envs: '@milo_live',
      tags: '@milo @feds @breadcrumbs @smoke @regression',
    },
    {
      name: '@FEDS-Breadcrumbs-No-Hidden-Links',
      path: [
        '/libs/feds/drafts/qa/breadcrumbs/feds-breadcrumbs-no-hidden-links',
      ],
      browserParams: '?georouting=off',
      envs: '@milo_live',
      tags: '@milo @feds @breadcrumbs @smoke @regression',
    },
  ],
};
