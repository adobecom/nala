module.exports = {
  FeatureName: 'Modal Blocks',
  features: [
    {
      tcid: '0',
      name: '@Modal Text',
      path: '/drafts/nala/blocks/modal/modal-text-intro',
      data: {
        modalId: 'modal-text-intro',
        fragment: 'text',
        contentType: 'text (intro)',
        headingText: 'Text (intro)',
        bodyText: 'Body M Regular Lorem ipsum dolor sit amet, consetetur sadipscing elitr',
      },
      tags: '@modal @smoke @regression @milo,',
    },
    {
      tcid: '1',
      name: '@Modal Media',
      path: '/drafts/nala/blocks/modal/modal-media',
      data: {
        modalId: 'modal-media',
        fragment: 'media',
        contentType: 'media',
        headingText: 'Text',
        bodyText: 'Body S 16/24 Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed',
      },
      tags: '@modal @smoke @regression @milo,',
    },
  ],
};
