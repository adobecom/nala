module.exports = {
  name: 'Footer VC Suite',
  features: [
    {
      tcid: '0',
      name: '@header-visual',
      path: '/libs/feds/drafts/qa/header/feds-header-page',
      stable: '@milo_live',
      beta: '@milo_stage',
      tags: '@header-visual @visual @feds-screenshots',
      browserParams: '?georouting=off',
    },
    {
      tcid: '1',
      name: '@footer-visual',
      path: '/libs/feds/drafts/qa/footer/feds-default-footer',
      stable: '@milo_live',
      beta: '@milo_stage',
      tags: '@footer-visual @visual @feds-screenshots',
      browserParams: '?georouting=off',
    },
  ],
};
