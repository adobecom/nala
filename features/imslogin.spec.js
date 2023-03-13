module.exports = {
  name: 'IMSLogin',
  features: [
    {
      name: '@imslogin',
      path: '/test/features/blocks/ims-signin',
      envs: '@bacom_live',
      tags: '@gnav-signin @apple-signin @google-signin @facebook-signin @smoke',
    },
    {
      name: '@imslogin',
      path: '/customer-success-stories/princess-cruises-case-study',
      envs: '@bacom_prod',
      tags: '@gnav-signin @apple-signin @google-signin @facebook-signin @regression',
    },
    {
      name: '@imslogin',
      path: '/test/features/blocks/multi-cloud-signin',
      envs: '@bacom_live',
      tags: '@gnav-multi-signin @smoke',
    },
  ],
};
