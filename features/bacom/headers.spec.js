module.exports = {
  name: 'Headers',
  features: [
    {
      tcid: '0',
      name: 'Response headers test for Helix BACOM',
      path: [
        '/',
        '/au/',
        '/uk/',
        '/de/',
        '/fr/',
        '/jp/',
        '/sitemap.xml',
      ],
      tags: '@headers @responseHeaders @bacom @bacomSmoke @regression @akamai',
    },
    {
      tcid: '1',
      name: 'Response headers test for AEM dx',
      path: [
        // Event pages
        '/de/events/experience-makers-germany-2023-on-demand.html',
        '/ch_de/events/experience-makers-zurich-2023-on-demand.html',
        '/it/events/experience-makers-milan-2023-on-demand.html',
        '/nl/events/experience-makers-amsterdam-2023-on-demand.html',
        '/se/events/experience-makers-stockholm-2023-on-demand.html',
        '/fr/events/experience-makers-paris-2023-on-demand.html',
        '/uk/events/experience-makers-london-2023-on-demand.html',

        // Product Demo pages
        '/product-demos/assets-essentials/interactive-tour.html',
        '/de/product-demos/assets-essentials/interactive-tour.html',
        '/fr/product-demos/assets-essentials/interactive-tour.html',
        '/au/product-demos/assets-essentials/interactive-tour.html',
        '/uk/product-demos/assets-essentials/interactive-tour.html',
        '/jp/product-demos/assets-essentials/interactive-tour.html',

        // Summit pages
        '/summit/adobe-summit.html',
        '/summit/2024/speakers.html',
        '/summit/2024/sessions.html',
        '/summit/2024/faq.html',
        '/summit/2024/sessions/opening-keynote-gs1.html',
      ],
      tags: '@headers @responseHeaders @bacom @bacomSmoke @regression @akamai',
    },
  ],
};
