module.exports = {
  name: 'Marketo',
  features: [
    {
      name: '@marketo',
      path: [
        '/test/features/blocks/marketo-rfi',
        '/test/features/blocks/marketo-form-modal#form',
      ],
      envs: '@milo_live',
      tags: '@marketo @milo',
    },
  ],
};
