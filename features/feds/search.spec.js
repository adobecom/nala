module.exports = {
  name: 'Search Component',
  features: [
    {
      name: '@FEDS-Search-Checks',
      path: [
        '/libs/feds/drafts/qa/search/feds-search-page',
      ],
      envs: '@milo_live',
      tags: '@feds @search @feds-search',
    },
    {
      name: '@DC-Search-Checks',
      path: [
        '/acrobat/online/sign-pdf.html',
      ],
      envs: '@adobe_prod',
      tags: '@dc @search @feds-search',
    },
  ],
};
