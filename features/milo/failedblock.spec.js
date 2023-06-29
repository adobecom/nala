module.exports = {
  name: 'Failed Block',
  features: [
    {
      name: '@failedblock',
      path: [
        '/customer-success-stories',
        '/customer-success-stories/dicks-sporting-goods-case-study',
        '/customer-success-stories/xfinity-creative-customer-story',
        '/customer-success-stories/the-home-depot-case-study',
        '/customer-success-stories/hugo-boss-case-study',
        '/customer-success-stories/coca-cola-case-study',
        '/customer-success-stories/cisco-case-study',
        '/resources/holiday-shopping-report',
      ],
      envs: '@bacom_live',
      tags: '@failedblock',
    },
    {
      name: '@failedblock',
      path: [
        '/acrobat/online/pdf-to-ppt',
        '/acrobat/online/jpg-to-pdf',
        '/acrobat/online/sign-pdf',
        '/acrobat/online/compress-pdf',
        '/acrobat/online/crop-pdf',
      ],
      envs: '@dc_live',
      tags: '@failedblock',
    },
    {
      name: '@failedblock',
      path: [
        '/acrobat/resources/how-to-create-fillable-pdf',
        '/acrobat/resources/tax-preparation',
        '/acrobat/resources/how-to-add-hyperlink-to-pdf',
      ],
      envs: '@dc_live',
      tags: '@failedblock',
    },
    {
      name: '@failedblock',
      path: [
        '/pages/artisthub/',
        '/pages/artisthub/learn',
      ],
      envs: '@stock_live',
      tags: '@failedblock',
    },
    {
      name: '@failedblock',
      path: [
        '/legal/license-terms-linkless',
        '/legal/enterprise-conditions-linkless',
      ],
      envs: '@adobestock_live',
      tags: '@failedblock',
    },
  ],
};
