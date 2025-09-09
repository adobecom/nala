module.exports = {
  name: 'Marketo Forms block',
  features: [
    {
      tcid: '0',
      name: '@marketo full template',
      path: [
        '/request-consultation',
        '/de/request-consultation',
        '/fr/request-consultation',
        '/au/request-consultation',
        '/jp/request-consultation',
        '/uk/request-consultation',
      ],
      tags: '@marketo @marketoBacom @bacom @smoke @regression @e2e @homepage',
    },
    {
      tcid: '1',
      name: '@marketo essential template',
      path: [
        '/resources/webinars/beyond-the-buzzword-operationalizing-generative-ai-for-growth',
      ],
      tags: '@marketo @marketoBacom @marketoEssentialTemplate @bacom @smoke @regression @e2e @resources',
    },
  ],
};
