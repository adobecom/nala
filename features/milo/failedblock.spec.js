module.exports = {
  name: 'Failed Blocks',
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
        '/acrobat/online/pdf-to-ppt.html',
        '/acrobat/online/jpg-to-pdf.html',
        '/acrobat/online/sign-pdf.html',
        '/acrobat/online/compress-pdf.html',
        '/acrobat/online/crop-pdf.html',
      ],
      envs: '@adobe_prod',
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
