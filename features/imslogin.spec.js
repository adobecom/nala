module.exports = {
  name: 'IMSLogin',
  features: [
    {
      name: '@imslogin',
      path: '/customer-success-stories/princess-cruises-case-study',
      envs: '@bacom @bacom_prod',
      tags: '@gnav-signin @apple-signin @google-signin @facebook-signin',
    },
    {
      name: '@imslogin',
      path: '/test/features/blocks/multi-cloud-signin',
      envs: '@bacom',
      tags: '@gnav-multi-signin',
    },
    // TODO: Temp spec tag, once app launcher is released we can remove
    {
      name: '@imslogin',
      path: '/test/features/blocks/multi-cloud-signin?milolibs=rclayton-gnav-apps',
      envs: '@bacom_stg',
      tags: '@gnav-app-launcher',
    },
  ],
};
