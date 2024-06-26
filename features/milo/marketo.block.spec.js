module.exports = {
  name: 'Marketo Forms block',
  features: [
    {
      tcid: '0',
      name: '@marketo full template',
      path: [
        '/drafts/nala/blocks/marketo/full',
      ],
      tags: '@marketo @marketoFullTemplate @milo @smoke @regression',
    },
    {
      tcid: '1',
      name: '@marketo full template with company type',
      path: [
        '/drafts/nala/blocks/marketo/full-with-company-type',
      ],
      tags: '@marketo @marketoFullTemplate @milo @smoke @regression',
    },
    {
      tcid: '2',
      name: '@marketo expanded template',
      path: [
        '/drafts/nala/blocks/marketo/expanded',
        '/drafts/nala/blocks/marketo/expanded-with-company-type',
      ],
      tags: '@marketo @marketoExpandedTemplate @milo @smoke @regression',
    },
    {
      tcid: '3',
      name: '@marketo essential template',
      path: [
        '/drafts/nala/blocks/marketo/essential',
        '/drafts/nala/blocks/marketo/essential-with-company-type',
      ],
      tags: '@marketo @marketoEssentialTemplate @milo @smoke @regression',
    },
  ],
};
