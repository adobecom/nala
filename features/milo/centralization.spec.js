module.exports = {
  name: 'Centralization Feature',
  features: [
    {
      name: '@FEDS-Centralized-Page',
      path: [
        '/drafts/nala/features/federalization/feds-centralized',
      ],
      browserParams: '?skipConsent=true&env=prod&georouting=off',
      tags: '@milo @feds @centralization @smoke @regression',
    },
    {
      name: '@FEDS-Not-Centralized-Page',
      path: [
        '/drafts/nala/features/federalization/feds-not-centralized',
      ],
      browserParams: '?skipConsent=true&env=prod&georouting=off',
      tags: '@milo @feds @centralization @smoke @regression',
    },
    {
      name: '@FEDS-MegaMenu-Centralized-Page',
      path: [
        '/drafts/nala/features/federalization/feds-megamenu-centralized',
      ],
      browserParams: '?skipConsent=true&env=prod&georouting=off',
      tags: '@milo @feds @centralization @smoke @regression',
    },
  ],
};
