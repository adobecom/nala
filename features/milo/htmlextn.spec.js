module.exports = {
  name: 'HTML Extension',
  features: [
    {
      name: '@Html Extn for bcom',
      path: [
        '/customer-success-stories/jaguar-land-rover-case-study',
        '/customer-success-stories/abb-case-study',
        '/customer-success-stories/dentsu-isobar-case-study',
        '/jp/customer-success-stories/adobe-experience-cloud-case-study',
      ],
      envs: '@bacom_prod',
      tags: '@htmlextn',
    },
    {
      name: '@Html Extn for Blog',
      path: [
        '/en/publish/2023/02/01/see-you-in-vegas-adobe-summit-2023-reg-open'],
      envs: '@blog_prod',
      tags: '@htmlextn',
    },
  ],
};
