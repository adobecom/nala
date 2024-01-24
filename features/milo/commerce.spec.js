module.exports = {
  name: 'Offer Selector Tool',
  features: [
    {
      tcid: '0',
      name: '@Commerce-Price-Term',
      path: '/drafts/nala/features/commerce/prices-with-term',
      envs: '@milo_live',
      tags: '@commerce',
    },
    {
      tcid: '1',
      name: '@Commerce-Price-Unit-Term',
      path: '/drafts/nala/features/commerce/prices-with-term-unit',
      envs: '@milo_live',
      tags: '@commerce',

    },
    {
      tcid: '2',
      name: '@Commerce-Price-Taxlabel-Unit-Term',
      path: '/drafts/nala/features/commerce/prices-with-term-unit-taxlabel',
      envs: '@milo_live',
      tags: '@commerce',
    },
    {
      tcid: '3',
      name: '@Commerce-Promo',
      path: '/drafts/nala/features/commerce/promo-placeholders',
      data: {
        promo: 'nicopromo',
      },
      envs: '@milo_live',
      tags: '@commerce',
    },
    {
      tcid: '4',
      name: '@Commerce-Promo-Oldprice',
      path: '/drafts/nala/features/commerce/promo-placeholders',
      data: {
        promo: 'nicopromo',
      },
      envs: '@milo_live',
      browserParams: '?commerce.env=stage',
      tags: '@commerce',
    },
  ],
};
