module.exports = {
  name: 'Failed Block Check',
  features: [
    {
      name: '@failedblockCheck',
      path: ['/customer-success-stories/', '/customer-success-stories/ben-and-jerrys-case-study',
        '/customer-success-stories/abb-case-study'],
      envs: '@bacom',
      tags: '@failed-block',
    },
    {
      name: '@failedblockCheck',
      path: ['/pages/artisthub/', '/pages/artisthub/get-started', '/pages/artisthub/learn',
        '/pages/artisthub/get-inspired', '/pages/artisthub/get-inspired/creative-trends'],
      envs: '@stock',
      tags: '@failed-block',
    },
    {
      name: '@failedblockCheck',
      path: '',
      envs: '@bacomblog',
      tags: '@failed-block',
    },
    {
      name: '@failedblockCheck',
      path: '',
      envs: '@blog',
      tags: '@failed-block',
    },
    {
      name: '@failedblockCheck',
      path: '',
      envs: '@acrobat',
      tags: '@failed-block',
    },
  ],
};
