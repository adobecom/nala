module.exports = {
  name: 'Failed Blocks',
  features: [
    {
      name: '@failedblock',
      path: [
        '/customer-success-stories/',
        '/customer-success-stories/jaguar-land-rover-case-study',
        '/customer-success-stories/abb-case-study',
        '/customer-success-stories/dentsu-isobar-case-study',
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
  ],
};
