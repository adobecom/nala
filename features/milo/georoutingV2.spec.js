module.exports = {
  name: 'Georouting V2',
  features: [
    {
      name: '@georoutingV2',
      path: '/test/features/blocks/georouting',
      envs: '@milo_live',
      tags: '@milo @georoutingV2 @georouting-close @georouting-multi',
    },
    {
      name: '@georoutingV2',
      path: '/de/test/features/blocks/georouting',
      envs: '@milo_live',
      tags: '@milo @georoutingV2',
    },
    {
      name: '@georoutingV2',
      path: '/test/features/blocks/georouting-off',
      envs: '@milo_live',
      tags: '@milo @georouting-off',
    },
    {
      name: '@georoutingV2',
      path: '/test/features/blocks/georouting-fallback-off',
      envs: '@milo_live',
      tags: '@milo @fallback-off',
    },
    {
      name: '@georoutingV2',
      path: '/test/features/blocks/georouting-fallback',
      envs: '@milo_live',
      tags: '@milo @fallback-on',
    },
  ],
};
