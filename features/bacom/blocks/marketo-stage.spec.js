module.exports = {
  name: 'Marketo Forms block',
  features: [
    {
      tcid: '0',
      name: '@marketo full template',
      path: [
        '/drafts/nala/blocks/marketo/stage-full',
      ],
      tags: '@marketo @marketoFullTemplate @stageForm @smoke @regression',
    },
    {
      tcid: '1',
      name: '@marketo full template with company type',
      path: [
        '/drafts/nala/blocks/marketo/stage-full-with-company-type',
      ],
      tags: '@marketo @marketoFullTemplate @stageForm @smoke @regression',
    },
    {
      tcid: '2',
      name: '@marketo expanded template',
      path: [
        '/drafts/nala/blocks/marketo/stage-expanded',
        '/drafts/nala/blocks/marketo/stage-expanded-with-company-type',
      ],
      tags: '@marketo @marketoExpandedTemplate @stageForm @smoke @regression',
    },
    {
      tcid: '3',
      name: '@marketo essential template',
      path: [
        '/drafts/nala/blocks/marketo/stage-essential',
        '/drafts/nala/blocks/marketo/stage-essential-with-company-type',
      ],
      tags: '@marketo @marketoEssentialTemplate  @stageForm @smoke @regression',
    },
  ],
};
