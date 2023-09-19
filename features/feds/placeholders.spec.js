module.exports = {
  name: 'Placeholders Checks',
  features: [
    {
      name: '@Milo-Placeholder-Checks',
      path: [
        '/placeholders.json',
        '/de/placeholders.json',
        '/fr/placeholders.json',
        '/jp/placeholders.json',
        '/uk/placeholders.json',
      ],
      envs: '@feds_live',
      tags: '@feds @placeholders @milo-placeholders',
    },
    {
      name: '@FEDS-Placeholder-Checks',
      path: [
        '/placeholders.json',
        '/de/placeholders.json',
        '/fr/placeholders.json',
        '/jp/placeholders.json',
        '/uk/placeholders.json',
      ],
      browserParams: '?sheet=feds',
      envs: '@feds_live',
      tags: '@feds @placeholders @feds-placeholders',
    },
  ],
};
