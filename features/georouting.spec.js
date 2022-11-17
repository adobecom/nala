module.exports = {
  name: 'Georouting',
  features: [
    {
      name: '@georouting',
      path: [
        '/test/features/blocks/georouting',
        '/test/features/blocks/georouting-off',
        '/test/features/blocks/fallback-off',
      ],
      envs: '@milo',
      tags: '@georouting',
    },
    {
      name: '@georouting',
      path: '/customer-success-stories/princess-cruises-case-study',
      envs: '@bacom',
      tags: '@georouting',
    },
  ],
};
