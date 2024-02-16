module.exports = {
  FeatureName: 'Entitlement Upgrade Block',
  features: [
    {
      tcid: '0',
      name: '@Upgrade-Sanity-Check',
      path: '/drafts/nala/features/commerce/checkout-links',
      data: { UpgradeCTATitle: 'Upgrade now' },
      envs: '@milo_live',
      tags: '@smoke @regression @plans @milo',
    },
    {
      tcid: '1',
      name: '@Download-Sanity-Check',
      path: '/drafts/nala/features/commerce/checkout-links',
      data: {
        DownloadCTATitle: 'Download',
        TrialCTATitle: 'Free trial',
        DownloadUrl: 'download/photoshop',
      },
      tags: '@smoke @regression @plans @milo',
    },
  ],
};
