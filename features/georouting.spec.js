module.exports = {
  name: 'Georouting',
  features: [
    {
      name: '@georouting',
      path: [
        '/drafts/vhargrave/georouting',
        '/test/features/blocks/georouting',
      ],
      envs: '@milo',
      tags: '@georouting',
    },
    {
      name: '@georouting',
      path: '/test/features/blocks/georouting-off',
      envs: '@milo',
      tags: '@georouting-off',
    },
    {
      name: '@georouting',
      path: '/test/features/blocks/fallback-off',
      envs: '@milo',
      tags: '@fallback-off',
    },
    {
      name: '@georouting',
      path: '/customer-success-stories/princess-cruises-case-study',
      envs: '@bacom',
      tags: '@georouting',
    },
  ],
};
