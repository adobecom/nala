module.exports = {
  name: 'Jarvis Component',
  features: [
    {
      name: '@FEDS-Jarvis-Default',
      path: [
        '/libs/feds/drafts/qa/jarvis/feds-jarvis-default',
      ],
      browserParams: '?customPrivacyLocation=de&georouting=off',
      envs: '@milo_live',
      tags: '@milo @feds @jarvis @smoke @regression',
    },
    {
      name: '@FEDS-Jarvis-Desktop',
      path: [
        '/libs/feds/drafts/qa/jarvis/feds-jarvis-desktop',
      ],
      browserParams: '?customPrivacyLocation=de&georouting=off',
      envs: '@milo_live',
      tags: '@milo @feds @jarvis @smoke @regression',
    },
    {
      name: '@FEDS-Jarvis-Disabled',
      path: [
        '/libs/feds/drafts/qa/jarvis/feds-jarvis-disabled',
      ],
      browserParams: '?customPrivacyLocation=de&georouting=off',
      envs: '@milo_live',
      tags: '@milo @feds @jarvis @smoke @regression',
    },
    {
      name: '@FEDS-Jarvis-Mobile',
      path: [
        '/libs/feds/drafts/qa/jarvis/feds-jarvis-mobile',
      ],
      browserParams: '?customPrivacyLocation=de&georouting=off',
      envs: '@milo_live',
      tags: '@milo @feds @jarvis @smoke @regression',
    },
  ],
};
