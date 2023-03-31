module.exports = {
  name: 'FEDS Header',
  features: [
    {
      name: '@header',
      path: [
        '/libs/feds/drafts/qa/header/feds-header-page',
      ],
      envs: '@feds_live',
      tags: '@feds @feds-header',
    },
  ],
};
