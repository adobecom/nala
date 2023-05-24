module.exports = {
  name: 'UserProfile Component',
  features: [
    {
      name: '@FEDS-User-Profile-Checks',
      path: [
        '/libs/feds/drafts/qa/ims/feds-user-profile-page',
      ],
      envs: '@feds_live',
      tags: '@feds @userprofile @feds-userprofile',
    },
  ],
};
