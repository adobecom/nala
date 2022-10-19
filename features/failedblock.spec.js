module.exports = {
  name: 'Failed Blocks',
  features: [
    {
      name: '@failedblock',
      path: [
        '/customer-success-stories/',
        'customer-success-stories/jaguar-land-rover-case-study',
        '/customer-success-stories/abb-case-study',
        '/customer-success-stories/dentsu-isobar-case-study',
      ],
      envs: '@bacom',
      tags: '@failedblock',
    },
    {
      name: '@failedblock',
      path: [
        '/pages/artisthub/',
        '/pages/artisthub/learn',
      ],
      envs: '@stock',
      tags: '@failedblock',
    },
  ],
};
