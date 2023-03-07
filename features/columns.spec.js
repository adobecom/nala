module.exports = {
  name: 'Columns',
  features: [
    {
      name: '@columns',
      path: '/test/features/blocks/columns',
      envs: '@milo_live',
      tags: '@columns-default @columns-table @visual-compare',
    },
    {
      name: '@columns',
      path: '/blog/basics/agile-vs-waterfall',
      envs: '@bacomblog_live',
      tags: '@columns-table @visual-compare',
    },
    {
      name: '@columns',
      path: '/en/publish/2022/07/28/announcing-2022-adobe-analytics-champions',
      envs: '@blog_live',
      tags: '@columns-default @visual-compare',
    },
  ],
};
