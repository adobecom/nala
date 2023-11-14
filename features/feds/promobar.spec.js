module.exports = {
  name: 'Promobar Block',
  features: [
    {
      name: '@FEDS-Promo-Checks',
      path: [
        '/libs/feds/drafts/qa/promo/feds-promo-bar',
      ],
      data: {
        promoBarBtn: 'See offers',
        promoBarText: 'Black Friday 2023 is here! Check out the HOT NEW basketball jerseys from our shop!',
        promoBarBtnLink: 'https://adobe.com/',
      },
      browserParams: '?georouting=off',
      tags: '@milo @feds @promobar @smoke @regression',
    },
  ],
};
