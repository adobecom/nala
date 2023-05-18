module.exports = {
  name: 'Column Blocks',
  features: [
    {
      name: '@columns',
      path: '/test/features/blocks/columns',
      envs: '@milo_live',
      tags: '@milo @columns-default @columns-table',
    },
    {
      name: '@columns',
      path: '/blog/basics/agile-vs-waterfall',
      envs: '@bacomblog_live',
      tags: '@milo @columns-table',
    },
    {
      name: '@columns',
      path: '/en/publish/2022/07/28/announcing-2022-adobe-analytics-champions',
      envs: '@blog_live',
      tags: '@milo @columns-default',
    },
    {
      name: '@columns',
      path: '/acrobat/online/sign-pdf.html',
      envs: '@adobe_prod',
      tags: '@milo @columns-default',
    },
  ],
};
