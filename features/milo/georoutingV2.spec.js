module.exports = {
  name: 'Georouting Version 2',
  features: [
    {
      name: '@georoutingV2',
      path: '/test/features/blocks/georouting',
      envs: '@milo_live',
      tags: '@georoutingV2 @georouting-close @georouting-multi @milo',
    },
    {
      name: '@georoutingV2',
      path: '/de/test/features/blocks/georouting',
      envs: '@milo_live',
      tags: '@georoutingV2 @milo',
    },
    {
      name: '@georoutingV2',
      path: '/test/features/blocks/georouting-off',
      envs: '@milo_live',
      tags: '@georouting-off @milo',
    },
    {
      name: '@georoutingV2',
      path: '/test/features/blocks/georouting-fallback-off',
      envs: '@milo_live',
      tags: '@fallback-off @milo',
    },
    {
      name: '@georoutingV2',
      path: '/test/features/blocks/georouting-fallback',
      envs: '@milo_live',
      tags: '@fallback-on @milo',
    },
  ],
};
