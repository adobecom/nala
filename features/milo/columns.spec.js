module.exports = {
  name: 'Columns',
  features: [
    {
      name: '@columns',
      path: '/test/features/blocks/columns',
      envs: '@milo_live',
      tags: '@columns-default @columns-table @columns-visual @visual @smoke @regression @visual-smoke @visual-regression',
    },
    {
      name: '@columns',
      path: '/blog/basics/agile-vs-waterfall',
      envs: '@bacomblog_live',
      tags: '@columns-table @columns-visual @visual @regression @visual-regression',
    },
    {
      name: '@columns',
      path: '/en/publish/2022/07/28/announcing-2022-adobe-analytics-champions',
      envs: '@blog_live',
      tags: '@columns-default @columns-visual @visual @regression @visual-regression',
    },
    {
      name: '@columns',
      path: '/acrobat/online/sign-pdf.html',
      envs: '@adobe_prod',
      tags: '@columns-default @smoke @regression',
    },
  ],
};
