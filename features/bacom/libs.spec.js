module.exports = {
  name: 'libs',
  features: [
    {
      tcid: '0',
      name: '@libs test',
      mapping: [
        ['https://business.adobe.com', 'https://business.adobe.com/libs'],
        ['https://business.adobe.com?milolibs=foo', 'https://business.adobe.com/libs'],
        ['https://business.stage.adobe.com', 'https://main--milo--adobecom.hlx.live/libs'],
        ['https://business.stage.adobe.com?milolibs=foo', 'https://foo--milo--adobecom.hlx.live/libs'],
        ['https://business.stage.adobe.com?milolibs=awesome--milo--forkedowner',
          'https://awesome--milo--forkedowner.hlx.live/libs'],
        ['https://main--bacom--adobecom.hlx.page/', 'https://main--milo--adobecom.hlx.live/libs'],
        ['https://main--bacom--adobecom.hlx.page/?milolibs=foo', 'https://foo--milo--adobecom.hlx.live/libs'],
        ['https://main--bacom--adobecom.hlx.page/?milolibs=local', 'http://localhost:6456/libs'],
        ['https://main--bacom--adobecom.hlx.page/?milolibs=awesome--milo--forkedowner',
          'https://awesome--milo--forkedowner.hlx.live/libs'],
        ['https://main--bacom--adobecom.hlx.live/', 'https://main--milo--adobecom.hlx.live/libs'],
        ['https://main--bacom--adobecom.hlx.live/?milolibs=foo', 'https://foo--milo--adobecom.hlx.live/libs'],
        ['https://main--bacom--adobecom.hlx.live/?milolibs=local', 'http://localhost:6456/libs'],
        ['https://main--bacom--adobecom.hlx.live/?milolibs=awesome--milo--forkedowner',
          'https://awesome--milo--forkedowner.hlx.live/libs'],
      ],
      tags: '@libs @bacom @smoke @regression',
    },
  ],
};
