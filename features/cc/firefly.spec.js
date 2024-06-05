module.exports = {
  name: 'firefly endToend',
  features: [
    {
      tcid: '0',
      name: '@firefly-searchIMSLogin',
      path: '/products/firefly.html?georouting=off',
      term: 'world famous seven wonders animated images',
      fireflyURL: 'https://firefly-stage.corp.adobe.com/generate/images?prompt=world%20famous%20wonders',
      tags: '@cc @cc-firefly @cc-fireflyIMS-search',
    },
    {
      tcid: '1',
      name: '@firefly-searchwithoutIMS',
      path: '/products/firefly.html?georouting=off',
      tags: '@cc @cc-firefly @cc-fireflyAnonymouse-search',
    },
    {
      tcid: '3',
      name: '@firefly-UIDesignschecks',
      path: '/products/firefly.html?georouting=off',
      tags: '@cc @cc-firefly @cc-firefly-UI',
    },
  ],
};
