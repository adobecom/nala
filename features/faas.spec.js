module.exports = {
  name: 'FaaS Blocks',
  features: [
    {
      name: '@faas',
      path: [
        '/customer-success-stories/',
        '/customer-success-stories/jaguar-land-rover-case-study',
        '/customer-success-stories/abb-case-study',
        '/customer-success-stories/dentsu-isobar-case-study',
      ],
      envs: '@bacom',
      tags: '@faasblock',
    },
    {
      name: '@faas',
      path: [
        '/pages/artisthub/',
      ],
      envs: '@milo',
      tags: '@faasblock',
    },
  ],
};
