module.exports = {
  name: 'firefly endToend',
  features: [
    {
      tcid: '0',
      name: '@firefly-searchIMSLogin',
      path: '/products/firefly?georouting=off',
      term: 'world famous seven wonders animated images',
      fireflyURL: 'https://firefly-stage.corp.adobe.com/generate/images?prompt=world%20famous%20wonders',
      tags: '@ccstage @cc-firefly @cc-fireflyIMS-search @nopr',
    },
    {
      tcid: '1',
      name: '@firefly-searchwithoutIMS',
      path: '/products/firefly?georouting=off',
      tags: '@ccstage @cc-firefly @cc-fireflyAnonymouse-search @nopr',
    },
    {
      tcid: '3',
      name: '@firefly-UIDesignschecks',
      path: '/products/firefly?georouting=off',
      tags: '@ccstage @cc-firefly @cc-firefly-UI @nopr',
    },
  ],
};
