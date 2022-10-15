module.exports = {
  name: 'Columns',
  features: [
    {
      name: '@columns',
      path: '/test/features/blocks/columns',
      envs: '@milo',
      tags: '@columns-contained @columns-contained-middle @columns-default',
    },
    {
      name: '@table',
      path: '/test/features/blocks/columns',
      envs: '@milo',
      tags: '@columns-contained-table @columns-table',
    },
    {
      name: '@table',
      path: '/blog/basics/agile-vs-waterfall',
      envs: '@bacomblog',
      tags: '@columns-table',
    },
    {
      name: '@columns',
      path: '/en/publish/2022/07/28/announcing-2022-adobe-analytics-champions',
      envs: '@blog',
      tags: '@columns-default',
    },
  ],
};
