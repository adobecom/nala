module.exports = {
name: 'merchtable',
  features: [
    {
      tcid: '0',
      name: '@merchtable-3column-layout-block',
      path: '/drafts/Automation-PW/merch-table?georouting=off',
      tags: '@cc @cc-merchtable @cc-merchtableui',
    },
    {
      tcid: '1',
      name: '@merchtable-headrowitems',
      path: '/drafts/Automation-PW/merch-table?georouting=off',
      tags: '@cc @cc-merchtable @cc-merchtableheadrow',
    },
    {
      tcid: '2',
      name: '@merchtable-rowheadprices',
      path: '/drafts/Automation-PW/merch-table?georouting=off',
      tags: '@cc @cc-merchtable @cc-merchtableprices',
      data: {
        ccIndividualPrice: 'US$54.99/mo',
        ccStudentPrice: 'US$9.99/mo',
        ccTeamsprice: 'US$22.99/mo',
        ccTeamsStrikeThrough: 'Regularly at US$54.99 per month'
      },
    },
    {
      tcid: '3',
      name: '@merchtable-appdetails',
      path: '/drafts/Automation-PW/merch-table?georouting=off',
      tags: '@cc @cc-merchtable @cc-appdeatilsinrows',
    },
    {
      tcid: '4',
      name: '@merchtable-priceCTA',
      path: '/drafts/Automation-PW/merch-table?georouting=off',
      tags: '@cc @cc-merchtable @cc-PriceCtacommerce',
      commerceurl : 'https://commerce.adobe.com/store/commitment?items%5B0%5D%5Bid%5D=632B3ADD940A7FBB7864AA5AD19B8D28&cli=adobe_com&co=IN&ctx=fp&lang=en',
    },     
  ],
};
