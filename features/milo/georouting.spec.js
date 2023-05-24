module.exports = {
  name: 'Georouting Component',
  features: [
    {
      name: '@Georouting Text US Page',
      path: '/test/features/blocks/georouting',
      envs: '@milo_live @milo_prod',
      tags: '@georouting @georouting-close @georouting-multi @milo @smoke @regression',
    },
    {
      name: '@Georouting Text DE Page',
      path: '/de/test/features/blocks/georouting',
      envs: '@milo_live @milo_prod',
      tags: '@georouting @milo @smoke @regression',
    },
    {
      name: '@Georouting Turned Off',
      path: '/test/features/blocks/georouting-off',
      envs: '@milo_live @milo_prod',
      tags: '@georouting-off @milo @smoke @regression',
    },
    {
      name: '@Georouting Fallback Off',
      path: '/test/features/blocks/georouting-fallback-off',
      envs: '@milo_live @milo_prod',
      tags: '@fallback-off @milo @smoke @regression',
    },
    {
      name: '@Georouting Fallback On',
      path: '/test/features/blocks/georouting-fallback',
      envs: '@milo_live @milo_prod',
      tags: '@fallback-on @milo @smoke @regression',
    },
  ],
};
