module.exports = {
  name: 'IMSLogin',
  features: [
    {
      name: '@imslogin',
      path: '/test/features/blocks/ims-signin',
      envs: '@bacom_live',
      tags: '@gnav-signin @apple-signin @ims-login @google-signin @facebook-signin @smoke @milo',
    },
    {
      name: '@imslogin',
      path: '/customer-success-stories/princess-cruises-case-study',
      envs: '@bacom_prod',
      tags: '@gnav-signin @apple-signin @ims-login @google-signin @facebook-signin @regression @milo',
    },
    {
      name: '@imslogin',
      path: '/test/features/blocks/multi-cloud-signin',
      envs: '@bacom_live',
      tags: '@gnav-multi-signin @ims-login @smoke @milo',
    },
  ],
};
