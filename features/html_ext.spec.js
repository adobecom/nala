module.exports = {
  name: 'HTML extension',
  features: [
    {
      name: '@html_ext',
      path: [
        '/customer-success-stories',
        '/customer-success-stories/jaguar-land-rover-case-study',
        '/customer-success-stories/abb-case-study',
        '/customer-success-stories/dentsu-isobar-case-study',
        '/blog/',
        '/jp/customer-success-stories/adobe-experience-cloud-case-study',
      ],
      envs: '@bacom_prod',
      tags: '@html',
    },
    {
      name: '@html_ext',
      path: '/en/publish/2023/02/01/see-you-in-vegas-adobe-summit-2023-reg-open',
      envs: '@blog_prod',
      tags: '@html',
    },
  ],
};
