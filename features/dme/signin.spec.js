module.exports = {
  FeatureName: 'DME sign in flow page',
  features: [
    {
      tcid: '1',
      name: '@login-sign-in-sign-out-public-page',
      path: 'https://partners.stage.adobe.com/channelpartners/drafts/automation/regression/public-page',
      tags: '@dme-signin @regression @login @nopr',
      data: {
        partnerLevel: 'cpp-spain-platinum:',
        expectedProtectedHomeURL: 'https://partners.stage.adobe.com/channelpartners/drafts/automation/regression/protected-home',
        expectedPublicPageURL: 'https://partners.stage.adobe.com/channelpartners/drafts/automation/regression/public-page',
      },
    },
    {
      tcid: '2',
      name: '@login-accessing-public-home-page-with-member-user-logged-in-to-adobe',
      path: 'https://partners.stage.adobe.com/channelpartners/drafts/automation/regression/public-page',
      baseURL: 'https://www.stage.adobe.com/partners.html',
      tags: '@dme-signin @regression @login @nopr',
      data: {
        partnerLevel: 'cpp-spain-platinum:',
        expectedToSeeInURL: 'https://partners.stage.adobe.com/channelpartners/drafts/automation/regression/protected-home',
      },
    },
    {
      tcid: '3',
      name: '@login-accessing-restricted-home-page-with-member-user-logged-in-to-adobe',
      path: 'https://partners.stage.adobe.com/channelpartners/drafts/automation/regression/protected-home',
      baseURL: 'https://www.stage.adobe.com/partners.html',
      tags: '@dme-signin @regression @login @nopr',
      data: {
        partnerLevel: 'cpp-spain-platinum:',
        expectedToSeeInURL: 'https://partners.stage.adobe.com/channelpartners/drafts/automation/regression/protected-home',
      },
    },
  ],
};
