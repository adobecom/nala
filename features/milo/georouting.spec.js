module.exports = {
  name: 'Georouting',
  features: [
    {
      name: '@georouting',
      path: '/test/features/blocks/georouting',
      envs: '@milo_live',
      tags: '@georouting @georouting-close @georouting-multi',
    },
    {
      name: '@georouting',
      path: '/de/test/features/blocks/georouting',
      envs: '@milo_live',
      tags: '@georouting',
    },
    {
      name: '@georouting',
      path: '/test/features/blocks/georouting-off',
      envs: '@milo_live',
      tags: '@georouting-off',
    },
    {
      name: '@georouting',
      path: '/test/features/blocks/georouting-fallback-off',
      envs: '@milo_live',
      tags: '@fallback-off',
    },
    {
      name: '@georouting',
      path: '/test/features/blocks/georouting-fallback',
      envs: '@milo_live',
      tags: '@fallback-on',
    },
    {
      name: '@georouting',
      path: '/customer-success-stories/princess-cruises-case-study',
      envs: '@bacom_live',
      tags: '@georouting',
    },
  ],
};
