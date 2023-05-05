module.exports = {
  name: 'FEDS User Profile',
  features: [
    {
      name: '@userprofile',
      path: [
        '/libs/feds/drafts/qa/ims/feds-user-profile-page',
      ],
      envs: '@feds_live',
      tags: '@feds @feds-userprofile',
    },
  ],
};
