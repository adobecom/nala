module.exports = {
  name: 'Columns Block',
  features: [
    {
      name: '@columns',
      path: '/test/features/blocks/columns',
      envs: '@milo_live',
      tags: '@milo @columns-default @columns-table @columns-visual @visual @smoke @regression @visual-smoke @visual-regression',
    },
    {
      name: '@columns',
      path: '/blog/basics/agile-vs-waterfall',
      envs: '@bacomblog_live',
      tags: '@milo @columns-table @columns-visual @visual @regression @visual-regression',
    },
    {
      name: '@columns',
      path: '/en/publish/2022/07/28/announcing-2022-adobe-analytics-champions',
      envs: '@blog_live',
      tags: '@milo @columns-default @columns-visual @visual @regression @visual-regression',
    },
    {
      name: '@columns',
      path: '/acrobat/online/sign-pdf.html',
      envs: '@adobe_prod',
      tags: '@milo @columns-default @smoke @regression',
    },
  ],
};
