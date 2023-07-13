module.exports = {
  name: 'Jarvis Component',
  features: [
    {
      tcid: '0',
      name: '@FEDS-Jarvis-Default',
      path: [
        '/libs/feds/drafts/qa/jarvis/feds-jarvis-default',
      ],
      envs: '@milo_live',
      tags: '@feds @jarvis @feds-jarvis',
    },
    {
      tcid: '1',
      name: '@FEDS-Jarvis-Desktop',
      path: [
        '/libs/feds/drafts/qa/jarvis/feds-jarvis-desktop',
      ],
      envs: '@milo_live',
      tags: '@feds @jarvis @feds-jarvis',
    },
    {
      tcid: '2',
      name: '@FEDS-Jarvis-Disabled',
      path: [
        '/libs/feds/drafts/qa/jarvis/feds-jarvis-disabled',
      ],
      envs: '@milo_live',
      tags: '@feds @jarvis @feds-jarvis',
    },
    {
      tcid: '3',
      name: '@FEDS-Jarvis-Mobile',
      path: [
        '/libs/feds/drafts/qa/jarvis/feds-jarvis-mobile',
      ],
      envs: '@milo_live',
      tags: '@feds @jarvis @feds-jarvis',
    },
  ],
};
