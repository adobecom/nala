module.exports = {
  name: 'Commerce',
  features: [
    {
      tcid: '0',
      name: '@Commerce-Price-Term',
      path: '/drafts/nala/features/commerce/prices-with-term',
      tags: '@commerce @smoke @regression @nopr' ,
    },
    {
      tcid: '1',
      name: '@Commerce-Price-Unit-Term',
      path: '/drafts/nala/features/commerce/prices-with-term-unit',
      tags: '@commerce @smoke @regression @nopr',

    },
    {
      tcid: '2',
      name: '@Commerce-Price-Taxlabel-Unit-Term',
      path: '/drafts/nala/features/commerce/prices-with-term-unit-taxlabel',
      tags: '@commerce @smoke @regression @nopr',
    },
    {
      tcid: '3',
      name: '@Commerce-Promo',
      path: '/drafts/nala/features/commerce/promo-placeholders',
      data: {
        promo: 'nicopromo',
      },
      tags: '@commerce @smoke @regression @nopr',
    },
    {
      tcid: '4',
      name: '@Commerce-Upgrade-Entitlement',
      path: '/drafts/nala/features/commerce/checkout-links',
      data: { UpgradeCTATitle: 'Upgrade now' },
      tags: '@commerce @entitlement @smoke @regression @nopr',
    },
    {
      tcid: '5',
      name: '@Commerce-Download-Entitlement',
      path: '/drafts/nala/features/commerce/checkout-links',
      data: {
        DownloadCTATitle: 'Download',
        TrialCTATitle: 'Free trial',
        DownloadUrl: 'download/photoshop',
      },
      tags: '@commerce @entitlement @smoke @regression @nopr',
    },
  ],
};
