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
    {
      name: '@search',
      path: [
        '/acrobat/online/sign-pdf.html',
      ],
      envs: '@adobe_prod',
      tags: '@feds-search',
    },
  ],
};
