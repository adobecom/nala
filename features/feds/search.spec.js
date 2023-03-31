module.exports = {
  name: 'FEDS Search',
  features: [
    {
      name: '@search',
      path: [
        '/libs/feds/drafts/qa/search/feds-search-page',
      ],
      envs: '@feds_live',
      tags: '@feds-search',
    },
  ],
};
