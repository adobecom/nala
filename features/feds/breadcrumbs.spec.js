module.exports = {
  name: 'Breadcrumbs Component',
  features: [
    {
      name: '@FEDS-Breadcrumbs-With-Base',
      path: [
        '/libs/feds/drafts/qa/breadcrumbs/feds-breadcrumbs-with-base',
      ],
      browserParams: '?hideGeorouting=on',
      envs: '@milo_live',
      tags: '@feds @breadcrumbs @feds-breadcrumbs',
    },
    {
      name: '@FEDS-Breadcrumbs-From-Document',
      path: [
        '/libs/feds/drafts/qa/breadcrumbs/feds-breadcrumbs-from-document',
      ],
      browserParams: '?hideGeorouting=on',
      envs: '@milo_live',
      tags: '@feds @breadcrumbs @feds-breadcrumbs',
    },
    {
      name: '@FEDS-Breadcrumbs-Hidden-Links',
      path: [
        '/libs/feds/drafts/qa/breadcrumbs/feds-breadcrumbs-hidden-links',
      ],
      browserParams: '?hideGeorouting=on',
      envs: '@milo_live',
      tags: '@feds @breadcrumbs @feds-breadcrumbs',
    },
    {
      name: '@FEDS-Breadcrumbs-No-Hidden-Links',
      path: [
        '/libs/feds/drafts/qa/breadcrumbs/feds-breadcrumbs-no-hidden-links',
      ],
      browserParams: '?hideGeorouting=on',
      envs: '@milo_live',
      tags: '@feds @breadcrumbs @feds-breadcrumbs',
    },
  ],
};
