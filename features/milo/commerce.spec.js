module.exports = {
  name: 'Commerce',
  features: [
    {
      tcid: '0',
      name: '@Commerce-Price-Term',
      path: '/drafts/nala/features/commerce/prices-with-term',
      tags: '@commerce @regression @nopr' ,
    },
    {
      tcid: '1',
      name: '@Commerce-Price-Unit-Term',
      path: '/drafts/nala/features/commerce/prices-with-term-unit',
      tags: '@commerce @regression @nopr',

    },
    {
      tcid: '2',
      name: '@Commerce-Price-Taxlabel-Unit-Term',
      path: '/drafts/nala/features/commerce/prices-with-term-unit-taxlabel',
      tags: '@commerce @regression @nopr',
    },
    {
      tcid: '3',
      name: '@Commerce-Promo',
      path: '/drafts/nala/features/commerce/promo-placeholders',
      data: {
        promo: 'nicopromo',
      },
      tags: '@commerce @regression @nopr',
    },
  ],
};
