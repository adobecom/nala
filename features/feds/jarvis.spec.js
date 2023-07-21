module.exports = {
  name: 'Jarvis Component',
  features: [
    {
      name: '@FEDS-Jarvis-Default',
      path: [
        '/libs/feds/drafts/qa/jarvis/feds-jarvis-default',
      ],
      browserParams: '?hideGeorouting=on',
      envs: '@milo_live',
      tags: '@feds @jarvis @feds-jarvis',
    },
    {
      name: '@FEDS-Jarvis-Desktop',
      path: [
        '/libs/feds/drafts/qa/jarvis/feds-jarvis-desktop',
      ],
      browserParams: '?hideGeorouting=on',
      envs: '@milo_live',
      tags: '@feds @jarvis @feds-jarvis',
    },
    {
      name: '@FEDS-Jarvis-Disabled',
      path: [
        '/libs/feds/drafts/qa/jarvis/feds-jarvis-disabled',
      ],
      browserParams: '?hideGeorouting=on',
      envs: '@milo_live',
      tags: '@feds @jarvis @feds-jarvis',
    },
    {
      name: '@FEDS-Jarvis-Mobile',
      path: [
        '/libs/feds/drafts/qa/jarvis/feds-jarvis-mobile',
      ],
      browserParams: '?hideGeorouting=on',
      envs: '@milo_live',
      tags: '@feds @jarvis @feds-jarvis',
    },
  ],
};
