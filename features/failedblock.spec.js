module.exports = {
  name: 'Failed Blocks',
  features: [
    {
      name: '@failedblock',
      path: [
        '/customer-success-stories/',
        '/customer-success-stories/ben-and-jerrys-case-study',
        '/customer-success-stories/abb-case-study',
      ],
      envs: '@bacom',
      tags: '@failedblock',
    },
    {
      name: '@failedblock',
      path: [
        '/pages/artisthub/',
        '/pages/artisthub/get-started',
        '/pages/artisthub/learn',
        '/pages/artisthub/get-inspired',
        '/pages/artisthub/get-inspired/creative-trends',
      ],
      envs: '@stock',
      tags: '@failedblock',
    },
  ],
};
